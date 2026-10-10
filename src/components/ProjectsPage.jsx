import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Calendar, DollarSign, GitBranch, 
  ExternalLink, ChevronRight, Layers, ArrowUpDown, Clock, 
  Sparkles, CheckCircle2, AlertCircle, PlayCircle, PauseCircle, XCircle
} from 'lucide-react';
import { STATUS_LIST, SCALE_LIST } from '../mockData';

export default function ProjectsPage({ 
  projects, 
  onSelectProject, 
  onRequestNewProject,
  searchTerm,
  setSearchTerm
}) {
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [selectedScale, setSelectedScale] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('progress-desc');

  // Lọc hợp nhất: Tìm theo tên dự án, phân loại, tên thành viên đang đảm nhận, hoặc mã dự án
  const filteredProjects = projects.filter(prj => {
    const term = searchTerm.toLowerCase().trim();
    
    const matchUnifiedSearch = !term || (
      prj.name.toLowerCase().includes(term) || 
      prj.category.toLowerCase().includes(term) ||
      prj.id.toLowerCase().includes(term) ||
      prj.members.some(m => 
        m.name.toLowerCase().includes(term) || 
        m.role.toLowerCase().includes(term)
      )
    );

    const matchStatus = selectedStatus === 'Tất cả' || prj.status === selectedStatus;
    const matchScale = selectedScale === 'Tất cả' || prj.scale === selectedScale;

    return matchUnifiedSearch && matchStatus && matchScale;
  }).sort((a, b) => {
    if (sortBy === 'progress-desc') return b.progress - a.progress;
    if (sortBy === 'progress-asc') return a.progress - b.progress;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Helper để lấy màu & style cho từng trạng thái
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Nghiên cứu':
        return { label: 'Nghiên cứu', color: '#4f46e5', bg: '#eef2ff', icon: <Sparkles size={13} /> };
      case 'Đang phát triển':
        return { label: 'Đang phát triển', color: '#0284c7', bg: '#e0f2fe', icon: <PlayCircle size={13} /> };
      case 'Hoàn thiện':
        return { label: 'Hoàn thiện', color: '#059669', bg: '#ecfdf5', icon: <CheckCircle2 size={13} /> };
      case 'Chờ duyệt đưa ra sử dụng':
        return { label: 'Chờ duyệt đưa ra sử dụng', color: '#d97706', bg: '#fef3c7', icon: <Clock size={13} /> };
      case 'Chờ duyệt hủy':
        return { label: 'Chờ duyệt hủy', color: '#ea580c', bg: '#ffedd5', icon: <AlertCircle size={13} /> };
      case 'Tạm ngưng':
        return { label: 'Tạm ngưng', color: '#7c3aed', bg: '#f5f3ff', icon: <PauseCircle size={13} /> };
      case 'Hủy bỏ':
        return { label: 'Hủy bỏ', color: '#dc2626', bg: '#fef2f2', icon: <XCircle size={13} /> };
      default:
        return { label: status, color: '#64748b', bg: '#f1f5f9', icon: null };
    }
  };

  const getScaleBadgeClass = (scale) => {
    switch(scale) {
      case 'Trọng điểm': return 'scale-badge scale-critical';
      case 'Lớn': return 'scale-badge scale-large';
      case 'Vừa': return 'scale-badge scale-medium';
      default: return 'scale-badge scale-small';
    }
  };

  return (
    <div className="projects-layout">
      {/* ASIDE BỘ LỌC BÊN TRÁI */}
      <aside className="filter-aside">
        <div className="filter-aside-header">
          <div className="aside-title-group">
            <Filter size={18} className="aside-icon" />
            <h3>Bộ lọc dự án</h3>
          </div>
          {(selectedStatus !== 'Tất cả' || selectedScale !== 'Tất cả' || searchTerm) && (
            <button 
              className="reset-filter-btn"
              onClick={() => {
                setSelectedStatus('Tất cả');
                setSelectedScale('Tất cả');
                setSearchTerm('');
              }}
            >
              Đặt lại
            </button>
          )}
        </div>

        {/* Trạng thái dự án */}
        <div className="filter-section">
          <h4 className="filter-heading">Trạng thái vòng đời ({STATUS_LIST.length - 1})</h4>
          <div className="filter-options-list">
            {STATUS_LIST.map(st => {
              const count = st.key === 'Tất cả' 
                ? projects.length 
                : projects.filter(p => p.status === st.key).length;
              const isSelected = selectedStatus === st.key;
              return (
                <button
                  key={st.key}
                  className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedStatus(st.key)}
                >
                  <span className="chip-color-dot" style={{ backgroundColor: st.color }}></span>
                  <span className="chip-label">{st.label}</span>
                  <span className="chip-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quy mô dự án */}
        <div className="filter-section">
          <h4 className="filter-heading">Quy mô dự án</h4>
          <div className="scale-pills">
            {SCALE_LIST.map(sc => {
              const isSelected = selectedScale === sc;
              return (
                <button
                  key={sc}
                  className={`scale-pill-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedScale(sc)}
                >
                  {sc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Thống kê nhanh Widget */}
        <div className="aside-summary-widget">
          <div className="widget-title">
            <Layers size={16} />
            <span>Tổng quan danh mục</span>
          </div>
          <div className="widget-row">
            <span>Tổng dự án:</span>
            <strong>{projects.length}</strong>
          </div>
          <div className="widget-row">
            <span>Chờ duyệt:</span>
            <strong className="text-warning">
              {projects.filter(p => p.status.includes('Chờ duyệt')).length}
            </strong>
          </div>
          <div className="widget-row">
            <span>Tỷ lệ hoàn thành TB:</span>
            <strong className="text-success">
              {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / (projects.length || 1))}%
            </strong>
          </div>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH HIỂN THỊ DỰ ÁN */}
      <main className="projects-main">
        {/* Top actions bar */}
        <div className="projects-action-bar">
          <div className="results-info">
            <h2>Danh mục Dự án đang triển khai</h2>
            <p>Hiển thị <strong>{filteredProjects.length}</strong> / {projects.length} dự án</p>
          </div>

          <div className="action-buttons-group">
            <div className="sort-dropdown-wrapper">
              <ArrowUpDown size={15} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="progress-desc">Tiến độ cao nhất</option>
                <option value="progress-asc">Tiến độ thấp nhất</option>
                <option value="name">Tên dự án (A-Z)</option>
              </select>
            </div>

            {/* Nút Yêu cầu thêm dự án */}
            <button 
              className="btn-create-project"
              onClick={onRequestNewProject}
            >
              <Plus size={18} />
              <span>Yêu cầu thêm dự án</span>
            </button>
          </div>
        </div>

        {/* Danh sách thẻ Dự án Grid */}
        {filteredProjects.length === 0 ? (
          <div className="empty-projects-state">
            <div className="empty-icon-wrap">
              <Search size={36} />
            </div>
            <h3>Không tìm thấy dự án phù hợp</h3>
            <p>Thử điều chỉnh lại từ khóa tìm kiếm hoặc bỏ chọn các bộ lọc trạng thái</p>
            <button 
              className="reset-search-btn"
              onClick={() => {
                setSelectedStatus('Tất cả');
                setSelectedScale('Tất cả');
                setSearchTerm('');
              }}
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="projects-cards-grid">
            {filteredProjects.map(project => {
              const badge = getStatusBadge(project.status);
              return (
                <div 
                  key={project.id} 
                  className="project-card"
                  onClick={() => onSelectProject(project)}
                >
                  {/* Card Header: Category & Status */}
                  <div className="card-top">
                    <span className="project-category">{project.category}</span>
                    <span 
                      className="status-badge"
                      style={{ color: badge.color, backgroundColor: badge.bg }}
                    >
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>

                  {/* Meta Tags: Quy mô, Ngân sách, Deadline */}
                  <div className="project-meta-row">
                    <span className={getScaleBadgeClass(project.scale)}>
                      Quy mô: {project.scale}
                    </span>
                    <span className="meta-item">
                      <DollarSign size={14} />
                      <span>{project.budget}</span>
                    </span>
                    <span className="meta-item">
                      <Calendar size={14} />
                      <span>{project.deadline}</span>
                    </span>
                  </div>

                  {/* Thanh Tiến Độ Dự Án */}
                  <div className="progress-section">
                    <div className="progress-labels">
                      <span className="progress-title">Tiến độ hoàn thành</span>
                      <span className="progress-percent font-bold">{project.progress}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: project.progress === 100 
                            ? '#10b981' 
                            : project.progress >= 70 
                              ? '#4f46e5' 
                              : project.progress >= 40 
                                ? '#0284c7' 
                                : '#f59e0b'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Card Footer: Members & View Detail Link */}
                  <div className="card-footer">
                    <div className="member-avatar-stack">
                      {project.members.slice(0, 3).map((member) => (
                        <img 
                          key={member.id} 
                          src={member.avatar} 
                          alt={member.name} 
                          title={`${member.name} (${member.role})`}
                          className="stack-avatar" 
                        />
                      ))}
                      {project.members.length > 3 && (
                        <div className="stack-avatar-extra">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>

                    <button className="view-detail-link">
                      <span>Chi tiết</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
