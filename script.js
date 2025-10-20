let data = {};
let startIndex = 0;
let currentDepartment = "Moto";
let echartHorizontal = echarts.init(
  document.getElementById("echartHorizontal")
);

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

  if (data[department]) {
    updateHorizontalChart(department);
  }

  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => button.classList.remove("active"));
  document.getElementById(buttonId).classList.add("active");
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

        // showBackground: true,
      },
    ],
    grid: { left: "10%", right: "10%", top: "5%", bottom: "5%" },
  };

  echartHorizontal.setOption(option);
}

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
