// main.js

// ========== Home ==========
// ========== Typewriter ==========
var typed = new Typed(".auto-type", {
  strings: ["Flo Kayser!", "23 years old!", "still studying!", "a Programmer!", "an 3D - Artist!"],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true
})






// navbar

let toggleNavbar = document.querySelector(".toggle-navbar");
let nav = document.querySelector(".nav");

toggleNavbar.onclick = function () {
  nav.classList.toggle("active");
};


// ========== Gallery ==========
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function () {
  let items = document.querySelectorAll('.gallery-item')
  let frontItem = items[2];
  document.querySelector('.gallery-slide').appendChild(items[0])

  let video = frontItem.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.play();
  }
})

prev.addEventListener('click', function () {
  let items = document.querySelectorAll('.gallery-item')
  let frontItem = items[0];
  document.querySelector('.gallery-slide').prepend(items[items.length - 1])

  let video = frontItem.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.play();
  }
})


// ========== Projects ==========
let projectBox = document.querySelectorAll('.project-box');
projectBox.forEach(projectBox => {
  projectBox.onmousemove = function (e) {
    let x = e.pageX - projectBox.offsetLeft;
    let y = e.pageY - projectBox.offsetTop;

    projectBox.style.setProperty('--x', x + 'px');
    projectBox.style.setProperty('--y', y + 'px');
  }
  // Email Js
  const contactForm = document.getElementById("contact-form"),
    contactMessage = document.getElementById("contact-message");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_aru0tga",
        "template_a1hyl64",
        contactForm,
        "mMO3ECnvSBqtJeYH6"
      )
      .then(() => {
        contactMessage.textContent = "Message sent successfully! ";
      });

    setTimeout(() => {
      contactMessage.textContent = "";
    }, 5000);

    contactForm.reset();
  };
  (error) => {
    contactMessage.textContent = "Error sending message. Please try again.";
    console.error("EmailJS Error:", error);
  };
  contactForm.addEventListener("submit", sendEmail);
})

// ========== anchor-behavior ==========
// to prevent history 

function scrollToAnchor(selectedAnchor) {
  document.querySelector(selectedAnchor).scrollIntoView({
      behavior: 'smooth'
  });
}


