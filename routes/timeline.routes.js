const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const EventModel = require("../models/Event.model");
const TaskModel = require("../models/Task.model");
const InviteModel = require("../models/Invite.model");
const addDays = require("date-fns/addDays");

router.get(
  "/timeline/:date",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.currentUser;
      //   const { email } = req.user;
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

      const invited = await InviteModel.find({
        email: req.user.email,
        confirmacao: true,
      }).populate("eventId");

      const datetime = invited.filter(
        (invite) =>
          invite.eventId.dateTime > new Date(date) &&
          invite.eventId.dateTime < dayAfter
      );
      const final = datetime.map((invite) => invite.eventId);

      const all = task
        .concat(event, final)
        .sort((a, b) => a.dateTime - b.dateTime);
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
