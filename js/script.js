
// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    setTimeout(function () {
        loader.classList.add('hidden');
    }, 500);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function () {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('navbar-scrolled');
    } else {
        nav.classList.remove('navbar-scrolled');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
let isMenuOpen = false;

menuToggle.addEventListener('click', function () {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('max-h-0', 'opacity-0', 'invisible');
        mobileMenu.classList.add('max-h-[500px]', 'opacity-100', 'visible');
        menuIcon.className = 'fas fa-times text-xl';
    } else {
        mobileMenu.classList.remove('max-h-[500px]', 'opacity-100', 'visible');
        mobileMenu.classList.add('max-h-0', 'opacity-0', 'invisible');
        menuIcon.className = 'fas fa-bars text-xl';
    }
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(function (link) {
    link.addEventListener('click', function () {
        isMenuOpen = false;
        mobileMenu.classList.remove('max-h-[500px]', 'opacity-100', 'visible');
        mobileMenu.classList.add('max-h-0', 'opacity-0', 'invisible');
        menuIcon.className = 'fas fa-bars text-xl';
    });
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.classList.remove('hidden');
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.add('hidden');
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// CONTACT FORM HANDLER
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) {
        showMessage('❌ Please enter your full name.', 'error');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showMessage('❌ Please enter a valid email address.', 'error');
        return;
    }

    if (message.length < 10) {
        showMessage('❌ Please enter a message with at least 10 characters.', 'error');
        return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(function () {
        showMessage('✅ Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'mt-4 text-center p-4 rounded-xl ' +
        (type === 'error' ?
            'bg-red-500/10 text-red-400 border border-red-500/20' :
            'bg-green-500/10 text-green-400 border border-green-500/20'
        );
    formMessage.classList.remove('hidden');

    setTimeout(function () {
        formMessage.classList.add('hidden');
    }, 5000);
}

console.log('🚀 Grace Portfolio loaded successfully!');