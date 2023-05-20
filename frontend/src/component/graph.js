import React, { useEffect } from "react";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import klay from "cytoscape-klay";
import euler from "cytoscape-euler";

const Graph = (props) => {
  cytoscape.use(klay);
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
              "text-valign": "center",
              "text-halign": "right", // 레이블을 노드의 오른쪽에 표시
              "text-margin-x": "10px", // 레이블과 노드와의 가로 간격을 설정
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
          name: "klay",
          animate: false,
          idealEdgeLength: 100,
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
