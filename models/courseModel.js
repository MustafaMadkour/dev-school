const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A course must have a name'],
			unique: true,
			trim: true,
			maxlength: [
				40,
				'A course name must have less or equal then 40 characters',
			],
			minlength: [
				10,
				'A course name must have more or equal then 10 characters',
			],
			// validate: [validator.isAlpha, 'Course name must only contain characters']
		},
		slug: String,
		points: {
			type: Number,
			required: [true, 'A tour must have points'],
		},
		summary: {
			type: String,
			trim: true,
			required: [true, 'A course must have a summary'],
		},
		description: {
			type: String,
			trim: true,
		},
		imageCover: {
			type: String,
			required: [true, 'A course must have a cover image'],
		},
		images: [String],
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
courseSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// QUERY MIDDLEWARE

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
