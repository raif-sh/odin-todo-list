const storageManager = {
    save(name, project) {
        localStorage.setItem(name, JSON.stringify(project));
    },
    read(name) {
        return JSON.parse(localStorage.getItem(name));
    },
}

export default storageManager;