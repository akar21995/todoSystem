import crud from '../../utils/crud';
import { Task } from '../taskModule/task.entity';

class TaskService {
    private taskModel: crud;

    constructor() {
        this.taskModel = new crud(Task);
    }

    getAllTaskList(clauses: any, projections: any, next: CallableFunction) {
        this.taskModel.getAllDocuments(clauses, projections)
        .then(async taskList => {
            if (taskList === null) {
                throw new Error("No TaskList found!");
            } else {
                const count = await this.taskModel.countAllDocuments(clauses);
                next(null, { taskList: taskList, count: count });
            }
        })
        .catch((err: Error) => {
            console.error("ERROR:: finding the TaskList!");
            console.error(err.name, "::", err.message);
            next(err);
        });
    }
    
    getTaskByTaskId(clauses: any, projections: any, next: CallableFunction) {
        this.taskModel.getDocument(clauses, projections)
        .then(taskDoc => {
            if (taskDoc === null) {
                throw new Error("No Doc Found!");
            } else {
                next(null, taskDoc);
            }
        })
        .catch((err: Error) => {
            console.error("ERROR:: finding the doc !");
            console.error(err.name, "::", err.message);
            next(err);
        });
    }

    async createTask(newTaskPayload: any, next: CallableFunction) {
        const count = await this.taskModel.countAllDocuments({});
        const newTask = { ...newTaskPayload, taskId: count + 1 };

        this.taskModel.createOneDocument(newTask)
        .then(newTask => {
            if (newTask === null) {
                throw new Error("New Task Creation failed!");
            } else {
                next(null, newTask);
            }
        })
        .catch((err: Error) => {
            console.error("ERROR::Failed to create the new Task!");
            console.error(err.name, "::", err.message);
            next(err);
        });      
    }

    public insertManyTask(newtaskList: any[], next: CallableFunction) {
        this.taskModel.createManyDocuments(newtaskList)
            .then((createdTaskList: any) => {
                if (createdTaskList === null) {
                    throw new Error("Failed to insert all Tasks!");
                } else {                   
                    next(null, createdTaskList);           
                }
            })
            .catch(err => {
                console.log("ERROR:: failed to insert all Tasks!");
                console.log(err);
                next(err);
            });    
    }

    updateTask(clauses: any, updatedTask: any, next: CallableFunction) {
        this.taskModel.updateDocument(clauses, updatedTask)
        .then(updatedTaskDoc => {
            if (updatedTaskDoc === null) {
                throw new Error("Failed to update the task!");
            } else {
                next(null, updatedTaskDoc);
            }
        })
        .catch((err: Error) => {
            console.error("ERROR :: failed to update the task");
            console.error(err.name, "::", err.message);
            next(err);
        });
    }

    deleteTask(clauses: any, next: CallableFunction) {
        this.taskModel.deleteDocument(clauses)
        .then(ack => {
            next(null, ack);
        })
        .catch(err => {
            console.error("ERROR::Failed to delete the task!");
            console.error(err);
            next(err);
        });    
    }


}

export default new TaskService();