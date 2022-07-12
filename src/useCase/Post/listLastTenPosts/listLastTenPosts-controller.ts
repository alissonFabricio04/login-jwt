import { Request, Response } from "express"
import { ListLastTenPostsUseCase } from "./listLastTenPosts-useCase"

export class ListLastTenPostsController {
  async list(request: Request, response: Response) {
    const listLastTenPostsUseCase = new ListLastTenPostsUseCase()

    try {
      const status = await listLastTenPostsUseCase.list()

      return response.status(200).json(status)
    } catch (e) {
      return response.status(500).json({ "message": `${(e as Error).message}` })
    }
  }
}