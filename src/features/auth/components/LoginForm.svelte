<script lang="ts">
  import Swal from "sweetalert2"
  import { authService } from "../services/authService"

  // SweetAlert2 for notifications
  function showAlert(title: string, text: string, icon: "success" | "error") {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    })
  }

  // Funcion to handle form submission
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    // Call the authService to handle login
    try {
      const response = await authService.login({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      })
      // console.log("Login successful:", response)
      if (response.success) {
        // Show success alert
        showAlert(
          "Login Successful",
          "You have successfully logged in.",
          "success"
        )
        // Redirect or show success message
        setTimeout(() => {
          window.location.href = "/admin/dashboard" // Redirect to dashboard or home page
        }, 2000)
      } else {
        // Handle unsuccessful login
        showAlert(
          "Login Failed",
          "Please check your email and password.",
          "error"
        )
      }
      // Redirect or show success message
    } catch (error) {
      // console.error("Login failed:", error)
      showAlert(
        "Login Failed",
        "Please check your email and password.",
        "error"
      )
      // Handle error, e.g., show error message
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
      <h1 class="text-4xl font-bold mb-4">Welcome Back!</h1>
      <p class="text-xl opacity-90">เข้าสู่ระบบเพื่อเริ่มต้นการทำงาน</p>
      <div class="mt-8">
        <div class="w-24 h-1 bg-white/30 mx-auto rounded"></div>
      </div>
    </div>
  </div>

  <!-- Right Column - Login Form -->
  <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
    <div class="w-full max-w-md">
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

      <!-- Login Form Card -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h2>
          <p class="text-gray-600">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
        </div>

        <form method="POST" on:submit={handleSubmit} class="space-y-6">
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
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                จดจำการเข้าสู่ระบบ
              </label>
            </div>

            <div class="text-sm">
              <a
                href="/forgot-password"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            เข้าสู่ระบบ
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              ยังไม่มีบัญชี?
              <a
                href="/register"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                สมัครสมาชิก
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          โดยการเข้าสู่ระบบ คุณยอมรับ
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
