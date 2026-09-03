// State Management
const state = {
    currentPage: 'home',
    user: null,
    schemes: [],
    applications: [],
    isLoggedIn: false
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderHTML();
    setupEventListeners();
    loadSchemes();
}

function renderHTML() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <nav class="navbar">
            <div class="logo">
                <div class="logo-icon">🏛️</div>
                <div>
                    <div>JANSEVA AI</div>
                    <div class="tagline">AI-Powered Government Scheme Assistant</div>
                </div>
            </div>
            <div class="nav-links">
                <a onclick="navigateTo('home')" class="nav-link active">Home</a>
                <a onclick="navigateTo('about')" class="nav-link">About Us</a>
                <a onclick="navigateTo('help')" class="nav-link">Help</a>
                <div class="language-dropdown">
                    <select id="language">
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                        <option value="ta">தமிழ்</option>
                        <option value="te">తెలుగు</option>
                    </select>
                </div>
                <div class="auth-buttons">
                    ${!state.isLoggedIn ? `
                        <button class="login-btn" onclick="openLoginModal()">
                            <i class="fas fa-sign-in-alt"></i> Login / Sign Up
                        </button>
                    ` : `
                        <span>Welcome, ${state.user?.name || 'User'}</span>
                        <button class="login-btn" onclick="logout()" style="background-color: #dc3545;">
                            Logout
                        </button>
                    `}
                </div>
            </div>
        </nav>

        <!-- Auth Modal -->
        <div id="authModal" class="modal">
            <div class="modal-content">
                <button class="close-btn" onclick="closeAuthModal()">&times;</button>
                <div id="authTabs">
                    <div id="loginTab" class="auth-tab active">
                        <h2>Login</h2>
                        <form onsubmit="handleLogin(event)">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="loginEmail" required>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" id="loginPassword" required>
                            </div>
                            <div class="form-group">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <p style="text-align: center; margin-top: 1rem;">
                            Don't have an account? <a onclick="switchTab('signup')" style="color: #0052cc; cursor: pointer;">Sign Up</a>
                        </p>
                    </div>

                    <div id="signupTab" class="auth-tab" style="display: none;">
                        <h2>Sign Up</h2>
                        <form onsubmit="handleSignup(event)">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" id="signupName" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="signupEmail" required>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" id="signupPassword" required>
                            </div>
                            <div class="form-group">
                                <label>Aadhar Number</label>
                                <input type="text" id="signupAadhar" required>
                            </div>
                            <div class="form-group">
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                        <p style="text-align: center; margin-top: 1rem;">
                            Already have an account? <a onclick="switchTab('login')" style="color: #0052cc; cursor: pointer;">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pages -->
        <div id="homePage" class="page active">
            <div class="hero">
                <div class="hero-content">
                    <h1>JANSEVA AI</h1>
                    <p>AI-Powered Government Scheme Assistant</p>
                    <p style="font-size: 1rem; color: #666; margin-bottom: 2rem;">
                        Discover, check eligibility and apply for government schemes across all departments – all in one place.
                    </p>
                    <div class="hero-cta">
                        <button class="btn-primary" onclick="navigateTo('schemes')">Explore Schemes</button>
                        <button class="btn-secondary" onclick="navigateTo('about')">Learn More</button>
                    </div>
                </div>
            </div>

            <div class="stats">
                <div class="stat-item">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-number">25+</div>
                    <div class="stat-label">Departments</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">📋</div>
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Schemes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">👥</div>
                    <div class="stat-number">10L+</div>
                    <div class="stat-label">Beneficiaries</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">🤖</div>
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">AI Support</div>
                </div>
            </div>

            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon">👤</div>
                    <h3>Personalized Results</h3>
                    <p>Get schemes based on your profile</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💰</div>
                    <h3>100% Free Service</h3>
                    <p>All services are completely free</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure & Reliable</h3>
                    <p>Your data is safe with us</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🌍</div>
                    <h3>Multi-language Support</h3>
                    <p>Available in multiple languages</p>
                </div>
            </div>
        </div>

        <div id="schemesPage" class="page">
            <div class="page-container">
                <h2>Government Schemes</h2>
                <div class="cards-grid" id="schemesGrid">
                    <div class="card" style="grid-column: 1/-1; text-align: center;">
                        <p>Loading schemes...</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="aboutPage" class="page">
            <div class="page-container">
                <h2>About JANSEVA AI</h2>
                <div class="cards-grid">
                    <div class="card">
                        <h3>Our Mission</h3>
                        <p>To empower every citizen of India by providing easy access to government schemes and benefits through AI-powered assistance.</p>
                    </div>
                    <div class="card">
                        <h3>Our Vision</h3>
                        <p>A transparent and efficient digital ecosystem where government benefits reach every eligible citizen without barriers.</p>
                    </div>
                    <div class="card">
                        <h3>Why Choose Us?</h3>
                        <p>Complete digital transformation of scheme discovery and application process with 24/7 AI support.</p>
                    </div>
                    <div class="card">
                        <h3>Safety & Privacy</h3>
                        <p>Your personal information is encrypted and protected with highest security standards.</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="helpPage" class="page">
            <div class="page-container">
                <h2>Help & Support</h2>
                <div class="cards-grid">
                    <div class="card">
                        <h3>How to Get Started?</h3>
                        <p>1. Create an account<br>2. Fill your profile details<br>3. Get personalized scheme recommendations<br>4. Apply directly through our platform</p>
                    </div>
                    <div class="card">
                        <h3>What Information Do I Need?</h3>
                        <p>Aadhar Number, Income details, Employment status, Family details, and any specific certifications.</p>
                    </div>
                    <div class="card">
                        <h3>How Long Does Application Take?</h3>
                        <p>Most applications are processed within 2-4 weeks. You can track your application status in real-time.</p>
                    </div>
                    <div class="card">
                        <h3>Need More Help?</h3>
                        <p>Contact us 24/7 via chat, email, or phone. Our AI assistant is always ready to help!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function navigateTo(page) {
    state.currentPage = page;
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');

    if (page === 'schemes') {
        renderSchemes();
    }
}

function openLoginModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(t => t.style.display = 'none');
    document.getElementById(tab + 'Tab').style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Mock authentication
    state.isLoggedIn = true;
    state.user = { name: 'User', email: email };

    closeAuthModal();
    renderHTML();
    setupEventListeners();
    alert('Logged in successfully!');
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const aadhar = document.getElementById('signupAadhar').value;

    // Mock registration
    state.isLoggedIn = true;
    state.user = { name: name, email: email, aadhar: aadhar };

    closeAuthModal();
    renderHTML();
    setupEventListeners();
    alert('Account created successfully!');
}

function logout() {
    state.isLoggedIn = false;
    state.user = null;
    renderHTML();
    setupEventListeners();
    navigateTo('home');
}

function loadSchemes() {
    state.schemes = [
        { id: 1, name: 'Pradhan Mantri Jan Dhan Yojana', category: 'Banking', description: 'Financial inclusion for all' },
        { id: 2, name: 'Pradhan Mantri Kisan Samman Nidhi', category: 'Agriculture', description: 'Support for farmers' },
        { id: 3, name: 'Ayushman Bharat', category: 'Health', description: 'Health coverage for all' },
        { id: 4, name: 'PM-SVANIDHI', category: 'Business', description: 'Support for street vendors' },
        { id: 5, name: 'MGNREGA', category: 'Employment', description: 'Rural employment guarantee' },
        { id: 6, name: 'Sukanya Samriddhi Yojana', category: 'Savings', description: 'Savings scheme for girls' }
    ];
}

function renderSchemes() {
    const grid = document.getElementById('schemesGrid');
    grid.innerHTML = state.schemes.map(scheme => `
        <div class="card">
            <h3>${scheme.name}</h3>
            <p><strong>Category:</strong> ${scheme.category}</p>
            <p>${scheme.description}</p>
            <button class="btn-primary" onclick="checkEligibility(${scheme.id})" style="width: 100%;">
                Check Eligibility
            </button>
        </div>
    `).join('');
}

function checkEligibility(schemeId) {
    if (!state.isLoggedIn) {
        alert('Please login first to check eligibility');
        openLoginModal();
        return;
    }
    alert('Eligibility check for scheme ' + schemeId + ' would be performed here');
}
