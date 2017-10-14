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

function Keyboard(app){
  this.app = app;
  keyboardThis = this;

  mainView = new View;
  mainView.setCustomArrayView([]);

  lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                  'U', 'V', 'W', 'X', 'Y', 'Z',
                  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                  'u', 'v', 'w', 'x', 'y', 'z',
                  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  this.text = ''; 
  atualLetter = 0;
  
   this.app.onTop = function(){
    if(atualLetter == lettersArray.length){
          keyboardThis.text = keyboardThis.text.substr(0, (keyboardThis.text.length - 1));
          keyboardThis.setPositions();
          return;
     }
     
     keyboardThis.text = keyboardThis.text + lettersArray[atualLetter];
     keyboardThis.setPositions();
   }
  
   this.app.onLeft = function(){
    if(!atualLetter){
      atualLetter = lettersArray.length;
      keyboardThis.setPositions();
      return;
    }
    
    atualLetter--;
    keyboardThis.setPositions();
  } 
  
  this.app.onRight = function(){
    if(atualLetter == lettersArray.length){
      atualLetter = 0;
      keyboardThis.setPositions();
      return;
    }
      
    atualLetter++;
    keyboardThis.setPositions();
  }
  
  this.app.onDown = function(){
    mainView.cleanView();
    this.setView(mainView);
    this.onTop = function(){}
    this.onDown = function(){}
    this.onLeft = function(){}
    this.onRight = function(){}
    keyboardThis.onText();
  }
  
  this.setPositions = function(){
    mainView.cleanView();
    mainView.setString(12, 4, this.text.toString());
    if(atualLetter != lettersArray.length) mainView.setString(29, 17, lettersArray[atualLetter]);
    this.app.setView(mainView);
  }
  
  this.onText = function(){
  }

  this.setPositions();
}

function NumericKeyboard(app){
  this.app = app;
  keyboardThis = this;

  mainView = new View;
  mainView.setCustomArrayView([]);

  this.text = '';
  atualNumber = 0;
  
   this.app.onTop = function(){
     if(atualNumber == 10){
      keyboardThis.text = parseInt(keyboardThis.text.toString().substr(0, (keyboardThis.text.toString().length - 1)));
      keyboardThis.setPositions();
      return;
     }
     
     keyboardThis.text = parseInt(keyboardThis.text.toString() + atualNumber.toString());
     keyboardThis.setPositions();
   }
  
   this.app.onLeft = function(){
    if(!atualNumber){
      atualNumber = 10;
      keyboardThis.setPositions();
      return;
    }
    
    atualNumber--;
    keyboardThis.setPositions();
  } 
  
  this.app.onRight = function(){
    if(atualNumber == 10){
      atualNumber = 0;
      keyboardThis.setPositions();
      return;
    }
      
    atualNumber++;
    keyboardThis.setPositions();
  }
  
  this.app.onDown = function(){
    mainView.cleanView();
    this.setView(mainView);
    this.onTop = function(){}
    this.onDown = function(){}
    this.onLeft = function(){}
    this.onRight = function(){}
    keyboardThis.onText();
  }
  
  this.setPositions = function(){
    mainView.cleanView();
    mainView.setString(12, 4, this.text.toString());
    if(atualNumber != 10) mainView.setString(29, 17, atualNumber.toString());
    this.app.setView(mainView);
  }
  
  this.onText = function(){
  }

  this.setPositions();
}

function SpecificKeyboard(app, lettersArray){
  this.app = app;
  keyboardThis = this;

  mainView = new View;
  mainView.setCustomArrayView([]);

  this.text = '';
  atualLetter = 0;
  
   this.app.onTop = function(){
    if(atualLetter == lettersArray.length){
          keyboardThis.text = keyboardThis.text.substr(0, (keyboardThis.text.length - 1));
          keyboardThis.setPositions();
          return;
     }
     
     keyboardThis.text = keyboardThis.text + lettersArray[atualLetter];
     keyboardThis.setPositions();
   }
  
   this.app.onLeft = function(){
    if(!atualLetter){
      atualLetter = lettersArray.length;
      keyboardThis.setPositions();
      return;
    }
    
    atualLetter--;
    keyboardThis.setPositions();
  } 
  
  this.app.onRight = function(){
    if(atualLetter == lettersArray.length){
      atualLetter = 0;
      keyboardThis.setPositions();
      return;
    }
      
    atualLetter++;
    keyboardThis.setPositions();
  }
  
  this.app.onDown = function(){
    mainView.cleanView();
    this.setView(mainView);
    this.onTop = function(){}
    this.onDown = function(){}
    this.onLeft = function(){}
    this.onRight = function(){}
    keyboardThis.onText();
  }
  
  this.setPositions = function(){
    mainView.cleanView();
    mainView.setString(12, 4, this.text.toString());
    if(atualLetter != lettersArray.length) mainView.setString(29, 17, lettersArray[atualLetter]);
    this.app.setView(mainView);
  }
  
  this.onText = function(){
  }

  this.setPositions();
}