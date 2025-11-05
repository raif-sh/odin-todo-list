# Odin Todo list

This is a **modular todo list application** built as part of The Odin Project curriculum. It demonstrates ES6 modules, webpack bundling, and modern JavaScript patterns with a clean, dark-themed UI and localStorage persistence.

---

## Development Commands

```bash
# Start development server with hot reload
npm start

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Module Structure
- **Entry Point**: `src/index.js` - Initializes the application and imports all modules
- **Data Models**: `src/modules/` directory contains core classes:
  - `todo_constructor.js` - Todo class with title, description, dueDate, priority, completed status
  - `project_constructor.js` - Project class containing collections of todos
  - `dom_interface.js` - Centralized DOM element selectors
- **Business Logic**: `src/todo_manager.js` - Centralized todo operations (add, remove, update, complete)
- **Presentation Layer**: `src/dom_ops.js` - DOM manipulation, rendering, and event handling
- **Storage Layer**: `src/storage.js` - LocalStorage abstraction with JSON serialization

### Application Flow
1. **Initialization**: Loads from localStorage or creates default "Inbox" and "Chores" projects
2. **Rendering**: Displays current project todos and project names in sidebar
3. **Event Handling**: Centralized event listeners for user interactions
4. **State Management**: Updates both in-memory `allProjects` array and localStorage

### Key Patterns
- **ES6 Modules**: Clean import/export structure throughout
- **Separation of Concerns**: Data models, business logic, DOM operations, and storage are separate
- **Event Delegation**: Efficient event handling on parent containers
- **LocalStorage Persistence**: Automatic saving on state changes

