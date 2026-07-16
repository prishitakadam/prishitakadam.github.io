const page = document.body.dataset.page;
const windows = document.querySelectorAll(".window");
const popupRoot = document.querySelector(".pixel-popup");
const popupMessage = document.querySelector(".pixel-popup__message");
const popupCopy = document.querySelector(".pixel-popup__copy");
const popupDismissers = document.querySelectorAll("[data-popup-dismiss]");
const taskbarApps = document.querySelector("[data-taskbar-apps]");
const taskbarDate = document.querySelector("[data-taskbar-date]");
const taskbarTime = document.querySelector("[data-taskbar-time]");
const taskbarTooltip = document.querySelector("[data-taskbar-tooltip]");

const popupMessages = {
  close: {
    title: "This window likes staying open.",
    copy: "Tiny pastel systems are happiest when everything stays neatly in place."
  },
  minimize: {
    title: "Minimized into a cozy pocket.",
    copy: "Your window is safe, comfy, and exactly where you left it."
  },
  expand: {
    title: "Maximized for extra sparkle.",
    copy: "More room for big ideas, soft pixels, and tiny moments of drama."
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

const updateWindowStacks = () => {
  document.querySelectorAll(".window-stack").forEach((stack) => {
    const openWindows = stack.querySelectorAll(".window:not(.is-minimized)");
    stack.classList.toggle("is-empty", openWindows.length === 0);
  });
};

const updateTaskbarAppSizing = () => {
  if (!taskbarApps) {
    return;
  }

  const appCount = taskbarApps.children.length;
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  let appSize = isMobile ? 34 : 46;

  if (isMobile) {
    if (appCount > 3) {
      appSize = 30;
    }

    if (appCount > 5) {
      appSize = 26;
    }

    if (appCount > 7) {
      appSize = 22;
    }

    if (appCount > 9) {
      appSize = 18;
    }
  } else {
    if (appCount > 8) {
      appSize = 42;
    }

    if (appCount > 12) {
      appSize = 38;
    }

    if (appCount > 16) {
      appSize = 34;
    }

    if (appCount > 20) {
      appSize = 30;
    }
  }

  taskbarApps.style.setProperty("--taskbar-app-size", `${appSize}px`);
};

const restoreWindow = (windowElement, appButton) => {
  windowElement.classList.remove("is-minimized");
  appButton.remove();
  if (taskbarTooltip) {
    taskbarTooltip.hidden = true;
  }
  updateWindowStacks();
  updateTaskbarAppSizing();
};

const hideTaskbarTooltip = () => {
  if (!taskbarTooltip) {
    return;
  }

  taskbarTooltip.hidden = true;
};

const showTaskbarTooltip = (appButton) => {
  if (!taskbarTooltip || !taskbarApps) {
    return;
  }

  const windowName = appButton.dataset.windowName || "window";
  const buttonRect = appButton.getBoundingClientRect();
  const wrapRect = taskbarApps.closest(".pixel-taskbar-wrap")?.getBoundingClientRect();

  taskbarTooltip.textContent = windowName;
  taskbarTooltip.hidden = false;

  if (!wrapRect) {
    return;
  }

  const left = buttonRect.left - wrapRect.left + (buttonRect.width / 2);
  taskbarTooltip.style.left = `${left}px`;
};

const minimizeWindow = (windowElement) => {
  if (!taskbarApps || windowElement.classList.contains("is-minimized")) {
    return;
  }

  const windowName = windowElement.querySelector(".window__bar span")?.textContent?.trim() || "window";
  const appButton = document.createElement("button");
  appButton.type = "button";
  appButton.className = "pixel-taskbar__app";
  appButton.dataset.windowName = windowName;
  appButton.setAttribute("aria-label", `Restore ${windowName}`);
  appButton.addEventListener("click", () => restoreWindow(windowElement, appButton));
  appButton.addEventListener("mouseenter", () => showTaskbarTooltip(appButton));
  appButton.addEventListener("focus", () => showTaskbarTooltip(appButton));
  appButton.addEventListener("mouseleave", hideTaskbarTooltip);
  appButton.addEventListener("blur", hideTaskbarTooltip);

  taskbarApps.append(appButton);
  windowElement.classList.add("is-minimized");
  updateWindowStacks();
  updateTaskbarAppSizing();
};

document.querySelectorAll(".window__control[data-popup]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const popupType = control.dataset.popup;
    const targetWindow = control.closest(".window");

    if (popupType === "minimize" && targetWindow) {
      minimizeWindow(targetWindow);
      return;
    }

    if (!popupRoot || !popupMessage || !popupCopy) {
      return;
    }

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

updateWindowStacks();
updateTaskbarAppSizing();

const updateTaskbarClock = () => {
  if (!taskbarDate || !taskbarTime) {
    return;
  }

  const now = new Date();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short"
  });

  taskbarDate.textContent = dateFormatter.format(now);
  taskbarTime.textContent = timeFormatter.format(now);
};

updateTaskbarClock();
window.setInterval(updateTaskbarClock, 1000);
window.addEventListener("resize", updateTaskbarAppSizing);
window.addEventListener("resize", hideTaskbarTooltip);

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
    {
      threshold: 0.01,
      rootMargin: "0px 0px 18% 0px"
    }
  );

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > 0) {
      element.classList.add("is-visible");
      return;
    }

    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
