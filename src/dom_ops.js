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
    // console.log("retreiving all projects")
    allProjects.push(...tempStorage)
    // console.table(allProjects)
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
            const newListItem = document.createElement("div");
            newListItem.className = "todo-item";

            const newListItemAction = document.createElement("div");
            newListItemAction.className = "todo-action";

            const newPriority = document.createElement("subtitle");
            newPriority.hidden = true;
            newPriority.classList = "target-priority";
            newPriority.textContent = todo.priority;

            let setPriority = ''
            if (todo.priority === 'low') {
                setPriority = "!"
            } else if (todo.priority === 'medium') {
                setPriority = "!!"
            } else if (todo.priority === 'high') {
                setPriority = "!!!"
            }

            const newTitle = document.createElement("h3");
            newTitle.classList = "target-title";
            newTitle.textContent = todo.title + " (" + setPriority + ")";
            // setPriority.hidden = true;
    
            const newDesc = document.createElement("p");
            newDesc.classList = "target-desc";
            newDesc.textContent = todo.description;
    
            // console.log(todo.dueDate)
            let newDueDateHidden = document.createElement("subtitle");
            newDueDateHidden.hidden = true;
            newDueDateHidden.textContent = todo.dueDate;
            newDueDateHidden.classList = "target-duedate-hidden"

            let newDueDate = document.createElement("subtitle");
            if (todo.dueDate === '') {
                // console.log("its null")
                newDueDate.textContent = null;
            } else {
                const currentDate = new Date();
                const comparingDate = compareAsc(todo.dueDate, currentDate)
                // console.log(comparingDate)
                let formatDateTime = format(todo.dueDate, 'PPPP');
                let dueIn = formatDistanceToNow(todo.dueDate);
                
                if (comparingDate === -1) {
                    newDueDate.textContent = "Overdue " + dueIn + " ago on " + formatDateTime;
                } else if (comparingDate === 1) {
                    newDueDate.textContent = "Due in " + dueIn + " on " + formatDateTime;
                }
            }

            const newId = document.createElement("span");
            newId.hidden = true;
            newId.className = 'target-span-id';
            newId.textContent = todo.id;
            
            // const newCompleted = document.createElement("button");
            // newCompleted.textContent = "Mark completed";

            // const newEdit= document.createElement("button");
            // newEdit.textContent = "...";

            // const newDelete = document.createElement("svg");
            // The required SVG namespace
            const svgNS = "http://www.w3.org/2000/svg";

            // 1. Create the main <svg> element using the namespace
            const newEdit = document.createElementNS(svgNS, "svg");
            const newDelete = document.createElementNS(svgNS, "svg");

            // 2. Set the attributes for the <svg> element
            newDelete.setAttribute("xmlns", svgNS);
            newDelete.setAttribute("viewBox", "0 0 24 24");
            newDelete.setAttribute("class", "svg-icon-style"); 

            newEdit.setAttribute("xmlns", svgNS);
            newEdit.setAttribute("viewBox", "0 0 24 24");
            newEdit.setAttribute("class", "svg-icon-style"); 

            // 3. Create the <path> child element using the namespace
            const pathElementForDelete = document.createElementNS(svgNS, "path");

            // 4. Set the attributes for the <path> element
            pathElementForDelete.setAttribute("fill-rule", "evenodd");
            pathElementForDelete.setAttribute("d", "M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z");
            pathElementForDelete.setAttribute("clip-rule", "evenodd");

            // 4. Set the attributes for the edit element
            const pathElementForEdit = document.createElementNS(svgNS, "path");

            // 4. Set the attributes for the edit element
            pathElementForEdit.setAttribute("fill-rule", "evenodd");
            pathElementForEdit.setAttribute("d", "M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z");
            pathElementForEdit.setAttribute("clip-rule", "evenodd");

            // 5. Append the path element to the svg element
            newDelete.appendChild(pathElementForDelete);
            newEdit.appendChild(pathElementForEdit);

            // label element is a container for action items
            const newCheckboxContainer = document.createElement("label");
            newCheckboxContainer.classList = "form-control";

            // Create checkbox
            const newCheckbox = document.createElement("input");
            newCheckbox.type = 'checkbox';
            newCheckbox.classList = 'checkbox-style';
            newCheckbox.name = "checkbox"

            // Create edit menu button
            // const newThreedots = document.querySelector("button")
            // newThreedots.textContent = '...'

            if (todo.completed === true) {
                newCheckbox.checked = true;
            }

            newCheckboxContainer.appendChild(newCheckbox);

            newListItemAction.append(newId, newCheckboxContainer,newEdit)
            newListItem.append(newListItemAction, newTitle, newDesc, newDueDate, newDueDateHidden, newPriority)
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
        console.log(getParentElementOfId)
    // check for completion checkbox clicck
    } else if (e.target.matches('input[type="checkbox"]')) {
        actionType = "Mark completed"
        // Grab grand parent element of checkbox
        getParentElementOfId = e.target.parentElement.parentElement.parentElement;
        // console.log(parentElement)
    } else {
        // console.log(e.target)
        console.log("not a button!!!")
        return
    }


    // Select the span element within the parent using its class
    const spanElement = getParentElementOfId.querySelector('.target-span-id');

    let selectedId = null;
    // Get the todo id from the span
    if (spanElement) {
        selectedId = spanElement.textContent;
        console.log(selectedId); 
    }

    // find current active project name
    const currentProjectObj = todoManager.findProject(getCurrentProjectHeader.textContent)

    // Execute request based on action type
    if (actionType === 'Mark completed') {
        // console.log("Updating todo to be marked as completed or erasing completed checkmark");
        todoManager.updateCompleted(currentProjectObj, selectedId)
        storageManager.save("localData", allProjects);
        console.table(allProjects);
    } else if (actionType === 'Edit') {
        console.log("Opening edit options");
        // Get current item container
        const itemContainer = e.target.parentElement.parentElement;
        const todoItem = storageManager.read("localData");
        console.log(todoItem)
        console.log(currentProjectObj)
        // Pick each item data from container
        const editTitle = itemContainer.querySelector(".target-title")
        const editDesc= itemContainer.querySelector(".target-desc")
        const editDuedate = itemContainer.querySelector(".target-duedate-hidden")
        const editPriority = itemContainer.querySelector(".target-priority")
        // console.log(itemContainer);
        // assign values to modal inputs from DOM elements
        getEditItemTitle.value = editTitle.textContent;
        getEditdescription.value = editDesc.textContent;
        getEditDueDate.value = editDuedate.textContent;
        getEditPriority.value = editPriority.textContent;
        // Show modal with data
        getItemEditModal.showModal();
        getSubmitEditProjectItem.addEventListener("click", function() {
            // console.log(itemContainer)
            todoManager.updateTask(currentProjectObj, selectedId, getEditItemTitle.value, getEditdescription.value, getEditDueDate.value, getEditPriority.value)
            storageManager.save("localData", allProjects);
            renderTodos(currentProjectObj)

        })

        getDeleteItemBtn.addEventListener("click", function() {
            console.log("confimed! initiating delete of this todo")
            todoManager.deleteItem(currentProjectObj, selectedId);
            storageManager.save("localData", allProjects);
            renderTodos(currentProjectObj)
        })

    }
})

// Editing existing item on modal
const getItemEditModal = document.querySelector("#todoItemDialog");



export { btn };