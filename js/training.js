document.addEventListener("DOMContentLoaded", () => {

    /*
     * ========================================
     * SMOOTH INTERNAL LINKS
     * ========================================
     */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

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

    const revealElements = document.querySelectorAll(
        ".content-flow h2, " +
        ".content-flow h3, " +
        ".module, " +
        ".bonus, " +
        ".case-grid article, " +
        ".testimonial-grid blockquote, " +
        ".faq-list article, " +
        ".plan, " +
        ".payment-card, " +
        ".confirmation > div"
    );


    if ("IntersectionObserver" in window) {

        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });


        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }

});