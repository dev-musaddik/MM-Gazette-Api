const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllArticles)
  .post(protect, admin, createArticle);

router.route('/:slug')
  .get(getArticleBySlug);

router.route('/:id')
  .put(protect, admin, updateArticle)
  .delete(protect, admin, deleteArticle);

module.exports = router;
