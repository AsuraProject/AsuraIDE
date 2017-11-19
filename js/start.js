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

const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
var path = require('path');

document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('start-project').addEventListener('click', function(){
		document.getElementById('start--background').style['display'] = 'flex';
	});

	document.getElementById('open-project').addEventListener('click', function(){
		dialog.showOpenDialog({title: "Select Project"}, (fileName) => {
		    if(fileName === undefined){
		        return;
		    }

            var startWindow = remote.getCurrentWindow();

            editorWindow = new BrowserWindow({ width: 800, height: 600, icon: path.join(__dirname, 'assets/icon.png') });

            editorWindow.maximize();
            editorWindow.loadURL('file://' + __dirname + '/view/editor.html?file=' + fileName);
            
            startWindow.close();
		});
	});

	document.getElementById('close-app').addEventListener('click', function(){
		remote.getCurrentWindow().close();
	});
});

document.getElementById('start--file-create').addEventListener('click', function(){
	var appName = document.getElementById('start--project-name').value;
	var saveAppName = appName.replace(" ","");
	if(!appName){
		var messageError = new MessageError;
		messageError.resetErrors();
		messageError.setError('Write the Project Name');
		return;
	}
	var content = saveAppName + " = new App('" + saveAppName + "', '" + appName + "');\n" + saveAppName + ".setApp(['#f4', #1616" + appName + "'], " + saveAppName + ");\n\n" + saveAppName + ".importNumber(0);\n\n" + saveAppName + ".app = function(){\n  mainView = new View;\n  mainView.setCustomArrayView(['#f4', '#1216Hello World']);\n\n  this.onCreate = function(){\n    this.setView(mainView);\n  }\n\n  this.onCreate();\n}";
	var saveAppName = saveAppName + ".js";

	dialog.showSaveDialog({title: "Create File", defaultPath: saveAppName}, (fileName) => {
		if (fileName === undefined){
		    return;
		}

		fs.writeFile(fileName, content, (err) => {
		    if(err){
		        alert("An error ocurred creating the file "+ err.message)
		    }
		                    
            var startWindow = remote.getCurrentWindow();

            editorWindow = new BrowserWindow({ width: 800, height: 600, icon: path.join(__dirname, 'assets/icon.png') });
            editorWindow.setMenu(null);
            editorWindow.maximize();
            editorWindow.loadURL('file://' + __dirname + '/view/editor.html?file=' + fileName);
            
            startWindow.close();
		});
	});
});