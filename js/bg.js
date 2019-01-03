const body = document.querySelector("body");

const IMG_NUMBER = 5

function backGroundImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");    
    // image 태그에 bgImage 라는 class를 추가
    body.appendChild(image);
    // body 안에 image 태그 추가 
}

function genRandom(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    // 1부터 5까지 수중에서 랜덤으로 숫자를 하나 생성
    return number;
}

function init(){
    const randomNumber = genRandom();
    backGroundImage(randomNumber);
    // 랜덤으로 숫자를 얻어서 배경화면으로 설정할 파일명을 만든다.
}

init();