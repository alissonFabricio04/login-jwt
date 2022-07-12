import dotenv from "dotenv"
import { prismaClient } from "../../../prisma/prismaClient"

dotenv.config()

export interface ICreatePostUserData {
  id: string // id user
}

export interface ICreatePostData {
  title: string
  content: string
  published: boolean
}

export class CreatePostUseCase {
  async create({ id }: ICreatePostUserData,{ title, content, published = false }: ICreatePostData) {
    // valida se os parametros estão vindo
    if(!id) throw new Error("user not found")
    if(!title || !content) throw new Error("title and contente is required")

    // valida se ja existe uma conta com aquele email
    const userExists = await prismaClient.user.findUnique({ where: { id } })
    if(!userExists) throw new Error("user invalid or not registered")

    const post = await prismaClient.post.create({
      data: { title, content, published, authorId: id }
    })

    return {
      data: {
        id: post.id,
      }
    }
  }
}