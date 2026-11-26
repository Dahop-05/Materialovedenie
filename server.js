// 1. Импортируем Express
const express = require('express');

// 2. Создаём приложение
const app = express();

// 3. Порт
const PORT = 3000;

// 4. Раздаём статические файлы из папки public
app.use(express.static('public'));

// 5. Учим сервер читать JSON из тела POST-запросов
app.use(express.json());

// 6. Хранилище статей в оперативной памяти сервера
let articles = [
  {
    id: 1,
    title: "Натуральные волокна: хлопок, лён, шерсть, шёлк",
    date: "15 сентября 2026",
    isoDate: "2026-09-15",
    text: "Натуральные волокна — это волокна, которые существуют в природе в готовом виде. Они делятся на две большие группы: растительного и животного происхождения. Растительные: хлопок, лён, джут. Животные: шерсть, шёлк.",
    tags: "#волокна #хлопок #лён #шерсть #шёлк"
  },
  {
    id: 2,
    title: "Химические волокна: искусственные и синтетические",
    date: "10 сентября 2026",
    isoDate: "2026-09-10",
    text: "Химические волокна получают в заводских условиях. Искусственные — из целлюлозы (вискоза, ацетат). Синтетические — из нефти и газа (полиэстер, нейлон, акрил, эластан).",
    tags: "#волокна #вискоза #полиэстер #нейлон"
  },
  {
    id: 3,
    title: "Ткацкие переплетения: полотняное, саржевое, атласное",
    date: "05 сентября 2026",
    isoDate: "2026-09-05",
    text: "Строение ткани зависит от переплетения нитей основы и утка. Полотняное (ситец, бязь), саржевое (джинса, саржа), атласное (атлас, сатин).",
    tags: "#ткани #переплетения #ситец #джинса"
  }
];

// 7. ЭНДПОИНТ: получить все статьи (GET)
app.get('/api/posts', (req, res) => {
  res.json(articles);
});

// 8. ЭНДПОИНТ: добавить статью (POST)
app.post('/api/posts', (req, res) => {
  const { title, date, isoDate, text, tags } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Заголовок и текст обязательны!' });
  }

  const newArticle = {
    id: Date.now(),
    title: title,
    date: date || "Сегодня",
    isoDate: isoDate || new Date().toISOString().split('T')[0],
    text: text,
    tags: tags || "#материаловедение"
  };

  articles.unshift(newArticle);
  console.log('Сервер принял новую статью:', newArticle.title);

  res.status(201).json(newArticle);
});

// 9. ЭНДПОИНТ: получить одну статью по ID (GET) — это Задание 4.1
app.get('/api/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const post = articles.find(item => item.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Статья с таким ID не найдена' });
  }
  res.json(post);
});

// 10. ЭНДПОИНТ: удалить статью по ID (DELETE) — это Задание 4.3
app.delete('/api/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const exists = articles.some(item => item.id === postId);
  if (!exists) {
    return res.status(404).json({ error: 'Статья с таким ID не найдена' });
  }
  articles = articles.filter(item => item.id !== postId);
  res.status(200).json({ message: 'Статья успешно удалена', id: postId });
});

// 11. Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер и API запущены: http://localhost:${PORT}`);
});