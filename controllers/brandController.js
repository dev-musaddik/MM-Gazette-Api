const Brand = require('../models/Brand');

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true });
    res.status(200).json({
      success: true,
      count: brands?.length,
      data: brands
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single brand
// @route   GET /api/brands/:id
// @access  Public
exports.getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        error: 'Brand not found'
      });
    }

    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new brand
// @route   POST /api/brands
// @access  Private/Admin
exports.createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);

    res.status(201).json({
      success: true,
      data: brand
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Brand already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        error: 'Brand not found'
      });
    }

    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        error: 'Brand not found'
      });
    }

    await brand.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
