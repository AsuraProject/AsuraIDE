var fs = require('fs');
var remote = require('electron').remote;
var dialog = remote.dialog;
var BrowserWindow = remote.BrowserWindow;
var path = require('path');
var Jimp = require("jimp");

var view = new View;
var tool = 'pixel-pen';

var font = new Font;
font = font.alphabet;
var wordWritePen = 'abc';

var imagePen = new Array;

document.addEventListener('DOMContentLoaded', function(){
	var file = window.location.href.split('?file=')[1];

	//Code	
	editor = CodeMirror.fromTextArea(document.getElementById('code-part--code'), {
    	lineNumbers: true,
    	mode: "javascript"
  	});

	fs.readFile(file, 'utf-8', (err, data) => {
		if(err){
			alert("Error ocurred reading the file: " + err.message);
			return;
		}

		editor.getDoc().setValue(data);
		GetViews();
	});

	//Screen
	var scr = new Screen;
	
	function GetViews(){
		document.getElementById('view-list').innerHTML = '';

		var views = editor.getValue().split(" = new View;");
		for(count = 0; count < views.length - 1; count++){
	    	var views2 = views[count].split('\n');
	    	var finalView = views2[views2.length - 1];

	    	var newView = document.createElement('div');
	    	newView.classList.add('view-list--view');
	    	newView.innerText = finalView.trim();
	    	newView.addEventListener('click', function(){
	    		view.setView(this.innerText);
	    		
	    		var viewsElements = document.getElementsByClassName('view-list--view');
	    		for(counter = 0; counter < viewsElements.length; counter++){
	    			viewsElements[counter].style['background-color'] = "#424242";
	    		}

	    		this.style['background-color'] = "#262626";
	    	});
	    	document.getElementById('view-list').appendChild(newView);

	    	if(count == 0){
	    		newView.style['background-color'] = "#262626";
				view.setView(finalView.trim());
			}
		}
		
		var refresh = document.createElement('div');
	    refresh.classList.add('view-list--view');
	    refresh.innerText = "Refresh Views";
	    refresh.addEventListener('click', function(){
	    	GetViews();
	    });
		document.getElementById('view-list').appendChild(refresh);
	}
	scr.CreateScreen(64, 32);


	//Menu
	document.getElementById('menu--save').addEventListener('click', function(){
		fs.writeFile(file, editor.getValue(), (err) => {
		    if (err) {
		        alert("An error ocurred updating the file" + err.message);
		        return;
		    }
		});		
	});

	document.getElementById('menu--save-as').addEventListener('click', function(){
		dialog.showSaveDialog({title: "Create File", defaultPath: "project.js"}, (fileName) => {
			if (fileName === undefined){
			    return;
			}

			fs.writeFile(fileName, editor.getValue(), (err) => {
			    if(err){
			        alert("An error ocurred creating the file "+ err.message)
			    } 
			});
		});		
	});

	document.getElementById('menu--run').addEventListener('click', function(){
		fs.writeFile(file, editor.getValue(), (err) => {
		    if (err) {
		        alert("An error ocurred updating the file" + err.message);
		        return;
		    }
		});        

        runnerWindow = new BrowserWindow({ width: 465, height: 317, icon: path.join(__dirname, '/../assets/icon.png') });
       	runnerWindow.setMenu(null);
       	runnerWindow.setResizable(false);
       	runnerWindow.setMinimizable(false);
       	runnerWindow.setMaximizable(false);
        runnerWindow.loadURL('file://' + __dirname + '/../runner/runner.html?file=' + file);	
	});

	//Tools
	document.getElementById('pixel-pen').addEventListener('click', function(){
		tool = 'pixel-pen';
	});

	document.getElementById('write-pen').addEventListener('click', function(){
		tool = 'write-pen';
		document.getElementById('tool-background').style['display'] = "flex";

		var toolMenuConfig = document.getElementById('tool-menu--config');
		toolMenuConfig.innerHTML = '';
		
		var wordDiv = document.createElement('div');
		var wordInput = document.createElement('input');
		var wordLabel = document.createElement('label');
		var wordButton = document.createElement('button');

		wordDiv.classList.add('mdl-textfield');
		wordDiv.classList.add('mdl-js-textfield');
		
		wordInput.classList.add('mdl-textfield__input');
		wordInput.id = 'tool-menu--config__word';
		
		wordLabel.classList.add('mdl-textfield__label');
		wordLabel.htmlFor = 'tool-menu--config__word';
		wordLabel.innerText = 'Write the Word';

		wordButton.classList.add('mdl-button');
		wordButton.innerText = 'Send';
		wordButton.addEventListener('click', function(){
			wordWritePen = wordInput.value;
			document.getElementById('tool-background').style['display'] = 'none';
		});


		wordDiv.appendChild(wordInput);
		wordDiv.appendChild(wordLabel);
		toolMenuConfig.appendChild(wordDiv);
		toolMenuConfig.appendChild(document.createElement('br'));
		toolMenuConfig.appendChild(wordButton);
		componentHandler.upgradeDom();
	});

	document.getElementById('image-pen').addEventListener('click', function(){
		tool = 'image-pen';
		document.getElementById('tool-background').style['display'] = "flex";

		var toolMenuConfig = document.getElementById('tool-menu--config');
		toolMenuConfig.innerHTML = '';
		
		var imgFile = document.createElement('img');
		var imgButton = document.createElement('button');

		var constFirst = 64;
		var constTwo = 32;

		var filename;

		imgFile.style['width'] = '128px';
		imgFile.style['height'] = '64px';
		imgFile.style['background-color'] = '#000000';
		imgFile.addEventListener('click', function(){
			dialog.showOpenDialog({title: "Select Image"}, (fileName) => {
		    	if(fileName === undefined){
		        	return;
		    	}

		    	filename = fileName.toString().replace(new RegExp("/", 'g'), '//');
				Jimp.read(filename).then(function (lenna) {
					constFirst = (lenna.bitmap.width / lenna.bitmap.height) * constTwo;
				    lenna.resize(constFirst, constTwo)
				    	 .quality(60)
				         .greyscale()
				  	     .contrast(1)
				         .getBase64(Jimp.MIME_JPEG, function (err, src) {
				         	  imgXInput.value = parseInt(constFirst);
				         	  imgYInput.value = constTwo;
				         	  imgFile.style['width'] = (constFirst * 2).toString() + 'px';
				         	  imgFile.style['height'] = (constTwo * 2).toString() + 'px';
				              imgFile.src = src;
				         });
				}).catch(function (err) {
				    console.error(err);
				});
			});
		});
		
		function readIt(x, y){
			Jimp.read(filename).then(function (lenna) {
				lenna.resize(x, y)
				    .quality(60)
				    .greyscale()
				  	.contrast(1)
				    .getBase64(Jimp.MIME_JPEG, function (err, src) {
				    	constFirst = x;
				    	constTwo = y;
				        imgFile.style['width'] = (x * 2).toString() + 'px';
				        imgFile.style['height'] = (y * 2).toString() + 'px';
				        imgFile.src = src;
				    });
			}).catch(function (err) {
				console.error(err);
			});			
		}

		var imgXDiv = document.createElement('div');
		var imgXInput = document.createElement('input');
		imgXInput.classList.add('mdl-textfield__input');
		imgXInput.addEventListener('change', function(){
			if(parseInt(this.value) > 64){
				this.value = 64;
			}
			readIt(parseInt(this.value), constTwo);
		});
		imgXDiv.classList.add('mdl-textfield');
		imgXDiv.classList.add('mdl-js-textfield');
		imgXDiv.style['width'] = '25px';
		imgXDiv.appendChild(imgXInput);

		var imgYDiv = document.createElement('div');
		var imgYInput = document.createElement('input');
		imgYInput.classList.add('mdl-textfield__input');
		imgYInput.addEventListener('change', function(){
			if(parseInt(this.value) > 32){
				this.value = 32;
			}			
			readIt(constFirst, parseInt(this.value));
		});
		imgYDiv.classList.add('mdl-textfield');
		imgYDiv.classList.add('mdl-js-textfield');
		imgYDiv.style['width'] = '25px';
		imgYDiv.appendChild(imgYInput);

		var imgsDiv = document.createElement('div');
		var xSpan = document.createElement('span');
		xSpan.innerText = 'x';
		imgsDiv.appendChild(imgXDiv);
		imgsDiv.appendChild(xSpan);
		imgsDiv.appendChild(imgYDiv);

		imgButton.classList.add('mdl-button');
		imgButton.innerText = 'Send';
		imgButton.addEventListener('click', function(){
			imagePen = new Array;

			Jimp.read(filename).then(function (lenna) {
				constFirst = (lenna.bitmap.width / lenna.bitmap.height) * constTwo;
				lenna.resize(constFirst, constTwo)
				    .quality(60)
				    .greyscale()
				  	.contrast(1)
				    .getBase64(Jimp.MIME_JPEG, function (err, src) {
				        imgXInput.value = parseInt(constFirst);
				        imgYInput.value = constTwo;
				        imgFile.style['width'] = (constFirst * 2).toString() + 'px';
				        imgFile.style['height'] = (constTwo * 2).toString() + 'px';
				        imgFile.src = src;

				    for(yPixelCounter = 0; yPixelCounter < constTwo; yPixelCounter++){
				    	for(xPixelCounter = 0; xPixelCounter < constFirst; xPixelCounter++){
				    		if(lenna.getPixelColor(xPixelCounter, yPixelCounter) != '0x000000FF'){
				    			imagePen.push([xPixelCounter, yPixelCounter]);
				    		}
				    	}
				    }
			    });
			}).catch(function (err) {
				console.error(err);
			});			
			document.getElementById('tool-background').style['display'] = 'none';
		});

		toolMenuConfig.appendChild(imgFile);
		toolMenuConfig.appendChild(document.createElement('br'));
		toolMenuConfig.appendChild(imgsDiv);
		toolMenuConfig.appendChild(imgButton);
		componentHandler.upgradeDom();
	});
});

function Screen(){
	this.CreateScreen = function(x, y){
		for(yCounter = 0; y > yCounter; yCounter++){
			var screenRow = document.createElement('div');
			screenRow.classList.add('screen-row');
			
			for(xCounter = 0; x > xCounter; xCounter++){
				var screenPixel = document.createElement('div');
				var idX = xCounter.toString();
				var idY = yCounter.toString();

				if(idX.length == 1){
					idX = "0" + idX.toString();
				}

				if(idY.length == 1){
					idY = "0" + idY.toString();
				}

				screenPixel.classList.add('screen-pixel');
				screenPixel.id = idX + idY + "#";
				screenPixel.value = [xCounter, yCounter];
				screenPixel.addEventListener('click', function(){
					if(tool == 'pixel-pen'){
						if(this.style['background-color'] == "rgb(135, 206, 250)"){
							this.style['background-color'] = "black";
							view.removePixel(this.value);
							return;
						}

						this.style['background-color'] = "#87CEFA";
						view.addPixel(this.value);
					}

					if(tool == 'write-pen'){
						var values = this.value;
						
						view.addString(values, wordWritePen);	

						for(fcCounter = 0; fcCounter < wordWritePen.length; fcCounter++){
							var maxXCounter = 0;

							for(fCounter = 0; fCounter < font[wordWritePen[fcCounter]].length; fCounter++){
			        			var idX = (values[0] + font[wordWritePen[fcCounter]][fCounter][0]).toString();
								var idY = (values[1] - font[wordWritePen[fcCounter]][fCounter][1]).toString();

								if(idX.length == 1){
									idX = "0" + idX;
								}

								if(idY.length == 1){
									idY = "0" + idY;
								}

								var pixel = idX + idY + "#";
								if(maxXCounter < font[wordWritePen[fcCounter]][fCounter][0]){
									maxXCounter = font[wordWritePen[fcCounter]][fCounter][0];
								}
								if(font[wordWritePen[fCounter]] == ''){
									maxXCounter = 3;
								}						
								document.getElementById(pixel).style['background-color'] = "#87CEFA";							
							}
							values[0] = values[0] + maxXCounter + 2;
						}									
					}

					if(tool == 'image-pen'){
						var values = this.value;

						for(imageCounter = 0; imageCounter < imagePen.length; imageCounter++){
							var xPixel = values[0] + imagePen[imageCounter][0];
							var yPixel = values[1] + imagePen[imageCounter][1];

							view.addPixel([xPixel, yPixel]);

							if(xPixel.toString().length == 1){
								xPixel = "0" + xPixel;
							}

							if(yPixel.toString().length == 1){
								yPixel = "0" + yPixel;
							}

							var pixel = xPixel.toString() + yPixel.toString() + '#';
							document.getElementById(pixel).style['background-color'] = "#87CEFA";
						}
					}
				});

				screenRow.appendChild(screenPixel);
			}

			document.getElementById('screen').appendChild(screenRow);
		}
	}
}

function View(){
	this.pixels = new Array;
	this.strings = new Array;
	this.viewValue = new Array;
	this.viewName;

	this.setView = function(viewName){
		this.viewName = viewName;
		this.pixels = new Array;
		this.strings = new Array;
		this.viewValue = new Array;
		this.updateScreen();
	}

	this.addPixel = function(positions){
		this.pixels.push([positions[0], positions[1]]);
		this.setArray();
	}

	this.removePixel = function(positions){
		var pixel = [positions[0], positions[1]];
		for(counter = 0; counter < this.pixels.length; counter++){
			if(positions[0] == this.pixels[counter][0] && positions[1] == this.pixels[counter][1]){
				this.pixels.splice(counter, 1);
				this.setArray();
				return;
			}
		}
	}

	this.addString = function(positions, string){
		this.strings.push([positions[0], positions[1], string]);
		this.setArray();
	}

	this.setArray = function(){
		this.viewValue = new Array;
		for(counter = 0; counter < this.pixels.length; counter++){
			var x = this.pixels[counter][0].toString();
			var y = this.pixels[counter][1].toString();

			if(x.length == 1){
				x = "0" + x;
			}

			if(y.length == 1){
				y = "0" + y;
			}

			var result = "'" + x + y + "#'";
			this.viewValue.push(result);
		}

		for(sCounter = 0; sCounter < this.strings.length; sCounter++){
			var x = this.strings[sCounter][0].toString();
			var y = this.strings[sCounter][1].toString();
			var string = this.strings[sCounter][2];

			if(x.length == 1){
				x = "0" + x;
			}

			if(y.length == 1){
				y = "0" + y;
			}

			var result = "'#" + x + y + string + "'";
			this.viewValue.push(result);
		}

		this.updateCode();
	}

	this.updateCode = function(){
		var viewArray = editor.getValue().split(this.viewName + " = new View;")[1].split(');')[0].trim();
		var codeEdited = editor.getValue().replace(viewArray, this.viewName + ".setCustomArrayView([" + this.viewValue.toString() + "]");
		editor.getDoc().setValue(codeEdited);
	}

	this.updateScreen = function(){
		var viewArray = editor.getValue().split(this.viewName + ".setCustomArrayView([")[1].split(']);')[0].trim().replace(new RegExp("'", 'g'), '').replace(new RegExp("#", 'g'), '').split(',');
		
		for(counter = 0; counter < document.getElementsByClassName('screen-pixel').length; counter++){
			document.getElementsByClassName('screen-pixel')[counter].style['background-color'] = "black";
		}

		for(pCounter = 0; pCounter < viewArray.length; pCounter++){
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
				this.addPixel([x, y]);
			}

			if(viewArray[pCounter].length > 4){
				var x = parseInt(viewArray[pCounter].substring(0, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				var string = viewArray[pCounter].substring(4, x.length);

				this.addString([x, y], string);

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
}