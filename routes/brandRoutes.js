const express = require('express');
const router = express.Router();
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brandController');

const { protect, admin } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getAllBrands)
  .post(protect, admin, createBrand);

router
  .route('/:id')
  .get(getBrand)
  .put(protect, admin, updateBrand)
  .delete(protect, admin, deleteBrand);

module.exports = router;
