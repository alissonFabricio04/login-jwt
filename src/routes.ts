import { Router, Request, Response } from "express";

import { CreateUserController } from "./useCase/createUser/createUser-controller"

const routes = Router()

const createUserController = new CreateUserController()

// User Routes
routes.post("/api/user/create", createUserController.create)
// routes.get("/api/user/read", UserController.read)

routes.get("/api/teste", (request: Request, response: Response) => {
    response.status(200).json({ response: 'Ola' })
})

export { routes }