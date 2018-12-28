const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector(".js-toDoInput");
const toDoList = document.querySelector(".js-toDoList");

const todo_list = 'toDos';

let toDos = [];

function deleteToDo(event){
    const button = event.target;
    const list = button.parentNode;
    toDoList.removeChild(list);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(list.id);
    });
    // filter는 array의 모든 아이템을 통해 함수를 실행하고, ture 값을 가진 아이템들만 가지고 새로운 array를 만든다. 조건이 맞을 경우에만 return을 한다.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(todo_list, JSON.stringify(toDos));
    // JSON.stringify 는 js object를 string으로 바꿔주는 것
}

function showToDo(text){
    // 새로운 요소를 생성하는 것 createElement
    const createList = document.createElement("li");
    const deleteButton = document.createElement("button");
    const toDoText = document.createElement("span");
    // 각각, to do list를 만들 li 정보, 삭제 버튼, 텍스트 영역 <- 이걸 다 만듦
    const newId = toDos.length + 1;
    // id 정보를 arraty의 개수로 적용
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteToDo);
    toDoText.innerText = text;
    // appendChild 부모 하목에 자식으로 생성
    createList.appendChild(deleteButton);
    createList.appendChild(toDoText);
    createList.id = newId;
    toDoList.appendChild(createList);
    const toDoObject = {
        text: text,
        id: newId
    };
    // to do list를 array 형태로 설정
    // 하지만 JS으로는 값을 localStorage에 저장할 수 없었다. json 을 사용해야 할 듯 
    toDos.push(toDoObject);
    // to do list array에 push를 한다.
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    // handleSubmit 에서 일어나는 event (=== submit) 의 기본 동작 설정(제출)을 제거 
    const currentValue = toDoInput.value;
    // 입력받은  to do를 상수로 지정 
    showToDo(currentValue);
    // 입력한 내용을 표시 
    toDoInput.value = "";
    // submit 과 같은 기능
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(todo_list);
    // localStorage 에서 todo_list === toDos 의 value를 가져와서 
    if(loadedToDos !== null){
        // value가 비어있지 않으면
        const parsedToDos = JSON.parse(loadedToDos);
        // JSON.parse 는 string을 object 로 전환하는 것. 
        // 저장할 때 string으로 변경된 것을 다시 object 형태로 만들어서 
        parsedToDos.forEach(function(toDo){
            showToDo(toDo.text);
        });
        // array가 가진 속성 forEach 는 array에 담겨 있는 것들 각각 한번씩 함수 실행 
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();