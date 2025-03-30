// Gerenciamento de estado da aplicação
const state = {
    user: null,
    currentPage: 'home'
};

// Gerenciamento de rotas
const routes = {
    home: () => loadHome(),
    profile: () => loadProfile(),
    friends: () => loadFriends(),
    battle: () => loadBattle(),
    chat: () => loadChat()
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navegação
    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('home');
    });

    document.getElementById('profile-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('profile');
    });

    document.getElementById('friends-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('friends');
    });

    document.getElementById('battle-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('battle');
    });

    document.getElementById('chat-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('chat');
    });

    // Verificar autenticação
    checkAuth();
});

// Funções de navegação
function navigate(page) {
    state.currentPage = page;
    routes[page]();
    updateNavigation();
}

function updateNavigation() {
    const isAuthenticated = !!state.user;
    document.getElementById('login-btn').style.display = isAuthenticated ? 'none' : 'block';
    document.getElementById('register-btn').style.display = isAuthenticated ? 'none' : 'block';
    document.getElementById('logout-btn').style.display = isAuthenticated ? 'block' : 'none';
}

// Funções de carregamento de página
function loadHome() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Bem-vindo ao RPG Social</h1>
        <div class="home-content">
            <div class="featured-section">
                <h2>Batalhas em Destaque</h2>
                <div id="featured-battles"></div>
            </div>
            <div class="news-section">
                <h2>Últimas Notícias</h2>
                <div id="latest-news"></div>
            </div>
        </div>
    `;
    loadFeaturedBattles();
    loadLatestNews();
}

function loadProfile() {
    if (!state.user) {
        navigate('home');
        return;
    }
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Meu Perfil</h1>
        <div class="profile-content">
            <div class="profile-info">
                <img src="${state.user.avatar || 'assets/default-avatar.png'}" alt="Avatar">
                <h2>${state.user.name}</h2>
                <p>Nível: ${state.user.level}</p>
                <p>XP: ${state.user.xp}</p>
            </div>
            <div class="profile-stats">
                <h3>Estatísticas</h3>
                <div id="stats-container"></div>
            </div>
        </div>
    `;
    loadUserStats();
}

function loadFriends() {
    if (!state.user) {
        navigate('home');
        return;
    }
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Meus Amigos</h1>
        <div class="friends-content">
            <div class="friends-list" id="friends-list"></div>
            <div class="friend-requests" id="friend-requests"></div>
        </div>
    `;
    loadFriendsList();
    loadFriendRequests();
}

function loadBattle() {
    if (!state.user) {
        navigate('home');
        return;
    }
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Sala de Batalha</h1>
        <div class="battle-content">
            <div class="battle-arena" id="battle-arena"></div>
            <div class="battle-controls" id="battle-controls"></div>
        </div>
    `;
    initializeBattle();
}

function loadChat() {
    if (!state.user) {
        navigate('home');
        return;
    }
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Chat</h1>
        <div class="chat-content">
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="message-input" placeholder="Digite sua mensagem...">
                <button id="send-message">Enviar</button>
            </div>
        </div>
    `;
    initializeChat();
}

// Funções auxiliares
function checkAuth() {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        state.user = JSON.parse(savedUser);
        updateNavigation();
    }
}

// Inicialização
checkAuth();
navigate('home'); 