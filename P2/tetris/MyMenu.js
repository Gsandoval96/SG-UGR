class MyMenu extends THREE.Object3D {
  constructor() {
    super();

    var titlePos = new THREE.Vector3(-9,16,3);
    this.title = new MyTitle(titlePos,5,true);
    this.add(this.title);

    var pos = new THREE.Vector3(3,7,1);
    var adjust = new THREE.Vector3(2,3,1);
    this.keyPLAY = new MyKeyObj(pos,30,15,'PLAY', adjust);
    this.add(this.keyPLAY);



  }

  update(){
    this.title.update();
  }
}
