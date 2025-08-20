// Lấy các phần tử cần thiết từ DOM
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Hàm để lưu danh sách vào Local Storage
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Hàm để hiển thị danh sách từ Local Storage khi tải trang
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo.text, todo.completed);
    });
}

// Hàm để thêm một công việc mới vào DOM
function addTodoToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <span>${text}</span>
        <div class="actions">
            <button class="complete-btn"><i class="fa-solid fa-check"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    // Lắng nghe sự kiện cho nút hoàn thành
    li.querySelector('.complete-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTodos(); // Cập nhật lại Local Storage
    });

    // Lắng nghe sự kiện cho nút xóa
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTodos(); // Cập nhật lại Local Storage
    });

    // Lắng nghe sự kiện click vào text để hoàn thành
    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTodos();
    });

    todoList.appendChild(li);
}

// Lắng nghe sự kiện gửi form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang
    const todoText = input.value.trim();
    if (todoText !== '') {
        addTodoToDOM(todoText);
        input.value = ''; // Xóa nội dung trong ô input
        saveTodos(); // Lưu lại danh sách
    }
});

// Tải danh sách khi trang được mở
loadTodos();