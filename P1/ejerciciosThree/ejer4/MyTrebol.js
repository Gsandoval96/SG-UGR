

class MyTrebol extends THREE.Object3D {
  constructor() {
    super();

    var cirCentral = this.crearCirculo (0, 4, 2.5);
    var cirDer = this.crearCirculo (2, 0, 2.5);
    var cirIzq = this.crearCirculo (-2, 0, 2.5);

    this.add(cirCentral);
    this.add(cirDer);
    this.add(cirIzq);



    var x = 0, y = 0;

    var baseShape = new THREE.Shape();

    baseShape.moveTo( x , y + 1.5 );
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
    var baseMat = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    baseMat.side =  THREE.DoubleSide;

    this.base = new THREE.Mesh( geometry, baseMat ) ;

    this.base.position.set(0,-3.25,0);

    this.add( this.base);

    this.position.set(0,0,0);

    }

  crearCirculo (posX, posY, radio){
    var shape = new THREE.Shape();

    shape.absarc (posX, posY, radio, 0, 2*Math.PI);

    var options = {
      steps: 1,
      depth: 1,
      bevelEnabled: false
    };

    var geometry = new THREE.ExtrudeGeometry( shape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var trebolMat = new THREE.MeshPhongMaterial ({map: texture});
    var Mat = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    Mat.side =  THREE.DoubleSide;

    var circle = new THREE.Mesh( geometry, Mat ) ;
    return circle;
  }
}
