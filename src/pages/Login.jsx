import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, ShoppingCart, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Auto-create account if it doesn't exist for demo purposes
    // In production, you would handle sign up and sign in separately
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      if (signInError.message.includes('Invalid login credentials')) {
         // Attempt sign up if user doesn't exist
         const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
         });
         if (signUpError) {
             setError(signUpError.message);
         } else {
             // Successful sign up, we wait for session
             setError('Account created! Please sign in again or check your email for confirmation if required.');
         }
      } else {
         setError(signInError.message);
      }
    } else if (data.session) {
      onLogin(data.session);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8FAFC',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid #F1F5F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <div style={{ background: '#111111', color: 'white', padding: '10px', borderRadius: '12px' }}>
            <ShoppingCart size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#111111' }}>RetailOS</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111111', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2',
            color: '#EF4444',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
              Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@retailos.com"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                fontSize: '0.9375rem',
                color: '#111111',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = '#111111'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  paddingLeft: '2.75rem',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.9375rem',
                  color: '#111111',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#111111'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
              <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#111111',
              color: 'white',
              padding: '1rem',
              borderRadius: '12px',
              border: 'none',
              fontSize: '0.9375rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              transition: 'opacity 0.2s',
              opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn size={18} />
                Secure Login
              </>
            )}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>
          Protected by Supabase Auth Integration
        </p>
      </div>
    </div>
  );
};

export default Login;
