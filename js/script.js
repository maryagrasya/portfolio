const $ = (s, c = document) => c.querySelector(s); const $$ = (s, c = document) => [...c.querySelectorAll(s)];

window.addEventListener("load", () => setTimeout(() => $("#loader")?.classList.add("hidden"), 300));

const mainNav = $("#mainNav"), backToTop = $("#backToTop"), navLinks = $$(".nav-link"), sections = $$("main section[id]");
function handleScroll() {
    const y = window.scrollY;
    mainNav?.classList.toggle("navbar-scrolled", y > 40);
    backToTop?.classList.toggle("visible", y > 420);
    let activeId = "home";
    sections.forEach(section => { if (y >= section.offsetTop - 130) activeId = section.id });
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`));
}
window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll();

const menuToggle = $("#menuToggle"), mobileMenu = $("#mobileMenu"), menuIcon = $("#menuIcon");
function setMenu(open) {
    mobileMenu?.classList.toggle("open", open);
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    menuToggle?.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (menuIcon) menuIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}
menuToggle?.addEventListener("click", () => setMenu(!mobileMenu?.classList.contains("open")));
$$('#mobileMenu a').forEach(link => link.addEventListener("click", () => setMenu(false)));

$$('a[href^="#"]').forEach(anchor => anchor.addEventListener("click", e => {
    const href = anchor.getAttribute("href"); if (!href || href === "#") return;
    const target = $(href); if (!target) return; e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" });
}));

const revealItems = $$(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target) }
    }), { threshold: .14 });
    revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const contactForm = $("#contactForm"), formMessage = $("#formMessage");
function showMessage(text, type) { if (!formMessage) return; formMessage.textContent = text; formMessage.className = `form-message ${type}` }
contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#name")?.value.trim() ?? "", email = $("#email")?.value.trim() ?? "", message = $("#message")?.value.trim() ?? "";
    if (name.length < 2) return showMessage("Please enter your full name.", "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMessage("Please enter a valid email address.", "error");
    if (message.length < 10) return showMessage("Please write a message with at least 10 characters.", "error");
    showMessage("Form looks good. Connect a mail service or backend to send messages.", "success");
});
