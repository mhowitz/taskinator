var taskIdCounter = 0;

console.dir(window.document);

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [

];


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

    var isEdit = formEl.hasAttribute("data-task-id");
    //has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
};

var createTaskEl = function(taskDataObj) {
    var listItemEl =document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute( "data-task-id", taskIdCounter);
    
    //create a div to hold everything
    var taskInfoEl = document.createElement("div");
    //give it a class name for css styles
    taskInfoEl.className = "task-info";
    //add html content to div appended data to li
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class= 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // new var that does shit
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //appended the entire li to the parent ul 
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    //increase task counter for next unique id
    taskIdCounter++;

    saveTasks();
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    
    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create a delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(deleteButtonEl);
    
    //adding select element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(statusSelectEl);

    //array for options in elements section
    var statusChoices = ["To Do", "In Progress", "Completed"];
    //for loop for choosing the status options in select elemtn
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

//function that this shit doesnt explain well
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if tasks [i].id doesnt match the value of taskId,, lets keep that task and push it into a new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;

    saveTasks();
};

//function that edits a task
var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    //get taks list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //get content from name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //these satements enter the ttask name and task type value back in form
    document.querySelector("input[name = 'task-name']").value = taskName;
    document.querySelector("select[name= 'task-type']").value = taskType;
    //enter submit button to save task so user knows its in edit form
    document.querySelector("#save-task").textContent = "Save Task";
    //include task id in edit task function
    formEl.setAttribute("data-task-id", taskId);
};

//complete edit task function!
var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //set new values!
    taskSelected = document.querySelector("h3.task-name").textContent = taskName;
    taskSelected = document.querySelector("span.task-type").textContent= taskType;

    //loop through tasks array and task object with new content:
    for (var i = 0; i<tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    saveTasks();

    alert("task updated!!");
    //reset form by removing task id and changing button back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute('data-task-id');
        console.log("you clicked the delete button.");
        //get the elements task id
        deleteTask(taskId);
    }
}
// task status change function
var taskStausChangeHandler = function(event) {
    //get the task items id
    var taskId = event.target.getAttribute("data-task-id");
    //get the currently selected options value and conver it to lowercase
    var statusValue = event.target.value.toLowerCase();
    //find teh parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
// these if statements move the task to different section when the task selected status is changed
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    };

    //update tasks in task array:
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    //get tasks from localStorage
    tasks = localStorage.getItem("tasks", tasks);
    //convert from string to ojects parse???
    //itereates trhgouth a tasks array and creates task elemetns on page from it
    console.log(tasks);
    if (!tasks) {
        tasks = [];
        return false;
    }
    tasks = JSON.parse(tasks);
    console.log(tasks);

    for (var i = 0; i < tasks.length; i++) {
        //reassigning the id to saved task items
        tasks[i].id = taskIdCounter;
        console.log(tasks[i]);
        //recreating list items 
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id);
        console.log(listItemEl);

        //create div element to store the saved task items

        var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";

        listItemEl.appendChild(taskInfoEl);

        var taskActionsEl = createTaskActions(tasks[i].id);
        listItemEl.appendChild(taskActionsEl);
        console.log(listItemEl);
        //check if task status [i] is equal to to do
        if (tasks[i].status === 'to do') {
            listItemEl.querySelector("select[name = 'status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
        } else if (tasks[i].status === 'in progress') {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);
        } else if (tasks[i].status === 'completed') {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
        }
        taskIdCounter++;

    }

}

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStausChangeHandler);
loadTasks();


