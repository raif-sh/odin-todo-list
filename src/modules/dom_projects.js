import { inbox } from "../dom_ops";


const getProjectNameContainer = document.querySelector("#project_names");
const getCurrentProjectHeader = document.querySelector("#current_project");
const getNewProjectButton = document.querySelector("#new_project_button");

getCurrentProjectHeader.textContent = inbox.name;

export { getCurrentProjectHeader };