import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { config } from "dotenv"

config()

export class Auth {
  async isAuth(request: Request, response: Response, next: NextFunction) {
    const authorization = request.header('Authorization')

    if(!authorization) return response.status(400).json({ message: 'token invalid' })

    const [, token] = authorization.split(' ')

    if(!token) return response.status(400).json({ message: 'token invalid' })

    try {
      const decode = verify(token, process.env.JWT_SECRECT as string)
      request.body.user = decode
      return next()
    } catch(e) {
      return response.status(401).json({ message: 'Unauthorized' /*(e as Error).message*/ })
    }
  }
}