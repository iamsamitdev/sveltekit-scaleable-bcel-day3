<script lang="ts">
  import { createVirtualizer } from '@tanstack/svelte-virtual'
  import { browser } from '$app/environment'

  // รับข้อมูลจาก server load: สถิติและ initial rows
  let { data } = $props()
  const stats = (data as any).stats

  const rowHeight = 40
  const headerHeight = 40
  let rowsData = $state<any[]>(Array.isArray((data as any)?.users) ? (data as any).users : [])
  let nextCursor = $state<number | string | null>(data?.nextCursor ?? null)

  let scrollEl: HTMLDivElement
  let rowVirtualizer: any = $state(null)

  if (browser) {
    // สร้าง virtualizer สำหรับตาราง โดยไม่อ้างอิง state ตรงๆ ตั้งแต่ตอน init
    rowVirtualizer = createVirtualizer({
      count: 0,
      getScrollElement: () => scrollEl,
      estimateSize: () => rowHeight,
      overscan: 5
    })
  } else {
    // SSR fallback: จำลอง method ที่ใช้ เพื่อให้เรนเดอร์ได้บนเซิร์ฟเวอร์
    rowVirtualizer = {
      getTotalSize: () => rowsData.length * rowHeight,
      getVirtualItems: () => rowsData.map((_, i) => ({ index: i, key: i, size: rowHeight, start: i * rowHeight }))
    }
  }

  $effect(() => {
    // อัพเดทจำนวนแถวให้ virtualizer เมื่อข้อมูลเปลี่ยน
    if (browser && rowVirtualizer?.setOptions) {
      rowVirtualizer.setOptions({ count: rowsData.length })
    }
  })

  // โหลด batch ถัดไปเมื่อเลื่อนใกล้ท้าย container
  async function loadMore() {
    if (!nextCursor) return
    const res: Response = await fetch(`/api/users?limit=50&cursor=${nextCursor}`)
    const json: any = await res.json()
    const users = (json.items ?? json.users) as any[]
    rowsData = rowsData.concat(users || [])
    nextCursor = json.nextCursor
  }

  function onScroll() {
    const total = rowVirtualizer?.getTotalSize?.() ?? rowsData.length * rowHeight
    const offset = scrollEl.scrollTop + scrollEl.clientHeight
    if (total > 0 && offset / total > 0.9 && nextCursor) loadMore()
  }
</script>

<!-- Stats cards -->
<div class="flex items-center justify-between mb-4">
  <div class="text-2xl md:text-3xl font-bold text-gray-900">ผู้ใช้งาน</div>
  <div class="flex gap-2">
    <button type="button" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">เพิ่มผู้ใช้</button>
    <button type="button" class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium">นำออก CSV</button>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div class="text-sm text-gray-500">ทั้งหมด</div>
    <div class="text-2xl font-bold text-gray-900">{stats.total?.toLocaleString?.('th-TH') ?? stats.total}</div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div class="text-sm text-gray-500">ใช้งานอยู่</div>
    <div class="text-2xl font-bold text-gray-900">{stats.active?.toLocaleString?.('th-TH') ?? stats.active}</div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div class="text-sm text-gray-500">รอดำเนินการ</div>
    <div class="text-2xl font-bold text-gray-900">{stats.pending?.toLocaleString?.('th-TH') ?? stats.pending}</div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div class="text-sm text-gray-500">ถูกระงับ</div>
    <div class="text-2xl font-bold text-gray-900">{stats.suspended?.toLocaleString?.('th-TH') ?? stats.suspended}</div>
  </div>
</div>

<div bind:this={scrollEl} class="h-[600px] overflow-auto" onscroll={onScroll}>
  <!-- Header แยกจากพื้นที่ virtual rows -->
  <div class="sticky top-0 z-10 bg-gray-50 border-b text-gray-600 grid grid-cols-5 gap-3 px-3 py-2 text-sm">
    <div>ID</div>
    <div>Name</div>
    <div>Email</div>
    <div>Phone</div>
    <div>Created At</div>
  </div>

  <!-- Virtual rows container -->
  <div style={`height: ${(rowVirtualizer?.getTotalSize?.() ?? rowsData.length * rowHeight)}px; position: relative`}>
    {#each (rowVirtualizer?.getVirtualItems?.() ?? rowsData.map((_, i) => ({ index: i, key: i, size: rowHeight, start: i * rowHeight }))) as v}
      <div style={`position: absolute; top: ${v.start}px; height: ${v.size}px; left: 0; right: 0`} class="border-b px-3 flex items-center text-sm">
        {#if rowsData[v.index]}
          <div class="grid grid-cols-5 gap-3 w-full">
            <div class="whitespace-nowrap truncate">{rowsData[v.index].id}</div>
            <div class="whitespace-nowrap truncate">{rowsData[v.index].name ?? rowsData[v.index].fullName ?? rowsData[v.index].fullname}</div>
            <div class="whitespace-nowrap truncate">{rowsData[v.index].email}</div>
            <div class="whitespace-nowrap truncate">{rowsData[v.index].phoneNumber}</div>
            <div class="whitespace-nowrap truncate">{new Date(rowsData[v.index].createdAt).toLocaleString('th-TH')}</div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
