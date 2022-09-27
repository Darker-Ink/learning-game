const maps = require('../../assets/maps');

class Map {
    constructor(map) {
        this.map = maps[map];
    }

    getMap() {
        return this.map;
    }

    getMapName() {
        return this.map.name;
    }

    getMapArray() {
        return this.map.map;
    }

    setMap(level) {
        const map = maps[level];
        this.map = map;

        return map;
    }

    generateMap() {
        // 0's are floor (=)
        // 1's are walls (|)
        // 2's are player (@)
        // 3's are the end ($)
        // 4's are enemies (E)
        // 5's are health (H)
        // 6's are ammo (A)
        // 7's are the finish line (F)
        // 8's are the start line (S)

        let newMap = this.map.map.map(row => {
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
        });

        return newMap;
    }
}

module.exports = Map;