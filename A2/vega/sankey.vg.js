{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "Sankey Diagram of Nutrient Information for Apples, Pineapples, Canned Sardine, Sambal Shrimp, Broccoli, Spinach, Eggs, and Dosai",
  "width": 1000,
  "height": 800,
  "padding": {"bottom": 20, "left": 20, "right": 30, "top": 40},
  "signals": [
    {
      "name": "standardGap",
      "value": 14,
      "description": "Gap as a percentage of full domain"
    },
    {
      "name": "base",
      "value": "center",
      "description": "How to stack(center or zero)"
    }
  ],
  "data": [
    {
      "name": "input",
      "values": [
        {"category": "Apple", "stack": 1, "sort": 1, "labels": "left"},
        {"category": "Pineapple", "stack": 1, "sort": 2, "labels": "left"},
        {"category": "Canned Sardine", "stack": 1, "sort": 3, "labels": "left"},
        {"category": "Sambal Shrimp", "stack": 1, "sort": 4, "labels": "left"},
        {"category": "Broccoli", "stack": 1, "sort": 5, "labels": "left"},
        {"category": "Spinach", "stack": 1, "sort": 6, "labels": "left"},
        {"category": "Eggs", "stack": 1, "sort": 7, "labels": "left"},
        {"category": "Dosai", "stack": 1, "sort": 8, "labels": "left"},
        {"category": "Macro-nutrients", "stack": 2, "sort": 1, "labels": "left"},
        {"category": "Micro-nutrients", "stack": 2, "sort": 2, "labels": "left"},
        {"category": "Carbohydrate", "stack": 3, "sort": 1, "labels": "left"},
        {"category": "Dietary Fiber", "stack": 3, "sort": 2, "labels": "left"},
        {"category": "Sugars", "stack": 3, "sort": 3, "labels": "left"},
        {"category": "Protein", "stack": 3, "sort": 4, "labels": "left"},
        {"category": "Fat", "stack": 3, "sort": 5, "labels": "left"},
        {"category": "Saturated Fat", "stack": 3, "sort": 6, "labels": "left"},
        {"category": "Trans Fat", "stack": 3, "sort": 7, "labels": "left"},
        {"category": "Vitamins", "stack": 3, "sort": 8, "labels": "left"},
        {"category": "Minerals", "stack": 3, "sort": 9, "labels": "left"},
        {"category": "Fat-Soluble", "stack": 4, "sort": 1, "labels": "left"},
        {"category": "Water-Soluble", "stack": 4, "sort": 2, "labels": "left"},
        {"category": "Macro-Minerals", "stack": 4, "sort": 3, "labels": "left"},
        {"category": "Micro-Minerals", "stack": 4, "sort": 4, "labels": "left"},
        {"category": "Vitamin A", "stack": 5, "sort": 1, "labels": "left"},
        {"category": "Vitamin D", "stack": 5, "sort": 2, "labels": "left"},
        {"category": "Vitamin E", "stack": 5, "sort": 3, "labels": "left"},
        {"category": "Vitamin K", "stack": 5, "sort": 4, "labels": "left"},
        {"category": "Thiamin (B1)", "stack": 5, "sort": 5, "labels": "left"},
        {"category": "Riboflavin (B2)", "stack": 5, "sort": 6, "labels": "left"},
        {"category": "Niacin (B3)", "stack": 5, "sort": 7, "labels": "left"},
        {"category": "Ascorbic Acid (Vitamin C)", "stack": 5, "sort": 8, "labels": "left"},
        {"category": "Calcium (Ca+)", "stack": 5, "sort": 9, "labels": "left"},
        {"category": "Phosphorus (P+)", "stack": 5, "sort": 10, "labels": "left"},
        {"category": "Potassium (K+)", "stack": 5, "sort": 11, "labels": "left"},
        {"category": "Sodium (Na+)", "stack": 5, "sort": 12, "labels": "left"},
        {"category": "Iron (Fe++)", "stack": 5, "sort": 13, "labels": "left"},
        {"category": "Zinc (Zn++)", "stack": 5, "sort": 14, "labels": "left"},
        {"source": "Apple", "destination": "Macro-nutrients", "value": 16},
        {"source": "Apple", "destination": "Micro-nutrients", "value": 0.279},
        {"source": "Pineapple", "destination": "Macro-nutrients", "value": 11.6},
        {"source": "Pineapple", "destination": "Micro-nutrients", "value": 0.174},
        {"source": "Canned Sardine", "destination": "Macro-nutrients", "value": 22.5},
        {"source": "Canned Sardine", "destination": "Micro-nutrients", "value": 2.7},
        {"source": "Sambal Shrimp", "destination": "Macro-nutrients", "value": 31.8},
        {"source": "Sambal Shrimp", "destination": "Micro-nutrients", "value": 2.8},
        {"source": "Broccoli", "destination": "Macro-nutrients", "value": 6.9},
        {"source": "Broccoli", "destination": "Micro-nutrients", "value": 0.7},
        {"source": "Spinach", "destination": "Macro-nutrients", "value": 6.7},
        {"source": "Spinach", "destination": "Micro-nutrients", "value": 4.6},
        {"source": "Eggs", "destination": "Macro-nutrients", "value": 24.9},
        {"source": "Eggs", "destination": "Micro-nutrients", "value": 2.4},
        {"source": "Dosai", "destination": "Macro-nutrients", "value": 34.2},
        {"source": "Dosai", "destination": "Micro-nutrients", "value": 0.437},
        {"source": "Macro-nutrients", "destination": "Carbohydrate", "value": 23.7},
        {"source": "Macro-nutrients", "destination": "Dietary Fiber", "value": 2.6},
        {"source": "Macro-nutrients", "destination": "Protein", "value": 0.5},
        {"source": "Macro-nutrients", "destination": "Fat", "value": 0.5},
        {"source": "Micro-nutrients", "destination": "Vitamins", "value": 0.0152},
        {"source": "Micro-nutrients", "destination": "Minerals", "value": 0.437},
        {"source": "Vitamins", "destination": "Fat-Soluble", "value": 0.024},
        {"source": "Vitamins", "destination": "Water-Soluble", "value": 0.146},
        {"source": "Minerals", "destination": "Macro-Minerals", "value": 0.14},
        {"source": "Minerals", "destination": "Micro-Minerals", "value": 0.018},
        {"source": "Fat-Soluble", "destination": "Vitamin A", "value": 0.024},
        {"source": "Water-Soluble", "destination": "Ascorbic Acid (Vitamin C)", "value": 0.146},
        {"source": "Macro-Minerals", "destination": "Calcium (Ca+)", "value": 0.033},
        {"source": "Macro-Minerals", "destination": "Phosphorus (P+)", "value": 0.015},
        {"source": "Macro-Minerals", "destination": "Potassium (K+)", "value": 0.187},
        {"source": "Macro-Minerals", "destination": "Sodium (Na+)", "value": 0.032},
        {"source": "Micro-Minerals", "destination": "Iron (Fe++)", "value": 0.016},
        {"source": "Micro-Minerals", "destination": "Zinc (Zn++)", "value": 0.008}
      ]
    },
    {
      "name": "stacks",
      "source": "input",
      "transform": [
        {"type": "filter", "expr": "datum.source != null"},
        {"type": "formula", "as": "end", "expr": "['source','destination']"},
        {
          "type": "formula",
          "as": "name",
          "expr": "[ datum.source,datum.destination]"
        },
        {"type": "project", "fields": ["end", "name", "value"]},
        {"type": "flatten", "fields": ["end", "name"]},
        {
          "type": "lookup",
          "from": "input",
          "key": "category",
          "values": ["stack", "sort", "gap", "labels"],
          "fields": ["name"],
          "as": ["stack", "sort", "gap", "labels"]
        },
        {
          "type": "aggregate",
          "fields": ["value", "stack", "sort", "gap", "labels"],
          "groupby": ["end", "name"],
          "ops": ["sum", "max", "max", "max", "max"],
          "as": ["value", "stack", "sort", "gap", "labels"]
        },
        {
          "type": "aggregate",
          "fields": ["value", "stack", "sort", "gap", "labels"],
          "groupby": ["name"],
          "ops": ["max", "max", "max", "max", "max"],
          "as": ["value", "stack", "sort", "gap", "labels"]
        },
        {"type": "formula", "as": "gap", "expr": "datum.gap?datum.gap:0"}
      ]
    },
    {
      "name": "maxValue",
      "source": ["stacks"],
      "transform": [
        {
          "type": "aggregate",
          "fields": ["value"],
          "groupby": ["stack"],
          "ops": ["sum"],
          "as": ["value"]
        },
        {
          "type": "aggregate",
          "fields": ["value"],
          "ops": ["max"],
          "as": ["value"]
        }
      ]
    },
    {
      "name": "plottedStacks",
      "source": ["stacks"],
      "transform": [
        {
          "type": "formula",
          "as": "spacer",
          "expr": " (data('maxValue')[0].value/100)*(standardGap+datum.gap)"
        },
        {"type": "formula", "as": "type", "expr": "['data','spacer']"},
        {
          "type": "formula",
          "as": "spacedValue",
          "expr": "[datum.value,datum.spacer]"
        },
        {"type": "flatten", "fields": ["type", "spacedValue"]},
        {
          "type": "stack",
          "groupby": ["stack"],
          "sort": {"field": "sort", "order": "descending"},
          "field": "spacedValue",
          "offset": {"signal": "base"}
        },
        {"type": "formula", "expr": "((datum.value)/2)+datum.y0", "as": "yc"}
      ]
    },
    {
      "name": "finalTable",
      "source": ["plottedStacks"],
      "transform": [{"type": "filter", "expr": "datum.type == 'data'"}]
    },
    {
      "name": "linkTable",
      "source": ["input"],
      "transform": [
        {"type": "filter", "expr": "datum.source != null"},
        {
          "type": "lookup",
          "from": "finalTable",
          "key": "name",
          "values": ["y0", "y1", "stack", "sort"],
          "fields": ["source"],
          "as": ["sourceStacky0", "sourceStacky1", "sourceStack", "sourceSort"]
        },
        {
          "type": "lookup",
          "from": "finalTable",
          "key": "name",
          "values": ["y0", "y1", "stack", "sort"],
          "fields": ["destination"],
          "as": [
            "destinationStacky0",
            "destinationStacky1",
            "destinationStack",
            "destinationSort"
          ]
        },
        {
          "type": "stack",
          "groupby": ["source"],
          "sort": {"field": "destinationSort", "order": "descending"},
          "field": "value",
          "offset": "zero",
          "as": ["syi0", "syi1"]
        },
        {
          "type": "formula",
          "expr": "datum.syi0+datum.sourceStacky0",
          "as": "sy0"
        },
        {"type": "formula", "expr": "datum.sy0+datum.value", "as": "sy1"},
        {
          "type": "stack",
          "groupby": ["destination"],
          "sort": {"field": "sourceSort", "order": "descending"},
          "field": "value",
          "offset": "zero",
          "as": ["dyi0", "dyi1"]
        },
        {
          "type": "formula",
          "expr": "datum.dyi0+datum.destinationStacky0",
          "as": "dy0"
        },
        {"type": "formula", "expr": "datum.dy0+datum.value", "as": "dy1"},
        {"type": "formula", "expr": "((datum.value)/2)+datum.sy0", "as": "syc"},
        {"type": "formula", "expr": "((datum.value)/2)+datum.dy0", "as": "dyc"},
        {
          "type": "linkpath",
          "orient": "horizontal",
          "shape": "diagonal",
          "sourceY": {"expr": "scale('y', datum.syc)"},
          "sourceX": {
            "expr": "scale('x', toNumber(  datum.sourceStack))+ bandwidth('x')"
          },
          "targetY": {"expr": "scale('y', datum.dyc)"},
          "targetX": {"expr": "scale('x', datum.destinationStack)"}
        },
        {
          "type": "formula",
          "expr": "range('y')[0]-scale('y', datum.value)",
          "as": "strokeWidth"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "range": "width",
      "domain": {"data": "finalTable", "field": "stack"},
      "paddingInner": 0.88
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "finalTable", "field": "y1"},
      "reverse": false
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": {"scheme": "rainbow"},
      "domain": {"data": "stacks", "field": "name"}
    }
  ],
  "marks": [
    {
      "type": "rect",
      "from": {"data": "finalTable"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "stack"},
          "width": {"scale": "x", "band": 1},
          "y": {"scale": "y", "field": "y0"},
          "y2": {"scale": "y", "field": "y1"},
          "fill": {"scale": "color", "field": "name"},
          "fillOpacity": {"value": 0.75},
          "strokeWidth": {"value": 0},
          "stroke": {"scale": "color", "field": "name"}
        },
        "hover": {
          "tooltip": {
            "signal": "{'Name':datum.name, 'Value':format(datum.value, '')}"
          },
          "fillOpacity": {"value": 1}
        }
      }
    },
    {
      "type": "path",
      "name": "links",
      "from": {"data": "linkTable"},
      "clip": true,
      "encode": {
        "update": {
          "strokeWidth": {"field": "strokeWidth"},
          "path": {"field": "path"},
          "strokeOpacity": {"signal": "0.3"},
          "stroke": {"field": "destination", "scale": "color"}
        },
        "hover": {
          "strokeOpacity": {"value": 1},
          "tooltip": {
            "signal": "{'Source':datum.source,'Destination':datum.destination, 'Value':format(datum.value, '')}"
          }
        }
      }
    },
    {
      "type": "group",
      "name": "labelText",
      "zindex": 1,
      "from": {
        "facet": {
          "data": "finalTable",
          "name": "labelFacet",
          "groupby": ["name", "stack", "yc", "value", "labels"]
        }
      },
      "clip": false,
      "encode": {
        "update": {
          "strokeWidth": {"value": 1},
          "stroke": {"value": "red"},
          "x": {
            "signal": "datum.labels=='left'?scale('x', datum.stack)-8 : scale('x', datum.stack) + (bandwidth('x')) +8"
          },
          "yc": {"scale": "y", "signal": "datum.yc"},
          "width": {"signal": "0"},
          "height": {"signal": "0"},
          "fillOpacity": {"signal": "0.1"}
        }
      },
      "marks": [
        {
          "type": "text",
          "name": "heading",
          "from": {"data": "labelFacet"},
          "encode": {
            "update": {
              "x": {"value": 0},
              "y": {"value": -2},
              "text": {"field": "name"},
              "align": {"signal": "datum.labels=='left'?'right':'left'"},
              "fontWeight": {"value": "normal"}
            }
          }
        },
        {
          "type": "text",
          "name": "amount",
          "from": {"data": "labelFacet"},
          "encode": {
            "update": {
              "x": {"value": 0},
              "y": {"value": 12},
              "text": {"signal": " format(datum.value, '')"},
              "align": {"signal": "datum.labels=='left'?'right':'left'"}
            }
          }
        }
      ]
    },
    {
     
      "type": "rect",
      "from": {"data": "labelText"},
      "encode": {
        "update": {
          "x": {"field": "bounds.x1", "offset": -2},
          "x2": {"field": "bounds.x2", "offset": 2},
          "y": {"field": "bounds.y1", "offset": -2},
          "y2": {"field": "bounds.y2", "offset": 2},
          "fill": {"value": "white"},
          "opacity": {"value": 0.8},
          "cornerRadius": {"value": 4}
        }
      }
    },
    {
      "type": "text",
      "data": [{}],
      "encode": {
        "update": {
          "text": {
            "value": [
              "Source: Nutrition Facts by https://myfcd.moh.gov.my/"
            ]
          },
          "align": {"value": "left"},
          "lineHeight": {"value": 16},
          "fill": {"value": "#595959"},
          "x": {"signal": "-150"},
          "y": {"signal": "height +70"},
          "fontSize": {"value": 10}
        }
      }
    }
  ],
  "config": {
    "view": {"stroke": "transparent"},
    "text": {"fontSize": 13, "fill": "#333333"}
  }
}