const Article = require('../models/Article');

/**
 * @desc    Get all articles
 * @route   GET /api/articles
 * @access  Public
 */
const getAllArticles = async (req, res, next) => {
  try {
    const { category, tag } = req.query;
    let query = { published: true };

    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }

    const articles = await Article.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: articles?.length,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

const mongoose = require('mongoose'); // Add mongoose import

/**
 * @desc    Get single article by Slug or ID
 * @route   GET /api/articles/:slug
 * @access  Public
 */
const getArticleBySlug = async (req, res, next) => {
  try {
    const param = req.params.slug;
    let article;

    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      console.log(`Searching for article by ID: ${param}`);
      article = await Article.findById(param);
      console.log(`Found by ID: ${!!article}`);
    }

    // If not found by ID (or not an ID), try finding by slug
    if (!article) {
      console.log(`Searching for article by slug: ${param}`);
      article = await Article.findOne({ slug: param });
      console.log(`Found by slug: ${!!article}`);
    }

    if (!article) {
      console.log(`Article not found for param: ${param}`);
      res.status(404);
      throw new Error('Article not found');
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new article
 * @route   POST /api/articles
 * @access  Private/Admin
 */
const createArticle = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update article
 * @route   PUT /api/articles/:id
 * @access  Private/Admin
 */
const updateArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete article
 * @route   DELETE /api/articles/:id
 * @access  Private/Admin
 */
const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    await article.deleteOne();

    res.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
