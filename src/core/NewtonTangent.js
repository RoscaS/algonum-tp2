/*
 Objet: Algo Num tp2
 Date: 16 mars 2019

 Tristan Seuret
 Nathan Latino
 Jonas Vallat
 Sol Rosca
 */

class NewtonTangent {
  constructor(
    initialPoint = DEFAULT_a,
    precision = DEFAULT_PRECISSION,
    callbackFunction = DEFAULT_FUNCTION.expression,
  ) {
    this.x = initialPoint;
    this.precision = precision;
    this.func = callbackFunction;
  }

  set_a(value) {
    this.x = value;
  }

  setFunction(func) {
    this.func = func;
  }

  setPrecision(value) {
    this.precision = value;
  }

  findRoot(x = this.x) {
    let count = 400;
    let value = x;
    let oldValue = 0;

    let tabData = [];
    do {
      let point1 = {x: 0, y: 0};
      let point2 = {x: 0, y: 0};
      let tangeante = {m: 0, b: 0};
      let data = {droite: 0, A: 0};
      let precision = Math.pow(10,
        -15 + (Math.abs(value) < 1 ? 0 : Math.log10(Math.abs(value))),
      );

      point1.x = value;
      point1.y = this.func(point1.x);
      point2.x = point1.x + precision;
      point2.y = this.func(point2.x);

      tangeante.m = (point2.y - point1.y) / (point2.x - point1.x);
      tangeante.b = point1.y - tangeante.m * point1.x;

      count--;

      oldValue = value;
      value = -1 * tangeante.b / tangeante.m;

      data.droite = tangeante;
      data.A = value;

      isFinite(value) ? tabData.push(data) : count = 0;
    } while (count > 0 && Math.abs(value - oldValue) > this.precision);

    return count != 0 ? tabData : [];
  }

  findAllRoots() {
    let tabData = [];
    for (let i = -100; i < 100; i++) {
      let sqrtData = this.findRoot(i);
      if (sqrtData.length !== 0) {
        let sqrt = sqrtData.pop().A;
        let flag = true;
        tabData.forEach(data => {
          if (Math.abs(sqrt - data) < this.precision) {flag = false;}
        });

        if (flag) tabData.push(sqrt);
      }
    }
    tabData.sort((a, b) => a - b);
    return tabData;
  }
}

