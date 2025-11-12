// Инициализация частиц
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#8b5cf6", "#a855f7", "#c084fc", "#d8b4fe"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.7,
            random: true
        },
        size: {
            value: 2,
            random: true
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "bubble"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            }
        },
        modes: {
            bubble: {
                distance: 100,
                size: 4,
                duration: 0.3,
                opacity: 0.8
            },
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    retina_detect: true
});

// Основной код после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.scroll-dot');
    const sections = document.querySelectorAll('.section');
    
    // Прокрутка по клику на точки
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionIndex = parseInt(this.getAttribute('data-section'));
            const targetSection = sections[sectionIndex];
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Анимация появления элементов
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за всеми карточками и контентом
    const cards = document.querySelectorAll('.card');
    const osContent = document.querySelector('.os-content');
    
    cards.forEach(card => {
        card.classList.add('fade-in');
        fadeObserver.observe(card);
    });
    
    if (osContent) {
        osContent.classList.add('fade-in');
        fadeObserver.observe(osContent);
    }
    
    // Обновление индикатора прокрутки
    function updateScrollIndicator() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }
        });
    }
    
    // Слушаем события скролла
    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    
    // Инициализация при загрузке
    updateScrollIndicator();
    
    // Добавляем задержки для анимации карточек
    setTimeout(() => {
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }, 100);
});