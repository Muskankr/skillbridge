# 🚀 SkillBridge

### Your Skills. Your Achievements. Your Career — One Platform.

SkillBridge is a full-stack developer career platform designed to help students and developers build, manage, and showcase their technical journey in one place.

Instead of keeping GitHub profiles, certificates, projects, achievements, resumes, and learning progress scattered across different platforms, SkillBridge brings them together into a single, clean, shareable developer profile.

🔗 **Live Demo:** https://skillbridge-zeta-ten.vercel.app/

---

## ✨ Why SkillBridge?

As a student developer, your achievements are often spread across:

- GitHub
- LinkedIn
- Certificates
- Coding platforms
- Projects
- Hackathons
- Open-source contributions
- Resumes
- Personal portfolios

SkillBridge aims to solve this problem by creating **one centralized career profile** where developers can showcase their skills, achievements, projects, and progress.

> **One profile. Every achievement.**

---

## 🎯 Features

### 👤 Developer Profile

Create a professional developer profile containing:

- Full name
- Username
- Profile picture
- Headline
- Bio
- College and branch
- Graduation year
- Location
- Social links
- Career score
- Profile completion

---

### 💼 Developer Portfolio

Build a professional portfolio from your SkillBridge profile.

Showcase:

- Projects
- Technical skills
- Achievements
- Certificates
- Education
- GitHub activity
- Career progress

The goal is to provide developers with a single profile that can be shared with recruiters, mentors, teammates, and other developers.

---

### 🐙 GitHub Integration

SkillBridge connects with GitHub to retrieve public GitHub information.

Currently integrated information includes:

- GitHub profile
- Avatar
- Username
- Bio
- Public repositories
- Followers
- Following
- Location
- Latest repositories
- Repository descriptions
- Stars
- Forks
- Primary programming language
- Repository update dates

This helps developers showcase their GitHub activity without manually entering every repository.

---

### 🏆 Achievements

Keep important developer achievements organized in one place.

Examples include:

- Open-source achievements
- Hackathon achievements
- Competition achievements
- Community achievements
- Certifications
- Development milestones

---

### 📜 Certificates

Store certificates and verification information so they can be easily showcased as part of your developer profile.

---

### 📊 Career Score

SkillBridge includes a career-oriented scoring system designed to give developers an overview of their progress.

The profile can track factors such as:

- Profile completion
- Projects
- Achievements
- Skills
- GitHub presence
- Learning activity

---

### 🔥 XP & Gamification

SkillBridge includes gamification elements to encourage consistent learning and development.

Developers can earn XP and progress through levels as they complete activities.

---

### 📅 Daily Challenges

Daily challenges encourage developers to maintain consistency and continuously improve their technical skills.

---

### 📈 Profile Progress

Track your career profile and identify areas that can be improved.

SkillBridge provides profile completion and progress information to help developers build a stronger professional presence.

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React
- ▲ Next.js
- 🟦 TypeScript
- 🎨 Tailwind CSS

### Backend & Database

- ⚡ Supabase
- 🐘 PostgreSQL
- 🔐 Supabase Authentication
- 🗄️ Supabase Database

### APIs & Integrations

- 🐙 GitHub REST API

### Deployment

- ▲ Vercel

---

## 🏗️ Project Structure

```text
SkillBridge/
│
├── src/
│   │
│   ├── app/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── ...
│   │
│   ├── components/
│   │
│   ├── features/
│   │   ├── github/
│   │   │   └── services/
│   │   │       └── github.service.ts
│   │   │
│   │   └── ...
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   └── ...
│
├── public/
│
├── package.json
├── next.config.*
├── tsconfig.json
└── README.md


