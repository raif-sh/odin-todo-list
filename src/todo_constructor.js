// class Todo {
//   constructor(
//     title,
//     description = '',
//     dueDate = '',
//     options = {} 
//   ) {
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.completed = false;

//     // Destructure optional fields
//     const {
//       priority = '',
//       project = '',
//       checklist = [],
//       cost = '',
//       energy = '',
//     } = options;

//     Object.assign(this, { priority, project, checklist, cost, energy });
//   }

//   toggleComplete() {
//     this.completed = !this.completed;
//   }

//   update(fields) {
//     Object.assign(this, fields);
//   }

//   toJSON() {
//     return { ...this };
//   }
// }

// export default Todo;

export default class Todo {
  constructor(title, id, description = '', dueDate = '', options = {}) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
    const { priority = '', checklist = [], cost = '', energy = '' } = options;
    Object.assign(this, { priority, checklist, cost, energy });
  }

  toggleComplete() {
    this.completed = !this.completed
  }
}