const express = require('express');
const {
  createLandingPage,
  getAllLandingPages,
  getLandingPageBySlug,
  updateLandingPage,
  deleteLandingPage,
  incrementConversion,
  submitLead,
  getAllLeads,
  getLandingPageById
} = require('../controllers/landingPageController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin routes (Place specific routes before generic :slug/:id)
router.get('/leads/all', protect, admin, getAllLeads); 
router.get('/admin/all', protect, admin, getAllLandingPages);
router.post('/', protect, admin, createLandingPage);
router.get('/:id', protect, admin, getLandingPageById);
router.put('/:id', protect, admin, updateLandingPage);
router.delete('/:id', protect, admin, deleteLandingPage);

// Public routes
router.post('/:id/lead', submitLead);
router.post('/slug/:slug/conversion', incrementConversion); // Also update conversion route to match pattern?
router.get('/slug/:slug', getLandingPageBySlug);

module.exports = router;
