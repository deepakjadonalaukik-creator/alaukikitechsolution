

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const formError = document.getElementById("formError");


let tasks = [];

let nextTaskId = 1;


// ===== Add New Task =====

function addTask(title, description) {
    const newTask = {
        id: nextTaskId++,
        title: title,
        description: description,
        createdAt: new Date().toLocaleDateString()
    };

    // Update state.
    tasks = [newTask, ...tasks];

    // Update the UI.
    renderTasks();
}


// ===== Render Tasks =====

function renderTasks() {
    // Create a fragment so multiple cards can be added together.
    const fragment = document.createDocumentFragment();

    tasks.forEach(function (task, index) {
        const card = createTaskCard(task, index + 1);
        fragment.appendChild(card);
    });

    // Replace old task elements with the latest state.
    taskList.replaceChildren(fragment);

    // Update the total task count.
    taskCount.textContent = tasks.length;

    // Show empty state only when there are no tasks.
    emptyState.hidden = tasks.length !== 0;
}


// ===== Create One Task Card =====

function createTaskCard(task, number) {
    const card = document.createElement("article");
    card.className = "task-card";

    // Card header
    const top = document.createElement("div");
    top.className = "task-card-top";

    const taskNumber = document.createElement("span");
    taskNumber.className = "task-number";
    taskNumber.textContent = `TASK #${number}`;

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = "New Task";

    top.append(taskNumber, status);

    // Task title
    const heading = document.createElement("h3");
    heading.textContent = task.title;

    // Task description
    const description = document.createElement("p");
    description.textContent = task.description || "No description provided.";

    // Task footer
    const footer = document.createElement("div");
    footer.className = "task-card-footer";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Task";
    deleteButton.dataset.id = task.id;
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

    footer.appendChild(deleteButton);

    // Assemble card
    card.append(top, heading, description, footer);

    return card;
}


// ===== Handle Form Submission =====

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    // Basic validation
    if (!title) {
        formError.textContent = "Please enter a task title.";
        taskTitle.focus();
        return;
    }

    // Add task to state and render it.
    addTask(title, description);

    // Reset the form after successful creation.
    taskForm.reset();
    formError.textContent = "";

    taskTitle.focus();
});


// ===== Delete Task Using Event Delegation =====

taskList.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-btn");

    // Ignore clicks that are not on a delete button.
    if (!deleteButton || !taskList.contains(deleteButton)) {
        return;
    }

    const taskId = Number(deleteButton.dataset.id);

    // Update state by removing the matching task.
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    // Re-render the UI from the updated state.
    renderTasks();
});


// ===== Initial Render =====

renderTasks();

