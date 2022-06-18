const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    category: { type: String, required: true },
    dateTime: { type: Date, required: true },
    duration: { type: Number, min: 0, default: 60 },
    description: { type: String, maxlength: 500 },
    timeReminder: { type: Number, min: 0 },
    invites: [{ type: Schema.Types.ObjectId, ref: "Invite" }],

  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
