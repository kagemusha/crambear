import Ember from 'ember';

export function verifyElem(assert, selector, msgOrCount, errorMsg=''){
  var elemCount = 1;

  if (arguments.length === 2) {
    if (Ember.typeOf(msgOrCount) === 'string') {
      errorMsg = msgOrCount;
      elemCount = 1;
    } else {
      elemCount = msgOrCount;
    }
  } else if (arguments.length === 3)  {
    elemCount = msgOrCount;
  }
  assert.equal(find(selector).length, elemCount, errorMsg);
}

export function findMapText(selector, context) {
  var match = find(selector, context);
  var map = new Array(match.length);
  for (var i=0, l=map.length; i<l; i++) {
    map[i] = $(match[i]).text().trim();
  }
  return map;
}

export function findText(selector, context) {
  return find(selector, context).text().trim();
}

export function textEqual(assert, selector, expectedText, msg){
  assert.equal(findText(selector), expectedText, msg || '');
}

export function valEqual(assert, selector, expectedText, msg){
  assert.equal(find(selector).val(), expectedText, msg || '');
}

export function idEqual(assert, selector, expectedText, msg){
  assert.equal(find(selector).attr('id'), expectedText, msg || '');
}

export function arrayEqual(assert, selector, expectedArray, msg){
  assert.deepEqual(findMapText(selector), expectedArray, msg || '');
}

export function assertElementProp(assert, selector, propName, expectedValue){
  assert.equal(Ember.$(selector).prop(propName), expectedValue, `prop  ${selector}[${propName}] should = ${expectedValue}`);
}

export function assertElementStyle(assert, selector, styleName, expectedValue){
  assert.equal(Ember.$(selector).prop('style')[`${styleName}`], expectedValue, `prop  ${selector}[style][${styleName}] should = ${expectedValue}`);
}



