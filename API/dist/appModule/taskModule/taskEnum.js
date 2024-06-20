"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["pending"] = "PENDING";
    TaskStatus["ongoing"] = "ONGOING";
    TaskStatus["completed"] = "COMPLETED";
    TaskStatus["cancelled"] = "CANCELLED";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
