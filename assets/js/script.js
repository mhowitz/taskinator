console.dir(window.document);

var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskInput = document.querySelector("input");

var createTaskHandler = function(event) {
    event.preventDefault();
    var listItemEl =document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = taskInput.value;
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);


