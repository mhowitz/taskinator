console.dir(window.document);

var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

/*var addTask = function(){
    window.prompt("enter task");
};*/

var createTaskHandler = function() {
    var listItemEl =document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = /*addTask()*/ "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}
buttonEl.addEventListener("click", createTaskHandler);


/*
var listEl = document.querySelector("task-list");
var taskListEl = document.createElement("li");
taskListEl.textContent = "task 1";
taskListEl.className = "task-item";
listEl.appendChild(taskListEl); */