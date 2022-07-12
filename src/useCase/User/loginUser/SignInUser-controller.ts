import { Request, Response } from "express"
import { SignInUserUseCase, ISignInUser } from "./SignInUser-useCase"

export class SignInUserController {
  async signIn(request: Request, response: Response) {
    const user = <ISignInUser>request.body

    const signInUserUserUseCase = new SignInUserUseCase()

    try {
      const status = await signInUserUserUseCase.signIn(user)

      return response.status(200).json(status)
    } catch (e) {
      return response.status(500).json({ "message": `${(e as Error).message}` })
    }
  }
}
