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

				screenPixel.classList.add('screen-pixel');
				screenPixel.id = xCounter.toString() + yCounter.toString() + "#";
				screenPixel.value = [xCounter, yCounter];

				screenRow.appendChild(screenPixel);
			}

			document.getElementById('screen').appendChild(screenRow);
		}
	}
}