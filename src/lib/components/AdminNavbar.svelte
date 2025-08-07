<script lang="ts">
  import { browser } from "$app/environment"
  import { onMount } from "svelte"
  import { authService } from "../../features/auth/services/authService"

  // กำหนดชนิดข้อมูลของ user
  type User = { fullname?: string, username?: string, email?: string, role?: string }

  // กำหนดค่าเริ่มต้น
  let { toggleSidebar } = $props()

  // กำหนดค่าเริ่มต้นของ user
  let user: User | null = $state(null)

  // กำหนดค่าเริ่มต้นของ dropdownOpen
  let dropdownOpen = $state(false)

  // ฟังก์ชันลบออกจากระบบ
  const logout = async () => {
    await authService.logout()
    window.location.href = "/login"
  }

  // ฟังก์ชันสำหรับดึงตัวอักษรตัวแรกของชื่อ
  function getInitials(name?: string) {
    if (!name) return 'NA'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  // อ่านข้อมูลผู้ใช้จาก localStorage เฉพาะฝั่ง client
  onMount(() => {
    if (!browser) return
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        user = JSON.parse(userData)
      } catch (error) {
        console.error("Error parsing user data:", error)
        user = null
      }
    }
  })
</script>

<header class="flex justify-between items-center px-4 h-16 bg-gray-900 text-white sticky top-0 z-40 shadow">
  <!-- Left: Sidebar toggle and brand -->
  <div class="flex items-center gap-3">
    <button
      type="button"
      class="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle sidebar"
      onclick={toggleSidebar}
    >
      <!-- Menu icon -->
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h12M4 18h8" />
      </svg>
    </button>
  </div>

  <!-- Right: Avatar with dropdown -->
  <div class="relative">
    <button
      type="button"
      class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-haspopup="menu"
      aria-expanded={dropdownOpen}
      onclick={() => (dropdownOpen = !dropdownOpen)}
    >
      <div class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
        {getInitials(user?.fullname || user?.username)}
      </div>
      <div class="hidden sm:block text-left">
        <div class="text-sm font-semibold leading-tight">{user?.fullname || 'Admin'}</div>
        <div class="text-xs text-gray-400 leading-tight">{user?.email}</div>
      </div>
      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {#if dropdownOpen}
      <div class="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg border border-gray-200 overflow-hidden">
        <a href="/admin/profile" class="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
        <a href="/admin/settings" class="block px-4 py-2 text-sm hover:bg-gray-100">Setting</a>
        <button
          type="button"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          onclick={logout}
        >
          Logout
        </button>
      </div>
    {/if}
  </div>
</header>
