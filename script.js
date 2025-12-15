// Game Virtual Pet dengan Mini Games
// Versi Desktop dan Mobile

// Data Game
const gameData = {
    pet: {
        name: "Petty",
        hunger: 75,
        happiness: 85,
        energy: 60,
        cleanliness: 80,
        health: 90,
        xp: 150,
        level: 1,
        xpNeeded: 200,
        coins: 500,
        age: 1,
        status: "Bahagia dan sehat!",
        mood: "😊",
        lastPlayTime: Date.now()
    },
    
    inventory: {
        food: [
            { id: 1, name: "Apel", icon: "🍎", count: 3, hunger: 15, happiness: 5, energy: 2 },
            { id: 2, name: "Ikan", icon: "🐟", count: 1, hunger: 25, happiness: 10, energy: 5 },
            { id: 3, name: "Wortel", icon: "🥕", count: 2, hunger: 10, happiness: 3, energy: 2 },
            { id: 4, name: "Susu", icon: "🥛", count: 0, hunger: 20, happiness: 8, energy: 10 },
            { id: 5, name: "Kue", icon: "🍰", count: 0, hunger: 40, happiness: 25, energy: -10 }
        ],
        items: [
            { id: 101, name: "Obat", icon: "💊", count: 2, health: 30 },
            { id: 102, name: "Vitamin", icon: "🧪", count: 1, health: 15, happiness: 10 },
            { id: 103, name: "Sabun", icon: "🧼", count: 3, cleanliness: 25 }
        ],
        special: [
            { id: 201, name: "Topi", icon: "🎩", count: 1 },
            { id: 202, name: "Kacamata", icon: "👓", count: 0 }
        ]
    },
    
    shopItems: {
        food: [
            { id: 1, name: "Apel", icon: "🍎", price: 30, hunger: 15, happiness: 5, energy: 2, desc: "Apel segar untuk kesehatan" },
            { id: 2, name: "Ikan", icon: "🐟", price: 70, hunger: 25, happiness: 10, energy: 5, desc: "Ikan segar penuh protein" },
            { id: 3, name: "Wortel", icon: "🥕", price: 20, hunger: 10, happiness: 3, energy: 2, desc: "Wortel kaya vitamin A" },
            { id: 4, name: "Susu", icon: "🥛", price: 50, hunger: 20, happiness: 8, energy: 10, desc: "Susu untuk tulang kuat" },
            { id: 5, name: "Kue", icon: "🍰", price: 150, hunger: 40, happiness: 25, energy: -10, desc: "Kue manis untuk kebahagiaan" },
            { id: 6, name: "Daging", icon: "🥩", price: 200, hunger: 50, happiness: 15, energy: 15, desc: "Daging penuh energi" }
        ],
        items: [
            { id: 101, name: "Obat", icon: "💊", price: 100, health: 30, desc: "Menyembuhkan sakit" },
            { id: 102, name: "Vitamin", icon: "🧪", price: 80, health: 15, happiness: 10, desc: "Meningkatkan kesehatan" },
            { id: 103, name: "Sabun", icon: "🧼", price: 40, cleanliness: 25, desc: "Untuk mandi yang bersih" },
            { id: 104, name: "Sikat", icon: "🪮", price: 60, cleanliness: 20, happiness: 5, desc: "Menyikat bulu pet" }
        ],
        upgrades: [
            { id: 301, name: "Kandang Besar", icon: "🏠", price: 500, desc: "Meningkatkan kebahagiaan maksimal" },
            { id: 302, name: "Mainan Baru", icon: "🧸", price: 300, desc: "Meningkatkan kebahagiaan lebih cepat" },
            { id: 303, name: "Tempat Makan", icon: "🍽️", price: 200, desc: "Makanan lebih efektif" }
        ],
        cosmetics: [
            { id: 201, name: "Topi", icon: "🎩", price: 150, desc: "Topi keren untuk pet" },
            { id: 202, name: "Kacamata", icon: "👓", price: 200, desc: "Kacamata gaya" },
            { id: 203, name: "Kalung", icon: "📿", price: 250, desc: "Kalung emas mewah" }
        ]
    },
    
    achievements: [
        { id: 1, name: "Pemula", desc: "Mainkan game pertama kali", icon: "🥇", unlocked: true, progress: 100 },
        { id: 2, name: "Sahabat Setia", desc: "Rawatan ke-10", icon: "🤝", unlocked: false, progress: 30 },
        { id: 3, name: "Kaya Raya", desc: "Kumpulkan 1000 koin", icon: "💰", unlocked: false, progress: 50 },
        { id: 4, name: "Ahli Perawat", desc: "Naik ke level 5", icon: "👑", unlocked: false, progress: 20 },
        { id: 5, name: "Pet Lover", desc: "Beri makan 50 kali", icon: "❤️", unlocked: false, progress: 6 },
        { id: 6, name: "Gamer Sejati", desc: "Mainkan 10 mini game", icon: "🎮", unlocked: false, progress: 0 }
    ],
    
    stats: {
        feedCount: 0,
        playCount: 0,
        cleanCount: 0,
        sleepCount: 0,
        healCount: 0,
        trainCount: 0,
        minigamesPlayed: 0,
        totalCoinsEarned: 500,
        totalPlayTime: 0,
        lastSave: Date.now()
    },
    
    settings: {
        sound: true,
        music: true,
        notifications: true
    },
    
    currentMinigame: null,
    gameInterval: null,
    gameTimeLeft: 0,
    gameScore: 0,
    gameCoins: 0,
    gameActive: false,
    musicPlaying: false
};

// DOM Elements
const elements = {
    // Header
    coinCount: document.getElementById('coin-count'),
    level: document.getElementById('level'),
    gameTime: document.getElementById('game-time'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    sidebar: document.getElementById('sidebar'),
    
    // Stats Display
    hungerValue: document.getElementById('hunger-value'),
    happinessValue: document.getElementById('happiness-value'),
    energyValue: document.getElementById('energy-value'),
    cleanlinessValue: document.getElementById('cleanliness-value'),
    healthValue: document.getElementById('health-value'),
    xpValue: document.getElementById('xp-value'),
    petAge: document.getElementById('pet-age'),
    
    // Stat Bars
    hungerBar: document.getElementById('hunger-bar'),
    happinessBar: document.getElementById('happiness-bar'),
    energyBar: document.getElementById('energy-bar'),
    cleanlinessBar: document.getElementById('cleanliness-bar'),
    healthBar: document.getElementById('health-bar'),
    xpBar: document.getElementById('xp-bar'),
    
    // Pet Display
    pet: document.getElementById('pet'),
    petMood: document.getElementById('pet-mood'),
    petStatus: document.getElementById('pet-status'),
    petNameInput: document.getElementById('pet-name-input'),
    changeNameBtn: document.getElementById('change-name-btn'),
    
    // Effects
    effectHappy: document.getElementById('effect-happy'),
    effectSad: document.getElementById('effect-sad'),
    effectHungry: document.getElementById('effect-hungry'),
    effectSleepy: document.getElementById('effect-sleepy'),
    
    // Action Buttons
    feedBtn: document.getElementById('feed-btn'),
    playBtn: document.getElementById('play-btn'),
    cleanBtn: document.getElementById('clean-btn'),
    sleepBtn: document.getElementById('sleep-btn'),
    healBtn: document.getElementById('heal-btn'),
    trainBtn: document.getElementById('train-btn'),
    
    // Extra Buttons
    shopBtn: document.getElementById('shop-btn'),
    inventoryBtn: document.getElementById('inventory-btn'),
    saveBtn: document.getElementById('save-btn'),
    minigameBtn: document.getElementById('minigame-btn'),
    
    // Inventory Tabs
    inventoryTabs: document.querySelectorAll('.tab-btn'),
    inventoryFood: document.getElementById('inventory-food'),
    inventoryItems: document.getElementById('inventory-items'),
    inventorySpecial: document.getElementById('inventory-special'),
    
    // Achievements
    achievementsList: document.getElementById('achievements-list'),
    
    // Sidebar Stats
    totalGames: document.getElementById('total-games'),
    totalFeeds: document.getElementById('total-feeds'),
    totalPlaytime: document.getElementById('total-playtime'),
    totalCoins: document.getElementById('total-coins'),
    
    // Settings
    soundToggle: document.getElementById('sound-toggle'),
    musicToggle: document.getElementById('music-toggle'),
    notifToggle: document.getElementById('notif-toggle'),
    
    // Modals
    shopModal: document.getElementById('shop-modal'),
    minigameModal: document.getElementById('minigame-modal'),
    minigamePlayModal: document.getElementById('minigame-play-modal'),
    helpModal: document.getElementById('help-modal'),
    
    // Modal Buttons
    closeShop: document.getElementById('close-shop'),
    closeMinigame: document.getElementById('close-minigame'),
    closeGame: document.getElementById('close-game'),
    closeHelp: document.getElementById('close-help'),
    
    // Shop Elements
    shopCoinCount: document.getElementById('shop-coin-count'),
    shopTabs: document.querySelectorAll('.shop-tab-btn'),
    shopFoodItems: document.getElementById('shop-food-items'),
    shopItemsItems: document.getElementById('shop-items-items'),
    shopUpgradesItems: document.getElementById('shop-upgrades-items'),
    shopCosmeticsItems: document.getElementById('shop-cosmetics-items'),
    
    // Mini Game Elements
    minigameCards: document.querySelectorAll('.minigame-card'),
    gameTitle: document.getElementById('game-title'),
    gameArea: document.getElementById('game-area'),
    gameTimeDisplay: document.getElementById('game-time'),
    gameScoreDisplay: document.getElementById('game-score'),
    gameTargetDisplay: document.getElementById('game-target'),
    gameCoinsDisplay: document.getElementById('game-coins'),
    
    // Game Controls
    startGameBtn: document.getElementById('start-game-btn'),
    pauseGameBtn: document.getElementById('pause-game-btn'),
    restartGameBtn: document.getElementById('restart-game-btn'),
    
    // Footer Buttons
    helpBtn: document.getElementById('help-btn'),
    aboutBtn: document.getElementById('about-btn'),
    resetBtn: document.getElementById('reset-btn'),
    
    // Message Box
    messageBox: document.getElementById('message-box'),
    messageText: document.getElementById('message-text'),
    
    // Audio Elements
    soundEat: document.getElementById('sound-eat'),
    soundPlay: document.getElementById('sound-play'),
    soundClean: document.getElementById('sound-clean'),
    soundSleep: document.getElementById('sound-sleep'),
    soundCoin: document.getElementById('sound-coin'),
    soundLevelup: document.getElementById('sound-levelup'),
    soundBuy: document.getElementById('sound-buy'),
    soundGameStart: document.getElementById('sound-game-start'),
    soundGameWin: document.getElementById('sound-game-win'),
    soundGameLose: document.getElementById('sound-game-lose'),
    bgMusic: document.getElementById('bg-music')
};

// Initialize Game
function initGame() {
    loadGameState();
    updateAllDisplays();
    setupEventListeners();
    startGameLoop();
    
    // Show welcome message
    setTimeout(() => {
        showMessage(`Selamat datang, ${gameData.pet.name}! Ayo rawat aku dengan baik!`);
    }, 1000);
    
    // Start background music if enabled
    if (gameData.settings.music) {
        toggleBackgroundMusic(true);
    }
}

// Update All Displays
function updateAllDisplays() {
    updatePetDisplay();
    updateStatsDisplay();
    updateInventoryDisplay();
    updateAchievementsDisplay();
    updateSidebarStats();
    updateShopDisplay();
}

// Update Pet Display
function updatePetDisplay() {
    const p = gameData.pet;
    
    // Update values
    elements.hungerValue.textContent = `${p.hunger}%`;
    elements.happinessValue.textContent = `${p.happiness}%`;
    elements.energyValue.textContent = `${p.energy}%`;
    elements.cleanlinessValue.textContent = `${p.cleanliness}%`;
    elements.healthValue.textContent = `${p.health}%`;
    elements.xpValue.textContent = `${p.xp}/${p.xpNeeded}`;
    elements.level.textContent = p.level;
    elements.coinCount.textContent = p.coins;
    elements.petAge.textContent = p.age;
    elements.petNameInput.value = p.name;
    elements.petStatus.textContent = p.status;
    
    // Update bars with animation
    animateBar(elements.hungerBar, p.hunger);
    animateBar(elements.happinessBar, p.happiness);
    animateBar(elements.energyBar, p.energy);
    animateBar(elements.cleanlinessBar, p.cleanliness);
    animateBar(elements.healthBar, p.health);
    
    const xpPercent = (p.xp / p.xpNeeded) * 100;
    animateBar(elements.xpBar, xpPercent);
    
    // Update pet mood
    updatePetMood();
    
    // Update pet effects
    updatePetEffects();
    
    // Update pet appearance
    updatePetAppearance();
}

// Animate bar width change
function animateBar(barElement, targetWidth) {
    const currentWidth = parseFloat(barElement.style.width) || 0;
    if (Math.abs(currentWidth - targetWidth) > 1) {
        barElement.style.width = `${targetWidth}%`;
    }
}

// Update Pet Mood
function updatePetMood() {
    const p = gameData.pet;
    let mood = "😊";
    
    if (p.health < 30) mood = "🤒";
    else if (p.hunger < 20) mood = "😫";
    else if (p.happiness > 85) mood = "😄";
    else if (p.energy < 15) mood = "😴";
    else if (p.cleanliness < 20) mood = "🤢";
    else if (p.hunger > 80 && p.happiness > 70) mood = "😍";
    else if (p.happiness < 30) mood = "😔";
    
    p.mood = mood;
    elements.petMood.textContent = mood;
    
    // Update status text
    if (p.health < 30) p.status = "Sakit parah, butuh obat!";
    else if (p.hunger < 15) p.status = "Kelaparan! Beri makan!";
    else if (p.happiness < 20) p.status = "Sangat sedih...";
    else if (p.energy < 10) p.status = "Lelah sekali, butuh tidur!";
    else if (p.cleanliness < 15) p.status = "Sangat kotor, mandikan!";
    else if (p.hunger > 90) p.status = "Sangat kenyang!";
    else if (p.happiness > 90) p.status = "Sangat bahagia!";
    else if (p.energy > 90) p.status = "Penuh energi!";
    else if (p.cleanliness > 90) p.status = "Bersih dan wangi!";
    else p.status = "Bahagia dan sehat!";
}

// Update Pet Effects
function updatePetEffects() {
    const p = gameData.pet;
    
    // Show/hide effects based on stats
    elements.effectHappy.style.display = p.happiness > 80 ? 'block' : 'none';
    elements.effectSad.style.display = p.happiness < 30 ? 'block' : 'none';
    elements.effectHungry.style.display = p.hunger < 30 ? 'block' : 'none';
    elements.effectSleepy.style.display = p.energy < 20 ? 'block' : 'none';
    
    // Position effects randomly around pet
    const effects = [elements.effectHappy, elements.effectSad, elements.effectHungry, elements.effectSleepy];
    effects.forEach(effect => {
        if (effect.style.display === 'block') {
            const x = Math.random() * 140 - 70;
            const y = Math.random() * 140 - 70;
            effect.style.left = `calc(50% + ${x}px)`;
            effect.style.top = `calc(50% + ${y}px)`;
        }
    });
}

// Update Pet Appearance
function updatePetAppearance() {
    const p = gameData.pet;
    const petElement = elements.pet;
    
    // Reset animations
    petElement.classList.remove('jump', 'shake');
    
    // Scale based on happiness
    let scale = 1;
    if (p.happiness > 80) scale = 1.1;
    else if (p.happiness < 30) scale = 0.9;
    
    // Add animations based on mood
    if (p.happiness > 85) {
        petElement.classList.add('jump');
    } else if (p.health < 50) {
        petElement.classList.add('shake');
    }
    
    // Change color based on health and cleanliness
    let color;
    if (p.health > 70 && p.cleanliness > 70) {
        color = 'linear-gradient(to bottom, #8E2DE2, #4A00E0)';
    } else if (p.health > 40 && p.cleanliness > 40) {
        color = 'linear-gradient(to bottom, #8a2387, #f27121)';
    } else {
        color = 'linear-gradient(to bottom, #4b6cb7, #182848)';
    }
    
    petElement.style.background = color;
    petElement.style.transform = `scale(${scale})`;
}

// Update Inventory Display
function updateInventoryDisplay() {
    // Food tab
    elements.inventoryFood.innerHTML = '';
    gameData.inventory.food.forEach(item => {
        if (item.count > 0) {
            const itemElement = createInventoryItem(item, 'food');
            elements.inventoryFood.appendChild(itemElement);
        }
    });
    
    // Items tab
    elements.inventoryItems.innerHTML = '';
    gameData.inventory.items.forEach(item => {
        if (item.count > 0) {
            const itemElement = createInventoryItem(item, 'items');
            elements.inventoryItems.appendChild(itemElement);
        }
    });
    
    // Special tab
    elements.inventorySpecial.innerHTML = '';
    gameData.inventory.special.forEach(item => {
        if (item.count > 0) {
            const itemElement = createInventoryItem(item, 'special');
            elements.inventorySpecial.appendChild(itemElement);
        }
    });
    
    // Add empty message if no items
    [elements.inventoryFood, elements.inventoryItems, elements.inventorySpecial].forEach(container => {
        if (container.children.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-inventory';
            emptyMsg.textContent = 'Tidak ada item';
            emptyMsg.style.gridColumn = '1 / -1';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.padding = '40px';
            emptyMsg.style.color = '#666';
            container.appendChild(emptyMsg);
        }
    });
}

// Create Inventory Item Element
function createInventoryItem(item, type) {
    const itemElement = document.createElement('div');
    itemElement.className = 'inventory-item';
    
    let useBtnText = 'Gunakan';
    if (type === 'special') useBtnText = 'Pakai';
    
    itemElement.innerHTML = `
        <div class="item-count">${item.count}</div>
        <div class="item-icon">${item.icon}</div>
        <div class="item-name">${item.name}</div>
        <button class="use-btn" data-id="${item.id}" data-type="${type}">${useBtnText}</button>
    `;
    
    return itemElement;
}

// Update Achievements Display
function updateAchievementsDisplay() {
    elements.achievementsList.innerHTML = '';
    
    gameData.achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        const progressBar = achievement.unlocked ? '' : `
            <div class="achievement-progress">
                <div class="achievement-progress-fill" style="width: ${achievement.progress}%"></div>
            </div>
        `;
        
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h4>${achievement.name}</h4>
            <p>${achievement.desc}</p>
            ${progressBar}
        `;
        
        elements.achievementsList.appendChild(achievementElement);
    });
}

// Update Sidebar Stats
function updateSidebarStats() {
    elements.totalGames.textContent = gameData.stats.minigamesPlayed;
    elements.totalFeeds.textContent = gameData.stats.feedCount;
    elements.totalPlaytime.textContent = `${Math.floor(gameData.stats.totalPlayTime / 60)}m`;
    elements.totalCoins.textContent = gameData.stats.totalCoinsEarned;
}

// Update Shop Display
function updateShopDisplay() {
    elements.shopCoinCount.textContent = gameData.pet.coins;
    
    // Update all shop tabs
    updateShopTab('food');
    updateShopTab('items');
    updateShopTab('upgrades');
    updateShopTab('cosmetics');
}

// Update Specific Shop Tab
function updateShopTab(tab) {
    const container = elements[`shop${tab.charAt(0).toUpperCase() + tab.slice(1)}Items`];
    const items = gameData.shopItems[tab];
    
    if (!container || !items) return;
    
    container.innerHTML = '';
    
    items.forEach(item => {
        const canAfford = gameData.pet.coins >= item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        
        itemElement.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-desc">${item.desc || 'Item spesial untuk pet'}</div>
            <div class="shop-item-price">
                <i class="fas fa-coins"></i> ${item.price}
            </div>
            <button class="buy-btn" data-id="${item.id}" data-tab="${tab}" ${canAfford ? '' : 'disabled'}>
                ${canAfford ? 'Beli' : 'Koin Tidak Cukup'}
            </button>
        `;
        
        container.appendChild(itemElement);
    });
}

// Show Message
function showMessage(text, duration = 3000) {
    if (!gameData.settings.notifications) return;
    
    elements.messageText.textContent = text;
    elements.messageBox.classList.add('show');
    
    setTimeout(() => {
        elements.messageBox.classList.remove('show');
    }, duration);
}

// Play Sound
function playSound(sound) {
    if (!gameData.settings.sound || !sound) return;
    
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound error:", e));
}

// Toggle Background Music
function toggleBackgroundMusic(play) {
    if (play && gameData.settings.music) {
        elements.bgMusic.volume = 0.3;
        elements.bgMusic.play().catch(e => console.log("Music error:", e));
        gameData.musicPlaying = true;
    } else {
        elements.bgMusic.pause();
        gameData.musicPlaying = false;
    }
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

// Check Achievements
function checkAchievements() {
    const p = gameData.pet;
    const stats = gameData.stats;
    
    // Update achievement progress
    gameData.achievements[1].progress = Math.min(100, (stats.feedCount + stats.playCount + stats.cleanCount + stats.sleepCount) / 10 * 100);
    gameData.achievements[2].progress = Math.min(100, p.coins / 10);
    gameData.achievements[3].progress = Math.min(100, p.level / 5 * 100);
    gameData.achievements[4].progress = Math.min(100, stats.feedCount / 50 * 100);
    gameData.achievements[5].progress = Math.min(100, stats.minigamesPlayed / 10 * 100);
    
    // Unlock achievements
    if (stats.feedCount + stats.playCount + stats.cleanCount + stats.sleepCount >= 10) {
        unlockAchievement(1);
    }
    if (p.coins >= 1000) {
        unlockAchievement(2);
    }
    if (p.level >= 5) {
        unlockAchievement(3);
    }
    if (stats.feedCount >= 50) {
        unlockAchievement(4);
    }
    if (stats.minigamesPlayed >= 10) {
        unlockAchievement(5);
    }
}

// Unlock Achievement
function unlockAchievement(index) {
    const achievement = gameData.achievements[index];
    
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.progress = 100;
        showMessage(`🎉 Pencapaian terbuka: ${achievement.name}! +50 koin`);
        gameData.pet.coins += 50;
        updateAllDisplays();
    }
}

// Pet Actions
function feedPet() {
    const p = gameData.pet;
    
    if (p.hunger >= 95) {
        showMessage(`${p.name} sudah sangat kenyang!`);
        return;
    }
    
    p.hunger = Math.min(100, p.hunger + 10);
    p.energy = Math.max(0, p.energy - 3);
    p.happiness = Math.min(100, p.happiness + 5);
    
    gameData.stats.feedCount++;
    playSound(elements.soundEat);
    showMessage(`${p.name} sudah makan!`);
    addXP(8);
    updateAllDisplays();
    checkAchievements();
    animatePet('jump');
}

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
    animatePet('jump');
}

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
    animatePet('jump');
}

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
    animatePet('shake');
}

function healPet() {
    const p = gameData.pet;
    
    if (p.health >= 95) {
        showMessage(`${p.name} sudah sehat!`);
        return;
    }
    
    // Check if has medicine in inventory
    const medicine = gameData.inventory.items.find(item => item.id === 101);
    if (medicine && medicine.count > 0) {
        medicine.count--;
        p.health = Math.min(100, p.health + 30);
        p.happiness = Math.min(100, p.happiness + 10);
        
        gameData.stats.healCount++;
        playSound(elements.soundEat);
        showMessage(`${p.name} sudah minum obat, merasa lebih baik!`);
        addXP(15);
    } else {
        // Basic healing without medicine
        p.health = Math.min(100, p.health + 10);
        p.energy = Math.max(0, p.energy - 5);
        
        gameData.stats.healCount++;
        showMessage(`${p.name} sudah beristirahat, merasa lebih baik!`);
        addXP(5);
    }
    
    updateAllDisplays();
    checkAchievements();
    animatePet('jump');
}

function trainPet() {
    const p = gameData.pet;
    
    if (p.energy < 30) {
        showMessage(`${p.name} terlalu lelah untuk latihan!`);
        return;
    }
    
    p.happiness = Math.min(100, p.happiness + 5);
    p.energy = Math.max(0, p.energy - 20);
    p.hunger = Math.max(0, p.hunger - 15);
    p.health = Math.max(0, p.health - 5);
    
    // Training gives more XP
    gameData.stats.trainCount++;
    playSound(elements.soundPlay);
    showMessage(`${p.name} sudah latihan, jadi lebih kuat!`);
    addXP(20);
    updateAllDisplays();
    checkAchievements();
    animatePet('jump');
}

// Animate Pet
function animatePet(animation) {
    const pet = elements.pet;
    pet.classList.remove('jump', 'shake');
    void pet.offsetWidth; // Trigger reflow
    pet.classList.add(animation);
    
    setTimeout(() => {
        pet.classList.remove(animation);
    }, 500);
}

// Use Item from Inventory
function useItem(itemId, type) {
    let itemArray;
    switch(type) {
        case 'food': itemArray = gameData.inventory.food; break;
        case 'items': itemArray = gameData.inventory.items; break;
        case 'special': itemArray = gameData.inventory.special; break;
        default: return;
    }
    
    const item = itemArray.find(i => i.id === itemId);
    const p = gameData.pet;
    
    if (!item || item.count <= 0) {
        showMessage("Item tidak tersedia!");
        return;
    }
    
    item.count--;
    
    // Apply item effects
    if (item.hunger) p.hunger = Math.min(100, p.hunger + item.hunger);
    if (item.happiness) p.happiness = Math.min(100, p.happiness + item.happiness);
    if (item.energy) p.energy = Math.max(0, Math.min(100, p.energy + item.energy));
    if (item.health) p.health = Math.min(100, p.health + item.health);
    if (item.cleanliness) p.cleanliness = Math.min(100, p.cleanliness + item.cleanliness);
    
    playSound(elements.soundEat);
    showMessage(`${p.name} menggunakan ${item.icon} ${item.name}!`);
    addXP(10);
    gameData.stats.feedCount++;
    updateAllDisplays();
    checkAchievements();
    animatePet('jump');
}

// Buy Item from Shop
function buyItem(itemId, tab) {
    const items = gameData.shopItems[tab];
    if (!items) return;
    
    const shopItem = items.find(i => i.id === itemId);
    const p = gameData.pet;
    
    if (!shopItem) return;
    
    if (p.coins < shopItem.price) {
        showMessage("Koin tidak cukup!");
        return;
    }
    
    // Deduct coins
    p.coins -= shopItem.price;
    gameData.stats.totalCoinsEarned -= shopItem.price;
    
    // Add to inventory based on tab
    let inventoryArray;
    switch(tab) {
        case 'food': inventoryArray = gameData.inventory.food; break;
        case 'items': inventoryArray = gameData.inventory.items; break;
        case 'cosmetics': inventoryArray = gameData.inventory.special; break;
        default: 
            // Upgrades are applied immediately
            showMessage(`Upgrade ${shopItem.name} diaktifkan!`);
            playSound(elements.soundBuy);
            updateAllDisplays();
            return;
    }
    
    const inventoryItem = inventoryArray.find(i => i.id === itemId);
    if (inventoryItem) {
        inventoryItem.count++;
    } else {
        // Create new item
        const newItem = {
            id: shopItem.id,
            name: shopItem.name,
            icon: shopItem.icon,
            count: 1
        };
        // Copy effects
        if (shopItem.hunger) newItem.hunger = shopItem.hunger;
        if (shopItem.happiness) newItem.happiness = shopItem.happiness;
        if (shopItem.energy) newItem.energy = shopItem.energy;
        if (shopItem.health) newItem.health = shopItem.health;
        if (shopItem.cleanliness) newItem.cleanliness = shopItem.cleanliness;
        
        inventoryArray.push(newItem);
    }
    
    playSound(elements.soundBuy);
    showMessage(`Berhasil membeli ${shopItem.icon} ${shopItem.name}!`);
    updateAllDisplays();
}

// Degrade Stats Over Time
function degradeStats() {
    const p = gameData.pet;
    const now = Date.now();
    const timePassed = Math.floor((now - gameData.pet.lastPlayTime) / 60000); // in minutes
    
    if (timePassed > 0) {
        // Degrade stats based on time passed
        p.hunger = Math.max(0, p.hunger - timePassed * 2);
        p.happiness = Math.max(0, p.happiness - timePassed);
        p.cleanliness = Math.max(0, p.cleanliness - timePassed * 1.5);
        p.energy = Math.max(0, p.energy - timePassed);
        p.health = Math.max(0, p.health - timePassed * 0.5);
        
        // Auto actions if stats are critical
        if (p.energy < 10 && Math.random() > 0.5) {
            p.energy = Math.min(100, p.energy + 20);
            showMessage(`${p.name} tertidur karena kelelahan...`);
        }
        
        if (p.health < 30 && Math.random() > 0.7) {
            p.health = Math.min(100, p.health + 10);
            showMessage(`${p.name} merasa lebih baik setelah istirahat...`);
        }
        
        gameData.pet.lastPlayTime = now;
        updateAllDisplays();
    }
}

// Save Game State
function saveGameState() {
    const gameState = {
        pet: gameData.pet,
        inventory: gameData.inventory,
        stats: gameData.stats,
        achievements: gameData.achievements,
        settings: gameData.settings,
        timestamp: Date.now()
    };
    
    localStorage.setItem('virtualPetGameState', JSON.stringify(gameState));
    showMessage("Game berhasil disimpan!");
}

// Load Game State
function loadGameState() {
    const saved = localStorage.getItem('virtualPetGameState');
    
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            
            // Merge saved state with current game data
            Object.assign(gameData.pet, savedState.pet);
            Object.assign(gameData.inventory, savedState.inventory);
            Object.assign(gameData.stats, savedState.stats);
            Object.assign(gameData.achievements, savedState.achievements);
            Object.assign(gameData.settings, savedState.settings);
            
            // Update last play time
            if (savedState.timestamp) {
                const timePassed = Math.floor((Date.now() - savedState.timestamp) / 1000);
                gameData.stats.totalPlayTime += timePassed;
            }
            
            showMessage("Game berhasil dimuat!");
        } catch (e) {
            console.log("Error loading game:", e);
            showMessage("Memulai game baru...");
        }
    }
}

// Reset Game
function resetGame() {
    if (confirm("Apakah Anda yakin ingin mereset game? Semua progres akan hilang!")) {
        localStorage.removeItem('virtualPetGameState');
        
        // Reset to initial state
        gameData.pet = {
            name: "Petty",
            hunger: 75,
            happiness: 85,
            energy: 60,
            cleanliness: 80,
            health: 90,
            xp: 150,
            level: 1,
            xpNeeded: 200,
            coins: 500,
            age: 1,
            status: "Bahagia dan sehat!",
            mood: "😊",
            lastPlayTime: Date.now()
        };
        
        gameData.stats = {
            feedCount: 0,
            playCount: 0,
            cleanCount: 0,
            sleepCount: 0,
            healCount: 0,
            trainCount: 0,
            minigamesPlayed: 0,
            totalCoinsEarned: 500,
            totalPlayTime: 0,
            lastSave: Date.now()
        };
        
        gameData.achievements.forEach((achievement, index) => {
            achievement.unlocked = index === 0;
            achievement.progress = index === 0 ? 100 : 0;
        });
        
        updateAllDisplays();
        showMessage("Game berhasil direset!");
    }
}

// Game Loop
function startGameLoop() {
    // Update game time every second
    setInterval(() => {
        const now = new Date();
        elements.gameTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Degrade stats every 2 minutes
        if (now.getSeconds() === 0 && now.getMinutes() % 2 === 0) {
            degradeStats();
        }
        
        // Auto-save every 5 minutes
        if (now.getMinutes() % 5 === 0 && now.getSeconds() === 0) {
            saveGameState();
        }
    }, 1000);
}

// Mini Game Functions
function startMiniGame(gameType) {
    gameData.currentMinigame = gameType;
    gameData.gameActive = false;
    gameData.gameTimeLeft = 0;
    gameData.gameScore = 0;
    gameData.gameCoins = 0;
    
    // Set game parameters based on type
    let title = '', time = 0, target = 0;
    switch(gameType) {
        case 'coin-catch':
            title = 'Tangkap Koin';
            time = 60;
            target = 20;
            break;
        case 'memory':
            title = 'Game Memori';
            time = 0; // No time limit
            target = 8;
            break;
        case 'feed-fast':
            title = 'Makan Cepat';
            time = 45;
            target = 15;
            break;
        case 'clean-up':
            title = 'Bersih-bersih';
            time = 30;
            target = 20;
            break;
    }
    
    elements.gameTitle.textContent = title;
    elements.gameTimeDisplay.textContent = time;
    elements.gameTargetDisplay.textContent = target;
    elements.gameScoreDisplay.textContent = '0';
    elements.gameCoinsDisplay.textContent = '0';
    
    // Clear game area
    elements.gameArea.innerHTML = '';
    elements.gameArea.className = 'game-area';
    elements.gameArea.classList.add(`${gameType}-game`);
    
    // Show game play modal
    elements.minigamePlayModal.classList.add('show');
    elements.minigameModal.classList.remove('show');
    
    // Setup game area
    setupMiniGame(gameType);
}

function setupMiniGame(gameType) {
    switch(gameType) {
        case 'coin-catch':
            setupCoinCatchGame();
            break;
        case 'memory':
            setupMemoryGame();
            break;
        case 'feed-fast':
            setupFeedFastGame();
            break;
        case 'clean-up':
            setupCleanUpGame();
            break;
    }
}

function setupCoinCatchGame() {
    // Game will create coins when started
}

function setupMemoryGame() {
    const symbols = ['🍎', '🐟', '🥕', '🥛', '🍰', '🎮', '🏀', '🎨'];
    const cards = [...symbols, ...symbols]; // Create pairs
    
    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);
    
    // Create memory grid
    const grid = document.createElement('div');
    grid.className = 'memory-grid';
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = '?';
        card.addEventListener('click', () => flipMemoryCard(card));
        grid.appendChild(card);
    });
    
    elements.gameArea.appendChild(grid);
}

let memoryFlippedCards = [];
let memoryMatchedCards = [];

function flipMemoryCard(card) {
    if (!gameData.gameActive || memoryFlippedCards.length >= 2 || card.classList.contains('flipped') || memoryMatchedCards.includes(card.dataset.index)) {
        return;
    }
    
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    memoryFlippedCards.push(card);
    
    if (memoryFlippedCards.length === 2) {
        setTimeout(checkMemoryMatch, 500);
    }
}

function checkMemoryMatch() {
    const [card1, card2] = memoryFlippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Match found
        memoryMatchedCards.push(card1.dataset.index, card2.dataset.index);
        gameData.gameScore += 1;
        gameData.gameCoins += 30;
        updateGameDisplay();
        
        if (memoryMatchedCards.length === 16) {
            endMiniGame(true);
        }
    } else {
        // No match
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '?';
        card2.textContent = '?';
    }
    
    memoryFlippedCards = [];
}

function setupFeedFastGame() {
    // Game will create food items when started
}

function setupCleanUpGame() {
    // Create dirt spots
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            if (gameData.gameActive) {
                createDirtSpot();
            }
        }, i * 500);
    }
}

function createDirtSpot() {
    const dirt = document.createElement('div');
    dirt.className = 'dirt';
    dirt.textContent = '💩';
    dirt.style.left = `${Math.random() * 90}%`;
    dirt.style.top = `${Math.random() * 80}%`;
    
    dirt.addEventListener('click', () => {
        if (gameData.gameActive) {
            dirt.remove();
            gameData.gameScore += 1;
            gameData.gameCoins += 10;
            updateGameDisplay();
            
            // Check if all dirt is cleaned
            if (document.querySelectorAll('.dirt').length === 0) {
                // Create more dirt
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        if (gameData.gameActive) {
                            createDirtSpot();
                        }
                    }, i * 300);
                }
            }
        }
    });
    
    elements.gameArea.appendChild(dirt);
}

function startActiveMiniGame() {
    if (gameData.gameActive) return;
    
    gameData.gameActive = true;
    gameData.stats.minigamesPlayed++;
    playSound(elements.soundGameStart);
    
    switch(gameData.currentMinigame) {
        case 'coin-catch':
            startCoinCatchGame();
            break;
        case 'memory':
            startMemoryGame();
            break;
        case 'feed-fast':
            startFeedFastGame();
            break;
        case 'clean-up':
            startCleanUpGame();
            break;
    }
    
    // Start game timer if applicable
    if (parseInt(elements.gameTimeDisplay.textContent) > 0) {
        startGameTimer();
    }
}

function startCoinCatchGame() {
    // Create coins periodically
    const coinInterval = setInterval(() => {
        if (!gameData.gameActive) {
            clearInterval(coinInterval);
            return;
        }
        
        createCoin();
    }, 800);
}

function createCoin() {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.textContent = '🪙';
    coin.style.left = `${Math.random() * 90}%`;
    coin.style.top = '-60px';
    
    coin.addEventListener('click', () => {
        if (gameData.gameActive) {
            coin.remove();
            gameData.gameScore += 1;
            gameData.gameCoins += 5;
            updateGameDisplay();
            playSound(elements.soundCoin);
            
            // Check win condition
            if (gameData.gameScore >= parseInt(elements.gameTargetDisplay.textContent)) {
                endMiniGame(true);
            }
        }
    });
    
    elements.gameArea.appendChild(coin);
    
    // Animate coin falling
    let top = -60;
    const fallInterval = setInterval(() => {
        if (!gameData.gameActive) {
            clearInterval(fallInterval);
            coin.remove();
            return;
        }
        
        top += 5;
        coin.style.top = `${top}px`;
        
        if (top >= 400) {
            clearInterval(fallInterval);
            coin.remove();
        }
    }, 50);
}

function startMemoryGame() {
    // Memory game doesn't need special start setup
}

function startFeedFastGame() {
    // Create food items periodically
    const foodInterval = setInterval(() => {
        if (!gameData.gameActive) {
            clearInterval(foodInterval);
            return;
        }
        
        createFoodItem();
    }, 1000);
}

function createFoodItem() {
    const foods = ['🍎', '🍗', '🥕', '🍌', '🍇'];
    const food = document.createElement('div');
    food.className = 'food-item';
    food.textContent = foods[Math.floor(Math.random() * foods.length)];
    food.style.left = `${Math.random() * 90}%`;
    food.style.top = `${Math.random() * 80}%`;
    
    food.addEventListener('click', () => {
        if (gameData.gameActive) {
            food.remove();
            gameData.gameScore += 1;
            gameData.gameCoins += 20;
            updateGameDisplay();
            playSound(elements.soundEat);
            
            // Check win condition
            if (gameData.gameScore >= parseInt(elements.gameTargetDisplay.textContent)) {
                endMiniGame(true);
            }
        }
    });
    
    elements.gameArea.appendChild(food);
    
    // Remove food after 3 seconds
    setTimeout(() => {
        if (food.parentNode) {
            food.remove();
        }
    }, 3000);
}

function startCleanUpGame() {
    // Clean up game is already set up
}

function startGameTimer() {
    gameData.gameTimeLeft = parseInt(elements.gameTimeDisplay.textContent);
    
    gameData.gameInterval = setInterval(() => {
        if (!gameData.gameActive) return;
        
        gameData.gameTimeLeft--;
        elements.gameTimeDisplay.textContent = gameData.gameTimeLeft;
        
        if (gameData.gameTimeLeft <= 0) {
            endMiniGame(gameData.gameScore >= parseInt(elements.gameTargetDisplay.textContent));
        }
    }, 1000);
}

function updateGameDisplay() {
    elements.gameScoreDisplay.textContent = gameData.gameScore;
    elements.gameCoinsDisplay.textContent = gameData.gameCoins;
}

function pauseMiniGame() {
    gameData.gameActive = !gameData.gameActive;
    elements.pauseGameBtn.textContent = gameData.gameActive ? 'Jeda' : 'Lanjut';
    
    if (gameData.gameActive) {
        playSound(elements.soundGameStart);
    }
}

function restartMiniGame() {
    endMiniGame(false);
    startMiniGame(gameData.currentMinigame);
    setTimeout(() => {
        startActiveMiniGame();
    }, 500);
}

function endMiniGame(won) {
    gameData.gameActive = false;
    clearInterval(gameData.gameInterval);
    
    if (won) {
        playSound(elements.soundGameWin);
        showMessage(`🎉 Menang! +${gameData.gameCoins} koin!`);
        gameData.pet.coins += gameData.gameCoins;
        gameData.stats.totalCoinsEarned += gameData.gameCoins;
        gameData.pet.happiness = Math.min(100, gameData.pet.happiness + 10);
    } else {
        playSound(elements.soundGameLose);
        showMessage("Coba lagi! Kamu bisa melakukannya!");
        gameData.pet.coins += Math.floor(gameData.gameCoins / 2);
        gameData.stats.totalCoinsEarned += Math.floor(gameData.gameCoins / 2);
    }
    
    updateAllDisplays();
    
    // Close game modal after delay
    setTimeout(() => {
        elements.minigamePlayModal.classList.remove('show');
    }, 2000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.sidebar.classList.toggle('show');
    });
    
    // Change pet name
    elements.changeNameBtn.addEventListener('click', () => {
        const newName = elements.petNameInput.value.trim();
        if (newName && newName.length <= 12) {
            gameData.pet.name = newName;
            showMessage(`Nama berhasil diubah menjadi ${newName}!`);
            updateAllDisplays();
        }
    });
    
    // Action buttons
    elements.feedBtn.addEventListener('click', feedPet);
    elements.playBtn.addEventListener('click', playWithPet);
    elements.cleanBtn.addEventListener('click', cleanPet);
    elements.sleepBtn.addEventListener('click', putPetToSleep);
    elements.healBtn.addEventListener('click', healPet);
    elements.trainBtn.addEventListener('click', trainPet);
    
    // Extra buttons
    elements.shopBtn.addEventListener('click', () => {
        elements.shopModal.classList.add('show');
        updateShopDisplay();
    });
    
    elements.inventoryBtn.addEventListener('click', () => {
        // Switch to inventory tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.tab-btn[data-tab="food"]').classList.add('active');
        document.querySelectorAll('.inventory-tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById('tab-food').classList.add('active');
    });
    
    elements.saveBtn.addEventListener('click', saveGameState);
    elements.minigameBtn.addEventListener('click', () => {
        elements.minigameModal.classList.add('show');
    });
    
    // Inventory tabs
    elements.inventoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update active tab
            elements.inventoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.inventory-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
    
    // Settings toggles
    elements.soundToggle.addEventListener('change', (e) => {
        gameData.settings.sound = e.target.checked;
    });
    
    elements.musicToggle.addEventListener('change', (e) => {
        gameData.settings.music = e.target.checked;
        toggleBackgroundMusic(e.target.checked);
    });
    
    elements.notifToggle.addEventListener('change', (e) => {
        gameData.settings.notifications = e.target.checked;
    });
    
    // Modal close buttons
    elements.closeShop.addEventListener('click', () => {
        elements.shopModal.classList.remove('show');
    });
    
    elements.closeMinigame.addEventListener('click', () => {
        elements.minigameModal.classList.remove('show');
    });
    
    elements.closeGame.addEventListener('click', () => {
        elements.minigamePlayModal.classList.remove('show');
        gameData.gameActive = false;
        clearInterval(gameData.gameInterval);
    });
    
    elements.closeHelp.addEventListener('click', () => {
        elements.helpModal.classList.remove('show');
    });
    
    // Shop tabs
    elements.shopTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const shopTab = tab.dataset.shop;
            
            // Update active tab
            elements.shopTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(`shop-${shopTab}`).classList.add('active');
        });
    });
    
    // Mini game selection
    elements.minigameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameType = card.dataset.game;
            startMiniGame(gameType);
        });
    });
    
    // Game controls
    elements.startGameBtn.addEventListener('click', startActiveMiniGame);
    elements.pauseGameBtn.addEventListener('click', pauseMiniGame);
    elements.restartGameBtn.addEventListener('click', restartMiniGame);
    
    // Footer buttons
    elements.helpBtn.addEventListener('click', () => {
        elements.helpModal.classList.add('show');
    });
    
    elements.aboutBtn.addEventListener('click', () => {
        showMessage("Virtual Pet Game v2.0 © 2024 - Dibuat dengan HTML, CSS, dan JavaScript", 5000);
    });
    
    elements.resetBtn.addEventListener('click', resetGame);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('show');
            });
            gameData.gameActive = false;
            clearInterval(gameData.gameInterval);
        }
    });
    
    // Handle inventory item clicks (delegated)
    document.addEventListener('click', (e) => {
        // Use buttons in inventory
        if (e.target.classList.contains('use-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            const itemType = e.target.dataset.type;
            useItem(itemId, itemType);
        }
        
        // Buy buttons in shop
        if (e.target.classList.contains('buy-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            const itemTab = e.target.dataset.tab;
            buyItem(itemId, itemTab);
        }
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            elements.sidebar.classList.remove('show');
        }
    });
    
    // Handle beforeunload to save game
    window.addEventListener('beforeunload', saveGameState);
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    });
}
