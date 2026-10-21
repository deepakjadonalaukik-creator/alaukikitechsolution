

const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");

const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");

const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("descriptionError");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");


// ===== Open Modal =====

function openModal() {
    taskForm.reset();

    titleError.textContent = "";
    descriptionError.textContent = "";

    taskModal.hidden = false;
    taskModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    taskTitle.focus();
}

addTaskBtn.addEventListener("click", openModal);


// ===== Close Modal =====

function closeModal() {
    taskModal.hidden = true;
    taskModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    titleError.textContent = "";
    descriptionError.textContent = "";

    addTaskBtn.focus();
}

closeModalBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);


// Close when clicking the overlay

taskModal.addEventListener("click", function (event) {
    if (event.target === taskModal) {
        closeModal();
    }
});


// Close when pressing Escape

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !taskModal.hidden) {
        closeModal();
    }
});


// ===== Validate Form =====

function validateForm() {
    let isValid = true;

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    titleError.textContent = "";
    descriptionError.textContent = "";

    if (title === "") {
        titleError.textContent = "Please enter a task title.";
        isValid = false;
    }

    if (description === "") {
        descriptionError.textContent =
            "Please enter a task description.";

        isValid = false;
    }

    return isValid;
}


// ===== Create Task Card =====

function createTaskCard(title, description) {
    const card = document.createElement("article");

    card.className = "task-card";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const descriptionText = document.createElement("p");
    descriptionText.textContent = description;

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = "Pending";

    card.appendChild(heading);
    card.appendChild(descriptionText);
    card.appendChild(status);

    return card;
}


// ===== Save Task =====

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    const newTask = createTaskCard(title, description);

    taskList.appendChild(newTask);

    // Hide empty state after adding the first task
    emptyState.hidden = true;

    updateTaskCount();

    // Close modal and reset the form
    closeModal();
    taskForm.reset();
});


// ===== Update Task Count =====

function updateTaskCount() {
    const totalTasks = taskList.querySelectorAll(".task-card").length;

    taskCount.textContent =
        totalTasks + (totalTasks === 1 ? " task" : " tasks");

}

