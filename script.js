const themeButton = document.getElementById('themeBtn');

themeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeButton.textContent = '☀️ Светлая тема';
    } else {
        themeButton.textContent = '🌙 Темная тема';
    }
});

let initialArticles = JSON.parse(localStorage.getItem('myBlogPosts')) || [
  {
    id: 1,
    title: "Натуральные волокна: хлопок, лён, шерсть, шёлк",
    date: "15 сентября 2026",
    isoDate: "2026-09-15",
    text: `Натуральные волокна — это волокна, которые существуют в природе в готовом виде. Они делятся на две большие группы: растительного и животного происхождения.<br><br><strong>Волокна растительного происхождения</strong><br>— Хлопок — волокно с семян хлопчатника. Мягкое, гигроскопичное, прочное, хорошо пропускает воздух. Используется для ситца, бязи, батиста.<br>— Лён — волокно из стеблей льна-долгунца. Прочное, гладкое, блестящее, хорошо впитывает влагу. Идёт на полотенца, скатерти, летнюю одежду.<br>— Джут, пенька, кенаф — грубые волокна для мешковины, канатов, верёвок.<br><br><strong>Волокна животного происхождения</strong><br>— Шерсть — волокно с овец, коз, верблюдов. Тёплое, упругое, малосминаемое. Используется для костюмов, пальто, трикотажа.<br>— Шёлк — волокно из коконов тутового шелкопряда. Гладкое, блестящее, лёгкое, прочное. Идёт на платья, блузы, бельё.<br><br>Натуральные волокна ценятся за комфорт, гигиеничность и экологичность. Однако они могут давать усадку, мяться и требовать бережного ухода.`,
    tags: "#волокна #хлопок #лён #шерсть #шёлк"
  },
  {
    id: 2,
    title: "Химические волокна: искусственные и синтетические",
    date: "10 сентября 2026",
    isoDate: "2026-09-10",
    text: `Химические волокна получают в заводских условиях из природного или синтетического сырья. Они делятся на искусственные и синтетические.<br><br><strong>Искусственные волокна</strong><br>Их получают из природных полимеров — целлюлозы, древесины, хлопковых отходов.<br>— Вискоза — мягкая, гигроскопичная, похожа на шёлк. Используется для платьев, блуз, подкладки.<br>— Ацетат — гладкое, блестящее волокно. Идёт на подкладку, плательные ткани.<br><br><strong>Синтетические волокна</strong><br>Их получают из нефти, газа, каменного угля — то есть из продуктов химического синтеза.<br>— Полиэстер — прочный, лёгкий, не мнётся. Добавляется в ткани для спорта, куртки, плащи.<br>— Нейлон (капрон) — очень прочный, эластичный. Идёт на чулки, колготки, рюкзаки.<br>— Акрил — похож на шерсть, но не греет так сильно. Используется для трикотажа, пледов.<br>— Эластан (лайкра) — растяжимое волокно. Добавляется в джинсы, спортивную одежду для эластичности.`,
    tags: "#волокна #вискоза #полиэстер #нейлон"
  },
  {
    id: 3,
    title: "Ткацкие переплетения: полотняное, саржевое, атласное",
    date: "05 сентября 2026",
    isoDate: "2026-09-05",
    text: `Строение ткани зависит от переплетения нитей основы и утка.<br>— Полотняное — самое простое, нити переплетаются через одну (ситец, бязь).<br>— Саржевое — даёт диагональный рубчик на поверхности (джинса, саржа).<br>— Атласное — делает лицевую сторону гладкой и блестящей (атлас, сатин).<br><br>Вид переплетения влияет на прочность, драпируемость и внешний вид ткани.`,
    tags: "#ткани #переплетения #ситец #джинса"
  }
];

const postsContainer = document.getElementById('postsContainer');

function renderArticles(articlesArray) {
    postsContainer.innerHTML = '';

    if (articlesArray.length === 0) {
        postsContainer.innerHTML = '<p class="no-results">Ничего не найдено 😔</p>';
        return;
    }

    articlesArray.forEach(article => {
        const articleHtml = `
            <article>
                <header>
                    <h3>${article.title}</h3>
                    <p>Опубликовано: <time datetime="${article.isoDate}">${article.date}</time></p>
                </header>
                
                <div class="article-text short">
                    ${article.text}
                </div>
                
                <button class="read-more-btn">Читать далее</button>
                
                <footer>
                    <p>Теги: ${article.tags}</p>
                    <button class="like-btn">❤️ Лайк (<span class="like-count">0</span>)</button>
                </footer>
                <div class="article-actions">
                <button class="edit-btn" data-id="${article.id}">✏️ Редактировать</button>
                <button class="delete-btn" data-id="${article.id}">🗑 Удалить</button>
            </div>
            </article>
        `;
        
        postsContainer.insertAdjacentHTML('beforeend', articleHtml);
    });

    attachButtonListeners();
}

function attachButtonListeners() {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            currentLikes++;
            countSpan.textContent = currentLikes;
            button.style.backgroundColor = '#e74c3c';
            button.style.color = 'white';
        });
    });

    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const textBlock = btn.previousElementSibling; 
            
            textBlock.classList.toggle('short');
            
            if (textBlock.classList.contains('short')) {
                btn.textContent = 'Читать далее';
            } else {
                btn.textContent = 'Свернуть';
            }
        });
    });
     // Кнопки редактирования и удаления
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            startEdit(Number(btn.dataset.id));
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            deleteArticle(Number(btn.dataset.id));
        });
    });
}

renderArticles(initialArticles);

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase().trim();

    const filteredArticles = initialArticles.filter(article => {
        const inTitle = article.title.toLowerCase().includes(searchText);
        const inText = article.text.toLowerCase().includes(searchText);
        const inTags = article.tags.toLowerCase().includes(searchText);
        return inTitle || inText || inTags;
    });

    renderArticles(filteredArticles);
});
// ===== Добавление новой статьи через форму =====
const addForm = document.getElementById('addArticleForm');
let editingArticleId = null; // null = добавляем, число = редактируем
const postTitleInput = document.getElementById('postTitle');
const postTextInput = document.getElementById('postText');
const postTagsInput = document.getElementById('postTags');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const titleValue = postTitleInput.value.trim();
  const rawText = postTextInput.value.trim();
  const textValue = rawText.replace(/\n/g, '<br>');
  const tagsValue = postTagsInput.value.trim() || "#материаловедение";

  if (titleValue.length < 5) {
    alert('Ошибка: Заголовок статьи должен быть не короче 5 символов!');
    return;
  }
  if (rawText.length < 20) {
    alert('Ошибка: Текст статьи слишком короткий. Опишите волокно или ткань подробнее (минимум 20 символов)!');
    return;
  }

  if (editingArticleId !== null) {
    // ===== РЕЖИМ РЕДАКТИРОВАНИЯ =====
    const article = initialArticles.find(a => a.id === editingArticleId);
    if (article) {
      article.title = titleValue;
      article.text = textValue;
      article.tags = tagsValue;
    }
    localStorage.setItem('myBlogPosts', JSON.stringify(initialArticles));
    cancelEdit();
  } else {
    // ===== РЕЖИМ ДОБАВЛЕНИЯ =====
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const isoDate = today.toISOString().split('T')[0];

    const newArticle = {
      id: Date.now(),
      title: titleValue,
      date: formattedDate,
      isoDate: isoDate,
      text: textValue,
      tags: tagsValue
    };

    initialArticles.unshift(newArticle);
    localStorage.setItem('myBlogPosts', JSON.stringify(initialArticles));
    addForm.reset();
  }

  renderArticles(initialArticles);
});

// ===== Редактирование и удаление статей =====

function startEdit(id) {
  const article = initialArticles.find(a => a.id === id);
  if (!article) return;

  editingArticleId = id;

  postTitleInput.value = article.title;
  postTextInput.value = article.text.replace(/<br\s*\/?>/gi, '\n');
  postTagsInput.value = article.tags;

  document.getElementById('formHeading').textContent = 'Редактировать публикацию';
  document.getElementById('submitBtn').textContent = 'Сохранить изменения';
  document.getElementById('cancelEditBtn').style.display = 'block';

  addForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEdit() {
  editingArticleId = null;
  addForm.reset();
  document.getElementById('formHeading').textContent = 'Добавить новую публикацию';
  document.getElementById('submitBtn').textContent = 'Опубликовать статью';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

function deleteArticle(id) {
  if (!confirm('Удалить эту статью? Действие нельзя отменить.')) return;

  initialArticles = initialArticles.filter(a => a.id !== id);
  localStorage.setItem('myBlogPosts', JSON.stringify(initialArticles));
  renderArticles(initialArticles);

  if (editingArticleId === id) cancelEdit();
}

document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);