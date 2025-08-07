<script lang="ts">
  import AdminFooter from "$lib/components/AdminFooter.svelte"
  import AdminNavbar from "$lib/components/AdminNavbar.svelte"
  import AdminSidebar from "$lib/components/AdminSidebar.svelte"

  // กำหนดค่าเริ่มต้น
  let { children } = $props()

  // กำหนดค่าเริ่มต้นของ isSidebarMini
  let isSidebarMini = $state(false)
  
</script>

<div class="flex min-h-screen bg-gray-100">
  <AdminSidebar mini={isSidebarMini} />
  <div class="flex-1 flex flex-col">
    <AdminNavbar toggleSidebar={() => (isSidebarMini = !isSidebarMini)} />
    <main class="p-6">
      {@render children?.()}
    </main>
    <AdminFooter />
  </div>
</div>
