import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Admin Components
import AdminDashboard from './components/Admin/Dashboard';
import AdminCreateTask from './components/Admin/CreateTask';
import AdminManageUsers from './components/Admin/ManageUsers';
import AdminTasks from './components/Admin/Tasks';

// User Components
import UserDashboard from './components/User/Dashboard';
import UserMyTasks from './components/User/MyTasks';

// Role Based Redirect Component
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return <div style={styles.loading}>Redirecting...</div>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={styles.app}>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes - Separate Layout */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={
                <div style={styles.layout}>
                  <Sidebar role="admin" />
                  <div style={styles.content}>
                    <AdminDashboard />
                  </div>
                </div>
              } />
              
              <Route path="/admin/dashboard" element={
                <div style={styles.layout}>
                  <Sidebar role="admin" />
                  <div style={styles.content}>
                    <AdminDashboard />
                  </div>
                </div>
              } />
              
              <Route path="/admin/tasks" element={
                <div style={styles.layout}>
                  <Sidebar role="admin" />
                  <div style={styles.content}>
                    <AdminTasks />
                  </div>
                </div>
              } />
              
              <Route path="/admin/create-task" element={
                <div style={styles.layout}>
                  <Sidebar role="admin" />
                  <div style={styles.content}>
                    <AdminCreateTask />
                  </div>
                </div>
              } />
              
              <Route path="/admin/users" element={
                <div style={styles.layout}>
                  <Sidebar role="admin" />
                  <div style={styles.content}>
                    <AdminManageUsers />
                  </div>
                </div>
              } />
            </Route>
            
            {/* User Routes - Separate Layout */}
            <Route element={<PrivateRoute allowedRoles={['user']} />}>
              <Route path="/user" element={
                <div style={styles.layout}>
                  <Sidebar role="user" />
                  <div style={styles.content}>
                    <UserDashboard />
                  </div>
                </div>
              } />
              
              <Route path="/user/dashboard" element={
                <div style={styles.layout}>
                  <Sidebar role="user" />
                  <div style={styles.content}>
                    <UserDashboard />
                  </div>
                </div>
              } />
              
              <Route path="/user/my-tasks" element={
                <div style={styles.layout}>
                  <Sidebar role="user" />
                  <div style={styles.content}>
                    <UserMyTasks />
                  </div>
                </div>
              } />
            </Route>
            
            {/* Redirect based on role */}
            <Route path="/dashboard" element={<RoleBasedRedirect />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    background: '#f5f5f5'
  },
  layout: {
    display: 'flex',
    minHeight: 'calc(100vh - 70px)'
  },
  content: {
    flex: 1,
    padding: '20px',
    background: '#f5f5f5',
    overflowX: 'auto'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 70px)',
    fontSize: '18px',
    color: '#666'
  }
};

export default App;