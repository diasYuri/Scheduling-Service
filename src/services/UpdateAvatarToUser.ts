import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import uploadConfig from "../config/upload";
import User from "../models/User";

interface Request {
  user_id: string;
  avatarFilename: string;
}

interface Response {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new ErrorEvent("Only authenticated users can changa avatar.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    const { id, name, email, avatar } = user;
    return {
      id,
      name,
      email,
      avatar,
    };
  }
}
