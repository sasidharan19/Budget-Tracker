import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";

export async function loginHandler(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "username & password required" });

    const result = await loginUser(username, password);
    if (!result) return res.status(401).json({ message: "Invalid credentials" });

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
