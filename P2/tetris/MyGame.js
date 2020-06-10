

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

    this.gameOver = false;

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

    // TextGeometry

    this.materialText = MyMaterial.WHITE;
    this.fontURL = '../fonts/helvetiker_regular.typeface.json';

    var textPosition = new THREE.Vector3(MyBoard.WIDTH+2,MyBoard.HEIGHT-5.5,1);
    var nextPieceText = new MyText(textPosition,'NEXT\nPIECE',0.5,this.materialText,this.fontURL);
    this.add(nextPieceText);

    textPosition = new THREE.Vector3(MyBoard.WIDTH+2,7.5,1);
    var savedPieceText = new MyText(textPosition,'HOLD',0.5,this.materialText,this.fontURL);
    this.add(savedPieceText);

    this.levelTextPosition = new THREE.Vector3(3,-2,0.5);
    this.levelText = new MyText(this.levelTextPosition,'LEVEL '+this.level,1,this.materialText,this.fontURL);
    this.add(this.levelText);

    var textPositionLines = new THREE.Vector3(MyBoard.WIDTH+2,2.5,1);
    var linesText = new MyText(textPositionLines,'LINES',0.5,this.materialText,this.fontURL);
    this.add(linesText);

    this.linesValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+4,2.5,1);
    this.linesValueText = new MyText(this.linesValueTextPosition, this.lines + '/' + this.goal,0.5,this.materialText,this.fontURL);
    this.add(this.linesValueText);

    var textPositionScore = new THREE.Vector3(MyBoard.WIDTH+2,1,1);
    var scoreText = new MyText(textPositionScore,'SCORE',0.5,this.materialText,this.fontURL);
    this.add(scoreText);

    this.scoreValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+4.5,1,1);
    this.scoreTextValue = new MyText(this.scoreValueTextPosition,this.score.toString(),0.5,this.materialText,this.fontURL);
    this.add(this.scoreTextValue);

    var timeTextPosition = new THREE.Vector3(MyBoard.WIDTH+2,4,1);
    var timeText = new MyText(timeTextPosition,'TIME ',0.5,this.materialText,this.fontURL);
    this.add(timeText);

    this.timeValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+3.75,4,1);
    this.timeValueText = new MyText(this.timeValueTextPosition,this.time.toString(),0.5,this.materialText,this.fontURL);
    this.add(this.timeValueText);

    //Animation
    this.startGravityAnimation();
    this.startTimeAnimation();
  }


  levelUpAnimation(){
    var origin = { p : 5 } ;
    var destiny = { p : 0.5 } ;
    var that = this;

    var levelUpAnimation = new TWEEN.Tween(origin)
      .to(destiny, 2000) //2 segundos
      .onUpdate (function(){
          that.levelText.position.z = origin.p;
      })
      .start();
  }

  startGravityAnimation(){
    var origin = { p : 0 } ;
    var destiny = { p : 1 } ;
    var that = this;

    this.gravityAnimation = new TWEEN.Tween(origin)
      .to(destiny, that.speed)
      .onUpdate (function(){
        if(origin.p == 1)
          that.dropPiece('GRAVITY');
      })
      .repeat(Infinity)
      .start();
  }

  stopGravityAnimation(){
    this.gravityAnimation.stop();
  }

  startTimeAnimation(){
    var origin = { p : 0 } ;
    var destiny = { p : 1 } ;
    var that = this;

    this.timeAnimation = new TWEEN.Tween(origin)
      .to(destiny, 1000) //1 segundos
      .onUpdate (function(){
          if(origin.p == 1){
            that.time++;
            that.updateTimeText();
          }
      })
      .repeat(Infinity)
      .start();
  }

  stopTimeAnimation(){
    this.timeAnimation.stop();
  }

  gameOverAnimation(){

    var origin = { p : 25} ;
    var destiny = { p : 12 } ;
    var that = this;

    var levelUpAnimation = new TWEEN.Tween(origin)
      .to(destiny, 4000) //4 segundos
      .onUpdate (function(){
          that.gameOverText.position.y = origin.p;
          that.roundBox.position.y = origin.p-6;
          that.roundBox2.position.y = origin.p-6;
      })
      .start();
  }

  gameOverScreen(){
    console.log('GAME OVER');
    console.log("LINES "+this.lines);
    console.log("TIME "+this.time);
    console.log("LEVEL "+this.level);
    console.log("SCORE "+this.score);

    var width = 9;
    var height = 8;
    var depth = 0.5;
    var radius = 0.25;

    var shape = new THREE.Shape();

    shape.absarc( 0, 0, 0, -Math.PI / 2, -Math.PI, true );
    shape.absarc( 0, height -  radius * 2, 0, Math.PI, Math.PI / 2, true );
    shape.absarc( width - radius * 2, height -  radius * 2, 0, Math.PI / 2, 0, true );
    shape.absarc( width - radius * 2, 0, 0, 0, -Math.PI / 2, true );

    var geometry = new THREE.ExtrudeBufferGeometry( shape, {
        amount: depth,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: radius,
        bevelThickness: 0,
        curveSegments: 0
    });

    geometry.translate(1.25, 0.5, 5);
    this.roundBox = new THREE.Mesh( geometry, MyMaterial.WHITE) ;
    this.add(this.roundBox);

    var shape2 = new THREE.Shape();

    width = 8.75;
    height = 7.75;

    shape2.absarc( 0, 0, 0, -Math.PI / 2, -Math.PI, true );
    shape2.absarc( 0, height -  radius * 2, 0, Math.PI, Math.PI / 2, true );
    shape2.absarc( width - radius * 2, height -  radius * 2, 0, Math.PI / 2, 0, true );
    shape2.absarc( width - radius * 2, 0, 0, 0, -Math.PI / 2, true );

    var geometry2 = new THREE.ExtrudeBufferGeometry( shape2, {
        amount: depth,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: radius,
        bevelThickness: 0,
        curveSegments: 0
    });

    geometry2.translate(1.375, 0.625, 5.25);
    this.roundBox2 = new THREE.Mesh( geometry2, MyMaterial.BLACK) ;
    this.add(this.roundBox2);

    var gameOverTextPosition = new THREE.Vector3(1.5,0.5,5.75);
    this.gameOverText = new MyText(gameOverTextPosition,'GAME OVER',1,this.materialText,this.fontURL);
    this.add(this.gameOverText);

    this.gameOverAnimation();
  }

  increaseSpeed(){
    this.stopGravityAnimation();
    this.speed = this.speed * Math.pow(this.speedUp,this.level-1);
    this.startGravityAnimation();
  }

  dropPiece(dropType){
    if(!this.gameOver){
      if(dropType != 'GRAVITY') this.addDropScore(dropType);
      this.board.dropPiece();
    }
  }

  hardDrop(){
    if(!this.gameOver){
      var n = this.board.hardDrop();
      for(var i=0; i<n; i++){
        this.addDropScore('HARD');
      }
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

  checkGameOver(){
    this.gameOver = this.board.gameOver;
    if(this.gameOver){
      this.stopTimeAnimation();
      this.stopGravityAnimation();
      this.gameOverScreen();
    }
  }

  updateScoreTextValue(){
    this.remove(this.scoreTextValue);
    this.scoreTextValue = new MyText(this.scoreValueTextPosition,this.score.toString(),0.5,this.materialText,this.fontURL);
    this.add(this.scoreTextValue);
  }

  updateLinesValueText(){
    this.remove(this.linesValueText);
    this.linesValueText = new MyText(this.linesValueTextPosition, this.lines + '/' + this.goal,0.5,this.materialText,this.fontURL);
    this.add(this.linesValueText);
  }

  updateLevelText(){
    this.remove(this.levelText);
    this.levelText = new MyText(this.levelTextPosition,'LEVEL '+this.level,1,this.materialText, this.fontURL);
    this.add(this.levelText);

    this.levelUpAnimation();
  }

  updateTimeText(){
    this.remove(this.timeValueText);
    this.timeValueText = new MyText(this.timeValueTextPosition,this.time.toString(),0.5,this.materialText, this.fontURL);
    this.add(this.timeValueText);
  }

  update(){
    this.checkClearedRows();
    if(!this.gameOver) this.checkGameOver();
    TWEEN.update();
  }
}
