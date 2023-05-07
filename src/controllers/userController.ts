import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
} from '../models/user'
import { ErrorHandler } from '@/utils/errorHandler'

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const userExists = await findUserByEmail(email)

    if (userExists) {
      throw new ErrorHandler(400, 'User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)

    if (!user) {
      throw new ErrorHandler(400, 'User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new ErrorHandler(400, 'Invalid credentials')
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: env.EXPIRES_IN,
    })

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

export const getUserController = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await findUserById(userId)

    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { name, email, password } = req.body

  try {
    const user = await findUserById(userId)

    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined

    const updatedUser = await updateUser(userId, {
      name,
      email,
      password: hashedPassword,
    })

    res.status(200).json({ user: updatedUser })
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await findUserById(userId)

    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }

    await deleteUser(userId)

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}
