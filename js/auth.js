// Gerenciamento de autenticação
const auth = {
    // Elementos do DOM
    loginModal: document.getElementById('login-modal'),
    registerModal: document.getElementById('register-modal'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    loginBtn: document.getElementById('login-btn'),
    registerBtn: document.getElementById('register-btn'),
    logoutBtn: document.getElementById('logout-btn'),

    // Inicialização
    init() {
        this.loginBtn.addEventListener('click', () => this.showLoginModal());
        this.registerBtn.addEventListener('click', () => this.showRegisterModal());
        this.logoutBtn.addEventListener('click', () => this.logout());
        
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    },

    // Funções de exibição de modal
    showLoginModal() {
        this.loginModal.style.display = 'block';
    },

    showRegisterModal() {
        this.registerModal.style.display = 'block';
    },

    hideModals() {
        this.loginModal.style.display = 'none';
        this.registerModal.style.display = 'none';
    },

    // Manipuladores de formulário
    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(this.loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            // Simular autenticação (substituir por chamada real à API)
            const user = await this.login(email, password);
            if (user) {
                state.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                this.hideModals();
                updateNavigation();
                navigate('home');
            }
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        }
    },

    async handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(this.registerForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            // Simular registro (substituir por chamada real à API)
            const user = await this.register(name, email, password);
            if (user) {
                state.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                this.hideModals();
                updateNavigation();
                navigate('home');
            }
        } catch (error) {
            alert('Erro ao registrar: ' + error.message);
        }
    },

    // Funções de autenticação
    async login(email, password) {
        // Simular chamada à API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular validação
                if (email && password) {
                    resolve({
                        id: 1,
                        name: 'Usuário Teste',
                        email: email,
                        level: 1,
                        xp: 0
                    });
                } else {
                    reject(new Error('Credenciais inválidas'));
                }
            }, 1000);
        });
    },

    async register(name, email, password) {
        // Simular chamada à API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular validação
                if (name && email && password) {
                    resolve({
                        id: 1,
                        name: name,
                        email: email,
                        level: 1,
                        xp: 0
                    });
                } else {
                    reject(new Error('Dados inválidos'));
                }
            }, 1000);
        });
    },

    logout() {
        state.user = null;
        localStorage.removeItem('user');
        updateNavigation();
        navigate('home');
    }
};

// Inicializar autenticação
auth.init(); 