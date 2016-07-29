import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  shouldReloadRecord(store, snapshot) {
    //reload if not loaded yet
    return snapshot.record.get('cards.length') === 0;
    //return snapshot.record.get('cards.length') === snapshot.record.get('cardCount');
    //may want a timeout if have multiple users for same set
  }

});
