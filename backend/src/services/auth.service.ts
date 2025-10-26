import { prisma } from '../utils/prisma.client';
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/jwt.util";


export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return null;

  const token = signJwt({ id: user.id, username: user.username });
  return { token, user: { id: user.id, username: user.username } };
}
