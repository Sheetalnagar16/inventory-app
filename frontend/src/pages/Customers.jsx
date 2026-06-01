import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCustomers, createCustomer, deleteCustomer } from '../api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '' });

  const load = () => getCustomers().then(r => setCustomers(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.phone) return toast.error('All fields required');
    try {
      await createCustomer(form);
      toast.success('Customer added!');
      setShowModal(false);
      setForm({ full_name: '', email: '', phone: '' });
      load();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    try { await deleteCustomer(id); toast.success('Deleted!'); load(); }
    catch (e) { toast.error('Could not delete'); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Customers</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Customer</button>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.full_name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td><button className="btn btn-danger" onClick={() => handleDelete(c.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <p style={{padding:16,color:'#64748b'}}>No customers yet.</p>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Add Customer</h2>
            {[['full_name','Full Name'],['email','Email'],['phone','Phone']].map(([f,l]) => (
              <div className="form-group" key={f}>
                <label>{l}</label>
                <input type="text" value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} />
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