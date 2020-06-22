const Lesson = require('../models/lessonModel');
const factory = require('./handlerFactory');

// Allow nested routes
exports.setCourseUserIds = (req, res, next) => {
  if (!req.body.course) req.body.course = req.params.courseId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Get all Lessons
exports.getAllLessons = factory.getAll(Lesson);

// Get one Lesson
exports.getLesson = factory.getOne(Lesson, { path: 'lessons' });

// Create Lesson
exports.createLesson = factory.createOne(Lesson);

// Delete Lesson
exports.deleteLesson = factory.deleteOne(Lesson);

// Update Lesson
exports.updateLesson = factory.updateOne(Lesson);