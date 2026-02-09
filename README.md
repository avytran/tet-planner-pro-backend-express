# 🌐 Tet Planner Pro — Backend (Express + TypeScript)

Minimal, type-safe backend using **Express**, **TypeScript**, and **Mongoose (MongoDB)** — a starter for building APIs and backend features.

---

## 🚀 Features

- 🛠 TypeScript for strong typing and DX  
- ⚡ Express for minimal routing and middleware  
- 🗄️ Mongoose for MongoDB data modeling  
- 🔄 Middleware support (JSON parsing, error handling)  
- 📂 Opinionated, modular structure: routes, controllers, services, entities, middlewares, utils, types

---

## 📚 Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- Mongoose (MongoDB)  
- Nodemon / ts-node for development

---

## 📂 Project Structure

```plaintext
.
├─ README.md
├─ package.json
├─ tsconfig.json
├─ .eslintrc.json
├─ nodemon.json
├─ .gitignore
├─ .husky/
└─ src/
   ├─ index.ts               # App entry: load env, connect to DB, mount routes, start server
   ├─ routes/
   │  └─ health.route.ts     # Example route (GET /health)
   ├─ controllers/           # HTTP layer: parse/validate requests, call services
   ├─ services/              # Business logic to query DB
   ├─ entities/              # Mongoose schemas / persistence models
   ├─ middlewares/           # Express middlewares (auth, errors, logging)
   ├─ utils/                 # Reusable helpers
   └─ types/                 # Shared TypeScript types / DTOs
```

---

## ⚙️ Configuration / Environment

Create a `.env` (ignored by git) with:

- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- PORT (optional, defaults to 8080)

The DB connection is configured in `src/index.ts`.

---

## 🔧 Setup & Usage

1. Install dependencies:
```bash
npm install
```

2. Run in development:
```bash
npm run dev
```

3. Build:
```bash
npm run build
```

4. Start (production):
```bash
npm start
```

5. Lint:
```bash
npm run lint
```

6. Prepare Husky hooks:
```bash
npm run prepare
```

---

## 🧭 Where to add features

- routes: wire endpoints to controllers  
- controllers: HTTP input/output mapping, status codes  
- services: core business logic (testable, no HTTP)  
- entities: Mongoose schemas/models for persistence  
- middlewares: auth, validation, error handling, logging

Placeholder files labelled "Should remove this file" exist under src/ and can be replaced when adding real features.

---