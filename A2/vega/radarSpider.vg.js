google.charts.load('upcoming', {'packages': ['vegachart']}).then(loadCharts);

const keropokLekor = [
  ["Protein", 0.12, "Keropok Lekor", "g"],
  ["Carbohydrates", 0.25, "Keropok Lekor", "g"],
  ["Sodium", 0.01, "Keropok Lekor", "mg"],
  ["Fat", 0.15, "Keropok Lekor", "g"],
  ["Vitamin C", 0, "Keropok Lekor", "mg"]
];

const crackers = [
  ["Protein", 0.073, "Crackers", "g"],
  ["Carbohydrates", 0.707, "Crackers", "g"],
  ["Sodium", 0.0699, "Crackers", "mg"],
  ["Fat", 0.164, "Crackers", "g"],
  ["Vitamin C", 0, "Crackers", "mg"]
];

const cannedSardines = [
  ["Protein", 0.246, "Canned Sardines", "g"],
  ["Carbohydrates", 0, "Canned Sardines", "g"],
  ["Sodium", 0.0307, "Canned Sardines", "mg"],
  ["Fat", 0.115, "Canned Sardines", "g"],
  ["Vitamin C", 0, "Canned Sardines", "mg"]
];

const maltDrink = [
  ["Protein", 0.123, "Malt Drink (Milo)", "g"],
  ["Carbohydrates", 0.595, "Malt Drink (Milo)", "g"],
  ["Sodium", 0.014, "Malt Drink (Milo)", "mg"],
  ["Fat", 0.097, "Malt Drink (Milo)", "g"],
  ["Vitamin C", 0.044, "Malt Drink (Milo)", "mg"]
];

const chocolateBar = [
  ["Protein", 0.058, "Chocolate Bar", "g"],
  ["Carbohydrates", 0.63, "Chocolate Bar", "g"],
  ["Sodium", 0.07, "Chocolate Bar", "mg"],
  ["Fat", 0.293, "Chocolate Bar", "g"],
  ["Vitamin C", 0.042, "Chocolate Bar", "mg"]
];

const tosaiDosai = [
  ["Protein", 0.057, "Tosai/Dosai", "g"],
  ["Carbohydrates", 0.371, "Tosai/Dosai", "g"],
  ["Sodium", 0.0309, "Tosai/Dosai", "mg"],
  ["Fat", 0.04, "Tosai/Dosai", "g"],
  ["Vitamin C", 0.003, "Tosai/Dosai", "mg"]
];

function loadCharts() {
  const defaultColor = "#FF6347";
  const sardinesColor = "black";
  const chartArea = document.getElementById("chart-area");
  chartArea.innerHTML = ""; // Clear previous charts

  const charts = [
    keropokLekor,
    crackers,
    cannedSardines,
    maltDrink,
    chocolateBar,
    tosaiDosai
  ];

  charts.forEach((data, index) => {
    const color = data[0][2] === "Canned Sardines" ? sardinesColor : defaultColor;
    addChart(data[0][2], data, color);
    if (index === 2) {
      chartArea.appendChild(document.createElement("br")); // Add a line break after the third chart
    }
  });
}

function addChart(title, data, color) {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: 'string', 'id': 'key'});
  dataTable.addColumn({type: 'number', 'id': 'value'});
  dataTable.addColumn({type: 'string', 'id': 'category'});
  dataTable.addColumn({type: 'string', 'id': 'unit'});
  dataTable.addRows(data);

  const options = {
    'vega': {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "width": 350,
      "height": 350,
      "autosize": "none",
      "title": {
        "text": title,
        "anchor": "middle",
        "fontSize": 14,
        "dy": -8,
        "dx": {"signal": "-width/4"},
        "subtitle": "RDI per 100g"
      },
      "signals": [
        {"name": "radius", "update": "90"}
      ],
      "data": [
        {
          "name": "table",
          "source": "datatable",
        },
        {
          "name": "keys",
          "source": "table",
          "transform": [
            {
              "type": "aggregate",
              "groupby": ["key", "unit"]
            }
          ]
        }
      ],
      "scales": [
        {
          "name": "angular",
          "type": "point",
          "range": {"signal": "[-PI, PI]"},
          "padding": 0.5,
          "domain": {"data": "table", "field": "key"}
        },
        {
          "name": "radial",
          "type": "linear",
          "range": {"signal": "[0, radius]"},
          "zero": true,
          "nice": false,
          "domain": [0, 0.7], // Adjusted to 70% of the whole proportion
        }
      ],
      "encode": {
        "enter": {
          "x": {"signal": "width/2"},
          "y": {"signal": "height/2 + 20"}
        }
      },
      "marks": [
        {
          "type": "group",
          "name": "categories",
          "zindex": 1,
          "from": {
            "facet": {"data": "table", "name": "facet", "groupby": ["category"]}
          },
          "marks": [
            {
              "type": "line",
              "name": "category-line",
              "from": {"data": "facet"},
              "encode": {
                "enter": {
                  "interpolate": {"value": "linear-closed"},
                  "x": {"signal": "0.7 * scale('radial', datum.value) * cos(scale('angular', datum.key))"}, // Adjusted scaling
                  "y": {"signal": "0.7 * scale('radial', datum.value) * sin(scale('angular', datum.key))"}, // Adjusted scaling
                  "stroke": {"value": color},
                  "strokeWidth": {"value": 1.5},
                  "fill": {"value": color},
                  "fillOpacity": {"value": 0.1}
                }
              }
            },
            {
              "type": "text",
              "name": "value-text",
              "from": {"data": "category-line"},
              "encode": {
                "enter": {
                  "x": {"signal": "datum.x + 14 * cos(scale('angular', datum.datum.key))"},
                  "y": {"signal": "datum.y + 14 * sin(scale('angular', datum.datum.key))"},
                  "text": {"signal": "format(datum.datum.value,'.1%')"},
                  "opacity": {"signal": "datum.datum.value > 0.01 ? 1 : 0"},
                  "align": {"value": "center"},
                  "baseline": {"value": "middle"},
                  "fontWeight": {"value": "bold"},
                  "fill": {"value": color},
                }
              }
            }
          ]
        },
        {
          "type": "rule",
          "name": "radial-grid",
          "from": {"data": "keys"},
          "zindex": 0,
          "encode": {
            "enter": {
              "x": {"value": 0},
              "y": {"value": 0},
              "x2": {"signal": "radius * cos(scale('angular', datum.key))"},
              "y2": {"signal": "radius * sin(scale('angular', datum.key))"},
              "stroke": {"value": "lightgray"},
              "strokeWidth": {"value": 1}
            }
          }
        },
        {
          "type": "text",
          "name": "key-label",
          "from": {"data": "keys"},
          "zindex": 1,
          "encode": {
            "enter": {
              "x": {"signal": "(radius + 11) * cos(scale('angular', datum.key))"},
              "y": [
                {
                  "test": "datum.key == 'Sodium'",
                  "signal": "(radius + 11) * sin(scale('angular', datum.key)) + 20" // Push Sodium label down
                },
                {
                  "signal": "(radius + 11) * sin(scale('angular', datum.key))"
                }
              ],
              "text": {"signal": "datum.key + ' (' + datum.unit + ')'"},
              "align": {"value": "center"},
              "baseline": [
                {
                  "test": "scale('angular', datum.key) > 0", "value": "top"
                },
                {
                  "test": "scale('angular', datum.key) == 0", "value": "middle"
                },
                {
                  "value": "bottom"
                }
              ],
              "fill": {"value": "black"},
              "fontSize": {"value": 12}
            }
          }
        },
        {
          "type": "line",
          "name": "twenty-line",
          "from": {"data": "keys"},
          "encode": {
            "enter": {
              "interpolate": {"value": "linear-closed"},
              "x": {"signal": "0.2 * radius * cos(scale('angular', datum.key))"},
              "y": {"signal": "0.2 * radius * sin(scale('angular', datum.key))"},
              "stroke": {"value": "lightgray"},
              "strokeWidth": {"value": 1}
            }
          }
        },
        {
          "type": "line",
          "name": "fourty-line",
          "from": {"data": "keys"},
          "encode": {
            "enter": {
              "interpolate": {"value": "linear-closed"},
              "x": {"signal": "0.4 * radius * cos(scale('angular', datum.key))"},
              "y": {"signal": "0.4 * radius * sin(scale('angular', datum.key))"},
              "stroke": {"value": "lightgray"},
              "strokeWidth": {"value": 1}
            }
          }
        },
        {
          "type": "line",
          "name": "sixty-line",
          "from": {"data": "keys"},
          "encode": {
            "enter": {
              "interpolate": {"value": "linear-closed"},
              "x": {"signal": "0.6 * radius * cos(scale('angular', datum.key))"},
              "y": {"signal": "0.6 * radius * sin(scale('angular', datum.key))"},
              "stroke": {"value": "lightgray"},
              "strokeWidth": {"value": 1}
            }
          }
        },
        {
          "type": "line",
          "name": "eighty-line",
          "from": {"data": "keys"},
          "encode": {
            "enter": {
              "interpolate": {"value": "linear-closed"},
              "x": {"signal": "0.8 * radius * cos(scale('angular', datum.key))"},
              "y": {"signal": "0.8 * radius * sin(scale('angular', datum.key))"},
              "stroke": {"value": "lightgray"},
              "strokeWidth": {"value": 1}
            }
          }
        },
        {
          "type": "line",
          "name": "outer-line",
          "from": {"data": "radial-grid"},
          "encode": {
            "enter": {
              "interpolate": {"value": "linear-closed"},
              "x": {"field": "x2"},
              "y": {"field": "y2"},
              "stroke": {"value": "lightgray"},
              "strokeWidth": {"value": 1}
            }
          }
        }
      ]
    }
  };

  const elem = document.createElement("div");
  elem.setAttribute("style", "display: inline-block; width: 250px; height: 300px; padding: 0px;");

  const chart = new google.visualization.VegaChart(elem);
  chart.draw(dataTable, options);

  document.getElementById("chart-area").appendChild(elem);
}

// Add CSS for Flexbox layout
const style = document.createElement('style');
style.innerHTML = `
  #chart-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;
document.head.appendChild(style);