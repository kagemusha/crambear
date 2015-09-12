import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'crambear/tests/helpers/start-app';
import { server, mockResponse } from 'crambear/tests/acceptance/helpers/server';

module('Acceptance | login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('login', function(assert) {
  expect(1);

  server(function () {
    this.get('card-sets', function (request) {
      let params = request.queryParams;
      if (params.public === 'true') {
        let payload =  {"data":[{"id":"15","type":"card-sets","links":{"self":"/card-sets/15"},"attributes":{"name":"Ember","card-count":12},"relationships":{"user":{"links":{"self":"/card-sets/15/relationships/user","related":"/card-sets/15/user"}},"cards":{"links":{"self":"/card-sets/15/relationships/cards","related":"/card-sets/15/cards"}},"tags":{"links":{"self":"/card-sets/15/relationships/tags","related":"/card-sets/15/tags"}}}},{"id":"16","type":"card-sets","links":{"self":"/card-sets/16"},"attributes":{"name":"Ruby","card-count":11},"relationships":{"user":{"links":{"self":"/card-sets/16/relationships/user","related":"/card-sets/16/user"}},"cards":{"links":{"self":"/card-sets/16/relationships/cards","related":"/card-sets/16/cards"}},"tags":{"links":{"self":"/card-sets/16/relationships/tags","related":"/card-sets/16/tags"}}}}]};
        return mockResponse(payload);
      }
      if (params.userId === '1'){
        let payload = {"data":[{"id":"17","type":"card-sets","links":{"self":"/card-sets/17"},"attributes":{"name":"a","card-count":4},"relationships":{"user":{"links":{"self":"/card-sets/17/relationships/user","related":"/card-sets/17/user"}},"cards":{"links":{"self":"/card-sets/17/relationships/cards","related":"/card-sets/17/cards"}},"tags":{"links":{"self":"/card-sets/17/relationships/tags","related":"/card-sets/17/tags"}}}},{"id":"19","type":"card-sets","links":{"self":"/card-sets/19"},"attributes":{"name":"b","card-count":0},"relationships":{"user":{"links":{"self":"/card-sets/19/relationships/user","related":"/card-sets/19/user"}},"cards":{"links":{"self":"/card-sets/19/relationships/cards","related":"/card-sets/19/cards"}},"tags":{"links":{"self":"/card-sets/19/relationships/tags","related":"/card-sets/19/tags"}}}}]};
        return mockResponse(payload, 304);
      }

    });
    this.post('/users/sign_in', ()=>{
      let payload = {"data":{"id":"1","type":"users","links":{"self":"/users/1"},"attributes":{"email":"t@t.com","name":"Tester","auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NDIwMTAyNjcsInN1YiI6MSwiZXhwIjoxNDQyNjE1MDY3fQ.z1tJil57eYn8YCiPgfqyNk8NhYNPCidcHkuK6Pw-j0U"},"relationships":{"card-sets":{"links":{"self":"/users/1/relationships/card-sets","related":"/users/1/card-sets"},"data":[{"type":"card-sets","id":"17"},{"type":"card-sets","id":"19"}]}}},"included":[{"id":"17","type":"card-sets","links":{"self":"/card-sets/17"},"attributes":{"name":"a","card-count":4},"relationships":{"user":{"links":{"self":"/card-sets/17/relationships/user","related":"/card-sets/17/user"}},"cards":{"links":{"self":"/card-sets/17/relationships/cards","related":"/card-sets/17/cards"}},"tags":{"links":{"self":"/card-sets/17/relationships/tags","related":"/card-sets/17/tags"}}}},{"id":"19","type":"card-sets","links":{"self":"/card-sets/19"},"attributes":{"name":"b","card-count":0},"relationships":{"user":{"links":{"self":"/card-sets/19/relationships/user","related":"/card-sets/19/user"}},"cards":{"links":{"self":"/card-sets/19/relationships/cards","related":"/card-sets/19/cards"}},"tags":{"links":{"self":"/card-sets/19/relationships/tags","related":"/card-sets/19/tags"}}}}]};
      return mockResponse(payload);
    });
  });

  visit('/');

  click('#login-btn');
  fillIn('.email input', 'test@test.com');
  fillIn('.password input', 'tester');
  click('.submit-login-btn');
  andThen(function() {
    assert.equal(find('#index-card-sets li').length, 2);
  });
});
