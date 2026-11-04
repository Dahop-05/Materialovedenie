const themeButton = document.getElementById('themeBtn');

themeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeButton.textContent = '☀️ Светлая тема';
    } else {
        themeButton.textContent = '🌙 Темная тема';
    }
});

const initialArticles = [
    {
        id: 1,
        title: "Натуральные волокна: хлопок, лён, шерсть, шёлк",
        date: "15 сентября 2026",
        isoDate: "2026-09-15",
        text: `
            <p>Натуральные волокна — это волокна, которые существуют в природе в готовом виде. Они делятся на две большие группы: <strong>растительного</strong> и <strong>животного</strong> происхождения.</p>
            <h4>Волокна растительного происхождения</h4>
            <ul>
                <li><strong>Хлопок</strong> — волокно с семян хлопчатника. Мягкое, гигроскопичное, прочное, хорошо пропускает воздух. Используется для ситца, бязи, батиста.</li>
                <li><strong>Лён</strong> — волокно из стеблей льна-долгунца. Прочное, гладкое, блестящее, хорошо впитывает влагу. Идёт на полотенца, скатерти, летнюю одежду.</li>
                <li><strong>Джут, пенька, кенаф</strong> — грубые волокна для мешковины, канатов, верёвок.</li>
            </ul>
            <h4>Волокна животного происхождения</h4>
            <ul>
                <li><strong>Шерсть</strong> — волокно с овец, коз, верблюдов. Тёплое, упругое, малосминаемое. Используется для костюмов, пальто, трикотажа.</li>
                <li><strong>Шёлк</strong> — волокно из коконов тутового шелкопряда. Гладкое, блестящее, лёгкое, прочное. Идёт на платья, блузы, бельё.</li>
            </ul>
            <p>Натуральные волокна ценятся за <em>комфорт</em>, <em>гигиеничность</em> и <em>экологичность</em>. Однако они могут давать усадку, мяться и требовать бережного ухода.</p>
        `,
        tags: "#волокна #хлопок #лён #шерсть #шёлк"
    },
    {
        id: 2,
        title: "Химические волокна: искусственные и синтетические",
        date: "10 сентября 2026",
        isoDate: "2026-09-10",
        text: `
            <p>Химические волокна получают в заводских условиях из природного или синтетического сырья. Они делятся на <strong>искусственные</strong> и <strong>синтетические</strong>.</p>
            <h4>Искусственные волокна</h4>
            <p>Их получают из природных полимеров — целлюлозы, древесины, хлопковых отходов.</p>
            <ul>
                <li><strong>Вискоза</strong> — мягкая, гигроскопичная, похожа на шёлк. Используется для платьев, блуз, подкладки.</li>
                <li><strong>Ацетат</strong> — гладкое, блестящее волокно. Идёт на подкладку, плательные ткани.</li>
            </ul>

            <h4>Синтетические волокна</h4>
            <p>Их получают из нефти, газа, каменного угля — то есть из продуктов химического синтеза.</p>
            <ul>
                <li><strong>Полиэстер</strong> — прочный, лёгкий, не мнётся. Добавляется в ткани для спорта, куртки, плащи.</li>
                <li><strong>Нейлон (капрон)</strong> — очень прочный, эластичный. Идёт на чулки, колготки, рюкзаки.</li>
                <li><strong>Акрил</strong> — похож на шерсть, но не греет так сильно. Используется для трикотажа, пледов.</li>
                <li><strong>Эластан (лайкра)</strong> — растяжимое волокно. Добавляется в джинсы, спортивную одежду для эластичности.</li>
            </ul>
        `,
        tags: "#волокна #вискоза #полиэстер #нейлон"
    },
    {
        id: 3,
        title: "Ткацкие переплетения: полотняное, саржевое, атласное",
        date: "05 сентября 2026",
        isoDate: "2026-09-05",
        text: `
            <p>Строение ткани зависит от переплетения нитей основы и утка.</p>
            <ul>
                <li><strong>Полотняное</strong> — самое простое, нити переплетаются через одну (ситец, бязь).</li>
                <li><strong>Саржевое</strong> — дает диагональный рубчик на поверхности (джинса, саржа).</li>
                <li><strong>Атласное</strong> — делает лицевую сторону гладкой и блестящей (атлас, сатин).</li>
            </ul>
            <p>Вид переплетения влияет на прочность, драпируемость и внешний вид ткани.</p>
        `,
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