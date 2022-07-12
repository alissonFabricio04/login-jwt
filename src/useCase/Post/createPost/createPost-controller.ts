import { Request, Response } from "express"
import { CreatePostUseCase, ICreatePostData, ICreatePostUserData } from "./createPost-useCase"

export class CreatePostController {
  async create(request: Request, response: Response) {
    const body = <ICreatePostData>request.body
    const user = <ICreatePostUserData>request.body.user
    const post = { title: body.title, content: body.content, published: body.published }

    const createPostUseCase = new CreatePostUseCase()

    try {
      const status = await createPostUseCase.create(user, post)

      return response.status(201).json(status)
    } catch (e) {
      return response.status(500).json({ "message": `${(e as Error).message}` })
    }
  }
}