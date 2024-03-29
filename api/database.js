const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

// Load configuration from .env file
dotenv.config();

const dbPath = process.env.DATABASE_PATH || './database.sqlite';

const tableCreateSql = `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY,
    score INTEGER NOT NULL DEFAULT 0
  )`;

// Open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(tableCreateSql, (err) => {
            if (err) {
                console.error('Error creating table', err);
            }
        });
    }
});

const getAllScores = (callback) => {
    db.all('SELECT * FROM scores', [], callback);
}

const getScoreById = (id, callback) => {
    db.get('SELECT * FROM scores WHERE id = ?', [id], callback);
}

const updateScore = (id, increment, callback) => {
    db.run(`UPDATE scores SET score = score + ? WHERE id = ?`, [increment, id], callback);
}

const insertScore = (id, initialScore, callback) => {
    db.run('INSERT INTO scores (id, score) VALUES (?, ?)', [id, initialScore], callback);
}

module.exports = { getAllScores, getScoreById, updateScore, insertScore };
