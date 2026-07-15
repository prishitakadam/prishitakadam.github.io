const page = document.body.dataset.page;
const windows = document.querySelectorAll(".window");
const popupRoot = document.querySelector(".pixel-popup");
const popupMessage = document.querySelector(".pixel-popup__message");
const popupCopy = document.querySelector(".pixel-popup__copy");
const popupDismissers = document.querySelectorAll("[data-popup-dismiss]");

const popupMessages = {
  close: {
    title: "This window likes staying open.",
    copy: "Tiny pastel systems are happiest when everything stays neatly in place."
  },
  minimize: {
    title: "Minimized into a cozy pocket.",
    copy: "Pixel OS saved the vibes, but your notes are still right where you left them."
  },
  expand: {
    title: "Maximized for extra sparkle.",
    copy: "More room for infrastructure thoughts, cat energy, and soft little system windows."
  }
};

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page) {
    link.classList.add("is-active");
  }
});

windows.forEach((windowElement, index) => {
  windowElement.style.setProperty("--window-delay", `${index * 45}ms`);
});

document.querySelectorAll(".window__control[data-popup]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!popupRoot || !popupMessage || !popupCopy) {
      return;
    }

    const popupType = control.dataset.popup;
    const popupContent = popupMessages[popupType] || popupMessages.close;

    popupMessage.textContent = popupContent.title;
    popupCopy.textContent = popupContent.copy;
    popupRoot.hidden = false;
    popupRoot.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
  });
});

popupDismissers.forEach((dismissTrigger) => {
  dismissTrigger.addEventListener("click", () => {
    if (!popupRoot) {
      return;
    }

    popupRoot.hidden = true;
    popupRoot.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  });
});

const revealElements = document.querySelectorAll(".section-reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
