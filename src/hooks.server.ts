import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  // 1) อ่าน token จาก Authorization header หรือ cookies
  const authHeader = event.request.headers.get("authorization")
  let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null
  if (!token) {
    token = event.cookies.get("token") || null
  }

  if (token) {
    // เก็บ token ไว้ใน locals เสมอ แม้ถอดรหัสไม่ได้ เพื่อใช้เป็นสัญญาณว่า login แล้ว
    event.locals.token = token
    try {
      // ป้องกันกรณี token ไม่มีจุด 2 จุด
      const parts = token.split(".")
      if (parts.length === 3) {
        const payloadBase64 = parts[1]
        const json = Buffer.from(payloadBase64, "base64").toString("utf-8")
        const payload = JSON.parse(json)
        if (!payload?.exp || payload.exp > Date.now() / 1000) {
          event.locals.user = payload.user ?? event.locals.user
        }
      }
    } catch (error) {
      console.error("Invalid token:", error)
    }
  }

  return resolve(event)
}
