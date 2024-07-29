const readline = require('readline');

class TicTacToe {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.board = {};
        this.size = 0;
        this.currentPlayer = null;
        this.players = [];
        this.gameOn = true;
    }

    userInput(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    async init() {
        console.log("Welcome To Tic Tac Toe Game!");

        this.size = parseInt(await this.userInput('Enter the board dimension (e.g., 3 for 3 x 3): '), 10);

        while (isNaN(this.size) || this.size <= 1) {
            console.log('Invalid input. Please enter a valid number greater than 1.');
            this.size = parseInt(await this.userInput('Enter the board dimension (e.g., 3 for 3 x 3): '), 10);
        }

        const player1Symbol = await this.userInput('Enter the symbol for Player 1: ');
        const player2Symbol = await this.userInput('Enter the symbol for Player 2: ');

        this.players = [
            { title: 'Player 1', symbol: player1Symbol },
            { title: 'Player 2', symbol: player2Symbol }
        ];

        for (let i = 0; i < this.size * this.size; i++) {
            this.board[i.toString()] = null;
        }

        this.currentPlayer = this.players[0];
        this.printBoard();
    }

    printBoard() {
        console.log("-".repeat(this.size * 4 + 1));
        for (let i = 0; i < this.size; i++) {
            let row = "|";
            for (let j = 0; j < this.size; j++) {
                const index = i * this.size + j ;
                row += ` ${this.board[index] || ' '} |`;
            }
            console.log(row);
            console.log("-".repeat(this.size * 4 ));
        }
    }
    
    winChecker() {
        const winPatterns = [];

        for (let i = 0; i < this.size; i++) {
            const horizontal = [];
            const vertical = [];
            for (let j = 0; j < this.size; j++) {
                horizontal.push(i * this.size + j ); 
                vertical.push(j * this.size + i );
            }
            winPatterns.push(horizontal);
            winPatterns.push(vertical);
        }

        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < this.size; i++) {
            diagonal1.push(i * this.size + i );
            diagonal2.push(i * this.size - i);
        }
        winPatterns.push(diagonal1);
        winPatterns.push(diagonal2);

        return winPatterns.some(pattern =>
            pattern.every(index => {
                return this.board[index] && this.board[index] === this.board[pattern[0]]
            })
        );
    }

    // winPatterns = [
    //     [1,2,3],
    //     [4,5,6],
    //     [7,8,9],
    //     [1,4,7],
    //     [2,5,8],
    //     [3,6,9],
    //     [1,5,9],
    //     [3,5,7],
    // ]


    async play() {
        while (this.gameOn) {
            const move = await this.userInput(`${this.currentPlayer.title} (${this.currentPlayer.symbol}), enter your move (row, col) or type "exit" to exit the game: `);
            if (move.toLowerCase() === 'exit') {
                console.log('Game exited.');
                this.gameOn = false;
                break;
            }
            
            const [row, col] = move.split(',').map(Number);

            if (isNaN(row) || isNaN(col) || row < 0 || row >= this.size || col < 0 || col >= this.size) {
                console.log('Invalid move. Please enter valid row and column numbers.');
                continue;
            }

            const index = row * this.size + col;
            if (this.board[index]) {
                console.log('This position is already taken. Please try another one.');
                continue;
            }

            this.board[index] = this.currentPlayer.symbol;
            this.printBoard();

            if (this.winChecker()) {
                console.log(`${this.currentPlayer.title} wins the game!`);
                this.gameOn = false;
                break;
            }

            this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];

            if (Object.values(this.board).every(cell => cell !== null)) {
                console.log("It's a tie!");
                this.gameOn = false;
                break;
            }
        }

        this.rl.close();
    }
}

(async () => {
    const game = new TicTacToe();
    await game.init();
    await game.play();
})();
