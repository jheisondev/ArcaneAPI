import { Router } from 'express'
import {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/userController'

const router = Router()

router.post('/', createUserController)
router.post('/login', loginUserController)
router.get('/:userId', getUserController)
router.patch('/:userId', updateUserController)
router.delete('/:userId', deleteUserController)

export default router
