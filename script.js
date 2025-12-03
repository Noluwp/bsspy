document.addEventListener('DOMContentLoaded', () => {
    // --- ДАННЫЕ ---
    const brawlersList = [
        "Шелли", "Нита", "Кольт", "Булл", "Брок", "Эль Примо", "Барли", "Поко", "Роза",
        "Джесси", "Динамайк", "Тик", "8-БИТ", "Рико", "Дэррил", "Пенни", "Карл", "Джеки", "Гас",
        "Бо", "Эмз", "Сту", "Пайпер", "Пэм", "Фрэнк", "Биби", "Беа", "Нани", "Эдгар", "Грифф", "Гром", "Бонни", "Хэнк", "Анджело",
        "Мортис", "Тара", "Джин", "Макс", "Мистер П", "Спраут", "Байрон", "Сквик", "Грей", "Виллоу", "Даг", "Чак", "Мелоди",
        "Спайк", "Ворон", "Леон", "Сэнди", "Амбер", "Мэг", "Честер", "Кит", "Драко",
        "Гэйл", "Вольт", "Колетт", "Лу", "Гавс", "Белль", "Базз", "Эш", "Лола", "Фэнг", "Ева", "Джанет", "Отис", "Сэм", "Бастер", "Мэнди", "R-T", "Мэйси", "Корделиус", "Перл", "Ларри и Лори", "Лили", "Берри", "Клэнси", "Мо", "Кендзи", "Джуджу", "Шейд"
    ];

    // --- ПЕРЕМЕННЫЕ ---
    let playersCount = 3;
    let currentPlayerIndex = 0;
    let gameRoles = [];

    // --- ЭЛЕМЕНТЫ DOM ---
    const views = {
        start: document.getElementById('view-start'),
        pass: document.getElementById('view-pass'),
        role: document.getElementById('view-role'),
        end: document.getElementById('view-end')
    };

    const ui = {
        indicator: document.getElementById('player-indicator'),
        roleCard: document.getElementById('role-card-content'),
        btnStart: document.getElementById('btn-start'),
        btnReveal: document.getElementById('btn-reveal'),
        btnNext: document.getElementById('btn-next'),
        btnRestart: document.getElementById('btn-restart')
    };

    // --- ФУНКЦИИ ---

    function switchView(viewName) {
        // Скрываем все экраны
        Object.values(views).forEach(el => el.classList.add('hidden-content'));
        // Показываем нужный
        views[viewName].classList.remove('hidden-content');
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Нажатие "Начать игру"
    ui.btnStart.addEventListener('click', () => {
        const randomBrawler = brawlersList[Math.floor(Math.random() * brawlersList.length)];
        
        // Создаем роли: 2 Бравлера, 1 Шпион
        let roles = [randomBrawler, randomBrawler, "SPY"];
        gameRoles = shuffle(roles);
        currentPlayerIndex = 0;

        updatePassScreen();
        switchView('pass');
    });

    // Обновление экрана передачи
    function updatePassScreen() {
        ui.indicator.innerText = `Игрок ${currentPlayerIndex + 1}`;
    }

    // Нажатие "Показать роль"
    ui.btnReveal.addEventListener('click', () => {
        const role = gameRoles[currentPlayerIndex];
        
        // Очистка классов
        ui.roleCard.className = 'card'; 
        
        if (role === "SPY") {
            ui.roleCard.classList.add('spy');
            ui.roleCard.innerHTML = `
                <div class="icon">🕵️‍♂️</div>
                <div class="role-text">ТЫ ШПИОН!</div>
                <div class="role-sub">Не пались и угадай персонажа.</div>
            `;
        } else {
            ui.roleCard.classList.add('brawler');
            ui.roleCard.innerHTML = `
                <div class="icon">⭐</div>
                <div class="role-text">${role}</div>
                <div class="role-sub">Твоя команда. Найди шпиона!</div>
            `;
        }
        switchView('role');
    });

    // Нажатие "Скрыть и передать"
    ui.btnNext.addEventListener('click', () => {
        currentPlayerIndex++;
        
        if (currentPlayerIndex >= playersCount) {
            switchView('end');
        } else {
            updatePassScreen();
            switchView('pass');
        }
    });

    // Нажатие "Новая игра"
    ui.btnRestart.addEventListener('click', () => {
        switchView('start');
    });
});