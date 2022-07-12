import { hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import dotenv from "dotenv"
import { prismaClient } from "../../../prisma/prismaClient"

dotenv.config()

export interface ICreateUser {
  email: string
  name: string
  password: string
}

export class CreateUserUseCase {
  async create({ email, name, password }: ICreateUser) {
    // valida se os parametros estão vindo
    if(!email) throw new Error("e-mail is required")
    if(!name) throw new Error("name is required")
    if(!password) throw new Error("password is required")

    // valida se é um email valido
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i
    if(!emailRegex.test(email)) throw new Error("e-mail invalid")

    // valida se é um password que atende os requisitos
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    if(!passwordRegex.test(password)) throw new Error("password invalid, try to follow the character recommendations");

    // valida se ja existe uma conta com aquele email
    const emailExists = await prismaClient.user.findUnique({ where: { email } })
    if(emailExists) throw new Error("e-mail invalid or already registered")

    const passwordHash = await hash(password, 10)

    const user = await prismaClient.user.create({
      data: { email, name, password: passwordHash }
    })

    const profile = await prismaClient.profile.create({
      data: {
        info: "voçê ainda não adicionou nenhuma bio ao seu perfil",
        userId: user.id
      }
    })

    const jwt = sign(
      { id: user.id },
      process.env.JWT_SECRECT as string,
      { expiresIn: 60 * 60 }
    )

    return {
      token: jwt,
      data: {
        id: user.id,
      }
    }
  }
}