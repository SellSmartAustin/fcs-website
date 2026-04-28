const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/mLNB1w6cOmezTKSYCTDc";

const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

function closeMenu() {
  body.classList.remove("nav-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

function openMenu() {
  body.classList.add("nav-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "true");
  }
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    if (body.classList.contains("nav-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  siteNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("nav-open")) return;
    const withinNav = siteNav.contains(event.target);
    const withinToggle = menuToggle.contains(event.target);
    if (!withinNav && !withinToggle) {
      closeMenu();
    }
  });
}

const accordionItems = Array.from(document.querySelectorAll(".faq-item"));

function setPanelHeight(item, open) {
  const panel = item.querySelector(".faq-panel");
  const trigger = item.querySelector(".faq-trigger");
  if (!panel || !trigger) return;

  if (open) {
    item.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  } else {
    item.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    requestAnimationFrame(() => {
      panel.style.maxHeight = "0px";
    });
    window.setTimeout(() => {
      if (!item.classList.contains("open")) {
        panel.hidden = true;
      }
    }, 320);
  }
}

accordionItems.forEach((item) => {
  const trigger = item.querySelector(".faq-trigger");
  const panel = item.querySelector(".faq-panel");
  if (!trigger || !panel) return;

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    if (isOpen) {
      setPanelHeight(item, false);
    } else {
      setPanelHeight(item, true);
    }
  });
});

window.addEventListener("resize", () => {
  accordionItems.forEach((item) => {
    const panel = item.querySelector(".faq-panel");
    if (!panel || panel.hidden || !item.classList.contains("open")) return;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const qualifierForm = document.querySelector("#qualifier-form");

if (qualifierForm) {
  qualifierForm.setAttribute("action", bookingUrl);
  qualifierForm.setAttribute("method", "get");

  qualifierForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!qualifierForm.reportValidity()) {
      return;
    }
    window.location.href = bookingUrl;
  });
}
