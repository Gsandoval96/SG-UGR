

class MySpin extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //Nodo AB
    this.diamanteAB = new MyDiamante();
    this.corazonAB = new MyCorazon();
    this.trebolAB = new MyTrebol();
    this.picaAB = new MyPica();

    //Nodo CD
    this.diamanteCD = new THREE.Object3D();
    this.corazonCD = new THREE.Object3D();
    this.trebolCD = new THREE.Object3D();
    this.picaCD = new THREE.Object3D();

    this.diamanteCD.position.y = 13.0;
    this.corazonCD.position.y = -13.0;
    this.trebolCD.position.x = 13.0;
    this.picaCD.position.x = -13.0;

    this.diamanteCD.add (this.diamanteAB);
    this.corazonCD.add (this.corazonAB);
    this.trebolCD.add (this.trebolAB);
    this.picaCD.add (this.picaAB);

    //Nodo Final
    this.add (this.diamanteCD);
    this.add (this.corazonCD);
    this.add (this.trebolCD);
    this.add (this.picaCD);

    }


    createGUI (gui,titleGui) {

    var that = this;

    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.segments = 12.0;
      this.radius = 1.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.segments = 12.0;
        this.radius = 1.0;
        that.crearNueva(this.segments, this.radius);
        console.log("HOLA");
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'segments', 3.0, 20.0, 1.0).name ('Nº Segmentos : ').onChange(function(value){that.crearNueva(that.guiControls.segments,that.guiControls.radius)});
    folder.add (this.guiControls, 'radius', -0.001, 1, 0.001).name ('Radio : ').onChange(function(value){that.crearNueva(that.guiControls.segments, that.guiControls.radius)});
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  crearNueva(segmentos, radio){
    var trebolGeom = new THREE.LatheGeometry( this.points, segmentos, 0, radio*2*Math.PI );
    this.trebol.geometry = trebolGeom;
  }

  update () {

    this.rotation.z += 0.01;

    this.diamanteCD.rotation.z -= 0.01;
    this.corazonCD.rotation.z -= 0.01;
    this.trebolCD.rotation.z -= 0.01;
    this.picaCD.rotation.z -= 0.01;

    this.diamanteAB.rotation.y += 0.01;
    this.corazonAB.rotation.y += 0.01;
    this.trebolAB.rotation.y += 0.01;
    this.picaAB.rotation.y += 0.01;
  }
}
