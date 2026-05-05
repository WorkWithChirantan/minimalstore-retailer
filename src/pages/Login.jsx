import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, ShoppingCart, Lock, Mail, KeyRound, UserPlus } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'login') {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        if (data.session) onLogin(data.session);

      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;
        
        setMode('verify');
        setSuccessMsg('Verification code sent! Please check your email.');

      } else if (mode === 'verify') {
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'signup',
        });

        if (verifyError) throw verifyError;
        if (data.session) onLogin(data.session);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError(null);
    setSuccessMsg(null);
    setOtp('');
    setConfirmPassword('');
    if (newMode !== 'verify') {
        // Keep email and password if toggling between login/signup
    }
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
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#111111' }}>theminimalStore</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111111', marginBottom: '0.5rem' }}>
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify Email'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
            {mode === 'login' ? 'Enter your credentials to access the dashboard' : 
             mode === 'signup' ? 'Sign up for a new retailer account' : 
             `Enter the 6-digit OTP sent to ${email}`}
          </p>
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

        {successMsg && (
          <div style={{
            background: '#ECFDF5',
            color: '#10B981',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(mode === 'login' || mode === 'signup') && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                  Work Email
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@theminimalstore.com"
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
                  <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
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
            </>
          )}

          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          )}

          {mode === 'verify' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                6-Digit OTP
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    paddingLeft: '2.75rem',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '1.25rem',
                    letterSpacing: '0.2em',
                    color: '#111111',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                  }}
                  onFocus={e => e.target.style.borderColor = '#111111'}
                  onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                />
                <KeyRound size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          )}

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
            {loading ? 'Processing...' : (
              <>
                {mode === 'login' ? <LogIn size={18} /> : mode === 'signup' ? <UserPlus size={18} /> : <KeyRound size={18} />}
                {mode === 'login' ? 'Secure Login' : mode === 'signup' ? 'Create Account' : 'Verify OTP'}
              </>
            )}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          {mode === 'login' ? (
            <button 
              onClick={() => switchMode('signup')}
              style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', padding: '0.5rem' }}>
              Don't have an account? <span style={{ color: '#111111' }}>Sign up</span>
            </button>
          ) : mode === 'signup' ? (
            <button 
              onClick={() => switchMode('login')}
              style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', padding: '0.5rem' }}>
              Already have an account? <span style={{ color: '#111111' }}>Log in</span>
            </button>
          ) : (
            <button 
              onClick={() => switchMode('signup')}
              style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', padding: '0.5rem' }}>
              Didn't receive code? <span style={{ color: '#111111' }}>Go back</span>
            </button>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>
          Protected by Supabase Auth Integration
        </p>
      </div>
    </div>
  );
};

export default Login;
