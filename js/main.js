/* =========================================================
   PROJECTS
   -----------------------------------------------------------
   This is the ONLY place you need to touch to update your
   video list. Each project becomes one row in the "Work" bin.

   youtubeId: the part of a YouTube URL after "v=".
     e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                          ^^^^^^^^^^^ this bit
   Leave the PLACEHOLDER values in place until you have real
   videos uploaded — the site will still run fine with them,
   it just won't have a real video to play.
   ========================================================= */
const PROJECTS = [
  {
    title: "Brand film — [Client Name]",
    category: "Brand",
    duration: "02:14",
    youtubeId: "PLACEHOLDER_VIDEO_ID_1",
  },
  {
    title: "Short-form campaign — [Client Name]",
    category: "Social",
    duration: "00:42",
    youtubeId: "PLACEHOLDER_VIDEO_ID_2",
  },
  {
    title: "Documentary short — [Project Name]",
    category: "Narrative",
    duration: "08:31",
    youtubeId: "PLACEHOLDER_VIDEO_ID_3",
  },
  {
    title: "Music video — [Artist Name]",
    category: "Music",
    duration: "03:05",
    youtubeId: "PLACEHOLDER_VIDEO_ID_4",
  },
  {
    title: "Product launch — [Client Name]",
    category: "Brand",
    duration: "01:20",
    youtubeId: "PLACEHOLDER_VIDEO_ID_5",
  },
];

/* =========================================================
   RENDER THE BIN LIST
   ========================================================= */
const bin = document.getElementById("bin");

PROJECTS.forEach((project, i) => {
  const row = document.createElement("div");
  row.className = "bin-row reveal";
  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");

  const index = String(i + 1).padStart(2, "0");

  row.innerHTML = `
    <span class="bin-row__index">A${index}</span>
    <div class="bin-row__main">
      <p class="bin-row__title">${project.title}</p>
      <p class="bin-row__desc">Click to play on YouTube</p>
    </div>
    <span class="bin-row__tag">${project.category}</span>
    <span class="bin-row__duration">${project.duration}</span>
  `;

  const open = () => openModal(project.youtubeId);
  row.addEventListener("click", open);
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });

  bin.appendChild(row);
});

/* =========================================================
   VIDEO MODAL
   ========================================================= */
const modal = document.getElementById("modal");
const modalIframe = document.getElementById("modalIframe");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

function openModal(youtubeId) {
  // youtube-nocookie.com is the privacy-enhanced embed domain
  modalIframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalIframe.src = ""; // stops playback
  document.body.style.overflow = "";
}

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* =========================================================
   SCROLL REVEAL
   Fades + slides each `.reveal` element up once when it
   enters the viewport. Runs once per element, then stops
   watching it (so it doesn't re-trigger while scrolling).
   ========================================================= */
document.querySelectorAll(".section, .bin-row, .cap-row").forEach((el) => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* =========================================================
   NAV — background on scroll + mobile menu toggle
   ========================================================= */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 12);
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   TIMECODE READOUT
   Purely decorative — turns scroll position into a
   HH:MM:SS:FF style timecode, like a video playhead.
   ========================================================= */
const timecodeEl = document.getElementById("timecode");

function updateTimecode() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

  const totalFrames = Math.floor(progress * (59 * 60 * 24 + 59 * 24 + 24 * 59)); // arbitrary but stable range
  const fps = 24;
  const totalSeconds = Math.floor(progress * 3599); // caps around 00:59:59
  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  const ff = String(Math.floor(progress * fps) % fps).padStart(2, "0");

  timecodeEl.textContent = `${hh}:${mm}:${ss}:${ff}`;
}

window.addEventListener("scroll", updateTimecode, { passive: true });
updateTimecode();

/* =========================================================
   FOOTER YEAR
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
