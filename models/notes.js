const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true, default: "General" },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

module.exports = mongoose.model("notes", notesSchema);
