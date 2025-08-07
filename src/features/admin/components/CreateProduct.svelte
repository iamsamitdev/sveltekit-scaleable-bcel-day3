<script lang="ts">
  import { productService } from '../../admin/services'
  import type { Product } from '$lib/types/product'

  // ฟอร์มสถานะ
  let name = $state('')
  let slug = $state('')
  let price: number | '' = $state('')
  let categoryId: number | '' = $state('')
  let description = $state('')
  let imageFile: File | null = $state(null)
  let fileInputEl: HTMLInputElement | null = null

  let previewUrl: string | null = $state(null)
  let loading = $state(false)
  let error: string | null = $state(null)
  let success: string | null = $state(null)

  // เมื่อเลือกไฟล์ แสดงพรีวิว
  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0] || null
    imageFile = file
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    previewUrl = file ? URL.createObjectURL(file) : null
  }

  // ลบไฟล์รูปที่เลือกและล้างพรีวิว
  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    previewUrl = null
    imageFile = null
    if (fileInputEl) fileInputEl.value = ''
  }

  // แปลงค่าไปเป็น FormData ตาม API ที่แนบ
  async function handleSubmit(e: Event) {
    e.preventDefault()
    error = null
    success = null
    if (loading) return

    try {
      loading = true
      const form = new FormData()
      form.append('name', name.trim())
      form.append('slug', slug.trim())
      form.append('price', String(price || 0))
      form.append('category_id', String(categoryId || ''))
      if (description.trim()) form.append('description', description.trim())
      if (imageFile) form.append('image', imageFile)

      const res = await productService.createProduct(form)
      if (res && (res as any).status) {
        success = 'เพิ่มสินค้าสำเร็จ'
        // เคลียร์ฟอร์ม
        name = ''
        slug = ''
        price = ''
        categoryId = ''
        description = ''
        imageFile = null
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        previewUrl = null
      } else {
        error = 'เพิ่มสินค้าไม่สำเร็จ'
      }
    } catch (err) {
      error = 'เกิดข้อผิดพลาดระหว่างบันทึกสินค้า'
    } finally {
      loading = false
    }
  }
</script>

<form class="space-y-6" onsubmit={handleSubmit}>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">ชื่อสินค้า</label>
      <input id="name" class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={name} required />
    </div>
    <div>
      <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
      <input id="slug" class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={slug} required />
    </div>
    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">ราคา</label>
      <input id="price" type="number" min="0" step="0.01" class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={price} required />
    </div>
    <div>
      <label for="category_id" class="block text-sm font-medium text-gray-700">หมวดหมู่ (Category ID)</label>
      <input id="category_id" type="number" min="1" class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={categoryId} required />
    </div>
    <div class="md:col-span-2">
      <label for="description" class="block text-sm font-medium text-gray-700">รายละเอียด</label>
      <textarea id="description" rows="4" class="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={description}></textarea>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="image" class="block text-sm font-medium text-gray-700">รูปภาพสินค้า</label>
      <input id="image" type="file" accept="image/*" class="mt-1 block w-full" onchange={onFileChange} bind:this={fileInputEl} />
      {#if previewUrl}
        <div class="mt-3 relative h-32 w-32">
          <div class="h-full w-full rounded-lg overflow-hidden ring-2 ring-white shadow">
            <img src={previewUrl} alt="preview" class="h-full w-full object-cover" />
          </div>
          <button
            type="button"
            aria-label="ลบรูป"
            class="absolute -top-2 -right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-red-600 border border-red-200 shadow hover:bg-red-50"
            onclick={clearImage}
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if}
    </div>
  </div>

  {#if error}
    <div class="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
  {/if}
  {#if success}
    <div class="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{success}</div>
  {/if}

  <div class="flex items-center gap-3">
    <button type="submit" class="px-5 h-11 rounded-lg bg-gray-900 hover:bg-black text-white disabled:opacity-50" disabled={loading}>
      {loading ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
    </button>
    <a href="/admin/products" class="px-4 h-11 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center">ยกเลิก</a>
  </div>
</form>

