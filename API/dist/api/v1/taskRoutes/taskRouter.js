"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_entity_1 = require("../../../appModule/taskModule/task.entity");
const router = express_1.default.Router();
// Get all tasks
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_entity_1.Task.find();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get a specific task
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_entity_1.Task.findById(req.params.id);
        res.json(task);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Create a task
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new task_entity_1.Task({
        title: req.body.title
    });
    try {
        const newTask = yield task.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Update a task
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_entity_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = req.body.title || task.title;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
        task.status = req.body.status || task.status;
        const updatedTask = yield task.save();
        res.json(updatedTask);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Delete a task
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_entity_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        yield task.remove();
        res.json({ message: 'Task deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
