import fs from 'fs';
import csvParser from 'csv-parser';
import { ITask } from '../appModule/taskModule/task.entity';
import { createObjectCsvWriter } from 'csv-writer';

class CsvUtils {

    async parseCSV(filePath: string): Promise<any> {
        const results: any[] = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', () => {
                    fs.unlinkSync(filePath);
                    resolve(results);
                })
                .on('error', (err) => {
                    reject(err);
                }); 
        });         
    }

    generateCSV(todos: ITask[], filePath: string) {
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: [
                { id: 'taskId', title: 'Task Id' },
                { id: 'title', title: 'Title' },
                { id: 'description', title: 'Description' },
                { id: 'status', title: 'Status' },
            ],
        });
        csvWriter.writeRecords(todos);
    }


}

export default new CsvUtils();

// export const parseCSV = async (filePath: string): Promise<ITask[]> => {
//     const results: ITask[] = [];
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(filePath)
//             .pipe(csvParser())
//             .on('data', (data) => {
//                 results.push(data);
//             })
//             .on('end', () => {
//                 resolve(results);
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });
// };

// export const generateCSV = (todos: ITask[], filePath: string): void => {
//     const csvWriter = createObjectCsvWriter({
//         path: filePath,
//         header: [
//             { id: 'id', title: 'ID' },
//             { id: 'title', title: 'Title' },
//             { id: 'description', title: 'Description' },
//             { id: 'status', title: 'Status' },
//         ],
//     });
//     csvWriter.writeRecords(todos);
// };
