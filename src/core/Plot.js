/*
Objet: Algo Num tp2
Date: 16 mars 2019

Tristan Seuret
Nathan Latino
Jonas Vallat
Sol Rosca
*/

class Plot {
  constructor(func, a=4) {
    this.func = func;
    this.a = a;

    this.el = document.getElementById('calculator');
    this.calculator = Desmos.GraphingCalculator(this.el, DESMOS.options);
    this.calculator.setMathBounds(DESMOS.bounds);
    this.calculator.setExpressions(this._defaultExpression());
    this._addExpression(DESMOS.p1);
  }

  _defaultExpression() {
    return [
      {id: 'f(x)', latex: this.func},
      {id: 'a', latex: `a=${this.a}`},
    ]
  }

  _addExpression(array) {
    array.forEach(expression => this.calculator.setExpression(expression));
  }

  setFunction(f) {
    this.func = f;
    this.calculator.setExpression({id: 'f(x)', latex: f})
  }

  showVerticalHelper() {
    this._addExpression(DESMOS.verticalHelper);
  }

  showTan() {
    this._addExpression(DESMOS.tan);
    DESMOS.tan.forEach(i => this.calculator.setExpression(i));
  }

  update_a(value) {
    this.a = value;
    this.calculator.setExpression({id: 'a', latex: `a=${value}`});
  }

  test() {
    let f = {id: 'B', latex: 'B=x^3'};
    this.calculator.setExpression(f);
  }

}




