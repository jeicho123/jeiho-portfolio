const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.4;

const c = canvas.getContext('2d');
const mouse = { x: undefined };

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.4;
    console.log(window.innerHeight);
    console.log(canvas.height);
    createBars();
});

class Bar {
    constructor(x, width, delay) {
        this.x = x;
        this.width = width;
        this.timer = delay;
        this.height = 0;
    }

    update() {
        this.timer += 0.01;
        const dx = Math.abs((this.x + this.width / 2) - mouse.x);

        if (dx < this.width / 2) {
            this.height += (canvas.height - this.height - 50) * 0.12;
        } else if (dx < this.width * 1.5) {
            this.height += (canvas.height - this.height - 50) * 0.01;
        } else {
            this.height -= (this.height - Math.abs(Math.sin(this.timer) * canvas.height / 2.5)) * 0.12;
        }

        this.draw();
    }

    draw() {
        const lightness = Math.abs(Math.sin(this.timer) * 50) + 30;

        const color = localStorage.getItem('light') === 'active' ? `hsl(220, 100%, ${lightness}%)` : `hsl(89, 100%, ${lightness}%)`;

        c.fillStyle = color;

        
        c.fillRect(this.x, canvas.height - this.height, this.width, this.height);
    }
}

let bars = [];
const barCount = 15;

function createBars() {
    bars = [];
    const barWidth = canvas.width / barCount;
    let barX = 0;
    let delay = 0;

    for (let i = 0; i < barCount; i++) {
        bars.push(new Bar(barX, barWidth, delay));
        barX += barWidth;
        delay += 0.2;
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    bars.forEach(bar => bar.update());
}

createBars();
animate();
