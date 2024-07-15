import { Tasks } from "../models/task.js";

const taskCtrl = {
    createTask : async (req, res) => {
        try {
        const { title, description } = req.body;
        const newTask = new Tasks({
            title,
            description
        });
        await newTask.save();

        return res.json({
            success: true,
            message: "Task created successfully",
            task: newTask
         });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
    },

    getTasks : async (req, res) => {
        try {
         const tasks = await Tasks.find();
         return res.json({
            success: true,
            tasks
             });
         } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
    },

    updateTask : async (req, res) => {
        try {
         const taskId = req.params.id;
         const { title, description } = req.body;

         const updatedTask = await Tasks.findByIdAndUpdate(taskId, {
            title,
            description
          }, { new: true });

         if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        return res.json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
     } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
    },

    deleteTask : async (req, res) => {
     try {
        const taskId = req.params.id;

        const deletedTask = await Tasks.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        return res.json({
            success: true,
            message: "Task deleted successfully",
            task: deletedTask
         });
     } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
     }
    },

}

export default  taskCtrl 
