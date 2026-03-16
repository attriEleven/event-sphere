## EventSphere – Campus & Community Event Platform (MERN)

EventSphere is a modern platform for discovering, organizing, and managing college and community events. Built on the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with a **microservice architecture**, EventSphere centralizes event discovery, registrations, announcements, and live leaderboards for a rich campus experience.

> **Tagline:** *Discover, organize, and manage campus events in one place.*

## 🚀 Overview

EventSphere helps students, organizers, and admins:

- Discover events happening across campus and nearby communities.
- Organize and manage workshops, hackathons, cultural fests, sports events, and more.
- Engage participants with real-time announcements and gamified leaderboards.

## ✨ Features

- 🎫 **Full Event Lifecycle Management**
  - Create, update, delete, and manage events with capacity, images, and rich descriptions.
  - Track registrations and capacity usage.

- 🏷️ **Event Categories**
  - Built-in categories: **Tech**, **Sports**, **Cultural**, **Workshops**, **Hackathons**.
  - Users can select a category when creating or editing events.
  - Filter and browse events by category and by time (all, upcoming, past).

- 👍 **Likes / Upvotes**
  - Each event maintains a like count.
  - Authenticated users can like events, with per-user tracking to prevent duplicate likes.
  - Like counts are displayed on event cards.

- 📢 **Real-time Announcements**
  - Live announcements for schedule changes, updates, and important messages.
  - Powered by Socket.IO for real-time delivery.

- 🏆 **Leaderboards**
  - Gamified scoring and rankings for participants.
  - Live updates to encourage engagement and competition.

- 👥 **Authentication & RBAC**
  - JWT-based authentication.
  - Roles for **Admin**, **Organizer**, and **Participant** with distinct permissions.

## 🧰 Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express.js (microservices)
- **Database:** MongoDB with Mongoose
- **Real-time:** Socket.IO
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Docker / Docker Compose (optional)

## 🏛️ System Architecture

EventSphere is designed using a **microservice architecture** to ensure scalability, maintainability, and independent deployment of services. An **API Gateway** acts as a single entry point for all client requests, routing them to the appropriate downstream services.

- **Authentication Service:** Manages user registration, login, and JWT token generation.
- **Event Service:** Handles event CRUD, categories, registrations, and likes.
- **Notification Service:** Powers real-time announcements and user notifications via Socket.IO.
- **Leaderboard Service:** Manages participant scoring, ranking calculations, and live leaderboard updates.
- **Settings Service:** Manages system/user-level settings (where enabled).
- **Gateway:** API gateway for routing and aggregation.

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>.git
cd EventSphere
```

2. **Install frontend dependencies**

```bash
cd frontend
npm install
```

3. **Install backend dependencies (microservices)**

```bash
cd ../backend
cd auth-service && npm install
cd ../event-service && npm install
cd ../notification-service && npm install
cd ../leaderboard-service && npm install
cd ../settings-service && npm install   # if used
cd ../gateway && npm install            # if used
```

4. **Environment variables**

Create a `.env` file for each service (`auth-service`, `event-service`, etc.) and configure the necessary values. Example for `backend/auth-service/.env`:

```bash
MONGODB_URI=mongodb://localhost:27017/eventsphere
JWT_SECRET=your_super_secret_jwt_key
PORT=8001
CLIENT_URL=http://localhost:5173
```

Configure similar variables for:

- `backend/event-service/.env`
- `backend/notification-service/.env`
- `backend/leaderboard-service/.env`
- `backend/settings-service/.env` (optional)
- `backend/gateway/.env` (if used)

5. **Run the application**

**Option A – Docker (recommended)**

```bash
docker-compose up
```

**Option B – Run services manually**

```bash
# Terminal 1 – Auth service
cd backend/auth-service && npm run dev

# Terminal 2 – Event service
cd backend/event-service && npm run dev

# Terminal 3 – Notification service
cd backend/notification-service && npm run dev

# Terminal 4 – Leaderboard service
cd backend/leaderboard-service && npm run dev

# Terminal 5 – Settings service (optional)
cd backend/settings-service && npm run dev

# Terminal 6 – Gateway (if used)
cd backend/gateway && npm run dev

# Terminal 7 – Frontend
cd frontend && npm run dev
```

Then open `http://localhost:5173` in your browser.

## 👤 User Roles and Permissions

| Role          | Access Level      | Responsibilities                                                  |
| ------------- | ----------------- | ----------------------------------------------------------------- |
| **Admin**     | Full system       | Manages users, roles, and system-wide settings.                  |
| **Organizer** | Event-level       | Creates and manages events, tracks participants, makes updates.  |
| **Participant** | Basic          | Registers for events, likes events, views leaderboards/updates.  |

## 📂 Project Structure

The repository is organized into a `frontend` directory for the React client and a `backend` directory containing the microservices.

```text
EventSphere/
├── frontend/                     # React client application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── pages/                # Page-level components
│   │   ├── services/             # API service functions
│   │   └── context/ / redux/     # State management
│   └── public/                   # Static assets (logo, images, etc.)
│
├── backend/
│   ├── auth-service/             # User authentication & roles (JWT)
│   ├── event-service/            # Event CRUD, categories, registration, likes
│   ├── notification-service/     # Real-time notifications via Socket.IO
│   ├── leaderboard-service/      # Scoring and ranking
│   ├── settings-service/         # System/user settings (optional)
│   └── gateway/                  # API Gateway
│
└── docker-compose.yml            # Docker configuration for all services
```

## 📸 Screenshots

Add screenshots under `frontend/public/eventsphere-screenshots/` and reference them here, for example:

- Home dashboard
- Events listing with category filters and likes
- Event detail page
- Organizer / Admin dashboards

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
