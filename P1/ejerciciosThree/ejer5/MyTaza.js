
class MyTaza extends THREE.Object3D {
  constructor() {
    super();

    // Un Mesh se compone de geometría y material
    var cilindroExterior = new THREE.CylinderGeometry( 2.5, 2.5, 5, 40, 3);
    var cilindroInterior = new THREE.CylinderGeometry( 2.25, 2, 5, 40, 3);
    var toro = new THREE.TorusGeometry( 1.5, 0.5, 15.0, 30.0);

    toro.translate (2.5,0,0);
    cilindroInterior.translate(0,0.5,0);

    var cilindroExteriorBSP = new ThreeBSP (cilindroExterior);
    var cilindroInteriorBSP = new ThreeBSP (cilindroInterior);
    var toroBSP = new ThreeBSP (toro);

    var partialResult = cilindroExteriorBSP.union(toroBSP);
    var tazaBSP = partialResult.subtract(cilindroInteriorBSP);

    var material = new THREE.MeshNormalMaterial();

    var taza = tazaBSP.toMesh (material);
    taza.geometry.computeFaceNormals();
    taza.geometry.computeVertexNormals();

    this.add(taza)
  }

  update () {
    this.rotation.y += 0.01;
    this.rotation.z += 0.01;
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    //this.scale.set(2*this.guiControls.radius,this.guiControls.height,2*this.guiControls.radius);
  }


}
