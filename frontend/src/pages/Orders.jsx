import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getOrders, getOrder, createOrder, deleteOrder, getCustomers, getProducts } from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [form, setForm] = useState({ customer_id: '', items: [{ product_id: '', quantity: 1 }] });

  const load = () => getOrders().then(r => setOrders(r.data));

  useEffect(() => {
    load();
    getCustomers().then(r => setCustomers(r.data));
    getProducts().then(r => setProducts(r.data));
  }, []);

  const addItem = () => setForm({ ...form, items: [...form.items, { product_id: '', quantity: 1 }] });
  const removeItem = (i) => setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });
  const updateItem = (i, field, val) => {
    const items = [...form.items];
    items[i][field] = val;
    setForm({ ...form, items });
  };

  const handleSubmit = async () => {
    if (!form.customer_id) return toast.error('Select a customer');
    if (form.items.some(i => !i.product_id || i.quantity < 1)) return toast.error('Fill all items');
    try {
      await createOrder({ customer_id: parseInt(form.customer_id), items: form.items.map(i => ({ product_id: parseInt(i.product_id), quantity: parseInt(i.quantity) })) });
      toast.success('Order created!');
      setShowModal(false);
      setForm({ customer_id: '', items: [{ product_id: '', quantity: 1 }] });
      load();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this order?')) return;
    try { await deleteOrder(id); toast.success('Order cancelled!'); load(); }
    catch (e) { toast.error('Could not cancel'); }
  };

  const viewDetail = async (id) => {
    const r = await getOrder(id);
    setShowDetail(r.data);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Orders</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Order</button>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map(o => {
              const customer = customers.find(c => c.id === o.customer_id);
              return (
                <tr key={o.id}>
                  <td>#ORD-{o.id}</td>
                  <td>{customer?.full_name || 'Unknown'}</td>
                  <td>${o.total_amount.toFixed(2)}</td>
                  <td>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td style={{display:'flex',gap:8}}>
                    <button className="btn btn-secondary" onClick={() => viewDetail(o.id)}>View</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(o.id)}>Cancel</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {orders.length === 0 && <p style={{padding:16,color:'#64748b'}}>No orders yet.</p>}
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Order</h2>
            <div className="form-group">
              <label>Customer</label>
              <select value={form.customer_id} onChange={e => setForm({...form, customer_id: e.target.value})}>
                <option value="">Select customer...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
              </select>
            </div>
            <label style={{fontWeight:600,fontSize:13}}>Items</label>
            {form.items.map((item, i) => (
              <div key={i} style={{display:'flex',gap:8,marginTop:8,alignItems:'center'}}>
                <select style={{flex:2,padding:'10px 8px',borderRadius:8,border:'1px solid #d1d5db'}}
                  value={item.product_id} onChange={e => updateItem(i,'product_id',e.target.value)}>
                  <option value="">Product...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                </select>
                <input type="number" min="1" style={{flex:1,padding:'10px 8px',borderRadius:8,border:'1px solid #d1d5db'}}
                  value={item.quantity} onChange={e => updateItem(i,'quantity',e.target.value)} />
                {form.items.length > 1 && <button className="btn btn-danger" onClick={() => removeItem(i)}>✕</button>}
              </div>
            ))}
            <button className="btn btn-secondary" style={{marginTop:12}} onClick={addItem}>+ Add Item</button>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Place Order</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Order #ORD-{showDetail.id}</h2>
            <p style={{marginBottom:16,color:'#64748b'}}>
              {new Date(showDetail.created_at).toLocaleString()}
            </p>
            <table>
              <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
              <tbody>
                {showDetail.items.map(item => {
                  const product = products.find(p => p.id === item.product_id);
                  return (
                    <tr key={item.id}>
                      <td>{product?.name || `Product #${item.product_id}`}</td>
                      <td>{item.quantity}</td>
                      <td>${item.unit_price.toFixed(2)}</td>
                      <td>${(item.quantity * item.unit_price).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{textAlign:'right',marginTop:16,fontWeight:700,fontSize:18}}>
              Total: ${showDetail.total_amount.toFixed(2)}
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => setShowDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}