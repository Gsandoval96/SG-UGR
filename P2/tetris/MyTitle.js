class MyTitle extends THREE.Object3D {
  constructor(pos, size) {
    super();

    var posT1 = new THREE.Vector3(pos.x, pos.y, pos.z);
    var posE = new THREE.Vector3(pos.x+size, pos.y, pos.z);
    var posT2 = new THREE.Vector3(pos.x+size*2, pos.y, pos.z);
    var posR = new THREE.Vector3(pos.x+size*3, pos.y, pos.z);
    var posI = new THREE.Vector3(pos.x+size*4, pos.y, pos.z);
    var posS = new THREE.Vector3(pos.x+size*4 +size/2, pos.y, pos.z);

    this.t1 = new MyText(posT1, 'T', size, MyMaterial.RED);
    this.e = new MyText(posE, 'E', size, MyMaterial.ORANGE);
    this.t2 = new MyText(posT2, 'T', size, MyMaterial.YELLOW);
    this.r = new MyText(posR, 'R', size, MyMaterial.GREEN);
    this.i = new MyText(posI, 'I', size, MyMaterial.CYAN);
    this.s = new MyText(posS, 'S', size, MyMaterial.PURPLE);

    this.tetris = new THREE.Object3D();
    this.tetris.add(this.t1);
    this.tetris.add(this.e);
    this.tetris.add(this.t2);
    this.tetris.add(this.r);
    this.tetris.add(this.i);
    this.tetris.add(this.s);

    this.add(this.tetris);

    //Animaciones con TWEEN
    var origen = { p : -0.15 } ;
    var destino = { p : 0.15 } ;
    var that = this;

    var movimiento = new TWEEN.Tween(origen)
      .to(destino, 1000) //1 segundo
      .onUpdate (function(){
          that.t1.position.y = origen.p;
          that.t2.position.y = origen.p;
          that.i.position.y = origen.p;
      })
      .repeat(Infinity)
      .yoyo(true)
      .start();

      //Animaciones con TWEEN
      var origen2 = { p : 0.15 } ;
      var destino2 = { p : -0.15 } ;

      var movimiento2 = new TWEEN.Tween(origen2)
        .to(destino2, 1000) //1 segundo
        .onUpdate (function(){
            that.e.position.y = origen2.p;
            that.r.position.y = origen2.p;
            that.s.position.y = origen2.p;
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();

  }

  update(){
    TWEEN.update();
  }
}
