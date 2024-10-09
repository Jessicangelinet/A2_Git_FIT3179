{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "Dataviz by David Bacci: https://www.linkedin.com/in/davbacci/",
  "autosize": "pad",
  "width": {"signal": "group1Width+group2Width+group3Width"},
  "height": 600,
  "padding": 5,
  "signals": [
    {"name": "group1Width", "update": "130"},
    {"name": "group2Width", "update": "100"},
    {"name": "group3Width", "update": "350"},
    {"name": "innerScaleSize", "update": "4"}
  ],
  "data": [
    {
      "name": "table",
      "url": "../A2_data/FoodConsumptionStatisticsofMalaysia.csv",
      "format": {"type": "csv", "parse": {"Estimated Population": "number"}},
      "transform": [
        {
          "type": "collect",
          "sort": {"field": "Estimated Population", "order": "descending"}
        },
        {
          "type": "window",
          "ops": ["rank"],
          "as": ["rank"]
        },
        {
          "type": "filter",
          "expr": "datum.rank <= 12"
        }
      ]
    },
    {
      "name": "linkTable",
      "source": ["table"],
      "transform": [
        {
          "type": "formula",
          "as": "shadow",
          "expr": "'M ' + group1Width + ' '  + scale('y', datum['Food Item / Type Of Food']) + ' L '+ scale('x', 0) + ' '+ scale('yInner', datum['Food Item / Type Of Food']) + ' L ' + scale('x', 0) + ' '  + (scale('yInner', datum['Food Item / Type Of Food'])+bandwidth('yInner'))  + ' L  ' + group1Width + ' '  + (scale('y', datum['Food Item / Type Of Food'])+bandwidth('y'))     "
        },
        {
          "type": "formula",
          "as": "arrow",
          "expr": "'M ' + ((scale('x', datum['Estimated Population'])) -1) + ' ' +  scale('yInner', datum['Food Item / Type Of Food']) + ' L ' +  (scale('x', datum['Estimated Population'])+bandwidth('yInner')/2) +' ' + (scale('yInner', datum['Food Item / Type Of Food'])+ bandwidth('yInner')/2)  +' L ' + ((scale('x', datum['Estimated Population']))-1) + ' ' + (scale('yInner', datum['Food Item / Type Of Food'])+ bandwidth('yInner'))         "
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "domain": {"data": "table", "field": "Estimated Population"},
      "nice": true,
      "range": {
        "signal": "[group1Width+group2Width,group1Width+group2Width+group3Width]"
      }
    },
    {
      "name": "y",
      "domain": {
        "data": "table",
        "field": "Food Item / Type Of Food",
        "sort": {"field": "Estimated Population", "op": "min", "order": "descending"}
      },
      "type": "band",
      "paddingInner": 0.1,
      "range": "height"
    },
    {
      "name": "yInner",
      "domain": {
        "data": "table",
        "field": "Food Item / Type Of Food",
        "sort": {"field": "Estimated Population", "op": "min", "order": "descending"}
      },
      "type": "band",
      "paddingInner": 0.1,
      "range": {
        "signal": "[height/innerScaleSize, height-(height/innerScaleSize)]"
      }
    },
    {
      "name": "colour",
      "type": "ordinal",
      "range": {"scheme": "category10"},
      "domain": {"data": "table", "field": "Food Item / Type Of Food"}
    }
  ],
  "marks": [
    {
      "type": "rect",
      "from": {"data": "table"},
      "name": "outerBars",
      "encode": {
        "enter": {
          "x": {"value": 0},
          "x2": {"signal": "group1Width"},
          "y": {"scale": "y", "field": "Food Item / Type Of Food"},
          "height": {"scale": "y", "band": 1}
        },
        "update": {
          "fill": [
            {
              "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 || datum.rank == 12",
              "value": "red"
            },
            {"value": "darkgrey"}
          ]
        }
      }
    },
    {
      "type": "path",
      "name": "shadows",
      "from": {"data": "linkTable"},
      "encode": {
        "update": {
          "strokeWidth": {"value": 0},
          "path": {"signal": "datum.shadow"},
          "fill": [
            {
              "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 || datum.rank == 12",
              "value": "red"
            },
            {
              "value": "grey"
            }
          ]
        }
      }
    },
    {
      "type": "rect",
      "from": {"data": "table"},
      "name": "innerBars",
      "encode": {
        "update": {
          "x": {"scale": "x", "value": 0},
          "x2": {"scale": "x", "field": "Estimated Population"},
          "y": {"scale": "yInner", "field": "Food Item / Type Of Food"},
          "height": {"scale": "yInner", "band": 1},
          "fill": [
            {
              "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 || datum.rank == 12",
              "value": "red"
            },
            {"value": "darkgrey"}
          ],
          "strokeWidth": {"value": 0},
          "stroke": [
            {
              "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 || datum.rank == 12",
              "value": "red"
            },
            {"value": "grey"}
          ],
          "cornerRadiusTopRight": {"value": 3},
          "cornerRadiusBottomRight": {"value": 3}
        }
      }
    },
    {
      "type": "path",
      "name": "arrows",
      "from": {"data": "linkTable"},
      "encode": {
        "update": {
          "path": {"signal": "datum.arrow"},
          "fill": [
            {
              "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 || datum.rank == 12",
              "value": "red"
            },
            {"value": "darkgrey"}
          ]
        }
      }
    },
    {
      "type": "text",
      "name": "ranks",
      "from": {"data": "table"},
      "encode": {
        "update": {
          "text": {"signal": "datum.rank"},
          "fill": {"signal": "'#f1f1f1'"},
          "font": {"value": "Impact"},
          "fontSize": {"value": 55},
          "y": {"signal": "scale('y', datum['Food Item / Type Of Food'])+bandwidth('y')/2"},
          "baseline": {"value": "middle"},
          "align": {"value": "center"},
          "x": {"signal": "group1Width/2"}
        }
      }
    },
    {
      "type": "text",
      "name": "names",
      "from": {"data": "table"},
      "encode": {
        "update": {
          "fill": {"signal": "'white'"},
          "text": {"field": "Food Item / Type Of Food"},
          "x": {"signal": "scale('x',datum['Estimated Population'])-20"},
          "fontWeight": {"value": "bold"},
          "align": {"value": "right"},
          "y": {"signal": "scale('yInner', datum['Food Item / Type Of Food'])+bandwidth('y')/4.5"}
        }
      }
    },
    {
      "type": "text",
      "name": "speed",
      "from": {"data": "names"},
      "encode": {
        "update": {
          "fill": {"signal": "'white'"},
          "text": {"signal": "datum.datum['Estimated Population']"},
          "x": {"signal": "datum.x"},
          "fontWeight": {"value": "normal"},
          "align": {"value": "right"},
          "y": {"signal": "datum.y"},
          "dy": {"value": 10}
        }
      }
    }
  ],
  "config": {"view": {"stroke": "red", "strokeWidth": 2}}
}