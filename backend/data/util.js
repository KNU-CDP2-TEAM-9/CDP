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
  const changeList = pList.map((item) => {
    return item.join(" => ");
  });
  SentenceList.push(changeList.join("*"));

  const changeList_2 = rList.map((item) => {
    return item.join(">");
  });
  const changeList_3 = qList.map((item) => {
    return item.join(">");
  });

  SentenceList.push(changeList_2.join(">"));

  SentenceList.push(tList.join("|"));
  SentenceList.push(changeList_3.join(">"));
  // 0 -> path 1 -> rel 2 -> NodeText 3 -> NodeQuery
  const sentence = SentenceList.join(";");
  console.log(sentence);

  return sentence;
};

exports.MakeSentence = MakeSentence;
