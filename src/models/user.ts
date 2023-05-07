import { Prisma, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (
  data: Prisma.UserCreateInput,
): Promise<User> => {
  return await prisma.user.create({ data })
}

export const findUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } })
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } })
}

export const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput,
): Promise<User> => {
  return await prisma.user.update({ where: { id }, data })
}

export const deleteUser = async (id: string): Promise<User> => {
  return await prisma.user.delete({ where: { id } })
}
