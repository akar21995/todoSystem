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
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadCSV = exports.uploadCSV = void 0;
const csvUtils_1 = require("../../utils/csvUtils");
const task_service_1 = require("../../appModule/taskModule/task.service");
const uploadCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const filePath = req.file.path;
    try {
        const todos = yield (0, csvUtils_1.parseCSV)(filePath);
        todos.forEach(todo => {
            // Assuming the CSV format matches the Todo model
            // You can validate and add each todo to the database
        });
        res.status(201).json({ message: 'CSV file uploaded successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error uploading CSV file' });
    }
});
exports.uploadCSV = uploadCSV;
const downloadCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = (0, task_service_1.getAllTodoItems)();
    const filePath = './downloads/task.csv'; // Specify your download path
    try {
        (0, csvUtils_1.generateCSV)(todos, filePath);
        res.download(filePath);
    }
    catch (error) {
        res.status(500).json({ message: 'Error downloading CSV file' });
    }
});
exports.downloadCSV = downloadCSV;
