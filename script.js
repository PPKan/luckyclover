let totalLeaves;
let currentLeaves;
let isFirstClick = true; // 新增變量來追踪是否為第一次點擊

function initGame() {
    totalLeaves = Math.floor(Math.random() * 5) + 3; // 3到7片葉子
    currentLeaves = totalLeaves;
    isFirstClick = true; // 重置第一次點擊狀態
    
    const clover = document.getElementById('clover');
    clover.innerHTML = '<div class="stem"></div>';
    
    const baseAngle = 360 / totalLeaves;
    const colors = ['#90EE90', '#5C9E5C']; // 兩種顏色
    
    for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        leaf.style.backgroundColor = colors[i % 2];
        leaf.style.setProperty('--before-color', colors[(i + 1) % 2]);
        
        const angle = baseAngle * i;
        leaf.style.transform = `rotate(${angle}deg)`;
        
        leaf.onclick = (event) => {
            event.stopPropagation();
            if (leaf.style.opacity !== '0') {
                pluckLeaf(leaf);
            }
        };
        clover.appendChild(leaf);
    }
    
    updateLoveStatus(); // 初始化時清空狀態文字
}

function pluckLeaf(leaf) {
    if (currentLeaves > 0) {
        leaf.style.transition = 'all 0.5s ease';
        leaf.style.opacity = '0';
        leaf.style.transform = leaf.style.transform + ' scale(0.8) rotate(20deg)';
        leaf.style.pointerEvents = 'none';
        currentLeaves--;
        
        updateLoveStatus(); // 更新狀態文字
        
        if (currentLeaves === 0) {
            setTimeout(() => {
                endGame();
            }, 500); // 延遲半秒顯示結果，讓最後一片葉子的動畫完成
        }
        
        isFirstClick = false; // 第一次點擊後設置為 false
    }
}

function updateLoveStatus() {
    const loveStatus = document.getElementById('love-status');
    if (currentLeaves === totalLeaves) {
        loveStatus.textContent = ''; // 遊戲開始時不顯示文字
    } else if (isFirstClick) {
        loveStatus.textContent = "她喜歡我";
    } else {
        loveStatus.textContent = (totalLeaves - currentLeaves) % 2 === 1 ? "她喜歡我" : "她不喜歡我";
    }
}

function randomPluck(event) {
    if (event.target.className !== 'leaf' && currentLeaves > 0) {
        const leaves = document.querySelectorAll('.leaf');
        const visibleLeaves = Array.from(leaves).filter(leaf => leaf.style.opacity !== '0');
        if (visibleLeaves.length > 0) {
            const randomIndex = Math.floor(Math.random() * visibleLeaves.length);
            pluckLeaf(visibleLeaves[randomIndex]);
        }
    }
}

function endGame() {
    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');
    
    if (totalLeaves % 2 === 0) {
        resultText.textContent = "可惜了";
    } else {
        resultText.textContent = "她喜歡你";
    }
    
    resultModal.style.display = 'block';
}

document.getElementById('restart').onclick = () => {
    initGame();
    document.getElementById('love-status').textContent = ''; // 重新開始時清空狀態文字
};

document.querySelector('.close').onclick = () => {
    document.getElementById('result-modal').style.display = 'none';
};

// 初始化遊戲
initGame();