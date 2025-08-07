<script lang="ts">
  import Products from '$features/admin/components/Products.svelte'
  const title = 'Products - SvelteKit Scaleable App '
  const description = 'รายการสินค้าแบบเรียบง่าย ค้นหาและแบ่งหน้า'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="og:title" content={title} />
  <meta name="og:description" content={description} />
</svelte:head>

<div class="px-4 py-6">
  <Products />
</div>
