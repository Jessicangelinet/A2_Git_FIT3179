google.charts.load('upcoming', {'packages': ['vegachart']}).then(loadCharts);

const lasagna = [
  ["Protein",0.1308,"Lasagna, cheese, frozen, prepared"],
  ["Carbohydrates",0.05032727272727273,"Lasagna, cheese, frozen, prepared"],
  ["Vitamin C",0.228,"Lasagna, cheese, frozen, prepared"],
  ["Calcium",0.08538461538461538,"Lasagna, cheese, frozen, prepared"],
  ["Zinc",0.11375,"Lasagna, cheese, frozen, prepared"],
  ["Sodium",0.18933333333333333,"Lasagna, cheese, frozen, prepared"]
];

const pork = [
  ["Protein",0.2638,"Pulled pork in barbecue sauce"],
  ["Carbohydrates",0.06814545454545454,"Pulled pork in barbecue sauce"],
  ["Vitamin C",0.002666666666666667,"Pulled pork in barbecue sauce"],
  ["Calcium",0.033846153846153845,"Pulled pork in barbecue sauce"],
  ["Zinc",0.23125,"Pulled pork in barbecue sauce"],
  ["Sodium",0.444,"Pulled pork in barbecue sauce"]
];

const melon = [
  ["Protein",0.0168,"Melons, cantaloupe, raw"],
  ["Carbohydrates",0.029672727272727274,"Melons, cantaloupe, raw"],
  ["Vitamin C",0.4893333333333334,"Melons, cantaloupe, raw"],
  ["Calcium",0.006923076923076923,"Melons, cantaloupe, raw"],
  ["Zinc",0.0225,"Melons, cantaloupe, raw"],
  ["Sodium",0.010666666666666666,"Melons, cantaloupe, raw"]
];

function loadCharts() {
  addChart(lasagna[0][2], lasagna, "#B82E2E");
  addChart(pork[0][2], pork, "#6633CC");
  addChart(melon[0][2], melon, "#109618");
};

function addChart(title, data, color) {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: 'string', 'id': 'key'});
  dataTable.addColumn({type: 'number', 'id': 'value'});
  dataTable.addColumn({type: 'string', 'id': 'category'});
  dataTable.addRows(data);

  const options = {
    'vega': {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "width": 250,
      "height": 300,
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
              "groupby": ["key"]
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
          "domain": [0,0.5],
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
                  "x": {"signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))"},
                  "y": {"signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))"},
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
                  "test": "sin(scale('angular', datum.key)) > 0",
                  "signal": "5 + (radius + 11) * sin(scale('angular', datum.key))"
                },
                {
                  "test": "sin(scale('angular', datum.key)) < 0",
                  "signal": "-5 + (radius + 11) * sin(scale('angular', datum.key))"
                },
                {
                  "signal": "(radius + 11) * sin(scale('angular', datum.key))"
                }
              ],
              "text": {"field": "key"},
              "align":
                {
                  "value": "center"
                },
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
  elem.setAttribute("style", "display: inline-block; width: 250px; height: 300px; padding: 20px;");

  const chart = new google.visualization.VegaChart(elem);
  chart.draw(dataTable, options);

  document.getElementById("chart-area").appendChild(elem);
}