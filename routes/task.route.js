const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const TaskModel = require("../models/Task.model");
const addDays = require("date-fns/addDays");

router.post(
  "/newtask",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const data = req.body;
      const { _id } = req.currentUser;

      const result = await TaskModel.create({ ...data, userId: _id });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to register task" });
    }
  }
);

router.get("/task", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const tasks = await TaskModel.find();

    return res.status(201).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Failed to find task" });
  }
});

router.get(
  "/task/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;

      const task = await TaskModel.findOne({ _id });

      if (!task) {
        return res.status(404).json({ msg: "Task not found" });
      }

      return res.status(202).json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find task" });
    }
  }
);

router.get(
  "/taskbydate/:date",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { date } = req.params;
      const dayAfter = addDays(new Date(date), 1);
      const task = await TaskModel.find({
        dateTime: { $gte: new Date(date), $lt: dayAfter },
      }).sort({ datetime: -1 });

      if (!task) {
        return res
          .status(404)
          .json({ msg: "Failed to find tasks for this day." });
      }

      return res.status(202).json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find task" });
    }
  }
);

router.patch(
  "/task/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;
      const userId = req.currentUser._id;
      const data = req.body;

      const result = await TaskModel.findOneAndUpdate(
        { _id, userId: req.currentUser._id },
        { $set: data },
        { new: true, runValidators: true }
      );

      if (!result) {
        return res.status(404).json({ msg: "Task not found" });
      }

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to edit task" });
    }
  }
);

router.delete(
  "/task/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;

      const result = await TaskModel.deleteOne({
        _id,
        userId: req.currentUser._id,
      });

      if (result.deletedCount < 1) {
        return res.status(404).json({ msg: "Task not found to be deleted" });
      }

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to delete task" });
    }
  }
);

module.exports = router;
