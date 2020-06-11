class MyMaterial {

  static loader = new THREE. TextureLoader ( ) ;
  static textura = MyMaterial.loader.load ( '../img/brick.jpg' ) ;

  static REDBRICK = new THREE.MeshStandardMaterial({color: 0xFF0000, map:MyMaterial.textura});
  static GREENBRICK = new THREE.MeshStandardMaterial({color: 0x00FF00, map:MyMaterial.textura});
  static BLUEBRICK = new THREE.MeshStandardMaterial({color: 0x0000FF, map:MyMaterial.textura});

  static CYANBRICK = new THREE.MeshStandardMaterial({color: 0x00FFFF, map:MyMaterial.textura});
  static YELLOWBRICK = new THREE.MeshStandardMaterial({color: 0xFFFF00, map:MyMaterial.textura});
  static PURPLEBRICK = new THREE.MeshStandardMaterial({color: 0xFF00FF, map:MyMaterial.textura});

  static ORANGEBRICK = new THREE.MeshStandardMaterial({color: 0xFF8000, map:MyMaterial.textura});

  static RED = new THREE.MeshStandardMaterial({color: 0xFF0000});
  static GREEN = new THREE.MeshStandardMaterial({color: 0x00FF00});
  static BLUE = new THREE.MeshStandardMaterial({color: 0x0000FF});

  static CYAN = new THREE.MeshStandardMaterial({color: 0x00FFFF});
  static YELLOW = new THREE.MeshStandardMaterial({color: 0xFFFF00});
  static PURPLE = new THREE.MeshStandardMaterial({color: 0xFF00FF});

  static ORANGE = new THREE.MeshStandardMaterial({color: 0xFF8000});

  static WHITE = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  static BLACK = new THREE.MeshStandardMaterial({color: 0x000000});
}
