window.onload = function(){

  var app = document.getElementById('app');

  window.magicgame = {
    DOMTargetElement: app,
  };

  var reqs = [
    "./app/index.js", // entry point
    "./app/resources.js", // resource manager
    "./app/utils.js",  // utility functions and objects
  ];

  function loadNext(reqs,index,onReady){
    var loadXHR = new XMLHttpRequest();
    loadXHR.open("GET",reqs[index], true);
    loadXHR.send();
    loadXHR.onreadystatechange = function(){
      if (loadXHR.readyState != 4) return;
      else if(loadXHR.status != 200){
        throw "`Load failed`";
      }
      var node = document.createElement("script");
      node.innerHTML = loadXHR.responseText;
      app.append(node);
      if(reqs[index+1]){
        loadNext(reqs,index+1,onReady);
      }else{
        onReady();
      }
    }
  }


  var ready = function(){

    index();
    resources();
    utils();

  };

  loadNext(reqs,0, ready);

}
