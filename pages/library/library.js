// library.js

// card 1 - customSliderV1
// Slider-Elemente auswählen
const cSV1_sliderValue = document.querySelector(".custom-slider-v1 .slider-value span");
const cSV1_inputSlider = document.querySelector(".custom-slider-v1 .field input");

// Event für Slider-Eingabe
cSV1_inputSlider.oninput = () => {
    const value = cSV1_inputSlider.value; // Aktueller Wert des Sliders
    const min = cSV1_inputSlider.min;
    const max = cSV1_inputSlider.max;
    const sliderWidth = cSV1_inputSlider.offsetWidth;
    const thumbWidth = 20;

    const offset = ((value - min) / (max - min)) * (sliderWidth - thumbWidth) + (thumbWidth / 2);

    // Werte aktualisieren
    cSV1_sliderValue.textContent = value;
    cSV1_sliderValue.style.left = `${offset}px`;
    cSV1_sliderValue.classList.add("show");
};

// Event für Blur (wenn der Fokus den Slider verlässt)
cSV1_inputSlider.onblur = () => {
    cSV1_sliderValue.classList.remove("show");
};
