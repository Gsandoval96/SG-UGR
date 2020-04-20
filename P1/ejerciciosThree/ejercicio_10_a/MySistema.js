

class MySistema extends THREE.Object3D {
  constructor(camaraPos) {
    super();

    this.camara_posicion = camaraPos;

    this.tiempoAnterior = Date.now();

    this.velocidadRotacion = 1;

    //Materiales
    var materialTierra = new String('../imgs/tierra.jpg');
    var materialCara = new String('../imgs/cara.jpg');

    // Órbitas
    var primeraOrbita_size = new THREE.Vector2(10, 32);
    this.primeraOrbita = this.orbita(primeraOrbita_size);
    this.primeraOrbita.rotation.x = Math.PI/2;

    var segundaOrbita_size = new THREE.Vector2(20, 32);
    this.segundaOrbita = this.orbita(segundaOrbita_size);
    this.segundaOrbita.rotation.x = Math.PI/2;

    var terceraOrbita_size = new THREE.Vector2(30, 32);
    this.terceraOrbita = this.orbita(terceraOrbita_size);
    this.terceraOrbita.rotation.x = Math.PI/2;

    this.add(this.primeraOrbita);
    this.add(this.segundaOrbita);
    this.add(this.terceraOrbita);

    //Modelo jerárquico
    var tierra_size = new THREE.Vector2(4, 20);
    this.tierra = this.esfera(tierra_size,materialTierra);

    var planeta_size = new THREE.Vector2(2, 20);
    this.primerPlaneta = this.esfera(planeta_size,materialCara);
    this.primerPlaneta.position.x = 10;
    this.primerPlaneta.rotation.y = Math.PI;

    this.segundoPlanetaA = this.esfera(planeta_size,materialCara);
    this.segundoPlanetaA.rotation.y = 3*Math.PI/2;

    this.segundoPlanetaB = new THREE.Object3D();
    this.segundoPlanetaB.add (this.segundoPlanetaA);
    this.segundoPlanetaB.position.x = 20;

    this.tercerPlaneta = this.esfera(planeta_size,materialCara);
    this.tercerPlaneta.position.x = 30;

    this.sistema = new THREE.Object3D();

    this.sistema.add(this.primerPlaneta);
    this.sistema.add(this.segundoPlanetaB);
    this.sistema.add(this.tercerPlaneta);
    this.sistema.add(this.tierra);

    this.add(this.sistema);

  }

  orbita(size){
    var geometry = new THREE.RingGeometry( size.x - 0.05, size.x, size.y );
    var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    material.side =  THREE.DoubleSide;
    var orbita = new THREE.Mesh( geometry, material );

    return orbita;

  }

  esfera(size, ruta){
    var esferaGeom = new THREE.SphereGeometry(size.x, size.y, size.y);

    var textura = new THREE.TextureLoader().load(ruta);
    var material = new THREE.MeshPhongMaterial ({map: textura});
    // Ya podemos construir el Mesh
    var esfera = new THREE.Mesh (esferaGeom, material);

    return esfera;
  }

  update () {
    this.segundoPlanetaB.lookAt(this.camara_posicion);

    var tiempoActual = Date.now();
    var segundos = (tiempoActual - this.tiempoAnterior)/1000;
    this.sistema.rotation.y += segundos * this.velocidadRotacion;
    this.tercerPlaneta.rotation.y -= 2* segundos * this.velocidadRotacion;
    this.tiempoAnterior = tiempoActual;
  }
}
