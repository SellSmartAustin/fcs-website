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

const heroPhoneWrap = document.querySelector(".hero-phone-wrap");

if (heroPhoneWrap) {
  const heroMsg1 = heroPhoneWrap.querySelector(".hero-msg-1");
  const heroTyping = heroPhoneWrap.querySelector(".hero-typing");
  const heroMsg2 = heroPhoneWrap.querySelector(".hero-msg-2");
  const heroRead = heroPhoneWrap.querySelector(".hero-read");
  const heroMsg3 = heroPhoneWrap.querySelector(".hero-msg-3");
  const heroTime = heroPhoneWrap.querySelector(".msg-time");
  const heroAnimatedElements = [heroMsg1, heroTyping, heroMsg2, heroRead, heroMsg3, heroTime].filter(Boolean);
  let heroPhoneTimers = [];

  const clearHeroPhoneTimers = () => {
    heroPhoneTimers.forEach((timerId) => window.clearTimeout(timerId));
    heroPhoneTimers = [];
  };

  const resetHeroPhoneState = () => {
    heroAnimatedElements.forEach((element) => {
      element.classList.remove("is-visible");
    });
    void heroPhoneWrap.offsetWidth;
  };

  const scheduleHeroPhoneAnimation = () => {
    clearHeroPhoneTimers();
    resetHeroPhoneState();

    const schedule = (delay, callback) => {
      heroPhoneTimers.push(
        window.setTimeout(() => {
          callback();
        }, delay)
      );
    };

    schedule(0, () => {
      heroMsg1?.classList.add("is-visible");
    });

    schedule(800, () => {
      heroTyping?.classList.add("is-visible");
    });

    schedule(2300, () => {
      heroTyping?.classList.remove("is-visible");
      heroMsg2?.classList.add("is-visible");
    });

    schedule(3200, () => {
      heroRead?.classList.add("is-visible");
    });

    schedule(4500, () => {
      heroMsg3?.classList.add("is-visible");
      heroTime?.classList.add("is-visible");
    });

    schedule(7000, () => {
      scheduleHeroPhoneAnimation();
    });
  };

  const startHeroPhoneAnimation = () => {
    scheduleHeroPhoneAnimation();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startHeroPhoneAnimation, { once: true });
  } else {
    startHeroPhoneAnimation();
  }
}

const qualifierForm = document.querySelector("#qualifier-form");

if (qualifierForm) {
  qualifierForm.setAttribute("action", qualifierForm.getAttribute("action") || "https://formspree.io/f/PLACEHOLDER");
  qualifierForm.setAttribute("method", qualifierForm.getAttribute("method") || "POST");
}

// ── Text Echo Live — demo mode toggle ──
// Mode A [data-demo-mode="live"]     — tap-to-text demo line. DEFERRED until the SendBlue
//                                      demo number is funded; the sms: href + display number
//                                      are placeholders (search "SWAP" in the HTML).
// Mode B [data-demo-mode="fallback"] — lead-capture form; James texts back manually. ACTIVE.
// To flip to Mode A: set DEMO_LINE_LIVE = true here AND swap the placeholder number in the HTML.
const DEMO_LINE_LIVE = false;

document.querySelectorAll("[data-demo-mode]").forEach((block) => {
  const isLive = block.dataset.demoMode === "live";
  block.hidden = DEMO_LINE_LIVE ? !isLive : isLive;
});

// ── Text Echo Live — fallback demo-request form(s) ──
// Webhook URL lives in each form's data-webhook attribute. Currently the main FCS webhook
// as a TEMPORARY placeholder — swap to GHL_WEBHOOK_URL_DEMO (dedicated website sub-account
// webhook) once James creates it. The source field keeps these leads distinguishable.
document.querySelectorAll(".echo-demo-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = form.querySelector(".echo-demo-success");
    const errorEl = form.querySelector(".echo-demo-error");
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";
    if (successEl) successEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    const data = {
      phone: form.querySelector('[name="phone"]').value,
      transactional_consent: form.querySelector('[name="transactional_consent"]').checked,
      marketing_consent: form.querySelector('[name="marketing_consent"]').checked,
      source: "FCS Website — Text Echo Demo Request",
    };

    try {
      await fetch(form.dataset.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (successEl) successEl.style.display = "block";
      form.reset();
    } catch (err) {
      if (errorEl) errorEl.style.display = "block";
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
});
