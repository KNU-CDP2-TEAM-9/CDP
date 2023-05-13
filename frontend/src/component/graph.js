import React, { useEffect } from "react";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";

const Graph = (props) => {
  cytoscape.use(coseBilkent);
  useEffect(() => {
    if (props.data !== undefined) {
      const data = props.data;
      const cy = cytoscape({
        container: document.getElementById("cy"),
        elements: data,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#666",
              label: "data(name)",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "source-arrow-color": "#ccc",
              "source-arrow-shape": "vee",
            },
          },
        ],
        layout: {
          name: "cose",
          animate: false,
          idealEdgeLength: 1000,
          avoidOverlap: true,
          nodeOverlap: 1000,
          fit: true,
          tile: true,
          nodeSpacing: 500,
        },
      });
    }
  }, [props.data]);

  return <div id="cy" style={{ width: "1920px", height: "1080px" }} />;
};
export default Graph;
