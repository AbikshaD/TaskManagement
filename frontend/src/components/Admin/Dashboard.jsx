import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminDashboard = () => {
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

  if (loading) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3 style={styles.statValue}>{stats?.totalTasks || 0}</h3>
          <p style={styles.statLabel}>Total Tasks</p>
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
        <div style={{...styles.statCard, borderTopColor: '#dc3545'}}>
          <h3 style={styles.statValue}>{stats?.urgentTasks || 0}</h3>
          <p style={styles.statLabel}>Urgent</p>
        </div>
      </div>

      <div style={styles.recentSection}>
        <h3 style={styles.subtitle}>Recent Tasks</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Assigned To</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {recentTasks.map(task => (
              <tr key={task._id}>
                <td style={styles.td}>{task.title}</td>
                <td style={styles.td}>{task.assignedTo?.name}</td>
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
  }
};

export default AdminDashboard;