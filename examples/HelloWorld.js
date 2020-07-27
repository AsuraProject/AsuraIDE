HelloWorld = new App('HelloWorld', 'HelloWorld');
HelloWorld.setApp(['#f4', '#1616HelloWorld'], HelloWorld);

HelloWorld.importNumber(0);

HelloWorld.app = function(){
  mainView = new View;
  mainView.setCustomArrayView(['#f4', '#1216Hello World']);

  this.onCreate = function(){
    this.setView(mainView);
  }

  this.onCreate();
}