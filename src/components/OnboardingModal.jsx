import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, User, Phone, ArrowRight } from 'lucide-react';

const OnboardingModal = ({ session, onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: session.user.id, // Linking to auth.users
            full_name: fullName,
            company_name: companyName,
            phone: phone,
          }
        ]);

      if (profileError) throw profileError;
      
      onComplete(); // Close modal and show dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '0.5rem'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(248, 250, 252, 0.95)', backdropFilter: 'blur(8px)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white', padding: '3rem', borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        width: '100%', maxWidth: '460px', border: '1px solid #F1F5F9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111111', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Welcome to theminimalStore
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>
            Let's set up your retailer profile to get started.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', color: '#EF4444', padding: '1rem',
            borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600,
            marginBottom: '1.5rem', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="Arjun Kapoor" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#111111'} onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
              <User size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Company Name / Store Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                placeholder="SuperMart Express" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#111111'} onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
              <Building2 size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Phone Number (Optional)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#111111'} onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
              <Phone size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              background: '#111111', color: 'white', padding: '1.125rem', borderRadius: '12px',
              border: 'none', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              marginTop: '1rem', transition: 'opacity 0.2s', opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? 'Saving Profile...' : (
              <>
                Continue to Dashboard
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;
