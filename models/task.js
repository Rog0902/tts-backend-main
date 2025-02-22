import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

export const Tasks = mongoose.model('Task', taskSchema);
