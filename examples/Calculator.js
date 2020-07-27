Calculator = new App('Calculator', 'Calculator');
Calculator.setApp(['#f4', '#1616Calculator'], Calculator);

Calculator.importNumber(0);

Calculator.app = function(){
  self = this;
  
  calculateFunctions = {
    '+': (n1, n2) => n1 + n2,
    '-': (n1, n2) => n1 - n2,
    '/': (n1, n2) => n1 / n2,
    'x': (n1, n2) => n1 * n2
  };  
  
  firstNumberKeyboard = new NumericKeyboard(this);
  
  resultView = new View;
  
  fistNumber = 0;
  operation = 0;
  secondNumber = 0;
  
  this.onCreate = function(){
  }
  
  firstNumberKeyboard.onText = function() {
    keyboardOperations = new SpecificKeyboard(self, ['+', '-', '/', 'x']);
    keyboardOperations.onText = self.onOperationText;
    firstNumber = Number(firstNumberKeyboard.text);
  }

  this.onOperationText = function() {
    secondNumberKeyboard = new NumericKeyboard(self);
    secondNumberKeyboard.onText = self.onSecondNumberText;
    operation = keyboardOperations.text[0];
  }
  
  this.onSecondNumberText = function() {
    secondNumber = Number(secondNumberKeyboard.text);
    self.showResult();
  }
  
  this.getResult = function() {
    return calculateFunctions[operation](firstNumber, secondNumber);
  }
  
  this.showResult = function() {
    result = self.getResult();
    resultView.setFont('6');
    resultView.setString(12, 12, 'Resultado');
    resultView.setString(4, 22, result);
    self.setView(resultView);
  }
  
  this.onCreate();
}