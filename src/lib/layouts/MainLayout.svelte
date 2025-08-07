<script>
  import Footer from "$lib/components/Footer.svelte"
  import Navbar from "$lib/components/Navbar.svelte"
  let { children } = $props()
</script>

<div class="min-h-screen flex flex-col">
  <Navbar />
  <main class="flex-1">
    {@render children?.()}
  </main>
  <Footer />
</div>
