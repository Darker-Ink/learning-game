require('keypress')(process.stdin);

const Map = require("./utils/classes/Map");
const Game = require("./utils/classes/Game");
const map = new Map(1);
const ui = new Game(map);
const maps = require('./assets/maps');

for (const p in maps) {
    const mp = maps[p];

    let player = 0;
    let finish = 0;

    mp.map.forEach(row => {
        row.forEach(item => {
            if (item === 3) {
                player++;
            } else if (item === 8) {
                finish++;
            }
        });
    });

    if (player !== 1) {
        throw new Error(`Map ${mp.name} has ${player} players`);
    } else if (finish !== 1) {
        throw new Error(`Map ${mp.name} has ${finish} finish lines`);
    }
}

process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name == 'c') {
        process.exit()
    }

    if (key) {
        switch (key.name) {
            case 'up':
                ui.movePlayer('up');
                break;
            case 'down':
                ui.movePlayer('down');
                break;
            case 'left':
                ui.movePlayer('left');
                break;
            case 'right':
                ui.movePlayer('right');
                break;
            default:
                break;
        }
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();