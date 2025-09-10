let input = document.querySelector('.task');
let form = document.getElementById('task-form');
let tasks = document.querySelector('.tasks');

let arrayoftasks = [];

// Load tasks from localStorage
if (localStorage.getItem("tasks")) {
  arrayoftasks = JSON.parse(localStorage.getItem("tasks"));
}
addoldtasks();

// Add task with Enter or Button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    additemtoarray(input.value.trim());
    input.value = "";
  }
});

function additemtoarray(tasktoadd) {
  const task = {
    id: Date.now(),
    title: tasktoadd,
    completed: false
  };

  arrayoftasks.push(task);
  addtaskstopage(arrayoftasks);
  addtaskstolocalstrg(arrayoftasks);
}

function addtaskstopage(tasktoloop) {
  tasks.innerHTML = "";

  if (arrayoftasks.length === 0) {
    tasks.innerHTML = '<p class="text-gray-500 text-center">No tasks yet ✨</p>';
    return;
  }

  arrayoftasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = "flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3 shadow-md hover:bg-gray-700 transition duration-200";
    taskCard.id = task.id.toString();
    document.getElementById('c').appendChild(taskCard);

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = task.title;
    taskText.className = task.completed
      ? "line-through text-gray-500 cursor-pointer flex-1"
      : "text-gray-200 cursor-pointer flex-1";

    taskText.addEventListener("click", () => toggleTask(task.id));
    taskCard.appendChild(taskText);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "text-red-500 hover:text-red-400 transition";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.setAttribute("aria-label", "Delete Task");
    deleteBtn.addEventListener("click", () => delet(task.id));
    taskCard.appendChild(deleteBtn);
  });
}

function addtaskstolocalstrg(array) {
  window.localStorage.setItem('tasks', JSON.stringify(array));
}

function addoldtasks() {
  if (localStorage.getItem("tasks")) {
    addtaskstopage(arrayoftasks);
  }
}

function delet(id) {
  arrayoftasks = arrayoftasks.filter(task => task.id !== id);
  addtaskstopage(arrayoftasks);
  addtaskstolocalstrg(arrayoftasks);
}

function toggleTask(id) {
  const task = arrayoftasks.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  addtaskstopage(arrayoftasks);
  addtaskstolocalstrg(arrayoftasks);
}
