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

// Add hover event listener to the images
const images = document.querySelectorAll("#divimg img");

images.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    images.forEach((otherImg) => {
      if (otherImg === img) {
        otherImg.style.width = "70%";
        otherImg.style.zIndex = "10";
        otherImg.style.filter = "brightness(1)";
      } else {
        otherImg.style.width = "15%";
        otherImg.style.zIndex = "0";
        otherImg.style.filter = "brightness(0.6)";
      }
    });
  });

  img.addEventListener("mouseleave", () => {
    images.forEach((img) => {
      img.style.width = "33.33%";
      img.style.zIndex = "0";
      img.style.filter = "brightness(1)";
    });
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
