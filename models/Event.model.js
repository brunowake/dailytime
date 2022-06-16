const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, min: 0, default: 60 },
    description: { type: String, maxlength: 500 },
    timeReminder: { type: Number, min: 0 },
    //   inviteId: [{ type: Schema.Types.ObjectId, ref: "Invites" }],
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
