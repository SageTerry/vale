document.addEventListener('DOMContentLoaded', () => {
    const questionScreen = document.getElementById('question-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const restartBtn = document.getElementById('restart-btn');
    const backgroundHeartsContainer = document.getElementById('background-hearts');

    // Config values
    let noClickCount = 0;
    const phrases = ["Are you sure?", "Really?", "Think again!", "Last chance!", "Pretty please?", "Don't break my heart! 💔", "Pwease? 🥺"];

    // Background Hearts Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = Math.random() < 0.5 ? '💖' : '💕'; // Random heart style

        // Randomize position and animation properties
        const startLeft = Math.random() * 100;
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const size = Math.random() * 20 + 10; // 10px to 30px

        heart.style.left = `${startLeft}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}px`;

        backgroundHeartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Start background loops
    setInterval(createHeart, 500);


    // No Button Interaction
    noBtn.addEventListener('click', () => {
        noClickCount++;

        // Shrink No Button
        // Prevent it from disappearing completely but make it very small
        const currentScale = 1 - (noClickCount * 0.1);
        const limitedScale = Math.max(0.2, currentScale);
        noBtn.style.transform = `scale(${limitedScale})`;

        // Grow Yes Button
        const yesScale = 1 + (noClickCount * 0.4);
        yesBtn.style.transform = `scale(${yesScale})`;

        // Make Yes Animation Faster/More Noticeable
        const newDuration = Math.max(0.5, 2 - (noClickCount * 0.2));
        yesBtn.style.animationDuration = `${newDuration}s`;

        // Change Text (cycle through phrases)
        if (noClickCount <= phrases.length) {
            noBtn.innerText = phrases[noClickCount - 1] || "No 🙈";
        } else {
            noBtn.innerText = "Okay... 😢";
        }
    });

    // Yes Button Interaction
    yesBtn.addEventListener('click', () => {
        // Transition
        questionScreen.style.display = 'none';
        celebrationScreen.classList.remove('hidden');
        celebrationScreen.classList.add('fade-in');

        // Start Confetti
        startConfetti();
    });

    // Restart Button Interaction
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    // Confetti System (Simple Canvas Implementation)
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles = [];

    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    function startConfetti() {
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: width / 2,
                y: height / 2,
                w: Math.random() * 10 + 5,
                h: Math.random() * 10 + 5,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15 - 5, // Upward burst
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                gravity: 0.1,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }
        animateConfetti();
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            // Simple ground removal
            if (p.y > height) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
});
