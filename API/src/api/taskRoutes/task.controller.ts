import { Request, Response } from 'express';
import taskService from '../../appModule/taskModule/task.service';

class TaskController {


    public getAllTasks(req: Request, res: Response): void {
        const clauses = req.body;

        taskService.getAllTaskList(clauses, {}, (err: Error, tasks: { taskList: any; count: any; }) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task List Not Found!" });
            } else {
                res.status(200).json({ taskList: tasks.taskList, totalDocs: tasks.count });
            }
        });
    }

    public getTaskByTaskId(req: Request, res: Response): void {
        const clauses = {
            taskId: Number(req.params.taskId)
        }

        taskService.getTaskByTaskId(clauses, {}, (err: Error, task: any) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task Not Found!" });
            } else {
                res.status(200).json([task]);
            }
        });
    }

    public createTask(req: Request, res: Response): void {
        const newTask = req.body;

        // taskService.getAllTaskList({}, {}, (err: Error, tasks: { taskList: any; count: any; }) => {
        //     if (err) {
        //         res.status(400).json({ error: err.message, message: "Task List Not Found!" });
        //     } else {
        //         // res.status(200).json({ taskList: tasks.taskList, totalDocs: tasks.count });
                
        //     }
        // });

        taskService.createTask(newTask, (err: Error, createdTask: any) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task Not Created!" });
            } else {
                res.status(200).json(createdTask);
            }
        });
    }

    public updateTask(req: Request, res: Response): void {
        const clauses = {
            taskId: Number(req.params.taskId)
        }
        const updatedItem = req.body;

        delete updatedItem.taskId;

        taskService.updateTask(clauses, updatedItem, (err: Error, updatedTask: any) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task Not Updated!" });
            } else {
                res.status(200).json(updatedTask);
            }
        });
    }

    public deleteTask(req: Request, res: Response): void {
        const clauses = {
            taskId: Number(req.params.taskId)
        }

        taskService.deleteTask(clauses, (err: Error, deletedTask: any) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task Not Deleted!" });
            } else {
                res.status(200).json(deletedTask);
            }
        });
    }

    public getTaskByFilter(req: Request, res: Response): void {
        const status = req.query.status;        
        const clauses = {
            status: status
        }

        if (!status) {
            res.status(400).json({ message: 'Status query parameter is required' });
        }

        taskService.getAllTaskList(clauses, {}, (err: Error, tasks: { taskList: any; count: any; }) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task List Not Found!" });
            } else {
                res.status(200).json({ taskList: tasks.taskList, totalDocs: tasks.count });
            }
        });
    }

}

export default new TaskController();
