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
//   roi_result_revealed, roi_book_demo_clicked, roi_text_echo_clicked, echo_demo_request_submitted,
//   echo_demo_unlocked
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
// Mode A [data-demo-mode="live"]     — tap-to-text demo line (SendBlue 512-468-5443, real number
//                                      already in the HTML). Active after the SendBlue website-demo
//                                      Echo tenant migration.
// Mode B [data-demo-mode="fallback"] — lead-capture form; James texts back manually.
// LIVE 2026-06-13: flipped to Mode A after full E2E (incl. Spanish) of the website-demo Echo tenant passed.
const DEMO_LINE_LIVE = true;

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

// ── Text Echo Live — demo forms (gate + fallback) ──
// Webhook URL lives in each form's data-webhook attribute. These leads post to the MAIN FCS
// GHL account ON PURPOSE (James 2026-06-17) — he follows up on everyone who tested the line;
// the website-demo sub-account is throwaway. A GHL workflow on this inbound webhook tags them
// as a website text-line webform lead and, ~20-30 min later, has FCS Echo text to ask about
// the demo + book a real one. The source field (set below) distinguishes these in reporting.
//
// Two flavors share this handler:
//   • Gate form  [data-demo-gate, data-unlocks="#sel"] — name/email/phone filter in front of the
//     live-line chips (James 2026-06-17). On success it hides itself and REVEALS the chip block,
//     then remembers the unlock in localStorage so a returning visitor skips straight to the chips.
//   • Fallback form (Mode B) — phone-only; shows the "keep an eye on your texts" success note.
const DEMO_UNLOCK_KEY = "fcs_demo_unlocked";

function revealDemoChips(form) {
  const target = form.dataset.unlocks && document.querySelector(form.dataset.unlocks);
  if (!target) return;
  form.hidden = true;
  target.hidden = false;
  const firstChip = target.querySelector(".echo-demo-chip");
  if (firstChip) firstChip.focus({ preventScroll: true });
}

// Returning visitor who already unlocked: skip the gate, show the chips immediately.
document.querySelectorAll("[data-demo-gate]").forEach((form) => {
  let unlocked = false;
  try { unlocked = localStorage.getItem(DEMO_UNLOCK_KEY) === "1"; } catch (e) { /* private mode */ }
  if (unlocked) revealDemoChips(form);
});

document.querySelectorAll(".echo-demo-form").forEach((form) => {
  let demoSubmitting = false;
  const isGate = form.hasAttribute("data-demo-gate");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (demoSubmitting) return;

    const btn = form.querySelector('button[type="submit"]');
    const successEl = form.querySelector(".echo-demo-success");
    const errorEl = form.querySelector(".echo-demo-error");
    const phoneInput = form.querySelector('[name="phone"]');
    const firstInput = form.querySelector('[name="first_name"]');
    const lastInput = form.querySelector('[name="last_name"]');
    const emailInput = form.querySelector('[name="email"]');
    const honeypot = form.querySelector('[name="company_website"]');
    const originalLabel = btn.textContent;

    const showError = (msg, focusEl) => {
      if (errorEl) { errorEl.textContent = msg; errorEl.hidden = false; }
      if (focusEl) focusEl.focus();
    };

    if (successEl) successEl.hidden = true;
    if (errorEl) errorEl.hidden = true;

    // Gate requires first + last name and a valid-looking email before phone.
    if (isGate) {
      if (firstInput && !firstInput.value.trim()) return showError("Please enter your first name.", firstInput);
      if (lastInput && !lastInput.value.trim()) return showError("Please enter your last name.", lastInput);
      const email = emailInput ? emailInput.value.trim() : "";
      if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return showError("Please enter a valid email address.", emailInput);
      }
    }

    const phoneDigits = (phoneInput.value || "").replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return showError("That phone number doesn’t look complete — please double-check it.", phoneInput);
    }

    // Honeypot tripped → pretend success, send nothing.
    if (honeypot && honeypot.value.trim() !== "") {
      if (isGate) revealDemoChips(form);
      else if (successEl) { successEl.hidden = false; form.reset(); }
      return;
    }

    demoSubmitting = true;
    btn.disabled = true;
    btn.textContent = isGate ? "Unlocking..." : "Sending...";

    const consentEl = form.querySelector('[name="transactional_consent"]');
    const marketingEl = form.querySelector('[name="marketing_consent"]');
    const data = Object.assign({
      first_name: firstInput ? firstInput.value.trim() : "",
      last_name: lastInput ? lastInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      phone: phoneInput.value,
      transactional_consent: consentEl ? consentEl.checked : false,
      marketing_consent: marketingEl ? marketingEl.checked : false,
      source: isGate ? "FCS Website — Live Demo Unlock" : "FCS Website — Text Echo Demo Request",
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
      if (isGate) {
        try { localStorage.setItem(DEMO_UNLOCK_KEY, "1"); } catch (e) { /* private mode */ }
        if (window.fcsTrack) window.fcsTrack("echo_demo_unlocked");
        revealDemoChips(form);
      } else {
        if (successEl) successEl.hidden = false;
        if (window.fcsTrack) window.fcsTrack("echo_demo_request_submitted");
        form.reset();
      }
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
