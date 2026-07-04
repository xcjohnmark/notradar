# 02 — Pre-Launch Landing Page

<!-- Plan Status: 🟢 Completed -->

## Overview
This plan covers the initialization and building of the Notradar pre-launch landing page. The goal is to set up a professional Next.js + TypeScript + Tailwind CSS project, configure Git and link it to the remote GitHub repository, and build a high-fidelity single-page web app with waitlist email collection (saved to a local `waitlist.json` file) and brand styling.

### Success Criteria
1. Next.js app compiles and builds with zero errors.
2. Local Git repo is initialized, linked to `https://github.com/xcjohnmark/notradar.git`, and successfully pushed.
3. Waitlist submissions save emails to a local `waitlist.json` file.
4. UI matches the brand guidelines: dark-mode terminal layout, Satoshi/JetBrains Mono fonts, Electric Cyan active accents, sharp horn logo, prominent headline, email input box, and a link to X (Twitter) in the footer.

---

## Phases

### Phase 1: Git & Project Setup
#### Task 2.1: Initialize Git and Create Next.js App
- **Description:** Initialize Git, configure `.gitignore` (ignoring `.next`, `node_modules`, and `waitlist.json`), set up Next.js with TypeScript and Tailwind CSS v4 in the workspace root, and hook up the remote GitHub repository.
- **Agent Prompt:**
  ```
  Initialize a local git repository in the workspace root. Create a .gitignore file that excludes node_modules, .next, out, .env*, and waitlist.json. Run npx -y create-next-app@latest ./ --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm. (Note: use non-interactive flags or accept defaults). Once initialized, add the remote repository 'https://github.com/xcjohnmark/notradar.git', commit the files, and prepare to push.
  ```
- **Acceptance Criteria:**
  - Running `git status` shows a clean working directory (excluding ignored files).
  - Next.js files exist in `src/app/`.
  - Running `git remote -v` shows `https://github.com/xcjohnmark/notradar.git`.
- **Dependencies:** None

---

### Phase 2: Brand Configuration
#### Task 2.2: Setup Fonts and CSS Design Tokens
- **Description:** Configure Tailwind CSS v4 and import Satoshi and JetBrains Mono fonts. Set up the brand color palette as CSS variables or utility classes. Place the logo image in the public assets directory.
- **Agent Prompt:**
  ```
  Copy c:\Users\ADMIN\Documents\notradar\bayse\plan\01-brand\notradar-logo-1.png into public/logo.png. Import the Satoshi font stack (headings/body) and JetBrains Mono (data/monospace) in src/app/layout.tsx using Google Fonts or Fontshare CDN link tags. Update src/app/globals.css to setup Tailwind v4 themes and define the brand color variables:
  - Base Background: #0A0E1A (Dark Navy)
  - Surface Card: #111827
  - Primary Cyan: #00D4FF
  - Secondary Amber: #F5A623
  - Text Primary: #F1F5F9
  ```
- **Acceptance Criteria:**
  - Fonts are preloaded/imported in the layout.
  - Global CSS imports Tailwind and defines the brand variables.
  - Logo file is accessible at `/logo.png`.
- **Dependencies:** Task 2.1

---

### Phase 3: Waitlist Functionality
#### Task 2.3: Build Waitlist Server Action
- **Description:** Create a Next.js Server Action that receives the email submission, validates that it is a valid email, and appends it to `waitlist.json` in the root workspace directory.
- **Agent Prompt:**
  ```
  Create a server action in src/app/actions.ts. The action should accept an email address, validate it on the server, read the existing waitlist.json file (creating it if it doesn't exist), append the email with a timestamp, and write it back. Return a success or error message to the client. Ensure waitlist.json is created in the workspace root directory.
  ```
- **Acceptance Criteria:**
  - Submitting a valid email appends a JSON record with `{ "email": "...", "timestamp": "..." }` to `waitlist.json`.
  - Server Action prevents duplicate signups and invalid emails.
- **Dependencies:** Task 2.1

---

### Phase 4: UI Development
#### Task 2.4: Build Landing Page Component
- **Description:** Build the main page layout in `src/app/page.tsx`. It must feature the brand logo, a bold headline ("Your Edge on Bayse Markets"), a terminal-style input form with active cyan glows, a list of teaser features, and a link to X (Twitter) in the footer.
- **Agent Prompt:**
  ```
  Update src/app/page.tsx to render a dark terminal-inspired landing page.
  Include:
  - Header: Logo image (/logo.png) and the name "Notradar".
  - Hero Section: High-impact main headline ("Your Edge on Bayse Markets") with a subtitle explaining the prediction markets copytrading platform.
  - Email Waitlist Box: A centered input field for email addresses with a glowing Electric Cyan button ("Get Edge" or "Join Waitlist"). It should handle submission status (loading, success, error) with smooth UI feedback.
  - Teaser Grid: Summarize 3 core Phase 1 features (Leaderboard, Market Browser, Multi-Currency support) in premium dark-mode card modules.
  - Footer: A link to the X (Twitter) page (https://x.com/notradar) using a clean design.
  ```
- **Acceptance Criteria:**
  - UI looks premium and respects dark mode styling.
  - Layout is fully responsive.
  - Waitlist form gives success/error state feedback.
- **Dependencies:** Task 2.2, Task 2.3

---

### Phase 5: Verification and Deploy
#### Task 2.5: Build Check & Push to GitHub
- **Description:** Verify the build compiles correctly with zero errors/warnings, and push all local changes to the remote GitHub repository.
- **Agent Prompt:**
  ```
  Run npm run build to verify that there are no compilation errors. Commit all changes locally. Push the commits to the main/master branch of the remote repository https://github.com/xcjohnmark/notradar.git.
  ```
- **Acceptance Criteria:**
  - Command `npm run build` succeeds.
  - Repository changes are pushed to GitHub.
- **Dependencies:** Task 2.4
