<script>
  let title = "เกี่ยวกับเรา - SvelteKit Scaleable App"
  let description = "เรียนรู้เกี่ยวกับวิสัยทัศน์ พันธกิจ และทีมงานของ SvelteKit Scaleable App"
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="เกี่ยวกับเรา, วิสัยทัศน์, พันธกิจ, ทีมงาน" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="google" content="notranslate" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-green-600 to-blue-700 text-white">
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        เกี่ยวกับเรา
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
        เราคือทีมที่มุ่งมั่นสร้างสรรค์เทคโนโลยีที่ทำให้ชีวิตและการทำงานของคุณง่ายขึ้น
      </p>
    </div>
  </div>
</section>

<!-- Mission & Vision Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          วิสัยทัศน์ของเรา
        </h2>
        <p class="text-lg text-gray-600 mb-6">
          เราเชื่อว่าเทคโนโลยีควรทำให้ชีวิตง่ายขึ้น ไม่ใช่ซับซ้อนขึ้น ด้วยแนวคิดนี้ 
          เราจึงพัฒนาระบบที่ใช้งานง่าย มีประสิทธิภาพ และรองรับการเติบโตในอนาคต
        </p>
        <p class="text-lg text-gray-600">
          เป้าหมายของเราคือการสร้างเครื่องมือที่ช่วยให้ธุรกิจและผู้ใช้งานสามารถ
          ทำงานได้อย่างมีประสิทธิภาพมากขึ้น
        </p>
      </div>
      <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4 text-center">พันธกิจ</h3>
        <p class="text-gray-600 text-center">
          พัฒนาและให้บริการเทคโนโลยีที่ทันสมัย เพื่อยกระดับการทำงานและ
          สร้างประสบการณ์ที่ดีให้กับผู้ใช้งานทุกคน
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Values Section -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ค่านิยมของเรา
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        หลักการที่เราใช้ในการพัฒนาและให้บริการ
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Value 1 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">คุณภาพ</h3>
        <p class="text-gray-600">
          มุ่งมั่นสร้างผลงานที่มีคุณภาพสูงและตรงตามความต้องการ
        </p>
      </div>

      <!-- Value 2 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ทีมเวิร์ก</h3>
        <p class="text-gray-600">
          เชื่อในพลังของการทำงานร่วมกันและการแบ่งปันความรู้
        </p>
      </div>

      <!-- Value 3 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">นวัตกรรม</h3>
        <p class="text-gray-600">
          ไม่หยุดพัฒนาและหาแนวทางใหม่ๆ เพื่อให้บริการที่ดีขึ้น
        </p>
      </div>

      <!-- Value 4 -->
      <div class="text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">ใส่ใจ</h3>
        <p class="text-gray-600">
          ให้ความสำคัญกับทุกรายละเอียดและความต้องการของลูกค้า
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Team Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ทีมงานของเรา
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        ทีมผู้เชี่ยวชาญที่พร้อมสร้างสรรค์สิ่งดีๆ ให้กับคุณ
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Team Member 1 -->
      <div class="text-center">
        <div class="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">ทีมพัฒนา</h3>
        <p class="text-gray-600 mb-4">Full-Stack Developers</p>
        <p class="text-gray-500">
          ผู้เชี่ยวชาญด้านการพัฒนาระบบที่มีประสบการณ์กว่า 5 ปี
        </p>
      </div>

      <!-- Team Member 2 -->
      <div class="text-center">
        <div class="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">ทีมดีไซน์</h3>
        <p class="text-gray-600 mb-4">UI/UX Designers</p>
        <p class="text-gray-500">
          นักออกแบบที่เข้าใจผู้ใช้และสร้างประสบการณ์ที่ดี
        </p>
      </div>

      <!-- Team Member 3 -->
      <div class="text-center">
        <div class="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">ทีมสนับสนุน</h3>
        <p class="text-gray-600 mb-4">Customer Support</p>
        <p class="text-gray-500">
          ทีมที่พร้อมให้การสนับสนุนและช่วยเหลือตลอด 24 ชั่วโมง
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gray-700 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      พร้อมที่จะร่วมงานกับเราแล้วหรือยัง?
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      เรามีความยินดีที่จะช่วยให้โปรเจกต์ของคุณประสบความสำเร็จ
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/contact"
        class="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
      >
        ติดต่อเรา
      </a>
      <a
        href="/services"
        class="bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
      >
        ดูบริการของเรา
      </a>
    </div>
  </div>
</section>
