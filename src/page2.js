import "./style.css";
const toggleBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileIcon = document.getElementById("menuIcon");
const header = document.getElementById("mainHeader");

let isOpen = false;

// Toggle the mobile menu on button click
toggleBtn.addEventListener("click", () => {
  if (isOpen) {
    mobileMenu.classList.remove("max-h-screen", "menu-open");
    mobileMenu.classList.add("max-h-0");
    mobileIcon.classList.remove("fa-xmark");
    mobileIcon.classList.add("fa-bars");
    menuToggle.classList.toggle("open");
    header.classList.remove("fixed", "top-0", "left-0", "right-0");
    isOpen = false;
  } else {
    mobileMenu.classList.remove("max-h-0");
    menuToggle.classList.toggle("open");
    mobileMenu.classList.add("max-h-screen", "menu-open");
    mobileIcon.classList.remove("fa-bars");
    mobileIcon.classList.add("fa-xmark");
    header.classList.add("fixed", "top-0", "left-0", "right-0");
    isOpen = true;
  }
});

// Update the mobile menu size on window resize
function updateSize() {
  if (isOpen && window.innerWidth >= 1024) {
    mobileMenu.classList.remove("max-h-screen", "menu-open");
    mobileMenu.classList.add("max-h-0");
    mobileIcon.classList.remove("fa-xmark");
    mobileIcon.classList.add("fa-bars");
    menuToggle.classList.toggle("open");
    header.classList.remove("fixed", "top-0", "left-0", "right-0");
    isOpen = false;
  }
}
window.addEventListener("resize", updateSize);

//toggle the mobile menu on click outside
const menuLinks = document.querySelectorAll("#mobileMenu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("max-h-screen", "menu-open");
    menuToggle.classList.toggle("open");
    mobileMenu.classList.add("max-h-0");
    mobileIcon.classList.remove("fa-xmark");
    mobileIcon.classList.add("fa-bars");
    header.classList.remove("fixed", "top-0", "left-0", "right-0");
    isOpen = false;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".fade-in-right, .fade-in-left, .fade-in-down, .fade-in-up, .fade-in-1, .fade-in-2, .fade-in-3, .fade-in-4, .fade-in-offer-1, .fade-in-offer-2, .fade-in-offer-3, .fade-in-offer-4"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((el) => observer.observe(el));
});
document.getElementById("copyRightYear").textContent = new Date().getFullYear();

const wiecejBtn = document.getElementById("wiecejButton");
const dropdown = document.getElementById("dropdownMenu");

wiecejBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !wiecejBtn.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

const dropdownLinks = dropdown.querySelectorAll("a");
dropdownLinks.forEach((link) => {
  link.addEventListener("click", () => {
    dropdown.classList.add("hidden");
  });
});
//carousel interactions
const carousel = document.getElementById("karuzela");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const totalItems = carousel.children.length;
let itemsPerView = getItemsPerView();

function getItemsPerView() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

window.addEventListener("resize", () => {
  itemsPerView = getItemsPerView();
  if (currentIndex > totalItems - itemsPerView) {
    currentIndex = totalItems - itemsPerView;
  }
  carousel.style.transform = `translateX(-${
    currentIndex * (100 / itemsPerView)
  }%)`;
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalItems - itemsPerView) {
    currentIndex++;
    carousel.style.transform = `translateX(-${
      currentIndex * (100 / itemsPerView)
    }%)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    carousel.style.transform = `translateX(-${
      currentIndex * (100 / itemsPerView)
    }%)`;
  }
});
