const express = require('express');
const router = express.Router();

// Check eligibility for a scheme
router.post('/:schemeId', (req, res) => {
    try {
        const { age, income, category, education } = req.body;
        const schemeId = parseInt(req.params.schemeId);

        let eligible = false;
        let reason = '';

        // Mock eligibility logic
        switch (schemeId) {
            case 1: // Jan Dhan Yojana
                eligible = age >= 18;
                reason = eligible ? 'You are eligible' : 'Must be 18 years or older';
                break;
            case 2: // Kisan Samman Nidhi
                eligible = category === 'farmer';
                reason = eligible ? 'You are eligible' : 'Must be a registered farmer';
                break;
            case 3: // Ayushman Bharat
                eligible = income < 500000;
                reason = eligible ? 'You are eligible' : 'Income must be below ₹5 lakhs';
                break;
            case 4: // PM-SVANIDHI
                eligible = category === 'vendor';
                reason = eligible ? 'You are eligible' : 'Must be a registered street vendor';
                break;
            case 5: // MGNREGA
                eligible = category === 'rural' && age >= 18;
                reason = eligible ? 'You are eligible' : 'Must be rural resident and 18+ years';
                break;
            case 6: // Sukanya Samriddhi
                eligible = age < 10;
                reason = eligible ? 'You are eligible' : 'Girl child must be below 10 years';
                break;
            default:
                eligible = false;
                reason = 'Scheme not found';
        }

        res.json({
            schemeId,
            eligible,
            reason,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
