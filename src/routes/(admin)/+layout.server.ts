import { redirect, type ServerLoad } from "@sveltejs/kit"

// ปกป้องทุกเส้นทางในกลุ่ม (admin) ฝั่งเซิร์ฟเวอร์
export const load: ServerLoad = async ({ locals }) => {
  // ถ้าไม่มีผู้ใช้และไม่มี token ให้เด้งไปหน้า login พร้อมพารามิเตอร์กลับหน้าเดิม
  if (!locals.user && !locals.token) {
    throw redirect(302, `/login`)
  }

  return {
    user: locals.user,
    token: locals.token,
  }
}


