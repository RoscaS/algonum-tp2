/*
Objet: Algo Num tp2
Date: 16 mars 2019

Tristan Seuret
Nathan Latino
Jonas Vallat
Sol Rosca
*/

let app = new Vue({
  el: '#app',
  data: () => ({

    functions: FUNCTIONS,
    func: DEFAULT_FUNCTION,
    precision: DEFAULT_PRECISSION,

    lines: [],
    steps: [],
    roots: [],
    idx: 0,

    a: DEFAULT_a,
    A: null,

    plot: null,
    newton: null,

    showNext: false,
    input: true,
    modal: false,

  }),
  watch: {
    a(value) {
      if (value < -100) {
        this.a = -100;
        return;
      }
      if (value > 100) {
        this.a = 100;
        return;
      }
      this.a = parseFloat(value);
      this.update_a(value);
    },
    precision(value) {
      if (value < 0) {
        this.precision = 0;
      }
      if (value > 10) {
        this.precision = 10;
      }
      this.setPrecision();
    },
  },
  methods: {
    start() {
      this.showVerticalHelper();
      this.plot.showTan();
      this.showNext = true;
      this.input = false;
      this.idx = 0;

      this.newton.set_a(this.a);
      this.setPrecision();
      this.lines = this.newton.findRoot();
    },
    next() {
      if (this.idx < this.lines.length) {
        let line = this.lines[this.idx];
        this.steps.push({a: this.a, A: line.A});
        this.a = line.A;
        this.update_a();
        this.idx++;
      } else {
        this.showNext = false;
      }
    },
    reset() {
      this.a = DEFAULT_a;
      this.idx = 0;
      this.steps = [];
      this.lines = [];
      this.showNext = false;
      this.input = true;
    },
    update_a() {
      this.plot.update_a(this.a);
    },
    showVerticalHelper() {
      this.plot.showVerticalHelper();
    },
    showTan() {
      this.plot.showTan();
    },
    setFunction(func) {
      this.func = func;
      this.a = DEFAULT_a;
      this.plot.setFunction(this.func.desmos);
      this.newton.setFunction(this.func.expression);
    },
    setPrecision() {
      this.newton.setPrecision(this.precision ** -10);
    },
    showModal() {
      this.setPrecision();
      this.roots = this.newton.findAllRoots();
      this.modal = true;
    },
    hideModal() {
      this.modal = false;
    },

  },
  created() {
    this.plot = new Plot(this.func.desmos);
    this.newton = new NewtonTangent();

  },
});

