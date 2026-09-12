const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Loading screen
window.addEventListener("load", () => {
    setTimeout(() => $("#loader")?.classList.add("hidden"), 500);
});

// Navbar + back to top + active section
const mainNav = $("#mainNav");
const backToTop = $("#backToTop");
const navLinks = $$(".nav-link");
const sections = $$("main section[id]");

function handleScroll() {
    const y = window.scrollY;

    mainNav?.classList.toggle("navbar-scrolled", y > 40);
    backToTop?.classList.toggle("visible", y > 420);

    let activeId = "home";
    sections.forEach((section) => {
        if (y >= section.offsetTop - 140) activeId = section.id;
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Mobile menu
const menuToggle = $("#menuToggle");
const mobileMenu = $("#mobileMenu");
const menuIcon = $("#menuIcon");

function setMenu(open) {
    mobileMenu?.classList.toggle("open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("overflow-hidden", open);
    if (menuIcon) menuIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

menuToggle?.addEventListener("click", () => {
    setMenu(!mobileMenu?.classList.contains("open"));
});

$$("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

// Smooth anchors
$$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = $(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Reveal animation
const revealItems = $$(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}

// Back to top
backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact validation
const contactForm = $("#contactForm");
const formMessage = $("#formMessage");

function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className =
        type === "error"
            ? "mt-3 min-h-6 text-center text-sm text-red-300"
            : "mt-3 min-h-6 text-center text-sm text-green-300";
}

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#name")?.value.trim() ?? "";
    const email = $("#email")?.value.trim() ?? "";
    const message = $("#message")?.value.trim() ?? "";

    if (name.length < 2) return showMessage("Please enter your full name.", "error");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return showMessage("Please enter a valid email address.", "error");

    if (message.length < 10) return showMessage("Please write at least 10 characters.", "error");

    showMessage("Form is valid. Connect your mail service/backend for real delivery.", "success");
});

console.log("Grace Tailwind Portfolio loaded.");
