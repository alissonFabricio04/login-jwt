import dotenv from "dotenv"
import { prismaClient } from "../../../prisma/prismaClient"

dotenv.config()

export interface IListPostUser {
  id: string // id user
}

export class ListPostsUseCase {
  async list({ id }: IListPostUser) {
    // valida se os parametros estão vindo
    if(!id) throw new Error("user not found")

    // valida se ja existe uma conta com aquele email
    const userExists = await prismaClient.user.findUnique({ where: { id } })
    if(!userExists) throw new Error("user invalid or not registered")

    const posts = await prismaClient.post.findMany({ where: { authorId: id } })

    return {
      data: {
        posts
      }
    }
  }
}