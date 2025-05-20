const Timetable = require('../models/Timetable');

// Upload timetable image
exports.uploadTimetable = async (req, res) => {
  const { department, semester, section, role } = req.body;

  // Validate required fields
  if (!department || !semester || !section || !role || !req.file) {
    return res.status(400).json({ message: 'All fields including timetable image are required' });
  }

  // Store path relative to /uploads (for public access)
  const imagePath = `/uploads/${req.file.filename}`;

  try {
    const timetable = new Timetable({
      department,
      semester,
      section,
      role,
      imagePath,
      uploadedBy: req.user.id,
    });

    await timetable.save();
    res.status(201).json(timetable);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// Search timetable
exports.searchTimetable = async (req, res) => {
  const { department, semester, section, role } = req.query;

  const query = {};
  if (department) query.department = department;
  if (semester) query.semester = semester;
  if (section) query.section = section;
  if (role) query.role = role;

  try {
    const timetables = await Timetable.find(query);
    res.json(timetables);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
};
