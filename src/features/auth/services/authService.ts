import { apiService } from "$lib/services"
import type { LoginCredentials, RegisterData, AuthResponse } from "$lib/types"

class AuthService {
  // Login method to authenticate user
  async login(credentials: LoginCredentials) {
    const response = await apiService.post<AuthResponse>("/login", credentials)

    if (response.success && response.data) {
      // เก็บ token ใน localStorage เพื่อใช้ฝั่ง client และเซ็ต cookie เพื่อให้ SSR ตรวจสอบได้
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      try {
        // ตั้ง cookie token อายุสั้น ๆ ฝั่ง client (SameSite=Lax)
        document.cookie = `token=${response.data.token}; Path=/; SameSite=Lax`
      } catch {}

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
      }
    }
    return {
      success: false,
      error: response.error || "เข้าสู่ระบบไม่สำเร็จ",
      errors: response.errors,
    }
  }

  // Register method to create a new user
  async register(data: RegisterData) {
    return await apiService.post<AuthResponse>("/register", data)
  }

  // Logout method to clear user session
  async logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    try {
      // ลบ cookie token
      document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax'
    } catch {}
    return await apiService.post("/logout")
  }
}

export const authService = new AuthService()
