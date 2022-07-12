import { prismaClient } from "../../../prisma/prismaClient"

export class ListLastTenPostsUseCase {
  async list() {
    const posts = await prismaClient.post.findMany({ take: 10, where: { published: true } })

    return {
      data: {
        posts
      }
    }
  }
}