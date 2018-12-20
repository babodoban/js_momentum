const nameForm = document.querySelector(".js-nameForm");
const nameInput = nameForm.querySelector(".js-nameInput");
const nameGreeting = document.querySelector(".js-nameGreeting");

// localStorage.setItem(key, value); 정보 저장 
// localStorage.getItem(key, value); 정보 가져오기 

const user_local = "currentUser";
// 사용자 이름 가져오기 
const showing_class = "nameShowing";
// 조건에 따로 보여줄 것과 아닌 것의 구분을 class 로 적용

function saveName(text){
    localStorage.setItem(user_local, text);
}

function handleSubmit(event){
    event.preventDefault();
    // handleSubmit 에서 일어나는 event (=== submit) 의 기본 동작 설정(제출)을 제거 
    const currentValue = nameInput.value;
    // 입력받은 이름을 상수로 지정     
    showGreeting(currentValue);
    // 지정한 값을 인사말에 포함해서 표시 = showGreeting function의 역할    
    saveName(currentValue);
    // 그리고 그 값을 localStorage에 "user_local" 이라는 key의 value로 저장 = saveName function 의 역할
}

function getName() {
    nameForm.classList.add(showing_class);
    nameForm.addEventListener("submit", handleSubmit);
}

// currentUser 정보가 없을 경우에 이름 입력을 받기 위해 form 을 노출되도록 class 추가

function showGreeting(text) {
    nameForm.classList.remove(showing_class);
    nameGreeting.classList.add(showing_class);
    nameGreeting.innerText = `Hello, ${text}`;
}

// currentUser 정보가 있으면 인사말을 노출하도록 class 추가하고, form은 노출도지 않도록 class 삭제
// 그리고 currentUser 정보를 인사말에 포함해서 출력 

function loadName(){
    const currentUser = localStorage.getItem(user_local);
    if(currentUser === null){
        // 사용자 이름이 없는 경우
        getName();
    } else {
        // 사용자 이름이 있을 경우
        showGreeting(currentUser);
        // currentUser 정보가 text 정보로 전달
    }
}

function init(){
    loadName();
}

init();