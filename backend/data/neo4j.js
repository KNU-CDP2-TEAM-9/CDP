const neo4j = require("neo4j-driver");

const Driver = () => {
  const uri = "neo4j+s://b8534646.databases.neo4j.io";
  const user = "neo4j";
  const password = "HgE2QMGyR3nKVEB2AxBZmft5jWp_Ue76T48Ym9Obrtw";

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
      const query = `MATCH (n:노드) RETURN n`;
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
  let result = {};
  try {
    pathList = await printPathSession(target);
    relList = await printChildSession(target);
    result.pathList = pathList;
    result.relList = relList;
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
      const query = `MATCH path = (start:경북대 {Name: '경북대학교'})-[*]->(end:노드 {Name: $target}) UNWIND nodes(path) AS node RETURN DISTINCT node`;
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
      const query = `match (start:노드 {Name:$target})-[:다음경로]->(end:노드) return end`;
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
  return result;
};

exports.findResultNode = findResultNode;
exports.findAllNode = findAllNode;
