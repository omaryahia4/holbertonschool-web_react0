/**
 *  Copyright (c) 2015, Jan Biasi.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.Immutable = factory()
}(this, function () { 'use strict';var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;var SLICE$0 = Array.prototype.slice;

  /**
   * IE Array.isArray Polyfill
   * developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
   *
   */
   if(!Array.isArray) {
       Array.isArray = function (vArg) {
         return Object.prototype.toString.call(vArg) === "[object Array]";
      };
   }

  /**
   * ES5 Object.assign Polyfill by MDN
   * developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   *
   * This polyfill doesn't support symbol properties, since ES5
   * doesn't have symbols anyway.
   */
  if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: function(target) {
              'use strict';
              if (target === undefined || target === null) {
                  throw new TypeError('Cannot convert first argument to object');
              }

              var to = Object(target);
              for (var i = 1; i < arguments.length; i++) {
                  var nextSource = arguments[i];
                  if (nextSource === undefined || nextSource === null) {
                      continue;
                  }
                  nextSource = Object(nextSource);

                  var keysArray = Object.keys(Object(nextSource));
                  for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                      var nextKey = keysArray[nextIndex];
                      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                      if (desc !== undefined && desc.enumerable) {
                          to[nextKey] = nextSource[nextKey];
                      }
                  }
              }
              return to;
          }
      });
  }

  var IS_ITERABLE_FLAG = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_FLAG = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_FLAG = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_FLAG = '@@__IMMUTABLE_ORDERED__@@';
  var IS_SEQUENCE_FLAG = '@@__IMMUTABLE_SEQUENCE__@@';
  var IS_STACK_FLAG = '@@__IMMUTABLE_STACK__@@';
  var IS_MAP_FLAG = '@@__IMMUTABLE_MAP__@@';
  var IS_LIST_FLAG = '@@__IMMUTABLE_LIST__@@';
  var CACHE_FLAG = '@@__CACHE__@@';

  function isIterable(maybeIterable) {
      return !!(maybeIterable && maybeIterable[IS_ITERABLE_FLAG]);
  }

  function isKeyed(maybeKeyed) {
      return !!(maybeKeyed && maybeKeyed[IS_KEYED_FLAG]);
  }

  function isIndexed(maybeIndexed) {
      return !!(maybeIndexed && maybeIndexed[IS_INDEXED_FLAG]);
  }

  function isAssociative(maybeAssociative) {
      return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
      return !!(maybeOrdered && maybeOrdered[IS_ORDERED_FLAG]);
  }

  function Flags__isSequence(maybeSequence) {
      return !!(maybeSequence && maybeSequence[IS_SEQUENCE_FLAG]);
  }

  function isStack(maybeStack) {
      return !!(maybeStack && maybeStack[IS_STACK_FLAG]);
  }

  function isMap(maybeMap) {
      return !!(maybeMap && maybeMap[IS_MAP_FLAG]);
  }

  function isList(maybeList) {
      return !!(maybeList && maybeList[IS_LIST_FLAG]);
  }

  function hasCache(maybeHasCache) {
      return !!(maybeHasCache && maybeHasCache[CACHE_FLAG] && maybeHasCache._cache)
  }

  function is__arrayLike(value) {
      return !!(value && typeof value.length === 'number');
  }

  function nullOrUndefined(value) {
      return !!(value === null || value === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   */
  function equal(valueA, valueB) {
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
          return true;
      }
      if (!valueA || !valueB) {
          return false;
      }
      if (typeof valueA.valueOf === 'function' &&
      typeof valueB.valueOf === 'function') {
          valueA = valueA.valueOf();
          valueB = valueB.valueOf();
          if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
              return true;
          }
          if (!valueA || !valueB) {
              return false;
          }
      }
      if (typeof valueA.equals === 'function' &&
      typeof valueB.equals === 'function' &&
      valueA.equals(valueB)) {
          return true;
      }
      return false;
  }

  var TYPEDEF_FIELD = '__type__';
  function toolset__typedef(blueprint, prefered) {
      if(typeof blueprint === 'object') {
          if(!blueprint.prototype) {
              return;
          }
          for(var scheme in blueprint) {
              if(scheme && blueprint.hasOwnProperty(scheme)) {
                  toolset__typedef(blueprint[scheme], scheme);
              }
          }
      } else if(blueprint && typeof prefered === 'string') {
          blueprint.prototype[TYPEDEF_FIELD] = prefered;
      }
  }

  function invariant(condition, error) {
      if (!condition) throw new Error(error);
  }


  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, funcs) {
      var copier = function(key ) { ctor.prototype[key] = funcs[key]; };
      Object.keys(funcs).forEach(copier);
      Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(funcs).forEach(copier);
      return ctor;
  }

  function createClass(ctor, superClass) {
      if (superClass) {
        ctor.prototype = Object.create(superClass.prototype);
      }
      ctor.prototype.constructor = ctor;
  }

  var ITERABLE_TYPEDEF = '[object Iterable]';
  var Iterable = (function(){var proto$0={};
      function Iterable(value) {
          return isIterable(value) ? value : Sequence(value);
      }DP$0(Iterable,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.__toString = function(head, data, tail) {
          if(!data) {
              return head + tail;
          }
          return head + ' ' + data + ' ' + tail;
      };

      proto$0.isSequence = function() {
          return (this[TYPEDEF_FIELD] === SEQUENCE_TYPEDEF);
      };

      proto$0.toSequence = function() {
          return isIndexed(this) ? this.toIndexedSequence()
              : this.toKeyedSequence();
      };

      proto$0.updateSize = function(newSize) {
          if(nullOrUndefined(newSize)) {
              if(this.getNative()) {
                  if(typeof this.getNative() === 'object') {
                      this.size = Object.keys(this.getNative()).length;
                  } else if(Array.isArray(this.getNative())) {
                      this.size = this.getNative().length;
                  }
              } else {
                  this.size = 0;
              }
          } else if(typeof newSize === 'number') {
              this.size = Math.round(newSize);
          } else {
              throw new TypeError(
                  'Need a number to set size and not ' + typeof newSize
              );
          }
      };

      proto$0.getNative = function() {
          return this.__internal;
      };

      proto$0.map = function(handle) {
          return this.__iterate(handle);
      };

      proto$0.wasAltered = function() {
          return this.__altered;
      };

      proto$0.asMutable = function() {
          return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
      };

      proto$0.asImmutable = function() {
          if(!this.__ensureOwner) { // if implementation missing
              throw Error('Can\'t ensure owner to make immutable of ' + this);
          }
          if(this.__ownerID) {
              this.__ownerID = undefined;
              this.__altered = false;
              this.size = this.__internal.length;
              return this;
          }
      };

      proto$0.isKeyedSequence = function() {
          return (this[TYPEDEF_FIELD] === KEYED_SEQUENCE_TYPEDEF);
      };

      proto$0.toKeyedSequence = function() {
          return new KeyedSequence(this.getNative());
      };

      proto$0.isIndexedSequence = function() {
          return (this[TYPEDEF_FIELD] === INDEXED_SEQUENCE_TYPEDEF);
      };

      proto$0.toIndexedSequence = function() {
          return new IndexedSequence(this.getNative());
      };

      proto$0.isSetSequence = function() {
          return (this[TYPEDEF_FIELD] === SET_SEQUENCE_TYPEDEF);
      };

      proto$0.toSetSequence = function() {
          return new SetSequence(this.getNative());
      };
  MIXIN$0(Iterable.prototype,proto$0);proto$0=void 0;return Iterable;})();

  var KEYED_ITERABLE_TYPEDEF = '[Iterable KeyedIterable]';
  var KeyedIterable = (function(super$0){if(!PRS$0)MIXIN$0(KeyedIterable, super$0);
      function KeyedIterable(value) {
          super$0.call(this, value);
      }if(super$0!==null)SP$0(KeyedIterable,super$0);KeyedIterable.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":KeyedIterable,"configurable":true,"writable":true}});DP$0(KeyedIterable,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  ;return KeyedIterable;})(Iterable);

  var INDEXED_ITERABLE_TYPEDEF = '[Iterable IndexedIterable]';
  var IndexedIterable = (function(super$0){if(!PRS$0)MIXIN$0(IndexedIterable, super$0);
      function IndexedIterable(value) {
          super$0.call(this, value);
      }if(super$0!==null)SP$0(IndexedIterable,super$0);IndexedIterable.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":IndexedIterable,"configurable":true,"writable":true}});DP$0(IndexedIterable,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  ;return IndexedIterable;})(Iterable);

  var SET_ITERABLE_TYPEDEF = '[Iterable SetIterable]';
  var SetIterable = (function(super$0){if(!PRS$0)MIXIN$0(SetIterable, super$0);
      function SetIterable(value) {
          super$0.call(this, value);
      }if(super$0!==null)SP$0(SetIterable,super$0);SetIterable.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":SetIterable,"configurable":true,"writable":true}});DP$0(SetIterable,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  ;return SetIterable;})(Iterable);

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_FLAG] = true;

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_FLAG] = true;

  var IndexedIterablePrototype = IndexedIterable.prototype;
  IndexedIterablePrototype[IS_INDEXED_FLAG] = true;

  function quoteString(value) {
      return typeof value === 'string' ? JSON.stringify(value) : value;
  }

  toolset__typedef({
      Iterable: ITERABLE_TYPEDEF,
      KeyedIterable: KEYED_ITERABLE_TYPEDEF,
      IndexedIterable: INDEXED_ITERABLE_TYPEDEF
  });

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;

  var COLLECTION_TYPEDEF = '[Iterable Collection]';
  var Collection = (function(super$0){if(!PRS$0)MIXIN$0(Collection, super$0);
      function Collection() {
          throw TypeError('Abstract');
      }if(super$0!==null)SP$0(Collection,super$0);Collection.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Collection,"configurable":true,"writable":true}});DP$0(Collection,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  ;return Collection;})(Iterable);

  var KEYED_COLLECTION_TYPEDEF = '[KeyedIterable KeyedCollection]';
  var KeyedCollection = (function(super$0){function KeyedCollection() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(KeyedCollection, super$0);if(super$0!==null)SP$0(KeyedCollection,super$0);KeyedCollection.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":KeyedCollection,"configurable":true,"writable":true}});DP$0(KeyedCollection,"prototype",{"configurable":false,"enumerable":false,"writable":false});;return KeyedCollection;})(KeyedIterable);

  var INDEXED_COLLECTION_TYPEDEF = '[IndexedIterable IndexedCollection]';
  var IndexedCollection = (function(super$0){function IndexedCollection() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(IndexedCollection, super$0);if(super$0!==null)SP$0(IndexedCollection,super$0);IndexedCollection.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":IndexedCollection,"configurable":true,"writable":true}});DP$0(IndexedCollection,"prototype",{"configurable":false,"enumerable":false,"writable":false});;return IndexedCollection;})(IndexedIterable);

  var SET_COLLECTION_TYPEDEF = '[SetIterable SetCollection]';
  var SetCollection = (function(super$0){function SetCollection() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(SetCollection, super$0);if(super$0!==null)SP$0(SetCollection,super$0);SetCollection.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":SetCollection,"configurable":true,"writable":true}});DP$0(SetCollection,"prototype",{"configurable":false,"enumerable":false,"writable":false});;return SetCollection;})(SetIterable);

  toolset__typedef({
      Collection: COLLECTION_TYPEDEF,
      KeyedCollection: KEYED_COLLECTION_TYPEDEF,
      IndexedCollection: INDEXED_COLLECTION_TYPEDEF,
      SetCollection: SET_COLLECTION_TYPEDEF
  });

  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  function clone(item) {
      if (!item) {
          // null, undefined values check
          return item;
      }

      var types = [Number, String, Boolean],
          result;

      // normalizing primitives if someone did new String('aaa'), or new Number('444');
      types.forEach(function(type) {
          if (item instanceof type) {
              result = type(item);
          }
      });

      if (typeof result === 'undefined') {
          if (Object.prototype.toString.call(item) === '[object Array]') {
              result = [];
              item.forEach(function(child, index, array) {
                  result[index] = clone(child);
              });
          } else if (typeof item === 'object') {
              // testing that this is DOM
              if (item.nodeType && typeof item.cloneNode === 'function') {
                  result = item.cloneNode(true);
              } else if (!item.prototype) { // check that this is a literal
                  if (item instanceof Date) {
                      result = new Date(item);
                  } else {
                      // it is an object literal
                      result = {};
                      for (var i in item) {
                          if(item.hasOwnProperty(i)) {
                              result[i] = clone(item[i]);
                          }
                      }
                  }
              } else {
                  // depending what you would like here,
                  // just keep the reference, or create new object
                  if (false && item.constructor) {
                      result = Object.create(item.prototype);
                  } else {
                      result = item;
                  }
              }
          } else {
              result = item;
          }
      }
      return result;
  }

  var IS_NATIVE_FLAG = '@@__IS_NATIVE__@@';
  function isNative(maybeNative) {
      return !!(maybeNative && maybeNative[IS_NATIVE_FLAG]);
  }

  var NATIVE_COLLECTION_TYPEDEF = '[native Collection]'
  var NativeCollection = (function(){var proto$0={};
      function NativeCollection() {
          var args = Array.prototype.slice.call(arguments);
          if(args.length > 1) {
              var array = new NativeArray();
              array.__initialSize = args.length;
              args.forEach(function(v ) {return array.push(v)});
              return array;
          } else if(args.length === 1) {
              var single = args[0];
              if(Array.isArray(single)) {
                  var array$0 = new NativeArray();
                  single.forEach(function(v ) {return array$0.push(v)});
                  array$0.__initialSize = single.length || 0;
                  return array$0;
              } else if(typeof single === 'object') {
                  var object = new NativeObject();
                  object.__initialSize = Object.keys(single).length;
                  return object.extend(single);
              }
          } else {
              return new NativeObject();
          }
      }DP$0(NativeCollection,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toString = function() {
          return NATIVE_COLLECTION_TYPEDEF;
      };
  MIXIN$0(NativeCollection.prototype,proto$0);proto$0=void 0;return NativeCollection;})();

  var NATIVE_ARRAY_TYPEDEF = '[native Array]';
  var NativeArray = (function(super$0){if(!PRS$0)MIXIN$0(NativeArray, super$0);var proto$0={};
      function NativeArray() {
          super$0.call(this, 0);
      }if(super$0!==null)SP$0(NativeArray,super$0);NativeArray.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":NativeArray,"configurable":true,"writable":true}});DP$0(NativeArray,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toString = function() {
          return NATIVE_ARRAY_TYPEDEF;
      };

      proto$0.toNative = function() {
          return this;
      };

      proto$0.isNativeArray = function(maybeNativeArray) {
          return maybeNativeArray && maybeNativeArray.toString &&
              maybeNativeArray.toString() === NATIVE_ARRAY_TYPEDEF;
      };

      proto$0.__clone = function() {
          return this.slice();
      };
  MIXIN$0(NativeArray.prototype,proto$0);proto$0=void 0;return NativeArray;})(Array);

  var NATIVE_OBJECT_TYPEDEF = '[native Object]';
  var NativeObject = (function(super$0){if(!PRS$0)MIXIN$0(NativeObject, super$0);var proto$0={};
      function NativeObject() {
          super$0.call(this, null);
      }if(super$0!==null)SP$0(NativeObject,super$0);NativeObject.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":NativeObject,"configurable":true,"writable":true}});DP$0(NativeObject,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.__clone = function() {
          return clone(this);
      };

      proto$0.extend = function(source) {
          var object = Object.assign(new NativeObject(), source);
          return object;
      };

      proto$0.toString = function() {
          return NATIVE_OBJECT_TYPEDEF;
      };

      proto$0.isNativeObject = function(maybeNativeObject) {
          return maybeNativeObject && maybeNativeObject.toString &&
              maybeNativeObject.toString() === NATIVE_OBJECT_TYPEDEF;
      };
  MIXIN$0(NativeObject.prototype,proto$0);proto$0=void 0;return NativeObject;})(Object);

  NativeCollection.prototype[IS_NATIVE_FLAG] = true;
  NativeObject.prototype[IS_NATIVE_FLAG] = true;
  NativeArray.prototype[IS_NATIVE_FLAG] = true;

  /**
   * RFC4122 version 4 compliant solution that solves that issue by offsetting
   * the first 13 hex numbers by a hex portion of the timestamp.
   */
  function guid() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  }

  var OWNER_TYPEDEF = '[OwnerID]';
  var OwnerID = (function(){var proto$0={};
      function OwnerID() {
          this.__key__ = guid();
      }DP$0(OwnerID,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toString = function() {
          return '[OwnerID ' + this.__toString() + ']';
      };

      proto$0.__toString = function() {
          return this.__key__;
      };

  MIXIN$0(OwnerID.prototype,proto$0);proto$0=void 0;return OwnerID;})();

  toolset__typedef(OwnerID, OWNER_TYPEDEF);

  var STACK_TYPEDEF = '[IndexedCollection Stack]';
  var Stack = (function(super$0){if(!PRS$0)MIXIN$0(Stack, super$0);var static$0={},proto$0={};
      function Stack() {
          var args = Array.prototype.slice.call(arguments);
          if(nullOrUndefined(args)) {
              return emptyStack();
          } else if(args.length === 1) {
              var singleArg = args[0];
              if(Array.isArray(singleArg)) {
                  return makeStack(singleArg);
              } else if(typeof singleArg === 'object') {
                  return makeStack(objectToArray(singleArg));
              }
          } else if(args.length > 1) {
              return makeStack(args);
          }
      }if(super$0!==null)SP$0(Stack,super$0);Stack.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Stack,"configurable":true,"writable":true}});DP$0(Stack,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      static$0.of = function() {var values = SLICE$0.call(arguments, 0);
          return new Stack(values);
      };

      proto$0.push = function() {var values = SLICE$0.call(arguments, 0);var this$0 = this;
          if(this.__ownerID) {
              values.forEach(function(v ) {return this$0.__internal.push(v)});
              this.size = this.__internal.length;
              this.__altered = true;
              return this;
          }
          return new Stack(
              this.__internal.__clone().concat(
                  Array.prototype.slice.call(arguments)
              )
          );
      };

      proto$0.shift = function() {
          if(this.__ownerID) {
              this.__internal.pop();
              this.size = this.__internal.length;
              this.__altered = true;
              return this;
          }
          var cloned = this.__internal.__clone();
          var newSize = cloned.pop();
          return new Stack(cloned);
      };

      proto$0.clear = function() {
          if(this.size === 0) {
              return this;
          }
          if(this.__ownerID) {
              this.size = 0;
              this.__altered = true;
              return this.toStack();
          }
          return emptyStack();
      };

      proto$0.toString = function() {
          return this.__toString('Stack [', this.__internal.join(',') ,']');
      };

      proto$0.toStack = function() {
          return this;
      };

      proto$0.__ensureOwner = function(ownerID) {
          if(ownerID === this.__ownerID) {
              return this;
          }
          if(!ownerID || nullOrUndefined(ownerID)) {
              this.__ownerID = ownerID;
              this.__altered = false;
              return this;
          }
          return makeStack(this.__internal, ownerID);
      };

      proto$0.__iterate = function(handle, reverse) {
          var maxLength = this.size;
          for(var n = 0; n <= maxLength; n++) {
              var entry = this.__internal[reverse ? maxLength - n : n];
              if(handle(entry, n, this) === false) {
                  return n + 1;
              }
          }
          return n;
      };
  MIXIN$0(Stack,static$0);MIXIN$0(Stack.prototype,proto$0);static$0=proto$0=void 0;return Stack;})(IndexedCollection);

  toolset__typedef(Stack, STACK_TYPEDEF);
  Stack.prototype[IS_STACK_FLAG] = true;

  var EMPTY_STACK;
  function emptyStack() {
      return EMPTY_STACK || (EMPTY_STACK = makeStack());
  }

  function makeStack(array, ownerID) {
      var stack = Object.create(Stack.prototype);
      stack.__ownerID = ownerID;
      stack.__altered = false;
      if(isNative(array)) {
          stack.__internal = array.toNative();
      } else {
          stack.__internal = new NativeArray();
          if(Array.isArray(array)) {
              array.forEach(function(v ) {return stack.__internal.push(v)});
              stack.size = array.length;
          }
      }
      return stack;
  }

  function objectToArray(object) {
      var stack = new NativeArray();
      if(object && typeof object === 'object') {
          for(var key in object) {
              if(object[key] && object.hasOwnProperty(key)) {
                  if(typeof object[key] === 'object') {
                      stack.push(objectToArray(object[key]));
                  } else if(!nullOrUndefined(object[key])) {
                      stack.push(object[key]);
                  }
              }
          }
      } else {
          throw TypeError(
              'Object to array conversion needs object ' +
              'and not ' + typeof object
          );
      }
      return stack;
  }

  var LIST_TYPEDEF = '[IndexedCollection List]';
  var List = (function(super$0){if(!PRS$0)MIXIN$0(List, super$0);var static$0={},proto$0={};
      function List(value) {
          return arguments.length > 1 ? makeList(
              Array.prototype.slice.call(arguments)
          ) : makeList(value);
      }if(super$0!==null)SP$0(List,super$0);List.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":List,"configurable":true,"writable":true}});DP$0(List,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      static$0.of = function () {var values = SLICE$0.call(arguments, 0);
          return this(values);
      };

      proto$0.toString = function() {
          return this.__toString('List [', this.__internal.join(',') ,']');
      };

      proto$0.push = function() {var values = SLICE$0.call(arguments, 0);var this$0 = this;
          if(this.__ownerID) {
              values.forEach(function(v ) {return this$0.__internal.push(v)});
              this.size = this.__internal.length;
              this.__altered = true;
              return this;
          }
          return makeList(this.__internal.__clone().concat(values));
      };

      proto$0.shift = function() {
          if(this.__ownerID) {
              this.__internal.pop();
              this.size = this.__internal.length;
              this.__altered = true;
              return this;
          }
          var cloned = this.__internal.__clone();
          var newSize = cloned.pop();
          return new List(cloned);
      };

      proto$0.clean = function() {
          if(this.size === 0) {
              return this;
          }
          if(this.__ownerID) {
              this.__altered = true;
              this.__internal = new NativeArray();
              this.size = this.__internal.length;
              return this;
          }
          return emptyList();
      };

      proto$0.__iterator = function(handle, reverse) {

      };

      proto$0.__ensureOwner = function(ownerID) {
          if(ownerID === this.__ownerID) {
              return this;
          }
          if(!ownerID || nullOrUndefined(ownerID)) {
              this.__ownerID = ownerID;
              this.__altered = false;
              return this;
          }
          return makeList(this.__internal, ownerID);
      };
  MIXIN$0(List,static$0);MIXIN$0(List.prototype,proto$0);static$0=proto$0=void 0;return List;})(IndexedCollection);

  var EMPTY_LIST;
  function emptyList() {
      return EMPTY_LIST || (EMPTY_LIST = makeList(null));
  }

  function makeList(values, ownerID) {
      var list = Object.create(List.prototype);
      list.__ownerID = ownerID;
      list.__altered = false;
      list.__internal = new NativeArray();
      list.size = 0;
      if(nullOrUndefined(values)) {
          return list;
      } else if(isNative(values)) {
          list.__internal = values;
      } else if (Array.isArray(values)) {
          list.__internal = new NativeArray();
          values.forEach(function(value, index)  {
              list.__internal.push(value);
          });
          list.size = list.__internal.length;
      } else {
          throw TypeError(
              'Expected an array or values as input and not ' +
              typeof values
          );
      }
      return list;
  }

  toolset__typedef({
      List: LIST_TYPEDEF
  });

  List.prototype[IS_LIST_FLAG] = true;
  List.isList = isList;

  var MAP_TYPEDEF = '[KeyedCollection Map]';
  var src_Map__Map = (function(super$0){if(!PRS$0)MIXIN$0(src_Map__Map, super$0);var proto$0={};
      function src_Map__Map(value) {
          return value ? makeMap(value) : emptyMap();
      }if(super$0!==null)SP$0(src_Map__Map,super$0);src_Map__Map.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":src_Map__Map,"configurable":true,"writable":true}});DP$0(src_Map__Map,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.has = function(key) {
          if(key && !nullOrUndefined(this.__internal[key])) {
              if(this.__internal.hasOwnProperty(key)) {
                  return true;
              }
          }
          return false;
      };

      proto$0.get = function(key, notSetValue) {
          if(key && this.has(key)) {
              return this.__internal[key];
          }
          return notSetValue;
      };

      proto$0.set = function(key, value) {
          if(this.__ownerID) {
              this.__internal[key] = value;
              this.__altered = true;
              return this;
          }
          var updated = this.__internal.__clone();
          updated[key] = value;
          return makeMap(updated, null);
      };

      proto$0.remove = function(key) {
          if(!key || !this.has(key)) {
              return this;
          }
          if(this.__ownerID) {
              delete this.__internal[key];
              this.size = this.size--;
              this.__altered = true;
              return this;
          }
          var copied = this.__internal.__clone();
          delete copied[key];
          return makeMap(copied);
      };

      proto$0.clear = function() {
          if(this.size === 0) {
              return this;
          }
          if(this.__ownerID) {
              this.size = 0;
              this.__altered = true;
              this.__internal = new NativeObject();
              return this;
          }
          return makeMap(new NativeObject(null));
      };

      proto$0.__iterate = function(handle, reverse) {
          var object = this.__internal;
          var keys = this.__keys || Object.keys(object);
          var maxIndex = keys.length - 1;
          for(var n = 0; n <= maxIndex; n++) {
              var key = keys[reverse ? maxIndex - n: n];
              if(handle(object[key], key, this) === false) {
                  return n + 1;
              }
          }
          return n;
      };

      proto$0.wasAltered = function() {
          return this.__altered;
      };

      proto$0.toString = function() {var this$0 = this;
          return this.__toString('Map {',
              Object.keys(this.__internal).map(function(v, index)  {
                  return typeof this$0.__internal[v] === 'string' ?
                      JSON.stringify(this$0.__internal[v]) :
                      this$0.__internal[v];
              }),'}');
      };

      proto$0.toMap = function() {
          return this;
      };
  MIXIN$0(src_Map__Map.prototype,proto$0);proto$0=void 0;return src_Map__Map;})(KeyedCollection);

  var EMPTY_MAP;
  function emptyMap() {
      return EMPTY_MAP || (EMPTY_MAP = makeMap());
  }

  function makeMap(init, ownerID) {
      var map = Object.create(src_Map__Map.prototype);
      map.__internal = new NativeObject();
      map.__ownerID = ownerID;
      map.__altered = false;
      if(init && (isNative(init) || (typeof init === 'object'))) {
          map.__internal = map.__internal.extend(init);
      }
      map.size = Object.keys(map.__internal).length;
      return map;
  }

  toolset__typedef({
      Map: MAP_TYPEDEF
  });

  src_Map__Map.prototype[IS_MAP_FLAG] = true;
  src_Map__Map.isMap = isMap;

  var SEQUENCE_TYPEDEF = '[Iterable ImmutableSequence]';
  var Sequence = (function(super$0){if(!PRS$0)MIXIN$0(Sequence, super$0);var static$0={},proto$0={};
      function Sequence(value) {
          if(value === null || value === undefined) {
              return emptySequence();
          } else if(isIterable(value)) {
              return value.toSequence();
          } else {
              return sequenceFromValue(value);
          }
          throw new Error(
              'Couldn\'t create an immutable-sequence of: ' + value
          );
      }if(super$0!==null)SP$0(Sequence,super$0);Sequence.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Sequence,"configurable":true,"writable":true}});DP$0(Sequence,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      static$0.of = function() {var value = SLICE$0.call(arguments, 0);
          return Sequence(value);
      };

      proto$0.toSequence = function() {
          return this;
      };

      proto$0.cacheResult = function() {
          if (!this._cache) {
              this._cache = 'this.entrySeq().toArray()';
              //this.size = this._cache.length;
          }
          return this;
      };

      proto$0.toString = function() {
          return this.__toString('Sequence [', null, ']');
      };
  MIXIN$0(Sequence,static$0);MIXIN$0(Sequence.prototype,proto$0);static$0=proto$0=void 0;return Sequence;})(Iterable);

  var INDEXED_SEQUENCE_TYPEDEF = '[Sequence IndexedSequence]';
  var IndexedSequence = (function(super$0){if(!PRS$0)MIXIN$0(IndexedSequence, super$0);var static$0={},proto$0={};
      function IndexedSequence(value) {
          if(nullOrUndefined(value)) {
              return emptySequence();
          } else if(!isIterable(value)) {
              return indexedSequenceFromData(value);
          } else if(isKeyed(value)) {
              return value.entrySequence();
          } else {
              return value.toIndexedSequence();
          }
          throw new Error(
              'Couldn\'t create an indexed-sequence of: ' + value
          );
      }if(super$0!==null)SP$0(IndexedSequence,super$0);IndexedSequence.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":IndexedSequence,"configurable":true,"writable":true}});DP$0(IndexedSequence,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      static$0.of = function(sequence) {
          return IndexedSequence(sequence);
      };

      proto$0.toIndexedSequence = function() {
          return this;
      };

      proto$0.toString = function() {
          return this.__toString(INDEXED_SEQUENCE_TYPEDEF)
      };

      proto$0.__iterate = function() {
          console.log('Iterate on IterableSequence');
      };
  MIXIN$0(IndexedSequence,static$0);MIXIN$0(IndexedSequence.prototype,proto$0);static$0=proto$0=void 0;return IndexedSequence;})(Sequence);

  var ARRAY_SEQUENCE_TYPEDEF = '[IndexedSequence ArraySequence]';
  var ArraySequence = (function(super$0){if(!PRS$0)MIXIN$0(ArraySequence, super$0);var static$0={},proto$0={};
      function ArraySequence(array) {
          this.__internal = array;
          this.size = array.length;
      }if(super$0!==null)SP$0(ArraySequence,super$0);ArraySequence.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":ArraySequence,"configurable":true,"writable":true}});DP$0(ArraySequence,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.__iterate = function(handle, reverse) {
          var array = this.__internal;
          var maxIndex = array.length - 1;
          for(var n = 0; n <= maxIndex; n++) {
              var findex = reverse ? maxIndex - n : n;
              if(handle(array[findex], n, this) === false) {
                  return n + 1;
              }
          }
          return n;
      };

      static$0.of = function(array) {
          return new ArraySequence(array);
      };

      proto$0.toArraySequence = function() {
          return this;
      };
  MIXIN$0(ArraySequence,static$0);MIXIN$0(ArraySequence.prototype,proto$0);static$0=proto$0=void 0;return ArraySequence;})(IndexedSequence);

  var KEYED_SEQUENCE_TYPEDEF = '[Sequence KeyedSequence]';
  var KeyedSequence = (function(super$0){if(!PRS$0)MIXIN$0(KeyedSequence, super$0);var proto$0={};
      function KeyedSequence(obj) {

      }if(super$0!==null)SP$0(KeyedSequence,super$0);KeyedSequence.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":KeyedSequence,"configurable":true,"writable":true}});DP$0(KeyedSequence,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toKeyedSequence = function() {
          return this;
      };
  MIXIN$0(KeyedSequence.prototype,proto$0);proto$0=void 0;return KeyedSequence;})(Sequence);

  var OBJECT_SEQUENCE_TYPEDEF = '[KeyedSequence ObjectSequence]';
  var ObjectSequence = (function(super$0){if(!PRS$0)MIXIN$0(ObjectSequence, super$0);var static$0={},proto$0={};
      function ObjectSequence(object) {
          var keys = Object.keys(object);
          this.__object = object;
          this.__keys = keys;
          this.size = keys.length;
      }if(super$0!==null)SP$0(ObjectSequence,super$0);ObjectSequence.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":ObjectSequence,"configurable":true,"writable":true}});DP$0(ObjectSequence,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.__iterate = function(handle, reverse) {
          var object = this.__object;
          var keys = this.__keys;
          var maxIndex = keys.length - 1;
          for(var n = 0; n <= maxIndex; n++) {
              var key = keys[reverse ? maxIndex - n: n];
              if(handle(object[key], key, this) === false) {
                  return n + 1;
              }
          }
          return n;
      };

      static$0.of = function(object) {
          return new ObjectSequence(object);
      };

      proto$0.toObjectSequence = function() {
          return this;
      };

      proto$0.has = function(key) {
          return this._object.hasOwnProperty(key);
      };

      proto$0.keys = function() {
          return this.__keys;
      };

      proto$0.values = function() {
          var results = [];
          this.keys().map(function(val ) {return results.push(val)});
          return results;
      };
  MIXIN$0(ObjectSequence,static$0);MIXIN$0(ObjectSequence.prototype,proto$0);static$0=proto$0=void 0;return ObjectSequence;})(KeyedSequence);

  var SET_SEQUENCE_TYPEDEF = '[ArraySequence SetSequence]';
  var SetSequence = (function(super$0){if(!PRS$0)MIXIN$0(SetSequence, super$0);var proto$0={};
      function SetSequence(value) {
          if(nullOrUndefined(value)) {
              /* If no value is given, return an empty sequence */
              return emptySequence().toSetSequence();
          } else if(!isIterable(value)) {
              /* If not is iterable, return a index sequence */
              return indexedSequenceFromData(value).toSetSequence();
          } else if(isKeyed(value)) {
              /* If has keys, get the raw sequence */
              return value.entrySequence().toSetSequence();
          } else {
              return emptySequence(value);
          }
          throw new Error(
              'Couldn\'t create a set-sequence of: ' + value
          );
      }if(super$0!==null)SP$0(SetSequence,super$0);SetSequence.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":SetSequence,"configurable":true,"writable":true}});DP$0(SetSequence,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toSetSequence = function() {
          return this;
      };
  MIXIN$0(SetSequence.prototype,proto$0);proto$0=void 0;return SetSequence;})(ArraySequence);
  ObjectSequence.prototype[IS_ORDERED_FLAG] = true;

  var EMPTY_SEQUENCE;
  function emptySequence() {
      return EMPTY_SEQUENCE || (EMPTY_SEQUENCE = new ArraySequence([]));
  }

  function maybeIndexedSequenceFromData(value) {
      return(
          is__arrayLike(value) ? new ArraySequence(value) :
          isIterable(value) ? new IndexedSequence(value) :
          undefined
      );
  }

  function keyedSequenceFromData(value) {
      var seq = Array.isArray(value) ? new ArraySequence(value) :
                typeof value === 'object' ? new ObjectSequence(value) :
                undefined;
      if(!seq) {
          throw new TypeError(
              'Expected Array or iterable obejct of [k, v] entries, ' +
              'or keyed object: ' + value
          );
      }
      return seq;
  }

  function indexedSequenceFromData(value) {
      var seq = maybeIndexedSequenceFromData(value);
      if(!seq) {
          throw new TypeError(
              'Expected Array-like or iterable object of values: ' + value
          );
      }
      return seq;
  }

  function sequenceFromValue(value) {
      var seq = (typeof value === 'object' && new ObjectSequence(value)) ||
          maybeIndexedSequenceFromData(value);
      if(!seq) {
          throw new TypeError(
              'Expected Array or iterable object of values, ' +
              'or keyed objects: ' + value
          );
      }
      return seq;
  }

  toolset__typedef({
      Sequence: SEQUENCE_TYPEDEF,
      ArraySequence: ARRAY_SEQUENCE_TYPEDEF,
      IndexedSequence: INDEXED_SEQUENCE_TYPEDEF,
      KeyedSequence: KEYED_SEQUENCE_TYPEDEF,
      ObjectSequence: OBJECT_SEQUENCE_TYPEDEF,
      SetSequence: SET_SEQUENCE_TYPEDEF
  });

  Sequence.Object = ObjectSequence;
  Sequence.Indexed = IndexedSequence;
  Sequence.Keyed = KeyedSequence;
  Sequence.Array = ArraySequence;
  Sequence.Set = SetSequence;
  Sequence.isSequence = Flags__isSequence;
  Sequence.prototype[IS_SEQUENCE_FLAG] = true;

  function fromJS(native, converter) {
      return converter ?
          fromJSWith(converter, native, '', {'': native}) :
          fromJSDefault(native);
  }

  function fromJSWith(converter, native, key, parent) {
      if(Array.isArray(native)) {
          return converter.call(parent, key, IndexedSequence(native).map(function(v, k)  {
              fromJSWith(converter, v, k, native);
          }));
      } else if(maybePlainObject(native)) {
          return converter.call(parent, key, KeyedSequence(native).map(function(v, k)  {
              fromJSWith(converter, v, k, native);
          }));
      }
  }

  function fromJSDefault(json) {
      if(Array.isArray(json)) {
          return IndexedSequence(json);
      }
      if(maybePlainObject(json)) {
          return KeyedSequence(json);
      }
  }

  function maybePlainObject(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  var SET_TYPEDEF = '[SetCollection Set]';
  var src_Set__Set = (function(super$0){if(!PRS$0)MIXIN$0(src_Set__Set, super$0);var proto$0={};
      function src_Set__Set(object) {
          return makeSet(object);
      }if(super$0!==null)SP$0(src_Set__Set,super$0);src_Set__Set.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":src_Set__Set,"configurable":true,"writable":true}});DP$0(src_Set__Set,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toSet = function() {
          return this;
      };

      proto$0.toString = function() {
          return this.__toString('Set {', this.__keys.join(','), '}');
      };

      proto$0.set = function(key) {
          var copy = this.__internal.__clone();
          copy[key] = true;
          console.log(copy);
          return new src_Set__Set(

          );
      };

      proto$0.unset = function(key) {
          var reduc = delete this.__internal.clone()[key];
          return new src_Set__Set(reduc);
      };

      proto$0.__iterate = function(handle, reverse) {
          var object = this.__internal;
          var keys = this.__keys;
          var maxIndex = keys.length - 1;
          for(var n = 0; n <= maxIndex; n++) {
              var key = keys[reverse ? maxIndex - n: n];
              if(handle(object[key], key, this) === false) {
                  return n + 1;
              }
          }
          return n;
      };
  MIXIN$0(src_Set__Set.prototype,proto$0);proto$0=void 0;return src_Set__Set;})(SetCollection);

  var EMPTY_SET;
  function emptySet() {
      return EMPTY_SET || (EMPTY_SET = makeSet());
  }

  function makeSet(map, ownerID) {
      var set = Object.create(src_Set__Set.prototype);
      set.__internal = new NativeObject();
      set.__ownerID = ownerID;
      if(map && isNative(map)) {
          set.__internal = map;
      } else if(map && typeof map === 'object') {
          set.__internal = set.__internal.extend(map);
      }
      set.__keys = Object.keys(set.__internal);
      set.size = set.__keys.length;
      return set;
  }

  var RECORD_TYPEDEF = '[KeyedCollection Record]';
  var Record = (function(super$0){if(!PRS$0)MIXIN$0(Record, super$0);var proto$0={};
      function Record(defaultValues, name) {
          var init;
          var RecordType = function Record(values) {
              if(values instanceof RecordType) {
                  return values;
              }
              if(!(this instanceof RecordType)) {
                  return new RecordType(values);
              }
              if(!init) {
                  init = true;
                  var keys = Object.keys(defaultValues);
                  setProps(RecordTypePrototype, keys);
                  RecordTypePrototype.size = keys.length || 0;
                  RecordTypePrototype.name = name;
                  RecordTypePrototype.__keys = keys;
                  RecordTypePrototype.__defaultValues = defaultValues;
              }
              RecordTypePrototype.__internal = new src_Map__Map();
              return RecordTypePrototype;
          }

          var RecordTypePrototype = RecordType.prototype = Object.create(Record.prototype);
          RecordTypePrototype.constructor = RecordType;
          return RecordType;
      }if(super$0!==null)SP$0(Record,super$0);Record.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Record,"configurable":true,"writable":true}});DP$0(Record,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toString = function() {
          return this.__toString(recordName(this) + '{', this.__keys.join(','), '}');
      };

      proto$0.toMap = function() {
          return makeMap(this.__internal, this.__ownerID);
      };

      proto$0.has = function(key) {
          return this.__defaultValues.hasOwnProperty(key);
      };

      proto$0.get = function(key, notSetValue) {
          if(!this.has(key)) {
              return notSetValue;
          }
          var defval = this.__defaultValues[key];
          return this.__internal ? this.__internal.get(key, defval) : defval;
      };

      proto$0.set = function(key, value) {
          if(!this.has(key)) {
              throw new Error('Can\'t set unknown key "' + key + '" on ' + recordName(this));
          }
          var newMap = this.__internal && this.__internal.set(key, value);
          if(this.__ownerID || newMap === this.__internal) {
              return this;
          }
          return makeRecord(this, newMap);
      };

      proto$0.remove = function(key) {
          if (!this.has(key)) {
              return this;
          }
          var newMap = this._map && this.__internal.remove(key);
          if (this.__ownerID || newMap === this.__internal) {
              return this;
          }
          return makeRecord(this, newMap);
      };

      proto$0.clear = function() {
          if(this.__ownerID) {
              this.__internal && this.__internal.clear();
              return this;
          }
          var RecordType = this.constructor;
          return RecordType.__empty || (RecordType.__empty = makeRecord(this, emptyMap()))
      };

      proto$0.wasAltered = function() {
          return this.__internal.wasAltered();
      };

      proto$0.__ensureOwner = function(ownerID) {
          if(ownerID === this.__ownerID) {
              return this;
          }
          if(!ownerID || nullOrUndefined(ownerID)) {
              this.__ownerID = ownerID;
              this.__altered = false;
              return this;
          }
          return makeRecord(this, this.__internal, ownerID);
      };

  MIXIN$0(Record.prototype,proto$0);proto$0=void 0;return Record;})(KeyedCollection);

  function makeRecord(recordType, map, ownerID) {
      var record = Object.create(Object.getPrototypeOf(recordType));
      record.__internal = map;
      record.__ownerID = ownerID;
      return record;
  }

  function recordName(record) {
      return record._name || record.constructor.name || 'Record';
  }

  function setProp(prototype, name) {
      Object.defineProperty(prototype, name, {
          get: function() {
              return this.get(name);
          },
          set: function(value) {
              invariant(this.__ownerID, 'Can\'t call set on an immutable record.');
              this.set(name, value);
          }
      });
  }

  function setProps(prototype, names) {
      try {
          names.forEach(setProp.bind(undefined, prototype));
      } catch (error) {
          // Maybe IE8.
      }
  }

  toolset__typedef({
      Record: RECORD_TYPEDEF
  });

  var Range = (function(super$0){if(!PRS$0)MIXIN$0(Range, super$0);
      function Range(start, end, step) {
          if(!(this instanceof Range)) {
              return new Range(start, end, step);
          }
          invariant(step !== 0, 'Can\'t create a range with steps by 0');
          start = start || 0;
          if(end === undefined) {
              end = Infinity;
          }
          step = step === undefined ? 1 : Math.abs(step); // Absolute value of number
          if(end < start) {
              step = -step;
          }
          this.__start = start;
          this.__end = end;
          this.__step = step;
          this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
          if(this.size === 0) {
              if(EMPTY_RANGE) {
                  return EMPTY_RANGE;
              }
              EMPTY_RANGE = this;
          }
      }if(super$0!==null)SP$0(Range,super$0);Range.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Range,"configurable":true,"writable":true}});DP$0(Range,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  ;return Range;})(IndexedSequence);

  var EMPTY_RANGE;

  var Repeat = (function(super$0){if(!PRS$0)MIXIN$0(Repeat, super$0);var proto$0={};
      function Repeat(value, repeater) {
          if(!(this instanceof Repeat)) {
              return new Repeat(value, repeater);
          }
          this.__value = value;
          this.size = repeater === undefined ? Infinity : Math.max(0, repeater);
          if(this.size === 0) {
              if(EMPTY_REPEAT) {
                  return EMPTY_REPEAT;
              }
              EMPTY_REPEAT = this;
          }
      }if(super$0!==null)SP$0(Repeat,super$0);Repeat.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Repeat,"configurable":true,"writable":true}});DP$0(Repeat,"prototype",{"configurable":false,"enumerable":false,"writable":false});

      proto$0.toString = function() {
          return this.__toString('Repeat [', this.__value + ' ' + this.size + ' times', ']');
      };

      proto$0.includes = function(search) {
          return equal(this.__value, search);
      };

      proto$0.indexOf = function(search) {
          if(this.includes(search)) {
              return 0;
          }
          return -1;
      };

      proto$0.__iterate = function(handle) {
          for(var ii = 0; ii < this.size; ii++) {
              if(handle(this.__value, ii, this) === false) {
                  return ii + 1;
              }
          }
          return ii;
      };

      proto$0.__ensureOwner = function(ownerID) {
          if(ownerID === this.__ownerID) {
              return this;
          }
          if(!ownerID || nullOrUndefined(ownerID)) {
              this.__ownerID = ownerID;
              this.__altered = false;
              return this;
          }
          return new Repeat(this.__value, this.size, ownerID);
      };
  MIXIN$0(Repeat.prototype,proto$0);proto$0=void 0;return Repeat;})(Sequence);

  var EMPTY_REPEAT;

  // Polyfills for ES5 and older Browsers
  var Immutable = {
      Sequence: Sequence,
      Iterable: Iterable,
      Collection: Collection,
      List: List,
      Map: src_Map__Map,
      Native: NativeCollection,
      Set: src_Set__Set,
      Stack: Stack,
      Range: Range,
      Record: Record,
      Repeat: Repeat,
      fromJS: fromJS
  }

  return Immutable;

}));