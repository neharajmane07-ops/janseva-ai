const express = require('express');
const router = express.Router();

const applications = [];

// Submit application
router.post('/', (req, res) => {
    try {
        const { userId, schemeId, details } = req.body;

        const application = {
            id: Date.now(),
            userId,
            schemeId,
            details,
            status: 'submitted',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        applications.push(application);

        res.status(201).json({
            message: 'Application submitted successfully',
            application
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user applications
router.get('/user/:userId', (req, res) => {
    try {
        const userApplications = applications.filter(
            a => a.userId === parseInt(req.params.userId)
        );
        res.json(userApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get application status
router.get('/:id', (req, res) => {
    try {
        const application = applications.find(a => a.id === parseInt(req.params.id));
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update application status
router.patch('/:id', (req, res) => {
    try {
        const application = applications.find(a => a.id === parseInt(req.params.id));
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = req.body.status || application.status;
        application.updatedAt = new Date();

        res.json({
            message: 'Application updated successfully',
            application
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
