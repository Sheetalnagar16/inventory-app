# 📦 Inventory & Order Management System

A full-stack web application for managing products, customers, and orders with real-time inventory tracking.

🌐 **Live Demo:** [Frontend](https://inventory-5riwuvpw9-sheetal-nagars-projects.vercel.app)) | [Backend API](https://inventory-app-fx30.onrender.com) | [API Docs](https://inventory-app-fx30.onrender.com/docs)

---

## ✨ Features

- **Product Management** — Add, update, delete products with SKU tracking and stock levels
- **Customer Management** — Manage customer records with unique email validation
- **Order Management** — Create orders with automatic stock deduction and total calculation
- **Dashboard** — Real-time summary of products, customers, orders and low stock alerts
- **Business Logic** — Prevents duplicate SKUs, duplicate emails, and orders exceeding stock
- **Fully Containerized** — Runs entirely with one Docker Compose command

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, Axios |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Containerization | Docker, Docker Compose |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 🚀 Run Locally

### Prerequisites
- Docker Desktop installed and running
- Git

### Steps

1. Clone the repository
   git clone https://github.com/sheetal16/inventory-app.git
   cd inventory-app

2. Start all services
   docker compose up --build

3. Open in browser
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

That's it — one command runs everything!

---

## 📁 Project Structure

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

## �API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get all products |
| POST | /products | Create product |
| GET | /products/{id} | Get product by ID |
| PUT | /products/{id} | Update product |
| DELETE | /products/{id} | Delete product |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /customers | Get all customers |
| POST | /customers | Create customer |
| GET | /customers/{id} | Get customer by ID |
| DELETE | /customers/{id} | Delete customer |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /orders | Get all orders |
| POST | /orders | Create order |
| GET | /orders/{id} | Get order by ID |
| DELETE | /orders/{id} | Cancel order |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard | Get summary stats |

---

## ⚙️ Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |

### Frontend
| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API base URL |

---

## 👤 Author

**Sheetal**
- GitHub: [@sheetal16](https://github.com/sheetal16)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
