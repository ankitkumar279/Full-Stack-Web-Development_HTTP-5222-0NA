const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Skill', SkillSchema);
