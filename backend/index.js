const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const pool = require('./db');



//Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running successfully',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all rows from table_a
app.get('/table_a', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM table_a');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all rows from table_b
app.get('/table_b', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM table_b');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all rows from table_c
app.get('/table_c', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM table_c');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Start server
(async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection established');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌿 Environment: ${process.env.NODE_ENV}`);
      // console.log(`🩺 Health check: http://localhost:${PORT}/health`);
      // console.log(`💬 Ask endpoint: http://localhost:${PORT}/ask`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  }
})();
