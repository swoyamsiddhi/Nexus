# SRM Connect — Campus Engagement Platform

SRM Connect is a comprehensive campus platform designed for SRM University students to discover events, join clubs, find hackathon teammates, and collaborate on projects. Built with a focus on modern aesthetics, real-time engagement, and specific campus rules.

## 🚀 Tech Stack

- **Web**: Next.js 14 (App Router), Tailwind CSS, Shadcn/UI, Lucide Icons.
- **Mobile**: React Native with Expo, NativeWind (Tailwind), FlashList.
- **Backend & Auth**: Supabase (PostgreSQL, Realtime, Storage, Auth).
- **Hosting**: Vercel (Web), Expo Application Services (Mobile).

## 🛠️ Prerequisites

- **Node.js**: v18+ 
- **Supabase Account**: Required for database and authentication.
- **Vercel CLI**: For deployment (`npm i -g vercel`).
- **Expo Go**: For testing the mobile app on physical devices.

---

## 🏗️ Local Development Setup

### 1. Web Setup
```bash
git clone <your-repo-url>
cd srm-connect-web
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Run Development Server
```bash
npm run dev
```

---

## 🌩️ Supabase Configuration

For a detailed step-by-step walkthrough, refer to the [Supabase Setup Guide](file:///Users/swoyamsiddhipattanayak/.gemini/antigravity/brain/e8abeb4d-fad7-4619-b020-d96556b304e0/supabase_guide.md).

### 1. Database Schema
Run the SQL from `supabase_setup.sql` in your Supabase SQL Editor. This sets up:
- **Tables**: `users`, `clubs`, `events`, `registrations`, `team_posts`, `projects`, etc.
- **RLS Policies**: Secure access control for all data.
- **Auth Trigger**: Automatically creates a profile record on signup.

### 2. Auth Rules
Go to **Authentication -> Providers -> Email Domains** and add `srmist.edu.in`. This ensures only verified students can sign up.

### 3. Storage Buckets
Create the following public buckets:
- `avatars`
- `club-assets`
- `event-banners`

---

## 🚢 Deployment to Vercel

### 1. Build Check
Ensure your app builds locally:
```bash
npm run build
```

### 2. Deploy
Use the Vercel CLI or connect your GitHub repo to Vercel.
```bash
vercel --prod
```

### 3. Set Vercel Env Vars
Add the following in your Vercel Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Mark as Secret)

### 4. Auth Callbacks
In Supabase **Auth -> URL Configuration**, set the base site URL to your Vercel deployment and add `/auth/callback` to the redirect URLs.

---

## 📱 Mobile App (Expo)

Find the mobile code base in the `srm-connect-mobile` directory.

```bash
cd srm-connect-mobile
npm install
npx expo start
```

For more details on mobile features, refer to the documentation inside that directory.

---

## 🛡️ License
Built for SRM University. All rights reserved.
