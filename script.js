const output = document.getElementById("output");
const todo_title = document.getElementById("add_todo_title");
const descriptionCheck = document.getElementById("descriptionCheck");
const description = document.getElementById("description");
const todo_description = document.getElementById("add_todo_description");
const titleAlert = document.getElementById("titleAlert");
const myViewModal = document.getElementById('myViewModal');
const myInput = document.getElementById('myInput');
const todo_title_view = document.getElementById('todo_title_view');
const todo_description_view = document.getElementById('todo_description_view');
const todo_status = document.getElementById('todo_status');
const description_modal = document.getElementById('description_modal');
const delete_todo_id = document.getElementById('delete_todo_id');
const status_pending = "pending";
const status_completed = "completed";
let todoOb = {};
const todos = [];

// show all added CEOs
const showTodos = () => {
    output.innerHTML = "";
    todos.forEach(todo => {
        let id = todos.indexOf(todo);
        if (id >= 0) {
            output.innerHTML += `<div class="row">
                                        <div class="col col-xl-8 col-lg-7 col-md-6 col-12">
                                            ${todo.status == status_pending ? todo.title : `<del>${todo.title}</del>`}
                                        </div>
                                    <div class="col col-xl-4 col-lg-5 col-md-6 col-12" id="manupulateButton">
                                        <button id='markBtn' class='btn btn-outline-primary btn-view' onclick='markTodo("${id}")' ${todo.status == status_completed ? 'disabled' : ''}><abbr title="Mark as done"><i class="fa-solid fa-pencil"></i></abbr></button>
                                        <button id='viewBtn' class='btn btn-outline-secondary btn-view' type="button" data-bs-toggle="modal" data-bs-target="#exampleTodoViewModal" onclick='viewTodo("${id}")'><abbr title="View"><i class="fa-regular fa-eye"></i></abbr></button>
                                        <button id='deleteBtn' class='btn btn-outline-danger btn-view' type="button" data-bs-toggle="modal" data-bs-target="#exampleTodoDeleteModal" onclick='deleteTodoAlert("${id}")'><abbr title="Delete"><i class="fa-solid fa-trash-can"></i></abbr></button>
                                    </div>
                                </div>
                                <hr>`;
        }
    });
    if (output.innerHTML == "") {
        output.innerHTML = `<img src="./assets/todo_img.png" alt="#todo">`;
    }
}

// clear content of the input tag and checkbox all time
const clearInput = () => {
    todo_title.value = "";
    if (descriptionCheck.checked) {
        descriptionCheck.click();
    }
}

// add CEOs with validation
const addTodo = () => {
    const todo_title = add_todo_title.value;
    let todo_description = "";
    if (descriptionCheck.checked) {
        todo_description = add_todo_description.value;
    }
    const status = status_pending;

    if (todo_title != "") {
        todoOb = {
            title: todo_title,
            description: todo_description,
            status: status
        }
        todos.push(todoOb);
        clearInput();
        showTodos();
    }
    else {
        titleAlert.innerHTML = "Required<sup>**</sup>";
    }
}

// to remove alert notification
const removeAlert = () => {
    titleAlert.innerHTML = "";
}

// show or hide description based on check box
const showOrHideDescription = (checkDesc) => {
    if (checkDesc.checked == true) {
        description.innerHTML = `<div class="mb-3">
                                    <label for="todo_description" class="form-label">TODO Description</label>
                                    <textarea class="form-control" id="add_todo_description" rows="3"></textarea>
                                </div>`;
    }
    else {
        description.innerHTML = ``;
    }
}

// fetch data for single todo
const fetchSingleTODO = (todo_id) => {
    if (todo_id >= 0 && todo_id < todos.length) {
        const todo = todos[todo_id];
        return [todo.title, todo.description, todo.status];
    }
    return null;
}

// to mark as done to a specific todo
const markTodo = (todo_id) => {
    let getTODO = fetchSingleTODO(todo_id);
    const mark_todoOb = {
        title: getTODO[0],
        description: getTODO[1],
        status: status_completed
    }
    todos[todo_id] = mark_todoOb;
    showTodos();
}

// to view a specific todo
const viewTodo = (todo_id) => {
    let getTODO = fetchSingleTODO(todo_id);

    todo_status.style = (getTODO[2] == status_completed) ? 'color: green' : 'color: red';
    const confirm_Status = ((getTODO[2] == status_completed) ? `<i class="fa-regular fa-circle-check"></i> ` : `<i class="fa-solid fa-triangle-exclamation"></i> `) + getTODO[2];

    todo_title_view.innerHTML = getTODO[0];
    if (getTODO[1] == '') {
        description_modal.style.display = 'none';
    }
    else {
        description_modal.style.display = 'block';
        todo_description_view.innerHTML = getTODO[1];
    }
    todo_status.innerHTML = confirm_Status;
}

// remove existing cache-data
const clear_TODO_info = () => {
    todo_title_view.innerHTML = '';
    todo_description_view.innerHTML = '';
    todo_status.innerHTML = '';
}

// to show the delete alert 
const deleteTodoAlert = (todo_id) => {
    delete_todo_id.value = todo_id;
}

// to delete todo
const deleteTodo = () => {
    const todo_deleted_id = delete_todo_id.innerHTML;
    todos.splice(todo_deleted_id, 1);
    showTodos();
}

showTodos();

// modal section
myViewModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})