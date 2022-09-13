// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear Task Event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Task event
  filter.addEventListener("keyup", filterTasks);
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

  // Clear Input
  taskInput.value = "";

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Karu Kya Delete?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear Task (button function)
function clearTasks() {
  // taskList.innerHTML = '';   (this is one way to the clear task function)

  // Another way of putting clear task function (faster)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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