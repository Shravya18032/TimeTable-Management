const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  department: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String, required: true },
  role: { type: String, enum: ['hod', 'faculty', 'student'], required: true },
  imagePath: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', TimetableSchema);
