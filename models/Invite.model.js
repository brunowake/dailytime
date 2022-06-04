const { Schema, model } = require("mongoose");

const inviteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
  email: { type: String, required: true },
  confirmacao: { type: Boolean, required: true, default: false },
});

module.exports = model("Invite", inviteSchema);
