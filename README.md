# Eindopdracht PGM 4 Backlog-app
---------------------------------
# 🧹 Kanban Board App

Een full-stack Kanban Board applicatie, gebouwd met **React**, **Vite**, **React Router**, **React Query**, en een back-end (server) naar keuze. Geschikt voor taakbeheer, projecttracking, en teamworkflow visualisatie.

---

## 📁 Projectstructuur

```bash
kanban-board/
├── client/       # Front-end applicatie (React + Vite)
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
└── server/       # Back-end API (bijv. Node.js/Express of een andere stack)
    ├── src/
    ├── .env
    └── package.json
```

---

## 🚀 Client (Frontend)

### 📦 Installatie

```bash
cd client
npm install
```

### ⚙️ Scripts

* `npm run dev` – Start de Vite dev-server
* `npm run build` – Maakt een productiebuild
* `npm run preview` – Bekijkt de productiebuild lokaal
* `npm run lint` – Voert ESLint uit op de codebase
* `npm run format` – Formatteert code met Prettier

### 🔧 Belangrijke dependencies

* **React 19**
* **Vite** – Voor snelle development builds
* **@tanstack/react-router** – Geavanceerde routing
* **@tanstack/react-query** – Data fetching & caching
* **ESLint + Prettier** – Code kwaliteit en consistentie

---

## 💻 Server (Backend)

> *(Voeg hier details toe over de gebruikte servertechnologie – zoals Express, Fastify, NestJS, enz.)*

### Voorbeeld:

```bash
cd server
npm install
npm run dev
```

* API-endpoints voor taken, Projecten 
*  gebruik van een database (Strapi)
* CORS-configuratie t.b.v. frontend toegang

---



[➡️ Bekijk de live applicatie op Netlify](https://backlog-project.netlify.app/)
