// FPS Counter

let lastFrame = Date.now();

setInterval(() => {
    const now = Date.now();
    const delta = now - lastFrame;
    lastFrame = now;

    console.clear();
    console.log(`FPS: ${Math.round(1000 / delta)}`);
}, 1000 / ui.fps);