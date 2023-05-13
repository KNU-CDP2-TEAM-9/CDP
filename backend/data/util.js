const { findResultNode } = require("./neo4j");

const MakeSentence = async (list) => {
  let pList = [];
  let rList = [];
  let tList = [];
  let qList = [];
  let SentenceList = [];
  for (var i = 0; i < list.length; i++) {
    const obj = await findResultNode(list[i]);
    pList.push(obj.pathList);
    rList.push(obj.relList);
    tList.push(obj.NodeText);
    qList.push(obj.NodeQuery);
  }
  console.log(pList, rList);
  const changeList = pList.map((item) => {
    return item.join(" => ");
  });
  SentenceList.push(changeList.join("*"));

  const changeList_2 = rList.map((item) => {
    return item.join(">");
  });

  SentenceList.push(changeList_2.join(">"));

  SentenceList.push(tList.join("*"));
  SentenceList.push(qList.join("*"));
  // 0 -> path 1 -> rel 2 -> NodeText 3 -> NodeQuery
  const sentence = SentenceList.join("/");

  return sentence;
};

exports.MakeSentence = MakeSentence;
