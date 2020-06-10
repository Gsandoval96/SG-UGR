class MyTitle extends THREE.Object3D {
  constructor(pos, size) {
    super();

    var posT1 = new THREE.Vector3(pos.x, pos.y, pos.z);
    var posE = new THREE.Vector3(pos.x+size*1.1, pos.y, pos.z);
    var posT2 = new THREE.Vector3(pos.x+size*2.1, pos.y, pos.z);
    var posR = new THREE.Vector3(pos.x+size*3.2, pos.y, pos.z);
    var posI = new THREE.Vector3(pos.x+size*4.3, pos.y, pos.z);
    var posS = new THREE.Vector3(pos.x+size*4.4 +size/2, pos.y, pos.z);

    var fontURL = '../fonts/tetris_regular.json';

    this.t1 = new MyText(posT1, 'T', size, MyMaterial.RED, fontURL);
    this.e = new MyText(posE, 'E', size, MyMaterial.ORANGE, fontURL);
    this.t2 = new MyText(posT2, 'T', size, MyMaterial.YELLOW, fontURL);
    this.r = new MyText(posR, 'R', size, MyMaterial.GREEN, fontURL);
    this.i = new MyText(posI, 'I', size, MyMaterial.CYAN, fontURL);
    this.s = new MyText(posS, 'S', size, MyMaterial.PURPLE, fontURL);

    this.tetris = new THREE.Object3D();
    this.tetris.add(this.t1);
    this.tetris.add(this.e);
    this.tetris.add(this.t2);
    this.tetris.add(this.r);
    this.tetris.add(this.i);
    this.tetris.add(this.s);

    this.add(this.tetris);

    //Animaciones con TWEEN
    var origin = { p : -size/10 } ;
    var destiny = { p : size/10 } ;
    var that = this;

    var animation = new TWEEN.Tween(origin)
      .to(destiny, 1000) //1 segundo
      .onUpdate (function(){
          that.t1.position.y = origin.p;
          that.t2.position.y = origin.p;
          that.i.position.y = origin.p;
      })
      .repeat(Infinity)
      .yoyo(true)
      .start();

      //Animaciones con TWEEN
      var origin2 = { p : size/10 } ;
      var destiny2 = { p : -size/10 } ;

      var animation2 = new TWEEN.Tween(origin2)
        .to(destiny2, 1000) //1 segundo
        .onUpdate (function(){
            that.e.position.y = origin2.p;
            that.r.position.y = origin2.p;
            that.s.position.y = origin2.p;
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();

  }

  update(){
    TWEEN.update();
  }
}
