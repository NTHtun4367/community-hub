# CODA - Developer Forum

CODA is a high-performance, full-stack discussion platform designed for developers. Built with the latest web technologies, it features a robust authentication system, real-time engagement mechanics, and a seamless Stripe-powered subscription model.

---

## 🚀 Features

* **Secure Authentication:** Email/Password and Google, GitHub OAuth integration powered by **Better Auth**.
* **Dynamic Content:** Create, edit, and delete posts with support for rich text and image uploads.
* **Engagement System:** Nested commenting and a Reddit-style upvote/downvote system.
* **Premium Subscriptions:** Tiered access via **Stripe** with automated webhook synchronization.
* **Visual Perks:** Exclusive UI enhancements for premium members, including special effects on post cards.
* **User Profiles:** Dedicated dashboards tracking user stats, payment history, and membership status.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Frontend:** React 19, TypeScript, Tailwind CSS 4
* **UI Components:** shadcn/ui + Radix UI
* **Database & ORM:** Prisma ORM, PostgreSQL
* **Auth:** Better Auth
* **Payments:** Stripe API + Webhooks
* **Validation & Forms:** Zod + React Hook Form + next-safe-action

---

## 🎤 Presentation Demo Flow

1. **Onboarding:** Sign up as a new user or use GitHub or Google OAuth.
2. **Content Creation:** Create a new post featuring tags and formatted text.
3. **Community Interaction:** Add a comment and demonstrate the voting system.
4. **Monetization:** Navigate to the profile, initiate the Stripe checkout, and complete a test payment.
5. **Validation:** Trigger the webhook to show the real-time status update and the "Premium" visual flair on your posts.
