# Job Notifier Admin Panel

A modern, responsive, feature-rich administration dashboard built with **React**, **Vite**, **Material UI (MUI)**, and **Material React Table (MRT)** for managing job listings, alert notices, media assets, user accounts, and interactive scheduled tasks.

---

## 1. Overview

**Job Notifier Admin** serves as the administrative portal for the Job Notifier ecosystem. It empowers administrators to manage recruitment notifications, publish job alerts, organize media files (PDF advertisements, images), schedule tasks using an interactive calendar grid, and manage user accounts securely.

### Key Features

- **Job & Notice Management**: CRUD operations for job listings and alerts with active/archived status toggles.
- **Media Asset Manager**: File uploader (PDF/Image support up to 10MB), visibility controls (Public/Private), direct file downloading, and URL copy.
- **Interactive Calendar**: Full-width monthly calendar grid displaying date-wise task counters and modal task management.
- **Authentication & Security**: Login, registration with CAPTCHA and OTP verification, and account recovery.
- **Rich UI & Aesthetics**: Built with customized Material-UI themes, Inter typography, glassmorphism elements, and smooth animations.

---

## 2. Project Requisite

To run this project locally, ensure your system has the following software installed:

- **Node.js**: `v18.x` or `v20.x` (or higher) — [Download Node.js](https://nodejs.org/)
- **Package Manager**: `npm` (comes bundled with Node.js) or `yarn` / `pnpm`
- **Git**: Command-line client — [Download Git](https://git-scm.com/)
- **Web Browser**: Any modern browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Brave)

---

## 3. Project Setup

Follow these steps to set up and run the project on your local environment:

### Step 1: Clone the Repository

```bash
git clone https://github.com/sahityagaurav4210/jnotifier-admin.git
cd jnotifier-admin
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory of the project and populate it with the required environment configurations:

```env
VITE_WHATSAPP_CHANNEL_LINK=""
VITE_TELEGRAM_CHANNEL_LINK=""
VITE_API_BASE_URL="http://localhost:7789/api/v1"
VITE_PRODUCTION_ADMIN_PANEL_URL="http://localhost:5173"
```

### Step 3: Install Dependencies

Run the following command to install all required npm packages:

```bash
npm install
```

### Step 4: Run the Project Locally

Start the Vite development server:

```bash
npm run dev
```

The application will launch locally at `http://localhost:5175` (or `http://localhost:5173`).

### Step 5: Build for Production (Optional)

To generate a production-ready minified bundle:

```bash
npm run build
```

**Note:** Apart from these above stated points, you must have setup the backend service of `jnotifier`, as without this you won't be able to run this frontend client locally in your system.

---

## 4. About the Author

This project is designed and developed by **Sahitya Gaurav**.

- **GitHub Profile**: [@sahityagaurav4210](https://github.com/sahityagaurav4210)
- **Role**: Full-Stack Software Engineer. Visit his [website](https://www.sgaurav.me) for more details.

---

_Built with ❤️ by Gaurav Sahitya. Made in <img src="./src/assets/ind-flag.svg" alt="Indian Flag" width="24" height="24"/>_
