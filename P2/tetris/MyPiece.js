class MyPiece extends THREE.Object3D {


  constructor(posX, posY) {
    super();

    this.type = this.randomType();

    this.material = new THREE.MeshStandardMaterial({color: 0xFF0000});
    this.pos = new THREE.Vector3(posX, posY, 0);

    this.perifs = this.crearPerifs();

    this.piece = this.createPiece();

    this.add(this.piece);
  }

  copy(p){
      this.type = p.type;
      this.material = p.material;
      this.pos = p.pos;
      this.perifs = p.perifs;
      this.piece = p.piece;
  }

  move(distX, distY){

    var newPos = new THREE.Vector3(this.pos.x + distX, this.pos.y + distY, 0);

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this);
    newPiece.pos = newPos;

    var inBounds = MyBoard.pieceInBounds(newPiece);

    if(inBounds){

      this.pos = newPiece.pos;

      this.remove(this.piece);
      this.piece = this.createPiece();
      this.add(this.piece);
    }
  }

  rotate(dir){

    var rot;

    if(dir == 'R')
      rot = new THREE.Vector2(1,-1);
    else
      rot = new THREE.Vector2(-1,1);

    var newPerifs = new THREE.Vector3(THREE.Vector2(0,0), THREE.Vector2(0,0), THREE.Vector2(0,0));

    for(var i=0; i<3; i++){
      var perif = this.perifs.getComponent(i);
      var newPerif = new THREE.Vector2(perif.y*rot.x,perif.x*rot.y);
      newPerifs.setComponent(i,newPerif);
    }

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this);
    newPiece.perifs = newPerifs;

    var inBounds = MyBoard.pieceInBounds(newPiece);

      this.perifs = newPiece.perifs;

      this.remove(this.piece);
      this.piece = this.createPiece();
      this.add(this.piece);
    }
  }

  randomType(){
    var types = ['L','J','S','Z','T','I','O'];
    var random = Math.round(Math.random()*6);

    return types[random];
  }

  crearPerifs(){
    var perif;

    switch (this.type){
      case 'L':
        perif = new THREE.Vector3(new THREE.Vector2(0,1),
                                      new THREE.Vector2(0,-1),
                                      new THREE.Vector2(1,-1));
      break;

      case 'J':
        perif = new THREE.Vector3(new THREE.Vector2(0,1),
                                      new THREE.Vector2(0,-1),
                                      new THREE.Vector2(-1,-1));
      break;

      case 'S':
        perif = new THREE.Vector3(new THREE.Vector2(-1,0),
                                      new THREE.Vector2(0,1),
                                      new THREE.Vector2(1,1));
      break;

      case 'Z':
        perif = new THREE.Vector3(new THREE.Vector2(1,0),
                                      new THREE.Vector2(0,1),
                                      new THREE.Vector2(-1,1));
      break;

      case 'T':
        perif = new THREE.Vector3(new THREE.Vector2(0,1),
                                      new THREE.Vector2(1,0),
                                      new THREE.Vector2(-1,0));
      break;

      case 'I':
        perif = new THREE.Vector3(new THREE.Vector2(0,1),
                                      new THREE.Vector2(0,-1),
                                      new THREE.Vector2(0,2));
      break;

      case 'O':
        perif = new THREE.Vector3(new THREE.Vector2(0,1),
                                      new THREE.Vector2(1,1),
                                      new THREE.Vector2(1,0));
      break;
    }

    return perif;
  }

  createPiece(){
    var piece = new THREE.Object3D();

    var mat = new THREE.MeshStandardMaterial({color: 0x00FF00});

    var cube = new MyCube(this.pos, mat);
    piece.add(cube);

    for(var i = 0; i < 3; i++){
      var perif = this.perifs.getComponent(i);
      var posPerif = new THREE.Vector3(this.pos.x + perif.x,
                                       this.pos.y + perif.y,
                                       this.pos.z);
      cube = new MyCube(posPerif, this.material);
      piece.add(cube);
    }

    return piece;
  }

  update () {

  }

}
