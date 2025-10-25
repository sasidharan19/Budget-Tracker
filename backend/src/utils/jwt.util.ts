import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}
