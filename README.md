# Frame — Video Editor Portfolio

A clean, dark, minimalist one-page portfolio built for a video editor. No backend,
no database, no build tools — just HTML, CSS and JavaScript, and your videos play
straight from YouTube.

This README assumes **zero prior experience**. Follow it top to bottom the first
time; after that, skip to whichever section you need.

---

## 1. What's in this project

```
video-editor-portfolio/
├── index.html              ← the whole page (one file, one HTML page)
├── css/
│   └── style.css           ← all colors, fonts, spacing, layout, animations
├── js/
│   └── main.js              ← your video list, and the page's interactivity
├── assets/
│   ├── favicon.svg          ← the little icon in the browser tab
│   └── portrait.jpg         ← (you add this) your About-section photo
├── .gitignore                ← tells Git which files to ignore
└── README.md                 ← this file
```

Why no `package.json`, no `node_modules`, no build step? Because a static
HTML/CSS/JS site needs none of that to run or to deploy. Less to install,
less to break, easier to understand.

### What each file actually does

- **`index.html`** — the structure and text content of the page: the nav bar,
  hero section, work list, about section, capabilities, testimonial, and
  contact section. Every section has an `id` (like `id="work"`) that the nav
  links jump to.
- **`css/style.css`** — everything about how it *looks*. It starts with a
  `:root { ... }` block of variables (colors, fonts) — change those and the
  whole site re-themes itself. Below that, the file is organized top-to-bottom
  in the same order as the page: nav, hero, work list, about, etc.
- **`js/main.js`** — three jobs:
  1. Holds your list of **projects** (`PROJECTS` array) and turns it into the
     rows you see in the "Work" section — this is where you'll paste your
     real YouTube video IDs.
  2. Makes the video modal (pop-up player) open and close.
  3. Small interactive touches: the scroll-triggered fade-ins, the mobile
     menu, and the "timecode" readout in the nav bar that advances as you
     scroll (a nod to a video editor's playhead).

---

## 2. Install what you need (one-time setup)

You need two things on your computer: **VS Code** and a way to preview the
site locally. You do **not** need Node.js or npm for this project to run —
only install Node if you want the optional Vercel CLI later (section 6).

1. **Install VS Code**: [code.visualstudio.com](https://code.visualstudio.com) →
   download for your OS → install like any other app.
2. **Install Git** (needed for GitHub): [git-scm.com/downloads](https://git-scm.com/downloads) →
   download → install with the default options.
3. Open VS Code, go to the **Extensions** panel (the four-squares icon on the
   left sidebar, or `Ctrl+Shift+X` / `Cmd+Shift+X`), search for **"Live
   Server"** by Ritwick Dey, and click **Install**. This is what lets you
   preview the site in a browser with auto-refresh.

---

## 3. Open the project in VS Code

1. Download/copy the `video-editor-portfolio` folder somewhere sensible on
   your computer, e.g. `Documents/Projects/video-editor-portfolio`.
2. Open VS Code → **File → Open Folder…** → select that folder.
3. You should see the file structure from section 1 in the sidebar on the
   left.

---

## 4. Run it locally

1. In the VS Code file sidebar, right-click **`index.html`**.
2. Click **"Open with Live Server"**.
3. Your browser opens automatically at something like
   `http://127.0.0.1:5500/index.html` — that's your site, running on your
   own computer.
4. Leave that browser tab open. From now on, whenever you save a change to
   any file in VS Code, the page refreshes itself automatically.

That's it — no terminal commands required for local development.

---

## 5. Put it on GitHub

GitHub stores your code online and is also how Vercel will pull your site to
deploy it.

1. Create a free account at [github.com](https://github.com) if you don't
   have one.
2. On GitHub, click the **+** icon (top right) → **New repository**.
   - Name it e.g. `video-editor-portfolio`.
   - Leave it **Public** (or Private, your choice — both work fine with
     Vercel's free plan).
   - Don't check "Add a README" — you already have one.
   - Click **Create repository**.
3. GitHub will show you a page with commands. Back in VS Code, open the
   built-in terminal: **Terminal → New Terminal**. Make sure it's in your
   project folder, then run these one at a time:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/video-editor-portfolio.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your actual GitHub username (copy the exact
   URL GitHub showed you after creating the repo — it's more reliable than
   retyping it).

4. Refresh the GitHub page — your files should now be there.

### Making future updates

Every time you make changes and want to save them to GitHub:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

You can also do this visually in VS Code using the **Source Control** panel
(the icon that looks like a branching line) instead of typing commands —
type your commit message in the box at the top, click the checkmark, then
click **"Sync Changes"**.

---

## 6. Deploy to Vercel (free `.vercel.app` domain)

1. Go to [vercel.com](https://vercel.com) → **Sign Up** → choose **"Continue
   with GitHub"** so the two are linked automatically.
2. On your Vercel dashboard, click **Add New… → Project**.
3. Find your `video-editor-portfolio` repository in the list and click
   **Import**.
4. Vercel will detect it as a static site. You don't need to change any
   settings — leave "Framework Preset" as **Other** (or "None"), leave the
   Build Command and Output Directory blank.
5. Click **Deploy**.
6. After a few seconds you'll get a live URL like
   `video-editor-portfolio.vercel.app`. That's your site, live on the
   internet, for free.

### Future updates deploy automatically

Once connected, every time you `git push` to GitHub (section 5), Vercel
automatically rebuilds and redeploys your site within seconds. You don't
need to touch Vercel again after this initial setup.

---

## 7. Replace the YouTube video placeholders

Open **`js/main.js`** in VS Code. Near the top you'll see:

```js
const PROJECTS = [
  {
    title: "Brand film — [Client Name]",
    category: "Brand",
    duration: "02:14",
    youtubeId: "PLACEHOLDER_VIDEO_ID_1",
  },
  ...
];
```

For each project:

1. Upload the video to YouTube (Unlisted works fine if you don't want it
   publicly searchable — it'll still play in the embedded player).
2. Copy the video's ID from its URL. If the URL is:
   `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   the ID is the part after `v=`: `dQw4w9WgXcQ`
3. Paste it in as the `youtubeId` value, and update `title`, `category`, and
   `duration` to match.
4. Save the file. If Live Server is running, the "Work" list updates
   immediately.

To add more projects, copy one whole `{ ... }` block (including the comma
after it) and paste it into the list with new values. To remove one, delete
its `{ ... }` block.

---

## 8. Making common changes later

Everything below is a change inside `index.html`, `css/style.css` or
`js/main.js` — open the relevant file in VS Code, edit, save, and Live
Server shows you the result instantly.

### Change text
Open `index.html` and edit the text directly. Every placeholder is written
in `[Square Brackets]` — search the file (`Ctrl+F` / `Cmd+F`) for `[` to find
all of them quickly. Things like `[Your Name]`, `[Your City]`, and the email
address (`you@example.com`) in the Contact section all live here.

### Change images
- **Portrait photo**: add a file named `portrait.jpg` inside the `assets/`
  folder — the About section already points to it.
- **Favicon (browser tab icon)**: replace `assets/favicon.svg` with your own
  SVG or PNG (if you use a PNG, update the `<link rel="icon" ...>` line near
  the top of `index.html` to match the new filename).

### Change colors
Open `css/style.css` and edit the `:root { ... }` block at the very top:

```css
:root {
  --bg: #101012;       /* page background */
  --text: #EDEAE3;     /* main text color */
  --accent: #E6482E;   /* the one bold accent color, used on buttons/links */
  ...
}
```

Change a hex value, save, and every element using that variable updates
across the whole site.

### Change fonts
Fonts are loaded from Google Fonts in the `<head>` of `index.html`, and
referenced in `css/style.css` under `--font-display` (headlines) and
`--font-body` (everything else). To swap a font:
1. Pick a new one at [fonts.google.com](https://fonts.google.com).
2. Copy its `<link>` tag and replace the existing Google Fonts `<link>` tags
   in `index.html`.
3. Update `--font-display` / `--font-body` in `style.css` to the new font
   name.

### Change or add videos
See section 7 above.

### Add or remove a whole section
Each section in `index.html` is wrapped in `<section class="section"
id="...">...</section>`. To remove one, delete that whole block (and its
matching nav link near the top, if it has one). To duplicate one, copy a
whole `<section>...</section>` block, paste it, give it a new `id`, and edit
its content.

### Change the contact form behaviour
This site intentionally uses a simple `mailto:` link instead of a contact
form, because a form needs a backend (or a third-party service) to actually
send an email anywhere — and you asked for front-end only. If you later want
a real form, a free service like [Formspree](https://formspree.io) lets you
add one without writing any backend code — you'd just point a `<form>`'s
`action` attribute at the endpoint they give you.

---

## 9. Troubleshooting

- **"Open with Live Server" doesn't appear** — make sure the Live Server
  extension is installed (section 2, step 3) and that you right-clicked
  `index.html` specifically, not the folder.
- **Videos won't play** — make sure you replaced the `PLACEHOLDER_VIDEO_ID`
  text with a real YouTube video ID (section 7), and that the video isn't
  set to "Private" on YouTube (Public or Unlisted both work).
- **`git push` asks for a username/password and fails** — GitHub no longer
  accepts your account password for this. Follow GitHub's guide to sign in
  via the browser prompt that pops up, or set up a
  [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
- **Vercel shows a blank page after deploying** — double check the Vercel
  project's "Root Directory" setting points at the folder containing
  `index.html` (if you ever restructure the repo), and that Build Command /
  Output Directory are left blank for a static site like this one.
#   v i d e o - e d i t o r - p o r t f o l i o  
 