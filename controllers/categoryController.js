const Category = require('../models/categoryModel');
const factory = require('./handlerFactory');

// Get all Categorys
exports.getAllCategories = factory.getAll(Category);

// Get one Category
exports.getCategory = factory.getOne(Category);

// Create Category
exports.createCategory = factory.createOne(Category);

// Delete Category
exports.deleteCategory = factory.deleteOne(Category);

// Update Category
exports.updateCategory = factory.updateOne(Category);