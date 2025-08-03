# Event Showcase App with Clerk Authentication & Tiered Access

A Next.js 13 App Router project integrating Clerk Authentication to manage user sign-in, tiered access (Free, Silver, Gold, Platinum), and dynamic dashboards. Users select their access tier upon first visit and can upgrade anytime via an Upgrade Page.

✨ Features

🔒 Authentication & Authorization powered by Clerk.dev

🏷️ Tier-Based Access Control using Clerk Public Metadata

📊 Dashboard displaying events filtered by user tier

🚀 Tier Selection Popup on first visit

🔄 Upgrade Plan Page to switch between tiers

🗂️ API Routes protected with Clerk tokens (SSG/SSR-safe)

💅 Built with TailwindCSS for UI styling


# 🛠️ **Tech Stack**

Next.js 13 App Router

Clerk.dev (Authentication & User Metadata)

Tailwind CSS

Supabase 


# 🚀 **Getting Started**
1. Clone the Repository

```
git clone https://github.com/yourusername/event-showcase-app.git 
cd event-showcase-app
```
2. Install Dependencies
```
npm install
# or
yarn install
```

3. Environment Variables
Create a .env.local file with the following:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```
4. Run the Development Server
   
```
npm run dev
```
Visit http://localhost:3000 in your browser.

🧪 **Demo Credentials**

**You can also create a new account, and upon your first login, you’ll be prompted to select your desired tier (Free, Silver, Gold, or Platinum) before accessing the dashboard.**

Use the following demo accounts to explore the app:

(free tier)

username: majesticallypickover
password: majesticallypickover

(silver tier)

username: overincompatibleclay
password: overincompatibleclay

(gold tier)

username: oversubstantiatefile
password: oversubstantiatefile

(platinum tier)

username: overcoordinationcrib
password: overcoordinationcrib
