

class MyBoard extends THREE.Object3D {

  static WIDTH = 11;
  static HEIGHT = 15;

  static inBounds(coord){

    var inBounds = true;

    if(coord.x < 0 || coord.x > MyBoard.WIDTH-1)
      inBounds = false;

    if(coord.y < 0)
      inBounds = false;

    return inBounds;
  }

  static pieceInBounds(piece){

    var coord = new THREE.Vector2(piece.pos.x, piece.pos.y);
    var inBounds = MyBoard.inBounds(coord);

    for(var i = 0; i<3 && inBounds; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(coord.x + perif.x,
                                       coord.y + perif.y);
      inBounds = MyBoard.inBounds(posPerif);
    }

    return inBounds;

  }

  constructor() {
    super();

    var insideMat = new THREE.MeshStandardMaterial({color: 0x000000, opacity:0.15,transparent:true});
    var edgeMat = new THREE.MeshStandardMaterial({color: 0x111111});

    /*for(var i = 0; i < MyBoard.WIDTH+2; i++){
      for(var j = 0; j < MyBoard.HEIGHT+1; j++){

        var position = new THREE.Vector3(i,j,0);
        var cube;

        if(i == 0 || i == MyBoard.WIDTH+1 || j == 0)
          cube = new MyCube(position, edgeMat);
        else
          cube = new MyCube(position, insideMat);

        this.add(cube);
      }
    }*/

    for(var i = 0; i < MyBoard.WIDTH; i++){
      for(var j = 0; j < MyBoard.HEIGHT; j++){

        var position = new THREE.Vector3(i,j,0);
        var cube;

        cube = new MyCube(position, insideMat);

        this.add(cube);
      }
    }

    this.piece = new MyPiece(5,12);
    this.add(this.piece);
  }

  pinUp(){
    var posX = this.piece.pos.x;
    var posY = this.piece.pos.y;

    var pos = posX * (MyBoard.HEIGHT) + posY;
    this.children[pos].box.material = this.piece.material;

    for(var i = 0; i < 3; i++){
      var perif = this.piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(posX + perif.x, posY + perif.y);

      pos = posPerif.x * (MyBoard.HEIGHT) + posPerif.y;
      this.children[pos].box.material = this.piece.material;
    }

    this.respawn();
  }

  respawn(){
    this.remove(this.piece);
    this.piece = new MyPiece(5,12);
    this.add(this.piece);
  }

  isColliding(){
  return null;
  }

  update () {

  }

}
