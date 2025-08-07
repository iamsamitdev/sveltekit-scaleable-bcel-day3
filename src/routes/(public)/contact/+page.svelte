<script>
  let title = "ติดต่อเรา - SvelteKit Scaleable App"
  let description = "ติดต่อเราเพื่อรับคำปรึกษาฟรี ใบเสนอราคา หรือสอบถามข้อมูลเพิ่มเติม"
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="ติดต่อเรา, คำปรึกษา, ใบเสนอราคา, สอบถาม" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="google" content="notranslate" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        ติดต่อเรา
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
        พร้อมให้คำปรึกษาและตอบทุกคำถามของคุณ ติดต่อเราได้ทุกช่องทาง
      </p>
    </div>
  </div>
</section>

<!-- Contact Form & Info Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          ส่งข้อความถึงเรา
        </h2>
        <p class="text-gray-600 mb-8">
          กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับภายใน 24 ชั่วโมง
        </p>

        <form class="space-y-6">
          <!-- Name & Email Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกชื่อ-นามสกุล"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกอีเมล"
              />
            </div>
          </div>

          <!-- Phone & Company Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
              />
            </div>
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                บริษัท/องค์กร
              </label>
              <input
                type="text"
                id="company"
                name="company"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกชื่อบริษัท/องค์กร"
              />
            </div>
          </div>

          <!-- Service Interest -->
          <div>
            <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
              บริการที่สนใจ
            </label>
            <select
              id="service"
              name="service"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">เลือกบริการที่สนใจ</option>
              <option value="web-development">พัฒนาเว็บแอปพลิเคชัน</option>
              <option value="business-system">ระบบจัดการธุรกิจ</option>
              <option value="consulting">ปรึกษาและสนับสนุน</option>
              <option value="other">อื่นๆ</option>
            </select>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              ข้อความ
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              placeholder="กรุณาระบุรายละเอียดความต้องการของคุณ"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            ส่งข้อความ
          </button>
        </form>
      </div>

      <!-- Contact Information -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          ข้อมูลติดต่อ
        </h2>
        <p class="text-gray-600 mb-8">
          ติดต่อเราได้ผ่านช่องทางต่างๆ หรือมาเยี่ยมชมสำนักงานของเรา
        </p>

        <div class="space-y-6">
          <!-- Address -->
          <div class="flex items-start">
            <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg class="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">ที่อยู่สำนักงาน</h3>
              <p class="text-gray-600">
                123 ถนนเทคโนโลยี แขวงนวัตกรรม<br />
                เขตดิจิทัล กรุงเทพฯ 10110
              </p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-start">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">โทรศัพท์</h3>
              <p class="text-gray-600">
                <a href="tel:+66-2-123-4567" class="hover:text-green-600 transition-colors">
                  +66 2 123 4567
                </a>
              </p>
              <p class="text-gray-600">
                <a href="tel:+66-89-123-4567" class="hover:text-green-600 transition-colors">
                  +66 89 123 4567
                </a>
              </p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">อีเมล</h3>
              <p class="text-gray-600">
                <a href="mailto:info@sveltekit-app.com" class="hover:text-blue-600 transition-colors">
                  info@sveltekit-app.com
                </a>
              </p>
              <p class="text-gray-600">
                <a href="mailto:support@sveltekit-app.com" class="hover:text-blue-600 transition-colors">
                  support@sveltekit-app.com
                </a>
              </p>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="flex items-start">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">เวลาทำการ</h3>
              <p class="text-gray-600">
                จันทร์ - ศุกร์: 09:00 - 18:00<br />
                เสาร์: 09:00 - 16:00<br />
                อาทิตย์: หยุด
              </p>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">ติดตามเราได้ที่</h3>
          <div class="flex space-x-4">
            <button type="button" aria-label="Facebook" class="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button type="button" aria-label="Twitter" class="w-12 h-12 bg-sky-100 hover:bg-sky-200 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button type="button" aria-label="LinkedIn" class="w-12 h-12 bg-indigo-100 hover:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button type="button" aria-label="Line" class="w-12 h-12 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Map Section -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ที่ตั้งสำนักงาน
      </h2>
      <p class="text-xl text-gray-600">
        มาเยี่ยมชมสำนักงานของเราได้ทุกวันในเวลาทำการ
      </p>
    </div>

    <!-- Placeholder Map -->
    <div class="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
      <div class="text-center">
        <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <p class="text-gray-500 text-lg">แผนที่ Google Maps</p>
        <p class="text-gray-400 text-sm mt-2">
          123 ถนนเทคโนโลยี แขวงนวัตกรรม เขตดิจิทัล กรุงเทพฯ 10110
        </p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        คำถามที่พบบ่อย
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        คำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- FAQ 1 -->
      <div class="bg-gray-50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          ใช้เวลานานแค่ไหนในการพัฒนาเว็บไซต์?
        </h3>
        <p class="text-gray-600">
          ขึ้นอยู่กับความซับซ้อนของโปรเจกต์ โดยทั่วไปใช้เวลา 2-8 สัปดาห์ 
          เราจะให้ timeline ที่ชัดเจนหลังจากรับฟังความต้องการ
        </p>
      </div>

      <!-- FAQ 2 -->
      <div class="bg-gray-50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          มีการรับประกันหรือไม่?
        </h3>
        <p class="text-gray-600">
          เรามีการรับประกันการทำงานของระบบ 6 เดือน และให้การสนับสนุนฟรี
          สำหรับการแก้ไขบั๊กที่เกิดจากการพัฒนา
        </p>
      </div>

      <!-- FAQ 3 -->
      <div class="bg-gray-50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          สามารถแก้ไขและปรับปรุงภายหลังได้หรือไม่?
        </h3>
        <p class="text-gray-600">
          ได้ครับ เราสามารถดูแลและปรับปรุงระบบให้อยู่เสมอ 
          มีแพ็กเกจการดูแลรักษาแบบรายเดือนและรายปี
        </p>
      </div>

      <!-- FAQ 4 -->
      <div class="bg-gray-50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          ราคาเริ่มต้นเท่าไหร่?
        </h3>
        <p class="text-gray-600">
          ราคาเริ่มต้นที่ 9,999 บาท สำหรับเว็บไซต์พื้นฐาน 
          ราคาจะแตกต่างกันตามความต้องการและฟีเจอร์ที่ต้องการ
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gray-700 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      พร้อมเริ่มต้นโปรเจกต์ของคุณแล้วหรือยัง?
    </h2>
    <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคาที่เหมาะสม
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/services"
        class="bg-teal-600 hover:bg-teal-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
      >
        ดูบริการของเรา
      </a>
      <a
        href="/about"
        class="bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
      >
        เรียนรู้เกี่ยวกับเรา
      </a>
    </div>
  </div>
</section>
