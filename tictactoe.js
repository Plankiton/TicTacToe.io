class Box {
    value = null;

    play = (p) => {
        if (['x', 'o'].indexOf(p) > -1) {
            this.value = p;
        }
    }

}

class TicTacToe {
    lock = false;

    win = null;
    boxes = null;

    round = 0
    curr_player = null;

    create = () => {
        this.boxes = []
        for (var i = 0; i < 3; i++) {
            this.boxes.push([])
            for (var j = 0; j < 3; j++)
                this.boxes[i].push(new Box());
        }
    }

    lock = () => {
        this.lock = true;
    }

    unlock = () => {
        this.lock = false;
    }

    isLock = () => this.lock;

    play = (x, y) => {
        if (!this.winner && !this.boxes[x-1][y-1].value) {
            this.curr_player = this.round%2? "x" : "o";
            this.boxes[x-1, y-1].play(this.curr_player)

            this.round ++
        }
    }

    getWin = () => {
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
