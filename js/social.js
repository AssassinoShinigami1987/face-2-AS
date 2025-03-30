// Gerenciamento de estado da aplicação
const state = {
    currentUser: null,
    users: [],
    posts: [],
    friends: [],
    notifications: [],
    messages: [],
    currentChat: null,
    admins: [1, 2, 3] // IDs dos usuários administradores
};

// Usuários predefinidos
const defaultUsers = [
    {
        id: 1,
        name: "Admin Principal",
        email: "admin@face2.com",
        password: "Admin@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Administrador principal do Face 2",
        role: "admin",
        createdAt: new Date()
    },
    {
        id: 2,
        name: "Moderador 1",
        email: "mod1@face2.com",
        password: "Mod1@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Moderador do Face 2",
        role: "admin",
        createdAt: new Date()
    },
    {
        id: 3,
        name: "Moderador 2",
        email: "mod2@face2.com",
        password: "Mod2@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Moderador do Face 2",
        role: "admin",
        createdAt: new Date()
    },
    {
        id: 4,
        name: "João Silva",
        email: "joao@email.com",
        password: "Joao@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Desenvolvedor de software",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 5,
        name: "Maria Santos",
        email: "maria@email.com",
        password: "Maria@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Designer gráfica",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 6,
        name: "Pedro Oliveira",
        email: "pedro@email.com",
        password: "Pedro@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Estudante de engenharia",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 7,
        name: "Ana Costa",
        email: "ana@email.com",
        password: "Ana@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Professora de matemática",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 8,
        name: "Carlos Pereira",
        email: "carlos@email.com",
        password: "Carlos@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Médico",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 9,
        name: "Beatriz Lima",
        email: "beatriz@email.com",
        password: "Beatriz@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Jornalista",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 10,
        name: "Rafael Souza",
        email: "rafael@email.com",
        password: "Rafael@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Músico",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 11,
        name: "Julia Ferreira",
        email: "julia@email.com",
        password: "Julia@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Arquiteta",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 12,
        name: "Lucas Mendes",
        email: "lucas@email.com",
        password: "Lucas@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Chef de cozinha",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 13,
        name: "Mariana Alves",
        email: "mariana@email.com",
        password: "Mariana@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Psicóloga",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 14,
        name: "Gabriel Santos",
        email: "gabriel@email.com",
        password: "Gabriel@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Engenheiro civil",
        role: "user",
        createdAt: new Date()
    },
    {
        id: 15,
        name: "Isabela Costa",
        email: "isabela@email.com",
        password: "Isabela@2024#Secure",
        avatar: "assets/images/default-avatar.png",
        bio: "Fotógrafa",
        role: "user",
        createdAt: new Date()
    }
];

// Funções de autenticação
function register() {
    const name = document.querySelector('input[name=name]').value.trim();
    const email = document.querySelector('input[name=email]').value.trim();
    const password = document.querySelector('input[name=password]').value;
    const confirmPassword = document.querySelector('input[name=confirmPassword]').value;

    // Validação de campos vazios
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Validação de senha
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Validação de email duplicado
    if (state.users.some(user => user.email === email)) {
        alert('Este email já está cadastrado!');
        return;
    }

    // Criação do novo usuário
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        avatar: 'assets/images/default-avatar.png',
        bio: '',
        createdAt: new Date()
    };

    state.users.push(newUser);
    saveUsers();
    login(email, password);
}

function login(email, password) {
    console.log('Tentando login com:', email, password);
    console.log('Usuários disponíveis:', state.users);
    
    const user = state.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Email ou senha incorretos!');
        return;
    }

    if (user.banned) {
        alert('Esta conta foi banida. Entre em contato com um administrador.');
        return;
    }

    state.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    showMainContent();
    updateUI();
}

function logout() {
    state.currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginForm();
}

// Funções de navegação
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
}

function showMainContent() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function showFeed() {
    hideAllSections();
    document.getElementById('feed').style.display = 'block';
    updateActiveNavLink('feed');
    renderPosts();
    renderFriends();
}

function showProfile() {
    hideAllSections();
    document.getElementById('profile').style.display = 'block';
    updateActiveNavLink('profile');
    updateProfileInfo();
    renderProfilePosts();
}

function toggleConversationsList() {
    const sidebar = document.querySelector('.messages-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function showMessages() {
    hideAllSections();
    document.getElementById('messages').style.display = 'block';
    updateActiveNavLink('messages');
    
    // Adicionar botão de toggle para mobile
    const messagesHeader = document.querySelector('.messages-header');
    if (messagesHeader && !document.querySelector('.toggle-conversations')) {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-conversations btn-icon';
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        toggleButton.onclick = toggleConversationsList;
        messagesHeader.insertBefore(toggleButton, messagesHeader.firstChild);
    }
    
    renderConversations();
    renderMessages();
}

function showNotifications() {
    hideAllSections();
    document.getElementById('notifications').style.display = 'block';
    updateActiveNavLink('notifications');
    renderNotifications();
}

function hideAllSections() {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
}

function updateActiveNavLink(activeSection) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(activeSection)) {
            link.classList.add('active');
        }
    });
}

// Funções de atualização da UI
function updateUI() {
    document.getElementById('userName').textContent = state.currentUser.name;
    document.getElementById('profileName').textContent = state.currentUser.name;
    document.getElementById('profileAvatar').src = state.currentUser.avatar;
    document.querySelector('.nav-user img').src = state.currentUser.avatar;
    
    // Mostrar/esconder seção de administração
    const adminSection = document.getElementById('admin');
    if (adminSection) {
        adminSection.style.display = isAdmin() ? 'block' : 'none';
        if (isAdmin()) {
            renderUsers();
        }
    }
    
    // Atualizar navegação baseado no papel do usuário
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const adminLink = navLinks.querySelector('a[onclick="showAdmin()"]');
        if (adminLink) {
            adminLink.style.display = isAdmin() ? 'block' : 'none';
        }
    }
    
    showFeed();
}

function updateProfileInfo() {
    const userPosts = state.posts.filter(post => post.userId === state.currentUser.id);
    document.getElementById('friendsCount').textContent = state.friends.length;
    document.getElementById('postsCount').textContent = userPosts.length;
    document.getElementById('profileBio').textContent = state.currentUser.bio || 'Nenhuma biografia ainda.';
}

// Gerenciamento de posts
function createPost(content, media = null) {
    const post = {
        id: Date.now(),
        userId: state.currentUser.id,
        userName: state.currentUser.name,
        userAvatar: state.currentUser.avatar,
        content: content,
        media: media,
        timestamp: new Date(),
        likes: [],
        comments: []
    };
    
    state.posts.unshift(post);
    renderPosts();
    savePosts();
}

function likePost(postId) {
    const post = state.posts.find(p => p.id === postId);
    if (post) {
        const likeIndex = post.likes.indexOf(state.currentUser.id);
        if (likeIndex === -1) {
            post.likes.push(state.currentUser.id);
        } else {
            post.likes.splice(likeIndex, 1);
        }
        renderPosts();
        savePosts();
    }
}

function addComment(postId) {
    const commentInput = document.getElementById(`commentInput${postId}`);
    const content = commentInput.value.trim();
    
    if (content) {
        const post = state.posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                id: Date.now(),
                userId: state.currentUser.id,
                userName: state.currentUser.name,
                userAvatar: state.currentUser.avatar,
                content: content,
                timestamp: new Date()
            });
            commentInput.value = '';
            renderPosts();
            savePosts();
        }
    }
}

function showComments(postId) {
    const post = state.posts.find(p => p.id === postId);
    if (!post) return;

    const commentsContainer = document.getElementById(`comments${postId}`);
    if (commentsContainer.style.display === 'none' || !commentsContainer.style.display) {
        commentsContainer.innerHTML = `
            <div class="comments-list">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <img src="${comment.userAvatar}" alt="${comment.userName}" class="comment-avatar">
                        <div class="comment-content">
                            <div class="comment-header">
                                <span class="comment-author">${comment.userName}</span>
                                <span class="comment-time">${formatTimestamp(comment.timestamp)}</span>
                            </div>
                            <p>${comment.content}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="comment-input">
                <input type="text" id="commentInput${postId}" placeholder="Escreva um comentário...">
                <button onclick="addComment(${postId})">Enviar</button>
            </div>
        `;
        commentsContainer.style.display = 'block';
    } else {
        commentsContainer.style.display = 'none';
    }
}

function renderPosts() {
    const feedMain = document.querySelector('.feed-main');
    if (!feedMain) return;

    feedMain.innerHTML = `
        <div class="create-post">
            <textarea id="newPostContent" placeholder="O que você está pensando?"></textarea>
            <div class="create-post-actions">
                <div class="post-options">
                    <div class="post-option" onclick="document.getElementById('imageInput').click()">
                        <i class="fas fa-image"></i>
                        <span>Foto</span>
                    </div>
                    <div class="post-option" onclick="document.getElementById('videoInput').click()">
                        <i class="fas fa-video"></i>
                        <span>Vídeo</span>
                    </div>
                    <div class="post-option" onclick="document.getElementById('audioInput').click()">
                        <i class="fas fa-microphone"></i>
                        <span>Áudio</span>
                    </div>
                    <input type="file" id="imageInput" accept="image/*" style="display: none" onchange="handleMediaUpload(event)">
                    <input type="file" id="videoInput" accept="video/*" style="display: none" onchange="handleMediaUpload(event)">
                    <input type="file" id="audioInput" accept="audio/*" style="display: none" onchange="handleMediaUpload(event)">
                </div>
                <button class="btn-primary" onclick="submitNewPost()">Publicar</button>
            </div>
        </div>
        ${state.posts.map(post => `
            <div class="post">
                <div class="post-header">
                    <img src="${post.userAvatar}" alt="${post.userName}">
                    <div class="user-info">
                        <div class="user-name">${post.userName}</div>
                        <div class="post-time">${formatTimestamp(post.timestamp)}</div>
                    </div>
                    ${isAdmin() ? `
                        <div class="post-actions">
                            <button class="btn-icon" onclick="deletePost(${post.id})" title="Deletar post">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.media ? `
                        ${post.media.type === 'image' ? `
                            <img src="${post.media.url}" alt="${post.media.name}">
                            ${post.media.caption ? `<p class="media-caption">${post.media.caption}</p>` : ''}
                        ` : post.media.type === 'video' ? `
                            <video controls>
                                <source src="${post.media.url}" type="video/mp4">
                                Seu navegador não suporta o elemento de vídeo.
                            </video>
                            ${post.media.caption ? `<p class="media-caption">${post.media.caption}</p>` : ''}
                        ` : post.media.type === 'audio' ? `
                            <audio controls>
                                <source src="${post.media.url}" type="audio/mpeg">
                                Seu navegador não suporta o elemento de áudio.
                            </audio>
                            ${post.media.caption ? `<p class="media-caption">${post.media.caption}</p>` : ''}
                        ` : ''}
                    ` : ''}
                </div>
                <div class="post-actions">
                    <div class="post-action ${post.likes.includes(state.currentUser.id) ? 'liked' : ''}" onclick="likePost(${post.id})">
                        <i class="fas fa-heart"></i>
                        <span>${post.likes.length}</span>
                    </div>
                    <div class="post-action" onclick="showComments(${post.id})">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments.length}</span>
                    </div>
                    <div class="post-action">
                        <i class="fas fa-share"></i>
                        <span>Compartilhar</span>
                    </div>
                </div>
                <div id="comments${post.id}" class="comments-container" style="display: none;"></div>
            </div>
        `).join('')}
    `;
}

function submitNewPost() {
    const content = document.getElementById('newPostContent').value;
    if (content.trim()) {
        createPost(content);
        document.getElementById('newPostContent').value = '';
    }
}

function handleMediaUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const mediaType = file.type.split('/')[0];
        const caption = prompt('Adicione uma legenda para sua mídia (opcional):');
        const media = {
            type: mediaType,
            url: e.target.result,
            name: file.name,
            caption: caption || null
        };
        createPost(document.getElementById('newPostContent').value, media);
        document.getElementById('newPostContent').value = '';
    };
    reader.readAsDataURL(file);
}

// Gerenciamento de amigos
function addFriend(userId) {
    if (!state.friends.includes(userId)) {
        state.friends.push(userId);
        const user = state.users.find(u => u.id === userId);
        addNotification('friend_request', `${user.name} aceitou sua solicitação de amizade!`, userId);
        renderFriends();
        saveFriends();
    }
}

function removeFriend(userId) {
    state.friends = state.friends.filter(id => id !== userId);
    renderFriends();
    saveFriends();
}

function renderFriends() {
    const friendsGrid = document.querySelector('.friends-grid');
    if (!friendsGrid) return;

    friendsGrid.innerHTML = state.friends.map(friendId => {
        const friend = state.users.find(u => u.id === friendId);
        return `
            <div class="friend-card">
                <img src="${friend.avatar}" alt="${friend.name}">
                <div class="friend-name">${friend.name}</div>
                <button class="btn-secondary" onclick="removeFriend(${friendId})">
                    Remover Amigo
                </button>
            </div>
        `;
    }).join('');
}

// Gerenciamento de notificações
function addNotification(type, content, userId) {
    const notification = {
        id: Date.now(),
        type: type,
        content: content,
        userId: userId,
        timestamp: new Date(),
        read: false
    };
    
    state.notifications.unshift(notification);
    renderNotifications();
    saveNotifications();
}

function markNotificationAsRead(notificationId) {
    const notification = state.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        renderNotifications();
        saveNotifications();
    }
}

function renderNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    if (!notificationsList) return;

    notificationsList.innerHTML = state.notifications.map(notification => {
        const user = state.users.find(u => u.id === notification.userId);
        return `
            <div class="notification-item ${notification.read ? 'read' : ''}" onclick="markNotificationAsRead(${notification.id})">
                <img src="${user.avatar}" alt="${user.name}">
                <div class="notification-content">
                    <div class="notification-text">${notification.content}</div>
                    <div class="notification-time">${formatTimestamp(notification.timestamp)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Gerenciamento de mensagens
function startChat(userId) {
    state.currentChat = userId;
    renderMessages();
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    
    if (content && state.currentChat) {
        sendMessageToUser(state.currentChat, content);
        messageInput.value = '';
    }
}

function sendMessageToUser(userId, content) {
    const message = {
        id: Date.now(),
        senderId: state.currentUser.id,
        receiverId: userId,
        content: content,
        timestamp: new Date(),
        read: false
    };
    
    state.messages.push(message);
    renderMessages();
    saveMessages();
}

function renderConversations() {
    const conversationsList = document.querySelector('.conversations-list');
    if (!conversationsList) return;

    const uniqueUsers = [...new Set(state.messages
        .filter(msg => msg.senderId === state.currentUser.id || msg.receiverId === state.currentUser.id)
        .map(msg => msg.senderId === state.currentUser.id ? msg.receiverId : msg.senderId))];

    conversationsList.innerHTML = uniqueUsers.map(userId => {
        const user = state.users.find(u => u.id === userId);
        const lastMessage = state.messages
            .filter(msg => (msg.senderId === state.currentUser.id && msg.receiverId === userId) || 
                         (msg.senderId === userId && msg.receiverId === state.currentUser.id))
            .sort((a, b) => b.timestamp - a.timestamp)[0];

        return `
            <div class="conversation-item ${state.currentChat === userId ? 'active' : ''}" 
                 onclick="startChat(${userId})">
                <img src="${user.avatar}" alt="${user.name}">
                <div class="conversation-info">
                    <div class="conversation-name">${user.name}</div>
                    ${lastMessage ? `
                        <div class="conversation-preview">${lastMessage.content}</div>
                        <div class="conversation-time">${formatTimestamp(lastMessage.timestamp)}</div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderMessages() {
    const messagesList = document.querySelector('.messages-list');
    const messagesHeader = document.querySelector('.messages-header');
    if (!messagesList || !messagesHeader) return;

    if (!state.currentChat) {
        messagesList.innerHTML = '<div class="no-chat-selected">Selecione uma conversa para começar</div>';
        return;
    }

    const chatUser = state.users.find(u => u.id === state.currentChat);
    messagesHeader.innerHTML = `
        <h3>Conversa com ${chatUser.name}</h3>
    `;

    messagesList.innerHTML = state.messages
        .filter(msg => (msg.senderId === state.currentUser.id && msg.receiverId === state.currentChat) ||
                     (msg.senderId === state.currentChat && msg.receiverId === state.currentUser.id))
        .map(message => `
            <div class="message ${message.senderId === state.currentUser.id ? 'sent' : 'received'}">
                <div class="message-content">
                    <div class="message-text">${message.content}</div>
                    <div class="message-time">${formatTimestamp(message.timestamp)}</div>
                </div>
            </div>
        `).join('');

    messagesList.scrollTop = messagesList.scrollHeight;
}

// Funções utilitárias
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Agora mesmo';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
    return date.toLocaleDateString();
}

// Persistência de dados
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(state.users));
}

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(state.posts));
}

function saveFriends() {
    localStorage.setItem('friends', JSON.stringify(state.friends));
}

function saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(state.notifications));
}

function saveMessages() {
    localStorage.setItem('messages', JSON.stringify(state.messages));
}

function loadSavedData() {
    const savedUsers = localStorage.getItem('users');
    const savedPosts = localStorage.getItem('posts');
    const savedFriends = localStorage.getItem('friends');
    const savedNotifications = localStorage.getItem('notifications');
    const savedMessages = localStorage.getItem('messages');
    
    if (savedUsers) {
        state.users = JSON.parse(savedUsers);
    } else {
        state.users = defaultUsers;
        saveUsers();
    }
    
    if (savedPosts) state.posts = JSON.parse(savedPosts);
    if (savedFriends) state.friends = JSON.parse(savedFriends);
    if (savedNotifications) state.notifications = JSON.parse(savedNotifications);
    if (savedMessages) state.messages = JSON.parse(savedMessages);
}

// Funções de administração
function isAdmin() {
    return state.currentUser && state.currentUser.role === "admin";
}

function banUser(userId) {
    if (!isAdmin()) return;
    
    const user = state.users.find(u => u.id === userId);
    if (user) {
        user.banned = true;
        addNotification('system', `Usuário ${user.name} foi banido por ${state.currentUser.name}`, userId);
        saveUsers();
        renderUsers();
    }
}

function unbanUser(userId) {
    if (!isAdmin()) return;
    
    const user = state.users.find(u => u.id === userId);
    if (user) {
        user.banned = false;
        addNotification('system', `Usuário ${user.name} foi desbanido por ${state.currentUser.name}`, userId);
        saveUsers();
        renderUsers();
    }
}

function deleteUser(userId) {
    if (!isAdmin()) return;
    
    const user = state.users.find(u => u.id === userId);
    if (user) {
        state.users = state.users.filter(u => u.id !== userId);
        state.posts = state.posts.filter(p => p.userId !== userId);
        state.messages = state.messages.filter(m => m.senderId !== userId && m.receiverId !== userId);
        addNotification('system', `Usuário ${user.name} foi excluído por ${state.currentUser.name}`, userId);
        saveUsers();
        savePosts();
        saveMessages();
        renderUsers();
    }
}

// Funções de edição de perfil
function showEditProfile() {
    const currentUser = state.users.find(u => u.email === state.currentUser.email);
    if (!currentUser) {
        alert('Erro ao carregar dados do usuário');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Editar Perfil</h2>
                <button onclick="this.closest('.modal').remove()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form onsubmit="event.preventDefault(); saveProfileEdit(this)">
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" name="name" value="${currentUser.name}" required>
                </div>
                <div class="form-group">
                    <label>Bio</label>
                    <textarea name="bio" rows="3">${currentUser.bio || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Foto de Perfil</label>
                    <input type="file" name="avatar" accept="image/*">
                    <div class="current-avatar">
                        <img src="${currentUser.avatar || 'assets/images/default-avatar.png'}" alt="Avatar atual">
                    </div>
                </div>
                <div class="form-group">
                    <label>Foto de Capa</label>
                    <input type="file" name="cover" accept="image/*">
                    <div class="current-cover">
                        <img src="${currentUser.cover || 'assets/images/default-cover.jpg'}" alt="Capa atual">
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button type="submit" class="btn-primary">Salvar Alterações</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

async function saveProfileEdit(form) {
    try {
        const formData = new FormData(form);
        const currentUser = state.users.find(u => u.email === state.currentUser.email);
        
        if (!currentUser) {
            throw new Error('Usuário não encontrado');
        }
        
        // Atualizar dados básicos
        currentUser.name = formData.get('name');
        currentUser.bio = formData.get('bio');
        
        // Processar imagens
        const avatarFile = formData.get('avatar');
        const coverFile = formData.get('cover');
        
        if (avatarFile.size > 0) {
            currentUser.avatar = await handleImageUpload(avatarFile);
        }
        
        if (coverFile.size > 0) {
            currentUser.cover = await handleImageUpload(coverFile);
        }
        
        // Atualizar localStorage
        localStorage.setItem('users', JSON.stringify(state.users));
        
        // Atualizar usuário atual
        state.currentUser = currentUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Atualizar interface
        updateUI();
        showProfile();
        
        // Fechar modal
        form.closest('.modal').remove();
        
        // Mostrar mensagem de sucesso
        alert('Perfil atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        alert('Erro ao salvar as alterações. Tente novamente.');
    }
}

async function handleImageUpload(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

// Função para renderizar lista de usuários (apenas para admins)
function renderUsers() {
    if (!isAdmin()) return;

    const usersList = document.querySelector('.users-list');
    if (!usersList) return;

    usersList.innerHTML = state.users.map(user => `
        <div class="user-item ${user.banned ? 'banned' : ''}">
            <img src="${user.avatar}" alt="${user.name}">
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
                <div class="user-role">${user.role}</div>
            </div>
            <div class="user-actions">
                ${user.banned ? 
                    `<button onclick="unbanUser(${user.id})">Desbanir</button>` :
                    `<button onclick="banUser(${user.id})">Banir</button>`
                }
                <button onclick="deleteUser(${user.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

function showAdmin() {
    if (!isAdmin()) {
        alert('Você não tem permissão para acessar esta área.');
        return;
    }
    
    hideAllSections();
    document.getElementById('admin').style.display = 'block';
    updateActiveNavLink('admin');
    renderUsers();
}

// Gerenciamento de tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton();
}

function updateThemeButton() {
    const isDark = document.body.classList.contains('dark-theme');
    const themeButton = document.querySelector('.theme-toggle i');
    if (themeButton) {
        themeButton.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Função para deletar post (apenas para administradores)
function deletePost(postId) {
    if (!isAdmin()) {
        alert('Você não tem permissão para deletar posts.');
        return;
    }

    if (confirm('Tem certeza que deseja deletar este post?')) {
        state.posts = state.posts.filter(post => post.id !== postId);
        savePosts();
        renderPosts();
        addNotification('system', 'Um post foi removido por um administrador', state.currentUser.id);
    }
}

function togglePassword(button) {
    const input = button.parentElement.querySelector('input');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar botão de tema
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.innerHTML = '<i class="fas fa-moon"></i>';
    themeButton.onclick = toggleTheme;
    document.body.appendChild(themeButton);

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButton();
    }

    // Limpar localStorage para garantir que os usuários padrão sejam carregados
    localStorage.removeItem('users');
    
    loadSavedData();
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        showMainContent();
        updateUI();
    } else {
        showLoginForm();
    }
}); 