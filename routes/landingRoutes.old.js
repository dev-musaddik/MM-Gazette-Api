const express = require('express');
const router = express.Router();
const {
    getLandingPages,
    createLandingPage,
    getLandingPageBySlug,
    updateLandingPage,
    deleteLandingPage,
    getLandingPageById
} = require('../controllers/landingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getLandingPages)
    .post(protect, admin, createLandingPage);

router.route('/slug/:slug')
    .get(getLandingPageBySlug);

router.route('/:id')
    .get(protect, admin, getLandingPageById) // For editing
    .delete(protect, admin, deleteLandingPage)
    .put(protect, admin, updateLandingPage);

module.exports = router;
