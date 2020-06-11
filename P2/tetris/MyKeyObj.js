

class MyKeyObj extends THREE.Object3D {
  constructor(pos, sizeX, sizeY, key, adjust){
    super();

    this.keyObj = new THREE.Object3D();

    var positionWhite = new THREE.Vector3(0,0,0);
    var roundWhite = new MyRoundShape(positionWhite, sizeX, sizeY, sizeY/5, 0.5, MyMaterial.WHITE);

    var positionBlack = new THREE.Vector3(0.25, 0.25,0.125);
    var roundBlack = new MyRoundShape(positionBlack, sizeX-0.5, sizeY-0.5, sizeY/5, 0.5, MyMaterial.BLACK);

    var fontURL = '../fonts/helvetiker_regular.typeface.json';
    var textPosition = adjust;
    var keyText = new MyText(textPosition,key,sizeY/2,MyMaterial.WHITE,fontURL);

    this.keyObj.add(roundWhite);
    this.keyObj.add(roundBlack);
    this.keyObj.add(keyText);

    this.keyObj.scale.set(0.2,0.2,0.2);
    this.keyObj.position.set(pos.x,pos.y,pos.z);
    this.add(this.keyObj);
  }
}
