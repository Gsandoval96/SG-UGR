

class MyTablero extends THREE.Object3D {
  constructor() {
    super();

    var material = new THREE.MeshStandardMaterial({color: 0x000000, opacity:0.15,transparent:true});

    for(var i = 0; i < 10; i++)
      for(var j = 0; j < 15; j++){
        var position = new THREE.Vector3(i,j,0);
        var cubo = new MyCubo(position, material);
        this.add(cubo);
      }
  }

  update () {

  }

}
