<script lang="ts">
  import { createVirtualizer } from '@tanstack/svelte-virtual'
  import { browser } from '$app/environment'

  // props
  interface Props {
    initial: any[]
    nextCursor: number | string | null
    limit?: number
  }
  let { initial = [], nextCursor = null, limit = 200 } = $props() as Props

  // สถานะข้อมูลแบบ windowed เพื่อลด memory
  // เติมค่า role/status แบบ fallback ให้แสดงผลเหมือนหน้า Users.svelte
  const withDefaults = (u: any, i: number) => ({
    ...u,
    fullname: u.fullname ?? u.fullName,
    role: u.role ?? (['admin', 'manager', 'user'] as const)[i % 3],
    status: u.status ?? (['active', 'pending', 'suspended'] as const)[i % 3]
  })
  let rows: any[] = $state(initial.map(withDefaults))
  let cursor: number | string | null = $state(nextCursor)
  let loading = $state(false)
  let prefetching = $state(false)
  let prefetchAllMode = $state(false)
  let prefetchLoaded = $state(rows.length)
  let shouldCancelPrefetch = $state(false)

  // ฟิลเตอร์และสถิติ (ให้ UI ใกล้เคียง Users.svelte)
  type Role = 'admin' | 'manager' | 'user'
  type Status = 'active' | 'pending' | 'suspended'
  let query = $state('')
  let roleFilter = $state<'all' | Role>('all')
  let statusFilter = $state<'all' | Status>('all')

  const totalUsers = $derived(rows.length)
  const activeUsers = $derived(rows.filter((u: any) => u.status === 'active').length)
  const pendingUsers = $derived(rows.filter((u: any) => u.status === 'pending').length)
  const suspendedUsers = $derived(rows.filter((u: any) => u.status === 'suspended').length)

  const filtered = $derived(
    rows.filter((u: any) => {
      const matchesQ = `${u.fullname ?? ''} ${u.email ?? ''}`.toLowerCase().includes(query.toLowerCase())
      const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter
      const matchesStatus = statusFilter === 'all' ? true : u.status === statusFilter
      return matchesQ && matchesRole && matchesStatus
    })
  )

  let containerEl: HTMLDivElement
  let rowVirtualizer: any = $state(null)
  if (browser) {
    rowVirtualizer = createVirtualizer({
      count: 0,
      getScrollElement: () => containerEl,
      estimateSize: () => 44
    })
  } else {
    // SSR fallback (ไม่มี window/scroll): ให้คืนค่าจำลอง
    rowVirtualizer = {
      getTotalSize: () => filtered.length * 44,
      getVirtualItems: () => filtered.map((_: any, i: number) => ({ index: i, key: i, size: 44, start: i * 44 }))
    }
  }

  $effect(() => {
    // อัพเดทจำนวนรายการเมื่อผลลัพธ์ถูกกรองเปลี่ยนไป
    if (browser && rowVirtualizer?.setOptions) {
      rowVirtualizer.setOptions({ count: filtered.length })
    }
  })

  async function fetchMore() {
    if (!cursor || loading) return
    loading = true
    try {
      const res = await fetch(`/api/users?cursor=${cursor}&limit=${limit}`)
      const data = await res.json()
      const newRows = (data.items || []).map((u: any, i: number) => withDefaults(u, rows.length + i))
      rows = rows.concat(newRows)

      // จำกัดหน้าต่างข้อมูลในหน่วยความจำ (เช่น เก็บล่าสุด 2,000 แถว)
      const maxWindow = 2000
      if (!prefetchAllMode && rows.length > maxWindow) rows = rows.slice(rows.length - maxWindow)

      cursor = data.nextCursor
    } finally {
      loading = false
    }
  }

  // โหลดเพิ่มเมื่อเลื่อนต่ำกว่า 80%
  function onScroll() {
    const total = rowVirtualizer?.getTotalSize?.() ?? filtered.length * 44
    const offset = containerEl.scrollTop + containerEl.clientHeight
    if (total > 0 && offset / total > 0.8) fetchMore()
  }

  function statusBadgeClasses(status: Status) {
    if (status === 'active') return 'bg-emerald-100 text-emerald-700'
    if (status === 'pending') return 'bg-amber-100 text-amber-700'
    return 'bg-rose-100 text-rose-700'
  }

  function resetScroll() {
    if (containerEl) containerEl.scrollTop = 0
  }

  async function prefetchAll() {
    if (prefetching || !cursor) return
    prefetching = true
    prefetchAllMode = true
    shouldCancelPrefetch = false
    try {
      while (cursor && !shouldCancelPrefetch) {
        const res: Response = await fetch(`/api/users?cursor=${cursor}&limit=${limit}`)
        const data: any = await res.json()
        const newRows = (data.items as any[] || []).map((u: any, i: number) => withDefaults(u, rows.length + i))
        rows = rows.concat(newRows)
        cursor = data.nextCursor
        prefetchLoaded = rows.length
        await new Promise((r) => setTimeout(r, 0))
      }
    } finally {
      prefetching = false
    }
  }

  function cancelPrefetch() {
    if (!prefetching) return
    shouldCancelPrefetch = true
  }
</script>

<div class="space-y-6">
  <!-- Header + actions -->
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">ผู้ใช้งาน (Virtualized)</h1>
      <p class="text-gray-600">แสดงผลผู้ใช้งานจำนวนมากด้วย Virtual Scrolling และโหลดเพิ่มอัตโนมัติ</p>
    </div>
    <div class="flex gap-2">
      <button type="button" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">เพิ่มผู้ใช้</button>
      <button type="button" class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium">นำออก CSV</button>
      {#if !prefetching && cursor}
        <button type="button" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium" onclick={prefetchAll}>โหลดทั้งหมด</button>
      {:else if prefetching}
        <div class="flex items-center gap-2">
          <div class="text-sm text-gray-700">กำลังโหลดทั้งหมด... {prefetchLoaded.toLocaleString('th-TH')} รายการ</div>
          <button type="button" class="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm" onclick={cancelPrefetch}>ยกเลิก</button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div class="text-sm text-gray-500">ทั้งหมด</div>
      <div class="text-2xl font-bold text-gray-900">{totalUsers}</div>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div class="text-sm text-gray-500">ใช้งานอยู่</div>
      <div class="text-2xl font-bold text-gray-900">{activeUsers}</div>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div class="text-sm text-gray-500">รอดำเนินการ</div>
      <div class="text-2xl font-bold text-gray-900">{pendingUsers}</div>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div class="text-sm text-gray-500">ถูกระงับ</div>
      <div class="text-2xl font-bold text-gray-900">{suspendedUsers}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <div class="flex-1 relative">
        <input class="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="ค้นหาชื่อหรืออีเมล..." bind:value={query} oninput={resetScroll} />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
      </div>
      <select class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm" bind:value={roleFilter} onchange={resetScroll}>
        <option value="all">บทบาททั้งหมด</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>
      <select class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm" bind:value={statusFilter} onchange={resetScroll}>
        <option value="all">สถานะทั้งหมด</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  </div>

  <!-- Table (virtualized body) -->
  <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
  <div class="h-[70vh] overflow-auto" bind:this={containerEl} onscroll={onScroll}>
    <div style={`height: ${(rowVirtualizer?.getTotalSize?.() ?? filtered.length * 44)}px; position: relative`}>
      <!-- Header sticky -->
      <div class="sticky top-0 z-10 bg-gray-50 border-b text-gray-600 grid grid-cols-6 gap-3 px-3 py-2 text-sm">
        <div>ผู้ใช้</div>
        <div>อีเมล</div>
        <div>บทบาท</div>
        <div>สถานะ</div>
        <div>วันที่สร้าง</div>
        <div class="text-right">การกระทำ</div>
      </div>
      {#each (rowVirtualizer?.getVirtualItems?.() ?? filtered.map((_: any, i: number) => ({ index: i, key: i, size: 44, start: i * 44 }))) as v}
        <div
          style={`position: absolute; top: ${v.start}px; height: ${v.size}px; left: 0; right: 0`}
          class="border-b px-3 flex items-center text-sm"
        >
          {#if filtered[v.index]}
            <div class="grid grid-cols-6 gap-3 w-full">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {(filtered[v.index].fullname || '').split(' ').slice(0, 2).map((n: string) => n?.[0]).join('').toUpperCase()}
                </div>
                <div>
                  <div class="font-medium text-gray-900 truncate">{filtered[v.index].fullname}</div>
                  <div class="text-xs text-gray-500">{filtered[v.index].id}</div>
                </div>
              </div>
              <div class="truncate">{filtered[v.index].email}</div>
              <div>
                <span class="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">{filtered[v.index].role}</span>
              </div>
              <div>
                <span class={`px-2 py-1 rounded text-xs ${statusBadgeClasses(filtered[v.index].status)}`}>{filtered[v.index].status}</span>
              </div>
              <div class="text-gray-600">{new Date(filtered[v.index].createdAt).toLocaleDateString('th-TH')}</div>
              <div class="flex items-center justify-end gap-2">
                <button type="button" class="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">ดู</button>
                <button type="button" class="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">เลื่อนสิทธิ์</button>
                <button type="button" class="px-3 py-1.5 rounded-md border text-white bg-rose-600 hover:bg-rose-700 border-rose-600">ระงับ</button>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  </div>

  {#if loading}
    <div class="p-3 text-gray-600 text-center text-sm">กำลังโหลด...</div>
  {/if}
  {#if !cursor}
    <div class="p-3 text-gray-500 text-center text-sm">โหลดครบทั้งหมดแล้ว</div>
  {/if}
</div>