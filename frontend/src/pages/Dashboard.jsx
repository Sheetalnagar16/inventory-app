import { useEffect, useState } from 'react';
import { getDashboard } from '../api';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { getDashboard().then(r => setData(r.data)); }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div className="page-header"><h1>Dashboard</h1></div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Total Products</div>
          <div className="value">{data.total_products}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Customers</div>
          <div className="value">{data.total_customers}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Orders</div>
          <div className="value">{data.total_orders}</div>
        </div>
        <div className="stat-card">
          <div className="label">Low Stock Items</div>
          <div className="value" style={{color: data.low_stock_products.length > 0 ? '#ef4444' : '#16a34a'}}>
            {data.low_stock_products.length}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{marginBottom: 16, fontSize: 18}}>⚠️ Low Stock Products</h2>
        {data.low_stock_products.length === 0
          ? <p style={{color: '#64748b'}}>All products are well stocked!</p>
          : <div className="low-stock-list">
              {data.low_stock_products.map(p => (
                <div key={p.id} className="low-stock-item">
                  <span>{p.name}</span>
                  <span className="badge badge-red">{p.quantity} left</span>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}