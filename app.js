// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear Task Event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Task event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks From LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (tasks) {
    // Create li Element
    const li = document.createElement("li");
    // Adding a Class
    li.className = "collection-item";
    // Create Textnode And Append To li
    li.appendChild(document.createTextNode(tasks));
    // Create New Link Element (a)
    const link = document.createElement("a");
    // Add Class
    link.className = "delete-item secondary-content";
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append The link To li
    li.appendChild(link);
    // Append li To ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task!!!");
  }

  // Create li Element
  const li = document.createElement("li");
  // Adding a Class
  li.className = "collection-item";
  // Create Textnode And Append To li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create New Link Element (a)
  const link = document.createElement("a");
  // Add Class
  link.className = "delete-item secondary-content";
  // Add Icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append The link To li
  li.appendChild(link);
  // Append li To ul
  taskList.appendChild(li);

  // Store to LS(local storage)
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = "";

  e.preventDefault();
}

// Store Tasks
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Karu Kya Delete?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task , index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task (button function)
function clearTasks() {
  // taskList.innerHTML = '';   (this is one way to the clear task function)

  // Another way of putting clear task function (faster)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage(); 
}

// Clear Tasks From Local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
