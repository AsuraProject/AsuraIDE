var fs = require('fs');
var remote = require('electron').remote;
var BrowserWindow = remote.BrowserWindow;
var dialog = remote.dialog;
var path = require('path');
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
});

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
    //runnerWindow.setMenu(null);
    //runnerWindow.setResizable(false);
    runnerWindow.setMinimizable(false);
    runnerWindow.setMaximizable(false);
    runnerWindow.loadURL('file://' + __dirname + '/../runner/runner.html?file=' + file);	
});