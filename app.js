// Инициализация частиц
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 }},
        color: { value: ["#8b5cf6", "#a855f7", "#c084fc", "#d8b4fe"] },
        shape: { type: "circle" },
        opacity: { value: 0.7, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 1, direction: "none", random: true }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "repulse" }
        }
    }
});

// Плавная прокрутка и анимации
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.scroll-dot');
    const sections = document.querySelectorAll('.section');
    
    // Прокрутка по клику на точки
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = dot.getAttribute('data-section');
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Наблюдаем за карточками и контентом
    document.querySelectorAll('.card, .os-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Обновление индикатора прокрутки
    function updateIndicator() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateIndicator);
    window.addEventListener('resize', updateIndicator);
    updateIndicator();
});