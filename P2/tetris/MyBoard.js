

class MyBoard extends THREE.Object3D {

  static WIDTH = 10;
  static HEIGHT = 15;

  static inBounds(coord){

    var inBounds = true;

    if(coord.x <= 0 || coord.x > MyBoard.WIDTH)
      inBounds = false;

    if(coord.y <= 0)
      inBounds = false;

    return inBounds;
  }

  constructor() {
    super();

    var insideMat = new THREE.MeshStandardMaterial({color: 0x000000, opacity:0.15,transparent:true});
    var edgeMat = new THREE.MeshStandardMaterial({color: 0x111111});

    for(var i = 0; i < MyBoard.WIDTH+2; i++){
      for(var j = 0; j < MyBoard.HEIGHT+1; j++){

        var position = new THREE.Vector3(i,j,0);
        var cube;

        if(i == 0 || i == MyBoard.WIDTH+1 || j == 0)
          cube = new MyCube(position, edgeMat);
        else
          cube = new MyCube(position, insideMat);

        this.add(cube);
      }
    }

    this.piece = new MyPiece(3,3);
    this.add(this.piece);
  }

  update () {

  }

}
