console.dir(window.document);

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");


var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput =  document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    //reset form after each submission
    formEl.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    var listItemEl =document.createElement("li");
    listItemEl.className = "task-item";
    
    //create a div to hold everything
    var taskInfoEl = document.createElement("div");
    //give it a class name for css styles
    taskInfoEl.className = "task-info";
    //add html content to div appended data to li
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class= 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //appended the entire li to the parent ul 
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);


