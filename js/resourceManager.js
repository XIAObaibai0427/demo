export async function loadResources(container) {
    const poets = [
        {
            name: '范成大',
            image: './assets/images/fan.png',
            position: { left: '25%', top: '50%' },
            audioId: 'fan-audio'
        },
        {
            name: '杨万里',
            image: './assets/images/yang.png',
            position: { left: '50%', top: '40%' },
            audioId: 'yang-audio'
        },
        {
            name: '雷震',
            image: './assets/images/lei.png',
            position: { left: '75%', top: '50%' },
            audioId: 'lei-audio'
        }
    ];

    let loadedCount = 0;
    const totalResources = poets.length + 3; // 图片 + 音频

    function updateProgress() {
        loadedCount++;
        document.getElementById('progress').style.width = 
            `${(loadedCount/totalResources)*100}%`;
        
        if (loadedCount === totalResources) {
            document.getElementById('loading').style.display = 'none';
        }
    }

    // 加载图片
    poets.forEach(poet => {
        const img = new Image();
        img.src = poet.image;
        img.className = 'poet-image';
        img.alt = poet.name;
        img.style.left = poet.position.left;
        img.style.top = poet.position.top;
        img.style.transform = 'translate(-50%, -50%)';
        
        img.addEventListener('load', updateProgress);
        
        img.addEventListener('click', () => {
            // 停止所有音频
            document.querySelectorAll('audio').forEach(audio => audio.pause());
            
            // 播放对应音频
            const audio = document.getElementById(poet.audioId);
            audio.play();
            
            // 添加点击动画
            img.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                img.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
        
        container.appendChild(img);
    });

    // 加载音频
    document.querySelectorAll('audio').forEach(audio => {
        audio.addEventListener('loadeddata', updateProgress);
    });
} 