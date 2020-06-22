const mongoose = require('mongoose');
const slugify = require('slugify');

const lessonSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A lesson must have a name'],
		},
		slug: String,
		summary: {
			type: String,
			trim: true,
			required: [true, 'A lesson must have a summary'],
		},
		image: String,
		content: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false,
		},
		course: {
			type: mongoose.Schema.ObjectId,
			ref: 'Course',
			required: [true, 'Lesson must belong to a course'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// set rule for lesson for one course only by indexes
lessonSchema.index({ course: 1 }, { unique: true });

// // Query Miiddleware
// lessonSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'course',
//     select: 'name',
//   });
//   next();
// });

lessonSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
