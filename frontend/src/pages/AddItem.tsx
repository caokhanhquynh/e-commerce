import React, { useState, useEffect } from 'react';

const AddItemForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        photo: ''
    });
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return;
        }
        setUserId(payload.id);

    } catch (err) {
        console.error('Invalid token format', err);
        localStorage.removeItem('token');
    }
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const res = await fetch(`${__API_URL__||'http://localhost:3001'}/api/items/upload`, {
        method: 'POST',
        body: formData
      });
  
      const data = await res.json();
      setFormData(prev => ({ ...prev, photo: data.url })); // Save the uploaded image URL
    } catch (err) {
      console.error('Upload failed', err);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const res = await fetch(`${__API_URL__||'http://localhost:3001'}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: userId })
      });

      if (res.ok) {
        alert('Item added!');
        setFormData({ title: '', price: '', description: '', photo: '' });
      } else {
        alert('Failed to add item');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Add New Item</h2>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
