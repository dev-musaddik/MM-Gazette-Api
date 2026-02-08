const mongoose = require('mongoose');

/**
 * Product Schema
 * Stores product information for printing items
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand name'],
    trim: true,
  },
  basePrice: {
    type: Number,
    required: [true, 'Please provide a base price'],
    min: 0,
  },
  images: [{
    type: String, // Store image URLs/paths
  }],
  specs: {
    type: Map,
    of: String, // Flexible key-value pairs for specs (e.g., "RAM": "16GB", "Processor": "M1")
    default: {}
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
