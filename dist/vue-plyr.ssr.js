'use strict';Object.defineProperty(exports,'__esModule',{value:true});var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule$1(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable$1.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

var f$6 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$3(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;
var objectPropertyIsEnumerable = {
  f: f$6
};var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};var toString$1 = {}.toString;

var classofRaw = function (it) {
  return toString$1.call(it).slice(8, -1);
};var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};var isObject$2 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject$2(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$2(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$2(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$2(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};// https://tc39.es/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};var hasOwnProperty = {}.hasOwnProperty;

var has$1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$2(document$1) && isObject$2(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};var ie8DomDefine = !descriptors && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

var f$5 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) {
    /* empty */
  }
  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$5
};var anObject = function (it) {
  if (!isObject$2(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

var f$4 = descriptors ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$4
};var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};var SHARED = '__core-js_shared__';
var store$1 = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store$1;var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;var WeakMap$2 = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource(WeakMap$2));var isPure = false;var shared = createCommonjsModule$1(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.14.0',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
});var id$1 = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix).toString(36);
};var keys$2 = shared('keys');

var sharedKey = function (key) {
  return keys$2[key] || (keys$2[key] = uid(key));
};var hiddenKeys$1 = {};var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap$1 = global_1.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap || sharedStore.state) {
  var store = sharedStore.state || (sharedStore.state = new WeakMap$1());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$1[STATE] = true;

  set = function (it, metadata) {
    if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return has$1(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return has$1(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};var redefine = createCommonjsModule$1(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');
  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$1(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key);
      }

      state = enforceInternalState(value);

      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }

    if (O === global_1) {
      if (simple) O[key] = value;else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
});var path = global_1;var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};var ceil$1 = Math.ceil;
var floor$6 = Math.floor; // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$6 : ceil$1)(argument);
};var min$5 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min$5(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};var max$3 = Math.max;
var min$4 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max$3(integer + length, 0) : min$4(integer, length);
};var createMethod$4 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$4(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$4(false)
};var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has$1(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};// IE8- don't enum bug keys
var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys);
};

var objectGetOwnPropertyNames = {
  f: f$3
};// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var f$2 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$2
};var ownKeys$2 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};var copyConstructorProperties = function (target, source) {
  var keys = ownKeys$2(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$2(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;/* eslint-disable es/no-symbol -- required for testing */
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && engineV8Version && engineV8Version < 41;
});/* eslint-disable es/no-symbol -- required for testing */

var useSymbolAsUid = nativeSymbol && !Symbol.sham && typeof Symbol.iterator == 'symbol';// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$2 = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

  return O;
};var html = getBuiltIn('document', 'documentElement');var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};/* eslint-disable es/no-object-getownpropertynames -- safe */

var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$1 = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$1
};var WellKnownSymbolsStore$1 = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (nativeSymbol && has$1(Symbol$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore$1[name];
};var f = wellKnownSymbol;
var wellKnownSymbolWrapped = {
  f: f
};var defineProperty$6 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has$1(Symbol, NAME)) defineProperty$6(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};var defineProperty$5 = objectDefineProperty.f;
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
    defineProperty$5(it, TO_STRING_TAG$3, {
      configurable: true,
      value: TAG
    });
  }
};var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};var functionBindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};var SPECIES$5 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C;

  if (isArray$2(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;else if (isObject$2(C)) {
      C = C[SPECIES$5];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

var createMethod$3 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push.call(target, value);
            // filterOut
          }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$3(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$3(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$3(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$3(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$3(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$3(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$3(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$3(7)
};var $forEach$1 = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState$5 = internalState.set;
var getInternalState$2 = internalState.getterFor(SYMBOL);
var ObjectPrototype$1 = Object[PROTOTYPE];
var $Symbol = global_1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty = objectDefineProperty.f;
var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      return nativeDefineProperty(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap$1 = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
  setInternalState$5(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has$1(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach$1(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype$1 && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype$1 && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

  if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (!has$1(AllSymbols, key) && !has$1(hiddenKeys$1, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype$1, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
      if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
      configurable: true,
      set: setter
    });
    return wrap$1(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState$2(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap$1(uid(description), description);
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap$1(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$2(this).description;
      }
    });

    {
      redefine(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});
$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  _export({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject$2(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray$2(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys$1[HIDDEN] = true;var SPECIES$4 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES$4] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};var $filter = arrayIteration.filter;
var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('filter'); // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$3
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED$4 = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED$4,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};var $forEach = arrayIteration.forEach;
var STRICT_METHOD$2 = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach

var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype$1.forEach = arrayForEach;
  }
}var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys$2(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}var defineProperty$4 = objectDefineProperty.f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name

if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$4(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}var defineProperty$3 = objectDefineProperty.f;
var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$3(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject$2(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has$1(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });
  _export({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
}var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
var test$1 = {};
test$1[TO_STRING_TAG$2] = 'z';
var toStringTagSupport = String(test$1) === '[object z]';var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};// https://tc39.es/ecma262/#sec-object.prototype.tostring


var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, {
    unsafe: true
  });
}// https://tc39.es/ecma262/#sec-symbol.iterator

defineWellKnownSymbol('iterator');var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype;
});var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has$1(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};var ITERATOR$7 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

var returnThis$2 = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
  var test = {}; // FF44- legacy iterators case

  return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

if (!has$1(IteratorPrototype$2, ITERATOR$7)) {
  createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$7, returnThis$2);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};var iterators = {};var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};var aPossiblePrototype = function (it) {
  if (!isObject$2(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};/* eslint-disable no-proto -- safe */
// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);var IteratorPrototype = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$6 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$6] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$6] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$6, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$6, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};var charAt$1 = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$4 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$4(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt$1(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
} // add a key to Array.prototype[@@unscopables]


var addToUnscopables = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$3 = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$3(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$5] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}var iteratorClose = function (iterator) {
  var returnMethod = iterator['return'];

  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};var ITERATOR$4 = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$4] === it);
};var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
};// https://tc39.es/ecma262/#sec-array.from


var arrayFrom = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.es/ecma262/#sec-array.from

_export({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: arrayFrom
});function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
var SPECIES$3 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$2 = Math.max; // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$2
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray$2(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray$2(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$2(Constructor)) {
        Constructor = Constructor[SPECIES$3];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}var $includes = arrayIncludes.includes; // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes

_export({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');var MATCH$2 = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject$2(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) {
      /* empty */
    }
  }

  return false;
};// https://tc39.es/ecma262/#sec-string.prototype.includes


_export({
  target: 'String',
  proto: true,
  forced: !correctIsRegexpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject$2(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};// a string of all valid unicode whitespaces
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$1 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var defineProperty$2 = objectDefineProperty.f;
var trim = stringTrim.trim;
var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber

var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;

  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = it.slice(2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor


if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
    && (BROKEN_CLASSOF ? fails(function () {
      NumberPrototype.valueOf.call(dummy);
    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };

  for (var keys$1 = descriptors ? getOwnPropertyNames$1(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' + // ESNext
  'fromString,range').split(','), j = 0, key; keys$1.length > j; j++) {
    if (has$1(NativeNumber, key = keys$1[j]) && !has$1(NumberWrapper, key)) {
      defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor$1(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}// https://tc39.es/ecma262/#sec-number.isnan

_export({
  target: 'Number',
  stat: true
}, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags


var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};// so we use an intermediate function.


function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y$3 = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});
var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});
var regexpStickyHelpers = {
  UNSUPPORTED_Y: UNSUPPORTED_Y$3,
  BROKEN_CARET: BROKEN_CARET
};/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */


var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();

var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');

      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.


      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;// https://tc39.es/ecma262/#sec-regexp.prototype.exec


_export({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== regexpExec
}, {
  exec: regexpExec
});var SPECIES$2 = wellKnownSymbol('species');
var RegExpPrototype$2 = RegExp.prototype;
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
}); // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

var REPLACE_KEEPS_$0 = function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
}();

var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }

  return false;
}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper


var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES$2] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;

      if ($exec === regexpExec || $exec === RegExpPrototype$2.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];
    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExpPrototype$2, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return regexMethod.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return regexMethod.call(string, this);
    });
  }

  if (sham) createNonEnumerableProperty(RegExpPrototype$2[SYMBOL], 'sham', true);
};var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.es/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : regexp[MATCH];
    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regexpExecAbstract(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regexpExecAbstract(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});// https://tc39.es/ecma262/#sec-thisnumbervalue

var thisNumberValue = function (value) {
  if (typeof value != 'number' && classofRaw(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }

  return +value;
};// https://tc39.es/ecma262/#sec-string.prototype.repeat


var stringRepeat = function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

  return result;
};var nativeToFixed = 1.0.toFixed;
var floor$5 = Math.floor;

var pow$1 = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow$1(x, n - 1, acc * x) : pow$1(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;

  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor$5(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;

  while (--index >= 0) {
    c += data[index];
    data[index] = floor$5(c / n);
    c = c % n * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';

  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
    }
  }

  return s;
};

var FORCED$3 = nativeToFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
}); // `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed

_export({
  target: 'Number',
  proto: true,
  forced: FORCED$3
}, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;
    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare -- NaN check

    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);

    if (number < 0) {
      sign = '-';
      number = -number;
    }

    if (number > 1e-21) {
      e = log(number * pow$1(2, 69, 1)) - 69;
      z = e < 0 ? number * pow$1(2, -e, 1) : number / pow$1(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;

        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }

        multiply(data, pow$1(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }

        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + stringRepeat.call('0', fractDigits);
      }
    }

    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits ? '0.' + stringRepeat.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    }

    return result;
  }
});var $map = arrayIteration.map;
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$1
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);

  return target;
};var freezing = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});var internalMetadata = createCommonjsModule$1(function (module) {
  var defineProperty = objectDefineProperty.f;
  var METADATA = uid('meta');
  var id = 0; // eslint-disable-next-line es/no-object-isextensible -- safe

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject$2(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has$1(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys$1[METADATA] = true;
});var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
    }

    iterator = iterFn.call(iterable);
  }

  next = iterator.next;

  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }

    if (typeof result == 'object' && result && result instanceof Result) return result;
  }

  return new Result(false);
};var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
      nativeMethod.call(this, value === 0 ? 0 : value);
      return this;
    } : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject$2(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function get(key) {
      return IS_WEAK && !isObject$2(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'has' ? function has(key) {
      return IS_WEAK && !isObject$2(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : function set(key, value) {
      nativeMethod.call(this, key === 0 ? 0 : key, value);
      return this;
    });
  };

  var REPLACE = isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })));

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) $instance[ADDER](index, index);

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);
  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};var getWeakData = internalMetadata.getWeakData;
var setInternalState$2 = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var find$1 = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var id = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find$1(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};
var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], {
        that: that,
        AS_ENTRIES: IS_MAP
      });
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject$2(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && has$1(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject$2(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && has$1(data, state.id);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);

        if (isObject$2(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });
    return C;
  }
};createCommonjsModule$1(function (module) {

  var enforceIternalState = internalState.enforce;
  var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1; // eslint-disable-next-line es/no-object-isextensible -- safe

  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }; // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor


  var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak); // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485

  if (nativeWeakMap && IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    internalMetadata.REQUIRED = true;
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject$2(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        }

        return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject$2(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        }

        return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject$2(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        }

        return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject$2(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);

        return this;
      }
    });
  }
});var ITERATOR$1 = wellKnownSymbol('iterator');
var nativeUrl = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return isPure && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR$1] // throws in Edge
  || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' // not punycoded in Edge
  || new URL('http://тест').host !== 'xn--e1aybc' // not escaped in Chrome 62-
  || new URL('http://a#б').hash !== '#%D0%B1' // fails in Chrome 66-
  || result !== 'a1c3' // throws in Safari
  || new URL('http://x', undefined).host !== 'x';
});var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

var defineProperty$1 = Object.defineProperty; // `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign

var objectAssign = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && $assign({
    b: 1
  }, $assign(defineProperty$1({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$1(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line es/no-symbol -- safe

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : $assign;var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80

var delimiter = '-'; // '\x2D'

var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars

var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor$4 = Math.floor;
var stringFromCharCode = String.fromCharCode;
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */

var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var value = string.charCodeAt(counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }

  return output;
};
/**
 * Converts a digit/integer into a basic code point.
 */


var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */


var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$4(delta / damp) : delta >> 1;
  delta += floor$4(delta / numPoints);

  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor$4(delta / baseMinusTMin);
  }

  return floor$4(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line max-statements -- TODO


var encode = function (input) {
  var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

  input = ucs2decode(input); // Cache the length.

  var inputLength = input.length; // Initialize the state.

  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue; // Handle the basic code points.

  for (i = 0; i < input.length; i++) {
    currentValue = input[i];

    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.

  var handledCPCount = basicLength; // number of code points that have been handled;
  // Finish the basic string with a delimiter unless it's empty.

  if (basicLength) {
    output.push(delimiter);
  } // Main encoding loop:


  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.


    var handledCPCountPlusOne = handledCPCount + 1;

    if (m - n > floor$4((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;

        for (var k = base;;
        /* no condition */
        k += base) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$4(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }

  return output.join('');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;

  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }

  return encoded.join('.');
};var getIterator = function (it) {
  var iteratorMethod = getIteratorMethod(it);

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject(iteratorMethod.call(it));
};var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$1 = internalState.set;
var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;

  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }

    return result;
  }
};

var find = /[!'()~]|%20/g;
var replace$1 = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace$1[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;

    while (index < attributes.length) {
      attribute = attributes[index++];

      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$1(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;

  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  }

  return step;
}); // `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams

var URLSearchParamsConstructor = function URLSearchParams()
/* init */
{
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
  setInternalState$1(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () {
      /* empty */
    },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject$2(init)) {
      iteratorMethod = getIteratorMethod(init);

      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;

        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done) throw TypeError('Expected sequence with length 2');
          entries.push({
            key: first.value + '',
            value: second.value + ''
          });
        }
      } else for (key in init) if (has$1(init, key)) entries.push({
        key: key,
        value: init[key] + ''
      });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({
      key: name + '',
      value: value + ''
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;

    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);else index++;
    }

    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }

    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }

    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;

    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }

    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;

    for (; index < entries.length; index++) {
      entry = entries[index];

      if (entry.key === key) {
        if (found) entries.splice(index--, 1);else {
          found = true;
          entry.value = val;
        }
      }
    }

    if (!found) entries.push({
      key: key,
      value: val
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries; // Array#sort is not stable in some engines

    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;

    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];

      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }

      if (entriesIndex === sliceIndex) entries.push(entry);
    }

    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback
  /* , thisArg */
  ) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = functionBindContext(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, {
  enumerable: true
}); // `URLSearchParams.prototype[@@iterator]` method

redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries); // `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;

  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  }

  return result.join('&');
}, {
  enumerable: true
});
setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
_export({
  global: true,
  forced: !nativeUrl
}, {
  URLSearchParams: URLSearchParamsConstructor
}); // Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674

if (!nativeUrl && typeof $fetch == 'function' && typeof Headers == 'function') {
  _export({
    global: true,
    enumerable: true,
    forced: true
  }, {
    fetch: function fetch(input
    /* , init */
    ) {
      var args = [input];
      var init, body, headers;

      if (arguments.length > 1) {
        init = arguments[1];

        if (isObject$2(init)) {
          body = init.body;

          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();

            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }

            init = objectCreate(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }

        args.push(init);
      }

      return $fetch.apply(this, args);
    }
  });
}

var web_urlSearchParams = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};var codeAt = stringMultibyte.codeAt;
var NativeURL = global_1.URL;
var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
var getInternalSearchParamsState = web_urlSearchParams.getState;
var setInternalState = internalState.set;
var getInternalURLState = internalState.getterFor('URL');
var floor$3 = Math.floor;
var pow = Math.pow;
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[A-Za-z]/; // eslint-disable-next-line regexp/no-obscure-range -- safe

var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
/* eslint-disable no-control-regex -- safe */

var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:?@[\\]]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:?@[\\]]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable no-control-regex -- safe */

var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;

  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result; // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);

    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }

    url.host = result;
  } else {
    input = stringPunycodeToAscii(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;

  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }

  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];

  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;

    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }

    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }

    numbers.push(number);
  }

  for (index = 0; index < partsLength; index++) {
    number = numbers[index];

    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }

  ipv4 = numbers.pop();

  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }

  return ipv4;
}; // eslint-disable-next-line max-statements -- TODO


var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }

  while (char()) {
    if (pieceIndex == 8) return;

    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }

    value = length = 0;

    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }

    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;

      while (char()) {
        ipv4Piece = null;

        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;else return;
        }

        if (!DIGIT.test(char())) return;

        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;else if (ipv4Piece == 0) return;else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }

        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }

      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;

    address[pieceIndex++] = value;
  }

  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;

    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;

  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;

  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }

      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }

  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }

  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0; // ipv4

  if (typeof host == 'number') {
    result = [];

    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor$3(host / 256);
    }

    return result.join('.'); // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);

    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;

      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }

    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
  ' ': 1,
  '"': 1,
  '<': 1,
  '>': 1,
  '`': 1
});
var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
  '#': 1,
  '?': 1,
  '{': 1,
  '}': 1
});
var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
  '/': 1,
  ':': 1,
  ';': 1,
  '=': 1,
  '@': 1,
  '[': 1,
  '\\': 1,
  ']': 1,
  '^': 1,
  '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has$1(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has$1(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ':' || !normalized && second == '|');
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || (third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#');
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;

  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
}; // States:


var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {}; // eslint-disable-next-line max-statements -- TODO

var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');
  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];

    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;

        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (isSpecial(url) != has$1(specialSchemes, buffer) || buffer == 'file' && (includesCredentials(url) || url.port !== null) || url.scheme == 'file' && !url.host)) return;
          url.scheme = buffer;

          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }

          buffer = '';

          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;

        break;

      case NO_SCHEME:
        if (!base || base.cannotBeABaseURL && char != '#') return INVALID_SCHEME;

        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }

        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        }

        break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;

        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || char == '\\' && isSpecial(url)) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        }

        break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        }

        break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        }

        break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);

          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];

            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }

            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;else url.username += encodedCodePoints;
          }

          buffer = '';
        } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;

        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;else if (char == ']') seenBracket = false;
          buffer += char;
        }

        break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url) || stateOverride) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
            buffer = '';
          }

          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;

        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }

            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        }
        break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }

        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);else url.host = base.host;
        }

        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          }

          continue;
        } else buffer += char;

        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        }

        break;

      case PATH:
        if (char == EOF || char == '/' || char == '\\' && isSpecial(url) || !stateOverride && (char == '?' || char == '#')) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);

            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }

            url.path.push(buffer);
          }

          buffer = '';

          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }

          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        }

        break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        }

        break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';else if (char == '#') url.query += '%23';else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        }

        break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
}; // `URL` constructor
// https://url.spec.whatwg.org/#url-class


var URLConstructor = function URL(url
/* , base */
) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, {
    type: 'URL'
  });
  var baseState, failure;

  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }

  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams$1();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);

  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };

  if (!descriptors) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost$1.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';

  if (host !== null) {
    output += '//';

    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }

    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';

  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URLConstructor(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost$1 = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return {
    get: getter,
    set: setter,
    configurable: true,
    enumerable: true
  };
};

if (descriptors) {
  objectDefineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';

      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';

      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost$1, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);

      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }

      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);

      if (hash == '') {
        url.fragment = null;
        return;
      }

      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
} // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson


redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, {
  enumerable: true
}); // `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior

redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, {
  enumerable: true
});

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL; // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`

  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  }); // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`

  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');
_export({
  global: true,
  forced: !nativeUrl,
  sham: !descriptors
}, {
  URL: URLConstructor
});var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f; // eslint-disable-next-line es/no-string-prototype-startswith -- safe

var $startsWith = ''.startsWith;
var min$3 = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith'); // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}(); // `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith

_export({
  target: 'String',
  proto: true,
  forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
  startsWith: function startsWith(searchString
  /* , position = 0 */
  ) {
    var that = String(requireObjectCoercible(this));
    notARegexp(searchString);
    var index = toLength(min$3(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});var $find = arrayIteration.find;
var FIND = 'find';
var SKIPS_HOLES$1 = true; // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES$1 = false;
}); // `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find

_export({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES$1
}, {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND);var SPECIES$1 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction(S);
};var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min$2 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // @@split logic

fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
  'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
  '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.es/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = requireObjectCoercible(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y$1 ? 'g' : 'y'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(UNSUPPORTED_Y$1 ? '^(?:' + rx.source + ')' : rx, flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = UNSUPPORTED_Y$1 ? 0 : q;
      var z = regexpExecAbstract(splitter, UNSUPPORTED_Y$1 ? S.slice(q) : S);
      var e;

      if (z === null || (e = min$2(toLength(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, UNSUPPORTED_Y$1);var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$2(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$2(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$2
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};var $entries = objectToArray.entries; // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries

_export({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};var $trim = stringTrim.trim; // `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim

_export({
  target: 'String',
  proto: true,
  forced: stringTrimForced('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});var floor$2 = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution

var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }

  return replace.call(replacement, symbols, function (match, ch) {
    var capture;

    switch (ch.charAt(0)) {
      case '$':
        return '$';

      case '&':
        return matched;

      case '`':
        return str.slice(0, position);

      case "'":
        return str.slice(tailPos);

      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;

      default:
        // \d\d?
        var n = +ch;
        if (n === 0) return match;

        if (n > m) {
          var f = floor$2(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }

        capture = captures[n - 1];
    }

    return capture === undefined ? '' : capture;
  });
};var max$1 = Math.max;
var min$1 = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
  return [// `String.prototype.replace` method
  // https://tc39.es/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;
    }

    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regexpExecAbstract(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max$1(min$1(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }];
});var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}var SPECIES = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};var defineProperty = objectDefineProperty.f;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var enforceInternalState = internalState.enforce;
var MATCH = wellKnownSymbol('match');
var NativeRegExp = global_1.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y;
var FORCED$1 = descriptors && isForced_1('RegExp', !CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})); // `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor

if (FORCED$1) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (UNSUPPORTED_Y && sticky) {
      var state = enforceInternalState(result);
      state.sticky = true;
    }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () {
        return NativeRegExp[key];
      },
      set: function (it) {
        NativeRegExp[key] = it;
      }
    });
  };

  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;

  while (keys.length > index) proxy(keys[index++]);

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global_1, 'RegExp', RegExpWrapper);
} // https://tc39.es/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');var ceil = Math.ceil;
var floor$1 = Math.floor; // `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc

_export({
  target: 'Math',
  stat: true
}, {
  trunc: function trunc(it) {
    return (it > 0 ? floor$1 : ceil)(it);
  }
});var nativeJoin = [].join;
var ES3_STRINGS = indexedObject != Object;
var STRICT_METHOD$1 = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

_export({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || !STRICT_METHOD$1
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});// TODO: use something more complex like timsort?
var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(mergeSort(array.slice(0, middle), comparefn), mergeSort(array.slice(middle), comparefn), comparefn);
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];

    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }

    if (j !== i++) array[j] = element;
  }

  return array;
};

var merge = function (left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;
  var result = [];

  while (lindex < llength || rindex < rlength) {
    if (lindex < llength && rindex < rlength) {
      result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
    } else {
      result.push(lindex < llength ? left[lindex++] : right[rindex++]);
    }
  }

  return result;
};

var arraySort = mergeSort;var firefox = engineUserAgent.match(/firefox\/(\d+)/i);
var engineFfVersion = !!firefox && +firefox[1];var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);
var engineWebkitVersion = !!webkit && +webkit[1];var test = [];
var nativeSort = test.sort; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test.sort(null);
}); // Old WebKit

var STRICT_METHOD = arrayMethodIsStrict('sort');
var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (engineV8Version) return engineV8Version < 70;
  if (engineFfVersion && engineFfVersion > 3) return;
  if (engineIsIeOrEdge) return true;
  if (engineWebkitVersion) return engineWebkitVersion < 603;
  var result = '';
  var code, chr, value, index; // generate an array with more 512 elements (Chakra and old V8 fails only in this case)

  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66:
      case 69:
      case 70:
      case 72:
        value = 3;
        break;

      case 68:
      case 71:
        value = 4;
        break;

      default:
        value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({
        k: chr + index,
        v: value
      });
    }
  }

  test.sort(function (a, b) {
    return b.v - a.v;
  });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});
var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return String(x) > String(y) ? 1 : -1;
  };
}; // `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort


_export({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aFunction(comparefn);
    var array = toObject(this);
    if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);
    var items = [];
    var arrayLength = toLength(array.length);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) items.push(array[index]);
    }

    items = arraySort(items, getSortCompare(comparefn));
    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];

    while (index < arrayLength) delete array[index++];

    return array;
  }
});var $values = objectToArray.values; // `Object.values` method
// https://tc39.es/ecma262/#sec-object.values

_export({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
var mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};// https://tc39.es/ecma262/#sec-math.sign

_export({
  target: 'Math',
  stat: true
}, {
  sign: mathSign
});// https://tc39.es/ecma262/#sec-globalthis

_export({
  global: true
}, {
  globalThis: global_1
});var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});var $findIndex = arrayIteration.findIndex;
var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex

_export({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND_INDEX);// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [// `String.prototype.search` method
  // https://tc39.es/ecma262/#sec-string.prototype.search
  function search(regexp) {
    var O = requireObjectCoercible(this);
    var searcher = regexp == undefined ? undefined : regexp[SEARCH];
    return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, // `RegExp.prototype[@@search]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative(nativeSearch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = regexpExecAbstract(rx, S);
    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});var _excluded = ["premium", "referrerPolicy"];

function _defineProperty$1(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, t) {
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
  }
}

function _createClass(e, t, i) {
  return t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), e;
}

function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

function ownKeys(e, t) {
  var i = Object.keys(e);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    t && (s = s.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), i.push.apply(i, s);
  }

  return i;
}

function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys(Object(i), !0).forEach(function (t) {
      _defineProperty(e, t, i[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
    });
  }

  return e;
}

var defaults$1 = {
  addCSS: !0,
  thumbWidth: 15,
  watch: !0
};

function matches$1(e, t) {
  return function () {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }.call(e, t);
}

function trigger(e, t) {
  if (e && t) {
    var i = new Event(t, {
      bubbles: !0
    });
    e.dispatchEvent(i);
  }
}

var getConstructor$1 = function getConstructor$1(e) {
  return null != e ? e.constructor : null;
},
    instanceOf$1 = function instanceOf$1(e, t) {
  return !!(e && t && e instanceof t);
},
    isNullOrUndefined$1 = function isNullOrUndefined$1(e) {
  return null == e;
},
    isObject$1 = function isObject$1(e) {
  return getConstructor$1(e) === Object;
},
    isNumber$1 = function isNumber$1(e) {
  return getConstructor$1(e) === Number && !Number.isNaN(e);
},
    isString$1 = function isString$1(e) {
  return getConstructor$1(e) === String;
},
    isBoolean$1 = function isBoolean$1(e) {
  return getConstructor$1(e) === Boolean;
},
    isFunction$1 = function isFunction$1(e) {
  return getConstructor$1(e) === Function;
},
    isArray$1 = function isArray$1(e) {
  return Array.isArray(e);
},
    isNodeList$1 = function isNodeList$1(e) {
  return instanceOf$1(e, NodeList);
},
    isElement$1 = function isElement$1(e) {
  return instanceOf$1(e, Element);
},
    isEvent$1 = function isEvent$1(e) {
  return instanceOf$1(e, Event);
},
    isEmpty$1 = function isEmpty$1(e) {
  return isNullOrUndefined$1(e) || (isString$1(e) || isArray$1(e) || isNodeList$1(e)) && !e.length || isObject$1(e) && !Object.keys(e).length;
},
    is$1 = {
  nullOrUndefined: isNullOrUndefined$1,
  object: isObject$1,
  number: isNumber$1,
  string: isString$1,
  boolean: isBoolean$1,
  function: isFunction$1,
  array: isArray$1,
  nodeList: isNodeList$1,
  element: isElement$1,
  event: isEvent$1,
  empty: isEmpty$1
};

function getDecimalPlaces(e) {
  var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}

function round(e, t) {
  if (1 > t) {
    var i = getDecimalPlaces(t);
    return parseFloat(e.toFixed(i));
  }

  return Math.round(e / t) * t;
}

var RangeTouch = function () {
  function e(t, i) {
    _classCallCheck(this, e), is$1.element(t) ? this.element = t : is$1.string(t) && (this.element = document.querySelector(t)), is$1.element(this.element) && is$1.empty(this.element.rangeTouch) && (this.config = _objectSpread2({}, defaults$1, {}, i), this.init());
  }

  return _createClass(e, [{
    key: "init",
    value: function value() {
      e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
    }
  }, {
    key: "destroy",
    value: function value() {
      e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
    }
  }, {
    key: "listeners",
    value: function value(e) {
      var t = this,
          i = e ? "addEventListener" : "removeEventListener";
      ["touchstart", "touchmove", "touchend"].forEach(function (e) {
        t.element[i](e, function (e) {
          return t.set(e);
        }, !1);
      });
    }
  }, {
    key: "get",
    value: function value(t) {
      if (!e.enabled || !is$1.event(t)) return null;
      var i,
          s = t.target,
          n = t.changedTouches[0],
          r = parseFloat(s.getAttribute("min")) || 0,
          a = parseFloat(s.getAttribute("max")) || 100,
          o = parseFloat(s.getAttribute("step")) || 1,
          l = s.getBoundingClientRect(),
          c = 100 / l.width * (this.config.thumbWidth / 2) / 100;
      return 0 > (i = 100 / l.width * (n.clientX - l.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), r + round(i / 100 * (a - r), o);
    }
  }, {
    key: "set",
    value: function value(t) {
      e.enabled && is$1.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), trigger(t.target, "touchend" === t.type ? "change" : "input"));
    }
  }], [{
    key: "setup",
    value: function value(t) {
      var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          s = null;
      if (is$1.empty(t) || is$1.string(t) ? s = Array.from(document.querySelectorAll(is$1.string(t) ? t : 'input[type="range"]')) : is$1.element(t) ? s = [t] : is$1.nodeList(t) ? s = Array.from(t) : is$1.array(t) && (s = t.filter(is$1.element)), is$1.empty(s)) return null;

      var n = _objectSpread2({}, defaults$1, {}, i);

      if (is$1.string(t) && n.watch) {
        var r = new MutationObserver(function (i) {
          Array.from(i).forEach(function (i) {
            Array.from(i.addedNodes).forEach(function (i) {
              is$1.element(i) && matches$1(i, t) && new e(i, n);
            });
          });
        });
        r.observe(document.body, {
          childList: !0,
          subtree: !0
        });
      }

      return s.map(function (t) {
        return new e(t, i);
      });
    }
  }, {
    key: "enabled",
    get: function get() {
      return "ontouchstart" in document.documentElement;
    }
  }]), e;
}();

var getConstructor = function getConstructor(e) {
  return null != e ? e.constructor : null;
},
    instanceOf = function instanceOf(e, t) {
  return Boolean(e && t && e instanceof t);
},
    isNullOrUndefined = function isNullOrUndefined(e) {
  return null == e;
},
    isObject = function isObject(e) {
  return getConstructor(e) === Object;
},
    isNumber = function isNumber(e) {
  return getConstructor(e) === Number && !Number.isNaN(e);
},
    isString = function isString(e) {
  return getConstructor(e) === String;
},
    isBoolean = function isBoolean(e) {
  return getConstructor(e) === Boolean;
},
    isFunction = function isFunction(e) {
  return getConstructor(e) === Function;
},
    isArray = function isArray(e) {
  return Array.isArray(e);
},
    isWeakMap = function isWeakMap(e) {
  return instanceOf(e, WeakMap);
},
    isNodeList = function isNodeList(e) {
  return instanceOf(e, NodeList);
},
    isTextNode = function isTextNode(e) {
  return getConstructor(e) === Text;
},
    isEvent = function isEvent(e) {
  return instanceOf(e, Event);
},
    isKeyboardEvent = function isKeyboardEvent(e) {
  return instanceOf(e, KeyboardEvent);
},
    isCue = function isCue(e) {
  return instanceOf(e, window.TextTrackCue) || instanceOf(e, window.VTTCue);
},
    isTrack = function isTrack(e) {
  return instanceOf(e, TextTrack) || !isNullOrUndefined(e) && isString(e.kind);
},
    isPromise = function isPromise(e) {
  return instanceOf(e, Promise) && isFunction(e.then);
},
    isElement = function isElement(e) {
  return null !== e && "object" == _typeof(e) && 1 === e.nodeType && "object" == _typeof(e.style) && "object" == _typeof(e.ownerDocument);
},
    isEmpty = function isEmpty(e) {
  return isNullOrUndefined(e) || (isString(e) || isArray(e) || isNodeList(e)) && !e.length || isObject(e) && !Object.keys(e).length;
},
    isUrl = function isUrl(e) {
  if (instanceOf(e, window.URL)) return !0;
  if (!isString(e)) return !1;
  var t = e;
  e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));

  try {
    return !isEmpty(new URL(t).hostname);
  } catch (e) {
    return !1;
  }
};

var is = {
  nullOrUndefined: isNullOrUndefined,
  object: isObject,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  function: isFunction,
  array: isArray,
  weakMap: isWeakMap,
  nodeList: isNodeList,
  element: isElement,
  textNode: isTextNode,
  event: isEvent,
  keyboardEvent: isKeyboardEvent,
  cue: isCue,
  track: isTrack,
  promise: isPromise,
  url: isUrl,
  empty: isEmpty
};

var transitionEndEvent = function () {
  var e = document.createElement("span"),
      t = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  },
      i = Object.keys(t).find(function (t) {
    return void 0 !== e.style[t];
  });
  return !!is.string(i) && t[i];
}();

function repaint(e, t) {
  setTimeout(function () {
    try {
      e.hidden = !0, e.offsetHeight, e.hidden = !1;
    } catch (e) {}
  }, t);
}

var browser = {
  isIE: Boolean(window.document.documentMode),
  isEdge: window.navigator.userAgent.includes("Edge"),
  isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
  isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
  isIos: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
};

function cloneDeep(e) {
  return JSON.parse(JSON.stringify(e));
}

function getDeep(e, t) {
  return t.split(".").reduce(function (e, t) {
    return e && e[t];
  }, e);
}

function extend() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    t[_key - 1] = arguments[_key];
  }

  if (!t.length) return e;
  var i = t.shift();
  return is.object(i) ? (Object.keys(i).forEach(function (t) {
    is.object(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, _defineProperty$2({}, t, {})), extend(e[t], i[t])) : Object.assign(e, _defineProperty$2({}, t, i[t]));
  }), extend.apply(void 0, [e].concat(t))) : e;
}

function wrap(e, t) {
  var i = e.length ? e : [e];
  Array.from(i).reverse().forEach(function (e, i) {
    var s = i > 0 ? t.cloneNode(!0) : t,
        n = e.parentNode,
        r = e.nextSibling;
    s.appendChild(e), r ? n.insertBefore(s, r) : n.appendChild(s);
  });
}

function setAttributes(e, t) {
  is.element(e) && !is.empty(t) && Object.entries(t).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        e = _ref2[1];

    return !is.nullOrUndefined(e);
  }).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        t = _ref4[0],
        i = _ref4[1];

    return e.setAttribute(t, i);
  });
}

function createElement(e, t, i) {
  var s = document.createElement(e);
  return is.object(t) && setAttributes(s, t), is.string(i) && (s.innerText = i), s;
}

function insertAfter(e, t) {
  is.element(e) && is.element(t) && t.parentNode.insertBefore(e, t.nextSibling);
}

function insertElement(e, t, i, s) {
  is.element(t) && t.appendChild(createElement(e, i, s));
}

function removeElement(e) {
  is.nodeList(e) || is.array(e) ? Array.from(e).forEach(removeElement) : is.element(e) && is.element(e.parentNode) && e.parentNode.removeChild(e);
}

function emptyElement(e) {
  if (!is.element(e)) return;
  var t = e.childNodes.length;

  for (; t > 0;) {
    e.removeChild(e.lastChild), t -= 1;
  }
}

function replaceElement(e, t) {
  return is.element(t) && is.element(t.parentNode) && is.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
}

function getAttributesFromSelector(e, t) {
  if (!is.string(e) || is.empty(e)) return {};
  var i = {},
      s = extend({}, t);
  return e.split(",").forEach(function (e) {
    var t = e.trim(),
        n = t.replace(".", ""),
        r = t.replace(/[[\]]/g, "").split("="),
        _r = _slicedToArray(r, 1),
        a = _r[0],
        o = r.length > 1 ? r[1].replace(/["']/g, "") : "";

    switch (t.charAt(0)) {
      case ".":
        is.string(s.class) ? i.class = "".concat(s.class, " ").concat(n) : i.class = n;
        break;

      case "#":
        i.id = t.replace("#", "");
        break;

      case "[":
        i[a] = o;
    }
  }), extend(s, i);
}

function toggleHidden(e, t) {
  if (!is.element(e)) return;
  var i = t;
  is.boolean(i) || (i = !e.hidden), e.hidden = i;
}

function toggleClass(e, t, i) {
  if (is.nodeList(e)) return Array.from(e).map(function (e) {
    return toggleClass(e, t, i);
  });

  if (is.element(e)) {
    var s = "toggle";
    return void 0 !== i && (s = i ? "add" : "remove"), e.classList[s](t), e.classList.contains(t);
  }

  return !1;
}

function hasClass(e, t) {
  return is.element(e) && e.classList.contains(t);
}

function matches(e, t) {
  var _Element = Element,
      i = _Element.prototype;
  return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }).call(e, t);
}

function closest$1(e, t) {
  var _Element2 = Element,
      i = _Element2.prototype;
  return (i.closest || function () {
    var e = this;

    do {
      if (matches.matches(e, t)) return e;
      e = e.parentElement || e.parentNode;
    } while (null !== e && 1 === e.nodeType);

    return null;
  }).call(e, t);
}

function getElements(e) {
  return this.elements.container.querySelectorAll(e);
}

function getElement(e) {
  return this.elements.container.querySelector(e);
}

function setFocus() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  is.element(e) && (e.focus({
    preventScroll: !0
  }), t && toggleClass(e, this.config.classNames.tabFocus));
}

var defaultCodecs = {
  "audio/ogg": "vorbis",
  "audio/wav": "1",
  "video/webm": "vp8, vorbis",
  "video/mp4": "avc1.42E01E, mp4a.40.2",
  "video/ogg": "theora"
},
    support = {
  audio: "canPlayType" in document.createElement("audio"),
  video: "canPlayType" in document.createElement("video"),
  check: function check(e, t, i) {
    var s = browser.isIPhone && i && support.playsinline,
        n = support[e] || "html5" !== t;
    return {
      api: n,
      ui: n && support.rangeInput && ("video" !== e || !browser.isIPhone || s)
    };
  },
  pip: !(browser.isIPhone || !is.function(createElement("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || createElement("video").disablePictureInPicture)),
  airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent),
  playsinline: "playsInline" in document.createElement("video"),
  mime: function mime(e) {
    if (is.empty(e)) return !1;

    var _e$split = e.split("/"),
        _e$split2 = _slicedToArray(_e$split, 1),
        t = _e$split2[0];

    var i = e;
    if (!this.isHTML5 || t !== this.type) return !1;
    Object.keys(defaultCodecs).includes(i) && (i += "; codecs=\"".concat(defaultCodecs[e], "\""));

    try {
      return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
    } catch (e) {
      return !1;
    }
  },
  textTracks: "textTracks" in document.createElement("video"),
  rangeInput: function () {
    var e = document.createElement("input");
    return e.type = "range", "range" === e.type;
  }(),
  touch: "ontouchstart" in document.documentElement,
  transitions: !1 !== transitionEndEvent,
  reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
},
    supportsPassiveListeners = function () {
  var e = !1;

  try {
    var t = Object.defineProperty({}, "passive", {
      get: function get() {
        return e = !0, null;
      }
    });
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch (e) {}

  return e;
}();

function toggleListener(e, t, i) {
  var _this = this;

  var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
  var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
  var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
  if (!e || !("addEventListener" in e) || is.empty(t) || !is.function(i)) return;
  var a = t.split(" ");
  var o = r;
  supportsPassiveListeners && (o = {
    passive: n,
    capture: r
  }), a.forEach(function (t) {
    _this && _this.eventListeners && s && _this.eventListeners.push({
      element: e,
      type: t,
      callback: i,
      options: o
    }), e[s ? "addEventListener" : "removeEventListener"](t, i, o);
  });
}

function on(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = arguments.length > 2 ? arguments[2] : undefined;
  var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
  var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
  toggleListener.call(this, e, t, i, !0, s, n);
}

function off(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = arguments.length > 2 ? arguments[2] : undefined;
  var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
  var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
  toggleListener.call(this, e, t, i, !1, s, n);
}

function once(e) {
  var _this2 = this;

  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = arguments.length > 2 ? arguments[2] : undefined;
  var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
  var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;

  var r = function r() {
    for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      a[_key2] = arguments[_key2];
    }

    off(e, t, r, s, n), i.apply(_this2, a);
  };

  toggleListener.call(this, e, t, r, !0, s, n);
}

function triggerEvent(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!is.element(e) || is.empty(t)) return;
  var n = new CustomEvent(t, {
    bubbles: i,
    detail: _objectSpread2$1(_objectSpread2$1({}, s), {}, {
      plyr: this
    })
  });
  e.dispatchEvent(n);
}

function unbindListeners() {
  this && this.eventListeners && (this.eventListeners.forEach(function (e) {
    var t = e.element,
        i = e.type,
        s = e.callback,
        n = e.options;
    t.removeEventListener(i, s, n);
  }), this.eventListeners = []);
}

function ready() {
  var _this3 = this;

  return new Promise(function (e) {
    return _this3.ready ? setTimeout(e, 0) : on.call(_this3, _this3.elements.container, "ready", e);
  }).then(function () {});
}

function silencePromise(e) {
  is.promise(e) && e.then(null, function () {});
}

function dedupe(e) {
  return is.array(e) ? e.filter(function (t, i) {
    return e.indexOf(t) === i;
  }) : e;
}

function closest(e, t) {
  return is.array(e) && e.length ? e.reduce(function (e, i) {
    return Math.abs(i - t) < Math.abs(e - t) ? i : e;
  }) : null;
}

function supportsCSS(e) {
  return !(!window || !window.CSS) && window.CSS.supports(e);
}

var standardRatios = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce(function (e, _ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      t = _ref6[0],
      i = _ref6[1];

  return _objectSpread2$1(_objectSpread2$1({}, e), {}, _defineProperty$2({}, t / i, [t, i]));
}, {});

function validateAspectRatio(e) {
  if (!(is.array(e) || is.string(e) && e.includes(":"))) return !1;
  return (is.array(e) ? e : e.split(":")).map(Number).every(is.number);
}

function reduceAspectRatio(e) {
  if (!is.array(e) || !e.every(is.number)) return null;

  var _e = _slicedToArray(e, 2),
      t = _e[0],
      i = _e[1],
      s = function s(e, t) {
    return 0 === t ? e : s(t, e % t);
  },
      n = s(t, i);

  return [t / n, i / n];
}

function getAspectRatio(e) {
  var _this$embed;

  var t = function t(e) {
    return validateAspectRatio(e) ? e.split(":").map(Number) : null;
  };

  var i = t(e);

  if (null === i && (i = t(this.config.ratio)), null === i && !is.empty(this.embed) && is.array(this.embed.ratio) && (_this$embed = this.embed, i = _this$embed.ratio, _this$embed), null === i && this.isHTML5) {
    var _this$media = this.media,
        _e2 = _this$media.videoWidth,
        _t = _this$media.videoHeight;
    i = [_e2, _t];
  }

  return reduceAspectRatio(i);
}

function setAspectRatio(e) {
  if (!this.isVideo) return {};
  var t = this.elements.wrapper,
      i = getAspectRatio.call(this, e);
  if (!is.array(i)) return {};

  var _reduceAspectRatio = reduceAspectRatio(i),
      _reduceAspectRatio2 = _slicedToArray(_reduceAspectRatio, 2),
      s = _reduceAspectRatio2[0],
      n = _reduceAspectRatio2[1],
      r = 100 / s * n;

  if (supportsCSS("aspect-ratio: ".concat(s, "/").concat(n)) ? t.style.aspectRatio = "".concat(s, "/").concat(n) : t.style.paddingBottom = "".concat(r, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
    var _e3 = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
        _i = (_e3 - r) / (_e3 / 50);

    this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = "translateY(-".concat(_i, "%)");
  } else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);

  return {
    padding: r,
    ratio: i
  };
}

function roundAspectRatio(e, t) {
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .05;
  var s = e / t,
      n = closest(Object.keys(standardRatios), s);
  return Math.abs(n - s) <= i ? standardRatios[n] : [e, t];
}

function getViewportSize() {
  return [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)];
}

var html5 = {
  getSources: function getSources() {
    var _this4 = this;

    if (!this.isHTML5) return [];
    return Array.from(this.media.querySelectorAll("source")).filter(function (e) {
      var t = e.getAttribute("type");
      return !!is.empty(t) || support.mime.call(_this4, t);
    });
  },
  getQualityOptions: function getQualityOptions() {
    return this.config.quality.forced ? this.config.quality.options : html5.getSources.call(this).map(function (e) {
      return Number(e.getAttribute("size"));
    }).filter(Boolean);
  },
  setup: function setup() {
    if (!this.isHTML5) return;
    var e = this;
    e.options.speed = e.config.speed.options, is.empty(this.config.ratio) || setAspectRatio.call(e), Object.defineProperty(e.media, "quality", {
      get: function get() {
        var t = html5.getSources.call(e).find(function (t) {
          return t.getAttribute("src") === e.source;
        });
        return t && Number(t.getAttribute("size"));
      },
      set: function set(t) {
        if (e.quality !== t) {
          if (e.config.quality.forced && is.function(e.config.quality.onChange)) e.config.quality.onChange(t);else {
            var i = html5.getSources.call(e).find(function (e) {
              return Number(e.getAttribute("size")) === t;
            });
            if (!i) return;
            var _e$media = e.media,
                s = _e$media.currentTime,
                n = _e$media.paused,
                r = _e$media.preload,
                a = _e$media.readyState,
                o = _e$media.playbackRate;
            e.media.src = i.getAttribute("src"), ("none" !== r || a) && (e.once("loadedmetadata", function () {
              e.speed = o, e.currentTime = s, n || silencePromise(e.play());
            }), e.media.load());
          }
          triggerEvent.call(e, e.media, "qualitychange", !1, {
            quality: t
          });
        }
      }
    });
  },
  cancelRequests: function cancelRequests() {
    this.isHTML5 && (removeElement(html5.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
  }
};

function generateId(e) {
  return "".concat(e, "-").concat(Math.floor(1e4 * Math.random()));
}

function format(e) {
  for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    t[_key3 - 1] = arguments[_key3];
  }

  return is.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function (e, i) {
    return t[i].toString();
  });
}

function getPercentage(e, t) {
  return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2);
}

var replaceAll = function replaceAll() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString());
},
    toTitleCase = function toTitleCase() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return e.toString().replace(/\w\S*/g, function (e) {
    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
  });
};

function toPascalCase() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = e.toString();
  return t = replaceAll(t, "-", " "), t = replaceAll(t, "_", " "), t = toTitleCase(t), replaceAll(t, " ", "");
}

function toCamelCase() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = e.toString();
  return t = toPascalCase(t), t.charAt(0).toLowerCase() + t.slice(1);
}

function stripHTML(e) {
  var t = document.createDocumentFragment(),
      i = document.createElement("div");
  return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
}

function getHTML(e) {
  var t = document.createElement("div");
  return t.appendChild(e), t.innerHTML;
}

var resources = {
  pip: "PIP",
  airplay: "AirPlay",
  html5: "HTML5",
  vimeo: "Vimeo",
  youtube: "YouTube"
},
    i18n = {
  get: function get() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (is.empty(e) || is.empty(t)) return "";
    var i = getDeep(t.i18n, e);
    if (is.empty(i)) return Object.keys(resources).includes(e) ? resources[e] : "";
    var s = {
      "{seektime}": t.seekTime,
      "{title}": t.title
    };
    return Object.entries(s).forEach(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          e = _ref8[0],
          t = _ref8[1];

      i = replaceAll(i, e, t);
    }), i;
  }
};

var Storage = /*#__PURE__*/function () {
  function Storage(e) {
    var _this5 = this;

    _classCallCheck$1(this, Storage);

    _defineProperty$1(this, "get", function (e) {
      if (!Storage.supported || !_this5.enabled) return null;
      var t = window.localStorage.getItem(_this5.key);
      if (is.empty(t)) return null;
      var i = JSON.parse(t);
      return is.string(e) && e.length ? i[e] : i;
    }), _defineProperty$1(this, "set", function (e) {
      if (!Storage.supported || !_this5.enabled) return;
      if (!is.object(e)) return;

      var t = _this5.get();

      is.empty(t) && (t = {}), extend(t, e), window.localStorage.setItem(_this5.key, JSON.stringify(t));
    }), this.enabled = e.config.storage.enabled, this.key = e.config.storage.key;
  }

  _createClass$1(Storage, null, [{
    key: "supported",
    get: function get() {
      try {
        if (!("localStorage" in window)) return !1;
        var e = "___test";
        return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0;
      } catch (e) {
        return !1;
      }
    }
  }]);

  return Storage;
}();

function fetch(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "text";
  return new Promise(function (i, s) {
    try {
      var _s = new XMLHttpRequest();

      if (!("withCredentials" in _s)) return;
      _s.addEventListener("load", function () {
        if ("text" === t) try {
          i(JSON.parse(_s.responseText));
        } catch (e) {
          i(_s.responseText);
        } else i(_s.response);
      }), _s.addEventListener("error", function () {
        throw new Error(_s.status);
      }), _s.open("GET", e, !0), _s.responseType = t, _s.send();
    } catch (e) {
      s(e);
    }
  });
}

function _loadSprite(e, t) {
  if (!is.string(e)) return;
  var i = is.string(t);
  var s = !1;

  var n = function n() {
    return null !== document.getElementById(t);
  },
      r = function r(e, t) {
    e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e);
  };

  if (!i || !n()) {
    var _n = Storage.supported,
        a = document.createElement("div");

    if (a.setAttribute("hidden", ""), i && a.setAttribute("id", t), _n) {
      var _e4 = window.localStorage.getItem("cache-".concat(t));

      if (s = null !== _e4, s) {
        var _t2 = JSON.parse(_e4);

        r(a, _t2.content);
      }
    }

    fetch(e).then(function (e) {
      is.empty(e) || (_n && window.localStorage.setItem("cache-".concat(t), JSON.stringify({
        content: e
      })), r(a, e));
    }).catch(function () {});
  }
}

var getHours = function getHours(e) {
  return Math.trunc(e / 60 / 60 % 60, 10);
},
    getSeconds = function getSeconds(e) {
  return Math.trunc(e % 60, 10);
};

function _formatTime() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  if (!is.number(e)) return _formatTime(void 0, t, i);

  var s = function s(e) {
    return "0".concat(e).slice(-2);
  };

  var n = getHours(e);
  var r = (a = e, Math.trunc(a / 60 % 60, 10));
  var a;
  var o = getSeconds(e);
  return n = t || n > 0 ? "".concat(n, ":") : "", "".concat(i && e > 0 ? "-" : "").concat(n).concat(s(r), ":").concat(s(o));
}

var controls = {
  getIconUrl: function getIconUrl() {
    var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || browser.isIE && !window.svg4everybody;
    return {
      url: this.config.iconUrl,
      cors: e
    };
  },
  findElements: function findElements() {
    try {
      return this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
        play: getElements.call(this, this.config.selectors.buttons.play),
        pause: getElement.call(this, this.config.selectors.buttons.pause),
        restart: getElement.call(this, this.config.selectors.buttons.restart),
        rewind: getElement.call(this, this.config.selectors.buttons.rewind),
        fastForward: getElement.call(this, this.config.selectors.buttons.fastForward),
        mute: getElement.call(this, this.config.selectors.buttons.mute),
        pip: getElement.call(this, this.config.selectors.buttons.pip),
        airplay: getElement.call(this, this.config.selectors.buttons.airplay),
        settings: getElement.call(this, this.config.selectors.buttons.settings),
        captions: getElement.call(this, this.config.selectors.buttons.captions),
        fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen)
      }, this.elements.progress = getElement.call(this, this.config.selectors.progress), this.elements.inputs = {
        seek: getElement.call(this, this.config.selectors.inputs.seek),
        volume: getElement.call(this, this.config.selectors.inputs.volume)
      }, this.elements.display = {
        buffer: getElement.call(this, this.config.selectors.display.buffer),
        currentTime: getElement.call(this, this.config.selectors.display.currentTime),
        duration: getElement.call(this, this.config.selectors.display.duration)
      }, is.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0;
    } catch (e) {
      return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
    }
  },
  createIcon: function createIcon(e, t) {
    var i = "http://www.w3.org/2000/svg",
        s = controls.getIconUrl.call(this),
        n = "".concat(s.cors ? "" : s.url, "#").concat(this.config.iconPrefix),
        r = document.createElementNS(i, "svg");
    setAttributes(r, extend(t, {
      "aria-hidden": "true",
      focusable: "false"
    }));
    var a = document.createElementNS(i, "use"),
        o = "".concat(n, "-").concat(e);
    return "href" in a && a.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), r.appendChild(a), r;
  },
  createLabel: function createLabel(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var i = i18n.get(e, this.config);
    return createElement("span", _objectSpread2$1(_objectSpread2$1({}, t), {}, {
      class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
    }), i);
  },
  createBadge: function createBadge(e) {
    if (is.empty(e)) return null;
    var t = createElement("span", {
      class: this.config.classNames.menu.value
    });
    return t.appendChild(createElement("span", {
      class: this.config.classNames.menu.badge
    }, e)), t;
  },
  createButton: function createButton(e, t) {
    var _this6 = this;

    var i = extend({}, t);
    var s = toCamelCase(e);
    var n = {
      element: "button",
      toggle: !1,
      label: null,
      icon: null,
      labelPressed: null,
      iconPressed: null
    };

    switch (["element", "icon", "label"].forEach(function (e) {
      Object.keys(i).includes(e) && (n[e] = i[e], delete i[e]);
    }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(function (e) {
      return e === _this6.config.classNames.control;
    }) || extend(i, {
      class: "".concat(i.class, " ").concat(this.config.classNames.control)
    }) : i.class = this.config.classNames.control, e) {
      case "play":
        n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
        break;

      case "mute":
        n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
        break;

      case "captions":
        n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
        break;

      case "fullscreen":
        n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
        break;

      case "play-large":
        i.class += " ".concat(this.config.classNames.control, "--overlaid"), s = "play", n.label = "play", n.icon = "play";
        break;

      default:
        is.empty(n.label) && (n.label = s), is.empty(n.icon) && (n.icon = e);
    }

    var r = createElement(n.element);
    return n.toggle ? (r.appendChild(controls.createIcon.call(this, n.iconPressed, {
      class: "icon--pressed"
    })), r.appendChild(controls.createIcon.call(this, n.icon, {
      class: "icon--not-pressed"
    })), r.appendChild(controls.createLabel.call(this, n.labelPressed, {
      class: "label--pressed"
    })), r.appendChild(controls.createLabel.call(this, n.label, {
      class: "label--not-pressed"
    }))) : (r.appendChild(controls.createIcon.call(this, n.icon)), r.appendChild(controls.createLabel.call(this, n.label))), extend(i, getAttributesFromSelector(this.config.selectors.buttons[s], i)), setAttributes(r, i), "play" === s ? (is.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(r)) : this.elements.buttons[s] = r, r;
  },
  createRange: function createRange(e, t) {
    var i = createElement("input", extend(getAttributesFromSelector(this.config.selectors.inputs[e]), {
      type: "range",
      min: 0,
      max: 100,
      step: .01,
      value: 0,
      autocomplete: "off",
      role: "slider",
      "aria-label": i18n.get(e, this.config),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": 0
    }, t));
    return this.elements.inputs[e] = i, controls.updateRangeFill.call(this, i), RangeTouch.setup(i), i;
  },
  createProgress: function createProgress(e, t) {
    var i = createElement("progress", extend(getAttributesFromSelector(this.config.selectors.display[e]), {
      min: 0,
      max: 100,
      value: 0,
      role: "progressbar",
      "aria-hidden": !0
    }, t));

    if ("volume" !== e) {
      i.appendChild(createElement("span", null, "0"));
      var _t3 = {
        played: "played",
        buffer: "buffered"
      }[e],
          s = _t3 ? i18n.get(_t3, this.config) : "";
      i.innerText = "% ".concat(s.toLowerCase());
    }

    return this.elements.display[e] = i, i;
  },
  createTime: function createTime(e, t) {
    var i = getAttributesFromSelector(this.config.selectors.display[e], t),
        s = createElement("div", extend(i, {
      class: "".concat(i.class ? i.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
      "aria-label": i18n.get(e, this.config)
    }), "00:00");
    return this.elements.display[e] = s, s;
  },
  bindMenuItemShortcuts: function bindMenuItemShortcuts(e, t) {
    var _this7 = this;

    on.call(this, e, "keydown keyup", function (i) {
      if (![32, 38, 39, 40].includes(i.which)) return;
      if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
      var s = matches(e, '[role="menuitemradio"]');
      if (!s && [32, 39].includes(i.which)) controls.showMenuPanel.call(_this7, t, !0);else {
        var _t4;

        32 !== i.which && (40 === i.which || s && 39 === i.which ? (_t4 = e.nextElementSibling, is.element(_t4) || (_t4 = e.parentNode.firstElementChild)) : (_t4 = e.previousElementSibling, is.element(_t4) || (_t4 = e.parentNode.lastElementChild)), setFocus.call(_this7, _t4, !0));
      }
    }, !1), on.call(this, e, "keyup", function (e) {
      13 === e.which && controls.focusFirstMenuItem.call(_this7, null, !0);
    });
  },
  createMenuItem: function createMenuItem(_ref9) {
    var _this8 = this;

    var e = _ref9.value,
        t = _ref9.list,
        i = _ref9.type,
        s = _ref9.title,
        _ref9$badge = _ref9.badge,
        n = _ref9$badge === void 0 ? null : _ref9$badge,
        _ref9$checked = _ref9.checked,
        r = _ref9$checked === void 0 ? !1 : _ref9$checked;
    var a = getAttributesFromSelector(this.config.selectors.inputs[i]),
        o = createElement("button", extend(a, {
      type: "button",
      role: "menuitemradio",
      class: "".concat(this.config.classNames.control, " ").concat(a.class ? a.class : "").trim(),
      "aria-checked": r,
      value: e
    })),
        l = createElement("span");
    l.innerHTML = s, is.element(n) && l.appendChild(n), o.appendChild(l), Object.defineProperty(o, "checked", {
      enumerable: !0,
      get: function get() {
        return "true" === o.getAttribute("aria-checked");
      },
      set: function set(e) {
        e && Array.from(o.parentNode.children).filter(function (e) {
          return matches(e, '[role="menuitemradio"]');
        }).forEach(function (e) {
          return e.setAttribute("aria-checked", "false");
        }), o.setAttribute("aria-checked", e ? "true" : "false");
      }
    }), this.listeners.bind(o, "click keyup", function (t) {
      if (!is.keyboardEvent(t) || 32 === t.which) {
        switch (t.preventDefault(), t.stopPropagation(), o.checked = !0, i) {
          case "language":
            _this8.currentTrack = Number(e);
            break;

          case "quality":
            _this8.quality = e;
            break;

          case "speed":
            _this8.speed = parseFloat(e);
        }

        controls.showMenuPanel.call(_this8, "home", is.keyboardEvent(t));
      }
    }, i, !1), controls.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o);
  },
  formatTime: function formatTime() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    if (!is.number(e)) return e;
    return _formatTime(e, getHours(this.duration) > 0, t);
  },
  updateTimeDisplay: function updateTimeDisplay() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    is.element(e) && is.number(t) && (e.innerText = controls.formatTime(t, i));
  },
  updateVolume: function updateVolume() {
    this.supported.ui && (is.element(this.elements.inputs.volume) && controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), is.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
  },
  setRange: function setRange(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    is.element(e) && (e.value = t, controls.updateRangeFill.call(this, e));
  },
  updateProgress: function updateProgress(e) {
    var _this9 = this;

    if (!this.supported.ui || !is.event(e)) return;
    var t = 0;

    var i = function i(e, t) {
      var i = is.number(t) ? t : 0,
          s = is.element(e) ? e : _this9.elements.display.buffer;

      if (is.element(s)) {
        s.value = i;
        var _e5 = s.getElementsByTagName("span")[0];
        is.element(_e5) && (_e5.childNodes[0].nodeValue = i);
      }
    };

    if (e) switch (e.type) {
      case "timeupdate":
      case "seeking":
      case "seeked":
        t = getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && controls.setRange.call(this, this.elements.inputs.seek, t);
        break;

      case "playing":
      case "progress":
        i(this.elements.display.buffer, 100 * this.buffered);
    }
  },
  updateRangeFill: function updateRangeFill(e) {
    var t = is.event(e) ? e.target : e;

    if (is.element(t) && "range" === t.getAttribute("type")) {
      if (matches(t, this.config.selectors.inputs.seek)) {
        t.setAttribute("aria-valuenow", this.currentTime);

        var _e6 = controls.formatTime(this.currentTime),
            i = controls.formatTime(this.duration),
            s = i18n.get("seekLabel", this.config);

        t.setAttribute("aria-valuetext", s.replace("{currentTime}", _e6).replace("{duration}", i));
      } else if (matches(t, this.config.selectors.inputs.volume)) {
        var _e7 = 100 * t.value;

        t.setAttribute("aria-valuenow", _e7), t.setAttribute("aria-valuetext", "".concat(_e7.toFixed(1), "%"));
      } else t.setAttribute("aria-valuenow", t.value);

      browser.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%");
    }
  },
  updateSeekTooltip: function updateSeekTooltip(e) {
    var _this10 = this;

    if (!this.config.tooltips.seek || !is.element(this.elements.inputs.seek) || !is.element(this.elements.display.seekTooltip) || 0 === this.duration) return;

    var t = "".concat(this.config.classNames.tooltip, "--visible"),
        i = function i(e) {
      return toggleClass(_this10.elements.display.seekTooltip, t, e);
    };

    if (this.touch) return void i(!1);
    var s = 0;
    var n = this.elements.progress.getBoundingClientRect();
    if (is.event(e)) s = 100 / n.width * (e.pageX - n.left);else {
      if (!hasClass(this.elements.display.seekTooltip, t)) return;
      s = parseFloat(this.elements.display.seekTooltip.style.left, 10);
    }
    s < 0 ? s = 0 : s > 100 && (s = 100), controls.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = "".concat(s, "%"), is.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type);
  },
  timeUpdate: function timeUpdate(e) {
    var t = !is.element(this.elements.display.duration) && this.config.invertTime;
    controls.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || controls.updateProgress.call(this, e);
  },
  durationUpdate: function durationUpdate() {
    if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
    if (this.duration >= Math.pow(2, 32)) return toggleHidden(this.elements.display.currentTime, !0), void toggleHidden(this.elements.progress, !0);
    is.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
    var e = is.element(this.elements.display.duration);
    !e && this.config.displayDuration && this.paused && controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), controls.updateSeekTooltip.call(this);
  },
  toggleMenuButton: function toggleMenuButton(e, t) {
    toggleHidden(this.elements.settings.buttons[e], !t);
  },
  updateSetting: function updateSetting(e, t, i) {
    var s = this.elements.settings.panels[e];
    var n = null,
        r = t;
    if ("captions" === e) n = this.currentTrack;else {
      if (n = is.empty(i) ? this[e] : i, is.empty(n) && (n = this.config[e].default), !is.empty(this.options[e]) && !this.options[e].includes(n)) return void this.debug.warn("Unsupported value of '".concat(n, "' for ").concat(e));
      if (!this.config[e].options.includes(n)) return void this.debug.warn("Disabled value of '".concat(n, "' for ").concat(e));
    }
    if (is.element(r) || (r = s && s.querySelector('[role="menu"]')), !is.element(r)) return;
    this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = controls.getLabel.call(this, e, n);
    var a = r && r.querySelector("[value=\"".concat(n, "\"]"));
    is.element(a) && (a.checked = !0);
  },
  getLabel: function getLabel(e, t) {
    switch (e) {
      case "speed":
        return 1 === t ? i18n.get("normal", this.config) : "".concat(t, "&times;");

      case "quality":
        if (is.number(t)) {
          var _e8 = i18n.get("qualityLabel.".concat(t), this.config);

          return _e8.length ? _e8 : "".concat(t, "p");
        }

        return toTitleCase(t);

      case "captions":
        return captions.getLabel.call(this);

      default:
        return null;
    }
  },
  setQualityMenu: function setQualityMenu(e) {
    var _this11 = this;

    if (!is.element(this.elements.settings.panels.quality)) return;
    var t = "quality",
        i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
    is.array(e) && (this.options.quality = dedupe(e).filter(function (e) {
      return _this11.config.quality.options.includes(e);
    }));
    var s = !is.empty(this.options.quality) && this.options.quality.length > 1;
    if (controls.toggleMenuButton.call(this, t, s), emptyElement(i), controls.checkMenu.call(this), !s) return;

    var n = function n(e) {
      var t = i18n.get("qualityBadge.".concat(e), _this11.config);
      return t.length ? controls.createBadge.call(_this11, t) : null;
    };

    this.options.quality.sort(function (e, t) {
      var i = _this11.config.quality.options;
      return i.indexOf(e) > i.indexOf(t) ? 1 : -1;
    }).forEach(function (e) {
      controls.createMenuItem.call(_this11, {
        value: e,
        list: i,
        type: t,
        title: controls.getLabel.call(_this11, "quality", e),
        badge: n(e)
      });
    }), controls.updateSetting.call(this, t, i);
  },
  setCaptionsMenu: function setCaptionsMenu() {
    var _this12 = this;

    if (!is.element(this.elements.settings.panels.captions)) return;
    var e = "captions",
        t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
        i = captions.getTracks.call(this),
        s = Boolean(i.length);
    if (controls.toggleMenuButton.call(this, e, s), emptyElement(t), controls.checkMenu.call(this), !s) return;
    var n = i.map(function (e, i) {
      return {
        value: i,
        checked: _this12.captions.toggled && _this12.currentTrack === i,
        title: captions.getLabel.call(_this12, e),
        badge: e.language && controls.createBadge.call(_this12, e.language.toUpperCase()),
        list: t,
        type: "language"
      };
    });
    n.unshift({
      value: -1,
      checked: !this.captions.toggled,
      title: i18n.get("disabled", this.config),
      list: t,
      type: "language"
    }), n.forEach(controls.createMenuItem.bind(this)), controls.updateSetting.call(this, e, t);
  },
  setSpeedMenu: function setSpeedMenu() {
    var _this13 = this;

    if (!is.element(this.elements.settings.panels.speed)) return;
    var e = "speed",
        t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
    this.options.speed = this.options.speed.filter(function (e) {
      return e >= _this13.minimumSpeed && e <= _this13.maximumSpeed;
    });
    var i = !is.empty(this.options.speed) && this.options.speed.length > 1;
    controls.toggleMenuButton.call(this, e, i), emptyElement(t), controls.checkMenu.call(this), i && (this.options.speed.forEach(function (i) {
      controls.createMenuItem.call(_this13, {
        value: i,
        list: t,
        type: e,
        title: controls.getLabel.call(_this13, "speed", i)
      });
    }), controls.updateSetting.call(this, e, t));
  },
  checkMenu: function checkMenu() {
    var e = this.elements.settings.buttons,
        t = !is.empty(e) && Object.values(e).some(function (e) {
      return !e.hidden;
    });
    toggleHidden(this.elements.settings.menu, !t);
  },
  focusFirstMenuItem: function focusFirstMenuItem(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    if (this.elements.settings.popup.hidden) return;
    var i = e;
    is.element(i) || (i = Object.values(this.elements.settings.panels).find(function (e) {
      return !e.hidden;
    }));
    var s = i.querySelector('[role^="menuitem"]');
    setFocus.call(this, s, t);
  },
  toggleMenu: function toggleMenu(e) {
    var t = this.elements.settings.popup,
        i = this.elements.buttons.settings;
    if (!is.element(t) || !is.element(i)) return;
    var s = t.hidden;
    var n = s;
    if (is.boolean(e)) n = e;else if (is.keyboardEvent(e) && 27 === e.which) n = !1;else if (is.event(e)) {
      var _s2 = is.function(e.composedPath) ? e.composedPath()[0] : e.target,
          r = t.contains(_s2);

      if (r || !r && e.target !== i && n) return;
    }
    i.setAttribute("aria-expanded", n), toggleHidden(t, !n), toggleClass(this.elements.container, this.config.classNames.menu.open, n), n && is.keyboardEvent(e) ? controls.focusFirstMenuItem.call(this, null, !0) : n || s || setFocus.call(this, i, is.keyboardEvent(e));
  },
  getMenuSize: function getMenuSize(e) {
    var t = e.cloneNode(!0);
    t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
    var i = t.scrollWidth,
        s = t.scrollHeight;
    return removeElement(t), {
      width: i,
      height: s
    };
  },
  showMenuPanel: function showMenuPanel() {
    var _this14 = this;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    var i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(e));
    if (!is.element(i)) return;
    var s = i.parentNode,
        n = Array.from(s.children).find(function (e) {
      return !e.hidden;
    });

    if (support.transitions && !support.reducedMotion) {
      s.style.width = "".concat(n.scrollWidth, "px"), s.style.height = "".concat(n.scrollHeight, "px");

      var _e9 = controls.getMenuSize.call(this, i),
          _t5 = function _t5(e) {
        e.target === s && ["width", "height"].includes(e.propertyName) && (s.style.width = "", s.style.height = "", off.call(_this14, s, transitionEndEvent, _t5));
      };

      on.call(this, s, transitionEndEvent, _t5), s.style.width = "".concat(_e9.width, "px"), s.style.height = "".concat(_e9.height, "px");
    }

    toggleHidden(n, !0), toggleHidden(i, !1), controls.focusFirstMenuItem.call(this, i, t);
  },
  setDownloadUrl: function setDownloadUrl() {
    var e = this.elements.buttons.download;
    is.element(e) && e.setAttribute("href", this.download);
  },
  create: function create(e) {
    var _this15 = this;

    var t = controls.bindMenuItemShortcuts,
        i = controls.createButton,
        s = controls.createProgress,
        n = controls.createRange,
        r = controls.createTime,
        a = controls.setQualityMenu,
        o = controls.setSpeedMenu,
        l = controls.showMenuPanel;
    this.elements.controls = null, is.array(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
    var c = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
    this.elements.controls = c;
    var u = {
      class: "plyr__controls__item"
    };
    return dedupe(is.array(this.config.controls) ? this.config.controls : []).forEach(function (a) {
      if ("restart" === a && c.appendChild(i.call(_this15, "restart", u)), "rewind" === a && c.appendChild(i.call(_this15, "rewind", u)), "play" === a && c.appendChild(i.call(_this15, "play", u)), "fast-forward" === a && c.appendChild(i.call(_this15, "fast-forward", u)), "progress" === a) {
        var _t6 = createElement("div", {
          class: "".concat(u.class, " plyr__progress__container")
        }),
            _i2 = createElement("div", getAttributesFromSelector(_this15.config.selectors.progress));

        if (_i2.appendChild(n.call(_this15, "seek", {
          id: "plyr-seek-".concat(e.id)
        })), _i2.appendChild(s.call(_this15, "buffer")), _this15.config.tooltips.seek) {
          var _e10 = createElement("span", {
            class: _this15.config.classNames.tooltip
          }, "00:00");

          _i2.appendChild(_e10), _this15.elements.display.seekTooltip = _e10;
        }

        _this15.elements.progress = _i2, _t6.appendChild(_this15.elements.progress), c.appendChild(_t6);
      }

      if ("current-time" === a && c.appendChild(r.call(_this15, "currentTime", u)), "duration" === a && c.appendChild(r.call(_this15, "duration", u)), "mute" === a || "volume" === a) {
        var _t7 = _this15.elements.volume;

        if (is.element(_t7) && c.contains(_t7) || (_t7 = createElement("div", extend({}, u, {
          class: "".concat(u.class, " plyr__volume").trim()
        })), _this15.elements.volume = _t7, c.appendChild(_t7)), "mute" === a && _t7.appendChild(i.call(_this15, "mute")), "volume" === a && !browser.isIos) {
          var _i3 = {
            max: 1,
            step: .05,
            value: _this15.config.volume
          };

          _t7.appendChild(n.call(_this15, "volume", extend(_i3, {
            id: "plyr-volume-".concat(e.id)
          })));
        }
      }

      if ("captions" === a && c.appendChild(i.call(_this15, "captions", u)), "settings" === a && !is.empty(_this15.config.settings)) {
        var _s3 = createElement("div", extend({}, u, {
          class: "".concat(u.class, " plyr__menu").trim(),
          hidden: ""
        }));

        _s3.appendChild(i.call(_this15, "settings", {
          "aria-haspopup": !0,
          "aria-controls": "plyr-settings-".concat(e.id),
          "aria-expanded": !1
        }));

        var _n2 = createElement("div", {
          class: "plyr__menu__container",
          id: "plyr-settings-".concat(e.id),
          hidden: ""
        }),
            _r2 = createElement("div"),
            _a = createElement("div", {
          id: "plyr-settings-".concat(e.id, "-home")
        }),
            _o = createElement("div", {
          role: "menu"
        });

        _a.appendChild(_o), _r2.appendChild(_a), _this15.elements.settings.panels.home = _a, _this15.config.settings.forEach(function (i) {
          var s = createElement("button", extend(getAttributesFromSelector(_this15.config.selectors.buttons.settings), {
            type: "button",
            class: "".concat(_this15.config.classNames.control, " ").concat(_this15.config.classNames.control, "--forward"),
            role: "menuitem",
            "aria-haspopup": !0,
            hidden: ""
          }));
          t.call(_this15, s, i), on.call(_this15, s, "click", function () {
            l.call(_this15, i, !1);
          });
          var n = createElement("span", null, i18n.get(i, _this15.config)),
              a = createElement("span", {
            class: _this15.config.classNames.menu.value
          });
          a.innerHTML = e[i], n.appendChild(a), s.appendChild(n), _o.appendChild(s);
          var c = createElement("div", {
            id: "plyr-settings-".concat(e.id, "-").concat(i),
            hidden: ""
          }),
              u = createElement("button", {
            type: "button",
            class: "".concat(_this15.config.classNames.control, " ").concat(_this15.config.classNames.control, "--back")
          });
          u.appendChild(createElement("span", {
            "aria-hidden": !0
          }, i18n.get(i, _this15.config))), u.appendChild(createElement("span", {
            class: _this15.config.classNames.hidden
          }, i18n.get("menuBack", _this15.config))), on.call(_this15, c, "keydown", function (e) {
            37 === e.which && (e.preventDefault(), e.stopPropagation(), l.call(_this15, "home", !0));
          }, !1), on.call(_this15, u, "click", function () {
            l.call(_this15, "home", !1);
          }), c.appendChild(u), c.appendChild(createElement("div", {
            role: "menu"
          })), _r2.appendChild(c), _this15.elements.settings.buttons[i] = s, _this15.elements.settings.panels[i] = c;
        }), _n2.appendChild(_r2), _s3.appendChild(_n2), c.appendChild(_s3), _this15.elements.settings.popup = _n2, _this15.elements.settings.menu = _s3;
      }

      if ("pip" === a && support.pip && c.appendChild(i.call(_this15, "pip", u)), "airplay" === a && support.airplay && c.appendChild(i.call(_this15, "airplay", u)), "download" === a) {
        var _e11 = extend({}, u, {
          element: "a",
          href: _this15.download,
          target: "_blank"
        });

        _this15.isHTML5 && (_e11.download = "");
        var _t8 = _this15.config.urls.download;
        !is.url(_t8) && _this15.isEmbed && extend(_e11, {
          icon: "logo-".concat(_this15.provider),
          label: _this15.provider
        }), c.appendChild(i.call(_this15, "download", _e11));
      }

      "fullscreen" === a && c.appendChild(i.call(_this15, "fullscreen", u));
    }), this.isHTML5 && a.call(this, html5.getQualityOptions.call(this)), o.call(this), c;
  },
  inject: function inject() {
    var _this16 = this;

    if (this.config.loadSprite) {
      var _e12 = controls.getIconUrl.call(this);

      _e12.cors && _loadSprite(_e12.url, "sprite-plyr");
    }

    this.id = Math.floor(1e4 * Math.random());
    var e = null;
    this.elements.controls = null;
    var t = {
      id: this.id,
      seektime: this.config.seekTime,
      title: this.config.title
    };
    var i = !0;
    is.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), is.element(this.config.controls) || is.string(this.config.controls) ? e = this.config.controls : (e = controls.create.call(this, {
      id: this.id,
      seektime: this.config.seekTime,
      speed: this.speed,
      quality: this.quality,
      captions: captions.getLabel.call(this)
    }), i = !1);
    var s;
    i && is.string(this.config.controls) && (e = function (e) {
      var i = e;
      return Object.entries(t).forEach(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            e = _ref11[0],
            t = _ref11[1];

        i = replaceAll(i, "{".concat(e, "}"), t);
      }), i;
    }(e)), is.string(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), is.element(s) || (s = this.elements.container);

    if (s[is.element(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), is.element(this.elements.controls) || controls.findElements.call(this), !is.empty(this.elements.buttons)) {
      var _e13 = function _e13(e) {
        var t = _this16.config.classNames.controlPressed;
        Object.defineProperty(e, "pressed", {
          enumerable: !0,
          get: function get() {
            return hasClass(e, t);
          },
          set: function set() {
            var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
            toggleClass(e, t, i);
          }
        });
      };

      Object.values(this.elements.buttons).filter(Boolean).forEach(function (t) {
        is.array(t) || is.nodeList(t) ? Array.from(t).filter(Boolean).forEach(_e13) : _e13(t);
      });
    }

    if (browser.isEdge && repaint(s), this.config.tooltips.controls) {
      var _this$config = this.config,
          _e14 = _this$config.classNames,
          _t9 = _this$config.selectors,
          _i4 = "".concat(_t9.controls.wrapper, " ").concat(_t9.labels, " .").concat(_e14.hidden),
          _s4 = getElements.call(this, _i4);

      Array.from(_s4).forEach(function (e) {
        toggleClass(e, _this16.config.classNames.hidden, !1), toggleClass(e, _this16.config.classNames.tooltip, !0);
      });
    }
  }
};

function parseUrl(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  var i = e;

  if (t) {
    var _e15 = document.createElement("a");

    _e15.href = i, i = _e15.href;
  }

  try {
    return new URL(i);
  } catch (e) {
    return null;
  }
}

function buildUrlParams(e) {
  var t = new URLSearchParams();
  return is.object(e) && Object.entries(e).forEach(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 2),
        e = _ref13[0],
        i = _ref13[1];

    t.set(e, i);
  }), t;
}

var captions = {
  setup: function setup() {
    var _e17, _e18, _this$config$captions;

    if (!this.supported.ui) return;
    if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks) return void (is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this));

    if (is.element(this.elements.captions) || (this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions)), insertAfter(this.elements.captions, this.elements.wrapper)), browser.isIE && window.URL) {
      var _e16 = this.media.querySelectorAll("track");

      Array.from(_e16).forEach(function (e) {
        var t = e.getAttribute("src"),
            i = parseUrl(t);
        null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && fetch(t, "blob").then(function (t) {
          e.setAttribute("src", window.URL.createObjectURL(t));
        }).catch(function () {
          removeElement(e);
        });
      });
    }

    var e = dedupe((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function (e) {
      return e.split("-")[0];
    }));
    var t = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
    "auto" === t && (_e17 = e, _e18 = _slicedToArray(_e17, 1), t = _e18[0], _e17);
    var i = this.storage.get("captions");

    if (is.boolean(i) || (_this$config$captions = this.config.captions, i = _this$config$captions.active, _this$config$captions), Object.assign(this.captions, {
      toggled: !1,
      active: i,
      language: t,
      languages: e
    }), this.isHTML5) {
      var _e19 = this.config.captions.update ? "addtrack removetrack" : "removetrack";

      on.call(this, this.media.textTracks, _e19, captions.update.bind(this));
    }

    setTimeout(captions.update.bind(this), 0);
  },
  update: function update() {
    var _this17 = this;

    var e = captions.getTracks.call(this, !0),
        _this$captions = this.captions,
        t = _this$captions.active,
        i = _this$captions.language,
        s = _this$captions.meta,
        n = _this$captions.currentTrackNode,
        r = Boolean(e.find(function (e) {
      return e.language === i;
    }));
    this.isHTML5 && this.isVideo && e.filter(function (e) {
      return !s.get(e);
    }).forEach(function (e) {
      _this17.debug.log("Track added", e), s.set(e, {
        default: "showing" === e.mode
      }), "showing" === e.mode && (e.mode = "hidden"), on.call(_this17, e, "cuechange", function () {
        return captions.updateCues.call(_this17);
      });
    }), (r && this.language !== i || !e.includes(n)) && (captions.setLanguage.call(this, i), captions.toggle.call(this, t && r)), toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is.empty(e)), is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);
  },
  toggle: function toggle(e) {
    var _this18 = this;

    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    if (!this.supported.ui) return;
    var i = this.captions.toggled,
        s = this.config.classNames.captions.active,
        n = is.nullOrUndefined(e) ? !i : e;

    if (n !== i) {
      if (t || (this.captions.active = n, this.storage.set({
        captions: n
      })), !this.language && n && !t) {
        var _e20 = captions.getTracks.call(this),
            _t10 = captions.findTrack.call(this, [this.captions.language].concat(_toConsumableArray(this.captions.languages)), !0);

        return this.captions.language = _t10.language, void captions.set.call(this, _e20.indexOf(_t10));
      }

      this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), toggleClass(this.elements.container, s, n), this.captions.toggled = n, controls.updateSetting.call(this, "captions"), triggerEvent.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
    }

    setTimeout(function () {
      n && _this18.captions.toggled && (_this18.captions.currentTrackNode.mode = "hidden");
    });
  },
  set: function set(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    var i = captions.getTracks.call(this);
    if (-1 !== e) {
      if (is.number(e)) {
        if (e in i) {
          if (this.captions.currentTrack !== e) {
            this.captions.currentTrack = e;

            var s = i[e],
                _ref14 = s || {},
                n = _ref14.language;

            this.captions.currentTrackNode = s, controls.updateSetting.call(this, "captions"), t || (this.captions.language = n, this.storage.set({
              language: n
            })), this.isVimeo && this.embed.enableTextTrack(n), triggerEvent.call(this, this.media, "languagechange");
          }

          captions.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && captions.updateCues.call(this);
        } else this.debug.warn("Track not found", e);
      } else this.debug.warn("Invalid caption argument", e);
    } else captions.toggle.call(this, !1, t);
  },
  setLanguage: function setLanguage(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    if (!is.string(e)) return void this.debug.warn("Invalid language argument", e);
    var i = e.toLowerCase();
    this.captions.language = i;
    var s = captions.getTracks.call(this),
        n = captions.findTrack.call(this, [i]);
    captions.set.call(this, s.indexOf(n), t);
  },
  getTracks: function getTracks() {
    var _this19 = this;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
    return Array.from((this.media || {}).textTracks || []).filter(function (t) {
      return !_this19.isHTML5 || e || _this19.captions.meta.has(t);
    }).filter(function (e) {
      return ["captions", "subtitles"].includes(e.kind);
    });
  },
  findTrack: function findTrack(e) {
    var _this20 = this;

    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;

    var i = captions.getTracks.call(this),
        s = function s(e) {
      return Number((_this20.captions.meta.get(e) || {}).default);
    },
        n = Array.from(i).sort(function (e, t) {
      return s(t) - s(e);
    });

    var r;
    return e.every(function (e) {
      return r = n.find(function (t) {
        return t.language === e;
      }), !r;
    }), r || (t ? n[0] : void 0);
  },
  getCurrentTrack: function getCurrentTrack() {
    return captions.getTracks.call(this)[this.currentTrack];
  },
  getLabel: function getLabel(e) {
    var t = e;
    return !is.track(t) && support.textTracks && this.captions.toggled && (t = captions.getCurrentTrack.call(this)), is.track(t) ? is.empty(t.label) ? is.empty(t.language) ? i18n.get("enabled", this.config) : e.language.toUpperCase() : t.label : i18n.get("disabled", this.config);
  },
  updateCues: function updateCues(e) {
    if (!this.supported.ui) return;
    if (!is.element(this.elements.captions)) return void this.debug.warn("No captions element to render to");
    if (!is.nullOrUndefined(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
    var t = e;

    if (!t) {
      var _e21 = captions.getCurrentTrack.call(this);

      t = Array.from((_e21 || {}).activeCues || []).map(function (e) {
        return e.getCueAsHTML();
      }).map(getHTML);
    }

    var i = t.map(function (e) {
      return e.trim();
    }).join("\n");

    if (i !== this.elements.captions.innerHTML) {
      emptyElement(this.elements.captions);

      var _e22 = createElement("span", getAttributesFromSelector(this.config.selectors.caption));

      _e22.innerHTML = i, this.elements.captions.appendChild(_e22), triggerEvent.call(this, this.media, "cuechange");
    }
  }
},
    defaults = {
  enabled: !0,
  title: "",
  debug: !1,
  autoplay: !1,
  autopause: !0,
  playsinline: !0,
  seekTime: 10,
  volume: 1,
  muted: !1,
  duration: null,
  displayDuration: !0,
  invertTime: !0,
  toggleInvert: !0,
  ratio: null,
  clickToPlay: !0,
  hideControls: !0,
  resetOnEnd: !1,
  disableContextMenu: !0,
  loadSprite: !0,
  iconPrefix: "plyr",
  iconUrl: "https://cdn.plyr.io/3.6.8/plyr.svg",
  blankVideo: "https://cdn.plyr.io/static/blank.mp4",
  quality: {
    default: 576,
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    forced: !1,
    onChange: null
  },
  loop: {
    active: !1
  },
  speed: {
    selected: 1,
    options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
  },
  keyboard: {
    focused: !0,
    global: !1
  },
  tooltips: {
    controls: !1,
    seek: !0
  },
  captions: {
    active: !1,
    language: "auto",
    update: !1
  },
  fullscreen: {
    enabled: !0,
    fallback: !0,
    iosNative: !1
  },
  storage: {
    enabled: !0,
    key: "plyr"
  },
  controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
  settings: ["captions", "quality", "speed"],
  i18n: {
    restart: "Restart",
    rewind: "Rewind {seektime}s",
    play: "Play",
    pause: "Pause",
    fastForward: "Forward {seektime}s",
    seek: "Seek",
    seekLabel: "{currentTime} of {duration}",
    played: "Played",
    buffered: "Buffered",
    currentTime: "Current time",
    duration: "Duration",
    volume: "Volume",
    mute: "Mute",
    unmute: "Unmute",
    enableCaptions: "Enable captions",
    disableCaptions: "Disable captions",
    download: "Download",
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
    frameTitle: "Player for {title}",
    captions: "Captions",
    settings: "Settings",
    pip: "PIP",
    menuBack: "Go back to previous menu",
    speed: "Speed",
    normal: "Normal",
    quality: "Quality",
    loop: "Loop",
    start: "Start",
    end: "End",
    all: "All",
    reset: "Reset",
    disabled: "Disabled",
    enabled: "Enabled",
    advertisement: "Ad",
    qualityBadge: {
      2160: "4K",
      1440: "HD",
      1080: "HD",
      720: "HD",
      576: "SD",
      480: "SD"
    }
  },
  urls: {
    download: null,
    vimeo: {
      sdk: "https://player.vimeo.com/api/player.js",
      iframe: "https://player.vimeo.com/video/{0}?{1}",
      api: "https://vimeo.com/api/oembed.json?url={0}"
    },
    youtube: {
      sdk: "https://www.youtube.com/iframe_api",
      api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
    },
    googleIMA: {
      sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
    }
  },
  listeners: {
    seek: null,
    play: null,
    pause: null,
    restart: null,
    rewind: null,
    fastForward: null,
    mute: null,
    volume: null,
    captions: null,
    download: null,
    fullscreen: null,
    pip: null,
    airplay: null,
    speed: null,
    quality: null,
    loop: null,
    language: null
  },
  events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
  selectors: {
    editable: "input, textarea, select, [contenteditable]",
    container: ".plyr",
    controls: {
      container: null,
      wrapper: ".plyr__controls"
    },
    labels: "[data-plyr]",
    buttons: {
      play: '[data-plyr="play"]',
      pause: '[data-plyr="pause"]',
      restart: '[data-plyr="restart"]',
      rewind: '[data-plyr="rewind"]',
      fastForward: '[data-plyr="fast-forward"]',
      mute: '[data-plyr="mute"]',
      captions: '[data-plyr="captions"]',
      download: '[data-plyr="download"]',
      fullscreen: '[data-plyr="fullscreen"]',
      pip: '[data-plyr="pip"]',
      airplay: '[data-plyr="airplay"]',
      settings: '[data-plyr="settings"]',
      loop: '[data-plyr="loop"]'
    },
    inputs: {
      seek: '[data-plyr="seek"]',
      volume: '[data-plyr="volume"]',
      speed: '[data-plyr="speed"]',
      language: '[data-plyr="language"]',
      quality: '[data-plyr="quality"]'
    },
    display: {
      currentTime: ".plyr__time--current",
      duration: ".plyr__time--duration",
      buffer: ".plyr__progress__buffer",
      loop: ".plyr__progress__loop",
      volume: ".plyr__volume--display"
    },
    progress: ".plyr__progress",
    captions: ".plyr__captions",
    caption: ".plyr__caption"
  },
  classNames: {
    type: "plyr--{0}",
    provider: "plyr--{0}",
    video: "plyr__video-wrapper",
    embed: "plyr__video-embed",
    videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
    embedContainer: "plyr__video-embed__container",
    poster: "plyr__poster",
    posterEnabled: "plyr__poster-enabled",
    ads: "plyr__ads",
    control: "plyr__control",
    controlPressed: "plyr__control--pressed",
    playing: "plyr--playing",
    paused: "plyr--paused",
    stopped: "plyr--stopped",
    loading: "plyr--loading",
    hover: "plyr--hover",
    tooltip: "plyr__tooltip",
    cues: "plyr__cues",
    hidden: "plyr__sr-only",
    hideControls: "plyr--hide-controls",
    isIos: "plyr--is-ios",
    isTouch: "plyr--is-touch",
    uiSupported: "plyr--full-ui",
    noTransition: "plyr--no-transition",
    display: {
      time: "plyr__time"
    },
    menu: {
      value: "plyr__menu__value",
      badge: "plyr__badge",
      open: "plyr--menu-open"
    },
    captions: {
      enabled: "plyr--captions-enabled",
      active: "plyr--captions-active"
    },
    fullscreen: {
      enabled: "plyr--fullscreen-enabled",
      fallback: "plyr--fullscreen-fallback"
    },
    pip: {
      supported: "plyr--pip-supported",
      active: "plyr--pip-active"
    },
    airplay: {
      supported: "plyr--airplay-supported",
      active: "plyr--airplay-active"
    },
    tabFocus: "plyr__tab-focus",
    previewThumbnails: {
      thumbContainer: "plyr__preview-thumb",
      thumbContainerShown: "plyr__preview-thumb--is-shown",
      imageContainer: "plyr__preview-thumb__image-container",
      timeContainer: "plyr__preview-thumb__time-container",
      scrubbingContainer: "plyr__preview-scrubbing",
      scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
    }
  },
  attributes: {
    embed: {
      provider: "data-plyr-provider",
      id: "data-plyr-embed-id"
    }
  },
  ads: {
    enabled: !1,
    publisherId: "",
    tagUrl: ""
  },
  previewThumbnails: {
    enabled: !1,
    src: ""
  },
  vimeo: {
    byline: !1,
    portrait: !1,
    title: !1,
    speed: !0,
    transparent: !1,
    customControls: !0,
    referrerPolicy: null,
    premium: !1
  },
  youtube: {
    rel: 0,
    showinfo: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    customControls: !0,
    noCookie: !1
  }
},
    pip = {
  active: "picture-in-picture",
  inactive: "inline"
},
    providers = {
  html5: "html5",
  youtube: "youtube",
  vimeo: "vimeo"
},
    types = {
  audio: "audio",
  video: "video"
};

function getProviderByUrl(e) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? providers.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? providers.vimeo : null;
}

var noop = function noop() {};

var Console = /*#__PURE__*/function () {
  function Console() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;

    _classCallCheck$1(this, Console);

    this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
  }

  _createClass$1(Console, [{
    key: "log",
    get: function get() {
      return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
    }
  }, {
    key: "warn",
    get: function get() {
      return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
    }
  }, {
    key: "error",
    get: function get() {
      return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
    }
  }]);

  return Console;
}();

var Fullscreen = /*#__PURE__*/function () {
  function Fullscreen(e) {
    var _this21 = this;

    _classCallCheck$1(this, Fullscreen);

    _defineProperty$1(this, "onChange", function () {
      if (!_this21.enabled) return;
      var e = _this21.player.elements.buttons.fullscreen;
      is.element(e) && (e.pressed = _this21.active);
      var t = _this21.target === _this21.player.media ? _this21.target : _this21.player.elements.container;
      triggerEvent.call(_this21.player, t, _this21.active ? "enterfullscreen" : "exitfullscreen", !0);
    }), _defineProperty$1(this, "toggleFallback", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;

      if (e ? _this21.scrollPosition = {
        x: window.scrollX || 0,
        y: window.scrollY || 0
      } : window.scrollTo(_this21.scrollPosition.x, _this21.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", toggleClass(_this21.target, _this21.player.config.classNames.fullscreen.fallback, e), browser.isIos) {
        var t = document.head.querySelector('meta[name="viewport"]');
        var i = "viewport-fit=cover";
        t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
        var s = is.string(t.content) && t.content.includes(i);
        e ? (_this21.cleanupViewport = !s, s || (t.content += ",".concat(i))) : _this21.cleanupViewport && (t.content = t.content.split(",").filter(function (e) {
          return e.trim() !== i;
        }).join(","));
      }

      _this21.onChange();
    }), _defineProperty$1(this, "trapFocus", function (e) {
      if (browser.isIos || !_this21.active || "Tab" !== e.key || 9 !== e.keyCode) return;

      var t = document.activeElement,
          i = getElements.call(_this21.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
          _i5 = _slicedToArray(i, 1),
          s = _i5[0],
          n = i[i.length - 1];

      t !== n || e.shiftKey ? t === s && e.shiftKey && (n.focus(), e.preventDefault()) : (s.focus(), e.preventDefault());
    }), _defineProperty$1(this, "update", function () {
      if (_this21.enabled) {
        var _e23;

        _e23 = _this21.forceFallback ? "Fallback (forced)" : Fullscreen.native ? "Native" : "Fallback", _this21.player.debug.log("".concat(_e23, " fullscreen enabled"));
      } else _this21.player.debug.log("Fullscreen not supported and fallback disabled");

      toggleClass(_this21.player.elements.container, _this21.player.config.classNames.fullscreen.enabled, _this21.enabled);
    }), _defineProperty$1(this, "enter", function () {
      _this21.enabled && (browser.isIos && _this21.player.config.fullscreen.iosNative ? _this21.player.isVimeo ? _this21.player.embed.requestFullscreen() : _this21.target.webkitEnterFullscreen() : !Fullscreen.native || _this21.forceFallback ? _this21.toggleFallback(!0) : _this21.prefix ? is.empty(_this21.prefix) || _this21.target["".concat(_this21.prefix, "Request").concat(_this21.property)]() : _this21.target.requestFullscreen({
        navigationUI: "hide"
      }));
    }), _defineProperty$1(this, "exit", function () {
      if (_this21.enabled) if (browser.isIos && _this21.player.config.fullscreen.iosNative) _this21.target.webkitExitFullscreen(), silencePromise(_this21.player.play());else if (!Fullscreen.native || _this21.forceFallback) _this21.toggleFallback(!1);else if (_this21.prefix) {
        if (!is.empty(_this21.prefix)) {
          var _e24 = "moz" === _this21.prefix ? "Cancel" : "Exit";

          document["".concat(_this21.prefix).concat(_e24).concat(_this21.property)]();
        }
      } else (document.cancelFullScreen || document.exitFullscreen).call(document);
    }), _defineProperty$1(this, "toggle", function () {
      _this21.active ? _this21.exit() : _this21.enter();
    }), this.player = e, this.prefix = Fullscreen.prefix, this.property = Fullscreen.property, this.scrollPosition = {
      x: 0,
      y: 0
    }, this.forceFallback = "force" === e.config.fullscreen.fallback, this.player.elements.fullscreen = e.config.fullscreen.container && closest$1(this.player.elements.container, e.config.fullscreen.container), on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function () {
      _this21.onChange();
    }), on.call(this.player, this.player.elements.container, "dblclick", function (e) {
      is.element(_this21.player.elements.controls) && _this21.player.elements.controls.contains(e.target) || _this21.player.listeners.proxy(e, _this21.toggle, "fullscreen");
    }), on.call(this, this.player.elements.container, "keydown", function (e) {
      return _this21.trapFocus(e);
    }), this.update();
  }

  _createClass$1(Fullscreen, [{
    key: "usingNative",
    get: function get() {
      return Fullscreen.native && !this.forceFallback;
    }
  }, {
    key: "enabled",
    get: function get() {
      return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
    }
  }, {
    key: "active",
    get: function get() {
      if (!this.enabled) return !1;
      if (!Fullscreen.native || this.forceFallback) return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
      var e = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement;
      return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
    }
  }, {
    key: "target",
    get: function get() {
      return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
    }
  }], [{
    key: "native",
    get: function get() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }
  }, {
    key: "prefix",
    get: function get() {
      if (is.function(document.exitFullscreen)) return "";
      var e = "";
      return ["webkit", "moz", "ms"].some(function (t) {
        return !(!is.function(document["".concat(t, "ExitFullscreen")]) && !is.function(document["".concat(t, "CancelFullScreen")])) && (e = t, !0);
      }), e;
    }
  }, {
    key: "property",
    get: function get() {
      return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
    }
  }]);

  return Fullscreen;
}();

function loadImage(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return new Promise(function (i, s) {
    var n = new Image(),
        r = function r() {
      delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
    };

    Object.assign(n, {
      onload: r,
      onerror: r,
      src: e
    });
  });
}

var ui = {
  addStyleHook: function addStyleHook() {
    toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), !0), toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
  },
  toggleNativeControls: function toggleNativeControls() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
    e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
  },
  build: function build() {
    var _this22 = this;

    if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void ui.toggleNativeControls.call(this, !0);
    is.element(this.elements.controls) || (controls.inject.call(this), this.listeners.controls()), ui.toggleNativeControls.call(this), this.isHTML5 && captions.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, controls.updateVolume.call(this), controls.timeUpdate.call(this), ui.checkPlaying.call(this), toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo), toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5), toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos), toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function () {
      triggerEvent.call(_this22, _this22.media, "ready");
    }, 0), ui.setTitle.call(this), this.poster && ui.setPoster.call(this, this.poster, !1).catch(function () {}), this.config.duration && controls.durationUpdate.call(this);
  },
  setTitle: function setTitle() {
    var e = i18n.get("play", this.config);

    if (is.string(this.config.title) && !is.empty(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function (t) {
      t.setAttribute("aria-label", e);
    }), this.isEmbed) {
      var _e25 = getElement.call(this, "iframe");

      if (!is.element(_e25)) return;
      var t = is.empty(this.config.title) ? "video" : this.config.title,
          i = i18n.get("frameTitle", this.config);

      _e25.setAttribute("title", i.replace("{title}", t));
    }
  },
  togglePoster: function togglePoster(e) {
    toggleClass(this.elements.container, this.config.classNames.posterEnabled, e);
  },
  setPoster: function setPoster(e) {
    var _this23 = this;

    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), ready.call(this).then(function () {
      return loadImage(e);
    }).catch(function (t) {
      throw e === _this23.poster && ui.togglePoster.call(_this23, !1), t;
    }).then(function () {
      if (e !== _this23.poster) throw new Error("setPoster cancelled by later call to setPoster");
    }).then(function () {
      return Object.assign(_this23.elements.poster.style, {
        backgroundImage: "url('".concat(e, "')"),
        backgroundSize: ""
      }), ui.togglePoster.call(_this23, !0), e;
    }));
  },
  checkPlaying: function checkPlaying(e) {
    var _this24 = this;

    toggleClass(this.elements.container, this.config.classNames.playing, this.playing), toggleClass(this.elements.container, this.config.classNames.paused, this.paused), toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function (e) {
      Object.assign(e, {
        pressed: _this24.playing
      }), e.setAttribute("aria-label", i18n.get(_this24.playing ? "pause" : "play", _this24.config));
    }), is.event(e) && "timeupdate" === e.type || ui.toggleControls.call(this);
  },
  checkLoading: function checkLoading(e) {
    var _this25 = this;

    this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
      toggleClass(_this25.elements.container, _this25.config.classNames.loading, _this25.loading), ui.toggleControls.call(_this25);
    }, this.loading ? 250 : 0);
  },
  toggleControls: function toggleControls(e) {
    var t = this.elements.controls;

    if (t && this.config.hideControls) {
      var i = this.touch && this.lastSeekTime + 2e3 > Date.now();
      this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
    }
  },
  migrateStyles: function migrateStyles() {
    var _this26 = this;

    Object.values(_objectSpread2$1({}, this.media.style)).filter(function (e) {
      return !is.empty(e) && is.string(e) && e.startsWith("--plyr");
    }).forEach(function (e) {
      _this26.elements.container.style.setProperty(e, _this26.media.style.getPropertyValue(e)), _this26.media.style.removeProperty(e);
    }), is.empty(this.media.style) && this.media.removeAttribute("style");
  }
};

var Listeners = /*#__PURE__*/function () {
  function Listeners(e) {
    var _this27 = this;

    _classCallCheck$1(this, Listeners);

    _defineProperty$1(this, "firstTouch", function () {
      var e = _this27.player,
          t = e.elements;
      e.touch = !0, toggleClass(t.container, e.config.classNames.isTouch, !0);
    }), _defineProperty$1(this, "setTabFocus", function (e) {
      var t = _this27.player,
          i = t.elements;
      if (clearTimeout(_this27.focusTimer), "keydown" === e.type && 9 !== e.which) return;
      "keydown" === e.type && (_this27.lastKeyDown = e.timeStamp);
      var s = e.timeStamp - _this27.lastKeyDown <= 20;
      ("focus" !== e.type || s) && (function () {
        var e = t.config.classNames.tabFocus;
        toggleClass(getElements.call(t, ".".concat(e)), e, !1);
      }(), "focusout" !== e.type && (_this27.focusTimer = setTimeout(function () {
        var e = document.activeElement;
        i.container.contains(e) && toggleClass(document.activeElement, t.config.classNames.tabFocus, !0);
      }, 10)));
    }), _defineProperty$1(this, "global", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      var t = _this27.player;
      t.config.keyboard.global && toggleListener.call(t, window, "keydown keyup", _this27.handleKey, e, !1), toggleListener.call(t, document.body, "click", _this27.toggleMenu, e), once.call(t, document.body, "touchstart", _this27.firstTouch), toggleListener.call(t, document.body, "keydown focus blur focusout", _this27.setTabFocus, e, !1, !0);
    }), _defineProperty$1(this, "container", function () {
      var e = _this27.player,
          t = e.config,
          i = e.elements,
          s = e.timers;
      !t.keyboard.global && t.keyboard.focused && on.call(e, i.container, "keydown keyup", _this27.handleKey, !1), on.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function (t) {
        var n = i.controls;
        n && "enterfullscreen" === t.type && (n.pressed = !1, n.hover = !1);
        var r = 0;
        ["touchstart", "touchmove", "mousemove"].includes(t.type) && (ui.toggleControls.call(e, !0), r = e.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(function () {
          return ui.toggleControls.call(e, !1);
        }, r);
      });

      var n = function n() {
        if (!e.isVimeo || e.config.vimeo.premium) return;

        var t = i.wrapper,
            s = e.fullscreen.active,
            _getAspectRatio$call = getAspectRatio.call(e),
            _getAspectRatio$call2 = _slicedToArray(_getAspectRatio$call, 2),
            n = _getAspectRatio$call2[0],
            r = _getAspectRatio$call2[1],
            a = supportsCSS("aspect-ratio: ".concat(n, " / ").concat(r));

        if (!s) return void (a ? (t.style.width = null, t.style.height = null) : (t.style.maxWidth = null, t.style.margin = null));

        var _getViewportSize = getViewportSize(),
            _getViewportSize2 = _slicedToArray(_getViewportSize, 2),
            o = _getViewportSize2[0],
            l = _getViewportSize2[1],
            c = o / l > n / r;

        a ? (t.style.width = c ? "auto" : "100%", t.style.height = c ? "100%" : "auto") : (t.style.maxWidth = c ? l / r * n + "px" : null, t.style.margin = c ? "0 auto" : null);
      },
          r = function r() {
        clearTimeout(s.resized), s.resized = setTimeout(n, 50);
      };

      on.call(e, i.container, "enterfullscreen exitfullscreen", function (t) {
        var s = e.fullscreen.target;
        if (s !== i.container) return;
        if (!e.isEmbed && is.empty(e.config.ratio)) return;
        n();
        ("enterfullscreen" === t.type ? on : off).call(e, window, "resize", r);
      });
    }), _defineProperty$1(this, "media", function () {
      var e = _this27.player,
          t = e.elements;

      if (on.call(e, e.media, "timeupdate seeking seeked", function (t) {
        return controls.timeUpdate.call(e, t);
      }), on.call(e, e.media, "durationchange loadeddata loadedmetadata", function (t) {
        return controls.durationUpdate.call(e, t);
      }), on.call(e, e.media, "ended", function () {
        e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause());
      }), on.call(e, e.media, "progress playing seeking seeked", function (t) {
        return controls.updateProgress.call(e, t);
      }), on.call(e, e.media, "volumechange", function (t) {
        return controls.updateVolume.call(e, t);
      }), on.call(e, e.media, "playing play pause ended emptied timeupdate", function (t) {
        return ui.checkPlaying.call(e, t);
      }), on.call(e, e.media, "waiting canplay seeked playing", function (t) {
        return ui.checkLoading.call(e, t);
      }), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
        var _i6 = getElement.call(e, ".".concat(e.config.classNames.video));

        if (!is.element(_i6)) return;
        on.call(e, t.container, "click", function (s) {
          ([t.container, _i6].includes(s.target) || _i6.contains(s.target)) && (e.touch && e.config.hideControls || (e.ended ? (_this27.proxy(s, e.restart, "restart"), _this27.proxy(s, function () {
            silencePromise(e.play());
          }, "play")) : _this27.proxy(s, function () {
            silencePromise(e.togglePlay());
          }, "play")));
        });
      }

      e.supported.ui && e.config.disableContextMenu && on.call(e, t.wrapper, "contextmenu", function (e) {
        e.preventDefault();
      }, !1), on.call(e, e.media, "volumechange", function () {
        e.storage.set({
          volume: e.volume,
          muted: e.muted
        });
      }), on.call(e, e.media, "ratechange", function () {
        controls.updateSetting.call(e, "speed"), e.storage.set({
          speed: e.speed
        });
      }), on.call(e, e.media, "qualitychange", function (t) {
        controls.updateSetting.call(e, "quality", null, t.detail.quality);
      }), on.call(e, e.media, "ready qualitychange", function () {
        controls.setDownloadUrl.call(e);
      });
      var i = e.config.events.concat(["keyup", "keydown"]).join(" ");
      on.call(e, e.media, i, function (i) {
        var _i$detail = i.detail,
            s = _i$detail === void 0 ? {} : _i$detail;
        "error" === i.type && (s = e.media.error), triggerEvent.call(e, t.container, i.type, !0, s);
      });
    }), _defineProperty$1(this, "proxy", function (e, t, i) {
      var s = _this27.player,
          n = s.config.listeners[i];
      var r = !0;
      is.function(n) && (r = n.call(s, e)), !1 !== r && is.function(t) && t.call(s, e);
    }), _defineProperty$1(this, "bind", function (e, t, i, s) {
      var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
      var r = _this27.player,
          a = r.config.listeners[s],
          o = is.function(a);
      on.call(r, e, t, function (e) {
        return _this27.proxy(e, i, s);
      }, n && !o);
    }), _defineProperty$1(this, "controls", function () {
      var e = _this27.player,
          t = e.elements,
          i = browser.isIE ? "change" : "input";

      if (t.buttons.play && Array.from(t.buttons.play).forEach(function (t) {
        _this27.bind(t, "click", function () {
          silencePromise(e.togglePlay());
        }, "play");
      }), _this27.bind(t.buttons.restart, "click", e.restart, "restart"), _this27.bind(t.buttons.rewind, "click", function () {
        e.lastSeekTime = Date.now(), e.rewind();
      }, "rewind"), _this27.bind(t.buttons.fastForward, "click", function () {
        e.lastSeekTime = Date.now(), e.forward();
      }, "fastForward"), _this27.bind(t.buttons.mute, "click", function () {
        e.muted = !e.muted;
      }, "mute"), _this27.bind(t.buttons.captions, "click", function () {
        return e.toggleCaptions();
      }), _this27.bind(t.buttons.download, "click", function () {
        triggerEvent.call(e, e.media, "download");
      }, "download"), _this27.bind(t.buttons.fullscreen, "click", function () {
        e.fullscreen.toggle();
      }, "fullscreen"), _this27.bind(t.buttons.pip, "click", function () {
        e.pip = "toggle";
      }, "pip"), _this27.bind(t.buttons.airplay, "click", e.airplay, "airplay"), _this27.bind(t.buttons.settings, "click", function (t) {
        t.stopPropagation(), t.preventDefault(), controls.toggleMenu.call(e, t);
      }, null, !1), _this27.bind(t.buttons.settings, "keyup", function (t) {
        var i = t.which;
        [13, 32].includes(i) && (13 !== i ? (t.preventDefault(), t.stopPropagation(), controls.toggleMenu.call(e, t)) : controls.focusFirstMenuItem.call(e, null, !0));
      }, null, !1), _this27.bind(t.settings.menu, "keydown", function (t) {
        27 === t.which && controls.toggleMenu.call(e, t);
      }), _this27.bind(t.inputs.seek, "mousedown mousemove", function (e) {
        var i = t.progress.getBoundingClientRect(),
            s = 100 / i.width * (e.pageX - i.left);
        e.currentTarget.setAttribute("seek-value", s);
      }), _this27.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function (t) {
        var i = t.currentTarget,
            s = t.keyCode ? t.keyCode : t.which,
            n = "play-on-seeked";
        if (is.keyboardEvent(t) && 39 !== s && 37 !== s) return;
        e.lastSeekTime = Date.now();
        var r = i.hasAttribute(n),
            a = ["mouseup", "touchend", "keyup"].includes(t.type);
        r && a ? (i.removeAttribute(n), silencePromise(e.play())) : !a && e.playing && (i.setAttribute(n, ""), e.pause());
      }), browser.isIos) {
        var _t11 = getElements.call(e, 'input[type="range"]');

        Array.from(_t11).forEach(function (e) {
          return _this27.bind(e, i, function (e) {
            return repaint(e.target);
          });
        });
      }

      _this27.bind(t.inputs.seek, i, function (t) {
        var i = t.currentTarget;
        var s = i.getAttribute("seek-value");
        is.empty(s) && (s = i.value), i.removeAttribute("seek-value"), e.currentTime = s / i.max * e.duration;
      }, "seek"), _this27.bind(t.progress, "mouseenter mouseleave mousemove", function (t) {
        return controls.updateSeekTooltip.call(e, t);
      }), _this27.bind(t.progress, "mousemove touchmove", function (t) {
        var i = e.previewThumbnails;
        i && i.loaded && i.startMove(t);
      }), _this27.bind(t.progress, "mouseleave touchend click", function () {
        var t = e.previewThumbnails;
        t && t.loaded && t.endMove(!1, !0);
      }), _this27.bind(t.progress, "mousedown touchstart", function (t) {
        var i = e.previewThumbnails;
        i && i.loaded && i.startScrubbing(t);
      }), _this27.bind(t.progress, "mouseup touchend", function (t) {
        var i = e.previewThumbnails;
        i && i.loaded && i.endScrubbing(t);
      }), browser.isWebkit && Array.from(getElements.call(e, 'input[type="range"]')).forEach(function (t) {
        _this27.bind(t, "input", function (t) {
          return controls.updateRangeFill.call(e, t.target);
        });
      }), e.config.toggleInvert && !is.element(t.display.duration) && _this27.bind(t.display.currentTime, "click", function () {
        0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, controls.timeUpdate.call(e));
      }), _this27.bind(t.inputs.volume, i, function (t) {
        e.volume = t.target.value;
      }, "volume"), _this27.bind(t.controls, "mouseenter mouseleave", function (i) {
        t.controls.hover = !e.touch && "mouseenter" === i.type;
      }), t.fullscreen && Array.from(t.fullscreen.children).filter(function (e) {
        return !e.contains(t.container);
      }).forEach(function (i) {
        _this27.bind(i, "mouseenter mouseleave", function (i) {
          t.controls.hover = !e.touch && "mouseenter" === i.type;
        });
      }), _this27.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
        t.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
      }), _this27.bind(t.controls, "focusin", function () {
        var i = e.config,
            s = e.timers;
        toggleClass(t.controls, i.classNames.noTransition, !0), ui.toggleControls.call(e, !0), setTimeout(function () {
          toggleClass(t.controls, i.classNames.noTransition, !1);
        }, 0);
        var n = _this27.touch ? 3e3 : 4e3;
        clearTimeout(s.controls), s.controls = setTimeout(function () {
          return ui.toggleControls.call(e, !1);
        }, n);
      }), _this27.bind(t.inputs.volume, "wheel", function (t) {
        var i = t.webkitDirectionInvertedFromDevice,
            _map = [t.deltaX, -t.deltaY].map(function (e) {
          return i ? -e : e;
        }),
            _map2 = _slicedToArray(_map, 2),
            s = _map2[0],
            n = _map2[1],
            r = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);

        e.increaseVolume(r / 50);
        var a = e.media.volume;
        (1 === r && a < 1 || -1 === r && a > 0) && t.preventDefault();
      }, "volume", !1);
    }), this.player = e, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
  }

  _createClass$1(Listeners, [{
    key: "handleKey",
    value: function handleKey(e) {
      var t = this.player,
          i = t.elements,
          s = e.keyCode ? e.keyCode : e.which,
          n = "keydown" === e.type,
          r = n && s === this.lastKey;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (!is.number(s)) return;

      if (n) {
        var _n3 = document.activeElement;

        if (is.element(_n3)) {
          var _s5 = t.config.selectors.editable,
              _r3 = i.inputs.seek;
          if (_n3 !== _r3 && matches(_n3, _s5)) return;
          if (32 === e.which && matches(_n3, 'button, [role^="menuitem"]')) return;
        }

        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            r || (t.currentTime = t.duration / 10 * (s - 48));
            break;

          case 32:
          case 75:
            r || silencePromise(t.togglePlay());
            break;

          case 38:
            t.increaseVolume(.1);
            break;

          case 40:
            t.decreaseVolume(.1);
            break;

          case 77:
            r || (t.muted = !t.muted);
            break;

          case 39:
            t.forward();
            break;

          case 37:
            t.rewind();
            break;

          case 70:
            t.fullscreen.toggle();
            break;

          case 67:
            r || t.toggleCaptions();
            break;

          case 76:
            t.loop = !t.loop;
        }

        27 === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
      } else this.lastKey = null;
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu(e) {
      controls.toggleMenu.call(this.player, e);
    }
  }]);

  return Listeners;
}();

function createCommonjsModule(e, t) {
  return e(t = {
    exports: {}
  }, t.exports), t.exports;
}

var loadjs_umd = createCommonjsModule(function (e, t) {
  e.exports = function () {
    var e = function e() {},
        t = {},
        i = {},
        s = {};

    function n(e, t) {
      e = e.push ? e : [e];
      var n,
          r,
          a,
          o = [],
          l = e.length,
          c = l;

      for (n = function n(e, i) {
        i.length && o.push(e), --c || t(o);
      }; l--;) {
        r = e[l], (a = i[r]) ? n(r, a) : (s[r] = s[r] || []).push(n);
      }
    }

    function r(e, t) {
      if (e) {
        var n = s[e];
        if (i[e] = t, n) for (; n.length;) {
          n[0](e, t), n.splice(0, 1);
        }
      }
    }

    function a(t, i) {
      t.call && (t = {
        success: t
      }), i.length ? (t.error || e)(i) : (t.success || e)(t);
    }

    function o(t, i, s, n) {
      var r,
          a,
          l = document,
          c = s.async,
          u = (s.numRetries || 0) + 1,
          d = s.before || e,
          h = t.replace(/[\?|#].*$/, ""),
          m = t.replace(/^(css|img)!/, "");
      n = n || 0, /(^css!|\.css$)/.test(h) ? ((a = l.createElement("link")).rel = "stylesheet", a.href = m, (r = "hideFocus" in a) && a.relList && (r = 0, a.rel = "preload", a.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (a = l.createElement("img")).src = m : ((a = l.createElement("script")).src = t, a.async = void 0 === c || c), a.onload = a.onerror = a.onbeforeload = function (e) {
        var l = e.type[0];
        if (r) try {
          a.sheet.cssText.length || (l = "e");
        } catch (e) {
          18 != e.code && (l = "e");
        }

        if ("e" == l) {
          if ((n += 1) < u) return o(t, i, s, n);
        } else if ("preload" == a.rel && "style" == a.as) return a.rel = "stylesheet";

        i(t, l, e.defaultPrevented);
      }, !1 !== d(t, a) && l.head.appendChild(a);
    }

    function l(e, t, i) {
      var s,
          n,
          r = (e = e.push ? e : [e]).length,
          a = r,
          l = [];

      for (s = function s(e, i, _s6) {
        if ("e" == i && l.push(e), "b" == i) {
          if (!_s6) return;
          l.push(e);
        }

        --r || t(l);
      }, n = 0; n < a; n++) {
        o(e[n], s, i);
      }
    }

    function c(e, i, s) {
      var n, o;

      if (i && i.trim && (n = i), o = (n ? s : i) || {}, n) {
        if (n in t) throw "LoadJS";
        t[n] = !0;
      }

      function c(t, i) {
        l(e, function (e) {
          a(o, e), t && a({
            success: t,
            error: i
          }, e), r(n, e);
        }, o);
      }

      if (o.returnPromise) return new Promise(c);
      c();
    }

    return c.ready = function (e, t) {
      return n(e, function (e) {
        a(t, e);
      }), c;
    }, c.done = function (e) {
      r(e, []);
    }, c.reset = function () {
      t = {}, i = {}, s = {};
    }, c.isDefined = function (e) {
      return e in t;
    }, c;
  }();
});

function loadScript(e) {
  return new Promise(function (t, i) {
    loadjs_umd(e, {
      success: t,
      error: i
    });
  });
}

function parseId$1(e) {
  if (is.empty(e)) return null;
  if (is.number(Number(e))) return e;
  return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e;
}

function assurePlaybackState$1(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}

var vimeo = {
  setup: function setup() {
    var e = this;
    toggleClass(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, setAspectRatio.call(e), is.object(window.Vimeo) ? vimeo.ready.call(e) : loadScript(e.config.urls.vimeo.sdk).then(function () {
      vimeo.ready.call(e);
    }).catch(function (t) {
      e.debug.warn("Vimeo SDK (player.js) failed to load", t);
    });
  },
  ready: function ready() {
    var _this28 = this;

    var e = this,
        t = e.config.vimeo,
        i = t.premium,
        s = t.referrerPolicy,
        n = _objectWithoutProperties(t, _excluded);

    i && Object.assign(n, {
      controls: !1,
      sidedock: !1
    });
    var r = buildUrlParams(_objectSpread2$1({
      loop: e.config.loop.active,
      autoplay: e.autoplay,
      muted: e.muted,
      gesture: "media",
      playsinline: !this.config.fullscreen.iosNative
    }, n));
    var a = e.media.getAttribute("src");
    is.empty(a) && (a = e.media.getAttribute(e.config.attributes.embed.id));
    var o = parseId$1(a),
        l = createElement("iframe"),
        c = format(e.config.urls.vimeo.iframe, o, r);
    if (l.setAttribute("src", c), l.setAttribute("allowfullscreen", ""), l.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), is.empty(s) || l.setAttribute("referrerPolicy", s), i || !t.customControls) l.setAttribute("data-poster", e.poster), e.media = replaceElement(l, e.media);else {
      var _t12 = createElement("div", {
        class: e.config.classNames.embedContainer,
        "data-poster": e.poster
      });

      _t12.appendChild(l), e.media = replaceElement(_t12, e.media);
    }
    t.customControls || fetch(format(e.config.urls.vimeo.api, c)).then(function (t) {
      !is.empty(t) && t.thumbnail_url && ui.setPoster.call(e, t.thumbnail_url).catch(function () {});
    }), e.embed = new window.Vimeo.Player(l, {
      autopause: e.config.autopause,
      muted: e.muted
    }), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = function () {
      return assurePlaybackState$1.call(e, !0), e.embed.play();
    }, e.media.pause = function () {
      return assurePlaybackState$1.call(e, !1), e.embed.pause();
    }, e.media.stop = function () {
      e.pause(), e.currentTime = 0;
    };
    var u = e.media.currentTime;
    Object.defineProperty(e.media, "currentTime", {
      get: function get() {
        return u;
      },
      set: function set(t) {
        var i = e.embed,
            s = e.media,
            n = e.paused,
            r = e.volume,
            a = n && !i.hasPlayed;
        s.seeking = !0, triggerEvent.call(e, s, "seeking"), Promise.resolve(a && i.setVolume(0)).then(function () {
          return i.setCurrentTime(t);
        }).then(function () {
          return a && i.pause();
        }).then(function () {
          return a && i.setVolume(r);
        }).catch(function () {});
      }
    });
    var d = e.config.speed.selected;
    Object.defineProperty(e.media, "playbackRate", {
      get: function get() {
        return d;
      },
      set: function set(t) {
        e.embed.setPlaybackRate(t).then(function () {
          d = t, triggerEvent.call(e, e.media, "ratechange");
        }).catch(function () {
          e.options.speed = [1];
        });
      }
    });
    var h = e.config.volume;
    Object.defineProperty(e.media, "volume", {
      get: function get() {
        return h;
      },
      set: function set(t) {
        e.embed.setVolume(t).then(function () {
          h = t, triggerEvent.call(e, e.media, "volumechange");
        });
      }
    });
    var m = e.config.muted;
    Object.defineProperty(e.media, "muted", {
      get: function get() {
        return m;
      },
      set: function set(t) {
        var i = !!is.boolean(t) && t;
        e.embed.setVolume(i ? 0 : e.config.volume).then(function () {
          m = i, triggerEvent.call(e, e.media, "volumechange");
        });
      }
    });
    var p,
        g = e.config.loop;
    Object.defineProperty(e.media, "loop", {
      get: function get() {
        return g;
      },
      set: function set(t) {
        var i = is.boolean(t) ? t : e.config.loop.active;
        e.embed.setLoop(i).then(function () {
          g = i;
        });
      }
    }), e.embed.getVideoUrl().then(function (t) {
      p = t, controls.setDownloadUrl.call(e);
    }).catch(function (e) {
      _this28.debug.warn(e);
    }), Object.defineProperty(e.media, "currentSrc", {
      get: function get() {
        return p;
      }
    }), Object.defineProperty(e.media, "ended", {
      get: function get() {
        return e.currentTime === e.duration;
      }
    }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(function (t) {
      var _t13 = _slicedToArray(t, 2),
          i = _t13[0],
          s = _t13[1];

      e.embed.ratio = roundAspectRatio(i, s), setAspectRatio.call(_this28);
    }), e.embed.setAutopause(e.config.autopause).then(function (t) {
      e.config.autopause = t;
    }), e.embed.getVideoTitle().then(function (t) {
      e.config.title = t, ui.setTitle.call(_this28);
    }), e.embed.getCurrentTime().then(function (t) {
      u = t, triggerEvent.call(e, e.media, "timeupdate");
    }), e.embed.getDuration().then(function (t) {
      e.media.duration = t, triggerEvent.call(e, e.media, "durationchange");
    }), e.embed.getTextTracks().then(function (t) {
      e.media.textTracks = t, captions.setup.call(e);
    }), e.embed.on("cuechange", function (_ref15) {
      var _ref15$cues = _ref15.cues,
          t = _ref15$cues === void 0 ? [] : _ref15$cues;
      var i = t.map(function (e) {
        return stripHTML(e.text);
      });
      captions.updateCues.call(e, i);
    }), e.embed.on("loaded", function () {
      if (e.embed.getPaused().then(function (t) {
        assurePlaybackState$1.call(e, !t), t || triggerEvent.call(e, e.media, "playing");
      }), is.element(e.embed.element) && e.supported.ui) {
        e.embed.element.setAttribute("tabindex", -1);
      }
    }), e.embed.on("bufferstart", function () {
      triggerEvent.call(e, e.media, "waiting");
    }), e.embed.on("bufferend", function () {
      triggerEvent.call(e, e.media, "playing");
    }), e.embed.on("play", function () {
      assurePlaybackState$1.call(e, !0), triggerEvent.call(e, e.media, "playing");
    }), e.embed.on("pause", function () {
      assurePlaybackState$1.call(e, !1);
    }), e.embed.on("timeupdate", function (t) {
      e.media.seeking = !1, u = t.seconds, triggerEvent.call(e, e.media, "timeupdate");
    }), e.embed.on("progress", function (t) {
      e.media.buffered = t.percent, triggerEvent.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && triggerEvent.call(e, e.media, "canplaythrough"), e.embed.getDuration().then(function (t) {
        t !== e.media.duration && (e.media.duration = t, triggerEvent.call(e, e.media, "durationchange"));
      });
    }), e.embed.on("seeked", function () {
      e.media.seeking = !1, triggerEvent.call(e, e.media, "seeked");
    }), e.embed.on("ended", function () {
      e.media.paused = !0, triggerEvent.call(e, e.media, "ended");
    }), e.embed.on("error", function (t) {
      e.media.error = t, triggerEvent.call(e, e.media, "error");
    }), t.customControls && setTimeout(function () {
      return ui.build.call(e);
    }, 0);
  }
};

function parseId(e) {
  if (is.empty(e)) return null;
  return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e;
}

function assurePlaybackState(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}

function getHost(e) {
  return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
}

var youtube = {
  setup: function setup() {
    var _this29 = this;

    if (toggleClass(this.elements.wrapper, this.config.classNames.embed, !0), is.object(window.YT) && is.function(window.YT.Player)) youtube.ready.call(this);else {
      var e = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        is.function(e) && e(), youtube.ready.call(_this29);
      }, loadScript(this.config.urls.youtube.sdk).catch(function (e) {
        _this29.debug.warn("YouTube API failed to load", e);
      });
    }
  },
  getTitle: function getTitle(e) {
    var _this30 = this;

    fetch(format(this.config.urls.youtube.api, e)).then(function (e) {
      if (is.object(e)) {
        var t = e.title,
            i = e.height,
            s = e.width;
        _this30.config.title = t, ui.setTitle.call(_this30), _this30.embed.ratio = roundAspectRatio(s, i);
      }

      setAspectRatio.call(_this30);
    }).catch(function () {
      setAspectRatio.call(_this30);
    });
  },
  ready: function ready() {
    var e = this,
        t = e.config.youtube,
        i = e.media && e.media.getAttribute("id");
    if (!is.empty(i) && i.startsWith("youtube-")) return;
    var s = e.media.getAttribute("src");
    is.empty(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
    var n = parseId(s),
        r = createElement("div", {
      id: generateId(e.provider),
      "data-poster": t.customControls ? e.poster : void 0
    });

    if (e.media = replaceElement(r, e.media), t.customControls) {
      var _t14 = function _t14(e) {
        return "https://i.ytimg.com/vi/".concat(n, "/").concat(e, "default.jpg");
      };

      loadImage(_t14("maxres"), 121).catch(function () {
        return loadImage(_t14("sd"), 121);
      }).catch(function () {
        return loadImage(_t14("hq"));
      }).then(function (t) {
        return ui.setPoster.call(e, t.src);
      }).then(function (t) {
        t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
      }).catch(function () {});
    }

    e.embed = new window.YT.Player(e.media, {
      videoId: n,
      host: getHost(t),
      playerVars: extend({}, {
        autoplay: e.config.autoplay ? 1 : 0,
        hl: e.config.hl,
        controls: e.supported.ui && t.customControls ? 0 : 1,
        disablekb: 1,
        playsinline: e.config.fullscreen.iosNative ? 0 : 1,
        cc_load_policy: e.captions.active ? 1 : 0,
        cc_lang_pref: e.config.captions.language,
        widget_referrer: window ? window.location.href : null
      }, t),
      events: {
        onError: function onError(t) {
          if (!e.media.error) {
            var _i7 = t.data,
                _s7 = {
              2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
              5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
              100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
              101: "The owner of the requested video does not allow it to be played in embedded players.",
              150: "The owner of the requested video does not allow it to be played in embedded players."
            }[_i7] || "An unknown error occured";

            e.media.error = {
              code: _i7,
              message: _s7
            }, triggerEvent.call(e, e.media, "error");
          }
        },
        onPlaybackRateChange: function onPlaybackRateChange(t) {
          var i = t.target;
          e.media.playbackRate = i.getPlaybackRate(), triggerEvent.call(e, e.media, "ratechange");
        },
        onReady: function onReady(i) {
          if (is.function(e.media.play)) return;
          var s = i.target;
          youtube.getTitle.call(e, n), e.media.play = function () {
            assurePlaybackState.call(e, !0), s.playVideo();
          }, e.media.pause = function () {
            assurePlaybackState.call(e, !1), s.pauseVideo();
          }, e.media.stop = function () {
            s.stopVideo();
          }, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
            get: function get() {
              return Number(s.getCurrentTime());
            },
            set: function set(t) {
              e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, triggerEvent.call(e, e.media, "seeking"), s.seekTo(t);
            }
          }), Object.defineProperty(e.media, "playbackRate", {
            get: function get() {
              return s.getPlaybackRate();
            },
            set: function set(e) {
              s.setPlaybackRate(e);
            }
          });
          var r = e.config.volume;
          Object.defineProperty(e.media, "volume", {
            get: function get() {
              return r;
            },
            set: function set(t) {
              r = t, s.setVolume(100 * r), triggerEvent.call(e, e.media, "volumechange");
            }
          });
          var a = e.config.muted;
          Object.defineProperty(e.media, "muted", {
            get: function get() {
              return a;
            },
            set: function set(t) {
              var i = is.boolean(t) ? t : a;
              a = i, s[i ? "mute" : "unMute"](), s.setVolume(100 * r), triggerEvent.call(e, e.media, "volumechange");
            }
          }), Object.defineProperty(e.media, "currentSrc", {
            get: function get() {
              return s.getVideoUrl();
            }
          }), Object.defineProperty(e.media, "ended", {
            get: function get() {
              return e.currentTime === e.duration;
            }
          });
          var o = s.getAvailablePlaybackRates();
          e.options.speed = o.filter(function (t) {
            return e.config.speed.options.includes(t);
          }), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), triggerEvent.call(e, e.media, "timeupdate"), triggerEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function () {
            e.media.buffered = s.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && triggerEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), triggerEvent.call(e, e.media, "canplaythrough"));
          }, 200), t.customControls && setTimeout(function () {
            return ui.build.call(e);
          }, 50);
        },
        onStateChange: function onStateChange(i) {
          var s = i.target;
          clearInterval(e.timers.playing);

          switch (e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, triggerEvent.call(e, e.media, "seeked")), i.data) {
            case -1:
              triggerEvent.call(e, e.media, "timeupdate"), e.media.buffered = s.getVideoLoadedFraction(), triggerEvent.call(e, e.media, "progress");
              break;

            case 0:
              assurePlaybackState.call(e, !1), e.media.loop ? (s.stopVideo(), s.playVideo()) : triggerEvent.call(e, e.media, "ended");
              break;

            case 1:
              t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (assurePlaybackState.call(e, !0), triggerEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(function () {
                triggerEvent.call(e, e.media, "timeupdate");
              }, 50), e.media.duration !== s.getDuration() && (e.media.duration = s.getDuration(), triggerEvent.call(e, e.media, "durationchange")));
              break;

            case 2:
              e.muted || e.embed.unMute(), assurePlaybackState.call(e, !1);
              break;

            case 3:
              triggerEvent.call(e, e.media, "waiting");
          }

          triggerEvent.call(e, e.elements.container, "statechange", !1, {
            code: i.data
          });
        }
      }
    });
  }
},
    media = {
  setup: function setup() {
    this.media ? (toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = createElement("div", {
      class: this.config.classNames.video
    }), wrap(this.media, this.elements.wrapper), this.elements.poster = createElement("div", {
      class: this.config.classNames.poster
    }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? html5.setup.call(this) : this.isYouTube ? youtube.setup.call(this) : this.isVimeo && vimeo.setup.call(this)) : this.debug.warn("No media element found!");
  }
};

var Ads = /*#__PURE__*/function () {
  function Ads(e) {
    var _this31 = this;

    _classCallCheck$1(this, Ads);

    _defineProperty$1(this, "load", function () {
      _this31.enabled && (is.object(window.google) && is.object(window.google.ima) ? _this31.ready() : loadScript(_this31.player.config.urls.googleIMA.sdk).then(function () {
        _this31.ready();
      }).catch(function () {
        _this31.trigger("error", new Error("Google IMA SDK failed to load"));
      }));
    }), _defineProperty$1(this, "ready", function () {
      var e;
      _this31.enabled || ((e = _this31).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), _this31.startSafetyTimer(12e3, "ready()"), _this31.managerPromise.then(function () {
        _this31.clearSafetyTimer("onAdsManagerLoaded()");
      }), _this31.listeners(), _this31.setupIMA();
    }), _defineProperty$1(this, "setupIMA", function () {
      _this31.elements.container = createElement("div", {
        class: _this31.player.config.classNames.ads
      }), _this31.player.elements.container.appendChild(_this31.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(_this31.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(_this31.player.config.playsinline), _this31.elements.displayContainer = new google.ima.AdDisplayContainer(_this31.elements.container, _this31.player.media), _this31.loader = new google.ima.AdsLoader(_this31.elements.displayContainer), _this31.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (e) {
        return _this31.onAdsManagerLoaded(e);
      }, !1), _this31.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
        return _this31.onAdError(e);
      }, !1), _this31.requestAds();
    }), _defineProperty$1(this, "requestAds", function () {
      var e = _this31.player.elements.container;

      try {
        var t = new google.ima.AdsRequest();
        t.adTagUrl = _this31.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!_this31.player.muted), _this31.loader.requestAds(t);
      } catch (e) {
        _this31.onAdError(e);
      }
    }), _defineProperty$1(this, "pollCountdown", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      if (!e) return clearInterval(_this31.countdownTimer), void _this31.elements.container.removeAttribute("data-badge-text");
      _this31.countdownTimer = setInterval(function () {
        var e = _formatTime(Math.max(_this31.manager.getRemainingTime(), 0)),
            t = "".concat(i18n.get("advertisement", _this31.player.config), " - ").concat(e);

        _this31.elements.container.setAttribute("data-badge-text", t);
      }, 100);
    }), _defineProperty$1(this, "onAdsManagerLoaded", function (e) {
      if (!_this31.enabled) return;
      var t = new google.ima.AdsRenderingSettings();
      t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, _this31.manager = e.getAdsManager(_this31.player, t), _this31.cuePoints = _this31.manager.getCuePoints(), _this31.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
        return _this31.onAdError(e);
      }), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
        _this31.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
          return _this31.onAdEvent(e);
        });
      }), _this31.trigger("loaded");
    }), _defineProperty$1(this, "addCuePoints", function () {
      is.empty(_this31.cuePoints) || _this31.cuePoints.forEach(function (e) {
        if (0 !== e && -1 !== e && e < _this31.player.duration) {
          var t = _this31.player.elements.progress;

          if (is.element(t)) {
            var i = 100 / _this31.player.duration * e,
                s = createElement("span", {
              class: _this31.player.config.classNames.cues
            });
            s.style.left = "".concat(i.toString(), "%"), t.appendChild(s);
          }
        }
      });
    }), _defineProperty$1(this, "onAdEvent", function (e) {
      var t = _this31.player.elements.container,
          i = e.getAd(),
          s = e.getAdData();

      switch (function (e) {
        triggerEvent.call(_this31.player, _this31.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()));
      }(e.type), e.type) {
        case google.ima.AdEvent.Type.LOADED:
          _this31.trigger("loaded"), _this31.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
          break;

        case google.ima.AdEvent.Type.STARTED:
          _this31.manager.setVolume(_this31.player.volume);

          break;

        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
          _this31.player.ended ? _this31.loadAds() : _this31.loader.contentComplete();
          break;

        case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
          _this31.pauseContent();

          break;

        case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
          _this31.pollCountdown(), _this31.resumeContent();
          break;

        case google.ima.AdEvent.Type.LOG:
          s.adError && _this31.player.debug.warn("Non-fatal ad error: ".concat(s.adError.getMessage()));
      }
    }), _defineProperty$1(this, "onAdError", function (e) {
      _this31.cancel(), _this31.player.debug.warn("Ads error", e);
    }), _defineProperty$1(this, "listeners", function () {
      var e = _this31.player.elements.container;
      var t;
      _this31.player.on("canplay", function () {
        _this31.addCuePoints();
      }), _this31.player.on("ended", function () {
        _this31.loader.contentComplete();
      }), _this31.player.on("timeupdate", function () {
        t = _this31.player.currentTime;
      }), _this31.player.on("seeked", function () {
        var e = _this31.player.currentTime;
        is.empty(_this31.cuePoints) || _this31.cuePoints.forEach(function (i, s) {
          t < i && i < e && (_this31.manager.discardAdBreak(), _this31.cuePoints.splice(s, 1));
        });
      }), window.addEventListener("resize", function () {
        _this31.manager && _this31.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL);
      });
    }), _defineProperty$1(this, "play", function () {
      var e = _this31.player.elements.container;
      _this31.managerPromise || _this31.resumeContent(), _this31.managerPromise.then(function () {
        _this31.manager.setVolume(_this31.player.volume), _this31.elements.displayContainer.initialize();

        try {
          _this31.initialized || (_this31.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), _this31.manager.start()), _this31.initialized = !0;
        } catch (e) {
          _this31.onAdError(e);
        }
      }).catch(function () {});
    }), _defineProperty$1(this, "resumeContent", function () {
      _this31.elements.container.style.zIndex = "", _this31.playing = !1, silencePromise(_this31.player.media.play());
    }), _defineProperty$1(this, "pauseContent", function () {
      _this31.elements.container.style.zIndex = 3, _this31.playing = !0, _this31.player.media.pause();
    }), _defineProperty$1(this, "cancel", function () {
      _this31.initialized && _this31.resumeContent(), _this31.trigger("error"), _this31.loadAds();
    }), _defineProperty$1(this, "loadAds", function () {
      _this31.managerPromise.then(function () {
        _this31.manager && _this31.manager.destroy(), _this31.managerPromise = new Promise(function (e) {
          _this31.on("loaded", e), _this31.player.debug.log(_this31.manager);
        }), _this31.initialized = !1, _this31.requestAds();
      }).catch(function () {});
    }), _defineProperty$1(this, "trigger", function (e) {
      for (var _len4 = arguments.length, t = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        t[_key4 - 1] = arguments[_key4];
      }

      var i = _this31.events[e];
      is.array(i) && i.forEach(function (e) {
        is.function(e) && e.apply(_this31, t);
      });
    }), _defineProperty$1(this, "on", function (e, t) {
      return is.array(_this31.events[e]) || (_this31.events[e] = []), _this31.events[e].push(t), _this31;
    }), _defineProperty$1(this, "startSafetyTimer", function (e, t) {
      _this31.player.debug.log("Safety timer invoked from: ".concat(t)), _this31.safetyTimer = setTimeout(function () {
        _this31.cancel(), _this31.clearSafetyTimer("startSafetyTimer()");
      }, e);
    }), _defineProperty$1(this, "clearSafetyTimer", function (e) {
      is.nullOrUndefined(_this31.safetyTimer) || (_this31.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(_this31.safetyTimer), _this31.safetyTimer = null);
    }), this.player = e, this.config = e.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
      container: null,
      displayContainer: null
    }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
      _this31.on("loaded", e), _this31.on("error", t);
    }), this.load();
  }

  _createClass$1(Ads, [{
    key: "enabled",
    get: function get() {
      var e = this.config;
      return this.player.isHTML5 && this.player.isVideo && e.enabled && (!is.empty(e.publisherId) || is.url(e.tagUrl));
    }
  }, {
    key: "tagUrl",
    get: function get() {
      var e = this.config;
      if (is.url(e.tagUrl)) return e.tagUrl;
      return "https://go.aniview.com/api/adserver6/vast/?".concat(buildUrlParams({
        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
        AV_CHANNELID: "5a0458dc28a06145e4519d21",
        AV_URL: window.location.hostname,
        cb: Date.now(),
        AV_WIDTH: 640,
        AV_HEIGHT: 480,
        AV_CDIM2: e.publisherId
      }));
    }
  }]);

  return Ads;
}();

var parseVtt = function parseVtt(e) {
  var t = [];
  return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(function (e) {
    var i = {};
    e.split(/\r\n|\n|\r/).forEach(function (e) {
      if (is.number(i.startTime)) {
        if (!is.empty(e.trim()) && is.empty(i.text)) {
          var _t16, _t17, _t15$1$split, _t15$1$split2;

          var _t15 = e.trim().split("#xywh=");

          (_t16 = _t15, _t17 = _slicedToArray(_t16, 1), i.text = _t17[0], _t16), _t15[1] && (_t15$1$split = _t15[1].split(","), _t15$1$split2 = _slicedToArray(_t15$1$split, 4), i.x = _t15$1$split2[0], i.y = _t15$1$split2[1], i.w = _t15$1$split2[2], i.h = _t15$1$split2[3], _t15$1$split);
        }
      } else {
        var _t18 = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);

        _t18 && (i.startTime = 60 * Number(_t18[1] || 0) * 60 + 60 * Number(_t18[2]) + Number(_t18[3]) + Number("0.".concat(_t18[4])), i.endTime = 60 * Number(_t18[6] || 0) * 60 + 60 * Number(_t18[7]) + Number(_t18[8]) + Number("0.".concat(_t18[9])));
      }
    }), i.text && t.push(i);
  }), t;
},
    fitRatio = function fitRatio(e, t) {
  var i = {};
  return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
};

var PreviewThumbnails = /*#__PURE__*/function () {
  function PreviewThumbnails(e) {
    var _this32 = this;

    _classCallCheck$1(this, PreviewThumbnails);

    _defineProperty$1(this, "load", function () {
      _this32.player.elements.display.seekTooltip && (_this32.player.elements.display.seekTooltip.hidden = _this32.enabled), _this32.enabled && _this32.getThumbnails().then(function () {
        _this32.enabled && (_this32.render(), _this32.determineContainerAutoSizing(), _this32.loaded = !0);
      });
    }), _defineProperty$1(this, "getThumbnails", function () {
      return new Promise(function (e) {
        var t = _this32.player.config.previewThumbnails.src;
        if (is.empty(t)) throw new Error("Missing previewThumbnails.src config attribute");

        var i = function i() {
          _this32.thumbnails.sort(function (e, t) {
            return e.height - t.height;
          }), _this32.player.debug.log("Preview thumbnails", _this32.thumbnails), e();
        };

        if (is.function(t)) t(function (e) {
          _this32.thumbnails = e, i();
        });else {
          var _e26 = (is.string(t) ? [t] : t).map(function (e) {
            return _this32.getThumbnail(e);
          });

          Promise.all(_e26).then(i);
        }
      });
    }), _defineProperty$1(this, "getThumbnail", function (e) {
      return new Promise(function (t) {
        fetch(e).then(function (i) {
          var s = {
            frames: parseVtt(i),
            height: null,
            urlPrefix: ""
          };
          s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
          var n = new Image();
          n.onload = function () {
            s.height = n.naturalHeight, s.width = n.naturalWidth, _this32.thumbnails.push(s), t();
          }, n.src = s.urlPrefix + s.frames[0].text;
        });
      });
    }), _defineProperty$1(this, "startMove", function (e) {
      if (_this32.loaded && is.event(e) && ["touchmove", "mousemove"].includes(e.type) && _this32.player.media.duration) {
        if ("touchmove" === e.type) _this32.seekTime = _this32.player.media.duration * (_this32.player.elements.inputs.seek.value / 100);else {
          var t = _this32.player.elements.progress.getBoundingClientRect(),
              i = 100 / t.width * (e.pageX - t.left);

          _this32.seekTime = _this32.player.media.duration * (i / 100), _this32.seekTime < 0 && (_this32.seekTime = 0), _this32.seekTime > _this32.player.media.duration - 1 && (_this32.seekTime = _this32.player.media.duration - 1), _this32.mousePosX = e.pageX, _this32.elements.thumb.time.innerText = _formatTime(_this32.seekTime);
        }

        _this32.showImageAtCurrentTime();
      }
    }), _defineProperty$1(this, "endMove", function () {
      _this32.toggleThumbContainer(!1, !0);
    }), _defineProperty$1(this, "startScrubbing", function (e) {
      (is.nullOrUndefined(e.button) || !1 === e.button || 0 === e.button) && (_this32.mouseDown = !0, _this32.player.media.duration && (_this32.toggleScrubbingContainer(!0), _this32.toggleThumbContainer(!1, !0), _this32.showImageAtCurrentTime()));
    }), _defineProperty$1(this, "endScrubbing", function () {
      _this32.mouseDown = !1, Math.ceil(_this32.lastTime) === Math.ceil(_this32.player.media.currentTime) ? _this32.toggleScrubbingContainer(!1) : once.call(_this32.player, _this32.player.media, "timeupdate", function () {
        _this32.mouseDown || _this32.toggleScrubbingContainer(!1);
      });
    }), _defineProperty$1(this, "listeners", function () {
      _this32.player.on("play", function () {
        _this32.toggleThumbContainer(!1, !0);
      }), _this32.player.on("seeked", function () {
        _this32.toggleThumbContainer(!1);
      }), _this32.player.on("timeupdate", function () {
        _this32.lastTime = _this32.player.media.currentTime;
      });
    }), _defineProperty$1(this, "render", function () {
      _this32.elements.thumb.container = createElement("div", {
        class: _this32.player.config.classNames.previewThumbnails.thumbContainer
      }), _this32.elements.thumb.imageContainer = createElement("div", {
        class: _this32.player.config.classNames.previewThumbnails.imageContainer
      }), _this32.elements.thumb.container.appendChild(_this32.elements.thumb.imageContainer);
      var e = createElement("div", {
        class: _this32.player.config.classNames.previewThumbnails.timeContainer
      });
      _this32.elements.thumb.time = createElement("span", {}, "00:00"), e.appendChild(_this32.elements.thumb.time), _this32.elements.thumb.container.appendChild(e), is.element(_this32.player.elements.progress) && _this32.player.elements.progress.appendChild(_this32.elements.thumb.container), _this32.elements.scrubbing.container = createElement("div", {
        class: _this32.player.config.classNames.previewThumbnails.scrubbingContainer
      }), _this32.player.elements.wrapper.appendChild(_this32.elements.scrubbing.container);
    }), _defineProperty$1(this, "destroy", function () {
      _this32.elements.thumb.container && _this32.elements.thumb.container.remove(), _this32.elements.scrubbing.container && _this32.elements.scrubbing.container.remove();
    }), _defineProperty$1(this, "showImageAtCurrentTime", function () {
      _this32.mouseDown ? _this32.setScrubbingContainerSize() : _this32.setThumbContainerSizeAndPos();

      var e = _this32.thumbnails[0].frames.findIndex(function (e) {
        return _this32.seekTime >= e.startTime && _this32.seekTime <= e.endTime;
      }),
          t = e >= 0;

      var i = 0;
      _this32.mouseDown || _this32.toggleThumbContainer(t), t && (_this32.thumbnails.forEach(function (t, s) {
        _this32.loadedImages.includes(t.frames[e].text) && (i = s);
      }), e !== _this32.showingThumb && (_this32.showingThumb = e, _this32.loadImage(i)));
    }), _defineProperty$1(this, "loadImage", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var t = _this32.showingThumb,
          i = _this32.thumbnails[e],
          s = i.urlPrefix,
          n = i.frames[t],
          r = i.frames[t].text,
          a = s + r;
      if (_this32.currentImageElement && _this32.currentImageElement.dataset.filename === r) _this32.showImage(_this32.currentImageElement, n, e, t, r, !1), _this32.currentImageElement.dataset.index = t, _this32.removeOldImages(_this32.currentImageElement);else {
        _this32.loadingImage && _this32.usingSprites && (_this32.loadingImage.onload = null);

        var _i8 = new Image();

        _i8.src = a, _i8.dataset.index = t, _i8.dataset.filename = r, _this32.showingThumbFilename = r, _this32.player.debug.log("Loading image: ".concat(a)), _i8.onload = function () {
          return _this32.showImage(_i8, n, e, t, r, !0);
        }, _this32.loadingImage = _i8, _this32.removeOldImages(_i8);
      }
    }), _defineProperty$1(this, "showImage", function (e, t, i, s, n) {
      var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !0;
      _this32.player.debug.log("Showing thumb: ".concat(n, ". num: ").concat(s, ". qual: ").concat(i, ". newimg: ").concat(r)), _this32.setImageSizeAndOffset(e, t), r && (_this32.currentImageContainer.appendChild(e), _this32.currentImageElement = e, _this32.loadedImages.includes(n) || _this32.loadedImages.push(n)), _this32.preloadNearby(s, !0).then(_this32.preloadNearby(s, !1)).then(_this32.getHigherQuality(i, e, t, n));
    }), _defineProperty$1(this, "removeOldImages", function (e) {
      Array.from(_this32.currentImageContainer.children).forEach(function (t) {
        if ("img" !== t.tagName.toLowerCase()) return;
        var i = _this32.usingSprites ? 500 : 1e3;

        if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
          t.dataset.deleting = !0;
          var _e27 = _this32.currentImageContainer;
          setTimeout(function () {
            _e27.removeChild(t), _this32.player.debug.log("Removing thumb: ".concat(t.dataset.filename));
          }, i);
        }
      });
    }), _defineProperty$1(this, "preloadNearby", function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return new Promise(function (i) {
        setTimeout(function () {
          var s = _this32.thumbnails[0].frames[e].text;

          if (_this32.showingThumbFilename === s) {
            var n;
            n = t ? _this32.thumbnails[0].frames.slice(e) : _this32.thumbnails[0].frames.slice(0, e).reverse();
            var r = !1;
            n.forEach(function (e) {
              var t = e.text;

              if (t !== s && !_this32.loadedImages.includes(t)) {
                r = !0, _this32.player.debug.log("Preloading thumb filename: ".concat(t));

                var _e28 = _this32.thumbnails[0].urlPrefix,
                    _s8 = _e28 + t,
                    _n4 = new Image();

                _n4.src = _s8, _n4.onload = function () {
                  _this32.player.debug.log("Preloaded thumb filename: ".concat(t)), _this32.loadedImages.includes(t) || _this32.loadedImages.push(t), i();
                };
              }
            }), r || i();
          }
        }, 300);
      });
    }), _defineProperty$1(this, "getHigherQuality", function (e, t, i, s) {
      if (e < _this32.thumbnails.length - 1) {
        var n = t.naturalHeight;
        _this32.usingSprites && (n = i.h), n < _this32.thumbContainerHeight && setTimeout(function () {
          _this32.showingThumbFilename === s && (_this32.player.debug.log("Showing higher quality thumb for: ".concat(s)), _this32.loadImage(e + 1));
        }, 300);
      }
    }), _defineProperty$1(this, "toggleThumbContainer", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var i = _this32.player.config.classNames.previewThumbnails.thumbContainerShown;
      _this32.elements.thumb.container.classList.toggle(i, e), !e && t && (_this32.showingThumb = null, _this32.showingThumbFilename = null);
    }), _defineProperty$1(this, "toggleScrubbingContainer", function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var t = _this32.player.config.classNames.previewThumbnails.scrubbingContainerShown;
      _this32.elements.scrubbing.container.classList.toggle(t, e), e || (_this32.showingThumb = null, _this32.showingThumbFilename = null);
    }), _defineProperty$1(this, "determineContainerAutoSizing", function () {
      (_this32.elements.thumb.imageContainer.clientHeight > 20 || _this32.elements.thumb.imageContainer.clientWidth > 20) && (_this32.sizeSpecifiedInCSS = !0);
    }), _defineProperty$1(this, "setThumbContainerSizeAndPos", function () {
      if (_this32.sizeSpecifiedInCSS) {
        if (_this32.elements.thumb.imageContainer.clientHeight > 20 && _this32.elements.thumb.imageContainer.clientWidth < 20) {
          var _e29 = Math.floor(_this32.elements.thumb.imageContainer.clientHeight * _this32.thumbAspectRatio);

          _this32.elements.thumb.imageContainer.style.width = "".concat(_e29, "px");
        } else if (_this32.elements.thumb.imageContainer.clientHeight < 20 && _this32.elements.thumb.imageContainer.clientWidth > 20) {
          var _e30 = Math.floor(_this32.elements.thumb.imageContainer.clientWidth / _this32.thumbAspectRatio);

          _this32.elements.thumb.imageContainer.style.height = "".concat(_e30, "px");
        }
      } else {
        var _e31 = Math.floor(_this32.thumbContainerHeight * _this32.thumbAspectRatio);

        _this32.elements.thumb.imageContainer.style.height = "".concat(_this32.thumbContainerHeight, "px"), _this32.elements.thumb.imageContainer.style.width = "".concat(_e31, "px");
      }

      _this32.setThumbContainerPos();
    }), _defineProperty$1(this, "setThumbContainerPos", function () {
      var e = _this32.player.elements.progress.getBoundingClientRect(),
          t = _this32.player.elements.container.getBoundingClientRect(),
          i = _this32.elements.thumb.container,
          s = t.left - e.left + 10,
          n = t.right - e.left - i.clientWidth - 10;

      var r = _this32.mousePosX - e.left - i.clientWidth / 2;
      r < s && (r = s), r > n && (r = n), i.style.left = "".concat(r, "px");
    }), _defineProperty$1(this, "setScrubbingContainerSize", function () {
      var _fitRatio = fitRatio(_this32.thumbAspectRatio, {
        width: _this32.player.media.clientWidth,
        height: _this32.player.media.clientHeight
      }),
          e = _fitRatio.width,
          t = _fitRatio.height;

      _this32.elements.scrubbing.container.style.width = "".concat(e, "px"), _this32.elements.scrubbing.container.style.height = "".concat(t, "px");
    }), _defineProperty$1(this, "setImageSizeAndOffset", function (e, t) {
      if (!_this32.usingSprites) return;
      var i = _this32.thumbContainerHeight / t.h;
      e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = "-".concat(t.x * i, "px"), e.style.top = "-".concat(t.y * i, "px");
    }), this.player = e, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
      thumb: {},
      scrubbing: {}
    }, this.load();
  }

  _createClass$1(PreviewThumbnails, [{
    key: "enabled",
    get: function get() {
      return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
    }
  }, {
    key: "currentImageContainer",
    get: function get() {
      return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
    }
  }, {
    key: "usingSprites",
    get: function get() {
      return Object.keys(this.thumbnails[0].frames[0]).includes("w");
    }
  }, {
    key: "thumbAspectRatio",
    get: function get() {
      return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
    }
  }, {
    key: "thumbContainerHeight",
    get: function get() {
      if (this.mouseDown) {
        var _fitRatio2 = fitRatio(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        }),
            e = _fitRatio2.height;

        return e;
      }

      return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
    }
  }, {
    key: "currentImageElement",
    get: function get() {
      return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
    },
    set: function set(e) {
      this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
    }
  }]);

  return PreviewThumbnails;
}();

var source = {
  insertElements: function insertElements(e, t) {
    var _this33 = this;

    is.string(t) ? insertElement(e, this.media, {
      src: t
    }) : is.array(t) && t.forEach(function (t) {
      insertElement(e, _this33.media, t);
    });
  },
  change: function change(e) {
    var _this34 = this;

    getDeep(e, "sources.length") ? (html5.cancelRequests.call(this), this.destroy.call(this, function () {
      _this34.options.quality = [], removeElement(_this34.media), _this34.media = null, is.element(_this34.elements.container) && _this34.elements.container.removeAttribute("class");

      var t = e.sources,
          i = e.type,
          _t19 = _slicedToArray(t, 1),
          _t19$ = _t19[0],
          _t19$$provider = _t19$.provider,
          s = _t19$$provider === void 0 ? providers.html5 : _t19$$provider,
          n = _t19$.src,
          r = "html5" === s ? i : "div",
          a = "html5" === s ? {} : {
        src: n
      };

      Object.assign(_this34, {
        provider: s,
        type: i,
        supported: support.check(i, s, _this34.config.playsinline),
        media: createElement(r, a)
      }), _this34.elements.container.appendChild(_this34.media), is.boolean(e.autoplay) && (_this34.config.autoplay = e.autoplay), _this34.isHTML5 && (_this34.config.crossorigin && _this34.media.setAttribute("crossorigin", ""), _this34.config.autoplay && _this34.media.setAttribute("autoplay", ""), is.empty(e.poster) || (_this34.poster = e.poster), _this34.config.loop.active && _this34.media.setAttribute("loop", ""), _this34.config.muted && _this34.media.setAttribute("muted", ""), _this34.config.playsinline && _this34.media.setAttribute("playsinline", "")), ui.addStyleHook.call(_this34), _this34.isHTML5 && source.insertElements.call(_this34, "source", t), _this34.config.title = e.title, media.setup.call(_this34), _this34.isHTML5 && Object.keys(e).includes("tracks") && source.insertElements.call(_this34, "track", e.tracks), (_this34.isHTML5 || _this34.isEmbed && !_this34.supported.ui) && ui.build.call(_this34), _this34.isHTML5 && _this34.media.load(), is.empty(e.previewThumbnails) || (Object.assign(_this34.config.previewThumbnails, e.previewThumbnails), _this34.previewThumbnails && _this34.previewThumbnails.loaded && (_this34.previewThumbnails.destroy(), _this34.previewThumbnails = null), _this34.config.previewThumbnails.enabled && (_this34.previewThumbnails = new PreviewThumbnails(_this34))), _this34.fullscreen.update();
    }, !0)) : this.debug.warn("Invalid source format");
  }
};

function clamp() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
  return Math.min(Math.max(e, t), i);
}

var Plyr = /*#__PURE__*/function () {
  function Plyr(e, t) {
    var _this35 = this;

    _classCallCheck$1(this, Plyr);

    if (_defineProperty$1(this, "play", function () {
      return is.function(_this35.media.play) ? (_this35.ads && _this35.ads.enabled && _this35.ads.managerPromise.then(function () {
        return _this35.ads.play();
      }).catch(function () {
        return silencePromise(_this35.media.play());
      }), _this35.media.play()) : null;
    }), _defineProperty$1(this, "pause", function () {
      return _this35.playing && is.function(_this35.media.pause) ? _this35.media.pause() : null;
    }), _defineProperty$1(this, "togglePlay", function (e) {
      return (is.boolean(e) ? e : !_this35.playing) ? _this35.play() : _this35.pause();
    }), _defineProperty$1(this, "stop", function () {
      _this35.isHTML5 ? (_this35.pause(), _this35.restart()) : is.function(_this35.media.stop) && _this35.media.stop();
    }), _defineProperty$1(this, "restart", function () {
      _this35.currentTime = 0;
    }), _defineProperty$1(this, "rewind", function (e) {
      _this35.currentTime -= is.number(e) ? e : _this35.config.seekTime;
    }), _defineProperty$1(this, "forward", function (e) {
      _this35.currentTime += is.number(e) ? e : _this35.config.seekTime;
    }), _defineProperty$1(this, "increaseVolume", function (e) {
      var t = _this35.media.muted ? 0 : _this35.volume;
      _this35.volume = t + (is.number(e) ? e : 0);
    }), _defineProperty$1(this, "decreaseVolume", function (e) {
      _this35.increaseVolume(-e);
    }), _defineProperty$1(this, "airplay", function () {
      support.airplay && _this35.media.webkitShowPlaybackTargetPicker();
    }), _defineProperty$1(this, "toggleControls", function (e) {
      if (_this35.supported.ui && !_this35.isAudio) {
        var _t20 = hasClass(_this35.elements.container, _this35.config.classNames.hideControls),
            _i9 = void 0 === e ? void 0 : !e,
            _s9 = toggleClass(_this35.elements.container, _this35.config.classNames.hideControls, _i9);

        if (_s9 && is.array(_this35.config.controls) && _this35.config.controls.includes("settings") && !is.empty(_this35.config.settings) && controls.toggleMenu.call(_this35, !1), _s9 !== _t20) {
          var _e32 = _s9 ? "controlshidden" : "controlsshown";

          triggerEvent.call(_this35, _this35.media, _e32);
        }

        return !_s9;
      }

      return !1;
    }), _defineProperty$1(this, "on", function (e, t) {
      on.call(_this35, _this35.elements.container, e, t);
    }), _defineProperty$1(this, "once", function (e, t) {
      once.call(_this35, _this35.elements.container, e, t);
    }), _defineProperty$1(this, "off", function (e, t) {
      off(_this35.elements.container, e, t);
    }), _defineProperty$1(this, "destroy", function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (!_this35.ready) return;

      var i = function i() {
        document.body.style.overflow = "", _this35.embed = null, t ? (Object.keys(_this35.elements).length && (removeElement(_this35.elements.buttons.play), removeElement(_this35.elements.captions), removeElement(_this35.elements.controls), removeElement(_this35.elements.wrapper), _this35.elements.buttons.play = null, _this35.elements.captions = null, _this35.elements.controls = null, _this35.elements.wrapper = null), is.function(e) && e()) : (unbindListeners.call(_this35), html5.cancelRequests.call(_this35), replaceElement(_this35.elements.original, _this35.elements.container), triggerEvent.call(_this35, _this35.elements.original, "destroyed", !0), is.function(e) && e.call(_this35.elements.original), _this35.ready = !1, setTimeout(function () {
          _this35.elements = null, _this35.media = null;
        }, 200));
      };

      _this35.stop(), clearTimeout(_this35.timers.loading), clearTimeout(_this35.timers.controls), clearTimeout(_this35.timers.resized), _this35.isHTML5 ? (ui.toggleNativeControls.call(_this35, !0), i()) : _this35.isYouTube ? (clearInterval(_this35.timers.buffering), clearInterval(_this35.timers.playing), null !== _this35.embed && is.function(_this35.embed.destroy) && _this35.embed.destroy(), i()) : _this35.isVimeo && (null !== _this35.embed && _this35.embed.unload().then(i), setTimeout(i, 200));
    }), _defineProperty$1(this, "supports", function (e) {
      return support.mime.call(_this35, e);
    }), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = support.touch, this.media = e, is.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || is.nodeList(this.media) || is.array(this.media)) && (this.media = this.media[0]), this.config = extend({}, defaults, Plyr.defaults, t || {}, function () {
      try {
        return JSON.parse(_this35.media.getAttribute("data-plyr-config"));
      } catch (e) {
        return {};
      }
    }()), this.elements = {
      container: null,
      fullscreen: null,
      captions: null,
      buttons: {},
      display: {},
      progress: {},
      inputs: {},
      settings: {
        popup: null,
        menu: null,
        panels: {},
        buttons: {}
      }
    }, this.captions = {
      active: null,
      currentTrack: -1,
      meta: new WeakMap()
    }, this.fullscreen = {
      active: !1
    }, this.options = {
      speed: [],
      quality: []
    }, this.debug = new Console(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", support), is.nullOrUndefined(this.media) || !is.element(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
    if (this.media.plyr) return void this.debug.warn("Target already setup");
    if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
    if (!support.check().api) return void this.debug.error("Setup failed: no support");
    var i = this.media.cloneNode(!0);
    i.autoplay = !1, this.elements.original = i;
    var s = this.media.tagName.toLowerCase();
    var n = null,
        r = null;

    switch (s) {
      case "div":
        if (n = this.media.querySelector("iframe"), is.element(n)) {
          if (r = parseUrl(n.getAttribute("src")), this.provider = getProviderByUrl(r.toString()), this.elements.container = this.media, this.media = n, this.elements.container.className = "", r.search.length) {
            var _e33 = ["1", "true"];
            _e33.includes(r.searchParams.get("autoplay")) && (this.config.autoplay = !0), _e33.includes(r.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = _e33.includes(r.searchParams.get("playsinline")), this.config.youtube.hl = r.searchParams.get("hl")) : this.config.playsinline = !0;
          }
        } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);

        if (is.empty(this.provider) || !Object.values(providers).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
        this.type = types.video;
        break;

      case "video":
      case "audio":
        this.type = s, this.provider = providers.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
        break;

      default:
        return void this.debug.error("Setup failed: unsupported type");
    }

    this.supported = support.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Listeners(this), this.storage = new Storage(this), this.media.plyr = this, is.element(this.elements.container) || (this.elements.container = createElement("div", {
      tabindex: 0
    }), wrap(this.media, this.elements.container)), ui.migrateStyles.call(this), ui.addStyleHook.call(this), media.setup.call(this), this.config.debug && on.call(this, this.elements.container, this.config.events.join(" "), function (e) {
      _this35.debug.log("event: ".concat(e.type));
    }), this.fullscreen = new Fullscreen(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Ads(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", function () {
      return silencePromise(_this35.play());
    }), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))) : this.debug.error("Setup failed: no support");
  }

  _createClass$1(Plyr, [{
    key: "isHTML5",
    get: function get() {
      return this.provider === providers.html5;
    }
  }, {
    key: "isEmbed",
    get: function get() {
      return this.isYouTube || this.isVimeo;
    }
  }, {
    key: "isYouTube",
    get: function get() {
      return this.provider === providers.youtube;
    }
  }, {
    key: "isVimeo",
    get: function get() {
      return this.provider === providers.vimeo;
    }
  }, {
    key: "isVideo",
    get: function get() {
      return this.type === types.video;
    }
  }, {
    key: "isAudio",
    get: function get() {
      return this.type === types.audio;
    }
  }, {
    key: "playing",
    get: function get() {
      return Boolean(this.ready && !this.paused && !this.ended);
    }
  }, {
    key: "paused",
    get: function get() {
      return Boolean(this.media.paused);
    }
  }, {
    key: "stopped",
    get: function get() {
      return Boolean(this.paused && 0 === this.currentTime);
    }
  }, {
    key: "ended",
    get: function get() {
      return Boolean(this.media.ended);
    }
  }, {
    key: "currentTime",
    get: function get() {
      return Number(this.media.currentTime);
    },
    set: function set(e) {
      if (!this.duration) return;
      var t = is.number(e) && e > 0;
      this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
    }
  }, {
    key: "buffered",
    get: function get() {
      var e = this.media.buffered;
      return is.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
    }
  }, {
    key: "seeking",
    get: function get() {
      return Boolean(this.media.seeking);
    }
  }, {
    key: "duration",
    get: function get() {
      var e = parseFloat(this.config.duration),
          t = (this.media || {}).duration,
          i = is.number(t) && t !== 1 / 0 ? t : 0;
      return e || i;
    }
  }, {
    key: "volume",
    get: function get() {
      return Number(this.media.volume);
    },
    set: function set(e) {
      var _this$config2;

      var t = e;
      is.string(t) && (t = Number(t)), is.number(t) || (t = this.storage.get("volume")), is.number(t) || (_this$config2 = this.config, t = _this$config2.volume, _this$config2), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !is.empty(e) && this.muted && t > 0 && (this.muted = !1);
    }
  }, {
    key: "muted",
    get: function get() {
      return Boolean(this.media.muted);
    },
    set: function set(e) {
      var t = e;
      is.boolean(t) || (t = this.storage.get("muted")), is.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
    }
  }, {
    key: "hasAudio",
    get: function get() {
      return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
    }
  }, {
    key: "speed",
    get: function get() {
      return Number(this.media.playbackRate);
    },
    set: function set(e) {
      var _this36 = this;

      var t = null;
      is.number(e) && (t = e), is.number(t) || (t = this.storage.get("speed")), is.number(t) || (t = this.config.speed.selected);
      var i = this.minimumSpeed,
          s = this.maximumSpeed;
      t = clamp(t, i, s), this.config.speed.selected = t, setTimeout(function () {
        _this36.media.playbackRate = t;
      }, 0);
    }
  }, {
    key: "minimumSpeed",
    get: function get() {
      return this.isYouTube ? Math.min.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? .5 : .0625;
    }
  }, {
    key: "maximumSpeed",
    get: function get() {
      return this.isYouTube ? Math.max.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? 2 : 16;
    }
  }, {
    key: "quality",
    get: function get() {
      return this.media.quality;
    },
    set: function set(e) {
      var t = this.config.quality,
          i = this.options.quality;
      if (!i.length) return;
      var s = [!is.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(is.number),
          n = !0;

      if (!i.includes(s)) {
        var _e34 = closest(i, s);

        this.debug.warn("Unsupported quality option: ".concat(s, ", using ").concat(_e34, " instead")), s = _e34, n = !1;
      }

      t.selected = s, this.media.quality = s, n && this.storage.set({
        quality: s
      });
    }
  }, {
    key: "loop",
    get: function get() {
      return Boolean(this.media.loop);
    },
    set: function set(e) {
      var t = is.boolean(e) ? e : this.config.loop.active;
      this.config.loop.active = t, this.media.loop = t;
    }
  }, {
    key: "source",
    get: function get() {
      return this.media.currentSrc;
    },
    set: function set(e) {
      source.change.call(this, e);
    }
  }, {
    key: "download",
    get: function get() {
      var e = this.config.urls.download;
      return is.url(e) ? e : this.source;
    },
    set: function set(e) {
      is.url(e) && (this.config.urls.download = e, controls.setDownloadUrl.call(this));
    }
  }, {
    key: "poster",
    get: function get() {
      return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
    },
    set: function set(e) {
      this.isVideo ? ui.setPoster.call(this, e, !1).catch(function () {}) : this.debug.warn("Poster can only be set for video");
    }
  }, {
    key: "ratio",
    get: function get() {
      if (!this.isVideo) return null;
      var e = reduceAspectRatio(getAspectRatio.call(this));
      return is.array(e) ? e.join(":") : e;
    },
    set: function set(e) {
      this.isVideo ? is.string(e) && validateAspectRatio(e) ? (this.config.ratio = reduceAspectRatio(e), setAspectRatio.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video");
    }
  }, {
    key: "autoplay",
    get: function get() {
      return Boolean(this.config.autoplay);
    },
    set: function set(e) {
      var t = is.boolean(e) ? e : this.config.autoplay;
      this.config.autoplay = t;
    }
  }, {
    key: "toggleCaptions",
    value: function toggleCaptions(e) {
      captions.toggle.call(this, e, !1);
    }
  }, {
    key: "currentTrack",
    get: function get() {
      var _this$captions2 = this.captions,
          e = _this$captions2.toggled,
          t = _this$captions2.currentTrack;
      return e ? t : -1;
    },
    set: function set(e) {
      captions.set.call(this, e, !1);
    }
  }, {
    key: "language",
    get: function get() {
      return (captions.getCurrentTrack.call(this) || {}).language;
    },
    set: function set(e) {
      captions.setLanguage.call(this, e, !1);
    }
  }, {
    key: "pip",
    get: function get() {
      return support.pip ? is.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === pip.active : null;
    },
    set: function set(e) {
      if (!support.pip) return;
      var t = is.boolean(e) ? e : !this.pip;
      is.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? pip.active : pip.inactive), is.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
    }
  }], [{
    key: "supported",
    value: function supported(e, t, i) {
      return support.check(e, t, i);
    }
  }, {
    key: "loadSprite",
    value: function loadSprite(e, t) {
      return _loadSprite(e, t);
    }
  }, {
    key: "setup",
    value: function setup(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i = null;
      return is.string(e) ? i = Array.from(document.querySelectorAll(e)) : is.nodeList(e) ? i = Array.from(e) : is.array(e) && (i = e.filter(is.element)), is.empty(i) ? null : i.map(function (e) {
        return new Plyr(e, t);
      });
    }
  }]);

  return Plyr;
}();

Plyr.defaults = cloneDeep(defaults);var script = {
		name: 'VuePlyr',
		props: {
			/** Options object for plyr config. **/
			options: {
				type: Object,
				required: false,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				player: {}
			}
		},
		computed: {
			opts() {
				const options = this.options;
				if (
					!Object.prototype.hasOwnProperty.call(
						this.options,
						'hideYouTubeDOMError'
					)
				) {
					options.hideYouTubeDOMError = true;
				}
				return options
			}
		},
		mounted() {
			this.player = new Plyr(this.$el, this.opts);
		},
		beforeUnmount() {
			try {
				this.player.destroy();
			} catch (e) {
				if (
					!(
						this.opts.hideYouTubeDOMError &&
						e.message === 'The YouTube player is not attached to the DOM.'
					)
				) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		},
		render() {
			const slots = this.$slots.default;
			return typeof slots === 'function' ? slots()[0] : slots
		}
	};script.install = function (app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.plyr) {
    script.props.options.default = function () {
      return _objectSpread2$1({}, options.plyr);
    };
  }

  app.component(script.name, script);
};exports.default=script;//# sourceMappingURL=vue-plyr.ssr.js.map
