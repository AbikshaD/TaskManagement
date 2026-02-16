import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/users');
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (selectedUser !== 'all' && task.assignedTo?._id !== selectedUser) return false;
    return true;
  });

  if (loading) {
    return <div style={styles.loading}>Loading tasks...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>All Tasks</h2>
        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statValue}>{tasks.length}</span>
            <span style={styles.statLabel}>Total</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statValue}>{tasks.filter(t => t.status === 'pending').length}</span>
            <span style={styles.statLabel}>Pending</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statValue}>{tasks.filter(t => t.status === 'in-progress').length}</span>
            <span style={styles.statLabel}>In Progress</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statValue}>{tasks.filter(t => t.status === 'completed').length}</span>
            <span style={styles.statLabel}>Completed</span>
          </div>
        </div>
      </div>
      
      <div style={styles.filters}>
        <select 
          onChange={(e) => setFilter(e.target.value)} 
          style={styles.filterSelect}
          value={filter}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        
        <select 
          onChange={(e) => setSelectedUser(e.target.value)} 
          style={styles.filterSelect}
          value={selectedUser}
        >
          <option value="all">All Users</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
      </div>
      
      <div style={styles.card}>
        {filteredTasks.length === 0 ? (
          <p style={styles.noTasks}>No tasks found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Created By</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task._id}>
                  <td style={styles.td}>
                    <div style={styles.taskTitle}>{task.title}</div>
                    <div style={styles.taskDesc}>{task.description.substring(0, 50)}...</div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.assignedUser}>
                      <span style={styles.userIcon}>👤</span>
                      {task.assignedTo?.name}
                    </div>
                    <div style={styles.userEmail}>{task.assignedTo?.email}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={{...styles.badge, ...getStatusStyle(task.status)}}>
                      {task.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{...styles.badge, ...getPriorityStyle(task.priority)}}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>{task.createdBy?.name}</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  const styles = {
    'pending': { background: '#fff3cd', color: '#856404' },
    'in-progress': { background: '#d1ecf1', color: '#0c5460' },
    'completed': { background: '#d4edda', color: '#155724' },
    'cancelled': { background: '#f8d7da', color: '#721c24' }
  };
  return styles[status] || {};
};

const getPriorityStyle = (priority) => {
  const styles = {
    'low': { background: '#e2e3e5', color: '#383d41' },
    'medium': { background: '#cce5ff', color: '#004085' },
    'high': { background: '#fff3cd', color: '#856404' },
    'urgent': { background: '#f8d7da', color: '#721c24' }
  };
  return styles[priority] || {};
};

const styles = {
  container: {
    padding: '30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '28px',
    color: '#333',
    margin: 0
  },
  stats: {
    display: 'flex',
    gap: '20px'
  },
  stat: {
    background: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea'
  },
  statLabel: {
    fontSize: '12px',
    color: '#666'
  },
  filters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  filterSelect: {
    padding: '10px 15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    background: 'white',
    minWidth: '200px'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '15px',
    background: '#f8f9fa',
    borderBottom: '2px solid #e0e0e0',
    fontWeight: '600',
    color: '#555'
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #e0e0e0'
  },
  taskTitle: {
    fontWeight: '500',
    color: '#333',
    marginBottom: '4px'
  },
  taskDesc: {
    fontSize: '12px',
    color: '#666'
  },
  assignedUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px'
  },
  userIcon: {
    fontSize: '14px'
  },
  userEmail: {
    fontSize: '11px',
    color: '#999'
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  deleteButton: {
    padding: '6px 12px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  loading: {
    padding: '50px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#666'
  },
  noTasks: {
    padding: '50px',
    textAlign: 'center',
    color: '#666',
    fontSize: '16px'
  }
};

export default AdminTasks;