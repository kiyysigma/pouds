// Data Game
const gameData = {
    pet: {
        name: "Petty",
        hunger: 75,
        happiness: 85,
        energy: 60,
        cleanliness: 80,
        xp: 150,
        level: 1,
        xpNeeded: 200,
        coins: 500,
        status: "Bahagia dan sehat!",
        mood: "😊"
    },
    
    inventory: [
        { id: 1, name: "Apel", icon: "🍎", count: 3, hunger: 15, happiness: 5, energy: 2 },
        { id: 2, name: "Ikan", icon: "🐟", count: 1, hunger: 25, happiness: 10, energy: 5 },
        { id: 3, name: "Wortel", icon: "🥕", count: 2, hunger: 10, happiness: 3, energy: 2 },
        { id: 4, name: "Susu", icon: "🥛", count: 0, hunger: 20, happiness: 8, energy: 10 }
    ],
    
    shopItems: [
        { id: 1, name: "Apel", icon: "🍎", price: 30, hunger: 15, happiness: 5, energy: 2 },
        { id: 2, name: "Ikan", icon: "🐟", price: 70, hunger: 25, happiness: 10, energy: 5 },
        { id: 3, name: "Wortel", icon: "🥕", price: 20, hunger: 10, happiness: 3, energy: 2 },
        { id: 4, name: "Susu", icon: "🥛", price: 50, hunger: 20, happiness: 8, energy: 10 },
        { id: 5, name: "Kue", icon: "🍰", price: 150, hunger: 40, happiness: 25, energy: -10 },
        { id: 6, name: "Daging", icon: "🥩", price: 200, hunger: 50, happiness: 15, energy: 15 }
    ],
    
    achievements: [
        { id: 1, name: "Pemula", desc: "Mainkan game pertama kali", icon: "🥇", unlocked: true },
        { id: 2, name: "Sahabat Setia", desc: "Rawatan ke-10", icon: "🤝", unlocked: false },
        { id: 3, name: "Kaya Raya", desc: "Kumpulkan 1000 koin", icon: "💰", unlocked: false },
        { id: 4, name: "Ahli Perawat", desc: "Naik ke level 5", icon: "👑", unlocked: false },
        { id: 5, name: "Pet Lover", desc: "Beri makan 50 kali", icon: "❤️", unlocked: false }
    ],
    
    stats: {
        feedCount: 0,
        playCount: 0,
        cleanCount: 0,
        sleepCount: 0
    }
};

// Status Game
let soundEnabled = true;
let minigameActive = false;
let gameTime = 30;
let gameScore = 0;
let gameInterval;

// DOM Elements
const elements = {
    // Stats
    hungerValue: document.getElementById('hunger-value'),
    happinessValue: document.getElementById('happiness-value'),
    energyValue: document.getElementById('energy-value'),
    cleanlinessValue: document.getElementById('cleanliness-value'),
    xpValue: document.getElementById('xp-value'),
    level: document.getElementById('level'),
    coinCount: document.getElementById('coin-count'),
    shopCoinCount: document.getElementById('shop-coin-count'),
    
    // Bars
    hungerBar: document.getElementById('hunger-bar'),
    happinessBar: document.getElementById('happiness-bar'),
    energyBar: document.getElementById('energy-bar'),
    cleanlinessBar: document.getElementById('cleanliness-bar'),
    xpBar: document.getElementById('xp-bar'),
    
    // Pet
    pet: document.getElementById('pet'),
    petMood: document.getElementById('pet-mood'),
    petStatus: document.getElementById('pet-status'),
    petNameInput: document.getElementById('pet-name-input'),
    
    // Buttons
    feedBtn: document.getElementById('feed-btn'),
    playBtn: document.getElementById('play-btn'),
    cleanBtn: document.getElementById('clean-btn'),
    sleepBtn: document.getElementById('sleep-btn'),
    shopBtn: document.getElementById('shop-btn'),
    minigameBtn: document.getElementById('minigame-btn'),
    soundToggle: document.getElementById('sound-toggle'),
    changeNameBtn: document.getElementById('change-name-btn'),
    startGameBtn: document.getElementById('start-game-btn'),
    
    // Modals
    shopModal: document.getElementById('shop-modal'),
    minigameModal: document.getElementById('minigame-modal'),
    closeShop: document.getElementById('close-shop'),
    closeMinigame: document.getElementById('close-minigame'),
    
    // Containers
    inventoryItems: document.getElementById('inventory-items'),
    shopItems: document.getElementById('shop-items'),
    achievementsList: document.getElementById('achievements-list'),
    minigameArea: document.getElementById('minigame-area'),
    gameTimeDisplay: document.getElementById('game-time'),
    gameScoreDisplay: document.getElementById('game-score'),
    
    // Message
    messageBox: document.getElementById('message-box'),
    messageText: document.getElementById('message-text'),
    
    // Audio
    soundEat: document.getElementById('sound-eat'),
    soundPlay: document.getElementById('sound-play'),
    soundClean: document.getElementById('sound-clean'),
    soundSleep: document.getElementById('sound-sleep'),
    soundCoin: document.getElementById('sound-coin'),
    soundLevelup: document.getElementById('sound-levelup')
};

// Initialize Game
function initGame() {
    updateAllDisplays();
    setupEventListeners();
    loadGameState();
    
    // Auto-save every 30 seconds
    setInterval(saveGameState, 30000);
    
    // Degrade stats every 2 minutes
    setInterval(degradeStats, 120000);
    
    showMessage(`Selamat datang, ${gameData.pet.name}! Ayo rawat aku dengan baik!`);
}

// Update All Displays
function updateAllDisplays() {
    updateStatsDisplay();
    updateInventoryDisplay();
    updateShopDisplay();
    updateAchievementsDisplay();
    updatePetMood();
}

// Update Stats Display
function updateStatsDisplay() {
    const p = gameData.pet;
    
    // Update values
    elements.hungerValue.textContent = `${p.hunger}%`;
    elements.happinessValue.textContent = `${p.happiness}%`;
    elements.energyValue.textContent = `${p.energy}%`;
    elements.cleanlinessValue.textContent = `${p.cleanliness}%`;
    elements.xpValue.textContent = `${p.xp}/${p.xpNeeded}`;
    elements.level.textContent = p.level;
    elements.coinCount.textContent = p.coins;
    elements.shopCoinCount.textContent = p.coins;
    elements.petStatus.textContent = p.status;
    elements.petNameInput.value = p.name;
    
    // Update bars
    elements.hungerBar.style.width = `${p.hunger}%`;
    elements.happinessBar.style.width = `${p.happiness}%`;
    elements.energyBar.style.width = `${p.energy}%`;
    elements.cleanlinessBar.style.width = `${p.cleanliness}%`;
    
    const xpPercent = (p.xp / p.xpNeeded) * 100;
    elements.xpBar.style.width = `${xpPercent}%`;
    
    // Update pet appearance
    updatePetAppearance();
}

// Update Inventory Display
function updateInventoryDisplay() {
    elements.inventoryItems.innerHTML = '';
    
    gameData.inventory.forEach(item => {
        if (item.count > 0) {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.innerHTML = `
                <div class="item-count">${item.count}</div>
                <div class="item-icon">${item.icon}</div>
                <div class="item-name">${item.name}</div>
                <button class="use-btn" data-id="${item.id}">Gunakan</button>
            `;
            elements.inventoryItems.appendChild(itemElement);
        }
    });
    
    // Add use button listeners
    document.querySelectorAll('.use-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            useItem(itemId);
        });
    });
}

// Update Shop Display
function updateShopDisplay() {
    elements.shopItems.innerHTML = '';
    
    gameData.shopItems.forEach(item => {
        const canAfford = gameData.pet.coins >= item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        itemElement.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-price">
                <i class="fas fa-coins"></i> ${item.price}
            </div>
            <button class="buy-btn" data-id="${item.id}" ${canAfford ? '' : 'disabled'}>
                ${canAfford ? 'Beli' : 'Koin Tidak Cukup'}
            </button>
        `;
        elements.shopItems.appendChild(itemElement);
    });
    
    // Add buy button listeners
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            buyItem(itemId);
        });
    });
}

// Update Achievements Display
function updateAchievementsDisplay() {
    elements.achievementsList.innerHTML = '';
    
    gameData.achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achievement.unlocked ? '' : 'locked'}`;
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.name}</h4>
                <p>${achievement.desc}</p>
            </div>
        `;
        elements.achievementsList.appendChild(achievementElement);
    });
}

// Update Pet Mood and Appearance
function updatePetMood() {
    const p = gameData.pet;
    let mood = "😊";
    
    if (p.hunger < 30) mood = "😫";
    else if (p.happiness > 80) mood = "😄";
    else if (p.energy < 20) mood = "😴";
    else if (p.cleanliness < 30) mood = "🤢";
    else if (p.hunger > 80 && p.happiness > 70) mood = "😍";
    
    p.mood = mood;
    elements.petMood.textContent = mood;
    
    // Update status text
    if (p.hunger < 20) p.status = "Sangat lapar!";
    else if (p.happiness < 30) p.status = "Sedih...";
    else if (p.energy < 15) p.status = "Lelah sekali...";
    else if (p.cleanliness < 20) p.status = "Kotor dan gatal!";
    else p.status = "Bahagia dan sehat!";
}

// Update Pet Appearance
function updatePetAppearance() {
    const p = gameData.pet;
    const petElement = elements.pet;
    
    // Reset transform
    petElement.style.transform = 'scale(1)';
    
    // Scale based on happiness
    if (p.happiness > 80) {
        petElement.style.transform = 'scale(1.1)';
    } else if (p.happiness < 30) {
        petElement.style.transform = 'scale(0.9)';
    }
    
    // Change color based on cleanliness
    let color;
    if (p.cleanliness > 70) {
        color = 'linear-gradient(to bottom, #8E2DE2, #4A00E0)';
    } else if (p.cleanliness > 40) {
        color = 'linear-gradient(to bottom, #8a2387, #f27121)';
    } else {
        color = 'linear-gradient(to bottom, #4b6cb7, #182848)';
    }
    
    petElement.style.background = color;
}

// Show Message
function showMessage(text) {
    elements.messageText.textContent = text;
    elements.messageBox.classList.add('show');
    
    setTimeout(() => {
        elements.messageBox.classList.remove('show');
    }, 3000);
}

// Play Sound
function playSound(sound) {
    if (!soundEnabled) return;
    
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound error:", e));
}

// Add XP
function addXP(amount) {
    const p = gameData.pet;
    p.xp += amount;
    
    // Check for level up
    if (p.xp >= p.xpNeeded) {
        p.level++;
        p.coins += 100; // Bonus coins
        p.xp -= p.xpNeeded;
        p.xpNeeded = Math.floor(p.xpNeeded * 1.5);
        
        playSound(elements.soundLevelup);
        showMessage(`🎉 Level UP! Sekarang level ${p.level}! +100 koin bonus!`);
        
        // Check achievements
        checkAchievements();
    }
    
    updateAllDisplays();
}

// Feed Pet
function feedPet() {
    // Check if has food in inventory
    if (gameData.inventory.some(item => item.count > 0)) {
        showMessage("Gunakan makanan dari inventori!");
        return;
    }
    
    // Basic feeding (without food items)
    const p = gameData.pet;
    
    p.hunger = Math.min(100, p.hunger + 10);
    p.energy = Math.max(0, p.energy - 3);
    p.happiness = Math.min(100, p.happiness + 5);
    
    gameData.stats.feedCount++;
    playSound(elements.soundEat);
    showMessage(`${p.name} sudah makan!`);
    addXP(8);
    updateAllDisplays();
    checkAchievements();
}

// Play with Pet
function playWithPet() {
    const p = gameData.pet;
    
    if (p.energy < 15) {
        showMessage(`${p.name} terlalu lelah untuk bermain!`);
        return;
    }
    
    p.happiness = Math.min(100, p.happiness + 15);
    p.energy = Math.max(0, p.energy - 10);
    p.hunger = Math.max(0, p.hunger - 5);
    
    gameData.stats.playCount++;
    playSound(elements.soundPlay);
    showMessage(`Wah! Seru bermain dengan ${p.name}!`);
    addXP(12);
    updateAllDisplays();
    checkAchievements();
}

// Clean Pet
function cleanPet() {
    const p = gameData.pet;
    
    if (p.cleanliness >= 95) {
        showMessage(`${p.name} sudah bersih!`);
        return;
    }
    
    p.cleanliness = Math.min(100, p.cleanliness + 20);
    p.happiness = Math.min(100, p.happiness + 10);
    p.energy = Math.max(0, p.energy - 5);
    
    gameData.stats.cleanCount++;
    playSound(elements.soundClean);
    showMessage(`${p.name} sudah mandi, segar sekali!`);
    addXP(10);
    updateAllDisplays();
    checkAchievements();
}

// Put Pet to Sleep
function putPetToSleep() {
    const p = gameData.pet;
    
    if (p.energy > 80) {
        showMessage(`${p.name} tidak mengantuk!`);
        return;
    }
    
    p.energy = Math.min(100, p.energy + 30);
    p.hunger = Math.max(0, p.hunger - 10);
    p.happiness = Math.max(0, p.happiness - 5);
    
    gameData.stats.sleepCount++;
    playSound(elements.soundSleep);
    showMessage(`${p.name} sedang tidur nyenyak... Zzz...`);
    addXP(6);
    updateAllDisplays();
    checkAchievements();
}

// Use Item from Inventory
function useItem(itemId) {
    const item = gameData.inventory.find(i => i.id === itemId);
    const p = gameData.pet;
    
    if (!item || item.count <= 0) {
        showMessage("Item tidak tersedia!");
        return;
    }
    
    // Apply item effects
    p.hunger = Math.min(100, p.hunger + item.hunger);
    p.happiness = Math.min(100, p.happiness + item.happiness);
    p.energy = Math.max(0, Math.min(100, p.energy + item.energy));
    
    // Reduce item count
    item.count--;
    
    playSound(elements.soundEat);
    showMessage(`${p.name} memakan ${item.icon} ${item.name}!`);
    addXP(15);
    gameData.stats.feedCount++;
    updateAllDisplays();
    checkAchievements();
}

// Buy Item from Shop
function buyItem(itemId) {
    const shopItem = gameData.shopItems.find(i => i.id === itemId);
    const p = gameData.pet;
    
    if (!shopItem) return;
    
    if (p.coins < shopItem.price) {
        showMessage("Koin tidak cukup!");
        return;
    }
    
    // Deduct coins
    p.coins -= shopItem.price;
    
    // Add to inventory
    const inventoryItem = gameData.inventory.find(i => i.id === itemId);
    if (inventoryItem) {
        inventoryItem.count++;
    } else {
        gameData.inventory.push({
            ...shopItem,
            count: 1
        });
    }
    
    playSound(elements.soundCoin);
    showMessage(`Berhasil membeli ${shopItem.icon} ${shopItem.name}!`);
    updateAllDisplays();
}

// Degrade Stats Over Time
function degradeStats() {
    const p = gameData.pet;
    
    p.hunger = Math.max(0, p.hunger - 2);
    p.happiness = Math.max(0, p.happiness - 1);
    p.cleanliness = Math.max(0, p.cleanliness - 1);
    
    // Auto-sleep if energy is very low
    if (p.energy < 10 && Math.random() > 0.7) {
        p.energy = Math.min(100, p.energy + 20);
        showMessage(`${p.name} tertidur karena kelelahan...`);
    }
    
    updateAllDisplays();
}

// Check Achievements
function checkAchievements() {
    const p = gameData.pet;
    const stats = gameData.stats;
    
    // Check achievements
    if (p.coins >= 1000) unlockAchievement(3);
    if (p.level >= 5) unlockAchievement(4);
    if (stats.feedCount >= 50) unlockAchievement(5);
    if (stats.feedCount + stats.playCount + stats.cleanCount + stats.sleepCount >= 10) {
        unlockAchievement(2);
    }
}

// Unlock Achievement
function unlockAchievement(id) {
    const achievement = gameData.achievements.find(a => a.id === id);
    
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        showMessage(`🎉 Pencapaian terbuka: ${achievement.name}!`);
        updateAchievementsDisplay();
    }
}

// Mini Game Functions
function startMiniGame() {
    if (minigameActive) return;
    
    minigameActive = true;
    gameTime = 30;
    gameScore = 0;
    
    elements.gameTimeDisplay.textContent = gameTime;
    elements.gameScoreDisplay.textContent = gameScore;
    elements.minigameArea.innerHTML = '';
    
    // Start game timer
    gameInterval = setInterval(updateGame, 1000);
    
    // Create coins
    createCoins();
    
    showMessage("Game dimulai! Klik koin yang jatuh!");
}

function updateGame() {
    gameTime--;
    elements.gameTimeDisplay.textContent = gameTime;
    
    if (gameTime <= 0) {
        endMiniGame();
    }
}

function createCoins() {
    if (!minigameActive) return;
    
    // Create 3-5 coins
    const coinCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < coinCount; i++) {
        setTimeout(() => {
            if (!minigameActive) return;
            
            createCoin();
        }, i * 500);
    }
    
    // Schedule next coin creation
    setTimeout(createCoins, 2000);
}

function createCoin() {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.textContent = '🪙';
    coin.style.left = `${Math.random() * 90}%`;
    coin.style.top = '0px';
    
    coin.addEventListener('click', collectCoin);
    
    elements.minigameArea.appendChild(coin);
    
    // Animate coin falling
    let top = 0;
    const fallInterval = setInterval(() => {
        if (!minigameActive) {
            clearInterval(fallInterval);
            return;
        }
        
        top += 3;
        coin.style.top = `${top}px`;
        
        if (top >= 350) {
            clearInterval(fallInterval);
            coin.remove();
        }
    }, 50);
}

function collectCoin() {
    if (!minigameActive) return;
    
    gameScore++;
    elements.gameScoreDisplay.textContent = gameScore;
    playSound(elements.soundCoin);
    
    this.remove();
    
    // Check win condition
    if (gameScore >= 10) {
        winMiniGame();
    }
}

function winMiniGame() {
    minigameActive = false;
    clearInterval(gameInterval);
    
    // Reward player
    gameData.pet.coins += 100;
    gameData.pet.happiness = Math.min(100, gameData.pet.happiness + 20);
    
    playSound(elements.soundLevelup);
    showMessage("🎉 Menang! +100 koin dan hewan peliharaan bahagia!");
    updateAllDisplays();
    
    setTimeout(() => {
        elements.minigameModal.classList.remove('show');
    }, 2000);
}

function endMiniGame() {
    minigameActive = false;
    clearInterval(gameInterval);
    
    if (gameScore >= 10) {
        winMiniGame();
    } else {
        showMessage("Game selesai! Coba lagi untuk mendapatkan lebih banyak koin!");
        setTimeout(() => {
            elements.minigameModal.classList.remove('show');
        }, 2000);
    }
}

// Save/Load Game State
function saveGameState() {
    const gameState = {
        pet: gameData.pet,
        inventory: gameData.inventory,
        stats: gameData.stats,
        achievements: gameData.achievements
    };
    
    localStorage.setItem('virtualPetGame', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('virtualPetGame');
    
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            
            // Load saved state
            Object.assign(gameData.pet, savedState.pet);
            gameData.inventory = savedState.inventory;
            gameData.stats = savedState.stats;
            gameData.achievements = savedState.achievements;
            
            showMessage("Game berhasil dimuat!");
        } catch (e) {
            console.log("Error loading game:", e);
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Action buttons
    elements.feedBtn.addEventListener('click', feedPet);
    elements.playBtn.addEventListener('click', playWithPet);
    elements.cleanBtn.addEventListener('click', cleanPet);
    elements.sleepBtn.addEventListener('click', putPetToSleep);
    
    // Extra buttons
    elements.shopBtn.addEventListener('click', () => {
        elements.shopModal.classList.add('show');
        updateShopDisplay();
    });
    
    elements.minigameBtn.addEventListener('click', () => {
        elements.minigameModal.classList.add('show');
        elements.minigameArea.innerHTML = '';
        elements.gameTimeDisplay.textContent = '30';
        elements.gameScoreDisplay.textContent = '0';
    });
    
    elements.soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const icon = elements.soundToggle.querySelector('i');
        icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        showMessage(soundEnabled ? "Suara diaktifkan" : "Suara dimatikan");
    });
    
    elements.changeNameBtn.addEventListener('click', () => {
        const newName = elements.petNameInput.value.trim();
        if (newName && newName.length <= 10) {
            gameData.pet.name = newName;
            showMessage(`Nama berhasil diubah menjadi ${newName}!`);
            updateAllDisplays();
        }
    });
    
    // Modal close buttons
    elements.closeShop.addEventListener('click', () => {
        elements.shopModal.classList.remove('show');
    });
    
    elements.closeMinigame.addEventListener('click', () => {
        elements.minigameModal.classList.remove('show');
        minigameActive = false;
        clearInterval(gameInterval);
    });
    
    // Mini game start button
    elements.startGameBtn.addEventListener('click', startMiniGame);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === elements.shopModal) {
            elements.shopModal.classList.remove('show');
        }
        if (e.target === elements.minigameModal) {
            elements.minigameModal.classList.remove('show');
            minigameActive = false;
            clearInterval(gameInterval);
        }
    });
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', initGame);

// Auto-save when page closes
window.addEventListener('beforeunload', saveGameState);
