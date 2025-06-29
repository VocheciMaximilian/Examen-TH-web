-- Create database
CREATE DATABASE carti;

-- Connect to the database
\c carti;

-- Create carti table
CREATE TABLE carti (
    id SERIAL PRIMARY KEY,
    titlu VARCHAR(100) NOT NULL,
    nume_autor VARCHAR(80) NOT NULL,
    an_publicare INTEGER,
    tema VARCHAR(50),
    scoruri VARCHAR(50),
    data_adaugarii TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample books
INSERT INTO carti (titlu, nume_autor, an_publicare, tema, scoruri)
VALUES
('Mandrie si prejudecata', 'Jane Austen', 1813, 'Clasic', '9,8,10,9'),
('1984', 'George Orwell', 1949, 'Distopie', '10,9,8,10'),
('Crime si pedeapsa', 'Feodor Dostoievski', 1866, 'Psihologic', '9,9,8,10'),
('Marele Gatsby', 'F. Scott Fitzgerald', 1925, 'Roman', '8,7,9,10'),
('Anna Karenina', 'Lev Tolstoi', 1877, 'Clasic', '10,10,9,9'),
('Don Quijote', 'Miguel de Cervantes', 1605, 'Aventura', '7,8,9,10'),
('Orbitor', 'Mircea Cartarescu', 2007, 'Fantezie', '10,9,10,9'),
('Sapiens', 'Yuval Noah Harari', 2011, 'Non-fictiune', '9,8,9,10'),
('Hamlet', 'William Shakespeare', 1603, 'Teatru', '10,10,10,9'),
('Crima din Orient Express', 'Agatha Christie', 1934, 'Mister', '8,9,10,9');

-- Verify the table structure
\d carti;

-- Verify the data
SELECT * FROM carti; 