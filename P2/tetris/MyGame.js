

class MyGame extends THREE.Object3D {
  constructor(){
    super();

    // Board

    this.board = new MyBoard();
    this.add(this.board);

    // Title

    var titlePos = new THREE.Vector3(0, MyBoard.HEIGHT+1.5, 0.5);
    this.title = new MyTitle(titlePos,2);
    this.add(this.title);

    // Game Manager

    this.time = 0;

    this.level = 1;
    this.lines = 0;
    this.score = 0;
    this.scoreValue = [0,40,100,300,1200];
    this.goal = 5 *this.level;
    this.lineValue = [0,1,3,5,8];

    // Gravity parameters
    this.speed = 1500; //1.5 segundos
    this.speedUp = 0.9; //10% más rápido/nivel

    //Animation
    this.startGravityAnimation();

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

  increaseSpeed(){
    this.stopGravityAnimation();
    this.speed = this.speed * Math.pow(this.speedUp,this.level-1);
    this.startGravityAnimation();
  }

  dropPiece(dropType){
    if(dropType != 'GRAVITY') this.addDropScore(dropType);
    this.board.dropPiece();
  }

  hardDrop(){
    var n = this.board.hardDrop();
    for(var i=0; i<n; i++){
      this.addDropScore('HARD');
    }
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

  checkClearedRows(){
    var clearedRows = this.board.clearedRows;
    if(clearedRows != 0){
      this.addLineScore(clearedRows);
      this.board.clearedRows = 0;
    }
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

  update(){
    this.checkClearedRows();

    TWEEN.update();
  }
}
