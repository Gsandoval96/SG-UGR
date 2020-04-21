

class MySaltarina extends THREE.Object3D {
  constructor(gui) {
    super();

    this.createGUI(gui);

    this.subiendo = true;

    this.tiempoAnterior = Date.now();

    this.velocidadRotacion = Math.PI/2;

    var cylinderGeom = new THREE.CylinderGeometry(this.guiControls.radius, this.guiControls.radius, 20, 20);
    var cylinderMat = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    this.add(this.cylinder);

    var pelotaGeom = new THREE.SphereGeometry(1, 10, 10);
    var materialPelota = new THREE.MeshNormalMaterial();
    this.pelotaA = new THREE.Mesh(pelotaGeom, materialPelota);

    this.pelotaB = new THREE.Object3D();
    this.pelotaB.add(this.pelotaA);

    this.pelotaC = new THREE.Object3D();
    this.pelotaC.add(this.pelotaB);

    this.add(this.pelotaC);


  }

  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radius = 10;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Controles Cilindro :");
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 5, 30.0, 0.1).name ('Radio : ').onChange(function(value){that.crearNueva()});
  }

  crearNueva(){
    var cylinderGeom = new THREE.CylinderGeometry( this.guiControls.radius,this.guiControls.radius, 20, 20);
    this.cylinder.geometry = cylinderGeom;
  }

  update () {
    this.cylinder.position.y = 10;
    this.pelotaA.position.x = this.guiControls.radius;

    if(this.pelotaC.position.y < 20 && this.subiendo){
      this.pelotaC.position.y += 0.4;
      if(this.pelotaC.position.y >= 20) this.subiendo = false;
    }
    else if(this.pelotaC.position.y > 0 && !this.subiendo){
      this.pelotaC.position.y -= 0.4;
      if(this.pelotaC.position.y < 0) this.subiendo = true;
    }


    var tiempoActual = Date.now();
    var segundos = (tiempoActual - this.tiempoAnterior)/1000;
    this.pelotaB.rotation.y  += segundos * this.velocidadRotacion;
    this.tiempoAnterior = tiempoActual;
  }
}
