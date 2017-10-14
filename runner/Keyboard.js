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

  this.text = '';
  lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                  'U', 'V', 'W', 'X', 'Y', 'Z',
                  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                  'u', 'v', 'w', 'x', 'y', 'z',
                  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  atualLetters = new Array;
  atualLetters.letters = 'A B C';
  atualLetters.level = 0;
  atualLetter = 0;
  
   this.app.onTop = function(){
     if(atualLetters.level == 60){
      if(atualLetter == 2){
          keyboardThis.text = this.text.substr(0, (this.text.length - 1));
          keyboardThis.setPositions();
          return;
        }
     }
     
     keyboardThis.text = keyboardThis.text + atualLetters.letters.split(' ')[atualLetter];
     keyboardThis.setPositions();
   }
  
   this.app.onLeft = function(){
    if(!atualLetters.level && !atualLetter){
      atualLetters.level = 60;
      atualLetters.letters = lettersArray[60] + ' ' + lettersArray[61];
      atualLetter = 2;
      keyboardThis.setPositions();
      return;      
    }
     
    if(!atualLetter){
      atualLetters.level = atualLetters.level - 3;
      atualLetters.letters = lettersArray[atualLetters.level] + ' ' + lettersArray[atualLetters.level + 1] + ' ' + lettersArray[atualLetters.level + 2];
      atualLetter = 2;
      keyboardThis.setPositions();
      return;
    }
    
    atualLetter--;
    keyboardThis.setPositions();
  } 
  
  this.app.onRight = function(){
    if(atualLetter == 2){
      if(atualLetters.level == 60 && atualLetter == 2){
        atualLetters.level = 0;
        atualLetters.letters = lettersArray[atualLetters.level] + ' ' + lettersArray[atualLetters.level + 1] + ' ' + lettersArray[atualLetters.level + 2];
        atualLetter = 0;

        keyboardThis.setPositions();
        return;
      }
      
      atualLetters.level = atualLetters.level + 3;
      atualLetters.letters = lettersArray[atualLetters.level] + ' ' + lettersArray[atualLetters.level + 1] + ' ' + lettersArray[atualLetters.level + 2];
      atualLetter = 0;
      
      if(atualLetters.level == 60) atualLetters.letters = lettersArray[60] + ' ' + lettersArray[61];
      
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
    var xAdd = atualLetter * 7;
    mainView.cleanView();
    mainView.setString(12, 4, this.text);
    mainView.setString(20, 17, atualLetters.letters);
    mainView.setPixel(20 + xAdd, 24);
    mainView.setPixel(21 + xAdd, 24);
    mainView.setPixel(22 + xAdd, 24);
    this.app.setView(mainView);
  }
  
  this.onText = function(){
  }

  this.setPositions();
}