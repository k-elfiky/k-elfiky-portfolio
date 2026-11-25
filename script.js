// ========================================
// Code Typing Animation
// ========================================
const codeEl = document.getElementById('heroCode');
if (codeEl) {
    const codeLines = [
        '<span class="kw">class</span> <span class="fn">MLPortfolio</span>:',
        '    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="self">self</span>):',
        '        <span class="self">self</span>.name = <span class="str">"Kareem Ashruf"</span>',
        '        <span class="self">self</span>.role = <span class="str">"Data Scientist & ML Engineer"</span>',
        '        <span class="self">self</span>.location = <span class="str">"Egypt, Menoufia"</span>',
        '',
        '    <span class="kw">def</span> <span class="fn">skills</span>(<span class="self">self</span>):',
        '        <span class="kw">return</span> [',
        '            <span class="str">"Python"</span>, <span class="str">"C++"</span>, <span class="str">"SQL"</span>,',
        '            <span class="str">"Machine Learning"</span>, <span class="str">"Pandas"</span>,',
        '            <span class="str">"NumPy"</span>, <span class="str">"FastAPI"</span>,',
        '        ]',
        '',
        '    <span class="kw">def</span> <span class="fn">build</span>(<span class="self">self</span>, data):',
        '        model = <span class="self">self</span>.train(data)',
        '        <span class="kw">return</span> <span class="self">self</span>.deploy(model)',
    ];

    let lineIdx = 0;
    let charIdx = 0;
    let currentHTML = '';
    let isDeleting = false;
    let pauseTimer = 0;

    function typeCode() {
        if (!isDeleting && lineIdx < codeLines.length) {
            const line = codeLines[lineIdx];
            if (charIdx <= line.length) {
                currentHTML = codeLines.slice(0, lineIdx).join('\n');
                if (lineIdx > 0) currentHTML += '\n';
                currentHTML += line.substring(0, charIdx);
                codeEl.innerHTML = currentHTML;
                charIdx++;
                setTimeout(typeCode, 25 + Math.random() * 20);
            } else {
                lineIdx++;
                charIdx = 0;
                setTimeout(typeCode, 80);
            }
        } else if (!isDeleting && lineIdx >= codeLines.length) {
            pauseTimer = setTimeout(() => {
                isDeleting = true;
                typeCode();
            }, 3000);
        } else if (isDeleting) {
            if (lineIdx > 0) {
                lineIdx--;
                charIdx = codeLines[lineIdx].length;
                currentHTML = codeLines.slice(0, lineIdx).join('\n');
                if (lineIdx > 0) currentHTML += '\n';
                currentHTML += codeLines[lineIdx];
                codeEl.innerHTML = currentHTML;
                setTimeout(typeCode, 15);
            } else {
                isDeleting = false;
                charIdx = 0;
                currentHTML = '';
                codeEl.innerHTML = '';
                setTimeout(typeCode, 500);
            }
        }
    }

    // Start typing when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(typeCode, 600);
            heroObserver.disconnect();
        }
    }, { threshold: 0.3 });
    heroObserver.observe(document.querySelector('.hero'));
}

// ========================================
// Scroll Reveal
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.skill-category, .project-card, .experience-card, .education-card, .stat-card, .contact-link-card, .about-languages'
).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i % 4 * 0.08}s`;
    revealObserver.observe(el);
});

// ========================================
// Navbar Scroll
// ========================================
const navbar = document.getElementById('navbar');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
            ticking = false;
        });
        ticking = true;
    }
});

// ========================================
// Active Nav Link
// ========================================
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    let currentId = '';

    sections.forEach((section) => {
        if (scrollPos >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === currentId);
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ========================================
// Cursor Glow
// ========================================
const glow = document.createElement('div');
glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transition: transform 0.15s ease-out;
`;
document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = (glowX - 200) + 'px';
    glow.style.top = (glowY - 200) + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// ========================================
// Contact Form
// ========================================
// The form submits natively: it has an action pointing at form submit
// endpoints (FormSubmit) that email the submissions to kareemelfiky950@gmail.com.
const contactForm = document.getElementById('contactForm');
if (contactForm && !contactForm.getAttribute('action')) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        btn.innerHTML = '<span>Opening your email app…</span>';
        let opened = false;
        try {
            opened = Boolean(window.open('mailto:kareemelfiky950@gmail.com', '_blank'));
        } catch (err) {
            opened = false;
        }
        if (!opened) {
            window.location.href = 'mailto:kareemelfiky950@gmail.com';
        }
        contactForm.reset();
    });
}

// ========================================
// Parallax Grid
// ========================================
const gridBg = document.querySelector('.hero-grid-bg');
if (gridBg) {
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset * 0.15;
        gridBg.style.transform = `translateY(${y}px)`;
    });
}
