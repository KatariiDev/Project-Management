import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Mail, Lock, Eye, EyeOff, 
  ArrowRight, Sparkles, CheckCircle2, Layers, Cpu, Users
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('manager@proflow.io');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState('user'); // 'user' or 'admin'

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: role === 'admin' ? 'Quản Trị Viên (Admin)' : 'Trần Minh Đức',
      email: email,
      role: role,
      avatar: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
    });
  };

  const handleQuickLogin = (provider) => {
    onLogin({
      name: provider === 'Google' ? 'Trần Minh Đức (Google)' : 'Trần Minh Đức (Zalo)',
      email: provider === 'Google' ? 'duc.tran@gmail.com' : '0912345678@zalo.me',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      provider
    });
  };

  return (
    <div className="login-container">
      {/* Cột Trái: Họa tiết & Đồ họa Quản lý Dự án Hiện đại */}
      <div className="login-visual-panel">
        <div className="visual-overlay"></div>
        <div className="visual-blob blob-1"></div>
        <div className="visual-blob blob-2"></div>
        
        <div className="visual-content">
          <div className="brand-badge">
            <Layers className="brand-badge-icon" size={24} />
            <span className="brand-name">ProFlow Enterprise</span>
          </div>

          <div className="hero-text-block">
            <div className="highlight-tag">
              <Sparkles size={14} />
              <span>Hệ thống Quản lý Dự án Công nghệ Thông tin</span>
            </div>
            <h1 className="hero-title">
              Kiến tạo tiến độ,<br />
              Chuẩn hóa quy trình<br />
              <span className="gradient-text">Từ ý tưởng đến vận hành</span>
            </h1>
            <p className="hero-desc">
              Theo dõi chu kỳ phát triển phần mềm, quản lý ngân sách, kiểm soát tiến độ và phê duyệt dự án thông suốt theo thời gian thực.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon-box">
                <Cpu size={20} />
              </div>
              <div>
                <h4>7 Giai đoạn Vòng đời</h4>
                <p>Nghiên cứu đến Triển khai & Duyệt xuất bản</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <Users size={20} />
              </div>
              <div>
                <h4>Phối hợp Liên chức năng</h4>
                <p>Kết nối PM, Dev, QA, DevOps và Ban Lãnh đạo</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4>Phê duyệt Minh bạch</h4>
                <p>Quy trình kiểm duyệt 2 lớp an toàn & bảo mật</p>
              </div>
            </div>
          </div>

          {/* Mini Interactive Preview Card */}
          <div className="hero-stats-card">
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-num">99.8%</span>
                <span className="stat-label">Đúng hạn Deadline</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">120+</span>
                <span className="stat-label">Dự án Đang chạy</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Giám sát Real-time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="visual-footer">
          <span>© 2026 ProFlow Management Suite. Bảo mật cấp doanh nghiệp.</span>
        </div>
      </div>

      {/* Cột Phải: Form Đăng nhập */}
      <div className="login-form-panel">
        <div className="form-card-wrapper">
          <div className="form-header">
            <h2 className="form-title">Đăng nhập hệ thống</h2>
            <p className="form-subtitle">Truy cập cổng quản lý dự án thông tin nội bộ</p>
          </div>

          {/* Đăng nhập nhanh Google / Zalo */}
          <div className="social-login-section">
            <p className="section-label">Đăng nhập nhanh an toàn bằng SSO</p>
            <div className="social-btn-group">
              <button 
                type="button" 
                className="social-btn google-btn"
                onClick={() => handleQuickLogin('Google')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.9 6.4C.7 8.8 0 10.8 0 12s.7 3.2 1.9 5.6l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.2 7.5 23 12 23z"/>
                </svg>
                <span>Đăng nhập với Google</span>
              </button>

              <button 
                type="button" 
                className="social-btn zalo-btn"
                onClick={() => handleQuickLogin('Zalo')}
              >
                <div className="zalo-badge-icon">Z</div>
                <span>Đăng nhập với Zalo</span>
              </button>
            </div>
          </div>

          <div className="divider-text">
            <span>Hoặc bằng tài khoản nội bộ</span>
          </div>

          {/* Form Email & Password */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="role-selector">
              <label className="input-label">Quyền đăng nhập thử nghiệm:</label>
              <div className="role-tabs">
                <button
                  type="button"
                  className={`role-tab ${role === 'user' ? 'active' : ''}`}
                  onClick={() => setRole('user')}
                >
                  <Users size={16} />
                  <span>Thành viên / Quản lý</span>
                </button>
                <button
                  type="button"
                  className={`role-tab ${role === 'admin' ? 'active' : ''}`}
                  onClick={() => setRole('admin')}
                >
                  <ShieldCheck size={16} />
                  <span>Quản trị viên (Admin)</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="input-label" htmlFor="email-input">Email nội bộ</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  id="email-input"
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label className="input-label" htmlFor="password-input">Mật khẩu</label>
                <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); alert("Liên hệ IT Helpdesk qua hotline 1900-8888 để cấp lại mật khẩu!"); }}>Quên mật khẩu?</a>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ghi nhớ phiên đăng nhập trên thiết bị này</span>
              </label>
            </div>

            <button type="submit" className="submit-login-btn">
              <span>Truy cập không gian làm việc</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="form-footer-tip">
            <CheckCircle2 size={16} className="tip-icon" />
            <span>Được bảo vệ bởi giao thức mã hóa dữ liệu đầu cuối SSL/TLS 256-bit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
