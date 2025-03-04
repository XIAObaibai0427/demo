document.addEventListener('DOMContentLoaded', () => {
    // 背景音乐控制
    const bgMusic = document.getElementById('bgMusic');
    let isMusicPlaying = false;

    // 添加音乐控制按钮
    const musicBtn = document.createElement('div');
    musicBtn.className = 'music-btn';
    const musicImg = document.createElement('img');
    musicImg.src = 'images/music.png';
    musicBtn.appendChild(musicImg);
    document.body.appendChild(musicBtn);

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(error => {
                console.log("音频播放失败:", error);
            });
            musicBtn.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 添加点击音效
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });

    function playHoverSound() {
        const hoverSound = new Audio('audio/hover.mp3');
        hoverSound.volume = 0.2;
        hoverSound.play().catch(error => {
            console.log("音效播放失败:", error);
        });
    }

    // 返回按钮功能
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    // 页面切换动画
    document.querySelectorAll('.start-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = btn.getAttribute('href');
            
            document.body.style.opacity = 0;
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});