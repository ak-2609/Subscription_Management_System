import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernameOrEmail,
          password,
        }),
      });
      if (res.ok) {
        // You may want to store a token or redirect
        alert('Login successful!');
      } else {
        const data = await res.json();
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(24,24,27,0.96)',
          padding: '2.5rem 2rem',
          borderRadius: '22px',
          boxShadow: '0 8px 40px 0 rgba(0,0,0,0.65), 0 1.5px 8px 0 #7c3aed33',
          border: '2px solid #7c3aed',
          width: '100%',
          maxWidth: '380px',
          color: '#fff',
          position: 'relative',
          backdropFilter: 'blur(8px) saturate(140%)',
          transition: 'box-shadow 0.2s, border 0.2s',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
          <img src="/logo.svg" alt="Logo" style={{ width: 48, height: 48, borderRadius: 14, boxShadow: '0 2px 8px #7c3aed44' }} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#b3b3b3', fontSize: '1rem' }}>Sign in to your account</p>

        <div style={{ marginBottom: '1.3rem' }}>
          <label style={{ fontWeight: 600, marginBottom: '0.4rem', display: 'block', fontSize: '1rem', textAlign: 'left' }}>
            Username or Email
          </label>
          <input
            type="text"
            placeholder="Enter your username or email"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1.5px solid #232329',
              background: '#18181b',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s, box-shadow 0.2s',
              marginTop: '0.2rem',
              boxShadow: '0 1px 4px #23232922 inset'
            }}
            onFocus={e => (e.currentTarget.style.border = '1.5px solid #7c3aed')}
            onBlur={e => (e.currentTarget.style.border = '1.5px solid #232329')}
          />
        </div>

        <div style={{ marginBottom: '1.7rem' }}>
          <label style={{ fontWeight: 600, marginBottom: '0.4rem', display: 'block', fontSize: '1rem', textAlign: 'left' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1.5px solid #232329',
              background: '#18181b',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s, box-shadow 0.2s',
              marginTop: '0.2rem',
              boxShadow: '0 1px 4px #23232922 inset'
            }}
            onFocus={e => (e.currentTarget.style.border = '1.5px solid #7c3aed')}
            onBlur={e => (e.currentTarget.style.border = '1.5px solid #232329')}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.95rem',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.1rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 8px #7c3aed33',
            transition: 'background 0.2s, box-shadow 0.2s'
          }}
        >
          Login
        </button>

        <div style={{ textAlign: 'center', color: '#b3b3b3', fontSize: '1rem' }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#a78bfa',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
            onMouseOut={e => (e.currentTarget.style.color = '#a78bfa')}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;