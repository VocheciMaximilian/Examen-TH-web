const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const sass = require('sass'); // Pentru compilare SCSS -> CSS
const fs = require('fs');

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

// Functie pentru compilare automata SCSS -> CSS
function compileScss() {
    const scssPath = path.join(__dirname, 'resurse', 'stiluri', 'style.scss');
    const cssPath = path.join(__dirname, 'resurse', 'stiluri', 'style.css');
    try {
        const result = sass.compile(scssPath);
        fs.writeFileSync(cssPath, result.css);
        console.log('SCSS compilat cu succes!');
    } catch (err) {
        console.error('Eroare la compilarea SCSS:', err);
    }
}

// Compileaza SCSS la pornirea serverului
compileScss();

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

// 1B, 1C, 1D - Rezolvarea cerințelor
app.get('/carti', async (req, res) => {
    try {
        // 1D - Preluare parametri query pentru filtrare dupa an
        let an_minim = parseInt(req.query.an_minim) || 0;
        let an_maxim = parseInt(req.query.an_maxim) || 9999;
        
        // Interogare cu filtrare dupa an_publicare
        const result = await pool.query(
            'SELECT * FROM carti WHERE an_publicare >= $1 AND an_publicare <= $2 ORDER BY data_adaugarii DESC',
            [an_minim, an_maxim]
        );
        // 1C - Preluare scoruri ca array pentru fiecare carte
        const carti = result.rows.map(carte => {
            return {
                ...carte,
                scoruri: carte.scoruri ? carte.scoruri.split(',').map(s => parseInt(s.trim())) : []
            };
        });
        res.render('pagini/carti', { 
            carti: carti,
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
