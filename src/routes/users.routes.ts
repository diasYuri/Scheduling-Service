import { request, Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async(request, response) => {
  try {
    const {name, email, password}= request.body
    const CreateUser = new CreateUserService()

    const user = await CreateUser.execute({
      name,
      email,
      password
    })


    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({"ok": true})
})

export default usersRouter;
