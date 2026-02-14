import '../styles/forms.css';
import React, { useState } from 'react';
import { User, Lock, Mail, LayoutDashboard, LogOut, TrendingUp, Users, FileText } from 'lucide-react';

export default function AuthApp() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: 'Demo User', email: 'demo@example.com' });
    setCurrentView('dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUser({ name: 'New User', email: 'new@example.com' });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (currentView === 'dashboard' && user) {
    return (
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="logo-icon">
                <LayoutDashboard className="icon" />
              </div>
              <h1>Dashboard</h1>
            </div>
            <div className="header-right">
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut className="icon-small" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <TrendingUp className="icon" />
                </div>
                <span className="stat-badge stat-badge-success">+12%</span>
              </div>
              <h3 className="stat-value">2,543</h3>
              <p className="stat-label">Total Revenue</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <Users className="icon" />
                </div>
                <span className="stat-badge stat-badge-success">+8%</span>
              </div>
              <h3 className="stat-value">1,234</h3>
              <p className="stat-label">Active Users</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <FileText className="icon" />
                </div>
                <span className="stat-badge stat-badge-warning">+3%</span>
              </div>
              <h3 className="stat-value">89</h3>
              <p className="stat-label">Projects</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot activity-dot-success"></div>
                <div className="activity-content">
                  <p className="activity-text">New user registered</p>
                  <p className="activity-time">5 minutes ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot activity-dot-info"></div>
                <div className="activity-content">
                  <p className="activity-text">Project "Website Redesign" updated</p>
                  <p className="activity-time">1 hour ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot activity-dot-success"></div>
                <div className="activity-content">
                  <p className="activity-text">Invoice #1234 paid</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item activity-item-last">
                <div className="activity-dot activity-dot-info"></div>
                <div className="activity-content">
                  <p className="activity-text">Team meeting scheduled</p>
                  <p className="activity-time">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card-wrapper">
        {/* Login Form */}
        {currentView === 'login' && (
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                <Lock className="icon" />
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <button onClick={() => setCurrentView('register')} className="toggle-link">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Register Form */}
        {currentView === 'register' && (
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                <User className="icon" />
              </div>
              <h2>Create Account</h2>
              <p>Join us today</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <button onClick={() => setCurrentView('login')} className="toggle-link">
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}