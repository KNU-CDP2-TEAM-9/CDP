const { findResultNode } = require("./neo4j");

const MakeSentence = async (list) => {
  let pList = [];
  let rList = [];
  let SentenceList = [];
  for (var i = 0; i < list.length; i++) {
    const obj = await findResultNode(list[i]);
    pList.push(obj.pathList);
    rList.push(obj.relList);
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

  const sentence = SentenceList.join("/");

  return sentence;
};

exports.MakeSentence = MakeSentence;
