// Sticky navbar
let nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("sticky", window.scrollY > 0)
})

// Responsive navbar
const openMobileNav = document.querySelector(".open-mobile-nav");
const closeMobileNav = document.querySelector(".close-mobile-nav");

openMobileNav.addEventListener("click", () => {
  document.querySelector("header.mobile").style.transform = "translateX(0)";
  document.querySelector("header.mobile").style.width = "100%";
  document.querySelector("header.mobile").style.height = "100vh";
})
closeMobileNav.addEventListener("click", () => {
  document.querySelector("header.mobile").style.width = "0";
  document.querySelector("header.mobile").style.transform = "translateX(-300px)";
})