

class MyReloj extends THREE.Object3D {
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

    this.rotando = true;

    //Modelo jerárquico

    var size = new THREE.Vector3(1, 10.0, 10.0);
    var distancia = 15;

    this.esferaRojaA =  this.esfera(size, materialRojo);
    this.esferaRojaA.position.set(0,0,-(distancia - 2*size.x));

    this.esferaRojaB =   new THREE.Object3D();
    this.esferaRojaB.add(this.esferaRojaA);

    this.reloj = new THREE.Object3D();
    this.reloj.add(this.esferaRojaB);

    var i;
    for (i = 0; i < 2*Math.PI; i+=Math.PI/6) {
      var hora = this.esfera(size, materialVerde);
      hora.position.set(distancia * Math.cos(i), 0, distancia * Math.sin(i));
      this.reloj.add(hora);
    }

    //Nodo final
    this.add(this.reloj);

    this.tiempoAnterior = Date.now();

    }

    esfera(size, material){
      var esferaGeom = new THREE.SphereGeometry(size.x, size.y, size.z);

      // Ya podemos construir el Mesh
      var esfera = new THREE.Mesh (esferaGeom, material);

      return esfera;
    }


    createGUI (gui) {

      // La escena le va a añadir sus propios controles.
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        this.velocidad = 0;
      }

      var folder = gui.addFolder("Controles de la Animación");
      folder.add (this.guiControls, 'velocidad', -12, 12, 1).name ('Marcas/s : ').listen();

    }

    update () {
      var tiempoActual = Date.now();
      var segundos = (tiempoActual - this.tiempoAnterior)/1000;
      this.esferaRojaB.rotation.y += segundos * this.guiControls.velocidad*Math.PI/6;
      this.tiempoAnterior = tiempoActual;
    }
}
