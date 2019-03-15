/*
Objet: Algo Num tp1
Date: 11 mars 2019

Tristan Seuret
Nathan Latino
Jonas Vallat
Sol Rosca
*/

let app = new Vue({
  el: '#app',
  data: () => ({
    bordel: false,
    ranges: RANGES,
    bits: RANGES['32'],
    opperations: OPPERATIONS,
    opperation: '',
    opperationBtnColor: 'is-info',
    areas: [],
    areaA: areaObjectBuilder('A'),
    areaB: areaObjectBuilder('B'),
    areaC: areaObjectBuilder('C'),
    inputsSize: 'is-normal',
    verbose: true,
  }),
  watch: {
    'areaA.input': {
      handler: function (val) {
        this.updateFields(this.areaA, val);
      },
    },
    'areaB.input': {
      handler: function (val) {
        this.updateFields(this.areaB, val);
      },
    },
    'areaC.input': {
      handler: function (val) {
        this.updateFields(this.areaC, val);
      },
    },
    opperation: {
      handler: function (val, oldVal) {
      },
    },
  },

  methods: {
    showModal() {
      this.bordel = true;
    },
    hideModal() {
      this.bordel = false;
    },
    getArea(id) {
      return this.areas.filter(area => area.id === id)[0];
    },

    updateFields(area, value) {

      if (REGEX.zeroDotZeros.test(value)) {
        if (!REGEX.zeroDotZerosNbrs.test(value)) {
          value = '0';
        }
      }

      if (value === '0.0') value = '0';

      if (this.validInput(value)) {
        area.bin = new Binary(value, this.bits.bits);
        area.invalid = false;
      } else {
        area.invalid = true;
        // this.reset(area);
        // this.invalidOpperation();
        return;
      }
      area.fields[1].value = area.bin.storedValue;
      area.fields[2].value = area.bin.conversionError;
      area.fields[3].value = area.bin.IEEE754;

      area.fields[0]['size'] = value.length;

      area.sign = area.fields[3].value.slice(0, 1);
      area.exponent = area.fields[3].value.slice(1, 9);
      area.mantissa = area.fields[3].value.slice(9);
      this.updateAreaC();
    },

    updateAreaC() {
      if (this.opperationIsValid()) {
        let result = '';

        switch (this.opperation) {

          case 'minus':
            result = this.areaA.bin.minus(this.areaB.bin);
            break;
          case 'divide':
            result = this.areaA.bin.divide(this.areaB.bin);
            break;
          case 'times':
            result = this.areaA.bin.multiply(this.areaB.bin);
            break;
          case 'plus':
            result = this.areaA.bin.add(this.areaB.bin);
            break;
        }
        this.areaC.input = result.value;

      } else {
        this.invalidOpperation();
      }
    },
    validInput(value) {
      let validNumber = REGEX.validNumber.test(value);
      // let leadingZeros = REGEX.leadingZeros.test(value);
      return validNumber;
    },
    opperationIsValid() {
      let validInputs = !this.areaA.invalid && !this.areaB.invalid;
      let notEmpty = this.areaA.input && this.areaB.input;
      return validInputs && notEmpty && this.opperation;
    },
    setOpperation(opperation) {
      this.opperation = this.opperation === opperation ? '' : opperation;

      if (this.opperationIsValid()) {
        this.updateAreaC();
        if (this.areas.length === 2) {
          this.areas.push(this.areaC);
        }
      } else {
        this.invalidOpperation();
      }
    },
    invalidOpperation() {
      if (this.opperation) this.userWarning();
      this.areas = this.areas.slice(0, 2);
      this.opperation = '';
    },
    userWarning() {
      if (this.areaA.input === '') this.areaA.invalid = true;
      if (this.areaB.input === '') this.areaB.invalid = true;
      this.opperationBtnColor = 'is-danger';
      setTimeout(() => {
        this.opperationBtnColor = 'is-info';
      }, 200);
    },
    reset(area) {
      area.bin = new Binary('0', this.bits.bits);
      area.input = '';
      area.fields[1].value = null;
      area.fields[2].value = null;
      area.fields[3].value = null;
      area.fields[0]['size'] = null;
      area.sign = 0;
      area.exponent = 0;
      area.mantissa = 0;
    },
    resetAll() {
      this.areas = [];
      this.areaA = areaObjectBuilder('A');
      this.areaB = areaObjectBuilder('B');
      this.areas.push(this.areaA);
      this.areas.push(this.areaB);
      this.opperation = '';
    },
    fireTests() {
      let tests = Binary.tests();
      tests.print(verbose = true);
      alert('F12 pour afficher la console.');
    },
    firePi() {
      let pi = approximatePi();
      pi.print();
      alert('F12 pour afficher la console.');
    },
    eBitNumber(area) {
      let value = parseInt(area.bin.eBitNumber);
      return value > 0 ? `+${value}` : value;
    },
    setBitSize(value) {
      this.bits = this.ranges[value];
      this.inputsSize = this.bits.bits == 64 ? 'is-small' : 'is-normal';
      this.resetAll();
    },
    toggleVerbose() {
      this.verbose = !this.verbose;
    },
    binaryToClipboard(text) {
      copyToClipboard(text);
      alert('Ajouté au presse-papier !');
    },
    hiddenBitValidation(value) {
      let a = ['+0', '-0', '0', '0.0'].includes(value);
      let b = value.startsWith('0.0') && !/[1-9]/.test(value);
      return a || b ? '1' : '0';
    },


  },
  created() {
    this.areas.push(this.areaA);
    this.areas.push(this.areaB);
  },
});

