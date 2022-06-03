const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  dateTime: Number,
  duration: { type: Number, min: 0 },
  description: { type: String, maxlength: 500 },
  address: String,
  //   inviteId: [{ type: Schema.Types.ObjectId, ref: "Invites" }],
});

module.exports = model("Event", eventSchema);
