import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'crambear/tests/helpers/start-app';
import Api from 'crambear/tests/acceptance/helpers/api';

module('Acceptance | login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('login', function(assert) {
  assert.expect(1);
  Api.getCardSets(304);
  Api.getSignIn();

  visit('/');

  click('#login-btn');
  fillIn('.email input', 'test@test.com');
  fillIn('.password input', 'tester');
  click('.submit-login-btn');
  andThen(function() {
    assert.equal(find('#index-card-sets li').length, 2);
  });
});
