const neo4j = require("neo4j-driver");

const Driver = () => {
  const uri = "neo4j+s://de4caf89.databases.neo4j.io";
  const user = "neo4j";
  const password = "nwSrHUouGkIynfUt4UuxcmNRIpHU4WeD3JwWYBv4yF4";

  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  return driver;
};

const findAllNode = async () => {
  const driver = Driver();
  let result = [];
  try {
    result = await printAllSession();
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  } finally {
    await driver.close();
  }

  async function printAllSession() {
    let list = [];
    const session = driver.session({ database: "neo4j" });
    try {
      const query = `MATCH (n:Node) RETURN n`;
      const readResult = await session.executeRead((tx) => tx.run(query));
      readResult.records.forEach((record) => {
        list.push(record.get("n").properties.Name);
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
    return list;
  }
  return result;
};

const findResultNode = async (target) => {
  const driver = Driver();
  let pathList = [];
  let relList = [];
  let NodeQuery = "";
  let NodeText = "";
  let result = {};
  try {
    pathList = await printPathSession(target);
    relList = await printChildSession(target);
    NodeQuery = await printQuerySession(target);
    NodeText = await printTextSession(target);
    result.pathList = pathList;
    result.relList = relList;
    result.NodeQuery = NodeQuery;
    result.NodeText = NodeText;
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  } finally {
    await driver.close();
  }

  async function printPathSession(target) {
    let list = [];
    const session = driver.session({ database: "neo4j" });
    try {
      // 쿼리
      const query = `MATCH path = (start:KyungpookUniversity {Name: '경북대학교'})-[*]->(end:Node {Name: $target}) UNWIND nodes(path) AS node RETURN DISTINCT node`;
      const readResult = await session.executeRead((tx) =>
        tx.run(query, { target })
      );
      readResult.records.forEach((record) => {
        list.push(record.get("node").properties.Name);
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
    return list;
  }

  async function printChildSession(target) {
    let list = [];
    const session = driver.session({ database: "neo4j" });
    try {
      // 쿼리
      const query = `match (start:Node {Name:$target})-[:다음경로]->(end:Node) return end`;
      const readResult = await session.executeRead((tx) =>
        tx.run(query, { target })
      );
      readResult.records.forEach((record) => {
        list.push(record.get("end").properties.Name);
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
    return list;
  }

  async function printQuerySession(target) {
    let q = [];
    const session = driver.session({ database: "neo4j" });
    try {
      // 쿼리
      const query = `match (n:Node {Name: $target})-[:question]-(m) return m`;
      const readResult = await session.executeRead((tx) =>
        tx.run(query, { target })
      );
      readResult.records.forEach((record) => {
        q.push(record.get("m").properties.Text);
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
    return q;
  }

  async function printTextSession(target) {
    let text = "";
    const session = driver.session({ database: "neo4j" });
    try {
      // 쿼리
      const query = `match (n:Node {Name: $target}) return n`;
      const readResult = await session.executeRead((tx) =>
        tx.run(query, { target })
      );
      readResult.records.forEach((record) => {
        text = record.get("n").properties.Text;
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
    return text;
  }
  return result;
};

const GraphData = async () => {
  const driver = Driver();
  let result = [];
  try {
    result = await printAllSession();
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  } finally {
    await driver.close();
  }

  async function printAllSession() {
    let list = [];
    let rList = [];
    const session = driver.session({ database: "neo4j" });
    try {
      const query = `MATCH p=()-[]->() RETURN p`;
      const readResult = await session.executeRead((tx) => tx.run(query));
      readResult.records.forEach((record) => {
        list.push({
          data: {
            name: record.get("p").segments[0].start.properties.Name,
            id: record.get("p").segments[0].relationship.startNodeElementId,
          },
        });
        list.push({
          data: {
            name: record.get("p").segments[0].end.properties.Name,
            id: record.get("p").segments[0].relationship.endNodeElementId,
          },
        });
        list.push({
          data: {
            name: record.get("p").segments[0].relationship.type,
            id: record.get("p").segments[0].relationship.elementId,
            source: record.get("p").segments[0].relationship.startNodeElementId,
            target: record.get("p").segments[0].relationship.endNodeElementId,
          },
        });
      });
      rList = list.filter((character, idx, arr) => {
        return (
          arr.findIndex((item) => item.data.id === character.data.id) === idx
        );
      });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
    return rList;
  }
  return result;
};

exports.findResultNode = findResultNode;
exports.findAllNode = findAllNode;
exports.GraphData = GraphData;
