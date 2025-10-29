import { saveTodoButton, content, getTitle, getDesc, getDueDate, getPriority } from "./modules/dom_interface";
import Todo from "./modules/todo_constructor"
import { todoManager, allProjects } from "./todo_manager";
import { format, formatDistanceToNow, compareAsc } from "date-fns";
import storageManager from "./storage";


// Fetch data from localstorage
if (storageManager.read("localData") === null) {
    // Initialize default project
    const inbox = todoManager.newProject("Inbox");
    const chores = todoManager.newProject("Chores");
    allProjects.push(inbox);
    allProjects.push(chores);
    console.log("saving all projects")
    console.table(allProjects)
    storageManager.save("localData", allProjects)
} else {
    // sync existing data to allProjects
    let tempStorage = storageManager.read("localData");
    console.log("retreiving all projects")
    allProjects.push(...tempStorage)
    console.table(allProjects)
}


// Get header for current project and insert name to DOM
const getCurrentProjectHeader = document.querySelector("#current_project");
getCurrentProjectHeader.textContent = allProjects[0].name;
renderTodos(allProjects[0])

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
        console.table(project)

        project.todos.forEach(todo => {
            const newListItem = document.createElement("li");

            let setPriority = "";
            if (todo.priority === 'low') {
                setPriority = "!"
            } else if (todo.priority === 'medium') {
                setPriority = "!!"
            } else if (todo.priority === 'high') {
                setPriority = "!!!"
            }

            const newTitle = document.createElement("p");
            newTitle.textContent = todo.title + " (" + setPriority + ")";
    
            const newDesc = document.createElement("span");
            newDesc.textContent = todo.description;
    
            // console.log(todo.dueDate)
            let newDueDate = document.createElement("subtitle");
            if (todo.dueDate === '') {
                // console.log("its null")
                newDueDate.textContent = 'No due date';
            } else {
                const currentDate = new Date();
                const comparingDate = compareAsc(todo.dueDate, currentDate)
                console.log(comparingDate)
                let formatDateTime = format(todo.dueDate, 'PPPP');
                let dueIn = formatDistanceToNow(todo.dueDate);
                
                if (comparingDate === -1) {
                    newDueDate.textContent = "Overdue " + dueIn + " ago on " + formatDateTime;
                } else if (comparingDate === 1) {
                    newDueDate.textContent = "Due in " + dueIn + " on " + formatDateTime;
                }
            }

            
            const newCompleted = document.createElement("button");
            newCompleted.textContent = "Mark completed"

            const newDelete = document.createElement("button");
            newDelete.textContent = "Delete"
    
            newListItem.append(newTitle, newDesc, newDueDate, newCompleted, newDelete)
            content.appendChild(newListItem);
        });

}

// add new task to project button
function btn() {
    saveTodoButton.addEventListener("click", (e)=>{
        e.preventDefault();
        
        // get current project value
        const currentProjectObj = todoManager.findProject(getCurrentProjectHeader.textContent)

        if (getTitle.value === '') {
            return;
        }

        const newTodo = new Todo(
            getTitle.value,
            getDesc.value,
            getDueDate.value,
            getPriority.value,
        );

        getTitle.value = "";
        getDesc.value = "";
        getDueDate.value = "";
        getPriority.value = "low";

        todoManager.add(currentProjectObj, newTodo);
        storageManager.save("localData", allProjects);
        console.table(allProjects);
        renderTodos(currentProjectObj);
    })
} 

// Function to create new project
function createNewProject(e) {
    e.preventDefault()

    const projectName = getNewProjectName.value;

    if (projectName === '') {
        return alert("Project name can't be blank")
    } else if (projectName.length < 3) {
        return alert("Project name should be atleast 3 characters long")
    }

    const newProject = todoManager.newProject(projectName)

    getNewProjectName.value = '';
    getFormDialog.close();

    // Add project to working memory
    allProjects.push(newProject)

    const newProjectButton = document.createElement("button");
    newProjectButton.value = newProject.name;
    newProjectButton.textContent = newProject.name;
    getProjectNameSectionContainer.appendChild(newProjectButton);

    // Save project to localStorage

    storageManager.save("localData", allProjects);
    console.table(allProjects);

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