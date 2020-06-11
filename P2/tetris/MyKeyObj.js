

class MyKeyObj extends THREE.Object3D {
  constructor(pos, sizeX, sizeY, key, adjust){
    super();

    this.selected = false;

    this.pos = pos;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.key = key;

    this.keyObj = new THREE.Object3D();

    var positionWhite = new THREE.Vector3(0,0,0);
    var roundWhite = new MyRoundShape(positionWhite, sizeX, sizeY, sizeY/5, 0.5, MyMaterial.WHITE);

    roundWhite.userData = this;

    this.positionBlack = new THREE.Vector3(0.25, 0.25,0.125);
    this.roundBlack = new MyRoundShape(this.positionBlack, sizeX-0.5, sizeY-0.5, sizeY/5, 0.5, MyMaterial.BLACK);

    this.roundBlack.userData = this;

    this.fontURL = '../fonts/helvetiker_regular.typeface.json';
    this.textPosition = adjust;
    this.keyText = new MyText(this.textPosition,key,sizeY/2,MyMaterial.WHITE,this.fontURL);

    this.keyText.userData = this;

    this.keyObj.add(roundWhite);
    this.keyObj.add(this.roundBlack);
    this.keyObj.add(this.keyText);

    this.keyObj.scale.set(0.2,0.2,0.2);
    this.keyObj.position.set(pos.x,pos.y,pos.z);
    this.add(this.keyObj);
  }

  select(){
    this.keyText.children[0].material= MyMaterial.BLACK;
    this.roundBlack.children[0].material= MyMaterial.WHITE;
    this.selected = true;
  }

  deselect(){
    this.keyText.children[0].material= MyMaterial.WHITE;
    this.roundBlack.children[0].material= MyMaterial.BLACK;
    this.selected = false;
  }


}
