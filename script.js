document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    const html = document.documentElement;
    const backToTop = document.querySelector('.back-to-top');
    const preloader = document.querySelector('.preloader');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const contactForm = document.getElementById('contactForm');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Verificar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    // Preloader
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Menu Hamburguer
    if (menuHamburger && navbar) {
        menuHamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
            document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Fechar menu ao clicar nos links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuHamburger.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll
    window.addEventListener('scroll', function() {
        // Header
        if (window.scrollY > 100) {
            document.querySelector('.header').classList.add('scrolled');
        } else {
            document.querySelector('.header').classList.remove('scrolled');
        }

        // Back to Top
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Ativar animações ao scroll
        animateOnScroll();
    });

    // Back to Top
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Alternador de Tema
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    }

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            darkIcon.style.opacity = '0';
            lightIcon.style.opacity = '1';
        } else {
            darkIcon.style.opacity = '1';
            lightIcon.style.opacity = '0';
        }
    }

    // Cursor Personalizado
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Efeitos de hover
        const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .service-card, .nav-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(2)';
                cursorFollower.style.transform = 'scale(0.5)';
                cursorFollower.style.backgroundColor = 'rgba(58, 134, 255, 0.5)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.backgroundColor = 'transparent';
            });
        });
    }

    // Filtro do Portfólio
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Animação ao Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = element.getAttribute('data-animation');
                element.classList.add(animationClass);
            }
        });
    }

    // Ativar animações das barras de habilidades
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            const width = item.querySelector('h4 span').textContent;
            progress.style.width = width;
        });
    }
    
    // Observar quando a seção de habilidades entra na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.about');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Enviar Mensagem
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            formData.append("access_key", "8c17a9b0-db73-48c5-bb01-c42998ef8c06");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });
                
                const result = await response.json();

                if (result.success) {
                    this.reset();
                    showNotification('Mensagem enviada com sucesso!', 'success');
                } else {
                    showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
                }
            } catch (error) {
                showNotification('Erro inesperado. Tente novamente mais tarde.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Mostrar notificação
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Typed.js Initialization
    if (document.getElementById('typed-text')) {
        var typed = new Typed('#typed-text', {
            strings: [
                "Desenvolvedor Full-Stack",
                "Especialista em React & Node",
                "Engenheiro de Software",
                "Desenvolvedor Mobile",
                "Entusiasta de UI/UX Design"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            startDelay: 1000,
            backDelay: 1500,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});