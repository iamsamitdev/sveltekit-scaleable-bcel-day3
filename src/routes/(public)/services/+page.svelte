<script>
  let title = "บริการของเรา - SvelteKit Scaleable App"
  let description = "ดูบริการและแพ็กเกจต่างๆ ที่เราให้บริการเพื่อช่วยธุรกิจของคุณ"
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="บริการ, แพ็กเกจ, บริการของเรา" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="google" content="notranslate" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-purple-600 to-pink-700 text-white">
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        บริการของเรา
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
        แพ็กเกจและบริการที่หลากหลาย เพื่อตอบสนองทุกความต้องการของธุรกิจคุณ
      </p>
    </div>
  </div>
</section>

<!-- Services Overview -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        บริการหลักของเรา
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        เลือกบริการที่เหมาะสมกับความต้องการของคุณ
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Service 1 -->
      <div class="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-blue-200 hover:shadow-lg transition-all">
        <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">พัฒนาเว็บแอปพลิเคชัน</h3>
        <p class="text-gray-600 mb-6">
          พัฒนาเว็บแอปพลิเคชันที่ทันสมัย รองรับการใช้งานบนทุกอุปกรณ์ 
          พร้อมระบบจัดการที่ครบครัน
        </p>
        <ul class="space-y-2 text-gray-600 mb-6">
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Responsive Design
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ระบบจัดการผู้ใช้
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            API Integration
          </li>
        </ul>
        <div class="text-2xl font-bold text-blue-600 mb-4">เริ่มต้นที่ ฿15,000</div>
      </div>

      <!-- Service 2 -->
      <div class="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-green-200 hover:shadow-lg transition-all">
        <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ระบบจัดการธุรกิจ</h3>
        <p class="text-gray-600 mb-6">
          ระบบ ERP และ CRM ที่ช่วยจัดการธุรกิจของคุณได้อย่างมีประสิทธิภาพ
          พร้อมรายงานแบบเรียลไทม์
        </p>
        <ul class="space-y-2 text-gray-600 mb-6">
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            จัดการสต็อกสินค้า
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ระบบบัญชีและการเงิน
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            รายงานและการวิเคราะห์
          </li>
        </ul>
        <div class="text-2xl font-bold text-green-600 mb-4">เริ่มต้นที่ ฿25,000</div>
      </div>

      <!-- Service 3 -->
      <div class="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-purple-200 hover:shadow-lg transition-all">
        <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ปรึกษาและสนับสนุน</h3>
        <p class="text-gray-600 mb-6">
          บริการให้คำปรึกษาด้านเทคโนโลยี การพัฒนาระบบ และการดูแลรักษาระบบ
          พร้อมทีมสนับสนุนตลอด 24 ชั่วโมง
        </p>
        <ul class="space-y-2 text-gray-600 mb-6">
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ให้คำปรึกษาฟรี
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            บำรุงรักษาระบบ
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            การฝึกอบรม
          </li>
        </ul>
        <div class="text-2xl font-bold text-purple-600 mb-4">เริ่มต้นที่ ฿5,000/เดือน</div>
      </div>
    </div>
  </div>
</section>

<!-- Pricing Plans -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        แพ็กเกจราคา
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        เลือกแพ็กเกจที่เหมาะสมกับความต้องการและงบประมาณของคุณ
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Basic Plan -->
      <div class="bg-white rounded-xl p-8 shadow-lg">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
          <div class="text-4xl font-bold text-blue-600 mb-2">฿9,999</div>
          <p class="text-gray-600 mb-8">เหมาะสำหรับธุรกิจขนาดเล็ก</p>
        </div>
        <ul class="space-y-4 mb-8">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            เว็บไซต์ 5 หน้า
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Responsive Design
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ฟอร์มติดต่อ
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            การสนับสนุนพื้นฐาน
          </li>
        </ul>
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
          เลือกแพ็กเกจนี้
        </button>
      </div>

      <!-- Pro Plan -->
      <div class="bg-white rounded-xl p-8 shadow-xl border-2 border-blue-500 relative">
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">แนะนำ</span>
        </div>
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
          <div class="text-4xl font-bold text-blue-600 mb-2">฿19,999</div>
          <p class="text-gray-600 mb-8">เหมาะสำหรับธุรกิจขนาดกลาง</p>
        </div>
        <ul class="space-y-4 mb-8">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            เว็บไซต์ไม่จำกัดหน้า
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ระบบจัดการเนื้อหา
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ระบบสมาชิก
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            การสนับสนุนแบบเร่งด่วน
          </li>
        </ul>
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
          เลือกแพ็กเกจนี้
        </button>
      </div>

      <!-- Enterprise Plan -->
      <div class="bg-white rounded-xl p-8 shadow-lg">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
          <div class="text-4xl font-bold text-blue-600 mb-2">ติดต่อเรา</div>
          <p class="text-gray-600 mb-8">เหมาะสำหรับองค์กรขนาดใหญ่</p>
        </div>
        <ul class="space-y-4 mb-8">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ระบบที่ปรับแต่งได้
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            API ที่สมบูรณ์
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            ระบบรายงานขั้นสูง
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            การสนับสนุนแบบเฉพาะ
          </li>
        </ul>
        <button class="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors">
          ติดต่อเรา
        </button>
      </div>
    </div>
  </div>
</section>

<!-- Process Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ขั้นตอนการทำงาน
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        กระบวนการทำงานที่ชัดเจนและมีประสิทธิภาพ
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Step 1 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ปรึกษา</h3>
        <p class="text-gray-600">
          รับฟังความต้องการและให้คำแนะนำที่เหมาะสม
        </p>
      </div>

      <!-- Step 2 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">วางแผน</h3>
        <p class="text-gray-600">
          วิเคราะห์และวางแผนการพัฒนาอย่างละเอียด
        </p>
      </div>

      <!-- Step 3 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">พัฒนา</h3>
        <p class="text-gray-600">
          พัฒนาระบบตามแผนที่กำหนดไว้
        </p>
      </div>

      <!-- Step 4 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">4</div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ส่งมอบ</h3>
        <p class="text-gray-600">
          ทดสอบและส่งมอบงานพร้อมการฝึกอบรม
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gray-700 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      พร้อมเริ่มโปรเจกต์ของคุณแล้วหรือยัง?
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคา
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/contact"
        class="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
      >
        ขอใบเสนอราคา
      </a>
      <a
        href="/about"
        class="bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
      >
        เรียนรู้เพิ่มเติม
      </a>
    </div>
  </div>
</section>
