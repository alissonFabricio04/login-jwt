import { Request, Response } from "express"
import { CreateUserUseCase } from "./createUser-useCase"

export class CreateUserController {
    async create(request: Request, response: Response) {
        const user = request.body

        const createUserUseCase = new CreateUserUseCase()

        try {
            const status = createUserUseCase.create(user)
            
            return response.status(201).json(status)
        } catch(e) {
            return response.status(500).json({"message": `${(e as Error).message}`})
        }
    }
}