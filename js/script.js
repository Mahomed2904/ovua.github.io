document.addEventListener('DOMContentLoaded', () => {
    // Lógica para alternar o tema (claro/escuro)
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const body = document.body;

    // Verifica a preferência de tema do usuário ou um tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeToggleIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Se não houver tema salvo, verifica a preferência do sistema
        body.classList.add('dark-theme');
        updateThemeToggleIcon('dark-theme');
    } else {
        body.classList.add('light-theme');
        updateThemeToggleIcon('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeToggleIcon('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeToggleIcon('light-theme');
        }
    });

    function updateThemeToggleIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark-theme') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Atualiza o ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Animação do contador de membros (opcional, para tornar mais dinâmico)
    const memberCountSpan = document.getElementById('member-count');
    const targetCount = 250; // O número final desejado
    const duration = 2000; // Duração da animação em ms
    const interval = 10; // Intervalo entre cada incremento em ms

    if (memberCountSpan) {
        let currentCount = 0;
        const increment = targetCount / (duration / interval);

        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                memberCountSpan.textContent = targetCount;
                clearInterval(counter);
            } else {
                memberCountSpan.textContent = Math.floor(currentCount);
            }
        }, interval);
    }
});