import prisma from '$lib/server/prisma'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
  const raw = Number(url.searchParams.get('limit') ?? 200)
  const safe = Number.isFinite(raw) ? raw : 200
  const limit = Math.min(Math.max(safe, 1), 1000)

  const cursorParam = url.searchParams.get('cursor')
  const cursorNum = Number(cursorParam)

  const query: any = {
    take: limit + 1,
    orderBy: { id: 'asc' },
    select: { id: true, email: true, fullName: true, createdAt: true, updatedAt: true }
  }

  if (cursorParam != null && Number.isFinite(cursorNum)) {
    query.skip = 1
    query.cursor = { id: cursorNum }
  }

  const rows = await prisma.user.findMany(query)
  const hasMore = rows.length > limit
  const nextCursor = hasMore ? rows[limit].id : null
  const itemsRaw = hasMore ? rows.slice(0, limit) : rows

  // normalize: เพิ่ม field `fullname` ให้เข้ากับ frontend
  const items = itemsRaw.map((u: any) => ({ ...u, fullname: u.fullName }))

  return json({ items, nextCursor })
}