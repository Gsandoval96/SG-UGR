
class MySolido extends THREE.Object3D {
  constructor() {
    super();

    var cubo = new THREE.BoxGeometry (5,5,5);
    var cuboBSP = new ThreeBSP(cubo);

    var esfera = new THREE.SphereGeometry( 3.4, 20.0, 20.0);
    var esferaBSP = new ThreeBSP(esfera);

    var cilindro = new THREE.CylinderGeometry( 1.75, 1.75, 5, 40, 3);
    var cilindroYBSP = new ThreeBSP (cilindro);

    cilindro.rotateZ(Math.PI/2);
    var cilindroXBSP = new ThreeBSP (cilindro);

    cilindro.rotateY(Math.PI/2);
    var cilindroZBSP = new ThreeBSP (cilindro);

    //Operaciones booleanas entre geometrias
    var cruzBSP = cilindroYBSP.union (cilindroXBSP);
    var dobleCruzBSP = cruzBSP.union (cilindroZBSP);

    var interseccionBSP = cuboBSP.intersect (esferaBSP);

    var solidoBSP = interseccionBSP.subtract(dobleCruzBSP);

    //Material y Mesh
    var material = new THREE.MeshNormalMaterial();
    var solidoCSG = solidoBSP.toMesh (material);
    solidoCSG.geometry.computeFaceNormals();
    solidoCSG.geometry.computeVertexNormals();

    this.add(solidoCSG);
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
