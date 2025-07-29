import "./style.css";
const toggleBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
let isOpen = false;

// Toggle the mobile menu on button click
toggleBtn.addEventListener("click", () => {
  if (isOpen) {
    mobileMenu.classList.remove("max-h-screen", "menu-open");
    mobileMenu.classList.add("max-h-0");
    isOpen = false;
  } else {
    mobileMenu.classList.remove("max-h-0");
    mobileMenu.classList.add("max-h-screen", "menu-open");
    isOpen = true;
  }
});

// Update the mobile menu size on window resize
function updateSize() {
  if (isOpen && window.innerWidth >= 1024) {
    mobileMenu.classList.remove("max-h-screen", "menu-open");
    mobileMenu.classList.add("max-h-0");
    isOpen = false;
  }
}
window.addEventListener("resize", updateSize);

//toggle the mobile menu on click outside
const menuLinks = document.querySelectorAll("#mobileMenu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("max-h-screen", "menu-open");
    mobileMenu.classList.add("max-h-0");
    isOpen = false;
  });
});
