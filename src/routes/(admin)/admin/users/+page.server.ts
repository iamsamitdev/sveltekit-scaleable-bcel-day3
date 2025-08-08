import prisma from "$lib/server/prisma"

export async function load() {
  // Query all users
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 1000, // Limit to 1000 users for performance
  })

  return {
    users,
  }
}