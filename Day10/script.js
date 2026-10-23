//1. storage keys

const TASKS_KEY = "taskflow_tasks";
const SESSION_KEY = "taskflow_session";

//2. Dom elements

const loginScreen = document.getElementById("loginScreen");
const dashboardScreen = document.getElementById("dashboardScreen");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");

const displayUsername = document.getElementById("displayUsername");
const logoutBtn = document.getElementById("logoutBtn");

const taskForm = document.getElementById(taskForm);
const taskTitleInput = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalTasksElement = document.getElementById("totalTasks");
const pendingTasksElement = document.getElementById("pendingTasks");
const completedTasksElement = document.getElementById("completedTasks");


//3.application state
let currentUser = null;
let tasks =[];


