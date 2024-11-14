// main.js

// navbar

let toggleNavbar = document.querySelector(".toggle-navbar");
let nav = document.querySelector(".nav");

toggleNavbar.onclick = function () {
  nav.classList.toggle("active");
};
