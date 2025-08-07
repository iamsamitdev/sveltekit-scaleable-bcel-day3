<script lang="ts">

  import { page } from '$app/state'

  let mobileMenuOpen = $state(false)
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen
  }

  function closeMobileMenu() {
    mobileMenuOpen = false
  }

  function isActive(href: string): boolean {
    if (href === '/') {
      return page.url.pathname === '/'
    }
    return page.url.pathname.startsWith(href)
  }
</script>

<nav class="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-lg z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center space-x-2">
          <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-xl font-bold">SvelteKit App</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          <a 
            href="/" 
            class={`${isActive('/') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
          >
            หน้าหลัก
          </a>
          <a 
            href="/about" 
            class={`${isActive('/about') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
          >
            เกี่ยวกับเรา
          </a>
          <a 
            href="/services" 
            class={`${isActive('/services') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
          >
            บริการ
          </a>
          <a 
            href="/contact" 
            class={`${isActive('/contact') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
          >
            ติดต่อเรา
          </a>
        </div>
      </div>

      <!-- Desktop Auth Buttons -->
      <div class="hidden md:block">
        <div class="ml-4 flex items-center space-x-4">
          <a 
            href="/login" 
            class={`${isActive('/login') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} px-4 py-2 rounded-md text-sm font-medium transition-colors`}
          >
            เข้าสู่ระบบ
          </a>
          <a 
            href="/register" 
            class={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/register') ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900' : ''}`}
          >
            สมัครสมาชิก
          </a>
        </div>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          type="button"
          class="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-expanded="false"
          aria-label="เปิดเมนู"
          onclick={toggleMobileMenu}
        >
          {#if !mobileMenuOpen}
            <!-- Hamburger icon -->
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {:else}
            <!-- Close icon -->
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation Menu -->
  {#if mobileMenuOpen}
    <div class="md:hidden bg-gray-800">
      <div class="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
        <a 
          href="/" 
          class={`${isActive('/') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          onclick={closeMobileMenu}
        >
          หน้าหลัก
        </a>
        <a 
          href="/about" 
          class={`${isActive('/about') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          onclick={closeMobileMenu}
        >
          เกี่ยวกับเรา
        </a>
        <a 
          href="/services" 
          class={`${isActive('/services') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          onclick={closeMobileMenu}
        >
          บริการ
        </a>
        <a 
          href="/contact" 
          class={`${isActive('/contact') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          onclick={closeMobileMenu}
        >
          ติดต่อเรา
        </a>
        
        <!-- Mobile Auth Buttons -->
        <div class="pt-4 pb-2 border-t border-gray-700 space-y-2">
          <a 
            href="/login" 
            class={`${isActive('/login') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onclick={closeMobileMenu}
          >
            เข้าสู่ระบบ
          </a>
          <a 
            href="/register" 
            class={`bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/register') ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800' : ''}`}
            onclick={closeMobileMenu}
          >
            สมัครสมาชิก
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>

<!-- Spacer to prevent content from hiding under fixed navbar -->
<div class="h-16"></div>
