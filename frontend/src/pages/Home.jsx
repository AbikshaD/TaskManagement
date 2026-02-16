import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Task Allocation Engine</h1>
        <p style={styles.subtitle}>
          Efficiently manage and track tasks across your organization
        </p>
        
        {!user ? (
          <div style={styles.buttonGroup}>
            <Link to="/login" style={{...styles.button, ...styles.loginButton}}>
              Login
            </Link>
            <Link to="/register" style={{...styles.button, ...styles.registerButton}}>
              Register
            </Link>
          </div>
        ) : (
          <div style={styles.buttonGroup}>
            <Link to="/dashboard" style={styles.dashboardButton}>
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Task Management</h3>
          <p style={styles.featureDescription}>
            Create, assign, and track tasks with ease
          </p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Role-Based Access</h3>
          <p style={styles.featureDescription}>
            Different views and permissions for admins and users
          </p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Real-Time Updates</h3>
          <p style={styles.featureDescription}>
            Track task progress and status changes instantly
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center'
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '40px',
    opacity: '0.9'
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
  },
  button: {
    padding: '12px 32px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500'
  },
  loginButton: {
    background: 'white',
    color: '#667eea'
  },
  registerButton: {
    background: 'transparent',
    color: 'white',
    border: '2px solid white'
  },
  dashboardButton: {
    padding: '12px 32px',
    background: 'white',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: '500'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  feature: {
    textAlign: 'center',
    padding: '30px',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  featureTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333'
  },
  featureDescription: {
    color: '#666',
    lineHeight: '1.6'
  }
};

export default Home;