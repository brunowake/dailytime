const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const EventModel = require("../models/Event.model");
const TaskModel = require("../models/Task.model");
const addDays = require("date-fns/addDays");

router.get(
  "/timeline/:date",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.currentUser;
      const { date } = req.params;
      const dayAfter = addDays(new Date(date), 1);
      const task = await TaskModel.find({
        userId: _id,
        dateTime: { $gte: new Date(date), $lt: dayAfter },
      });

      const event = await EventModel.find({
        userId: _id,
        dateTime: { $gte: new Date(date), $lt: dayAfter },
      });

      const all = task.concat(event).sort((a, b) => a.dateTime - b.dateTime);
      if (!all) {
        return res
          .status(404)
          .json({ msg: "Failed to find tasks for this day." });
      }

      return res.status(202).json(all);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find task" });
    }
  }
);

module.exports = router;
