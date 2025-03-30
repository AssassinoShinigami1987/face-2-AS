// Sistema de RPG
const rpg = {
    // Estado do jogo
    gameState: {
        currentBattle: null,
        playerStats: null,
        inventory: [],
        quests: []
    },

    // Inicialização
    init() {
        this.loadPlayerStats();
        this.loadInventory();
        this.loadQuests();
    },

    // Carregamento de dados
    loadPlayerStats() {
        if (state.user) {
            // Simular carregamento de estatísticas do jogador
            this.gameState.playerStats = {
                level: state.user.level,
                xp: state.user.xp,
                hp: 100,
                mp: 50,
                strength: 10,
                defense: 5,
                speed: 8
            };
        }
    },

    loadInventory() {
        // Simular carregamento do inventário
        this.gameState.inventory = [
            { id: 1, name: 'Poção de Vida', type: 'consumable', quantity: 3 },
            { id: 2, name: 'Espada de Ferro', type: 'weapon', quantity: 1 },
            { id: 3, name: 'Armadura de Couro', type: 'armor', quantity: 1 }
        ];
    },

    loadQuests() {
        // Simular carregamento de missões
        this.gameState.quests = [
            {
                id: 1,
                title: 'Treinamento Básico',
                description: 'Complete 3 batalhas para ganhar experiência',
                progress: 0,
                required: 3,
                reward: { xp: 100, gold: 50 }
            }
        ];
    },

    // Funções de batalha
    initializeBattle() {
        const battleArena = document.getElementById('battle-arena');
        const battleControls = document.getElementById('battle-controls');

        if (!this.gameState.currentBattle) {
            battleArena.innerHTML = `
                <div class="battle-setup">
                    <h2>Iniciar Batalha</h2>
                    <div class="battle-options">
                        <button onclick="rpg.startBattle('easy')">Batalha Fácil</button>
                        <button onclick="rpg.startBattle('medium')">Batalha Média</button>
                        <button onclick="rpg.startBattle('hard')">Batalha Difícil</button>
                    </div>
                </div>
            `;
        } else {
            this.updateBattleUI();
        }
    },

    startBattle(difficulty) {
        // Simular início de batalha
        this.gameState.currentBattle = {
            difficulty,
            round: 1,
            playerHP: this.gameState.playerStats.hp,
            enemyHP: this.getEnemyHP(difficulty),
            enemyStats: this.generateEnemyStats(difficulty)
        };

        this.updateBattleUI();
    },

    getEnemyHP(difficulty) {
        const baseHP = 100;
        switch (difficulty) {
            case 'easy': return baseHP * 0.8;
            case 'medium': return baseHP;
            case 'hard': return baseHP * 1.2;
            default: return baseHP;
        }
    },

    generateEnemyStats(difficulty) {
        const baseStats = {
            strength: 10,
            defense: 5,
            speed: 8
        };

        switch (difficulty) {
            case 'easy':
                return {
                    ...baseStats,
                    strength: baseStats.strength * 0.8,
                    defense: baseStats.defense * 0.8,
                    speed: baseStats.speed * 0.8
                };
            case 'medium':
                return baseStats;
            case 'hard':
                return {
                    ...baseStats,
                    strength: baseStats.strength * 1.2,
                    defense: baseStats.defense * 1.2,
                    speed: baseStats.speed * 1.2
                };
            default:
                return baseStats;
        }
    },

    updateBattleUI() {
        const battleArena = document.getElementById('battle-arena');
        const battleControls = document.getElementById('battle-controls');

        if (!this.gameState.currentBattle) return;

        const { playerHP, enemyHP, round } = this.gameState.currentBattle;

        battleArena.innerHTML = `
            <div class="battle-status">
                <div class="player-status">
                    <h3>Seu Personagem</h3>
                    <div class="hp-bar">
                        <div class="hp-fill" style="width: ${(playerHP / this.gameState.playerStats.hp) * 100}%"></div>
                    </div>
                    <p>HP: ${playerHP}/${this.gameState.playerStats.hp}</p>
                </div>
                <div class="enemy-status">
                    <h3>Inimigo</h3>
                    <div class="hp-bar">
                        <div class="hp-fill" style="width: ${(enemyHP / this.getEnemyHP(this.gameState.currentBattle.difficulty)) * 100}%"></div>
                    </div>
                    <p>HP: ${enemyHP}</p>
                </div>
                <p>Rodada: ${round}</p>
            </div>
        `;

        battleControls.innerHTML = `
            <div class="battle-actions">
                <button onclick="rpg.performAction('attack')">Atacar</button>
                <button onclick="rpg.performAction('defend')">Defender</button>
                <button onclick="rpg.performAction('special')">Ataque Especial</button>
            </div>
        `;
    },

    performAction(action) {
        if (!this.gameState.currentBattle) return;

        const { playerHP, enemyHP, round } = this.gameState.currentBattle;
        let damage = 0;

        switch (action) {
            case 'attack':
                damage = this.calculateDamage(this.gameState.playerStats.strength, this.gameState.currentBattle.enemyStats.defense);
                break;
            case 'defend':
                // Aumenta a defesa temporariamente
                this.gameState.playerStats.defense *= 1.5;
                break;
            case 'special':
                damage = this.calculateDamage(this.gameState.playerStats.strength * 1.5, this.gameState.currentBattle.enemyStats.defense);
                break;
        }

        // Aplicar dano ao inimigo
        this.gameState.currentBattle.enemyHP -= damage;

        // Verificar fim de batalha
        if (this.gameState.currentBattle.enemyHP <= 0) {
            this.endBattle(true);
        } else {
            // Turno do inimigo
            this.enemyTurn();
        }

        this.updateBattleUI();
    },

    calculateDamage(attack, defense) {
        return Math.max(0, attack - defense + Math.floor(Math.random() * 5));
    },

    enemyTurn() {
        const damage = this.calculateDamage(
            this.gameState.currentBattle.enemyStats.strength,
            this.gameState.playerStats.defense
        );

        this.gameState.currentBattle.playerHP -= damage;

        if (this.gameState.currentBattle.playerHP <= 0) {
            this.endBattle(false);
        }

        this.gameState.currentBattle.round++;
    },

    endBattle(victory) {
        if (victory) {
            // Adicionar XP e recompensas
            const xpGained = this.calculateXP(this.gameState.currentBattle.difficulty);
            state.user.xp += xpGained;
            
            // Verificar level up
            if (state.user.xp >= this.getNextLevelXP()) {
                state.user.level++;
                this.levelUp();
            }

            // Salvar progresso
            localStorage.setItem('user', JSON.stringify(state.user));
        }

        // Limpar batalha atual
        this.gameState.currentBattle = null;
        this.initializeBattle();
    },

    calculateXP(difficulty) {
        const baseXP = 50;
        switch (difficulty) {
            case 'easy': return baseXP * 0.8;
            case 'medium': return baseXP;
            case 'hard': return baseXP * 1.2;
            default: return baseXP;
        }
    },

    getNextLevelXP() {
        return state.user.level * 100;
    },

    levelUp() {
        // Aumentar estatísticas
        this.gameState.playerStats.hp += 10;
        this.gameState.playerStats.mp += 5;
        this.gameState.playerStats.strength += 2;
        this.gameState.playerStats.defense += 1;
        this.gameState.playerStats.speed += 1;

        alert(`Parabéns! Você subiu para o nível ${state.user.level}!`);
    }
};

// Inicializar sistema RPG
rpg.init(); 