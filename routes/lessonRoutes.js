const express = require('express');
const lessonController = require('./../controllers/lessonController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(authController.protect, lessonController.getAllLessons)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		lessonController.createLesson,
	);

router
	.route('/:id')
	.get(authController.protect, lessonController.getLesson)
	.patch(
		authController.protect,
		authController.restrictTo('admin'),
		lessonController.updateLesson,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		lessonController.deleteLesson,
	);

module.exports = router;
