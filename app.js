document.addEventListener('DOMContentLoaded', () => loadTasks());

function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => addTaskToList(task));
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (!isTaskDuplicate(tasks, taskText)) {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            addTaskToList(task);

            taskInput.value = '';
        } else {
            alert('Task already exists!');
        }
    }
}

function isTaskDuplicate(tasks, taskText) {
    return tasks.some(task => task.text.toLowerCase() === taskText.toLowerCase());
}

function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    if (task.completed) {
        taskItem.classList.add('completed');
    }

    taskItem.addEventListener('click', () => toggleCompletion(task, taskItem));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task, taskItem));

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function toggleCompletion(task, taskItem) {
    task.completed = !task.completed;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(t => t.text === task.text);
    tasks[index] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskItem.classList.toggle('completed');
}

function deleteTask(task, taskItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(t => t.text === task.text);

    
    tasks.splice(index, 1);

    
    localStorage.setItem('tasks', JSON.stringify(tasks));

   
    taskItem.remove();
}
