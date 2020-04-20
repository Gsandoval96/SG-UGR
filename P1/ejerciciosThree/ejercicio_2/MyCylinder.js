
class MyCylinder extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    // Un Mesh se compone de geometría y material
    var cylinderGeom = new THREE.CylinderGeometry( 0.5, 0.5, 1.0, 3.0);
    // Como material se crea uno a partir de un color
    var cylinderMat = new THREE.MeshPhongMaterial({color: 0xCFCF00});

    // Ya podemos construir el Mesh
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cylinder);
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radius = 0.5;
      this.height = 1.0;
      this.segments = 3.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radius = 0.5;
        this.height = 1.0;
        this.segments = 3.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio : ').onChange(function(value){that.crearNueva()});
    folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Altura : ').onChange(function(value){that.crearNueva()});
    folder.add (this.guiControls, 'segments', 3.0, 20.0, 1.0).name ('Nº Segmentos : ').onChange(function(value){that.crearNueva()});
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  crearNueva(){
    var cylinderGeom = new THREE.CylinderGeometry( this.guiControls.radius,this.guiControls.radius, this.guiControls.height, this.guiControls.segments);
    this.cylinder.geometry = cylinderGeom;
  }

  update () {
    this.rotation.y += 0.01;
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
