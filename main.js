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

'use strict';
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')

let startWindow
let editorWindow

app.on('window-all-closed', () => {
  if(process.platform != 'darwin'){
    app.quit()
  }
})

app.on('ready', () => {
  startWindow = new BrowserWindow({ width: 500, height: 500, frame: false, icon: path.join(__dirname, 'assets/icon.png')})
  startWindow.loadURL('file://' + __dirname + '/index.html')
  startWindow.setResizable(false)

  startWindow.on('closed', () => startWindow = null)
})