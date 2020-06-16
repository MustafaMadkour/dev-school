const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');
// const User = require('./userModel');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A course must have less or equal 40 characters'],
      minlength: [10, 'A course must have more or equal 40 characters'],
      // validate: [validator.isAlpha, 'A tour name must only contain charcters.'],
    },
    category: [String],
    slug: String,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A course must have a summary.'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A course must have a cover image.'],
    },
    lessons: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    authors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.index({ slug: 1 });

// virtual populate
courseSchema.virtual('lessons', {
  ref: 'Lesson',
  foreignField: 'course',
  localField: '_id',
});

// Document Middleware: runs before .save() and .create()
courseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'authors',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
