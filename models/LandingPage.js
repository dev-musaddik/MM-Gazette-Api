const mongoose = require('mongoose');
const slugify = require('slugify');

const landingPageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    heroHeadline: {
        type: String,
        required: true
    },
    heroSubheadline: {
        type: String,
        required: true
    },
    heroImage: {
        type: String,
        required: true
    },
    ctaText: {
        type: String,
        required: true,
        default: 'Get Started'
    },
    ctaLink: {
        type: String,
        required: true,
        default: '/contact'
    },
    features: [{
        title: String,
        description: String,
        icon: String // e.g., 'Star', 'Shield', 'Zap' - matched on frontend
    }],
    trackingCode: {
        type: String, // For custom scripts like FB Pixel
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        enum: ['lead', 'sales', 'clickthrough'],
        default: 'clickthrough'
    },
    price: {
        type: Number,
        default: 0
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    }
}, {
    timestamps: true
});

// Middleware to create slug from title if not provided
landingPageSchema.pre('save', function(next) {
    if (!this.isModified('title') && !this.isNew) return next();

    if (!this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const LandingPage = mongoose.model('LandingPage', landingPageSchema);

module.exports = LandingPage;
