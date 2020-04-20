

class MyDiamante extends THREE.Object3D {
  constructor() {
    super();

    var x = 0, y = 0;

    var diamanteShape = new THREE.Shape();

    diamanteShape.moveTo( x , y + 6 );
    diamanteShape.lineTo( x + 4 , y );
    diamanteShape.lineTo( x , y - 6 );
    diamanteShape.lineTo( x - 4 , y );
    diamanteShape.lineTo( x , y + 6 );


    var options = {
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.3,
      bevelSegments: 3,
      curveSegments: 2,
      steps: 2
    };

    var geometry = new THREE.ExtrudeGeometry( diamanteShape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var diamanteMat = new THREE.MeshPhongMaterial ({map: texture});
    var diamanteMat = new THREE.MeshToonMaterial( { color: 0xff0000 } );
    diamanteMat.side =  THREE.DoubleSide;

    this.diamante = new THREE.Mesh( geometry, diamanteMat ) ;

    this.add( this.diamante);
    }
}
