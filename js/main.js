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
    title: "Brand film",
    category: "Brand",
    duration: "02:14",
    youtubeId: "_vdJT4n8wzk",
  },
  {
    title: "Short-form campaign",
    category: "Social",
    duration: "00:42",
    youtubeId: "-4Dd9O7aDfH1HkFI2",
  },
  {
    title: "Documentary short",
    category: "Narrative",
    duration: "08:31",
    youtubeId: "-4Dd9O7aDfH1HkFI3",
  },
  {
    title: "Music video",
    category: "Music",
    duration: "03:05",
    youtubeId: "-4Dd9O7aDfH1HkFI4",
  },
  {
    title: "Product launch",
    category: "Brand",
    duration: "01:20",
    youtubeId: "-4Dd9O7aDfH1HkFI5",
  },
  {
    title: "Creator story",
    category: "Narrative",
    duration: "04:18",
    youtubeId: "",
  },
];

/* Add future uploaded clips here. Keep each video inside the Video folder. */
const SHORT_VIDEOS = [
  {
    title: "Project 01",
    description: "Short-form edit",
    source: "Video/project-1.mp4",
  },
  {
    title: "Project 02",
    description: "Add Video/project-2.mp4",
    source: "",
  },
  {
    title: "Project 03",
    description: "Add Video/project-3.mp4",
    source: "",
  },
  {
    title: "Project 04",
    description: "Add Video/project-4.mp4",
    source: "",
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

  const thumbnail = project.youtubeId
    ? `<img src="https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg" alt="" loading="lazy" />`
    : `<div class="bin-row__placeholder"></div>`;

  row.innerHTML = `
    <div class="bin-row__thumb">
      ${thumbnail}
      ${project.youtubeId ? `<iframe title="${project.title}" src="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` : ""}
      <button class="bin-row__play" type="button" aria-label="Play ${project.title}">▶</button>
    </div>
  `;

  const open = () => {
    if (!project.youtubeId) return;
    if (row.classList.contains("is-playing")) return;
    stopOtherMedia(row);
    const player = row.querySelector("iframe");
    player.src = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&enablejsapi=1`;
    row.classList.add("is-playing");
  };
  row.addEventListener("click", open);
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });

  bin.appendChild(row);
});

function stopOtherMedia(activeRow = null) {
  document.querySelectorAll(".bin-row.is-playing").forEach((row) => {
    if (row === activeRow) return;
    row.querySelector("iframe").src = "";
    row.classList.remove("is-playing");
  });

  document.querySelectorAll(".short-card video").forEach((video) => {
    if (!activeRow || !activeRow.contains(video)) video.pause();
  });

  const introVideo = document.getElementById("introVideo");
  if (introVideo && (!activeRow || !activeRow.contains(introVideo))) introVideo.pause();
}

const introVideo = document.getElementById("introVideo");
const introVideoPlay = document.getElementById("introVideoPlay");

introVideoPlay.addEventListener("click", () => {
  if (introVideo.paused) {
    stopOtherMedia(introVideo.parentElement);
    introVideo.play();
  } else {
    introVideo.pause();
  }
});
introVideo.addEventListener("play", () => {
  introVideo.controls = true;
  stopOtherMedia(introVideo.parentElement);
  introVideoPlay.classList.add("is-playing");
});
introVideo.addEventListener("pause", () => introVideoPlay.classList.remove("is-playing"));
introVideo.addEventListener("ended", () => introVideoPlay.classList.remove("is-playing"));

const shortsGrid = document.getElementById("shortsGrid");

SHORT_VIDEOS.forEach((video, i) => {
  const card = document.createElement("article");
  card.className = "short-card reveal";
  const media = video.source
    ? `<video preload="metadata" playsinline poster="assets/img/project-1.jpg.png"><source src="${video.source}" type="video/mp4" />Your browser does not support the video tag.</video><button class="short-card__play" type="button" aria-label="Play ${video.title}">▶</button>`
    : `<div class="short-card__placeholder"></div><button class="short-card__play" type="button" aria-label="Play ${video.title}">▶</button>`;
  card.innerHTML = `
    <div class="short-card__media">
      ${media}
    </div>
  `;
  const player = card.querySelector("video");
  if (player) {
    const playButton = card.querySelector(".short-card__play");
    playButton.addEventListener("click", () => {
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    });
    player.addEventListener("play", () => {
      player.controls = true;
      stopOtherMedia(card);
      document.querySelectorAll(".short-card video").forEach((otherPlayer) => {
        if (otherPlayer !== player) otherPlayer.pause();
      });
    });
    player.addEventListener("play", () => card.classList.add("is-playing"));
    player.addEventListener("pause", () => card.classList.remove("is-playing"));
    player.addEventListener("ended", () => card.classList.remove("is-playing"));
  } else {
    card.querySelector(".short-card__play").addEventListener("click", (event) => {
      event.preventDefault();
    });
  }
  shortsGrid.appendChild(card);
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
document.querySelectorAll(".section, .bin, .bin-row, .cap-row").forEach((el) => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("bin")) {
          entry.target.classList.add("has-been-seen");
        }
      } else {
        entry.target.classList.remove("is-visible");
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
const themeToggle = document.getElementById("themeToggle");
const logoLink = document.querySelector(".nav__logo");

logoLink.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("home").scrollIntoView({ behavior: "smooth", block: "start" });
  logoLink.classList.remove("is-returning");
  requestAnimationFrame(() => logoLink.classList.add("is-returning"));
});
logoLink.addEventListener("animationend", () => logoLink.classList.remove("is-returning"));

function setTheme(isLight) {
  document.body.classList.toggle("is-light", isLight);
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeToggle.querySelector(".theme-toggle__icon").textContent = isLight ? "☾" : "☼";
}

const savedTheme = localStorage.getItem("frame-theme");
setTheme(savedTheme === "light");

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("is-light");
  setTheme(isLight);
  localStorage.setItem("frame-theme", isLight ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".hero__actions a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* =========================================================
   FOOTER YEAR
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
