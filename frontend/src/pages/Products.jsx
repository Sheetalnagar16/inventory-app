import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', sku: '', price: '', quantity: '' });

  const load = () => getProducts().then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm({ name: '', sku: '', price: '', quantity: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ name: p.name, sku: p.sku, price: p.price, quantity: p.quantity }); setShowModal(true); };

  const handleSubmit = async () => {
    if (!form.name || !form.sku || !form.price || form.quantity === '') return toast.error('All fields required');
    const payload = { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) };
    try {
      if (editing) { await updateProduct(editing.id, payload); toast.success('Product updated!'); }
      else { await createProduct(payload); toast.success('Product created!'); }
      setShowModal(false); load();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await deleteProduct(id); toast.success('Deleted!'); load(); }
    catch (e) { toast.error('Could not delete'); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>SKU</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><code>{p.sku}</code></td>
                <td>${p.price.toFixed(2)}</td>
                <td>
                  <span className={`badge ${p.quantity < 10 ? 'badge-red' : p.quantity < 30 ? 'badge-yellow' : 'badge-green'}`}>
                    {p.quantity}
                  </span>
                </td>
                <td style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p style={{padding:16,color:'#64748b'}}>No products yet.</p>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
            {['name','sku','price','quantity'].map(f => (
              <div className="form-group" key={f}>
                <label>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                <input type={f === 'price' || f === 'quantity' ? 'number' : 'text'}
                  value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} />
              </div>
            ))}
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}