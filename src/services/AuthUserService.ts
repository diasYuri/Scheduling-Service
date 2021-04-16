import { getRepository } from 'typeorm'
import { compare } from 'bcrypt'

import User from '../models/User'

interface Request{
  email: string,
  password: string
}

interface Response{
  id: string,
  name: string,
  email: string
}

export default class AuthUserService {
  async execute(data: Request): Promise<Response>{
    const { email, password } = data
    const usersRepository = getRepository(User)
    
    const user = await usersRepository.findOne({
      where: {email}
    })

    if (!user) {
      throw new Error('Invalid email/password combination!')
    }

    const pass_isValid = await compare(password, user.password)

    if (!pass_isValid) {
      throw new Error('Invalid email/password combination!')
    }

    const authResponse = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    return authResponse
    
  }
}