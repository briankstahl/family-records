const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Rules & History page
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rules.html'));
});

// Form submission page
app.get('/enter', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'enter.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    console.log('Form submission received:', req.body);
    // Here you could save the data to a file or database
    res.send('<h2>Thank you! Your record has been submitted.</h2><a href="/">Back to Home</a>');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
