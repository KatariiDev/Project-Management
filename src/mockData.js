// Mock Initial Data for Project Management System
export const INITIAL_PROJECTS = [
  {
    id: "PRJ-001",
    name: "Hệ thống Cổng Dịch vụ công Trực tuyến",
    category: "Chính phủ điện tử",
    description: "Xây dựng cổng tích hợp một cửa giải quyết thủ tục hành chính liên thông cấp tỉnh và liên ngành.",
    scale: "Lớn", // Quy mô: Nhỏ, Vừa, Lớn, Trọng điểm
    budget: "1.200.000.000 VNĐ",
    deadline: "2026-12-30",
    progress: 75,
    status: "Đang phát triển", // Nghiên cứu, Đang phát triển, Hoàn thiện, Chờ duyệt hủy, Chờ duyệt đưa ra sử dụng, Tạm ngưng, Hủy bỏ
    githubRepo: "https://github.com/gov-tech/public-services-portal",
    members: [
      { id: "u1", name: "Trần Minh Đức", role: "Project Manager", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" },
      { id: "u2", name: "Nguyễn Thu Hà", role: "Lead Frontend", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces" },
      { id: "u3", name: "Phạm Hải Đăng", role: "Backend Engineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" },
      { id: "u4", name: "Lê Hoàng Yến", role: "QA Engineer", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces" }
    ],
    notes: "Đang kiểm thử tải đợt 2 với 50.000 yêu cầu đồng thời. Cần chuẩn bị hồ sơ nghiệm thu kỹ thuật.",
    logs: [
      { id: "log-1", time: "10/10/2026 14:30", user: "Nguyễn Thu Hà", action: "Đã hoàn thành module tra cứu hồ sơ định danh điện tử VNeID." },
      { id: "log-2", time: "08/10/2026 09:15", user: "Trần Minh Đức", action: "Họp rà soát tiến độ Sprint 14 cùng đối tác." },
      { id: "log-3", time: "05/10/2026 16:45", user: "Phạm Hải Đăng", action: "Deploy cập nhật API thanh toán qua PayGov v2.1." }
    ]
  },
  {
    id: "PRJ-002",
    name: "Nền tảng Quản trị Kho vận & Chuỗi cung ứng AI",
    category: "Logistics & AI",
    description: "Dự đoán lưu lượng hàng tồn kho tự động dựa trên thuật toán học máy và tích hợp RFID.",
    scale: "Trọng điểm",
    budget: "2.850.000.000 VNĐ",
    deadline: "2026-11-15",
    progress: 95,
    status: "Chờ duyệt đưa ra sử dụng",
    githubRepo: "https://github.com/supplychain-ai/logistics-core",
    members: [
      { id: "u5", name: "Vũ Đình Nam", role: "Tech Lead", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" },
      { id: "u6", name: "Đỗ Bảo Trâm", role: "AI Researcher", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces" },
      { id: "u1", name: "Trần Minh Đức", role: "Product Owner", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" }
    ],
    notes: "Đã vượt qua bài kiểm tra an toàn thông tin ISO 27001, sẵn sàng đưa vào vận hành thực tế.",
    logs: [
      { id: "log-4", time: "09/10/2026 11:20", user: "Vũ Đình Nam", action: "Gửi hồ sơ nghiệm thu và yêu cầu phê duyệt triển khai sản xuất (Production)." },
      { id: "log-5", time: "04/10/2026 15:00", user: "Đỗ Bảo Trâm", action: "Tối ưu hóa mô hình suy luận AI xuống dưới 120ms." }
    ]
  },
  {
    id: "PRJ-003",
    name: "Ứng dụng Di động Chăm sóc Khách hàng Tích hợp Chatbot",
    category: "Mobile App",
    description: "App iOS và Android cung cấp dịch vụ tiện ích, đặt lịch, phản hồi tức thì bằng GenAI.",
    scale: "Vừa",
    budget: "650.000.000 VNĐ",
    deadline: "2027-02-28",
    progress: 30,
    status: "Nghiên cứu",
    githubRepo: "https://github.com/corporation/mobile-cx-app",
    members: [
      { id: "u2", name: "Nguyễn Thu Hà", role: "Mobile Lead", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces" },
      { id: "u7", name: "Hoàng Gia Huy", role: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" }
    ],
    notes: "Đang trong giai đoạn khảo sát người dùng thực tế và hoàn thiện Wireframe & Prototype trên Figma.",
    logs: [
      { id: "log-6", time: "07/10/2026 10:10", user: "Hoàng Gia Huy", action: "Hoàn tất Design System phiên bản Mobile v1.0." }
    ]
  },
  {
    id: "PRJ-004",
    name: "Hệ thống Báo cáo Tài chính Phân tích Real-time",
    category: "Fintech",
    description: "Dashboard phân tích dòng tiền, chi phí theo từng phòng ban và tự động hóa kết xuất báo cáo thuế.",
    scale: "Nhỏ",
    budget: "350.000.000 VNĐ",
    deadline: "2026-10-25",
    progress: 100,
    status: "Hoàn thiện",
    githubRepo: "https://github.com/fintech-team/bi-financial-report",
    members: [
      { id: "u3", name: "Phạm Hải Đăng", role: "Fullstack Dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" },
      { id: "u8", name: "Võ Mai Phương", role: "Data Analyst", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces" }
    ],
    notes: "Đã bàn giao cho phòng Tài chính Kế toán sử dụng chính thức.",
    logs: [
      { id: "log-7", time: "01/10/2026 17:00", user: "Phạm Hải Đăng", action: "Hoàn tất đào tạo người dùng cuối và chuyển giao mã nguồn." }
    ]
  },
  {
    id: "PRJ-005",
    name: "Hạ tầng Microservices chuyển đổi Legacy v1",
    category: "Infrastructure",
    description: "Nâng cấp kiến trúc Monolithic cũ sang container hóa Kubernetes và Event-Driven.",
    scale: "Lớn",
    budget: "980.000.000 VNĐ",
    deadline: "2026-09-30",
    progress: 60,
    status: "Chờ duyệt hủy",
    githubRepo: "https://github.com/internal-infra/legacy-migration",
    members: [
      { id: "u5", name: "Vũ Đình Nam", role: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" }
    ],
    notes: "Hệ thống hạ tầng đám mây mới thay đổi chiến lược sang Serverless, đề xuất dừng dự án để tránh lãng phí chi phí thuê server.",
    logs: [
      { id: "log-8", time: "06/10/2026 14:00", user: "Vũ Đình Nam", action: "Đệ trình đơn đề nghị hủy dự án lên Ban Quản Trị." }
    ]
  },
  {
    id: "PRJ-006",
    name: "Cổng thanh toán Nội bộ bằng QR Động",
    category: "Fintech",
    description: "Giải pháp quét mã thanh toán tự động định danh cho hệ thống căn tin và dịch vụ tòa nhà.",
    scale: "Nhỏ",
    budget: "180.000.000 VNĐ",
    deadline: "2026-08-20",
    progress: 45,
    status: "Tạm ngưng",
    githubRepo: "https://github.com/corp/smart-canteen-qr",
    members: [
      { id: "u3", name: "Phạm Hải Đăng", role: "Developer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" }
    ],
    notes: "Tạm dừng đợi đối tác ngân hàng nâng cấp cổng API Open Banking sang chuẩn mới.",
    logs: [
      { id: "log-9", time: "25/08/2026 11:00", user: "Phạm Hải Đăng", action: "Chuyển trạng thái dự án sang Tạm ngưng do bên thứ ba chậm trễ cung cấp sandbox." }
    ]
  }
];

export const INITIAL_APPROVAL_REQUESTS = [
  {
    id: "REQ-101",
    type: "NEW_PROJECT", // NEW_PROJECT, CANCEL_PROJECT, RELEASE_PROJECT
    projectId: null,
    projectName: "Hệ sinh thái Quản lý Tài sản Kỹ thuật số (Digital Asset Hub)",
    scale: "Lớn",
    budget: "1.500.000.000 VNĐ",
    deadline: "2027-06-30",
    submittedBy: "Trần Minh Đức (PM)",
    submittedAt: "10/10/2026 10:15",
    description: "Xây dựng hệ thống quản lý và chia sẻ bản quyền tài nguyên số, video, thiết kế trong toàn tập đoàn.",
    members: "Trần Minh Đức, Nguyễn Thu Hà, Phạm Hải Đăng",
    status: "PENDING" // PENDING, APPROVED, REJECTED
  },
  {
    id: "REQ-102",
    type: "RELEASE_PROJECT",
    projectId: "PRJ-002",
    projectName: "Nền tảng Quản trị Kho vận & Chuỗi cung ứng AI",
    scale: "Trọng điểm",
    budget: "2.850.000.000 VNĐ",
    deadline: "2026-11-15",
    submittedBy: "Vũ Đình Nam (Tech Lead)",
    submittedAt: "09/10/2026 11:20",
    description: "Đã hoàn thành UAT và kiểm định an toàn dữ liệu, đề xuất phê duyệt golive chính thức vào tháng 11.",
    members: "Vũ Đình Nam, Đỗ Bảo Trâm, Trần Minh Đức",
    status: "PENDING"
  },
  {
    id: "REQ-103",
    type: "CANCEL_PROJECT",
    projectId: "PRJ-005",
    projectName: "Hạ tầng Microservices chuyển đổi Legacy v1",
    scale: "Lớn",
    budget: "980.000.000 VNĐ",
    deadline: "2026-09-30",
    submittedBy: "Vũ Đình Nam (DevOps)",
    submittedAt: "06/10/2026 14:00",
    description: "Đổi kiến trúc sang Managed Serverless, xin phê duyệt hủy bỏ dự án cũ để chuyển giao tài nguyên.",
    members: "Vũ Đình Nam",
    status: "PENDING"
  }
];

export const STATUS_LIST = [
  { key: "Tất cả", label: "Tất cả trạng thái", color: "#64748b", bg: "#f1f5f9" },
  { key: "Nghiên cứu", label: "Nghiên cứu", color: "#6366f1", bg: "#e0e7ff" },
  { key: "Đang phát triển", label: "Đang phát triển", color: "#0284c7", bg: "#e0f2fe" },
  { key: "Hoàn thiện", label: "Hoàn thiện", color: "#10b981", bg: "#d1fae5" },
  { key: "Chờ duyệt đưa ra sử dụng", label: "Chờ duyệt đưa ra sử dụng", color: "#d97706", bg: "#fef3c7" },
  { key: "Chờ duyệt hủy", label: "Chờ duyệt hủy", color: "#ea580c", bg: "#ffedd5" },
  { key: "Tạm ngưng", label: "Tạm ngưng", color: "#8b5cf6", bg: "#ede9fe" },
  { key: "Hủy bỏ", label: "Hủy bỏ", color: "#ef4444", bg: "#fee2e2" }
];

export const SCALE_LIST = ["Tất cả", "Nhỏ", "Vừa", "Lớn", "Trọng điểm"];
