

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");

const filterTasks = document.getElementById("filterTasks");
const formError = document.getElementById("formError");
const emptyMessage = document.getElementById("emptyMessage");


// ===== Open and Close Modal =====

function openModal() {
    taskForm.reset();
    formError.textContent = "";
    taskModal.hidden = false;
    taskTitle.focus();
}

function closeTaskModal() {
    taskModal.hidden = true;
    formError.textContent = "";
    addTaskBtn.focus();
}

addTaskBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", closeTaskModal);
cancelBtn.addEventListener("click", closeTaskModal);


// Close modal by clicking outside the form
taskModal.addEventListener("click", function (event) {
    if (event.target === taskModal) {
        closeTaskModal();
    }
});


// Close modal with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !taskModal.hidden) {
        closeTaskModal();
    }
});


// ===== Category Colors =====

function getCategoryClass(category) {
    const categories = {
        Development: "purple",
        JavaScript: "blue",
        Design: "orange",
        Learning: "green",
        Personal: "purple"
    };

    return categories[category] || "purple";
}


// ===== Create Task Card =====

function createTask(title, description, category) {
    const card = document.createElement("article");

    card.className = "task-card";
    card.dataset.status = "pending";

    const top = document.createElement("div");
    top.className = "task-card-top";

    const categoryBadge = document.createElement("span");
    categoryBadge.className =
        "task-category " + getCategoryClass(category);
    categoryBadge.textContent = category;

    const statusBadge = document.createElement("span");
    statusBadge.className = "status pending";
    statusBadge.textContent = "Pending";

    top.append(categoryBadge, statusBadge);

    const heading = document.createElement("h3");
    heading.textContent = title;

    const descriptionText = document.createElement("p");
    descriptionText.className = "task-description";
    descriptionText.textContent = description;

    const footer = document.createElement("div");
    footer.className = "task-footer";

    const date = document.createElement("span");
    date.className = "task-date";
    date.textContent = "📅 " + new Date().toLocaleDateString();

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
    completeButton.textContent = "✓ Complete";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "🗑";
    deleteButton.setAttribute("aria-label", "Delete task");

    actions.append(completeButton, deleteButton);
    footer.append(date, actions);

    card.append(top, heading, descriptionText, footer);

    return card;
}


// ===== Add New Task =====

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const category = taskCategory.value;

    if (!title || !description) {
        formError.textContent =
            "Please enter both a title and description.";
        return;
    }

    const newTask = createTask(title, description, category);

    taskList.prepend(newTask);

    taskForm.reset();
    closeTaskModal();

    updateTaskStats();
    applyTaskFilter();
});


// ===== Complete, Undo and Delete Tasks =====

taskList.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const card = button.closest(".task-card");

    if (!card) {
        return;
    }

    // Complete or undo a task
    if (button.classList.contains("complete-btn")) {
        const statusBadge = card.querySelector(".status");
        const isCompleted = card.dataset.status === "completed";

        if (isCompleted) {
            card.dataset.status = "pending";

            statusBadge.textContent = "Pending";
            statusBadge.className = "status pending";

            button.textContent = "✓ Complete";
            button.classList.remove("undo-btn");
        } else {
            card.dataset.status = "completed";

            statusBadge.textContent = "Completed";
            statusBadge.className = "status completed";

            button.textContent = "↶ Undo";
            button.classList.add("undo-btn");
        }

        updateTaskStats();
        applyTaskFilter();
    }


    // Delete a task
    if (button.classList.contains("delete-btn")) {
        card.remove();

        updateTaskStats();
        applyTaskFilter();
    }
});


// ===== Filter Tasks =====

function applyTaskFilter() {
    const selectedFilter = filterTasks.value;
    const cards = taskList.querySelectorAll(".task-card");

    let visibleTasks = 0;

    cards.forEach(function (card) {
        const matchesFilter =
            selectedFilter === "all" ||
            card.dataset.status === selectedFilter;

        card.hidden = !matchesFilter;

        if (matchesFilter) {
            visibleTasks++;
        }
    });

    emptyMessage.hidden = visibleTasks !== 0;
}

filterTasks.addEventListener("change", applyTaskFilter);


// ===== Update Statistics =====

function updateTaskStats() {
    const cards = taskList.querySelectorAll(".task-card");

    const completedCount = taskList.querySelectorAll(
        '.task-card[data-status="completed"]'
    ).length;

    const pendingCount = cards.length - completedCount;

    document.getElementById("totalTasks").textContent = cards.length;
    document.getElementById("pendingTasks").textContent = pendingCount;
    document.getElementById("completedTasks").textContent = completedCount;
}


// ===== Initialize Dashboard =====

updateTaskStats();
applyTaskFilter();

