

class MyBoard extends THREE.Object3D {

  static WIDTH = 11;
  static HEIGHT = 20;

  static insideMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF, opacity:0.25,transparent:true});

  constructor() {
    super();

    // Board

    for(var i = 0; i < MyBoard.HEIGHT; i++){
      for(var j = 0; j < MyBoard.WIDTH; j++){

        var position = new THREE.Vector3(j,i,0);
        var cube;

        var size = new THREE.Vector3(1,1,1);
        cube = new MyCube(position, MyBoard.insideMat, size);

        this.add(cube);
      }
    }

    // Pieces

    this.piece = new MyPiece(5,MyBoard.HEIGHT-3);
    this.add(this.piece);

    this.nextPiece = new MyPiece(MyBoard.WIDTH+2,MyBoard.HEIGHT-3);
    this.add(this.nextPiece);

    this.savedPiece = null;
    this.justSaved = false;

    // Game Manager

    this.time = 0;

    this.level = 1;
    this.lines = 0;
    this.score = 0;
    this.scoreValue = [0,40,100,300,1200];
    this.goal = 5 *this.level;
    this.lineValue = [0,1,3,5,8];

    this.gameOver = false;
    this.speed = 2000; //2 segundos
    this.speedUp = 0.8; //20% más rápido/nivel

    // Title

    var titlePos = new THREE.Vector3(0, MyBoard.HEIGHT+1.5, 0.5);
    this.title = new MyTitle(titlePos,2);
    this.add(this.title);

    // TextGeometry

    this.materialText = MyMaterial.WHITE;

    var textPosition = new THREE.Vector3(MyBoard.WIDTH+2,MyBoard.HEIGHT-5.5,1);
    var nextPieceText = new MyText(textPosition,'NEXT\nPIECE',0.5,this.materialText);
    this.add(nextPieceText);

    textPosition = new THREE.Vector3(MyBoard.WIDTH+2,7.5,1);
    var savedPieceText = new MyText(textPosition,'HOLD',0.5,this.materialText);
    this.add(savedPieceText);

    this.levelTextPosition = new THREE.Vector3(3,-2,0.5);
    this.levelText = new MyText(this.levelTextPosition,'LEVEL '+this.level,1,this.materialText);
    this.add(this.levelText);

    var textPositionLines = new THREE.Vector3(MyBoard.WIDTH+2,2.5,1);
    var linesText = new MyText(textPositionLines,'LINES',0.5,this.materialText);
    this.add(linesText);

    this.linesValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+4,2.5,1);
    this.linesValueText = new MyText(this.linesValueTextPosition, this.lines + '/' + this.goal,0.5,this.materialText);
    this.add(this.linesValueText);

    var textPositionScore = new THREE.Vector3(MyBoard.WIDTH+2,1,1);
    var scoreText = new MyText(textPositionScore,'SCORE',0.5,this.materialText);
    this.add(scoreText);

    this.scoreValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+4.5,1,1);
    this.scoreTextValue = new MyText(this.scoreValueTextPosition,this.score.toString(),0.5,this.materialText);
    this.add(this.scoreTextValue);

    var timeTextPosition = new THREE.Vector3(MyBoard.WIDTH+2,4,1);
    var timeText = new MyText(timeTextPosition,'TIME ',0.5,this.materialText);
    this.add(timeText);

    this.timeValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+3.75,4,1);
    this.timeValueText = new MyText(this.timeValueTextPosition,this.time.toString(),0.5,this.materialText);
    this.add(this.timeValueText);

    //Animation
    this.startGravityAnimation();
    this.timeAnimation();
  }

  startGravityAnimation(){
    var originGravity = { p : 0 } ;
    var destinyGravity = { p : 1 } ;
    var that = this;

    this.gravityAnimation = new TWEEN.Tween(originGravity)
      .to(destinyGravity, that.speed)
      .onUpdate (function(){
        if(originGravity.p == 1)
          that.dropPiece('GRAVITY');
      })
      .repeat(Infinity)
      .start();
  }

  stopGravityAnimation(){
    this.gravityAnimation.stop();
  }

  levelUpAnimation(){
    var originLevel = { p : 5 } ;
    var destinyLevel = { p : 0.5 } ;
    var that = this;

    var animationLevel = new TWEEN.Tween(originLevel)
      .to(destinyLevel, 2000) //2 segundos
      .onUpdate (function(){
          that.levelText.position.z = originLevel.p;
      })
      .start();
  }

  timeAnimation(){
    var originTime = { p : 0 } ;
    var destinyTime = { p : 1 } ;
    var that = this;

    var animationTime = new TWEEN.Tween(originTime)
      .to(destinyTime, 1000) //1 segundos
      .onUpdate (function(){
          if(originTime.p == 1){
            that.time++;
            that.updateTimeText();
          }
      })
      .repeat(Infinity)
      .start();
  }

  savePiece(){
    if(!this.gameOver){
      if(!this.justSaved){
        if(this.savedPiece == null){
          this.savedPiece = new MyPiece(0,0);
          var savePos = new THREE.Vector3(MyBoard.WIDTH+2,MyBoard.HEIGHT-10,0);
          this.piece.pos = savePos;
          this.savedPiece.simpleCopy(this.piece);
          this.add(this.savedPiece);

          this.respawn();
        }
        else{
          var auxPiece = new MyPiece(0,0);
          auxPiece.copy(this.savedPiece);

          var savePos = new THREE.Vector3(MyBoard.WIDTH+2,MyBoard.HEIGHT-10,0);
          this.piece.pos = savePos;
          this.remove(this.savedPiece);
          this.savedPiece.simpleCopy(this.piece);
          this.add(this.savedPiece);

          var respawnPos = new THREE.Vector3(5,MyBoard.HEIGHT-3,0);
          auxPiece.pos = respawnPos;
          this.remove(this.piece);
          this.piece.simpleCopy(auxPiece);
          this.add(this.piece);
        }
        this.justSaved = true;
      }
    }
  }

  inBounds(coord){

    var inBounds = true;

    if(coord.x < 0 || coord.x > MyBoard.WIDTH-1)
      inBounds = false;

    return inBounds;
  }

  pieceInBounds(piece){

    var coord = new THREE.Vector2(piece.pos.x, piece.pos.y);
    var inBounds = this.inBounds(coord);

    for(var i = 0; i<3 && inBounds; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(coord.x + perif.x,
                                       coord.y + perif.y);
      inBounds = this.inBounds(posPerif);
    }

    return inBounds;

  }

  bottomCollider(piece){
    var collide = false;

    var coord = new THREE.Vector2(piece.pos.x, piece.pos.y);
    if(coord.y < 0) collide = true;

    for(var i = 0; i<3 && !collide; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(coord.x + perif.x,
                                       coord.y + perif.y);
      if(posPerif.y < 0) collide = true;
    }

    return collide;
  }

  isColliding(piece){
    var collide = false;

    var posX = piece.pos.x;
    var posY = piece.pos.y;

    var pos = posY * (MyBoard.WIDTH) + posX;
    var material = this.children[pos].box.material;

    if(material != MyBoard.insideMat)
      collide = true;

    for(var i = 0; i < 3 && !collide; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(posX + perif.x, posY + perif.y);

      pos = posPerif.y * (MyBoard.WIDTH) + posPerif.x;
      material = this.children[pos].box.material;

      if(material != MyBoard.insideMat)
        collide = true;
    }
    return collide;
  }

  movePiece(distX){

    var newPos = new THREE.Vector3(this.piece.pos.x + distX, this.piece.pos.y, 0);

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this.piece);
    newPiece.pos = newPos;

    var inBounds = this.pieceInBounds(newPiece);

    if(inBounds){
      var collision = this.isColliding(newPiece);
      if(!collision)
        this.piece.move(newPiece.pos);
    }
  }

  dropPiece(dropType){
    if(dropType != 'GRAVITY') this.addDropScore(dropType);

    var newPos = new THREE.Vector3(this.piece.pos.x, this.piece.pos.y-1, 0);

    var newPiece = new MyPiece(0,0);
    newPiece.copy(this.piece);
    newPiece.pos = newPos;

    var collision = this.bottomCollider(newPiece) || this.isColliding(newPiece);

    if(collision){
      this.pinUp(this.piece);
    }
    else{
      this.piece.move(newPiece.pos);
    }
    return collision;
  }

  rotatePiece(dir){
    if(this.piece.type != 'O'){
      var rot;

      if(dir == 'R')
        rot = new THREE.Vector2(1,-1);
      else
        rot = new THREE.Vector2(-1,1);

      var newPerifs = new THREE.Vector3(THREE.Vector2(0,0), THREE.Vector2(0,0), THREE.Vector2(0,0));

      for(var i=0; i<3; i++){
        var perif = this.piece.perifs.getComponent(i);
        var newPerif = new THREE.Vector2(perif.y*rot.x,perif.x*rot.y);
        newPerifs.setComponent(i,newPerif);
      }

      var newPiece = new MyPiece(0,0);
      newPiece.copy(this.piece);
      newPiece.perifs = newPerifs;

      var inBounds = this.pieceInBounds(newPiece);

      if(inBounds){
        var collision = this.isColliding(newPiece);
        if(!collision)
          this.piece.rotate(newPerifs);
      }
    }
  }

  pinUp(piece){
    var posX = piece.pos.x;
    var posY = piece.pos.y;
    var material = piece.material;

    var pos = posY * (MyBoard.WIDTH) + posX;
    this.children[pos].box.material = material;

    for(var i = 0; i < 3; i++){
      var perif = piece.perifs.getComponent(i);
      var posPerif = new THREE.Vector2(posX + perif.x, posY + perif.y);

      pos = posPerif.y * (MyBoard.WIDTH) + posPerif.x;
      this.children[pos].box.material = material;
    }

    this.checkRow();
    this.respawn();

    this.justSaved = false;
  }

  hardDrop(){
    var collide = true;
    do{
      collide = this.dropPiece('HARD');
    }while(!collide);
  }

  checkRow(){
    var fullRow;
    var pos;
    var material;

    var rows = [];

    for(var i = 0; i < MyBoard.HEIGHT; i++){
      fullRow = true;
      for(var j = 0; j < MyBoard.WIDTH && fullRow; j++){

        pos = i * (MyBoard.WIDTH) + j;
        material = this.children[pos].box.material;
        if(material == MyBoard.insideMat)
          fullRow = false;
      }
      if(fullRow){
        rows.unshift(i);
      }
    }
    if(rows.length != 0){
      this.addLineScore(rows.length);
      this.clearRows(rows);
    }
  }

  increaseSpeed(){
    this.stopGravityAnimation();
    this.speed = this.speed * Math.pow(this.speedUp,this.level-1);
    this.startGravityAnimation();
  }

  addLineScore(n){
    this.lines += this.lineValue[n];
    this.score += this.level * this.scoreValue[n];

    if(this.lines >= this.goal){
      this.levelUp();
      this.lines %= this.goal;
      this.goal = 5 * this.level;
    }

    this.updateLinesValueText();
    this.updateScoreTextValue();
  }

  levelUp(){
    this.level++;
    this.updateLevelText();
    this.increaseSpeed();
  }

  addDropScore(type){
    switch (type){
      case 'SOFT':
        this.score += 1;
      break;
      case 'HARD':
        this.score += 2;
      break;
    }
    this.updateScoreTextValue();
  }

  updateScoreTextValue(){
    this.remove(this.scoreTextValue);
    this.scoreTextValue = new MyText(this.scoreValueTextPosition,this.score.toString(),0.5,this.materialText);
    this.add(this.scoreTextValue);
  }

  updateLinesValueText(){
    this.remove(this.linesValueText);
    this.linesValueText = new MyText(this.linesValueTextPosition, this.lines + '/' + this.goal,0.5,this.materialText);
    this.add(this.linesValueText);
  }

  updateLevelText(){
    this.remove(this.levelText);
    this.levelText = new MyText(this.levelTextPosition,'LEVEL '+this.level,1,this.materialText);
    this.add(this.levelText);

    this.levelUpAnimation();
  }

  updateTimeText(){
    this.remove(this.timeValueText);
    this.timeValueText = new MyText(this.timeValueTextPosition,this.time.toString(),0.5,this.materialText);
    this.add(this.timeValueText);
  }

  clearRows(rows){
    for(var i=0;i<rows.length;i++){
      this.emptyRow(rows[i]);
      this.dropRows(rows[i]);
    }
  }

  dropRows(n){
    var pos;

    for(var i=n;i<MyBoard.HEIGHT-1;i++){
      for(var j = 0; j < MyBoard.WIDTH; j++){
        pos = i * (MyBoard.WIDTH) + j;
        this.children[pos].box.material = this.children[pos+MyBoard.WIDTH].box.material;
      }
    }
  }

  emptyRow(n){
    var pos;

    for(var i=0; i < MyBoard.WIDTH; i++){
      pos = n * (MyBoard.WIDTH) + i;
      this.children[pos].box.material = MyBoard.insideMat;
    }
  }

  respawn(){
    if(!this.gameOver){
      var respawnPos = new THREE.Vector3(5,MyBoard.HEIGHT-3,0);
      this.nextPiece.pos = respawnPos;
      this.remove(this.piece);
      this.piece.simpleCopy(this.nextPiece);
      this.add(this.piece);

      this.remove(this.nextPiece);
      this.nextPiece = new MyPiece(MyBoard.WIDTH+2,MyBoard.HEIGHT-3);
      this.add(this.nextPiece);

      if(this.isColliding(this.piece)){
        this.gameOver = true;
        console.log("GAME OVER");
      }
    }
  }

  update () {
    TWEEN.update();
    this.title.update();
  }

}
