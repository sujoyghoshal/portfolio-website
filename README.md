# Sujoy Ghoshal Portfolio Platform

<p align="center">
	<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=0B0F19" alt="React" />
	<img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
	<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
	<img src="https://img.shields.io/badge/Paytm-Payment-00BAF2?style=for-the-badge&logo=paytm&logoColor=white" alt="Paytm" />
	<img src="https://img.shields.io/badge/Google%20Sheets-Apps%20Script-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" alt="Google Sheets" />
	<img src="https://img.shields.io/badge/Admin-Dashboard-F97316?style=for-the-badge&logo=datadog&logoColor=white" alt="Admin Dashboard" />
</p>

<p align="center">
	Personal portfolio platform with a React frontend, Node.js payment API, local admin authentication flow, Google Sheets contact capture, animated admin analytics UI, and a documented roadmap for Spring Boot, Django, GraphQL, AI, AWS, and microservice expansion.
</p>

## Overview

This repository is the codebase for Sujoy Ghoshal's developer portfolio. It combines a modern single-page frontend with supporting backend APIs and a portfolio-focused admin experience.

The current project already includes:

- A responsive React and Vite frontend
- Login, signup, and protected admin dashboard routes
- Real Paytm backend endpoints for transaction initiation and status verification
- Google Sheets integration through Google Apps Script
- Portfolio chatbot UI for guided visitor interaction
- Analytics-style admin dashboard cards and graph components

This README also documents the larger target architecture requested for the platform, including GraphQL, Spring Boot, Django modules, SQL-backed production auth, AWS deployment, S3 buckets, EC2 hosting, AI/ML microservices, LLM integration, and cloud automation.

## Live Project Status

| Module | Status | Notes |
| --- | --- | --- |
| React frontend portfolio | Implemented | Built with React, Vite, Framer Motion, React Router |
| Responsive UI sections | Implemented | Hero, About, Services, Skills, Projects, Education, Testimonials, Contact |
| Chat assistant widget | Implemented | Rule-based portfolio chatbot UI |
| Login and signup pages | Implemented | Browser-side user registration and login |
| Admin dashboard | Implemented | Protected route with KPI cards, charts, documents, user data views |
| Admin authentication | Partially implemented | Current auth uses localStorage and client-side route protection |
| Paytm payment backend | Implemented | Node.js and Express APIs with checksum signing |
| Paytm payment UI | Partially implemented | UI exists, status page is connected, full frontend checkout initiation is not wired yet |
| Payment status verification | Implemented | Frontend calls backend status endpoint |
| Google Sheets API flow | Implemented | Uses Google Apps Script GET-based submission |
| Nodemailer email service | Planned | Not present in current codebase |
| SQL database | Planned | Not present in current codebase |
| GraphQL API | Planned | Not present in current codebase |
| Spring Boot microservice | Planned | Documented target backend option |
| Django module | Planned | Documented target backend option |
| React Native app | Planned | Mobile extension target |
| AWS EC2 deployment | Planned | Documented deployment target |
| AWS S3 bucket storage | Planned | Documented storage target |
| AI/ML microservice | Planned | Documented roadmap |
| Claude or LLM integration | Planned | Documented AI assistant roadmap |

## Implemented Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7, Framer Motion, Lucide React |
| Backend | Node.js, Express, CORS, dotenv |
| Payment | Paytm Checkout flow, Paytm checksum signing |
| Forms and lead capture | Google Sheets, Google Apps Script |
| Auth storage | Browser localStorage |
| Tooling | ESLint, Nodemon, Concurrently |
| Hosting target | Vercel-ready frontend plus external Node API |

## Feature Breakdown

| Feature | Description |
| --- | --- |
| Portfolio landing experience | Presents profile, skills, services, experience, projects, education, testimonials, and contact CTA |
| Service pricing section | Allows visitors to select services and estimate pricing |
| Payment area | Supports service selection and Paytm-ready backend integration |
| Payment status screen | Verifies Paytm order state using backend API |
| Chat assistant | Lets users ask short portfolio questions through an in-page bot panel |
| Contact capture | Sends contact forms and collaboration emails into Google Sheets |
| Signup page | Registers users with password policy validation |
| Login page | Supports both user and admin sign-in flow |
| Protected admin route | Redirects non-admin users away from the dashboard |
| Admin dashboard analytics | Shows metrics, charts, activity, user storage data, and documents |

## Project Structure

| Path | Purpose |
| --- | --- |
| src/pages/Home.jsx | Main portfolio page composition |
| src/pages/Login.jsx | Login UI |
| src/pages/Signup.jsx | Signup UI |
| src/pages/AdminDashboard.jsx | Protected admin dashboard with charts and admin panels |
| src/pages/PaymentStatus.jsx | Paytm payment verification UI |
| src/components/Payment.jsx | Service pricing and payment modal UI |
| src/components/ChatAssistant.jsx | Portfolio chatbot widget |
| src/components/Contact.jsx | Contact section wired to Google Sheets helpers |
| src/utils/auth.js | Client-side auth, signup, admin session, and login activity helpers |
| src/utils/googleSheets.js | Google Apps Script request helpers |
| server/index.js | Express backend for Paytm payments |
| api/index.js | Serverless-friendly Express export |

## Current Authentication Design

| Item | Current implementation | Production-ready target |
| --- | --- | --- |
| User signup | Saved to localStorage | Save hashed users in SQL database |
| Admin login | Hardcoded browser-side credentials | Backend-validated admin auth with JWT or session cookies |
| Route protection | Client-side route guard | Server-side authorization and token validation |
| Audit trail | Login activity stored in localStorage | Database audit tables and monitoring |
| Password storage | Plain client-side storage | Hashed passwords using bcrypt or Argon2 |

Important: the current auth flow is suitable for a portfolio demo, not for production security.

## Admin Dashboard Highlights

| Section | Included today |
| --- | --- |
| Dashboard KPIs | Registered users, recent logins, project leads, admin status |
| Social cards | LinkedIn, GitHub, mail, portfolio lead cards |
| Graphs | SVG area chart and animated bar chart |
| User insights | Registered user list and login activity |
| Documents | Public document viewer list |
| Profile and settings placeholders | Ready for extension |

## Paytm Integration

### Implemented backend capabilities

| Endpoint | Method | Purpose |
| --- | --- | --- |
| /api/health | GET | Health check |
| /api/payments/paytm/config | GET | Returns Paytm client configuration |
| /api/payments/paytm/initiate | POST | Creates Paytm transaction token |
| /api/payments/paytm/status/:orderId | GET | Verifies order status from Paytm |

### Environment variables

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_APPS_SCRIPT_URL=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL
PORT=4000
PAYTM_ENV=staging
PAYTM_MID=YOUR_PAYTM_MID
PAYTM_MERCHANT_KEY=YOUR_PAYTM_MERCHANT_KEY
PAYTM_WEBSITE=WEBSTAGING
PAYTM_MERCHANT_NAME=Sujoy Portfolio
PAYTM_CALLBACK_BASE_URL=http://localhost:5173
```

### Payment flow

1. User selects a service from the pricing section.
2. Frontend computes the payable amount.
3. Backend can create a real Paytm transaction token using merchant credentials.
4. Paytm redirects to the payment status screen.
5. Frontend verifies the order through the backend status API.

## Google API and Google Sheets Integration

The contact workflow is already connected to Google Sheets through Google Apps Script.

| Part | Current implementation |
| --- | --- |
| Frontend helper | src/utils/googleSheets.js |
| Transport style | GET request with URL parameters |
| CORS strategy | Apps Script web app plus no-cors request mode |
| Contact sheet | ContactForm |
| Collaboration email sheet | CollabEmails |

### Expected Apps Script pattern

The frontend expects a deployed Google Apps Script web app URL in VITE_APPS_SCRIPT_URL. That script should receive query params and append rows into the configured sheets.

Recommended Apps Script responsibilities:

- Validate required fields
- Route requests by sheet name
- Append timestamped rows
- Restrict origin or add secret validation if needed
- Sanitize user input before writing rows

## API Handling Strategy

| API area | Current approach | Recommended next step |
| --- | --- | --- |
| Portfolio UI APIs | Direct fetch calls | Add shared API client wrapper |
| Payment API | Express REST endpoints | Add retries, logs, and rate limiting |
| Contact data | Apps Script GET submission | Move to backend proxy if stronger validation is needed |
| Error handling | Basic try/catch and response checks | Add central error format and monitoring |
| Security | Environment variables for merchant secrets | Add secret rotation and secure server deployment |

## Proposed Production Architecture

The following modules are requested for the platform direction. They are documented here as the recommended full-stack roadmap.

| Domain | Recommended service |
| --- | --- |
| Public web frontend | React web app |
| Mobile frontend | React Native app |
| Core backend APIs | Node.js or Java Spring Boot |
| Enterprise business services | Spring Boot microservices |
| Auxiliary modules | Django admin or mail/reporting module |
| API gateway | REST gateway with optional GraphQL layer |
| Authentication | JWT or session-based auth backed by SQL |
| Database | MySQL or PostgreSQL |
| File storage | AWS S3 bucket |
| Compute | AWS EC2 instances or container services |
| Email service | Nodemailer or SES-based mail module |
| AI assistant | Claude, OpenAI, or custom LLM gateway |
| AI/ML inference | Separate Python microservice |
| Analytics | Dashboard service plus event tracking |
| CI/CD | GitHub Actions or Jenkins deployment pipeline |

## Suggested Microservice Layout

| Service | Tech choice | Responsibility |
| --- | --- | --- |
| portfolio-web | React | Public website and dashboard UI |
| payment-service | Node.js or Spring Boot | Paytm merchant operations and payment verification |
| auth-service | Spring Boot or Node.js | Registration, login, JWT, roles, sessions |
| profile-service | Spring Boot | Projects, testimonials, portfolio content CRUD |
| contact-service | Node.js or Django | Contact form ingestion, lead tracking, mail sending |
| mail-service | Node.js with Nodemailer | OTP, inquiry, and admin notification emails |
| ai-service | Python FastAPI | AI inference, prompts, embeddings, chatbot orchestration |
| graphql-gateway | Node.js Apollo Server | Unified GraphQL schema over REST services |
| analytics-service | Spring Boot or Node.js | Events, dashboard metrics, reports |

## GraphQL Expansion Plan

GraphQL is not implemented in the current repository, but it fits well as an aggregation layer once multiple services exist.

| GraphQL area | Planned usage |
| --- | --- |
| profile queries | Fetch hero, projects, skills, testimonials, services |
| admin queries | Fetch users, leads, payment summaries, dashboard metrics |
| mutations | Login, signup, update profile content, create payments, submit contact forms |
| AI queries | Chat prompts, assistant summaries, recommendation responses |

## SQL Database Plan

Recommended core tables for production:

| Table | Purpose |
| --- | --- |
| users | User identities and roles |
| auth_sessions | Session or refresh-token tracking |
| login_audit | Security and activity history |
| contacts | Contact form submissions |
| collaboration_leads | Email capture records |
| payments | Order records, amount, provider status |
| projects | Editable project content |
| testimonials | Portfolio review content |
| chatbot_logs | Bot interaction tracking |

## Nodemailer and Real Email Module Plan

Planned email automations:

- Contact form confirmation mail to the visitor
- Admin notification mail for each new lead
- Payment confirmation mail after verified transaction
- Welcome mail after user signup
- OTP or password reset mail for secure authentication

Possible stack:

| Module | Recommendation |
| --- | --- |
| Email library | Nodemailer |
| SMTP provider | Gmail App Password for testing, SES or Resend for production |
| Template engine | React Email, Handlebars, or MJML |

## Spring Boot and Django Attachment Plan

| Backend path | Recommended use |
| --- | --- |
| Spring Boot | Core enterprise APIs, auth, payments, admin business logic, microservices |
| Django | AI admin tools, reporting panel, mail automation, quick internal CMS modules |
| Node.js | Frontend support APIs, lightweight services, GraphQL gateway, realtime features |

## AI, ML, LLM, and Chatbot Roadmap

The current chatbot is rule-based. The following is the target AI architecture for a real assistant experience.

| AI module | Target capability |
| --- | --- |
| Portfolio chatbot | Natural language Q and A over profile, skills, experience, pricing |
| Claude or LLM integration | Better assistant responses, reasoning, summarization |
| AI microservice | Prompt routing, tool use, moderation, response shaping |
| ML pipeline | Lead scoring, visitor intent classification, personalized recommendations |
| Training assets | Portfolio content, FAQ, service descriptions, experience records |
| Vector memory | Retrieval over projects, resume, services, testimonials |

Recommended AI service flow:

1. Frontend chat widget sends user message to AI gateway.
2. Gateway enriches prompt with portfolio data.
3. LLM or Claude model generates response.
4. Optional retrieval layer adds context from indexed content.
5. Chat logs are stored for analytics and improvement.

## AWS Deployment Roadmap

| AWS service | Planned use |
| --- | --- |
| EC2 | Host Node.js, Spring Boot, Django, or AI microservices |
| S3 bucket | Store resumes, profile assets, documents, generated reports |
| CloudFront | CDN delivery for static frontend assets |
| RDS | Managed MySQL or PostgreSQL database |
| Route 53 | Domain and DNS management |
| IAM | Least-privilege access control |
| CloudWatch | Logs, alarms, service monitoring |
| SES | Production-grade email delivery |

## CI/CD Roadmap

| Stage | Suggested tool |
| --- | --- |
| Lint and build | GitHub Actions |
| Frontend deploy | Vercel or S3 plus CloudFront |
| Backend deploy | EC2, Docker, or container service |
| Database migrations | Automated deploy job |
| Test gates | ESLint, unit tests, API smoke tests |

Example CI/CD steps:

1. Push code to GitHub.
2. Run lint and build checks.
3. Build frontend and backend artifacts.
4. Deploy frontend to Vercel or AWS.
5. Deploy backend services to EC2 or containers.
6. Run health checks and smoke tests.

## Local Development

### Install

```bash
npm install
```

### Run frontend and backend together

```bash
npm run dev:full
```

### Run frontend only

```bash
npm run dev
```

### Run backend only

```bash
npm run server
```

### Build production frontend

```bash
npm run build
```

## Available Scripts

| Command | Description |
| --- | --- |
| npm run dev | Starts Vite frontend |
| npm run server | Starts Express backend with nodemon |
| npm run dev:full | Runs frontend and backend together |
| npm run build | Creates frontend production build |
| npm run lint | Runs ESLint |
| npm run preview | Serves built frontend locally |

## Production Upgrade Checklist

- Replace localStorage auth with real backend authentication
- Move users and leads into SQL database
- Add password hashing and JWT or session cookies
- Complete frontend Paytm checkout initiation wiring
- Add Nodemailer or SES mail notifications
- Add GraphQL gateway if multiple services are introduced
- Add Spring Boot and Django modules only where they provide clear ownership
- Deploy backend APIs on AWS EC2 or containers
- Store public assets and reports in AWS S3
- Add AI microservice for real chatbot and lead intelligence
- Add CI/CD pipeline for automated validation and deployment

## Important Notes

- Current admin authentication is demo-oriented and browser-based.
- Current user records are stored in localStorage.
- Current Google Sheets integration depends on a deployed Google Apps Script web app.
- Current Paytm backend is real, but the frontend checkout UI still needs final end-to-end initiation wiring for a complete live payment journey.
- GraphQL, SQL, Spring Boot services, Django services, AI model services, AWS S3, and EC2 deployment are documented targets, not present as code in this repository yet.

## Summary

This portfolio project already delivers a polished React frontend, a local-auth admin dashboard, Google Sheets lead capture, and a real Node.js Paytm payment backend. The README now also documents the complete expansion path you asked for: real authentication, SQL persistence, GraphQL APIs, Spring Boot and Django service modules, Nodemailer email handling, AI and LLM-based chatbot services, AWS EC2 and S3 deployment, React Native extension, and CI/CD-ready microservice architecture.
