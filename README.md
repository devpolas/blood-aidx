# Blood AidX — Frontend

> A modern blood donation and emergency blood-request platform built to make finding, coordinating, and donating blood faster, easier, and more reliable.

**Blood AidX** is the frontend application for the Blood AidX platform. It connects users with blood donors, blood requests, donations, organizations, communication tools, notifications, and trust-focused verification workflows through the Blood AidX REST API.

---

## ✨ Overview

Blood AidX is built around one simple goal:

> **Find blood. Donate blood. Save lives.**

The frontend communicates with the Blood AidX REST API and provides role-aware experiences for:

- 🩸 **Users / Donors**
- 🛡️ **Moderators**
- 👑 **Administrators**

Blood AidX also supports associations between users and blood-related organizations or healthcare facilities such as:

- 🏥 Hospitals
- 🩸 Blood Banks
- 🏨 Clinics
- 🤝 NGOs
- 🏢 Other organizations

The application provides both **public-facing experiences** and **authenticated dashboards**, while the backend remains the source of truth for authentication, authorization, business rules, and data integrity.

---

# 🚀 Tech Stack

## Core

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Base UI**
- **Lucide React**

## State & Forms

- **TanStack Query** — server-state management
- **TanStack Form** — form state management
- **Zod** — schema validation

## Authentication

- Session-based authentication
- HTTP-only cookies
- Email verification
- Password reset
- Google OAuth
- Protected routes
- Role-aware UI

## API

- **ofetch**
- REST API integration
- Centralized API client
- Typed API responses
- Centralized API error handling

## UI / UX

- Responsive design
- Light / dark / system themes
- Accessible form controls
- Loading states
- Skeleton and shimmer states
- Toast notifications
- Responsive navigation
- Mobile navigation

---

# 🏗️ Architecture

The frontend follows a feature-oriented architecture that separates presentation, server state, API communication, validation, types, and utilities.

```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── dashboard/
│   ├── signin/
│   ├── signup/
│   ├── verify-account/
│   ├── forgot-password/
│   ├── reset-password/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── logo/
│   ├── loading/
│   ├── navbar/
│   ├── sidebar/
│   ├── theme/
│   └── ...
│
├── hooks/
│   ├── auth/
│   ├── users/
│   ├── donors/
│   ├── blood-requests/
│   ├── donations/
│   ├── notifications/
│   └── ...
│
├── lib/
│   └── api.client.ts
│
├── services/
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── donor.service.ts
│   ├── blood-request.service.ts
│   ├── blood-request-response.service.ts
│   ├── donation.service.ts
│   ├── review.service.ts
│   ├── report.service.ts
│   ├── notification.service.ts
│   ├── organization.service.ts
│   ├── location.service.ts
│   ├── milestone.service.ts
│   ├── certificate.service.ts
│   ├── conversation.service.ts
│   ├── message.service.ts
│   ├── payment.service.ts
│   └── upload.service.ts
│
├── types/
│   ├── api.response.ts
│   ├── user.ts
│   ├── donor.ts
│   ├── blood-request.ts
│   ├── donation.ts
│   ├── organization.ts
│   └── ...
│
├── validators/
│   ├── auth.validator.ts
│   ├── user.validator.ts
│   ├── donor.validator.ts
│   ├── blood-request.validator.ts
│   └── ...
│
└── utils/
    ├── api.error.ts
    ├── api.response.ts
    ├── zod.error.ts
    └── ...
```

> Directory structure may evolve as the application grows. The important architectural boundary is the separation between **UI, feature logic, hooks, API services, types, validators, and utilities**.

---

# 🎯 Core Features

## 🔐 Authentication

Blood AidX provides a complete authentication lifecycle.

### Registration

Public registration creates a regular Blood AidX user account.

Administrative privileges are **not exposed through public registration**.

A user's platform role determines their access level, while organizations and healthcare facilities are handled separately through the association system.

### Email Verification

After registration:

```text
Create Account
      ↓
Verification OTP
      ↓
Enter 6-Digit Code
      ↓
Verify Account
      ↓
Sign In
```

The verification experience supports:

- Six-digit OTP
- Automatic submission
- Resend verification
- Resend cooldown
- Email-based verification
- Persistent resend timer

### Sign In

Users can authenticate using:

- Email and password
- Google OAuth

Unverified users are directed to the account verification flow.

### Password Recovery

```text
Forgot Password
      ↓
Enter Email
      ↓
Receive OTP
      ↓
Verify OTP
      ↓
Receive Reset Token
      ↓
Reset Password
      ↓
Sign In
```

### Session Management

Supported authentication operations include:

- Current authenticated user
- Session refresh
- Logout
- Logout from all devices
- Logout other sessions
- Change password
- Password verification

---

# 👥 Roles & Associations

Blood AidX separates **platform roles** from **organization associations**.

This distinction is fundamental to the platform.

A person's role answers:

> **"What is this person allowed to do on Blood AidX?"**

An association answers:

> **"Which organization or healthcare facility is this user connected to?"**

These are intentionally different concepts.

---

## Platform Roles

Blood AidX has three primary platform roles:

### 🩸 User / Donor

A regular registered Blood AidX user who can participate in blood-donation activities.

Depending on their permissions and platform status, users can:

- Find blood requests
- Respond to blood requests
- Manage donations
- Manage donor information
- Communicate with other users
- Manage their profile
- Add organization associations
- Receive notifications
- Use other Blood AidX services

> A donor is a Blood AidX user participating in donation activities; donor functionality does not require a separate platform account type.

### 🛡️ Moderator

A trusted Blood AidX user with moderation responsibilities.

Moderators may be responsible for:

- Reviewing reports
- Moderating content
- Managing review status
- Supporting verification workflows
- Maintaining platform safety

### 👑 Administrator

An administrator has final administrative authority over the platform.

Administrators are responsible for operations such as:

- User administration
- Role management
- Association approval
- Moderation oversight
- Platform management
- Administrative verification decisions

> Administrative privileges are managed by the backend and are not granted through public signup.

---

## 🧑‍🤝‍🧑 Volunteers

**Volunteers are Blood AidX users.**

Volunteer is **not a separate account type or organization role**.

A trusted Blood AidX user can perform volunteer verification responsibilities when assigned or authorized to do so.

The volunteer acts as the **initial verification layer** for organization associations.

The volunteer's responsibility is to:

1. Review the submitted association.
2. Check the provided information.
3. Confirm whether the submitted information appears valid.
4. Submit the confirmation to the platform.
5. Trigger the administrator review stage.

> **Volunteer confirmation is not final approval.**

The final decision remains with an Administrator.

---

## 🏢 Blood AidX Associations

Users can associate their Blood AidX account with:

- 🏥 **Hospital**
- 🩸 **Blood Bank**
- 🏨 **Clinic**
- 🤝 **NGO**
- 🏢 **Other**

These are **association types, not platform roles**.

For example:

```text
Blood AidX User
      │
      └── Hospital Association
```

does not mean the user has become a `hospital` role.

It means the user has submitted an association with a hospital.

---

## 🔎 Association Verification Workflow

Every new association begins as **pending**.

The verification process follows a two-level trust model:

```text
┌─────────────────────┐
│   Blood AidX User   │
└──────────┬──────────┘
           │
           │ Add Association
           ▼
┌─────────────────────┐
│       PENDING       │
└──────────┬──────────┘
           │
           │ Volunteer reviews
           ▼
┌─────────────────────┐
│ VOLUNTEER CONFIRMED │
└──────────┬──────────┘
           │
           │ Notify Administrator
           ▼
┌─────────────────────┐
│    ADMIN REVIEW     │
└──────────┬──────────┘
           │
      ┌────┴────┐
      │         │
      ▼         ▼
  APPROVED    REJECTED
      │         │
      ▼         ▼
  VERIFIED   UNVERIFIED
```

### Step 1 — User Submission

A Blood AidX user adds an association:

```text
User
 │
 ├── Hospital
 ├── Blood Bank
 ├── Clinic
 ├── NGO
 └── Other
```

The association is created with a **pending** status.

### Step 2 — Volunteer Confirmation

An authorized Volunteer reviews the submitted association.

The Volunteer verifies the available information and confirms the submission.

The Volunteer **does not approve the association permanently**.

After confirmation:

```text
PENDING
   ↓
VOLUNTEER_CONFIRMED
```

### Step 3 — Administrator Notification

Once a Volunteer confirms an association, Blood AidX notifies an Administrator that the association is ready for final review.

```text
Volunteer Confirmation
          ↓
Administrator Notification
          ↓
Administrator Review
```

### Step 4 — Administrator Decision

The Administrator makes the final decision.

#### Approved

```text
ADMIN_REVIEW
     ↓
 APPROVED
     ↓
 VERIFIED
```

The association becomes verified and can be used according to its permissions.

#### Rejected

```text
ADMIN_REVIEW
     ↓
 REJECTED
     ↓
 UNVERIFIED
```

The association is not activated.

If correction is supported, the user can update the information and submit it again.

---

## 🔐 Trust Model

The verification system intentionally separates responsibilities:

```text
User
 │
 │ submits information
 ▼
Pending Association
 │
 │ initial verification
 ▼
Volunteer
 │
 │ confirms
 ▼
Administrator Notification
 │
 │ final review
 ▼
Administrator
 │
 ├───────────────┐
 │               │
 ▼               ▼
Approve         Reject
 │               │
 ▼               ▼
Verified       Unverified
Association    Association
```

This provides a clear chain of responsibility:

> **Users submit → Volunteers confirm → Administrators approve.**

This prevents a single verification step from becoming the final authority and provides an additional trust layer before an association becomes verified.

---

# 🩸 Blood Requests

Users can manage emergency blood requests.

Supported operations include:

- Browse blood requests
- View a specific request
- View own requests
- Create requests
- Update requests
- Update request status
- Cancel requests
- Delete requests

```text
GET    /blood-requests
GET    /blood-requests/me
GET    /blood-requests/:requestId
POST   /blood-requests
PATCH  /blood-requests/:requestId
PATCH  /blood-requests/:requestId/status
POST   /blood-requests/:requestId/cancel
DELETE /blood-requests/:requestId
```

---

# 🧑‍🩸 Donor Management

Donor functionality includes:

- Browse donors
- View donor profiles
- Manage personal donor profile
- Update donor information
- Delete donor profile
- Administrative donor management where permitted

Personal donor operations use:

```text
/donors/me
```

Individual donor operations use:

```text
/donors/:donorId
```

---

# 📨 Blood Request Responses

Donors can respond to blood requests.

Supported functionality includes:

- View own responses
- Create a response
- View responses for a request
- View an individual response
- Update response status
- Cancel a response
- Delete a response

```text
GET    /blood-request-responses/me
POST   /blood-request-responses/requests/:requestId
GET    /blood-request-responses/requests/:requestId
GET    /blood-request-responses/:responseId
PATCH  /blood-request-responses/:responseId/status
POST   /blood-request-responses/:responseId/cancel
DELETE /blood-request-responses/:responseId
```

---

# 🩸 Donations

Donation management supports:

- View own donations
- Browse donations
- View individual donations
- Create donations
- Cancel donations
- Verify donations

```text
GET   /donations/me
GET   /donations
GET   /donations/:donationId
POST  /donations
POST  /donations/:donationId/cancel
PATCH /donations/:donationId/verify
```

---

# 🏢 Organizations

Organizations can be discovered and managed through the platform.

Features include:

- Browse organizations
- View organization details
- View user's organizations
- Create organizations
- Update organizations
- Delete organizations
- Manage organization status
- View organization members
- Add members
- Update members
- Remove members

Organization verification and authorization remain controlled by the backend.

---

# 📍 Locations

Blood AidX supports location management for users and blood-related services.

Features include:

- Get own location
- Get location by ID
- Create location
- Update own location
- Delete own location
- Delete a specific location

Current-user location operations use:

```text
/locations/me
```

---

# 💬 Conversations & Messaging

Blood AidX provides user-to-user communication.

## Conversations

Users can:

- View conversations
- Create conversations
- View a conversation
- Add participants
- Remove participants
- Leave conversations

## Messages

Users can:

- Send messages
- View conversation messages
- View individual messages
- Update messages
- Delete messages
- Mark messages as read
- Mark conversation messages as read
- Check unread message counts

Moderators and administrators can also moderate-delete messages where authorized.

---

# 🔔 Notifications

The notification system supports:

- All notifications
- Unread notifications
- Unread notification count
- Mark notification as read
- Mark all notifications as read
- Delete read notifications
- Delete individual notifications

Notifications are particularly important for workflows such as:

```text
Association Submitted
        ↓
Volunteer Confirmation
        ↓
Administrator Notification
        ↓
Administrator Review
```

---

# ⭐ Reviews

Reviews support public discovery and authenticated management.

## Public

Users can view reviews associated with:

```text
GET /reviews/user/:userId
GET /reviews/organization/:organizationId
```

## Authenticated

Users can:

- View their reviews
- Create reviews
- View individual reviews
- Update reviews
- Delete reviews

## Moderation

Moderators and administrators can update review status.

---

# 🚩 Reports

Users can submit reports and manage their own reports.

Supported functionality includes:

- Create report
- View own reports
- View report
- Delete report
- Update report status

Report status management is restricted by the backend to authorized moderators and administrators.

---

# 🏆 Milestones

Milestones track user achievements and donation-related progress.

Features include:

- Browse milestones
- View milestone
- View own milestones
- View another user's milestones
- Create milestone
- Update milestone
- Delete milestone

Administrative operations remain protected by backend authorization.

---

# 🏅 Certificates

Blood AidX supports donation certificates.

Users can:

- View their certificates
- View a specific certificate

The platform also provides public certificate verification:

```text
GET /certificates/verify/:certificateNumber
```

This allows certificate authenticity to be checked without requiring authentication.

---

# 💳 Payments

Blood AidX supports donor coffee/contribution payments through the backend payment system.

Frontend functionality includes:

- Create coffee payment
- View own payments
- View donor payments
- View individual payment
- Admin payment lookup
- Admin refund

Payment processing, validation, and authorization remain backend responsibilities.

---

# ☁️ File Uploads

Blood AidX supports file uploads through Cloudinary via the backend.

## Upload

```text
POST /uploads
```

Files are submitted as:

```text
multipart/form-data
file=<File>
```

## Delete

```text
DELETE /uploads
```

with:

```json
{
  "publicId": "...",
  "resourceType": "..."
}
```

The upload service returns:

```ts
interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  resourceType: string;
}
```

---

# 👤 User Management

## Current User

Users can:

- Get their account
- Update their account
- Delete their account

## Administration

Administrators can:

- List users
- View a user
- Update a user
- Change user roles
- Ban users
- Unban users
- Delete users

The frontend does not attempt to reproduce backend authorization rules.

> **The backend is always the source of truth for authorization.**

---

# 🎨 Design System

Blood AidX uses a clean, modern, healthcare-oriented visual language.

## Brand

The **Blood AidX** identity uses a blood-drop visual mark and brand accent styling throughout the application.

Brand styling is applied consistently across:

- Logo
- Navigation
- Buttons
- Loading states
- Dashboard elements
- Icons
- Status indicators

## Typography

The interface uses modern sans-serif typography with responsive sizing and clear hierarchy.

## Theme

Supported themes:

- ☀️ Light
- 🌙 Dark
- 💻 System

Theme management is handled with `next-themes`.

---

# 📱 Responsive UI

Blood AidX is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Navigation adapts to the available viewport:

```text
Desktop
├── Logo
├── Navigation
├── Theme
└── Authentication / User actions

Mobile
├── Logo
└── Mobile navigation
```

Layouts prioritize:

- Responsive spacing
- Responsive typography
- Touch-friendly controls
- No unnecessary horizontal overflow
- Consistent content width
- Accessible navigation

---

# ⏳ Loading States

Blood AidX uses shared loading components to provide consistent feedback throughout the application.

Loading patterns include:

- Spinner
- Shimmer
- Skeleton-style loading
- Page loading screens
- Pending states
- Completed states

Animations respect reduced-motion preferences.

---

# 🧪 Validation

Forms use **Zod** schemas for client-side validation.

The typical flow is:

```text
Form
  ↓
TanStack Form
  ↓
Zod Schema
  ↓
API Service
  ↓
Blood AidX REST API
```

Validation logic is kept separate from presentation components.

Existing validation messages should remain consistent across the application.

---

# 🔌 API Integration

The frontend uses a centralized `ofetch` client.

Conceptually:

```ts
const apiClient = ofetch.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});
```

Services use relative API paths.

For example:

```ts
apiClient("/blood-requests", {
  method: "GET",
});
```

The API base URL contains the backend API prefix, so individual services do not duplicate:

```text
/api/v1
```

---

# 📦 API Response Convention

Blood AidX maintains consistent typed API responses.

## Collection

```ts
ApiResponse<{
  users: User[];
}>;
```

## Single Resource

```ts
ApiResponse<{
  user: User;
}>;
```

## No Response Data

```ts
ApiResponse<null>;
```

Frontend service functions should match the actual backend response shape rather than unnecessarily introducing nullable values.

---

# ⚠️ Error Handling

API errors are centralized through:

```text
handleApiError()
errorResponse()
handleZodError()
```

The general flow is:

```text
API Request
     │
     ├───────────────┐
     │               │
   Success          Error
     │               │
     ▼               ▼
Typed Response   handleApiError()
                     │
                     ▼
             Standardized Error
```

This keeps API services predictable and avoids duplicated error-handling logic.

---

# 🔄 TanStack Query

Server state is managed using **TanStack Query**.

The typical architecture is:

```text
Component
    ↓
Custom Hook
    ↓
API Service
    ↓
apiClient
    ↓
Blood AidX API
```

For example:

```text
useAuthMe()
    ↓
auth.service.ts
    ↓
GET /auth/me
```

Mutations are used for operations such as:

- Signup
- Signin
- Updates
- Deletes
- Status changes
- Uploads
- Authentication operations

Query keys are organized by domain.

Example:

```ts
["auth", "me"];
```

---

# 🔐 Security Principles

The frontend follows these security principles:

- Authentication uses secure cookies.
- Sensitive authentication state is handled by the backend.
- Backend authorization is never trusted to the frontend.
- Administrative operations are protected server-side.
- Sensitive tokens are not unnecessarily stored in browser storage.
- User input is validated before submission.
- File uploads go through the backend upload endpoint.
- OAuth authentication is handled through the backend callback flow.
- Frontend route protection is treated as a UX mechanism, not a security boundary.

> **Frontend permissions improve the user experience. Backend authorization provides the actual security boundary.**

---

# 🌐 Authentication Flows

## Normal Login

```text
User
 ↓
Signin Page
 ↓
useSignin()
 ↓
POST /auth/signin
 ↓
Session Cookie
 ↓
useAuthMe()
 ↓
Dashboard
```

## Google Login

```text
User
 ↓
Google Sign In
 ↓
Blood AidX Backend
 ↓
Google OAuth
 ↓
OAuth Callback
 ↓
Frontend Auth Callback
 ↓
useAuthMe()
 ↓
Dashboard
```

## Account Verification

```text
Signup
 ↓
Verification OTP
 ↓
Verify Account
 ↓
Signin
```

---

# 📁 Service Layer

The frontend API layer covers the major Blood AidX backend resources.

| Service                          | Responsibility                   |
| -------------------------------- | -------------------------------- |
| `auth.service`                   | Authentication and sessions      |
| `user.service`                   | Current and administrative users |
| `donor.service`                  | Donor profiles                   |
| `blood-request.service`          | Blood requests                   |
| `blood-request-response.service` | Blood request responses          |
| `donation.service`               | Donations                        |
| `review.service`                 | Reviews                          |
| `report.service`                 | Reports                          |
| `notification.service`           | Notifications                    |
| `organization.service`           | Organizations                    |
| `location.service`               | Locations                        |
| `milestone.service`              | Milestones                       |
| `certificate.service`            | Certificates                     |
| `conversation.service`           | Conversations                    |
| `message.service`                | Messages                         |
| `payment.service`                | Payments                         |
| `upload.service`                 | File uploads                     |

The service layer intentionally remains thin:

```text
Validate
   ↓
Build Request
   ↓
Call API
   ↓
Return Typed Response
   ↓
Handle Errors
```

Business rules and authorization belong to the backend.

---

# 🧩 Component Architecture

Reusable components are preferred over duplicated page-specific implementations.

The UI follows a layered component model:

```text
UI Primitives
      ↓
Shared Components
      ↓
Feature Components
      ↓
Page Components
```

Examples include:

- Buttons
- Inputs
- Cards
- Dialogs
- Dropdowns
- Navigation
- Sidebar
- Loading indicators
- Form fields
- Typography
- Theme controls

---

# 🛠️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

For production:

```env
NEXT_PUBLIC_API_BASE_URL=https://blood-aidx-api.vercel.app/api/v1
```

> Never expose private backend secrets through `NEXT_PUBLIC_*` environment variables.

---

# 🚀 Getting Started

## Prerequisites

Install:

- Node.js
- npm
- Git

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd blood-aidx
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Configure:

```env
NEXT_PUBLIC_API_BASE_URL=...
```

---

# 💻 Development

Start the development server:

```bash
npm run dev
```

The application will be available at the local Next.js development URL.

---

# 🏗️ Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

# 🔍 Code Quality

Before committing changes, run the project's verification commands.

```bash
npm run typecheck
npm run lint
npm run build
```

If the project provides a combined verification command:

```bash
npm run verify
```

---

# 🧭 Frontend Development Workflow

New features should generally follow this sequence:

```text
1. Define Types
       ↓
2. Define Validation
       ↓
3. Implement API Service
       ↓
4. Create TanStack Query Hook
       ↓
5. Build Feature Components
       ↓
6. Build Page
       ↓
7. Add Loading & Error States
       ↓
8. Verify API Integration
       ↓
9. Run Typecheck / Lint / Build
       ↓
10. Commit
```

---

# 🔗 Backend Integration

The frontend is designed around the Blood AidX REST API.

The backend is responsible for:

- Authentication
- Authorization
- Database operations
- Business rules
- Session management
- Email verification
- OAuth
- Notifications
- Payments
- File management
- Role enforcement
- Association verification
- Administrative approval

The frontend is responsible for:

- User interface
- Form interaction
- Client-side validation
- Server-state management
- Navigation
- Loading states
- Error presentation
- Responsive UX
- Role-aware presentation

The frontend should never become a second implementation of backend business logic.

---

# 📊 Platform Modules

```text
                         Blood AidX
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   Authentication       Discovery          Dashboard
          │                  │                  │
     ┌────┼────┐       ┌─────┼─────┐       ┌────┼────┐
     │    │    │       │     │     │       │    │    │
   Signup OAuth Verify  Donors Requests Organizations Profile
   Signin Recovery      Locations         Donations Milestones
                                           Certificates
          │
          └──────────────────┬──────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
          Communication              Trust & Safety
                │                         │
        ┌───────┼────────┐        ┌───────┼────────┐
        │       │        │        │       │        │
 Conversations Messages Notifications Reviews Reports
                                      │
                                 Associations
                                      │
                         Volunteer Confirmation
                                      │
                             Admin Final Approval
```

---

# 📌 API Route Coverage

The frontend API service layer is maintained against the corresponding Blood AidX backend routers.

Covered resources include:

- Authentication
- Users
- Administrative users
- Donors
- Blood requests
- Blood request responses
- Donations
- Organizations
- Locations
- Milestones
- Certificates
- Reviews
- Reports
- Conversations
- Messages
- Notifications
- Payments
- Uploads

The objective is to keep frontend service methods aligned with the actual backend route definitions and avoid maintaining endpoints that do not exist.

---

# 🧠 Development Principles

## Keep Services Thin

API services should primarily:

1. Validate input where appropriate.
2. Build the API request.
3. Call the backend.
4. Return typed responses.
5. Normalize errors.

## Don't Duplicate Authorization

The frontend may hide or display UI based on the current user's role or state.

However:

> **The backend must always enforce authorization.**

## Prefer Semantic Function Names

Prefer:

```ts
getMyReviews();
getMyDonations();
getMyProfile();
getMyLocation();
leaveConversation();
cancelDonation();
```

over ambiguous generic names.

## Keep Response Types Accurate

Prefer:

```ts
ApiResponse<{ user: User }>;
```

when a successful response always contains a user.

For operations without response data:

```ts
ApiResponse<null>;
```

Avoid adding `| null` unless the backend can actually return `null`.

## Keep Platform Roles Separate from Associations

Do not treat:

```text
hospital
blood_bank
clinic
ngo
other
```

as platform user roles.

They represent associations.

The platform role model is:

```text
User / Donor
Moderator
Administrator
```

Volunteer verification is a responsibility performed by authorized Blood AidX users.

---

# 🎨 UX Principles

Blood AidX prioritizes:

- Clarity
- Accessibility
- Responsiveness
- Fast feedback
- Consistent spacing
- Consistent typography
- Minimal visual noise
- Meaningful loading states
- Clear error messages
- Strong visual hierarchy
- Trust and transparency

The interface should feel like a trustworthy healthcare platform rather than a generic CRUD application.

---

# 🔮 Future Improvements

Potential future improvements include:

- Real-time messaging
- Real-time notification updates
- Interactive donor maps
- Nearby donor discovery
- Advanced blood-request filtering
- Location-based donor matching
- Donation history visualization
- Analytics dashboards
- Organization dashboards
- Advanced administrator dashboards
- Association verification history
- Verification audit trails
- Improved accessibility auditing
- Progressive Web App support
- Offline-friendly experiences
- AI-assisted donor/request matching

---

# 📄 License

Add the project's chosen license here before public release.

---

## ❤️ Blood AidX

**Find blood. Donate blood. Save lives.**

Built to make blood donation coordination faster, clearer, safer, and more accessible.
