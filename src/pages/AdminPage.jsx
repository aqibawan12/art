import React, { useEffect, useState } from "react";
import './ProductsPage.css';

const API_URL = "http://localhost:5000/api/products";
const API_URL_ALL = "http://localhost:5000/api/products/all";
const defaultProduct = { name: "", image: "", price: "", stock: "", visible: false };

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(defaultProduct);
  const [editId, setEditId] = useState(null);

  // Load all products (including invisible)
  useEffect(() => {
    fetch(API_URL_ALL)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setForm(defaultProduct);
  };

  const handleEdit = product => {
    setEditId(product.id);
    setForm(product);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
    });
    setProducts(products.map(p => (p.id === editId ? { ...form, id: editId } : p)));
    setEditId(null);
    setForm(defaultProduct);
  };

  const handleDelete = async id => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleToggleVisible = async (product) => {
    await fetch(`${API_URL}/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, visible: !product.visible })
    });
    setProducts(products.map(p =>
      p.id === product.id ? { ...p, visible: !p.visible } : p
    ));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Upload to backend
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    // Set the image URL returned from backend (Google Drive link)
    setForm({ ...form, image: data.url });
  };

  return (
    <div className="products-page-container">
      <h2 className="products-title">Admin Product Store</h2>
      <form className="admin-form" onSubmit={editId ? handleUpdate : handleAdd}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="admin-input" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="admin-input"
        />
        {form.image && (
          <img src={form.image} alt="Preview" style={{ width: 80, marginTop: 8, borderRadius: 8 }} />
        )}
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="admin-input" />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="admin-input" />
        <label style={{color:"#fff", marginTop:8}}>
          <input
            type="checkbox"
            name="visible"
            checked={form.visible}
            onChange={handleChange}
            style={{marginRight:8}}
          />
          Visible
        </label>
        <button type="submit" className="cta-button" style={{marginTop:8}}>
          {editId ? "Update Product" : "Add Product"}
        </button>
        {editId && (
          <button type="button" className="cta-button" style={{marginTop:8, background:"#888"}}
            onClick={() => { setEditId(null); setForm(defaultProduct); }}>
            Cancel
          </button>
        )}
      </form>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" style={{opacity: product.visible ? 1 : 0.5}}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p style={{color:'#bdbdbd'}}>Stock: {product.stock}</p>
            <p style={{color: product.visible ? "#28a745" : "#a00"}}>
              {product.visible ? "Visible" : "Hidden"}
            </p>
            <div style={{marginTop:8}}>
              <button className="cta-button" style={{marginRight:8}} onClick={() => handleEdit(product)}>Edit</button>
              <button className="cta-button" style={{background:"#a00", marginRight:8}} onClick={() => handleDelete(product.id)}>Delete</button>
              <button
                className="cta-button"
                style={{ background: product.visible ? "#28a745" : "#888" }}
                onClick={() => handleToggleVisible(product)}
              >
                {product.visible ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;