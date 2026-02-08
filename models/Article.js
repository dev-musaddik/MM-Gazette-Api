const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an article title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide article content'],
  },
  author: {
    type: String, // Could be a User reference later, keeping simple for now
    default: 'MM Gazette Team',
  },
  image: {
    type: String,
    default: '',
  },
  tags: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['News', 'Review', 'Tutorial', 'Opinion'],
    default: 'News',
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create slug from title before saving
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().split(' ').join('-');
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);
