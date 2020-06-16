/* eslint-disable*/
module.exports = {
  name: "@yarnpkg/plugin-redirect-app-builder",
  factory: function (require) {
                          var plugin =
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const resolver_1 = __webpack_require__(2);

  const add_prebuilt_dependencies_1 = __webpack_require__(3);

  const plugin = {
    hooks: {
      reduceDependency: add_prebuilt_dependencies_1.reduceDependency
    },
    resolvers: [resolver_1.AppBuilderResolver],
    configuration: {
      redirectAppBuilderTemplate: {
        description: `The template to build the replacement app-builder-bin dependency`,
        type: core_1.SettingsType.STRING,
        default: `@electricui/app-builder-bin-{platform}-{arch}`
      }
    }
  }; // eslint-disable-next-line arca/no-default-export

  exports.default = plugin;

  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/core");

  /***/ }),
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  class AppBuilderResolver {
    supportsDescriptor(descriptor, opts) {
      if (!descriptor.range.startsWith(`app-builder-bin:`)) return false;
      return true;
    }

    supportsLocator(locator, opts) {
      // Once transformed into locators, the descriptors are resolved by the NpmSemverResolver
      return false;
    }

    shouldPersistResolution(locator, opts) {
      // Once transformed into locators, the descriptors are resolved by the NpmSemverResolver
      throw new Error(`Unreachable`);
    }

    bindDescriptor(descriptor, fromLocator, opts) {
      return descriptor;
    }

    getResolutionDependencies(descriptor, opts) {
      const match = descriptor.range.match(new RegExp(`npm<(.*)>`));

      if (!match) {
        throw new Error("Could not decode app-builder-bin rewrite");
      }

      const nextDescriptor = core_1.structUtils.parseDescriptor(match[1], true);
      return opts.resolver.getResolutionDependencies(nextDescriptor, opts);
    }

    async getCandidates(descriptor, dependencies, opts) {
      const match = descriptor.range.match(new RegExp(`npm<(.*)>`));

      if (!match) {
        throw new Error("Could not decode app-builder-bin rewrite");
      }

      const nextDescriptor = core_1.structUtils.parseDescriptor(match[1], true);
      return await opts.resolver.getCandidates(nextDescriptor, dependencies, opts);
    }

    resolve(locator, opts) {
      // Once transformed into locators, the descriptors are resolved by the NpmSemverResolver
      throw new Error(`Unreachable`);
    }

  }

  exports.AppBuilderResolver = AppBuilderResolver;

  /***/ }),
  /* 3 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  function runTemplate(template, templateValues) {
    for (const [key, value] of Object.entries(templateValues)) template = template.replace(new RegExp(`{${key}}`, `g`), value);

    return template;
  }

  exports.reduceDependency = async (dependency, project, locator, initialDependency, extra) => {
    // Check if this is the package we're looking for
    if (dependency.name !== `app-builder-bin` || dependency.scope !== null) {
      return dependency;
    } // Find our template string


    const template = project.configuration.get(`redirectAppBuilderTemplate`); // Run our template

    const replaceWith = runTemplate(template, {
      platform: process.platform,
      arch: process.arch
    }); // extra.resolveOptions.report.reportInfo(0, `Found app-builder-bin, re-routing to ${replaceWith}`);
    // Build our new descriptor that will be passed to the resolver

    const selector = `npm<${replaceWith}@${dependency.range}>`;
    const newDescriptor = core_1.structUtils.makeDescriptor(dependency, core_1.structUtils.makeRange({
      protocol: `app-builder-bin:`,
      source: `app-builder-bin<${process.platform}-${process.arch}>`,
      selector: selector,
      params: null
    }));
    return newDescriptor;
  };

  /***/ })
  /******/ ]);
    return plugin;
  },
};
