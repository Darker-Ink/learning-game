const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

class Game {
    constructor(map) {
        this.player_last_position = { x: 0, y: 0 };
        this.player_position = { y: 0, x: 0 };
        this.map = map;
        this.level = 1;
        this.score = 0;
        this.health = 100;
        this.ammo = 6;
        // this game is BUILT FOR 30 FPS do not change this (unless you want to deal with the consequences)
        this.fps = 30;

        this.map.getMapArray().forEach((row, y) => {
            row.forEach((item, x) => {
                if (item === 3) {
                    this.player_position = { y, x };
                }
            });
        });

        this.intervals = [];


        this.intervals.push(setInterval(() => {

            if (this.health <= 0) {
                this.gameOver();
                return;
            }

            if (this.player_last_position.x === this.player_position.x && this.player_last_position.y === this.player_position.y) {
                return;
            }

            this.player_last_position = { x: this.player_position.x, y: this.player_position.y };

            console.clear();
            console.log(this.generateMap().join('\n'));
        }, 1000 / this.fps));

        this.intervals.push(setInterval(() => {
            if (this.map.getMapArray()[this.player_position.y + 1][this.player_position.x] === 0) {
                this.map.getMapArray()[this.player_position.y][this.player_position.x] = 0;
                this.player_position.y += 1;
                this.map.getMapArray()[this.player_position.y][this.player_position.x] = 3;
            }
        }, 1000 / this.fps * 20));
    }

    movePlayer(direction) {
        const player = this.player_position;
        const oldPlayer = this.player_last_position;
        const map = this.map;
        const mapArray = map.getMapArray();

        console.log(oldPlayer, this.level, this.health)

        switch (direction) {
            case 'up':
                if (mapArray[player.y - 1][player.x] === 0) {
                    mapArray[player.y][player.x] = 0;
                    player.y -= 1;
                    oldPlayer.y += 1;
                    mapArray[player.y][player.x] = 3;

                    return;
                }

                if (mapArray[player.y - 1][player.x] === 8) {
                    this.level += 1;
                    console.log('New level: ' + this.level);
                    this.map.setMap(this.level);
                    return;
                }

                if (mapArray[player.y - 1][player.x] === 4 || mapArray[player.y - 1][player.x] === 5 || mapArray[player.y - 1][player.x] === 4) {
                    this.health -= 10;
                }
                break;
            case 'down':
                if (mapArray[player.y + 1][player.x] === 0) {
                    if (mapArray[player.y + 1][player.x] === 8) {
                        this.level++;
                        this.map = new Map(this.level);
                        return;
                    }

                    if (mapArray[player.y + 1][player.x] === 4) {
                        this.health -= 10;
                        return;
                    }
                    mapArray[player.y][player.x] = 0;
                    player.y += 1;
                    oldPlayer.y -= 1;
                    mapArray[player.y][player.x] = 3;
                }
                break;
            case 'left':
                if (mapArray[player.y][player.x - 1] === 0) {

                    if (mapArray[player.y][player.x + 1] === 8) {
                        this.level++;
                        this.map = new Map(this.level);
                        return;
                    }

                    if (mapArray[player.y][player.x + 1] === 4) {
                        this.health -= 10;
                        return;
                    }

                    mapArray[player.y][player.x] = 0;
                    player.x -= 1;
                    mapArray[player.y][player.x] = 3;
                }
                break;

            case 'right':
                if (mapArray[player.y][player.x + 1] === 0) {
                    if (mapArray[player.y][player.x + 1] === 8) {
                        this.level++;
                        this.map = new Map(this.level);
                        return;
                    }

                    if (mapArray[player.y][player.x + 1] === 4) {
                        this.health -= 10;
                        return;
                    }
                    mapArray[player.y][player.x] = 0;
                    player.x += 1;
                    mapArray[player.y][player.x] = 3;
                }
                break;
        }
    }

    async gameOver() {
        this.intervals.forEach(interval => clearInterval(interval));

        console.clear();

        for (let i = 1; i <= 18; i++) {
            console.clear()
            console.log(gameOver[i])
            await sleep(200)
        }
    }

    generateMap() {
        const map = this.map;

        let newMap = map.getMapArray().map(row => {
            return row.map(item => {
                switch (item) {
                    case 0:
                        return '  ';
                    case 1:
                        return '==';
                    case 2:
                        return '||';
                    case 3:
                        return '@ ';
                    case 4:
                        return '$ ';
                    case 5:
                        return 'E ';
                    case 6:
                        return 'H ';
                    case 7:
                        return 'A ';
                    case 8:
                        return 'F ';
                    case 9:
                        return '- ';
                    case 10:
                        return '||';
                    case 11:
                        return '==';
                    case 12:
                        return ' ';
                    default:
                        return '  ';
                }
            }).join('');
        })

        return newMap;
    }
}

module.exports = Game;