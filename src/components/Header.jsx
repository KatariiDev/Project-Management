import React from 'react';
import { 
  Search, User, LogOut, Shield, ShieldCheck, 
  FolderKanban, LayoutDashboard, Bell, Layers, Plus
} from 'lucide-react';

export default function Header({ 
  currentUser, 
  currentPage, 
  onNavigate, 
  onLogout,
  searchTerm,
  setSearchTerm,
  searchMember,
  setSearchMember,
  onRequestNewProject,
  pendingRequestsCount
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* Logo Brand */}
        <div className="header-logo" onClick={() => onNavigate('projects')}>
          <div className="logo-icon-box">
            <Layers size={22} className="logo-svg" />
          </div>
          <div className="logo-text">
            <span className="logo-title">ProFlow</span>
            <span className="logo-sub">PM Suite</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="header-nav-tabs">
          <button 
            className={`nav-tab-btn ${currentPage === 'projects' || currentPage === 'project-detail' ? 'active' : ''}`}
            onClick={() => onNavigate('projects')}
          >
            <FolderKanban size={17} />
            <span>Dự án</span>
          </button>

          <button 
            className={`nav-tab-btn ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => onNavigate('admin')}
          >
            <ShieldCheck size={17} />
            <span>Trang Admin</span>
            {pendingRequestsCount > 0 && (
              <span className="header-notify-bubble">{pendingRequestsCount}</span>
            )}
          </button>
        </nav>
      </div>

      {/* HEADER CENTER: Thanh tìm kiếm hợp nhất theo Tên dự án, Phân loại, Tên thành viên */}
      <div className="header-center">
        {currentPage === 'projects' && (
          <div className="unified-search-bar">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              className="header-search-input"
              placeholder="Tìm theo tên dự án, phân loại, tên thành viên đảm nhận, mã dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchTerm('')}
                title="Xóa tìm kiếm"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {/* HEADER RIGHT: Thông tin User & Nút Đăng xuất */}
      <div className="header-right">
        {currentPage === 'projects' && (
          <button className="btn-header-quick-add" onClick={onRequestNewProject}>
            <Plus size={16} />
            <span>Thêm dự án</span>
          </button>
        )}

        <div className="user-profile-badge">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="user-avatar"
          />
          <div className="user-meta-texts">
            <span className="user-fullname">{currentUser.name}</span>
            <span className="user-role-label">
              {currentUser.role === 'admin' ? 'Quản trị viên (Admin)' : 'Quản lý dự án (PM)'}
            </span>
          </div>
        </div>

        <button 
          className="logout-action-btn"
          onClick={onLogout}
          title="Đăng xuất khỏi hệ thống"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
