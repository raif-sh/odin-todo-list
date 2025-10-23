const todoManager = {
    add(project = "Inbox", todo) {
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
}

export default todoManager;