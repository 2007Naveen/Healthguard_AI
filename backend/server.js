const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "healthguard.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to open database", err);
    process.exit(1);
  }
  console.log("Connected to SQLite database:", dbPath);
});

// ================================
// Initialize DB schema
// ================================
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`
  );
});

// ================================
// INSERT DEFAULT ADMIN (FIXED)
// ================================
const insertDefaultAdmin = () => {
  const adminEmail = "admin@healthguard.com";
  const adminPassword = "admin123"; // change later if needed
  const adminRole = "admin";

  db.get(
    `SELECT * FROM users WHERE role = ?`,
    [adminRole],
    (err, row) => {
      if (err) {
        console.error("Admin check failed", err);
        return;
      }

      if (!row) {
        db.run(
          `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
          [adminEmail, adminPassword, adminRole],
          () => {
            console.log("✅ Default admin inserted");
          }
        );
      } else {
        console.log("ℹ️ Admin already exists");
      }
    }
  );
};

// Call admin seed
insertDefaultAdmin();

// ================================
// Health check
// ================================
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ================================
// Public user signup ONLY
// ================================
app.post("/signup", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Restrict signup
  if (role !== "public") {
    return res
      .status(403)
      .json({ message: "Only public users can register" });
  }

  db.run(
    `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
    [email, password, role],
    function (err) {
      if (err) {
        return res
          .status(400)
          .json({ message: "User already exists or invalid data" });
      }

      res.json({ id: this.lastID, email, role });
    }
  );
});

// ================================
// LOGIN (ALL ROLES)
// ================================
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  db.get(
    `SELECT id, email, role, password FROM users WHERE email = ? AND role = ?`,
    [email, role],
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Wrong password" });
      }

      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }
  );
});

// ================================
// Get users (admin use)
// ================================
app.get("/users", (req, res) => {
  db.all(`SELECT id, email, role FROM users`, (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(rows);
  });
});

// ================================
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
