const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Подключение к SQLite
const db = new sqlite3.Database(path.join(__dirname, '../../database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  // Создание таблицы новостей
  db.run(`CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Создание таблицы обратной связи
  db.run(`CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Создание таблицы пользователей
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Добавление тестовых данных
  db.get('SELECT COUNT(*) as count FROM news', (err, row) => {
    if (row.count === 0) {
      const news = [
        {
          title: "Упрощена процедура регистрации недвижимости",
          date: "15.10.2023",
          content: "С 1 ноября вступают в силу изменения, упрощающие процедуру государственной регистрации прав на недвижимое имущество."
        },
        {
          title: "Запущен новый электронный сервис",
          date: "10.10.2023",
          content: "Роскадастр запустил новый сервис для онлайн-подачи заявлений на кадастровый учет объектов недвижимости."
        }
      ];

      const stmt = db.prepare('INSERT INTO news (title, content, date) VALUES (?, ?, ?)');
      news.forEach(item => {
        stmt.run([item.title, item.content, item.date]);
      });
      stmt.finalize();
    }
  });

  // Добавление тестового пользователя
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (row.count === 0) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      db.run(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@rosreestr.ru', hashedPassword, 'admin']
      );
    }
  });
}

// API endpoints
app.get('/api/news', (req, res) => {
  db.all('SELECT * FROM news ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;
  
  db.run(
    'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});
 
// Регистрация пользователя
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Пользователь с таким именем или email уже существует' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id: this.lastID, message: 'Регистрация успешна' });
    }
  );
});

// Авторизация пользователя
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  db.get(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, username],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
      }

      res.json({ 
        success: true, 
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        message: 'Авторизация успешна'
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});











