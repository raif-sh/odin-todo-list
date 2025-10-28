import { saveTodoButton, content, getTitle, getDesc, getDueDate, getPriority } from "./modules/dom_interface";
import Todo from "./modules/todo_constructor"
import { todoManager, allProjects } from "./todo_manager";


// Initialize default project
const inbox = todoManager.newProject("Inbox");
const chores = todoManager.newProject("Chores");

allProjects.push(inbox);
allProjects.push(chores);

console.log(allProjects)

// Get header for current project and insert name to DOM
const getCurrentProjectHeader = document.querySelector("#current_project");
getCurrentProjectHeader.textContent = inbox.name;

// Get all project name section container
const getProjectNameSectionContainer = document.querySelector("#project_names")

function renderProjectNames() {
    getProjectNameSectionContainer.innerHTML = "";

    allProjects.forEach(project => {
        const newProjectButton = document.createElement("button");
        newProjectButton.value = project.name;
        newProjectButton.textContent = project.name;
        getProjectNameSectionContainer.appendChild(newProjectButton);
    })
}

renderProjectNames()

// Show all todos and content
function renderTodos(project) {
        content.innerHTML = ""; // clear old list
        // console.table(project)

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

// add new task to project button
function btn() {
    saveTodoButton.addEventListener("click", (e)=>{
        e.preventDefault();
        
        // get current project value
        const currentProjectObj = todoManager.findProject(getCurrentProjectHeader.textContent)


        const newTodo = new Todo(
            getTitle.value,
            getDesc.value,
            getDueDate.value,
            getPriority.value,
        );

        todoManager.add(currentProjectObj, newTodo);
        renderTodos(currentProjectObj);
    })
} 

// Function to create new project
function createNewProject(e) {
    e.preventDefault()

    const projectName = getNewProjectName.value;

    const newProject = todoManager.newProject(projectName)

    getNewProjectName.value = '';
    getFormDialog.close();

    allProjects.push(newProject)

    const newProjectButton = document.createElement("button");
    newProjectButton.value = newProject.name;
    newProjectButton.textContent = newProject.name;
    getProjectNameSectionContainer.appendChild(newProjectButton);

    console.table(allProjects)

}

// Get modal form dialog to add new project
const getFormDialog = document.querySelector("#formDialog");
const getNewProjectName = document.querySelector("#newProject")

// Select add new project button
const projectModalButton = document.querySelector("#new_project_button");
const projectNewAddButton = document.querySelector("#addNewProject");

// Event listener for opening modal for new project
projectModalButton.addEventListener("click", function() {
    getFormDialog.showModal();
})

projectNewAddButton.addEventListener("click", createNewProject)

// Update current project on button click
getProjectNameSectionContainer.addEventListener("click", (e) => {
    const newCurrentProjectName = e.target.value;
    getCurrentProjectHeader.textContent = newCurrentProjectName;
    const currentProjectObj = todoManager.findProject(getCurrentProjectHeader.textContent)

    renderTodos(currentProjectObj);

})


export { btn };