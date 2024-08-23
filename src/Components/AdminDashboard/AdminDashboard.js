import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const [newUser, setNewUser] = useState({ name: { firstname: '', lastname: '' }, username: '', phone: '' });
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const [newOrder, setNewOrder] = useState({ userId: '', date: '', products: [] });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Admin' && password === '12345') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      setUsers(response.data);
      setShowUsers(true);
      setShowProducts(false);
      setShowOrders(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setShowUsers(false);
      setShowProducts(true);
      setShowOrders(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/carts');
      setOrders(response.data);
      setShowUsers(false);
      setShowProducts(false);
      setShowOrders(true);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
  };

  const handleSaveUser = async () => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/users/${editUser.id}`, editUser);
      setUsers(users.map((u) => (u.id === editUser.id ? response.data : u)));
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct({ ...product });
  };

  const handleSaveProduct = async () => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${editProduct.id}`, editProduct);
      setProducts(products.map((p) => (p.id === editProduct.id ? response.data : p)));
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditOrder = (order) => {
    setEditOrder({ ...order });
  };

  const handleSaveOrder = async () => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/carts/${editOrder.id}`, editOrder);
      setOrders(orders.map((o) => (o.id === editOrder.id ? response.data : o)));
      setEditOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/${orderId}`);
      setOrders(orders.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: { firstname: '', lastname: '' }, username: '', phone: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ title: '', price: '', description: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/carts', newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({ userId: '', date: '', products: [] });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className="container mt-5"
        style={{
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="p-4">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.username || 'Admin'}!</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">Create, view, edit, or delete user accounts.</p>
              <button className="btn btn-primary mb-3" onClick={fetchUsers}>
                View Users
              </button>
              <button className="btn btn-success mb-3" style={{marginLeft:'2px'}} onClick={handleCreateUser}>
                Create New User
              </button>
              {showUsers && (
                <ul className="mt-3">
                  {users.map((user) => (
                    <li key={user.id}>
                      <strong>Name:</strong> {user?.name?.firstname || 'N/A'} {user?.name?.lastname || 'N/A'}
                      <br />
                      <strong>Username:</strong> {user?.username || 'N/A'}
                      <br />
                      <strong>Contact No:</strong> {user?.phone || 'N/A'}
                      <br />
                      <button className="btn btn-sm btn-warning" onClick={() => handleEditUser(user)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </button>
                      <hr />
                    </li>
                  ))}
                </ul>
              )}
              {editUser && (
                <div>
                  <h5>Edit User</h5>
                  <input
                    type="text"
                    placeholder='First Name'
                    style={{marginBottom:'2px'}}
                    value={editUser?.name?.firstname || ''}
                    onChange={(e) => setEditUser({ ...editUser, name: { ...editUser.name, firstname: e.target.value } })}
                  />
                  <input
                    type="text"
                    placeholder='Last Name'
                    style={{marginBottom:'2px'}}
                    value={editUser?.name?.lastname || ''}
                    onChange={(e) => setEditUser({ ...editUser, name: { ...editUser.name, lastname: e.target.value } })}
                  />
                  <input
                    type="text"
                    placeholder='Username'
                    style={{marginBottom:'2px'}}
                    value={editUser?.username || ''}
                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder='Phone no'
                    style={{marginBottom:'2px'}}
                    value={editUser?.phone || ''}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                  />
                  <button className="btn btn-sm btn-primary" 
                    style={{marginLeft:'2px'}} onClick={handleSaveUser}>
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">Create, view, edit, or delete products.</p>
              <button className="btn btn-primary mb-3" onClick={fetchProducts}>
                View Products
              </button>
              <button className="btn btn-success mb-3" style={{marginLeft:'2px'}} onClick={handleCreateProduct}>
                Create New Product
              </button>
              {showProducts && (
                <ul className="mt-3">
                  {products.map((product) => (
                    <li key={product.id}>
                      {product.title}
                      <br />
                      <button className="btn btn-sm btn-warning" onClick={() => handleEditProduct(product)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </button>
                      <hr />
                    </li>
                  ))}
                </ul>
              )}
              {editProduct && (
                <div>
                  <h5>Edit Product</h5>
                  <input
                    type="text"
                    placeholder='Product Name'
                    style={{marginBottom:'2px'}}
                    value={editProduct?.title || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder='Price'
                    style={{marginBottom:'2px'}}
                    value={editProduct?.price || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                  />
                  <textarea
                    value={editProduct?.description || ''}
                    placeholder='Description'
                    style={{marginBottom:'2px'}}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  />
                  <button className="btn btn-sm btn-primary" style={{marginLeft:'2px'}} onClick={handleSaveProduct}>
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Orders</h5>
              <p className="card-text">Create, view, edit, or delete customer orders.</p>
              <button className="btn btn-primary mb-3" onClick={fetchOrders}>
                View Orders
              </button>
              <button className="btn btn-success mb-3" style={{marginBottom:'2px'}} onClick={handleCreateOrder}>
                Create New Order
              </button>
              {showOrders && (
                <ul className="mt-3">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <li key={order.id}>
                        Order ID: {order.id}, User ID: {order.userId}, Date: {order.date}
                        <br />
                        <button className="btn btn-sm btn-warning" onClick={() => handleEditOrder(order)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </button>
                        <hr />
                      </li>
                    ))
                  ) : (
                    <p>No Orders Yet</p>
                  )}
                </ul>
              )}
              {editOrder && (
                <div>
                  <h5>Edit Order</h5>
                  <input
                    type="text"
                    placeholder='User Id'
                    style={{marginBottom:'2px'}}
                    value={editOrder?.userId || ''}
                    onChange={(e) => setEditOrder({ ...editOrder, userId: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder='Date'
                    style={{marginBottom:'2px'}}
                    value={editOrder?.date || ''}
                    onChange={(e) => setEditOrder({ ...editOrder, date: e.target.value })}
                  />
                  <button className="btn btn-sm btn-primary" style={{marginLeft:'2px'}} onClick={handleSaveOrder}>
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
