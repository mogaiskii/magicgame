var utils = function(){


  var pressedKeys = {};

  var setKey = function(event, status){
    var code = event.keyCode;
    var key;

    switch (code) {
      case 32:
        key = "SPACE"; break;
      case 37:
        key = "LEFT"; break;
      case 38:
        key = "RIGHT"; break;
      case 39:
        key = "UP"; break;
      case 40:
        key = "DOWN"; break;
      default:
        key = String.fromCharCode(code);
    }

    pressedKeys[key] = status;
  }


  document.addEventListener('keydown', function(e) {
    setKey(e, true);
  });

  document.addEventListener('keyup', function(e) {
    setKey(e, false);
  });

  window.addEventListener('blur', function() {
    pressedKeys = {};
  });

  var isDown = function(key){
    return pressedKeys[key.toUpperCase()];
  }

  var checkStep = function(x,y,position) {
    if (position.x+x >= window.magicgame.screen.width/2-64){
      x=0
    }
    return {x:x,y:y}
  };

  var howHigh = function(position){
    return window.magicgame.screen.height- position.y-64;//TODO: REDO '64'
  }

  function playableEngine(speed){
    this.speed = speed;
    this.jump = 0;
    this.getVector = function(dt,position){
      dt /= 10;
      var x = 0, y=0;
      if( isDown('a') )
      {
        x = -1*this.speed*dt
      }
      if( isDown('d') ) x= this.speed*dt;


      var height = howHigh(position);
      //console.log(height);
      if(this.jump<=0 && height > 5){
        y += 5;
        this.jump = 0;
      }else if( isDown('w') ){
        if(this.jump>0){
          y=-this.jump /5>>0;
          this.jump -= 1;
        }else{
          this.jump = 40;
        }
      }else{
        this.jump = 0;
      }


      return checkStep(x,y,position);
    }
  }


  //var position = {x:num, y:num}
  //var gabarites = {x:num, y:num}
  //var gabarites not required
  function GameObject(image, engine, position, gabarites){
    this.image = image;
    this.position = position;
    if(this.gabarites){
      this.gabarites = gabarites;
    }
    this.engine = engine;
    this.spells = [];
    this.coolDown = 0;

    this.Draw = function(context) {
      context.drawImage(this.image,this.position.x,this.position.y);
    };
    this.Update = function(dt){
      var vector = this.engine.getVector(dt,position);
      this.position.x += vector.x;
      this.position.y += vector.y;


      if( isDown('j') && !(this.spells.indexOf('j')+1) ){
        this.spells.push('j');
      }
      if( isDown('k') && !(this.spells.indexOf('k')+1) ){
        this.spells.push('k');
      }
      if( isDown('l') && !(this.spells.indexOf('l')+1) ){
        this.spells.push('l');
      }
      if( isDown('l') && !(this.spells.indexOf('l')+1) ){
        this.spells.push('l');
      }
      if( isDown('space') && this.spells.length && this.coolDown<=0){
        // invoke the magic
        this.spells = [];
        window.magicgame.makeObject(new bananaMagic({x:this.position.x+70,y:this.position.y},1))
        this.coolDown = 10;
      }else if (this.coolDown){
        this.coolDown -= dt/100;
      }

    }
  }

  //direction == 1 (left to right)
  //direction == -1 (right to left)
  var bananaMagic = function(position,direction){
    this.position = {};
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed = 1;
    this.image = window.magicgame.resourceCache["../img/banana.gif"];
    this.Update = function(dt){
      this.position.x += direction*this.speed*dt;
      if(this.position.x >= window.magicgame.screen.width){
        //window.magicgame.deleteObject(this);
      }
    };
    this.Draw = function(context){
      context.drawImage(this.image,this.position.x,this.position.y);
    }
  }


  window.magicgame.utils = {
    GameObject: GameObject,
    playableEngine: playableEngine,
    isDown: isDown,
    bananaMagic:bananaMagic
  }


}
