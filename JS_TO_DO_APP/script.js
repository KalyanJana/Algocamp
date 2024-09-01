//This function will load the todos from the browser
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  return todos;
}

function refreshTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToLocalStorage(todo) {
  const todos = loadTodos();
  todos.todoList.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function executeFilterAction(event) {
  const todoList = document.getElementById("todoList");
  const element = event.target;
  const value = element.getAttribute("data-filter");
  todoList.innerHTML = "";
  let todos = loadTodos();
  if (todos.todoList.length === 0) {
    showBankTodoText();
    return
  }
  if (value === "all") {
    todos.todoList.forEach((todo) => {
      appendTodoHTML(todo);
    });
  } else if (value === "pending") {
      const pendingTodos = todos.todoList.filter((todo) => todo.isCompleted !== true);
      if (pendingTodos.length === 0) {
        showBankTodoText();
      }else{
        pendingTodos.forEach((todo) => {
          appendTodoHTML(todo);
        });
      }
  } else {
      const completedTodos = todos.todoList.filter((todo) => todo.isCompleted === true);
      if (completedTodos.length === 0) {
        showBankTodoText();
      }else{
        completedTodos.forEach((todo) => {
          appendTodoHTML(todo);
        });
      }
  }
}

function appendTodoHTML(todo) {
  const todoList = document.getElementById("todoList");

  const todoItem = document.createElement("li");
  todoItem.classList.add("todoItem");
  todoItem.setAttribute("data-id", todo.id);

  //first child div of li element
  const textDiv = document.createElement("div");
  textDiv.textContent = todo.text;
  if (todo.isCompleted) {
    textDiv.classList.add("completed");
  }

  //second child div of li element
  const wrapper = document.createElement("div");
  wrapper.classList.add("todoButtons");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");
  editBtn.addEventListener("click", editTodo);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", deleteTodo);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = todo.isCompleted ? "Reset" : "Completed";
  completeBtn.classList.add("completeBtn");
  completeBtn.addEventListener("click", completeTodo);

  wrapper.appendChild(editBtn);
  wrapper.appendChild(deleteBtn);
  wrapper.appendChild(completeBtn);

  todoItem.appendChild(textDiv);
  todoItem.appendChild(wrapper);

  todoList.appendChild(todoItem);
}

function resetHtmlTodos(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  todos.todoList.forEach((todo) => {
    appendTodoHTML(todo);
  });
}

function completeTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoId = Number(todoItem.getAttribute("data-id")); //here id type is string
  // console.log("type of id", typeof todoId);
  const todos = loadTodos();
  todos.todoList.forEach((todo) => {
    if (todo.id === todoId) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  refreshTodos(todos);
  resetHtmlTodos(todos);
}

function deleteTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoId = Number(todoItem.getAttribute("data-id"));
  let todos = loadTodos();
  todos.todoList = todos.todoList.filter((todo) => todo.id !== todoId);
  refreshTodos(todos);
  resetHtmlTodos(todos);
  if(todos.todoList.length === 0){
    showBankTodoText()
  }
}

function editTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoId = Number(todoItem.getAttribute("data-id"));
  let todos = loadTodos();
  const response = prompt("What is the new todo value you want to set? ");
  if (response.trim() == "") return;
  todos.todoList.forEach((todo) => {
    if (todo.id === todoId) {
      todo.text = response;
    }
  });
  refreshTodos(todos);
  resetHtmlTodos(todos);
}

//this will ensure unique id even after deleting todo items.
function createLiId() {
  const todo = loadTodos();
  const nextId = todo.todoList.reduce((acc, current) => {
    if (current.id > acc) {
      acc = current.id;
    }
    return acc + 1;
  }, 0);

  return nextId;
}

function addNewTodo(event) {
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value;

  if (todoText === "") {
    alert("Please write something from the todo");
  } else {
    todos = loadTodos();

    if(todos.todoList.length === 0){
      const todoList = document.getElementById("todoList");
      todoList.innerHTML =''
    }
    // const id = todos.todoList.length;
    const id = createLiId();
    addTodoToLocalStorage({ text: todoText, isCompleted: false, id });
    appendTodoHTML({ text: todoText, isCompleted: false, id });
    todoInput.value = "";
  }
}

function showBankTodoText() {
  console.log("calling blank todo")
  const todoList = document.getElementById("todoList");
  const blankLi = document.createElement("li");
  blankLi.classList.add('todoItem')

  const blankText = document.createElement("p");
  blankText.textContent = "No Todo list is present!";

  blankLi.appendChild(blankText);
  todoList.appendChild(blankLi);
}

document.addEventListener("DOMContentLoaded", () => {
  //Adding event listener in filtered button
  const filterBtns = document.getElementsByClassName("filterBtn");
  for (const btn of filterBtns) {
    btn.addEventListener("click", executeFilterAction);
  }

  //Adding event listener in Add todo button
  const submitButton = document.getElementById("addTodo");
  submitButton.addEventListener("click", addNewTodo);

  //Loading local storage todo lists
  let todos = loadTodos();
  if (todos.todoList.length === 0) {
    showBankTodoText();
  }
  todos.todoList.forEach((todo) => {
    appendTodoHTML(todo);
  });

  document.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
      addNewTodo();
    }
  });
});

console.log("JS loaded");
