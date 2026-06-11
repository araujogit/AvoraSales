/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* ─── HAMBURGER ─── */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");

hamburgerBtn.addEventListener("click", () => mobileMenu.classList.add("open"));
mobileMenuClose.addEventListener("click", () =>
  mobileMenu.classList.remove("open")
);
document.querySelectorAll(".mobile-link").forEach((l) => {
  l.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObs.observe(el));

/* ─── FAQ ACCORDION ─── */
document.querySelectorAll(".faq-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
    btn.setAttribute("aria-expanded", !isOpen);
  });
});

/* ─── FORM SUBMIT → WHATSAPP ─── */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");
  const nome = inputs[0].value;
  const wa = inputs[1].value;
  const email = inputs[2].value;
  const empresa = inputs[3].value;
  const desafio = inputs[4].value;

  const msg = encodeURIComponent(
    `Olá! Vim pelo site da Avora Sales e quero agendar meu diagnóstico gratuito.\n\n` +
      `*Nome:* ${nome}\n` +
      `*E-mail:* ${email || "—"}\n` +
      `*Empresa:* ${empresa}\n` +
      `*Meu maior desafio:* ${desafio || "—"}`
  );
  window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
}

/* ─── WA PHONE MASK ─── */
const waInput = document.getElementById("waInput");
if (waInput) {
  waInput.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 11);
    if (v.length >= 7) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length >= 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    this.value = v;
  });
}

/* ─── ANIMATED COUNTER ─── */
function animateCounter(el, target, suffix = "") {
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = isDecimal
      ? (ease * target).toFixed(1)
      : Math.round(ease * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = el.dataset.count;
      const suffix = el.dataset.suffix || "";
      animateCounter(el, parseFloat(raw), suffix);
      counterObs.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObs.observe(el));

/* ─── SMOOTH SCROLL FOR ALL ANCHORS ─── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
