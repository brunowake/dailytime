const { Schema, model, Types } = require("mongoose");

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    dateTime: { type: Date, required: true },
    duration: { type: Number, required: true, default: 60 },
    timeReminder: { type: Number, default: 0 }, //Avaliar se realmente colocaremos um tempo ou se vai ser padrão (5min)
    recurrence: { type: String },

    //repeat: {}
    userId: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Task", TaskSchema);
