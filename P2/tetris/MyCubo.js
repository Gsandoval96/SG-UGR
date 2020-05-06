

class MyCubo extends THREE.Object3D {
  constructor(pos, material){
    super();

    var SIZE = 1;
    var borde = 0.05;

    // Creamos la geometría y la colocamos en el 0,0,0
    var boxGeom = new THREE.BoxGeometry (SIZE-borde,SIZE-borde,SIZE-borde);
    boxGeom.translate(SIZE/2, SIZE/2, SIZE/2);

    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, material);
    this.box.position.set(pos.x, pos.y, pos.z);

    // Y añadirlo como hijo del Object3D
    this.add (this.box);
  }

  update () {

  }

}
