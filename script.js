const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const chartContainer = document.getElementById("chart-container");
const visibleEmployees = 10; // Liczba pracowników wyświetlanych na wykresie
const shiftAmount = 10; // Liczba pozycji do przesunięcia przy kliknięciu strzałki
const data = {
  Moto: {
    labels: [
      "Jan Kowalski",
      "Anna Nowak",
      "Piotr Wiśniewski",
      "Ewa Wójcik",
      "Tomasz Kowalczyk",
      "Monika Zielińska",
      "Krzysztof Mazur",
      "Agnieszka Woźniak",
      "Andrzej Lewandowski",
      "Zofia Kamińska",
      "Mateusz Nowak",
      "Karolina Wójcik",
      "Patryk Kaczmarek",
      "Katarzyna Nowak",
      "Michał Nowak",
      "Alicja Wójcik",
      "Jakub Kowalczyk",
      "Aleksandra Kowalska",
      "Mikołaj Wiśniewski",
      "Natalia Nowak",
      "Paweł Kowalczyk",
    ],
    scores: [
      12, 19, 3, 5, 2, 3, 10, 8, 6, 7, 13, 9, 8, 15, 11, 7, 6, 18, 10, 14, 16,
    ],
  },
  Home: {
    labels: [
      "Michał Kaczmarek",
      "Natalia Dudek",
      "Grzegorz Kamiński",
      "Katarzyna Jabłońska",
      "Paweł Zieliński",
      "Alicja Kowalska",
      "Maciej Wiśniewski",
      "Joanna Krawczyk",
      "Adam Wróbel",
      "Sylwia Wójcik",
      "Magdalena Nowak",
      "Rafał Kowalczyk",
      "Karolina Zielińska",
      "Piotr Lewandowski",
      "Agnieszka Nowak",
      "Tomasz Nowak",
      "Kamil Wójcik",
      "Marta Kowalczyk",
      "Weronika Kowalska",
      "Kacper Wiśniewski",
      "Monika Nowak",
    ],
    scores: [
      15, 9, 23, 12, 10, 4, 7, 11, 20, 13, 18, 14, 9, 16, 8, 5, 19, 17, 6, 21,
      11,
    ],
  },
  Travel: {
    labels: [
      "Marta Kaczmarek",
      "Wojciech Wiśniewski",
      "Beata Krajewska",
      "Mateusz Zieliński",
      "Marek Nowak",
      "Weronika Nowak",
      "Kamil Kowalczyk",
      "Dominika Kowalska",
      "Tomasz Kowal",
      "Wiktoria Kowalska",
      "Artur Lewandowski",
      "Karolina Wiśniewska",
      "Marcin Nowak",
      "Patrycja Nowak",
      "Filip Zieliński",
    ],
    scores: [10, 14, 9, 6, 15, 8, 13, 17, 5, 11, 12, 8, 15, 10, 6],
  },
  Zdrowie: {
    labels: [
      "Kamil Kowalski",
      "Magdalena Wiśniewska",
      "Bartosz Kowalczyk",
      "Weronika Wiśniewska",
      "Mateusz Kowalczyk",
      "Natalia Kowalska",
      "Damian Nowak",
      "Marcelina Wiśniewska",
      "Tomasz Kaczmarek",
      "Katarzyna Wiśniewska",
      "Sebastian Kowalczyk",
      "Wiktoria Nowak",
      "Bartłomiej Kowalski",
      "Paulina Wiśniewska",
      "Piotr Nowak",
      "Klaudia Kowalczyk",
      "Karol Wiśniewski",
      "Dominika Nowak",
      "Kacper Kowalski",
      "Natalia Wiśniewska",
    ],
    scores: [
      13, 8, 10, 15, 12, 7, 9, 14, 11, 6, 18, 5, 20, 4, 16, 3, 17, 2, 19, 1,
    ],
  },
  OC: {
    labels: [
      "Adam Kowalski",
      "Monika Nowak",
      "Paweł Wiśniewski",
      "Anna Kowalczyk",
      "Tomasz Nowak",
      "Katarzyna Wiśniewska",
      "Marcin Kowalski",
      "Aleksandra Nowak",
      "Michał Kowalczyk",
      "Natalia Wiśniewska",
      "Piotr Nowak",
      "Karolina Kowalska",
      "Łukasz Wiśniewski",
      "Magdalena Nowak",
      "Jakub Kowalski",
      "Ewa Wiśniewska",
      "Marek Nowak",
      "Kamila Kowalczyk",
      "Szymon Wiśniewski",
      "Paulina Nowak",
    ],
    scores: [
      10, 15, 8, 12, 6, 18, 7, 14, 9, 16, 5, 13, 11, 17, 4, 19, 3, 20, 2, 21,
    ],
  },
  // Dodać działy, ew zmienić konsultantów zgodnie z potrzebą (do zrobienia backend - API/CSV? )
};

let startIndex = 0;
let currentDepartment = "Moto";

function showDepartment(department, buttonId) {
  currentDepartment = department;
  startIndex = 0;

  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => button.classList.remove("active"));

  const activeButton = document.getElementById(buttonId);
  activeButton.classList.add("active");
}

function formatLabels(labels) {
  return labels.map((label) => {
    const [firstName, lastName] = label.split(" ");
    return `${firstName}\n${lastName}`;
  });
}

const echartHorizontal = echarts.init(
  document.getElementById("echartHorizontal")
);

function updateHorizontalChart(department) {
  const departmentData = data[department];
  const combinedData = departmentData.labels.map((label, i) => ({
    name: label,
    value: departmentData.scores[i],
  }));

  const sortedData = combinedData.sort((a, b) => b.value - a.value);

  const option = {
    title: {
      left: "center",
      textStyle: { color: "white" },
    },
    xAxis: {
      type: "value",
      max: Math.max(...sortedData.map((d) => d.value)) + 5,
      axisLine: { lineStyle: { color: "white" } },
      axisLabel: { color: "white" },
      show: false,
    },
    yAxis: {
      type: "category",
      data: sortedData.map((d) => d.name),
      inverse: true,
      axisLine: { lineStyle: { width: false } },
      axisLabel: {
        color: "white",
        fontStyle: "normal",
        fontWeight: "bold",
        fontFamily: "monospace",
        fontSize: 18,
      },
    },
    series: [
      {
        type: "bar",
        data: sortedData.map((d) => d.value),
        itemStyle: { color: "rgba(255,67,109,1)" },
        label: { show: true, position: "right", color: "white" },
      },
    ],
    grid: { left: "20%", right: "10%", top: "10%", bottom: "10%" },
  };

  echartHorizontal.setOption(option);
}

// Initialize
updateHorizontalChart(currentDepartment);

// Update when department changes
function showDepartment(department, buttonId) {
  currentDepartment = department;
  startIndex = 0;
  updateHorizontalChart(department); // ECharts

  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => button.classList.remove("active"));
  document.getElementById(buttonId).classList.add("active");
}

showDepartment("Moto", "btn_moto");

// Odtwarzacz
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const volumeSlider = document.querySelector(".volume-slider");

audioPlayer.volume = 0.3;

playButton.addEventListener("click", function () {
  audioPlayer.play();
});

pauseButton.addEventListener("click", function () {
  audioPlayer.pause();
});

stopButton.addEventListener("click", function () {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});
