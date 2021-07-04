var expect = require('chai').expect;
var hasDeepValue = require('../has-deep-value.js').hasDeepValue;
var has = require('../has-deep-value.js').has;

describe('has-deep-value', () => {
  let obj = {
    test: '',
    test2: false,
    test3: NaN,
    test4: 0,
    test5: undefined,
    test6: null,
    test7: () => '',
    test8: 100,
    test9: [undefined],
    test10: new Error(),
    test11: Buffer.from('123'),
    locals: {
      test: '',
      test2: false,
      test3: NaN,
      test4: 0,
      test5: undefined,
      test6: null,
      test7: () => '',
      test8: 100,
      test9: [undefined],
      test10: new Error(),
      test11: Buffer.from('123'),
      auth: {
        user: 'hw'
      }
    }
  };
  let hasHelloWorld = has('hello.world');
  it('curries', () => {
    expect([{hello:{world:''}}, {hello:{world:''}}].map(hasHelloWorld).every(e => e)).to.equal(true);
    expect([{hello:{world:''}}, {bye:{world:''}}].map(hasHelloWorld).every(e => e)).to.equal(false);
  });
  it('fails for non object values', () => {
    expect(hasDeepValue(true, 'true')).to.equal(false);
    expect(hasDeepValue(false, 'false')).to.equal(false);
    expect(hasDeepValue('', '')).to.equal(false);
    expect(hasDeepValue(null, 'null')).to.equal(false);
    expect(hasDeepValue(undefined, 'false')).to.equal(false);
    expect(hasDeepValue([], 'false')).to.equal(false);
    expect(hasDeepValue(Buffer.from('123'), 'false')).to.equal(false);
    expect(hasDeepValue(NaN, 'false')).to.equal(false);
    expect(hasDeepValue(0, 'false')).to.equal(false);
    expect(hasDeepValue(() => {}, 'false')).to.equal(false);
  });
  it('returns true for root level properties', () => {
    expect(hasDeepValue(obj, 'test')).to.equal(true);
    expect(hasDeepValue(obj, 'locals')).to.equal(true);
  });
  it('returns false for unknown root level properties', () => {
    expect(hasDeepValue(obj, 'hello')).to.equal(false);
    expect(hasDeepValue(obj, 'world')).to.equal(false);
  });
  it('handles falsey values correctly at root level', () => {
    expect(hasDeepValue(obj, 'test')).to.equal(true);
    expect(hasDeepValue(obj, 'test2')).to.equal(true);
    expect(hasDeepValue(obj, 'test3')).to.equal(true);
    expect(hasDeepValue(obj, 'test4')).to.equal(true);
    expect(hasDeepValue(obj, 'test5')).to.equal(true);
    expect(hasDeepValue(obj, 'test6')).to.equal(true);
    expect(hasDeepValue(obj, 'test7')).to.equal(true);
    expect(hasDeepValue(obj, 'test8')).to.equal(true);
    expect(hasDeepValue(obj, 'test9')).to.equal(true);
    expect(hasDeepValue(obj, 'test10')).to.equal(true);
    expect(hasDeepValue(obj, 'test11')).to.equal(true);
  });
  it('handles dot notation for any level deep and falsey values', () => {
    expect(hasDeepValue(obj, 'locals.test')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test2')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test3')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test4')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test5')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test6')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test7')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test8')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test9')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test10')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.test11')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.auth')).to.equal(true);
    expect(hasDeepValue(obj, 'locals.auth.user')).to.equal(true);
  });
  it('handles incomplete dot notations or unknown dot notations', () => {
    expect(hasDeepValue(obj, 'locals.testt')).to.equal(false);
    expect(hasDeepValue(obj, 'locals.')).to.equal(false);
    expect(hasDeepValue(obj, 'test.testt')).to.equal(false);
    expect(hasDeepValue(obj, 'test.')).to.equal(false);
    expect(hasDeepValue(obj, 'hello.world.ok')).to.equal(false);
    expect(hasDeepValue(obj, 'i.dot.alot...')).to.equal(false);
    expect(hasDeepValue(obj, 'locals.auth.userr')).to.equal(false);
    expect(hasDeepValue(obj, 'locals.authh.')).to.equal(false);
    expect(hasDeepValue(obj, 'locals.authh.user')).to.equal(false);
  });
  it('handles null prototype object correctly', () => {
    const obj = Object.create(null);
    obj.hello = "world";
    expect(hasDeepValue(obj, 'hello')).to.equal(true);
  })
});
