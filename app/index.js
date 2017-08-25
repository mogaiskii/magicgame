var index = function(){


  var check = function(){
    var width = window.magicgame.DOMTargetElement.clientWidth;
    var height = window.magicgame.DOMTargetElement.clientHeight;
    if(width<300 || height<300){
      window.magicgame.DOMTargetElement.style.backgroundColor = "red";
      //TODO: stop the game
      console.log("INVALID WINDOW SIZE");
    }else{
      window.magicgame.DOMTargetElement.style.backgroundColor = "";
      window.magicgame.screen = {width:width, height:height};

      var context = app.getContext("2d");
      app.width = window.magicgame.screen.width;
      app.height = window.magicgame.screen.height;
    }
  }

  check(); //initial

  var time;// specially for onresize() !![timouter]
  window.onresize = function(){
    if(time) clearTimeout(time);
    time = setTimeout(function(){
      check()
    },400)
  };


  // A cross-browser requestAnimationFrame
  // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
  var requestAnimFrame = (function(){
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
  })();


  var gameObjectCollection = [];
  window.magicgame.makeObject = function(object){
    gameObjectCollection.push(object);
  }
  window.magicgame.deleteObject = function(object){
    gameObjectCollection.splice(gameObjectCollection.indexOf(object),1);
  }
  var lastTime;
  var init = function(){

    console.log("start");

    if(!window.magicgame.hasOwnProperty("utils")){
      utils();
    }
    var playerEngine = new window.magicgame.utils.playableEngine(1);
    var playerSprite = window.magicgame.resourceCache["../img/wizard.jpg"];
    console.log(playerSprite);
    var player = new window.magicgame.utils.GameObject(playerSprite,playerEngine,{'x':64,'y':64},{'x':64,'y':64})
    gameObjectCollection.push(player)

    lastTime = Date.now();
    mainLoop();
  }
  window.magicgame.onload = init;


  var context = app.getContext("2d");
  var mainLoop = function(){

    var now = Date.now();
    var dt = now-lastTime;

    context.clearRect(0,0,magicgame.screen.width,magicgame.screen.height);
    for(var i = 0; i < gameObjectCollection.length; i++){
      try {

        gameObjectCollection[i].Update(dt);
        gameObjectCollection[i].Draw(context);
      } catch (e) {

      } finally {

      }
    }

    lastTime = now;
    requestAnimFrame(mainLoop);
  }


}
