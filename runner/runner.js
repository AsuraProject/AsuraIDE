document.addEventListener('DOMContentLoaded', function(){
	var src = new Screen;
	src.createScreen(64, 32);

	var file = window.location.href.split('?file=')[1];

	var script = document.createElement('script');
	script.src = file;
	document.head.appendChild(script);

    script.onload = function(){
		AsuraSystemImportApps(file);

		document.getElementById('position--top').addEventListener('click', function(){
			core.applicationRunning.onTop();
		});
		document.getElementById('position--down').addEventListener('click', function(){
			core.applicationRunning.onDown();
		});
		document.getElementById('position--left').addEventListener('click', function(){
			core.applicationRunning.onLeft();
		});		
		document.getElementById('position--right').addEventListener('click', function(){
			core.applicationRunning.onRight();
		});
    }
});

function Screen(){
	this.createScreen = function(x, y){
		for(yCounter = 0; y > yCounter; yCounter++){
			var screenRow = document.createElement('div');
			screenRow.classList.add('screen-row');
			
			for(xCounter = 0; x > xCounter; xCounter++){
				var screenPixel = document.createElement('div');
				var idX = xCounter.toString();
				var idY = yCounter.toString();

				if(idX.length == 1){
					idX = "0" + idX;
				}

				if(idY.length == 1){
					idY = "0" + idY;
				}

				screenPixel.classList.add('screen-pixel');
				screenPixel.id = idX + idY + "#";
				screenPixel.value = [xCounter, yCounter];

				screenRow.appendChild(screenPixel);
			}

			document.getElementById('screen').appendChild(screenRow);
		}
	}
}