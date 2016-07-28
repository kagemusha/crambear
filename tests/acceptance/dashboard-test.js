import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'crambear/tests/helpers/start-app';
import Api from 'crambear/tests/acceptance/helpers/api';
import { textEqual } from 'crambear/tests/acceptance/helpers/assert-helpers';

module('Acceptance | dashboard', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('unauthenticated user redirected to main page', (assert)=> {
  assert.expect(2);
  Api.getCardsets(200);

  visit('/dashboard');

  andThen(function() {
    assert.equal(currentURL(), '/');
    textEqual(assert, 'h2', 'What do you want to Study?', 'Title text correct' );
  });
});


test('authenticated user goes to dashboard', (assert)=> {
  assert.expect(2);
  window.localStorage.setItem('authToken', 'cramcram');
  Api.getMe();
  Api.getCardsets();

  visit('/dashboard');

  andThen(function() {
    assert.equal(currentURL(), '/dashboard');
    textEqual(assert, 'h2', 'My Sets', 'Title text correct' );
  });
});

