<script lang="ts">
  // Basic profile state
  let name = $state('Admin User')
  let username = $state('admin')
  let email = $state('admin@example.com')
  let phone = $state('089-123-4567')
  let department = $state('IT Operation')
  let role = $state('Administrator')

  // Password
  let currentPassword = $state('')
  let newPassword = $state('')
  let confirmPassword = $state('')

  // Avatar preview (placeholder)
  let avatarUrl = $state<string | null>(null)

  function onPickAvatar(event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      avatarUrl = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  function saveProfile() {
    // mock save
    alert('บันทึกโปรไฟล์เรียบร้อย')
  }

  function changePassword() {
    if (newPassword.length < 6) {
      alert('รหัสผ่านใหม่ต้องอย่างน้อย 6 ตัวอักษร')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('ยืนยันรหัสผ่านไม่ตรงกัน')
      return
    }
    alert('เปลี่ยนรหัสผ่านสำเร็จ')
    currentPassword = ''
    newPassword = ''
    confirmPassword = ''
  }

  const activities = [
    { title: 'เข้าสู่ระบบ', time: 'วันนี้ 09:12' },
    { title: 'แก้ไขผู้ใช้ U-1003', time: 'เมื่อวาน 16:45' },
    { title: 'อัปเดตการตั้งค่าระบบ', time: '26 ม.ค. 10:22' },
    { title: 'ส่งออกข้อมูลสินค้า', time: '24 ม.ค. 14:03' }
  ]
</script>

<div class="space-y-6">
  <!-- Header -->
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">โปรไฟล์ผู้ใช้</h1>
    <p class="text-gray-600">ดูและแก้ไขข้อมูลส่วนตัว การเข้าสู่ระบบ และความปลอดภัย</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Left: Profile card -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-4">
      <div class="flex flex-col items-center text-center">
        <div class="relative group">
          <div class="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
            {#if avatarUrl}
              <img src={avatarUrl} alt="avatar" class="w-28 h-28 rounded-full object-cover bg-white ring-4 ring-white shadow" />
            {:else}
              <div class="w-28 h-28 rounded-full bg-white ring-4 ring-white shadow flex items-center justify-center">
                <div class="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
                  {name.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase()}
                </div>
              </div>
            {/if}
          </div>
          <label class="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gray-900/90 text-white shadow-md flex items-center justify-center cursor-pointer border border-white transition-transform duration-150 group-hover:scale-105" title="เปลี่ยนรูปภาพ">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M4 13V7a2 2 0 012-2h6m4 4L8 18H4v-4l8-8" />
            </svg>
            <input type="file" accept="image/*" class="hidden" onchange={onPickAvatar} />
          </label>
        </div>
        <div class="mt-4">
          <div class="text-lg font-semibold text-gray-900">{name}</div>
          <div class="text-sm text-gray-500">{email}</div>
        </div>
        <div class="w-full grid grid-cols-2 gap-3 mt-6">
          <div class="bg-gray-50 rounded-lg p-3">
            <div class="text-xs text-gray-500">ตำแหน่ง</div>
            <div class="text-sm font-medium text-gray-800">{role}</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <div class="text-xs text-gray-500">แผนก</div>
            <div class="text-sm font-medium text-gray-800">{department}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Right: Forms -->
    <div class="lg:col-span-8 space-y-8">
      <!-- Profile info -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">ข้อมูลส่วนตัว</h2>
          <button type="button" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium" onclick={saveProfile}>บันทึก</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="name">ชื่อ-นามสกุล</label>
            <input id="name" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={name} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="username">ชื่อผู้ใช้</label>
            <input id="username" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={username} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="email">อีเมล</label>
            <input id="email" type="email" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={email} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="phone">เบอร์โทร</label>
            <input id="phone" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={phone} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="department">แผนก</label>
            <input id="department" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={department} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="role">สิทธิ์การใช้งาน</label>
            <input id="role" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={role} />
          </div>
        </div>
      </section>

      <!-- Password -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">เปลี่ยนรหัสผ่าน</h2>
          <button type="button" class="px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-medium" onclick={changePassword}>เปลี่ยนรหัสผ่าน</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="current">รหัสผ่านปัจจุบัน</label>
            <input id="current" type="password" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={currentPassword} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="new">รหัสผ่านใหม่</label>
            <input id="new" type="password" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={newPassword} />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="confirm">ยืนยันรหัสผ่าน</label>
            <input id="confirm" type="password" class="w-full h-12 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={confirmPassword} />
          </div>
        </div>
      </section>

      <!-- Activity -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h2>
          <a href="#" class="text-sm text-blue-600 hover:underline">ดูทั้งหมด</a>
        </div>
        <ul class="space-y-3">
          {#each activities as a}
            <li class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center" aria-hidden="true">🕒</div>
                <div>
                  <div class="font-medium text-gray-900">{a.title}</div>
                  <div class="text-xs text-gray-500">{a.time}</div>
                </div>
              </div>
              <button class="text-sm text-gray-500 hover:text-gray-700">รายละเอียด</button>
            </li>
          {/each}
        </ul>
      </section>
    </div>
  </div>
</div>

