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

function App(applicationName, runningName){
	this.applicationName = applicationName;
	this.runningName = runningName;

	/* Protected */

	this.app = function(){
	}

	this.onCreate = function(){
	}

	this.onTop = function(){
	}

	this.onDown = function(){
	}

	this.onRight = function(){
	}

	this.onLeft = function(){
	}

	this.onDestroy = function(){
		this.startApp(AsuraSystem);
	}

	/* Screen */

	this.setView = function(view){
		core.setView(view.viewValue);
	}

	/* System */

	this.startApp = function(startedApp){
		core.setApplication(startedApp);
		startedApp.app();
	}

	this.setApp = function(logo, app){
		AsuraSystem.getApps(logo, app);
	}

	/*  Importer */

	this.importNumber = function(number){
		importer.importNumber = number;
		importer.isZero();
	}

	this.import = function(file_path){
		var script = document.createElement('script');
		script.src = file_path;

    	script.onload = function(){
    			importer.onLoad();
    		};

		document.head.appendChild(script);
	}
}

function Importer(){

	this.importNumber;

	this.onLoad = function(){
		this.importNumber--;
		if(this.importNumber == 0){
			AsuraSystem.app();
		}
	}

	this.isZero = function(){
		if(this.importNumber == 0){
			AsuraSystem.app();
		}
	}
}

function View(){

	this.viewValue = [];

	this.setPixel = function(x, y){
		x = x.toString();
		y = y.toString();

		if(x.length == 1){
			x = "0" + x;
		}

		if(y.length == 1){
			y = "0" + y;
		}

		result = x + y + "#";
		this.viewValue.push(result);
	}

	this.setString = function(x, y, string){
		stringUse = string.length;

		xString = x.toString();
		yString = y.toString();

		if(xString.length == 1){
			xString = "0" + xString;
		}

		if(yString.length == 1){
			yString = "0" + yString;
		}

		if((64 - x) > string.length){
			result = "#" + xString + yString + string;
			this.viewValue.push(result);
		}else{
			end = string.length;
			start = 0;
			nextSpace = 0;

			while(end >= 0){
				whileA = 0;
				whileB = nextSpace;
				while(whileA < (64 - x)){
					if(string[whileB] == ' ' || string[whileB] == null){
						nextSpace = whileB;
					}
					whileA += 4;
					whileB++;
				}

				result = "#" + xString + yString + string.substring(start, nextSpace);
				this.viewValue.push(result);

				nextSpace++;
				start = nextSpace;
				end = end - nextSpace;
				console.log(end);

				xString = "00";
				x = 0;
				y = y + 5;
				yString = y.toString();
				if(yString.length == 1){
					yString = "0" + yString;
				}
			}
		}
	}

	this.cleanView = function(){
		this.viewValue = [];
	}

	this.setCustomView = function(view){
		this.viewValue = view.viewValue;
	}

	this.setCustomArrayView = function(array){
		this.viewValue = array;
	}
}

importer = new Importer();
