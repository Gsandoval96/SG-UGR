class MyMenu extends THREE.Object3D {
  constructor() {
    super();

    var titlePos = new THREE.Vector3(-9,16,3);
    this.title = new MyTitle(titlePos,5,true);
    this.add(this.title);

    var pos = new THREE.Vector3(3,7,2.5);
    var adjust = new THREE.Vector3(2,3,1.6);
    this.keyPLAY = new MyKeyObj(pos,30,15,'PLAY', adjust);
    this.add(this.keyPLAY);

    var fontURL = '../fonts/helvetiker_regular.typeface.json'

    var githubTextPosition = new THREE.Vector3(2,3,2.5);
    var githubText = new MyText(githubTextPosition,'github.com/Gsandoval96',0.5,MyMaterial.WHITE,fontURL);
    this.add(githubText);

    this.pieces = [];

    for(var i=0; i<6; i++){
      var piece = new MyPiece(0,0);
      this.pieces.push(piece);
      this.add(piece);
    }

    var origin = { p : 45 } ;
    var destiny = { p : -25 } ;
    var that = this;

    this.gravityAnimation = new TWEEN.Tween(origin)
      .to(destiny, 4000)
      .onStart (function(){
        for(var i=0;i<that.pieces.length;i++){
          var random = (i%2)-1;
          if(random == 0) random = 1;
          var posX = that.random(19,0) * random;
          var posZ = -that.random(35,10);
          that.pieces[i].position.x = posX;
          that.pieces[i].position.z = posZ;
        }
      })
      .onUpdate (function(){
        for(var i=0;i<that.pieces.length;i++){
          that.pieces[i].position.y = origin.p*(0.5 + i/10);
          if(origin.p == destiny.p){
            that.remove(that.pieces[i]);
            var random = (i%2)-1;
            if(random == 0) random = 1;
            var posX = that.random(19,0) * random;
            var posZ = -that.random(35,10);

            console.log(posX);
            that.pieces[i] = new MyPiece(posX,0);
            that.pieces[i].position.z = posZ;
            that.add(that.pieces[i]);
          }
        }
      })
      .repeat(Infinity)
      .start();
  }

  random(max , min) {
    var n = Math.round(-min + (Math.random() * ((max - (-min)) + 1)));
    return n;
  }

  update(){
    this.title.update();
    TWEEN.update();
  }
}
