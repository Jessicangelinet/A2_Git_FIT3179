{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Bar chart showing the top 12 most populated food items with specific ranks colored red and bold y-axis labels for specific ranks.",
    "data": {
      "url": "../A2_data/FoodConsumptionStatisticsofMalaysia.csv",
      "format": {"type": "csv", "parse": {"Estimated Population": "number"}}
    },
    "transform": [
      {
        "window": [{"op": "rank", "as": "rank"}],
        "sort": [{"field": "Estimated Population", "order": "descending"}]
      },
      {
        "filter": "datum.rank <= 12"
      }
    ],
    "mark": "bar",
    "encoding": {
      "y": {
        "field": "Food Item / Type Of Food",
        "type": "nominal",
        "sort": "-x",
        "axis": {
          "title": "Food Item / Type Of Food",
          "grid": false,
          "labelExpr": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 ? datum.label + ' (bold)' : datum.label",
          "labelFontWeight": {
            "condition": {
              "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10",
              "value": "bold"
            },
            "value": "normal"
          }
        }
      },
      "x": {
        "field": "Estimated Population",
        "type": "quantitative",
        "axis": {"title": "Estimated Population", "grid": false}
      },
      "color": {
        "condition": {
          "test": "datum.rank == 4 || datum.rank == 6 || datum.rank == 9 || datum.rank == 10 || datum.rank == 12",
          "value": "red"
        },
        "value": "grey"
      }
    },
    "width": 600,
    "height": 400
  }