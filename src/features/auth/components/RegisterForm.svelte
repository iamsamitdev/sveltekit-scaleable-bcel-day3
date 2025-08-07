<script lang="ts">
  import Swal from "sweetalert2"
  import { authService } from "../services/authService"
  import type { RegisterData } from "$lib/types/auth"

  // SweetAlert2 for notifications
  function showAlert(title: string, text: string, icon: "success" | "error") {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    })
  }

  // Function to handle form submission
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)

    // Get form values
    const password = formData.get("password") as string
    const passwordConfirmation = formData.get("password_confirmation") as string

    // Check if passwords match
    if (password !== passwordConfirmation) {
      showAlert(
        "รหัสผ่านไม่ตรงกัน",
        "กรุณาตรวจสอบรหัสผ่านยืนยันให้ตรงกับรหัสผ่าน",
        "error"
      )
      return
    }

    // Prepare registration data
    const registrationData: RegisterData = {
      fullname: formData.get("fullname") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: password,
      password_confirmation: passwordConfirmation,
      tel: formData.get("tel") as string,
      role: 1, // Default to 'user' if not specifid
    }

    // Call the authService to handle registration
    try {
      const response = await authService.register(registrationData)

      if (response.success) {
        // Show success alert
        showAlert(
          "สมัครสมาชิกสำเร็จ",
          "คุณได้สมัครสมาชิกเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ",
          "success"
        )
        // Redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = "/login"
        }, 2000)
      } else {
        // Handle unsuccessful registration
        showAlert(
          "สมัครสมาชิกไม่สำเร็จ",
          response.message || "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง",
          "error"
        )
      }
    } catch (error) {
      console.error("Registration failed:", error)
      showAlert(
        "สมัครสมาชิกไม่สำเร็จ",
        "เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง",
        "error"
      )
    }
  }
</script>

<div class="min-h-screen flex">
  <!-- Left Column - Image -->
  <div
    class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center"
  >
    <div class="text-center text-white p-8">
      <div class="mb-8">
        <svg
          class="w-32 h-32 mx-auto mb-6"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <h1 class="text-4xl font-bold mb-4">Join Us Today!</h1>
      <p class="text-xl opacity-90">สมัครสมาชิกเพื่อเริ่มต้นใช้งาน</p>
      <div class="mt-8">
        <div class="w-24 h-1 bg-white/30 mx-auto rounded"></div>
      </div>
    </div>
  </div>

  <!-- Right Column - Login Form -->
  <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
    <div class="w-full max-w-xl">
      <!-- Back to Home Link -->
      <div class="mb-8">
        <a
          href="/"
          class="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          กลับสู่หน้าหลัก
        </a>
      </div>

      <!-- Register Form Card -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h2>
          <p class="text-gray-600">กรุณากรอกข้อมูลเพื่อสมัครสมาชิก</p>
        </div>

        <form method="POST" on:submit={handleSubmit} class="space-y-6">
          <!-- Row 1: Full Name and Username -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label
                for="fullname"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกชื่อ-นามสกุล"
              />
            </div>

            <!-- Username -->
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกชื่อผู้ใช้"
              />
            </div>
          </div>

          <!-- Row 2: Email and Telephone -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                อีเมล
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกอีเมล"
              />
            </div>

            <!-- Telephone -->
            <div>
              <label
                for="tel"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
              />
            </div>
          </div>

          <!-- Row 3: Password and Password Confirmation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                รหัสผ่าน
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณากรอกรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              />
            </div>

            <!-- Password Confirmation -->
            <div>
              <label
                for="password_confirmation"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                ยืนยันรหัสผ่าน
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="กรุณายืนยันรหัสผ่าน"
              />
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              ฉันยอมรับ
              <a href="/terms" class="text-blue-600 hover:underline"
                >ข้อกำหนดการใช้งาน</a
              >
              และ
              <a href="/privacy" class="text-blue-600 hover:underline"
                >นโยบายความเป็นส่วนตัว</a
              >
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            สมัครสมาชิก
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              มีบัญชีอยู่แล้ว?
              <a
                href="/login"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                เข้าสู่ระบบ
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          โดยการสมัครสมาชิก คุณยอมรับ
          <a href="/terms" class="text-blue-600 hover:underline"
            >ข้อกำหนดการใช้งาน</a
          >
          และ
          <a href="/privacy" class="text-blue-600 hover:underline"
            >นโยบายความเป็นส่วนตัว</a
          >
        </p>
      </div>
    </div>
  </div>
</div>
