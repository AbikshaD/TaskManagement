import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
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

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      // Refresh tasks
      fetchTasks();
    } catch (error) {
      alert('Failed to update task status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) {
    return <div style={styles.loading}>Loading tasks...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Tasks</h2>
      
      <div style={styles.filterSection}>
        <button 
          onClick={() => setFilter('all')}
          style={{...styles.filterButton, ...(filter === 'all' ? styles.activeFilter : {})}}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('pending')}
          style={{...styles.filterButton, ...(filter === 'pending' ? styles.activeFilter : {})}}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilter('in-progress')}
          style={{...styles.filterButton, ...(filter === 'in-progress' ? styles.activeFilter : {})}}
        >
          In Progress
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{...styles.filterButton, ...(filter === 'completed' ? styles.activeFilter : {})}}
        >
          Completed
        </button>
      </div>
      
      <div style={styles.card}>
        {filteredTasks.length === 0 ? (
          <p style={styles.noTasks}>No tasks found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task._id}>
                  <td style={styles.td}>{task.title}</td>
                  <td style={styles.td}>{task.description.substring(0, 50)}...</td>
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
                  <td style={styles.td}>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <select
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      style={styles.statusSelect}
                      value={task.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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
    'pending': { background: '#ffc107', color: '#000' },
    'in-progress': { background: '#17a2b8', color: '#fff' },
    'completed': { background: '#28a745', color: '#fff' },
    'cancelled': { background: '#dc3545', color: '#fff' }
  };
  return styles[status] || {};
};

const getPriorityStyle = (priority) => {
  const styles = {
    'low': { background: '#6c757d', color: '#fff' },
    'medium': { background: '#007bff', color: '#fff' },
    'high': { background: '#fd7e14', color: '#fff' },
    'urgent': { background: '#dc3545', color: '#fff' }
  };
  return styles[priority] || {};
};

const styles = {
  container: {
    padding: '30px'
  },
  title: {
    marginBottom: '30px',
    color: '#333'
  },
  filterSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  filterButton: {
    padding: '8px 16px',
    border: '1px solid #dee2e6',
    background: 'white',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  activeFilter: {
    background: '#007bff',
    color: 'white',
    borderColor: '#007bff'
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
    borderBottom: '2px solid #dee2e6'
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
  statusSelect: {
    padding: '4px 8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '12px'
  },
  loading: {
    padding: '30px',
    textAlign: 'center',
    fontSize: '18px'
  },
  noTasks: {
    padding: '30px',
    textAlign: 'center',
    color: '#666'
  }
};

export default MyTasks;