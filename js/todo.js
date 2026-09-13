const addtodo = document.querySelector("#addtodo");
const todolist = document.querySelector('#todolist');
const alltodo = document.querySelector('#alltodo');
const ok = document.querySelector('#ok');
const nocomplet = document.querySelector('#nocomplet');
const todos = [];
const savedTodos = localStorage.getItem('todos');


if (savedTodos) {
  

  
  const parsedTodos = JSON.parse(savedTodos);
  parsedTodos.forEach((todo) => {
    if(todo.text.trim() !== ''){
      todos.push(todo);
      showtodo(todo);
    }
  });
  saveTodo();
};


addtodo.addEventListener("click", () => {
  newtodo();
});

alltodo.addEventListener('click', () => {
  
    todolist.innerHTML = '';
    todos.forEach(todo => {
      showtodo(todo);
    });
  });
 

ok.addEventListener('click', () => {
  const completedTodo = todos.filter(todo => todo.completed );

  todolist.innerHTML = '';

  completedTodo.forEach(todo => {
    showtodo(todo);
  });

});

nocomplet.addEventListener('click', () => {
  const notok = todos.filter(todo => !todo.completed);

  todolist.innerHTML = '';

  notok.forEach(todo => {
    showtodo(todo);
  });
});


function newtodo() {

  const todo = {
    id: Date.now(),
    text: '',
    completed: false,
  };
  todos.push(todo);
  
  showtodo(todo);
  
};

function loadTodos() {

  todos.forEach(todo => {
    showtodo(todo);
  });
};

function showtodo(todo) {

  const li = document.createElement('li');
  
  const todotext = document.createElement('input');
  todotext.type = 'text';

  todotext.value = todo.text;
  if(todo.completed) {
    todotext.classList.add('done');
  };
  todotext.addEventListener('input', () => {
    todo.text = todotext.value;
    saveTodo();
  });



  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;

  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    todotext.classList.toggle('done', checkbox.checked);
    saveTodo();
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const index = todos.findIndex(t => t.id === todo.id);
    todos.splice(index, 1);
    li.remove();
    saveTodo();
  });

  li.prepend(checkbox);
  li.appendChild(todotext);
  li.appendChild(deleteButton);
  todolist.prepend(li);
};  



function saveTodo() {
  localStorage.setItem('todos', JSON.stringify(todos));
};