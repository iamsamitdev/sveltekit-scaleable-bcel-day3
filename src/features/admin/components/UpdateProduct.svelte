<script lang="ts">
  import { onMount } from "svelte"
  import { productService } from "../../admin/services"
  let { id } = $props()

  // Environment variables
  const VITE_API_IMAGE_URL =
    import.meta.env.VITE_API_IMAGE_URL ||
    "https://geniusdevlab.com/laravelstoreapp/public/uploads"

  // สถานะฟอร์ม
  let loading = $state(false)
  let saving = $state(false)
  let error: string | null = $state(null)
  let success: string | null = $state(null)

  // ฟิลด์
  let name = $state("")
  let slug = $state("")
  let price: number | "" = $state("")
  let categoryId: number | "" = $state("")
  let description = $state("")
  let imageFile: File | null = $state(null)
  let previewUrl: string | null = $state(null)
  let originalImage: string | null = $state(null)
  let fileInputEl: HTMLInputElement | null = $state(null)

  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0] || null
    imageFile = file
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    previewUrl = file ? URL.createObjectURL(file) : null
  }
  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    previewUrl = null
    imageFile = null
    if (fileInputEl) fileInputEl.value = ""
  }

  // สร้าง URL รูปภาพที่สมบูรณ์
  function getImageUrl(imagePath: string | null | undefined): string | null {
    if (!imagePath) return null

    // ถ้าเป็น URL เต็มแล้ว (http/https) ก็ใช้ตรงๆ
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath
    }

    // ถ้าไม่ใช่ ให้รวมกับ base URL
    return `${VITE_API_IMAGE_URL}/${imagePath}`
  }

  // โหลดข้อมูลเดิม
  onMount(async () => {
    try {
      loading = true
      const res = await productService.getProduct(id)
      if (res && res.status) {
        const p = res.product
        name = p.name
        slug = p.slug
        price = p.price
        categoryId = p.category_id
        description = p.description
        originalImage = p.image || null
      } else {
        error = "ไม่พบข้อมูลสินค้า"
      }
    } catch (e) {
      error = "เกิดข้อผิดพลาดในการโหลดข้อมูล"
    } finally {
      loading = false
    }
  })

  async function handleSubmit(e: Event) {
    e.preventDefault()
    if (saving) return
    error = null
    success = null
    try {
      saving = true
      const form = new FormData()
      form.append("name", name.trim())
      form.append("slug", slug.trim())
      form.append("price", String(price || 0))
      form.append("category_id", String(categoryId || ""))
      if (description.trim()) form.append("description", description.trim())
      if (imageFile) form.append("image", imageFile)
      // ใช้ method override เป็น PUT ใน service
      const res = await productService.updateProduct(id, form)
      if (res && res.status) {
        success = "อัปเดตสินค้าสำเร็จ"
        if (imageFile && previewUrl) {
          originalImage = previewUrl
        }
        imageFile = null
        if (fileInputEl) fileInputEl.value = ""
      } else {
        error = "อัปเดตสินค้าไม่สำเร็จ"
      }
    } catch (e) {
      error = "เกิดข้อผิดพลาดระหว่างอัปเดตสินค้า"
    } finally {
      saving = false
    }
  }
</script>

{#if loading}
  <div class="flex items-center gap-3 text-gray-600">
    <div
      class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-top-transparent"
    ></div>
    กำลังโหลดข้อมูล...
  </div>
{:else}
  <form class="space-y-6" onsubmit={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >ชื่อสินค้า</label
        >
        <input
          id="name"
          class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={name}
          required
        />
      </div>
      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700"
          >Slug</label
        >
        <input
          id="slug"
          class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={slug}
          required
        />
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700"
          >ราคา</label
        >
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={price}
          required
        />
      </div>
      <div>
        <label for="category_id" class="block text-sm font-medium text-gray-700"
          >หมวดหมู่ (Category ID)</label
        >
        <input
          id="category_id"
          type="number"
          min="1"
          class="mt-1 w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={categoryId}
          required
        />
      </div>
      <div class="md:col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >รายละเอียด</label
        >
        <textarea
          id="description"
          rows="4"
          class="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={description}
        ></textarea>
      </div>
    </div>

    <div>
      <label for="image" class="block text-sm font-medium text-gray-700"
        >รูปภาพสินค้า</label
      >
      <input
        id="image"
        type="file"
        accept="image/*"
        class="mt-1 block w-full"
        onchange={onFileChange}
        bind:this={fileInputEl}
      />
      <div class="mt-3 flex items-center gap-3">
        <div class="relative h-32 w-32">
          <div
            class="h-full w-full rounded-lg overflow-hidden ring-2 ring-white shadow bg-gray-100 flex items-center justify-center"
          >
            {#if previewUrl}
              <img
                src={previewUrl}
                alt="preview"
                class="h-full w-full object-cover"
              />
            {:else if originalImage}
              {@const imageUrl = getImageUrl(originalImage)}
              {#if imageUrl}
                <img
                  src={imageUrl}
                  alt={name || "สินค้า"}
                  class="h-full w-full object-cover"
                />
              {:else}
                <svg
                  class="w-10 h-10 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7l9-4 9 4-9 4-9-4z"
                  /><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 7v10l-9 4-9-4V7"
                  /><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 17l9-4 9 4"
                  /></svg
                >
              {/if}
            {:else}
              <svg
                class="w-10 h-10 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7l9-4 9 4-9 4-9-4z"
                /><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 7v10l-9 4-9-4V7"
                /><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 17l9-4 9 4"
                /></svg
              >
            {/if}
          </div>
          {#if previewUrl}
            <button
              type="button"
              aria-label="ลบรูป"
              class="absolute -top-2 -right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-red-600 border border-red-200 shadow hover:bg-red-50"
              onclick={clearImage}
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                /></svg
              >
            </button>
          {/if}
        </div>
      </div>
    </div>

    {#if error}
      <div class="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
        {error}
      </div>
    {/if}
    {#if success}
      <div
        class="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3"
      >
        {success}
      </div>
    {/if}

    <div class="flex items-center gap-3">
      <button
        type="submit"
        class="px-5 h-11 rounded-lg bg-gray-900 hover:bg-black text-white disabled:opacity-50"
        disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}</button
      >
      <a
        href="/admin/products"
        class="px-4 h-11 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center"
        >ยกเลิก</a
      >
    </div>
  </form>
{/if}