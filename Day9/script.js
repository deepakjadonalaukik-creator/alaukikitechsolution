//taskForm taskTitle taskDescription tasklist taskcount emptyState formError
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const formError = document.getElementById("formError");

// load tasks

function loadTasks(){
    try{
        const savedTasks = localStorage.getItem("tasks");

        //tasks phle koi task save nhi h
        if(savedTasks == NULL){
            return[];
        }

        //json string ko js object me convert
        const parsedTasks = JSON.parse(savedTasks);

        //check array
        if(!Array.isArray(parsedTasks)){
            console.error("Saved tasks format invalid");
            return [];
        }

        //structure validation
        return parsedTasks.filter(function(task){
            return(
                task &&
                Number.isSafeInteger(task.id)&&
                task.id>0 &&
                typeof task.title == "string" &&
                typeof task.description =="string" &&
                typeof task.createdAt == "string"
            );
        });
    }catch(error){
        console.error("Tasks not load", error);
        return [];
    }
}

//taks load 
let tasks = loadTasks();

//next tasks id ko existing se aage 
let nextTaskId = tasks.reduce(function (maxId, task){
    return Math.max(maxId, task.id);
},0) +1;


//st2 - tasks ko localstorage me save
function savedTasks(){
    try{
        //json array ko json srting me convert
        const tasksJSON = JSON.stringify(tasks);

        //browser localStorage m save
        localStorage.setItem("tasks", tasksJSON);

        return true;
    }
    catch(error){
        console.log("Tasks save nhi sake", error);

        formError.textContent = "Tasks save nhi ho paye";

        return false;
    }
}

//new tasks add
function addTask(title, description){

    const newTask ={
        id: nextTaskId,
        title: title,
        description: description,
        createdAt: new Date().toLocaleDateString()
    };

    //add in start
    tasks = [newTask, ...tasks];

    //first save the data

    if(savedTasks()){
        nextTaskId++;

        renderTasks();
        return true;
    }
    else{
        //save fail hone pr purani state restore
        tasks = tasks.filter(function (task){
            return task.id !== newTask.id;
        });

        return false;
    }
}

// st 4 : render tasks on page

function renderTasks(){
    const fragment = document.createDocumentFragment();

    tasks.forEach(function (task, index){
        const card = createTaskCard(task, index+1);
        fragment.appendChild(card);
    });

    //latest taks ui me show
    taskList.replaceChildren(fragment);

    //total task count update kro
    taskCount.textContent = tasks.length;

    //empty state sirf tab show ho jab  tasks na ho

    emptyState.hidden = tasks.length !== 0;
}

//st 5 : task card create

function createTaskCard(task, number){

    const card = document.createElement("article");
    card.className= "task-card";

    //card header
    const top = document.createElement("div");
    top.className = "task-card-top";

    const taskNumber = document.createElement("span");
    taskNumber.className = "task-number";
    taskNumber.textContent =`TASK #${number}`;

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = `New Task`;

    top.append(taskNumber, status);

    //task title
    const heading = document.createElement("h3");
    heading.textContent = task.title;

    //task description
    const description = document.createElement("p");

    description.textContent = task.description || "No description provided.";

    //created date

    const date = document.createElement("p");
    date.textContent = `Created: ${task.createdAt}`;

    //card footer
    const footer = document.createElement("div");
    footer.className = "task-card-footer";

    //delete button

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Task";

    deleteButton.dataset.id = task.id;

    deleteButton.setAttribute(
        "aria-label",
        `Delete ${task.title}`
    );
    footer.appendChild(deleteButton);


    //sabhi elements card me add
    card.append(top, heading, description, date, footer);
    return card;
}

//st 6 submission form

taskForm.addEventListener("submit", function (event){
    event.preventDefault();

    const title = taskTitle.value.trim();

    const description = taskDescription.value.trim();

    //validation
    if(!title){
        formError.textContent = "Please enter a task title";

        taskTitle.focus();
        return;
    }

    //task add kro aur save kro

    const success = addTask(title, description);

    //sirf save successful hone par form reset kro
    if(success) {
        taskForm.reset();

        formError.textContent = "";

        taskTitle.focus();
    }
});

//st 7 delete taks
taskList.addEventListener("click", function (event){
    const deleteButton = event.target.closest(".delete-btn");

    //agar delete button pr click nhi hua
    if(!deleteButton || !taskList.contains (deleteButton)){
        return;
    }

    const taskId = Number(deleteButton.dataset.id);

    //existing state preserve kro
    const previousTasks = tasks;

    //selected task remvo kr
    tasks = tasks.filter(function (task){
        return task.id !== taskId;
    });

    //updated tasks save 
    if(savedTasks()){
        renderTasks();
    }else{
        tasks = previousTasks;
    }

});

// st8 : initial render
//render at start when open
renderTasks();