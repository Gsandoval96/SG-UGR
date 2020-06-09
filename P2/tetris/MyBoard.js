

class MyBoard extends THREE.Object3D {

  static WIDTH = 11;
  static HEIGHT = 15;

  static insideMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF, opacity:0.25,transparent:true});

  constructor() {
    super();

    for(var i = 0; i < MyBoard.HEIGHT; i++){
      for(var j = 0; j < MyBoard.WIDTH; j++){

        var position = new THREE.Vector3(j,i,0);
        var cube;

        var size = new THREE.Vector3(1,1,1);
        cube = new MyCube(position, MyBoard.insideMat, size);

        this.add(cube);
      }
    }

    this.piece = new MyPiece(5,12);
    this.add(this.piece);

    this.nextPiece = new MyPiece(13,12);
    this.add(this.nextPiece);

    this.savedPiece = null;
    this.justSaved = false;

    //Animaciones con TWEEN
    var origen = { p : 0 } ;
    var destino = { p : 1 } ;
    var that = this;

    var movimiento = new TWEEN.Tween(origen)
      .to(destino, 2000) //2 segundos
      .onUpdate (function(){
        if(origen.p == 1)
          that.dropPiece();
      })
      .repeat(Infinity)
      .start();
  }

  savePiece(){
    if(!this.justSaved){
      if(this.savedPiece == null){
        this.savedPiece = new MyPiece(0,0);
        var savePos = new THREE.Vector3(13,5,0);
        this.piece.pos = savePos;
        this.savedPiece.copy(this.piece);
        this.add(this.savedPiece);

        this.respawn();
      }
      else{
        var auxPiece = new MyPiece(0,0);
        auxPiece.copy(this.savedPiece);

        var savePos = new THREE.Vector3(13,5,0);
        this.piece.pos = savePos;
        this.remove(this.savedPiece);
        this.savedPiece.copy(this.piece);
        this.add(this.savedPiece);

        var respawnPos = new THREE.Vector3(5,12,0);
        auxPiece.pos = respawnPos;
        this.remove(this.piece);
        this.piece.copy(auxPiece);
        this.add(this.piece);
      }
      this.justSaved = true;
    }
  }

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

  bottomCollider(piece){
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

  collide(piece){
    var collide = false;

    var posX = piece.pos.x;
    var posY = piece.pos.y;

    var pos = posY * (MyBoard.WIDTH) + posX;
    var material = this.children[pos].box.material;

    if(material != MyBoard.insideMat)
      collide = true;

    for(var i = 0; i < 3 && !collide; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(posX + perif.x, posY + perif.y);

      pos = posPerif.y * (MyBoard.WIDTH) + posPerif.x;
      material = this.children[pos].box.material;

      if(material != MyBoard.insideMat)
        collide = true;
    }
    return collide;
  }

  movePiece(distX){

    var newPos = new THREE.Vector3(this.piece.pos.x + distX, this.piece.pos.y, 0);

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this.piece);
    newPiece.pos = newPos;

    var inBounds = this.pieceInBounds(newPiece);

    if(inBounds){
      var collision = this.collide(newPiece);
      if(!collision)
        this.piece.move(newPiece.pos);
    }
  }

  dropPiece(){
    var newPos = new THREE.Vector3(this.piece.pos.x, this.piece.pos.y-1, 0);

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this.piece);
    newPiece.pos = newPos;

    var collision = this.bottomCollider(newPiece) || this.collide(newPiece);

    if(collision){
      this.pinUp(this.piece);
    }
    else{
      this.piece.move(newPiece.pos);
    }
    return collision;
  }

  rotatePiece(dir){
    if(this.piece.type != 'O'){
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
        var collision = this.collide(newPiece);
        if(!collision)
          this.piece.rotate(newPerifs);
      }
    }
  }

  pinUp(piece){
    var posX = piece.pos.x;
    var posY = piece.pos.y;
    var material = piece.material;

    var pos = posY * (MyBoard.WIDTH) + posX;
    this.children[pos].box.material = material;

    for(var i = 0; i < 3; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(posX + perif.x, posY + perif.y);

      pos = posPerif.y * (MyBoard.WIDTH) + posPerif.x;
      this.children[pos].box.material = material;
    }
    this.checkRow();
    this.respawn();

    this.justSaved = false;
  }

  hardDrop(){
    var collide = true;
    do{
      collide = this.dropPiece();
    }while(!collide);
  }

  checkRow(){
    var fullRow;
    var pos;
    var material;

    var rows = [];

    for(var i = 0; i < MyBoard.HEIGHT; i++){
      fullRow = true;
      for(var j = 0; j < MyBoard.WIDTH && fullRow; j++){

        pos = i * (MyBoard.WIDTH) + j;
        material = this.children[pos].box.material;
        if(material == MyBoard.insideMat)
          fullRow = false;
      }
      if(fullRow){
        console.log("FILA-LLENA");
        rows.unshift(i);
      }
    }
    if(rows.length != 0) this.clearRows(rows);
  }

  clearRows(rows){
    for(var i=0;i<rows.length;i++){
      this.emptyRow(rows[i]);
      this.dropRows(rows[i]);
    }
  }

  dropRows(n){
    var pos;

    for(var i=n;i<MyBoard.HEIGHT-1;i++){
      for(var j = 0; j < MyBoard.WIDTH; j++){
        pos = i * (MyBoard.WIDTH) + j;
        this.children[pos].box.material = this.children[pos+MyBoard.WIDTH].box.material;
      }
    }
  }

  emptyRow(n){
    var pos;

    for(var i=0; i < MyBoard.WIDTH; i++){
      pos = n * (MyBoard.WIDTH) + i;
      this.children[pos].box.material = MyBoard.insideMat;
    }
  }

  respawn(){
    var respawnPos = new THREE.Vector3(5,12,0);
    this.nextPiece.pos = respawnPos;
    this.remove(this.piece);
    this.piece.copy(this.nextPiece);
    this.add(this.piece);

    this.remove(this.nextPiece);
    this.nextPiece = new MyPiece(13,12);
    this.add(this.nextPiece);
  }

  update () {
    TWEEN.update();
  }

}
