class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Creamos las luces
    this.createLights ();

    // Creamos las cámaras
    this.createCamera ();
    this.camera = 1;

    // Creamos el tablero y lo añadimos a la escena
    this.game = new MyGame();
    //this.add (this.game);

    this.menu = new MyMenu();
    this.add (this.menu);

    this.pickableObjects = [];
    this.pickableObjects.push(this.menu.keyPLAY);

    this.controls = new MyControls();

    // Creamos y gestionamos el audio que sonará de fondo
    this.listener = new THREE.AudioListener();
    var sound = new THREE.Audio( this.listener );
    var file = '../audio/tetris-99.mp3';

    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( file, function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( true );
      sound.setVolume( 0.1 );
      sound.play();
    });

  }

  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.freeCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.freeCam.position.set (6, 10.5, 35);
    // Y hacia dónde mira
    var lookFree = new THREE.Vector3 (6, 10.5, 0);
    this.freeCam.lookAt(lookFree);

    this.add (this.freeCam);

    this.frontCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.frontCam.position.set (6, 10.5, 35);
    var lookFront = new THREE.Vector3 (6, 10.5, 0);
    this.frontCam.lookAt(lookFront);

    this.add (this.frontCam);

    this.sideCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.sideCam.position.set (20, 10.5, 35);
    var lookSide = new THREE.Vector3 (5, 10.5, 0);
    this.sideCam.lookAt(lookSide);

    this.add (this.sideCam);

    this.upsideDownCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.upsideDownCam.position.set (5, 10.5, 35);
    var lookDown = new THREE.Vector3 (5, 10.5, 0);
    var up = new THREE.Vector3(0,-1,0);
    this.upsideDownCam.up = up;
    this.upsideDownCam.lookAt(lookDown);

    this.add (this.upsideDownCam);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.freeCam, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = lookFree;
  }

  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    var lightIntensity = 0.5;
    this.spotLight = new THREE.SpotLight( 0xffffff, lightIntensity );
    this.spotLight.position.set( 0, 35, 100 );
    this.add (this.spotLight);
  }

  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera () {
    var cam;
    switch (this.camera){
      case 1:
        cam = this.freeCam;
      break;
      case 2:
        cam = this.frontCam;
      break;
      case 3:
        cam = this.sideCam;
      break;
      case 4:
        cam = this.upsideDownCam;
      break;
    }

    return cam;
  }

  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su saltarina operativo hay que actualizar el ratio de aspecto de la cámara
    this.getCamera().aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.getCamera().updateProjectionMatrix();
  }

  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  changeCamera(cam){
    this.camera = cam;
    this.setCameraAspect (window.innerWidth / window.innerHeight);
  }

  onKeyDown(event){
    var key = event.which || event.keyCode;

    //console.log(key);

    if (key == 49 ){this.changeCamera(1);}
    else if (key == 50 ){this.changeCamera(2);}
    else if (key == 51 ){this.changeCamera(3);}
    else if (key == 52 ){this.changeCamera(4);}

    else {this.controls.manager(key, this.game);}
  }

  onMouseMove(event){

    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight );

    var raycaster = new THREE.Raycaster() ;
    raycaster.setFromCamera(mouse, this.getCamera());
    var pickedObjects = raycaster.intersectObjects(this.pickableObjects,true);

    if(pickedObjects.length > 0){
      if(!pickedObjects[0].object.userData.userData.selected)
        pickedObjects[0].object.userData.userData.select();
    }
    else{
      for(var i=0; i<this.pickableObjects.length; i++){
        if(this.pickableObjects[i].selected)
          this.pickableObjects[i].deselect();
      }
    }
  }

  onMouseClick(event){

    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight );

    var raycaster = new THREE.Raycaster() ;
    raycaster.setFromCamera(mouse, this.getCamera());
    var pickedObjects = raycaster.intersectObjects(this.pickableObjects,true);

    if(pickedObjects.length > 0){
      this.remove(this.menu);
      this.game.startGame();
      this.add(this.game);
      this.menu.gravityAnimation.stop();
    }
  }



  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update());

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    this.game.update();
    this.menu.update();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
  }
}

/// La función   main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
  window.addEventListener ("mousemove", (event) => scene.onMouseMove(event));
  window.addEventListener ("click", (event) => scene.onMouseClick(event));

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
