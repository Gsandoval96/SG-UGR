

class MyPendulo extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    //Materiales
    var materialAzul = new THREE.MeshPhongMaterial({color: 0x31509B});
    var materialVerde = new THREE.MeshPhongMaterial({color: 0x2F8823});
    var materialGris = new THREE.MeshPhongMaterial({color: 0x6D6D6D});
    var materialRojo = new THREE.MeshPhongMaterial({color: 0xAA1111});

    //Variables de animación

    this.rotPequeño = true;
    this.rotGrande = true;

    //Modelo jerárquico

    this.pequeño_size = new THREE.Vector3(2,10,1);
    this.pequeñoA = this.caja(this.pequeño_size, materialAzul);
    this.pequeñoA.position.set(0, -this.pequeño_size.y/2, this.pequeño_size.z/2);

    this.pequeñoB = new THREE.Object3D();
    this.pequeñoB.add(this.pequeñoA);
    this.pequeñoB.position.y = this.pequeño_size.y/10;

    this.tuercaPequeña_size = new THREE.Vector3(0.25, 10.0, 10.0);
    this.tuercaPequeña = this.tuerca(this.tuercaPequeña_size, materialGris);
    this.tuercaPequeña.position.z = this.pequeño_size.z;

    this.cajaRoja_size = new THREE.Vector3(4,5,2);
    this.cajaRojaA = this.caja(this.cajaRoja_size,materialRojo);
    this.cajaRojaA.position.set(0,-this.cajaRoja_size.y/2,this.cajaRoja_size.z/2);

    this.cajaRojaB = new THREE.Object3D();
    this.cajaRojaB.add(this.cajaRojaA);

    this.cajaVerde_size = new THREE.Vector3(4,4,2);
    this.cajaVerdeInf = this.caja(this.cajaVerde_size,materialVerde);
    this.cajaVerdeInf.position.z = this.cajaVerde_size.z/2;

    this.penduloPequeño = new THREE.Object3D();
    this.penduloPequeño.add(this.pequeñoB);
    this.penduloPequeño.add(this.tuercaPequeña);

    this.cajaVerdeSup= this.caja(this.cajaVerde_size,materialVerde);
    this.cajaVerdeSup.position.z = this.cajaVerde_size.z/2;

    this.tuercaGrande_size = new THREE.Vector3(0.75, 10.0, 10.0);
    this.tuercaGrande = this.tuerca(this.tuercaGrande_size, materialGris);
    this.tuercaGrande.position.z = this.cajaVerde_size.z;

    this.unionPendulo = new THREE.Object3D();
    this.unionPendulo.add(this.penduloPequeño);
    this.unionPendulo.add(this.cajaRojaB);
    this.unionPendulo.add(this.cajaVerdeInf);
    this.unionPendulo.position.y = -this.cajaVerde_size.y/2;

    this.pendulo = new THREE.Object3D();
    this.pendulo.add(this.tuercaGrande);
    this.pendulo.add(this.cajaVerdeSup);
    this.pendulo.add(this.unionPendulo);

    //Nodo final
    this.add(this.pendulo);

    }

    caja(size, material){
      var cajaGeom = new THREE.BoxGeometry (size.x,size.y,size.z);

      var caja = new THREE.Mesh (cajaGeom, material);

      return caja;
    }

    tuerca(size, material){
      var tuercaGeom = new THREE.SphereGeometry(size.x, size.y, size.z);

      // Ya podemos construir el Mesh
      var tuerca = new THREE.Mesh (tuercaGeom, material);

      return tuerca;
    }


    createGUI (gui) {

      // La escena le va a añadir sus propios controles.
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        this.animacionPequeño = false;
        this.animacionGrande = false;

        this.porcentaje = 10;
        this.rotZpequeño = 0;
        this.rotZgrande = 0;
        this.scaleYpequeño = 10;
        this.scaleYgrande = 5;

        this.velocidadRotacionPequeño = 1;
        this.velocidadRotacionGrande = 1;
      }

      // Se crea una sección para los controles de esta clase
      var folderPenduloPequeño = gui.addFolder ("Péndulo Pequeño");
      // Y otro para mostrar u ocultar los ejes
      folderPenduloPequeño.add (this.guiControls, 'rotZpequeño', -Math.PI/4, Math.PI/4, Math.PI/180*this.guiControls.velocidadRotacionPequeño).name ('Rotación Z : ').listen();
      folderPenduloPequeño.add (this.guiControls, 'scaleYpequeño', 10, 20, 0.1).name ('Tamaño Y : ').listen();
      folderPenduloPequeño.add (this.guiControls, 'porcentaje', 10, 90, 1).name ('% : ').listen();

      var folderPenduloGrande = gui.addFolder ("Péndulo Grande");
      folderPenduloGrande.add (this.guiControls, 'rotZgrande', -Math.PI/4, Math.PI/4, Math.PI/180*this.guiControls.velocidadRotacionGrande).name ('Rotación Z : ').listen();
      folderPenduloGrande.add (this.guiControls, 'scaleYgrande', 5,10, 0.1).name ('Tamaño Y: ').listen();

      var folder = gui.addFolder("Controles de la Animación");
      var velocidad = new THREE.Vector3(0.1, 5, 0.1);
      folder.add (this.guiControls, 'animacionPequeño').name ('Animación pequeño : ');
      folder.add (this.guiControls, 'velocidadRotacionPequeño', velocidad.x, velocidad.y, velocidad.z).name ('Velocidad Pequeño : ').listen();
      folder.add (this.guiControls, 'animacionGrande').name ('Animación grande : ');
      folder.add (this.guiControls, 'velocidadRotacionGrande', velocidad.x, velocidad.y, velocidad.z).name ('Velocidad Grande : ').listen();


  }

  update () {
    this.pequeñoB.scale.set(1, this.guiControls.scaleYpequeño / this.pequeño_size.y, 1);
    this.penduloPequeño.rotation.z = this.guiControls.rotZpequeño;
    this.penduloPequeño.position.set(0, -this.guiControls.scaleYgrande * this.guiControls.porcentaje/100, this.cajaRoja_size.z);
    this.cajaRojaB.scale.set(1, this.guiControls.scaleYgrande / this.cajaRoja_size.y, 1);
    this.cajaVerdeInf.position.y = -this.guiControls.scaleYgrande - this.cajaVerde_size.y/2;
    this.pendulo.rotation.z = this.guiControls.rotZgrande;


    if (this.guiControls.animacionPequeño){

      if(this.guiControls.rotZpequeño < Math.PI/4 && this.rotPequeño){
        this.guiControls.rotZpequeño += Math.PI/180*this.guiControls.velocidadRotacionPequeño;
        if(this.guiControls.rotZpequeño >= Math.PI/4) this.rotPequeño = false;
      }
      else if(this.guiControls.rotZpequeño > -Math.PI/4 && !this.rotPequeño){
        this.guiControls.rotZpequeño -= Math.PI/180*this.guiControls.velocidadRotacionPequeño;
        if(this.guiControls.rotZpequeño <= -Math.PI/4) this.rotPequeño = true;
      }

    }

    if (this.guiControls.animacionGrande){

      if(this.guiControls.rotZgrande < Math.PI/4 && this.rotGrande){
        this.guiControls.rotZgrande += Math.PI/180*this.guiControls.velocidadRotacionGrande;
        if(this.guiControls.rotZgrande >= Math.PI/4) this.rotGrande = false;
      }
      else if(this.guiControls.rotZgrande > -Math.PI/4 && !this.rotGrande){
        this.guiControls.rotZgrande -= Math.PI/180*this.guiControls.velocidadRotacionGrande;
        if(this.guiControls.rotZgrande <= -Math.PI/4) this.rotGrande = true;
      }
    }
  }
}
