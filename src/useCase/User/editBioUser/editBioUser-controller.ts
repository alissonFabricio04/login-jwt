import { Request, Response } from "express"
import { EditBioUserUseCase, IEditBioUser, IEditBioInfo } from "./editBioUser-useCase"

export class EditBioUserController {
  async edit(request: Request, response: Response) {
    const body = <IEditBioInfo>request.body
    const user = <IEditBioUser>request.body.user

    const editBioUserUseCase = new EditBioUserUseCase()

    try {
      const status = await editBioUserUseCase.edit({ id: user.id }, { info: body.info })

      return response.status(201).json(status)
    } catch (e) {
      return response.status(500).json({ "message": `${(e as Error).message}` })
    }
  }
}