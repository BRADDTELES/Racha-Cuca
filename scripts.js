const Components = {
    spaces: document.querySelectorAll('.board div'),
    pieces: document.querySelectorAll('.board div span')
}

const Initializes = {
    initialModels: [
        [3, 7, 10, 6, 5, 2, 15, 11, 9, 14, 12, 1, 13, 4, 8, '']
    ],
    
    random: Math.floor(Math.random() * (2 - 1)),
    
    initializeBoard(){
        Components.pieces.forEach((piece, index) => {
            piece.innerText = this.initialModels[this.random][index]
            piece.addEventListener('click', Game.move)
        })
    },
}


const Game = {
    move(e){
        const currentPiece = e.target
        const pieceEmpty = Components.pieces[15]
        const whereIAm = currentPiece.parentNode.id
        const whereEmpty = pieceEmpty.parentNode.id
        const canMove = Game.verifyMovement(Number(whereIAm), Number(whereEmpty))
    
        if(canMove){
            const currentPosition = currentPiece.parentNode
            const emptyPosition = pieceEmpty.parentNode
            emptyPosition.replaceChild(currentPiece, pieceEmpty)
            currentPosition.appendChild(pieceEmpty)
            const win = Game.checkWin()
            if(win){
                Game.winnerMessage()
            }
        }
    },
    
    
    verifyMovement(whereIAm, whereEmpty){
        if(whereEmpty == 1 || whereEmpty == 5 || whereEmpty == 9 || whereEmpty == 13){
            return canMove = 
                whereIAm - 1 == whereEmpty ||
                whereIAm + 4 == whereEmpty ||
                whereIAm - 4 == whereEmpty
        }
        else if(whereEmpty == 4 || whereEmpty == 8 || whereEmpty == 12){
            return canMove =
                whereIAm + 1 == whereEmpty ||
                whereIAm + 4 == whereEmpty ||
                whereIAm - 4 == whereEmpty
        }
        else{
            return canMove =
                whereIAm + 1 == whereEmpty ||
                whereIAm - 1 == whereEmpty ||
                whereIAm + 4 == whereEmpty ||
                whereIAm - 4 == whereEmpty
        }
    },
    
    checkWin(){
        for(let i = 0; i <= 14; i++){
            if(Components.spaces[i].id != Components.spaces[i].innerText){
                return false
            }
        }
        return true
    },
    
    
    winnerMessage(){
        document.querySelector('.modal-winner')
            .classList.add('win')
    }

}


const Modal = {
    newGame(){
        location.reload()
    },

    back(){
        document.querySelector('.modal-winner')
            .classList.remove('win')
    }
}

window.onload = Initializes.initializeBoard()