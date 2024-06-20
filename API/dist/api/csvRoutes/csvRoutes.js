"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/todoRoutes.ts
const express_1 = __importDefault(require("express"));
const csv_controller_1 = require("./csv.controller");
const router = express_1.default.Router();
router.post('/upload', csv_controller_1.uploadCSV);
router.get('/download', csv_controller_1.downloadCSV);
exports.default = router;
