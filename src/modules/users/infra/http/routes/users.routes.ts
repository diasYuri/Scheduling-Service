import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import CreateUserService from "@modules/users/services/CreateUserService";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import UpdateUserAvatarService from "@modules/users/services/UpdateAvatarToUser";
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name && !email && !password) {
      throw new Error("invalid fields");
    }

    const CreateUser = new CreateUserService();

    const user = await CreateUser.execute({
      name,
      email,
      password,
    });

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const UpdateUserAvater = new UpdateUserAvatarService();

    const user = await UpdateUserAvater.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);

export default usersRouter;
