import React, { useState } from 'react';
import { 
  Plus, Calendar, DollarSign, Users, Send, X, 
  FileText, ShieldCheck, Sparkles, AlertCircle
} from 'lucide-react';
import { SCALE_LIST } from '../mockData';

export default function RequestProjectModal({ isOpen, onClose, onSubmitRequest }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Công nghệ thông tin');
  const [scale, setScale] = useState('Lớn');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');
  const [githubRepo, setGithubRepo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !budget.trim() || !deadline.trim()) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    const newRequest = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      type: "NEW_PROJECT",
      projectId: null,
      projectName: name.trim(),
      category: category,
      scale: scale,
      budget: budget.includes('VNĐ') ? budget : `${budget} VNĐ`,
      deadline: deadline,
      members: members.trim() || "Chưa gán thành viên",
      description: description.trim() || "Chưa có mô tả chi tiết.",
      githubRepo: githubRepo.trim(),
      submittedBy: "Trần Minh Đức (PM)",
      submittedAt: new Date().toLocaleString('vi-VN'),
      status: "PENDING"
    };

    onSubmitRequest(newRequest);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box modal-box-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <Sparkles size={20} />
            </div>
            <div>
              <h3>Yêu cầu thêm dự án mới</h3>
              <p className="modal-sub">
                Hồ sơ dự án sẽ được chuyển sang trang <strong>Admin</strong> để xem xét và duyệt
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-content">
          <div className="form-info-notice">
            <AlertCircle size={16} />
            <span>
              Sau khi bạn nhấn "Gửi duyệt", yêu cầu sẽ xuất hiện tại mục <strong>Hộp thư phê duyệt của Admin</strong>. Dự án chỉ chính thức hiển thị sau khi Admin chấp thuận.
            </span>
          </div>

          <div className="form-grid-2">
            <div className="form-group span-2">
              <label className="input-label required-label">Tên dự án</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: Nền tảng Giám sát Hệ thống Đám mây AI"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Lĩnh vực / Phân loại</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: Fintech, AI, Mobile App, Cloud..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Quy mô dự án</label>
              <select 
                className="form-select"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
              >
                {SCALE_LIST.filter(s => s !== 'Tất cả').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="input-label required-label">Chi phí / Ngân sách dự kiến</label>
              <div className="input-wrapper">
                <DollarSign className="input-icon" size={16} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ví dụ: 850.000.000 VNĐ"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label required-label">Thời gian Deadline (Dự kiến)</label>
              <div className="input-wrapper">
                <Calendar className="input-icon" size={16} />
                <input
                  type="date"
                  className="form-input"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group span-2">
              <label className="input-label">Thêm thành viên dự kiến (nếu có)</label>
              <div className="input-wrapper">
                <Users className="input-icon" size={16} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tên các thành viên (phân tách bởi dấu phẩy, ví dụ: Minh Đức, Thu Hà, Hải Đăng)"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group span-2">
              <label className="input-label">Liên kết GitHub Repo (nếu đã khởi tạo)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://github.com/organization/project-name"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
              />
            </div>

            <div className="form-group span-2">
              <label className="input-label">Mô tả mục tiêu dự án</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Nêu sơ lược bài toán, phạm vi giải pháp và kỳ vọng kết quả đầu ra..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-submit-request">
              <Send size={16} />
              <span>Gửi duyệt dự án sang Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
