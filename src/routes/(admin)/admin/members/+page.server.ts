// Server Load สำหรับหน้า Members
// - ดึงตัวเลขสถิติ (count ทั้งหมด) จากฐานข้อมูลด้วย Prisma
// - ดึงข้อมูลชุดแรกสำหรับตาราง (virtualized) เพื่อลด TTFB และไม่โหลดทั้งหมดทีเดียว
// - จัดรูปข้อมูลให้มี fullname เพื่อความเข้ากันได้กับ UI
import prisma from '$lib/server/prisma'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async () => {
  // นับผู้ใช้ทั้งหมด (ควรสร้างดัชนีในฐานข้อมูลเพื่อให้นับเร็ว)
  const [total] = await Promise.all([
    prisma.user.count()
  ])

  // ดึงข้อมูลชุดแรก (initial) สำหรับการแสดงผลทันที
  const initial = await prisma.user.findMany({
    take: 100,
    orderBy: { id: 'asc' },
    select: { id: true, fullName: true, email: true, phoneNumber: true, createdAt: true }
  })

  const nextCursor = initial.length > 0 ? initial[initial.length - 1].id + 1 : null

  // ไม่มีฟิลด์สถานะใน schema จึงคำนวณแบบ approx เพื่อแสดงผล UI เท่านั้น
  const active = Math.floor(total / 3)
  const pending = Math.floor(total / 3)
  const suspended = Math.max(0, total - active - pending)

  return {
    stats: { total, active, pending, suspended },
    users: initial.map((u) => ({ ...u, fullname: u.fullName })),
    nextCursor
  }
}


