/* Copyright 2017 Yuri Faria

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

var fs = require('fs');
var remote = require('electron').remote;
var dialog = remote.dialog;
var BrowserWindow = remote.BrowserWindow;
var path = require('path');

var view = new View;
var tool = 'pixel-pen';

var font = new Font;
font = font.alphabet;
var fontChoose = 'MARACANA';

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
	});
});

function Screen(){
	this.CreateScreen = function(x, y){
		for(yCounter = 0; y > yCounter; yCounter++){
			var screenRow = document.createElement('div');
			screenRow.classList.add('screen-row');
			
			for(xCounter = 0; x > xCounter; xCounter++){
				var screenPixel = document.createElement('div');

				screenPixel.classList.add('screen-pixel');
				screenPixel.id = xCounter.toString() + yCounter.toString() + "#";
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
						
						view.addString(values, fontChoose);	

						for(fcCounter = 0; fcCounter < fontChoose.length; fcCounter++){
							var maxXCounter = 0;

							for(fCounter = 0; fCounter < font[fontChoose[fcCounter]].length; fCounter++){
								var pixel = (values[0] + font[fontChoose[fcCounter]][fCounter][0]).toString() + (values[1] - font[fontChoose[fcCounter]][fCounter][1]).toString() + "#";
								if(maxXCounter < font[fontChoose[fcCounter]][fCounter][0]){
									maxXCounter = font[fontChoose[fcCounter]][fCounter][0];
								}
								if(font[fontChoose[fCounter]] == ''){
									maxXCounter = 3;
								}
								document.getElementById(pixel).style['background-color'] = "#87CEFA";
							}
							values[0] = values[0] + maxXCounter + 2;
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
				var x = parseInt(viewArray[pCounter].substring(1, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				document.getElementById(x.toString() + y.toString() + "#").style['background-color'] = '#87CEFA';
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
						var pixel = (x + font[string[cCounter]][fsCounter][0]).toString() + (y - font[string[cCounter]][fsCounter][1]).toString() + "#";
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