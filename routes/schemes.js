const express = require('express');
const router = express.Router();

const schemes = [
    {
        id: 1,
        name: 'Pradhan Mantri Jan Dhan Yojana',
        category: 'Banking',
        description: 'Financial inclusion for all citizens',
        eligibility: 'All citizens of 18+ years',
        benefits: 'Zero balance account, insurance coverage',
        department: 'Ministry of Finance'
    },
    {
        id: 2,
        name: 'Pradhan Mantri Kisan Samman Nidhi',
        category: 'Agriculture',
        description: 'Direct income support to farmers',
        eligibility: 'Farmers with land holdings',
        benefits: '₹6000 per year in 3 installments',
        department: 'Ministry of Agriculture'
    },
    {
        id: 3,
        name: 'Ayushman Bharat',
        category: 'Health',
        description: 'Health coverage for economically weaker sections',
        eligibility: 'Lower income groups',
        benefits: '₹5 lakh health coverage per year',
        department: 'Ministry of Health'
    },
    {
        id: 4,
        name: 'PM-SVANIDHI',
        category: 'Business',
        description: 'Micro-credit scheme for street vendors',
        eligibility: 'Registered street vendors',
        benefits: 'Collateral-free loan up to ₹10,000',
        department: 'Ministry of Housing & Urban Affairs'
    },
    {
        id: 5,
        name: 'MGNREGA',
        category: 'Employment',
        description: 'Rural employment guarantee',
        eligibility: 'Rural workers 18+ years',
        benefits: '₹202-258 per day for 100 days',
        department: 'Ministry of Rural Development'
    },
    {
        id: 6,
        name: 'Sukanya Samriddhi Yojana',
        category: 'Savings',
        description: 'Savings scheme for girl child',
        eligibility: 'Girls below 10 years',
        benefits: '8.2% interest rate per annum',
        department: 'Ministry of Finance'
    }
];

// Get all schemes
router.get('/', (req, res) => {
    res.json(schemes);
});

// Get scheme by ID
router.get('/:id', (req, res) => {
    const scheme = schemes.find(s => s.id === parseInt(req.params.id));
    if (!scheme) {
        return res.status(404).json({ message: 'Scheme not found' });
    }
    res.json(scheme);
});

// Search schemes
router.get('/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const results = schemes.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );
    res.json(results);
});

module.exports = router;
