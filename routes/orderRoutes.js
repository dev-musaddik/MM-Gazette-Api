const express = require('express');
const {
  createOrder,
  createGuestOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getPublicOrderById,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Public routes
router.post('/guest', createGuestOrder);
router.get('/track/:id', getPublicOrderById);

// User routes (protected)
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/admin/all', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
