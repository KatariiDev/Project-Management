import React, { useState } from 'react';
import './App.css';

import LoginPage from './components/LoginPage';
import Header from './components/Header';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AdminPage from './components/AdminPage';
import RequestProjectModal from './components/RequestProjectModal';

import { INITIAL_PROJECTS, INITIAL_APPROVAL_REQUESTS } from './mockData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Trạng thái đăng nhập: Mặc định là null khi truy cập lần đầu
  const [currentUser, setCurrentUser] = useState(null);

  // Điều hướng: Mặc định trang khi truy cập vào đầu tiên là trang đăng nhập ('login')
  const [currentPage, setCurrentPage] = useState('login');
  
  // Dữ liệu dự án & yêu cầu duyệt
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [approvalRequests, setApprovalRequests] = useState(INITIAL_APPROVAL_REQUESTS);
  
  // Dự án đang xem chi tiết
  const [selectedProject, setSelectedProject] = useState(null);

  // Bộ lọc tìm kiếm thống nhất trên Header (tìm theo tên dự án, phân loại, tên thành viên, mã dự án)
  const [searchTerm, setSearchTerm] = useState('');

  // Modal yêu cầu thêm dự án
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Toast thông báo nổi
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // 1. Xử lý Đăng nhập
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentPage(userData.role === 'admin' ? 'admin' : 'projects');
    showToast(`Xin chào mừng ${userData.name} đã đăng nhập thành công!`);
  };

  // 2. Xử lý Đăng xuất
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  // 3. Chọn xem chi tiết dự án
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setCurrentPage('project-detail');
  };

  // 4. Mời thành viên vào dự án
  const handleInviteMember = (projectId, newMember) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        const updatedMembers = [...p.members, newMember];
        const newLog = {
          id: `log-${Date.now()}`,
          time: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          user: currentUser?.name || 'Quản lý',
          action: `Đã mời thành viên mới: ${newMember.name} (${newMember.role}) gia nhập dự án.`
        };
        return {
          ...p,
          members: updatedMembers,
          logs: [newLog, ...(p.logs || [])]
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
      const updated = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updated);
    }
    showToast(`Đã gửi lời mời và thêm thành viên ${newMember.name} vào dự án!`);
  };

  // 5. Thêm ghi chú dự án
  const handleAddNote = (projectId, noteText) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          notes: noteText
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    showToast('Đã lưu ghi chú dự án thành công!');
  };

  // 6. Gửi yêu cầu thay đổi trạng thái (Release hoặc Cancel) từ trang Chi tiết sang Admin
  const handleRequestStatusChange = (project, requestType) => {
    const newReq = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      type: requestType,
      projectId: project.id,
      projectName: project.name,
      scale: project.scale,
      budget: project.budget,
      deadline: project.deadline,
      submittedBy: currentUser?.name || "Trần Minh Đức",
      submittedAt: new Date().toLocaleString('vi-VN'),
      description: requestType === 'RELEASE_PROJECT'
        ? `Đề xuất phê duyệt đưa dự án "${project.name}" ra sử dụng chính thức sau khi nghiệm thu.`
        : `Đề xuất phê duyệt hủy dự án "${project.name}" do điều chỉnh chiến lược nguồn lực.`,
      members: project.members.map(m => m.name).join(', '),
      status: 'PENDING'
    };

    setApprovalRequests([newReq, ...approvalRequests]);
    
    // Cập nhật trạng thái dự án sang "Chờ duyệt..."
    const newStatus = requestType === 'RELEASE_PROJECT' ? 'Chờ duyệt đưa ra sử dụng' : 'Chờ duyệt hủy';
    const updatedProjects = projects.map(p => {
      if (p.id === project.id) {
        const newLog = {
          id: `log-${Date.now()}`,
          time: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          user: currentUser?.name || 'Trần Minh Đức',
          action: `Đã gửi yêu cầu sang Admin: ${requestType === 'RELEASE_PROJECT' ? 'Duyệt đưa ra sử dụng' : 'Duyệt hủy dự án'}.`
        };
        return {
          ...p,
          status: newStatus,
          logs: [newLog, ...(p.logs || [])]
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === project.id) {
      setSelectedProject(updatedProjects.find(p => p.id === project.id));
    }
    showToast(`Đã gửi yêu cầu sang Hộp thư Admin để phê duyệt!`);
  };

  // 7. Gửi yêu cầu THÊM DỰ ÁN MỚI từ Modal sang Admin
  const handleSubmitNewProjectRequest = (newRequest) => {
    setApprovalRequests([newRequest, ...approvalRequests]);
    showToast(`Đã gửi yêu cầu tạo dự án "${newRequest.projectName}" đến Hộp thư Admin!`);
  };

  // 8. Admin Phê duyệt Yêu cầu
  const handleApproveRequest = (request) => {
    // Đánh dấu yêu cầu là APPROVED
    setApprovalRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'APPROVED' } : r));

    if (request.type === 'NEW_PROJECT') {
      // Tạo dự án mới và đưa vào danh sách hiển thị
      const newPrj = {
        id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
        name: request.projectName,
        category: request.category || "Công nghệ thông tin",
        description: request.description,
        scale: request.scale || "Lớn",
        budget: request.budget,
        deadline: request.deadline,
        progress: 10,
        status: "Nghiên cứu", // Trạng thái khởi tạo sau khi duyệt
        githubRepo: request.githubRepo || "",
        members: [
          { id: "u-owner", name: currentUser?.name || "Trần Minh Đức", role: "Project Manager", avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" }
        ],
        notes: "Dự án vừa được Admin phê duyệt khởi tạo chính thức.",
        logs: [
          {
            id: `log-${Date.now()}`,
            time: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            user: "Admin Hệ Thống",
            action: `Phê duyệt yêu cầu ${request.id}: Chính thức khởi tạo dự án.`
          }
        ]
      };
      setProjects([newPrj, ...projects]);
      showToast(`Admin đã phê duyệt: Dự án "${request.projectName}" đã được khởi tạo và hiển thị!`);
    } else if (request.type === 'RELEASE_PROJECT') {
      setProjects(prev => prev.map(p => {
        if (p.id === request.projectId) {
          return {
            ...p,
            status: "Hoàn thiện",
            progress: 100,
            logs: [
              {
                id: `log-${Date.now()}`,
                time: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                user: "Admin Hệ Thống",
                action: "Phê duyệt đưa ra sử dụng (Production Golive)."
              },
              ...(p.logs || [])
            ]
          };
        }
        return p;
      }));
      showToast(`Admin đã phê duyệt đưa dự án "${request.projectName}" ra sử dụng chính thức!`);
    } else if (request.type === 'CANCEL_PROJECT') {
      setProjects(prev => prev.map(p => {
        if (p.id === request.projectId) {
          return {
            ...p,
            status: "Hủy bỏ",
            logs: [
              {
                id: `log-${Date.now()}`,
                time: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                user: "Admin Hệ Thống",
                action: "Phê duyệt đóng và hủy dự án theo đề xuất."
              },
              ...(p.logs || [])
            ]
          };
        }
        return p;
      }));
      showToast(`Admin đã phê duyệt hủy bỏ dự án "${request.projectName}"!`);
    }
  };

  // 9. Admin Từ chối Yêu cầu
  const handleRejectRequest = (requestId) => {
    setApprovalRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'REJECTED' } : r));
    showToast(`Đã từ chối yêu cầu phê duyệt.`);
  };

  // 10. Admin Xóa Dự án
  const handleDeleteProject = (projectId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này khỏi hệ thống không?")) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      showToast("Đã xóa dự án thành công.");
    }
  };

  // Nếu chưa đăng nhập hoặc đang ở trang login
  if (!currentUser || currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  const pendingRequestsCount = approvalRequests.filter(r => r.status === 'PENDING').length;

  return (
    <div className="app-wrapper">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="notification-banner">
          <div className="banner-content">
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
          <button className="banner-close" onClick={() => setToastMessage(null)}>×</button>
        </div>
      )}

      {/* Header Toàn Cục */}
      <Header 
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRequestNewProject={() => setIsRequestModalOpen(true)}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* ROUTING CÁC TRANG */}
      {currentPage === 'projects' && (
        <ProjectsPage 
          projects={projects}
          onSelectProject={handleSelectProject}
          onRequestNewProject={() => setIsRequestModalOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {currentPage === 'project-detail' && selectedProject && (
        <ProjectDetailPage 
          project={selectedProject}
          onBack={() => setCurrentPage('projects')}
          onInviteMember={handleInviteMember}
          onAddNote={handleAddNote}
          onRequestStatusChange={handleRequestStatusChange}
        />
      )}

      {currentPage === 'admin' && (
        <AdminPage 
          projects={projects}
          approvalRequests={approvalRequests}
          onApproveRequest={handleApproveRequest}
          onRejectRequest={handleRejectRequest}
          onDeleteProject={handleDeleteProject}
          onSelectProject={handleSelectProject}
        />
      )}

      {/* Modal Yêu Cầu Thêm Dự Án Mới */}
      <RequestProjectModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmitRequest={handleSubmitNewProjectRequest}
      />
    </div>
  );
}
