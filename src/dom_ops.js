import { saveTodoButton, content, getTitle, getDesc, getDueDate, getPriority } from "./modules/dom_interface";
import Todo from "./modules/todo_constructor"
import todoManager from "./todo_manager";
import Project from "./modules/project_constructor";

// Initialize default project
const inbox = new Project("Inbox");

function renderTodos(project) {
        content.innerHTML = ""; // clear old list
        console.table(project)

        project.todos.forEach(todo => {
            const newListItem = document.createElement("li");

            const newTitle = document.createElement("p");
            newTitle.textContent = todo.title;
    
            const newDesc = document.createElement("span");
            newDesc.textContent = todo.description;
    
            const newDueDate = document.createElement("subtitle");
            newDueDate.textContent = todo.dueDate;
    
            const newPriority = document.createElement("h2");
            newPriority.textContent = todo.priority;
    
    
            newListItem.append(newTitle, newDesc, newDueDate, newPriority)
            content.appendChild(newListItem);
        });

}

function btn() {
    saveTodoButton.addEventListener("click", (e)=>{
        const newTodo = new Todo(
            getTitle.value,
            getDesc.value,
            getDueDate.value,
            getPriority.value,
        );

        todoManager.add(inbox, newTodo);
        renderTodos(inbox);
    })
} 

export { btn, inbox };