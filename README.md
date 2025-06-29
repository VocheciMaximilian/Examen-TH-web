# Gestionare Cărți - Examen TH Web

O aplicație web pentru gestionarea unei colecții de cărți, dezvoltată cu Node.js, Express, EJS și PostgreSQL.

## Caracteristici

- ✅ Adăugare cărți noi
- ✅ Vizualizare listă cărți
- ✅ Editare cărți existente
- ✅ Ștergere cărți
- ✅ Sistem de rating cu stele
- ✅ Interfață modernă și responsivă
- ✅ Validare date
- ✅ Timestamp automat pentru data adăugării

## Structura Bazei de Date

### Tabelul `carti`
- `id` - Cheie primară, auto increment
- `titlu` - VARCHAR(100), NOT NULL
- `nume_autor` - VARCHAR(80), NOT NULL
- `an_publicare` - INTEGER
- `tema` - VARCHAR(50)
- `scoruri` - VARCHAR(50) (ex: "9,8,7,10")
- `data_adaugarii` - TIMESTAMP cu valoarea implicită CURRENT_TIMESTAMP

## Instalare și Configurare

### 1. Instalare Dependențe

```bash
npm install
```

### 2. Configurare Baza de Date

1. Deschideți pgAdmin
2. Creați o bază de date nouă numită `examen`
3. Rulați scriptul SQL din `database_setup.sql` pentru a crea tabelul și a insera datele inițiale

Sau rulați direct în pgAdmin:

```sql
-- Creați tabelul
CREATE TABLE carti (
    id SERIAL PRIMARY KEY,
    titlu VARCHAR(100) NOT NULL,
    nume_autor VARCHAR(80) NOT NULL,
    an_publicare INTEGER,
    tema VARCHAR(50),
    scoruri VARCHAR(50),
    data_adaugarii TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserați cărți de exemplu
INSERT INTO carti (titlu, nume_autor, an_publicare, tema, scoruri) VALUES
('1984', 'George Orwell', 1949, 'Distopie', '9,8,7,10'),
('Pride and Prejudice', 'Jane Austen', 1813, 'Roman', '8,9,7,8'),
('To Kill a Mockingbird', 'Harper Lee', 1960, 'Drama', '9,10,8,9'),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Roman', '8,7,9,8'),
('One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, 'Realism magic', '9,9,10,8');
```

### 3. Configurare Variabile de Mediu

Copiați `env.example` în `.env` și configurați-vă datele de conectare la baza de date:

```bash
cp env.example .env
```

Editați fișierul `.env`:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=examen
DB_PASSWORD=your_actual_password
DB_PORT=5432
PORT=3000
```

### 4. Pornire Aplicație

```bash
# Pentru dezvoltare (cu nodemon)
npm run dev

# Pentru producție
npm start
```

Aplicația va fi disponibilă la: http://localhost:3000

## Structura Proiectului

```
Examen-TH-web/
├── index.js                 # Aplicația principală Express
├── package.json            # Dependențe și scripturi
├── database_setup.sql      # Script pentru crearea bazei de date
├── env.example             # Exemplu configurare variabile de mediu
├── README.md               # Acest fișier
├── resurse/                # Resurse statice
│   ├── images/             # Imagini
│   └── stiluri/            # Fișiere CSS/SCSS
└── views/                  # Template-uri EJS
    ├── fragmente/          # Componente reutilizabile
    │   ├── head.ejs        # Header HTML
    │   ├── header.ejs      # Navigare
    │   └── footer.ejs      # Footer și JavaScript
    └── pagini/             # Pagini principale
        └── index.ejs       # Pagina principală
```

## API Endpoints

- `GET /` - Pagina principală cu lista cărților
- `POST /carti` - Adăugare carte nouă
- `GET /carti/:id` - Obținere carte după ID
- `PUT /carti/:id` - Actualizare carte
- `DELETE /carti/:id` - Ștergere carte

## Tehnologii Utilizate

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Baza de Date**: PostgreSQL
- **Frontend**: Bootstrap 5, Font Awesome
- **JavaScript**: Vanilla JS pentru interacțiuni

## Funcționalități

### Adăugare Carte
- Formular cu validare pentru toate câmpurile obligatorii
- Limitări de lungime pentru câmpuri
- Validare pentru anul de publicare

### Vizualizare Cărți
- Tabel responsiv cu toate informațiile
- Rating vizual cu stele
- Badge-uri pentru teme
- Formatare date în format românesc

### Editare Cărți
- Modal pentru editare
- Pre-completare formular cu datele existente
- Validare în timp real

### Ștergere Cărți
- Confirmare înainte de ștergere
- Feedback vizual pentru utilizator

## Contribuții

Pentru a contribui la acest proiect:

1. Fork repository-ul
2. Creați o branch nouă pentru feature
3. Commit și push modificările
4. Creați un Pull Request

## Licență

MIT License 