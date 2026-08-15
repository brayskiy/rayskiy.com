# www.rayskiy.com

Personal portfolio site — plain HTML/CSS/JS, hosted on GitHub Pages.

## Files
- `index.html` — page structure and content
- `styles.css` — styling (light/dark theme aware)
- `script.js` — theme toggle, mobile nav
- `CNAME` — custom domain for GitHub Pages (`www.rayskiy.com`)

## Local preview
No build step. Just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo on GitHub (e.g. `rayskiy.com`).
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin git@github.com:<YOUR_GITHUB_USERNAME>/rayskiy.com.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → Save
4. Under **Custom domain**, enter `www.rayskiy.com` and Save.
   (The `CNAME` file in this repo already sets this.)
5. Check **Enforce HTTPS** once the certificate is issued (can take a few minutes).

## DNS setup on GoDaddy

The domain `rayskiy.com` is registered at GoDaddy but not yet pointed anywhere.
In GoDaddy: **My Products → rayskiy.com → DNS → Manage Zones**.

### 1. Point `www` to GitHub Pages (CNAME)
| Type  | Name | Value                        | TTL  |
|-------|------|------------------------------|------|
| CNAME | www  | `<YOUR_GITHUB_USERNAME>.github.io` | 1 hr |

### 2. Point the apex (`rayskiy.com`) to GitHub, so it redirects to www
Add four **A** records for the root (`@`), all pointing to GitHub Pages IPs:

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 185.199.108.153 | 1 hr |
| A    | @    | 185.199.109.153 | 1 hr |
| A    | @    | 185.199.110.153 | 1 hr |
| A    | @    | 185.199.111.153 | 1 hr |

(Optionally also add AAAA records for IPv6:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

> Delete any GoDaddy "Parked" / default A record on `@` first, or it will conflict.

### 3. Wait for propagation
DNS can take 15 min – a few hours. Verify with:
```bash
dig www.rayskiy.com +short
dig rayskiy.com +short
```

Once it resolves, GitHub Pages will serve the site at **https://www.rayskiy.com**,
and `rayskiy.com` will redirect to `www`.
