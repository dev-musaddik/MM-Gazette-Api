const asyncHandler = require('express-async-handler');
const LandingPage = require('../models/LandingPage');
const slugify = require('slugify');

// @desc    Get all landing pages
// @route   GET /api/landing-pages
// @access  Public
const getLandingPages = asyncHandler(async (req, res) => {
    // If admin, return all. If public, can filter if needed.
    // Assuming this is primarily for admin list for now.
    const pages = await LandingPage.find({}).sort({ createdAt: -1 });
    res.json({
        success: true,
        count: pages.length,
        data: pages
    });
});

// @desc    Get single landing page by slug (Public view)
// @route   GET /api/landing-pages/:slug
// @access  Public
const getLandingPageBySlug = asyncHandler(async (req, res) => {
    const page = await LandingPage.findOne({ slug: req.params.slug, isActive: true });

    if (page) {
        res.json({
            success: true,
            data: page
        });
    } else {
        res.status(404);
        throw new Error('Landing Page not found');
    }
});

// @desc    Create a landing page
// @route   POST /api/landing-pages
// @access  Private/Admin
const createLandingPage = asyncHandler(async (req, res) => {
    const { title, heroHeadline, heroSubheadline, heroImage, ctaText, ctaLink, features, trackingCode, isActive, slug } = req.body;

    // Check if slug exists if provided manually
    if (slug) {
        const pageExists = await LandingPage.findOne({ slug });
        if (pageExists) {
            res.status(400);
            throw new Error('Slug already exists');
        }
    }

    const page = await LandingPage.create({
        title,
        slug: slug || slugify(title, { lower: true, strict: true }),
        heroHeadline,
        heroSubheadline,
        heroImage,
        ctaText,
        ctaLink,
        features: features || [], // Default to empty array if none provided
        trackingCode,
        isActive: isActive !== undefined ? isActive : true
    });

    if (page) {
        res.status(201).json({
            success: true,
            data: page
        });
    } else {
        res.status(400);
        throw new Error('Invalid landing page data');
    }
});

// @desc    Update a landing page
// @route   PUT /api/landing-pages/:id
// @access  Private/Admin
const updateLandingPage = asyncHandler(async (req, res) => {
    const page = await LandingPage.findById(req.params.id);

    if (page) {
        const { title, slug, heroHeadline, heroSubheadline, heroImage, ctaText, ctaLink, features, trackingCode, isActive } = req.body;

        page.title = title || page.title;
        if (slug && slug !== page.slug) {
             const pageExists = await LandingPage.findOne({ slug });
             if (pageExists) {
                 res.status(400);
                 throw new Error('Slug already exists');
             }
             page.slug = slug;
        }
        page.heroHeadline = heroHeadline || page.heroHeadline;
        page.heroSubheadline = heroSubheadline || page.heroSubheadline;
        page.heroImage = heroImage || page.heroImage;
        page.ctaText = ctaText || page.ctaText;
        page.ctaLink = ctaLink || page.ctaLink;
        page.features = features || page.features;
        page.trackingCode = trackingCode !== undefined ? trackingCode : page.trackingCode;
        page.isActive = isActive !== undefined ? isActive : page.isActive;

        const updatedPage = await page.save();
        res.json({
            success: true,
            data: updatedPage
        });
    } else {
        res.status(404);
        throw new Error('Landing Page not found');
    }
});

// @desc    Delete a landing page
// @route   DELETE /api/landing-pages/:id
// @access  Private/Admin
const deleteLandingPage = asyncHandler(async (req, res) => {
    const page = await LandingPage.findById(req.params.id);

    if (page) {
        await page.deleteOne();
        res.json({ message: 'Landing Page removed' });
    } else {
        res.status(404);
        throw new Error('Landing Page not found');
    }
});

// @desc    Get landing page by ID (for editing)
// @route   GET /api/landing-pages/edit/:id
// @access  Private/Admin
const getLandingPageById = asyncHandler(async (req, res) => {
    const page = await LandingPage.findById(req.params.id);

    if (page) {
        res.json({
            success: true,
            data: page
        });
    } else {
        res.status(404);
        throw new Error('Landing Page not found');
    }
});

module.exports = {
    getLandingPages,
    getLandingPageBySlug,
    createLandingPage,
    updateLandingPage,
    deleteLandingPage,
    getLandingPageById
};
