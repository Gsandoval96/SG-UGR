class MyPiece extends THREE.Object3D {

  constructor(posX, posY) {
    super();

    this.type = this.randomType();

    this.material = this.createMaterial();
    this.pos = new THREE.Vector3(posX, posY, 0);

    this.perifs = this.createPerifs();

    this.piece = this.createPiece();

    this.add(this.piece);
  }

  copy(p){
    this.type = p.type;
    this.material = p.material;
    this.pos = p.pos;
    this.perifs = p.perifs;

    this.update();
  }

  simpleCopy(p){
    this.type = p.type;
    this.material = p.material;
    this.pos = p.pos;
    this.perifs = this.createPerifs();
    this.update();
  }

  randomType(){
    var types = ['L','J','S','Z','T','I','O'];
    var random = Math.round(Math.random()*6);

    return types[random];
  }

  createPerifs(){
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

  createMaterial(){
    var material;

    switch (this.type){
      case 'L':
        material = MyMaterial.ORANGEBRICK;
      break;

      case 'J':
        material = MyMaterial.BLUEBRICK;
      break;

      case 'S':
        material = MyMaterial.GREENBRICK;
      break;

      case 'Z':
        material = MyMaterial.REDBRICK;
      break;

      case 'T':
        material = MyMaterial.PURPLEBRICK;
      break;

      case 'I':
        material = MyMaterial.CYANBRICK;
      break;

      case 'O':
        material = MyMaterial.YELLOWBRICK;
      break;
    }

    return material;
  }

  createPiece(){
    var piece = new THREE.Object3D();

    var size = new THREE.Vector3(1,1,2);
    var cube = new MyCube(this.pos, this.material, size);
    piece.add(cube);

    for(var i = 0; i < 3; i++){
      var perif = this.perifs.getComponent(i);
      var posPerif = new THREE.Vector3(this.pos.x + perif.x,
                                       this.pos.y + perif.y,
                                       this.pos.z);
      var size = new THREE.Vector3(1,1,2);
      cube = new MyCube(posPerif, this.material,size);
      piece.add(cube);
    }

    return piece;
  }

  move(newPos){
    this.pos = newPos;
    this.update();
  }

  rotate(newPerifs){
    this.perifs = newPerifs;
    this.update();
  }

  update() {
    this.remove(this.piece);
    this.piece = this.createPiece();
    this.add(this.piece);
  }

}
