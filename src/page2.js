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
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("karuzela");
  if (!carousel) return;
  const viewport = carousel.parentElement; // element z overflow-hidden
  const cards = Array.from(carousel.children);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (!prevBtn || !nextBtn || cards.length === 0) return;

  let currentIndex = 0;
  let cardWidth = 0;
  let visibleCount = 1;
  let resizeTimer = null;
  let isDragging = false;
  let startX = 0;

  // pozwól na poziome przesuwanie w JS (unikamy konfliktu z domyślnym scrollowaniem)
  carousel.style.touchAction = "pan-y";
  carousel.style.willChange = "transform";

  function calcSizes() {
    // zabezpieczenie
    if (!cards[0]) return;
    cardWidth = Math.round(cards[0].getBoundingClientRect().width);
    const vw = Math.round(viewport.getBoundingClientRect().width);
    visibleCount = Math.max(1, Math.floor(vw / (cardWidth || vw)));
    // upewnij się, że currentIndex jest w zakresie
    const maxIndex = Math.max(0, cards.length - visibleCount);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    moveTo(currentIndex, false);
    updateButtons();
  }

  function moveTo(index, smooth = true) {
    const maxIndex = Math.max(0, cards.length - visibleCount);
    index = Math.max(0, Math.min(index, maxIndex));
    currentIndex = index;
    const translateX = index * cardWidth;
    if (smooth)
      carousel.style.transition = "transform 400ms cubic-bezier(.2,.8,.2,1)";
    else carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${translateX}px)`;
    updateButtons();
  }

  function updateButtons() {
    const maxIndex = Math.max(0, cards.length - visibleCount);
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    prevBtn.classList.toggle("opacity-50", prevBtn.disabled);
    nextBtn.classList.toggle("opacity-50", nextBtn.disabled);
  }

  prevBtn.addEventListener("click", () => moveTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => moveTo(currentIndex + 1));

  // debounce resize
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(calcSizes, 80);
  });

  // obsługa przeciągania (pointer events)
  carousel.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    carousel.style.transition = "none";
    try {
      carousel.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  carousel.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const base = currentIndex * cardWidth;
    // ogranicz przesuwanie aby nie wysunąć za bardzo (lekko)
    const maxTranslate = cards.length * cardWidth - visibleCount * cardWidth;
    let pos = base - dx;
    if (pos < 0) pos = pos * 0.5;
    if (pos > maxTranslate) pos = base - dx * 0.5;
    carousel.style.transform = `translateX(-${pos}px)`;
  });

  carousel.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - startX;
    // jeśli przesunięcie > 20% szerokości karty — przechodzimy
    if (Math.abs(dx) > cardWidth * 0.2) {
      if (dx < 0) moveTo(currentIndex + 1);
      else moveTo(currentIndex - 1);
    } else {
      moveTo(currentIndex);
    }
    try {
      carousel.releasePointerCapture(e.pointerId);
    } catch (err) {}
  });

  carousel.addEventListener("pointercancel", () => {
    isDragging = false;
    moveTo(currentIndex);
  });

  // init
  // opóźnienie na wypadek gdyby obrazy wpływały na rozmiar kart
  window.setTimeout(calcSizes, 50);
  // oraz ponownie po załadowaniu obrazów
  window.addEventListener("load", calcSizes);
});
