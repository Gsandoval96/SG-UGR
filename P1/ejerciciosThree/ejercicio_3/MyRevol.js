

class MyRevol extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.points = [];
    for ( var i = 0; i < 10; i ++ ) {
    	this.points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 10 ) * 2 ) );
    }
    var revolGeom = new THREE.LatheGeometry( this.points, 12, 0, 2*Math.PI );
    var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    var revolMat = new THREE.MeshPhongMaterial ({map: texture});
    revolMat.side =  THREE.DoubleSide;
    this.revol = new THREE.Mesh( revolGeom, revolMat );

    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.revol);
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
    var revolGeom = new THREE.LatheGeometry( this.points, segmentos, 0, radio*2*Math.PI );
    this.revol.geometry = revolGeom;
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
    //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}
