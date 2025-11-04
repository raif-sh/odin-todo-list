import Project from "./modules/project_constructor";

let allProjects = [];

const todoManager = {
    newProject(name) {
        return new Project(name);
    },
    add(project, todo) {
        // console.log(project)
        // console.log(todo)
        // return 
        return project.todos.push(todo);
    },
    remove(project, todoId) {
        const index = project.todos.findIndex(item => item.id === todoId);
        if (index === -1) {
            console.warn(`Todo with id "${todoId}" not found.`);
            return false;
        }

        return project.todos = project.todos.filter(item => item.id !== todoId);
    },
    updateCompleted(project, todoId) {
        const index = project.todos.findIndex(item => item.id === todoId);
        if (index === -1) {
            console.warn(`Todo with id "${todoId}" not found.`);
            return false;
        }
        
        return project.todos[index].completed = !project.todos[index].completed;
    },
    updateTask(project, todoId, newTitle, newDesc, newDueDate, newPriority) {
        const index = project.todos.findIndex(item => item.id === todoId);
        if (index === -1) {
            console.warn(`Todo with id "${todoId}" not found.`);
            return false;
        }
        
        // console.log("updating: " + project.todos[index].title + " to " + newTitle)
        project.todos[index].title = newTitle;
        project.todos[index].description = newDesc;
        project.todos[index].dueDate = newDueDate;
        project.todos[index].priority = newPriority;
        return
    },
    findProject(name) {
        // Get index of project by searching for matching name
        const foundProject = allProjects.findIndex(obj => obj.name === name);
        if (foundProject !== -1)
        {
            // return if project found based on index
            return allProjects[foundProject];
        } else {
            console.log("invalid project name")
        }
    },
    deleteItem(project, todoId) {
        const index = project.todos.findIndex(item => item.id === todoId);
        if (index === -1) {
            console.warn(`Todo with id "${todoId}" not found.`);
            return false;
        } 
        project.todos.splice(index, 1);

        return
    }
}

export { todoManager, allProjects }