class EndingManager {
    constructor() {
        this.poemCounts = {
            FARM: 0,
            ICE: 0,
            VILLAGE: 0,
            BATTLE: 0,
            AUTUMN: 0,
            SPRING: 0
        };

        this.endingScreen = document.getElementById('ending-screen');
        this.endingImage = document.querySelector('.ending-image');
        this.endingTitle = document.querySelector('.ending-title');
        this.endingPoem = document.querySelector('.ending-poem');
        this.endingQuote = document.querySelector('.ending-quote');
    }

    addChoice(poemKey) {
        if (this.poemCounts.hasOwnProperty(poemKey)) {
            this.poemCounts[poemKey]++;
        }
    }

    showEnding(poemKey) {
        const poem = GAME_CONFIG.POEMS[poemKey];
        const ending = GAME_CONFIG.ENDINGS[poemKey];

        // 清除之前的动画类
        this.endingImage.classList.remove('ending-fade-in');
        this.endingTitle.classList.remove('fade-in');
        this.endingPoem.classList.remove('fade-in');
        this.endingQuote.classList.remove('fade-in');

        // 设置结局内容
        this.endingImage.style.backgroundImage = `url(images/endings/${ending.image})`;
        this.endingTitle.textContent = ending.title;
        this.endingPoem.innerHTML = `
            <div class="poem-title">${poem.title}</div>
            <div class="poem-author">${poem.author}</div>
            <div class="poem-content">${poem.content}</div>
            <div class="poem-background">${poem.background}</div>
        `;
        this.endingQuote.textContent = ending.quote;

        // 显示结局屏幕
        this.endingScreen.style.display = 'flex';

        // 添加动画效果
        requestAnimationFrame(() => {
            this.endingImage.classList.add('ending-fade-in');
            
            setTimeout(() => {
                this.endingTitle.classList.add('fade-in');
            }, 500);
            
            setTimeout(() => {
                this.endingPoem.classList.add('fade-in');
            }, 1000);
            
            setTimeout(() => {
                this.endingQuote.classList.add('fade-in');
            }, 1500);
        });

        // 播放结局音效
        audioManager.stopBGM();
        // 如果有结局音乐，可以在这里播放
    }

    reset() {
        // 重置所有计数
        for (let poem in this.poemCounts) {
            this.poemCounts[poem] = 0;
        }

        // 重置结局屏幕
        this.endingScreen.style.display = 'none';
        this.endingImage.classList.remove('ending-fade-in');
        this.endingTitle.classList.remove('fade-in');
        this.endingPoem.classList.remove('fade-in');
        this.endingQuote.classList.remove('fade-in');
    }

    // 用于调试的方法
    logCounts() {
        console.log('Current poem counts:', this.poemCounts);
    }
}

const endingManager = new EndingManager();