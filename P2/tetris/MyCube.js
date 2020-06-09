

class MyCube extends THREE.Object3D {
  constructor(pos, material, size){
    super();

    //var SIZE = 1;
    var edgeSize = 0.05;

    // Creamos la geometría y la colocamos en el 0,0,0
    var boxGeom = new THREE.BoxGeometry (size.x-edgeSize,size.y-edgeSize,size.z-edgeSize);
    boxGeom.translate(size.x/2, size.y/2, size.z/2);

    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, material);
    this.box.position.set(pos.x, pos.y, pos.z);

    // Y añadirlo como hijo del Object3D
    this.add (this.box);
  }
}
