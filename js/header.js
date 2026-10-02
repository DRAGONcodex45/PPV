document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".navlinks");

  if (!menu || !nav) return;

  const toggleMenu = () => {
    const isOpen = nav.classList.contains("mobile-open");

    nav.classList.toggle("mobile-open", !isOpen);

    menu.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menu.setAttribute(
      "aria-label",
      isOpen ? "Open menu" : "Close menu"
    );
  };


  // Open / close hamburger
  menu.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleMenu();
  });


  // Close when a navigation link is clicked
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

      menu.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  });


  // Close when clicking outside the navigation
  document.addEventListener("click", (event) => {

    if (
      !nav.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      nav.classList.remove("mobile-open");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

      menu.setAttribute(
        "aria-label",
        "Open menu"
      );
    }

  });


  // Reset menu when returning to desktop
  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

      nav.classList.remove("mobile-open");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

      menu.setAttribute(
        "aria-label",
        "Open menu"
      );

    }

  });

});