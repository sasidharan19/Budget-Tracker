# 📘 Product Requirements Document (PRD)
## Personal Budget Tracker Application

### 📝 Overview
The Personal Budget Tracker is a web-based application designed to help users track income, expenses, and categorize spending. The system provides financial insights, monthly budget comparison, and visual analytics to support personal financial discipline.

---

### 🎯 Goals & Objectives
| Goal | Description |
|------|------------|
| Expense Tracking | Allow users to log & categorize expenses and income |
| Financial Summary | Provide monthly overview of balance, total income & expenses |
| Budget Plan | Allow users to set monthly budget & compare spending |
| Visual Insights | Display spending patterns via charts |
| Simple UX | Easy-to-use interface with minimal actions to achieve tasks |
| Secure Access | JWT-based secure authentication |

---

### ✅ Key Features

#### 1. **Authentication**
- Login with username/password
- JWT-based session handling
- Logout functionality

#### 2. **Dashboard**
- Monthly summary: income, expense, balance
- D3 Pie-chart: spending by category
- Top spending categories list
- Month filter (YYYY-MM format)

#### 3. **Transactions**
- Add income & expense entries
- Edit or delete transaction
- Filter by date, category, and type
- Pagination support

#### 4. **Budget Management**
- Add monthly budget
- Compare actual expense vs budget
- Chart visualization (D3)

---

### 🧠 Assumptions
| Assumption | Explanation |
|------------|------------|
| Single-user mode | No multi-user sharing of budgets/data |
| Minimal roles | No admin/user roles required |
| Accuracy | User manually ensures correct data input |

---

### 📊 Success Metrics
| Metric | Target |
|--------|--------|
| Login success | <1 sec |
| Add/Update/Delete record | <1 sec |
| Dashboard render | <2 sec |
| Zero errors | All flows tested & pass QC |

---

### 🛠️ Technical Stack
| Layer | Technology |
|-------|------------|
| Frontend | Angular 19 + Tailwind CSS |
| Backend | Node.js + Express |
| DB | MySQL (Railway) |
| ORM | Prisma |
| Hosting | Vercel (Frontend), Railway (Backend) |
| Charts | D3.js |
| Auth | JWT |

---

### 🔐 Security Requirements
- Store JWT in session storage
- Password hashed using bcrypt (server-side)
- CORS enabled for production origin only

---

### 🧪 Testing Scope

#### Manual Testing Areas
- Login
- Add/edit/delete transactions
- Budget creation & comparison
- Filters & pagination
- Chart rendering

---

### 🏗️ Deployment
| Component | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Railway |
| DB | Railway MySQL |

---

### 📦 Deliverables
- Live hosted application
- Source code on GitHub
- Live hosted backend API, Postman collection
- Documentation & instructions

---

### 👤 Author
**Sasidharan Senthilkumar**

---

