"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoItem = exports.updateTodoItem = exports.createTodoItem = exports.getTodoItemById = exports.getAllTodoItems = void 0;
let tasks = [];
const getAllTodoItems = () => {
    return tasks;
};
exports.getAllTodoItems = getAllTodoItems;
const getTodoItemById = (id) => {
    return tasks.find(item => item.id === id);
};
exports.getTodoItemById = getTodoItemById;
const createTodoItem = (item) => {
    const newItem = Object.assign(Object.assign({}, item), { id: tasks.length + 1 });
    // tasks.push(newItem);
    // return newItem;
    return item;
};
exports.createTodoItem = createTodoItem;
const updateTodoItem = (id, updatedItem) => {
    const index = tasks.findIndex(item => item.id === id);
    if (index !== -1) {
        // tasks[index] = { ...updatedItem, id };
        return tasks[index];
    }
    return null;
};
exports.updateTodoItem = updateTodoItem;
const deleteTodoItem = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(item => item.id !== id);
    return tasks.length !== initialLength;
};
exports.deleteTodoItem = deleteTodoItem;
