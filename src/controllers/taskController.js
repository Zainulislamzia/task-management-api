const { Task } = require("../models");
const CustomErrorHandler = require("../utils/customErrorHandler");

exports.getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const count = await Task.countDocuments();

    res.status(200).json({
      data: tasks,
      totalPages: parseInt(Math.ceil(count / limit)),
      currentPage: parseInt(page),
    });
  } catch (error) {
    return next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({
      title,
      description,
      completed,
      createdBy: req.user._id,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", data: task });
  } catch (error) {
    return next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return next(CustomErrorHandler.notFound("Task not found"));
    }

    res.status(200).json({ data: task });
  } catch (error) {
    return next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return next(CustomErrorHandler.notFound("Task not found"));
    }

    res.status(200).json({ message: "Task updated successfully", data: task });
  } catch (error) {
    return next(error);
  }
};

exports.patchTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!task) {
      return next(CustomErrorHandler.notFound("Task not found"));
    }

    res
      .status(200)
      .json({ message: "Task partially updated successfully", data: task });
  } catch (error) {
    return next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return next(CustomErrorHandler.notFound("Task not found"));
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
