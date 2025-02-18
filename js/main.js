import { setupScene } from './sceneSetup.js';
import { loadResources } from './resourceManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('opening-video');
    const loading = document.getElementById('loading');
    
    // 开始播放开场视频
    try {
        await video.play();
        
        // 视频播放时开始加载资源
        const sceneContainer = setupScene();
        await loadResources(sceneContainer);
        
        // 监听视频结束
        video.addEventListener('ended', () => {
            // 添加淡出动画
            video.classList.add('fade-out');
            loading.classList.add('fade-out');
            
            // 动画结束后移除元素
            setTimeout(() => {
                video.style.display = 'none';
                loading.style.display = 'none';
                // 显示主场景
                sceneContainer.style.opacity = '1';
            }, 1000);
        });
    } catch (error) {
        console.error('视频播放失败:', error);
        // 如果视频播放失败，直接加载主场景
        const sceneContainer = setupScene();
        await loadResources(sceneContainer);
    }
}); 