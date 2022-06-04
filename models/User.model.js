const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  profilePicture: { type: String },
  myInvites: { type: Schema.Types.ObjectId, ref: "Invite" },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
