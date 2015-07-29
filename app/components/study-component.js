/* global _ */
import Ember from 'ember';

const readOnly = Ember.computed.readOnly;

export default Ember.Component.extend({
  onWillInsert: function(){
    this.get('cardSet.cards').then(()=> {
      this.reset();
      this.set('isInitialized', true);
    });
  }.on('willInsertElement'),
  cards: readOnly("cardSet.cards"),
  cardSetName: readOnly("cardSet.name"),
  currentCard: null,
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
  isShowingBack: (function() {
    return this.get("pageRendered") && !this.get("isShowingFront");
  }).property("isShowingFront", "pageRendered"),
  correctCount: 0,
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
  click(event){
    if (event.target.id === 'card-panel'){
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

      Ember.$('#study-buttons').css('top', `${y}px`);
      Ember.$('#study-buttons').css('left', `${x}px`);
    }
  },
  total: (function() {
    if (this.get("cards")) {
      return this.get("cards.length");
    } else {
      return 0;
    }
  }).property("cards"),
  statusMsg: (function() {
    return "" + (this.get('cardsLeft')) + " of " + (this.get('filteredTotal')) + " left";
  }).property("cardsLeft", "filteredTotal"),
  cardSetLabels: readOnly("cardSet.labels"),
  selectedFilterIds: Ember.A(),
  filters: (function() {
    return this.get('cardSet.labels').map((function(_this) {
      return function(label) {
        var labelId, selected;
        labelId = 1 * label.get("id");
        selected = _this.get('selectedFilterIds').contains(labelId);
        return {
          name: label.get('name'),
          id: labelId,
          isSelected: selected
        };
      };
    })(this));
  }).property("selectedFilterIds.@each"),

  reset: function() {
    this.set("isFinished", false);
    this.set("correctCount", 0);
    this.initLabels();
    this.orderCards();
    this.next();
    return this.set("pageRendered", true);
  },

  orderCards: function() {
    let cards = this.get('cards');
    if (Ember.isEmpty(cards)){
      return;
    }
    var filteredCardIds = [];
    for (var i=0; i<cards.get('length'); i++){
      if (this.inFilter(cards.objectAt(i))){
        filteredCardIds.push(i);
      }
    }
    filteredCardIds = _.shuffle(filteredCardIds);
    this.set("order", filteredCardIds);
    this.set("filteredTotal", this.order.length);
    this.set("cardsLeft", this.order.length);
  },
  inFilter: function(card) {
    if (card.get("archived") && !this.get("isShowingArchived")) {
      return false;
    }
    if (this.get("selectedFilterIds.length") === 0) {
      return true;
    }
    var cardLabels = card.get("labelIds");
    if (!(cardLabels && cardLabels.get("length") > 0)) {
      return false;
    }
    var selectedFilters = this.get('selectedFilterIds');
    var includedLabel = selectedFilters.find(function(labelId) {
      return cardLabels.contains(1 * labelId);
    });
    return includedLabel != null;
  },
  initLabels: function() {
    return Ember.K();
  },
  next: function() {
    this.set("isShowingFront", true);
    if (this.order.length === 0) {
      return this.set("isFinished", true);
    } else {
      var cardId = this.order.shift();
      this.set("currentCard", this.get("cards").objectAt(cardId));
      this.set('faceShowing', this.get('currentCard.front'));
      return this.set("cardsLeft", this.order.length + 1);
    }
  },
  actions: {
    restart: function(){
      this.reset();
    },
    correct: function() {
      this.set("correctCount", this.get("correctCount") + 1);
      return this.next();
    },
    wrong: function() {
      return this.next();
    },
    flip: function() {
      this.set('faceShowing', this.get('currentCard.back'));
      return this.set("isShowingFront", false);
    },
    toggleArchived: function() {
      this.set("isShowingArchived", !this.get("isShowingArchived"));
      return this.reset();
    },
    toggleFilter: function(labelId) {
      labelId *= 1;
      var lbls = this.get("selectedFilterIds");
      if (lbls.contains(labelId)) {
        lbls.removeObject(labelId);
      } else {
        lbls.pushObject(labelId);
      }
      return this.reset();
    }
  }
});
