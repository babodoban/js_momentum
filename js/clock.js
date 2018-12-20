const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-clockTitle");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

function init() {
    getTime();
    // 시간을 얻는 함수를 실행 
    setInterval(getTime, 1000);
    // getTime 함수를 1초(1000밀리세컨드) 마다 갱신
}

init();