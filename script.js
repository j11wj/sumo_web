// ==================== API Configuration ====================
const API_BASE_URL = 'http://72.62.53.138:8000/api';

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');

    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) {
        const icon = menuToggle.querySelector('i');
            if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
            }
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

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

// Load stats from API
async function loadStats() {
    try {
        console.log('📊 Loading stats from API...');
        const response = await fetch(`${API_BASE_URL}/stats`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stats = await response.json();
        console.log('✅ Stats loaded:', stats);
        
        // Wait for DOM to be ready
        const checkStats = setInterval(() => {
            const statNumbers = document.querySelectorAll('.stat-number');
            if (statNumbers.length >= 4) {
                clearInterval(checkStats);
                
                // Update data-target attributes (ترتيب يطابق الصورة)
                // 1. مشروع قيد التنفيذ
                statNumbers[0].setAttribute('data-target', stats.ongoing_projects || 8);
                // 2. نسبة الإنجاز
                statNumbers[1].setAttribute('data-target', stats.completion_rate || 23);
                // 3. وحدة سكنية
                statNumbers[2].setAttribute('data-target', stats.residential_units || 2500);
                // 4. مشروع منجز
                statNumbers[3].setAttribute('data-target', stats.completed_projects || 20);
                
                // Also update the text content immediately
                statNumbers[0].textContent = stats.ongoing_projects || 8;
                statNumbers[1].textContent = `${stats.completion_rate || 23}%`;
                statNumbers[2].textContent = (stats.residential_units || 2500).toLocaleString();
                statNumbers[3].textContent = stats.completed_projects || 20;
                
                console.log('✅ Stats updated in DOM');
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => clearInterval(checkStats), 5000);
    } catch (error) {
        console.error('❌ Error loading stats:', error);
        // Fallback to default values (ترتيب يطابق الصورة)
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = '8';  // مشروع قيد التنفيذ
            statNumbers[1].textContent = '23%';  // نسبة الإنجاز
            statNumbers[2].textContent = '2,500';  // وحدة سكنية
            statNumbers[3].textContent = '20';  // مشروع منجز
        }
    }
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stat items sliding from left
            const statItems = entry.target.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                item.classList.add('animate');
            });

            // Animate stat numbers counting - use current data-target values
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target')) || parseInt(stat.textContent) || 0;
                if (target > 0) {
                    stat.textContent = '0';
                animateCounter(stat, target);
                }
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// General Intersection Observer for all animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            if (entry.target.classList.contains('section-header')) {
                entry.target.classList.add('animate');
            }

            if (entry.target.classList.contains('about-content')) {
                const aboutImage = entry.target.querySelector('.about-image');
                const aboutText = entry.target.querySelector('.about-text');
                if (aboutImage) aboutImage.classList.add('animate');
                if (aboutText) aboutText.classList.add('animate');
            }

            if (entry.target.classList.contains('projects-grid')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach(card => card.classList.add('animate'));
            }

            if (entry.target.classList.contains('services-grid')) {
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach(card => card.classList.add('animate'));
            }

            if (entry.target.classList.contains('about-text')) {
                const features = entry.target.querySelectorAll('.feature');
                features.forEach(feature => feature.classList.add('animate'));
            }

            if (entry.target.classList.contains('contact-form')) {
                entry.target.classList.add('animate');
            }

            if (entry.target.classList.contains('contact-info')) {
                entry.target.classList.add('animate');
                const infoItems = entry.target.querySelectorAll('.info-item');
                infoItems.forEach(item => item.classList.add('animate'));
            }

            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
});

// Initialize all animations
const initializeAnimations = () => {
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => animationObserver.observe(header));

    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) animationObserver.observe(aboutContent);

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) animationObserver.observe(projectsGrid);

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) animationObserver.observe(servicesGrid);

    const aboutText = document.querySelector('.about-text');
    if (aboutText) animationObserver.observe(aboutText);

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) animationObserver.observe(contactForm);

    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) animationObserver.observe(contactInfo);
};

// Load about section and contact info from settings
async function loadAbout() {
    try {
        console.log('📄 Loading about section from API...');
        const response = await fetch(`${API_BASE_URL}/settings`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const settings = await response.json();
        console.log('✅ Settings loaded:', settings);
        
        const checkAbout = setInterval(() => {
            const aboutText = document.querySelector('.about-text p');
            if (aboutText && settings.site_description) {
                clearInterval(checkAbout);
                aboutText.textContent = settings.site_description;
                console.log('✅ About text updated');
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkAbout), 5000);
        
        // Update contact information
        updateContactInfo(settings);
    } catch (error) {
        console.error('❌ Error loading about section:', error);
    }
}

// Update contact information from settings
function updateContactInfo(settings) {
    // Update address
    const contactAddress = document.getElementById('contactAddress');
    if (contactAddress && settings.address) {
        contactAddress.textContent = settings.address;
    }
    
    // Update phone
    const contactPhone = document.getElementById('contactPhone');
    const contactPhoneText = document.getElementById('contactPhoneText');
    if (contactPhone && settings.phone) {
        const phoneNumber = settings.phone.replace(/\s+/g, '');
        contactPhone.href = `https://wa.me/${phoneNumber}`;
        if (contactPhoneText) contactPhoneText.textContent = settings.phone;
    }
    
    // Update email
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail && settings.email) {
        contactEmail.textContent = settings.email;
    }
    
    // Update social links
    if (settings.facebook_url) {
        const fbLink = document.getElementById('socialFacebook');
        if (fbLink) fbLink.href = settings.facebook_url;
    }
    if (settings.twitter_url) {
        const twLink = document.getElementById('socialTwitter');
        if (twLink) twLink.href = settings.twitter_url;
    }
    if (settings.instagram_url) {
        const igLink = document.getElementById('socialInstagram');
        if (igLink) igLink.href = settings.instagram_url;
    }
    if (settings.linkedin_url) {
        const liLink = document.getElementById('socialLinkedIn');
        if (liLink) liLink.href = settings.linkedin_url;
    }
}

// Initialize map
let map = null;
let markers = [];

async function initMap() {
    try {
        console.log('🗺️ Initializing map...');
        
        const [branchesRes, settingsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/branches`),
            fetch(`${API_BASE_URL}/settings`)
        ]);
        const branches = branchesRes.ok ? await branchesRes.json() : [];
        const settings = settingsRes.ok ? await settingsRes.json() : {};
        
        // Use branches if available, else fallback to settings single location
        let locations = [];
        if (branches.length > 0) {
            locations = branches.map(b => ({
                lat: b.latitude,
                lng: b.longitude,
                name: b.name,
                address: b.address,
                phone: b.phone || settings.phone
            }));
        } else {
            const lat = settings.latitude || 24.7136;
            const lng = settings.longitude || 46.6753;
            locations = [{
                lat,
                lng,
                name: settings.site_name || 'شركة سمو النبلاء',
                address: settings.address || 'الرياض، المملكة العربية السعودية',
                phone: settings.phone
            }];
        }
        
        if (locations.length === 0) {
            locations = [{ lat: 24.7136, lng: 46.6753, name: 'الموقع', address: '', phone: '' }];
        }
        
        console.log('📍 Map locations:', locations.length, locations);
        
        const checkMap = setInterval(() => {
            const mapElement = document.getElementById('map');
            if (mapElement && typeof L !== 'undefined') {
                clearInterval(checkMap);
                
                const first = locations[0];
                const zoom = locations.length > 1 ? 10 : 15;
                map = L.map('map').setView([first.lat, first.lng], zoom);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(map);
                
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background: var(--secondary-color); width: 40px; height: 40px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-map-marker-alt" style="color: white; font-size: 20px;"></i>
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                });
                
                const bounds = [];
                locations.forEach((loc, i) => {
                    const m = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map)
                        .bindPopup(`
                            <div style="text-align: center; font-family: 'Tajawal', sans-serif;">
                                <strong style="color: var(--secondary-color); font-size: 18px;">${loc.name}</strong><br>
                                <p style="margin: 10px 0; color: #666;">${loc.address || ''}</p>
                                ${loc.phone ? `<p style="margin: 5px 0;"><i class="fas fa-phone"></i> ${loc.phone}</p>` : ''}
                                <a href="https://www.google.com/maps?q=${loc.lat},${loc.lng}" target="_blank" 
                                   style="color: var(--secondary-color); text-decoration: none; font-weight: 600;">
                                    <i class="fas fa-external-link-alt"></i> فتح في Google Maps
                                </a>
                            </div>
                        `);
                    markers.push(m);
                    bounds.push([loc.lat, loc.lng]);
                });
                
                if (bounds.length > 1) {
                    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
                } else if (bounds.length === 1) {
                    map.setView([bounds[0][0], bounds[0][1]], 15);
                }
                
                // Render branches list (when we have multiple from API)
                const branchesListEl = document.getElementById('branchesList');
                if (branchesListEl && locations.length > 0) {
                    branchesListEl.innerHTML = locations.map((loc, i) => `
                        <button type="button" class="branch-chip" data-index="${i}" aria-label="عرض ${loc.name} على الخريطة">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${loc.name}</span>
                        </button>
                    `).join('');
                    branchesListEl.querySelectorAll('.branch-chip').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const idx = parseInt(btn.getAttribute('data-index'), 10);
                            branchesListEl.querySelectorAll('.branch-chip').forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            if (map && markers[idx]) {
                                map.setView([locations[idx].lat, locations[idx].lng], 16);
                                markers[idx].openPopup();
                            }
                        });
                    });
                }
                
                console.log('✅ Map initialized with', locations.length, 'location(s)');
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkMap), 5000);
    } catch (error) {
        console.error('❌ Error initializing map:', error);
    }
}

// Load services from API
async function loadServices() {
    try {
        console.log('🔧 Loading services from API...');
        const response = await fetch(`${API_BASE_URL}/services`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const services = await response.json();
        console.log('✅ Services loaded:', services.length);
        
        const checkServices = setInterval(() => {
            const servicesGrid = document.querySelector('.services-grid');
            if (servicesGrid) {
                clearInterval(checkServices);
                
                if (services.length > 0) {
                    servicesGrid.innerHTML = services.map(service => `
                        <div class="service-card">
                            <div class="service-icon">
                                <i class="fas ${service.icon || 'fa-briefcase'}"></i>
                            </div>
                            <h3>${service.title}</h3>
                            <p>${service.description || ''}</p>
                        </div>
                    `).join('');
                    console.log('✅ Services grid updated with', services.length, 'services');
                } else {
                    console.log('⚠️ No services found');
                }
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkServices), 5000);
    } catch (error) {
        console.error('❌ Error loading services:', error);
    }
}

// Project Modal Functions
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

function openProjectModal(projectData) {
    if (!projectModal) return;
    
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLocation = document.getElementById('modalLocation');
    const modalUnits = document.getElementById('modalUnits');
    const modalStatus = document.getElementById('modalStatus');
    const modalType = document.getElementById('modalType');
    const modalTag = document.getElementById('modalTag');
    
    if (modalImage) modalImage.src = projectData.image;
    if (modalImage) modalImage.alt = projectData.title;
    if (modalTitle) modalTitle.textContent = projectData.title;
    if (modalDescription) modalDescription.textContent = projectData.description;
    if (modalLocation) modalLocation.textContent = projectData.location;
    if (modalUnits) modalUnits.textContent = projectData.units;
    if (modalStatus) modalStatus.textContent = projectData.status || 'مكتمل';
    if (modalType) modalType.textContent = projectData.type;
    
    if (modalTag) {
    modalTag.textContent = projectData.type;
    modalTag.className = 'modal-tag';
    if (projectData.type === 'تجاري') {
        modalTag.classList.add('commercial');
        }
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (projectModal) {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    }
}

if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Load projects from API
async function loadProjects() {
    try {
        console.log('🏗️ Loading projects from API...');
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        console.log('✅ Projects loaded:', projects.length);
        
        const checkProjects = setInterval(() => {
            // Update featured project section
            const featuredSection = document.querySelector('.featured-project');
            if (featuredSection && projects.length > 0) {
                const featuredProject = projects[0];
                const featuredTitle = featuredSection.querySelector('.featured-title');
                const featuredDescription = featuredSection.querySelector('.featured-description');
                const featuredImage = featuredSection.querySelector('.featured-image img');
                
                if (featuredTitle) featuredTitle.textContent = featuredProject.name;
                if (featuredDescription) featuredDescription.textContent = featuredProject.description || '';
                if (featuredImage) {
                    featuredImage.src = featuredProject.image_url ? 
                        (featuredProject.image_url.startsWith('http') ? featuredProject.image_url : 
                         (featuredProject.image_url.startsWith('/') ? `http://72.62.53.138:8000${featuredProject.image_url}` : 
                          `http://72.62.53.138:8000/${featuredProject.image_url}`)) : 
                        'image/photo_2025-12-05_21-11-46.jpg';
                    featuredImage.alt = featuredProject.name;
                }
            }
            
            // Update projects grid
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid && projects.length > 0) {
                clearInterval(checkProjects);
                
                // Remove all non-featured cards
                const existingCards = projectsGrid.querySelectorAll('.project-card:not(.featured-card)');
                existingCards.forEach(card => card.remove());
                
                // Update featured project card
                const featuredProject = projects[0];
                const featuredCard = projectsGrid.querySelector('.project-card.featured-card');
                if (featuredCard) {
                    const featuredImage = featuredCard.querySelector('.project-image img');
                    const featuredTitle = featuredCard.querySelector('h3');
                    const featuredDescription = featuredCard.querySelector('.project-info > p');
                    const featuredLocation = featuredCard.querySelector('.project-details span:first-child');
                    
                    if (featuredImage) {
                        featuredImage.src = featuredProject.image_url ? 
                            (featuredProject.image_url.startsWith('http') ? featuredProject.image_url : 
                             (featuredProject.image_url.startsWith('/') ? `http://localhost:8000${featuredProject.image_url}` : 
                              `http://localhost:8000/${featuredProject.image_url}`)) : 
                            'image/photo_2025-12-05_21-11-46.jpg';
                        featuredImage.alt = featuredProject.name;
                    }
                    if (featuredTitle) featuredTitle.textContent = featuredProject.name + ' ⭐';
                    if (featuredDescription) featuredDescription.textContent = featuredProject.description || '';
                    if (featuredLocation) featuredLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${featuredProject.location}`;
                }
                
                // Add other projects
                const otherProjects = projects.slice(1);
                otherProjects.forEach((project) => {
                    const imageUrl = project.image_url ? 
                        (project.image_url.startsWith('http') ? project.image_url : 
                         (project.image_url.startsWith('/') ? `http://72.62.53.138:8000${project.image_url}` : 
                          `http://72.62.53.138:8000/${project.image_url}`)) : 
                        'https://via.placeholder.com/400';
                    
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    card.innerHTML = `
                        <div class="project-image">
                            <img src="${imageUrl}" alt="${project.name}">
                            <div class="project-overlay">
                                <button class="btn-view">عرض التفاصيل</button>
                            </div>
                        </div>
                        <div class="project-info">
                            <span class="project-tag ${project.category === 'تجاري' ? 'commercial' : ''}">${project.category}</span>
                            <h3>${project.name}</h3>
                            <p>${project.description || ''}</p>
                            <div class="project-details">
                                <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                                <span><i class="fas fa-home"></i> ${project.category}</span>
                            </div>
                        </div>
                    `;
                    
                    projectsGrid.appendChild(card);
                    
                    // Attach event listener
                    const btnView = card.querySelector('.btn-view');
                    if (btnView) {
                        btnView.addEventListener('click', () => {
                            openProjectModal({
                                image: imageUrl,
                                title: project.name,
                                description: project.description || '',
                                location: project.location,
                                units: project.category,
                                type: project.category,
                                status: project.status
                            });
                        });
                    }
                });
                
                // Re-attach event listeners for featured card
                const featuredBtnView = featuredCard?.querySelector('.btn-view');
                if (featuredBtnView) {
                    featuredBtnView.addEventListener('click', () => {
                        const imageUrl = featuredProject.image_url ? 
                            (featuredProject.image_url.startsWith('http') ? featuredProject.image_url : 
                             (featuredProject.image_url.startsWith('/') ? `http://72.62.53.138:8000${featuredProject.image_url}` : 
                              `http://72.62.53.138:8000/${featuredProject.image_url}`)) : 
                            'image/photo_2025-12-05_21-11-46.jpg';
                        openProjectModal({
                            image: imageUrl,
                            title: featuredProject.name,
                            description: featuredProject.description || '',
                            location: featuredProject.location,
                            units: featuredProject.description || '',
                            type: featuredProject.category,
                            status: featuredProject.status
                        });
                    });
                }
                
                console.log('✅ Projects grid updated with', projects.length, 'projects');
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkProjects), 5000);
    } catch (error) {
        console.error('❌ Error loading projects:', error);
    }
}

// Featured Project Details Button
const btnFeaturedDetails = document.getElementById('btnFeaturedDetails');
if (btnFeaturedDetails) {
    btnFeaturedDetails.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`);
            const projects = await response.json();
            
            if (projects.length > 0) {
                const featuredProject = projects[0];
                const imageUrl = featuredProject.image_url ? 
                    (featuredProject.image_url.startsWith('http') ? featuredProject.image_url : 
                     (featuredProject.image_url.startsWith('/') ? `http://localhost:8000${featuredProject.image_url}` : 
                      `http://localhost:8000/${featuredProject.image_url}`)) : 
                    'image/photo_2025-12-05_21-11-46.jpg';
                
                openProjectModal({
                    image: imageUrl,
                    title: featuredProject.name,
                    description: featuredProject.description || '',
                    location: featuredProject.location,
                    units: featuredProject.description || '',
                    type: featuredProject.category,
                    status: featuredProject.status
                });
            }
        } catch (error) {
            console.error('Error loading featured project:', error);
        }
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

        const formInputs = contactForm.querySelectorAll('input, textarea');
        const formData = {
            name: formInputs[0].value,
            email: formInputs[1].value,
            phone: formInputs[2].value,
            message: formInputs[3].value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
    showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
    contactForm.reset();
            } else {
                const error = await response.json();
                showNotification('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showNotification('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
        }
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

    if (email) {
            try {
                const response = await fetch(`${API_BASE_URL}/newsletter`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
        showNotification('شكراً لاشتراكك في نشرتنا البريدية!', 'success');
        newsletterForm.reset();
                } else {
                    const error = await response.json();
                    if (error.detail && error.detail.includes('مشترك')) {
                        showNotification('البريد الإلكتروني مشترك بالفعل', 'warning');
                    } else {
                        showNotification('حدث خطأ في الاشتراك. يرجى المحاولة مرة أخرى.', 'error');
                    }
                }
            } catch (error) {
                console.error('Error subscribing to newsletter:', error);
                showNotification('حدث خطأ في الاشتراك. يرجى المحاولة مرة أخرى.', 'error');
            }
        }
    });
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#ff9800'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Tajawal', sans-serif;
        max-width: 350px;
    `;
    notification.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
    document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Starting data load...');
    
    // Load all data
    setTimeout(() => {
        loadStats();
        loadProjects();
        loadAbout();
        loadServices();
        initMap(); // Initialize map
    }, 500);
});

// Initialize animations when page is fully loaded
    window.addEventListener('load', () => {
    console.log('✅ Window loaded - Initializing animations...');
    initializeAnimations();
});
