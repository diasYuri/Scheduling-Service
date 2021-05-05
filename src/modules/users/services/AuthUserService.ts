import { getRepository } from "typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/authConfig";

import User from "../../../models/User";
import { AppError } from "../../../error/error";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export default class AuthUserService {
  async execute(data: Request): Promise<Response> {
    const { email, password } = data;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid email/password combination!", 401);
    }

    // tslint:disable-next-line: variable-name
    const pass_isValid = await compare(password, user.password);

    if (!pass_isValid) {
      throw new AppError("Invalid email/password combination!", 401);
    }

    const token = sign({}, authConfig.jwt.secretKey, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const authResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };

    return authResponse;
  }
}
