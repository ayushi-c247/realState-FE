# SkillSome (Frontend)

This repository contains the frontend for **SkillSome**, a Learning Management System (LMS) built using **Next.js 15** with TypeScript, Mantine UI, and React Query.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** Mantine UI
- **State Management:** Context API / Zustand (If needed)
- **API Data Fetching:** React Query (@tanstack/react-query)
- **Linting & Formatting:** ESLint, Prettier
- **Testing:** Cypress
- **Error Monitoring:** Sentry
- **Commit Standardization:** Husky & Commitlint

---

## 📦 Project Setup

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 18)
- **pnpm** (preferred) or npm/yarn

### 2️⃣ Clone the Repository

```sh
  git clone https://github.com/your-repo/skillsome_FE.git
  cd skillsome_FE
```

### 3️⃣ Install Dependencies

```sh
  pnpm install  # or npm install / yarn install
```

```sh
  pnpm install  # or npm install / yarn install
```

## Folder Structure

```
frontend/
├── src/
│   ├── app/                     # Next.js app router files and layouts
│   ├── components/              # Reusable UI components (Mantine-based)
│   ├── hooks/                   # Custom React hooks (Mantine-based-hooks/Custome-hooks)
│   ├── lib/                     # API calls, utilities, etc.
│   ├── public/                  # Static assets (images, fonts, etc.)
│   ├── store/                   # State management (React Query)
│   ├── styles/                  # Global styles (TailwindCSS)
│   ├── types/                   # TypeScript interfaces & types
│   ├── utils/                   # Helper functions
│   ├── services/                # API services
│   └── config/                  # Application-wide configuration
├── .env                         # Environment variables
├── next.config.js               # Next.js configuration file
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

### 4️⃣ Environment Variables

Create a `.env.local` file and add required environment variables.

```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

### 5️⃣ Start Development Server

```sh
  pnpm dev  # or npm run dev / yarn dev
```

---

## 🔍 Linting & Code Formatting

This project follows strict linting and formatting rules.

### Run Linter

```sh
pnpm lint  # or npm run lint
```

### Auto-fix Linting Issues

```sh
pnpm lint --fix
```

---

## 🛠️ Husky Setup

Husky is used to enforce commit and branch naming conventions.

### Pre-commit Hooks (Lint Staged)

```json
"lint-staged": {
  "src/**/*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

### Branch Naming Convention

Valid branch names:

- `main`, `development`, `production`, `release`, `husky`
- Feature branches: `feat/your-feature-name`
- Bug fixes: `fix/your-bug-name` or `hotfix/your-hotfix-name`
- Refactoring: `refactor/your-refactoring`
- Optimization: `optm/your-optimization`
- JIRA-based: `SWAHT-123/your-task`

Invalid branch names will be rejected by Husky.

---

## 🛑 Commit Standardization (Commitlint)

We follow **Conventional Commits** for commit messages:

```sh
feat: add new login page
fix: resolve logout issue
refactor: improve API structure
optm: optimize database queries
```

Husky enforces commit messages using `commitlint` before committing.

---

## 🛡️ Sentry Integration

Sentry is configured for error monitoring.

### Configuration in `next.config.js`

```ts
import { withSentry } from "@sentry/nextjs";

const nextConfig = {
  reactStrictMode: true,
};

export default withSentry(nextConfig);
```

---

## 🏗️ Production Build

To generate an optimized production build:

```sh
pnpm build  # or npm run build / yarn build
```

---

## 🧪 Running Tests (Will start from phase 2...)

We use **Cypress** for end-to-end testing.

```sh
pnpm cypress open  # or npm run cypress:open
```

---

## ⚡ Aliases Configuration

This project uses **absolute imports** for better code organization.

Aliases are configured in `tsconfig.json`:

```json
"paths": {
  "@/components/*": ["components/*"],
  "@/lib/*": ["lib/*"],
  "@/config/*": ["config/*"]
}
```

Use them in imports like this:

```ts
import Button from "@/components/Button";
```

---

## 🔗 Useful Commands

| Command             | Description                 |
| ------------------- | --------------------------- |
| `pnpm dev`          | Start development server    |
| `pnpm build`        | Build production-ready code |
| `pnpm start`        | Run built project           |
| `pnpm lint`         | Run ESLint                  |
| `pnpm cypress open` | Run end-to-end tests        |

---

## 📜 License

MIT License © 2025 SkillSome.

---

Happy coding! 🎉
