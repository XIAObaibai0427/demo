export function setupScene() {
    const container = document.getElementById('scene-container');
    
    // 设置背景
    container.style.backgroundImage = 'url("./assets/backgrounds/background.png")';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    // 初始设置为透明
    container.style.opacity = '0';
    // 添加过渡效果
    container.style.transition = 'opacity 1s ease-in';
    
    return container;
} 