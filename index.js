const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

// Database configuration
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'carti',
    password:'1406',
    port:5432,
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'resurse')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

// Routes
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM carti ORDER BY data_adaugarii DESC');
        res.render('pagini/index', { 
            carti: result.rows,
            title: 'Gestionare Cărți'
        });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error loading books');
    }
});

// 1B - Rezolvarea cerinței
app.get('/carti', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM carti ORDER BY data_adaugarii DESC');
        res.render('pagini/carti', { 
            carti: result.rows,
            title: 'Afișare Cărți'
        });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error loading books');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
