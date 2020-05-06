

class MyBoard extends THREE.Object3D {
  constructor(width, height) {
    super();

    var insideMat = new THREE.MeshStandardMaterial({color: 0x000000, opacity:0.15,transparent:true});
    var edgeMat = new THREE.MeshStandardMaterial({color: 0x111111});

    for(var i = 0; i < width; i++){
      for(var j = 0; j < height; j++){

        var position = new THREE.Vector3(i,j,0);
        var cube;

        if(i == 0 || i == width-1 || j == 0)
          cube = new MyCube(position, edgeMat);
        else
          cube = new MyCube(position, insideMat);

        this.add(cube);
      }
    }

  }

  update () {

  }

}
