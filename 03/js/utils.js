// 工具函数集合
const Utils = {
    // 随机打乱数组
    shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // 随机生成位置，考虑词语大小
    randomPosition(container, wordElement) {
        const padding = 20; // 边距
        const wordWidth = wordElement.offsetWidth || 80; // 预估词语宽度
        const wordHeight = wordElement.offsetHeight || 40; // 预估词语高度
        
        const maxX = container.clientWidth - wordWidth - padding * 2;
        const maxY = container.clientHeight - wordHeight - padding * 2;
        
        return {
            x: padding + Math.random() * maxX,
            y: padding + Math.random() * maxY
        };
    },

    // 检查是否构成完整诗句
    checkPoemLine(fragments) {
        for (const poem of Object.values(POEMS)) {
            for (const line of poem.lines) {
                if (fragments.length === 3 && 
                    this.isValidCombination(fragments, line.fragments)) {
                    return {
                        poem: poem,
                        line: line
                    };
                }
            }
        }
        return null;
    },

    // 检查词语组合是否有效
    isValidCombination(selected, target) {
        let targetIndex = 0;
        for (const fragment of target) {
            if (selected.includes(fragment)) {
                const selectedIndex = selected.indexOf(fragment);
                if (selectedIndex !== targetIndex) {
                    return false;
                }
                targetIndex++;
            }
        }
        return targetIndex === selected.length;
    },

    // 创建词语元素
    createWordElement(word) {
        const element = document.createElement('div');
        element.className = 'word ' + this.getRandomStyle();
        element.textContent = word;
        return element;
    },

    // 随机获取词语样式
    getRandomStyle() {
        const styles = ['shell', 'turtle', 'bamboo'];
        return styles[Math.floor(Math.random() * styles.length)];
    },

    // 播放音效
    playSound(id) {
        const sound = document.getElementById(id);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // 忽略可能的播放错误
        }
    }
};