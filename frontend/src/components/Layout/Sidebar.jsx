import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/tasks', label: 'All Tasks', icon: '📋' },
    { path: '/admin/create-task', label: 'Create Task', icon: '➕' },
    { path: '/admin/users', label: 'Manage Users', icon: '👥' }
  ];

  const userMenuItems = [
    { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/user/my-tasks', label: 'My Tasks', icon: '📝' }
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.profile}>
        <div style={styles.avatar}>
          {role === 'admin' ? '👑' : '👤'}
        </div>
        <div style={styles.role}>
          {role === 'admin' ? 'Administrator' : 'Team Member'}
        </div>
      </div>
      
      <div style={styles.menu}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.menuItem,
              ...(location.pathname === item.path ? styles.activeMenuItem : {})
            }}
          >
            <span style={styles.menuIcon}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
      
      <div style={styles.footer}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <span style={styles.menuIcon}>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '280px',
    background: 'white',
    height: 'calc(100vh - 70px)',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: '70px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.02)'
  },
  profile: {
    padding: '30px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #f0f0f0'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    margin: '0 auto 15px'
  },
  role: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '5px'
  },
  menu: {
    flex: 1,
    padding: '20px 0'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 25px',
    color: '#555',
    textDecoration: 'none',
    transition: 'all 0.3s',
    borderLeft: '4px solid transparent',
    marginBottom: '5px'
  },
  activeMenuItem: {
    background: 'linear-gradient(90deg, rgba(102,126,234,0.1) 0%, rgba(102,126,234,0) 100%)',
    color: '#667eea',
    borderLeftColor: '#667eea'
  },
  menuIcon: {
    marginRight: '12px',
    fontSize: '18px'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #f0f0f0'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    color: '#dc3545',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  }
};

export default Sidebar;