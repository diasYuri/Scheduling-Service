import { getRepository } from 'typeorm'
import { hash } from 'bcrypt'

import User from '../models/User'

interface Request{
  name: string,
  email: string,
  password: string
}

export default class CreateUserService {
  async execute(data: Request): Promise<User>{
    const { name, email, password } = data
    const usersRepository = getRepository(User)
    
    const CheckUserExists = await usersRepository.findOne({
      where: {email}
    })

    if (CheckUserExists) {
      throw new Error('Email andress already used')
    }

    const hashPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword
    })

    await usersRepository.save(user)

    return user
  }
}