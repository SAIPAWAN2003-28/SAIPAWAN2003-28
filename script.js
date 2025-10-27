const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

let tasks = [];

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one to get started! 🚀</div>';
  updateStats();
  return;
  }

  tasks.forEach((task, index) => {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTask(index));

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(index));

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  });

  updateStats();
  }

function addTask() {
const taskText = taskInput.value.trim();

if (taskText === '') {
  alert('Please enter a task!');
return;
}

tasks.push({
text: taskText,
completed: false
});

taskInput.value = '';
taskInput.focus();
renderTasks();
}

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
  renderTasks();
        }

  function deleteTask(index) {
    tasks.splice(index, 1);
  renderTasks();
        }

  addBtn.addEventListener('click', addTask);

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
    addTask();
            }
        });

renderTasks();