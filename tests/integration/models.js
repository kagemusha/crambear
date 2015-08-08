//make these factories at some point, should be immutable for now
export default {
  card: {front: '前', back: '後ろ'},
  cardSet: {
    name: '大名',
    cards: [
      {front: '信玄', back: '武田'},
      {front: '谦信', back: '上杉'},
     ],
    tags: [
      {name: 'archived'}
    ]
  }
};
