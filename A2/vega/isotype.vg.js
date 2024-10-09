{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "config": {"view": {"stroke": ""}},
    "width": 400,
    "height": 100,
    "data": {
      "values": [
        {"id": 1, "color": "red"},
        {"id": 2, "color": "red"},
        {"id": 3, "color": "grey"},
        {"id": 4, "color": "grey"},
        {"id": 5, "color": "grey"}
      ]
    },
    "transform": [
      {"calculate": "datum.id", "as": "col"},
      {"calculate": "0", "as": "row"}
    ],
    "mark": {"type": "point", "filled": true},
    "encoding": {
      "x": {"field": "col", "type": "ordinal", "axis": null},
      "y": {"field": "row", "type": "ordinal", "axis": null},
      "shape": {
        "value": "M1.7 -1.7h-0.8c0.3 -0.2 0.6 -0.5 0.6 -0.9c0 -0.6 -0.4 -1 -1 -1c-0.6 0 -1 0.4 -1 1c0 0.4 0.2 0.7 0.6 0.9h-0.8c-0.4 0 -0.7 0.3 -0.7 0.6v1.9c0 0.3 0.3 0.6 0.6 0.6h0.2c0 0 0 0.1 0 0.1v1.9c0 0.3 0.2 0.6 0.3 0.6h1.3c0.2 0 0.3 -0.3 0.3 -0.6v-1.8c0 0 0 -0.1 0 -0.1h0.2c0.3 0 0.6 -0.3 0.6 -0.6v-2c0.2 -0.3 -0.1 -0.6 -0.4 -0.6z"
      },
      "color": {
        "field": "color",
        "type": "nominal",
        "scale": null
      },
      "size": {"value": 90}
    }
  }