# Inventory & Order Management System

A full-stack web application for managing products, customers, and orders with real-time inventory tracking.

🌐 **Live Demo:** [Frontend](https://inventory-5riwuvpw9-sheetal-nagars-projects.vercel.app)| [Backend API](https://inventory-app-fx30.onrender.com) | [API Docs](https://inventory-app-fx30.onrender.com/docs)

---

## Features

- **Product Management** — Add, update, delete products with SKU tracking and stock levels
- **Customer Management** — Manage customer records with unique email validation
- **Order Management** — Create orders with automatic stock deduction and total calculation
- **Dashboard** — Real-time summary of products, customers, orders and low stock alerts
- **Business Logic** — Prevents duplicate SKUs, duplicate emails, and orders exceeding stock
- **Fully Containerized** — Runs entirely with one Docker Compose command

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, Axios |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Containerization | Docker, Docker Compose |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Project Structure

inventory-app/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── main.py          # All API routes
│   ├── models.py        # Database models
│   ├── schemas.py       # Request/response schemas
│   ├── database.py      # DB connection
│   └── requirements.txt
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── App.js
        ├── api.js           # API calls
        └── pages/
            ├── Dashboard.jsx
            ├── Products.jsx
            ├── Customers.jsx
            └── Orders.jsx

---

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard | Get summary stats |

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
