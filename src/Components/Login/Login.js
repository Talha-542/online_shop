import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/verifySlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="card p-4">
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
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
        {status === 'failed' && (
          <p className="text-danger mt-3">Error: {error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
