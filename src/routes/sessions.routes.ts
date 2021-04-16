import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';

const sessionRouter = Router();

sessionRouter.post('/', async(request, response) => {
  try {
    const { email, password } = request.body
    
    const authService = new AuthUserService

    const userAuth = await authService.execute({ email, password })
    
    return response.json(userAuth)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRouter;
