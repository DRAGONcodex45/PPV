document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  /* =========================================
     SMOOTH SCROLL
  ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* =========================================
     HEADER SCROLL STATE
  ========================================= */
  const header = document.querySelector(".site-header");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, {
      passive: true,
    });
  }

  /* =========================================
     CURRENT YEAR
  ========================================= */
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =========================================
     BACK TO TOP
  ========================================= */
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("show", window.scrollY > 500);
    };

    updateBackToTop();

    window.addEventListener("scroll", updateBackToTop, {
      passive: true,
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});