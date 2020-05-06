class MyPieza extends THREE.Object3D {

  constructor() {
    super();

    this.tipo = this.elegirTipo();

    this.material = new THREE.MeshStandardMaterial({color: 0xFF0000});
    this.pos = new THREE.Vector3(1,1,0);

    this.perifs = this.crearPerifs();

    this.pieza = this.crearPieza();

    this.add(this.pieza);
  }

  elegirTipo(){
    var tipos = ['L','J','S','Z','T','I','O'];
    var valor = Math.round(Math.random()*6);

    console.log(tipos[valor]);

    return tipos[valor];
  }

  crearPerifs(){
    var perif;

    switch (this.tipo){
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
