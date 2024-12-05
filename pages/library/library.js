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
    drops.forEach((drop) => drop.classList.remove("paused"));
    startRain();
    document.getElementById("toggle-rain").innerText = "Pause Animation";
  } else {
    // Pause animation and rain function
    cloud.classList.add("paused");
    drops.forEach((drop) => drop.classList.add("paused"));
    stopRain();
    document.getElementById("toggle-rain").innerText = "Resume Animation";
  }

  isRainPaused = !isRainPaused;
});

startRain();

// card 3 END gif 01
// card 4 gif 02

document
  .getElementById("toggle-circular-border")
  .addEventListener("click", () => {
    const borders = document.querySelectorAll(".gif-v2 span");
    const button = document.getElementById("toggle-circular-border");

    borders.forEach((span) => {
      span.classList.toggle("paused");
    });
    if (button.innerText === "Pause Animation") {
      button.innerText = "Resume ANimation";
    } else {
      button.innerText = "Pause Animation";
    }
  });

// card 7 gif 04 - potter
document.getElementById("toggle-potter").addEventListener("click", () => {
  const bg = document.querySelector(".gif-v4");
  const button = document.getElementById("toggle-potter");

  bg.classList.toggle("paused");

  if (button.innerText === "Pause Animation") {
    button.innerText = "Resume ANimation";
  } else {
    button.innerText = "Pause Animation";
  }
});

// card 8 gif 05 - eyes
document.querySelector("body").addEventListener("mousemove", (event) => {
  const eyes = document.querySelectorAll(".eye");
  eyes.forEach((eye) => {
    let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rotation = radian * (180 / Math.PI) * -1 + 270;

    eye.style.transform = "rotate(" + rotation + "deg)";
  });
});
// card 9 tool 01 - rgb - hex

const changeModeBtn = document.getElementById("change-mode");
const calculateBtn = document.getElementById("calculate-color");
const clearInputBtn = document.getElementById("clear-input");
const colorInput = document.getElementById("color-input");
const returnColor = document.querySelector(".return-color");
let mode = "hex";

clearInputBtn.addEventListener("click", () => {
  colorInput.value = "";
});

changeModeBtn.addEventListener("click", () => {
  mode = mode === "hex" ? "rgb" : "hex";
  if (mode === "hex") {
    colorInput.placeholder = "HEX: eg: #FF0000";
  } else {
    colorInput.placeholder = "RGB: eg: 255, 0, 0";
  }
});

colorInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    mode === "hex" ? hexToRgb() : rgbToHex();
  }
});

calculateBtn.addEventListener("click", () => {
  mode === "hex" ? hexToRgb() : rgbToHex();
});

function hexToRgb() {
  let hex = colorInput.value;

  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }

  if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) {
    returnColor.textContent = "invalid input";
    return;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  returnColor.textContent = `rgb(${r},${g},${b})`;
  return;
}

function rgbToHex() {
  let rgb = colorInput.value;

  rgb = rgb.split("rgb")[1] || rgb;
  rgb = rgb.split("(")[1] || rgb;
  rgb = rgb.split(")")[0] || rgb;

  const rgbArray = rgb.match(/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/);

  if (!rgbArray) {
    returnColor.textContent = "invalid input";
    return;
  }

  const r = parseInt(rgbArray[1]);
  const g = parseInt(rgbArray[2]);
  const b = parseInt(rgbArray[3]);

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    returnColor.textContent = "invalid input";
    return;
  }

  const toHex = (value) => {
    let hex_temp = value.toString(16);
    return hex_temp.length === 1 ? "0" + hex_temp : hex_temp;
  };
  returnColor.textContent = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return;
}

returnColor.addEventListener("click", () => {
  if(returnColor.textContent !=="" && returnColor.textContent !== "invalid input")
  navigator.clipboard.writeText(returnColor.textContent);
});
