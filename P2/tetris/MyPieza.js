

class MyPieza extends THREE.Object3D {
  constructor() {
    super();


    this.material = new THREE.MeshStandardMaterial({color: 0xFF0000});
    this.pos = new THREE.Vector3(1,1,0);
    this.perifs = new THREE.Vector3(new THREE.Vector2(0,1),
                                    new THREE.Vector2(0,-1),
                                    new THREE.Vector2(1,-1));

    this.pieza = this.crearPieza();

    this.add(this.pieza);


  }

  crearPieza(){
    var pieza = new THREE.Object3D();
    var mat = new THREE.MeshStandardMaterial({color: 0x00FF00});

    var cubo = new MyCubo(this.pos, mat);
    pieza.add(cubo);

    for(var i = 0; i < 3; i++){
      var perif = this.perifs.getComponent(i);
      var posPerif = new THREE.Vector3(this.pos.x + perif.x,
                                       this.pos.y + perif.y,
                                       this.pos.z);
      cubo = new MyCubo(posPerif, this.material);
      pieza.add(cubo);
    }

    return pieza;
  }

  update () {

  }

}
