document.addEventListener("DOMContentLoaded", () => {

  /*
   * ========================================
   * SMOOTH SCROLLING
   * ========================================
   */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /*
   * ========================================
   * SCROLL REVEAL
   * ========================================
   */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observerInstance.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }


  /*
   * ========================================
   * EXTERNAL LINKS
   * ========================================
   */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  });

});