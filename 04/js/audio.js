class AudioManager {
    constructor() {
        this.bgm = document.getElementById('bgm');
        this.clickSound = document.getElementById('clickSound');
        
        // 设置音量
        this.bgm.volume = 0.3;
        this.clickSound.volume = 0.5;

        // 绑定音频循环
        this.bgm.addEventListener('ended', () => {
            this.bgm.currentTime = 0;
            this.bgm.play();
        });
    }

    playBGM() {
        // 尝试播放背景音乐
        const playPromise = this.bgm.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play was prevented:", error);
            });
        }
    }

    stopBGM() {
        this.bgm.pause();
        this.bgm.currentTime = 0;
    }

    playClick() {
        // 重置音效并播放
        this.clickSound.currentTime = 0;
        
        const playPromise = this.clickSound.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Click sound play was prevented:", error);
            });
        }
    }

    // 设置音量
    setVolume(type, value) {
        switch(type) {
            case 'bgm':
                this.bgm.volume = value;
                break;
            case 'effect':
                this.clickSound.volume = value;
                break;
        }
    }

    // 静音切换
    toggleMute(type) {
        switch(type) {
            case 'bgm':
                this.bgm.muted = !this.bgm.muted;
                break;
            case 'effect':
                this.clickSound.muted = !this.clickSound.muted;
                break;
        }
    }
}

const audioManager = new AudioManager();