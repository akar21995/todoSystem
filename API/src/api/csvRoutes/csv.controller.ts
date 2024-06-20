import { Request, Response } from 'express';
import taskService from '../../appModule/taskModule/task.service';
import csvUtils from '../../utils/csvUtils';
import path from 'path';

class CsvController {

    async uploadCSV(req: Request, res: Response) {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
    
        const filePath =  'uploads/' + req.file.filename;
        // const filePath = path.join(__dirname, "/uploads/" + req.params.fileName);
        console.log(filePath);

        try {
            const data = await csvUtils.parseCSV(filePath);
            console.log(data);

            const csvVal = {
                "Task Id": "taskId",
                "Title": "title",
                "Description": "description",
                "Status": "status"
            }
            const mapedData = data.map((el: any) => {
                return Object.keys(csvVal).reduce((obj, k) => Object.assign(obj, { [csvVal[k as keyof typeof csvVal]]: el[k] }),{});
            });

            taskService.insertManyTask(mapedData, (err: Error, taskList: any) => {
                if (err) {
                    res.status(400).json({ error: err.message, message: "Error in added Task List!" });
                } else {
                    res.status(200).json({ taskList: taskList });
                }
            });    
            
        } catch (error) {
            res.status(500).json({ message: 'Error uploading CSV file' });
        }
    };


    async downloadCSV(req: Request, res: Response) {
        const clauses = req.body;

        taskService.getAllTaskList(clauses, {}, (err: Error, tasks: { taskList: any; count: any; }) => {
            if (err) {
                res.status(400).json({ error: err.message, message: "Task List Not Found!" });
            } else {
                const filePath = './downloads/task.csv';
                try {
                    csvUtils.generateCSV(tasks.taskList, filePath);
                    res.download(filePath);
                } catch (error) {
                    res.status(400).json({ error: error, message: 'Error downloading CSV file' });
                }
            }
        });         
    }

}

export default new CsvController();




