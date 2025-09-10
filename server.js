const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Rules & History page
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rules.html'));
});

// Enter Records page
app.get('/enter', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'enter.html'));
});

// Home page (alias for Enter page)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'enter.html'));
});

// Handle form submissions
app.post('/submit', (req, res) => {
    console.log('Form submission received:', req.body);
    res.send(`
        <h1>Record Submitted!</h1>
        <p>Thank you, ${req.body.name}, for submitting your record.</p>
        <a href="/enter">Submit Another</a>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
