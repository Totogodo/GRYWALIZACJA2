const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const chartContainer = document.getElementById('chart-container');
const visibleEmployees = 10; // Liczba pracowników wyświetlanych na wykresie
const shiftAmount = 10; // Liczba pozycji do przesunięcia przy kliknięciu strzałki
const data = {
    Moto: {
        labels: ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Ewa Wójcik', 'Tomasz Kowalczyk', 'Monika Zielińska', 'Krzysztof Mazur', 'Agnieszka Woźniak', 'Andrzej Lewandowski', 'Zofia Kamińska', 'Mateusz Nowak', 'Karolina Wójcik', 'Patryk Kaczmarek', 'Katarzyna Nowak', 'Michał Nowak', 'Alicja Wójcik', 'Jakub Kowalczyk', 'Aleksandra Kowalska', 'Mikołaj Wiśniewski', 'Natalia Nowak', 'Paweł Kowalczyk'],
        scores: [12, 19, 3, 5, 2, 3, 10, 8, 6, 7, 13, 9, 8, 15, 11, 7, 6, 18, 10, 14, 16]
    },
    Home: {
        labels: ['Michał Kaczmarek', 'Natalia Dudek', 'Grzegorz Kamiński', 'Katarzyna Jabłońska', 'Paweł Zieliński', 'Alicja Kowalska', 'Maciej Wiśniewski', 'Joanna Krawczyk', 'Adam Wróbel', 'Sylwia Wójcik', 'Magdalena Nowak', 'Rafał Kowalczyk', 'Karolina Zielińska', 'Piotr Lewandowski', 'Agnieszka Nowak', 'Tomasz Nowak', 'Kamil Wójcik', 'Marta Kowalczyk', 'Weronika Kowalska', 'Kacper Wiśniewski', 'Monika Nowak'],
        scores: [15, 9, 23, 12, 10, 4, 7, 11, 20, 13, 18, 14, 9, 16, 8, 5, 19, 17, 6, 21, 11]
    },
    Travel: {
        labels: ['Marta Kaczmarek', 'Wojciech Wiśniewski', 'Beata Krajewska', 'Mateusz Zieliński', 'Marek Nowak', 'Weronika Nowak', 'Kamil Kowalczyk', 'Dominika Kowalska', 'Tomasz Kowal', 'Wiktoria Kowalska', 'Artur Lewandowski', 'Karolina Wiśniewska', 'Marcin Nowak', 'Patrycja Nowak', 'Filip Zieliński'],
        scores: [10, 14, 9, 6, 15, 8, 13, 17, 5, 11, 12, 8, 15, 10, 6]
    },
    Zdrowie: {
        labels: ['Kamil Kowalski', 'Magdalena Wiśniewska', 'Bartosz Kowalczyk', 'Weronika Wiśniewska', 'Mateusz Kowalczyk', 'Natalia Kowalska', 'Damian Nowak', 'Marcelina Wiśniewska', 'Tomasz Kaczmarek', 'Katarzyna Wiśniewska', 'Sebastian Kowalczyk', 'Wiktoria Nowak', 'Bartłomiej Kowalski', 'Paulina Wiśniewska', 'Piotr Nowak', 'Klaudia Kowalczyk', 'Karol Wiśniewski', 'Dominika Nowak', 'Kacper Kowalski', 'Natalia Wiśniewska'],
        scores: [13, 8, 10, 15, 12, 7, 9, 14, 11, 6, 18, 5, 20, 4, 16, 3, 17, 2, 19, 1]
    },
    OC: {
        labels: ['Adam Kowalski', 'Monika Nowak', 'Paweł Wiśniewski', 'Anna Kowalczyk', 'Tomasz Nowak', 'Katarzyna Wiśniewska', 'Marcin Kowalski', 'Aleksandra Nowak', 'Michał Kowalczyk', 'Natalia Wiśniewska', 'Piotr Nowak', 'Karolina Kowalska', 'Łukasz Wiśniewski', 'Magdalena Nowak', 'Jakub Kowalski', 'Ewa Wiśniewska', 'Marek Nowak', 'Kamila Kowalczyk', 'Szymon Wiśniewski', 'Paulina Nowak'],
        scores: [10, 15, 8, 12, 6, 18, 7, 14, 9, 16, 5, 13, 11, 17, 4, 19, 3, 20, 2, 21]
    }
    // Dodać działy, ew zmienić konsultantów zgodnie z potrzebą (do zrobienia backend - API/CSV? )
};

let startIndex = 0; 
let currentDepartment = 'Moto'; 

function updateChart() {
    const department = data[currentDepartment];
    const departmentData = department.labels.map((label, index) => ({
        label,
        score: department.scores[index]
    }));


    const sortedData = departmentData.sort((a, b) => b.score - a.score);
    const visibleData = sortedData.slice(startIndex, startIndex + visibleEmployees);
    const labels = visibleData.map(item => item.label);
    const scores = visibleData.map(item => item.score);
    const formattedLabels = formatLabels(labels);
    barChart.data.labels = formattedLabels;
    barChart.data.datasets[0].data = scores;
    barChart.update();
}

leftArrow.addEventListener('click', () => {
    if (startIndex > 0) {
        startIndex = Math.max(0, startIndex - shiftAmount);
        updateChart();
    }
});

rightArrow.addEventListener('click', () => {
    const maxIndex = data[currentDepartment].labels.length - visibleEmployees;
    if (startIndex < maxIndex) {
        startIndex = Math.min(maxIndex, startIndex + shiftAmount);
        updateChart();
    }
});

function showDepartment(department, buttonId) {
    currentDepartment = department;
    startIndex = 0; 
    updateChart();


    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => button.classList.remove('active'));

    const activeButton = document.getElementById(buttonId);
    activeButton.classList.add('active');
}

function formatLabels(labels) {
    return labels.map(label => {
        const [firstName, lastName] = label.split(' ');
        return `${firstName}\n${lastName}`;
    });
}

const ctx = document.getElementById('barChart').getContext('2d');
let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Punkty',
            data: [],
            backgroundColor: 'rgba(255,67,109,255)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'start',
                formatter: function(value, context) {
                    return value;
                },
                color: 'black',
                font: {
                    weight: 'normal',
                    size: 36, 
                    family: 'Upheaval TT', 
                }
            },
            legend: {
                display: false 
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                drag: {
                    enabled: true,
                    mode: 'x'
                }
            }
        },
        scales: {
            y: {
                grid: {
                    display: false
                },
                beginAtZero: true,
                min: 0, 
                max: 30, 
                ticks: {
                    color: 'white',
                    font: {
                        size: 24, 
                        family: 'Terminus', 
                    }
                }
            },
            x: {
                grid: {
                    display: false 
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 18, 
                        family: 'Terminus',
                    },
                    callback: function(value) {
                        const label = this.getLabelForValue(value);
                        return label.split('\n');
                    }
                }
            }
        },
        barPercentage: 1 
    },
    plugins: [ChartDataLabels]
});


showDepartment('Moto', 'btn_moto');

// Odtwarzacz
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const stopButton = document.querySelector('.stop');
const volumeSlider = document.querySelector('.volume-slider');

audioPlayer.setAttribute('autoplay', "true")
audioPlayer.volume = 0.3;

playButton.addEventListener('click', function() {
    audioPlayer.play();
});

pauseButton.addEventListener('click', function() {
    audioPlayer.pause();
});

stopButton.addEventListener('click', function() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});