// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only prevent default if it's not an empty href
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // If mobile menu is open, close it after clicking a link
                    const nav = document.querySelector('nav');
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        // Update toggle button icon if it exists
                        const navToggle = document.querySelector('.nav-toggle');
                        if (navToggle) {
                            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            }
        });
    });
    
    // Mobile menu toggle - using the existing nav-toggle class from CSS
    const setupMobileMenu = () => {
        const header = document.querySelector('header .container');
        const nav = document.querySelector('header nav');
        
        // Check if nav-toggle already exists
        if (!document.querySelector('.nav-toggle')) {
            // Create mobile menu button using the class that matches your CSS
            const navToggle = document.createElement('div');
            navToggle.className = 'nav-toggle';
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Append navToggle to header container
            header.appendChild(navToggle);
            
            // Add toggle functionality
            navToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                
                // Change icon based on state
                if (nav.classList.contains('active')) {
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
    };
    
    // Initialize mobile menu for all screen sizes, CSS will handle visibility
    setupMobileMenu();
    
    // Form validation (for contact and registration forms)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Remove error class when user starts typing
        const formInputs = form.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            let firstErrorField = null;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    if (!firstErrorField) firstErrorField = field;
                }
            });
            
            // Check email format if there's an email field
            const emailFields = form.querySelectorAll('input[type="email"]');
            
            emailFields.forEach(emailField => {
                if (emailField.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    if (!emailPattern.test(emailField.value.trim())) {
                        isValid = false;
                        emailField.classList.add('error');
                        if (!firstErrorField) firstErrorField = emailField;
                    }
                }
            });
            
            // If form is not valid, prevent submission
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
                
                // Focus on the first error field
                if (firstErrorField) {
                    firstErrorField.focus();
                }
            }
        });
    });
    
    // Initialize Swiper sliders if they exist
    if (typeof Swiper !== 'undefined') {
        // Events slider
        const eventsSlider = document.querySelector('.events-container .swiper-container');
        if (eventsSlider) {
            new Swiper(eventsSlider, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }
            });
        }
        
        // Testimonials slider
        const testimonialsSlider = document.querySelector('.testimonials-slider .swiper-container');
        if (testimonialsSlider) {
            new Swiper(testimonialsSlider, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            });
        }
    }
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        // Create back to top button if it doesn't exist
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const count = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const increment = count / 50;
                const timer = setInterval(() => {
                    current += increment;
                    stat.textContent = Math.round(current);
                    if (current >= count) {
                        stat.textContent = count;
                        clearInterval(timer);
                    }
                }, 50);
            });
        };
        
        // Use Intersection Observer to start animation when stats are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the stats section
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // Event filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide events based on filter
                eventCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});