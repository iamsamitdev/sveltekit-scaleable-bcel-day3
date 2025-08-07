<script lang="ts">
  import CreateProduct from '$features/admin/components/CreateProduct.svelte'
  const title = 'เพิ่มสินค้าใหม่'
  const description = 'เพิ่มสินค้าใหม่และอัปโหลดรูปภาพ แบบ multipart/form-data'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="px-4 py-6">
  <div class="mb-4">
    <a href="/admin/products" class="inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>ย้อนกลับ</span>
    </a>
  </div>
  <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h1>
  <CreateProduct />
</div>

