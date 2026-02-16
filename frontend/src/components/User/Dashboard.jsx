import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        API.get('/tasks/stats/overview'),
        API.get('/tasks?limit=5')
      ]);
      
      setStats(statsRes.data.stats);
      setRecentTasks(tasksRes.data.tasks);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      // Refresh tasks
      const { data } = await API.get('/tasks?limit=5');
      setRecentTasks(data.tasks);
      
      // Refresh stats
      const statsRes = await API.get('/tasks/stats/overview');
      setStats(statsRes.data.stats);
    } catch (error) {
      alert('Failed to update task status');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Dashboard</h2>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3 style={styles.statValue}>{stats?.totalTasks || 0}</h3>
          <p style={styles.statLabel}>My Tasks</p>
        </div>
        <div style={{...styles.statCard, borderTopColor: '#ffc107'}}>
          <h3 style={styles.statValue}>{stats?.pendingTasks || 0}</h3>
          <p style={styles.statLabel}>Pending</p>
        </div>
        <div style={{...styles.statCard, borderTopColor: '#17a2b8'}}>
          <h3 style={styles.statValue}>{stats?.inProgressTasks || 0}</h3>
          <p style={styles.statLabel}>In Progress</p>
        </div>
        <div style={{...styles.statCard, borderTopColor: '#28a745'}}>
          <h3 style={styles.statValue}>{stats?.completedTasks || 0}</h3>
          <p style={styles.statLabel}>Completed</p>
        </div>
      </div>

      <div style={styles.recentSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subtitle}>My Recent Tasks</h3>
          <Link to="/my-tasks" style={styles.viewAllLink}>View All</Link>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentTasks.map(task => (
              <tr key={task._id}>
                <td style={styles.td}>{task.title}</td>
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
                  {task.status !== 'completed' && task.status !== 'cancelled' && (
                    <select
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      style={styles.statusSelect}
                      defaultValue=""
                    >
                      <option value="" disabled>Update Status</option>
                      <option value="pending">Set Pending</option>
                      <option value="in-progress">Set In Progress</option>
                      <option value="completed">Set Completed</option>
                      <option value="cancelled">Set Cancelled</option>
                    </select>
                  )}
                  {task.status === 'completed' && (
                    <span style={styles.completedText}>Completed on {new Date(task.completedAt).toLocaleDateString()}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  subtitle: {
    marginBottom: '20px',
    color: '#555'
  },
  loading: {
    padding: '30px',
    textAlign: 'center',
    fontSize: '18px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderTop: '4px solid #007bff',
    textAlign: 'center'
  },
  statValue: {
    fontSize: '32px',
    marginBottom: '5px',
    color: '#333'
  },
  statLabel: {
    color: '#666',
    fontSize: '14px'
  },
  recentSection: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  viewAllLink: {
    color: '#007bff',
    textDecoration: 'none'
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
  completedText: {
    fontSize: '12px',
    color: '#28a745'
  }
};

export default UserDashboard;