let todoArray = JSON.parse(localStorage.getItem('taskTodo')) || [];   // initialize an empty array


const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const addButton = document.querySelector('.btn');
const todoListScroll = document.querySelector('.scroll');



showTasks(); // show all tasks on sceen 

document.addEventListener('DOMContentLoaded', function () {
  addButton.addEventListener('click', addTask);
  todoInput.addEventListener('keydown', function (enterKey) {
    if (enterKey.key === 'Enter') {
      enterKey.preventDefault();        //   To cancle default Enter key behavior
      addTask();
    }
  });
});

function addTask() {                            // Add data from input box and put it to Array
  const newTask = todoInput.value.trim();
  if (newTask !== '') {
    todoArray.push({
      text: newTask,
      disabled: false,
    });
    pushToLocalStorage();
    todoInput.value = '';

    todoListScroll.scrollTop = 0;
    showTasks();
  }
}

function showTasks() {                         // Show all tasks on sceen
  todoList.innerHTML = '';
  todoArray.forEach((item, index) => {
    const div = document.createElement('div');     // Creat task in htmi Code and Creat Class name (disabled) in div
    div.innerHTML = `
                    <div class="todo-container">
                        <input type="checkbox" class="todo-checkbox" ${item.disabled ? 'checked' : ''}>
                        <div class="todo-container1 ${item.disabled ? 'disabled' : ''}" >${item.text}</div>  
                        <button class="material-symbols-outlined">delete</button>
                    </div>`;
    
    div.querySelector('.todo-checkbox').addEventListener('change', () => toggleTask(index));     // Check if it checked or not

    div.querySelector('button.material-symbols-outlined').addEventListener('click', () => deleteTask(index)); // Check if Delete key is clicked

    const taskList = document.querySelector('#todoList');        // Put the task text to the first place in task list
    taskList.insertBefore(div, taskList.firstChild);
  });
}

function toggleTask(index) {                                    // toggle between true and false
  todoArray[index].disabled = !todoArray[index].disabled;

  pushToLocalStorage();         
  showTasks();
}

function deleteTask(index) {                                       // Function to delete one task
  const todoArray1 = todoArray.slice(0, index);
  const todoArray2 = todoArray.slice(index + 1, todoArray.length);
  todoArray2.forEach(element => todoArray1.push(element));
  todoArray = todoArray1;

  pushToLocalStorage();
  showTasks();
}

function pushToLocalStorage() {                                    // Send task array to Local Storge
  localStorage.setItem('taskTodo', JSON.stringify(todoArray));     // convert array to String format
}
