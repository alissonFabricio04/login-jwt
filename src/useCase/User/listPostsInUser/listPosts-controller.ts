import { Request, Response } from "express"
import { ListPostsUseCase, IListPostUser } from "./listPosts-useCase"

export class ListPostsController {
  async list(request: Request, response: Response) {
    const user = <IListPostUser>request.body.user

    const listPostsUseCase = new ListPostsUseCase()

    try {
      const status = await listPostsUseCase.list(user)

      return response.status(200).json(status)
    } catch (e) {
      return response.status(500).json({ "message": `${(e as Error).message}` })
    }
  }
}