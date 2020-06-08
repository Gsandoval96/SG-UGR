

class MyBoard extends THREE.Object3D {

  static WIDTH = 11;
  static HEIGHT = 15;

  inBounds(coord){

    var inBounds = true;

    if(coord.x < 0 || coord.x > MyBoard.WIDTH-1)
      inBounds = false;

    return inBounds;
  }

  pieceInBounds(piece){

    var coord = new THREE.Vector2(piece.pos.x, piece.pos.y);
    var inBounds = this.inBounds(coord);

    for(var i = 0; i<3 && inBounds; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(coord.x + perif.x,
                                       coord.y + perif.y);
      inBounds = this.inBounds(posPerif);
    }

    return inBounds;

  }

  isColliding(piece){
    var collide = false;

    var coord = new THREE.Vector2(piece.pos.x, piece.pos.y);

    if(coord.y < 0) collide = true;

    for(var i = 0; i<3 && !collide; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(coord.x + perif.x,
                                       coord.y + perif.y);
      if(posPerif.y < 0) collide = true;
    }

    return collide;
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

    //Animaciones con TWEEN
    var origen = { p : 0 } ;
    var destino = { p : 1 } ;
    var that = this;

    var movimiento = new TWEEN.Tween(origen)
      .to(destino, 2000) //2 segundos
      .onUpdate (function(){
        if(origen.p == 1)
          that.movePiece(0,-1);
      })
      .repeat(Infinity)
      .start();
  }

  movePiece(distX, distY){

    var newPos = new THREE.Vector3(this.piece.pos.x + distX, this.piece.pos.y + distY, 0);

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this.piece);
    newPiece.pos = newPos;

    var inBounds = this.pieceInBounds(newPiece);
    var collide = this.isColliding(newPiece);

    if(collide){
       this.pinUp(this.piece);
    }

    if(inBounds && !collide){
      this.piece.move(newPiece.pos);
    }
  }

  rotatePiece(dir){

    var rot;

    if(dir == 'R')
      rot = new THREE.Vector2(1,-1);
    else
      rot = new THREE.Vector2(-1,1);

    var newPerifs = new THREE.Vector3(THREE.Vector2(0,0), THREE.Vector2(0,0), THREE.Vector2(0,0));

    for(var i=0; i<3; i++){
      var perif = this.piece.perifs.getComponent(i);
      var newPerif = new THREE.Vector2(perif.y*rot.x,perif.x*rot.y);
      newPerifs.setComponent(i,newPerif);
    }

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this.piece);
    newPiece.perifs = newPerifs;

    var inBounds = this.pieceInBounds(newPiece);

    if(inBounds){
      this.piece.rotate(newPerifs);
    }
  }

  pinUp(piece){
    console.log("PINUP");
    console.log(piece);
    var posX = piece.pos.x;
    var posY = piece.pos.y;
    var material = piece.material;

    var pos = posX * (MyBoard.HEIGHT) + posY;
    this.children[pos].box.material = material;

    for(var i = 0; i < 3; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(posX + perif.x, posY + perif.y);

      pos = posPerif.x * (MyBoard.HEIGHT) + posPerif.y;
      this.children[pos].box.material = material;
    }

    this.respawn();
  }

  respawn(){
    console.log("RESPAWN");
    this.remove(this.piece);
    this.piece = new MyPiece(5,12);
    this.add(this.piece);
  }

  update () {
    TWEEN.update();
  }

}
