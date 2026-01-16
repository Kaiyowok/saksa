

// ==================== GLOBAL STATE ====================
const SAKSARATA = {
    state: {
        isMenuOpen: false,
        isLightboxOpen: false,
        isMapModalOpen: false,
        isLoading: true,
        currentImageIndex: 0,
        images: [],
        scrollPosition: 0,
        isDesktop: window.matchMedia('(min-width: 769px)').matches,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        backgroundMusicPlaying: false,
        currentFilter: 'all'
    },
    
    elements: {},
    
    init: function() {
        console.log('🚀 SAKSARATA TELERONA 2026 - Initializing...');
        
        // Cache DOM elements
        this.cacheElements();
        
        // Initialize all modules
        this.initLoader();
        this.initMenu();
        this.initScrollEffects();
        this.initCursor();
        this.initLightbox();
        this.initMapModal();
        this.initCountdown();
        this.initCounters();
        this.initAnimations();
        this.initEventListeners();
        this.initPerformance();
        this.initGalleryFilter();
        this.initAudioPlayer();
        this.initScrollTop();
        this.initAOS();
        this.initParticles();
        this.initConfetti();
        
        // Initialize animations
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            delay: 100
        });
        
        // Remove loading class
        setTimeout(() => {
            document.body.classList.remove('is-loading');
            console.log('✅ Website initialized successfully');
        }, 100);
    },
    
    cacheElements: function() {
        this.elements = {
            body: document.body,
            html: document.documentElement,
            loadingScreen: document.getElementById('loading-screen'),
            menuToggle: document.getElementById('menuToggle'),
            mainMenu: document.getElementById('mainMenu'),
            header: document.getElementById('header'),
            lightbox: document.getElementById('lightbox'),
            lightboxImage: document.getElementById('lightboxImage'),
            lightboxCaption: document.getElementById('lightboxCaption'),
            lightboxClose: document.getElementById('lightboxClose'),
            lightboxPrev: document.getElementById('lightboxPrev'),
            lightboxNext: document.getElementById('lightboxNext'),
            mapModal: document.getElementById('mapModal'),
            mapModalClose: document.getElementById('mapModalClose'),
            mapTrigger: document.getElementById('mapTrigger'),
            vinylRecord: document.getElementById('vinylRecord'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            skipToContent: document.querySelector('.skip-to-content'),
            audioToggle: document.getElementById('audioToggle'),
            backgroundMusic: document.getElementById('backgroundMusic'),
            scrollTop: document.getElementById('scrollTop'),
            newsletterForm: document.getElementById('newsletterForm')
        };
    },
    
    // ==================== LOADER FUNCTIONS ====================
    initLoader: function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;
        
        document.documentElement.classList.add('is-loading');
        
        const preventDefaultScroll = (e) => {
            if (document.body.classList.contains('is-loading')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };
        
        document.addEventListener('wheel', preventDefaultScroll, { passive: false });
        document.addEventListener('touchmove', preventDefaultScroll, { passive: false });
        document.addEventListener('scroll', preventDefaultScroll, { passive: false });
        document.addEventListener('keydown', (e) => {
            if (document.body.classList.contains('is-loading') && 
                ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.code)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
        
        const loaderImages = [
            'Assets/2.jpg',
            'Assets/3.jpg',
            'Assets/4.jpg',
            'Assets/5.png'
        ];
        
        let currentIndex = 0;
        const imgElement = document.getElementById('loaderImage');
        
        function changeCharacter() {
            if (!imgElement || SAKSARATA.state.prefersReducedMotion) return;
            
            imgElement.style.opacity = 0;
            
            setTimeout(() => {
                imgElement.src = loaderImages[currentIndex];
                imgElement.style.opacity = 1;
                currentIndex = (currentIndex + 1) % loaderImages.length;
            }, 100);
        }
        
        if (imgElement && loaderImages.length > 0) {
            imgElement.src = loaderImages[3];
        }
        
        let characterInterval;
        if (!this.state.prefersReducedMotion) {
            characterInterval = setInterval(changeCharacter, 1000);
        }
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('is-loading');
                document.documentElement.classList.remove('is-loading');
                
                document.removeEventListener('wheel', preventDefaultScroll);
                document.removeEventListener('touchmove', preventDefaultScroll);
                document.removeEventListener('scroll', preventDefaultScroll);
                
                if (characterInterval) clearInterval(characterInterval);
                
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.height = '';
                
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                }
            }, 3000);
        });
        
        setTimeout(() => {
            if (document.body.classList.contains('is-loading')) {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('is-loading');
                document.documentElement.classList.remove('is-loading');
                
                document.removeEventListener('wheel', preventDefaultScroll);
                document.removeEventListener('touchmove', preventDefaultScroll);
                document.removeEventListener('scroll', preventDefaultScroll);
                
                if (characterInterval) clearInterval(characterInterval);
            }
        }, 8000);
    },
    
    // ==================== MENU SYSTEM ====================
    initMenu: function() {
        if (!this.elements.menuToggle || !this.elements.mainMenu) return;
        
        const toggleMenu = () => {
            this.state.isMenuOpen = !this.state.isMenuOpen;
            
            if (this.state.isMenuOpen) {
                this.elements.body.classList.add('menu-open');
                this.elements.mainMenu.classList.add('active');
                this.elements.menuToggle.classList.add('active');
                this.elements.menuToggle.setAttribute('aria-expanded', 'true');
                this.elements.mainMenu.setAttribute('aria-hidden', 'false');
                
                this.state.scrollPosition = window.pageYOffset;
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${this.state.scrollPosition}px`;
                document.body.style.width = '100%';
                
                this.trapFocus(this.elements.mainMenu);
            } else {
                this.elements.body.classList.remove('menu-open');
                this.elements.mainMenu.classList.remove('active');
                this.elements.menuToggle.classList.remove('active');
                this.elements.menuToggle.setAttribute('aria-expanded', 'false');
                this.elements.mainMenu.setAttribute('aria-hidden', 'true');
                
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                
                window.scrollTo(0, this.state.scrollPosition);
                this.elements.menuToggle.focus();
            }
        };
        
        this.elements.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu();
        });
        
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (this.state.isMenuOpen) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    toggleMenu();
                    
                    setTimeout(() => {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            const headerHeight = this.elements.header.offsetHeight;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                            
                            targetElement.setAttribute('tabindex', '-1');
                            targetElement.focus();
                        }
                    }, 400);
                }
            });
        });
        
        document.addEventListener('click', (e) => {
            if (this.state.isMenuOpen && 
                !this.elements.mainMenu.contains(e.target) && 
                !this.elements.menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isMenuOpen) {
                toggleMenu();
            }
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.state.isMenuOpen) {
                toggleMenu();
            }
        });
        
        this.elements.mainMenu.addEventListener('keydown', (e) => {
            if (!this.state.isMenuOpen) return;
            
            const menuItems = Array.from(this.elements.mainMenu.querySelectorAll('.menu-link'));
            const currentIndex = menuItems.indexOf(document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % menuItems.length;
                    menuItems[nextIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
                    menuItems[prevIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    menuItems[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    menuItems[menuItems.length - 1].focus();
                    break;
            }
        });
    },
    
    // ==================== SCROLL EFFECTS ====================
    initScrollEffects: function() {
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                this.elements.header.classList.add('scrolled');
            } else {
                this.elements.header.classList.remove('scrolled');
            }
            
            if (!this.state.prefersReducedMotion) {
                const parallaxElements = document.querySelectorAll('[data-speed]');
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
                    const yPos = -(scrollY * speed);
                    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
            }
            
            // Show/hide scroll to top button
            if (this.elements.scrollTop) {
                if (scrollY > 500) {
                    this.elements.scrollTop.classList.add('show');
                } else {
                    this.elements.scrollTop.classList.remove('show');
                }
            }
        };
        
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        updateHeader();
    },
    
    // ==================== CUSTOM CURSOR ====================
    initCursor: function() {
        if (!this.state.isDesktop || this.state.prefersReducedMotion) return;
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorCircle = document.querySelector('.cursor-circle');
        const cursorText = document.querySelector('.cursor-text');
        
        if (!cursorDot || !cursorCircle) return;
        
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            
            if (cursorText) {
                cursorText.style.transform = `translate(${mouseX}px, ${mouseY - 40}px)`;
            }
        });
        
        const animateCursor = () => {
            circleX += (mouseX - circleX - 20) * 0.15;
            circleY += (mouseY - circleY - 20) * 0.15;
            
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        const hoverElements = document.querySelectorAll('a, button, .artist-card, .gallery-item, .btn-primary, .guest-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) scale(1.5)`;
                cursorCircle.style.borderColor = 'rgba(0, 255, 157, 0.8)';
                
                if (cursorText) {
                    if (el.classList.contains('artist-card') || el.classList.contains('guest-card')) {
                        cursorText.textContent = 'View Details';
                    } else if (el.classList.contains('gallery-item')) {
                        cursorText.textContent = 'View Image';
                    } else if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#')) {
                        cursorText.textContent = 'Scroll to Section';
                    } else if (el.classList.contains('btn-primary')) {
                        cursorText.textContent = 'Click Here';
                    }
                    cursorText.style.opacity = '1';
                }
            });
            
            el.addEventListener('mouseleave', () => {
                cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) scale(1)`;
                cursorCircle.style.borderColor = 'rgba(224, 170, 255, 0.5)';
                
                if (cursorText) {
                    cursorText.style.opacity = '0';
                }
            });
        });
    },
    
    // ==================== LIGHTBOX ====================
    initLightbox: function() {
        if (!this.elements.lightbox) return;
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                this.state.images.push({
                    src: img.src,
                    alt: img.alt,
                    caption: item.querySelector('.gallery-content h4')?.textContent || img.alt,
                    category: item.getAttribute('data-category') || 'all'
                });
                
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.setAttribute('aria-label', `View image ${index + 1}: ${img.alt}`);
                
                item.addEventListener('click', () => this.openLightbox(index));
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.openLightbox(index);
                    }
                });
            }
        });
        
        this.openLightbox = (index) => {
            if (index < 0 || index >= this.state.images.length) return;
            
            const filteredImages = this.getFilteredImages();
            const filteredIndex = filteredImages.indexOf(this.state.images[index]);
            
            if (filteredIndex === -1) return;
            
            this.state.isLightboxOpen = true;
            this.state.currentImageIndex = filteredIndex;
            
            const image = filteredImages[filteredIndex];
            this.elements.lightboxImage.src = image.src;
            this.elements.lightboxImage.alt = image.alt;
            this.elements.lightboxCaption.textContent = image.caption;
            
            // Update lightbox info
            const lightboxIndex = document.getElementById('lightboxIndex');
            const lightboxCategory = document.getElementById('lightboxCategory');
            if (lightboxIndex) {
                lightboxIndex.textContent = `${filteredIndex + 1}/${filteredImages.length}`;
            }
            if (lightboxCategory) {
                lightboxCategory.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);
            }
            
            this.elements.lightbox.classList.add('active');
            this.elements.lightbox.setAttribute('aria-hidden', 'false');
            this.elements.body.classList.add('lightbox-open');
            
            this.trapFocus(this.elements.lightbox);
            
            setTimeout(() => {
                this.elements.lightboxClose.focus();
            }, 100);
        };
        
        this.closeLightbox = () => {
            this.state.isLightboxOpen = false;
            this.elements.lightbox.classList.remove('active');
            this.elements.lightbox.setAttribute('aria-hidden', 'true');
            this.elements.body.classList.remove('lightbox-open');
            
            const galleryItems = document.querySelectorAll('.gallery-item');
            const originalIndex = this.state.images.findIndex(img => 
                img.src === this.elements.lightboxImage.src
            );
            if (galleryItems[originalIndex]) {
                galleryItems[originalIndex].focus();
            }
        };
        
        this.nextImage = () => {
            const filteredImages = this.getFilteredImages();
            const nextIndex = (this.state.currentImageIndex + 1) % filteredImages.length;
            const originalIndex = this.state.images.indexOf(filteredImages[nextIndex]);
            this.openLightbox(originalIndex);
        };
        
        this.prevImage = () => {
            const filteredImages = this.getFilteredImages();
            const prevIndex = (this.state.currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            const originalIndex = this.state.images.indexOf(filteredImages[prevIndex]);
            this.openLightbox(originalIndex);
        };
        
        this.getFilteredImages = () => {
            if (this.state.currentFilter === 'all') {
                return this.state.images;
            }
            return this.state.images.filter(img => img.category === this.state.currentFilter);
        };
        
        this.elements.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.elements.lightboxPrev.addEventListener('click', () => this.prevImage());
        this.elements.lightboxNext.addEventListener('click', () => this.nextImage());
        
        this.elements.lightbox.addEventListener('click', (e) => {
            if (e.target === this.elements.lightbox) {
                this.closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (!this.state.isLightboxOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
            }
        });
    },
    
    // ==================== GALLERY FILTER ====================
    initGalleryFilter: function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.state.currentFilter = filter;
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
                
                AOS.refresh();
            });
        });
    },
    
    // ==================== MAP MODAL ====================
    initMapModal: function() {
        if (!this.elements.mapModal) return;
        
        this.openMapModal = () => {
            this.state.isMapModalOpen = true;
            this.elements.mapModal.classList.add('active');
            this.elements.mapModal.setAttribute('aria-hidden', 'false');
            this.elements.body.classList.add('modal-open');
            
            this.trapFocus(this.elements.mapModal);
            
            setTimeout(() => {
                this.elements.mapModalClose.focus();
            }, 100);
        };
        
        this.closeMapModal = () => {
            this.state.isMapModalOpen = false;
            this.elements.mapModal.classList.remove('active');
            this.elements.mapModal.setAttribute('aria-hidden', 'true');
            this.elements.body.classList.remove('modal-open');
            
            this.elements.mapTrigger.focus();
        };
        
        this.elements.mapTrigger.addEventListener('click', () => this.openMapModal());
        this.elements.mapTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openMapModal();
            }
        });
        
        this.elements.mapModalClose.addEventListener('click', () => this.closeMapModal());
        
        this.elements.mapModal.addEventListener('click', (e) => {
            if (e.target === this.elements.mapModal) {
                this.closeMapModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isMapModalOpen) {
                this.closeMapModal();
            }
        });
    },
    
    // ==================== COUNTDOWN TIMER ====================
    initCountdown: function() {
        if (!this.elements.days || !this.elements.hours) return;

        const eventDate = new Date('2026-01-21T08:00:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            if (distance < 0) {
                this.elements.days.textContent = '00';
                this.elements.hours.textContent = '00';
                if (this.elements.minutes) this.elements.minutes.textContent = '00';
                if (this.elements.seconds) this.elements.seconds.textContent = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            this.elements.days.textContent = days.toString().padStart(2, '0');
            this.elements.hours.textContent = hours.toString().padStart(2, '0');
            if (this.elements.minutes) this.elements.minutes.textContent = minutes.toString().padStart(2, '0');
            if (this.elements.seconds) this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    },
    
    // ==================== ANIMATED COUNTERS ====================
    initCounters: function() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count') || '0');
                    
                    if (this.state.prefersReducedMotion) {
                        counter.textContent = target.toLocaleString();
                    } else {
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                counter.textContent = Math.floor(current).toLocaleString();
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target.toLocaleString();
                            }
                        };
                        
                        updateCounter();
                    }
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    },
    
    // ==================== ANIMATIONS ====================
    initAnimations: function() {
        if (this.elements.vinylRecord && !this.state.prefersReducedMotion) {
            this.elements.vinylRecord.addEventListener('mouseenter', () => {
                this.elements.vinylRecord.classList.remove('paused');
            });
            
            this.elements.vinylRecord.addEventListener('mouseleave', () => {
                this.elements.vinylRecord.classList.add('paused');
            });
        }
        
        if (!this.state.prefersReducedMotion) {
            const fadeElements = document.querySelectorAll('.fade-in-up');
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.artist-card, .process-step, .gallery-item, .guest-card').forEach(el => {
            scrollObserver.observe(el);
        });
    },
    
    // ==================== AUDIO PLAYER ====================
    initAudioPlayer: function() {
        if (!this.elements.audioToggle || !this.elements.backgroundMusic) return;
        
        const audioStatus = this.elements.audioToggle.querySelector('.audio-status');
        const music = this.elements.backgroundMusic;
        
        // Check if audio was playing before
        const wasPlaying = localStorage.getItem('backgroundMusic') === 'playing';
        
        if (wasPlaying) {
            music.play().catch(e => console.log('Autoplay prevented:', e));
            this.state.backgroundMusicPlaying = true;
            audioStatus.textContent = 'ON';
        }
        
        this.elements.audioToggle.addEventListener('click', () => {
            if (this.state.backgroundMusicPlaying) {
                music.pause();
                audioStatus.textContent = 'OFF';
                localStorage.setItem('backgroundMusic', 'paused');
            } else {
                music.play().then(() => {
                    audioStatus.textContent = 'ON';
                    localStorage.setItem('backgroundMusic', 'playing');
                }).catch(e => {
                    console.log('Playback prevented:', e);
                    // Show a message to user that they need to interact first
                    alert('Klik sekali lagi untuk memutar musik latar.');
                });
            }
            this.state.backgroundMusicPlaying = !this.state.backgroundMusicPlaying;
        });
        
        // Pause music when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.state.backgroundMusicPlaying) {
                music.pause();
            } else if (!document.hidden && this.state.backgroundMusicPlaying) {
                music.play();
            }
        });
    },
    
    // ==================== SCROLL TO TOP ====================
    initScrollTop: function() {
        if (!this.elements.scrollTop) return;
        
        this.elements.scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },
    
    // ==================== AOS INITIALIZATION ====================
    initAOS: function() {
        // Already initialized in main init function
    },
    
    // ==================== PARTICLES.JS ====================
    initParticles: function() {
        if (typeof particlesJS !== 'undefined' && !this.state.prefersReducedMotion) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.1, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
        }
    },
    
    // ==================== CONFETTI EFFECT ====================
    initConfetti: function() {
        if (this.state.prefersReducedMotion) return;
        
        const confettiContainer = document.querySelector('.confetti-container');
        if (!confettiContainer) return;
        
        const createConfetti = () => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position
            confetti.style.left = Math.random() * 100 + 'vw';
            
            // Random color
            const colors = ['#7b2cbf', '#00ff9d', '#e0aaff', '#FFD700', '#ff6b6b'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Random rotation
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Random animation duration
            const duration = Math.random() * 3 + 2;
            confetti.style.animationDuration = duration + 's';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        };
        
        // Create initial confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createConfetti(), i * 100);
        }
        
        // Continue creating confetti
        setInterval(() => {
            if (Math.random() > 0.7) {
                createConfetti();
            }
        }, 300);
    },
    
    // ==================== EVENT LISTENERS ====================
    initEventListeners: function() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#main-content') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    if (this.state.isMenuOpen) {
                        const menuToggle = document.getElementById('menuToggle');
                        if (menuToggle) menuToggle.click();
                    }
                    
                    const headerHeight = this.elements.header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }, 500);
                }
            }.bind(this));
        });
        
        // Skip to content
        if (this.elements.skipToContent) {
            this.elements.skipToContent.addEventListener('click', (e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                }
            });
        }
        
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // Newsletter form
        if (this.elements.newsletterForm) {
            this.elements.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = this.elements.newsletterForm.querySelector('input[type="email"]').value;
                
                // Simulate submission
                const submitBtn = this.elements.newsletterForm.querySelector('.btn-subscribe');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Mengirim...</span>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Terima Kasih!</span>';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        this.elements.newsletterForm.reset();
                        
                        // Show success message
                        alert('Terima kasih telah berlangganan newsletter SAKSARATA!');
                    }, 2000);
                }, 1500);
            });
        }
        
        // Responsive check
        window.addEventListener('resize', () => {
            this.state.isDesktop = window.matchMedia('(min-width: 769px)').matches;
        });
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.querySelectorAll('.vinyl-record').forEach(el => {
                    el.classList.add('paused');
                });
            }
        });
    },
    
    // ==================== PERFORMANCE OPTIMIZATIONS ====================
    initPerformance: function() {
        // Preload critical images
        const preloadImages = [
            'Assets/saksa.jpg',
            'Assets/5.png',
            'Assets/about.jpg',
            'Assets/sgt.jpg',
            'Assets/aksara.jpg'
        ];
        
        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                AOS.refresh();
            }, 250);
        });
    },
    
    // ==================== ACCESSIBILITY HELPERS ====================
    trapFocus: function(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SAKSARATA.init());
} else {
    SAKSARATA.init();
}

// Expose to global scope
window.SAKSARATA = SAKSARATA;