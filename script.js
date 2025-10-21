let countdownInterval;
let data = {};
let startIndex = 0;
let currentDepartment = "Moto";
let echartHorizontal = echarts.init(
  document.getElementById("echartHorizontal")
);
const terminy = {
  Moto: "2025-10-20T23:59:59",
  Home: "2025-10-21T23:59:59",
  Travel: "2025-10-22T23:59:59",
  Zdrowie: "2025-10-23T23:59:59",
  OC: "2025-10-24T23:59:59",
  Refundacje: "2025-10-25T23:59:59",
  Szyby: "2025-10-26T23:59:59",
  WerZewnętrzna: "2025-10-27T23:59:59",
  WerWewnętrzna: "2025-10-28T23:59:59",
  Wyplaty: "2025-10-29T23:59:59",
};

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    showDepartment(currentDepartment, "btn_moto");
  })
  .catch((error) => console.error("Error loading data:", error));

function showDepartment(department, buttonId) {
  currentDepartment = department;
  startIndex = 0;
  countdownDate = terminy[department];

  if (data[department]) {
    updateHorizontalChart(department);
  }

  startCountdown(countdownDate);

  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => button.classList.remove("active"));
  document.getElementById(buttonId).classList.add("active");
}
function startCountdown(dateString) {
  if (countdownInterval) clearInterval(countdownInterval);

  const countdown = new Date(dateString).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = countdown - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerEl = document.getElementById("countdownTimer");

    if (distance > 0) {
      timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      clearInterval(countdownInterval);
      timerEl.textContent = "Game Over!";
    }
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}
function updateHorizontalChart(department) {
  const departmentData = data[department];
  if (!departmentData || !Array.isArray(departmentData)) return;

  const sortedData = departmentData.slice().sort((a, b) => b.score - a.score);

  const option = {
    title: { show: false },
    xAxis: {
      type: "value",
      max: Math.max(...sortedData.map((d) => d.score)),
      show: false,
    },
    yAxis: {
      type: "category",
      data: sortedData.map((d) => d.name),
      inverse: true,
      axisLabel: {
        color: "white",
        fontStyle: "normal",
        fontWeight: "bold",
        fontFamily: "Terminus Bold",
        fontSize: 18,
      },
    },
    series: [
      {
        type: "bar",
        data: sortedData.map((d) => d.score),
        itemStyle: { color: "rgba(255,67,109,1)" },
        barWidth: "80%",
        label: { show: false, position: "right", color: "white" },
        label: {
          show: true,
          color: "rgba(255,255,255,1)",
          offset: [0, -1],
          fontStyle: "normal",
          fontWeight: "bold",
          fontFamily: "Terminus Bold",
          fontSize: 18,
        },
      },
    ],
    grid: { left: "10%", right: "10%", top: "5%", bottom: "5%" },
  };

  echartHorizontal.setOption(option);
}

document.addEventListener("DOMContentLoaded", function () {
  startCountdown(terminy[currentDepartment]);
});

// Audio player
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const volumeSlider = document.querySelector(".volume-slider");

audioPlayer.volume = 0.3;

playButton.addEventListener("click", () => audioPlayer.play());
pauseButton.addEventListener("click", () => audioPlayer.pause());
stopButton.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});
