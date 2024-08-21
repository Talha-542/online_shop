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
              <p className="card-text">View and manage user accounts.</p>
              <button className="btn btn-primary" onClick={fetchUsers}>
                View Users
              </button>
              {showUsers && (
                <ul className="mt-3">
                  {users.map((user) => (
                    <li key={user.id}><strong>Name:</strong>{user.name.firstname+ user.name.lastname}, <br/><strong>Username:</strong>{user.username},<br/><strong>Contact No:</strong>{user.phone}<hr/></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">Add, edit, or delete products.</p>
              <button className="btn btn-primary" onClick={fetchProducts}>
                View Products
              </button>
              {showProducts && (
                <ul className="mt-3">
                  {products.map((product) => (
                    <li key={product.id}>{product.title}<hr/></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Orders</h5>
              <p className="card-text">View and update customer orders.</p>
              <button className="btn btn-primary" onClick={fetchOrders}>
                View Orders
              </button>
              {showOrders && (
                <ul className="mt-3">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <li key={order.id}>
                        Order ID: {order.id}, User ID: {order.userId}, Date: {order.date} <hr/>
                      </li>
                    ))
                  ) : (
                    <p>No Orders Yet</p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
