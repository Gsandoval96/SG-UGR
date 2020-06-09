class MyTitle extends THREE.Object3D {
  constructor(pos, size) {
    super();

    var materialBlue = new THREE.MeshStandardMaterial({color: 0x00FFFF});
    var materialOrange = new THREE.MeshStandardMaterial({color: 0xFF8000});
    var materialGreen = new THREE.MeshStandardMaterial({color: 0x00FF00});
    var materialRed = new THREE.MeshStandardMaterial({color: 0xFF0000});
    var materialPurple = new THREE.MeshStandardMaterial({color: 0xFF00FF});
    var materialYellow = new THREE.MeshStandardMaterial({color: 0xFFFF00});

    var posT1 = new THREE.Vector3(pos.x, pos.y, pos.z);
    var posE = new THREE.Vector3(pos.x+size, pos.y, pos.z);
    var posT2 = new THREE.Vector3(pos.x+size*2, pos.y, pos.z);
    var posR = new THREE.Vector3(pos.x+size*3, pos.y, pos.z);
    var posI = new THREE.Vector3(pos.x+size*4, pos.y, pos.z);
    var posS = new THREE.Vector3(pos.x+size*4 +size/2, pos.y, pos.z);

    var t1 = new MyText(posT1, 'T', size, materialRed);
    var e = new MyText(posE, 'E', size, materialOrange);
    var t2 = new MyText(posT2, 'T', size, materialYellow);
    var r = new MyText(posR, 'R', size, materialGreen);
    var i = new MyText(posI, 'I', size, materialBlue);
    var s = new MyText(posS, 'S', size, materialPurple);

    var tetris = new THREE.Object3D();
    tetris.add(t1);
    tetris.add(e);
    tetris.add(t2);
    tetris.add(r);
    tetris.add(i);
    tetris.add(s);

    this.add(tetris);
  }
}
