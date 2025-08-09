// src/routes/api/members/+server.ts
// Endpoint สำหรับดึงข้อมูลสมาชิกแบบแบ่งหน้า (cursor-based pagination)
// - รับ query: limit, cursor
// - ป้องกันค่า limit ผิดปกติ (min/max) และตรวจ cursor ให้เป็น number เท่านั้น
// - คืน users ชุดถัดไปพร้อม nextCursor เพื่อนำไปเรียกต่อจากฝั่ง client
// - ทำ normalization ให้มีฟิลด์ fullname (มาจาก fullName) เพื่อเข้ากับ UI เดิม
import { json } from '@sveltejs/kit'
import prisma from '$lib/server/prisma'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
  // อ่านและทำให้ limit ปลอดภัย (อย่างน้อย 1 และไม่เกิน 1000)
  const raw = Number(url.searchParams.get('limit') ?? 50)
  const limit = Math.min(Math.max(Number.isFinite(raw) ? raw : 50, 1), 1000)

  // อ่านค่า cursor แล้วแปลงเป็นตัวเลข (ถ้าไม่ใช่ number จะไม่ใส่ลง query)
  const cursorParam = url.searchParams.get('cursor')
  const cursorNum = Number(cursorParam)

  // สร้าง query สำหรับ Prisma
  const query: any = {
    take: limit + 1,
    orderBy: { id: 'asc' },
    select: { id: true, fullName: true, email: true, phoneNumber: true, createdAt: true }
  }
  if (cursorParam != null && Number.isFinite(cursorNum)) {
    query.skip = 1
    query.cursor = { id: cursorNum }
  }

  // ดึงข้อมูลทีละ batch เพื่อเช็คว่ามีต่อหรือไม่
  const rows = await prisma.user.findMany(query)
  const hasMore = rows.length > limit
  const nextCursor = hasMore ? rows[limit].id : null
  const usersRaw = hasMore ? rows.slice(0, limit) : rows

  // normalize ฟิลด์ชื่อ ให้มี fullname ใช้งานสะดวกในฝั่ง UI
  const users = usersRaw.map((u: any) => ({ ...u, fullname: u.fullName }))

  return json({ users, nextCursor })
}
