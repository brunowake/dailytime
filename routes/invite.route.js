const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const InviteModel = require("../models/Invite.model");
const EventModel = require("../models/Event.model");

router.post(
  "/newinvite",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const data = req.body;
      const { _id } = req.currentUser;

      const result = await InviteModel.create({
        eventId: data.eventId,
        userId: _id,
        email: data.email,
      });

      //   inserir Id do invite criado no campo inviteId do evento
      //   if(!result){
      //      const event = await EventModel.findOneAndUpdate({_id:data._Id}, { $push: { inviteId: result._id } });
      //   }

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to register invite" });
    }
  }
);

router.get(
  "/eventinvites/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params; //invite que pertence ao evento
      const result = await InviteModel.find({
        eventId: _id,
      });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find invites" });
    }
  }
);

router.get(
  "/myinvites",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { email } = req.currentUser; // invite do usuario logado
      console.log(req.currentUser);
      const result = await InviteModel.find({
        email,
      });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to find invites" });
    }
  }
);

router.delete(
  "/invite/:_id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { _id } = req.params;

      const result = await InviteModel.deleteOne({
        _id,
      });

      if (result.deletedCount < 1) {
        return res.status(404).json({ msg: "Task not found" });
      }

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to delete invite" });
    }
  }
);

module.exports = router;
