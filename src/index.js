import Todo from "./modules/todo_constructor"
import Project from "./modules/project_constructor";
import todoManager from "./todo_manager";
import { btn } from "./dom_ops";
import './styles.css'

btn()

// const change_bulb = new Todo(
//   "Change light bulb",
//   "34w warm",
//   "2025-10-20",
//   {
//     priority: "high",
//     project: "chores",
//     checklist: ["go to store", "verify size", "buy bulb"],
//     cost: "$20",
//     energy: "draining",
//   }
// );

// const clean_carpet = new Todo(
//   "Clean carpet",
//   "",
//   "2025-10-20",
//   {
//     priority: "high",
//     project: "chores",
//     checklist: ["Recharge vacuum", "Discharge waste"],
//   }
// );

// const chores = new Project("Chores");

// todoManager.add(chores, change_bulb)
// todoManager.add(chores, clean_carpet)

// todoManager.updateCompleted(chores, clean_carpet.id);
// todoManager.remove(chores, clean_carpet.id)

// console.table(chores);
// console.log(todo2);