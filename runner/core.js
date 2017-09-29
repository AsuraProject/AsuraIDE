core = new Core;
font = new Font;
font = font.alphabet;

function Core(){
	this.applicationRunning = AsuraSystem;

	this.setView = function(viewArray){
		for(counter = 0; counter < document.getElementsByClassName('screen-pixel').length; counter++){
			document.getElementsByClassName('screen-pixel')[counter].style['background-color'] = "black";
		}

		for(pCounter = 0; pCounter < viewArray.length; pCounter++){
			viewArray[pCounter] = viewArray[pCounter].replace('#', '');

			if(viewArray[pCounter].length == 4){
				var x = parseInt(viewArray[pCounter].substring(0, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				var idX = x.toString();
				var idY = y.toString();

				if(idX.length == 1){
					idX = "0" + idX.toString();
				}

				if(idY.length == 1){
					idY = "0" + idY.toString();
				}

				document.getElementById(idX + idY + "#").style['background-color'] = '#87CEFA';
			}

			if(viewArray[pCounter].length > 4){
				var x = parseInt(viewArray[pCounter].substring(0, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				var string = viewArray[pCounter].substring(4, x.length);

				for(cCounter = 0; cCounter < string.length; cCounter++){
					var maxXCounter = 0;

					for(fsCounter = 0; fsCounter < font[string[cCounter]].length; fsCounter++){
						var idX = (x + font[string[cCounter]][fsCounter][0]).toString();
						var idY = (y - font[string[cCounter]][fsCounter][1]).toString();

						if(idX.length == 1){
							idX = "0" + idX;
						}

						if(idY.length == 1){
							idY = "0" + idY;
						}

						var pixel = idX + idY + "#";
						if(maxXCounter < font[string[cCounter]][fsCounter][0]){
							maxXCounter = font[string[cCounter]][fsCounter][0];
						}
						if(font[string[cCounter]] == ''){
							maxXCounter = 3;
						}				
						document.getElementById(pixel).style['background-color'] = "#87CEFA";
					}
					x = x + maxXCounter + 2;	
				}
			}
		}
	}

	this.setApplication = function(app){
		this.applicationRunning = app;
	}
}