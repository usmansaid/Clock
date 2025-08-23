// Week day lighten
let dayIndex = new Date().getDay()
let week = document.querySelectorAll('.day')
let daysArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

week.forEach(div => {
    if(div.textContent === daysArray[dayIndex]){
        div.classList.add('today')
    }
})


// Time update
let timeDiv = document.querySelector('.time')

setInterval(() => {
    let date = new Date()
    let currentTime = date.toLocaleTimeString()
    timeDiv.textContent = currentTime
}, 1000)


// Date calculation
let dateDiv = document.querySelector('.date')

    let date = new Date().toLocaleDateString('en-GB', {
        day : 'numeric',
        month : 'long',
        year : 'numeric'
    })

    dateDiv.textContent = date



    
// Theme toggle
let isLight = false
function iconsChanger(themeBtnAny){
    if(isLight){
        themeBtnAny.setAttribute('name', 'moon-outline')
        themeBtnAny.style.color = '#343434ff'
    }else{
        themeBtnAny.setAttribute('name', 'sunny-outline')
        themeBtnAny.style.color = '#e3e3e3ff'
    }

}

function applyTheme(){
    body.classList.toggle('light', isLight)

    //main clock
    container.classList.toggle('light', isLight)
    cover.classList.toggle('light', isLight)
    timeDiv.classList.toggle('light', isLight)
    dateDiv.classList.toggle('light', isLight)
    stopWatch.classList.toggle('light', isLight)
    week.forEach(div => div.classList.toggle('light', isLight))

    // Stopwatch container
    stopWatchContainer.classList.toggle('light', isLight);
    cover2.classList.toggle('light', isLight);
    backIcon.classList.toggle('light', isLight);
    stopTimeContainer.classList.toggle('light', isLight);
    buttons.forEach(btn => btn.classList.toggle('light', isLight));
}

function toggleTheme(icon) {
    isLight = !isLight; // flip global state
    iconsChanger(icon); // update clicked icon
    applyTheme();       // update everything
}

let themeBtn = document.querySelector('.icon-1')
let body = document.getElementsByTagName('body')[0]
let container = document.querySelector('.container')
let cover = document.querySelector('.cover')
let stopWatch = document.querySelector('.icon-2')

// Theme toggle for stopwatch container
let themeBtn2 = document.querySelector('.icon-3')
let cover2 = document.querySelector('.cover2')
let backIcon = document.querySelector('.backIcon')
let stopTimeContainer = document.querySelector('.stopWatchTimeContainer')
let buttons = document.querySelectorAll('.btn')


themeBtn.addEventListener('click', () => toggleTheme(themeBtn))
themeBtn2.addEventListener('click', () => toggleTheme(themeBtn2))


// Stopwatch btn
let stopWatchContainer = document.querySelector('.stopWatchContainer')
stopWatch.addEventListener('click', () => {
    container.style.transform = 'translateX(-62.5%) scale(0)'
    stopWatchContainer.style.transform = 'scale(1) translateX(-62.5%)'
})

let back = document.querySelector('.back')
back.addEventListener('click', () => {
    stopWatchContainer.style.transform = 'scale(0) translateX(0)'
    container.style.transform = 'translateX(0) scale(1)'
})


// StopWatch logic
let display = document.querySelector('.stopWatchTimeContainer')
let startBtn = document.querySelector('.start')
let pauseBtn = document.querySelector('.pause')
let resetBtn = document.querySelector('.reset')

let startTime = 0
let elapsedTime = 0
let timerInterval
let isRunning = false

function formatTime(ms){
    let milliseconds = Math.floor(ms % 1000)
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor(ms / (1000 * 60 * 60))

    milliseconds = milliseconds.toString().padStart(3, '0')
    seconds = seconds.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')
    hours = hours.toString().padStart(2, '0')

    return `${hours} : ${minutes} : ${seconds} : ${milliseconds}`
}

function updateDisplay(){
    let currentTime = Date.now() - startTime + elapsedTime
    display.textContent = formatTime(currentTime)
}
startBtn.addEventListener('click', () => {
    if(!isRunning){
        startTime = Date.now()
        timerInterval = setInterval(updateDisplay, 10)
        isRunning = true
    }
})

pauseBtn.addEventListener('click', () => {
    if(isRunning){
        clearInterval(timerInterval)
        elapsedTime += Date.now() - startTime
        isRunning = false
    }
})

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    startTime = 0
    elapsedTime = 0
    isRunning = false
    display.textContent = '00 : 00 : 00 : 000'
})