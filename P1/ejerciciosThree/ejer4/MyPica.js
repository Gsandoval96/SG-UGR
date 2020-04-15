

class MyPica extends THREE.Object3D {
  constructor() {
    super();

    var picaShape = new THREE.Shape();

    var x = -2.5;
    var y = -4.0;
    picaShape.moveTo(x + 2.5, y + 2.5);
    picaShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    picaShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    picaShape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    picaShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    picaShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    picaShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    var options = {
      depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.5, bevelThickness: 0.5,bevelSegments: 2
    };

    var geometry = new THREE.ExtrudeGeometry( picaShape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var picaMat = new THREE.MeshPhongMaterial ({map: texture});
    var picaMat = new THREE.MeshToonMaterial( { color: 0x0000ff } );
    picaMat.side =  THREE.DoubleSide;

    this.pica = new THREE.Mesh( geometry, picaMat );

    this.add( this.pica);

    var x = 0, y = 0;

    var baseShape = new THREE.Shape();

    baseShape.moveTo( x , y + 3 );
    baseShape.lineTo( x + 1 , y );
    baseShape.lineTo( x - 1 , y );

    var options = {
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.3,
      bevelSegments: 3,
      curveSegments: 2,
      steps: 2
    };

    var geometry = new THREE.ExtrudeGeometry( baseShape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var baseMat = new THREE.MeshPhongMaterial ({map: texture});
    var baseMat = new THREE.MeshToonMaterial( { color: 0x0000ff } );
    baseMat.side =  THREE.DoubleSide;

    this.base = new THREE.Mesh( geometry, baseMat ) ;

    this.base.position.set(0,-5.5,0);

    this.add( this.base);

    this.position.set(0,0,0);
  }
}
