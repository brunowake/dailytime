const { Schema, model } = require("mongoose");

const inviteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true },
    confirmacao: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Invite", inviteSchema);
