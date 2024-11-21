import taskModel from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !description || !assignedTo) {
      return res.status(400).send({
        success: false,
        message: "Please add all required fields",
      });
    }

    const newTask = new taskModel({ title, description, assignedTo });

    await newTask.save();

    return res.status(201).send({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};


export const getAllTasks = async (req, res) => {
    try {
      const tasks = await taskModel.find({});
      return res.status(200).send({
        success: true,
        message: "All tasks retrieved successfully",
        tasks,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  };

  
  export const deleteTask = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const deletedTask = await taskModel.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Task deleted successfully",
        deletedTask,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Failed to delete Task",
        error,
      });
    }
  };

