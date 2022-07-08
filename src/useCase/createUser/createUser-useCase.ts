import { prismaClient } from "../../prisma/prismaClient"

export interface ICreateUser {
    email:    string
    name:     string
}

export class CreateUserUseCase {
    async create(user: ICreateUser) {
        return await prismaClient.user.create({
            data: {
                email: user.email,
                name: user.name
            }
        })
    }
}