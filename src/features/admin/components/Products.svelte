<script lang="ts">
  import { onMount } from "svelte"
  import { productService } from "../../admin/services"
  import type { Product } from "$lib/types/product"

  // คำอธิบาย: URL สำหรับรูปภาพจาก API
  const VITE_API_IMAGE_URL =
    import.meta.env.VITE_API_IMAGE_URL ||
    "https://geniusdevlab.com/laravelstoreapp/public/uploads"

  // คำอธิบาย: สถานะหลักของหน้า (รายการสินค้า, โหลด, ข้อผิดพลาด)
  let products: Product[] = $state([])
  let loading: boolean = $state(false)
  let error: string | null = $state(null)

  // คำอธิบาย: ค้นหา + แบ่งหน้าแบบเรียบง่าย
  let query: string = $state("")
  let page: number = $state(1)
  const pageSize = 10
  let total = $state(0)

  // คำอธิบาย: ป้องกันการยิง API ซ้ำ/ซ้อน ด้วย AbortController
  let abortController: AbortController | null = null

  // คำอธิบาย: ฟังก์ชันดึงข้อมูลจาก service (ย่อ/อ่านง่าย)
  async function fetchProducts() {
    if (loading) return
    // ยกเลิกคำขอก่อนหน้า (ถ้ายังไม่เสร็จ)
    if (abortController) abortController.abort()
    abortController = new AbortController()

    try {
      loading = true
      error = null
      const result = await productService.getProducts(
        page,
        query,
        pageSize,
        abortController.signal
      )
      // รองรับทั้งรูปแบบ { status, products, total } และ array ตรง ๆ
      if (Array.isArray(result)) {
        products = result
        total = result.length
      } else if (result && result.status) {
        products = result.products || []
        total = result.total || 0
      } else {
        products = []
        total = 0
        error = "ไม่พบข้อมูลสินค้า"
      }
    } catch (err) {
      if (!(abortController && abortController.signal.aborted)) {
        error = "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า"
        products = []
        total = 0
      }
    } finally {
      if (!(abortController && abortController.signal.aborted)) {
        loading = false
      }
    }
  }

  // คำอธิบาย: เรียกครั้งแรกเมื่อ component mount
  onMount(() => {
    fetchProducts()
  })

  // คำอธิบาย: ฟังก์ชันผู้ช่วยแสดงราคา/วันที่
  function formatPrice(price: number) {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price)
  }
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("th-TH")
  }

  // คำอธิบาย: สร้าง URL รูปภาพที่สมบูรณ์
  function getImageUrl(imagePath: string | null | undefined): string | null {
    if (!imagePath) return null

    // ถ้าเป็น URL เต็มแล้ว (http/https) ก็ใช้ตรงๆ
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath
    }

    // ถ้าไม่ใช่ ให้รวมกับ base URL
    return `${VITE_API_IMAGE_URL}/${imagePath}`
  }

  // คำอธิบาย: จัดการรูปภาพที่โหลดไม่สำเร็จ เพื่อโชว์ภาพตัวอย่างแทน
  let imageErrors: Set<number> = $state(new Set())
  function handleImageError(id: number, _e?: Event) {
    imageErrors.add(id)
    imageErrors = new Set(imageErrors)
  }

  // คำอธิบาย: สถานะ modal สำหรับดูรายละเอียดสินค้าแบบ popup
  let showModal = $state(false)
  let modalLoading = $state(false)
  let selected: Product | null = $state(null)
  let viewAbort: AbortController | null = null

  async function openView(id: number) {
    if (modalLoading) return
    // ยกเลิกคำขอก่อนหน้าถ้ามี
    if (viewAbort) viewAbort.abort()
    viewAbort = new AbortController()
    try {
      modalLoading = true
      selected = null
      showModal = true
      const res = await productService.getProduct(id, viewAbort.signal)
      if (res && res.status) {
        selected = res.product
      } else {
        selected = null
      }
    } catch (e) {
      selected = null
    } finally {
      if (!(viewAbort && viewAbort.signal.aborted)) modalLoading = false
    }
  }
  function closeModal() {
    if (viewAbort) viewAbort.abort()
    showModal = false
    selected = null
  }

  // คำอธิบาย: ยืนยันการลบสินค้า
  let confirmOpen = $state(false)
  let deleting = $state(false)
  let deleteId: number | null = $state(null)
  let deleteName: string | null = $state(null)
  let deleteError: string | null = $state(null)

  // คำอธิบาย: ยืนยันการลบสินค้า
  function askDelete(p: Product) {
    deleteId = p.id
    deleteName = p.name
    deleteError = null
    confirmOpen = true
  }

  // คำอธิบาย: ปิดหน้ายืนยันการลบสินค้า
  function closeConfirm() {
    if (deleting) return
    confirmOpen = false
    deleteId = null
    deleteName = null
    deleteError = null
  }

  // คำอธิบาย: ยืนยันการลบสินค้า
  async function confirmDelete() {
    if (!deleteId || deleting) return
    deleteError = null
    try {
      deleting = true
      const res = await productService.deleteProduct(deleteId)
      if (res && (res as any).status) {
        // ปรับหน้าเมื่อเหลือรายการสุดท้ายบนหน้านี้
        if (products.length === 1 && page > 1) {
          page = page - 1
        }
        confirmOpen = false
        await fetchProducts()
      } else {
        deleteError = (res as any)?.message || "ลบสินค้าไม่สำเร็จ"
      }
    } catch (e) {
      deleteError = "เกิดข้อผิดพลาดระหว่างลบสินค้า"
    } finally {
      deleting = false
    }
  }

  // คำอธิบาย: ค้นหาใหม่ให้กลับหน้า 1 แล้วดึงข้อมูล
  function handleSearch() {
    page = 1
    fetchProducts()
  }

  // คำอธิบาย: เปลี่ยนหน้าแบบเรียบง่าย
  function goTo(newPage: number) {
    if (newPage < 1) return
    const maxPage = Math.max(1, Math.ceil(total / pageSize))
    if (newPage > maxPage) return
    page = newPage
    fetchProducts()
  }

  // คำอธิบาย: คำนวณเพจสูงสุด + หน้าปัจจุบันสำหรับปุ่ม
  const maxPage = $derived(Math.max(1, Math.ceil(total / pageSize)))
  const isFirstPage = $derived(page <= 1)
  const isLastPage = $derived(page >= maxPage)

  // คำอธิบาย: สร้างรายการเลขหน้าแบบมี ... (เช่น 1 … 4 5 6 … 10)
  function getPageItems(current: number, totalPages: number, siblingCount = 1) {
    const pages = new Set<number>()
    pages.add(1)
    pages.add(totalPages)
    pages.add(current)
    for (let i = 1; i <= siblingCount; i += 1) {
      if (current - i >= 1) pages.add(current - i)
      if (current + i <= totalPages) pages.add(current + i)
    }
    const sorted = Array.from(pages).sort((a, b) => a - b)
    const output: Array<number | "..."> = []
    for (let i = 0; i < sorted.length; i += 1) {
      const a = sorted[i]
      const b = sorted[i + 1]
      output.push(a)
      if (b !== undefined && b - a > 1) output.push("...")
    }
    return output
  }

  // คำอธิบาย: สร้างรายการเลขหน้าแบบมี ... (เช่น 1 … 4 5 6 … 10)
  const pageItems = $derived(getPageItems(page, maxPage, 1))
</script>

<div class="space-y-6">
  <!-- ส่วนหัว + ค้นหาที่เรียบง่าย -->
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">สินค้า</h1>
    <div
      class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center"
    >
      <input
        class="flex-1 sm:w-64 h-10 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="ค้นหาชื่อสินค้า..."
        bind:value={query}
        onkeydown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        type="button"
        class="px-4 h-10 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-medium"
        onclick={handleSearch}>ค้นหา</button
      >
      <a
        href="/admin/products/create"
        class="px-4 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center justify-center"
        >เพิ่มสินค้า</a
      >
    </div>
  </div>

  <!-- สถานะโหลด / ผิดพลาด -->
  {#if loading}
    <div class="flex items-center gap-3 text-gray-600">
      <div
        class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"
      ></div>
      กำลังโหลดข้อมูล...
    </div>
  {:else if error}
    <div class="text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
      {error}
    </div>
  {:else}
    <!-- ตารางแบบเรียบง่าย -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div
        class="px-4 py-3 bg-gray-50 border-b border-gray-300 text-sm text-gray-600"
      >
        พบ {total} รายการ | หน้า {page} / {maxPage}
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left font-medium px-4 py-3">รูปภาพ</th>
              <th class="text-left font-medium px-4 py-3">ชื่อสินค้า</th>
              <th class="text-left font-medium px-4 py-3">หมวดหมู่</th>
              <th class="text-left font-medium px-4 py-3">ราคา</th>
              <th class="text-left font-medium px-4 py-3">วันที่สร้าง</th>
              <th class="text-left font-medium px-4 py-3">วันที่แก้ไข</th>
              <th class="text-right font-medium px-4 py-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {#if products.length === 0}
              <tr>
                <td colspan="6" class="px-4 py-10 text-center text-gray-500"
                  >ไม่พบสินค้า</td
                >
              </tr>
            {:else}
              {#each products as p}
                <tr class="border-t border-gray-100 hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <div
                      class="h-14 w-14 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden"
                    >
                      {#if p.image && !imageErrors.has(p.id)}
                        {@const imageUrl = getImageUrl(p.image)}
                        {#if imageUrl}
                          <img
                            src={imageUrl}
                            alt={p.name}
                            class="h-full w-full object-cover"
                            onerror={(e) => handleImageError(p.id, e)}
                          />
                        {:else}
                          <!-- ภาพตัวอย่างแบบไอคอนสินค้า -->
                          <svg
                            class="w-7 h-7 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        {/if}
                      {:else}
                        <!-- ภาพตัวอย่างแบบไอคอนสินค้า -->
                        <svg
                          class="w-7 h-7 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 7l9-4 9 4-9 4-9-4z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 7v10l-9 4-9-4V7"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 17l9-4 9 4"
                          />
                        </svg>
                      {/if}
                    </div>
                  </td>
                  <td class="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                  <td class="px-4 py-3 text-gray-700"
                    >{p.category_name || "ไม่ระบุ"}</td
                  >
                  <td class="px-4 py-3 text-gray-900">{formatPrice(p.price)}</td
                  >
                  <td class="px-4 py-3 text-gray-600"
                    >{formatDate(p.created_at)}</td
                  >
                  <td class="px-4 py-3 text-gray-600"
                    >{formatDate(p.updated_at)}</td
                  >
                  <td class="px-4 py-3 text-right flex gap-2 justify-end">
                    <button
                      type="button"
                      class="px-3 py-1.5 rounded-md bg-white border border-sky-300 text-sky-700 hover:bg-sky-50 cursor-pointer"
                      onclick={() => openView(p.id)}>ดู</button
                    >
                    <a
                      href={`/admin/products/update?id=${p.id}`}
                      class="px-3 py-1.5 rounded-md bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer"
                      >แก้ไข</a
                    >
                    <button
                      type="button"
                      class="px-3 py-1.5 rounded-md bg-white border border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                      onclick={() => askDelete(p)}>ลบ</button
                    >
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>

      <!-- แบ่งหน้าแบบเลขหน้า + ... -->
      <div
        class="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-300"
      >
        <button
          type="button"
          class="px-3 h-9 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          disabled={isFirstPage}
          onclick={() => goTo(page - 1)}
          aria-label="ก่อนหน้า">ก่อนหน้า</button
        >

        <nav class="flex items-center gap-1" aria-label="Pagination">
          {#each pageItems as item}
            {#if item === "..."}
              <span
                class="px-3 h-9 inline-flex items-center justify-center text-gray-400 select-none"
                >...</span
              >
            {:else}
              <button
                type="button"
                class={`min-w-9 px-3 h-9 rounded-md border ${item === page ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                aria-current={item === page ? "page" : undefined}
                onclick={() => goTo(item)}>{item}</button
              >
            {/if}
          {/each}
        </nav>

        <button
          type="button"
          class="px-3 h-9 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          disabled={isLastPage}
          onclick={() => goTo(page + 1)}
          aria-label="ถัดไป">ถัดไป</button
        >
      </div>
    </div>
  {/if}
</div>

{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="absolute inset-0 bg-black/40"
      onclick={closeModal}
      aria-hidden="true"
    ></div>
    <div
      class="relative bg-white rounded-xl shadow-xl w-[min(92vw,720px)] max-h-[90vh] overflow-auto"
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-gray-200"
      >
        <h2 class="text-lg font-semibold">รายละเอียดสินค้า</h2>
        <button
          type="button"
          class="p-2 rounded-md hover:bg-gray-100"
          aria-label="ปิด"
          onclick={closeModal}
        >
          <svg
            class="w-5 h-5"
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
      </div>
      <div class="p-4 border-t border-gray-200">
        {#if modalLoading}
          <div class="flex items-center gap-3 text-gray-600">
            <div
              class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"
            ></div>
            กำลังโหลด...
          </div>
        {:else if !selected}
          <div class="text-gray-600">ไม่พบข้อมูลสินค้า</div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-1">
              <div
                class="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
              >
                {#if selected.image}
                  {@const imageUrl = getImageUrl(selected.image)}
                  {#if imageUrl}
                    <img
                      src={imageUrl}
                      alt={selected.name}
                      class="h-full w-full object-cover"
                      onerror={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.display =
                          "none")}
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
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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
            </div>
            <div class="md:col-span-2 space-y-2">
              <div class="text-xl font-semibold text-gray-900">
                {selected.name}
              </div>
              <div class="text-gray-700">{selected.description}</div>
              <div class="text-gray-900 font-medium">
                ราคา: {formatPrice(selected.price)}
              </div>
              <div class="text-gray-600">
                หมวดหมู่: {selected.category_name || selected.category_id}
              </div>
              <div class="text-gray-600">
                วันที่สร้าง: {formatDate(selected.created_at)}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

{#if confirmOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="absolute inset-0 bg-black/40"
      onclick={closeConfirm}
      aria-hidden="true"
    ></div>
    <div class="relative bg-white rounded-xl shadow-xl w-[min(92vw,480px)]">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">ยืนยันการลบสินค้า</h3>
      </div>
      <div class="px-6 py-4 space-y-2">
        <p class="text-gray-700">
          คุณต้องการลบสินค้า <span class="font-medium">{deleteName}</span> ใช่ไหม?
        </p>
        {#if deleteError}
          <div
            class="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3"
          >
            {deleteError}
          </div>
        {/if}
      </div>
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
        <button
          type="button"
          class="px-4 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          onclick={closeConfirm}
          disabled={deleting}>ยกเลิก</button
        >
        <button
          type="button"
          class="px-4 h-10 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          onclick={confirmDelete}
          disabled={deleting}>{deleting ? "กำลังลบ..." : "ลบ"}</button
        >
      </div>
    </div>
  </div>
{/if}