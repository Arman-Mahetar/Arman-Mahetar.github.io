document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  showSplashScreen();
  initObservers();
  observeSplashScreen();
});

function showSplashScreen() {
  const splashScreen = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  if (!sessionStorage.getItem("splashShown")) {
    setTimeout(function () {
      if (splashScreen) splashScreen.style.opacity = "0";
      setTimeout(function () {
        if (splashScreen) splashScreen.style.display = "none";
        if (mainContent) mainContent.style.display = "block";

        // Start animations after splash screen
        startStatAnimation();
        setTimeout(() => {
          initScrollReveal();
        }, 100);
      }, 1000);
    }, 2500);
    sessionStorage.setItem("splashShown", "true");
  } else {
    if (splashScreen) splashScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";

    startStatAnimation();
    initScrollReveal();
    revealAboutImage();
  }
}

var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();

function loadChatbot() {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/67b4a7942247f51906aa70cd/1ikcqt7jm";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
}

function observeSplashScreen() {
  var splashScreen = document.getElementById("splash-screen");

  if (splashScreen) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "style") {
          var style = window.getComputedStyle(splashScreen);
          if (style.display === "none" || style.opacity === "0") {
            loadChatbot();
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(splashScreen, { attributes: true });

    setTimeout(function () {
      if (window.getComputedStyle(splashScreen).display === "none") {
        loadChatbot();
      }
    });
  } else {
    loadChatbot();
  }
}

// Function for About Image Animation (Bottom Reveal)
function revealAboutImage() {
  const sr = ScrollReveal();
  sr.reveal(".aboutimg", {
    origin: "bottom",
    distance: "80px",
    duration: 1000,
    delay: 200,
  });
}

// ScrollReveal animation initialization
function initScrollReveal() {
  const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: false,
  });

  sr.reveal(".about-us-title", { delay: 200 });
  sr.reveal(".about-text", { delay: 400 });
  sr.reveal(".read-more-btn", { delay: 200 });
  sr.reveal("#our-services .mb-4", { delay: 600 });
  sr.reveal(".service-card", { delay: 600 });
  sr.reveal("#servicebtn", { delay: 400 });
  sr.reveal("#project .mb-4", { delay: 200 });
  sr.reveal("#project .mb-5", { delay: 200 });
  sr.reveal(".project-card", { delay: 200 });
  sr.reveal("#clients-words .mb-4", { delay: 200 });
  sr.reveal("#clients-words .mb-5", { delay: 200 });
  sr.reveal(".testimonial-card", { delay: 200 });
  sr.reveal("#faq", { delay: 400 });
  sr.reveal(".contact-us", { delay: 400 });
}

// Navbar Initialization
function initNavbar() {
  const navbarToggle = document.querySelector(".navbar-toggler");
  const navbarMenu = document.querySelector(".navbar-collapse");
  const menuIcon = document.querySelector(".menu-icon");

  if (navbarToggle && navbarMenu && menuIcon) {
    const bsCollapse = new bootstrap.Collapse(navbarMenu, {
      toggle: false,
    });

    // Toggle the menu and update the icon
    navbarToggle.addEventListener("click", function () {
      if (navbarMenu.classList.contains("show")) {
        bsCollapse.hide();
        menuIcon.innerHTML = "&#9776;";
      } else {
        bsCollapse.show();
        menuIcon.innerHTML = "&times;";
      }
    });

    // Listen for Bootstrap collapse events to reset the icon
    navbarMenu.addEventListener("hidden.bs.collapse", function () {
      menuIcon.innerHTML = "&#9776;";
    });

    navbarMenu.addEventListener("shown.bs.collapse", function () {
      menuIcon.innerHTML = "&times;";
    });

    // Automatically close the menu and reset the icon when a link is clicked
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarMenu.classList.contains("show")) {
          bsCollapse.hide();
          menuIcon.innerHTML = "&#9776;";
        }
      });
    });

    // Close the menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        navbarMenu.classList.contains("show") &&
        !navbarMenu.contains(event.target) &&
        !navbarToggle.contains(event.target)
      ) {
        bsCollapse.hide();
        menuIcon.innerHTML = "&#9776;";
      }
    });
  }
}

// Start Stat Animation
function startStatAnimation() {
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }
}

// Stat Numbers Animation
function animateNumbers() {
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const target = +stat.getAttribute("data-target");
    let current = 0;
    const increment = target / 90;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.innerText = Math.ceil(current);
        setTimeout(updateCount, 30);
      } else {
        stat.innerText = target;
      }
    };

    updateCount();
  });
}

// Initialize Observers
function initObservers() {
  const heroSection = document.querySelector(".hero-section");
  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (heroSection && navbar) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navbar.classList.add("navbar-colored");
            navbar.classList.remove("navbar-white");

            if (navbarCollapse) {
              navbarCollapse.classList.add("bg-colored");
              navbarCollapse.classList.remove("bg-white");
            }
          } else {
            navbar.classList.add("navbar-white");
            navbar.classList.remove("navbar-colored");

            if (navbarCollapse) {
              navbarCollapse.classList.add("bg-white");
              navbarCollapse.classList.remove("bg-colored");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroSection);
  }

  startStatAnimation();
}

// Scroll-Based Active Link Logic
document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const offset = document.querySelector("nav").offsetHeight;

  // Special sections that define the "Home" link area
  const homeSections = [
    "hero-section",
    "stats-section",
    "project",
    "faq",
    "clients-words",
  ];

  // ID of sections that should activate the "Contact Us" link
  const contactSections = ["contact-us", "footer"];

  // Function to highlight active link based on scroll position
  function setActiveLink() {
    const scrollPosition = window.scrollY + offset + 1;

    let isHomeActive = false;
    let isContactActive = false;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const link = document.querySelector(`.nav-link[href="#${section.id}"]`);

      // Check if the current scroll position is within the section's boundaries
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (link) {
          link.classList.add("active");
        }
      } else {
        if (link) {
          link.classList.remove("active");
        }
      }

      // Check if the section belongs to "Home"
      if (homeSections.includes(section.id)) {
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          isHomeActive = true;
        }
      }

      // Check if the section belongs to "Contact Us"
      if (contactSections.includes(section.id)) {
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          isContactActive = true;
        }
      }
    });

    // Special handling for "Home" link
    const homeLink = document.querySelector(".home-link");
    if (homeLink) {
      if (isHomeActive) {
        homeLink.classList.add("active");
      } else {
        homeLink.classList.remove("active");
      }
    }

    // Special handling for "Contact Us" link
    const contactLink = document.querySelector(".contact-link");
    if (contactLink) {
      if (isContactActive) {
        contactLink.classList.add("active");
      } else {
        contactLink.classList.remove("active");
      }
    }
  }

  // Smooth scroll on clicking a nav link
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      // Scroll to the section while accounting for navbar offset
      const scrollToPosition = targetSection.offsetTop - offset + 80;

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });

      // Highlight the clicked link immediately
      navbarLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Run on scroll and on page load
  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);
});

// FAQ Toggle Functionality
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });
    item.classList.toggle("active");
  });
});

// JS for EmailJS with Custom Alert
function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    msg: document.getElementById("msg").value,
  };

  emailjs
    .send("service_i6qa9yh", "template_tu8d5ms", parms)
    .then(() => {
      showAlert("Email Sent Successfully!", "success");
    })
    .catch((error) => {
      console.error("Error:", error);
      showAlert("Failed to send email. Please try again.", "error");
    });
}

function showAlert(message, type = "success") {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Create alert box
  const alertBox = document.createElement("div");
  alertBox.className = `custom-alert ${type}`;
  alertBox.textContent = message;

  // Create OK button
  const okButton = document.createElement("button");
  okButton.className = "ok-btn";
  okButton.textContent = "OK";

  // Append OK button to the alert box
  alertBox.appendChild(okButton);

  // Append alert box to the body
  document.body.appendChild(alertBox);

  const form = document.getElementById("contactForm");

  // Event listener for OK button to remove the alert box and overlay
  okButton.addEventListener("click", () => {
    alertBox.remove();
    overlay.remove();
    form.reset();
  });
}

function toggleButtonVisibility() {
  const buttons = document.querySelectorAll(".view-button");

  // Check screen width
  if (window.innerWidth >= 1024) {
    buttons.forEach((button) => {
      button.style.display = "block";
    });
  } else {
    buttons.forEach((button) => {
      button.style.display = "none";
    });
  }
}

// Call the function on page load and when resizing the window
window.addEventListener("load", toggleButtonVisibility);
window.addEventListener("resize", toggleButtonVisibility);

function addLinkToImage() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const image = card.querySelector("img");
    const link = card.querySelector("a.view-button");

    if (window.innerWidth <= 1024) {
      if (!image.parentElement.classList.contains("link-wrapper")) {
        const wrapper = document.createElement("a");
        wrapper.href = link.href;
        wrapper.className = "link-wrapper";
        wrapper.target = "_blank";
        wrapper.appendChild(image.cloneNode(true));
        image.replaceWith(wrapper);
      }
    } else {
      // Remove link wrapping for larger screens
      const wrapper = card.querySelector(".link-wrapper");
      if (wrapper) {
        const originalImage = wrapper.querySelector("img");
        wrapper.replaceWith(originalImage);
      }
    }
  });
}

// Call the function on page load and when resizing the window
window.addEventListener("load", addLinkToImage);
window.addEventListener("resize", addLinkToImage);

const cards = document.querySelectorAll(".glow-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

// Function to check if the Contact Us section is in view (partially or fully)
function isSectionInView(section) {
  const rect = section.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Function to check if the Contact Us section is in view (partially or fully)
function isSectionInView(section) {
  const rect = section.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Select the contact section and WhatsApp button
const contactSection = document.getElementById("contact-us");
const whatsappButton = document.getElementById("whatsappButton");

// Add a scroll event listener to toggle the WhatsApp button
window.addEventListener("scroll", () => {
  if (isSectionInView(contactSection)) {
    whatsappButton.style.display = "flex";
    whatsappButton.style.animation = "slide-down 0.5s ease-out forwards";
  } else {
    whatsappButton.style.display = "none";
    whatsappButton.style.opacity = "0";
  }
});

// Ensure button state is correct on page load
window.addEventListener("load", () => {
  if (isSectionInView(contactSection)) {
    whatsappButton.style.display = "flex";
    whatsappButton.style.animation = "slide-down 0.5s ease-out forwards";
  }
});
