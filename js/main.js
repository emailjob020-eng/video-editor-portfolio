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
    title: "Creator story",
    category: "Narrative",
    duration: "04:18",
    youtubeId: "",
    source: "Video/6th.mp4",
    thumbnail: "assets/img/6th.png",
  },
  {
    title: "Documentary short",
    category: "Narrative",
    duration: "08:31",
    youtubeId: "",
    source: "Video/Result.mp4",
    thumbnail: "assets/img/Untitled-2.png",
  },
  {
    title: "Music video",
    category: "Music",
    duration: "03:05",
    youtubeId: "",
    source: "Video/cyclops4.mp4",
    thumbnail: "assets/img/1003.png",
  },
  {
    title: "Product launch",
    category: "Brand",
    duration: "01:20",
    youtubeId: "",
    source: "Video/5th.mp4",
    thumbnail: "assets/img/fat.jpg",
  },
  {
    title: "Short-form campaign",
    category: "Social",
    duration: "00:42",
    youtubeId: "",
    source: "Video/Reasy to Post_1.mp4",
    thumbnail: "assets/img/thumbnaiil.png",
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
    description: "Comp 1 short-form edit",
    source: "Video/Comp 1.mp4",
    thumbnail: "assets/img/2ndshort.png",
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
    : project.source
      ? `${project.thumbnail ? `<img src="${project.thumbnail}" alt="" loading="lazy" />` : ""}<video preload="metadata" playsinline poster="${project.thumbnail || "assets/img/project-1.jpg.png"}"><source src="${project.source}" type="video/mp4" />Your browser does not support the video tag.</video>`
      : project.thumbnail
        ? `<img src="${project.thumbnail}" alt="" loading="lazy" />`
        : `<div class="bin-row__placeholder"></div>`;

  row.innerHTML = `
    <div class="bin-row__thumb">
      ${thumbnail}
      ${project.youtubeId ? `<iframe title="${project.title}" src="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` : ""}
      <button class="bin-row__play" type="button" aria-label="Play ${project.title}" aria-pressed="false">▶</button>
    </div>
  `;

  const player = project.source ? row.querySelector("video") : null;
  const playButton = row.querySelector(".bin-row__play");

  if (player) {
    player.muted = false;
    player.volume = 1;
    player.controls = true;
  }

  const open = () => {
    if (project.youtubeId) {
      if (row.classList.contains("is-playing")) return;
      stopOtherMedia(row);
      const iframe = row.querySelector("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&enablejsapi=1`;
      row.classList.add("is-playing");
      return;
    }

    if (!player) return;
    if (!player.paused) {
      player.pause();
      row.classList.remove("is-playing");
      return;
    }

    stopOtherMedia(row);
    player.muted = false;
    player.volume = 1;
    player.play();
    row.classList.add("is-playing");
  };

  if (player && project.source) {
    playButton.addEventListener("click", (event) => {
      event.stopPropagation();
      open();
    });
    row.querySelector(".bin-row__thumb").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      open();
    });
    player.addEventListener("play", () => {
      player.muted = false;
      player.volume = 1;
      player.controls = true;
      stopOtherMedia(row);
      row.classList.add("is-playing");
      playButton.textContent = "⏸";
      playButton.setAttribute("aria-label", `Pause ${project.title}`);
      playButton.setAttribute("aria-pressed", "true");
    });
    const restoreCover = () => {
      row.classList.remove("is-playing");
      playButton.textContent = "▶";
      playButton.setAttribute("aria-label", `Play ${project.title}`);
      playButton.setAttribute("aria-pressed", "false");
    };
    player.addEventListener("pause", restoreCover);
    player.addEventListener("ended", restoreCover);
  }

  row.addEventListener("click", open);
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });

  bin.appendChild(row);
});

function stopOtherMedia(activeRow = null) {
  document.querySelectorAll(".bin-row.is-playing").forEach((row) => {
    if (row === activeRow) return;
    const iframe = row.querySelector("iframe");
    if (iframe) iframe.src = "";
    const video = row.querySelector("video");
    if (video) video.pause();
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
introVideo.addEventListener("click", () => {
  if (!introVideo.paused) introVideo.pause();
});
introVideo.addEventListener("play", () => {
  stopOtherMedia(introVideo.parentElement);
  introVideo.parentElement.classList.add("is-playing");
  introVideoPlay.classList.add("is-playing");
  introVideoPlay.textContent = "⏸";
  introVideoPlay.setAttribute("aria-label", "Pause introduction video");
  introVideoPlay.setAttribute("aria-pressed", "true");
});
introVideo.addEventListener("pause", () => {
  introVideo.parentElement.classList.remove("is-playing");
  introVideoPlay.classList.remove("is-playing");
  introVideoPlay.textContent = "▶";
  introVideoPlay.setAttribute("aria-label", "Play introduction video");
  introVideoPlay.setAttribute("aria-pressed", "false");
});
introVideo.addEventListener("ended", () => {
  introVideo.parentElement.classList.remove("is-playing");
  introVideoPlay.classList.remove("is-playing");
  introVideoPlay.textContent = "▶";
  introVideoPlay.setAttribute("aria-label", "Play introduction video");
  introVideoPlay.setAttribute("aria-pressed", "false");
});

const shortsGrid = document.getElementById("shortsGrid");

SHORT_VIDEOS.forEach((video, i) => {
  const card = document.createElement("article");
  card.className = "short-card reveal";
  const media = video.source
    ? `<img class="short-card__poster" src="${video.thumbnail || "assets/img/project-1.jpg.png"}" alt="" /><video preload="metadata" playsinline poster="${video.thumbnail || "assets/img/project-1.jpg.png"}"><source src="${video.source}" type="video/mp4" />Your browser does not support the video tag.</video><button class="short-card__play" type="button" aria-label="Play ${video.title}">▶</button>`
    : `<div class="short-card__placeholder"></div><button class="short-card__play" type="button" aria-label="Play ${video.title}">▶</button>`;
  card.innerHTML = `
    <div class="short-card__media">
      ${media}
    </div>
  `;
  const player = card.querySelector("video");
  if (player) {
    const playButton = card.querySelector(".short-card__play");
    const poster = card.querySelector(".short-card__poster");
    const syncPosterState = () => {
      const isPaused = player.paused || player.ended;
      card.classList.toggle("is-playing", !isPaused);
      if (poster) {
        poster.style.opacity = isPaused ? "1" : "0";
        poster.style.pointerEvents = isPaused ? "auto" : "none";
      }
    };

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
      syncPosterState();
    });
    player.addEventListener("pause", () => syncPosterState());
    player.addEventListener("ended", () => syncPosterState());
    player.addEventListener("loadeddata", () => syncPosterState());
    syncPosterState();
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
document.querySelectorAll(".section, .pricing, .bin, .bin-row, .cap-row").forEach((el) => {
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
   PRICING
   ========================================================= */
const pricingPlans = {
  video: [
    {
      name: "Short-form",
      price: 15,
      unit: "per video",
      summary: "For TikTok, Reels and YouTube Shorts",
      features: ["Up to 60 seconds", "1-day turnaround", "Animated captions", "2 rounds of revisions"],
    },
    {
      name: "Long YouTube",
      price: 110,
      unit: "per video",
      summary: "For YouTube videos up to 10 minutes",
      features: ["Up to 10 minutes", "48-hour turnaround", "3 rounds of revisions"],
    },
  ],
  month: [
    {
      name: "YouTube",
      price: 350,
      unit: "per month",
      summary: "4 YouTube videos a month",
      features: ["4 YouTube videos, up to 10 min", "3 rounds of revisions per video"],
    },
    {
      name: "Shorts",
      price: 360,
      unit: "per month",
      summary: "30 shorts a month",
      featured: true,
      features: ["30 short-form videos", "3 rounds of revisions"],
    },
    {
      name: "Pro",
      price: 650,
      unit: "per month",
      summary: "30 shorts and 4 YouTube videos",
      features: ["30 short-form videos", "4 YouTube videos, up to 10 min", "3 rounds of revisions per video"],
    },
  ],
};

const pricingGrid = document.getElementById("pricingGrid");
const pricingButtons = document.querySelectorAll("[data-pricing-mode]");

function renderPricing(mode, animate = false) {
  pricingGrid.classList.toggle("is-switching", animate);
  pricingGrid.classList.toggle("pricing__grid--3", pricingPlans[mode].length === 3);
  pricingButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.pricingMode === mode));
  });

  pricingGrid.replaceChildren();
  pricingPlans[mode].forEach((plan) => {
    const card = document.createElement("article");
    card.className = `pricing__card${plan.featured ? " pricing__card--featured" : ""}`;

    const name = document.createElement("h3");
    name.textContent = plan.name;

    const price = document.createElement("div");
    price.className = "pricing__price";
    const amount = document.createElement("strong");
    amount.textContent = `$${plan.price}`;
    const unit = document.createElement("span");
    unit.textContent = plan.unit;
    price.append(amount, unit);

    const summary = document.createElement("p");
    summary.className = "pricing__summary";
    summary.textContent = plan.summary;

    const cta = document.createElement("a");
    cta.className = "pricing__cta";
    cta.href = "https://t.me/techopiaET";
    cta.target = "_blank";
    cta.rel = "noopener";
    cta.textContent = "Book now";

    const features = document.createElement("ul");
    features.className = "pricing__features";
    plan.features.forEach((feature) => {
      const item = document.createElement("li");
      const check = document.createElement("span");
      check.className = "pricing__check";
      check.setAttribute("aria-hidden", "true");
      item.append(check, document.createTextNode(feature));
      features.append(item);
    });

    card.append(name, price, summary, cta, features);
    pricingGrid.append(card);
  });
}

pricingButtons.forEach((button) => {
  button.addEventListener("click", () => renderPricing(button.dataset.pricingMode, true));
});
renderPricing("video");

/* =========================================================
   FOOTER YEAR
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
