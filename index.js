const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const sass = require('sass'); 
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

// Functie pentru compilare automata SCSS CSS
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

compileScss();

// Rute
app.get('/', (req, res) => {
  res.redirect('/carti');
});

// 1B, 1C, 1D 
// 3A, 3B, 3C 
app.get('/carti', async (req, res) => {
    try {
        // 1Dc Preluare parametri query pentru filtrare dupa an
        let an_minim = parseInt(req.query.an_minim) || 0;
        let an_maxim = parseInt(req.query.an_maxim) || 9999;
        
        // 3A, 3B parametri pentru sortare numele autorului
        let sortOrder = req.query.sortOrder || 'ascendent';
        let orderBy = sortOrder === 'descendent' ? 'DESC' : 'ASC';
        
        // 3C - Preluare parametru pentru filtrare dupa scor mediu
        let minScore = parseFloat(req.query.minScore) || 0;
        
        // Interogare cu filtrare dupa an_publicare si sortare dupa numele autorului
        const result = await pool.query(
            'SELECT * FROM carti WHERE an_publicare >= $1 AND an_publicare <= $2 ORDER BY nume_autor ' + orderBy,
            [an_minim, an_maxim]
        );
        
        // 1C - Preluare scoruri ca array pentru fiecare carte
        let carti = result.rows.map(carte => {
            const scoruri = carte.scoruri ? carte.scoruri.split(',').map(s => parseInt(s.trim())) : [];
            const scorMediu = scoruri.length > 0 ? scoruri.reduce((a, b) => a + b, 0) / scoruri.length : 0;
            const scorMinim = scoruri.length > 0 ? Math.min(...scoruri) : 0;
            return {
                ...carte,
                scoruri: scoruri,
                scorMediu: scorMediu,
                scorMinim: scorMinim
            };
        });
        
        // 3B - Sortare secundara după scorul minim cand numele autorului sunt egale
        carti.sort((a, b) => {
            if (a.nume_autor === b.nume_autor) {
                return sortOrder === 'descendent' 
                    ? b.scorMinim - a.scorMinim 
                    : a.scorMinim - b.scorMinim;
            }
            return 0; 
        });
        
        // 3C - Filtrarea dupa scorul mediu
        if (minScore > 0) {
            carti = carti.filter(carte => carte.scorMediu >= minScore);
        }
        
        res.render('pagini/carti', { 
            carti: carti,
            title: 'Afișare Cărți',
            sortOrder: sortOrder,
            minScore: minScore,
            an_minim: an_minim,
            an_maxim: an_maxim
        });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error loading books');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
