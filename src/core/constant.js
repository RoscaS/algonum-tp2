/*
Objet: Algo Num tp2
Date: 16 mars 2019

Tristan Seuret
Nathan Latino
Jonas Vallat
Sol Rosca
*/

const FUNCTIONS = [
  // {
  //   expression: x => x** 2,
  //   desmos: 'f(x)=\\frac{1}{8}x^2'
  // },
  {
    expression: x => x / (1 - x ** 2),
    desmos: 'f(x)=\\frac{x}{1-x^2}',
    simple: 'x/(1-x^2)'
  },
  {
    expression: x => Math.sin(x) - (x/13),
    desmos: 'f(x)=\\sin\\left(x\\right) - \\frac{x}{13}',
    simple: 'sin(x) - x/13'
  },
];

let DESMOS = {
  options: {
    zoomButtons: false,
    expressions: false,
    // border: false,
    showGrid: false,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE
  },
  bounds: {
    left: -4,
    right: 10,
    bottom: -2,
    top: 6
  },
  p1: [
    {
      id: 'p1', // a
      latex: 'P_1=\\left(a,\\ 0\\right)',
      color: Desmos.Colors.GREEN,
      dragMode: Desmos.DragModes.NONE,
      pointStyle: Desmos.Styles.OPEN,
      showLabel: true,
      label: "a",
    },

  ],
  verticalHelper: [
    {
      id: 'd1', // si f(x) > 0
      latex: 'x=a\\left\\{0\\le y\\le f\\left(a\\right)\\right\\}',
      color: Desmos.Colors.GREEN
    },
    {
      id: 'd2', // si f(x) < 0
      latex: 'x=a\\left\\{f\\left(a\\right)\\le y\\le0\\right\\}',
      color: Desmos.Colors.GREEN
    },
    {
      id: 'p2', // f(a)
      latex: `P_2=\\left(a,\\ f\\left(a\\right)\\right)`,
      color: Desmos.Colors.GREEN,
      dragMode: Desmos.DragModes.NONE,
      pointStyle: Desmos.Styles.OPEN,
      showLabel: true,
      label: "f(a)",
    },
  ],
  tan: [
    {
      id: 'A', // intersection(tan, abscisse)
      latex: 'A=-\\frac{f\\left(a\\right)}{f\'\\left(a\\right)}'
    },
    {
      id: 'd_tan', // tangeante à f(x) en a
      latex: 'T\\left(x\\right)\\ =\\ f\'\\left(a\\right)\\left(x-a\\right)+f\\left(a\\right)',
      color: Desmos.Colors.RED,
      lineStyle: Desmos.Styles.DOTTED
    },
    {
      id: 'p3', // A
      latex: 'P_3=\\left(-\\frac{f\\left(a\\right)}{f\'\\left(a\\right)}\\ +\\ a,0\\right)',
      color: Desmos.Colors.RED,
      dragMode: Desmos.DragModes.NONE,
      pointStyle: Desmos.Styles.OPEN,
      showLabel: true,
      label: "A",
    },
  ]
};

const DEFAULT_a = 4;
const DEFAULT_PRECISSION = 10;
const DEFAULT_FUNCTION = FUNCTIONS[1];
