/*
Objet: Algo Num tp1
Date: 11 mars 2019

Tristan Seuret
Nathan Latino
Jonas Vallat
Sol Rosca
*/

function range(start, end, char = null) {
  let array = [...Array(end - start).keys()];
  return array.map(i => char != null ? char : (i + start));
}

function prefixWithZeros(count, value) {
  return `${range(0, count, '0').join('')}${value}`;
}

function header(title) {
  let border = () => range(0, 20, '=').join('');
  return `\n\n${border()}${title}${border()}`;
}

function reverse(str) {
  return [...str].reverse().join('');
}

function binaryToDecimal(value) {
  let sum = pow = 0;
  for (const i of reverse(value)) {
    sum += i * Math.pow(2, pow++);
  }
  return sum;
}

function stripTrailingZeros(string) {
  for (let i = string.length; i >= 0; i--) {
    if (string[i] === '1') return string.slice(0, ++i);
  }
}

function copyToClipboard(text) {
  var el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function areaObjectBuilder(id) {
  return {
    id: id,
    input: '',
    invalid: false,
    bin: null,
    sign: 0,
    exponent: 0,
    mantissa: 0,
    fields: [
      {name: 'Valeur'},
      {value: null, name: 'En mémoire'},
      {value: null, name: 'Erreur'},
      {value: null, name: 'IEEE754'},
    ],
  };
}
