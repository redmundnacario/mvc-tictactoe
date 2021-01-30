import EventClass from "./event.js"

class TicTacToe {
    constructor () {
        this.current_player = "X";
        this.game_turns = 0;
        this.game_moves = {};
        this.game_status = false;

        this.updateGridEvent = new EventClass();
        this.victoryEvent = new EventClass();
        this.drawEvent = new EventClass();
    }

    play(move){
        if (this.game_status || this.turns > 9){ return false }

        this.turns++

        if (!this.game_moves[this.current_player]) {
            this.game_moves[this.current_player] = []
        }

        this.game_moves[this.current_player].push(move);

        this.updateGridEvent.trigger({ move, player:this.current_player })

        this.game_status = this.victory() || this.draw()


        if (this.game_status === false){ this.switchCurrentPlayer() }
        return true
    }

    //determines if current move is wins or not
    victory(){
        let win_combinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        
        // Boolean - determines if players moves contains the win combinations
        let result = win_combinations.map(combination => {
            return combination.every(value => this.game_moves[this.current_player].includes(value))
            // return combination.every(value => sample_combinations.includes(value))
        }).includes(true)

        if (result) { 
            this.victoryEvent.trigger(this.current_player);
            return result 
        }
        
        return result
    }

    draw(){
        if(this.turns == 9) {
            return true
        }

        return  false
    }



    switchCurrentPlayer(){
        this.current_player = this.current_player === "X" ? "O" : "X";
    }

    
}