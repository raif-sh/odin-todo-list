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

    storageManager.save("localData", allProjects)
} else {
    // sync existing data to allProjects
    const tempStorage = storageManager.read("localData");
    allProjects.push(...tempStorage)
}


// Get header for current project and insert name to DOM
const getCurrentProjectHeader = document.querySelector("#current_project");
getCurrentProjectHeader.textContent = allProjects[0].name;

// Get all project name section container
const getProjectNameSectionContainer = document.querySelector("#project_names")

const renderProjectNames = () => {
    getProjectNameSectionContainer.innerHTML = "";

    allProjects.forEach(project => {
        const newProjectButton = document.createElement("button");
        newProjectButton.value = project.name;
        newProjectButton.textContent = project.name;
        getProjectNameSectionContainer.appendChild(newProjectButton);
    })
}

// Show all todos and content
const renderTodos = (project) => {
        // clear old list
        content.innerHTML = ""; 

        project.todos.forEach((todo, index) => {
            // Create html elements and assign values
            const newListItem = document.createElement("div");
            newListItem.className = "todo-item";

            const newListItemAction = document.createElement("div");
            newListItemAction.className = "todo-action";

            const newPriority = document.createElement("subtitle");
            newPriority.hidden = true;
            newPriority.classList = "target-priority";
            newPriority.textContent = todo.priority;

            const PRIORITY_SYMBOLS = {
                low: "!",
                medium: "!!",
                high: "!!!"
            };
            const setPriority = PRIORITY_SYMBOLS[todo.priority] || '';

            const newTitle = document.createElement("h3");
            newTitle.classList = "target-title";
            newTitle.textContent = `${todo.title} (${setPriority})`;
    
            const newDesc = document.createElement("p");
            newDesc.classList = "target-desc";
            newDesc.textContent = todo.description;
    
            const newDueDateHidden = document.createElement("subtitle");
            newDueDateHidden.hidden = true;
            newDueDateHidden.textContent = todo.dueDate;
            newDueDateHidden.classList = "target-duedate-hidden"

            const newDueDate = document.createElement("subtitle");
            if (todo.dueDate === '') {
                // No date, so keep it blank
                newDueDate.textContent = ''
            } else {
                const currentDate = new Date();
                const comparingDate = compareAsc(todo.dueDate, currentDate)
                const formatDateTime = format(todo.dueDate, 'PPPP');
                const dueIn = formatDistanceToNow(todo.dueDate);
                
                if (todo.completed === true) {
                    newDueDate.textContent = `Done on ${formatDateTime}`
                } else if (comparingDate === 1) {
                    newDueDate.textContent = "Due in " + dueIn + " on " + formatDateTime;
                } else if (comparingDate === -1) {
                    newDueDate.textContent = "Overdue " + dueIn + " ago on " + formatDateTime;
                }
            }

            const newId = document.createElement("span");
            newId.hidden = true;
            newId.className = 'target-span-id';
            newId.textContent = todo.id;

            // Creating SVG icons
            // The required SVG namespace
            const svgNS = "http://www.w3.org/2000/svg";

            // 1. Create the main <svg> element using the namespace
            const newEdit = document.createElementNS(svgNS, "svg");

            newEdit.setAttribute("xmlns", svgNS);
            newEdit.setAttribute("viewBox", "0 0 24 24");
            newEdit.setAttribute("class", "svg-icon-style"); 

            // 4. Set the attributes for the edit element
            const pathElementForEdit = document.createElementNS(svgNS, "path");

            // 4. Set the attributes for the edit element
            pathElementForEdit.setAttribute("fill-rule", "evenodd");
            pathElementForEdit.setAttribute("d", "M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z");
            pathElementForEdit.setAttribute("clip-rule", "evenodd");

            // 5. Append the path element to the svg element
            newEdit.appendChild(pathElementForEdit);

            // label element is a container for action items
            const newCheckboxContainer = document.createElement("label");
            newCheckboxContainer.classList = "form-control";

            // Create checkbox
            const newCheckbox = document.createElement("input");
            newCheckbox.type = 'checkbox';
            newCheckbox.classList = 'checkbox-style';
            newCheckbox.name = "checkbox"

            if (todo.completed === true) {
                newCheckbox.checked = true;
            }

            newCheckboxContainer.appendChild(newCheckbox);
            
            // Add elements to DOM
            newListItemAction.append(newId, newCheckboxContainer,newEdit)
            newListItem.append(newListItemAction, newTitle, newDesc, newDueDate, newDueDateHidden, newPriority)
            content.appendChild(newListItem);
        });

}

// add new task to project button
const btn = () => {
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

        renderTodos(currentProjectObj);
    })
} 

// Function to create new project
const createNewProject = (e) => {
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
}

// Get modal form dialog to add new project
const getFormDialog = document.querySelector("#formDialog");
const getNewProjectName = document.querySelector("#newProject")

// Select add new project button
const projectModalButton = document.querySelector("#new_project_button");
const projectNewAddButton = document.querySelector("#addNewProject");

// Event listener for opening modal for new project
projectModalButton.addEventListener("click", () => {
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

// Select content container to pick up todo-specific button clicks
const getContentContainer = document.querySelector("#content");

// Select ids for edit modal
const getEditItemTitle = document.querySelector("#editItemTitle");
const getEditdescription = document.querySelector("#editdescription");
const getEditDueDate = document.querySelector("#editDueDate");
const getEditPriority = document.querySelector("#editPriority");
const getSubmitEditProjectItem = document.querySelector("#editProjectItem");
const getDeleteItemBtn = document.querySelector("#deleteItem");

getContentContainer.addEventListener("click", (e) => {
    // check if click was to a valid button, and determine request type
    let actionType = null;
    let getParentElementOfId = null;
    if (e.target.matches('svg')) {
        actionType = 'Edit';
        // Grab parent element of button
        getParentElementOfId = e.target.parentElement;
    // check for completion checkbox clicck
    } else if (e.target.matches('input[type="checkbox"]')) {
        actionType = "Mark completed"
        // Grab grand parent element of checkbox
        getParentElementOfId = e.target.parentElement.parentElement.parentElement;
    } else {
        return
    }


    // Select the span element within the parent using its class
    const spanElement = getParentElementOfId.querySelector('.target-span-id');

    let selectedId = null;
    // Get the todo id from the span
    if (spanElement) {
        selectedId = spanElement.textContent;
    }

    // find current active project name
    const currentProjectObj = todoManager.findProject(getCurrentProjectHeader.textContent)

    // Execute request based on action type
    if (actionType === 'Mark completed') {
        // Updating todo to be marked as completed or erasing completed checkmark
        todoManager.updateCompleted(currentProjectObj, selectedId)
        storageManager.save("localData", allProjects);

    } else if (actionType === 'Edit') {
        // Opening edit options
        // Get current item container
        const itemContainer = e.target.parentElement.parentElement;
        const todoItem = storageManager.read("localData");

        // Pick each item data from container
        const editTitle = itemContainer.querySelector(".target-title")
        const editDesc= itemContainer.querySelector(".target-desc")
        const editDuedate = itemContainer.querySelector(".target-duedate-hidden")
        const editPriority = itemContainer.querySelector(".target-priority")

        // assign values to modal inputs from DOM elements
        getEditItemTitle.value = editTitle.textContent;
        getEditdescription.value = editDesc.textContent;
        getEditDueDate.value = editDuedate.textContent;
        getEditPriority.value = editPriority.textContent;
        // Show modal with data
        getItemEditModal.showModal();
        getSubmitEditProjectItem.addEventListener("click", () => {

            todoManager.updateTask(currentProjectObj, selectedId, getEditItemTitle.value, getEditdescription.value, getEditDueDate.value, getEditPriority.value)
            storageManager.save("localData", allProjects);
            renderTodos(currentProjectObj)

        })

        getDeleteItemBtn.addEventListener("click", () => {
            // initiating delete of this todo
            todoManager.deleteItem(currentProjectObj, selectedId);
            storageManager.save("localData", allProjects);
            renderTodos(currentProjectObj)
        })

    }
})

// Editing existing item on modal
const getItemEditModal = document.querySelector("#todoItemDialog");

// By default render the first project to DOM
renderTodos(allProjects[0])

// Show all project names on DOM
renderProjectNames()



export { btn };