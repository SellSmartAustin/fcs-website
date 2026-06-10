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

// ── Analytics shim ──
// No analytics provider is wired yet (James decides GA4 vs Plausible — see handoff note).
// Events flow into window.dataLayer (GA4/GTM-ready) and window.plausible if either ever
// loads, so the provider snippet is a drop-in with zero rework. Events fired today:
//   roi_calc_started, roi_calculate_clicked, roi_gate_viewed, roi_lead_submitted,
//   roi_result_revealed, roi_book_demo_clicked, roi_text_echo_clicked, echo_demo_request_submitted
window.fcsTrack = function (event, props) {
  try {
    (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: event }, props || {}));
    if (typeof window.plausible === "function") window.plausible(event, { props: props || {} });
  } catch (_) {}
};

// ── UTM capture (first touch per session, survives navigation between pages) ──
(function captureUtms() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      if (params.get(k)) utms[k] = params.get(k);
    });
    if (Object.keys(utms).length && !sessionStorage.getItem("fcs_utms")) {
      sessionStorage.setItem("fcs_utms", JSON.stringify(utms));
    }
  } catch (_) {}
})();

window.fcsGetUtms = function () {
  try {
    return JSON.parse(sessionStorage.getItem("fcs_utms") || "{}");
  } catch (_) {
    return {};
  }
};

// ── Phone auto-format: (555) 555-5555 as you type, on any [data-phone-format] input ──
document.querySelectorAll("[data-phone-format]").forEach((input) => {
  input.addEventListener("input", () => {
    let digits = input.value.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);
    let out = digits;
    if (digits.length > 3 && digits.length <= 6) {
      out = "(" + digits.slice(0, 3) + ") " + digits.slice(3);
    } else if (digits.length > 6) {
      out = "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
    }
    input.value = out;
  });
});

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

// ── Text Echo Live — animated iMessage thread (loops while on screen) ──
// Progressive enhancement on [data-echo-thread]: bubbles appear in sequence with a typing
// indicator before each reply, then the loop restarts. Static thread if JS is off or the
// visitor prefers reduced motion. Opacity-only — zero layout shift.
(function animateEchoThreads() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  document.querySelectorAll("[data-echo-thread]").forEach((thread) => {
    const items = Array.from(thread.children);
    if (!items.length) return;

    const typing = document.createElement("div");
    typing.className = "typing-dots echo-thread-typing";
    typing.setAttribute("aria-hidden", "true");
    typing.innerHTML = "<span></span><span></span><span></span>";

    thread.classList.add("echo-anim");
    let timers = [];
    let running = false;

    const clearTimers = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };

    const runSequence = () => {
      clearTimers();
      items.forEach((el) => el.classList.remove("em-on"));
      typing.remove();
      typing.classList.remove("em-on");

      let t = 400;
      items.forEach((el) => {
        if (el.classList.contains("msg-out")) {
          const target = el;
          timers.push(window.setTimeout(() => {
            target.before(typing);
            typing.classList.add("em-on");
          }, t));
          t += 1400;
          timers.push(window.setTimeout(() => {
            typing.classList.remove("em-on");
            typing.remove();
            target.classList.add("em-on");
          }, t));
          t += 900;
        } else {
          const target = el;
          timers.push(window.setTimeout(() => target.classList.add("em-on"), t));
          t += el.classList.contains("msg-in") ? 900 : 600;
        }
      });
      timers.push(window.setTimeout(runSequence, t + 3200));
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !running) {
          running = true;
          runSequence();
        } else if (!entry.isIntersecting && running) {
          running = false;
          clearTimers();
          // leave the full thread visible while off-screen
          items.forEach((el) => el.classList.add("em-on"));
          typing.remove();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(thread);
  });
})();

// ── Text Echo Live — fallback demo-request form(s) ──
// Webhook URL lives in each form's data-webhook attribute. Currently the main FCS webhook
// as a TEMPORARY placeholder — swap to GHL_WEBHOOK_URL_DEMO (dedicated website sub-account
// webhook) once James creates it. The source field keeps these leads distinguishable.
document.querySelectorAll(".echo-demo-form").forEach((form) => {
  let demoSubmitting = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (demoSubmitting) return;

    const btn = form.querySelector('button[type="submit"]');
    const successEl = form.querySelector(".echo-demo-success");
    const errorEl = form.querySelector(".echo-demo-error");
    const phoneInput = form.querySelector('[name="phone"]');
    const honeypot = form.querySelector('[name="company_website"]');
    const originalLabel = btn.textContent;

    if (successEl) successEl.hidden = true;
    if (errorEl) errorEl.hidden = true;

    const phoneDigits = (phoneInput.value || "").replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      if (errorEl) {
        errorEl.textContent = "That phone number doesn’t look complete — please double-check it.";
        errorEl.hidden = false;
      }
      phoneInput.focus();
      return;
    }

    // Honeypot tripped → pretend success, send nothing
    if (honeypot && honeypot.value.trim() !== "") {
      if (successEl) successEl.hidden = false;
      form.reset();
      return;
    }

    demoSubmitting = true;
    btn.disabled = true;
    btn.textContent = "Sending...";

    const data = Object.assign({
      phone: phoneInput.value,
      transactional_consent: form.querySelector('[name="transactional_consent"]').checked,
      marketing_consent: form.querySelector('[name="marketing_consent"]').checked,
      source: "FCS Website — Text Echo Demo Request",
      page: window.location.href,
      referrer: document.referrer || "",
    }, window.fcsGetUtms ? window.fcsGetUtms() : {});

    try {
      const res = await fetch(form.dataset.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("webhook " + res.status);
      if (successEl) successEl.hidden = false;
      if (window.fcsTrack) window.fcsTrack("echo_demo_request_submitted");
      form.reset();
    } catch (err) {
      if (errorEl) {
        errorEl.innerHTML = 'Something went wrong. Please email us at <a href="mailto:james@fullcalendarsystems.com">james@fullcalendarsystems.com</a>';
        errorEl.hidden = false;
      }
    } finally {
      demoSubmitting = false;
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
});
