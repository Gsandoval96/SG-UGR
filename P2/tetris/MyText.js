class MyText extends THREE.Object3D {
  constructor(pos, text, size, mat) {
    super();

    var that = this;

    var loader = new THREE.FontLoader();

    loader.load('../fonts/helvetiker_regular.typeface.json', function ( font ) {

    	var geometry = new THREE.TextGeometry( text, {
    		font: font,
    		size: size,
    		height: size/5,
    		curveSegments: 5,
    		bevelEnabled: true,
    		bevelThickness: size/5,
    		bevelSize: size/20,
    		bevelOffset: 0,
    		bevelSegments: 2
    	} );

      var mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(pos.x, pos.y, pos.z);

      that.add(mesh);
    } );
  }
}
