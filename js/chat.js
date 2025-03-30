// Sistema de Chat
const chat = {
    // Estado do chat
    state: {
        messages: [],
        connected: false,
        currentRoom: 'global'
    },

    // Elementos do DOM
    elements: {
        messagesContainer: null,
        messageInput: null,
        sendButton: null,
        roomSelect: null
    },

    // Inicialização
    init() {
        this.elements = {
            messagesContainer: document.getElementById('chat-messages'),
            messageInput: document.getElementById('message-input'),
            sendButton: document.getElementById('send-message'),
            roomSelect: document.createElement('select')
        };

        this.setupEventListeners();
        this.loadMessages();
    },

    // Configuração de eventos
    setupEventListeners() {
        if (this.elements.sendButton) {
            this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        }

        if (this.elements.messageInput) {
            this.elements.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Adicionar seletor de sala
        this.elements.roomSelect.innerHTML = `
            <option value="global">Chat Global</option>
            <option value="battle">Chat de Batalha</option>
            <option value="trade">Chat de Comércio</option>
        `;

        this.elements.roomSelect.addEventListener('change', (e) => {
            this.state.currentRoom = e.target.value;
            this.loadMessages();
        });

        // Adicionar seletor de sala ao DOM
        const chatContent = document.querySelector('.chat-content');
        if (chatContent) {
            chatContent.insertBefore(this.elements.roomSelect, this.elements.messagesContainer);
        }
    },

    // Funções de mensagem
    sendMessage() {
        if (!this.elements.messageInput || !state.user) return;

        const message = this.elements.messageInput.value.trim();
        if (!message) return;

        const newMessage = {
            id: Date.now(),
            user: state.user.name,
            content: message,
            room: this.state.currentRoom,
            timestamp: new Date().toLocaleTimeString()
        };

        // Adicionar mensagem ao estado
        this.state.messages.push(newMessage);

        // Limitar número de mensagens
        if (this.state.messages.length > 100) {
            this.state.messages.shift();
        }

        // Atualizar UI
        this.addMessageToUI(newMessage);

        // Limpar input
        this.elements.messageInput.value = '';

        // Simular recebimento de mensagem (substituir por WebSocket em produção)
        setTimeout(() => {
            this.simulateReceivedMessage();
        }, 1000);
    },

    addMessageToUI(message) {
        if (!this.elements.messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <span class="timestamp">[${message.timestamp}]</span>
            <span class="user">${message.user}:</span>
            <span class="content">${this.escapeHtml(message.content)}</span>
        `;

        this.elements.messagesContainer.appendChild(messageElement);
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    },

    loadMessages() {
        if (!this.elements.messagesContainer) return;

        // Limpar mensagens existentes
        this.elements.messagesContainer.innerHTML = '';

        // Filtrar mensagens por sala
        const roomMessages = this.state.messages.filter(
            msg => msg.room === this.state.currentRoom
        );

        // Adicionar mensagens filtradas à UI
        roomMessages.forEach(message => this.addMessageToUI(message));
    },

    // Funções auxiliares
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    simulateReceivedMessage() {
        const responses = [
            'Olá! Como posso ajudar?',
            'Que legal!',
            'Interessante...',
            'Vamos jogar juntos?',
            'Boa sorte na batalha!'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const newMessage = {
            id: Date.now(),
            user: 'Sistema',
            content: randomResponse,
            room: this.state.currentRoom,
            timestamp: new Date().toLocaleTimeString()
        };

        this.state.messages.push(newMessage);
        this.addMessageToUI(newMessage);
    }
};

// Inicializar sistema de chat
chat.init(); 