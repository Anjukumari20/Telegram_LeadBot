# Telegram Lead Collection System

A full-stack MERN app with a Telegram Bot to collect leads, store them in MongoDB, and display them in a React dashboard.

---

## 📁 Project Structure

```
telegram-lead-system/
├── backend/
│   ├── src/
│   │   ├── bot/
│   │   │   └── bot.js              ← Telegram bot logic
│   │   ├── controllers/
│   │   │   └── leadController.js   ← Business logic for API routes
│   │   ├── middleware/
│   │   │   └── validateLead.js     ← Request validation
│   │   ├── models/
│   │   │   └── Lead.js             ← MongoDB schema
│   │   ├── routes/
│   │   │   └── leadRoutes.js       ← API routes definition
│   │   ├── services/
│   │   │   └── db.js               ← MongoDB connection
│   │   └── index.js                ← Main entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js           ← Top navigation bar
│   │   │   └── LeadCard.js         ← Single lead card UI
│   │   ├── hooks/
│   │   │   └── useLeads.js         ← Custom hook to fetch leads list
│   │   ├── pages/
│   │   │   ├── LeadList.js         ← Dashboard: all leads
│   │   │   └── LeadDetail.js       ← Single lead details
│   │   ├── services/
│   │   │   └── api.js              ← All API call functions
│   │   ├── App.js                  ← Routes setup
│   │   └── index.js                ← React entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally) OR use [MongoDB Atlas](https://cloud.mongodb.com/) (free cloud)
- A Telegram Bot Token (get it from [@BotFather](https://t.me/botfather))

---

## 🚀 Setup & Run

### Step 1 — Create your .env files

**Backend** — create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/telegram_leads
TELEGRAM_BOT_TOKEN=paste_your_bot_token_here
```

**Frontend** — create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

> 💡 To get a Telegram bot token:
> 1. Open Telegram and search for **@BotFather**
> 2. Send `/newbot` and follow the steps
> 3. Copy the token it gives you into `backend/.env`

---

### Step 2 — Install all dependencies (one time only)

```bash
# From the ROOT folder (telegram-lead-system/)
npm run setup
```

This installs dependencies for root, backend, and frontend — all at once.

---

### Step 3 — Start the whole project

```bash
# From the ROOT folder
npm start
```

That's it! This single command starts both:
- ✅ Backend on **http://localhost:5000**
- ✅ Frontend on **http://localhost:3000**

You will see both backend and frontend logs in the same terminal, color-coded:

```
[0] ✅ Connected to MongoDB
[0] ✅ Server started on http://localhost:5000
[0] ✅ Telegram Bot started
[1] Compiled successfully!
[1] Local: http://localhost:3000
```

> `[0]` = backend logs, `[1]` = frontend logs

---

## 🤖 How the Telegram Bot Works

1. Open Telegram and search for your bot by its username @Plonkyy_bot
2. Send `/start`
3. The bot will ask for:
   - Full Name
   - Email Address
   - Mobile Number
4. After all 3 are collected and validated, the data is saved to MongoDB
5. The lead will appear in the React dashboard automatically

---

## 🌐 API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/leads        | Get all leads (supports `?search=` `?page=` `?limit=`) |
| GET    | /api/leads/:id    | Get single lead by ID    |
| POST   | /api/leads        | Create a new lead        |

**Example POST body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "telegramId": "123456789"
}
```

---

## ✅ Features

- Telegram bot with step-by-step conversation flow
- Email format validation
- Mobile number validation (numeric, min 10 digits)
- Duplicate email prevention
- Search leads by name or email
- Pagination (10 per page)
- Loading and error states in UI
- Click any lead card to see full details

---

## 🛠 Tech Stack

| Part     | Technology              |
|----------|-------------------------|
| Backend  | Node.js + Express.js    |
| Database | MongoDB + Mongoose      |
| Bot      | Telegraf                |
| Frontend | React.js + React Router |
