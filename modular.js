/*
 * File: modular.js
 * http://code.google.com/p/modular-js/
 *
 * Copyright (c) 2009 Pedro Ha
 * MIT License.
 *
 * Date: 2009-01-26 (Mon, 26 Jan 2009)
 * Revision: 0.1.1.3
 *
 */
 
(function(libName) {
	if (!window[libName]) {

		var initModule = function() {
			var modules = [];	/* Module[] modules: contains all the defined modules */
			
			var displayError = function(msg) {
				alert(msg);
			};

			var Module = function(name) {
				if (!name) { displayError("Module name missing: " + name); }
				
				var importModules = {}; // Temporary variable to pass 'imports' into define(m, imports)
				
				var moduleMethods = {
					'define'	: true,
					'imports'	: true,
					'exports'	: true
				};
				
				var copyProps = function(from, to) {
					for (var p in from) {
						if (!moduleMethods[p]) { // Exclude the public Module methods
							to[p] = from[p];
						}
					}
				};
				
				var define = function(f) {
					var props = f(modules[name], importModules); // 'importModules': passed to define()
					if (props) {
						copyProps(props, modules[name]);
					}
					importModules = {}; // Clean up for the next call to define() if it's ever called again.
				};

				var imports = function(mappings) {
					importModules = {};
					for (var fieldName in mappings) {
						var moduleName = mappings[fieldName];
						var module = modules[moduleName];
						if (!module) {
							displayError("Import for " + moduleName + " not found. Check module: " + name);
						}
						importModules[fieldName] = module;
					}
					return modules[name];
				};

				var exports = function(ns) {		// Could use Java package convention: com.company.package for the namespace "ns"
					if (!ns) { ns = window; }		// Use global namespace: self/window
					
					if (typeof ns != "object") {
						displayError("exports(): Invalid namespace while exporting " + name);
					}
					else {
						var module = modules[name];
						copyProps(module, ns);
					}
				};
				
				return {
					'define'  : define,
					'imports' : imports,
					'exports' : exports
				};
			};

			var getModule = function(name) {
				var module = modules[name];
				if (!module) {
					modules[name] = new Module(name);
					module = modules[name];
				}
				return module;
			};

			getModule.get = function(name) { // Syntactic sugar: Module.get(name) === Module(name)
				return getModule(name);
			};
			
			window[libName] = getModule;
		};
		
		initModule();
	}
})("Module"); // We only expose the packaging name to the outside: "Module".
