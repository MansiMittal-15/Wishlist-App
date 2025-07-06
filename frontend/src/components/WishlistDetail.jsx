import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Demo data for wishlists (in a real app, fetch from backend or context)
const demoWishlists = [
  {
    id: 1,
    name: 'Birthday Gifts',
    people: ['alice@example.com'],
    products: [
      { id: 1, name: 'Wireless Headphones', addedBy: 'alice@example.com', price: 99.99 },
    ],
  },
  {
    id: 2,
    name: 'Home Decor',
    people: ['bob@example.com'],
    products: [],
  },
];

const WishlistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState(demoWishlists);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [product, setProduct] = useState({ name: '', price: '', addedBy: '' });
  const [inviteEmail, setInviteEmail] = useState('');
  const [toast, setToast] = useState(null);

  const wishlist = wishlists.find(w => w.id === Number(id));
  if (!wishlist) return <div className="max-w-2xl mx-auto px-4 py-10 text-center text-gray-400">Wishlist not found. <button className="underline text-purple-700" onClick={() => navigate('/wishlist')}>Back to all wishlists</button></div>;

  // Add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.addedBy) return;
    const updated = wishlists.map(w =>
      w.id === wishlist.id
        ? {
            ...w,
            products: [
              ...w.products,
              {
                id: Date.now(),
                name: product.name,
                price: parseFloat(product.price),
                addedBy: product.addedBy,
              },
            ],
          }
        : w
    );
    setWishlists(updated);
    setProduct({ name: '', price: '', addedBy: '' });
    setShowAddProduct(false);
    setToast({ success: true, message: 'Product added!' });
  };

  // Add person
  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    if (wishlist.people.includes(inviteEmail)) {
      setToast({ success: false, message: 'User already invited.' });
      return;
    }
    const updated = wishlists.map(w =>
      w.id === wishlist.id ? { ...w, people: [...w.people, inviteEmail] } : w
    );
    setWishlists(updated);
    setInviteEmail('');
    setShowAddPerson(false);
    setToast({ success: true, message: 'Invitation sent!' });
  };

  // Remove product
  const handleRemoveProduct = (pid) => {
    const updated = wishlists.map(w =>
      w.id === wishlist.id ? { ...w, products: w.products.filter(p => p.id !== pid) } : w
    );
    setWishlists(updated);
    setToast({ success: true, message: 'Product removed.' });
  };

  // Helper for initials
  function getInitials(email) {
    if (!email) return '?';
    const [name] = email.split('@');
    return name
      .split('.')
      .map((n) => n[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2);
  }

  // Toast component
  const Toast = ({ toastData, onClose, duration = 2500 }) => {
    React.useEffect(() => {
      if (!toastData) return;
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }, [toastData, onClose, duration]);
    if (!toastData) return null;
    return (
      <div className={`fixed top-8 right-8 z-50 min-w-[280px] max-w-xs px-6 py-4 rounded-2xl shadow-2xl flex items-start gap-4 animate-fade-in backdrop-blur-md bg-white/80 border-l-4 ${toastData.success ? 'border-green-400' : 'border-red-400'}`} style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)'}}>
        <div className="mt-1">
          {toastData.success ? (
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          )}
        </div>
        <div className="flex-1">
          <div className={`font-semibold mb-1 ${toastData.success ? 'text-green-700' : 'text-red-700'}`}>{toastData.success ? 'Success' : 'Error'}</div>
          <div className="text-gray-700 text-sm mb-2 break-words">{toastData.message}</div>
        </div>
        <button onClick={onClose} className="ml-2 text-xl font-bold text-gray-400 hover:text-gray-700 transition leading-none">×</button>
      </div>
    );
  };

  // Modal component
  const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
          <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700">×</button>
          <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">{title}</h3>
          {children}
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <button onClick={() => navigate('/wishlist')} className="mb-6 text-purple-700 hover:underline">← Back to all wishlists</button>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">{wishlist.name}</h2>
        {/* People */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">People in this wishlist:</h4>
            <button onClick={() => setShowAddPerson(true)} className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition text-sm">Add People</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {wishlist.people.length === 0 && <span className="text-gray-400 text-xs">No one yet</span>}
            {wishlist.people.map(email => (
              <span key={email} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                <span className="w-6 h-6 bg-purple-400 text-white rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                  {getInitials(email)}
                </span>
                {email}
              </span>
            ))}
          </div>
        </div>
        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">Products</h4>
            <button onClick={() => setShowAddProduct(true)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">Add Product</button>
          </div>
          <ul>
            {wishlist.products.length === 0 && <li className="text-gray-400 text-xs">No products yet</li>}
            {wishlist.products.map(item => (
              <li key={item.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div>
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="ml-4 text-gray-500 text-sm">Added by: {item.addedBy}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-purple-700 font-bold">${item.price}</span>
                  <button onClick={() => handleRemoveProduct(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Add Product Modal */}
      <Modal open={showAddProduct} onClose={() => setShowAddProduct(false)} title="Add Product">
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product name"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
            required
            min="0"
            step="0.01"
          />
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={product.addedBy}
            onChange={e => setProduct({ ...product, addedBy: e.target.value })}
            required
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Add Product</button>
        </form>
      </Modal>
      {/* Add Person Modal */}
      <Modal open={showAddPerson} onClose={() => setShowAddPerson(false)} title="Invite People">
        <form onSubmit={handleAddPerson} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            required
          />
          <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition">Invite</button>
        </form>
      </Modal>
      {toast && <Toast toastData={toast} onClose={() => setToast(null)} />}
    </section>
  );
};

export default WishlistDetail; 