const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

// @desc    Create a new contact message
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const contact = await Contact.create({
        name,
        email,
        subject,
        message
    });

    res.status(201).json(contact);
});

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
});

// @desc    Get contact message by ID
// @route   GET /api/contacts/:id
// @access  Private/Admin
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        // Mark as read when opened
        if (!contact.read) {
            contact.read = true;
            contact.status = contact.status === 'New' ? 'Read' : contact.status;
            await contact.save();
        }
        res.json(contact);
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        await contact.deleteOne();
        res.json({ message: 'Message removed' });
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
const updateContactStatus = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        contact.status = req.body.status || contact.status;
        const updatedContact = await contact.save();
        res.json(updatedContact);
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

module.exports = {
    createContact,
    getContacts,
    getContactById,
    deleteContact,
    updateContactStatus
};
