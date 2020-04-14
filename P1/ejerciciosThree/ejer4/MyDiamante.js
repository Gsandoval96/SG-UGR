

class MyDiamante extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var x = 0, y = 0;

    var diamanteShape = new THREE.Shape();

    diamanteShape.moveTo( x , y + 6 );
    diamanteShape.lineTo( x + 4 , y );
    diamanteShape.lineTo( x , y - 6 );
    diamanteShape.lineTo( x - 4 , y );
    diamanteShape.lineTo( x , y + 6 );


    var options = {
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.3,
      bevelSegments: 3,
      curveSegments: 2,
      steps: 2
    };

    var geometry = new THREE.ExtrudeGeometry( diamanteShape, options );

    //var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    //var diamanteMat = new THREE.MeshPhongMaterial ({map: texture});
    var diamanteMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    diamanteMat.side =  THREE.DoubleSide;

    this.diamante = new THREE.Mesh( geometry, diamanteMat ) ;

    this.add( this.diamante);
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
    var diamanteGeom = new THREE.LatheGeometry( this.points, segmentos, 0, radio*2*Math.PI );
    this.diamante.geometry = diamanteGeom;
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
