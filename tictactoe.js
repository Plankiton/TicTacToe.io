function XPlayer() {
    var img = document.createElement('img');
    img.setAttribute('class', 'player');

    img.setAttribute('src', 'https://img.icons8.com/ios-filled/50/000000/x.png');

    return img;
}

function OPlayer() {
    var img = document.createElement('img');
    img.setAttribute('class', 'player');

    img.setAttribute('src', 'https://img.icons8.com/ios-filled/50/000000/o.png');

    return img;
}

class Box {
    value = null;

    play(p) {
        this.value = p;
    }

}

class TicTacToe {
    lock = false;

    round = 0;

    win = null;
    curr_player = null;

    constructor() {
        this.boxes = []
        for (var i = 0; i < 3; i++) {
            this.boxes.push([]);
            for (var j = 0; j < 3; j++)
                this.boxes[i].push(new Box());
        }
    }

    lock() {
        this.lock = true;
    }

    unlock() {
        this.lock = false;
    }

    isLock = () => this.lock;

    play(x, y) {
        if (!this.winner && !this.boxes[x-1][y-1].value) {
            this.curr_player = this.round%2? "x" : "o";
            console.log(this.curr_player, "playing on ", x, ",", y);
            this.boxes[x-1][y-1].play(this.curr_player);

            this.round ++
        } else {
            console.log(this.curr_player, "did invalid play on ", x, ",", y);
        }
    }

    getWin() {
        var d = 0;
        var di = 0;
        var t = 0;

        for (var i = 0; i < 3; i++) {

            for (var a = 0; a < 3; a++) {
                // Vertical winners
                if (this.boxes[i+0][a].value == curr_player &&
                    this.boxes[i+1][a].value == curr_player &&
                    this.boxes[i+2][a].value == curr_player   ) {
                    this.winner = curr_player;
                    break
                }
                // Horizontal winners
                if (this.boxes[a][i+0].value == curr_player &&
                    this.boxes[a][i+1].value == curr_player &&
                    this.boxes[a][i+2].value == curr_player   ) {
                    this.winner = curr_player;
                    break
                }

                // Diagonals winners
                if (this.boxes[i][j].value == curr_player && i == j)
                    d ++;
                if (this.boxes[i][j].value == curr_player && i+j == 3-1)
                    di ++;

                // NoBody wins
                if (!this.boxex[i][j].value)
                    t ++;
            }

        }

        if (d == 3)
            this.winner = curr_player;
        if (di == 3)
            this.winner = curr_player;
        if (t == 9)
            this.winner = "n";
    }

}

class Board {
    constructor(game, element, subbox=false) {
        this.game = game;
        this.board = element;
        this.board.innerHTML = "";

        for (var i = 1; i <= 3; i++) {
            var row = document.createElement("div");
            row.setAttribute("class", "row");
            this.board.appendChild(row);

            for (var j = 1; j <= 3; j++) {
                var box = document.createElement("div");
                box.setAttribute("class", "box" + (subbox?" subbox":""));

                box.id = this.getBoxId(i, j).slice(1,4);
                box.addEventListener("click", (e) => {
                    var curr_box = e.path[0];

                    var x = Number(curr_box.id[1]);
                    var y = Number(curr_box.id[2]);

                    this.play(x, y);
                });

                row.appendChild(box);
            }
        }
    }

    getBoxId = (x, y) => `#b${x}${y}`

    play(x, y) {

        this.game.play(x, y);
        var curr_box = this.board.querySelector(this.getBoxId(x, y));
        if (curr_box.innerHTML == "")
            curr_box.appendChild(this.game.curr_player=='x'?XPlayer():OPlayer());

    }
}
