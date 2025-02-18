// Menu toggle functionality
const menuToggle = document.getElementById("menuToggle");
const navbarNav = document.getElementById("navbarNav");

menuToggle.addEventListener("click", function () {
  const isExpanded = navbarNav.classList.contains("show");
  const menuIcon = document.querySelector(".menu-icon");

  // Toggle menu icon
  if (isExpanded) {
    menuIcon.innerHTML = "&#9776;"; 
  } else {
    menuIcon.innerHTML = "&times;";
  }
});

// Reset menu icon when menu is hidden
navbarNav.addEventListener("hidden.bs.collapse", function () {
  const menuIcon = document.querySelector(".menu-icon");
  menuIcon.innerHTML = "&#9776;"; 
});

// Automatically close the menu when a link is clicked
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: true,
      });
      bsCollapse.hide();
    }
  });
});

// ScrollReveal animation initialization
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: false,
});

sr.reveal("#our-services .mb-4", { delay: 200 });
sr.reveal(".row1", { delay: 400 });
sr.reveal(".row2", { delay: 600 });

const cards = document.querySelectorAll('.glow-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});
