class Game {
    constructor() {
        this.currentQuestion = 0;
        this.isPlaying = false;
        this.usedQuestions = new Set();
        this.questionHistory = [];
        
        // 确保所有元素都正确获取
        this.startScreen = document.getElementById('start-screen');
        this.choiceScreen = document.getElementById('choice-screen');
        this.endingScreen = document.getElementById('ending-screen');
        this.progressBar = document.querySelector('.progress');
        this.questionCount = document.querySelector('.question-count');
        this.sceneBg = document.querySelector('.scene-bg');
        this.questionText = document.querySelector('.question-text');

        console.log('Game initialized');
        
        // 绑定事件
        this.bindEvents();
    }

    bindEvents() {
        const startButton = document.querySelector('.btn-start');
        const restartButton = document.querySelector('.btn-restart');
        const choices = document.querySelectorAll('.choice');

        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log('Start button clicked');
                this.start();
            });
        } else {
            console.error('Start button not found');
        }

        if (restartButton) {
            restartButton.addEventListener('click', () => this.restart());
        }

        choices.forEach(choice => {
            choice.addEventListener('click', (e) => this.makeChoice(e.currentTarget));
        });
    }

    start() {
        console.log('Game starting...');
        this.isPlaying = true;
        this.currentQuestion = 0;
        this.usedQuestions.clear();
        this.questionHistory = [];
        endingManager.reset();
        
        // 切换界面
        this.startScreen.style.display = 'none';
        this.choiceScreen.style.display = 'flex';
        
        // 播放背景音乐
        audioManager.playBGM();
        
        // 加载第一个问题
        this.loadQuestion();
    }

    getRandomQuestion() {
        // 过滤掉最近使用过的问题
        const recentQuestions = this.questionHistory.slice(
            -GAME_CONFIG.GAME_SETTINGS.minQuestionInterval
        );
        
        const availableQuestions = GAME_CONFIG.QUESTIONS.filter((_, index) => 
            !recentQuestions.includes(index)
        );

        if (availableQuestions.length === 0) {
            this.questionHistory = [];
            return GAME_CONFIG.QUESTIONS[
                Math.floor(Math.random() * GAME_CONFIG.QUESTIONS.length)
            ];
        }

        const question = availableQuestions[
            Math.floor(Math.random() * availableQuestions.length)
        ];
        
        this.questionHistory.push(GAME_CONFIG.QUESTIONS.indexOf(question));
        
        return question;
    }

    loadQuestion() {
        console.log('Loading question...');
        const question = this.getRandomQuestion();
        
        // 更新进度
        this.progressBar.style.width = 
            `${(this.currentQuestion + 1) / GAME_CONFIG.GAME_SETTINGS.questionsPerGame * 100}%`;
        this.questionCount.textContent = 
            `${this.currentQuestion + 1}/${GAME_CONFIG.GAME_SETTINGS.questionsPerGame}`;
        
        // 更新场景
        this.sceneBg.style.backgroundImage = `url(images/bg/${question.scene}.png)`;
        this.sceneBg.classList.add('scene-transition');
        
        // 更新问题和选项
        this.questionText.textContent = question.text;
        
        const choices = document.querySelectorAll('.choice');
        choices[0].querySelector('.choice-text').textContent = question.choices[0].text;
        choices[0].querySelector('.poem-text').textContent = question.choices[0].line;
        choices[0].dataset.poem = question.choices[0].poem;
        
        choices[1].querySelector('.choice-text').textContent = question.choices[1].text;
        choices[1].querySelector('.poem-text').textContent = question.choices[1].line;
        choices[1].dataset.poem = question.choices[1].poem;

        console.log('Question loaded:', question);
    }

    makeChoice(choiceElement) {
        if (!this.isPlaying) return;
        
        console.log('Choice made:', choiceElement.dataset.poem);
        
        // 播放音效
        audioManager.playClick();
        
        // 添加选中效果
        choiceElement.classList.add('selected');
        
        // 记录选择
        const poemKey = choiceElement.dataset.poem;
        endingManager.addChoice(poemKey);
        
        // 延迟后进入下一题或结束
        setTimeout(() => {
            choiceElement.classList.remove('selected');
            this.currentQuestion++;
            
            if (this.currentQuestion >= GAME_CONFIG.GAME_SETTINGS.questionsPerGame) {
                this.end();
            } else {
                this.loadQuestion();
            }
        }, GAME_CONFIG.GAME_SETTINGS.choiceDelay);
    }

    end() {
        console.log('Game ending...');
        this.isPlaying = false;
        this.choiceScreen.style.display = 'none';
        
        const finalPoem = this.determineEnding();
        endingManager.showEnding(finalPoem);
    }

    determineEnding() {
        const counts = endingManager.poemCounts;
        let maxCount = 0;
        let dominantPoems = [];

        // 找出选择次数最多的诗
        for (let poem in counts) {
            if (counts[poem] > maxCount) {
                maxCount = counts[poem];
                dominantPoems = [poem];
            } else if (counts[poem] === maxCount) {
                dominantPoems.push(poem);
            }
        }

        // 如果有多个最高分，根据优先级选择
        if (dominantPoems.length > 1) {
            const priorities = {
                FARM: 1,    // 归隐田园
                ICE: 2,     // 赤子童心
                VILLAGE: 3, // 逍遥散人
                BATTLE: 4,  // 铁血将军
                AUTUMN: 5,  // 忧国志士
                SPRING: 6   // 勤勉主事
            };
            
            dominantPoems.sort((a, b) => priorities[a] - priorities[b]);
            return dominantPoems[0];
        }

        return dominantPoems[0];
    }

    restart() {
        console.log('Restarting game...');
        // 隐藏结局屏幕
        this.endingScreen.style.display = 'none';
        
        // 重置游戏状态
        this.currentQuestion = 0;
        this.questionHistory = [];
        endingManager.reset();
        
        // 返回开始屏幕
        this.startScreen.style.display = 'flex';
    }
}

// 等待 DOM 加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    window.game = new Game();
});