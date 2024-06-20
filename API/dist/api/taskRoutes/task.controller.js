"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoItem = exports.updateTodoItem = exports.createTodoItem = exports.getTodoItemById = exports.getAllTodoItems = void 0;
const taskService = __importStar(require("../../appModule/taskModule/task.service"));
const getAllTodoItems = (req, res) => {
    const items = taskService.getAllTodoItems();
    res.json(items);
};
exports.getAllTodoItems = getAllTodoItems;
const getTodoItemById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = taskService.getTodoItemById(id);
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ message: 'Todo item not found' });
    }
};
exports.getTodoItemById = getTodoItemById;
const createTodoItem = (req, res) => {
    const newItem = req.body;
    const createdItem = taskService.createTodoItem(newItem);
    res.status(201).json(createdItem);
};
exports.createTodoItem = createTodoItem;
const updateTodoItem = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedItem = req.body;
    const result = taskService.updateTodoItem(id, updatedItem);
    if (result) {
        res.json(result);
    }
    else {
        res.status(404).json({ message: 'Todo item not found' });
    }
};
exports.updateTodoItem = updateTodoItem;
const deleteTodoItem = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = taskService.deleteTodoItem(id);
    if (result) {
        res.status(204).end();
    }
    else {
        res.status(404).json({ message: 'Todo item not found' });
    }
};
exports.deleteTodoItem = deleteTodoItem;
