const { findResultNode } = require("./neo4j");

const MakeSentence = async (list) => {
  const strList = await Promise.all(
    list.map((item) => {
      const list = findResultNode(item);
      return list;
    })
  );

  const changeList = strList.map((item) => {
    return item.join(" => ");
  });

  const sentence = changeList.join("\n");

  return sentence;
};

exports.MakeSentence = MakeSentence;
