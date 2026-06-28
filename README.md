# DJPJ — Official Website

A simple, fast, **dark & neon** static website for DJPJ (Preston Jacobs) with music,
a merch store, and a tip jar. No frameworks, no build step — just open the files.

## Files

| File | What it is |
|------|------------|
| `index.html` | The whole site (all sections live here). |
| `styles.css` | Colors, fonts, layout. |
| `script.js`  | Menu, buttons, and the Buy/Tip logic. |
| `assets/`    | Placeholder images — replace with your real photos. |

## See it locally

Just **double-click `index.html`** — it opens in your browser. That's it.
(The SoundCloud player and Google Fonts need internet; everything else works offline.)

---

## How to edit common things

### ✏️ Change a product (name, price, image)
In `index.html`, find the **Store** section. Each product is a `<article class="card">` block.
Edit the title, description, the `<span class="price">`, and the button's
`data-item` / `data-price`. To change the picture, drop your image into `assets/` and update
the `src="assets/..."`. To add a product, copy a whole `card` block and edit it.

### 📧 Change your contact email
It's used by the Buy/Tip buttons. Open `script.js` and change this line near the top:
```js
const CONTACT_EMAIL = "itsprestonjacobs@gmail.com";
```
(Also update the "Email" link in the **Connect** section of `index.html`.)

### 🔗 Add your social links
In `index.html`, find the **Connect** section and replace the `href="#"` placeholders for
Instagram, TikTok, and Spotify with your real profile URLs.

### 🎵 Add Spotify (when your music is live)
In `index.html`, find the comment that says `SPOTIFY — ADD LATER` in the **Music** section.
On Spotify, open your artist/track page → **... (More) → Share → Embed** → copy the code,
and paste that `<iframe>` where the comment tells you.

### 🎨 Change the look
The site is intentionally monochrome (black & white). Open `styles.css` — the `:root` block
at the top holds the shades (`--bg`, `--fg`, `--muted`, `--line`). Tweak them once and it
applies everywhere. Fonts are set in the `<link>` in `index.html` (Anton + Inter + Space Mono).

---

## 💳 Adding real payments later

Right now every **Buy** and **Tip** button opens a **pre-filled email** to you (contact-to-buy),
so you can start selling before any payment account is set up.

When you're ready to take payments online, get a payment link from any of these (all let you
create a shareable "buy" link with no website code):
- **Stripe Payment Links** — stripe.com
- **Gumroad** — gumroad.com (great for merch + digital)
- **Ko-fi** or **PayPal.me** — easiest for tips

Then in `index.html`, add a `data-link` to any button:
```html
<button class="btn btn--primary buy"
        data-item="Logo Tee" data-price="$25"
        data-link="https://buy.stripe.com/your-link-here">Buy</button>
```
The site automatically uses the link if it's there, and falls back to email if it isn't.
(See the big comment block in `script.js` for details.)

---

## 🚀 Put it online with GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `djpj-site`).
2. Upload all these files (`index.html`, `styles.css`, `script.js`, the `assets/` folder, this README)
   to the repo — drag-and-drop on github.com works, or use Git.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Pick branch **main** and folder **/ (root)**, then **Save**.
6. Wait ~1 minute, refresh — GitHub shows your live URL
   (like `https://yourname.github.io/djpj-site/`).

To update the site later, just replace the files in the repo — Pages redeploys automatically.

Want a custom domain (like `djpj.com`)? Buy one from any registrar, then in
**Settings → Pages → Custom domain** add it and follow GitHub's DNS instructions.
