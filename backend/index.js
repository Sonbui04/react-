const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_db",
  password: "123456", 
});

app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
