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
				var x = parseInt(viewArray[pCounter].substring(1, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				document.getElementById(x.toString() + y.toString() + "#").style['background-color'] = '#87CEFA';
			}

			if(viewArray[pCounter].length > 4){
				var x = parseInt(viewArray[pCounter].substring(0, 2));
				var y = parseInt(viewArray[pCounter].substring(2, 4));
				var string = viewArray[pCounter].substring(4, x.length);

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
						console.log(string);
						console.log(pixel);						
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