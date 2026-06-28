/* =========================================================
   DJPJ site — interactions
   ========================================================= */

// ---- Mobile nav toggle ----
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---- Nav background on scroll ----
const nav = document.getElementById("top");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---- Reveal sections on scroll ----
const reveals = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // small stagger for groups
        e.target.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   SOUNDCLOUD — set a lower starting volume
   Change START_VOLUME below (0 = silent, 100 = full).
   ========================================================= */
const START_VOLUME = 40;
window.addEventListener("load", () => {
  const iframe = document.getElementById("scPlayer");
  if (!iframe || typeof SC === "undefined") return;
  const widget = SC.Widget(iframe);
  widget.bind(SC.Widget.Events.READY, () => widget.setVolume(START_VOLUME));
  widget.bind(SC.Widget.Events.PLAY, () => widget.setVolume(START_VOLUME));
});

/* =========================================================
   BUY / TIP BUTTONS — contact-to-buy (no payment account yet)
   ---------------------------------------------------------
   Every Buy/Tip runs through here. Right now it opens a
   pre-filled email. Later, add data-link="https://..." to any
   button (Stripe/Gumroad/Ko-fi) and it'll use that instead.
   ========================================================= */
const CONTACT_EMAIL = "itsprestonjacobs@gmail.com"; // <-- your email

function handlePurchase(button) {
  const link = button.getAttribute("data-link");
  if (link && link.trim() !== "" && link.trim() !== "#") {
    window.open(link, "_blank", "noopener");
    return;
  }
  const item = button.getAttribute("data-item") || "an item";
  const price = button.getAttribute("data-price") || "";
  const isTip = item.toLowerCase() === "tip";

  const subject = isTip ? `Tip for DJPJ (${price})` : `DJPJ order: ${item} (${price})`;
  const body = isTip
    ? `Hey DJPJ — I'd like to send a tip of ${price}. How can I send it? Thanks!`
    : `Hey DJPJ — I'd like to buy the "${item}" (${price}).\n\nMy size/details:\nShipping address:\n\nThanks!`;

  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll(".buy, .tip").forEach((button) => {
  button.addEventListener("click", () => handlePurchase(button));
});
