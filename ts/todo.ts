const addtodo = document.querySelector<HTMLButtonElement>("#addtodo")!;
const todolist = document.querySelector<HTMLUListElement>('#todolist')!;
const alltodo = document.querySelector<HTMLButtonElement>('#alltodo')!;
const ok = document.querySelector<HTMLButtonElement>('#ok')!;
const nocomplet = document.querySelector<HTMLButtonElement>('#nocomplet')!;

type Todos = {
  id:Number;
  text:string;
  completed: boolean;
};
const todos: Todos[] = [];
const savedTodos = localStorage.getItem('todos');


if (savedTodos) {
  

  
  const parsedTodos = JSON.parse(savedTodos);
  parsedTodos.forEach((todo: Todos) => {
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

function showtodo(todo: Todos) {

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