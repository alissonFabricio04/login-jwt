import { Router, Request, Response } from "express";

import { CRUDUserController } from "./useCase/createUser/Controller"

const routes = Router()

const UserController = new CRUDUserController()

// User Routes
routes.post("/api/user/create", UserController.create)
routes.get("/api/user/read", UserController.read)

routes.get("/api/teste", (request: Request, response: Response) => {
    response.status(200).json({ response: 'Ola' })
})

export { routes }