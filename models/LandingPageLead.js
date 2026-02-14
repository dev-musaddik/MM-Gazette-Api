const mongoose = require('mongoose');

const landingPageLeadSchema = mongoose.Schema({
    landingPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LandingPage',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'converted'],
        default: 'new'
    }
}, {
    timestamps: true
});

const LandingPageLead = mongoose.model('LandingPageLead', landingPageLeadSchema);

module.exports = LandingPageLead;
