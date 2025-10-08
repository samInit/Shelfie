# Shelfie

Shelfie is a full-stack inventory management application with a **Next.js + TailwindCSS frontend** and a **Node.js/Express backend**. The app is structured as a monorepo with separate `client` and `server` directories and is deployed with **AWS Amplify** (frontend) and **AWS EC2** (backend).

---

## Features

* **Modern UI** with Next.js (React + TypeScript) and TailwindCSS
* **Backend API** built with Node.js/Express (TypeScript)
* Deployed on **AWS Amplify (Frontend)** and **AWS EC2 (Backend)**
* Monorepo structure for easy development
* ESLint + Prettier for code quality
* PM2 ecosystem config for server deployment

---

## Project Structure

```
Shelfie-main/
├── client/     # Frontend (Next.js + Tailwind)
├── server/     # Backend (Node.js + Express)
└── .gitignore
```

### Client

Located in `client/`:

* Next.js app with TypeScript
* TailwindCSS for styling
* ESLint configuration

### Server

Located in `server/`:

* Node.js/Express backend (TypeScript)
* PM2 process manager configuration (`ecosystem.config.js`)

---

## ⚙️ Installation & Setup (Local Development)

### Clone the Repository

```bash
git clone https://github.com/your-username/Shelfie.git
cd Shelfie-main
```

### Install Dependencies

* For the **client**:

```bash
cd client
npm install
```

* For the **server**:

```bash
cd server
npm install
```

### Run the Development Servers

* **Client (Next.js)**:

```bash
npm run dev
```

* **Server (Node.js)**:

```bash
npm run dev
```

---

## Build & Deployment

### Frontend (AWS Amplify)

1. Push your code to GitHub.
2. Connect your GitHub repo to AWS Amplify.
3. Amplify automatically builds and deploys the frontend.

### Backend (AWS EC2)

1. SSH into your EC2 instance.
2. Pull the latest code from your repository.
3. Install dependencies:

   ```bash
   cd server
   npm install
   ```
4. Start the backend with PM2:

   ```bash
   pm2 start ecosystem.config.js
   ```

---

## Tech Stack

* **Frontend**: Next.js, React, TypeScript, TailwindCSS
* **Backend**: Node.js, Express, TypeScript
* **Deployment**: AWS Amplify, AWS EC2, PM2
* **Tools**: ESLint, PostCSS

---

## License

This project is licensed under the MIT License.
