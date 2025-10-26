import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
  id: number;
  username: string;
}

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
