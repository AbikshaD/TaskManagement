import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" style={styles.button}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 70px)',
    padding: '20px',
    textAlign: 'center'
  },
  content: {
    maxWidth: '500px'
  },
  title: {
    fontSize: '120px',
    color: '#dc3545',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px'
  },
  text: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px'
  },
  button: {
    display: 'inline-block',
    padding: '12px 32px',
    background: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '16px'
  }
};

export default NotFound;