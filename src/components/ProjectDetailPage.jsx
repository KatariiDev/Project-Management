import React, { useState } from 'react';
import { 
  ArrowLeft, GitBranch, Code2, Calendar, DollarSign, Layers, 
  Users, UserPlus, FileText, Activity, Clock, Plus, 
  CheckCircle2, Sparkles, AlertCircle, PlayCircle, PauseCircle, 
  XCircle, Send, MessageSquare, Edit3, ShieldAlert
} from 'lucide-react';

export default function ProjectDetailPage({ 
  project, 
  onBack, 
  onInviteMember, 
  onAddNote, 
  onRequestStatusChange 
}) {
  const [newNote, setNewNote] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('Frontend Engineer');
  const [notesList, setNotesList] = useState(project.notes ? [project.notes] : []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Nghiên cứu':
        return { label: 'Nghiên cứu', color: '#4f46e5', bg: '#eef2ff', icon: <Sparkles size={14} /> };
      case 'Đang phát triển':
        return { label: 'Đang phát triển', color: '#0284c7', bg: '#e0f2fe', icon: <PlayCircle size={14} /> };
      case 'Hoàn thiện':
        return { label: 'Hoàn thiện', color: '#059669', bg: '#ecfdf5', icon: <CheckCircle2 size={14} /> };
      case 'Chờ duyệt đưa ra sử dụng':
        return { label: 'Chờ duyệt đưa ra sử dụng', color: '#d97706', bg: '#fef3c7', icon: <Clock size={14} /> };
      case 'Chờ duyệt hủy':
        return { label: 'Chờ duyệt hủy', color: '#ea580c', bg: '#ffedd5', icon: <AlertCircle size={14} /> };
      case 'Tạm ngưng':
        return { label: 'Tạm ngưng', color: '#7c3aed', bg: '#f5f3ff', icon: <PauseCircle size={14} /> };
      case 'Hủy bỏ':
        return { label: 'Hủy bỏ', color: '#dc2626', bg: '#fef2f2', icon: <XCircle size={14} /> };
      default:
        return { label: status, color: '#64748b', bg: '#f1f5f9', icon: null };
    }
  };

  const badge = getStatusBadge(project.status);

  const handleSendNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotesList([newNote.trim(), ...notesList]);
    if (onAddNote) onAddNote(project.id, newNote.trim());
    setNewNote('');
  };

  const handleConfirmInvite = (e) => {
    e.preventDefault();
    if (!inviteName.trim()) return;
    onInviteMember(project.id, {
      id: `u-${Date.now()}`,
      name: inviteName,
      role: inviteRole,
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 100000)}?w=100&h=100&fit=crop&crop=faces`
    });
    setInviteName('');
    setIsInviteModalOpen(false);
  };

  return (
    <div className="project-detail-layout">
      {/* Top Breadcrumb & Actions */}
      <div className="detail-top-bar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Quay lại danh mục dự án</span>
        </button>

        <div className="detail-top-actions">
          {project.status !== 'Chờ duyệt đưa ra sử dụng' && project.status !== 'Hoàn thiện' && (
            <button 
              className="action-btn-release"
              onClick={() => onRequestStatusChange(project, 'RELEASE_PROJECT')}
            >
              <Send size={15} />
              <span>Gửi duyệt xuất bản</span>
            </button>
          )}

          {project.status !== 'Hủy bỏ' && project.status !== 'Chờ duyệt hủy' && (
            <button 
              className="action-btn-cancel-req"
              onClick={() => onRequestStatusChange(project, 'CANCEL_PROJECT')}
            >
              <ShieldAlert size={15} />
              <span>Đề xuất duyệt hủy dự án</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Detail Header Card */}
      <div className="detail-header-card">
        <div className="header-badge-row">
          <span className="project-id-chip">{project.id}</span>
          <span className="project-category-chip">{project.category}</span>
          <span 
            className="status-badge"
            style={{ color: badge.color, backgroundColor: badge.bg }}
          >
            {badge.icon}
            <span>{badge.label}</span>
          </span>
          <span className="scale-badge-detail">Quy mô: {project.scale}</span>
        </div>

        <h1 className="detail-title">{project.name}</h1>
        <p className="detail-desc">{project.description}</p>

        {/* Thanh Tiến Độ Chuẩn Như Trang Dự Án */}
        <div className="detail-progress-block">
          <div className="progress-labels">
            <span className="progress-title">Tiến độ thực hiện hiện tại</span>
            <span className="progress-percent-large">{project.progress}%</span>
          </div>
          <div className="progress-bar-container-lg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${project.progress}%`,
                backgroundColor: project.progress === 100 ? '#10b981' : project.progress >= 70 ? '#4f46e5' : '#0284c7'
              }}
            ></div>
          </div>
        </div>

        {/* Thông tin Meta: Repo Github, Chi phí, Hạn nộp */}
        <div className="detail-metrics-grid">
          <div className="metric-box">
            <div className="metric-icon-wrap github-wrap">
              <GitBranch size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Kho lưu trữ GitHub Repo</span>
              {project.githubRepo ? (
                <a 
                  href={project.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="github-link-value"
                >
                  <span className="truncate-text">{project.githubRepo.replace('https://github.com/', '')}</span>
                  <GitBranch size={14} />
                </a>
              ) : (
                <span className="text-muted">Chưa cấu hình repo</span>
              )}
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap budget-wrap">
              <DollarSign size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Tổng chi phí / Ngân sách</span>
              <strong className="metric-value">{project.budget}</strong>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap calendar-wrap">
              <Calendar size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Thời hạn hoàn thành (Deadline)</span>
              <strong className="metric-value">{project.deadline}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Columns Body: Cột Trái (Thành viên & Ghi chú), Cột Phải (Logs Cập nhật) */}
      <div className="detail-body-grid">
        {/* CỘT TRÁI */}
        <div className="detail-column-left">
          {/* Section Thành viên tham gia dự án */}
          <div className="detail-card">
            <div className="card-header-flex">
              <div className="card-title-group">
                <Users size={20} className="section-icon" />
                <h3>Thành viên tham gia ({project.members.length})</h3>
              </div>
              
              {/* Nút mời thêm thành viên */}
              <button 
                className="btn-invite-member"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <UserPlus size={16} />
                <span>Mời thêm thành viên</span>
              </button>
            </div>

            <div className="members-detail-list">
              {project.members.map(member => (
                <div key={member.id} className="member-item-row">
                  <img src={member.avatar} alt={member.name} className="member-avatar-lg" />
                  <div className="member-info">
                    <h4 className="member-name">{member.name}</h4>
                    <span className="member-role">{member.role}</span>
                  </div>
                  <span className="member-active-status">Đang hoạt động</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section Ghi chú dự án */}
          <div className="detail-card">
            <div className="card-header-flex">
              <div className="card-title-group">
                <FileText size={20} className="section-icon" />
                <h3>Ghi chú dự án</h3>
              </div>
            </div>

            <form onSubmit={handleSendNote} className="note-input-form">
              <textarea
                className="note-textarea"
                rows="3"
                placeholder="Nhập ghi chú quan trọng, tài liệu kỹ thuật hoặc nhắc việc cho dự án..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></textarea>
              <button type="submit" className="btn-add-note" disabled={!newNote.trim()}>
                <Plus size={16} />
                <span>Lưu ghi chú</span>
              </button>
            </form>

            <div className="notes-display-list">
              {notesList.map((noteText, idx) => (
                <div key={idx} className="note-card-item">
                  <div className="note-pin-dot"></div>
                  <p>{noteText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Logs cập nhật của dự án */}
        <div className="detail-column-right">
          <div className="detail-card full-height">
            <div className="card-header-flex">
              <div className="card-title-group">
                <Activity size={20} className="section-icon text-indigo" />
                <h3>Nhật ký hoạt động & Cập nhật (Logs)</h3>
              </div>
              <span className="logs-count-chip">{project.logs?.length || 0} mục</span>
            </div>

            <div className="timeline-container">
              {project.logs && project.logs.length > 0 ? (
                project.logs.map((log, index) => (
                  <div key={log.id || index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong className="timeline-user">{log.user}</strong>
                        <span className="timeline-time">
                          <Clock size={12} />
                          <span>{log.time}</span>
                        </span>
                      </div>
                      <p className="timeline-action">{log.action}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-logs">Chưa có nhật ký hoạt động nào.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Mời thành viên */}
      {isInviteModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsInviteModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mời thành viên vào dự án</h3>
              <button className="modal-close-btn" onClick={() => setIsInviteModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleConfirmInvite} className="modal-form">
              <div className="form-group">
                <label className="input-label">Họ và tên thành viên</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ví dụ: Lê Tuấn Anh" 
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label">Vai trò trong dự án</label>
                <select 
                  className="form-select"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option value="Product Owner">Product Owner</option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="Frontend Engineer">Frontend Engineer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Fullstack Engineer">Fullstack Engineer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="QA / QC Engineer">QA / QC Engineer</option>
                  <option value="DevOps / SecOps">DevOps / SecOps</option>
                </select>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-modal-cancel" 
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-modal-submit">
                  Gửi lời mời tham gia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
