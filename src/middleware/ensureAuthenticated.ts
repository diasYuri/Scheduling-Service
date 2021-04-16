import {Request, Response, NextFunction, request} from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/authConfig'


interface TokenPayload{
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('JWT Token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decod = verify(token, authConfig.jwt.secretKey)

    const { sub } = decod as TokenPayload;

    request.user = {
      id: sub
    }

    return next()
  } catch (err) {
    throw new Error('Invalid JWT Token')
  }

}