

class MySpin extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.diamante = new MyDiamante();
    this.diamante.position.y = 10.0;
    this.diamante.position.x = -10.0;
    this.add (this.diamante);

    this.corazon = new MyCorazon();
    this.corazon.position.y = -10.0;
    this.corazon.position.x = 10.0;
    this.add (this.corazon);

    this.trebol = new MyTrebol();
    this.trebol.position.y = 8.0;
    this.trebol.position.x = 8.0;
    this.add (this.trebol);

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

    // Se actualiza el resto del modelo
    this.diamante.update();
    this.corazon.update();
    this.trebol.update();
  }
}
