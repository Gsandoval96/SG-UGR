class MyControls{

  constructor(){
    this.rotateLeftKey = 81; //Q
    this.rotateRightKey = 69; //E

    this.moveLeftKey = 37; //Flecha Izquierda
    this.moveRightKey = 39; //Flecha Derecha
    this.moveDownKey = 40; //Flecha Abajo

    this.hardDropKey = 32; //Espacio
    this.savePieceKey = 87; //W
  }

  manager(keyCode, game){
    if (keyCode == this.rotateLeftKey ){game.board.rotatePiece('L');} //Q
    if (keyCode == this.rotateRightKey ){game.board.rotatePiece('R');} //E

    if (keyCode == this.hardDropKey ){game.hardDrop();} //Espacio
    if (keyCode == this.savePieceKey ){game.board.holdPiece();} //W

    if (keyCode == this.moveLeftKey ){game.board.movePiece(-1);} //Flecha Izquierda
    if (keyCode == this.moveRightKey ){game.board.movePiece(1);} //Flecha Derecha
    if (keyCode == this.moveDownKey ){game.dropPiece('SOFT');} //Flecha Abajo
  }
}
