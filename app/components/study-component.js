/* global _ */
import Ember from 'ember';
import ClientStorage from 'crambear/util/client-storage';

const readOnly = Ember.computed.readOnly;

/*
  this is a hash where
 */
const Results = Ember.Object.extend({
  ids: null,
  results: {},
  init() {
    this.set('results', {});
    let cards = this.get('cards');
    this.get('positions').forEach((position)=>{
      this.get('results')[cards.objectAt(position).get('id')] = 0;
    });
  },
  correct(id) {
    this.get('results')[id]++;
  },
  wrong(id, repeat) {
    if (repeat){
      this.get('results')[id]++;
    }
  },
  numCorrectOnFirstTry: Ember.computed('results', function(){
    let correctCount = 0;
    let results = this.get('results');
    for (let key in results){
      if (results[key] === 1){
        correctCount++;
      }
    }
    return correctCount;
  }),
});

export default Ember.Component.extend({
  cardSetTags: readOnly("cardSet.tags"),
  randomize: false,
  repeatWrongs: false,
  results: null,
  tags: Ember.computed.readOnly("cardSet.tags"),
  tagFilters: Ember.computed('tags', function(){
    return this.get('tags').map((tag)=>{
      //todo set based on qparams and/or local storage
      let checked = false;
      return {tag: tag, checked: checked};
    });
  }),
  checkedTags: Ember.computed('tagFilters.@each.checked', function(){
    let filters = this.get('tagFilters').filter(filter => Ember.get(filter, 'checked'));
    return filters.map(filter => Ember.get(filter, 'tag'));
  }),
  setKey: Ember.computed('cardSet', function(){
    return `set-settings-${this.get('cardSet.id')}`;
  }),
  settingsChanged: Ember.observer('randomize', 'repeatWrongs', 'tagFilters.@each.checked', function(){
    let settings = {
      randomize: this.get('randomize'),
      repeatWrongs: this.get('repeatWrongs')
    };
    ClientStorage.set(this.get('setKey'), settings);
    this.reset();
  }),
  getSettings() {
    let settings = ClientStorage.get(this.get('setKey'));
    if (settings) {
      this.set('randomize', settings.randomize);
      this.set('repeatWrongs', settings.repeatWrongs);
    }
  },
  onWillInsert: Ember.on('willInsertElement', function(){
    //make sure we have all cards and card-tags before we being
    //card-tags really should come over with cards - when we figure
    //this out on server side, can get rid of the inner all() promise
    this.get('cardSet.cards').then(()=>{
      let cardTags = this.get('cardSet.cards').map(card=> card.get('tags') );
      Ember.RSVP.all(cardTags).then(()=> {
        this.getSettings();
        this.reset();
        this.set('isInitialized', true);
      });
    });
  }),
  cards: readOnly("cardSet.cards"),
  cardSetName: readOnly("cardSet.name"),
  currentCardPostion: null,
  currentCard: Ember.computed('currentCardPosition', function(){
    let position = this.get('currentCardPosition');
    return this.get('cards').objectAt(position);
  }),
  front: readOnly("currentCard.front"),
  back: readOnly("currentCard.back"),
  instructions: Ember.computed('isShowingFront', function(){
    return this.get('isShowingFront') ? 'Click card to show answer' : '';
  }),
  pageRendered: true,
  faceShowing: "",
  isInitialized: false,
  isShowingArchived: false,
  isShowingFront: true,
  isShowingBack: Ember.computed("isShowingFront", "pageRendered", function() {
    return this.get("pageRendered") && !this.get("isShowingFront");
  }),
  correctCount: Ember.computed.readOnly("results.numCorrectOnFirstTry"),
  cardsLeft: 0,
  isFinished: false,
  order: [],
  filteredTotal: {
    cards: readOnly("order.length")
  },
  pctCorrect: Ember.computed('correctCount', 'filteredTotal', function(){
    let total = this.get('filteredTotal');
    if (total === 0){
      return "-";
    }
    return `${Math.round(100 * this.get('correctCount')/total)}%`;
  }),
  click(event) {
    let notResultButton = Ember.isEmpty(Ember.$(event.target).parents('#study-buttons'));
    let clickOnCardPanel = event.target.id === 'card-panel' || !Ember.isEmpty(Ember.$(event.target).parents('#card-panel'));
    if (clickOnCardPanel && notResultButton ){
      this.send('flip');
      let cardPanel = Ember.$('#card-panel');
      let studyButtons = Ember.$('#study-buttons');
      let cardPanelWidth = parseInt(cardPanel.css('width'));
      let cardPanelHeight = parseInt(cardPanel.css('height'));
      let buttonsWidth = parseInt(studyButtons.css('width'));
      let buttonsHeight = parseInt(studyButtons.css('height'));
      let maxLeft = cardPanelWidth - buttonsWidth;
      let maxTop = cardPanelHeight - buttonsHeight;
      let x = Math.min(Math.max(event.offsetX - buttonsWidth/4, 0), maxLeft);
      let y = Math.min(Math.max(event.offsetY - buttonsHeight/2, 0), maxTop);

      Ember.$('#study-buttons').css({'top': `${y}px`, 'left': `${x}px`});
    }
  },
  total: Ember.computed('cards', function() {
    return this.get("cards.length") || 0;
  }),
  statusMsg: Ember.computed('cardsLeft', 'filteredTotal', function() {
    return `${this.get('cardsLeft')}  of ${this.get('filteredTotal')} left`;
  }),

  reset() {
    this.set("isFinished", false);
    this.initTags();
    this.orderCards();
    this.next();
    return this.set("pageRendered", true);
  },

  orderCards() {
    let cards = this.get('cards');
    if (Ember.isEmpty(cards)){
      return;
    }
    let filteredCardPositions = [];
    for (let i=0; i<cards.get('length'); i++){
      if (this.inFilter(cards.objectAt(i))){
        filteredCardPositions.push(i);
      }
    }
    this.set('results', Results.create({positions: filteredCardPositions, cards: cards}));
    if (this.get('randomize')) {
      filteredCardPositions = _.shuffle(filteredCardPositions);
    }
    this.set("order", filteredCardPositions);
    let order = this.get('order');
    this.set("filteredTotal", order.length);
    this.set("cardsLeft", order.length);
  },
  inFilter(card) {
    //todo
    //if (card.get("archived") && !this.get("isShowingArchived")) {
    //  return false;
    //}
    let filters = this.get('checkedTags');
    if (Ember.isEmpty(filters)) {
      return true;
    }
    let cardTags = card.get("tags");
    if (Ember.isBlank(cardTags)) {
      return false;
    }
    return cardTags.some(tag => !!this.get('tagFilters').findBy('tag', tag));
  },
  initTags() {
    return Ember.K();
  },
  next() {
    this.set("isShowingFront", true);
    let order = this.get('order');
    if (order.length === 0) {
      return this.set("isFinished", true);
    } else {
      let nextCardPosition = order.shift();
      this.set("currentCardPosition", nextCardPosition);
      this.set('faceShowing', this.get('currentCard.front'));
      return this.set("cardsLeft", order.length + 1);
    }
  },
  reAddCurrentCard() {
    let order = this.get('order');
    let remainingCount = order.get('length');
    let currentCardPosition = this.get('currentCardPosition');
    if (this.get('randomize')) {
      let newPosition = Math.floor(Math.random() * remainingCount);
      order.splice(newPosition, 0, currentCardPosition);
    } else {
      order.push(currentCardPosition);
    }
  },
  actions: {
    restart() {
      this.reset();
    },
    correct() {
      let currentId = this.get('currentCard.id');
      this.get('results').correct(currentId);
      return this.next();
    },
    wrong() {
      if (this.get('repeatWrongs')){
        this.reAddCurrentCard();
      }
      let currentId = this.get('currentCard.id');
      this.get('results').wrong(currentId, this.get('repeatWrongs'));
      return this.next();
    },
    flip() {
      this.set('faceShowing', this.get('currentCard.back'));
      return this.set("isShowingFront", false);
    },
    toggleArchived() {
      this.set("isShowingArchived", !this.get("isShowingArchived"));
      return this.reset();
    },
    toggleFilter(tagId) {
      tagId *= 1;
      let lbls = this.get("selectedFilterIds");
      if (lbls.contains(tagId)) {
        lbls.removeObject(tagId);
      } else {
        lbls.pushObject(tagId);
      }
      return this.reset();
    }
  }
});
