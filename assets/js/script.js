console.dir(window.document);

var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput =  document.querySelector("select[name='task-type']").value;
    //create a list item
    var listItemEl =document.createElement("li");
    listItemEl.className = "task-item";
    
    //create a div to hold everything
    var taskInfoEl = document.createElement("div");
    //give it a class name for css styles
    taskInfoEl.className = "task-info";
    //add html content to div appended data to li
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskNameInput + "</h3><span class= 'task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //appended the entire li to the parent ul 
    tasksToDoEl.appendChild(listItemEl);

    console.dir(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);


