export function setupInteraction(scene, camera, renderer, poets) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    window.addEventListener('click', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        if (intersects.length > 0) {
            const selected = intersects[0].object.parent;
            handlePoetClick(selected.name, poets);
        }
    });

    function handlePoetClick(name, poets) {
        // 停止所有音频
        document.querySelectorAll('audio').forEach(audio => audio.pause());
        
        // 触发对应动画和音频
        const audio = document.getElementById(`${name.toLowerCase().split(' ')[0]}-audio`);
        const poet = poets[name];
        
        gsap.to(poet.scale, { 
            x: 1.1, 
            y: 1.1, 
            z: 1.1, 
            duration: 0.3, 
            yoyo: true, 
            repeat: 1 
        });
        
        audio.play();
    }
} 