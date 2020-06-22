const Course = require('../models/courseModel');
const factory = require('./handlerFactory');

// Get all Courses
exports.getAllCourses = factory.getAll(Course);

// Get one Course
exports.getCourse = factory.getOne(Course, { path: 'lessons' });

// Create Course
exports.createCourse = factory.createOne(Course);

// Delete Course
exports.deleteCourse = factory.deleteOne(Course);

// Update Course
exports.updateCourse = factory.updateOne(Course);