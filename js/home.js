document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".navlinks");

  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    menu.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      menu?.setAttribute("aria-expanded", "false");
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const stats = document.querySelector(".stats");
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || statsAnimated) return;
    statsAnimated = true;

    document.querySelectorAll("[data-count]").forEach(el => {
      const target = Number(el.dataset.count);
      const isMoney = el.textContent.includes("$");
      const suffix = el.textContent.includes("+") ? "+" : "";
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 35));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = isMoney
          ? `$${current}M+`
          : `${current.toLocaleString()}${suffix}`;
      }, 35);
    });
  }, { threshold: 0.45 });

  if (stats) statsObserver.observe(stats);

  const founderImage = document.querySelector("#founderImage");
  document.querySelectorAll(".thumbs img").forEach(img => {
    img.addEventListener("click", () => {
      document.querySelectorAll(".thumbs img").forEach(i => i.classList.remove("active"));
      img.classList.add("active");
      founderImage.src = img.dataset.src;
    });
  });

  const modal = document.querySelector("#modal");
  document.querySelector("#playBtn")?.addEventListener("click", () => modal.classList.add("show"));
  document.querySelector("#closeModal")?.addEventListener("click", () => modal.classList.remove("show"));
  modal?.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

  document.addEventListener("visibilitychange", () => {
    const track = document.querySelector(".testimonial-track");
    if (track) track.style.animationPlayState = document.hidden ? "paused" : "running";
  });
});


//form js
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");

    const formData = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    formMessage.textContent = "";
    formMessage.className = "form-message";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          whatsapp: formData.get("whatsapp"),
          message: formData.get("message")
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      formMessage.textContent = "Thanks! Your message has been sent successfully.";
      formMessage.classList.add("success");

      contactForm.reset();

    } catch (error) {
      formMessage.textContent =
        "Sorry, your message could not be sent. Please try again.";
      formMessage.classList.add("error");

      console.error(error);

    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message →";
    }
  });
}
