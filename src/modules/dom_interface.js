// This module collects the elements of interaction from the DOM
// This may be reduntant, and maybe can be merged with DOM ops
const content = document.querySelector("#content");

const saveTodoButton = document.querySelector("#saveTodo");

// Get form data
const getTitle = document.querySelector("#title")
const getDesc = document.querySelector("#description")
const getDueDate = document.querySelector("#due")
const getPriority = document.querySelector("#priority")

export { saveTodoButton, content, getTitle, getDesc, getDueDate, getPriority};