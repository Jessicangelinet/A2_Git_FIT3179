{
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "Sankey Chart by David Bacci: https://www.linkedin.com/in/davbacci/",
    "width": 1000,
    "height": 800,
    "padding": {"bottom": 20, "left": 20, "right": 30, "top": 40},

    "background": "#fafafa",
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
          {
            "category": "Server Products & Cloud",
            "stack": 1,
            "sort": 1,
            "labels": "left"
          },
          {
            "category": "Enterprise Services",
            "stack": 1,
            "sort": 2,
            "labels": "left",
            "gap": 20
          },
          {
            "category": "Office Products",
            "stack": 1,
            "sort": 3,
            "labels": "left"
          },
          {"category": "LinkedIn", "stack": 1, "sort": 4, "labels": "left"},
          {"category": "Other", "stack": 1, "sort": 5, "labels": "left"},
          {"category": "Windows", "stack": 1, "sort": 6, "labels": "left"},
          {"category": "Gaming", "stack": 1, "sort": 7, "labels": "left"},
          {
            "category": "Search & News Advertising",
            "stack": 1,
            "sort": 8,
            "labels": "left"
          },
          {"category": "Devices", "stack": 1, "sort": 9, "labels": "left"},
          {"category": "Intelligent Cloud", "stack": 2, "sort": 1},
          {"category": "Productivity", "stack": 2, "sort": 2},
          {"category": "Personal Computing", "stack": 2, "sort": 3},
          {"category": "Revenue", "stack": 3},
          {"category": "Gross Profit", "stack": 4, "sort": 1, "gap": 30},
          {"category": "Cost of Revenue", "stack": 4, "sort": 2, "gap": 30},
          {"category": "Operating Profit", "stack": 5, "sort": 1, "gap": 60},
          {"category": "Operating Expenses", "stack": 5, "sort": 2, "gap": 30},
          {"category": "Product Costs", "stack": 5, "sort": 3, "gap": 20},
          {"category": "Service Costs", "stack": 5, "sort": 4, "gap": 20},
          {"category": "Net Profit", "stack": 6, "sort": 1, "gap": 0},
          {"category": "Tax", "stack": 6, "sort": 2, "gap": 0},
          {"category": "R&D", "stack": 6, "sort": 3, "gap": 20},
          {"category": "S&M", "stack": 6, "sort": 4, "gap": 0},
          {"category": "G&A", "stack": 6, "sort": 5, "gap": 0},
          {
            "source": "Server Products & Cloud",
            "destination": "Intelligent Cloud",
            "value": 19.6
          },
          {
            "source": "Enterprise Services",
            "destination": "Intelligent Cloud",
            "value": 1.9
          },
          {
            "source": "Office Products",
            "destination": "Productivity",
            "value": 11.8
          },
          {"source": "LinkedIn", "destination": "Productivity", "value": 3.9},
          {"source": "Other", "destination": "Productivity", "value": 1.3},
          {
            "source": "Windows",
            "destination": "Personal Computing",
            "value": 4.8
          },
          {"source": "Gaming", "destination": "Personal Computing", "value": 4.8},
          {
            "source": "Search & News Advertising",
            "destination": "Personal Computing",
            "value": 3.2
          },
          {
            "source": "Devices",
            "destination": "Personal Computing",
            "value": 1.4
          },
          {
            "source": "Intelligent Cloud",
            "destination": "Revenue",
            "value": 21.5
          },
          {"source": "Productivity", "destination": "Revenue", "value": 17},
          {
            "source": "Personal Computing",
            "destination": "Revenue",
            "value": 14.2
          },
          {"source": "Revenue", "destination": "Gross Profit", "value": 35.2},
          {"source": "Revenue", "destination": "Cost of Revenue", "value": 17.5},
          {
            "source": "Gross Profit",
            "destination": "Operating Profit",
            "value": 20.4
          },
          {
            "source": "Gross Profit",
            "destination": "Operating Expenses",
            "value": 14.8
          },
          {
            "source": "Cost of Revenue",
            "destination": "Product Costs",
            "value": 5.7
          },
          {
            "source": "Cost of Revenue",
            "destination": "Service Costs",
            "value": 11.8
          },
          {
            "source": "Operating Profit",
            "destination": "Net Profit",
            "value": 16.4
          },
          {"source": "Operating Profit", "destination": "Tax", "value": 3.9},
          {"source": "Operating Expenses", "destination": "R&D", "value": 6.8},
          {"source": "Operating Expenses", "destination": "S&M", "value": 5.7},
          {"source": "Operating Expenses", "destination": "G&A", "value": 2.3}
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
              "signal": "{'Name':datum.name, 'Value':format(datum.value, '$') + 'B'}"
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
              "signal": "{'Source':datum.source,'Destination':datum.destination, 'Value':format(datum.value, '$') + 'B'}"
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
                "text": {"signal": " format(datum.value, '$') + 'B'"},
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
                "Source: https://www.microsoft.com/en-us/investor/earnings/fy-2023-q2/income-statements",
                "Dataviz: Jessica Angeline Tjandra"
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