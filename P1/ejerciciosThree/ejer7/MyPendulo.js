

class MyPendulo extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    //Variables de animación

    this.escaladoPequeño = true;
    this.rotPequeño = true;

    //Modelo jerárquico

    this.pequeñoA = this.penduloPequeño();
    this.pequeñoA.position.y = -5;

    this.pequeñoAB = new THREE.Object3D();
    this.pequeñoAB.add(this.pequeñoA);
    //this.pequeñoAB.position.y = 1;
    this.pequeñoAB.position.z = 1.5;

    this.tuercaPequeña = this.tuerca();
    this.tuercaPequeña.position.set(0,-1,2);

    this.penduloPequeño = new THREE.Object3D();
    this.penduloPequeño.add(this.pequeñoAB);
    this.penduloPequeño.add(this.tuercaPequeña);
    this.penduloPequeño.position.y = -this.guiControls.scaleYgrande*0.1;

    // Como material se crea uno a partir de un color
    var materialRojo = new THREE.MeshBasicMaterial({color: 0x0ff0000});
    var size = new THREE.Vector3(4,5,2);
    this.cajaRojaA = this.caja(size,materialRojo);
    this.cajaRojaA.position.y = -2.5;

    this.cajaRojaAB = new THREE.Object3D();
    this.cajaRojaAB.add(this.cajaRojaA);

    var materialVerde = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var size = new THREE.Vector3(4,4,2);
    this.cajaVerdeA = this.caja(size,materialVerde);
    //this.cajaVerdeA.position.y = -2;

    this.cajaVerdeAB = new THREE.Object3D();
    this.cajaVerdeAB.add(this.cajaVerdeA);

    this.unionPendulo = new THREE.Object3D();
    this.unionPendulo.add (this.cajaRojaAB);
    this.unionPendulo.add (this.cajaVerdeAB);
    this.unionPendulo.add (this.penduloPequeño);

    //Nodo final
    this.add(this.unionPendulo);
    }

    caja(size, material){
      var cajaGeom = new THREE.BoxGeometry (size.x,size.y,size.z);

      var caja = new THREE.Mesh (cajaGeom, material);

      return caja;
    }

    penduloPequeño(){
      var penduloGeom = new THREE.BoxGeometry (2,10,1);

      // Como material se crea uno a partir de un color
      var penduloMat = new THREE.MeshBasicMaterial({color: 0x0000ff});

      // Ya podemos construir el Mesh
      var pendulo = new THREE.Mesh (penduloGeom, penduloMat);

      return pendulo;
    }

    tuerca(){
      var tuercaGeom = new THREE.SphereGeometry( 0.25, 10.0, 10.0);
      // Como material se crea uno a partir de un color
      var tuercaMat = new THREE.MeshPhongMaterial({color: 0xffff00});

      // Ya podemos construir el Mesh
      var tuerca = new THREE.Mesh (tuercaGeom, tuercaMat);

      return tuerca;
    }


    createGUI (gui) {

      // La escena le va a añadir sus propios controles.
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        this.animacionOnOff = true;
        this.rotZpequeño = 0;
        this.scaleYpequeño = 10;
        this.scaleYgrande = 5;
      }

      // Se crea una sección para los controles de esta clase
      var folderPenduloPequeño = gui.addFolder ("Péndulo Pequeño");
      // Y otro para mostrar u ocultar los ejes
      folderPenduloPequeño.add (this.guiControls, 'rotZpequeño', -Math.PI/4, Math.PI/4, Math.PI/180).name ('Rotación Z : ').listen();
      folderPenduloPequeño.add (this.guiControls, 'scaleYpequeño', 10.0, 20.0, 0.1).name ('Tamaño Y : ').listen();

      var folderPenduloGrande = gui.addFolder ("Péndulo Grande");
      folderPenduloGrande.add (this.guiControls, 'scaleYgrande', 5.0, 10.0, 0.1).name ('Tamaño Y: ').listen();

      var folder = gui.addFolder("Controles de la Animación");
      folder.add (this.guiControls, 'animacionOnOff').name ('Animación activa : ');

  }

  update () {
    this.penduloPequeño.rotation.z = this.guiControls.rotZpequeño;
    this.penduloPequeño.position.y = -this.guiControls.scaleYgrande*0.1;
    this.cajaVerdeAB.position.y = -this.guiControls.scaleYgrande -2;
    this.cajaRojaAB.scale.set(1,this.guiControls.scaleYgrande/5,1);
    this.pequeñoAB.scale.set(1,this.guiControls.scaleYpequeño/10,1);

    /*if (this.guiControls.animacionOnOff){

      if(this.guiControls.scaleYpequeño < 20 && this.escaladoPequeño){
        this.guiControls.scaleYpequeño += 0.1;
        if(this.guiControls.scaleYpequeño >= 20) this.escaladoPequeño = false;
      }
      else if(this.guiControls.scaleYpequeño > 10 && !this.escaladoPequeño){
        this.guiControls.scaleYpequeño -= 0.1;
        if(this.guiControls.scaleYpequeño <= 10) this.escaladoPequeño = true;
      }

      if(this.guiControls.rotZpequeño < Math.PI/4 && this.rotPequeño){
        this.guiControls.rotZpequeño += Math.PI/180;
        if(this.guiControls.rotZpequeño >= Math.PI/4) this.rotPequeño = false;
      }
      else if(this.guiControls.rotZpequeño > -Math.PI/4 && !this.rotPequeño){
        this.guiControls.rotZpequeño -= Math.PI/180;
        if(this.guiControls.rotZpequeño <= -Math.PI/4) this.rotPequeño = true;
      }
    }*/

  }
}
