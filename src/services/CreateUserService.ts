import {getRepository} from 'typeorm'

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

    const user = usersRepository.create({
      name,
      email,
      password
    })

    await usersRepository.save(user)

    return user
  }
}