document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     SERVICE CARD REVEAL
  ========================================================= */

  const serviceCards = document.querySelectorAll(".service-card");

  if (serviceCards.length) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      serviceCards.forEach((card) => {
        card.classList.add("is-visible");
      });
    } else if ("IntersectionObserver" in window) {
      serviceCards.forEach((card, index) => {
        card.style.setProperty(
          "--card-delay",
          `${Math.min(index * 45, 450)}ms`
        );
      });

      const cardObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -30px 0px",
        }
      );

      serviceCards.forEach((card) => {
        cardObserver.observe(card);
      });
    } else {
      serviceCards.forEach((card) => {
        card.classList.add("is-visible");
      });
    }
  }


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  const smoothLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  );

  smoothLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId) return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });


  /* =========================================================
     SERVICE CARD KEYBOARD ACCESSIBILITY
  ========================================================= */

  serviceCards.forEach((card) => {
    const link = card.querySelector("a");

    if (!link) return;

    card.addEventListener("click", (event) => {
      if (
        event.target.closest("a") ||
        event.target.closest("button")
      ) {
        return;
      }

      link.click();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      if (event.target !== card) return;

      event.preventDefault();
      link.click();
    });

    card.setAttribute("tabindex", "0");
  });


  /* =========================================================
     PREVENT BROKEN EMPTY LINKS
  ========================================================= */

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });


  /* =========================================================
     CONTACT STRIP / CTA
  ========================================================= */

  const ctaLinks = document.querySelectorAll(
    ".strip-link, .inquiry-card a"
  );

  ctaLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("is-clicked");

      window.setTimeout(() => {
        link.classList.remove("is-clicked");
      }, 250);
    });
  });


  /* =========================================================
     PAGE LOAD
  ========================================================= */

  document.documentElement.classList.add("service-page-ready");
});