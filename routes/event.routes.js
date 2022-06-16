const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const EventModel = require("../models/Event.model");

router.post("/event", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const data = req.body;
    const { _id } = req.currentUser;

    const result = await EventModel.create({ ...data, createdBy: _id });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Failed to register event" });
  }
});

router.get("/event", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const events = await EventModel.find();

    return res.status(201).json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Failed to find event" });
  }
});

router.get(
  "/eventbydate/:date",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { date } = req.params;

      const dayAfter = addDays(new Date(date), 1);

      const events = await TaskModel.find({
        date: { $gte: new Date(date), $lt: dayAfter },
      }).sort({ date: -1 });

      if (!events) {
        return res.status(404).json({ msg: date });
      }

      return res.status(202).json(events);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find events" });
    }
  }
);

router.get(
  "/event/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;

      const event = await EventModel.findOne({ _id });

      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }

      return res.status(202).json(event);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find event" });
    }
  }
);

router.patch(
  "/event/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;
      const data = req.body;

      const result = await EventModel.findOneAndUpdate(
        { _id, createdBy: req.currentUser._id },
        { $set: data },
        { new: true, runValidators: true }
      );

      if (!result) {
        return res.status(404).json({ msg: "Event not found" });
      }

      return res.status(202).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to edit event" });
    }
  }
);

router.delete(
  "/event/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;

      const result = await EventModel.deleteOne({
        _id,
        createdBy: req.currentUser._id,
      });
      console.log(result);
      if (result.deletedCount < 1) {
        return res.status(404).json({ msg: "Event not found" });
      }
      return res.status(202).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to edit event" });
    }
  }
);

module.exports = router;
