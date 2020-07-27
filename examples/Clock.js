Clock = new App('Clock', 'Clock');
Clock.setApp(['#f8', '#1818Clock'], Clock);

Clock.importNumber(0);

Clock.app = function(){
  mainView = new View;
  mainView.setCustomArrayView([]);
  var timer;
  
  this.setClock = function(){
    var date = new Date;
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    
    if(hour.length == 1){
    	hour = "0" + hour; 
    }
    
    if(minute.length == 1){
    	minute = "0" + minute;
    }
    
    mainView.cleanView();
    mainView.setFont('Freedom');
    mainView.setString(26, 14, hour);
    mainView.setString(26, 26, minute);
    Clock.setView(mainView);  	
  }
  
  this.onCreate = function(){
    timer = setInterval(this.setClock, 1000);
  }

  this.onDestroy = function(){
  	clearInterval(timer);
  }
  
  this.onCreate();
}