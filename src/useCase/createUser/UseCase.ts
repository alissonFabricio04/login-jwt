import { prismaClient } from "../../prisma/prismaClient"

export interface IUser {
    email:    string
    name:     string
}

export class UseCase {
    async create(user: IUser) {
        return await prismaClient.user.create({
            data: {
                email: user.email,
                name: user.name
            }
        })
    }

    async read() {
        return await prismaClient.user.findMany({
            take: 1,
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async update({ email }: IUser) {

    }

    async delete({ email }: IUser) {

    }
}