import prisma from '$lib/server/prisma'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ url }) => {
  const raw = Number(url.searchParams.get('limit') ?? 200)
  const safe = Number.isFinite(raw) ? raw : 200
  const limit = Math.min(Math.max(safe, 1), 1000)
  const cursor = url.searchParams.get('cursor')

  const baseSelect = {
    id: true,
    email: true,
    fullName: true,
    createdAt: true,
    updatedAt: true
  }

  const query: any = {
    take: limit + 1,
    orderBy: { id: 'asc' },
    select: baseSelect
  }
  if (cursor) {
    query.skip = 1
    query.cursor = { id: Number(cursor) }
  }

  const rows = await prisma.user.findMany(query)
  const hasMore = rows.length > limit
  const nextCursor = hasMore ? rows[limit].id : null
  const initialRaw = hasMore ? rows.slice(0, limit) : rows
  // normalize field name ให้มีทั้ง fullName และ fullname (เพื่อความเข้ากันได้)
  const initial = initialRaw.map((u) => ({ ...u, fullname: (u as any).fullName }))

  return {
    initial,
    nextCursor,
    limit
  }
}