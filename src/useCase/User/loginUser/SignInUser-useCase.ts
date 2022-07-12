import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import dotenv from "dotenv"
import { prismaClient } from "../../../prisma/prismaClient"

dotenv.config()

export interface ISignInUser {
  email: string
  password: string
}

export class SignInUserUseCase {
  async signIn({ email, password }: ISignInUser) {
    // valida se os parametros estão vindo
    if(!email) throw new Error("e-mail is required")
    if(!password) throw new Error("password is required")

    // valida se ja existe uma conta com aquele email
    const userExists = await prismaClient.user.findUnique({ where: { email } })
    if(!userExists) throw new Error("e-mail or password invalid") // mudar validacao

    const passwordIsCorrect = await compare(password, userExists.password)
    if(!passwordIsCorrect) throw new Error("e-mail or password invalid")

    const jwt = sign(
      { id: userExists.id },
      process.env.JWT_SECRECT as string,
      { expiresIn: 60 * 60 }
    )

    return {
      token: jwt,
    }
  }
}
