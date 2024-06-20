"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskRouter_1 = __importDefault(require("../api/taskRoutes/taskRouter"));
const csvRoutes_1 = __importDefault(require("../api/csvRoutes/csvRoutes"));
const router = (0, express_1.Router)();
router.use("/task", taskRouter_1.default);
router.use("/csv", csvRoutes_1.default);
exports.default = router;
