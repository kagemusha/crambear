//make these factories at some point, should be immutable for now
let tag1 = {name: 'archived'};

export default {
  card: {front: '前', back: '後ろ'},
  cardSet: {
    name: '大名',
    cardCount: 2,
    cards: [
      {front: '信玄', back: '武田', tags: [tag1]},
      {front: '谦信', back: '上杉'},
     ],
    tags: [
      tag1,
      {name: 'important'},
    ]
  }
};
