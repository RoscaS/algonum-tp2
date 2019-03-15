class NewtonTan {
  // f(x) = mx + b: la tangente à la fonction
  // x_n: le x de l'equation
  // x_m: l'intersection de la tan avec f(x) = 0
  // y_n: f(x)
  // iteration: l'iteration qui donne ces resultats
  constructor(m, b, x_n, y_n, x_m, iteration) {
    self.m = m;
    self.b = b;
    self.x_n = x_n;
    sefl.x_m = x_m;
    self.y_n = y_n;
    self.i = iteration;
  }
}

function miseEnBoite(epsilon, fonction) {
  let y_n, m, b, x_n, x_m;
  let results = [];
  let count = 0;

  while (y_n !== epsilon) {

    // calculs savants qui assignent des valeurs
    // aux variables plus haut.

    results.push(new NewtonTan(m, b, x_n, y_n, x_m, count++));
  }
  return results;
}

function ceQueMoiJappelleDuFront(epsion, fonction = 'Une des deux fonctions') {
  return {
    droites: miseEnBoite(epsion, fonction),
    uneInfoUtileQueJaiOublie: null,
  };
}

class Droite {
  constructor(m, b) {
    this.m = m;
    this.b = b;
  }

  solve() {return -this.b / this.m;}
}

let sin = x => Math.sin(x);

// y = mx + b

let d = new Droite(2, 3);
// console.log(d.solve());

let input = 1;
// let f = "x/(1-x^2)";

let f = 'x^2+2*x-3';

function solve(x, f) {
  f = f.replace('^', '**');

  while (true) {
    if (!f.includes('x')) break;
    f = f.replace('x', x);
  }
  // console.log(f);
  return eval(f);
}

function pente(x1, x2, y1, y2) {
  return (y2 - y1) / (x2 - x1);
}

// console.log(f);
// console.log(eval(f));




let epsilon = 10**-15;

let x1 = input;
let x2 = input + epsilon;

let y1 = solve(x1, f);
let y2 = solve(x2, f);

// console.log(x1, x2, y1, y2);


let m = pente(x1, x2, y1, y2);

console.log(m);
