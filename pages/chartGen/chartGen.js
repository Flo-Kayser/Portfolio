// Chart-Daten
let chartData = {
  labels: [],
  datasets: [
    {
      label: "Wert",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  ],
};

// Helferfunktionen
// Zufallsgenerator für Farben der jeweiligen Beschriftung
const getRandomColor = (opacity = 0.5) => {
  const randomValue = () => Math.floor(Math.random() * 256);
  return `rgba(${randomValue()}, ${randomValue()}, ${randomValue()}, ${opacity})`;
};

// Reset des copyBtn textes
const setCopyButtonText = (text = "in Zwi.-Abl. kopieren") => {
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) copyBtn.innerText = text;
};

// Reset aller Input Felder
const resetInputFields = (...inputs) => {
  inputs.forEach((input) => (input.value = ""));
};

// Chart erstellen
const createChart = (type, height = 400) => {
  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
  canvasContainer.style.height = `${height}px`;

  const ctx = document.getElementById("myChart").getContext("2d");
  return new Chart(ctx, {
    type,
    data: chartData,
    options: {
      scales: {
        y: { beginAtZero: true },
      },
      onClick: (event, activeElements) => {
        if (activeElements.length > 0) {
          const { datasetIndex, index } = activeElements[0];
          removeData(datasetIndex, index);
        }
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "index", intersect: false },
    },
  });
};

// Chart initialisieren
let myChart = createChart("bar");

// Daten hinzufügen
const addData = () => {
  const labelInput = document.getElementById("labelInput");
  const dataInput = document.getElementById("dataInput");

  if (labelInput.value && dataInput.value) {
    const bgColor = getRandomColor(0.5);
    const borderColor = getRandomColor(1);

    chartData.labels.push(labelInput.value);
    chartData.datasets.forEach((dataset) => {
      dataset.data.push(dataInput.value);
      dataset.backgroundColor.push(bgColor);
      dataset.borderColor.push(borderColor);
    });

    myChart.update();
    resetInputFields(labelInput, dataInput);
    setCopyButtonText();
  }
};

// Chart-Typ aktualisieren
const updateChartType = () => {
  const selectedType = document.getElementById("chartType").value;
  myChart.destroy();
  myChart = createChart(selectedType);
  setCopyButtonText();
};

// Daten entfernen
const removeData = (datasetIndex, index) => {
  if (chartData.labels.length > index) {
    chartData.labels.splice(index, 1);
    chartData.datasets[datasetIndex].data.splice(index, 1);
    chartData.datasets[datasetIndex].backgroundColor.splice(index, 1);
    chartData.datasets[datasetIndex].borderColor.splice(index, 1);
    myChart.update();
    setCopyButtonText();
  }
};

//Cart in Zwischenablage kopieren
const copyChartToClipboard = () => {
  copyCanvasToClipboard("myChart", () => setCopyButtonText("Kopiert"));
};

// Canvas-Inhalt kopieren
const copyCanvasToClipboard = (canvasId, onSuccess) => {
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard
        .write([item])
        .then(onSuccess)
        .catch((err) => console.error("Fehler beim Kopieren: ", err));
    });
  }
};

// Chart herunterladen
const downloadChart = () => {
  downloadCanvas("myChart", "chart.png");
};

// Canvas herunterladen
const downloadCanvas = (canvasId, filename) => {
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

      setCopyButtonText();
    });
  }
};



