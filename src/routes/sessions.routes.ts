import { Router } from "express";
import AuthUserService from "../modules/users/services/AuthUserService";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authService = new AuthUserService();

  const { user, token } = await authService.execute({ email, password });

  return response.json({ user, token });
});

export default sessionRouter;
