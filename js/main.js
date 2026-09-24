document.documentElement.classList.add("js");

const hero = document.querySelector("[data-hero]");
const heroImages = [...document.querySelectorAll("[data-hero-art]")];
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const notice = document.querySelector("[data-notice]");
const noticeTitle = document.querySelector("[data-notice-title]");
const noticeClose = document.querySelector("[data-notice-close]");
const scrollHands = [...document.querySelectorAll("[data-scroll-lift]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let scrollFrame = 0;

const waitForImage = (image) => {
  if (image.complete) {
    return image.decode?.().catch(() => undefined) ?? Promise.resolve();
  }

  return new Promise((resolve) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });
};

const revealHero = async () => {
  await Promise.all(heroImages.map(waitForImage));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero?.classList.add("is-ready"));
  });
};

const closeMenu = () => {
  mobileMenu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

const updateScrollHands = () => {
  scrollFrame = 0;

  scrollHands.forEach((hand) => {
    if (reduceMotion.matches) {
      hand.style.setProperty("--lift-y", "0px");
      return;
    }

    const scene = hand.closest("[data-scroll-scene]");
    const rect = scene.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
    );
    const from = Number(hand.dataset.liftFrom) || 180;
    const distance = Number(hand.dataset.liftDistance) || 280;
    const lift = from - progress * distance;

    hand.style.setProperty("--lift-y", `${lift.toFixed(2)}px`);
  });
};

const queueScrollUpdate = () => {
  if (scrollFrame) {
    return;
  }

  scrollFrame = requestAnimationFrame(updateScrollHands);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-coming-soon]");

  if (trigger) {
    event.preventDefault();
    closeMenu();
    noticeTitle.textContent = `${trigger.dataset.comingSoon} — скоро`;
    notice.showModal();
    return;
  }

  if (!event.target.closest("[data-header]")) {
    closeMenu();
  }
});

noticeClose?.addEventListener("click", () => notice.close());

notice?.addEventListener("click", (event) => {
  if (event.target === notice) {
    notice.close();
  }
});

revealHero();
updateScrollHands();

window.addEventListener("scroll", queueScrollUpdate, { passive: true });
window.addEventListener("resize", queueScrollUpdate);
reduceMotion.addEventListener?.("change", queueScrollUpdate);
