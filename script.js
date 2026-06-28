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

// Close the mobile menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   SOUNDCLOUD — set a lower starting volume
   ---------------------------------------------------------
   Change START_VOLUME below (0 = silent, 100 = full).
   Needs the SoundCloud API script (loaded in index.html).
   ========================================================= */
const START_VOLUME = 40; // <-- adjust music loudness here (0–100)

window.addEventListener("load", () => {
  const iframe = document.getElementById("scPlayer");
  if (!iframe || typeof SC === "undefined") return;

  const widget = SC.Widget(iframe);
  // Set volume once the player is ready, and again right when playback starts
  // (SoundCloud resets to 100% on first play, so we re-apply it).
  widget.bind(SC.Widget.Events.READY, () => widget.setVolume(START_VOLUME));
  widget.bind(SC.Widget.Events.PLAY, () => widget.setVolume(START_VOLUME));
});

/* =========================================================
   BUY / TIP BUTTONS  —  contact-to-buy (no payment account yet)
   ---------------------------------------------------------
   Every Buy and Tip button runs through this one function.
   Right now it opens a pre-filled email so people can reach you.

   >>> WHEN YOU GET A PAYMENT LINK LATER <<<
   (Stripe Payment Link, Gumroad, Ko-fi, PayPal.me, etc.)
   you have two easy options:

   Option A — per product:
     Add a data-link attribute to the button in index.html, e.g.
       <button class="buy" data-item="Logo Tee" data-price="$25"
               data-link="https://buy.stripe.com/xxxxx">Buy</button>
     The code below already checks for data-link first.

   Option B — switch everything to email off / links on:
     Just give every button a data-link and you're done.
   ========================================================= */

const CONTACT_EMAIL = "itsprestonjacobs@gmail.com"; // <-- change your email here

function handlePurchase(button) {
  // If a real payment link is set, use it.
  const link = button.getAttribute("data-link");
  if (link && link.trim() !== "" && link.trim() !== "#") {
    window.open(link, "_blank", "noopener");
    return;
  }

  // Otherwise fall back to contact-to-buy via email.
  const item = button.getAttribute("data-item") || "an item";
  const price = button.getAttribute("data-price") || "";

  const isTip = item.toLowerCase() === "tip";
  const subject = isTip
    ? `Tip for DJPJ (${price})`
    : `DJPJ order: ${item} (${price})`;

  const body = isTip
    ? `Hey DJPJ — I'd like to send a tip of ${price}. How can I send it? Thanks!`
    : `Hey DJPJ — I'd like to buy the "${item}" (${price}).\n\n` +
      `My size/details:\nShipping address:\n\nThanks!`;

  const mailto =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
}

// Wire up every Buy and Tip button.
document.querySelectorAll(".buy, .tip").forEach((button) => {
  button.addEventListener("click", () => handlePurchase(button));
});
