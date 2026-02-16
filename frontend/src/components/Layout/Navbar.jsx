import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.navbarBrand}>
          <Link to={getDashboardLink()} style={styles.brand}>
            <span style={styles.brandIcon}>✓</span>
            TaskAlloc
          </Link>
        </div>
        
        <div style={styles.navbarMenu}>
          {user ? (
            <>
              <div style={styles.userInfo}>
                <span style={styles.welcomeText}>
                  Welcome, <strong>{user.name}</strong>
                </span>
                <span style={{
                  ...styles.roleBadge,
                  ...(user.role === 'admin' ? styles.adminBadge : styles.userBadge)
                }}>
                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
              <Link to={getDashboardLink()} style={styles.navLink}>
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin/users" style={styles.navLink}>
                  Users
                </Link>
              )}
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/register" style={styles.navLink}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem 2rem',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navbarBrand: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  brandIcon: {
    background: 'white',
    color: '#667eea',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },
  navbarMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  welcomeText: {
    color: 'white',
    fontSize: '14px'
  },
  roleBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  },
  adminBadge: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  userBadge: {
    background: 'rgba(255,255,255,0.1)',
    color: 'white'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background 0.3s',
    fontSize: '14px'
  },
  logoutButton: {
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s'
  }
};

export default Navbar;