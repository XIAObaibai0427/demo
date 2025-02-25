class Game {
    constructor() {
        // 初始化基本属性
        this.score = 0;
        this.netSlots = [];
        this.seaWords = [];
        this.completedPoems = new Set();
        this.isGameStarted = false;
        this.startTime = 0; // 记录开始时间
        this.timeElapsed = 0; // 记录已用时间

        // 获取DOM元素
        this.introModal = document.getElementById('gameIntro');
        this.gameOverModal = document.getElementById('gameOver');
        this.poemDisplay = document.querySelector('.poem-display');

        // 初始化显示状态
        this.introModal.style.display = 'flex';
        this.gameOverModal.style.display = 'none';
        this.poemDisplay.classList.add('hidden');

        // 显示游戏说明
        this.showGameIntro();
    }

    showGameIntro() {
        const introModal = this.introModal;
        const countdownEl = introModal.querySelector('.countdown');
        const startBtn = introModal.querySelector('.start-btn');
        const skipBtn = introModal.querySelector('.skip-btn');
        let seconds = 60;
        let timer;

        // 显示说明弹窗
        introModal.style.display = 'flex';

        // 倒计时
        timer = setInterval(() => {
            seconds--;
            countdownEl.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(timer);
                countdownEl.style.display = 'none';
                startBtn.style.display = 'block';
                skipBtn.style.display = 'none';
            }
        }, 1000);

        // 跳过按钮点击事件
        skipBtn.onclick = () => {
            clearInterval(timer);
            this.startGame();
        };

        // 开始按钮点击事件
        startBtn.onclick = () => {
            this.startGame();
        };
    }

    startGame() {
        this.introModal.style.display = 'none';
        this.isGameStarted = true;
        this.startTime = Date.now(); // 记录开始时间
        this.startTimer(); // 开始计时
        this.init();
    }

    startTimer() {
        // 创建或更新计时器显示
        if (!document.getElementById('timer')) {
            const timerDiv = document.createElement('div');
            timerDiv.id = 'timer';
            timerDiv.className = 'timer';
            document.querySelector('.game-header').appendChild(timerDiv);
        }

        // 每秒更新时间
        this.timer = setInterval(() => {
            this.timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.timeElapsed / 60);
        const seconds = this.timeElapsed % 60;
        const timerDisplay = `用时：${minutes}分${seconds}秒`;
        document.getElementById('timer').textContent = timerDisplay;
    }

    init() {
        if (!this.isGameStarted) return;
        
        this.seaArea = document.getElementById('seaArea');
        this.netSlots = Array.from(document.querySelectorAll('.net-slot'));
        this.updateScore(0);
        this.generateWords();
        this.setupEventListeners();
        this.startDayNightCycle();
    }

    generateWords() {
        this.seaArea.innerHTML = '';
        this.seaWords = [];

        // 获取所有诗词的词语
        let allWords = [];
        for (const poem of Object.values(POEMS)) {
            poem.lines.forEach(line => {
                allWords = allWords.concat(line.fragments);
            });
        }

        // 打乱顺序并创建词语元素
        Utils.shuffle(allWords).forEach((word) => {
            const wordElement = Utils.createWordElement(word);
            
            // 先添加到容器以获取实际大小
            this.seaArea.appendChild(wordElement);
            
            // 获取合适的位置
            const pos = Utils.randomPosition(this.seaArea, wordElement);
            
            // 设置位置
            wordElement.style.position = 'absolute';
            wordElement.style.left = pos.x + 'px';
            wordElement.style.top = pos.y + 'px';
            
            this.seaWords.push(wordElement);
        });
    }

    setupEventListeners() {
        this.seaArea.addEventListener('click', (e) => {
            const wordElement = e.target.closest('.word');
            if (wordElement) {
                this.collectWord(wordElement);
            }
        });
    }

    collectWord(wordElement) {
        const emptySlot = this.netSlots.find(
            slot => !slot.hasChildNodes()
        );

        if (emptySlot) {
            // 移除原有的定位样式
            wordElement.style.position = '';
            wordElement.style.left = '';
            wordElement.style.top = '';
            
            // 从海域移除并添加到网兜
            wordElement.remove();
            emptySlot.appendChild(wordElement);

            Utils.playSound('correctSound');
            this.validateSlots();
        }
    }

    validateSlots() {
        // 获取当前网兜中的词语
        const fragments = this.netSlots.map(slot => 
            slot.firstChild ? slot.firstChild.textContent : null
        ).filter(text => text !== null);

        // 如果不足三个词语，继续收集
        if (fragments.length < 3) {
            return;
        }

        // 检查是否有三个词语可以组成诗句
        const result = this.checkAnyThreeFragments(fragments);

        if (result) {
            this.handleSuccess(result);
            // 在成功匹配后检查是否所有词语都已用完
            this.checkGameCompletion();
        } else if (fragments.length === 5) {
            // 只有在五个网兜都填满且无法组成诗句时才判定失败
            this.handleFailure();
        }
    }

    checkGameCompletion() {
        // 检查海域中是否还有词语
        const remainingWords = this.seaArea.querySelectorAll('.word');
        // 检查网兜中是否还有词语
        const wordsInNet = this.netSlots.some(slot => slot.firstChild);

        if (remainingWords.length === 0 && !wordsInNet) {
            // 如果海域和网兜中都没有词语了，游戏胜利
            this.completeGame();
        }
    }

    checkAnyThreeFragments(fragments) {
        // 获取所有可能的三个词语的组合
        for (let i = 0; i < fragments.length - 2; i++) {
            for (let j = i + 1; j < fragments.length - 1; j++) {
                for (let k = j + 1; k < fragments.length; k++) {
                    const threeFragments = [fragments[i], fragments[j], fragments[k]];
                    const result = Utils.checkPoemLine(threeFragments);
                    if (result) {
                        result.positions = [i, j, k];
                        return result;
                    }
                }
            }
        }
        return null;
    }

    handleSuccess(result) {
        Utils.playSound('completeSound');
        this.updateScore(this.score + 100);

        // 显示诗句和诗词介绍
        this.showPoemLine(result);

        // 检查是否完成整首诗
        const poemTitle = result.poem.title;
        if (!this.completedPoems.has(poemTitle)) {
            this.completedPoems.add(poemTitle);
            this.showPoemInfo(result.poem);
        }

        // 清除匹配的词语
        const filledSlots = this.netSlots.filter(slot => slot.firstChild);
        result.positions.forEach(pos => {
            if (filledSlots[pos] && filledSlots[pos].firstChild) {
                filledSlots[pos].firstChild.remove();
            }
        });
    }

    completeGame() {
        // 停止计时器
        clearInterval(this.timer);

        // 等待最后一首诗的展示完成后显示游戏胜利
        setTimeout(() => {
            this.isGameStarted = false;
            const gameOverModal = document.getElementById('gameOver');
            const modalContent = gameOverModal.querySelector('.modal-content');
            
            const minutes = Math.floor(this.timeElapsed / 60);
            const seconds = this.timeElapsed % 60;
            
            // 修改结束画面内容
            modalContent.innerHTML = `
                <h2>妙手偶得，金章速成！</h2>
                <p>恭喜你完成了所有诗词！</p>
                <p>总用时：${minutes}分${seconds}秒</p>
                <p>最终得分：<span id="finalScore">${this.score}</span></p>
                <button onclick="game.restart()">再来一局</button>
            `;
            
            gameOverModal.style.display = 'flex';
            Utils.playSound('completeSound');
        }, 3000);
    }

    showPoemLine(result) {
        const display = document.querySelector('.poem-display');
        display.classList.remove('hidden');
        display.querySelector('.poem-content').innerHTML = `
            <h3>${result.poem.title}</h3>
            <p>${result.line.text}</p>
            <small>${result.poem.author}</small>
        `;

        setTimeout(() => {
            display.classList.add('hidden');
        }, 3000);
    }

    showPoemInfo(poem) {
        const info = document.querySelector('.poem-info');
        info.textContent = POET_INFO[poem.author];
        info.classList.remove('hidden');
        
        setTimeout(() => {
            info.classList.add('hidden');
        }, 5000);
    }

    handleFailure() {
        if (!this.isGameStarted) return;
        Utils.playSound('wrongSound');
        this.gameOver();
    }

    gameOver() {
        if (!this.isGameStarted) return;
        
        this.isGameStarted = false;
        const gameOverModal = document.getElementById('gameOver');
        const modalContent = gameOverModal.querySelector('.modal-content');
        
        // 普通失败结束
        modalContent.innerHTML = `
            <h2>江郎才尽</h2>
            <p>最终得分：<span id="finalScore">${this.score}</span></p>
            <button onclick="game.restart()">重新开始</button>
        `;
        
        gameOverModal.style.display = 'flex';
    }

    updateScore(newScore) {
        this.score = newScore;
        document.getElementById('score').textContent = this.score;
    }

    startDayNightCycle() {
        let phase = 0;
        setInterval(() => {
            const body = document.body;
            switch(phase) {
                case 0: body.className = ''; break;
                case 1: body.className = 'evening'; break;
                case 2: body.className = 'night'; break;
            }
            phase = (phase + 1) % 3;
        }, 30000); // 每30秒切换一次
    }

    restart() {
        // 停止当前计时器
        clearInterval(this.timer);
        
        this.score = 0;
        this.completedPoems.clear();
        this.startTime = Date.now(); // 重置开始时间
        this.timeElapsed = 0; // 重置已用时间
        
        // 清理网兜
        this.netSlots.forEach(slot => {
            if (slot.firstChild) {
                slot.firstChild.remove();
            }
        });
        
        // 重置显示状态
        this.gameOverModal.style.display = 'none';
        this.isGameStarted = true;
        
        // 重新初始化游戏
        this.init();
        this.startTimer(); // 重新开始计时
    }
}

// 启动游戏
window.addEventListener('load', () => {
    window.game = new Game();
});