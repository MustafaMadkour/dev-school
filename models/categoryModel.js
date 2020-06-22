const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A category must have a name'],
			maxlength: [15, 'Category name must be less or equal to 15 characters'],
			minlength: [1, 'Category name must be more or equal to 1 character'],
		},
		slug: String,
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

categorySchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
