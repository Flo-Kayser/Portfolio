// library.js
// selection
const selectBtn = document.querySelector(".select-btn");
const items = document.querySelectorAll(".select-item");
const btnTxt = document.querySelector(".select-btn-txt");

const selectList = document.querySelector(".select-list-items");
const selectContainer = document.querySelector(".select-container");

document.addEventListener("DOMContentLoaded", () => {
  const allItem = document.querySelector("[data-title='All']");
  allItem.classList.add("checked");
  updateButtonText();
  filterCards();
});

// open and close selection
let closeTimeout;
// open/close on click
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});
// close, when mouse leave the area
selectContainer.addEventListener("mouseleave", () => {
  closeTimeout = setTimeout(() => {
    selectBtn.classList.remove("open");
  }, 1000);
});
// reset timer, when mouse enters the area back
selectContainer.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
});
// close, when clicked outside of the area
document.addEventListener("click", (e) => {
  if (!selectContainer.contains(e.target)) {
    clearTimeout(closeTimeout);
    selectBtn.classList.remove("open");
  }
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    const itemTitle = item.getAttribute("data-title");
    if (itemTitle === "All") {
      items.forEach((i) => i.classList.remove("checked"));
      item.classList.add("checked");
    } else {
      const allItem = document.querySelector("[data-title='All']");
      allItem.classList.remove("checked");

      item.classList.toggle("checked");
    }
    updateButtonText();
    filterCards();
  });
});

// func to update the select button text
function updateButtonText() {
  const checkedItems = document.querySelectorAll(".select-item.checked");

  if (checkedItems.length === 0) {
    const allItem = document.querySelector("[data-title='All']");
    allItem.classList.add("checked");
    btnTxt.innerText = "All";
    filterCards(); // Karten aktualisieren, wenn "All" automatisch gesetzt wird
    return;
  }

  const selectedTitles = Array.from(checkedItems).map((item) =>
    item.getAttribute("data-title")
  );
  btnTxt.innerText = `${selectedTitles.join(", ")}`;
}

// func to filter cards by data-title

/*  SLD = slider
    BTN = button
    GIF = animation*/
const cards = document.querySelectorAll(".card");

function filterCards() {
  const selectedItems = document.querySelectorAll(".select-item.checked");
  const selectedTitles = Array.from(selectedItems).map((item) =>
    item.getAttribute("data-title")
  );

  cards.forEach((card) => {
    const cardTitle = card.getAttribute("data-title");

    // Split the cardTitle by commas if it contains multiple values
    const cardTitlesArray = cardTitle.split(",").map((title) => title.trim());

    // Check if any selected title matches a value in cardTitlesArray
    const shouldDisplay = selectedTitles.some(
      (title) => title === "All" || cardTitlesArray.includes(title)
    );

    // Display or hide the card based on the condition
    card.style.display = shouldDisplay ? "flex" : "none";
  });
}

// card 1 - customSliderV1
const cSV1_sliderValue = document.querySelector(
  ".custom-slider-v1 .slider-value span"
);
const cSV1_inputSlider = document.querySelector(
  ".custom-slider-v1 .field input"
);

cSV1_inputSlider.oninput = () => {
  const value = cSV1_inputSlider.value;
  const min = cSV1_inputSlider.min;
  const max = cSV1_inputSlider.max;
  const sliderWidth = cSV1_inputSlider.offsetWidth;
  const thumbWidth = 20;

  const offset =
    ((value - min) / (max - min)) * (sliderWidth - thumbWidth) + thumbWidth / 2;

  cSV1_sliderValue.textContent = value;
  cSV1_sliderValue.style.left = `${offset}px`;
  cSV1_sliderValue.classList.add("show");
};

cSV1_inputSlider.onblur = () => {
  cSV1_sliderValue.classList.remove("show");
};
// card 1 END - customSliderV1

// card 2 - btn 01
const btnV1_menuToggle = document.querySelector(".btn-v1 .menu-toggle");
const btnV1_menu = document.querySelector(".btn-v1");

btnV1_menuToggle.addEventListener("click", () => {
  btnV1_menu.classList.toggle("active");
});
// card 2 END - btn 01
// card 3 - gif 01

let intervalId; // To store the interval ID
let isRainPaused = false; // Track if animations are paused

function rain() {
  let cloud = document.querySelector(".gif-v1 .cloud");
  let e = document.createElement("div");
  let left = Math.floor(Math.random() * 150);
  let width = Math.random() * 2.5;
  let height = Math.random() * 25;
  let duration = Math.random() * 0.25;

  e.classList.add("drop");
  cloud.appendChild(e);
  e.style.left = left + "px";
  e.style.width = 0.5 + width + "px";
  e.style.height = 0.5 + height + "px";
  e.style.animationDuration = 1 + duration + "s";

  setTimeout(() => {
    cloud.removeChild(e);
  }, 2000);
}

function startRain() {
  intervalId = setInterval(() => {
    rain();
  }, 20);
}

function stopRain() {
  clearInterval(intervalId);
}


document.getElementById("toggle-rain").addEventListener("click", () => {
  const cloud = document.querySelector(".gif-v1 .cloud");
  const drops = document.querySelectorAll(".gif-v1 .cloud .drop");

  if (isRainPaused) {
    // Resume animation and rain function
    cloud.classList.remove("paused");
    drops.forEach(drop => drop.classList.remove("paused"));
    startRain();
    document.getElementById("toggle-rain").innerText = "Pause Animation";
  } else {
    // Pause animation and rain function
    cloud.classList.add("paused");
    drops.forEach(drop => drop.classList.add("paused"));
    stopRain();
    document.getElementById("toggle-rain").innerText = "Resume Animation";
  }

  isRainPaused = !isRainPaused;
});


startRain();

// card 3 END gif 01
// card 4 gif 02

document.getElementById("toggle-circular-border").addEventListener("click", ()=>{
  const borders= document.querySelectorAll(".gif-v2 span");
  borders.forEach(span =>{
    span.classList.toggle("paused")
  })
})