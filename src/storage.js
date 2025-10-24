const storeManager = {
    save(project) {
        Window.localStorage.setItem(project)
    },
    read(project) {
        Window.localStorage.getItem(project)
    },
}

export default storeManager;