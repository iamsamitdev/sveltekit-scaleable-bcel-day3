<script lang="ts">
  import { page } from '$app/state'
  let { error, status } = $props()
  const isAdmin = $derived(page.url.pathname.startsWith('/admin'))

  function goHome() {
    location.href = isAdmin ? '/admin/dashboard' : '/'
  }
  function retry() {
    location.reload()
  }
  function goBack() {
    if (history.length > 1) history.back()
    else goHome()
  }
  
  // นำเข้า stylesheet หลัก
  import '../app.css'

  let title = "เกิดข้อผิดพลาด - SvelteKit Scaleable App"
  let description = "เกิดข้อผิดพลาดที่ไม่คาดคิด"
</script>

<svelte:head>
  <title>{status || 500} | {title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="เกิดข้อผิดพลาด, เกิดข้อผิดพลาดที่ไม่คาดคิด, เกิดข้อผิดพลาดที่ไม่คาดคิด" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <meta name="googlebot" content="noindex" />
  <meta name="google" content="notranslate" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
  <div class="max-w-2xl w-full text-center">
    <div class="mx-auto mb-8 w-28 h-28 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
      <!-- ไอคอนตกแต่ง -->
      <svg class="w-12 h-12 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <h1 class="text-5xl font-extrabold tracking-tight text-gray-900">{status || 500}</h1>
    <p class="mt-3 text-xl text-gray-700 font-semibold">{status === 404 ? 'ไม่พบหน้าที่คุณต้องการ' : 'เกิดข้อผิดพลาดที่ไม่คาดคิด'}</p>
    <p class="mt-2 text-gray-600">{error?.message || 'ขออภัยในความไม่สะดวก กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ'}</p>

    <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
      <button type="button" class="px-5 h-11 rounded-lg bg-gray-900 hover:bg-black text-white" onclick={goHome}>
        {isAdmin ? 'ไปหน้า Dashboard' : 'กลับหน้าแรก'}
      </button>
      <button type="button" class="px-5 h-11 rounded-lg bg-white border border-gray-300 text-gray-800 hover:bg-gray-50" onclick={goBack}>
        ย้อนกลับ
      </button>
      <button type="button" class="px-5 h-11 rounded-lg bg-blue-600 text-white hover:bg-blue-700" onclick={retry}>
        ลองใหม่
      </button>
    </div>

    <div class="mt-10 text-sm text-gray-500">
      <p>URL: <span class="font-mono">{page.url.pathname}</span></p>
    </div>  
  </div>
</div>