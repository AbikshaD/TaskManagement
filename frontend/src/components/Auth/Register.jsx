import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    role: 'user'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, department, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await register({ 
      name, 
      email, 
      password, 
      department, 
      role 
    });
    
    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        
        {(error || validationError) && (
          <div style={styles.error}>{error || validationError}</div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Department</label>
            <input
              type="text"
              name="department"
              value={department}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your department"
            />
          </div>
          
          {/* ROLE SELECTION - Now visible! */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Register as</label>
            <select
              name="role"
              value={role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <small style={styles.hint}>
              Select 'Admin' to get administrator privileges
            </small>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter password"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: '#f5f5f5'
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '40px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  title: {
    marginBottom: '30px',
    textAlign: 'center',
    color: '#333',
    fontSize: '28px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    color: '#555',
    fontSize: '14px'
  },
  input: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s',
    outline: 'none'
  },
  select: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    background: 'white',
    outline: 'none',
    cursor: 'pointer'
  },
  hint: {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px'
  },
  button: {
    padding: '14px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  },
  error: {
    padding: '12px',
    background: '#f8d7da',
    color: '#721c24',
    borderRadius: '6px',
    marginBottom: '20px',
    border: '1px solid #f5c6cb'
  },
  text: {
    marginTop: '25px',
    textAlign: 'center',
    color: '#666'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Register;