import { useState } from 'react';
import { Users, Shield, Lock, Trash2, Edit2, UserPlus, Mail, Fingerprint, ChevronRight } from 'lucide-react';

const StaffAccess = () => {
  const [staff] = useState([
    { id: 1, name: 'Anjali Sharma', role: 'Store Manager', store: 'Downtown Express', status: 'Active', email: 'anjali@minimalstore.com' },
    { id: 2, name: 'Rehan Khan', role: 'Security Ops', store: 'Downtown Express', status: 'Active', email: 'rehan@minimalstore.com' },
    { id: 3, name: 'Priya Das', role: 'Store Assistant', store: 'Uptown Market', status: 'Offline', email: 'priya@minimalstore.com' },
  ]);

  const actionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '14px',
    fontSize: '0.8125rem',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #E2E8F0',
    background: 'white',
    color: '#111111'
  };

  const primaryBtnStyle = {
    ...actionBtnStyle,
    background: '#111111',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const tableHeaderStyle = {
    padding: '1.25rem 1.5rem',
    fontSize: '0.625rem',
    fontWeight: 950,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    borderBottom: '1px solid #F1F5F9',
    textAlign: 'left'
  };

  return (
    <div className="page-container">
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Access Management</h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Control administrative privileges and security protocols across your enterprise.</p>
        </div>
        <button style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
          <UserPlus size={18} />
          Invite Associate
        </button>
      </div>

      {/* Admin Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#F8FAFC', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.625rem', fontWeight: 950, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hierarchy</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111111', marginTop: '0.25rem' }}>4 Custom Roles</div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#F0FDF4', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.625rem', fontWeight: 950, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Network Capacity</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111111', marginTop: '0.25rem' }}>12 Active Personnel</div>
          </div>
        </div>
      </div>

      {/* Authorization Matrix Table */}
      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9', background: '#FDFDFD' }}>
          <div style={{ fontSize: '0.625rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Authorization Matrix</div>
          <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '0.25rem' }}>Secure employee nodes and permission audits.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Personnel</th>
                <th style={tableHeaderStyle}>Privilege Level</th>
                <th style={tableHeaderStyle}>Assigned Node</th>
                <th style={tableHeaderStyle}>Security State</th>
                <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Management</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s ease' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#111111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 950, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#111111' }}>{member.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '0.125rem' }}>
                           <Mail size={12} />
                           {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <Fingerprint size={16} color="#111111" />
                       <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#111111' }}>{member.role}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
                    {member.store}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontSize: '9px', 
                      fontWeight: 950, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      width: 'fit-content',
                      background: member.status === 'Active' ? '#F0FDF4' : '#F1F5F9',
                      color: member.status === 'Active' ? '#10B981' : '#64748B'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: member.status === 'Active' ? '#10B981' : '#94A3B8' }}></div>
                      {member.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button style={{ ...actionBtnStyle, padding: '0.5rem', borderRadius: '10px' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                        <Edit2 size={16} />
                      </button>
                      <button style={{ ...actionBtnStyle, padding: '0.5rem', borderRadius: '10px' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                        <Lock size={16} />
                      </button>
                      <button style={{ ...actionBtnStyle, padding: '0.5rem', borderRadius: '10px', color: '#EF4444' }} onMouseOver={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.borderColor = '#FEE2E2'; }} onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#E2E8F0'; }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffAccess;
