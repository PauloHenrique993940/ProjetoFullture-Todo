// Usando const para elementos que não mudarão
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Usando let para variáveis que podem mudar
let todos = [];

//Criação de objetos literais estáticos para simular registros no banco de dados
const task1 = { id: 1, text: 'Estudar Algoritmo', completed: false };
const task2 = { id: 2, text: 'Estudar JavaScript', completed: false };
const task3 = { id: 3, text: 'Entregar desafio JavaScript', completed: false };

todos.push(task1, task2, task3);

// Função para adicionar uma tarefa
function addTask(task) {
    todos.push(task);
    displayTasks();
}

// Função para exibir as tarefas
function displayTasks() {
    todoList.innerHTML = ''; // Limpar a lista antes de exibir
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        const newTodo = document.createElement('li');
        newTodo.innerText = todo.text;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('check-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

// Inicializar com tarefas estáticas
displayTasks();

// Função para lidar com a adição de uma nova tarefa
function addTaskHandler(event) {
    event.preventDefault();
    const taskText = todoInput.value;
    if (taskText !== '') {
        const newTask = {
            id: todos.length + 1,
            text: taskText,
            completed: false
        };
        addTask(newTask);
        todoInput.value = ''; // Limpar o input
    }
}

// Evento para adicionar uma nova tarefa
document.querySelector('form').addEventListener('submit', addTaskHandler);

// Evento para manipulação dos botões de tarefa
todoList.addEventListener('click', function(event) {
    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        removeTask(todo);
    }

    if (item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        completeTask(todo);
    }
});

// Função para remover uma tarefa
function removeTask(todo) {
    const taskText = todo.children[0].innerText;
    todos = todos.filter(todo => todo.text !== taskText);
    todo.remove();
}

// Função para marcar uma tarefa como completa
function completeTask(todo) {
    todo.classList.toggle('completed');
    const taskText = todo.children[0].innerText;
    todos = todos.map(todo => {
        if (todo.text === taskText) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
}

// Evento para filtrar as tarefas
filterOption.addEventListener('change', filterTasks);

// Função para filtrar as tarefas
function filterTasks(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}
