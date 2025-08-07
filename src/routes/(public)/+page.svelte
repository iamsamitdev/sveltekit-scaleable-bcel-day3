<script>
  let title = "หน้าหลัก - SvelteKit Scaleable App"
  let description = "แอปพลิเคชันที่ออกแบบมาเพื่อรองรับการขยายตัว พร้อมระบบจัดการที่ทันสมัย"
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="หน้าหลัก, แอปพลิเคชัน, ระบบจัดการ" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="google" content="notranslate" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        ยินดีต้อนรับสู่ <br />
        <span class="text-yellow-300">SvelteKit App</span>
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
        แอปพลิเคชันที่ออกแบบมาเพื่อรองรับการขยายตัว พร้อมระบบจัดการที่ทันสมัย
        และการรักษาความปลอดภัยระดับสูง
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/register"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          เริ่มต้นใช้งาน
        </a>
        <a
          href="/about"
          class="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
        >
          เรียนรู้เพิ่มเติม
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        คุณสมบัติเด่น
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        ระบบที่ออกแบบมาเพื่อตอบสนองความต้องการของธุรกิจสมัยใหม่
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">จัดการง่าย</h3>
        <p class="text-gray-600">
          ระบบจัดการที่ใช้งานง่าย เข้าใจง่าย พร้อมอินเทอร์เฟซที่สวยงาม
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ปลอดภัย</h3>
        <p class="text-gray-600">
          ระบบรักษาความปลอดภัยระดับสูง พร้อมการเข้ารหัสข้อมูลที่แข็งแกร่ง
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">รองรับผู้ใช้หลายคน</h3>
        <p class="text-gray-600">
          สามารถรองรับผู้ใช้งานจำนวนมาก พร้อมระบบจัดการสิทธิ์ที่ยืดหยุ่น
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1000+</div>
        <div class="text-gray-600">ผู้ใช้งาน</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-green-600 mb-2">99.9%</div>
        <div class="text-gray-600">เวลาทำงาน</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
        <div class="text-gray-600">การสนับสนุน</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">5★</div>
        <div class="text-gray-600">คะแนนรีวิว</div>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section class="py-16 bg-gray-700 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      พร้อมที่จะเริ่มต้นแล้วหรือยัง?
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      สมัครสมาชิกวันนี้และเริ่มใช้งานระบบที่จะเปลี่ยนแปลงวิธีการทำงานของคุณ
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/register"
        class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
      >
        สมัครสมาชิกฟรี
      </a>
      <a
        href="/contact"
        class="bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
      >
        ติดต่อเรา
      </a>
    </div>
  </div>
</section>
