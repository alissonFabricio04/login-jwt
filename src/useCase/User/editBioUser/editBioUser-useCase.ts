import dotenv from "dotenv"
import { prismaClient } from "../../../prisma/prismaClient"

dotenv.config()

export interface IEditBioUser {
  id: string
}

export interface IEditBioInfo {
  info: string
}

export class EditBioUserUseCase {
  async edit({ id }: IEditBioUser, { info }: IEditBioInfo) {
    // valida se os parametros estão vindo
    if(!id) throw new Error("user not found")
    if(!info) throw new Error("bio is required")

    // valida se ja existe uma conta com aquele email
    const userExists = await prismaClient.user.findUnique({ where: { id } })
    if(!userExists) throw new Error("user invalid or not registered")

    const profile = await prismaClient.profile.update({ data: { info }, where: { userId: id } })

    return {
      data: {
        profile,
      }
    }
  }
}