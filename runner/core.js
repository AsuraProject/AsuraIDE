core = new Core;
font = new Font;
font = font.alphabet;
fontChoice = '';

function Core(){
	this.applicationRunning = AsuraSystem;

	this.setView = function(viewArray){
		for(counter = 0; counter < document.getElementsByClassName('screen-pixel').length; counter++){
			document.getElementsByClassName('screen-pixel')[counter].style['background-color'] = "black";
		}

		for(pCounter = 0; pCounter < viewArray.length; pCounter++){
			viewArray[pCounter] = viewArray[pCounter].replace('#', '');

			if(viewArray[pCounter].length == 4 && viewArray[pCounter][0] != 'f'){
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

				if(document.getElementById(idX + idY + "#") != undefined){
					document.getElementById(idX + idY + "#").style['background-color'] = '#87CEFA';
				}
			}

			if(viewArray[pCounter].length > 4 && viewArray[pCounter][0] != 'f'){
				var x = parseInt(viewArray[pCounter].substring(0, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				var string = viewArray[pCounter].substring(4, x.length);

				for(cCounter = 0; cCounter < string.length; cCounter++){
					var maxXCounter = 0;

					if(font[fontChoice][string[cCounter]] != undefined){
						for(fsCounter = 0; fsCounter < font[fontChoice][string[cCounter]].length; fsCounter++){
							var idX = (x + font[fontChoice][string[cCounter]][fsCounter][0]).toString();
							var idY = (y - font[fontChoice][string[cCounter]][fsCounter][1]).toString();

							if(idX.length == 1){
								idX = "0" + idX;
							}

							if(idY.length == 1){
								idY = "0" + idY;
							}

							var pixel = idX + idY + "#";
							if(maxXCounter < font[fontChoice][string[cCounter]][fsCounter][0]){
								maxXCounter = font[fontChoice][string[cCounter]][fsCounter][0];
							}
							if(font[fontChoice][string[cCounter]] == ''){
								maxXCounter = 3;
							}
							if(document.getElementById(pixel) != undefined){				
								document.getElementById(pixel).style['background-color'] = "#87CEFA";
							}
						}

						x = x + maxXCounter + 2;
					}	
				}
			}

			if(viewArray[pCounter][0] == 'f'){
				if(viewArray[pCounter].substring(1) != '4' && viewArray[pCounter].substring(1) != '6' && viewArray[pCounter].substring(1) != '8' && viewArray[pCounter].substring(1) != 'Freedom' && viewArray[pCounter].substring(1) != '12'){
					fontChoice = '4';
				}else{
					fontChoice = viewArray[pCounter].substring(1);
				}
			}			
		}
	}

	this.setApplication = function(app){
		this.applicationRunning = app;
	}
}