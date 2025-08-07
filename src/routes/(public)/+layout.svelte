<script lang="ts">
  import "../../app.css"
  import favicon from "$lib/assets/favicon.svg"
  import MainLayout from "$lib/layouts/MainLayout.svelte"

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<MainLayout>
  {@render children?.()}
</MainLayout>
