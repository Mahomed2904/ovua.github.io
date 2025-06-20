document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Checa se é um ID de seção na página ou um link externo como #login
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Calcula a posição de rolagem, levando em conta a altura do cabeçalho fixo
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20 para um pequeno padding extra

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else if (targetId === '#login') {
                    // Simula a navegação para uma página de login
                    alert('Redirecionando para a página de Login (funcionalidade em desenvolvimento)...');
                    // Em um cenário real, você faria: window.location.href = 'login.html';
                }
            }
        });
    });

    // Lógica para clique nos cards de atividades
    document.querySelectorAll('.activity-card .view-activity').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link
            const activityId = this.getAttribute('data-activity-id');
            // Em um cenário real, você faria:
            // window.location.href = `activity-details.html?id=${activityId}`;
            alert(`Você clicou para ver os detalhes da Atividade #${activityId}. Uma nova página com os detalhes seria carregada.`);
        });
    });

    // Lógica para o botão "Ver Todas as Atividades"
    document.querySelector('.activities-section .primary-btn').addEventListener('click', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        // Em um cenário real, você faria:
        // window.location.href = 'activities.html';
        alert('Você clicou para ver a lista completa de atividades. Redirecionando para a página "activities.html".');
    });

    // Animação para o contador de membros
    const memberCountElement = document.getElementById('member-count');
    const targetCount = 500; // O número final a ser exibido
    const duration = 2500; // Duração da animação em milissegundos
    const stepTime = 10; // Intervalo entre cada incremento

    let currentCount = 0;
    const increment = targetCount / (duration / stepTime);

    // Usa Intersection Observer para iniciar a animação quando a seção fica visível
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && memberCountElement) {
                const timer = setInterval(() => {
                    currentCount += increment;
                    if (currentCount >= targetCount) {
                        currentCount = targetCount;
                        clearInterval(timer);
                        memberCountElement.textContent = `${Math.floor(currentCount)}`;
                    } else {
                        memberCountElement.textContent = `${Math.floor(currentCount)}`;
                    }
                }, stepTime);
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, { threshold: 0.5 }); // A animação começa quando 50% da seção está visível

    if (memberCountElement) {
        observer.observe(memberCountElement.closest('.members-section')); // Observa a seção inteira
    }
});