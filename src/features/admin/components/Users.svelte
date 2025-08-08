<script lang="ts">
  type Role = "admin" | "manager" | "user"
  type Status = "active" | "pending" | "suspended"

  // ใช้ type จาก Prisma
  type PrismaUser = {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    password: string
    createdAt: Date
    updatedAt: Date
  }

  // Type สำหรับแสดงผลใน UI (เพิ่ม role และ status)
  type User = PrismaUser & {
    role: Role
    status: Status
  }

  // รับ users จาก props
  let { users: prismaUsers = [] } = $props<{ users: PrismaUser[] }>()

  // แปลง Prisma users เป็น UI users (เพิ่ม mock role และ status)
  let users = $derived<User[]>(
    prismaUsers.map((user: PrismaUser, index: number) => ({
      ...user,
      role: (["admin", "manager", "user"] as Role[])[index % 3],
      status: (["active", "pending", "suspended"] as Status[])[index % 3],
    }))
  )

  // filters
  let query = $state("")
  let roleFilter = $state<"all" | Role>("all")
  let statusFilter = $state<"all" | Status>("all")

  // paging
  let page = $state(1)
  const pageSize = 20

  const totalUsers = $derived(users.length)
  const activeUsers = $derived(
    users.filter((u: User) => u.status === "active").length
  )
  const pendingUsers = $derived(
    users.filter((u: User) => u.status === "pending").length
  )
  const suspendedUsers = $derived(
    users.filter((u: User) => u.status === "suspended").length
  )

  const filtered = $derived(
    users.filter((u: User) => {
      const matchesQ = `${u.fullName} ${u.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesRole = roleFilter === "all" ? true : u.role === roleFilter
      const matchesStatus =
        statusFilter === "all" ? true : u.status === statusFilter
      return matchesQ && matchesRole && matchesStatus
    })
  )

  const totalPages = $derived(
    Math.max(1, Math.ceil(filtered.length / pageSize))
  )
  const visible = $derived(
    filtered.slice((page - 1) * pageSize, page * pageSize)
  )

  function resetPage() {
    page = 1
  }

  function statusBadgeClasses(status: Status) {
    if (status === "active") return "bg-emerald-100 text-emerald-700"
    if (status === "pending") return "bg-amber-100 text-amber-700"
    return "bg-rose-100 text-rose-700"
  }

  function toggleSuspend(user: User) {
    // Note: ในความเป็นจริงควรเรียก API เพื่ออัพเดต status ในฐานข้อมูล
    // ตอนนี้เป็นแค่ demo เฉยๆ เพราะข้อมูลมาจาก Prisma
    console.log(`Toggle suspend for user: ${user.fullName}`)
  }

  function promoteRole(user: User) {
    // Note: ในความเป็นจริงควรเรียก API เพื่ออัพเดต role ในฐานข้อมูล
    // ตอนนี้เป็นแค่ demo เฉยๆ เพราะข้อมูลมาจาก Prisma
    console.log(`Promote role for user: ${user.fullName} from ${user.role}`)
  }
</script>

<div class="space-y-6">
  <!-- Header + actions -->
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">ผู้ใช้งาน</h1>
      <p class="text-gray-600">
        จัดการผู้ใช้งานของระบบ ค้นหา กรอง ดูรายละเอียด และดำเนินการ
      </p>
    </div>
    <div class="flex gap-2">
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
        >เพิ่มผู้ใช้</button
      >
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium"
        >นำออก CSV</button
      >
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
        <input
          class="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="ค้นหาชื่อหรืออีเมล..."
          bind:value={query}
          oninput={resetPage}
        />
        <svg
          class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </div>
      <select
        class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
        bind:value={roleFilter}
        onchange={resetPage}
      >
        <option value="all">บทบาททั้งหมด</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>
      <select
        class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
        bind:value={statusFilter}
        onchange={resetPage}
      >
        <option value="all">สถานะทั้งหมด</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  </div>

  <!-- Table -->
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 text-gray-600">
            <th class="text-left font-medium px-4 py-3">ผู้ใช้</th>
            <th class="text-left font-medium px-4 py-3">อีเมล</th>
            <th class="text-left font-medium px-4 py-3">บทบาท</th>
            <th class="text-left font-medium px-4 py-3">สถานะ</th>
            <th class="text-left font-medium px-4 py-3">วันที่สร้าง</th>
            <th class="text-right font-medium px-4 py-3">การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {#if visible.length === 0}
            <tr>
              <td colspan="6" class="px-4 py-10 text-center text-gray-500"
                >ไม่พบข้อมูลผู้ใช้</td
              >
            </tr>
          {:else}
            {#each visible as u}
              <tr class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold"
                    >
                      {u.fullName
                        .split(" ")
                        .slice(0, 2)
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">{u.fullName}</div>
                      <div class="text-xs text-gray-500">{u.id}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700">{u.email}</td>
                <td class="px-4 py-3">
                  <span
                    class="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                    >{u.role}</span
                  >
                </td>
                <td class="px-4 py-3">
                  <span
                    class={`px-2 py-1 rounded text-xs ${statusBadgeClasses(u.status)}`}
                    >{u.status}</span
                  >
                </td>
                <td class="px-4 py-3 text-gray-600">
                  {new Date(u.createdAt).toLocaleDateString("th-TH")}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      class="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      >ดู</button
                    >
                    <button
                      type="button"
                      class="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      onclick={() => promoteRole(u)}>เลื่อนสิทธิ์</button
                    >
                    <button
                      type="button"
                      class={`px-3 py-1.5 rounded-md border text-white ${u.status === "suspended" ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-600" : "bg-rose-600 hover:bg-rose-700 border-rose-600"}`}
                      onclick={() => toggleSuspend(u)}
                    >
                      {u.status === "suspended" ? "ปลดระงับ" : "ระงับ"}
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white"
    >
      <div class="text-sm text-gray-600">
        แสดง {visible.length} จาก {filtered.length} รายการ
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 h-9 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          disabled={page <= 1}
          onclick={() => (page = page - 1)}>ก่อนหน้า</button
        >
        <span class="text-sm text-gray-700">{page} / {totalPages}</span>
        <button
          type="button"
          class="px-3 h-9 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          disabled={page >= totalPages}
          onclick={() => (page = page + 1)}>ถัดไป</button
        >
      </div>
    </div>
  </div>
</div>