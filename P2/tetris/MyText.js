class MyText extends THREE.Object3D {
  constructor(pos, text, size) {
    super();

    var that = this;

    var loader = new THREE.FontLoader();

    loader.load('../fonts/helvetiker_regular.typeface.json', function ( font ) {

    	var geometry = new THREE.TextGeometry( text, {
    		font: font,
    		size: size,
    		height: size/5,
    		curveSegments: 12,
    		bevelEnabled: true,
    		bevelThickness: size/5,
    		bevelSize: size/20,
    		bevelOffset: 0,
    		bevelSegments: 2
    	} );

      var material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, pos.y, pos.z);

      that.add(mesh);
    } );
  }
}
