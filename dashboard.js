// Navigation between sections
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.querySelector('.page-title');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));

        // Add active class to clicked item
        item.classList.add('active');

        // Hide all content sections
        contentSections.forEach(section => section.classList.remove('active'));

        // Show selected section
        const sectionId = item.getAttribute('data-section') + '-section';
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update page title
        const sectionTitle = item.querySelector('span').textContent;
        pageTitle.textContent = sectionTitle;

        // Close mobile sidebar
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Filter buttons functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Here you would filter the data based on the selected filter
        console.log('Filter:', btn.textContent);
    });
});

// Notification button
const notificationBtn = document.querySelector('.notification-btn');

notificationBtn.addEventListener('click', () => {
    showNotification('لديك 5 إشعارات جديدة', 'info');
});

// Add project button
const btnAddProject = document.querySelector('#projects-section .btn-add');

if (btnAddProject) {
    btnAddProject.addEventListener('click', () => {
        showNotification('سيتم فتح نموذج إضافة مشروع جديد', 'success');
    });
}

// Add service button
const btnAddService = document.querySelector('#services-section .btn-add');

if (btnAddService) {
    btnAddService.addEventListener('click', () => {
        showNotification('سيتم فتح نموذج إضافة خدمة جديدة', 'success');
    });
}

// Save stats button
const btnSaveStats = document.querySelector('#stats-section .btn-add');

if (btnSaveStats) {
    btnSaveStats.addEventListener('click', () => {
        showNotification('تم حفظ التغييرات بنجاح!', 'success');
    });
}

// Save settings button
const btnSaveSettings = document.querySelector('#settings-section .btn-add');

if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
        showNotification('تم حفظ الإعدادات بنجاح!', 'success');
    });
}

// Send newsletter button
const btnSendNewsletter = document.querySelector('#newsletter-section .btn-add');

if (btnSendNewsletter) {
    btnSendNewsletter.addEventListener('click', () => {
        showNotification('سيتم فتح نموذج إرسال النشرة البريدية', 'info');
    });
}

// Edit buttons - will be handled by attachProjectEventListeners and attachServiceEventListeners

// View buttons
document.querySelectorAll('.btn-action.view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('سيتم عرض التفاصيل', 'info');
    });
});

// Delete buttons
document.querySelectorAll('.btn-action.delete, .btn-delete, .btn-delete-msg').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('هل أنت متأكد من الحذف؟')) {
            showNotification('تم الحذف بنجاح', 'success');
        }
    });
});

// Reply buttons
document.querySelectorAll('.btn-reply').forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('سيتم فتح نموذج الرد', 'info');
    });
});

// Archive buttons
document.querySelectorAll('.btn-archive').forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('تم نقل الرسالة إلى الأرشيف', 'success');
    });
});

// Send email buttons
document.querySelectorAll('.btn-action.send').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('سيتم إرسال البريد الإلكتروني', 'info');
    });
});

// Filter and Export buttons
const btnFilter = document.querySelector('.btn-filter');
const btnExport = document.querySelector('.btn-export');

if (btnFilter) {
    btnFilter.addEventListener('click', () => {
        showNotification('سيتم فتح خيارات التصفية', 'info');
    });
}

if (btnExport) {
    btnExport.addEventListener('click', () => {
        showNotification('جاري تصدير البيانات...', 'success');
    });
}

// Logout button
const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        showNotification('جاري تسجيل الخروج...', 'info');
        setTimeout(() => {
            // Redirect to login page or main site
            window.location.href = 'index.html';
        }, 1500);
    }
});

// Search functionality
const searchInputs = document.querySelectorAll('input[type="text"]');

searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('بحث عن:', searchTerm);
        // Here you would implement the search logic
    });
});

// Checkboxes - Select all functionality
const selectAllCheckboxes = document.querySelectorAll('thead input[type="checkbox"]');

selectAllCheckboxes.forEach(selectAll => {
    selectAll.addEventListener('change', (e) => {
        const table = e.target.closest('table');
        const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });
});

// Notification function
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let bgColor;
    let icon;

    switch(type) {
        case 'success':
            bgColor = '#10b981';
            icon = 'fa-check-circle';
            break;
        case 'error':
            bgColor = '#ef4444';
            icon = 'fa-times-circle';
            break;
        case 'warning':
            bgColor = '#f59e0b';
            icon = 'fa-exclamation-triangle';
            break;
        case 'info':
            bgColor = '#3b82f6';
            icon = 'fa-info-circle';
            break;
        default:
            bgColor = '#10b981';
            icon = 'fa-check-circle';
    }

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 30px;
        background: ${bgColor};
        color: white;
        padding: 18px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInLeft 0.4s ease;
        font-family: 'Tajawal', sans-serif;
        font-size: 15px;
        font-weight: 600;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                transform: translateX(-400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutLeft {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-400px);
                opacity: 0;
            }
        }
    `;

    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutLeft 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Animate stats on page load
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-info h3');

    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/,/g, ''));

        if (!isNaN(number)) {
            stat.textContent = '0';
            animateCounter(stat, number);
        }
    });
});

// Chart placeholder (you can replace this with a real chart library like Chart.js)
const chartCanvas = document.getElementById('projectsChart');

if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');

    // Simple placeholder chart
    chartCanvas.width = chartCanvas.parentElement.clientWidth;
    chartCanvas.height = 280;

    ctx.fillStyle = '#667eea';
    ctx.fillRect(50, 180, 80, 100);

    ctx.fillStyle = '#764ba2';
    ctx.fillRect(150, 120, 80, 160);

    ctx.fillStyle = '#f093fb';
    ctx.fillRect(250, 80, 80, 200);

    ctx.fillStyle = '#43e97b';
    ctx.fillRect(350, 140, 80, 140);

    ctx.fillStyle = '#4facfe';
    ctx.fillRect(450, 100, 80, 180);

    // Add text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Tajawal';
    ctx.textAlign = 'center';

    ctx.fillText('يناير', 90, 300);
    ctx.fillText('فبراير', 190, 300);
    ctx.fillText('مارس', 290, 300);
    ctx.fillText('أبريل', 390, 300);
    ctx.fillText('مايو', 490, 300);
}

// Real-time clock
function updateClock() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const dateString = now.toLocaleDateString('ar-SA', options);

    // You can add this to a clock element if you create one
    console.log('الوقت الحالي:', dateString);
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock();

// Smooth scrolling for sidebar on small screens
if (window.innerWidth <= 992) {
    sidebar.style.transition = 'transform 0.3s ease';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        sidebar.classList.remove('active');
    }
});

// Progress bar animation
const progressBars = document.querySelectorAll('.progress-fill');

const animateProgress = () => {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Animate progress bars when projects section is active
const projectsNavItem = document.querySelector('[data-section="projects"]');

if (projectsNavItem) {
    projectsNavItem.addEventListener('click', () => {
        setTimeout(animateProgress, 300);
    });
}

// ==================== API Configuration ====================
const API_BASE_URL = 'http://localhost:8000/api';

// ==================== API Functions ====================

// Dashboard Stats
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        const data = await response.json();
        
        // Update stats cards
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4 && data.stats) {
            const stats = data.stats;
            statCards[0].querySelector('.stat-info h3').textContent = stats.completed_projects || 15;
            statCards[1].querySelector('.stat-info h3').textContent = (stats.residential_units || 2000).toLocaleString();
            statCards[2].querySelector('.stat-info h3').textContent = `${stats.completion_rate || 23}%`;
            statCards[3].querySelector('.stat-info h3').textContent = stats.ongoing_projects || 8;
        }
        
        // Update notification badge
        if (data.unread_messages > 0) {
            const badge = document.querySelector('.notification-badge');
            if (badge) badge.textContent = data.unread_messages;
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Projects
async function loadProjects(status = null) {
    try {
        const url = status ? `${API_BASE_URL}/projects?status=${status}` : `${API_BASE_URL}/projects`;
        const response = await fetch(url);
        const projects = await response.json();
        
        // Update recent projects in dashboard
        const recentProjectsContainer = document.querySelector('.recent-projects .card-content');
        if (recentProjectsContainer && projects.length > 0) {
            recentProjectsContainer.innerHTML = projects.slice(0, 3).map(project => {
                const imageUrl = project.image_url ? 
                    (project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`) : 
                    'https://via.placeholder.com/60';
                return `
                    <div class="project-item">
                        <img src="${imageUrl}" alt="مشروع">
                        <div class="project-info">
                            <h4>${project.name}</h4>
                            <p>${project.location}</p>
                        </div>
                        <span class="status-badge ${getStatusClass(project.status)}">${project.status}</span>
                    </div>
                `;
            }).join('');
        }
        
        // Update projects table
        const projectsTableBody = document.querySelector('#projects-section tbody');
        if (projectsTableBody) {
            projectsTableBody.innerHTML = projects.map(project => `
                <tr>
                    <td><input type="checkbox"></td>
                                <td>
                                    <div class="table-project">
                                        <img src="${project.image_url ? (project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`) : 'https://via.placeholder.com/40'}" alt="مشروع">
                                        <span>${project.name}</span>
                                    </div>
                                </td>
                    <td>${project.location}</td>
                    <td><span class="category-badge ${getCategoryClass(project.category)}">${project.category}</span></td>
                    <td><span class="status-badge ${getStatusClass(project.status)}">${project.status}</span></td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${project.progress}%"></div>
                            <span>${project.progress}%</span>
                        </div>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action edit" data-id="${project.id}"><i class="fas fa-edit"></i></button>
                            <button class="btn-action view" data-id="${project.id}"><i class="fas fa-eye"></i></button>
                            <button class="btn-action delete" data-id="${project.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            // Re-attach event listeners
            attachProjectEventListeners();
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        showNotification('حدث خطأ في تحميل المشاريع', 'error');
    }
}

async function getProject(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error getting project:', error);
        return null;
    }
}

async function editProject(id) {
    const project = await getProject(id);
    if (!project) {
        showNotification('حدث خطأ في تحميل بيانات المشروع', 'error');
        return;
    }
    
    showEditProjectModal(project);
}

function viewProject(id) {
    getProject(id).then(project => {
        if (project) {
            showViewProjectModal(project);
        }
    });
}

async function deleteProject(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            showNotification('تم حذف المشروع بنجاح', 'success');
            loadProjects();
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        showNotification('حدث خطأ في حذف المشروع', 'error');
    }
}

// Services
async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services`);
        const services = await response.json();
        
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            servicesGrid.innerHTML = services.map(service => `
                <div class="service-card-dash">
                    <div class="service-icon-dash">
                        <i class="fas ${service.icon || 'fa-briefcase'}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description || ''}</p>
                    <div class="card-actions">
                        <button class="btn-edit" data-id="${service.id}"><i class="fas fa-edit"></i> تعديل</button>
                        <button class="btn-delete" data-id="${service.id}"><i class="fas fa-trash"></i> حذف</button>
                    </div>
                </div>
            `).join('');
            
            // Re-attach event listeners
            attachServiceEventListeners();
        }
    } catch (error) {
        console.error('Error loading services:', error);
        showNotification('حدث خطأ في تحميل الخدمات', 'error');
    }
}

async function getService(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/services/${id}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error getting service:', error);
        return null;
    }
}

async function editService(id) {
    const service = await getService(id);
    if (!service) {
        showNotification('حدث خطأ في تحميل بيانات الخدمة', 'error');
        return;
    }
    
    showEditServiceModal(service);
}

async function deleteService(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            showNotification('تم حذف الخدمة بنجاح', 'success');
            loadServices();
        }
    } catch (error) {
        console.error('Error deleting service:', error);
        showNotification('حدث خطأ في حذف الخدمة', 'error');
    }
}

// Messages
async function loadMessages() {
    try {
        const response = await fetch(`${API_BASE_URL}/messages`);
        const messages = await response.json();
        
        // Update recent messages in dashboard
        const recentMessagesContainer = document.querySelector('.recent-messages .card-content');
        if (recentMessagesContainer && messages.length > 0) {
            recentMessagesContainer.innerHTML = messages.slice(0, 3).map(message => `
                <div class="message-item ${message.is_read ? '' : 'unread'}">
                    <div class="message-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="message-content">
                        <h4>${message.name}</h4>
                        <p>${message.subject || message.message.substring(0, 50)}</p>
                        <span class="message-time">${formatTimeAgo(message.created_at)}</span>
                    </div>
                </div>
            `).join('');
        }
        
        // Update messages section
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
            messagesContainer.innerHTML = messages.map(message => `
                <div class="message-card ${message.is_read ? 'read' : ''}">
                    <div class="message-header">
                        <div class="sender-info">
                            <div class="sender-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <h4>${message.name}</h4>
                                <span class="message-date"><i class="fas fa-clock"></i> ${formatTimeAgo(message.created_at)}</span>
                            </div>
                        </div>
                        <span class="message-status ${message.is_read ? 'read' : 'unread'}">${message.is_read ? 'مقروء' : 'جديد'}</span>
                    </div>
                    <div class="message-body">
                        <p><strong>البريد الإلكتروني:</strong> ${message.email}</p>
                        ${message.phone ? `<p><strong>الهاتف:</strong> ${message.phone}</p>` : ''}
                        ${message.subject ? `<p><strong>الموضوع:</strong> ${message.subject}</p>` : ''}
                        <p><strong>الرسالة:</strong> ${message.message}</p>
                    </div>
                    <div class="message-actions">
                        <button class="btn-reply" data-id="${message.id}"><i class="fas fa-reply"></i> رد</button>
                        <button class="btn-archive" data-id="${message.id}"><i class="fas fa-archive"></i> أرشفة</button>
                        <button class="btn-delete-msg" data-id="${message.id}"><i class="fas fa-trash"></i> حذف</button>
                    </div>
                </div>
            `).join('');
            
            // Re-attach event listeners
            attachMessageEventListeners();
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        showNotification('حدث خطأ في تحميل الرسائل', 'error');
    }
}

async function markMessageAsRead(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
            method: 'PUT'
        });
        if (response.ok) {
            loadMessages();
        }
    } catch (error) {
        console.error('Error marking message as read:', error);
    }
}

async function deleteMessage(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            showNotification('تم حذف الرسالة بنجاح', 'success');
            loadMessages();
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        showNotification('حدث خطأ في حذف الرسالة', 'error');
    }
}

// Newsletter
async function loadNewsletter() {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter`);
        const subscribers = await response.json();
        
        // Update stats
        const subscriberStats = document.querySelectorAll('.subscriber-stat');
        if (subscriberStats.length >= 3) {
            subscriberStats[0].querySelector('h3').textContent = subscribers.length.toLocaleString();
        }
        
        // Update table
        const newsletterTableBody = document.querySelector('#newsletter-section tbody');
        if (newsletterTableBody) {
            newsletterTableBody.innerHTML = subscribers.map(subscriber => `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${subscriber.email}</td>
                    <td>${formatDate(subscriber.created_at)}</td>
                    <td><span class="status-badge active">نشط</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action send" data-id="${subscriber.id}"><i class="fas fa-paper-plane"></i></button>
                            <button class="btn-action delete" data-id="${subscriber.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            // Re-attach event listeners
            attachNewsletterEventListeners();
        }
    } catch (error) {
        console.error('Error loading newsletter:', error);
        showNotification('حدث خطأ في تحميل المشتركين', 'error');
    }
}

async function deleteSubscriber(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            showNotification('تم حذف المشترك بنجاح', 'success');
            loadNewsletter();
        }
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        showNotification('حدث خطأ في حذف المشترك', 'error');
    }
}

// Stats
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        const stats = await response.json();
        
        const statInputs = document.querySelectorAll('.stat-input');
        if (statInputs.length >= 4) {
            statInputs[0].value = stats.completed_projects || 15;
            statInputs[1].value = stats.residential_units || 2000;
            statInputs[2].value = stats.completion_rate || 23;
            statInputs[3].value = stats.ongoing_projects || 8;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function saveStats() {
    try {
        const statInputs = document.querySelectorAll('.stat-input');
        const stats = {
            completed_projects: parseInt(statInputs[0].value) || 0,
            residential_units: parseInt(statInputs[1].value) || 0,
            completion_rate: parseInt(statInputs[2].value) || 0,
            ongoing_projects: parseInt(statInputs[3].value) || 0
        };
        
        const response = await fetch(`${API_BASE_URL}/stats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stats)
        });
        
        if (response.ok) {
            showNotification('تم حفظ التغييرات بنجاح!', 'success');
            loadDashboardStats();
        }
    } catch (error) {
        console.error('Error saving stats:', error);
        showNotification('حدث خطأ في حفظ الإحصائيات', 'error');
    }
}

// Settings
async function loadSettings() {
    try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        const settings = await response.json();
        
        // Update form inputs
        const formInputs = document.querySelectorAll('#settings-section .form-input');
        if (formInputs.length > 0) {
            // Site settings
            const siteNameInput = document.querySelector('#settings-section input[type="text"]');
            if (siteNameInput) siteNameInput.value = settings.site_name || '';
            
            const siteDescTextarea = document.querySelector('#settings-section .form-textarea');
            if (siteDescTextarea) siteDescTextarea.value = settings.site_description || '';
            
            // Find email and phone inputs
            const emailInput = Array.from(formInputs).find(input => input.type === 'email');
            if (emailInput) emailInput.value = settings.email || '';
            
            const phoneInput = Array.from(formInputs).find(input => input.type === 'tel');
            if (phoneInput) phoneInput.value = settings.phone || '';
        }
        
        // Update address and location
        const addressInput = document.getElementById('settingAddress');
        if (addressInput) addressInput.value = settings.address || '';
        
        const latitudeInput = document.getElementById('settingLatitude');
        if (latitudeInput) latitudeInput.value = settings.latitude || 24.7136;
        
        const longitudeInput = document.getElementById('settingLongitude');
        if (longitudeInput) longitudeInput.value = settings.longitude || 46.6753;
        
        const mapUrlInput = document.getElementById('settingMapUrl');
        if (mapUrlInput) mapUrlInput.value = settings.map_url || '';
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

async function saveSettings() {
    try {
        const formInputs = document.querySelectorAll('#settings-section .form-input');
        const settings = {
            site_name: formInputs[0]?.value || '',
            site_description: document.querySelector('#settings-section .form-textarea')?.value || '',
            email: Array.from(formInputs).find(input => input.type === 'email')?.value || '',
            phone: Array.from(formInputs).find(input => input.type === 'tel')?.value || '',
            address: document.getElementById('settingAddress')?.value || '',
            latitude: parseFloat(document.getElementById('settingLatitude')?.value) || 24.7136,
            longitude: parseFloat(document.getElementById('settingLongitude')?.value) || 46.6753,
            map_url: document.getElementById('settingMapUrl')?.value || ''
        };
        
        const response = await fetch(`${API_BASE_URL}/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        if (response.ok) {
            showNotification('تم حفظ الإعدادات بنجاح!', 'success');
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('حدث خطأ في حفظ الإعدادات', 'error');
    }
}

function getCurrentLocation() {
    const btn = document.getElementById('btnGetCurrentLocation');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showNotification('المتصفح لا يدعم تحديد الموقع', 'error');
            return;
        }
        
        showNotification('جاري الحصول على موقعك...', 'info');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                const latitudeInput = document.getElementById('settingLatitude');
                const longitudeInput = document.getElementById('settingLongitude');
                
                if (latitudeInput) latitudeInput.value = lat.toFixed(6);
                if (longitudeInput) longitudeInput.value = lng.toFixed(6);
                
                showNotification('تم الحصول على موقعك بنجاح!', 'success');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-crosshairs"></i> الحصول على موقعي الحالي';
            },
            (error) => {
                showNotification('فشل الحصول على الموقع. تأكد من السماح بالوصول للموقع', 'error');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-crosshairs"></i> الحصول على موقعي الحالي';
            }
        );
    });
}

// Branches (فروع الشركة)
async function loadBranches() {
    try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        const branches = await response.json();
        
        const tbody = document.getElementById('branchesTableBody');
        if (!tbody) return;
        
        if (branches.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">لا توجد فروع. أضف فرعاً جديداً.</td></tr>';
            return;
        }
        
        tbody.innerHTML = branches.map((b, i) => `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${b.name}</strong></td>
                <td>${b.address}</td>
                <td><small>${b.latitude.toFixed(5)}, ${b.longitude.toFixed(5)}</small></td>
                <td>${b.phone || '—'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action edit branch-edit" data-id="${b.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn-action delete branch-delete" data-id="${b.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        attachBranchEventListeners();
    } catch (error) {
        console.error('Error loading branches:', error);
        const tbody = document.getElementById('branchesTableBody');
        if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--danger);">حدث خطأ في تحميل الفروع.</td></tr>';
    }
}

function showAddBranchModal() {
    showBranchModal(null);
}

function showEditBranchModal(branch) {
    showBranchModal(branch);
}

function showBranchModal(branch) {
    const isEdit = !!branch;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 30px; border-radius: 16px; max-width: 500px; width: 90%;">
            <h2 style="margin-bottom: 20px;">${isEdit ? 'تعديل الفرع' : 'إضافة فرع جديد'}</h2>
            <form id="branchForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">اسم الفرع</label>
                    <input type="text" name="name" value="${branch ? branch.name : ''}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">العنوان</label>
                    <input type="text" name="address" value="${branch ? branch.address : ''}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px;">خط العرض</label>
                        <input type="number" name="latitude" step="0.000001" value="${branch ? branch.latitude : 24.7136}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px;">خط الطول</label>
                        <input type="number" name="longitude" step="0.000001" value="${branch ? branch.longitude : 46.6753}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الهاتف (اختياري)</label>
                    <input type="tel" name="phone" value="${branch ? (branch.phone || '') : ''}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">ترتيب العرض</label>
                    <input type="number" name="display_order" value="${branch ? branch.display_order : 0}" min="0" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                    <button type="button" class="branch-modal-cancel" style="padding: 10px 20px; background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">إلغاء</button>
                    <button type="submit" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">${isEdit ? 'حفظ' : 'إضافة'}</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.branch-modal-cancel').addEventListener('click', () => modal.remove());
    modal.querySelector('#branchForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            name: form.name.value.trim(),
            address: form.address.value.trim(),
            latitude: parseFloat(form.latitude.value) || 24.7136,
            longitude: parseFloat(form.longitude.value) || 46.6753,
            phone: form.phone.value.trim() || null,
            display_order: parseInt(form.display_order.value, 10) || 0
        };
        try {
            const url = isEdit ? `${API_BASE_URL}/branches/${branch.id}` : `${API_BASE_URL}/branches`;
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            if (res.ok) {
                showNotification(isEdit ? 'تم تحديث الفرع بنجاح' : 'تم إضافة الفرع بنجاح', 'success');
                modal.remove();
                loadBranches();
            } else {
                const err = await res.json();
                showNotification(err.detail || 'حدث خطأ', 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification('حدث خطأ في الاتصال', 'error');
        }
    });
}

async function deleteBranch(id) {
    if (!confirm('هل أنت متأكد من حذف هذا الفرع؟')) return;
    try {
        const res = await fetch(`${API_BASE_URL}/branches/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showNotification('تم حذف الفرع بنجاح', 'success');
            loadBranches();
        } else {
            showNotification('حدث خطأ في الحذف', 'error');
        }
    } catch (error) {
        console.error('Error deleting branch:', error);
        showNotification('حدث خطأ في الحذف', 'error');
    }
}

function attachBranchEventListeners() {
    document.querySelectorAll('.branch-edit').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = parseInt(btn.getAttribute('data-id'), 10);
            try {
                const res = await fetch(`${API_BASE_URL}/branches/${id}`);
                if (res.ok) {
                    const branch = await res.json();
                    showEditBranchModal(branch);
                }
            } catch (e) {
                showNotification('حدث خطأ في تحميل بيانات الفرع', 'error');
            }
        });
    });
    document.querySelectorAll('.branch-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'), 10);
            deleteBranch(id);
        });
    });
}

function getStatusClass(status) {
    const statusMap = {
        'قيد التنفيذ': 'active',
        'مكتمل': 'completed',
        'قيد المراجعة': 'pending'
    };
    return statusMap[status] || 'pending';
}

function getCategoryClass(category) {
    const categoryMap = {
        'سكني': 'residential',
        'تجاري': 'commercial'
    };
    return categoryMap[category] || 'residential';
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
}

// Event Listeners Attachment
function attachProjectEventListeners() {
    // Edit buttons
    document.querySelectorAll('#projects-section .btn-action.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            editProject(id);
        });
    });
    
    // View buttons
    document.querySelectorAll('#projects-section .btn-action.view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            viewProject(id);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('#projects-section .btn-action.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            if (confirm('هل أنت متأكد من الحذف؟')) {
                deleteProject(id);
            }
        });
    });
}

function attachServiceEventListeners() {
    // Edit buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            editService(id);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            if (confirm('هل أنت متأكد من الحذف؟')) {
                deleteService(id);
            }
        });
    });
}

function attachMessageEventListeners() {
    document.querySelectorAll('.btn-archive').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            markMessageAsRead(id);
            showNotification('تم نقل الرسالة إلى الأرشيف', 'success');
        });
    });
    
    document.querySelectorAll('.btn-delete-msg').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            if (confirm('هل أنت متأكد من الحذف؟')) {
                deleteMessage(id);
            }
        });
    });
}

function attachNewsletterEventListeners() {
    document.querySelectorAll('#newsletter-section .btn-action.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id'));
            if (confirm('هل أنت متأكد من الحذف؟')) {
                deleteSubscriber(id);
            }
        });
    });
}

// ==================== Image Upload Functions ====================
async function uploadImage(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API_BASE_URL}/upload/image`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.url;
        } else {
            throw new Error('فشل رفع الصورة');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        showNotification('حدث خطأ في رفع الصورة', 'error');
        return null;
    }
}

// Create image upload input
function createImageUploadInput(callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('📸 Image selected:', file.name);
            
            // عرض معاينة محلية مباشرة أولاً
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log('✅ Local preview ready');
                // استدعاء callback مع معاينة محلية فوراً
                if (callback) {
                    callback(e.target.result, true); // true = معاينة محلية
                }
            };
            reader.readAsDataURL(file);
            
            // رفع الصورة إلى السيرفر في الخلفية
            showNotification('جاري رفع الصورة...', 'info');
            try {
                const imageUrl = await uploadImage(file);
                if (imageUrl) {
                    console.log('✅ Image uploaded to server:', imageUrl);
                    showNotification('تم رفع الصورة بنجاح', 'success');
                    // استدعاء callback مع رابط الصورة من السيرفر (المسار النسبي فقط)
                    if (callback) {
                        // imageUrl هو بالفعل مسار نسبي مثل /uploads/images/filename.jpg
                        callback(imageUrl, false); // false = رابط السيرفر (مسار نسبي)
                    }
                }
            } catch (error) {
                console.error('❌ Error uploading image:', error);
                showNotification('حدث خطأ في رفع الصورة', 'error');
            }
        }
    });
    
    document.body.appendChild(input);
    input.click();
    setTimeout(() => input.remove(), 1000);
}

// Update existing event listeners
if (btnSaveStats) {
    btnSaveStats.addEventListener('click', saveStats);
}

if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', saveSettings);
}

// Initialize get current location
getCurrentLocation();

// Add branch button
const btnAddBranch = document.getElementById('btnAddBranch');
if (btnAddBranch) {
    btnAddBranch.addEventListener('click', showAddBranchModal);
}

// Add project button with image upload
if (btnAddProject) {
    btnAddProject.addEventListener('click', () => {
        showAddProjectModal();
    });
}

// Add service button
if (btnAddService) {
    btnAddService.addEventListener('click', () => {
        showAddServiceModal();
    });
}

// Show add project modal
function showAddProjectModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 30px; border-radius: 16px; max-width: 500px; width: 90%;">
            <h2 style="margin-bottom: 20px;">إضافة مشروع جديد</h2>
            <form id="addProjectForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">اسم المشروع</label>
                    <input type="text" name="name" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الموقع</label>
                    <input type="text" name="location" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الفئة</label>
                    <select name="category" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                        <option value="سكني">سكني</option>
                        <option value="تجاري">تجاري</option>
                        <option value="بنية تحتية">بنية تحتية</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الحالة</label>
                    <select name="status" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                        <option value="قيد التنفيذ">قيد التنفيذ</option>
                        <option value="مكتمل">مكتمل</option>
                        <option value="قيد المراجعة">قيد المراجعة</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">نسبة الإنجاز (%)</label>
                    <input type="number" name="progress" min="0" max="100" value="0" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الوصف</label>
                    <textarea name="description" rows="3" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);"></textarea>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">صورة المشروع</label>
                    <div id="projectImagePreview" style="margin-bottom: 10px; display: none;">
                        <img id="projectImagePreviewImg" src="" alt="معاينة الصورة" style="max-width: 100%; max-height: 200px; border-radius: 8px; border: 1px solid var(--border-color); object-fit: cover; display: block;">
                    </div>
                    <button type="button" id="uploadProjectImage" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">رفع صورة</button>
                    <span id="projectImageName" style="margin-right: 10px; color: var(--text-secondary);"></span>
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="cancel-btn" style="padding: 10px 20px; background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">إلغاء</button>
                    <button type="submit" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">إضافة</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let selectedImageUrl = null;
    const imagePreview = modal.querySelector('#projectImagePreview');
    const imagePreviewImg = modal.querySelector('#projectImagePreviewImg');
    const imageName = modal.querySelector('#projectImageName');
    let removeImageBtn = null;
    
    // وظيفة إزالة الصورة
    const removeImage = () => {
        selectedImageUrl = null;
        if (imagePreview) {
            imagePreview.style.display = 'none';
        }
        if (imagePreviewImg) {
            imagePreviewImg.src = '';
            imagePreviewImg.style.display = 'none';
        }
        if (imageName) imageName.textContent = '';
        if (removeImageBtn) {
            removeImageBtn.remove();
            removeImageBtn = null;
        }
    };
    
    // رفع الصورة
    modal.querySelector('#uploadProjectImage').addEventListener('click', () => {
        console.log('🖼️ Upload button clicked');
        createImageUploadInput((url, isLocalPreview) => {
            console.log('📸 Callback called:', { url: url ? url.substring(0, 50) + '...' : 'null', isLocalPreview });
            
            if (!url) {
                console.error('❌ No URL provided');
                return;
            }
            
            // عرض معاينة الصورة مباشرة (محلية أو من السيرفر)
            if (imagePreviewImg) {
                console.log('✅ Setting image preview src');
                imagePreviewImg.src = url;
                imagePreviewImg.style.display = 'block';
                imagePreviewImg.style.width = '100%';
                imagePreviewImg.style.maxHeight = '200px';
            }
            
            if (imagePreview) {
                console.log('✅ Showing image preview container');
                imagePreview.style.display = 'block';
            }
            
            // حفظ رابط السيرفر فقط (ليس المعاينة المحلية)
            if (!isLocalPreview) {
                // url هو بالفعل مسار نسبي مثل /uploads/images/filename.jpg
                selectedImageUrl = url.startsWith('http') ? url.replace('http://localhost:8000', '') : url;
                console.log('✅ Server URL saved:', selectedImageUrl);
                if (imageName) imageName.textContent = 'تم رفع الصورة بنجاح ✓';
                
                // تحديث معاينة الصورة برابط كامل للعرض
                if (imagePreviewImg) {
                    imagePreviewImg.src = url.startsWith('http') ? url : `http://localhost:8000${url}`;
                }
                
                // إضافة زر إزالة إذا لم يكن موجوداً
                if (!removeImageBtn && imagePreview) {
                    console.log('✅ Adding remove button');
                    removeImageBtn = document.createElement('button');
                    removeImageBtn.type = 'button';
                    removeImageBtn.id = 'removeProjectImage';
                    removeImageBtn.textContent = 'إزالة الصورة';
                    removeImageBtn.style.cssText = 'padding: 5px 10px; background: var(--danger); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px; margin-top: 5px; display: block;';
                    removeImageBtn.addEventListener('click', removeImage);
                    imagePreview.appendChild(removeImageBtn);
                }
            } else {
                // معاينة محلية - نعرض رسالة مؤقتة
                console.log('✅ Local preview shown');
                if (imageName) imageName.textContent = 'جاري رفع الصورة...';
            }
        });
    });
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#addProjectForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const projectData = {
            name: formData.get('name'),
            location: formData.get('location'),
            category: formData.get('category'),
            status: formData.get('status'),
            progress: parseInt(formData.get('progress')) || 0,
            description: formData.get('description'),
            image_url: selectedImageUrl || null
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });
            
            if (response.ok) {
                showNotification('تم إضافة المشروع بنجاح', 'success');
                modal.remove();
                loadProjects();
            } else {
                showNotification('حدث خطأ في إضافة المشروع', 'error');
            }
        } catch (error) {
            console.error('Error adding project:', error);
            showNotification('حدث خطأ في إضافة المشروع', 'error');
        }
    });
}

// Show add service modal
function showAddServiceModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 30px; border-radius: 16px; max-width: 500px; width: 90%;">
            <h2 style="margin-bottom: 20px;">إضافة خدمة جديدة</h2>
            <form id="addServiceForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">عنوان الخدمة</label>
                    <input type="text" name="title" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الوصف</label>
                    <textarea name="description" rows="3" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);"></textarea>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الأيقونة (Font Awesome)</label>
                    <input type="text" name="icon" placeholder="fa-hammer" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="cancel-btn" style="padding: 10px 20px; background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">إلغاء</button>
                    <button type="submit" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">إضافة</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#addServiceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const serviceData = {
            title: formData.get('title'),
            description: formData.get('description'),
            icon: formData.get('icon') || 'fa-briefcase'
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });
            
            if (response.ok) {
                showNotification('تم إضافة الخدمة بنجاح', 'success');
                modal.remove();
                loadServices();
            } else {
                showNotification('حدث خطأ في إضافة الخدمة', 'error');
            }
        } catch (error) {
            console.error('Error adding service:', error);
            showNotification('حدث خطأ في إضافة الخدمة', 'error');
        }
    });
}

// Show edit project modal
function showEditProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const currentImageUrl = project.image_url ? 
        (project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`) : 
        '';
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 30px; border-radius: 16px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <h2 style="margin-bottom: 20px;">تعديل المشروع</h2>
            <form id="editProjectForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">اسم المشروع</label>
                    <input type="text" name="name" value="${project.name || ''}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الموقع</label>
                    <input type="text" name="location" value="${project.location || ''}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الفئة</label>
                    <select name="category" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                        <option value="سكني" ${project.category === 'سكني' ? 'selected' : ''}>سكني</option>
                        <option value="تجاري" ${project.category === 'تجاري' ? 'selected' : ''}>تجاري</option>
                        <option value="بنية تحتية" ${project.category === 'بنية تحتية' ? 'selected' : ''}>بنية تحتية</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الحالة</label>
                    <select name="status" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                        <option value="قيد التنفيذ" ${project.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
                        <option value="مكتمل" ${project.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                        <option value="قيد المراجعة" ${project.status === 'قيد المراجعة' ? 'selected' : ''}>قيد المراجعة</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">نسبة الإنجاز (%)</label>
                    <input type="number" name="progress" min="0" max="100" value="${project.progress || 0}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الوصف</label>
                    <textarea name="description" rows="3" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">${project.description || ''}</textarea>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">صورة المشروع</label>
                    <div id="editProjectImagePreview" style="margin-bottom: 10px;">
                        ${currentImageUrl ? `<img id="editProjectImagePreviewImg" src="${currentImageUrl}" alt="صورة المشروع" style="max-width: 100%; max-height: 200px; border-radius: 8px; border: 1px solid var(--border-color); object-fit: cover; margin-bottom: 5px;"><br>` : '<img id="editProjectImagePreviewImg" src="" alt="معاينة الصورة" style="max-width: 100%; max-height: 200px; border-radius: 8px; border: 1px solid var(--border-color); object-fit: cover; margin-bottom: 5px; display: none;"><br>'}
                        ${currentImageUrl ? '<button type="button" id="removeEditProjectImage" style="padding: 5px 10px; background: var(--danger); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px;">إزالة الصورة</button>' : ''}
                    </div>
                    <button type="button" id="uploadEditProjectImage" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">${currentImageUrl ? 'تغيير الصورة' : 'رفع صورة'}</button>
                    <span id="editProjectImageName" style="margin-right: 10px; color: var(--text-secondary);"></span>
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="cancel-btn" style="padding: 10px 20px; background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">إلغاء</button>
                    <button type="submit" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">حفظ التغييرات</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let selectedImageUrl = project.image_url || null;
    const editImagePreview = modal.querySelector('#editProjectImagePreview');
    const editImagePreviewImg = modal.querySelector('#editProjectImagePreviewImg');
    const editImageName = modal.querySelector('#editProjectImageName');
    let removeEditImageBtn = modal.querySelector('#removeEditProjectImage') || null;
    
    // عرض الصورة الحالية إذا كانت موجودة
    if (currentImageUrl && editImagePreviewImg) {
        editImagePreviewImg.style.display = 'block';
    }
    
    // وظيفة إزالة الصورة
    const removeEditImage = () => {
        selectedImageUrl = null;
        if (editImagePreviewImg) {
            editImagePreviewImg.src = '';
            editImagePreviewImg.style.display = 'none';
        }
        if (editImageName) editImageName.textContent = '';
        if (removeEditImageBtn) {
            removeEditImageBtn.remove();
            removeEditImageBtn = null;
        }
    };
    
    modal.querySelector('#uploadEditProjectImage').addEventListener('click', () => {
        console.log('🖼️ Edit upload button clicked');
        createImageUploadInput((url, isLocalPreview) => {
            console.log('📸 Edit callback called:', { url: url.substring(0, 50) + '...', isLocalPreview });
            
            // عرض معاينة الصورة مباشرة (محلية أو من السيرفر)
            if (editImagePreviewImg && url) {
                console.log('✅ Setting edit image preview');
                // إذا كانت URL نسبية، أضف localhost للعرض
                editImagePreviewImg.src = url.startsWith('http') ? url : (url.startsWith('/') ? `http://localhost:8000${url}` : url);
                editImagePreviewImg.style.display = 'block';
            }
            
            // حفظ رابط السيرفر فقط (ليس المعاينة المحلية)
            if (!isLocalPreview) {
                // url هو بالفعل مسار نسبي مثل /uploads/images/filename.jpg
                selectedImageUrl = url.startsWith('http') ? url.replace('http://localhost:8000', '') : url;
                console.log('✅ Edit server URL saved:', selectedImageUrl);
                if (editImageName) editImageName.textContent = 'تم رفع الصورة بنجاح ✓';
                
                // إضافة زر إزالة إذا لم يكن موجوداً
                if (!removeEditImageBtn && editImagePreview) {
                    console.log('✅ Adding edit remove button');
                    removeEditImageBtn = document.createElement('button');
                    removeEditImageBtn.type = 'button';
                    removeEditImageBtn.id = 'removeEditProjectImage';
                    removeEditImageBtn.textContent = 'إزالة الصورة';
                    removeEditImageBtn.style.cssText = 'padding: 5px 10px; background: var(--danger); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px; margin-top: 5px;';
                    removeEditImageBtn.addEventListener('click', removeEditImage);
                    editImagePreview.appendChild(removeEditImageBtn);
                }
            } else {
                // معاينة محلية - نعرض رسالة مؤقتة
                console.log('✅ Edit local preview shown');
                if (editImageName) editImageName.textContent = 'جاري رفع الصورة...';
            }
        });
    });
    
    // إزالة الصورة الحالية من الزر الموجود
    if (removeEditImageBtn) {
        removeEditImageBtn.addEventListener('click', removeEditImage);
    }
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#editProjectForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const projectData = {
            name: formData.get('name'),
            location: formData.get('location'),
            category: formData.get('category'),
            status: formData.get('status'),
            progress: parseInt(formData.get('progress')) || 0,
            description: formData.get('description'),
            image_url: selectedImageUrl
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });
            
            if (response.ok) {
                showNotification('تم تحديث المشروع بنجاح', 'success');
                modal.remove();
                loadProjects();
            } else {
                showNotification('حدث خطأ في تحديث المشروع', 'error');
            }
        } catch (error) {
            console.error('Error updating project:', error);
            showNotification('حدث خطأ في تحديث المشروع', 'error');
        }
    });
}

// Show view project modal
function showViewProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const imageUrl = project.image_url ? 
        (project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`) : 
        'https://via.placeholder.com/400';
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 30px; border-radius: 16px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>تفاصيل المشروع</h2>
                <button class="close-modal-btn" style="background: none; border: none; color: var(--text-primary); font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <div style="margin-bottom: 20px;">
                <img src="${imageUrl}" alt="${project.name}" style="width: 100%; border-radius: 12px; max-height: 300px; object-fit: cover;">
            </div>
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--text-secondary);">اسم المشروع:</strong>
                <p style="margin-top: 5px; font-size: 18px;">${project.name}</p>
            </div>
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--text-secondary);">الموقع:</strong>
                <p style="margin-top: 5px;">${project.location}</p>
            </div>
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--text-secondary);">الفئة:</strong>
                <p style="margin-top: 5px;"><span class="category-badge ${getCategoryClass(project.category)}">${project.category}</span></p>
            </div>
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--text-secondary);">الحالة:</strong>
                <p style="margin-top: 5px;"><span class="status-badge ${getStatusClass(project.status)}">${project.status}</span></p>
            </div>
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--text-secondary);">نسبة الإنجاز:</strong>
                <p style="margin-top: 5px;">${project.progress}%</p>
            </div>
            ${project.description ? `
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--text-secondary);">الوصف:</strong>
                <p style="margin-top: 5px;">${project.description}</p>
            </div>
            ` : ''}
            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                <button class="close-modal-btn" style="padding: 10px 20px; background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">إغلاق</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });
}

// Show edit service modal
function showEditServiceModal(service) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 30px; border-radius: 16px; max-width: 500px; width: 90%;">
            <h2 style="margin-bottom: 20px;">تعديل الخدمة</h2>
            <form id="editServiceForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">عنوان الخدمة</label>
                    <input type="text" name="title" value="${service.title || ''}" required style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الوصف</label>
                    <textarea name="description" rows="3" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">${service.description || ''}</textarea>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">الأيقونة (Font Awesome)</label>
                    <input type="text" name="icon" value="${service.icon || 'fa-briefcase'}" placeholder="fa-hammer" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--darker-bg); color: var(--text-primary);">
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="cancel-btn" style="padding: 10px 20px; background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">إلغاء</button>
                    <button type="submit" style="padding: 10px 20px; background: var(--gradient); color: white; border: none; border-radius: 8px; cursor: pointer;">حفظ التغييرات</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#editServiceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const serviceData = {
            title: formData.get('title'),
            description: formData.get('description'),
            icon: formData.get('icon') || 'fa-briefcase'
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/services/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });
            
            if (response.ok) {
                showNotification('تم تحديث الخدمة بنجاح', 'success');
                modal.remove();
                loadServices();
            } else {
                showNotification('حدث خطأ في تحديث الخدمة', 'error');
            }
        } catch (error) {
            console.error('Error updating service:', error);
            showNotification('حدث خطأ في تحديث الخدمة', 'error');
        }
    });
}

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterText = btn.textContent.trim();
        let status = null;
        if (filterText === 'قيد التنفيذ') status = 'قيد التنفيذ';
        else if (filterText === 'مكتملة') status = 'مكتمل';
        else if (filterText === 'قيد المراجعة') status = 'قيد المراجعة';
        
        loadProjects(status);
    });
});

// Update delete buttons
document.querySelectorAll('.btn-action.delete, .btn-delete, .btn-delete-msg').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // This will be handled by specific listeners
    });
});

// Load data when sections are activated
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const section = item.getAttribute('data-section');
        
        setTimeout(() => {
            if (section === 'dashboard') {
                loadDashboardStats();
                loadProjects();
                loadMessages();
            } else if (section === 'projects') {
                loadProjects();
            } else if (section === 'services') {
                loadServices();
            } else if (section === 'contact') {
                loadMessages();
            } else if (section === 'newsletter') {
                loadNewsletter();
            } else if (section === 'stats') {
                loadStats();
            } else if (section === 'settings') {
                loadSettings();
            } else if (section === 'branches') {
                loadBranches();
            }
        }, 300);
    });
});

// Console message
console.log('%c🏢 لوحة تحكم سمو النبلاء', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cDashboard v1.0', 'font-size: 14px; color: #764ba2;');
console.log('%cDeveloped with ❤️', 'font-size: 12px; color: #10b981;');

// Initialize on page load
window.addEventListener('load', () => {
    loadDashboardStats();
    loadProjects();
    loadMessages();
    showNotification('مرحباً بك في لوحة التحكم', 'success');
});
