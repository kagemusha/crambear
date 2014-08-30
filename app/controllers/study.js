/* global _ */

import Ember from 'ember';

var alias = Ember.computed.alias;

export default Ember.ObjectController.extend({
  cards: alias("content.cards"),
  cardSetName: alias("content.name"),
  front: alias("currentCard.front"),
  back: alias("currentCard.back"),
  pageRendered: true,
  isShowingArchived: false,
  isShowingFront: true,
  isShowingBack: (function() {
    return this.get("pageRendered") && !this.get("isShowingFront");
  }).property("isShowingFront", "pageRendered"),
  correctCount: 0,
  cardsLeft: 0,
  finished: false,
  currentCard: null,
  order: [],
  filteredTotal: {
    cards: alias("order.length")
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
  cardSetLabels: alias("content.labels"),
  selectedFilterIds: Ember.A(),
  filters: (function() {
    return this.get('labels').map((function(_this) {
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
    this.set("finished", false);
    this.set("correctCount", 0);
    this.initLabels();
    this.orderCards();
    this.next();
    return this.set("pageRendered", true);
  },

  orderCards: function() {
    var cards = this.get("cards");
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
    return console.log("order: " + this.order);
  },
  inFilter: function(card) {
    return true;
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
      return this.set("finished", true);
    } else {
      var cardId = this.order.shift();
      this.set("currentCard", this.get("cards").objectAt(cardId));
      return this.set("cardsLeft", this.order.length + 1);
    }
  },
  actions: {
    restart: function(){
      this.reset();
    },
    correct: function() {
      this.set("correctCount", this.get("correctCount") + 1);
      console.log("action correct");
      return this.next();
    },
    wrong: function() {
      console.log("action wrong");
      return this.next();
    },
    flip: function() {
      console.log("action flipped");
      return this.set("isShowingFront", false);
    },
    toggleArchived: function() {
      console.log("togArch");
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
