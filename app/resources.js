var resources = function(){

  var callback = window.magicgame.onload;

  var requiredResources = [
    "../img/wizard.jpg",
    "../img/banana.gif"
  ]

  window.magicgame.resourceCache = {}

  var i = 0;
  var loadImage = function(url){
    if(window.magicgame.resourceCache[url]) return window.magicgame.resourceCache[url];
    else{
      var img = new Image();
      img.onload = function(){
        window.magicgame.resourceCache[url] = img;
        i++;
        if (i==requiredResources.length) callback();
      };
      img.src = url;
    }
  };

 window.magicgame.resources = {loadImage: loadImage};
 requiredResources.forEach(loadImage);

 window.resources.loadImage = loadImage;


}
