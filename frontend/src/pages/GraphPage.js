import { useEffect, useState } from "react";
import Graph from "../component/graph";

const GraphPage = () => {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    const LoadData = async () => {
      const response = await fetch("http://localhost:8080/showGraph", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      setGraphData(resData.data);
      return resData.data;
    };
    LoadData();
  }, []);

  return <Graph data={graphData}></Graph>;
};

export default GraphPage;
