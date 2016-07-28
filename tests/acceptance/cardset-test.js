import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'crambear/tests/helpers/start-app';

module('Acceptance | cardset', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /cardset', function(assert) {
  assert.expect(0);
  //visit('/card-set');
  //
  //andThen(function() {
  //  assert.equal(currentURL(), '/card-et');
  //});
});

//test('create new card /cardset', function(assert){
// expect();
//});
//
//test('delete card /cardset', function(assert){
//  expect();
//});
//
//test('update card /cardset', function(assert){
//  expect();
//});
//
//test('create new label /cardset', function(assert){
//  expect();
//});
//
//test('delete label /cardset', function(assert){
//  expect();
//});
//
//test('update label /cardset', function(assert){
//  expect();
//});
