# CI/CD Pipeline Architecture & GitHub Actions Guide

This document specifies the Continuous Integration and Continuous Deployment (CI/CD) pipelines configured for **Kelas Pekerja**.

---

## ⚙️ GitHub Actions Workflows

The repository uses automated GitHub Actions workflows located in `.github/workflows/`.

### 1. Continuous Integration (`ci.yml`)

- **Triggers**: Push events to `main` / `develop` branches, or Pull Requests.
- **Jobs**:
  1. **Linting**: Runs ESLint static analysis (`npm run lint`).
  2. **Type Safety**: Validates TypeScript compilation (`npx tsc --noEmit`).
  3. **Unit Tests**: Executes Jest test suites (`npm test`).
  4. **Build Verification**: Ensures Next.js production build compiles without errors (`npm run build`).

### 2. Automated Deployment (`deploy-vercel.yml`)

- **Triggers**: Successful completion of CI on the `main` branch or manual `workflow_dispatch`.
- **Target**: Vercel Production Environment via Vercel CLI action.

### 3. Backup Deployment Target (`deploy-netlify.yml`)

- **Triggers**: Manual `workflow_dispatch` or optional secondary branch push.
- **Target**: Netlify hosting platform.

---

## 🔒 Required GitHub Secrets

Configure the following encrypted secrets in repository settings (**Settings** -> **Secrets and variables** -> **Actions**):

### Vercel Deployment Secrets

| Secret Key | Description | Source |
| :--- | :--- | :--- |
| `VERCEL_TOKEN` | Personal Access Token with full account deployment rights | Vercel Account Settings -> Tokens |
| `VERCEL_ORG_ID` | Organization or Team Identifier | `.vercel/project.json` (`orgId`) |
| `VERCEL_PROJECT_ID` | Specific Vercel Project Identifier | `.vercel/project.json` (`projectId`) |

### Netlify Deployment Secrets (Optional)

| Secret Key | Description | Source |
| :--- | :--- | :--- |
| `NETLIFY_AUTH_TOKEN` | Personal Access Token for Netlify API | Netlify User Settings -> Access Tokens |
| `NETLIFY_SITE_ID` | Target site API identifier | Netlify Site Settings -> General |

---

## 🚀 Branch Protection Rules

To maintain main-branch stability:

1. Require status checks to pass before merging (`CI / lint`, `CI / test`, `CI / build`).
2. Require code reviews for Pull Requests targeting `main`.
