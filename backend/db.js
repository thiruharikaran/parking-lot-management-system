const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '18306530', // add password if your MySQL has one
  database: 'parking_system'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('MySQL connected');
});

module.exports = db;
