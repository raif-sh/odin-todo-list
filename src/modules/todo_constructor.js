export default class Todo {
  constructor(title, description = '', dueDate = '', priority, completed, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
    this.completed = false;
    this.id = crypto.randomUUID();
    // const { priority = '', checklist = [], cost = '', energy = '' } = options;
    // Object.assign(this, { priority, checklist, cost, energy });
  }

  // toggleComplete() {
  //   this.completed = !this.completed
  // }
}