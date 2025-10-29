import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from './routes/categories.routes';
import transactionRoutes from './routes/transactions.routes';
import budgetRoutes from './routes/budgets.routes';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const allowedOrigins = [
  "http://localhost:4200",
  process.env.FRONTEND_URL || "" 
].filter(Boolean);

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS policy: origin not allowed"));
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/categories', authMiddleware, categoryRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/budgets', authMiddleware, budgetRoutes);
app.use('/api/budgets', authMiddleware, budgetRoutes);

export default app;
