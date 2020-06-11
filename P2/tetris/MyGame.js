

class MyGame extends THREE.Object3D {
  constructor(){
    super();

    // Board

    this.board = new MyBoard();
    this.add(this.board);

    // Title

    var titlePos = new THREE.Vector3(-0.5, MyBoard.HEIGHT+1.5, 0.5);
    this.title = new MyTitle(titlePos,2,false);
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
    this.speedUp = 0.75; //25% más rápido/nivel

    // Controles

    this.materialText = MyMaterial.WHITE;
    this.fontURL = '../fonts/helvetiker_regular.typeface.json';

    var textPosition = new THREE.Vector3(-10,19,1);
    var controlsText = new MyText(textPosition,'CONTROLS',1,this.materialText,this.fontURL);
    this.add(controlsText);

    pos = new THREE.Vector3(-6,16,1);
    adjust = new THREE.Vector3(1.25,0.4,1);
    this.keyLEFT = new MyKeyObj(pos,9,4,'LEFT', adjust);
    this.add(this.keyLEFT);

    pos = new THREE.Vector3(-3.5,16,1);
    adjust = new THREE.Vector3(0.25,0.4,1);
    this.keyRIGHT = new MyKeyObj(pos,9,4,'RIGHT', adjust);
    this.add(this.keyRIGHT);

    pos = new THREE.Vector3(-4.75,14.5,1);
    adjust = new THREE.Vector3(-0.1,0.4,1);
    this.keyDOWN = new MyKeyObj(pos,9,4,'DOWN', adjust);
    this.add(this.keyDOWN);

    textPosition = new THREE.Vector3(-10,15.25,1);
    var movePieceText = new MyText(textPosition,'MOVE',0.5,this.materialText,this.fontURL);
    this.add(movePieceText);

    pos = new THREE.Vector3(-5.125,12,1);
    adjust = new THREE.Vector3(0.5,0.4,1);
    this.keyQ = new MyKeyObj(pos,4,4,'Q', adjust);
    this.add(this.keyQ);

    pos = new THREE.Vector3(-3.375,12,1);
    adjust = new THREE.Vector3(0.75,0.4,1);
    this.keyE = new MyKeyObj(pos,4,4,'E', adjust);
    this.add(this.keyE);

    textPosition = new THREE.Vector3(-10.375,12,1);
    var rotatePieceText = new MyText(textPosition,'ROTATE',0.5,this.materialText,this.fontURL);
    this.add(rotatePieceText);

    pos = new THREE.Vector3(-4.25,9.5,1);
    adjust = new THREE.Vector3(0.5,0.4,1);
    this.keyH = new MyKeyObj(pos,4,4,'W', adjust);
    this.add(this.keyH);

    textPosition = new THREE.Vector3(-10,9.5,1);
    var holdPieceText = new MyText(textPosition,'HOLD',0.5,this.materialText,this.fontURL);
    this.add(holdPieceText);

    var pos = new THREE.Vector3(-5,7,1);
    var adjust = new THREE.Vector3(1,0.4,1);
    this.keySPACE = new MyKeyObj(pos,12,4,'SPACE', adjust);
    this.add(this.keySPACE);

    textPosition = new THREE.Vector3(-10,7,1);
    var dropPieceText = new MyText(textPosition,'DROP',0.5,this.materialText,this.fontURL);
    this.add(dropPieceText);

    // TextGeometry

    this.levelTextPosition = new THREE.Vector3(3,-2,0.5);
    this.levelText = new MyText(this.levelTextPosition,'LEVEL '+this.level,1,this.materialText,this.fontURL);
    this.add(this.levelText);

    var textPositionLines = new THREE.Vector3(MyBoard.WIDTH+2,2.5,1);
    this.linesText = new MyText(textPositionLines,'LINES',0.5,this.materialText,this.fontURL);
    this.add(this.linesText);

    this.linesValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+4,2.5,1);
    this.linesValueText = new MyText(this.linesValueTextPosition, this.lines + '/' + this.goal,0.5,this.materialText,this.fontURL);
    this.add(this.linesValueText);

    this.scoreTextPosition = new THREE.Vector3(MyBoard.WIDTH+2,1,1);
    this.scoreText = new MyText(this.scoreTextPosition,'SCORE',0.5,this.materialText,this.fontURL);
    this.add(this.scoreText);

    this.scoreValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+4.5,1,1);
    this.scoreTextValue = new MyText(this.scoreValueTextPosition,this.score.toString(),0.5,this.materialText,this.fontURL);
    this.add(this.scoreTextValue);

    var timeTextPosition = new THREE.Vector3(MyBoard.WIDTH+2,4,1);
    this.timeText = new MyText(timeTextPosition,'TIME ',0.5,this.materialText,this.fontURL);
    this.add(this.timeText);

    this.timeValueTextPosition = new THREE.Vector3(MyBoard.WIDTH+3.75,4,1);
    this.timeValueText = new MyText(this.timeValueTextPosition,this.time.toString(),0.5,this.materialText,this.fontURL);
    this.add(this.timeValueText);
  }

  startGame(){
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

    var gameOverOrigin = { p : 25} ;
    var gameOverDestiny = { p : 12 } ;
    var that = this;

    var gameOverAnimation = new TWEEN.Tween(gameOverOrigin)
      .to(gameOverDestiny, 1000) //4 segundos
      .onUpdate (function(){
          that.gameOverText.position.y = gameOverOrigin.p;
          that.roundWhite.position.y = gameOverOrigin.p-6;
          that.roundBlack.position.y = gameOverOrigin.p-6;
      })
      .start();

    var originTime = { p : -30} ;
    var originLine = { p : -30} ;
    var originScore = { p : -30} ;
    var destiny = { p : -8.75 } ;
    var posY = 6.5;
    var posZ = 5;

    var finalTimeAnimation = new TWEEN.Tween(originTime)
      .to(destiny, 1000) //1 segundos
      .onStart (function(){
        that.timeText.position.y = posY;
        that.timeValueText.position.y = posY;

        that.timeText.position.z = posZ;
        that.timeValueText.position.z = posZ;
      })
      .onUpdate (function(){
        that.timeText.position.x = originTime.p;
        that.timeValueText.position.x = originTime.p;
      });

      var finalLinesAnimation = new TWEEN.Tween(originLine)
        .to(destiny, 1000) //4 segundos
        .onStart (function(){
          var otherLines = 0;
          for(var i=that.level-1; i>0; i--)
            otherLines += i*5;
          var totalLines = that.lines + otherLines;

          that.remove(that.linesValueText);
          that.linesValueText = new MyText(that.linesValueTextPosition, totalLines.toString(),0.5,that.materialText,that.fontURL);
          that.add(that.linesValueText);

          that.linesText.position.y = posY;
          that.linesValueText.position.y = posY;

          that.linesText.position.z = posZ;
          that.linesValueText.position.z = posZ;
        })
        .onUpdate (function(){
          that.linesText.position.x = originLine.p;
          that.linesValueText.position.x = originLine.p;
        });

      var finalScoreAnimation = new TWEEN.Tween(originScore)
        .to(destiny, 1000) //1 segundos
        .onStart (function(){
          that.remove(that.scoreText);
          that.scoreText = new MyText(that.scoreTextPosition, 'FINAL SCORE'.toString(),0.5,that.materialText,that.fontURL);
          that.add(that.scoreText);

          that.score += that.time * that.level;
          that.updateScoreTextValue();

          that.scoreText.position.y = posY;
          that.scoreTextValue.position.y = posY-1;

          that.scoreText.position.z = posZ;
          that.scoreTextValue.position.z = posZ;
        })
        .onUpdate (function(){
          that.scoreText.position.x = originScore.p-0.75;
          that.scoreTextValue.position.x = originScore.p-2;
        });

    gameOverAnimation.chain(finalTimeAnimation);
    finalTimeAnimation.chain(finalLinesAnimation);
    finalLinesAnimation.chain(finalScoreAnimation);
  }

  gameOverScreen(){
    var width = 9;
    var height = 8;
    var depth = 0.5;
    var radius = 0.25;
    var position = new THREE.Vector3(1.25, 0.5, 5);
    this.roundWhite = new MyRoundShape(position, width, height, depth, radius, MyMaterial.WHITE);
    this.add(this.roundWhite);

    width = 8.75;
    height = 7.75;
    position = new THREE.Vector3(1.375, 0.625, 5.25);
    this.roundBlack = new MyRoundShape(position, width, height, depth, radius,  MyMaterial.BLACK);
    this.add(this.roundBlack);

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
      this.addLineScore(this.board.clearedRows);
      this.board.clearedRows = 0;
  }

  launchGameOver(){
    this.gameOver = this.board.gameOver;
    this.stopTimeAnimation();
    this.stopGravityAnimation();
    this.gameOverScreen();
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
      if(this.board.clearedRows != 0) this.checkClearedRows();
      if(this.board.gameOver && !this.gameOver) this.launchGameOver();
      TWEEN.update();
  }
}
