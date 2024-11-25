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
    btnTxt.innerText = "Select";
  } else {
    const selectedTitles = Array.from(checkedItems).map((item) =>
      item.getAttribute("data-title")
    );
    btnTxt.innerText = `${selectedTitles.join(", ")}`;
  }
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
    if (selectedTitles.includes(cardTitle) || selectedTitles.includes("All")) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
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
