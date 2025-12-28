# Personal Budget Tracker

A full-stack web application to track personal income and expenses, visualize spending, and manage monthly budgets.
This project is made with **Angular, Node.js, MySQL, Prisma, D3.js, Railway and Vercel deployment, Tailwind CSS**.

---

## Test Credentials

| Field | Value |
|-------|------|
Username | `testuser`  
Password | `budgettracker`  

> Required for login access

---

## Live Demo Links

| Service | URL |
|--------|-----|
Frontend | https://budget-tracker-two-tan.vercel.app  
Backend API | https://budget-tracker-production-58f5.up.railway.app  
GitHub Repo | https://github.com/sasidharan19/Budget-Tracker  

---

## ✅ Features

- Secure Login
- Add/Edit/Delete Income & Expenses
- Monthly summary dashboard
- Category-wise expense visualization (D3.js Pie Chart)
- Monthly budget setting + budget vs expense view (D3.js bar chart)
- Filters by date/category, pagination
- Responsive UI (Tailwind CSS)

---

## 🛠 Tech Stack

| Category | Tools |
|---------|------|
Frontend | Angular 19, D3.js, Tailwind CSS  
Backend | Node.js, Express  
Database | MySQL  
ORM | Prisma  
Deployment | Vercel (Frontend), Railway (Backend + DB)  

---

## Installation Guide

### ✅ Prerequisites
- Node.js 18+
- MySQL
- Git

### 1️⃣ Clone Repo
```bash
git clone https://github.com/sasidharan19/Budget-Tracker
cd Budget-Tracker
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create .env file (copy .env.example)
```bash
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DB
JWT_SECRET=your_jwt_secret
```

Run migrations & start:
```bash
npx prisma migrate deploy
npm run start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## Testing

### Manual Testing Checklist

| Area | Test Performed | Result |
|------|----------------|--------|
Authentication | Verified login with valid & invalid credentials | ✅ Working  
Dashboard Summary | Checked correct income, expense & balance calculation | ✅ Accurate  
CRUD Operations | Add / Edit / Delete Transactions | ✅ Working  
Filters | Filter by category & date | ✅ Working  
Pagination | Verified pagination on transaction list | ✅ Smooth  
Budget Logic | Compared budget vs actual expense | ✅ Correct behavior  
Charts | D3 pie chart renders & updates based on data | ✅ Working  
Responsive UI | Tested on desktop & mobile | ✅ Responsive  

---

### Libraries Acknowledgment
| Tool         | Usage                |
| ------------ | -------------------- |
| D3.js        | Charts               |
| Prisma       | ORM                  |
| Tailwind CSS | Styling              |
| Vercel       | Frontend hosting     |
| Railway      | Backend + DB hosting |

---

## LLM Usage

### Tools Used
- **ChatGPT** — for guidance on architecture, code snippets and debugging support.

### AI Involvement
AI was used for:
- Understanding feature requirements
- Providing example code snippets for Angular & Node.js
- Improving UI/UX ideas and folder structure
- Helping draft documentation (README, usage notes, testing guide)
- Clarifying best practices for deployment & API structure

### What AI Did *Not* Do
- Did *not* write the full project code
- Did *not* handle deployment
- Did *not* generate database data
- No sensitive project information was shared

### Developer Contribution
All application code, logic implementation, debugging, testing, and deployment were done by the developer.  
LLM was used only as an assistant for reference and learning.

---

## API Endpoints

### Authentication
| Method | Endpoint        | Description      |
| ------ | ----------------| ---------------- |
| POST   | `/auth/login`   | Login user       |

---

### Transactions
| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| GET    | `/transactions`            | Get all transactions           |
| GET    | `/transactions/:id`        | Get single transaction by ID   |
| POST   | `/transactions`            | Create new transaction         |
| PUT    | `/transactions/:id`        | Update transaction             |
| DELETE | `/transactions/:id`        | Delete transaction             |

Supports filters & pagination via query params:  
`?page=1&pageSize=10&category=Food&month=2025-02`

---

### Categories
| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/categories`    | Get all categories      |
| POST   | `/categories`    | Create category         |
| PUT    | `/categories/:id`| Update category         |
| DELETE | `/categories/:id`| Delete category         |

---

### Budget
| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| GET    | `/budget`     | Get current month budget & usage        |
| POST   | `/budget`     | Set monthly budget                      |
| PUT    | `/budget/:id` | Update monthly budget                   |

---

### Summary & Analytics
| Method | Endpoint                     | Description                   |
| ------ | -----------------------------| ----------------------------- |
| GET    | `/summary?month=YYYY-MM`     | Get monthly summary (income, expense, balance) |
| GET    | `/charts/expense-category`   | Breakdown expense by category |

---

### Additional Project Meta data

| Field              | Value             |
| ------------------ | ----------------- |
| Version            | 1.0               |
| Completion Date    | 30/10/2025        |


## 👤 Author

**Sasidharan Senthilkumar**

---
