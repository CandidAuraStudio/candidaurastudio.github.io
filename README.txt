# Candid Aura Studio — Olive/Espresso Build
Deploy to GitHub Pages
1) Create repo named `<your-username>.github.io` (public).
2) Upload *all files* from this folder so `index.html` is at the root.
3) Repo Settings → Pages → Source = `main`. Add custom domain `candidaurastudio.com`. Enable **Enforce HTTPS**.

Namecheap DNS
1) Domain List → candidaurastudio.com → Manage.
2) Nameservers: **Namecheap BasicDNS**.
3) Advanced DNS → add records:
   - A @ → 185.199.108.153
   - A @ → 185.199.109.153
   - A @ → 185.199.110.153
   - A @ → 185.199.111.153
   - CNAME **www** → `<your-username>.github.io`
4) Save. Wait for DNS propagation (usually 5–30 min).

Forms
- Replace `your-form-id` in `contact.html` and `support.html` with your Formspree endpoint.

Branding
- Swap placeholder images in `/images` with your own using the same filenames (or update paths).
