// Инициализация частиц в виде точек
particlesJS('particles-js', {
    particles: {
        number: {
            value: 120,
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
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
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
            out_mode: "out",
            bounce: false
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
                opacity: 0.8,
                speed: 3
            },
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    retina_detect: true
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 1s ease forwards`;
            if (entry.target.classList.contains('grid')) {
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.15}s`;
                });
            }
        }
    });
}, observerOptions);

// Наблюдаем за элементами, которые должны появляться
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const osContent = document.querySelector('.os-content');
    const grids = document.querySelectorAll('.grid');

    cards.forEach(card => observer.observe(card));
    if (osContent) observer.observe(osContent);
    grids.forEach(grid => observer.observe(grid));
});

// Управление индикатором прокрутки
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.scroll-dot');
const container = document.querySelector('.container');

function updateIndicator() {
    const scrollPos = container.scrollTop;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Более точное определение активной секции для snap-scroll
        if (scrollPos >= sectionTop - windowHeight / 2 && 
            scrollPos < sectionTop + sectionHeight - windowHeight / 2) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
    });
}

// Прокрутка по клику на точки
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionIndex = parseInt(dot.getAttribute('data-section'));
        sections[sectionIndex].scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Слушаем события скролла контейнера
container.addEventListener('scroll', updateIndicator);
container.addEventListener('scrollend', updateIndicator);
window.addEventListener('resize', updateIndicator);

// Инициализация при загрузке
updateIndicator();

// Дополнительный наблюдатель для Intersection Observer как запасной вариант
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));