import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/users');
      setUsers(data.users);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading users...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Users</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Joined</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.department}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(user.role === 'admin' ? styles.adminBadge : styles.userBadge)}}>
                    {user.role}
                  </span>
                </td>
                <td style={styles.td}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    style={styles.deleteButton}
                    disabled={user.role === 'admin'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px'
  },
  title: {
    marginBottom: '30px',
    color: '#333'
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    background: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
    fontWeight: '600'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6'
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  },
  adminBadge: {
    background: '#dc3545',
    color: 'white'
  },
  userBadge: {
    background: '#007bff',
    color: 'white'
  },
  deleteButton: {
    padding: '4px 8px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  loading: {
    padding: '30px',
    textAlign: 'center',
    fontSize: '18px'
  },
  error: {
    padding: '10px',
    background: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    marginBottom: '15px'
  }
};

export default ManageUsers;