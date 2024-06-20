import mongoose, { Schema, Document } from 'mongoose';
import { TaskStatus } from '../../utils/taskEnum';

export interface ITask extends Document {
    taskId: number;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
    taskId: { type: Number, require: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, enum: TaskStatus, default: TaskStatus.pending },
}, { minimize: false, timestamps : { createdAt: "createdAt", updatedAt: "updatedAt" } });

export const Task = mongoose.model<ITask>("Task", TaskSchema);
