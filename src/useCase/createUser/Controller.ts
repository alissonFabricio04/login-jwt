import { Request, Response } from "express"
import { UseCase } from "./UseCase"

export class CRUDUserController {
    async create(request: Request, response: Response) {
        const infoUser = request.body

        const UserUseCase = new UseCase()

        try {
            const status = UserUseCase.create(infoUser)
            
            return response.status(200).json(status)

        } catch {
            return response.status(500).json({"message": "Ops... Algo deu errado"})
        }
    }

    async read(request: Request, response: Response) {
        const UserUseCase = new UseCase()

        const status = UserUseCase.read()

        return status
    }

    async update(request: Request, response: Response) {

    }

    async delete(request: Request, response: Response) {

    }
}