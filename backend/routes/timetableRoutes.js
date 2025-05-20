const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadTimetable, searchTimetable } = require('../controllers/timetableController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Custom multer storage to preserve file extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // ".png", ".jpg"
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPG and PNG files are allowed'), false);
    }
    cb(null, true);
  }
});

// Routes
router.post('/upload', protect(['admin']), upload.single('timetable'), uploadTimetable);
router.get('/search', protect(['admin', 'hod', 'faculty', 'student']), searchTimetable);

module.exports = router;
