<script lang="ts">
  import { page } from '$app/state'
  
  // กำหนดค่าเริ่มต้น
  let { mini = false } = $props()

  // เมนู
  const items = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '🛒' },
    { href: '/admin/users', label: 'Users (Normal)', icon: '👥' },
    { href: '/admin/userstanstack', label: 'Users Tanstack', icon: '👥' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ]

  function isActive(href: string): boolean {
    const path = page.url.pathname
    if (href === '/admin' || href === '/admin/dashboard') {
      return path === '/admin' || path === '/admin/dashboard'
    }
    return path === href || path.startsWith(href + '/')
  }
</script>

<nav class={`h-screen bg-gray-800 text-white ${mini ? 'w-16' : 'w-64'} p-3 sticky top-0`}>
  <!-- Brand -->
  <div class="flex items-center gap-3 px-3 py-3 mb-2 border-b border-gray-700">
    <div class="w-8 h-8 p-4 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
      SV
    </div>
    {#if !mini}
      <span class="text-lg font-semibold tracking-wide">SvelteKit Admin</span>
    {/if}
  </div>

  <ul class="space-y-1">
    {#each items as item}
      <li>
        <a href={item.href}
           class={`${isActive(item.href) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'} flex items-center gap-3 px-3 py-2 rounded-md transition-colors`}
           aria-current={isActive(item.href) ? 'page' : undefined}
        >
          <span class="text-lg" aria-hidden="true">{item.icon}</span>
          {#if !mini}
            <span class="truncate">{item.label}</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</nav>
