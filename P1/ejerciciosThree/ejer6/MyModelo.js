
class MyModelo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    var that = this;
    var materialLoader = new THREE.MTLLoader();
    var objectLoader = new THREE.OBJLoader();
    materialLoader.load('../models/IronMan/IronMan.mtl',
      function(materials){
        objectLoader.setMaterials(materials);
        objectLoader.load('../models/IronMan/IronMan.obj',
      function(object){
        var modelo = object;
        that.add (modelo);
      }, null, null);
    });

    this.scale.set(0.04,0.04,0.04);

  }

  createGUI (gui,titleGui) {

    // La escena le va a añadir sus propios controles.
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      this.animacionOnOff = true;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder (titleGui);
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'animacionOnOff').name ('Animación activa : ');
  }


  update () {
    if(this.guiControls.animacionOnOff){
      this.rotation.y += 0.01;
    }
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
