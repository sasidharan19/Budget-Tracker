import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.util";

export interface AuthRequest extends Request {
  user?: { userId: number; username: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.substring(7);
  try {
    const payload = verifyJwt(token);
    req.user = payload as any;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
