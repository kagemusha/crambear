import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'crambear/tests/helpers/start-app';
import Api from 'crambear/tests/acceptance/helpers/api';
import { textEqual, arrayEqual } from 'crambear/tests/acceptance/helpers/assert-helpers';

module('Acceptance | index', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /index', (assert)=> {
  assert.expect(3);
  Api.getCardsets();

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    textEqual(assert, 'h2', 'What do you want to Study?', 'Title text correct' );
    arrayEqual(assert, '#index-card-sets .set-name', ['Ember', 'Ruby'], 'Card sets are displayed' );
  });
});

test('authenticated user gets redirected to dashboard', (assert)=>{
  assert.expect(1);

  window.localStorage.setItem('authToken', 'cramcram');
  Api.getMe();
  Api.getCardsets();
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/dashboard');
  });
});



