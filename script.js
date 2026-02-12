// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const mainContainer = document.getElementById('mainContainer');

// Function to get random position for "No" button
function getRandomPosition() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Calculate available space
    const maxX = window.innerWidth - buttonRect.width - 20;
    const maxY = window.innerHeight - buttonRect.height - 20;
    const minX = 20;
    const minY = 20;
    
    // Generate random position
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;
    
    return {
        x: randomX,
        y: randomY
    };
}

// Function to move "No" button to random position
function moveNoButton() {
    const position = getRandomPosition();
    noBtn.style.position = 'fixed';
    noBtn.style.left = position.x + 'px';
    noBtn.style.top = position.y + 'px';
    noBtn.style.transform = 'scale(0.9)';
    
    // Reset transform after animation
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 200);
}

// Event listeners for "No" button
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Prevent "No" button from being clicked by making it move on touch
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Celebration on "Yes" button click
yesBtn.addEventListener('click', () => {
    // Hide main container
    mainContainer.style.opacity = '0';
    mainContainer.style.transform = 'scale(0.8)';
    mainContainer.style.transition = 'all 0.5s ease';
    
    // Show celebration after a short delay
    setTimeout(() => {
        mainContainer.style.display = 'none';
        celebration.classList.add('show');
        
        // Create confetti effect
        createConfetti();
    }, 300);
});

// Function to create confetti/hearts effect
function createConfetti() {
    const confettiCount = 50;
    const hearts = ['💖', '💕', '💗', '💝', '❤️', '💓', '💞'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.style.opacity = '0.8';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '101';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

