// main.js

// navbar

let toggleNavbar = document.querySelector(".toggle-navbar");
let nav = document.querySelector(".nav");

toggleNavbar.onclick = function () {
  nav.classList.toggle("active");
};

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


// ========== Projects ==========
let projectBox = document.querySelectorAll('.project-box');
projectBox.forEach(projectBox =>{
  projectBox.onmousemove = function(e){
    let x =e.pageX -projectBox.offsetLeft;
    let y =e.pageY -projectBox.offsetTop;

    projectBox.style.setProperty('--x', x+'px');
    projectBox.style.setProperty('--y', y+'px');
  }
})