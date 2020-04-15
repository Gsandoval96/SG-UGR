

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
    var diamanteMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    diamanteMat.side =  THREE.DoubleSide;

    this.diamante = new THREE.Mesh( geometry, diamanteMat ) ;

    this.add( this.diamante);
    }

  update () {
    //this.rotation.y += 0.01;
    this.rotation.z -= 0.01;
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}
