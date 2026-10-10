import React, { useState } from 'react';
import { 
  FolderKanban, Inbox, CheckCircle2, XCircle, Clock, 
  AlertCircle, Search, Filter, ShieldCheck, UserCheck, 
  Trash2, ExternalLink, RefreshCw, Send, FileCheck, Layers
} from 'lucide-react';

export default function AdminPage({ 
  projects, 
  approvalRequests, 
  onApproveRequest, 
  onRejectRequest, 
  onDeleteProject,
  onSelectProject
}) {
  const [activeTab, setActiveTab] = useState('requests'); // 'projects' | 'requests'
  const [requestFilter, setRequestFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'
  const [projectSearch, setProjectSearch] = useState('');

  const pendingCount = approvalRequests.filter(r => r.status === 'PENDING').length;

  const filteredRequests = approvalRequests.filter(req => {
    if (requestFilter === 'ALL') return true;
    return req.status === requestFilter;
  });

  const filteredAdminProjects = projects.filter(p => 
    p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(projectSearch.toLowerCase())
  );

  return (
    <div className="admin-layout">
      {/* ASIDE BÊN TRÁI: Quản lý dự án & Hộp thư */}
      <aside className="admin-aside">
        <div className="admin-aside-top">
          <div className="admin-badge-role">
            <ShieldCheck size={18} />
            <span>Khu vực Quản trị Admin</span>
          </div>
          <p className="admin-role-desc">Cổng kiểm soát danh mục & phê duyệt yêu cầu toàn hệ thống</p>
        </div>

        <nav className="admin-nav-menu">
          <button 
            className={`admin-nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <div className="nav-item-content">
              <Inbox size={18} />
              <span>Hộp thư phê duyệt</span>
            </div>
            {pendingCount > 0 && (
              <span className="unread-badge">{pendingCount}</span>
            )}
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <div className="nav-item-content">
              <FolderKanban size={18} />
              <span>Quản lý dự án</span>
            </div>
            <span className="count-pill">{projects.length}</span>
          </button>
        </nav>

        <div className="admin-system-status">
          <div className="system-status-header">
            <span className="pulse-indicator"></span>
            <strong>Hệ thống vận hành ổn định</strong>
          </div>
          <p className="system-status-note">
            Đã đồng bộ hóa 100% dữ liệu sprint & phân bổ nguồn lực.
          </p>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH CỦA TRANG ADMIN */}
      <main className="admin-main">
        {/* TAB 1: HỘP THƯ PHÊ DUYỆT */}
        {activeTab === 'requests' && (
          <div className="admin-content-section">
            <div className="section-head-bar">
              <div>
                <h2>Hộp thư Phê duyệt Yêu cầu</h2>
                <p>Xem xét, phê duyệt hoặc từ chối các đề xuất thêm dự án mới, duyệt xuất bản hoặc hủy dự án.</p>
              </div>

              <div className="filter-tab-pills">
                <button 
                  className={`tab-filter-btn ${requestFilter === 'ALL' ? 'active' : ''}`}
                  onClick={() => setRequestFilter('ALL')}
                >
                  Tất cả ({approvalRequests.length})
                </button>
                <button 
                  className={`tab-filter-btn ${requestFilter === 'PENDING' ? 'active' : ''}`}
                  onClick={() => setRequestFilter('PENDING')}
                >
                  Chờ duyệt ({pendingCount})
                </button>
                <button 
                  className={`tab-filter-btn ${requestFilter === 'APPROVED' ? 'active' : ''}`}
                  onClick={() => setRequestFilter('APPROVED')}
                >
                  Đã duyệt
                </button>
                <button 
                  className={`tab-filter-btn ${requestFilter === 'REJECTED' ? 'active' : ''}`}
                  onClick={() => setRequestFilter('REJECTED')}
                >
                  Từ chối
                </button>
              </div>
            </div>

            {/* Danh sách các yêu cầu gửi duyệt */}
            <div className="requests-cards-stack">
              {filteredRequests.length === 0 ? (
                <div className="empty-requests-box">
                  <Inbox size={42} className="empty-icon text-muted" />
                  <h4>Không có yêu cầu nào trong hộp thư</h4>
                  <p>Tất cả đề xuất đã được xử lý hoặc chưa có thành viên nào gửi yêu cầu mới.</p>
                </div>
              ) : (
                filteredRequests.map(req => {
                  const isPending = req.status === 'PENDING';
                  const isApproved = req.status === 'APPROVED';
                  const isRejected = req.status === 'REJECTED';

                  const getReqTypeLabel = () => {
                    switch(req.type) {
                      case 'NEW_PROJECT':
                        return { label: 'Yêu cầu thêm dự án mới', color: '#4f46e5', bg: '#eef2ff' };
                      case 'RELEASE_PROJECT':
                        return { label: 'Đề xuất Duyệt đưa ra sử dụng (Golive)', color: '#d97706', bg: '#fef3c7' };
                      case 'CANCEL_PROJECT':
                        return { label: 'Đề xuất Phê duyệt Hủy dự án', color: '#ea580c', bg: '#ffedd5' };
                      default:
                        return { label: 'Yêu cầu phê duyệt', color: '#64748b', bg: '#f1f5f9' };
                    }
                  };

                  const typeInfo = getReqTypeLabel();

                  return (
                    <div key={req.id} className={`approval-request-card ${req.status.toLowerCase()}`}>
                      <div className="req-card-top">
                        <div className="req-type-group">
                          <span 
                            className="req-type-badge" 
                            style={{ color: typeInfo.color, backgroundColor: typeInfo.bg }}
                          >
                            {typeInfo.label}
                          </span>
                          <span className="req-id">Mã: {req.id}</span>
                        </div>

                        <div className="req-status-pill">
                          {isPending && <span className="status-tag tag-pending"><Clock size={13} /> Đang chờ Admin duyệt</span>}
                          {isApproved && <span className="status-tag tag-approved"><CheckCircle2 size={13} /> Đã phê duyệt</span>}
                          {isRejected && <span className="status-tag tag-rejected"><XCircle size={13} /> Đã từ chối</span>}
                        </div>
                      </div>

                      <div className="req-body">
                        <h3 className="req-project-name">{req.projectName}</h3>
                        <p className="req-desc">{req.description}</p>

                        <div className="req-meta-grid">
                          <div className="req-meta-item">
                            <span className="meta-label">Người gửi đề xuất:</span>
                            <strong>{req.submittedBy}</strong>
                          </div>
                          <div className="req-meta-item">
                            <span className="meta-label">Thời gian gửi:</span>
                            <span>{req.submittedAt}</span>
                          </div>
                          <div className="req-meta-item">
                            <span className="meta-label">Ngân sách dự kiến:</span>
                            <strong>{req.budget}</strong>
                          </div>
                          <div className="req-meta-item">
                            <span className="meta-label">Thời hạn (Deadline):</span>
                            <span>{req.deadline}</span>
                          </div>
                          <div className="req-meta-item span-2">
                            <span className="meta-label">Thành viên tham gia:</span>
                            <span>{req.members}</span>
                          </div>
                        </div>
                      </div>

                      {/* Nút Phê duyệt / Từ chối cho Admin */}
                      {isPending && (
                        <div className="req-action-footer">
                          <button 
                            className="btn-reject-req"
                            onClick={() => onRejectRequest(req.id)}
                          >
                            <XCircle size={16} />
                            <span>Từ chối yêu cầu</span>
                          </button>
                          <button 
                            className="btn-approve-req"
                            onClick={() => onApproveRequest(req)}
                          >
                            <CheckCircle2 size={16} />
                            <span>Phê duyệt & Áp dụng ngay</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: QUẢN LÝ DỰ ÁN */}
        {activeTab === 'projects' && (
          <div className="admin-content-section">
            <div className="section-head-bar">
              <div>
                <h2>Quản lý Toàn bộ Dự án Hệ thống</h2>
                <p>Theo dõi trạng thái, cấu hình hoặc can thiệp trực tiếp vào từng dự án công nghệ.</p>
              </div>

              <div className="admin-search-wrapper">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  className="admin-search-input"
                  placeholder="Tìm mã hoặc tên dự án..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Mã dự án</th>
                    <th>Tên dự án</th>
                    <th>Quy mô</th>
                    <th>Ngân sách</th>
                    <th>Tiến độ</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdminProjects.map(p => (
                    <tr key={p.id}>
                      <td><span className="table-code-badge">{p.id}</span></td>
                      <td>
                        <strong className="table-project-name">{p.name}</strong>
                        <span className="table-project-cat">{p.category}</span>
                      </td>
                      <td><span className="table-scale-pill">{p.scale}</span></td>
                      <td><span className="table-budget-val">{p.budget}</span></td>
                      <td>
                        <div className="table-progress-cell">
                          <span className="cell-pct">{p.progress}%</span>
                          <div className="cell-bar-wrap">
                            <div className="cell-bar-fill" style={{ width: `${p.progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="table-status-tag">{p.status}</span>
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          <button 
                            className="btn-table-view"
                            onClick={() => onSelectProject(p)}
                            title="Xem chi tiết"
                          >
                            <ExternalLink size={15} />
                            <span>Xem</span>
                          </button>
                          <button 
                            className="btn-table-del"
                            onClick={() => onDeleteProject(p.id)}
                            title="Xóa dự án"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
