import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="app">
        <aside className="sidebar">
          <div className="logo">📦 InvManager</div>
          <nav>
            <NavLink to="/" end>🏠 Dashboard</NavLink>
            <NavLink to="/products">🛒 Products</NavLink>
            <NavLink to="/customers">👥 Customers</NavLink>
            <NavLink to="/orders">📋 Orders</NavLink>
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}