<script lang="ts">
  import UpdateProduct from '$features/admin/components/UpdateProduct.svelte'
  // ดึง query param id จาก URL
  import { page } from '$app/state'
  const idParam = page.url.searchParams.get('id')
  const id = idParam ? Number(idParam) : NaN
  const title = 'แก้ไขสินค้า'
  const description = 'อัปเดตข้อมูลสินค้าและรูปภาพแบบ multipart/form-data'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="px-4 py-6">
  <div class="mb-4">
    <a href="/admin/products" class="inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      <span>ย้อนกลับ</span>
    </a>
  </div>
  <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h1>
  {#if Number.isFinite(id)}
    {@const pid = Number(id)}
    <UpdateProduct id={pid} />
  {:else}
    <div class="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">ไม่พบรหัสสินค้า</div>
  {/if}
</div>

