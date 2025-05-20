# Subminder Project Summary

Subminder is a modern SaaS platform for managing business subscriptions, members, billing, notifications, and analytics. It is built with **Next.js (App Router)**, **React**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **shadcn/ui** for UI components. Authentication is handled via **NextAuth**.

---

## Key Features

### 1. Authentication & Authorization
- Uses NextAuth for secure login and session management.
- Supports roles such as **Admin**, **Manager**, and **Member**.

### 2. Business & User Management
- Businesses can register and manage their profile.
- Users (members) can be added, edited, or deleted.
- Each member is associated with a subscription plan.

### 3. Subscription Plans
- Businesses can create, edit, and delete subscription plans.
- Plans include details like name, price, duration, and features.

### 4. Members
- Members are linked to a business and a subscription plan.
- Member management includes search, pagination, and status filtering.
- Actions: Add, edit, delete members with confirmation dialogs.

### 5. Billing & Payments
- Billing and payment models are defined in the Prisma schema.
- Revenue is calculated based on member subscriptions.

### 6. Notifications
- Admins can send notifications to all members.
- Notification sending is handled via API endpoints.

### 7. Analytics
- Dashboard includes analytics such as active subscriptions, expiring subscriptions, and revenue per month.
- Revenue analytics are visualized with a bar chart (using recharts).
- Recent purchases are listed below the chart.

### 8. Settings & Profile
- Businesses can view and edit their profile.
- Password change feature with validation and secure update flow.

### 9. Contact & Signup
- Public-facing signup and contact pages with consistent UI.
- Contact form allows users to reach out to the sales team.

### 10. UI/UX
- Uses shadcn/ui for consistent, modern, and accessible UI components.
- Responsive layouts and forms with validation and helpful feedback.

---

## Technical Stack

- **Frontend:** Next.js (App Router), React, TypeScript, shadcn/ui, recharts  
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL  
- **Auth:** NextAuth.js  
- **State/Data:** React Query (TanStack Query), React Hook Form, Zod for validation  
- **Notifications:** sonner for toast notifications  
- **Other:** bcryptjs for password hashing, date-fns for date formatting  

---

## Example Flows

- **Business Registration:** Businesses sign up, fill in details, and are added to the system.
- **Subscription Management:** Admins create/edit/delete plans, assign them to members.
- **Member Management:** Admins add members, assign subscriptions, and manage their status.
- **Analytics:** Revenue is calculated per month based on member subscriptions and displayed in a bar chart.
- **Notifications:** Admins send messages to all members via a form.
- **Settings:** Businesses can update their profile and change their password securely.

---

## Project Structure (Simplified)

> In summary:  
> Subminder is a full-featured SaaS dashboard for managing business subscriptions, members, billing, analytics, and notifications, with a modern UI and robust backend. The codebase is modular, scalable, and follows best practices for modern TypeScript/React/Next.js development.