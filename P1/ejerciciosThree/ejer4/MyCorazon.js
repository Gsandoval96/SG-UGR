

class MyCorazon extends THREE.Object3D {
  constructor() {
    super();

    var heartShape = new THREE.Shape();

    var x = -2.5;
    var y = -4.0;
    heartShape.moveTo(x + 2.5, y + 2.5);
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    heartShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    heartShape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    heartShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    heartShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    var options = {
      depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.5, bevelThickness: 0.5,bevelSegments: 2
    };

    var geometry = new THREE.ExtrudeGeometry( heartShape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var corazonMat = new THREE.MeshPhongMaterial ({map: texture});
    var corazonMat = new THREE.MeshToonMaterial( { color: 0xff0000 } );
    corazonMat.side =  THREE.DoubleSide;

    this.corazon = new THREE.Mesh( geometry, corazonMat ) ;

    this.corazon.rotation.set(Math.PI,0.0,0.0);

    this.add( this.corazon);
      }
}
