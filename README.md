# 🏀 TeamUp – Book & Join Sports Games

**TeamUp** is a full-stack web application that lets users organize and join sports games like football, basketball, and tennis. With smart filters, social features, and integrated facility booking, TeamUp makes playing your favorite sport easier than ever.

---

## 🚀 Features

### 👥 Users
- Register/login with email (via Djoser)
- Join games with friends or random players
- Organize games and pay half the price
- Automatic cost splitting between players

### 📅 Game Management
- Create games with:
  - Exact date or date range
  - One day of the week, weekends only, or full week
  - Time range
  - Location with Yandex Maps
  - Player limit, required age, and privacy level

### 🏟️ Facility Booking
- Book sports facilities in real-time
- Pay a small deposit (10× less than the full price)
- Organizers receive bonuses when others join
- Facility owners can apply via "Become our partner"

### 🔍 Smart Filters
- Filter games by:
  - Specific day or date range
  - Weekends or certain weekdays
  - Today / Tomorrow / This Week
  - Time of day (morning, evening, etc.)

### 💬 Social & Teams
- Invite friends to games
- Play with random players nearby
- Join or create teams
- Compete with other teams

---

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS
- Yandex Maps API

### Backend
- Django + Django REST Framework (DRF)
- Djoser for authentication
- PostgreSQL

### Deployment
- Ubuntu server
- Gunicorn + Nginx
- Environment variables via `.env`

---

## 📦 Installation

### Prerequisites

- Node.js and npm/yarn
- Python 3.10+
- PostgreSQL
- Yandex Maps API key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
