var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/commonjs/helpers.js
var require_helpers = __commonJS({
  "../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/commonjs/helpers.js"(exports) {
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwnProperty(obj, key) {
      return _hasOwnProperty.call(obj, key);
    }
    __name(hasOwnProperty, "hasOwnProperty");
    exports.hasOwnProperty = hasOwnProperty;
    function _objectKeys(obj) {
      if (Array.isArray(obj)) {
        var keys_1 = new Array(obj.length);
        for (var k = 0; k < keys_1.length; k++) {
          keys_1[k] = "" + k;
        }
        return keys_1;
      }
      if (Object.keys) {
        return Object.keys(obj);
      }
      var keys = [];
      for (var i in obj) {
        if (hasOwnProperty(obj, i)) {
          keys.push(i);
        }
      }
      return keys;
    }
    __name(_objectKeys, "_objectKeys");
    exports._objectKeys = _objectKeys;
    function _deepClone(obj) {
      switch (typeof obj) {
        case "object":
          return JSON.parse(JSON.stringify(obj));
        //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
        case "undefined":
          return null;
        //this is how JSON.stringify behaves for array items
        default:
          return obj;
      }
    }
    __name(_deepClone, "_deepClone");
    exports._deepClone = _deepClone;
    function isInteger(str) {
      var i = 0;
      var len = str.length;
      var charCode;
      while (i < len) {
        charCode = str.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
          i++;
          continue;
        }
        return false;
      }
      return true;
    }
    __name(isInteger, "isInteger");
    exports.isInteger = isInteger;
    function escapePathComponent(path) {
      if (path.indexOf("/") === -1 && path.indexOf("~") === -1)
        return path;
      return path.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    __name(escapePathComponent, "escapePathComponent");
    exports.escapePathComponent = escapePathComponent;
    function unescapePathComponent(path) {
      return path.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    __name(unescapePathComponent, "unescapePathComponent");
    exports.unescapePathComponent = unescapePathComponent;
    function _getPathRecursive(root, obj) {
      var found;
      for (var key in root) {
        if (hasOwnProperty(root, key)) {
          if (root[key] === obj) {
            return escapePathComponent(key) + "/";
          } else if (typeof root[key] === "object") {
            found = _getPathRecursive(root[key], obj);
            if (found != "") {
              return escapePathComponent(key) + "/" + found;
            }
          }
        }
      }
      return "";
    }
    __name(_getPathRecursive, "_getPathRecursive");
    exports._getPathRecursive = _getPathRecursive;
    function getPath(root, obj) {
      if (root === obj) {
        return "/";
      }
      var path = _getPathRecursive(root, obj);
      if (path === "") {
        throw new Error("Object not found in root");
      }
      return "/" + path;
    }
    __name(getPath, "getPath");
    exports.getPath = getPath;
    function hasUndefined(obj) {
      if (obj === void 0) {
        return true;
      }
      if (obj) {
        if (Array.isArray(obj)) {
          for (var i_1 = 0, len = obj.length; i_1 < len; i_1++) {
            if (hasUndefined(obj[i_1])) {
              return true;
            }
          }
        } else if (typeof obj === "object") {
          var objKeys = _objectKeys(obj);
          var objKeysLength = objKeys.length;
          for (var i = 0; i < objKeysLength; i++) {
            if (hasUndefined(obj[objKeys[i]])) {
              return true;
            }
          }
        }
      }
      return false;
    }
    __name(hasUndefined, "hasUndefined");
    exports.hasUndefined = hasUndefined;
    function patchErrorMessageFormatter(message2, args) {
      var messageParts = [message2];
      for (var key in args) {
        var value = typeof args[key] === "object" ? JSON.stringify(args[key], null, 2) : args[key];
        if (typeof value !== "undefined") {
          messageParts.push(key + ": " + value);
        }
      }
      return messageParts.join("\n");
    }
    __name(patchErrorMessageFormatter, "patchErrorMessageFormatter");
    var PatchError = (
      /** @class */
      (function(_super) {
        __extends(PatchError2, _super);
        function PatchError2(message2, name, index, operation, tree) {
          var _newTarget = this.constructor;
          var _this = _super.call(this, patchErrorMessageFormatter(message2, { name, index, operation, tree })) || this;
          _this.name = name;
          _this.index = index;
          _this.operation = operation;
          _this.tree = tree;
          Object.setPrototypeOf(_this, _newTarget.prototype);
          _this.message = patchErrorMessageFormatter(message2, { name, index, operation, tree });
          return _this;
        }
        __name(PatchError2, "PatchError");
        return PatchError2;
      })(Error)
    );
    exports.PatchError = PatchError;
  }
});

// ../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/commonjs/core.js
var require_core = __commonJS({
  "../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/commonjs/core.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var helpers_js_1 = require_helpers();
    exports.JsonPatchError = helpers_js_1.PatchError;
    exports.deepClone = helpers_js_1._deepClone;
    var objOps = {
      add: /* @__PURE__ */ __name(function(obj, key, document) {
        obj[key] = this.value;
        return { newDocument: document };
      }, "add"),
      remove: /* @__PURE__ */ __name(function(obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return { newDocument: document, removed };
      }, "remove"),
      replace: /* @__PURE__ */ __name(function(obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return { newDocument: document, removed };
      }, "replace"),
      move: /* @__PURE__ */ __name(function(obj, key, document) {
        var removed = getValueByPointer(document, this.path);
        if (removed) {
          removed = helpers_js_1._deepClone(removed);
        }
        var originalValue = applyOperation(document, { op: "remove", path: this.from }).removed;
        applyOperation(document, { op: "add", path: this.path, value: originalValue });
        return { newDocument: document, removed };
      }, "move"),
      copy: /* @__PURE__ */ __name(function(obj, key, document) {
        var valueToCopy = getValueByPointer(document, this.from);
        applyOperation(document, { op: "add", path: this.path, value: helpers_js_1._deepClone(valueToCopy) });
        return { newDocument: document };
      }, "copy"),
      test: /* @__PURE__ */ __name(function(obj, key, document) {
        return { newDocument: document, test: _areEquals(obj[key], this.value) };
      }, "test"),
      _get: /* @__PURE__ */ __name(function(obj, key, document) {
        this.value = obj[key];
        return { newDocument: document };
      }, "_get")
    };
    var arrOps = {
      add: /* @__PURE__ */ __name(function(arr, i, document) {
        if (helpers_js_1.isInteger(i)) {
          arr.splice(i, 0, this.value);
        } else {
          arr[i] = this.value;
        }
        return { newDocument: document, index: i };
      }, "add"),
      remove: /* @__PURE__ */ __name(function(arr, i, document) {
        var removedList = arr.splice(i, 1);
        return { newDocument: document, removed: removedList[0] };
      }, "remove"),
      replace: /* @__PURE__ */ __name(function(arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return { newDocument: document, removed };
      }, "replace"),
      move: objOps.move,
      copy: objOps.copy,
      test: objOps.test,
      _get: objOps._get
    };
    function getValueByPointer(document, pointer) {
      if (pointer == "") {
        return document;
      }
      var getOriginalDestination = { op: "_get", path: pointer };
      applyOperation(document, getOriginalDestination);
      return getOriginalDestination.value;
    }
    __name(getValueByPointer, "getValueByPointer");
    exports.getValueByPointer = getValueByPointer;
    function applyOperation(document, operation, validateOperation, mutateDocument, banPrototypeModifications, index) {
      if (validateOperation === void 0) {
        validateOperation = false;
      }
      if (mutateDocument === void 0) {
        mutateDocument = true;
      }
      if (banPrototypeModifications === void 0) {
        banPrototypeModifications = true;
      }
      if (index === void 0) {
        index = 0;
      }
      if (validateOperation) {
        if (typeof validateOperation == "function") {
          validateOperation(operation, 0, document, operation.path);
        } else {
          validator(operation, 0);
        }
      }
      if (operation.path === "") {
        var returnValue = { newDocument: document };
        if (operation.op === "add") {
          returnValue.newDocument = operation.value;
          return returnValue;
        } else if (operation.op === "replace") {
          returnValue.newDocument = operation.value;
          returnValue.removed = document;
          return returnValue;
        } else if (operation.op === "move" || operation.op === "copy") {
          returnValue.newDocument = getValueByPointer(document, operation.from);
          if (operation.op === "move") {
            returnValue.removed = document;
          }
          return returnValue;
        } else if (operation.op === "test") {
          returnValue.test = _areEquals(document, operation.value);
          if (returnValue.test === false) {
            throw new exports.JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
          }
          returnValue.newDocument = document;
          return returnValue;
        } else if (operation.op === "remove") {
          returnValue.removed = document;
          returnValue.newDocument = null;
          return returnValue;
        } else if (operation.op === "_get") {
          operation.value = document;
          return returnValue;
        } else {
          if (validateOperation) {
            throw new exports.JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
          } else {
            return returnValue;
          }
        }
      } else {
        if (!mutateDocument) {
          document = helpers_js_1._deepClone(document);
        }
        var path = operation.path || "";
        var keys = path.split("/");
        var obj = document;
        var t = 1;
        var len = keys.length;
        var existingPathFragment = void 0;
        var key = void 0;
        var validateFunction = void 0;
        if (typeof validateOperation == "function") {
          validateFunction = validateOperation;
        } else {
          validateFunction = validator;
        }
        while (true) {
          key = keys[t];
          if (key && key.indexOf("~") != -1) {
            key = helpers_js_1.unescapePathComponent(key);
          }
          if (banPrototypeModifications && (key == "__proto__" || key == "prototype" && t > 0 && keys[t - 1] == "constructor")) {
            throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
          }
          if (validateOperation) {
            if (existingPathFragment === void 0) {
              if (obj[key] === void 0) {
                existingPathFragment = keys.slice(0, t).join("/");
              } else if (t == len - 1) {
                existingPathFragment = operation.path;
              }
              if (existingPathFragment !== void 0) {
                validateFunction(operation, 0, document, existingPathFragment);
              }
            }
          }
          t++;
          if (Array.isArray(obj)) {
            if (key === "-") {
              key = obj.length;
            } else {
              if (validateOperation && !helpers_js_1.isInteger(key)) {
                throw new exports.JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index, operation, document);
              } else if (helpers_js_1.isInteger(key)) {
                key = ~~key;
              }
            }
            if (t >= len) {
              if (validateOperation && operation.op === "add" && key > obj.length) {
                throw new exports.JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index, operation, document);
              }
              var returnValue = arrOps[operation.op].call(operation, obj, key, document);
              if (returnValue.test === false) {
                throw new exports.JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
              }
              return returnValue;
            }
          } else {
            if (t >= len) {
              var returnValue = objOps[operation.op].call(operation, obj, key, document);
              if (returnValue.test === false) {
                throw new exports.JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
              }
              return returnValue;
            }
          }
          obj = obj[key];
          if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
            throw new exports.JsonPatchError("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
          }
        }
      }
    }
    __name(applyOperation, "applyOperation");
    exports.applyOperation = applyOperation;
    function applyPatch(document, patch, validateOperation, mutateDocument, banPrototypeModifications) {
      if (mutateDocument === void 0) {
        mutateDocument = true;
      }
      if (banPrototypeModifications === void 0) {
        banPrototypeModifications = true;
      }
      if (validateOperation) {
        if (!Array.isArray(patch)) {
          throw new exports.JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        }
      }
      if (!mutateDocument) {
        document = helpers_js_1._deepClone(document);
      }
      var results = new Array(patch.length);
      for (var i = 0, length_1 = patch.length; i < length_1; i++) {
        results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
        document = results[i].newDocument;
      }
      results.newDocument = document;
      return results;
    }
    __name(applyPatch, "applyPatch");
    exports.applyPatch = applyPatch;
    function applyReducer(document, operation, index) {
      var operationResult = applyOperation(document, operation);
      if (operationResult.test === false) {
        throw new exports.JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
      }
      return operationResult.newDocument;
    }
    __name(applyReducer, "applyReducer");
    exports.applyReducer = applyReducer;
    function validator(operation, index, document, existingPathFragment) {
      if (typeof operation !== "object" || operation === null || Array.isArray(operation)) {
        throw new exports.JsonPatchError("Operation is not an object", "OPERATION_NOT_AN_OBJECT", index, operation, document);
      } else if (!objOps[operation.op]) {
        throw new exports.JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
      } else if (typeof operation.path !== "string") {
        throw new exports.JsonPatchError("Operation `path` property is not a string", "OPERATION_PATH_INVALID", index, operation, document);
      } else if (operation.path.indexOf("/") !== 0 && operation.path.length > 0) {
        throw new exports.JsonPatchError('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", index, operation, document);
      } else if ((operation.op === "move" || operation.op === "copy") && typeof operation.from !== "string") {
        throw new exports.JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", index, operation, document);
      } else if ((operation.op === "add" || operation.op === "replace" || operation.op === "test") && operation.value === void 0) {
        throw new exports.JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", index, operation, document);
      } else if ((operation.op === "add" || operation.op === "replace" || operation.op === "test") && helpers_js_1.hasUndefined(operation.value)) {
        throw new exports.JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", index, operation, document);
      } else if (document) {
        if (operation.op == "add") {
          var pathLen = operation.path.split("/").length;
          var existingPathLen = existingPathFragment.split("/").length;
          if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
            throw new exports.JsonPatchError("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", index, operation, document);
          }
        } else if (operation.op === "replace" || operation.op === "remove" || operation.op === "_get") {
          if (operation.path !== existingPathFragment) {
            throw new exports.JsonPatchError("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
          }
        } else if (operation.op === "move" || operation.op === "copy") {
          var existingValue = { op: "_get", path: operation.from, value: void 0 };
          var error = validate([existingValue], document);
          if (error && error.name === "OPERATION_PATH_UNRESOLVABLE") {
            throw new exports.JsonPatchError("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", index, operation, document);
          }
        }
      }
    }
    __name(validator, "validator");
    exports.validator = validator;
    function validate(sequence, document, externalValidator) {
      try {
        if (!Array.isArray(sequence)) {
          throw new exports.JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        }
        if (document) {
          applyPatch(helpers_js_1._deepClone(document), helpers_js_1._deepClone(sequence), externalValidator || true);
        } else {
          externalValidator = externalValidator || validator;
          for (var i = 0; i < sequence.length; i++) {
            externalValidator(sequence[i], i, document, void 0);
          }
        }
      } catch (e) {
        if (e instanceof exports.JsonPatchError) {
          return e;
        } else {
          throw e;
        }
      }
    }
    __name(validate, "validate");
    exports.validate = validate;
    function _areEquals(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
        if (arrA && arrB) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!_areEquals(a[i], b[i]))
              return false;
          return true;
        }
        if (arrA != arrB)
          return false;
        var keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!b.hasOwnProperty(keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          key = keys[i];
          if (!_areEquals(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    __name(_areEquals, "_areEquals");
    exports._areEquals = _areEquals;
  }
});

// ../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/commonjs/duplex.js
var require_duplex = __commonJS({
  "../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/commonjs/duplex.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var helpers_js_1 = require_helpers();
    var core_js_1 = require_core();
    var beforeDict = /* @__PURE__ */ new WeakMap();
    var Mirror = (
      /** @class */
      /* @__PURE__ */ (function() {
        function Mirror2(obj) {
          this.observers = /* @__PURE__ */ new Map();
          this.obj = obj;
        }
        __name(Mirror2, "Mirror");
        return Mirror2;
      })()
    );
    var ObserverInfo = (
      /** @class */
      /* @__PURE__ */ (function() {
        function ObserverInfo2(callback, observer) {
          this.callback = callback;
          this.observer = observer;
        }
        __name(ObserverInfo2, "ObserverInfo");
        return ObserverInfo2;
      })()
    );
    function getMirror(obj) {
      return beforeDict.get(obj);
    }
    __name(getMirror, "getMirror");
    function getObserverFromMirror(mirror, callback) {
      return mirror.observers.get(callback);
    }
    __name(getObserverFromMirror, "getObserverFromMirror");
    function removeObserverFromMirror(mirror, observer) {
      mirror.observers.delete(observer.callback);
    }
    __name(removeObserverFromMirror, "removeObserverFromMirror");
    function unobserve(root, observer) {
      observer.unobserve();
    }
    __name(unobserve, "unobserve");
    exports.unobserve = unobserve;
    function observe(obj, callback) {
      var patches = [];
      var observer;
      var mirror = getMirror(obj);
      if (!mirror) {
        mirror = new Mirror(obj);
        beforeDict.set(obj, mirror);
      } else {
        var observerInfo = getObserverFromMirror(mirror, callback);
        observer = observerInfo && observerInfo.observer;
      }
      if (observer) {
        return observer;
      }
      observer = {};
      mirror.value = helpers_js_1._deepClone(obj);
      if (callback) {
        observer.callback = callback;
        observer.next = null;
        var dirtyCheck = /* @__PURE__ */ __name(function() {
          generate(observer);
        }, "dirtyCheck");
        var fastCheck = /* @__PURE__ */ __name(function() {
          clearTimeout(observer.next);
          observer.next = setTimeout(dirtyCheck);
        }, "fastCheck");
        if (typeof window !== "undefined") {
          window.addEventListener("mouseup", fastCheck);
          window.addEventListener("keyup", fastCheck);
          window.addEventListener("mousedown", fastCheck);
          window.addEventListener("keydown", fastCheck);
          window.addEventListener("change", fastCheck);
        }
      }
      observer.patches = patches;
      observer.object = obj;
      observer.unobserve = function() {
        generate(observer);
        clearTimeout(observer.next);
        removeObserverFromMirror(mirror, observer);
        if (typeof window !== "undefined") {
          window.removeEventListener("mouseup", fastCheck);
          window.removeEventListener("keyup", fastCheck);
          window.removeEventListener("mousedown", fastCheck);
          window.removeEventListener("keydown", fastCheck);
          window.removeEventListener("change", fastCheck);
        }
      };
      mirror.observers.set(callback, new ObserverInfo(callback, observer));
      return observer;
    }
    __name(observe, "observe");
    exports.observe = observe;
    function generate(observer, invertible) {
      if (invertible === void 0) {
        invertible = false;
      }
      var mirror = beforeDict.get(observer.object);
      _generate(mirror.value, observer.object, observer.patches, "", invertible);
      if (observer.patches.length) {
        core_js_1.applyPatch(mirror.value, observer.patches);
      }
      var temp = observer.patches;
      if (temp.length > 0) {
        observer.patches = [];
        if (observer.callback) {
          observer.callback(temp);
        }
      }
      return temp;
    }
    __name(generate, "generate");
    exports.generate = generate;
    function _generate(mirror, obj, patches, path, invertible) {
      if (obj === mirror) {
        return;
      }
      if (typeof obj.toJSON === "function") {
        obj = obj.toJSON();
      }
      var newKeys = helpers_js_1._objectKeys(obj);
      var oldKeys = helpers_js_1._objectKeys(mirror);
      var changed = false;
      var deleted = false;
      for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];
        if (helpers_js_1.hasOwnProperty(obj, key) && !(obj[key] === void 0 && oldVal !== void 0 && Array.isArray(obj) === false)) {
          var newVal = obj[key];
          if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null && Array.isArray(oldVal) === Array.isArray(newVal)) {
            _generate(oldVal, newVal, patches, path + "/" + helpers_js_1.escapePathComponent(key), invertible);
          } else {
            if (oldVal !== newVal) {
              changed = true;
              if (invertible) {
                patches.push({ op: "test", path: path + "/" + helpers_js_1.escapePathComponent(key), value: helpers_js_1._deepClone(oldVal) });
              }
              patches.push({ op: "replace", path: path + "/" + helpers_js_1.escapePathComponent(key), value: helpers_js_1._deepClone(newVal) });
            }
          }
        } else if (Array.isArray(mirror) === Array.isArray(obj)) {
          if (invertible) {
            patches.push({ op: "test", path: path + "/" + helpers_js_1.escapePathComponent(key), value: helpers_js_1._deepClone(oldVal) });
          }
          patches.push({ op: "remove", path: path + "/" + helpers_js_1.escapePathComponent(key) });
          deleted = true;
        } else {
          if (invertible) {
            patches.push({ op: "test", path, value: mirror });
          }
          patches.push({ op: "replace", path, value: obj });
          changed = true;
        }
      }
      if (!deleted && newKeys.length == oldKeys.length) {
        return;
      }
      for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!helpers_js_1.hasOwnProperty(mirror, key) && obj[key] !== void 0) {
          patches.push({ op: "add", path: path + "/" + helpers_js_1.escapePathComponent(key), value: helpers_js_1._deepClone(obj[key]) });
        }
      }
    }
    __name(_generate, "_generate");
    function compare2(tree1, tree2, invertible) {
      if (invertible === void 0) {
        invertible = false;
      }
      var patches = [];
      _generate(tree1, tree2, patches, "", invertible);
      return patches;
    }
    __name(compare2, "compare");
    exports.compare = compare2;
  }
});

// ../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/index.js
var require_fast_json_patch = __commonJS({
  "../../../node_modules/.pnpm/fast-json-patch@3.1.1/node_modules/fast-json-patch/index.js"(exports) {
    var core = require_core();
    Object.assign(exports, core);
    var duplex = require_duplex();
    Object.assign(exports, duplex);
    var helpers = require_helpers();
    exports.JsonPatchError = helpers.PatchError;
    exports.deepClone = helpers._deepClone;
    exports.escapePathComponent = helpers.escapePathComponent;
    exports.unescapePathComponent = helpers.unescapePathComponent;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dev/dist/xstate-dev.cjs.js
var require_xstate_dev_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dev/dist/xstate-dev.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getGlobal() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      }
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
    }
    __name(getGlobal, "getGlobal");
    function getDevTools() {
      const w = getGlobal();
      if (w.__xstate__) {
        return w.__xstate__;
      }
      return void 0;
    }
    __name(getDevTools, "getDevTools");
    function registerService(service) {
      if (typeof window === "undefined") {
        return;
      }
      const devTools = getDevTools();
      if (devTools) {
        devTools.register(service);
      }
    }
    __name(registerService, "registerService");
    var devToolsAdapter = /* @__PURE__ */ __name((service) => {
      if (typeof window === "undefined") {
        return;
      }
      const devTools = getDevTools();
      if (devTools) {
        devTools.register(service);
      }
    }, "devToolsAdapter");
    exports.devToolsAdapter = devToolsAdapter;
    exports.getGlobal = getGlobal;
    exports.registerService = registerService;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/raise-f23ccfcb.cjs.js
var require_raise_f23ccfcb_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/raise-f23ccfcb.cjs.js"(exports) {
    "use strict";
    var dev_dist_xstateDev = require_xstate_dev_cjs();
    var Mailbox = class {
      static {
        __name(this, "Mailbox");
      }
      constructor(_process) {
        this._process = _process;
        this._active = false;
        this._current = null;
        this._last = null;
      }
      start() {
        this._active = true;
        this.flush();
      }
      clear() {
        if (this._current) {
          this._current.next = null;
          this._last = this._current;
        }
      }
      enqueue(event) {
        const enqueued = {
          value: event,
          next: null
        };
        if (this._current) {
          this._last.next = enqueued;
          this._last = enqueued;
          return;
        }
        this._current = enqueued;
        this._last = enqueued;
        if (this._active) {
          this.flush();
        }
      }
      flush() {
        while (this._current) {
          const consumed = this._current;
          this._process(consumed.value);
          this._current = consumed.next;
        }
        this._last = null;
      }
    };
    var STATE_DELIMITER = ".";
    var TARGETLESS_KEY = "";
    var NULL_EVENT = "";
    var STATE_IDENTIFIER = "#";
    var WILDCARD = "*";
    var XSTATE_INIT = "xstate.init";
    var XSTATE_ERROR = "xstate.error";
    var XSTATE_STOP = "xstate.stop";
    function createAfterEvent(delayRef, id) {
      return {
        type: `xstate.after.${delayRef}.${id}`
      };
    }
    __name(createAfterEvent, "createAfterEvent");
    function createDoneStateEvent(id, output) {
      return {
        type: `xstate.done.state.${id}`,
        output
      };
    }
    __name(createDoneStateEvent, "createDoneStateEvent");
    function createDoneActorEvent(invokeId, output) {
      return {
        type: `xstate.done.actor.${invokeId}`,
        output,
        actorId: invokeId
      };
    }
    __name(createDoneActorEvent, "createDoneActorEvent");
    function createErrorActorEvent(id, error) {
      return {
        type: `xstate.error.actor.${id}`,
        error,
        actorId: id
      };
    }
    __name(createErrorActorEvent, "createErrorActorEvent");
    function createInitEvent(input) {
      return {
        type: XSTATE_INIT,
        input
      };
    }
    __name(createInitEvent, "createInitEvent");
    function reportUnhandledError(err) {
      setTimeout(() => {
        throw err;
      });
    }
    __name(reportUnhandledError, "reportUnhandledError");
    var symbolObservable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
    function matchesState2(parentStateId, childStateId) {
      const parentStateValue = toStateValue(parentStateId);
      const childStateValue = toStateValue(childStateId);
      if (typeof childStateValue === "string") {
        if (typeof parentStateValue === "string") {
          return childStateValue === parentStateValue;
        }
        return false;
      }
      if (typeof parentStateValue === "string") {
        return parentStateValue in childStateValue;
      }
      return Object.keys(parentStateValue).every((key) => {
        if (!(key in childStateValue)) {
          return false;
        }
        return matchesState2(parentStateValue[key], childStateValue[key]);
      });
    }
    __name(matchesState2, "matchesState");
    function toStatePath(stateId) {
      if (isArray(stateId)) {
        return stateId;
      }
      const result = [];
      let segment = "";
      for (let i = 0; i < stateId.length; i++) {
        const char = stateId.charCodeAt(i);
        switch (char) {
          // \
          case 92:
            segment += stateId[i + 1];
            i++;
            continue;
          // .
          case 46:
            result.push(segment);
            segment = "";
            continue;
        }
        segment += stateId[i];
      }
      result.push(segment);
      return result;
    }
    __name(toStatePath, "toStatePath");
    function toStateValue(stateValue) {
      if (isMachineSnapshot2(stateValue)) {
        return stateValue.value;
      }
      if (typeof stateValue !== "string") {
        return stateValue;
      }
      const statePath = toStatePath(stateValue);
      return pathToStateValue2(statePath);
    }
    __name(toStateValue, "toStateValue");
    function pathToStateValue2(statePath) {
      if (statePath.length === 1) {
        return statePath[0];
      }
      const value = {};
      let marker = value;
      for (let i = 0; i < statePath.length - 1; i++) {
        if (i === statePath.length - 2) {
          marker[statePath[i]] = statePath[i + 1];
        } else {
          const previous = marker;
          marker = {};
          previous[statePath[i]] = marker;
        }
      }
      return value;
    }
    __name(pathToStateValue2, "pathToStateValue");
    function mapValues(collection, iteratee) {
      const result = {};
      const collectionKeys = Object.keys(collection);
      for (let i = 0; i < collectionKeys.length; i++) {
        const key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
      }
      return result;
    }
    __name(mapValues, "mapValues");
    function toArrayStrict(value) {
      if (isArray(value)) {
        return value;
      }
      return [value];
    }
    __name(toArrayStrict, "toArrayStrict");
    function toArray(value) {
      if (value === void 0) {
        return [];
      }
      return toArrayStrict(value);
    }
    __name(toArray, "toArray");
    function resolveOutput(mapper, context, event, self2) {
      if (typeof mapper === "function") {
        return mapper({
          context,
          event,
          self: self2
        });
      }
      return mapper;
    }
    __name(resolveOutput, "resolveOutput");
    function isArray(value) {
      return Array.isArray(value);
    }
    __name(isArray, "isArray");
    function isErrorActorEvent(event) {
      return event.type.startsWith("xstate.error.actor");
    }
    __name(isErrorActorEvent, "isErrorActorEvent");
    function toTransitionConfigArray(configLike) {
      return toArrayStrict(configLike).map((transitionLike) => {
        if (typeof transitionLike === "undefined" || typeof transitionLike === "string") {
          return {
            target: transitionLike
          };
        }
        return transitionLike;
      });
    }
    __name(toTransitionConfigArray, "toTransitionConfigArray");
    function normalizeTarget(target) {
      if (target === void 0 || target === TARGETLESS_KEY) {
        return void 0;
      }
      return toArray(target);
    }
    __name(normalizeTarget, "normalizeTarget");
    function toObserver2(nextHandler, errorHandler, completionHandler) {
      const isObserver = typeof nextHandler === "object";
      const self2 = isObserver ? nextHandler : void 0;
      return {
        next: (isObserver ? nextHandler.next : nextHandler)?.bind(self2),
        error: (isObserver ? nextHandler.error : errorHandler)?.bind(self2),
        complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self2)
      };
    }
    __name(toObserver2, "toObserver");
    function createInvokeId(stateNodeId, index) {
      return `${index}.${stateNodeId}`;
    }
    __name(createInvokeId, "createInvokeId");
    function resolveReferencedActor(machine, src) {
      const match = src.match(/^xstate\.invoke\.(\d+)\.(.*)/);
      if (!match) {
        return machine.implementations.actors[src];
      }
      const [, indexStr, nodeId] = match;
      const node = machine.getStateNodeById(nodeId);
      const invokeConfig = node.config.invoke;
      return (Array.isArray(invokeConfig) ? invokeConfig[indexStr] : invokeConfig).src;
    }
    __name(resolveReferencedActor, "resolveReferencedActor");
    function getAllOwnEventDescriptors(snapshot) {
      return [.../* @__PURE__ */ new Set([...snapshot._nodes.flatMap((sn) => sn.ownEvents)])];
    }
    __name(getAllOwnEventDescriptors, "getAllOwnEventDescriptors");
    function matchesEventDescriptor(eventType, descriptor) {
      if (descriptor === eventType) {
        return true;
      }
      if (descriptor === WILDCARD) {
        return true;
      }
      if (!descriptor.endsWith(".*")) {
        return false;
      }
      const partialEventTokens = descriptor.split(".");
      const eventTokens = eventType.split(".");
      for (let tokenIndex = 0; tokenIndex < partialEventTokens.length; tokenIndex++) {
        const partialEventToken = partialEventTokens[tokenIndex];
        const eventToken = eventTokens[tokenIndex];
        if (partialEventToken === "*") {
          const isLastToken = tokenIndex === partialEventTokens.length - 1;
          return isLastToken;
        }
        if (partialEventToken !== eventToken) {
          return false;
        }
      }
      return true;
    }
    __name(matchesEventDescriptor, "matchesEventDescriptor");
    function createScheduledEventId(actorRef, id) {
      return `${actorRef.sessionId}.${id}`;
    }
    __name(createScheduledEventId, "createScheduledEventId");
    var idCounter = 0;
    function createSystem(rootActor, options) {
      const children = /* @__PURE__ */ new Map();
      const keyedActors = /* @__PURE__ */ new Map();
      const reverseKeyedActors = /* @__PURE__ */ new WeakMap();
      const inspectionObservers = /* @__PURE__ */ new Set();
      const timerMap = {};
      const {
        clock,
        logger
      } = options;
      const scheduler = {
        schedule: /* @__PURE__ */ __name((source, target, event, delay, id = Math.random().toString(36).slice(2)) => {
          const scheduledEvent = {
            source,
            target,
            event,
            delay,
            id,
            startedAt: Date.now()
          };
          const scheduledEventId = createScheduledEventId(source, id);
          system._snapshot._scheduledEvents[scheduledEventId] = scheduledEvent;
          const timeout = clock.setTimeout(() => {
            delete timerMap[scheduledEventId];
            delete system._snapshot._scheduledEvents[scheduledEventId];
            system._relay(source, target, event);
          }, delay);
          timerMap[scheduledEventId] = timeout;
        }, "schedule"),
        cancel: /* @__PURE__ */ __name((source, id) => {
          const scheduledEventId = createScheduledEventId(source, id);
          const timeout = timerMap[scheduledEventId];
          delete timerMap[scheduledEventId];
          delete system._snapshot._scheduledEvents[scheduledEventId];
          if (timeout !== void 0) {
            clock.clearTimeout(timeout);
          }
        }, "cancel"),
        cancelAll: /* @__PURE__ */ __name((actorRef) => {
          for (const scheduledEventId in system._snapshot._scheduledEvents) {
            const scheduledEvent = system._snapshot._scheduledEvents[scheduledEventId];
            if (scheduledEvent.source === actorRef) {
              scheduler.cancel(actorRef, scheduledEvent.id);
            }
          }
        }, "cancelAll")
      };
      const sendInspectionEvent = /* @__PURE__ */ __name((event) => {
        if (!inspectionObservers.size) {
          return;
        }
        const resolvedInspectionEvent = {
          ...event,
          rootId: rootActor.sessionId
        };
        inspectionObservers.forEach((observer) => observer.next?.(resolvedInspectionEvent));
      }, "sendInspectionEvent");
      const system = {
        _snapshot: {
          _scheduledEvents: (options?.snapshot && options.snapshot.scheduler) ?? {}
        },
        _bookId: /* @__PURE__ */ __name(() => `x:${idCounter++}`, "_bookId"),
        _register: /* @__PURE__ */ __name((sessionId, actorRef) => {
          children.set(sessionId, actorRef);
          return sessionId;
        }, "_register"),
        _unregister: /* @__PURE__ */ __name((actorRef) => {
          children.delete(actorRef.sessionId);
          const systemId = reverseKeyedActors.get(actorRef);
          if (systemId !== void 0) {
            keyedActors.delete(systemId);
            reverseKeyedActors.delete(actorRef);
          }
        }, "_unregister"),
        get: /* @__PURE__ */ __name((systemId) => {
          return keyedActors.get(systemId);
        }, "get"),
        getAll: /* @__PURE__ */ __name(() => {
          return Object.fromEntries(keyedActors.entries());
        }, "getAll"),
        _set: /* @__PURE__ */ __name((systemId, actorRef) => {
          const existing = keyedActors.get(systemId);
          if (existing && existing !== actorRef) {
            throw new Error(`Actor with system ID '${systemId}' already exists.`);
          }
          keyedActors.set(systemId, actorRef);
          reverseKeyedActors.set(actorRef, systemId);
        }, "_set"),
        inspect: /* @__PURE__ */ __name((observerOrFn) => {
          const observer = toObserver2(observerOrFn);
          inspectionObservers.add(observer);
          return {
            unsubscribe() {
              inspectionObservers.delete(observer);
            }
          };
        }, "inspect"),
        _sendInspectionEvent: sendInspectionEvent,
        _relay: /* @__PURE__ */ __name((source, target, event) => {
          system._sendInspectionEvent({
            type: "@xstate.event",
            sourceRef: source,
            actorRef: target,
            event
          });
          target._send(event);
        }, "_relay"),
        scheduler,
        getSnapshot: /* @__PURE__ */ __name(() => {
          return {
            _scheduledEvents: {
              ...system._snapshot._scheduledEvents
            }
          };
        }, "getSnapshot"),
        start: /* @__PURE__ */ __name(() => {
          const scheduledEvents = system._snapshot._scheduledEvents;
          system._snapshot._scheduledEvents = {};
          for (const scheduledId in scheduledEvents) {
            const {
              source,
              target,
              event,
              delay,
              id
            } = scheduledEvents[scheduledId];
            scheduler.schedule(source, target, event, delay, id);
          }
        }, "start"),
        _clock: clock,
        _logger: logger
      };
      return system;
    }
    __name(createSystem, "createSystem");
    var executingCustomAction = false;
    var $$ACTOR_TYPE = 1;
    var ProcessingStatus = /* @__PURE__ */ (function(ProcessingStatus2) {
      ProcessingStatus2[ProcessingStatus2["NotStarted"] = 0] = "NotStarted";
      ProcessingStatus2[ProcessingStatus2["Running"] = 1] = "Running";
      ProcessingStatus2[ProcessingStatus2["Stopped"] = 2] = "Stopped";
      return ProcessingStatus2;
    })({});
    var defaultOptions = {
      clock: {
        setTimeout: /* @__PURE__ */ __name((fn, ms) => {
          return setTimeout(fn, ms);
        }, "setTimeout"),
        clearTimeout: /* @__PURE__ */ __name((id) => {
          return clearTimeout(id);
        }, "clearTimeout")
      },
      logger: console.log.bind(console),
      devTools: false
    };
    var Actor2 = class {
      static {
        __name(this, "Actor");
      }
      /**
       * Creates a new actor instance for the given logic with the provided options,
       * if any.
       *
       * @param logic The logic to create an actor from
       * @param options Actor options
       */
      constructor(logic, options) {
        this.logic = logic;
        this._snapshot = void 0;
        this.clock = void 0;
        this.options = void 0;
        this.id = void 0;
        this.mailbox = new Mailbox(this._process.bind(this));
        this.observers = /* @__PURE__ */ new Set();
        this.eventListeners = /* @__PURE__ */ new Map();
        this.logger = void 0;
        this._processingStatus = ProcessingStatus.NotStarted;
        this._parent = void 0;
        this._syncSnapshot = void 0;
        this.ref = void 0;
        this._actorScope = void 0;
        this.systemId = void 0;
        this.sessionId = void 0;
        this.system = void 0;
        this._doneEvent = void 0;
        this.src = void 0;
        this._deferred = [];
        const resolvedOptions = {
          ...defaultOptions,
          ...options
        };
        const {
          clock,
          logger,
          parent,
          syncSnapshot,
          id,
          systemId,
          inspect
        } = resolvedOptions;
        this.system = parent ? parent.system : createSystem(this, {
          clock,
          logger
        });
        if (inspect && !parent) {
          this.system.inspect(toObserver2(inspect));
        }
        this.sessionId = this.system._bookId();
        this.id = id ?? this.sessionId;
        this.logger = options?.logger ?? this.system._logger;
        this.clock = options?.clock ?? this.system._clock;
        this._parent = parent;
        this._syncSnapshot = syncSnapshot;
        this.options = resolvedOptions;
        this.src = resolvedOptions.src ?? logic;
        this.ref = this;
        this._actorScope = {
          self: this,
          id: this.id,
          sessionId: this.sessionId,
          logger: this.logger,
          defer: /* @__PURE__ */ __name((fn) => {
            this._deferred.push(fn);
          }, "defer"),
          system: this.system,
          stopChild: /* @__PURE__ */ __name((child) => {
            if (child._parent !== this) {
              throw new Error(`Cannot stop child actor ${child.id} of ${this.id} because it is not a child`);
            }
            child._stop();
          }, "stopChild"),
          emit: /* @__PURE__ */ __name((emittedEvent) => {
            const listeners = this.eventListeners.get(emittedEvent.type);
            const wildcardListener = this.eventListeners.get("*");
            if (!listeners && !wildcardListener) {
              return;
            }
            const allListeners = [...listeners ? listeners.values() : [], ...wildcardListener ? wildcardListener.values() : []];
            for (const handler of allListeners) {
              try {
                handler(emittedEvent);
              } catch (err) {
                reportUnhandledError(err);
              }
            }
          }, "emit"),
          actionExecutor: /* @__PURE__ */ __name((action) => {
            const exec = /* @__PURE__ */ __name(() => {
              this._actorScope.system._sendInspectionEvent({
                type: "@xstate.action",
                actorRef: this,
                action: {
                  type: action.type,
                  params: action.params
                }
              });
              if (!action.exec) {
                return;
              }
              const saveExecutingCustomAction = executingCustomAction;
              try {
                executingCustomAction = true;
                action.exec(action.info, action.params);
              } finally {
                executingCustomAction = saveExecutingCustomAction;
              }
            }, "exec");
            if (this._processingStatus === ProcessingStatus.Running) {
              exec();
            } else {
              this._deferred.push(exec);
            }
          }, "actionExecutor")
        };
        this.send = this.send.bind(this);
        this.system._sendInspectionEvent({
          type: "@xstate.actor",
          actorRef: this
        });
        if (systemId) {
          this.systemId = systemId;
          this.system._set(systemId, this);
        }
        this._initState(options?.snapshot ?? options?.state);
        if (systemId && this._snapshot.status !== "active") {
          this.system._unregister(this);
        }
      }
      _initState(persistedState) {
        try {
          this._snapshot = persistedState ? this.logic.restoreSnapshot ? this.logic.restoreSnapshot(persistedState, this._actorScope) : persistedState : this.logic.getInitialSnapshot(this._actorScope, this.options?.input);
        } catch (err) {
          this._snapshot = {
            status: "error",
            output: void 0,
            error: err
          };
        }
      }
      update(snapshot, event) {
        this._snapshot = snapshot;
        let deferredFn;
        while (deferredFn = this._deferred.shift()) {
          try {
            deferredFn();
          } catch (err) {
            this._deferred.length = 0;
            this._snapshot = {
              ...snapshot,
              status: "error",
              error: err
            };
          }
        }
        switch (this._snapshot.status) {
          case "active":
            for (const observer of this.observers) {
              try {
                observer.next?.(snapshot);
              } catch (err) {
                reportUnhandledError(err);
              }
            }
            break;
          case "done":
            for (const observer of this.observers) {
              try {
                observer.next?.(snapshot);
              } catch (err) {
                reportUnhandledError(err);
              }
            }
            this._stopProcedure();
            this._complete();
            this._doneEvent = createDoneActorEvent(this.id, this._snapshot.output);
            if (this._parent) {
              this.system._relay(this, this._parent, this._doneEvent);
            }
            break;
          case "error":
            this._error(this._snapshot.error);
            break;
        }
        this.system._sendInspectionEvent({
          type: "@xstate.snapshot",
          actorRef: this,
          event,
          snapshot
        });
      }
      /**
       * Subscribe an observer to an actor’s snapshot values.
       *
       * @remarks
       * The observer will receive the actor’s snapshot value when it is emitted.
       * The observer can be:
       *
       * - A plain function that receives the latest snapshot, or
       * - An observer object whose `.next(snapshot)` method receives the latest
       *   snapshot
       *
       * @example
       *
       * ```ts
       * // Observer as a plain function
       * const subscription = actor.subscribe((snapshot) => {
       *   console.log(snapshot);
       * });
       * ```
       *
       * @example
       *
       * ```ts
       * // Observer as an object
       * const subscription = actor.subscribe({
       *   next(snapshot) {
       *     console.log(snapshot);
       *   },
       *   error(err) {
       *     // ...
       *   },
       *   complete() {
       *     // ...
       *   }
       * });
       * ```
       *
       * The return value of `actor.subscribe(observer)` is a subscription object
       * that has an `.unsubscribe()` method. You can call
       * `subscription.unsubscribe()` to unsubscribe the observer:
       *
       * @example
       *
       * ```ts
       * const subscription = actor.subscribe((snapshot) => {
       *   // ...
       * });
       *
       * // Unsubscribe the observer
       * subscription.unsubscribe();
       * ```
       *
       * When the actor is stopped, all of its observers will automatically be
       * unsubscribed.
       *
       * @param observer - Either a plain function that receives the latest
       *   snapshot, or an observer object whose `.next(snapshot)` method receives
       *   the latest snapshot
       */
      subscribe(nextListenerOrObserver, errorListener, completeListener) {
        const observer = toObserver2(nextListenerOrObserver, errorListener, completeListener);
        if (this._processingStatus !== ProcessingStatus.Stopped) {
          this.observers.add(observer);
        } else {
          switch (this._snapshot.status) {
            case "done":
              try {
                observer.complete?.();
              } catch (err) {
                reportUnhandledError(err);
              }
              break;
            case "error": {
              const err = this._snapshot.error;
              if (!observer.error) {
                reportUnhandledError(err);
              } else {
                try {
                  observer.error(err);
                } catch (err2) {
                  reportUnhandledError(err2);
                }
              }
              break;
            }
          }
        }
        return {
          unsubscribe: /* @__PURE__ */ __name(() => {
            this.observers.delete(observer);
          }, "unsubscribe")
        };
      }
      on(type, handler) {
        let listeners = this.eventListeners.get(type);
        if (!listeners) {
          listeners = /* @__PURE__ */ new Set();
          this.eventListeners.set(type, listeners);
        }
        const wrappedHandler = handler.bind(void 0);
        listeners.add(wrappedHandler);
        return {
          unsubscribe: /* @__PURE__ */ __name(() => {
            listeners.delete(wrappedHandler);
          }, "unsubscribe")
        };
      }
      /** Starts the Actor from the initial state */
      start() {
        if (this._processingStatus === ProcessingStatus.Running) {
          return this;
        }
        if (this._syncSnapshot) {
          this.subscribe({
            next: /* @__PURE__ */ __name((snapshot) => {
              if (snapshot.status === "active") {
                this.system._relay(this, this._parent, {
                  type: `xstate.snapshot.${this.id}`,
                  snapshot
                });
              }
            }, "next"),
            error: /* @__PURE__ */ __name(() => {
            }, "error")
          });
        }
        this.system._register(this.sessionId, this);
        if (this.systemId) {
          this.system._set(this.systemId, this);
        }
        this._processingStatus = ProcessingStatus.Running;
        const initEvent = createInitEvent(this.options.input);
        this.system._sendInspectionEvent({
          type: "@xstate.event",
          sourceRef: this._parent,
          actorRef: this,
          event: initEvent
        });
        const status = this._snapshot.status;
        switch (status) {
          case "done":
            this.update(this._snapshot, initEvent);
            return this;
          case "error":
            this._error(this._snapshot.error);
            return this;
        }
        if (!this._parent) {
          this.system.start();
        }
        if (this.logic.start) {
          try {
            this.logic.start(this._snapshot, this._actorScope);
          } catch (err) {
            this._snapshot = {
              ...this._snapshot,
              status: "error",
              error: err
            };
            this._error(err);
            return this;
          }
        }
        this.update(this._snapshot, initEvent);
        if (this.options.devTools) {
          this.attachDevTools();
        }
        this.mailbox.start();
        return this;
      }
      _process(event) {
        let nextState;
        let caughtError;
        try {
          nextState = this.logic.transition(this._snapshot, event, this._actorScope);
        } catch (err) {
          caughtError = {
            err
          };
        }
        if (caughtError) {
          const {
            err
          } = caughtError;
          this._snapshot = {
            ...this._snapshot,
            status: "error",
            error: err
          };
          this._error(err);
          return;
        }
        this.update(nextState, event);
        if (event.type === XSTATE_STOP) {
          this._stopProcedure();
          this._complete();
        }
      }
      _stop() {
        if (this._processingStatus === ProcessingStatus.Stopped) {
          return this;
        }
        this.mailbox.clear();
        if (this._processingStatus === ProcessingStatus.NotStarted) {
          this._processingStatus = ProcessingStatus.Stopped;
          return this;
        }
        this.mailbox.enqueue({
          type: XSTATE_STOP
        });
        return this;
      }
      /** Stops the Actor and unsubscribe all listeners. */
      stop() {
        if (this._parent) {
          throw new Error("A non-root actor cannot be stopped directly.");
        }
        return this._stop();
      }
      _complete() {
        for (const observer of this.observers) {
          try {
            observer.complete?.();
          } catch (err) {
            reportUnhandledError(err);
          }
        }
        this.observers.clear();
        this.eventListeners.clear();
      }
      _reportError(err) {
        if (!this.observers.size) {
          if (!this._parent) {
            reportUnhandledError(err);
          }
          this.eventListeners.clear();
          return;
        }
        let reportError = false;
        for (const observer of this.observers) {
          const errorListener = observer.error;
          reportError ||= !errorListener;
          try {
            errorListener?.(err);
          } catch (err2) {
            reportUnhandledError(err2);
          }
        }
        this.observers.clear();
        this.eventListeners.clear();
        if (reportError) {
          reportUnhandledError(err);
        }
      }
      _error(err) {
        this._stopProcedure();
        this._reportError(err);
        if (this._parent) {
          this.system._relay(this, this._parent, createErrorActorEvent(this.id, err));
        }
      }
      // TODO: atm children don't belong entirely to the actor so
      // in a way - it's not even super aware of them
      // so we can't stop them from here but we really should!
      // right now, they are being stopped within the machine's transition
      // but that could throw and leave us with "orphaned" active actors
      _stopProcedure() {
        if (this._processingStatus !== ProcessingStatus.Running) {
          return this;
        }
        this.system.scheduler.cancelAll(this);
        this.mailbox.clear();
        this.mailbox = new Mailbox(this._process.bind(this));
        this._processingStatus = ProcessingStatus.Stopped;
        this.system._unregister(this);
        return this;
      }
      /** @internal */
      _send(event) {
        if (this._processingStatus === ProcessingStatus.Stopped) {
          return;
        }
        this.mailbox.enqueue(event);
      }
      /**
       * Sends an event to the running Actor to trigger a transition.
       *
       * @param event The event to send
       */
      send(event) {
        this.system._relay(void 0, this, event);
      }
      attachDevTools() {
        const {
          devTools
        } = this.options;
        if (devTools) {
          const resolvedDevToolsAdapter = typeof devTools === "function" ? devTools : dev_dist_xstateDev.devToolsAdapter;
          resolvedDevToolsAdapter(this);
        }
      }
      toJSON() {
        return {
          xstate$$type: $$ACTOR_TYPE,
          id: this.id
        };
      }
      /**
       * Obtain the internal state of the actor, which can be persisted.
       *
       * @remarks
       * The internal state can be persisted from any actor, not only machines.
       *
       * Note that the persisted state is not the same as the snapshot from
       * {@link Actor.getSnapshot}. Persisted state represents the internal state of
       * the actor, while snapshots represent the actor's last emitted value.
       *
       * Can be restored with {@link ActorOptions.state}
       * @see https://stately.ai/docs/persistence
       */
      getPersistedSnapshot(options) {
        return this.logic.getPersistedSnapshot(this._snapshot, options);
      }
      [symbolObservable]() {
        return this;
      }
      /**
       * Read an actor’s snapshot synchronously.
       *
       * @remarks
       * The snapshot represent an actor's last emitted value.
       *
       * When an actor receives an event, its internal state may change. An actor
       * may emit a snapshot when a state transition occurs.
       *
       * Note that some actors, such as callback actors generated with
       * `fromCallback`, will not emit snapshots.
       * @see {@link Actor.subscribe} to subscribe to an actor’s snapshot values.
       * @see {@link Actor.getPersistedSnapshot} to persist the internal state of an actor (which is more than just a snapshot).
       */
      getSnapshot() {
        return this._snapshot;
      }
    };
    function createActor2(logic, ...[options]) {
      return new Actor2(logic, options);
    }
    __name(createActor2, "createActor");
    var interpret2 = createActor2;
    function resolveCancel(_, snapshot, actionArgs, actionParams, {
      sendId
    }) {
      const resolvedSendId = typeof sendId === "function" ? sendId(actionArgs, actionParams) : sendId;
      return [snapshot, {
        sendId: resolvedSendId
      }, void 0];
    }
    __name(resolveCancel, "resolveCancel");
    function executeCancel(actorScope, params) {
      actorScope.defer(() => {
        actorScope.system.scheduler.cancel(actorScope.self, params.sendId);
      });
    }
    __name(executeCancel, "executeCancel");
    function cancel2(sendId) {
      function cancel3(_args, _params) {
      }
      __name(cancel3, "cancel");
      cancel3.type = "xstate.cancel";
      cancel3.sendId = sendId;
      cancel3.resolve = resolveCancel;
      cancel3.execute = executeCancel;
      return cancel3;
    }
    __name(cancel2, "cancel");
    function resolveSpawn(actorScope, snapshot, actionArgs, _actionParams, {
      id,
      systemId,
      src,
      input,
      syncSnapshot
    }) {
      const logic = typeof src === "string" ? resolveReferencedActor(snapshot.machine, src) : src;
      const resolvedId = typeof id === "function" ? id(actionArgs) : id;
      let actorRef;
      let resolvedInput = void 0;
      if (logic) {
        resolvedInput = typeof input === "function" ? input({
          context: snapshot.context,
          event: actionArgs.event,
          self: actorScope.self
        }) : input;
        actorRef = createActor2(logic, {
          id: resolvedId,
          src,
          parent: actorScope.self,
          syncSnapshot,
          systemId,
          input: resolvedInput
        });
      }
      return [cloneMachineSnapshot(snapshot, {
        children: {
          ...snapshot.children,
          [resolvedId]: actorRef
        }
      }), {
        id,
        systemId,
        actorRef,
        src,
        input: resolvedInput
      }, void 0];
    }
    __name(resolveSpawn, "resolveSpawn");
    function executeSpawn(actorScope, {
      actorRef
    }) {
      if (!actorRef) {
        return;
      }
      actorScope.defer(() => {
        if (actorRef._processingStatus === ProcessingStatus.Stopped) {
          return;
        }
        actorRef.start();
      });
    }
    __name(executeSpawn, "executeSpawn");
    function spawnChild2(...[src, {
      id,
      systemId,
      input,
      syncSnapshot = false
    } = {}]) {
      function spawnChild3(_args, _params) {
      }
      __name(spawnChild3, "spawnChild");
      spawnChild3.type = "xstate.spawnChild";
      spawnChild3.id = id;
      spawnChild3.systemId = systemId;
      spawnChild3.src = src;
      spawnChild3.input = input;
      spawnChild3.syncSnapshot = syncSnapshot;
      spawnChild3.resolve = resolveSpawn;
      spawnChild3.execute = executeSpawn;
      return spawnChild3;
    }
    __name(spawnChild2, "spawnChild");
    function resolveStop(_, snapshot, args, actionParams, {
      actorRef
    }) {
      const actorRefOrString = typeof actorRef === "function" ? actorRef(args, actionParams) : actorRef;
      const resolvedActorRef = typeof actorRefOrString === "string" ? snapshot.children[actorRefOrString] : actorRefOrString;
      let children = snapshot.children;
      if (resolvedActorRef) {
        children = {
          ...children
        };
        delete children[resolvedActorRef.id];
      }
      return [cloneMachineSnapshot(snapshot, {
        children
      }), resolvedActorRef, void 0];
    }
    __name(resolveStop, "resolveStop");
    function unregisterRecursively(actorScope, actorRef) {
      const snapshot = actorRef.getSnapshot();
      if (snapshot && "children" in snapshot) {
        for (const child of Object.values(snapshot.children)) {
          unregisterRecursively(actorScope, child);
        }
      }
      actorScope.system._unregister(actorRef);
    }
    __name(unregisterRecursively, "unregisterRecursively");
    function executeStop(actorScope, actorRef) {
      if (!actorRef) {
        return;
      }
      unregisterRecursively(actorScope, actorRef);
      if (actorRef._processingStatus !== ProcessingStatus.Running) {
        actorScope.stopChild(actorRef);
        return;
      }
      actorScope.defer(() => {
        actorScope.stopChild(actorRef);
      });
    }
    __name(executeStop, "executeStop");
    function stopChild2(actorRef) {
      function stop3(_args, _params) {
      }
      __name(stop3, "stop");
      stop3.type = "xstate.stopChild";
      stop3.actorRef = actorRef;
      stop3.resolve = resolveStop;
      stop3.execute = executeStop;
      return stop3;
    }
    __name(stopChild2, "stopChild");
    var stop2 = stopChild2;
    function checkStateIn(snapshot, _, {
      stateValue
    }) {
      if (typeof stateValue === "string" && isStateId(stateValue)) {
        const target = snapshot.machine.getStateNodeById(stateValue);
        return snapshot._nodes.some((sn) => sn === target);
      }
      return snapshot.matches(stateValue);
    }
    __name(checkStateIn, "checkStateIn");
    function stateIn2(stateValue) {
      function stateIn3() {
        return false;
      }
      __name(stateIn3, "stateIn");
      stateIn3.check = checkStateIn;
      stateIn3.stateValue = stateValue;
      return stateIn3;
    }
    __name(stateIn2, "stateIn");
    function checkNot(snapshot, {
      context,
      event
    }, {
      guards
    }) {
      return !evaluateGuard(guards[0], context, event, snapshot);
    }
    __name(checkNot, "checkNot");
    function not2(guard) {
      function not3(_args, _params) {
        return false;
      }
      __name(not3, "not");
      not3.check = checkNot;
      not3.guards = [guard];
      return not3;
    }
    __name(not2, "not");
    function checkAnd(snapshot, {
      context,
      event
    }, {
      guards
    }) {
      return guards.every((guard) => evaluateGuard(guard, context, event, snapshot));
    }
    __name(checkAnd, "checkAnd");
    function and2(guards) {
      function and3(_args, _params) {
        return false;
      }
      __name(and3, "and");
      and3.check = checkAnd;
      and3.guards = guards;
      return and3;
    }
    __name(and2, "and");
    function checkOr(snapshot, {
      context,
      event
    }, {
      guards
    }) {
      return guards.some((guard) => evaluateGuard(guard, context, event, snapshot));
    }
    __name(checkOr, "checkOr");
    function or2(guards) {
      function or3(_args, _params) {
        return false;
      }
      __name(or3, "or");
      or3.check = checkOr;
      or3.guards = guards;
      return or3;
    }
    __name(or2, "or");
    function evaluateGuard(guard, context, event, snapshot) {
      const {
        machine
      } = snapshot;
      const isInline = typeof guard === "function";
      const resolved = isInline ? guard : machine.implementations.guards[typeof guard === "string" ? guard : guard.type];
      if (!isInline && !resolved) {
        throw new Error(`Guard '${typeof guard === "string" ? guard : guard.type}' is not implemented.'.`);
      }
      if (typeof resolved !== "function") {
        return evaluateGuard(resolved, context, event, snapshot);
      }
      const guardArgs = {
        context,
        event
      };
      const guardParams = isInline || typeof guard === "string" ? void 0 : "params" in guard ? typeof guard.params === "function" ? guard.params({
        context,
        event
      }) : guard.params : void 0;
      if (!("check" in resolved)) {
        return resolved(guardArgs, guardParams);
      }
      const builtinGuard = resolved;
      return builtinGuard.check(
        snapshot,
        guardArgs,
        resolved
        // this holds all params
      );
    }
    __name(evaluateGuard, "evaluateGuard");
    function isAtomicStateNode(stateNode) {
      return stateNode.type === "atomic" || stateNode.type === "final";
    }
    __name(isAtomicStateNode, "isAtomicStateNode");
    function getChildren(stateNode) {
      return Object.values(stateNode.states).filter((sn) => sn.type !== "history");
    }
    __name(getChildren, "getChildren");
    function getProperAncestors(stateNode, toStateNode) {
      const ancestors = [];
      if (toStateNode === stateNode) {
        return ancestors;
      }
      let m = stateNode.parent;
      while (m && m !== toStateNode) {
        ancestors.push(m);
        m = m.parent;
      }
      return ancestors;
    }
    __name(getProperAncestors, "getProperAncestors");
    function getAllStateNodes(stateNodes) {
      const nodeSet = new Set(stateNodes);
      const adjList = getAdjList(nodeSet);
      for (const s of nodeSet) {
        if (s.type === "compound" && (!adjList.get(s) || !adjList.get(s).length)) {
          getInitialStateNodesWithTheirAncestors(s).forEach((sn) => nodeSet.add(sn));
        } else {
          if (s.type === "parallel") {
            for (const child of getChildren(s)) {
              if (child.type === "history") {
                continue;
              }
              if (!nodeSet.has(child)) {
                const initialStates = getInitialStateNodesWithTheirAncestors(child);
                for (const initialStateNode of initialStates) {
                  nodeSet.add(initialStateNode);
                }
              }
            }
          }
        }
      }
      for (const s of nodeSet) {
        let m = s.parent;
        while (m) {
          nodeSet.add(m);
          m = m.parent;
        }
      }
      return nodeSet;
    }
    __name(getAllStateNodes, "getAllStateNodes");
    function getValueFromAdj(baseNode, adjList) {
      const childStateNodes = adjList.get(baseNode);
      if (!childStateNodes) {
        return {};
      }
      if (baseNode.type === "compound") {
        const childStateNode = childStateNodes[0];
        if (childStateNode) {
          if (isAtomicStateNode(childStateNode)) {
            return childStateNode.key;
          }
        } else {
          return {};
        }
      }
      const stateValue = {};
      for (const childStateNode of childStateNodes) {
        stateValue[childStateNode.key] = getValueFromAdj(childStateNode, adjList);
      }
      return stateValue;
    }
    __name(getValueFromAdj, "getValueFromAdj");
    function getAdjList(stateNodes) {
      const adjList = /* @__PURE__ */ new Map();
      for (const s of stateNodes) {
        if (!adjList.has(s)) {
          adjList.set(s, []);
        }
        if (s.parent) {
          if (!adjList.has(s.parent)) {
            adjList.set(s.parent, []);
          }
          adjList.get(s.parent).push(s);
        }
      }
      return adjList;
    }
    __name(getAdjList, "getAdjList");
    function getStateValue(rootNode, stateNodes) {
      const config = getAllStateNodes(stateNodes);
      return getValueFromAdj(rootNode, getAdjList(config));
    }
    __name(getStateValue, "getStateValue");
    function isInFinalState(stateNodeSet, stateNode) {
      if (stateNode.type === "compound") {
        return getChildren(stateNode).some((s) => s.type === "final" && stateNodeSet.has(s));
      }
      if (stateNode.type === "parallel") {
        return getChildren(stateNode).every((sn) => isInFinalState(stateNodeSet, sn));
      }
      return stateNode.type === "final";
    }
    __name(isInFinalState, "isInFinalState");
    var isStateId = /* @__PURE__ */ __name((str) => str[0] === STATE_IDENTIFIER, "isStateId");
    function getCandidates(stateNode, receivedEventType) {
      const candidates = stateNode.transitions.get(receivedEventType) || [...stateNode.transitions.keys()].filter((eventDescriptor) => matchesEventDescriptor(receivedEventType, eventDescriptor)).sort((a, b) => b.length - a.length).flatMap((key) => stateNode.transitions.get(key));
      return candidates;
    }
    __name(getCandidates, "getCandidates");
    function getDelayedTransitions(stateNode) {
      const afterConfig = stateNode.config.after;
      if (!afterConfig) {
        return [];
      }
      const mutateEntryExit = /* @__PURE__ */ __name((delay) => {
        const afterEvent = createAfterEvent(delay, stateNode.id);
        const eventType = afterEvent.type;
        stateNode.entry.push(raise2(afterEvent, {
          id: eventType,
          delay
        }));
        stateNode.exit.push(cancel2(eventType));
        return eventType;
      }, "mutateEntryExit");
      const delayedTransitions = Object.keys(afterConfig).flatMap((delay) => {
        const configTransition = afterConfig[delay];
        const resolvedTransition = typeof configTransition === "string" ? {
          target: configTransition
        } : configTransition;
        const resolvedDelay = Number.isNaN(+delay) ? delay : +delay;
        const eventType = mutateEntryExit(resolvedDelay);
        return toArray(resolvedTransition).map((transition2) => ({
          ...transition2,
          event: eventType,
          delay: resolvedDelay
        }));
      });
      return delayedTransitions.map((delayedTransition) => {
        const {
          delay
        } = delayedTransition;
        return {
          ...formatTransition(stateNode, delayedTransition.event, delayedTransition),
          delay
        };
      });
    }
    __name(getDelayedTransitions, "getDelayedTransitions");
    function formatTransition(stateNode, descriptor, transitionConfig) {
      const normalizedTarget = normalizeTarget(transitionConfig.target);
      const reenter = transitionConfig.reenter ?? false;
      const target = resolveTarget(stateNode, normalizedTarget);
      const transition2 = {
        ...transitionConfig,
        actions: toArray(transitionConfig.actions),
        guard: transitionConfig.guard,
        target,
        source: stateNode,
        reenter,
        eventType: descriptor,
        toJSON: /* @__PURE__ */ __name(() => ({
          ...transition2,
          source: `#${stateNode.id}`,
          target: target ? target.map((t) => `#${t.id}`) : void 0
        }), "toJSON")
      };
      return transition2;
    }
    __name(formatTransition, "formatTransition");
    function formatTransitions(stateNode) {
      const transitions = /* @__PURE__ */ new Map();
      if (stateNode.config.on) {
        for (const descriptor of Object.keys(stateNode.config.on)) {
          if (descriptor === NULL_EVENT) {
            throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
          }
          const transitionsConfig = stateNode.config.on[descriptor];
          transitions.set(descriptor, toTransitionConfigArray(transitionsConfig).map((t) => formatTransition(stateNode, descriptor, t)));
        }
      }
      if (stateNode.config.onDone) {
        const descriptor = `xstate.done.state.${stateNode.id}`;
        transitions.set(descriptor, toTransitionConfigArray(stateNode.config.onDone).map((t) => formatTransition(stateNode, descriptor, t)));
      }
      for (const invokeDef of stateNode.invoke) {
        if (invokeDef.onDone) {
          const descriptor = `xstate.done.actor.${invokeDef.id}`;
          transitions.set(descriptor, toTransitionConfigArray(invokeDef.onDone).map((t) => formatTransition(stateNode, descriptor, t)));
        }
        if (invokeDef.onError) {
          const descriptor = `xstate.error.actor.${invokeDef.id}`;
          transitions.set(descriptor, toTransitionConfigArray(invokeDef.onError).map((t) => formatTransition(stateNode, descriptor, t)));
        }
        if (invokeDef.onSnapshot) {
          const descriptor = `xstate.snapshot.${invokeDef.id}`;
          transitions.set(descriptor, toTransitionConfigArray(invokeDef.onSnapshot).map((t) => formatTransition(stateNode, descriptor, t)));
        }
      }
      for (const delayedTransition of stateNode.after) {
        let existing = transitions.get(delayedTransition.eventType);
        if (!existing) {
          existing = [];
          transitions.set(delayedTransition.eventType, existing);
        }
        existing.push(delayedTransition);
      }
      return transitions;
    }
    __name(formatTransitions, "formatTransitions");
    function formatRouteTransitions(rootStateNode) {
      const routeTransitions = [];
      const collectRoutes = /* @__PURE__ */ __name((states) => {
        Object.values(states).forEach((sn) => {
          if (sn.config.route && sn.config.id) {
            const routeId = sn.config.id;
            const userGuard = sn.config.route.guard;
            const routeGuard = /* @__PURE__ */ __name((args, params) => {
              if (args.event.to !== `#${routeId}`) {
                return false;
              }
              if (!userGuard) {
                return true;
              }
              if (typeof userGuard === "function") {
                return userGuard(args, params);
              }
              return true;
            }, "routeGuard");
            const transition2 = {
              ...sn.config.route,
              guard: routeGuard,
              target: `#${routeId}`
            };
            routeTransitions.push(formatTransition(rootStateNode, "xstate.route", transition2));
          }
          if (sn.states) {
            collectRoutes(sn.states);
          }
        });
      }, "collectRoutes");
      collectRoutes(rootStateNode.states);
      if (routeTransitions.length > 0) {
        rootStateNode.transitions.set("xstate.route", routeTransitions);
      }
    }
    __name(formatRouteTransitions, "formatRouteTransitions");
    function formatInitialTransition(stateNode, _target) {
      const resolvedTarget = typeof _target === "string" ? stateNode.states[_target] : _target ? stateNode.states[_target.target] : void 0;
      if (!resolvedTarget && _target) {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
          `Initial state node "${_target}" not found on parent state node #${stateNode.id}`
        );
      }
      const transition2 = {
        source: stateNode,
        actions: !_target || typeof _target === "string" ? [] : toArray(_target.actions),
        eventType: null,
        reenter: false,
        target: resolvedTarget ? [resolvedTarget] : [],
        toJSON: /* @__PURE__ */ __name(() => ({
          ...transition2,
          source: `#${stateNode.id}`,
          target: resolvedTarget ? [`#${resolvedTarget.id}`] : []
        }), "toJSON")
      };
      return transition2;
    }
    __name(formatInitialTransition, "formatInitialTransition");
    function resolveTarget(stateNode, targets) {
      if (targets === void 0) {
        return void 0;
      }
      return targets.map((target) => {
        if (typeof target !== "string") {
          return target;
        }
        if (isStateId(target)) {
          return stateNode.machine.getStateNodeById(target);
        }
        const isInternalTarget = target[0] === STATE_DELIMITER;
        if (isInternalTarget && !stateNode.parent) {
          return getStateNodeByPath(stateNode, target.slice(1));
        }
        const resolvedTarget = isInternalTarget ? stateNode.key + target : target;
        if (stateNode.parent) {
          try {
            const targetStateNode = getStateNodeByPath(stateNode.parent, resolvedTarget);
            return targetStateNode;
          } catch (err) {
            throw new Error(`Invalid transition definition for state node '${stateNode.id}':
${err.message}`);
          }
        } else {
          throw new Error(`Invalid target: "${target}" is not a valid target from the root node. Did you mean ".${target}"?`);
        }
      });
    }
    __name(resolveTarget, "resolveTarget");
    function resolveHistoryDefaultTransition(stateNode) {
      const normalizedTarget = normalizeTarget(stateNode.config.target);
      if (!normalizedTarget) {
        return stateNode.parent.initial;
      }
      return {
        target: normalizedTarget.map((t) => typeof t === "string" ? getStateNodeByPath(stateNode.parent, t) : t)
      };
    }
    __name(resolveHistoryDefaultTransition, "resolveHistoryDefaultTransition");
    function isHistoryNode(stateNode) {
      return stateNode.type === "history";
    }
    __name(isHistoryNode, "isHistoryNode");
    function getInitialStateNodesWithTheirAncestors(stateNode) {
      const states = getInitialStateNodes(stateNode);
      for (const initialState of states) {
        for (const ancestor of getProperAncestors(initialState, stateNode)) {
          states.add(ancestor);
        }
      }
      return states;
    }
    __name(getInitialStateNodesWithTheirAncestors, "getInitialStateNodesWithTheirAncestors");
    function getInitialStateNodes(stateNode) {
      const set = /* @__PURE__ */ new Set();
      function iter(descStateNode) {
        if (set.has(descStateNode)) {
          return;
        }
        set.add(descStateNode);
        if (descStateNode.type === "compound") {
          iter(descStateNode.initial.target[0]);
        } else if (descStateNode.type === "parallel") {
          for (const child of getChildren(descStateNode)) {
            iter(child);
          }
        }
      }
      __name(iter, "iter");
      iter(stateNode);
      return set;
    }
    __name(getInitialStateNodes, "getInitialStateNodes");
    function getStateNode(stateNode, stateKey) {
      if (isStateId(stateKey)) {
        return stateNode.machine.getStateNodeById(stateKey);
      }
      if (!stateNode.states) {
        throw new Error(`Unable to retrieve child state '${stateKey}' from '${stateNode.id}'; no child states exist.`);
      }
      const result = stateNode.states[stateKey];
      if (!result) {
        throw new Error(`Child state '${stateKey}' does not exist on '${stateNode.id}'`);
      }
      return result;
    }
    __name(getStateNode, "getStateNode");
    function getStateNodeByPath(stateNode, statePath) {
      if (typeof statePath === "string" && isStateId(statePath)) {
        try {
          return stateNode.machine.getStateNodeById(statePath);
        } catch {
        }
      }
      const arrayStatePath = toStatePath(statePath).slice();
      let currentStateNode = stateNode;
      while (arrayStatePath.length) {
        const key = arrayStatePath.shift();
        if (!key.length) {
          break;
        }
        currentStateNode = getStateNode(currentStateNode, key);
      }
      return currentStateNode;
    }
    __name(getStateNodeByPath, "getStateNodeByPath");
    function getStateNodes2(stateNode, stateValue) {
      if (typeof stateValue === "string") {
        const childStateNode = stateNode.states[stateValue];
        if (!childStateNode) {
          throw new Error(`State '${stateValue}' does not exist on '${stateNode.id}'`);
        }
        return [stateNode, childStateNode];
      }
      const childStateKeys = Object.keys(stateValue);
      const childStateNodes = childStateKeys.map((subStateKey) => getStateNode(stateNode, subStateKey)).filter(Boolean);
      return [stateNode.machine.root, stateNode].concat(childStateNodes, childStateKeys.reduce((allSubStateNodes, subStateKey) => {
        const subStateNode = getStateNode(stateNode, subStateKey);
        if (!subStateNode) {
          return allSubStateNodes;
        }
        const subStateNodes = getStateNodes2(subStateNode, stateValue[subStateKey]);
        return allSubStateNodes.concat(subStateNodes);
      }, []));
    }
    __name(getStateNodes2, "getStateNodes");
    function transitionAtomicNode(stateNode, stateValue, snapshot, event) {
      const childStateNode = getStateNode(stateNode, stateValue);
      const next = childStateNode.next(snapshot, event);
      if (!next || !next.length) {
        return stateNode.next(snapshot, event);
      }
      return next;
    }
    __name(transitionAtomicNode, "transitionAtomicNode");
    function transitionCompoundNode(stateNode, stateValue, snapshot, event) {
      const subStateKeys = Object.keys(stateValue);
      const childStateNode = getStateNode(stateNode, subStateKeys[0]);
      const next = transitionNode(childStateNode, stateValue[subStateKeys[0]], snapshot, event);
      if (!next || !next.length) {
        return stateNode.next(snapshot, event);
      }
      return next;
    }
    __name(transitionCompoundNode, "transitionCompoundNode");
    function transitionParallelNode(stateNode, stateValue, snapshot, event) {
      const allInnerTransitions = [];
      for (const subStateKey of Object.keys(stateValue)) {
        const subStateValue = stateValue[subStateKey];
        if (!subStateValue) {
          continue;
        }
        const subStateNode = getStateNode(stateNode, subStateKey);
        const innerTransitions = transitionNode(subStateNode, subStateValue, snapshot, event);
        if (innerTransitions) {
          allInnerTransitions.push(...innerTransitions);
        }
      }
      if (!allInnerTransitions.length) {
        return stateNode.next(snapshot, event);
      }
      return allInnerTransitions;
    }
    __name(transitionParallelNode, "transitionParallelNode");
    function transitionNode(stateNode, stateValue, snapshot, event) {
      if (typeof stateValue === "string") {
        return transitionAtomicNode(stateNode, stateValue, snapshot, event);
      }
      if (Object.keys(stateValue).length === 1) {
        return transitionCompoundNode(stateNode, stateValue, snapshot, event);
      }
      return transitionParallelNode(stateNode, stateValue, snapshot, event);
    }
    __name(transitionNode, "transitionNode");
    function getHistoryNodes(stateNode) {
      return Object.keys(stateNode.states).map((key) => stateNode.states[key]).filter((sn) => sn.type === "history");
    }
    __name(getHistoryNodes, "getHistoryNodes");
    function isDescendant(childStateNode, parentStateNode) {
      let marker = childStateNode;
      while (marker.parent && marker.parent !== parentStateNode) {
        marker = marker.parent;
      }
      return marker.parent === parentStateNode;
    }
    __name(isDescendant, "isDescendant");
    function hasIntersection(s1, s2) {
      const set1 = new Set(s1);
      const set2 = new Set(s2);
      for (const item of set1) {
        if (set2.has(item)) {
          return true;
        }
      }
      for (const item of set2) {
        if (set1.has(item)) {
          return true;
        }
      }
      return false;
    }
    __name(hasIntersection, "hasIntersection");
    function removeConflictingTransitions(enabledTransitions, stateNodeSet, historyValue) {
      const filteredTransitions = /* @__PURE__ */ new Set();
      for (const t1 of enabledTransitions) {
        let t1Preempted = false;
        const transitionsToRemove = /* @__PURE__ */ new Set();
        for (const t2 of filteredTransitions) {
          if (hasIntersection(computeExitSet([t1], stateNodeSet, historyValue), computeExitSet([t2], stateNodeSet, historyValue))) {
            if (isDescendant(t1.source, t2.source)) {
              transitionsToRemove.add(t2);
            } else {
              t1Preempted = true;
              break;
            }
          }
        }
        if (!t1Preempted) {
          for (const t3 of transitionsToRemove) {
            filteredTransitions.delete(t3);
          }
          filteredTransitions.add(t1);
        }
      }
      return Array.from(filteredTransitions);
    }
    __name(removeConflictingTransitions, "removeConflictingTransitions");
    function findLeastCommonAncestor(stateNodes) {
      const [head, ...tail] = stateNodes;
      for (const ancestor of getProperAncestors(head, void 0)) {
        if (tail.every((sn) => isDescendant(sn, ancestor))) {
          return ancestor;
        }
      }
    }
    __name(findLeastCommonAncestor, "findLeastCommonAncestor");
    function getEffectiveTargetStates(transition2, historyValue) {
      if (!transition2.target) {
        return [];
      }
      const targets = /* @__PURE__ */ new Set();
      for (const targetNode of transition2.target) {
        if (isHistoryNode(targetNode)) {
          if (historyValue[targetNode.id]) {
            for (const node of historyValue[targetNode.id]) {
              targets.add(node);
            }
          } else {
            for (const node of getEffectiveTargetStates(resolveHistoryDefaultTransition(targetNode), historyValue)) {
              targets.add(node);
            }
          }
        } else {
          targets.add(targetNode);
        }
      }
      return [...targets];
    }
    __name(getEffectiveTargetStates, "getEffectiveTargetStates");
    function getTransitionDomain(transition2, historyValue) {
      const targetStates = getEffectiveTargetStates(transition2, historyValue);
      if (!targetStates) {
        return;
      }
      if (!transition2.reenter && targetStates.every((target) => target === transition2.source || isDescendant(target, transition2.source))) {
        return transition2.source;
      }
      const lca = findLeastCommonAncestor(targetStates.concat(transition2.source));
      if (lca) {
        return lca;
      }
      if (transition2.reenter) {
        return;
      }
      return transition2.source.machine.root;
    }
    __name(getTransitionDomain, "getTransitionDomain");
    function computeExitSet(transitions, stateNodeSet, historyValue) {
      const statesToExit = /* @__PURE__ */ new Set();
      for (const t of transitions) {
        if (t.target?.length) {
          const domain = getTransitionDomain(t, historyValue);
          if (t.reenter && t.source === domain) {
            statesToExit.add(domain);
          }
          for (const stateNode of stateNodeSet) {
            if (isDescendant(stateNode, domain)) {
              statesToExit.add(stateNode);
            }
          }
        }
      }
      return [...statesToExit];
    }
    __name(computeExitSet, "computeExitSet");
    function areStateNodeCollectionsEqual(prevStateNodes, nextStateNodeSet) {
      if (prevStateNodes.length !== nextStateNodeSet.size) {
        return false;
      }
      for (const node of prevStateNodes) {
        if (!nextStateNodeSet.has(node)) {
          return false;
        }
      }
      return true;
    }
    __name(areStateNodeCollectionsEqual, "areStateNodeCollectionsEqual");
    function initialMicrostep(root, preInitialState, actorScope, initEvent, internalQueue) {
      return microstep([{
        target: [...getInitialStateNodes(root)],
        source: root,
        reenter: true,
        actions: [],
        eventType: null,
        toJSON: null
      }], preInitialState, actorScope, initEvent, true, internalQueue);
    }
    __name(initialMicrostep, "initialMicrostep");
    function microstep(transitions, currentSnapshot, actorScope, event, isInitial, internalQueue) {
      const actions = [];
      if (!transitions.length) {
        return [currentSnapshot, actions];
      }
      const originalExecutor = actorScope.actionExecutor;
      actorScope.actionExecutor = (action) => {
        actions.push(action);
        originalExecutor(action);
      };
      try {
        const mutStateNodeSet = new Set(currentSnapshot._nodes);
        let historyValue = currentSnapshot.historyValue;
        const filteredTransitions = removeConflictingTransitions(transitions, mutStateNodeSet, historyValue);
        let nextState = currentSnapshot;
        if (!isInitial) {
          [nextState, historyValue] = exitStates(nextState, event, actorScope, filteredTransitions, mutStateNodeSet, historyValue, internalQueue, actorScope.actionExecutor);
        }
        nextState = resolveActionsAndContext(nextState, event, actorScope, filteredTransitions.flatMap((t) => t.actions), internalQueue, void 0);
        nextState = enterStates(nextState, event, actorScope, filteredTransitions, mutStateNodeSet, internalQueue, historyValue, isInitial);
        const nextStateNodes = [...mutStateNodeSet];
        if (nextState.status === "done") {
          nextState = resolveActionsAndContext(nextState, event, actorScope, nextStateNodes.sort((a, b) => b.order - a.order).flatMap((state) => state.exit), internalQueue, void 0);
        }
        try {
          if (historyValue === currentSnapshot.historyValue && areStateNodeCollectionsEqual(currentSnapshot._nodes, mutStateNodeSet)) {
            return [nextState, actions];
          }
          return [cloneMachineSnapshot(nextState, {
            _nodes: nextStateNodes,
            historyValue
          }), actions];
        } catch (e) {
          throw e;
        }
      } finally {
        actorScope.actionExecutor = originalExecutor;
      }
    }
    __name(microstep, "microstep");
    function getMachineOutput(snapshot, event, actorScope, rootNode, rootCompletionNode) {
      if (rootNode.output === void 0) {
        return;
      }
      const doneStateEvent = createDoneStateEvent(rootCompletionNode.id, rootCompletionNode.output !== void 0 && rootCompletionNode.parent ? resolveOutput(rootCompletionNode.output, snapshot.context, event, actorScope.self) : void 0);
      return resolveOutput(rootNode.output, snapshot.context, doneStateEvent, actorScope.self);
    }
    __name(getMachineOutput, "getMachineOutput");
    function enterStates(currentSnapshot, event, actorScope, filteredTransitions, mutStateNodeSet, internalQueue, historyValue, isInitial) {
      let nextSnapshot = currentSnapshot;
      const statesToEnter = /* @__PURE__ */ new Set();
      const statesForDefaultEntry = /* @__PURE__ */ new Set();
      computeEntrySet(filteredTransitions, historyValue, statesForDefaultEntry, statesToEnter);
      if (isInitial) {
        statesForDefaultEntry.add(currentSnapshot.machine.root);
      }
      const completedNodes = /* @__PURE__ */ new Set();
      for (const stateNodeToEnter of [...statesToEnter].sort((a, b) => a.order - b.order)) {
        mutStateNodeSet.add(stateNodeToEnter);
        const actions = [];
        actions.push(...stateNodeToEnter.entry);
        for (const invokeDef of stateNodeToEnter.invoke) {
          actions.push(spawnChild2(invokeDef.src, {
            ...invokeDef,
            syncSnapshot: !!invokeDef.onSnapshot
          }));
        }
        if (statesForDefaultEntry.has(stateNodeToEnter)) {
          const initialActions = stateNodeToEnter.initial.actions;
          actions.push(...initialActions);
        }
        nextSnapshot = resolveActionsAndContext(nextSnapshot, event, actorScope, actions, internalQueue, stateNodeToEnter.invoke.map((invokeDef) => invokeDef.id));
        if (stateNodeToEnter.type === "final") {
          const parent = stateNodeToEnter.parent;
          let ancestorMarker = parent?.type === "parallel" ? parent : parent?.parent;
          let rootCompletionNode = ancestorMarker || stateNodeToEnter;
          if (parent?.type === "compound") {
            internalQueue.push(createDoneStateEvent(parent.id, stateNodeToEnter.output !== void 0 ? resolveOutput(stateNodeToEnter.output, nextSnapshot.context, event, actorScope.self) : void 0));
          }
          while (ancestorMarker?.type === "parallel" && !completedNodes.has(ancestorMarker) && isInFinalState(mutStateNodeSet, ancestorMarker)) {
            completedNodes.add(ancestorMarker);
            internalQueue.push(createDoneStateEvent(ancestorMarker.id));
            rootCompletionNode = ancestorMarker;
            ancestorMarker = ancestorMarker.parent;
          }
          if (ancestorMarker) {
            continue;
          }
          nextSnapshot = cloneMachineSnapshot(nextSnapshot, {
            status: "done",
            output: getMachineOutput(nextSnapshot, event, actorScope, nextSnapshot.machine.root, rootCompletionNode)
          });
        }
      }
      return nextSnapshot;
    }
    __name(enterStates, "enterStates");
    function computeEntrySet(transitions, historyValue, statesForDefaultEntry, statesToEnter) {
      for (const t of transitions) {
        const domain = getTransitionDomain(t, historyValue);
        for (const s of t.target || []) {
          if (!isHistoryNode(s) && // if the target is different than the source then it will *definitely* be entered
          (t.source !== s || // we know that the domain can't lie within the source
          // if it's different than the source then it's outside of it and it means that the target has to be entered as well
          t.source !== domain || // reentering transitions always enter the target, even if it's the source itself
          t.reenter)) {
            statesToEnter.add(s);
            statesForDefaultEntry.add(s);
          }
          addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
        }
        const targetStates = getEffectiveTargetStates(t, historyValue);
        for (const s of targetStates) {
          const ancestors = getProperAncestors(s, domain);
          if (domain?.type === "parallel") {
            ancestors.push(domain);
          }
          addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, ancestors, !t.source.parent && t.reenter ? void 0 : domain);
        }
      }
    }
    __name(computeEntrySet, "computeEntrySet");
    function addDescendantStatesToEnter(stateNode, historyValue, statesForDefaultEntry, statesToEnter) {
      if (isHistoryNode(stateNode)) {
        if (historyValue[stateNode.id]) {
          const historyStateNodes = historyValue[stateNode.id];
          for (const s of historyStateNodes) {
            statesToEnter.add(s);
            addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
          }
          for (const s of historyStateNodes) {
            addProperAncestorStatesToEnter(s, stateNode.parent, statesToEnter, historyValue, statesForDefaultEntry);
          }
        } else {
          const historyDefaultTransition = resolveHistoryDefaultTransition(stateNode);
          for (const s of historyDefaultTransition.target) {
            statesToEnter.add(s);
            if (historyDefaultTransition === stateNode.parent?.initial) {
              statesForDefaultEntry.add(stateNode.parent);
            }
            addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
          }
          for (const s of historyDefaultTransition.target) {
            addProperAncestorStatesToEnter(s, stateNode.parent, statesToEnter, historyValue, statesForDefaultEntry);
          }
        }
      } else {
        if (stateNode.type === "compound") {
          const [initialState] = stateNode.initial.target;
          if (!isHistoryNode(initialState)) {
            statesToEnter.add(initialState);
            statesForDefaultEntry.add(initialState);
          }
          addDescendantStatesToEnter(initialState, historyValue, statesForDefaultEntry, statesToEnter);
          addProperAncestorStatesToEnter(initialState, stateNode, statesToEnter, historyValue, statesForDefaultEntry);
        } else {
          if (stateNode.type === "parallel") {
            for (const child of getChildren(stateNode).filter((sn) => !isHistoryNode(sn))) {
              if (![...statesToEnter].some((s) => isDescendant(s, child))) {
                if (!isHistoryNode(child)) {
                  statesToEnter.add(child);
                  statesForDefaultEntry.add(child);
                }
                addDescendantStatesToEnter(child, historyValue, statesForDefaultEntry, statesToEnter);
              }
            }
          }
        }
      }
    }
    __name(addDescendantStatesToEnter, "addDescendantStatesToEnter");
    function addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, ancestors, reentrancyDomain) {
      for (const anc of ancestors) {
        if (!reentrancyDomain || isDescendant(anc, reentrancyDomain)) {
          statesToEnter.add(anc);
        }
        if (anc.type === "parallel") {
          for (const child of getChildren(anc).filter((sn) => !isHistoryNode(sn))) {
            if (![...statesToEnter].some((s) => isDescendant(s, child))) {
              statesToEnter.add(child);
              addDescendantStatesToEnter(child, historyValue, statesForDefaultEntry, statesToEnter);
            }
          }
        }
      }
    }
    __name(addAncestorStatesToEnter, "addAncestorStatesToEnter");
    function addProperAncestorStatesToEnter(stateNode, toStateNode, statesToEnter, historyValue, statesForDefaultEntry) {
      addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, getProperAncestors(stateNode, toStateNode));
    }
    __name(addProperAncestorStatesToEnter, "addProperAncestorStatesToEnter");
    function exitStates(currentSnapshot, event, actorScope, transitions, mutStateNodeSet, historyValue, internalQueue, _actionExecutor) {
      let nextSnapshot = currentSnapshot;
      const statesToExit = computeExitSet(transitions, mutStateNodeSet, historyValue);
      statesToExit.sort((a, b) => b.order - a.order);
      let changedHistory;
      for (const exitStateNode of statesToExit) {
        for (const historyNode of getHistoryNodes(exitStateNode)) {
          let predicate;
          if (historyNode.history === "deep") {
            predicate = /* @__PURE__ */ __name((sn) => isAtomicStateNode(sn) && isDescendant(sn, exitStateNode), "predicate");
          } else {
            predicate = /* @__PURE__ */ __name((sn) => {
              return sn.parent === exitStateNode;
            }, "predicate");
          }
          changedHistory ??= {
            ...historyValue
          };
          changedHistory[historyNode.id] = Array.from(mutStateNodeSet).filter(predicate);
        }
      }
      for (const s of statesToExit) {
        nextSnapshot = resolveActionsAndContext(nextSnapshot, event, actorScope, [...s.exit, ...s.invoke.map((def) => stopChild2(def.id))], internalQueue, void 0);
        mutStateNodeSet.delete(s);
      }
      return [nextSnapshot, changedHistory || historyValue];
    }
    __name(exitStates, "exitStates");
    function getAction(machine, actionType) {
      return machine.implementations.actions[actionType];
    }
    __name(getAction, "getAction");
    function resolveAndExecuteActionsWithContext(currentSnapshot, event, actorScope, actions, extra, retries) {
      const {
        machine
      } = currentSnapshot;
      let intermediateSnapshot = currentSnapshot;
      for (const action of actions) {
        const isInline = typeof action === "function";
        const resolvedAction = isInline ? action : (
          // the existing type of `.actions` assumes non-nullable `TExpressionAction`
          // it's fine to cast this here to get a common type and lack of errors in the rest of the code
          // our logic below makes sure that we call those 2 "variants" correctly
          getAction(machine, typeof action === "string" ? action : action.type)
        );
        const actionArgs = {
          context: intermediateSnapshot.context,
          event,
          self: actorScope.self,
          system: actorScope.system
        };
        const actionParams = isInline || typeof action === "string" ? void 0 : "params" in action ? typeof action.params === "function" ? action.params({
          context: intermediateSnapshot.context,
          event
        }) : action.params : void 0;
        if (!resolvedAction || !("resolve" in resolvedAction)) {
          actorScope.actionExecutor({
            type: typeof action === "string" ? action : typeof action === "object" ? action.type : action.name || "(anonymous)",
            info: actionArgs,
            params: actionParams,
            exec: resolvedAction
          });
          continue;
        }
        const builtinAction = resolvedAction;
        const [nextState, params, actions2] = builtinAction.resolve(
          actorScope,
          intermediateSnapshot,
          actionArgs,
          actionParams,
          resolvedAction,
          // this holds all params
          extra
        );
        intermediateSnapshot = nextState;
        if ("retryResolve" in builtinAction) {
          retries?.push([builtinAction, params]);
        }
        if ("execute" in builtinAction) {
          actorScope.actionExecutor({
            type: builtinAction.type,
            info: actionArgs,
            params,
            exec: builtinAction.execute.bind(null, actorScope, params)
          });
        }
        if (actions2) {
          intermediateSnapshot = resolveAndExecuteActionsWithContext(intermediateSnapshot, event, actorScope, actions2, extra, retries);
        }
      }
      return intermediateSnapshot;
    }
    __name(resolveAndExecuteActionsWithContext, "resolveAndExecuteActionsWithContext");
    function resolveActionsAndContext(currentSnapshot, event, actorScope, actions, internalQueue, deferredActorIds) {
      const retries = deferredActorIds ? [] : void 0;
      const nextState = resolveAndExecuteActionsWithContext(currentSnapshot, event, actorScope, actions, {
        internalQueue,
        deferredActorIds
      }, retries);
      retries?.forEach(([builtinAction, params]) => {
        builtinAction.retryResolve(actorScope, nextState, params);
      });
      return nextState;
    }
    __name(resolveActionsAndContext, "resolveActionsAndContext");
    function macrostep(snapshot, event, actorScope, internalQueue) {
      let nextSnapshot = snapshot;
      const microsteps = [];
      function addMicrostep(step, event2, transitions) {
        actorScope.system._sendInspectionEvent({
          type: "@xstate.microstep",
          actorRef: actorScope.self,
          event: event2,
          snapshot: step[0],
          _transitions: transitions
        });
        microsteps.push(step);
      }
      __name(addMicrostep, "addMicrostep");
      if (event.type === XSTATE_STOP) {
        nextSnapshot = cloneMachineSnapshot(stopChildren(nextSnapshot, event, actorScope), {
          status: "stopped"
        });
        addMicrostep([nextSnapshot, []], event, []);
        return {
          snapshot: nextSnapshot,
          microsteps
        };
      }
      let nextEvent = event;
      if (nextEvent.type !== XSTATE_INIT) {
        const currentEvent = nextEvent;
        const isErr = isErrorActorEvent(currentEvent);
        const transitions = selectTransitions(currentEvent, nextSnapshot);
        if (isErr && !transitions.length) {
          nextSnapshot = cloneMachineSnapshot(snapshot, {
            status: "error",
            error: currentEvent.error
          });
          addMicrostep([nextSnapshot, []], currentEvent, []);
          return {
            snapshot: nextSnapshot,
            microsteps
          };
        }
        const step = microstep(
          transitions,
          snapshot,
          actorScope,
          nextEvent,
          false,
          // isInitial
          internalQueue
        );
        nextSnapshot = step[0];
        addMicrostep(step, currentEvent, transitions);
      }
      let shouldSelectEventlessTransitions = true;
      while (nextSnapshot.status === "active") {
        let enabledTransitions = shouldSelectEventlessTransitions ? selectEventlessTransitions(nextSnapshot, nextEvent) : [];
        const previousState = enabledTransitions.length ? nextSnapshot : void 0;
        if (!enabledTransitions.length) {
          if (!internalQueue.length) {
            break;
          }
          nextEvent = internalQueue.shift();
          enabledTransitions = selectTransitions(nextEvent, nextSnapshot);
        }
        const step = microstep(enabledTransitions, nextSnapshot, actorScope, nextEvent, false, internalQueue);
        nextSnapshot = step[0];
        shouldSelectEventlessTransitions = nextSnapshot !== previousState;
        addMicrostep(step, nextEvent, enabledTransitions);
      }
      if (nextSnapshot.status !== "active") {
        stopChildren(nextSnapshot, nextEvent, actorScope);
      }
      return {
        snapshot: nextSnapshot,
        microsteps
      };
    }
    __name(macrostep, "macrostep");
    function stopChildren(nextState, event, actorScope) {
      return resolveActionsAndContext(nextState, event, actorScope, Object.values(nextState.children).map((child) => stopChild2(child)), [], void 0);
    }
    __name(stopChildren, "stopChildren");
    function selectTransitions(event, nextState) {
      return nextState.machine.getTransitionData(nextState, event);
    }
    __name(selectTransitions, "selectTransitions");
    function selectEventlessTransitions(nextState, event) {
      const enabledTransitionSet = /* @__PURE__ */ new Set();
      const atomicStates = nextState._nodes.filter(isAtomicStateNode);
      for (const stateNode of atomicStates) {
        loop: for (const s of [stateNode].concat(getProperAncestors(stateNode, void 0))) {
          if (!s.always) {
            continue;
          }
          for (const transition2 of s.always) {
            if (transition2.guard === void 0 || evaluateGuard(transition2.guard, nextState.context, event, nextState)) {
              enabledTransitionSet.add(transition2);
              break loop;
            }
          }
        }
      }
      return removeConflictingTransitions(Array.from(enabledTransitionSet), new Set(nextState._nodes), nextState.historyValue);
    }
    __name(selectEventlessTransitions, "selectEventlessTransitions");
    function resolveStateValue(rootNode, stateValue) {
      const allStateNodes = getAllStateNodes(getStateNodes2(rootNode, stateValue));
      return getStateValue(rootNode, [...allStateNodes]);
    }
    __name(resolveStateValue, "resolveStateValue");
    function isMachineSnapshot2(value) {
      return !!value && typeof value === "object" && "machine" in value && "value" in value;
    }
    __name(isMachineSnapshot2, "isMachineSnapshot");
    var machineSnapshotMatches = /* @__PURE__ */ __name(function matches(testValue) {
      return matchesState2(testValue, this.value);
    }, "matches");
    var machineSnapshotHasTag = /* @__PURE__ */ __name(function hasTag(tag2) {
      return this.tags.has(tag2);
    }, "hasTag");
    var machineSnapshotCan = /* @__PURE__ */ __name(function can(event) {
      const transitionData = this.machine.getTransitionData(this, event);
      return !!transitionData?.length && // Check that at least one transition is not forbidden
      transitionData.some((t) => t.target !== void 0 || t.actions.length);
    }, "can");
    var machineSnapshotToJSON = /* @__PURE__ */ __name(function toJSON() {
      const {
        _nodes: nodes,
        tags,
        machine,
        getMeta,
        toJSON: toJSON2,
        can,
        hasTag,
        matches,
        ...jsonValues
      } = this;
      return {
        ...jsonValues,
        tags: Array.from(tags)
      };
    }, "toJSON");
    var machineSnapshotGetMeta = /* @__PURE__ */ __name(function getMeta() {
      return this._nodes.reduce((acc, stateNode) => {
        if (stateNode.meta !== void 0) {
          acc[stateNode.id] = stateNode.meta;
        }
        return acc;
      }, {});
    }, "getMeta");
    function createMachineSnapshot(config, machine) {
      return {
        status: config.status,
        output: config.output,
        error: config.error,
        machine,
        context: config.context,
        _nodes: config._nodes,
        value: getStateValue(machine.root, config._nodes),
        tags: new Set(config._nodes.flatMap((sn) => sn.tags)),
        children: config.children,
        historyValue: config.historyValue || {},
        matches: machineSnapshotMatches,
        hasTag: machineSnapshotHasTag,
        can: machineSnapshotCan,
        getMeta: machineSnapshotGetMeta,
        toJSON: machineSnapshotToJSON
      };
    }
    __name(createMachineSnapshot, "createMachineSnapshot");
    function cloneMachineSnapshot(snapshot, config = {}) {
      return createMachineSnapshot({
        ...snapshot,
        ...config
      }, snapshot.machine);
    }
    __name(cloneMachineSnapshot, "cloneMachineSnapshot");
    function serializeHistoryValue(historyValue) {
      if (typeof historyValue !== "object" || historyValue === null) {
        return {};
      }
      const result = {};
      for (const key in historyValue) {
        const value = historyValue[key];
        if (Array.isArray(value)) {
          result[key] = value.map((item) => ({
            id: item.id
          }));
        }
      }
      return result;
    }
    __name(serializeHistoryValue, "serializeHistoryValue");
    function getPersistedSnapshot(snapshot, options) {
      const {
        _nodes: nodes,
        tags,
        machine,
        children,
        context,
        can,
        hasTag,
        matches,
        getMeta,
        toJSON,
        ...jsonValues
      } = snapshot;
      const childrenJson = {};
      for (const id in children) {
        const child = children[id];
        childrenJson[id] = {
          snapshot: child.getPersistedSnapshot(options),
          src: child.src,
          systemId: child.systemId,
          syncSnapshot: child._syncSnapshot
        };
      }
      const persisted = {
        ...jsonValues,
        context: persistContext(context),
        children: childrenJson,
        historyValue: serializeHistoryValue(jsonValues.historyValue)
      };
      return persisted;
    }
    __name(getPersistedSnapshot, "getPersistedSnapshot");
    function persistContext(contextPart) {
      let copy;
      for (const key in contextPart) {
        const value = contextPart[key];
        if (value && typeof value === "object") {
          if ("sessionId" in value && "send" in value && "ref" in value) {
            copy ??= Array.isArray(contextPart) ? contextPart.slice() : {
              ...contextPart
            };
            copy[key] = {
              xstate$$type: $$ACTOR_TYPE,
              id: value.id
            };
          } else {
            const result = persistContext(value);
            if (result !== value) {
              copy ??= Array.isArray(contextPart) ? contextPart.slice() : {
                ...contextPart
              };
              copy[key] = result;
            }
          }
        }
      }
      return copy ?? contextPart;
    }
    __name(persistContext, "persistContext");
    function resolveRaise(_, snapshot, args, actionParams, {
      event: eventOrExpr,
      id,
      delay
    }, {
      internalQueue
    }) {
      const delaysMap = snapshot.machine.implementations.delays;
      if (typeof eventOrExpr === "string") {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `Only event objects may be used with raise; use raise({ type: "${eventOrExpr}" }) instead`
        );
      }
      const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
      let resolvedDelay;
      if (typeof delay === "string") {
        const configDelay = delaysMap && delaysMap[delay];
        resolvedDelay = typeof configDelay === "function" ? configDelay(args, actionParams) : configDelay;
      } else {
        resolvedDelay = typeof delay === "function" ? delay(args, actionParams) : delay;
      }
      if (typeof resolvedDelay !== "number") {
        internalQueue.push(resolvedEvent);
      }
      return [snapshot, {
        event: resolvedEvent,
        id,
        delay: resolvedDelay
      }, void 0];
    }
    __name(resolveRaise, "resolveRaise");
    function executeRaise(actorScope, params) {
      const {
        event,
        delay,
        id
      } = params;
      if (typeof delay === "number") {
        actorScope.defer(() => {
          const self2 = actorScope.self;
          actorScope.system.scheduler.schedule(self2, self2, event, delay, id);
        });
        return;
      }
    }
    __name(executeRaise, "executeRaise");
    function raise2(eventOrExpr, options) {
      function raise3(_args, _params) {
      }
      __name(raise3, "raise");
      raise3.type = "xstate.raise";
      raise3.event = eventOrExpr;
      raise3.id = options?.id;
      raise3.delay = options?.delay;
      raise3.resolve = resolveRaise;
      raise3.execute = executeRaise;
      return raise3;
    }
    __name(raise2, "raise");
    exports.$$ACTOR_TYPE = $$ACTOR_TYPE;
    exports.Actor = Actor2;
    exports.NULL_EVENT = NULL_EVENT;
    exports.ProcessingStatus = ProcessingStatus;
    exports.STATE_DELIMITER = STATE_DELIMITER;
    exports.XSTATE_ERROR = XSTATE_ERROR;
    exports.XSTATE_STOP = XSTATE_STOP;
    exports.and = and2;
    exports.cancel = cancel2;
    exports.cloneMachineSnapshot = cloneMachineSnapshot;
    exports.createActor = createActor2;
    exports.createErrorActorEvent = createErrorActorEvent;
    exports.createInitEvent = createInitEvent;
    exports.createInvokeId = createInvokeId;
    exports.createMachineSnapshot = createMachineSnapshot;
    exports.evaluateGuard = evaluateGuard;
    exports.formatInitialTransition = formatInitialTransition;
    exports.formatRouteTransitions = formatRouteTransitions;
    exports.formatTransition = formatTransition;
    exports.formatTransitions = formatTransitions;
    exports.getAllOwnEventDescriptors = getAllOwnEventDescriptors;
    exports.getAllStateNodes = getAllStateNodes;
    exports.getCandidates = getCandidates;
    exports.getDelayedTransitions = getDelayedTransitions;
    exports.getPersistedSnapshot = getPersistedSnapshot;
    exports.getProperAncestors = getProperAncestors;
    exports.getStateNodeByPath = getStateNodeByPath;
    exports.getStateNodes = getStateNodes2;
    exports.initialMicrostep = initialMicrostep;
    exports.interpret = interpret2;
    exports.isAtomicStateNode = isAtomicStateNode;
    exports.isInFinalState = isInFinalState;
    exports.isMachineSnapshot = isMachineSnapshot2;
    exports.isStateId = isStateId;
    exports.macrostep = macrostep;
    exports.mapValues = mapValues;
    exports.matchesEventDescriptor = matchesEventDescriptor;
    exports.matchesState = matchesState2;
    exports.not = not2;
    exports.or = or2;
    exports.pathToStateValue = pathToStateValue2;
    exports.raise = raise2;
    exports.resolveActionsAndContext = resolveActionsAndContext;
    exports.resolveReferencedActor = resolveReferencedActor;
    exports.resolveStateValue = resolveStateValue;
    exports.spawnChild = spawnChild2;
    exports.stateIn = stateIn2;
    exports.stop = stop2;
    exports.stopChild = stopChild2;
    exports.toArray = toArray;
    exports.toObserver = toObserver2;
    exports.toStatePath = toStatePath;
    exports.toTransitionConfigArray = toTransitionConfigArray;
    exports.transitionNode = transitionNode;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/actors/dist/xstate-actors.cjs.js
var require_xstate_actors_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/actors/dist/xstate-actors.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var guards_dist_xstateGuards = require_raise_f23ccfcb_cjs();
    require_xstate_dev_cjs();
    function fromTransition2(transition2, initialContext) {
      return {
        config: transition2,
        transition: /* @__PURE__ */ __name((snapshot, event, actorScope) => {
          return {
            ...snapshot,
            context: transition2(snapshot.context, event, actorScope)
          };
        }, "transition"),
        getInitialSnapshot: /* @__PURE__ */ __name((_, input) => {
          return {
            status: "active",
            output: void 0,
            error: void 0,
            context: typeof initialContext === "function" ? initialContext({
              input
            }) : initialContext
          };
        }, "getInitialSnapshot"),
        getPersistedSnapshot: /* @__PURE__ */ __name((snapshot) => snapshot, "getPersistedSnapshot"),
        restoreSnapshot: /* @__PURE__ */ __name((snapshot) => snapshot, "restoreSnapshot")
      };
    }
    __name(fromTransition2, "fromTransition");
    var instanceStates = /* @__PURE__ */ new WeakMap();
    function fromCallback2(callback) {
      const logic = {
        config: callback,
        start: /* @__PURE__ */ __name((state, actorScope) => {
          const {
            self: self2,
            system,
            emit: emit2
          } = actorScope;
          const callbackState = {
            receivers: void 0,
            dispose: void 0
          };
          instanceStates.set(self2, callbackState);
          callbackState.dispose = callback({
            input: state.input,
            system,
            self: self2,
            sendBack: /* @__PURE__ */ __name((event) => {
              if (self2.getSnapshot().status === "stopped") {
                return;
              }
              if (self2._parent) {
                system._relay(self2, self2._parent, event);
              }
            }, "sendBack"),
            receive: /* @__PURE__ */ __name((listener) => {
              callbackState.receivers ??= /* @__PURE__ */ new Set();
              callbackState.receivers.add(listener);
            }, "receive"),
            emit: emit2
          });
        }, "start"),
        transition: /* @__PURE__ */ __name((state, event, actorScope) => {
          const callbackState = instanceStates.get(actorScope.self);
          if (event.type === guards_dist_xstateGuards.XSTATE_STOP) {
            state = {
              ...state,
              status: "stopped",
              error: void 0
            };
            instanceStates.delete(actorScope.self);
            callbackState.receivers?.clear();
            callbackState.dispose?.();
            return state;
          }
          callbackState.receivers?.forEach((receiver) => receiver(event));
          return state;
        }, "transition"),
        getInitialSnapshot: /* @__PURE__ */ __name((_, input) => {
          return {
            status: "active",
            output: void 0,
            error: void 0,
            input
          };
        }, "getInitialSnapshot"),
        getPersistedSnapshot: /* @__PURE__ */ __name((snapshot) => snapshot, "getPersistedSnapshot"),
        restoreSnapshot: /* @__PURE__ */ __name((snapshot) => snapshot, "restoreSnapshot")
      };
      return logic;
    }
    __name(fromCallback2, "fromCallback");
    var XSTATE_OBSERVABLE_NEXT = "xstate.observable.next";
    var XSTATE_OBSERVABLE_ERROR = "xstate.observable.error";
    var XSTATE_OBSERVABLE_COMPLETE = "xstate.observable.complete";
    function fromObservable2(observableCreator) {
      const logic = {
        config: observableCreator,
        transition: /* @__PURE__ */ __name((snapshot, event) => {
          if (snapshot.status !== "active") {
            return snapshot;
          }
          switch (event.type) {
            case XSTATE_OBSERVABLE_NEXT: {
              const newSnapshot = {
                ...snapshot,
                context: event.data
              };
              return newSnapshot;
            }
            case XSTATE_OBSERVABLE_ERROR:
              return {
                ...snapshot,
                status: "error",
                error: event.data,
                input: void 0,
                _subscription: void 0
              };
            case XSTATE_OBSERVABLE_COMPLETE:
              return {
                ...snapshot,
                status: "done",
                input: void 0,
                _subscription: void 0
              };
            case guards_dist_xstateGuards.XSTATE_STOP:
              snapshot._subscription.unsubscribe();
              return {
                ...snapshot,
                status: "stopped",
                input: void 0,
                _subscription: void 0
              };
            default:
              return snapshot;
          }
        }, "transition"),
        getInitialSnapshot: /* @__PURE__ */ __name((_, input) => {
          return {
            status: "active",
            output: void 0,
            error: void 0,
            context: void 0,
            input,
            _subscription: void 0
          };
        }, "getInitialSnapshot"),
        start: /* @__PURE__ */ __name((state, {
          self: self2,
          system,
          emit: emit2
        }) => {
          if (state.status === "done") {
            return;
          }
          state._subscription = observableCreator({
            input: state.input,
            system,
            self: self2,
            emit: emit2
          }).subscribe({
            next: /* @__PURE__ */ __name((value) => {
              system._relay(self2, self2, {
                type: XSTATE_OBSERVABLE_NEXT,
                data: value
              });
            }, "next"),
            error: /* @__PURE__ */ __name((err) => {
              system._relay(self2, self2, {
                type: XSTATE_OBSERVABLE_ERROR,
                data: err
              });
            }, "error"),
            complete: /* @__PURE__ */ __name(() => {
              system._relay(self2, self2, {
                type: XSTATE_OBSERVABLE_COMPLETE
              });
            }, "complete")
          });
        }, "start"),
        getPersistedSnapshot: /* @__PURE__ */ __name(({
          _subscription,
          ...state
        }) => state, "getPersistedSnapshot"),
        restoreSnapshot: /* @__PURE__ */ __name((state) => ({
          ...state,
          _subscription: void 0
        }), "restoreSnapshot")
      };
      return logic;
    }
    __name(fromObservable2, "fromObservable");
    function fromEventObservable2(lazyObservable) {
      const logic = {
        config: lazyObservable,
        transition: /* @__PURE__ */ __name((state, event) => {
          if (state.status !== "active") {
            return state;
          }
          switch (event.type) {
            case XSTATE_OBSERVABLE_ERROR:
              return {
                ...state,
                status: "error",
                error: event.data,
                input: void 0,
                _subscription: void 0
              };
            case XSTATE_OBSERVABLE_COMPLETE:
              return {
                ...state,
                status: "done",
                input: void 0,
                _subscription: void 0
              };
            case guards_dist_xstateGuards.XSTATE_STOP:
              state._subscription.unsubscribe();
              return {
                ...state,
                status: "stopped",
                input: void 0,
                _subscription: void 0
              };
            default:
              return state;
          }
        }, "transition"),
        getInitialSnapshot: /* @__PURE__ */ __name((_, input) => {
          return {
            status: "active",
            output: void 0,
            error: void 0,
            context: void 0,
            input,
            _subscription: void 0
          };
        }, "getInitialSnapshot"),
        start: /* @__PURE__ */ __name((state, {
          self: self2,
          system,
          emit: emit2
        }) => {
          if (state.status === "done") {
            return;
          }
          state._subscription = lazyObservable({
            input: state.input,
            system,
            self: self2,
            emit: emit2
          }).subscribe({
            next: /* @__PURE__ */ __name((value) => {
              if (self2._parent) {
                system._relay(self2, self2._parent, value);
              }
            }, "next"),
            error: /* @__PURE__ */ __name((err) => {
              system._relay(self2, self2, {
                type: XSTATE_OBSERVABLE_ERROR,
                data: err
              });
            }, "error"),
            complete: /* @__PURE__ */ __name(() => {
              system._relay(self2, self2, {
                type: XSTATE_OBSERVABLE_COMPLETE
              });
            }, "complete")
          });
        }, "start"),
        getPersistedSnapshot: /* @__PURE__ */ __name(({
          _subscription,
          ...snapshot
        }) => snapshot, "getPersistedSnapshot"),
        restoreSnapshot: /* @__PURE__ */ __name((snapshot) => ({
          ...snapshot,
          _subscription: void 0
        }), "restoreSnapshot")
      };
      return logic;
    }
    __name(fromEventObservable2, "fromEventObservable");
    var XSTATE_PROMISE_RESOLVE = "xstate.promise.resolve";
    var XSTATE_PROMISE_REJECT = "xstate.promise.reject";
    var controllerMap = /* @__PURE__ */ new WeakMap();
    function fromPromise2(promiseCreator) {
      const logic = {
        config: promiseCreator,
        transition: /* @__PURE__ */ __name((state, event, scope) => {
          if (state.status !== "active") {
            return state;
          }
          switch (event.type) {
            case XSTATE_PROMISE_RESOLVE: {
              const resolvedValue = event.data;
              return {
                ...state,
                status: "done",
                output: resolvedValue,
                input: void 0
              };
            }
            case XSTATE_PROMISE_REJECT:
              return {
                ...state,
                status: "error",
                error: event.data,
                input: void 0
              };
            case guards_dist_xstateGuards.XSTATE_STOP: {
              controllerMap.get(scope.self)?.abort();
              controllerMap.delete(scope.self);
              return {
                ...state,
                status: "stopped",
                input: void 0
              };
            }
            default:
              return state;
          }
        }, "transition"),
        start: /* @__PURE__ */ __name((state, {
          self: self2,
          system,
          emit: emit2
        }) => {
          if (state.status !== "active") {
            return;
          }
          const controller = new AbortController();
          controllerMap.set(self2, controller);
          const resolvedPromise = Promise.resolve(promiseCreator({
            input: state.input,
            system,
            self: self2,
            signal: controller.signal,
            emit: emit2
          }));
          resolvedPromise.then((response) => {
            if (self2.getSnapshot().status !== "active") {
              return;
            }
            controllerMap.delete(self2);
            system._relay(self2, self2, {
              type: XSTATE_PROMISE_RESOLVE,
              data: response
            });
          }, (errorData) => {
            if (self2.getSnapshot().status !== "active") {
              return;
            }
            controllerMap.delete(self2);
            system._relay(self2, self2, {
              type: XSTATE_PROMISE_REJECT,
              data: errorData
            });
          });
        }, "start"),
        getInitialSnapshot: /* @__PURE__ */ __name((_, input) => {
          return {
            status: "active",
            output: void 0,
            error: void 0,
            input
          };
        }, "getInitialSnapshot"),
        getPersistedSnapshot: /* @__PURE__ */ __name((snapshot) => snapshot, "getPersistedSnapshot"),
        restoreSnapshot: /* @__PURE__ */ __name((snapshot) => snapshot, "restoreSnapshot")
      };
      return logic;
    }
    __name(fromPromise2, "fromPromise");
    var emptyLogic = fromTransition2((_) => void 0, void 0);
    function createEmptyActor2() {
      return guards_dist_xstateGuards.createActor(emptyLogic);
    }
    __name(createEmptyActor2, "createEmptyActor");
    exports.createEmptyActor = createEmptyActor2;
    exports.fromCallback = fromCallback2;
    exports.fromEventObservable = fromEventObservable2;
    exports.fromObservable = fromObservable2;
    exports.fromPromise = fromPromise2;
    exports.fromTransition = fromTransition2;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/assign-6b5249c3.cjs.js
var require_assign_6b5249c3_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/assign-6b5249c3.cjs.js"(exports) {
    "use strict";
    var guards_dist_xstateGuards = require_raise_f23ccfcb_cjs();
    function createSpawner(actorScope, {
      machine,
      context
    }, event, spawnedChildren) {
      const spawn = /* @__PURE__ */ __name((src, options) => {
        if (typeof src === "string") {
          const logic = guards_dist_xstateGuards.resolveReferencedActor(machine, src);
          if (!logic) {
            throw new Error(`Actor logic '${src}' not implemented in machine '${machine.id}'`);
          }
          const actorRef = guards_dist_xstateGuards.createActor(logic, {
            id: options?.id,
            parent: actorScope.self,
            syncSnapshot: options?.syncSnapshot,
            input: typeof options?.input === "function" ? options.input({
              context,
              event,
              self: actorScope.self
            }) : options?.input,
            src,
            systemId: options?.systemId
          });
          spawnedChildren[actorRef.id] = actorRef;
          return actorRef;
        } else {
          const actorRef = guards_dist_xstateGuards.createActor(src, {
            id: options?.id,
            parent: actorScope.self,
            syncSnapshot: options?.syncSnapshot,
            input: options?.input,
            src,
            systemId: options?.systemId
          });
          return actorRef;
        }
      }, "spawn");
      return (src, options) => {
        const actorRef = spawn(src, options);
        spawnedChildren[actorRef.id] = actorRef;
        actorScope.defer(() => {
          if (actorRef._processingStatus === guards_dist_xstateGuards.ProcessingStatus.Stopped) {
            return;
          }
          actorRef.start();
        });
        return actorRef;
      };
    }
    __name(createSpawner, "createSpawner");
    function resolveAssign(actorScope, snapshot, actionArgs, actionParams, {
      assignment
    }) {
      if (!snapshot.context) {
        throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
      }
      const spawnedChildren = {};
      const assignArgs = {
        context: snapshot.context,
        event: actionArgs.event,
        spawn: createSpawner(actorScope, snapshot, actionArgs.event, spawnedChildren),
        self: actorScope.self,
        system: actorScope.system
      };
      let partialUpdate = {};
      if (typeof assignment === "function") {
        partialUpdate = assignment(assignArgs, actionParams);
      } else {
        for (const key of Object.keys(assignment)) {
          const propAssignment = assignment[key];
          partialUpdate[key] = typeof propAssignment === "function" ? propAssignment(assignArgs, actionParams) : propAssignment;
        }
      }
      const updatedContext = Object.assign({}, snapshot.context, partialUpdate);
      return [guards_dist_xstateGuards.cloneMachineSnapshot(snapshot, {
        context: updatedContext,
        children: Object.keys(spawnedChildren).length ? {
          ...snapshot.children,
          ...spawnedChildren
        } : snapshot.children
      }), void 0, void 0];
    }
    __name(resolveAssign, "resolveAssign");
    function assign2(assignment) {
      function assign3(_args, _params) {
      }
      __name(assign3, "assign");
      assign3.type = "xstate.assign";
      assign3.assignment = assignment;
      assign3.resolve = resolveAssign;
      return assign3;
    }
    __name(assign2, "assign");
    exports.assign = assign2;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/StateMachine-a2656b8a.cjs.js
var require_StateMachine_a2656b8a_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/StateMachine-a2656b8a.cjs.js"(exports) {
    "use strict";
    var guards_dist_xstateGuards = require_raise_f23ccfcb_cjs();
    var assign2 = require_assign_6b5249c3_cjs();
    var cache2 = /* @__PURE__ */ new WeakMap();
    function memo(object, key, fn) {
      let memoizedData = cache2.get(object);
      if (!memoizedData) {
        memoizedData = {
          [key]: fn()
        };
        cache2.set(object, memoizedData);
      } else if (!(key in memoizedData)) {
        memoizedData[key] = fn();
      }
      return memoizedData[key];
    }
    __name(memo, "memo");
    var EMPTY_OBJECT = {};
    var toSerializableAction = /* @__PURE__ */ __name((action) => {
      if (typeof action === "string") {
        return {
          type: action
        };
      }
      if (typeof action === "function") {
        if ("resolve" in action) {
          return {
            type: action.type
          };
        }
        return {
          type: action.name
        };
      }
      return action;
    }, "toSerializableAction");
    var StateNode2 = class _StateNode {
      static {
        __name(this, "StateNode");
      }
      constructor(config, options) {
        this.config = config;
        this.key = void 0;
        this.id = void 0;
        this.type = void 0;
        this.path = void 0;
        this.states = void 0;
        this.history = void 0;
        this.entry = void 0;
        this.exit = void 0;
        this.parent = void 0;
        this.machine = void 0;
        this.meta = void 0;
        this.output = void 0;
        this.order = -1;
        this.description = void 0;
        this.tags = [];
        this.transitions = void 0;
        this.always = void 0;
        this.parent = options._parent;
        this.key = options._key;
        this.machine = options._machine;
        this.path = this.parent ? this.parent.path.concat(this.key) : [];
        this.id = this.config.id || [this.machine.id, ...this.path].join(guards_dist_xstateGuards.STATE_DELIMITER);
        this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
        this.description = this.config.description;
        this.order = this.machine.idMap.size;
        this.machine.idMap.set(this.id, this);
        this.states = this.config.states ? guards_dist_xstateGuards.mapValues(this.config.states, (stateConfig, key) => {
          const stateNode = new _StateNode(stateConfig, {
            _parent: this,
            _key: key,
            _machine: this.machine
          });
          return stateNode;
        }) : EMPTY_OBJECT;
        if (this.type === "compound" && !this.config.initial) {
          throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
        }
        this.history = this.config.history === true ? "shallow" : this.config.history || false;
        this.entry = guards_dist_xstateGuards.toArray(this.config.entry).slice();
        this.exit = guards_dist_xstateGuards.toArray(this.config.exit).slice();
        this.meta = this.config.meta;
        this.output = this.type === "final" || !this.parent ? this.config.output : void 0;
        this.tags = guards_dist_xstateGuards.toArray(config.tags).slice();
      }
      /** @internal */
      _initialize() {
        this.transitions = guards_dist_xstateGuards.formatTransitions(this);
        if (this.config.always) {
          this.always = guards_dist_xstateGuards.toTransitionConfigArray(this.config.always).map((t) => guards_dist_xstateGuards.formatTransition(this, guards_dist_xstateGuards.NULL_EVENT, t));
        }
        Object.keys(this.states).forEach((key) => {
          this.states[key]._initialize();
        });
      }
      /** The well-structured state node definition. */
      get definition() {
        return {
          id: this.id,
          key: this.key,
          version: this.machine.version,
          type: this.type,
          initial: this.initial ? {
            target: this.initial.target,
            source: this,
            actions: this.initial.actions.map(toSerializableAction),
            eventType: null,
            reenter: false,
            toJSON: /* @__PURE__ */ __name(() => ({
              target: this.initial.target.map((t) => `#${t.id}`),
              source: `#${this.id}`,
              actions: this.initial.actions.map(toSerializableAction),
              eventType: null
            }), "toJSON")
          } : void 0,
          history: this.history,
          states: guards_dist_xstateGuards.mapValues(this.states, (state) => {
            return state.definition;
          }),
          on: this.on,
          transitions: [...this.transitions.values()].flat().map((t) => ({
            ...t,
            actions: t.actions.map(toSerializableAction)
          })),
          entry: this.entry.map(toSerializableAction),
          exit: this.exit.map(toSerializableAction),
          meta: this.meta,
          order: this.order || -1,
          output: this.output,
          invoke: this.invoke,
          description: this.description,
          tags: this.tags
        };
      }
      /** @internal */
      toJSON() {
        return this.definition;
      }
      /** The logic invoked as actors by this state node. */
      get invoke() {
        return memo(this, "invoke", () => guards_dist_xstateGuards.toArray(this.config.invoke).map((invokeConfig, i) => {
          const {
            src,
            systemId
          } = invokeConfig;
          const resolvedId = invokeConfig.id ?? guards_dist_xstateGuards.createInvokeId(this.id, i);
          const sourceName = typeof src === "string" ? src : `xstate.invoke.${guards_dist_xstateGuards.createInvokeId(this.id, i)}`;
          return {
            ...invokeConfig,
            src: sourceName,
            id: resolvedId,
            systemId,
            toJSON() {
              const {
                onDone,
                onError,
                ...invokeDefValues
              } = invokeConfig;
              return {
                ...invokeDefValues,
                type: "xstate.invoke",
                src: sourceName,
                id: resolvedId
              };
            }
          };
        }));
      }
      /** The mapping of events to transitions. */
      get on() {
        return memo(this, "on", () => {
          const transitions = this.transitions;
          return [...transitions].flatMap(([descriptor, t]) => t.map((t2) => [descriptor, t2])).reduce((map, [descriptor, transition2]) => {
            map[descriptor] = map[descriptor] || [];
            map[descriptor].push(transition2);
            return map;
          }, {});
        });
      }
      get after() {
        return memo(this, "delayedTransitions", () => guards_dist_xstateGuards.getDelayedTransitions(this));
      }
      get initial() {
        return memo(this, "initial", () => guards_dist_xstateGuards.formatInitialTransition(this, this.config.initial));
      }
      /** @internal */
      next(snapshot, event) {
        const eventType = event.type;
        const actions = [];
        let selectedTransition;
        const candidates = memo(this, `candidates-${eventType}`, () => guards_dist_xstateGuards.getCandidates(this, eventType));
        for (const candidate of candidates) {
          const {
            guard
          } = candidate;
          const resolvedContext = snapshot.context;
          let guardPassed = false;
          try {
            guardPassed = !guard || guards_dist_xstateGuards.evaluateGuard(guard, resolvedContext, event, snapshot);
          } catch (err) {
            const guardType = typeof guard === "string" ? guard : typeof guard === "object" ? guard.type : void 0;
            throw new Error(`Unable to evaluate guard ${guardType ? `'${guardType}' ` : ""}in transition for event '${eventType}' in state node '${this.id}':
${err.message}`);
          }
          if (guardPassed) {
            actions.push(...candidate.actions);
            selectedTransition = candidate;
            break;
          }
        }
        return selectedTransition ? [selectedTransition] : void 0;
      }
      /** All the event types accepted by this state node and its descendants. */
      get events() {
        return memo(this, "events", () => {
          const {
            states
          } = this;
          const events = new Set(this.ownEvents);
          if (states) {
            for (const stateId of Object.keys(states)) {
              const state = states[stateId];
              if (state.states) {
                for (const event of state.events) {
                  events.add(`${event}`);
                }
              }
            }
          }
          return Array.from(events);
        });
      }
      /**
       * All the events that have transitions directly from this state node.
       *
       * Excludes any inert events.
       */
      get ownEvents() {
        const keys = Object.keys(Object.fromEntries(this.transitions));
        const events = new Set(keys.filter((descriptor) => {
          return this.transitions.get(descriptor).some((transition2) => !(!transition2.target && !transition2.actions.length && !transition2.reenter));
        }));
        return Array.from(events);
      }
    };
    var STATE_IDENTIFIER = "#";
    var StateMachine2 = class _StateMachine {
      static {
        __name(this, "StateMachine");
      }
      constructor(config, implementations) {
        this.config = config;
        this.version = void 0;
        this.schemas = void 0;
        this.implementations = void 0;
        this.__xstatenode = true;
        this.idMap = /* @__PURE__ */ new Map();
        this.root = void 0;
        this.id = void 0;
        this.states = void 0;
        this.events = void 0;
        this.id = config.id || "(machine)";
        this.implementations = {
          actors: implementations?.actors ?? {},
          actions: implementations?.actions ?? {},
          delays: implementations?.delays ?? {},
          guards: implementations?.guards ?? {}
        };
        this.version = this.config.version;
        this.schemas = this.config.schemas;
        this.transition = this.transition.bind(this);
        this.getInitialSnapshot = this.getInitialSnapshot.bind(this);
        this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this);
        this.restoreSnapshot = this.restoreSnapshot.bind(this);
        this.start = this.start.bind(this);
        this.root = new StateNode2(config, {
          _key: this.id,
          _machine: this
        });
        this.root._initialize();
        guards_dist_xstateGuards.formatRouteTransitions(this.root);
        this.states = this.root.states;
        this.events = this.root.events;
      }
      /**
       * Clones this state machine with the provided implementations.
       *
       * @param implementations Options (`actions`, `guards`, `actors`, `delays`) to
       *   recursively merge with the existing options.
       * @returns A new `StateMachine` instance with the provided implementations.
       */
      provide(implementations) {
        const {
          actions,
          guards,
          actors,
          delays
        } = this.implementations;
        return new _StateMachine(this.config, {
          actions: {
            ...actions,
            ...implementations.actions
          },
          guards: {
            ...guards,
            ...implementations.guards
          },
          actors: {
            ...actors,
            ...implementations.actors
          },
          delays: {
            ...delays,
            ...implementations.delays
          }
        });
      }
      resolveState(config) {
        const resolvedStateValue = guards_dist_xstateGuards.resolveStateValue(this.root, config.value);
        const nodeSet = guards_dist_xstateGuards.getAllStateNodes(guards_dist_xstateGuards.getStateNodes(this.root, resolvedStateValue));
        return guards_dist_xstateGuards.createMachineSnapshot({
          _nodes: [...nodeSet],
          context: config.context || {},
          children: {},
          status: guards_dist_xstateGuards.isInFinalState(nodeSet, this.root) ? "done" : config.status || "active",
          output: config.output,
          error: config.error,
          historyValue: config.historyValue
        }, this);
      }
      /**
       * Determines the next snapshot given the current `snapshot` and received
       * `event`. Calculates a full macrostep from all microsteps.
       *
       * @param snapshot The current snapshot
       * @param event The received event
       */
      transition(snapshot, event, actorScope) {
        return guards_dist_xstateGuards.macrostep(snapshot, event, actorScope, []).snapshot;
      }
      /**
       * Determines the next state given the current `state` and `event`. Calculates
       * a microstep.
       *
       * @param state The current state
       * @param event The received event
       */
      microstep(snapshot, event, actorScope) {
        return guards_dist_xstateGuards.macrostep(snapshot, event, actorScope, []).microsteps.map(([s]) => s);
      }
      getTransitionData(snapshot, event) {
        return guards_dist_xstateGuards.transitionNode(this.root, snapshot.value, snapshot, event) || [];
      }
      /**
       * The initial state _before_ evaluating any microsteps. This "pre-initial"
       * state is provided to initial actions executed in the initial state.
       *
       * @internal
       */
      _getPreInitialState(actorScope, initEvent, internalQueue) {
        const {
          context
        } = this.config;
        const preInitial = guards_dist_xstateGuards.createMachineSnapshot({
          context: typeof context !== "function" && context ? context : {},
          _nodes: [this.root],
          children: {},
          status: "active"
        }, this);
        if (typeof context === "function") {
          const assignment = /* @__PURE__ */ __name(({
            spawn,
            event,
            self: self2
          }) => context({
            spawn,
            input: event.input,
            self: self2
          }), "assignment");
          return guards_dist_xstateGuards.resolveActionsAndContext(preInitial, initEvent, actorScope, [assign2.assign(assignment)], internalQueue, void 0);
        }
        return preInitial;
      }
      /**
       * Returns the initial `State` instance, with reference to `self` as an
       * `ActorRef`.
       */
      getInitialSnapshot(actorScope, input) {
        const initEvent = guards_dist_xstateGuards.createInitEvent(input);
        const internalQueue = [];
        const preInitialState = this._getPreInitialState(actorScope, initEvent, internalQueue);
        const [nextState] = guards_dist_xstateGuards.initialMicrostep(this.root, preInitialState, actorScope, initEvent, internalQueue);
        const {
          snapshot: macroState
        } = guards_dist_xstateGuards.macrostep(nextState, initEvent, actorScope, internalQueue);
        return macroState;
      }
      start(snapshot) {
        Object.values(snapshot.children).forEach((child) => {
          if (child.getSnapshot().status === "active") {
            child.start();
          }
        });
      }
      getStateNodeById(stateId) {
        const fullPath = guards_dist_xstateGuards.toStatePath(stateId);
        const relativePath = fullPath.slice(1);
        const resolvedStateId = guards_dist_xstateGuards.isStateId(fullPath[0]) ? fullPath[0].slice(STATE_IDENTIFIER.length) : fullPath[0];
        const stateNode = this.idMap.get(resolvedStateId);
        if (!stateNode) {
          throw new Error(`Child state node '#${resolvedStateId}' does not exist on machine '${this.id}'`);
        }
        return guards_dist_xstateGuards.getStateNodeByPath(stateNode, relativePath);
      }
      get definition() {
        return this.root.definition;
      }
      toJSON() {
        return this.definition;
      }
      getPersistedSnapshot(snapshot, options) {
        return guards_dist_xstateGuards.getPersistedSnapshot(snapshot, options);
      }
      restoreSnapshot(snapshot, _actorScope) {
        const children = {};
        const snapshotChildren = snapshot.children;
        Object.keys(snapshotChildren).forEach((actorId) => {
          const actorData = snapshotChildren[actorId];
          const childState = actorData.snapshot;
          const src = actorData.src;
          const logic = typeof src === "string" ? guards_dist_xstateGuards.resolveReferencedActor(this, src) : src;
          if (!logic) {
            return;
          }
          const actorRef = guards_dist_xstateGuards.createActor(logic, {
            id: actorId,
            parent: _actorScope.self,
            syncSnapshot: actorData.syncSnapshot,
            snapshot: childState,
            src,
            systemId: actorData.systemId
          });
          children[actorId] = actorRef;
        });
        function resolveHistoryReferencedState(root, referenced) {
          if (referenced instanceof StateNode2) {
            return referenced;
          }
          try {
            return root.machine.getStateNodeById(referenced.id);
          } catch {
          }
        }
        __name(resolveHistoryReferencedState, "resolveHistoryReferencedState");
        function reviveHistoryValue(root, historyValue) {
          if (!historyValue || typeof historyValue !== "object") {
            return {};
          }
          const revived = {};
          for (const key in historyValue) {
            const arr = historyValue[key];
            for (const item of arr) {
              const resolved = resolveHistoryReferencedState(root, item);
              if (!resolved) {
                continue;
              }
              revived[key] ??= [];
              revived[key].push(resolved);
            }
          }
          return revived;
        }
        __name(reviveHistoryValue, "reviveHistoryValue");
        const revivedHistoryValue = reviveHistoryValue(this.root, snapshot.historyValue);
        const restoredSnapshot = guards_dist_xstateGuards.createMachineSnapshot({
          ...snapshot,
          children,
          _nodes: Array.from(guards_dist_xstateGuards.getAllStateNodes(guards_dist_xstateGuards.getStateNodes(this.root, snapshot.value))),
          historyValue: revivedHistoryValue
        }, this);
        const seen = /* @__PURE__ */ new Set();
        function reviveContext(contextPart, children2) {
          if (seen.has(contextPart)) {
            return;
          }
          seen.add(contextPart);
          for (const key in contextPart) {
            const value = contextPart[key];
            if (value && typeof value === "object") {
              if ("xstate$$type" in value && value.xstate$$type === guards_dist_xstateGuards.$$ACTOR_TYPE) {
                contextPart[key] = children2[value.id];
                continue;
              }
              reviveContext(value, children2);
            }
          }
        }
        __name(reviveContext, "reviveContext");
        reviveContext(restoredSnapshot.context, children);
        return restoredSnapshot;
      }
    };
    exports.StateMachine = StateMachine2;
    exports.StateNode = StateNode2;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/log-b8ad8428.cjs.js
var require_log_b8ad8428_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/log-b8ad8428.cjs.js"(exports) {
    "use strict";
    var guards_dist_xstateGuards = require_raise_f23ccfcb_cjs();
    var assign2 = require_assign_6b5249c3_cjs();
    function resolveEmit(_, snapshot, args, actionParams, {
      event: eventOrExpr
    }) {
      const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
      return [snapshot, {
        event: resolvedEvent
      }, void 0];
    }
    __name(resolveEmit, "resolveEmit");
    function executeEmit(actorScope, {
      event
    }) {
      actorScope.defer(() => actorScope.emit(event));
    }
    __name(executeEmit, "executeEmit");
    function emit2(eventOrExpr) {
      function emit3(_args, _params) {
      }
      __name(emit3, "emit");
      emit3.type = "xstate.emit";
      emit3.event = eventOrExpr;
      emit3.resolve = resolveEmit;
      emit3.execute = executeEmit;
      return emit3;
    }
    __name(emit2, "emit");
    var SpecialTargets2 = /* @__PURE__ */ (function(SpecialTargets3) {
      SpecialTargets3["Parent"] = "#_parent";
      SpecialTargets3["Internal"] = "#_internal";
      return SpecialTargets3;
    })({});
    function resolveSendTo(actorScope, snapshot, args, actionParams, {
      to,
      event: eventOrExpr,
      id,
      delay
    }, extra) {
      const delaysMap = snapshot.machine.implementations.delays;
      if (typeof eventOrExpr === "string") {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `Only event objects may be used with sendTo; use sendTo({ type: "${eventOrExpr}" }) instead`
        );
      }
      const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
      let resolvedDelay;
      if (typeof delay === "string") {
        const configDelay = delaysMap && delaysMap[delay];
        resolvedDelay = typeof configDelay === "function" ? configDelay(args, actionParams) : configDelay;
      } else {
        resolvedDelay = typeof delay === "function" ? delay(args, actionParams) : delay;
      }
      const resolvedTarget = typeof to === "function" ? to(args, actionParams) : to;
      let targetActorRef;
      if (typeof resolvedTarget === "string") {
        if (resolvedTarget === SpecialTargets2.Parent) {
          targetActorRef = actorScope.self._parent;
        } else if (resolvedTarget === SpecialTargets2.Internal) {
          targetActorRef = actorScope.self;
        } else if (resolvedTarget.startsWith("#_")) {
          targetActorRef = snapshot.children[resolvedTarget.slice(2)];
        } else {
          targetActorRef = extra.deferredActorIds?.includes(resolvedTarget) ? resolvedTarget : snapshot.children[resolvedTarget];
        }
        if (!targetActorRef) {
          throw new Error(`Unable to send event to actor '${resolvedTarget}' from machine '${snapshot.machine.id}'.`);
        }
      } else {
        targetActorRef = resolvedTarget || actorScope.self;
      }
      return [snapshot, {
        to: targetActorRef,
        targetId: typeof resolvedTarget === "string" ? resolvedTarget : void 0,
        event: resolvedEvent,
        id,
        delay: resolvedDelay
      }, void 0];
    }
    __name(resolveSendTo, "resolveSendTo");
    function retryResolveSendTo(_, snapshot, params) {
      if (typeof params.to === "string") {
        params.to = snapshot.children[params.to];
      }
    }
    __name(retryResolveSendTo, "retryResolveSendTo");
    function executeSendTo(actorScope, params) {
      actorScope.defer(() => {
        const {
          to,
          event,
          delay,
          id
        } = params;
        if (typeof delay === "number") {
          actorScope.system.scheduler.schedule(actorScope.self, to, event, delay, id);
          return;
        }
        actorScope.system._relay(
          actorScope.self,
          // at this point, in a deferred task, it should already be mutated by retryResolveSendTo
          // if it initially started as a string
          to,
          event.type === guards_dist_xstateGuards.XSTATE_ERROR ? guards_dist_xstateGuards.createErrorActorEvent(actorScope.self.id, event.data) : event
        );
      });
    }
    __name(executeSendTo, "executeSendTo");
    function sendTo2(to, eventOrExpr, options) {
      function sendTo3(_args, _params) {
      }
      __name(sendTo3, "sendTo");
      sendTo3.type = "xstate.sendTo";
      sendTo3.to = to;
      sendTo3.event = eventOrExpr;
      sendTo3.id = options?.id;
      sendTo3.delay = options?.delay;
      sendTo3.resolve = resolveSendTo;
      sendTo3.retryResolve = retryResolveSendTo;
      sendTo3.execute = executeSendTo;
      return sendTo3;
    }
    __name(sendTo2, "sendTo");
    function sendParent2(event, options) {
      return sendTo2(SpecialTargets2.Parent, event, options);
    }
    __name(sendParent2, "sendParent");
    function forwardTo2(target, options) {
      return sendTo2(target, ({
        event
      }) => event, options);
    }
    __name(forwardTo2, "forwardTo");
    function resolveEnqueueActions(actorScope, snapshot, args, actionParams, {
      collect
    }) {
      const actions = [];
      const enqueue = /* @__PURE__ */ __name(function enqueue2(action) {
        actions.push(action);
      }, "enqueue");
      enqueue.assign = (...args2) => {
        actions.push(assign2.assign(...args2));
      };
      enqueue.cancel = (...args2) => {
        actions.push(guards_dist_xstateGuards.cancel(...args2));
      };
      enqueue.raise = (...args2) => {
        actions.push(guards_dist_xstateGuards.raise(...args2));
      };
      enqueue.sendTo = (...args2) => {
        actions.push(sendTo2(...args2));
      };
      enqueue.sendParent = (...args2) => {
        actions.push(sendParent2(...args2));
      };
      enqueue.spawnChild = (...args2) => {
        actions.push(guards_dist_xstateGuards.spawnChild(...args2));
      };
      enqueue.stopChild = (...args2) => {
        actions.push(guards_dist_xstateGuards.stopChild(...args2));
      };
      enqueue.emit = (...args2) => {
        actions.push(emit2(...args2));
      };
      collect({
        context: args.context,
        event: args.event,
        enqueue,
        check: /* @__PURE__ */ __name((guard) => guards_dist_xstateGuards.evaluateGuard(guard, snapshot.context, args.event, snapshot), "check"),
        self: actorScope.self,
        system: actorScope.system
      }, actionParams);
      return [snapshot, void 0, actions];
    }
    __name(resolveEnqueueActions, "resolveEnqueueActions");
    function enqueueActions2(collect) {
      function enqueueActions3(_args, _params) {
      }
      __name(enqueueActions3, "enqueueActions");
      enqueueActions3.type = "xstate.enqueueActions";
      enqueueActions3.collect = collect;
      enqueueActions3.resolve = resolveEnqueueActions;
      return enqueueActions3;
    }
    __name(enqueueActions2, "enqueueActions");
    function resolveLog(_, snapshot, actionArgs, actionParams, {
      value,
      label
    }) {
      return [snapshot, {
        value: typeof value === "function" ? value(actionArgs, actionParams) : value,
        label
      }, void 0];
    }
    __name(resolveLog, "resolveLog");
    function executeLog({
      logger
    }, {
      value,
      label
    }) {
      if (label) {
        logger(label, value);
      } else {
        logger(value);
      }
    }
    __name(executeLog, "executeLog");
    function log2(value = ({
      context,
      event
    }) => ({
      context,
      event
    }), label) {
      function log3(_args, _params) {
      }
      __name(log3, "log");
      log3.type = "xstate.log";
      log3.value = value;
      log3.label = label;
      log3.resolve = resolveLog;
      log3.execute = executeLog;
      return log3;
    }
    __name(log2, "log");
    exports.SpecialTargets = SpecialTargets2;
    exports.emit = emit2;
    exports.enqueueActions = enqueueActions2;
    exports.forwardTo = forwardTo2;
    exports.log = log2;
    exports.sendParent = sendParent2;
    exports.sendTo = sendTo2;
  }
});

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/xstate.cjs.js
var require_xstate_cjs = __commonJS({
  "../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/xstate.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var actors_dist_xstateActors = require_xstate_actors_cjs();
    var guards_dist_xstateGuards = require_raise_f23ccfcb_cjs();
    var StateMachine2 = require_StateMachine_a2656b8a_cjs();
    var assign2 = require_assign_6b5249c3_cjs();
    var log2 = require_log_b8ad8428_cjs();
    require_xstate_dev_cjs();
    function assertEvent2(event, type) {
      const types = guards_dist_xstateGuards.toArray(type);
      const matches = types.some((descriptor) => guards_dist_xstateGuards.matchesEventDescriptor(event.type, descriptor));
      if (!matches) {
        const typesText = types.length === 1 ? `type matching "${types[0]}"` : `one of types matching "${types.join('", "')}"`;
        throw new Error(`Expected event ${JSON.stringify(event)} to have ${typesText}`);
      }
    }
    __name(assertEvent2, "assertEvent");
    function createMachine2(config, implementations) {
      return new StateMachine2.StateMachine(config, implementations);
    }
    __name(createMachine2, "createMachine");
    function createInertActorScope(actorLogic) {
      const self2 = guards_dist_xstateGuards.createActor(actorLogic);
      const inertActorScope = {
        self: self2,
        defer: /* @__PURE__ */ __name(() => {
        }, "defer"),
        id: "",
        logger: /* @__PURE__ */ __name(() => {
        }, "logger"),
        sessionId: "",
        stopChild: /* @__PURE__ */ __name(() => {
        }, "stopChild"),
        system: self2.system,
        emit: /* @__PURE__ */ __name(() => {
        }, "emit"),
        actionExecutor: /* @__PURE__ */ __name(() => {
        }, "actionExecutor")
      };
      return inertActorScope;
    }
    __name(createInertActorScope, "createInertActorScope");
    function getInitialSnapshot2(actorLogic, ...[input]) {
      const actorScope = createInertActorScope(actorLogic);
      return actorLogic.getInitialSnapshot(actorScope, input);
    }
    __name(getInitialSnapshot2, "getInitialSnapshot");
    function getNextSnapshot2(actorLogic, snapshot, event) {
      const inertActorScope = createInertActorScope(actorLogic);
      inertActorScope.self._snapshot = snapshot;
      return actorLogic.transition(snapshot, event, inertActorScope);
    }
    __name(getNextSnapshot2, "getNextSnapshot");
    function setup2({
      schemas,
      actors,
      actions,
      guards,
      delays
    }) {
      return {
        assign: assign2.assign,
        sendTo: log2.sendTo,
        raise: guards_dist_xstateGuards.raise,
        log: log2.log,
        cancel: guards_dist_xstateGuards.cancel,
        stopChild: guards_dist_xstateGuards.stopChild,
        enqueueActions: log2.enqueueActions,
        emit: log2.emit,
        spawnChild: guards_dist_xstateGuards.spawnChild,
        createStateConfig: /* @__PURE__ */ __name((config) => config, "createStateConfig"),
        createAction: /* @__PURE__ */ __name((fn) => fn, "createAction"),
        createMachine: /* @__PURE__ */ __name((config) => createMachine2({
          ...config,
          schemas
        }, {
          actors,
          actions,
          guards,
          delays
        }), "createMachine"),
        extend: /* @__PURE__ */ __name((extended) => setup2({
          schemas,
          actors,
          actions: {
            ...actions,
            ...extended.actions
          },
          guards: {
            ...guards,
            ...extended.guards
          },
          delays: {
            ...delays,
            ...extended.delays
          }
        }), "extend")
      };
    }
    __name(setup2, "setup");
    var SimulatedClock2 = class {
      static {
        __name(this, "SimulatedClock");
      }
      constructor() {
        this.timeouts = /* @__PURE__ */ new Map();
        this._now = 0;
        this._id = 0;
        this._flushing = false;
        this._flushingInvalidated = false;
      }
      now() {
        return this._now;
      }
      getId() {
        return this._id++;
      }
      setTimeout(fn, timeout) {
        this._flushingInvalidated = this._flushing;
        const id = this.getId();
        this.timeouts.set(id, {
          start: this.now(),
          timeout,
          fn
        });
        return id;
      }
      clearTimeout(id) {
        this._flushingInvalidated = this._flushing;
        this.timeouts.delete(id);
      }
      set(time) {
        if (this._now > time) {
          throw new Error("Unable to travel back in time");
        }
        this._now = time;
        this.flushTimeouts();
      }
      flushTimeouts() {
        if (this._flushing) {
          this._flushingInvalidated = true;
          return;
        }
        this._flushing = true;
        const sorted = [...this.timeouts].sort(([_idA, timeoutA], [_idB, timeoutB]) => {
          const endA = timeoutA.start + timeoutA.timeout;
          const endB = timeoutB.start + timeoutB.timeout;
          return endB > endA ? -1 : 1;
        });
        for (const [id, timeout] of sorted) {
          if (this._flushingInvalidated) {
            this._flushingInvalidated = false;
            this._flushing = false;
            this.flushTimeouts();
            return;
          }
          if (this.now() - timeout.start >= timeout.timeout) {
            this.timeouts.delete(id);
            timeout.fn.call(null);
          }
        }
        this._flushing = false;
      }
      increment(ms) {
        this._now += ms;
        this.flushTimeouts();
      }
    };
    function toPromise2(actor) {
      return new Promise((resolve, reject) => {
        actor.subscribe({
          complete: /* @__PURE__ */ __name(() => {
            resolve(actor.getSnapshot().output);
          }, "complete"),
          error: reject
        });
      });
    }
    __name(toPromise2, "toPromise");
    function transition2(logic, snapshot, event) {
      const executableActions = [];
      const actorScope = createInertActorScope(logic);
      actorScope.actionExecutor = (action) => {
        executableActions.push(action);
      };
      const nextSnapshot = logic.transition(snapshot, event, actorScope);
      return [nextSnapshot, executableActions];
    }
    __name(transition2, "transition");
    function initialTransition2(logic, ...[input]) {
      const executableActions = [];
      const actorScope = createInertActorScope(logic);
      actorScope.actionExecutor = (action) => {
        executableActions.push(action);
      };
      const nextSnapshot = logic.getInitialSnapshot(actorScope, input);
      return [nextSnapshot, executableActions];
    }
    __name(initialTransition2, "initialTransition");
    function getMicrosteps2(machine, snapshot, event) {
      const actorScope = createInertActorScope(machine);
      const {
        microsteps
      } = guards_dist_xstateGuards.macrostep(snapshot, event, actorScope, []);
      return microsteps;
    }
    __name(getMicrosteps2, "getMicrosteps");
    function getInitialMicrosteps2(machine, ...[input]) {
      const actorScope = createInertActorScope(machine);
      const initEvent = guards_dist_xstateGuards.createInitEvent(input);
      const internalQueue = [];
      const preInitialSnapshot = machine._getPreInitialState(actorScope, initEvent, internalQueue);
      const first = guards_dist_xstateGuards.initialMicrostep(machine.root, preInitialSnapshot, actorScope, initEvent, internalQueue);
      const {
        microsteps
      } = guards_dist_xstateGuards.macrostep(first[0], initEvent, actorScope, internalQueue);
      return [first, ...microsteps];
    }
    __name(getInitialMicrosteps2, "getInitialMicrosteps");
    function getNextTransitions2(state) {
      const potentialTransitions = [];
      const atomicStates = state._nodes.filter(guards_dist_xstateGuards.isAtomicStateNode);
      const visited = /* @__PURE__ */ new Set();
      for (const stateNode of atomicStates) {
        for (const s of [stateNode].concat(guards_dist_xstateGuards.getProperAncestors(stateNode, void 0))) {
          if (visited.has(s.id)) {
            continue;
          }
          visited.add(s.id);
          for (const [, transitions] of s.transitions) {
            potentialTransitions.push(...transitions);
          }
          if (s.always) {
            potentialTransitions.push(...s.always);
          }
        }
      }
      return potentialTransitions;
    }
    __name(getNextTransitions2, "getNextTransitions");
    var defaultWaitForOptions = {
      timeout: Infinity
      // much more than 10 seconds
    };
    function waitFor2(actorRef, predicate, options) {
      const resolvedOptions = {
        ...defaultWaitForOptions,
        ...options
      };
      return new Promise((res, rej) => {
        const {
          signal
        } = resolvedOptions;
        if (signal?.aborted) {
          rej(signal.reason);
          return;
        }
        let done = false;
        const handle = resolvedOptions.timeout === Infinity ? void 0 : setTimeout(() => {
          dispose();
          rej(new Error(`Timeout of ${resolvedOptions.timeout} ms exceeded`));
        }, resolvedOptions.timeout);
        const dispose = /* @__PURE__ */ __name(() => {
          clearTimeout(handle);
          done = true;
          sub?.unsubscribe();
          if (abortListener) {
            signal.removeEventListener("abort", abortListener);
          }
        }, "dispose");
        function checkEmitted(emitted) {
          if (predicate(emitted)) {
            dispose();
            res(emitted);
          }
        }
        __name(checkEmitted, "checkEmitted");
        let abortListener;
        let sub;
        checkEmitted(actorRef.getSnapshot());
        if (done) {
          return;
        }
        if (signal) {
          abortListener = /* @__PURE__ */ __name(() => {
            dispose();
            rej(signal.reason);
          }, "abortListener");
          signal.addEventListener("abort", abortListener);
        }
        sub = actorRef.subscribe({
          next: checkEmitted,
          error: /* @__PURE__ */ __name((err) => {
            dispose();
            rej(err);
          }, "error"),
          complete: /* @__PURE__ */ __name(() => {
            dispose();
            rej(new Error(`Actor terminated without satisfying predicate`));
          }, "complete")
        });
        if (done) {
          sub.unsubscribe();
        }
      });
    }
    __name(waitFor2, "waitFor");
    exports.createEmptyActor = actors_dist_xstateActors.createEmptyActor;
    exports.fromCallback = actors_dist_xstateActors.fromCallback;
    exports.fromEventObservable = actors_dist_xstateActors.fromEventObservable;
    exports.fromObservable = actors_dist_xstateActors.fromObservable;
    exports.fromPromise = actors_dist_xstateActors.fromPromise;
    exports.fromTransition = actors_dist_xstateActors.fromTransition;
    exports.Actor = guards_dist_xstateGuards.Actor;
    exports.__unsafe_getAllOwnEventDescriptors = guards_dist_xstateGuards.getAllOwnEventDescriptors;
    exports.and = guards_dist_xstateGuards.and;
    exports.cancel = guards_dist_xstateGuards.cancel;
    exports.createActor = guards_dist_xstateGuards.createActor;
    exports.getStateNodes = guards_dist_xstateGuards.getStateNodes;
    exports.interpret = guards_dist_xstateGuards.interpret;
    exports.isMachineSnapshot = guards_dist_xstateGuards.isMachineSnapshot;
    exports.matchesState = guards_dist_xstateGuards.matchesState;
    exports.not = guards_dist_xstateGuards.not;
    exports.or = guards_dist_xstateGuards.or;
    exports.pathToStateValue = guards_dist_xstateGuards.pathToStateValue;
    exports.raise = guards_dist_xstateGuards.raise;
    exports.spawnChild = guards_dist_xstateGuards.spawnChild;
    exports.stateIn = guards_dist_xstateGuards.stateIn;
    exports.stop = guards_dist_xstateGuards.stop;
    exports.stopChild = guards_dist_xstateGuards.stopChild;
    exports.toObserver = guards_dist_xstateGuards.toObserver;
    exports.StateMachine = StateMachine2.StateMachine;
    exports.StateNode = StateMachine2.StateNode;
    exports.assign = assign2.assign;
    exports.SpecialTargets = log2.SpecialTargets;
    exports.emit = log2.emit;
    exports.enqueueActions = log2.enqueueActions;
    exports.forwardTo = log2.forwardTo;
    exports.log = log2.log;
    exports.sendParent = log2.sendParent;
    exports.sendTo = log2.sendTo;
    exports.SimulatedClock = SimulatedClock2;
    exports.assertEvent = assertEvent2;
    exports.createMachine = createMachine2;
    exports.getInitialMicrosteps = getInitialMicrosteps2;
    exports.getInitialSnapshot = getInitialSnapshot2;
    exports.getMicrosteps = getMicrosteps2;
    exports.getNextSnapshot = getNextSnapshot2;
    exports.getNextTransitions = getNextTransitions2;
    exports.initialTransition = initialTransition2;
    exports.setup = setup2;
    exports.toPromise = toPromise2;
    exports.transition = transition2;
    exports.waitFor = waitFor2;
  }
});

// ../../../node_modules/.pnpm/xstate-migrate@0.0.7_xstate@5.28.0/node_modules/xstate-migrate/lib/migrate.js
var require_migrate = __commonJS({
  "../../../node_modules/.pnpm/xstate-migrate@0.0.7_xstate@5.28.0/node_modules/xstate-migrate/lib/migrate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.xstateMigrate = void 0;
    var fast_json_patch_1 = require_fast_json_patch();
    var xstate_1 = require_xstate_cjs();
    var getValidStates = /* @__PURE__ */ __name((machine) => {
      if (typeof machine === "object" && machine !== null && "idMap" in machine && machine.idMap instanceof Map) {
        return new Set(Array.from(machine.idMap.keys()).map((key) => key.replace(/\./g, "/")));
      } else {
        throw new Error("Unable to find idMap on machine");
      }
    }, "getValidStates");
    exports.xstateMigrate = {
      generateMigrations: /* @__PURE__ */ __name((machine, persistedSnapshot, input) => {
        const actor = (0, xstate_1.createActor)(machine, { input }).start();
        const initialSnap = actor.getSnapshot();
        const persistedContext = persistedSnapshot.context || {};
        const initialContext = initialSnap.context || {};
        const contextOperations = (0, fast_json_patch_1.compare)(persistedContext, initialContext).filter((operation) => operation.op === "add").map((operation) => ({
          ...operation,
          path: `/context${operation.path}`
        }));
        const validStates = getValidStates(machine);
        const valueOperations = [];
        const getInitialStateValue = /* @__PURE__ */ __name((initialState, path) => {
          if (path.length === 0)
            return initialState;
          return getInitialStateValue(initialState[path[0]], path.slice(1));
        }, "getInitialStateValue");
        const handleStateValue = /* @__PURE__ */ __name((stateValue, path, initialPath = []) => {
          if (typeof stateValue === "object" && stateValue !== null) {
            Object.keys(stateValue).forEach((key) => {
              const newPath = `${path}/${key}`;
              const newInitialPath = [...initialPath, key];
              if (typeof stateValue[key] === "string" && !validStates.has(`${machine.id}${newPath}/${stateValue[key]}`.replace(/\./g, "/"))) {
                const initialStateValue = getInitialStateValue(initialSnap.value, newInitialPath);
                valueOperations.push({
                  op: "replace",
                  path: `/value${newPath}`,
                  value: initialStateValue
                });
              } else {
                handleStateValue(stateValue[key], newPath, newInitialPath);
              }
            });
          } else if (typeof stateValue === "string") {
            const fullPath = `${machine.id}${path}/${stateValue}`.replace(/\./g, "/");
            if (!validStates.has(fullPath)) {
              const initialStateValue = getInitialStateValue(initialSnap.value, initialPath);
              valueOperations.push({
                op: "replace",
                path: `/value${path}`,
                value: initialStateValue
              });
            }
          }
        }, "handleStateValue");
        handleStateValue(persistedSnapshot.value, "");
        const allOperations = [...valueOperations, ...contextOperations];
        return allOperations;
      }, "generateMigrations"),
      applyMigrations: /* @__PURE__ */ __name((persistedSnapshot, migrations) => {
        const migratedSnapshot = JSON.parse(JSON.stringify(persistedSnapshot));
        (0, fast_json_patch_1.applyPatch)(migratedSnapshot, migrations);
        return migratedSnapshot;
      }, "applyMigrations")
    };
  }
});

// ../../../node_modules/.pnpm/xstate-migrate@0.0.7_xstate@5.28.0/node_modules/xstate-migrate/lib/index.js
var require_lib = __commonJS({
  "../../../node_modules/.pnpm/xstate-migrate@0.0.7_xstate@5.28.0/node_modules/xstate-migrate/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_migrate(), exports);
  }
});

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  __name(assertIs, "assertIs");
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  __name(assertNever, "assertNever");
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  __name(joinValues, "joinValues");
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = /* @__PURE__ */ __name((data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
}, "getParsedType");

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = /* @__PURE__ */ __name((obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
}, "quotelessJson");
var ZodError = class _ZodError extends Error {
  static {
    __name(this, "ZodError");
  }
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = /* @__PURE__ */ __name((error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    }, "processError");
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
  let message2;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message2 = "Required";
      } else {
        message2 = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message2 = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message2 = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message2 = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message2 = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message2 = `Invalid ${issue.validation}`;
      } else {
        message2 = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message2 = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message2 = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message2 = "Number must be finite";
      break;
    default:
      message2 = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message: message2 };
}, "errorMap");
var en_default = errorMap;

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
__name(setErrorMap, "setErrorMap");
function getErrorMap() {
  return overrideErrorMap;
}
__name(getErrorMap, "getErrorMap");

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = /* @__PURE__ */ __name((params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
}, "makeIssue");
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
__name(addIssueToContext, "addIssueToContext");
var ParseStatus = class _ParseStatus {
  static {
    __name(this, "ParseStatus");
  }
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY");
var OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
var isAborted = /* @__PURE__ */ __name((x) => x.status === "aborted", "isAborted");
var isDirty = /* @__PURE__ */ __name((x) => x.status === "dirty", "isDirty");
var isValid = /* @__PURE__ */ __name((x) => x.status === "valid", "isValid");
var isAsync = /* @__PURE__ */ __name((x) => typeof Promise !== "undefined" && x instanceof Promise, "isAsync");

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
  errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2?.message;
})(errorUtil || (errorUtil = {}));

// ../../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  static {
    __name(this, "ParseInputLazyPath");
  }
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = /* @__PURE__ */ __name((ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
}, "handleResult");
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = /* @__PURE__ */ __name((iss, ctx) => {
    const { message: message2 } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message2 ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message2 ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message2 ?? invalid_type_error ?? ctx.defaultError };
  }, "customMap");
  return { errorMap: customMap, description };
}
__name(processCreateParams, "processCreateParams");
var ZodType = class {
  static {
    __name(this, "ZodType");
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message2) {
    const getIssueProperties = /* @__PURE__ */ __name((val) => {
      if (typeof message2 === "string" || typeof message2 === "undefined") {
        return { message: message2 };
      } else if (typeof message2 === "function") {
        return message2(val);
      } else {
        return message2;
      }
    }, "getIssueProperties");
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = /* @__PURE__ */ __name(() => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      }), "setError");
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: /* @__PURE__ */ __name((data) => this["~validate"](data), "validate")
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
__name(timeRegexSource, "timeRegexSource");
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
__name(timeRegex, "timeRegex");
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
__name(datetimeRegex, "datetimeRegex");
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidIP, "isValidIP");
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
__name(isValidJWT, "isValidJWT");
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidCidr, "isValidCidr");
var ZodString = class _ZodString extends ZodType {
  static {
    __name(this, "ZodString");
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message2) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message2)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message2) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
  }
  url(message2) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
  }
  emoji(message2) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
  }
  uuid(message2) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
  }
  nanoid(message2) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message2) });
  }
  cuid(message2) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
  }
  cuid2(message2) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
  }
  ulid(message2) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
  }
  base64(message2) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message2) });
  }
  base64url(message2) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message2)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message2) {
    return this._addCheck({ kind: "date", message: message2 });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message2) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message2) });
  }
  regex(regex, message2) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message2)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message2) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  endsWith(value, message2) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  min(minLength, message2) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message2)
    });
  }
  max(maxLength, message2) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message2)
    });
  }
  length(len, message2) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message2)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message2) {
    return this.min(1, errorUtil.errToObj(message2));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
__name(floatSafeRemainder, "floatSafeRemainder");
var ZodNumber = class _ZodNumber extends ZodType {
  static {
    __name(this, "ZodNumber");
  }
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message2) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message2)
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  finite(message2) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message2)
    });
  }
  safe(message2) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  static {
    __name(this, "ZodBigInt");
  }
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  static {
    __name(this, "ZodBoolean");
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  static {
    __name(this, "ZodDate");
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message2) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  max(maxDate, message2) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  static {
    __name(this, "ZodSymbol");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  static {
    __name(this, "ZodUndefined");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  static {
    __name(this, "ZodNull");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  static {
    __name(this, "ZodAny");
  }
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  static {
    __name(this, "ZodUnknown");
  }
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  static {
    __name(this, "ZodNever");
  }
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  static {
    __name(this, "ZodVoid");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  static {
    __name(this, "ZodArray");
  }
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message2) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message2) }
    });
  }
  max(maxLength, message2) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message2) }
    });
  }
  length(len, message2) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message2) }
    });
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
__name(deepPartialify, "deepPartialify");
var ZodObject = class _ZodObject extends ZodType {
  static {
    __name(this, "ZodObject");
  }
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message2) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message2 !== void 0 ? {
        errorMap: /* @__PURE__ */ __name((issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message2).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }, "errorMap")
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => ({
        ...this._def.shape(),
        ...augmentation
      }), "shape")
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: /* @__PURE__ */ __name(() => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }), "shape"),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => shape, "shape")
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => shape, "shape")
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: /* @__PURE__ */ __name(() => shape, "shape"),
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: /* @__PURE__ */ __name(() => shape, "shape"),
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  static {
    __name(this, "ZodUnion");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    __name(handleResults, "handleResults");
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = /* @__PURE__ */ __name((type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
}, "getDiscriminator");
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  static {
    __name(this, "ZodDiscriminatedUnion");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
__name(mergeValues, "mergeValues");
var ZodIntersection = class extends ZodType {
  static {
    __name(this, "ZodIntersection");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    }, "handleParsed");
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  static {
    __name(this, "ZodTuple");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  static {
    __name(this, "ZodRecord");
  }
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  static {
    __name(this, "ZodMap");
  }
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  static {
    __name(this, "ZodSet");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    __name(finalizeSet, "finalizeSet");
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message2) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message2) }
    });
  }
  max(maxSize, message2) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message2) }
    });
  }
  size(size, message2) {
    return this.min(size, message2).max(size, message2);
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  static {
    __name(this, "ZodFunction");
  }
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    __name(makeArgsIssue, "makeArgsIssue");
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    __name(makeReturnsIssue, "makeReturnsIssue");
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  static {
    __name(this, "ZodLazy");
  }
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  static {
    __name(this, "ZodLiteral");
  }
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
__name(createZodEnum, "createZodEnum");
var ZodEnum = class _ZodEnum extends ZodType {
  static {
    __name(this, "ZodEnum");
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  static {
    __name(this, "ZodNativeEnum");
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  static {
    __name(this, "ZodPromise");
  }
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  static {
    __name(this, "ZodEffects");
  }
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: /* @__PURE__ */ __name((arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      }, "addIssue"),
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = /* @__PURE__ */ __name((acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      }, "executeRefinement");
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  static {
    __name(this, "ZodOptional");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  static {
    __name(this, "ZodNullable");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  static {
    __name(this, "ZodDefault");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  static {
    __name(this, "ZodCatch");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  static {
    __name(this, "ZodNaN");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  static {
    __name(this, "ZodBranded");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  static {
    __name(this, "ZodPipeline");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = /* @__PURE__ */ __name(async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }, "handleAsync");
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  static {
    __name(this, "ZodReadonly");
  }
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = /* @__PURE__ */ __name((data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    }, "freeze");
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
__name(cleanParams, "cleanParams");
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
__name(custom, "custom");
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = /* @__PURE__ */ __name((cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params), "instanceOfType");
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
var onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
var oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
var coerce = {
  string: /* @__PURE__ */ __name(((arg) => ZodString.create({ ...arg, coerce: true })), "string"),
  number: /* @__PURE__ */ __name(((arg) => ZodNumber.create({ ...arg, coerce: true })), "number"),
  boolean: /* @__PURE__ */ __name(((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })), "boolean"),
  bigint: /* @__PURE__ */ __name(((arg) => ZodBigInt.create({ ...arg, coerce: true })), "bigint"),
  date: /* @__PURE__ */ __name(((arg) => ZodDate.create({ ...arg, coerce: true })), "date")
};
var NEVER = INVALID;

// ../../../dist/schemas-CvHEkdQm.mjs
var BotManagementSchema = external_exports.object({
  corporateProxy: external_exports.boolean(),
  verifiedBot: external_exports.boolean(),
  jsDetection: external_exports.object({ passed: external_exports.boolean() }),
  staticResource: external_exports.boolean(),
  detectionIds: external_exports.record(external_exports.any()),
  score: external_exports.number()
});
var EnvironmentSchema = external_exports.object({
  ACTOR_KIT_SECRET: external_exports.string(),
  ACTOR_KIT_HOST: external_exports.string()
});
var RequestInfoSchema = external_exports.object({
  longitude: external_exports.string(),
  latitude: external_exports.string(),
  continent: external_exports.string(),
  country: external_exports.string(),
  city: external_exports.string(),
  timezone: external_exports.string(),
  postalCode: external_exports.string(),
  region: external_exports.string(),
  regionCode: external_exports.string(),
  metroCode: external_exports.string(),
  botManagement: BotManagementSchema
});
var CallerSchema = external_exports.object({
  id: external_exports.string(),
  type: external_exports.enum([
    "client",
    "system",
    "service"
  ])
});
var AnyEventSchema = external_exports.object({ type: external_exports.string() }).passthrough();
var SystemEventSchema = external_exports.discriminatedUnion("type", [
  external_exports.object({
    type: external_exports.literal("INITIALIZE"),
    caller: external_exports.object({
      type: external_exports.literal("system"),
      id: external_exports.string()
    })
  }),
  external_exports.object({
    type: external_exports.literal("CONNECT"),
    caller: external_exports.object({
      type: external_exports.literal("system"),
      id: external_exports.string()
    }),
    connectingCaller: CallerSchema
  }),
  external_exports.object({
    type: external_exports.literal("DISCONNECT"),
    caller: external_exports.object({
      type: external_exports.literal("system"),
      id: external_exports.string()
    }),
    disconnectingCaller: CallerSchema
  }),
  external_exports.object({
    type: external_exports.literal("RESUME"),
    caller: external_exports.object({
      type: external_exports.literal("system"),
      id: external_exports.string()
    })
  }),
  external_exports.object({
    type: external_exports.literal("MIGRATE"),
    caller: external_exports.object({
      type: external_exports.literal("system"),
      id: external_exports.string()
    }),
    operations: external_exports.array(external_exports.any())
  })
]);
var CallerIdTypeSchema = external_exports.enum([
  "client",
  "service",
  "system"
]);
var CallerStringSchema = external_exports.string().transform((val, ctx) => {
  if (val === "anonymous") return {
    type: "client",
    id: "anonymous"
  };
  const parts = val.split("-");
  if (parts.length < 2) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `Caller string must be in the format 'type-id' or 'anonymous'. Received '${val}'.`
    });
    return external_exports.NEVER;
  }
  const typeStr = parts[0];
  const id = parts.slice(1).join("-");
  const callerTypeParseResult = CallerIdTypeSchema.safeParse(typeStr);
  if (!callerTypeParseResult.success) {
    callerTypeParseResult.error.issues.forEach(ctx.addIssue);
    return external_exports.NEVER;
  }
  const type = callerTypeParseResult.data;
  if (id.length > 0) return {
    type,
    id
  };
  else {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `The ID part cannot be empty after the type prefix. Received '${id}' for value '${val}'.`
    });
    return external_exports.NEVER;
  }
});

// ../../../dist/durable-object-system-CtfNDDjW.mjs
var PERSISTED_SNAPSHOT_KEY = "persistedSnapshot";
var SQL_SCHEMA = `
-- Alarms table - supports one-time and recurring alarms
CREATE TABLE IF NOT EXISTS alarms (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  scheduled_at INTEGER NOT NULL,
  repeat_interval INTEGER,
  payload TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_alarms_scheduled_at ON alarms(scheduled_at);

-- Actor metadata (replaces KV keys: actorType, actorId, initialCaller, input)
CREATE TABLE IF NOT EXISTS actor_meta (
  actor_id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL,
  initial_caller TEXT NOT NULL,
  input TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Snapshots table (replaces PERSISTED_SNAPSHOT_KEY)
CREATE TABLE IF NOT EXISTS snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seq INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  checksum TEXT NOT NULL,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_snapshots_seq ON snapshots(seq);

-- Event log - append-only log of every event processed by the actor
CREATE TABLE IF NOT EXISTS events (
  seq INTEGER PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  type TEXT NOT NULL,
  caller_id TEXT NOT NULL,
  caller_type TEXT NOT NULL,
  payload TEXT,
  state_value TEXT NOT NULL,
  checksum TEXT NOT NULL,
  duration_ms REAL
);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_caller ON events(caller_id, caller_type);

-- Actor-level metadata (seq counter, schema version, etc.)
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;
var SqliteStorage = class {
  static {
    __name(this, "SqliteStorage");
  }
  initialized = false;
  sql;
  constructor(storage) {
    this.storage = storage;
    this.sql = storage.sql;
  }
  /**
  * Initialize the database schema if not already done
  */
  ensureInitialized() {
    if (this.initialized) return;
    this.sql.exec(SQL_SCHEMA);
    this.initialized = true;
  }
  getAlarms() {
    this.ensureInitialized();
    return this.queryRows("SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms ORDER BY scheduled_at ASC");
  }
  getDueAlarms(before) {
    this.ensureInitialized();
    return this.queryRows("SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms WHERE scheduled_at <= ? ORDER BY scheduled_at ASC", before);
  }
  getEarliestAlarm() {
    this.ensureInitialized();
    return this.queryRows("SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms ORDER BY scheduled_at ASC LIMIT 1")[0] ?? null;
  }
  insertAlarm(options) {
    this.ensureInitialized();
    this.sql.exec("INSERT INTO alarms (id, type, scheduled_at, repeat_interval, payload, created_at) VALUES (?, ?, ?, ?, ?, ?)", options.id, options.type, options.scheduledAt, options.repeatInterval ?? null, JSON.stringify(options.payload), Date.now());
  }
  updateAlarm(options) {
    this.ensureInitialized();
    this.sql.exec("UPDATE alarms SET scheduled_at = ?, repeat_interval = ?, payload = ? WHERE id = ?", options.scheduledAt, options.repeatInterval ?? null, JSON.stringify(options.payload), options.id);
  }
  deleteAlarm(id) {
    this.ensureInitialized();
    this.sql.exec("DELETE FROM alarms WHERE id = ?", id);
  }
  deleteAlarmsByType(type) {
    this.ensureInitialized();
    this.sql.exec("DELETE FROM alarms WHERE type = ?", type);
  }
  getActorMeta(actorId) {
    this.ensureInitialized();
    const query = actorId ? "SELECT actor_id, actor_type, initial_caller, input, created_at, updated_at FROM actor_meta WHERE actor_id = ?" : "SELECT actor_id, actor_type, initial_caller, input, created_at, updated_at FROM actor_meta LIMIT 1";
    const rows = actorId ? this.queryRows(query, actorId) : this.queryRows(query);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      actorId: row.actor_id,
      actorType: row.actor_type,
      initialCaller: JSON.parse(row.initial_caller),
      input: JSON.parse(row.input)
    };
  }
  setActorMeta(meta) {
    this.ensureInitialized();
    const now = Date.now();
    this.sql.exec(`INSERT INTO actor_meta (actor_id, actor_type, initial_caller, input, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(actor_id) DO UPDATE SET
        actor_type = excluded.actor_type,
        initial_caller = excluded.initial_caller,
        input = excluded.input,
        updated_at = excluded.updated_at`, meta.actorId, meta.actorType, JSON.stringify(meta.initialCaller), JSON.stringify(meta.input), now, now);
  }
  deleteActorMeta(actorId) {
    this.ensureInitialized();
    this.sql.exec("DELETE FROM actor_meta WHERE actor_id = ?", actorId);
  }
  getLatestSnapshot() {
    this.ensureInitialized();
    const rows = this.queryRows("SELECT id, seq, timestamp, checksum, data FROM snapshots ORDER BY seq DESC LIMIT 1");
    if (rows.length === 0) return null;
    return {
      data: rows[0].data,
      seq: rows[0].seq,
      checksum: rows[0].checksum
    };
  }
  insertSnapshot(seq, data, checksum) {
    this.ensureInitialized();
    this.sql.exec("INSERT INTO snapshots (seq, timestamp, checksum, data) VALUES (?, ?, ?, ?)", seq, Date.now(), checksum, data);
  }
  insertEvent(event) {
    this.ensureInitialized();
    this.sql.exec("INSERT INTO events (seq, timestamp, type, caller_id, caller_type, payload, state_value, checksum, duration_ms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", event.seq, event.timestamp, event.type, event.callerId, event.callerType, event.payload ? JSON.stringify(event.payload) : null, event.stateValue, event.checksum, event.durationMs ?? null);
  }
  getEvents(options) {
    this.ensureInitialized();
    const conditions = [];
    const params = [];
    if (options?.afterSeq !== void 0) {
      conditions.push("seq > ?");
      params.push(options.afterSeq);
    }
    if (options?.types && options.types.length > 0) {
      const placeholders = options.types.map(() => "?").join(", ");
      conditions.push(`type IN (${placeholders})`);
      params.push(...options.types);
    }
    const where = conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
    const limit = options?.limit ? ` LIMIT ${options.limit}` : "";
    return this.queryRows(`SELECT seq, timestamp, type, caller_id, caller_type, payload, state_value, checksum, duration_ms FROM events${where} ORDER BY seq ASC${limit}`, ...params);
  }
  pruneEvents(maxEvents, currentSeq) {
    this.ensureInitialized();
    const cutoff = currentSeq - maxEvents;
    if (cutoff <= 0) return;
    this.sql.exec("DELETE FROM events WHERE seq <= ?", cutoff);
  }
  getMeta(key) {
    this.ensureInitialized();
    return this.queryRows("SELECT key, value FROM meta WHERE key = ?", key)[0]?.value ?? null;
  }
  setMeta(key, value) {
    this.ensureInitialized();
    this.sql.exec("INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", key, value);
  }
  /**
  * Migrate data from legacy KV storage to SQLite.
  * Called on first boot after enabling SQLite on the DO class.
  */
  migrateFromKV(storage, actorId) {
    this.ensureInitialized();
    if (this.getMeta("schema_version")) return;
    this.setMeta("schema_version", "1");
    this.setMeta("created_at", String(Date.now()));
  }
  /**
  * Migrate legacy KV data to SQLite tables.
  * This handles the async KV reads and delegates to sync SQLite writes.
  */
  async migrateFromKVAsync(storage) {
    this.ensureInitialized();
    if (this.getMeta("schema_version")) return;
    const [actorType, actorId, initialCallerString, inputString] = await Promise.all([
      storage.get("actorType"),
      storage.get("actorId"),
      storage.get("initialCaller"),
      storage.get("input")
    ]);
    if (actorType && actorId && initialCallerString && inputString) this.setActorMeta({
      actorId,
      actorType,
      initialCaller: JSON.parse(initialCallerString),
      input: JSON.parse(inputString)
    });
    const persistedSnapshot = await storage.get(PERSISTED_SNAPSHOT_KEY);
    if (persistedSnapshot && actorId) {
      const data = typeof persistedSnapshot === "string" ? persistedSnapshot : JSON.stringify(persistedSnapshot);
      this.insertSnapshot(0, data, "migrated-from-kv");
      await storage.delete(PERSISTED_SNAPSHOT_KEY);
    }
    if (actorType) await Promise.all([
      storage.delete("actorType"),
      storage.delete("actorId"),
      storage.delete("initialCaller"),
      storage.delete("input")
    ]);
    this.setMeta("schema_version", "1");
    this.setMeta("created_at", String(Date.now()));
  }
  queryRows(query, ...params) {
    const cursor = this.sql.exec(query, ...params);
    const rows = [];
    for (const row of cursor) rows.push(row);
    return rows;
  }
};
var AlarmManager = class {
  static {
    __name(this, "AlarmManager");
  }
  storage;
  doState;
  currentAlarmId = null;
  currentAlarmTime = null;
  constructor(storage, doState) {
    this.storage = storage;
    this.doState = doState;
  }
  /**
  * Schedule a new alarm
  */
  schedule(options) {
    this.storage.insertAlarm(options);
    this.rescheduleNextAlarm();
  }
  /**
  * Cancel an alarm by ID
  */
  cancel(id) {
    this.storage.deleteAlarm(id);
    if (this.currentAlarmId === id) this.rescheduleNextAlarm();
  }
  /**
  * Cancel all alarms of a specific type
  */
  cancelByType(type) {
    this.storage.deleteAlarmsByType(type);
    this.rescheduleNextAlarm();
  }
  /**
  * Get all pending alarms
  */
  getPendingAlarms() {
    return this.storage.getAlarms().map(this.parseAlarmRecord);
  }
  /**
  * Get alarms that are due now or before a given time
  */
  getDueAlarms(before = Date.now()) {
    return this.storage.getDueAlarms(before).map(this.parseAlarmRecord);
  }
  /**
  * Reschedule the next DO alarm based on the earliest alarm in storage.
  * Sets the actual Durable Object alarm that triggers the alarm() handler.
  */
  rescheduleNextAlarm() {
    const earliest = this.storage.getEarliestAlarm();
    if (!earliest) {
      this.currentAlarmId = null;
      this.currentAlarmTime = null;
      return;
    }
    if (this.currentAlarmId !== earliest.id || this.currentAlarmTime !== earliest.scheduled_at) {
      this.currentAlarmId = earliest.id;
      this.currentAlarmTime = earliest.scheduled_at;
      this.doState.storage.setAlarm(earliest.scheduled_at);
    }
  }
  /**
  * Handle due alarms and return results.
  * Should be called from the Durable Object's alarm() handler.
  */
  handleDueAlarms(handler) {
    const now = Date.now();
    const dueAlarms = this.getDueAlarms(now);
    const results = [];
    for (const alarm of dueAlarms) {
      let rescheduled = false;
      let deleted = true;
      if (alarm.repeatInterval) {
        const nextScheduledAt = now + alarm.repeatInterval;
        this.storage.updateAlarm({
          id: alarm.id,
          type: alarm.type,
          scheduledAt: nextScheduledAt,
          repeatInterval: alarm.repeatInterval,
          payload: alarm.payload
        });
        rescheduled = true;
        deleted = false;
      } else this.storage.deleteAlarm(alarm.id);
      try {
        handler(alarm);
      } catch (error) {
        console.error(`Error handling alarm ${alarm.id}:`, error);
      }
      results.push({
        id: alarm.id,
        type: alarm.type,
        rescheduled,
        deleted
      });
    }
    this.rescheduleNextAlarm();
    return results;
  }
  /**
  * Get the current scheduled DO alarm info
  */
  getCurrentAlarm() {
    return {
      id: this.currentAlarmId,
      time: this.currentAlarmTime
    };
  }
  parseAlarmRecord(record) {
    return {
      id: record.id,
      type: record.type,
      scheduledAt: record.scheduled_at,
      repeatInterval: record.repeat_interval ?? void 0,
      payload: record.payload ? JSON.parse(record.payload) : {},
      createdAt: record.created_at
    };
  }
};
var EventLog = class {
  static {
    __name(this, "EventLog");
  }
  storage;
  options;
  eventSequence;
  constructor(storage, options, initialSequence = 0) {
    this.storage = storage;
    this.options = options;
    this.eventSequence = initialSequence;
  }
  /**
  * Get the current event sequence number
  */
  getSequence() {
    return this.eventSequence;
  }
  /**
  * Increment and return the next sequence number.
  * Also persists the sequence to the meta table.
  */
  nextSequence() {
    this.eventSequence++;
    this.storage.setMeta("last_seq", String(this.eventSequence));
    return this.eventSequence;
  }
  /**
  * Record an event to the log after a transition.
  * Only records if eventLog is enabled.
  */
  recordEvent(entry) {
    if (!this.options.eventLog) return;
    const seq = this.eventSequence;
    const redactedPayload = this.redactFields(entry.payload);
    const insert = {
      seq,
      timestamp: Date.now(),
      type: entry.type,
      callerId: entry.caller.id,
      callerType: entry.caller.type,
      payload: redactedPayload,
      stateValue: JSON.stringify(entry.stateValue),
      checksum: entry.checksum,
      durationMs: entry.durationMs
    };
    this.storage.insertEvent(insert);
    if (this.options.maxEvents && this.options.maxEvents > 0) this.storage.pruneEvents(this.options.maxEvents, seq);
  }
  /**
  * Query events from the log
  */
  queryEvents(options) {
    return this.storage.getEvents(options);
  }
  /**
  * Redact specified fields from an event payload
  */
  redactFields(payload) {
    if (!this.options.redact || this.options.redact.length === 0) return payload;
    const redacted = { ...payload };
    for (const field of this.options.redact) if (field in redacted) delete redacted[field];
    return redacted;
  }
};
function restoreEventSequence(storage) {
  const lastSeq = storage.getMeta("last_seq");
  return lastSeq ? parseInt(lastSeq, 10) : 0;
}
__name(restoreEventSequence, "restoreEventSequence");
var scheduledEventsMap = /* @__PURE__ */ new Map();
function handleXStateAlarm(alarmData, actor) {
  const { scheduledEventId, event } = alarmData;
  scheduledEventsMap.delete(scheduledEventId);
  try {
    if (actor.system && actor.system._relay) actor.system._relay(actor, actor, event);
    else actor.send(event);
  } catch (error) {
    console.error(`[AlarmScheduler] Error handling XState alarm:`, error);
  }
}
__name(handleXStateAlarm, "handleXStateAlarm");
function restoreScheduledEvents(alarms) {
  for (const alarm of alarms) if (alarm.payload.type === "xstate-delay") {
    const { sourceSessionId, targetSessionId, event, scheduledEventId } = alarm.payload;
    const delay = alarm.scheduledAt - Date.now();
    if (delay > 0) scheduledEventsMap.set(scheduledEventId, {
      sourceSessionId,
      targetSessionId,
      event,
      delay,
      id: scheduledEventId.split(".").pop() || scheduledEventId,
      startedAt: alarm.scheduledAt - delay
    });
  }
}
__name(restoreScheduledEvents, "restoreScheduledEvents");

// ../../../dist/worker.mjs
var import_fast_json_patch = __toESM(require_fast_json_patch(), 1);

// ../../../node_modules/.pnpm/xstate@5.28.0/node_modules/xstate/dist/xstate.cjs.mjs
var import_xstate_cjs = __toESM(require_xstate_cjs(), 1);

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
__name(concat, "concat");
function encode(string) {
  const bytes = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    if (code > 127) {
      throw new TypeError("non-ASCII string encountered in encode()");
    }
    bytes[i] = code;
  }
  return bytes;
}
__name(encode, "encode");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/base64.js
function decodeBase64(encoded) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(encoded);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
__name(decodeBase64, "decodeBase64");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/util/base64url.js
function decode(input) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), {
      alphabet: "base64url"
    });
  }
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
__name(decode, "decode");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/crypto_key.js
var unusable = /* @__PURE__ */ __name((name, prop = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`), "unusable");
var isAlgorithm = /* @__PURE__ */ __name((algorithm, name) => algorithm.name === name, "isAlgorithm");
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
__name(getHashLength, "getHashLength");
function checkHashLength(algorithm, expected) {
  const actual = getHashLength(algorithm.hash);
  if (actual !== expected)
    throw unusable(`SHA-${expected}`, "algorithm.hash");
}
__name(checkHashLength, "checkHashLength");
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
__name(getNamedCurve, "getNamedCurve");
function checkUsage(key, usage) {
  if (usage && !key.usages.includes(usage)) {
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
  }
}
__name(checkUsage, "checkUsage");
function checkSigCryptoKey(key, alg, usage) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
      break;
    }
    case "Ed25519":
    case "EdDSA": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87": {
      if (!isAlgorithm(key.algorithm, alg))
        throw unusable(alg);
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usage);
}
__name(checkSigCryptoKey, "checkSigCryptoKey");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
  types = types.filter(Boolean);
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(", ")}, or ${last}.`;
  } else if (types.length === 2) {
    msg += `one of type ${types[0]} or ${types[1]}.`;
  } else {
    msg += `of type ${types[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
__name(message, "message");
var invalidKeyInput = /* @__PURE__ */ __name((actual, ...types) => message("Key must be ", actual, ...types), "invalidKeyInput");
var withAlg = /* @__PURE__ */ __name((alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types), "withAlg");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
  static {
    __name(this, "JOSEError");
  }
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(message2, options) {
    super(message2, options);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static {
    __name(this, "JWTClaimValidationFailed");
  }
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JWTExpired = class extends JOSEError {
  static {
    __name(this, "JWTExpired");
  }
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  static {
    __name(this, "JOSEAlgNotAllowed");
  }
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
  static {
    __name(this, "JOSENotSupported");
  }
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWSInvalid = class extends JOSEError {
  static {
    __name(this, "JWSInvalid");
  }
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
  static {
    __name(this, "JWTInvalid");
  }
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  static {
    __name(this, "JWSSignatureVerificationFailed");
  }
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
  }
};

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/is_key_like.js
var isCryptoKey = /* @__PURE__ */ __name((key) => {
  if (key?.[Symbol.toStringTag] === "CryptoKey")
    return true;
  try {
    return key instanceof CryptoKey;
  } catch {
    return false;
  }
}, "isCryptoKey");
var isKeyObject = /* @__PURE__ */ __name((key) => key?.[Symbol.toStringTag] === "KeyObject", "isKeyObject");
var isKeyLike = /* @__PURE__ */ __name((key) => isCryptoKey(key) || isKeyObject(key), "isKeyLike");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/helpers.js
function decodeBase64url(value, label, ErrorClass) {
  try {
    return decode(value);
  } catch {
    throw new ErrorClass(`Failed to base64url decode the ${label}`);
  }
}
__name(decodeBase64url, "decodeBase64url");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/type_checks.js
var isObjectLike = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null, "isObjectLike");
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}
__name(isObject, "isObject");
function isDisjoint(...headers) {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
}
__name(isDisjoint, "isDisjoint");
var isJWK = /* @__PURE__ */ __name((key) => isObject(key) && typeof key.kty === "string", "isJWK");
var isPrivateJWK = /* @__PURE__ */ __name((key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string"), "isPrivateJWK");
var isPublicJWK = /* @__PURE__ */ __name((key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0, "isPublicJWK");
var isSecretJWK = /* @__PURE__ */ __name((key) => key.kty === "oct" && typeof key.k === "string", "isSecretJWK");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/signing.js
function checkKeyLength(alg, key) {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
}
__name(checkKeyLength, "checkKeyLength");
function subtleAlgorithm(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: parseInt(alg.slice(-3), 10) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
    case "EdDSA":
      return { name: "Ed25519" };
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return { name: alg };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}
__name(subtleAlgorithm, "subtleAlgorithm");
async function getSigKey(alg, key, usage) {
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    return crypto.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  checkSigCryptoKey(key, alg, usage);
  return key;
}
__name(getSigKey, "getSigKey");
async function verify(alg, key, signature, data) {
  const cryptoKey = await getSigKey(alg, key, "verify");
  checkKeyLength(alg, cryptoKey);
  const algorithm = subtleAlgorithm(alg, cryptoKey.algorithm);
  try {
    return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
}
__name(verify, "verify");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/jwk_to_key.js
var unsupportedAlg = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "AKP": {
      switch (jwk.alg) {
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
          algorithm = { name: jwk.alg };
          keyUsages = jwk.priv ? ["sign"] : ["verify"];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
        case "ES384":
        case "ES512":
          algorithm = {
            name: "ECDSA",
            namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[jwk.alg]
          };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
        case "EdDSA":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported(unsupportedAlg);
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
__name(subtleMapping, "subtleMapping");
async function jwkToKey(jwk) {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const keyData = { ...jwk };
  if (keyData.kty !== "AKP") {
    delete keyData.alg;
  }
  delete keyData.use;
  return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
}
__name(jwkToKey, "jwkToKey");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/normalize_key.js
var unusableForAlg = "given KeyObject instance cannot be used for this algorithm";
var cache;
var handleJWK = /* @__PURE__ */ __name(async (key, jwk, alg, freeze = false) => {
  cache ||= /* @__PURE__ */ new WeakMap();
  let cached = cache.get(key);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const cryptoKey = await jwkToKey({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
}, "handleJWK");
var handleKeyObject = /* @__PURE__ */ __name((keyObject, alg) => {
  cache ||= /* @__PURE__ */ new WeakMap();
  let cached = cache.get(keyObject);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const isPublic = keyObject.type === "public";
  const extractable = isPublic ? true : false;
  let cryptoKey;
  if (keyObject.asymmetricKeyType === "x25519") {
    switch (alg) {
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW":
        break;
      default:
        throw new TypeError(unusableForAlg);
    }
    cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
  }
  if (keyObject.asymmetricKeyType === "ed25519") {
    if (alg !== "EdDSA" && alg !== "Ed25519") {
      throw new TypeError(unusableForAlg);
    }
    cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
      isPublic ? "verify" : "sign"
    ]);
  }
  switch (keyObject.asymmetricKeyType) {
    case "ml-dsa-44":
    case "ml-dsa-65":
    case "ml-dsa-87": {
      if (alg !== keyObject.asymmetricKeyType.toUpperCase()) {
        throw new TypeError(unusableForAlg);
      }
      cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
        isPublic ? "verify" : "sign"
      ]);
    }
  }
  if (keyObject.asymmetricKeyType === "rsa") {
    let hash;
    switch (alg) {
      case "RSA-OAEP":
        hash = "SHA-1";
        break;
      case "RS256":
      case "PS256":
      case "RSA-OAEP-256":
        hash = "SHA-256";
        break;
      case "RS384":
      case "PS384":
      case "RSA-OAEP-384":
        hash = "SHA-384";
        break;
      case "RS512":
      case "PS512":
      case "RSA-OAEP-512":
        hash = "SHA-512";
        break;
      default:
        throw new TypeError(unusableForAlg);
    }
    if (alg.startsWith("RSA-OAEP")) {
      return keyObject.toCryptoKey({
        name: "RSA-OAEP",
        hash
      }, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
    }
    cryptoKey = keyObject.toCryptoKey({
      name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
      hash
    }, extractable, [isPublic ? "verify" : "sign"]);
  }
  if (keyObject.asymmetricKeyType === "ec") {
    const nist = /* @__PURE__ */ new Map([
      ["prime256v1", "P-256"],
      ["secp384r1", "P-384"],
      ["secp521r1", "P-521"]
    ]);
    const namedCurve = nist.get(keyObject.asymmetricKeyDetails?.namedCurve);
    if (!namedCurve) {
      throw new TypeError(unusableForAlg);
    }
    const expectedCurve = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
    if (expectedCurve[alg] && namedCurve === expectedCurve[alg]) {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDSA",
        namedCurve
      }, extractable, [isPublic ? "verify" : "sign"]);
    }
    if (alg.startsWith("ECDH-ES")) {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDH",
        namedCurve
      }, extractable, isPublic ? [] : ["deriveBits"]);
    }
  }
  if (!cryptoKey) {
    throw new TypeError(unusableForAlg);
  }
  if (!cached) {
    cache.set(keyObject, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
}, "handleKeyObject");
async function normalizeKey(key, alg) {
  if (key instanceof Uint8Array) {
    return key;
  }
  if (isCryptoKey(key)) {
    return key;
  }
  if (isKeyObject(key)) {
    if (key.type === "secret") {
      return key.export();
    }
    if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") {
      try {
        return handleKeyObject(key, alg);
      } catch (err) {
        if (err instanceof TypeError) {
          throw err;
        }
      }
    }
    let jwk = key.export({ format: "jwk" });
    return handleJWK(key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k) {
      return decode(key.k);
    }
    return handleJWK(key, key, alg, true);
  }
  throw new Error("unreachable");
}
__name(normalizeKey, "normalizeKey");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
__name(validateCrit, "validateCrit");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/validate_algorithms.js
function validateAlgorithms(option, algorithms) {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
}
__name(validateAlgorithms, "validateAlgorithms");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/check_key_type.js
var tag = /* @__PURE__ */ __name((key) => key?.[Symbol.toStringTag], "tag");
var jwkMatchesOp = /* @__PURE__ */ __name((alg, key, usage) => {
  if (key.use !== void 0) {
    let expected;
    switch (usage) {
      case "sign":
      case "verify":
        expected = "sig";
        break;
      case "encrypt":
      case "decrypt":
        expected = "enc";
        break;
    }
    if (key.use !== expected) {
      throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
    }
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
  }
  if (Array.isArray(key.key_ops)) {
    let expectedKeyOp;
    switch (true) {
      case (usage === "sign" || usage === "verify"):
      case alg === "dir":
      case alg.includes("CBC-HS"):
        expectedKeyOp = usage;
        break;
      case alg.startsWith("PBES2"):
        expectedKeyOp = "deriveBits";
        break;
      case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
        if (!alg.includes("GCM") && alg.endsWith("KW")) {
          expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
        } else {
          expectedKeyOp = usage;
        }
        break;
      case (usage === "encrypt" && alg.startsWith("RSA")):
        expectedKeyOp = "wrapKey";
        break;
      case usage === "decrypt":
        expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
        break;
    }
    if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) {
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
    }
  }
  return true;
}, "jwkMatchesOp");
var symmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage) => {
  if (key instanceof Uint8Array)
    return;
  if (isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!isKeyLike(key)) {
    throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
}, "symmetricTypeCheck");
var asymmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage) => {
  if (isJWK(key)) {
    switch (usage) {
      case "decrypt":
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation must be a private JWK`);
      case "encrypt":
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation must be a public JWK`);
    }
  }
  if (!isKeyLike(key)) {
    throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (key.type === "public") {
    switch (usage) {
      case "sign":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
      case "decrypt":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
  }
  if (key.type === "private") {
    switch (usage) {
      case "verify":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
      case "encrypt":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
  }
}, "asymmetricTypeCheck");
function checkKeyType(alg, key, usage) {
  switch (alg.substring(0, 2)) {
    case "A1":
    case "A2":
    case "di":
    case "HS":
    case "PB":
      symmetricTypeCheck(alg, key, usage);
      break;
    default:
      asymmetricTypeCheck(alg, key, usage);
  }
}
__name(checkKeyType, "checkKeyType");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!isDisjoint(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validateCrit(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
  }
  checkKeyType(alg, key, "verify");
  const data = concat(jws.protected !== void 0 ? encode(jws.protected) : new Uint8Array(), encode("."), typeof jws.payload === "string" ? b64 ? encode(jws.payload) : encoder.encode(jws.payload) : jws.payload);
  const signature = decodeBase64url(jws.signature, "signature", JWSInvalid);
  const k = await normalizeKey(key, alg);
  const verified = await verify(alg, k, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    payload = decodeBase64url(jws.payload, "payload", JWSInvalid);
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key: k };
  }
  return result;
}
__name(flattenedVerify, "flattenedVerify");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
__name(compactVerify, "compactVerify");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = /* @__PURE__ */ __name((date) => Math.floor(date.getTime() / 1e3), "epoch");
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
}
__name(secs, "secs");
var normalizeTyp = /* @__PURE__ */ __name((value) => {
  if (value.includes("/")) {
    return value.toLowerCase();
  }
  return `application/${value.toLowerCase()}`;
}, "normalizeTyp");
var checkAudiencePresence = /* @__PURE__ */ __name((audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
}, "checkAudiencePresence");
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
}
__name(validateClaimsSet, "validateClaimsSet");

// ../../../node_modules/.pnpm/jose@6.2.1/node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const verified = await compactVerify(jwt, key, options);
  if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = validateClaimsSet(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
__name(jwtVerify, "jwtVerify");

// ../../../dist/worker.mjs
var import_xstate_migrate = __toESM(require_lib(), 1);
import { DurableObject } from "cloudflare:workers";
function assert(expression, errorMessage) {
  if (!expression) {
    const stack = new Error(errorMessage).stack?.split("\n");
    const assertLine = stack && stack.length >= 3 ? stack[2] : "unknown location";
    throw new Error(`${errorMessage} (Assert failed at ${assertLine?.trim()})`);
  }
}
__name(assert, "assert");
async function getCallerFromRequest(request, actorType, actorId, secret) {
  let accessToken;
  if (request.headers.get("Upgrade") !== "websocket") {
    const stringPart = request.headers.get("Authorization")?.split(" ")[1];
    assert(stringPart, "Expected authorization header to be set");
    accessToken = stringPart;
  } else {
    const paramString = new URLSearchParams(request.url.split("?")[1]).get("accessToken");
    assert(paramString, "expected accessToken when connecting to socket");
    accessToken = paramString;
  }
  return parseAccessTokenForCaller({
    accessToken,
    type: actorType,
    id: actorId,
    secret
  });
}
__name(getCallerFromRequest, "getCallerFromRequest");
async function parseAccessTokenForCaller({ accessToken, type, id, secret }) {
  const verified = await jwtVerify(accessToken, new TextEncoder().encode(secret));
  if (!verified.payload.jti) throw new Error("Expected JTI on accessToken");
  if (verified.payload.jti !== id) throw new Error(`Expected JTI on accessToken to match actor id: ${id}`);
  if (!verified.payload.aud) throw new Error(`Expected accessToken audience to match actor type: ${type}`);
  if (!(Array.isArray(verified.payload.aud) ? verified.payload.aud : [verified.payload.aud]).includes(type)) throw new Error(`Expected accessToken audience to match actor type: ${type}`);
  if (!verified.payload.sub) throw new Error("Expected accessToken to have subject");
  return CallerStringSchema.parse(verified.payload.sub);
}
__name(parseAccessTokenForCaller, "parseAccessTokenForCaller");
var SnapshotRequestSearchSchema = external_exports.object({
  waitForEvent: external_exports.string().optional(),
  waitForState: external_exports.string().optional(),
  timeout: external_exports.string().transform((value) => Number.parseInt(value, 10)).pipe(external_exports.number().int().positive()).optional(),
  errorOnWaitTimeout: external_exports.enum(["true", "false"]).transform((value) => value === "true").optional()
});
var createActorKitRouter = /* @__PURE__ */ __name((routes) => {
  const spawnedActors = /* @__PURE__ */ new Set();
  function getDurableObjectNamespace(env, key) {
    const namespace = env[key.toUpperCase()];
    if (namespace && typeof namespace === "object" && "get" in namespace && "idFromName" in namespace) return namespace;
  }
  __name(getDurableObjectNamespace, "getDurableObjectNamespace");
  return async (request, env, _ctx) => {
    const pathParts = new URL(request.url).pathname.split("/").filter(Boolean);
    if (pathParts.length !== 3 || pathParts[0] !== "api") return new Response("Not Found", { status: 404 });
    const [, actorType, actorId] = pathParts;
    if (!routes.includes(actorType)) return new Response(`Unknown actor type: ${actorType}`, { status: 400 });
    const durableObjectNamespace = getDurableObjectNamespace(env, actorType);
    if (!durableObjectNamespace) return new Response(`Durable Object namespace not found for actor type: ${actorType}`, { status: 500 });
    const durableObjectId = durableObjectNamespace.idFromName(actorId);
    const durableObjectStub = durableObjectNamespace.get(durableObjectId);
    let caller;
    try {
      caller = await getCallerFromRequest(request, actorType, actorId, env.ACTOR_KIT_SECRET);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return new Response(`Error: ${errorMessage}. API requests must specify a valid caller in Bearer token in the Authorization header using fetch method created from 'createActorFetch' or use 'createAccessToken' directly.`, { status: 401 });
    }
    const actorKey = `${actorType}:${actorId}`;
    if (!spawnedActors.has(actorKey)) {
      await durableObjectStub.spawn({
        actorType,
        actorId,
        caller,
        input: {}
      });
      spawnedActors.add(actorKey);
    }
    if (request.headers.get("Upgrade") === "websocket") return durableObjectStub.fetch(request);
    if (request.method === "GET") {
      let searchParams;
      try {
        searchParams = SnapshotRequestSearchSchema.parse(Object.fromEntries(new URL(request.url).searchParams));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Invalid search params";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
      }
      const result = await durableObjectStub.getSnapshot(caller, {
        waitForEvent: searchParams.waitForEvent ? AnyEventSchema.parse(JSON.parse(searchParams.waitForEvent)) : void 0,
        waitForState: searchParams.waitForState ? JSON.parse(searchParams.waitForState) : void 0,
        timeout: searchParams.timeout,
        errorOnWaitTimeout: searchParams.errorOnWaitTimeout
      });
      return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
    } else if (request.method === "POST") {
      let event;
      try {
        const json = await request.json();
        event = AnyEventSchema.parse(json);
      } catch (ex) {
        const errorMessage = ex instanceof Error ? ex.message : "Invalid JSON";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
      }
      durableObjectStub.send({
        ...event,
        caller
      });
      return new Response(JSON.stringify({ success: true }));
    } else return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  };
}, "createActorKitRouter");
var StorageSchema = external_exports.object({
  actorType: external_exports.string(),
  actorId: external_exports.string(),
  initialCaller: CallerSchema,
  input: external_exports.record(external_exports.unknown())
});
var WebSocketAttachmentSchema = external_exports.object({
  caller: CallerSchema,
  lastSentChecksum: external_exports.string().optional()
});
var InputSearchSchema = external_exports.object({ input: external_exports.string().optional() });
var ParsedMessageSchema = external_exports.string().transform((value, context) => {
  try {
    return JSON.parse(value);
  } catch {
    context.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: "Expected valid JSON payload"
    });
    return external_exports.NEVER;
  }
});
function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Unknown error";
}
__name(getErrorMessage, "getErrorMessage");
function parseStoredJson(value, fallbackSchema) {
  const parsedString = external_exports.string().parse(value);
  return fallbackSchema.parse(JSON.parse(parsedString));
}
__name(parseStoredJson, "parseStoredJson");
var createMachineServer = /* @__PURE__ */ __name(({ machine, schemas, options }) => class MachineServerImpl extends DurableObject {
  static {
    __name(this, "MachineServerImpl");
  }
  actor;
  actorType;
  actorId;
  input;
  initialCaller;
  lastPersistedSnapshot = null;
  snapshotCache = /* @__PURE__ */ new Map();
  state;
  storage;
  attachments = /* @__PURE__ */ new Map();
  subscriptions = /* @__PURE__ */ new Map();
  #sendQueues = /* @__PURE__ */ new Map();
  env;
  currentChecksum = null;
  sqliteStorage = null;
  alarmManager = null;
  eventLog = null;
  constructor(state, env) {
    super(state, env);
    this.state = state;
    this.storage = state.storage;
    this.env = env;
    if (options?.sqlite || options?.enableAlarms) {
      this.sqliteStorage = new SqliteStorage(this.storage);
      this.sqliteStorage.ensureInitialized();
      if (options.enableAlarms) this.alarmManager = new AlarmManager(this.sqliteStorage, this.state);
      if (options.sqlite) {
        const initialSeq = restoreEventSequence(this.sqliteStorage);
        this.eventLog = new EventLog(this.sqliteStorage, options.sqlite, initialSeq);
      }
    }
    this.state.blockConcurrencyWhile(async () => {
      let loaded = false;
      if (this.sqliteStorage) {
        await this.sqliteStorage.migrateFromKVAsync(this.storage);
        const meta = this.sqliteStorage.getActorMeta();
        if (meta) {
          this.actorType = meta.actorType;
          this.actorId = meta.actorId;
          this.initialCaller = meta.initialCaller;
          this.input = meta.input;
          loaded = true;
        }
      }
      if (!loaded) {
        const [actorType, actorId, initialCallerString, inputString] = await Promise.all([
          this.storage.get("actorType"),
          this.storage.get("actorId"),
          this.storage.get("initialCaller"),
          this.storage.get("input")
        ]);
        if (actorType && actorId && initialCallerString && inputString) try {
          const parsedData = StorageSchema.parse({
            actorType,
            actorId,
            initialCaller: parseStoredJson(initialCallerString, CallerSchema),
            input: parseStoredJson(inputString, external_exports.record(external_exports.unknown()))
          });
          this.actorType = parsedData.actorType;
          this.actorId = parsedData.actorId;
          this.initialCaller = parsedData.initialCaller;
          this.input = parsedData.input;
          loaded = true;
        } catch {
        }
      }
      if (loaded) if (options?.persisted) {
        const persistedSnapshot = await this.loadPersistedSnapshot();
        if (persistedSnapshot) this.restorePersistedActor(persistedSnapshot);
        else this.#ensureActorRunning();
      } else this.#ensureActorRunning();
      if (this.alarmManager) {
        const xstateAlarms = this.alarmManager.getPendingAlarms().filter((a) => a.type === "xstate-delay" && a.payload).map((a) => ({
          payload: a.payload,
          scheduledAt: a.scheduledAt
        }));
        if (xstateAlarms.length > 0) restoreScheduledEvents(xstateAlarms);
        this.alarmManager.rescheduleNextAlarm();
      }
      for (const socket of this.state.getWebSockets()) this.#subscribeSocketToActor(socket);
    });
    this.#startPeriodicCacheCleanup();
  }
  #ensureActorRunning() {
    assert(this.actorId, "actorId is not set");
    assert(this.actorType, "actorType is not set");
    assert(this.input, "input is not set");
    assert(this.initialCaller, "initialCaller is not set");
    if (!this.actor) {
      this.actor = (0, import_xstate_cjs.createActor)(machine, { input: {
        id: this.actorId,
        caller: this.initialCaller,
        env: this.env,
        storage: this.storage,
        ...this.input
      } });
      if (options?.persisted) this.#setupStatePersistence(this.actor);
      this.actor.start();
    }
    return this.actor;
  }
  #subscribeSocketToActor(ws) {
    try {
      const socket = ws;
      const attachment = WebSocketAttachmentSchema.parse(socket.deserializeAttachment());
      this.attachments.set(socket, attachment);
      this.#enqueueSendStateUpdate(socket);
      const subscription = this.actor?.subscribe(() => {
        this.#enqueueSendStateUpdate(socket);
      });
      if (subscription) this.subscriptions.set(socket, subscription);
    } catch {
    }
  }
  #enqueueSendStateUpdate(ws) {
    const prev = this.#sendQueues.get(ws);
    const next = (prev ? prev.then(() => this.#sendStateUpdate(ws)) : this.#sendStateUpdate(ws)).catch(() => {
    });
    this.#sendQueues.set(ws, next);
  }
  async #sendStateUpdate(ws) {
    assert(this.actor, "actor is not running");
    const attachment = this.attachments.get(ws);
    assert(attachment, "Attachment missing for WebSocket");
    const fullSnapshot = this.actor.getSnapshot();
    const currentChecksum = await this.#calculateChecksum(fullSnapshot);
    this.snapshotCache.set(currentChecksum, {
      snapshot: fullSnapshot,
      timestamp: Date.now()
    });
    this.#scheduleSnapshotCacheCleanup(currentChecksum);
    this.currentChecksum = currentChecksum;
    if (attachment.lastSentChecksum === currentChecksum) return;
    const nextSnapshot = this.#createCallerSnapshot(fullSnapshot, attachment.caller.id);
    let lastSnapshot = {};
    if (attachment.lastSentChecksum) {
      const cachedSnapshot = this.snapshotCache.get(attachment.lastSentChecksum);
      if (cachedSnapshot) lastSnapshot = this.#createCallerSnapshot(cachedSnapshot.snapshot, attachment.caller.id);
    }
    const operations = (0, import_fast_json_patch.compare)(lastSnapshot, nextSnapshot);
    if (operations.length === 0) return;
    ws.send(JSON.stringify({
      operations,
      checksum: currentChecksum
    }));
    attachment.lastSentChecksum = currentChecksum;
    ws.serializeAttachment(attachment);
  }
  #setupStatePersistence(actor) {
    actor.subscribe(() => {
      const fullSnapshot = actor.getSnapshot();
      this.#persistSnapshot(fullSnapshot).catch(() => {
      });
    });
  }
  async #persistSnapshot(snapshot) {
    if (this.lastPersistedSnapshot && (0, import_fast_json_patch.compare)(this.lastPersistedSnapshot, snapshot).length === 0) return;
    const data = JSON.stringify(snapshot);
    if (this.sqliteStorage) {
      const checksum = await this.#calculateChecksum(snapshot);
      const seq = this.eventLog?.getSequence() ?? 0;
      this.sqliteStorage.insertSnapshot(seq, data, checksum);
    } else await this.storage.put(PERSISTED_SNAPSHOT_KEY, data);
    this.lastPersistedSnapshot = snapshot;
  }
  async #setupActorFromRequest(request) {
    const url = new URL(request.url);
    const searchParams = InputSearchSchema.parse(Object.fromEntries(url.searchParams));
    const [, actorType, actorId] = url.pathname.split("/").filter(Boolean);
    if (!actorType || !actorId) return new Response("Invalid actor path", { status: 400 });
    if (Object.values(schemas.inputProps.shape).some((field) => !field.isOptional()) && !searchParams.input) return new Response("Input parameters required for initial actor setup", { status: 400 });
    let input = {};
    if (searchParams.input) try {
      input = schemas.inputProps.parse(JSON.parse(searchParams.input));
    } catch (error) {
      return new Response(`Invalid input: ${getErrorMessage(error)}`, { status: 400 });
    }
    const caller = await this.#getValidatedCaller(request, actorType, actorId);
    if (!caller) return new Response("Unauthorized", { status: 401 });
    await this.#storeActorData(actorType, actorId, caller, input);
    this.actorType = actorType;
    this.actorId = actorId;
    this.initialCaller = caller;
    this.input = input;
    return null;
  }
  async #getValidatedCaller(request, actorType, actorId) {
    try {
      return await getCallerFromRequest(request, actorType, actorId, this.env.ACTOR_KIT_SECRET);
    } catch {
      return null;
    }
  }
  async #storeActorData(actorType, actorId, caller, input) {
    if (this.sqliteStorage) this.sqliteStorage.setActorMeta({
      actorId,
      actorType,
      initialCaller: caller,
      input
    });
    else await Promise.all([
      this.storage.put("actorType", actorType),
      this.storage.put("actorId", actorId),
      this.storage.put("initialCaller", JSON.stringify(caller)),
      this.storage.put("input", JSON.stringify(input))
    ]);
  }
  #isActorRunning() {
    return Boolean(this.actorType);
  }
  async fetch(request) {
    const clientChecksum = new URL(request.url).searchParams.get("checksum");
    if (!this.#isActorRunning()) {
      const setupError = await this.#setupActorFromRequest(request);
      if (setupError) return setupError;
    }
    this.#ensureActorRunning();
    assert(this.actorType, "actorType is not set");
    assert(this.actorId, "actorId is not set");
    const webSocketPair = new WebSocketPair();
    const client = webSocketPair[0];
    const server = webSocketPair[1];
    const caller = await this.#getValidatedCaller(request, this.actorType, this.actorId);
    if (!caller) return new Response("Unauthorized", { status: 401 });
    this.state.acceptWebSocket(server);
    server.serializeAttachment({
      caller,
      lastSentChecksum: clientChecksum ?? void 0
    });
    this.#subscribeSocketToActor(server);
    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }
  async webSocketMessage(ws, message2) {
    const attachment = this.attachments.get(ws);
    assert(attachment, "Attachment missing for WebSocket");
    const messageString = typeof message2 === "string" ? message2 : new TextDecoder().decode(message2);
    const parsedMessage = ParsedMessageSchema.parse(messageString);
    if (attachment.caller.type === "client") {
      const clientEvent = schemas.clientEvent.parse(parsedMessage);
      this.send({
        ...clientEvent,
        caller: attachment.caller
      });
      return;
    }
    if (attachment.caller.type === "service") {
      const serviceEvent = schemas.serviceEvent.parse(parsedMessage);
      this.send({
        ...serviceEvent,
        caller: attachment.caller
      });
      return;
    }
    throw new Error(`Unknown caller type: ${attachment.caller.type}`);
  }
  async webSocketError(_ws, _error) {
  }
  async webSocketClose(ws, code, _reason, _wasClean) {
    ws.close(code, "Durable Object is closing WebSocket");
    const subscription = this.subscriptions.get(ws);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(ws);
    }
    this.attachments.delete(ws);
    this.#sendQueues.delete(ws);
  }
  send(event) {
    assert(this.actor, "Actor is not running");
    const seq = this.eventLog ? this.eventLog.nextSequence() : 0;
    const timestamp = Date.now();
    const startTime = performance.now();
    this.actor.send({
      ...event,
      env: this.env,
      storage: this.storage,
      _timestamp: timestamp,
      _seq: seq
    });
    if (this.eventLog && this.actor) {
      const durationMs = performance.now() - startTime;
      const snapshot = this.actor.getSnapshot();
      const snapshotValue = snapshot.value;
      this.#calculateChecksum(snapshot).then((checksum) => {
        const caller = event.caller;
        this.eventLog?.recordEvent({
          type: event.type,
          caller: caller ?? {
            id: "unknown",
            type: "system"
          },
          payload: event,
          stateValue: snapshotValue,
          checksum,
          durationMs
        });
      }).catch(() => {
      });
    }
  }
  async getSnapshot(caller, options2) {
    this.#ensureActorRunning();
    if (!options2?.waitForEvent && !options2?.waitForState) return await this.#getCurrentSnapshot(caller);
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (options2.errorOnWaitTimeout !== false) reject(/* @__PURE__ */ new Error("Timeout waiting for event or state"));
        else resolve(await this.#getCurrentSnapshot(caller));
      }, options2.timeout ?? 5e3);
    });
    const waitPromise = new Promise((resolve) => {
      const subscription = this.actor?.subscribe(async (snapshot) => {
        if (options2.waitForEvent && this.#matchesEvent(snapshot, options2.waitForEvent) || options2.waitForState && this.#matchesState(snapshot, options2.waitForState)) {
          subscription?.unsubscribe();
          resolve(await this.#getCurrentSnapshot(caller));
        }
      });
    });
    return Promise.race([waitPromise, timeoutPromise]);
  }
  async #getCurrentSnapshot(caller) {
    const fullSnapshot = this.actor?.getSnapshot();
    assert(fullSnapshot, "Actor snapshot is not available");
    return {
      snapshot: this.#createCallerSnapshot(fullSnapshot, caller.id),
      checksum: await this.#calculateChecksum(fullSnapshot)
    };
  }
  #matchesEvent(_snapshot, _event) {
    return true;
  }
  #matchesState(snapshot, stateValue) {
    return (0, import_xstate_cjs.matchesState)(stateValue, snapshot);
  }
  async #calculateChecksum(snapshot) {
    const str = JSON.stringify(snapshot);
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-256", buffer);
    const array = new Uint8Array(hash);
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  #createCallerSnapshot(fullSnapshot, callerId) {
    const snapshot = fullSnapshot;
    assert(snapshot.value, "expected value");
    assert(snapshot.context.public, "expected public key in context");
    assert(snapshot.context.private, "expected private key in context");
    return {
      public: snapshot.context.public,
      private: snapshot.context.private[callerId] ?? {},
      value: snapshot.value
    };
  }
  async spawn(props) {
    if (this.actorType || this.actorId || this.initialCaller) return;
    await this.#storeActorData(props.actorType, props.actorId, props.caller, props.input);
    this.actorType = props.actorType;
    this.actorId = props.actorId;
    this.initialCaller = props.caller;
    this.input = props.input;
    this.#ensureActorRunning();
  }
  #scheduleSnapshotCacheCleanup(checksum) {
    setTimeout(() => {
      this.#cleanupSnapshotCache(checksum);
    }, 3e5);
  }
  #startPeriodicCacheCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [checksum, { timestamp }] of this.snapshotCache.entries()) if (now - timestamp > 3e5) this.snapshotCache.delete(checksum);
    }, 3e5);
  }
  #cleanupSnapshotCache(checksum) {
    if (checksum === this.currentChecksum) return;
    const cachedData = this.snapshotCache.get(checksum);
    if (cachedData && Date.now() - cachedData.timestamp > 3e5) this.snapshotCache.delete(checksum);
  }
  async loadPersistedSnapshot() {
    if (this.sqliteStorage) {
      const row = this.sqliteStorage.getLatestSnapshot();
      if (row) return JSON.parse(row.data);
      return null;
    }
    const snapshotString = await this.storage.get(PERSISTED_SNAPSHOT_KEY);
    return snapshotString ? JSON.parse(external_exports.string().parse(snapshotString)) : null;
  }
  restorePersistedActor(persistedSnapshot) {
    assert(this.actorId, "actorId is not set");
    assert(this.actorType, "actorType is not set");
    assert(this.initialCaller, "initialCaller is not set");
    assert(this.input, "input is not set");
    const input = {
      id: this.actorId,
      caller: this.initialCaller,
      storage: this.storage,
      env: this.env,
      ...this.input
    };
    const migrations = import_xstate_migrate.xstateMigrate.generateMigrations(machine, persistedSnapshot, input);
    const restoredSnapshot = import_xstate_migrate.xstateMigrate.applyMigrations(persistedSnapshot, migrations);
    this.actor = (0, import_xstate_cjs.createActor)(machine, {
      snapshot: restoredSnapshot,
      input
    });
    if (options?.persisted) this.#setupStatePersistence(this.actor);
    this.actor.start();
    this.actor.send({
      type: "RESUME",
      caller: {
        id: this.actorId,
        type: "system"
      },
      env: this.env,
      storage: this.storage
    });
    this.lastPersistedSnapshot = restoredSnapshot;
  }
  /**
  * Durable Object alarm handler.
  * Processes due alarms (XState delayed events, custom alarms).
  */
  async alarm() {
    if (!this.alarmManager) return;
    this.alarmManager.handleDueAlarms((alarm) => {
      if (alarm.type === "xstate-delay" && this.actor) {
        const alarmData = alarm.payload;
        handleXStateAlarm(alarmData, this.actor);
      }
    });
  }
}, "createMachineServer");

// worker-sqlite.ts
import { WorkerEntrypoint } from "cloudflare:workers";
var CounterClientEventSchema = external_exports.discriminatedUnion("type", [
  external_exports.object({ type: external_exports.literal("INCREMENT") }),
  external_exports.object({ type: external_exports.literal("DECREMENT") }),
  external_exports.object({ type: external_exports.literal("SET"), value: external_exports.number() })
]);
var CounterServiceEventSchema = external_exports.discriminatedUnion("type", [
  external_exports.object({ type: external_exports.literal("RESET") })
]);
var CounterInputPropsSchema = external_exports.object({
  initialCount: external_exports.number().optional()
});
var counterMachine = (0, import_xstate_cjs.setup)({
  types: {
    context: {},
    events: {},
    input: {}
  },
  actions: {
    increment: (0, import_xstate_cjs.assign)({
      public: /* @__PURE__ */ __name(({ context, event }) => ({
        ...context.public,
        count: context.public.count + 1,
        lastUpdatedBy: event.caller.id
      }), "public")
    }),
    decrement: (0, import_xstate_cjs.assign)({
      public: /* @__PURE__ */ __name(({ context, event }) => ({
        ...context.public,
        count: context.public.count - 1,
        lastUpdatedBy: event.caller.id
      }), "public")
    }),
    setValue: (0, import_xstate_cjs.assign)({
      public: /* @__PURE__ */ __name(({ context, event }) => {
        if (event.type !== "SET") return context.public;
        return {
          ...context.public,
          count: event.value,
          lastUpdatedBy: event.caller.id
        };
      }, "public")
    }),
    resetCounter: (0, import_xstate_cjs.assign)({
      public: /* @__PURE__ */ __name(({ context }) => ({
        ...context.public,
        count: 0,
        lastUpdatedBy: null
      }), "public")
    }),
    trackAccess: (0, import_xstate_cjs.assign)({
      private: /* @__PURE__ */ __name(({ context, event }) => ({
        ...context.private,
        [event.caller.id]: {
          accessCount: (context.private[event.caller.id]?.accessCount ?? 0) + 1
        }
      }), "private")
    })
  }
}).createMachine({
  id: "counter",
  type: "parallel",
  context: /* @__PURE__ */ __name(({ input }) => ({
    public: {
      count: input.initialCount ?? 0,
      lastUpdatedBy: null
    },
    private: {}
  }), "context"),
  states: {
    Operations: {
      on: {
        INCREMENT: { actions: ["increment", "trackAccess"] },
        DECREMENT: { actions: ["decrement", "trackAccess"] },
        SET: { actions: ["setValue", "trackAccess"] },
        RESET: { actions: ["resetCounter"] }
      }
    }
  }
});
var Counter = createMachineServer({
  machine: counterMachine,
  schemas: {
    clientEvent: CounterClientEventSchema,
    serviceEvent: CounterServiceEventSchema,
    inputProps: CounterInputPropsSchema
  },
  options: {
    persisted: true,
    sqlite: {
      eventLog: true,
      maxEvents: 100,
      redact: ["storage", "env"]
    }
  }
});
var router = createActorKitRouter(["counter"]);
var Worker = class extends WorkerEntrypoint {
  static {
    __name(this, "Worker");
  }
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response("ok");
    }
    if (url.pathname.startsWith("/api/")) {
      return router(request, this.env, this.ctx);
    }
    return new Response("Test worker (SQLite)", { status: 200 });
  }
};
export {
  Counter,
  Worker as default
};
/*! Bundled license information:

fast-json-patch/commonjs/helpers.js:
  (*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2017-2022 Joachim Wester
   * MIT licensed
   *)

fast-json-patch/commonjs/duplex.js:
  (*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2017-2021 Joachim Wester
   * MIT license
   *)
*/
//# sourceMappingURL=worker-sqlite.js.map
