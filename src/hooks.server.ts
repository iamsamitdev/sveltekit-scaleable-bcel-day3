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
      // 2) ถอดรหัส payload ของ JWT แบบปลอดภัยฝั่ง server
      const [, payloadBase64] = token.split(".")
      const json = Buffer.from(payloadBase64, "base64").toString("utf-8")
      const payload = JSON.parse(json)

      // 3) ตรวจสอบวันหมดอายุและตั้งค่า locals ให้โหลดฝั่ง server เข้าถึงได้
      if (!payload?.exp || payload.exp > Date.now() / 1000) {
        event.locals.user = payload.user ?? event.locals.user
      }
    } catch (error) {
      // ถอดรหัสไม่ผ่านก็ปล่อยผ่านไปแบบไม่ตั้งค่า user
      console.error("Invalid token:", error)
    }
  }

  return resolve(event)
}
