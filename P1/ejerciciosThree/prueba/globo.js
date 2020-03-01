
class Globo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.globo = new THREE.Object3D();
    this.subir = true;

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    var texture = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    this.material = new THREE.MeshPhongMaterial ({map: texture});

    // Creamos la figura
    //this.createCaja();
    this.createEsfera();

    var texturePalo = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    var materialPalo = new THREE.MeshPhongMaterial ({map: texturePalo});
    var palo = new THREE.Mesh (new THREE.BoxGeometry( 0.05, 4, 0.05 ), materialPalo);

    // Aquí se añaden los distintos componenetes al nodo globo
    this.add (this.globo);
    this.add (palo);
  }

  createEsfera() {

    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var esferaBase = new THREE.Mesh (new THREE.SphereGeometry( 0.6, 32, 32 ), this.material);

    this.globo.position.x = 0.0;
    this.globo.position.y = 2.0;
    this.globo.position.z = 0.0;
    this.globo.add(esferaBase);
  }

  createCaja() {


    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (1,1,1), this.material);



    this.globo.position.x = 0.0;
    this.globo.position.y = 2.0;
    this.globo.position.z = 0.0;
    this.globo.add(cajaBase);
  }

  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
      this.rotacion = 0;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'rotacion', -0.1, 0.125, 0.001).name ('Apertura : ');
  }

  update () {
    // Se actualiza

    if(this.globo.position.y<2.5 && this.subir){
      this.globo.position.y+=0.01;
    }

    if(this.globo.position.y>=2.5 && this.subir){
      this.subir = false;
    }

    if(this.globo.position.y>1.8 && !this.subir){
      this.globo.position.y-=0.01;
    }

    if(this.globo.position.y<=1.8 && !this.subir){
      this.subir = true;
    }

    this.globo.rotation.y+=0.01;


  }
}
