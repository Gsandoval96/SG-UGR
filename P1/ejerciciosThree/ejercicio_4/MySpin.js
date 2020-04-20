

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

    if (this.guiControls.animacionOnOff){
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
}
