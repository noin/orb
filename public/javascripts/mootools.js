/*
Script: Core.js
	MooTools - My Object Oriented JavaScript Tools.

License:
	MIT-style license.

MooTools Copyright:
	Copyright (c) 2006-2007 Valerio Proietti, <http://mad4milk.net/>

MooTools Code & Documentation:
	The MooTools team <http://mootools.net/developers/>.

MooTools Credits:
	- Class implementation inspired by Base.js <http://dean.edwards.name/weblog/2006/03/base/> (c) 2006 Dean Edwards, GNU Lesser General Public License <http://opensource.org/licenses/lgpl-license.php>
	- Some functionality inspired by that found in Prototype.js <http://prototypejs.org> (c) 2005-2007 Sam Stephenson, MIT License <http://opensource.org/licenses/mit-license.php>
*/

var MooTools = {
	'version': '1.2dev',
	'build': '993'
};

/*
Function: $chk
	Checks to see if a value exists or is 0. Useful for allowing 0.

Syntax:
	>$chk(obj);

Arguments:
	obj - (mixed) The object to inspect.

Returns:
	(boolean) If the object passed in exists or is 0, returns true. Otherwise, returns false.

Example:
	[javascript]
		function myFunction(arg){
			if($chk(arg)) alert('The object exists or is 0.');
			else alert('The object is either null, undefined, false, or ""');
		}
	[/javascript]
*/

function $chk(obj){
	return !!(obj || obj === 0);
};

/*
Function: $clear
	Clears a Timeout or an Interval.

Syntax:
	>$clear(timer);

Arguments:
	timer - (number) The identifier of the setInterval (periodical) or setTimeout (delay) to clear.

Returns:
	null

Example:
	[javascript]
		var myTimer = myFunction.delay(5000); //Wait 5 seconds and execute myFunction.
		myTimer = $clear(myTimer); //Nevermind.
	[/javascript]

See also:
	<Function.delay>, <Function.periodical>
*/

function $clear(timer){
	clearTimeout(timer);
	clearInterval(timer);
	return null;
};

/*
Function: $defined
	Checks to see if a value is defined.

Syntax:
	>$defined(obj);

Arguments:
	obj - (mixed) The object to inspect.

Returns:
	(boolean) If the object passed is not null or undefined, returns true. Otherwise, returns false.

Example:
	[javascript]
		function myFunction(arg){
			if($defined(arg)) alert('The object is defined.');
			else alert('The object is null or undefined.');
		}
	[/javascript]
*/

function $defined(obj){
	return (obj != undefined);
};

/*
Function: $empty
	An empty function, that's it. Typically used for as a placeholder inside classes event methods.

Syntax:
	>var emptyFn = $empty;

Example:
	[javascript]
		var myFunc = $empty;
	[/javascript]
*/

function $empty(){};

/*
Function: $extend
	Copies all the properties from the second object passed in to the first object passed in.
	In myWhatever.extend = $extend, the first parameter will become myWhatever, and the extend function will only need one parameter.

Syntax:
	>$extend(original[, extended]);

Arguments:
	original - (object) The object to be extended.
	extended - (object, optional) The object whose properties will be copied to src.

Returns:
	(object) The extended object.

Examples:
	Normal Extension:
	[javascript]
		var firstObj = {
			'name': 'John',
			'lastName': 'Doe'
		};
		var secondObj = {
			'age': '20',
			'sex': 'male',
			'lastName': 'Dorian'
		};
		$extend(firstObj, secondObj);
		//firstObj is now: { 'name': 'John', 'lastName': 'Dorian', 'age': '20', 'sex': 'male' };
	[/javascript]

	Without the Second Parameter:
	[javascript]
		var myFunction = function(){ ... };
		myFunction.extend = $extend;
		myFunction.extend(secondObj);
		//myFunction now has the properties: 'age', 'sex', and 'lastName', each with its respected values.
	[/javascript]
*/

function $extend(original, extended){
	if (!extended){
		extended = original;
		original = this;
	}
	for (var property in extended) original[property] = extended[property];
	return original;
};

/*
Function: $merge
	Merges any number of objects recursively without referencing them or their sub-objects.

Syntax:
	>var merged = $merge(obj1, obj2[, obj3[, ...]]);

Arguments:
	(objects) Any number of objects.

Returns:
	(object) The object that is created as a result of merging all the objects passed in.

Example:
	[javascript]
		var obj1 = {a: 0, b: 1};
		var obj2 = {c: 2, d: 3};
		var obj3 = {a: 4, d: 5};
		var merged = $merge(obj1, obj2, obj3); //returns {a: 4, b: 1, c: 2, d: 5}, (obj1, obj2, and obj3 are unaltered)

		var nestedObj1 = {a: {b: 1, c: 1}};
		var nestedObj2 = {a: {b: 2}};
		var nested = $merge(nestedObj1, nestedObj2); //returns: {a: {b: 2, c: 1}}
	[/javascript]
*/

function $merge(){
	var mix = {};
	for (var i = 0; i < arguments.length; i++){
		for (var property in arguments[i]){
			var ap = arguments[i][property];
			var mp = mix[property];
			if (mp && $type(ap) == 'object' && $type(mp) == 'object') mix[property] = $merge(mp, ap);
			else mix[property] = ap;
		}
	}
	return mix;
};

/*
Function: $pick
	Returns the first defined argument passed in, or null.

Syntax:
	>var picked = $pick(var1[, var2[, var3[, ...]]]);

Arguments:
	(mixed) Any number of variables.

Returns:
	(mixed) The first variable that is defined. If all variables passed in are null or undefined, returns null.

Example:
	[javascript]
		function say(infoMessage, errorMessage){
			alert($pick(errorMessage, infoMessage, 'There was no message supplied.'));
		}
	[/javascript]
*/


function $pick(){
	for (var i = 0, l = arguments.length; i < l; i++){
		if ($defined(arguments[i])) return arguments[i];
	}
	return null;
};

/*
Function: $random
	Returns a random integer number between the two passed in values.

Syntax:
	>var random = $random(min, max);

Arguments:
	min - (number) The minimum value (inclusive).
	max - (number) The maximum value (inclusive).

Returns:
	(number) A random number between min and max.

Example:
	[javascript]
		alert($random(5, 20)); //alerts a random number between 5 and 20
	[/javascript]
*/

function $random(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
Function: $splat
	Array-ifies the argument passed in if it is defined and not already an array.

Syntax:
	>var splatted = $splat(obj);

Arguments:
	obj - (mixed) Any type of variable.

Returns:
	(array) If the variable passed in is an array, returns the array. Otherwise, returns an array with the only element being the variable passed in.

Examples:
	[javascript]
		$splat('hello'); //returns ['hello']
		$splat(['a', 'b', 'c']); //returns ['a', 'b', 'c']
	[/javascript]
*/

function $splat(obj){
	var type = $type(obj);
	return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
};

/*
Function: $time
	Returns the current time as a timestamp.

Syntax:
	>var time = $time();

Returns:
	(number) - Current timestamp.
*/

var $time = Date.now || function(){
	return new Date().getTime();
};

/*
Function: $try
	Tries to execute a function. Returns false if it fails.

Syntax:
	>$try(fn[, bind[, args]]);

Arguments:
	fn   - (function) The function to execute.
	bind - (object, optional: defaults to the function passed in) The object to use as 'this' in the function. For more information see <Function.bind>.
	args - (mixed, optional) Single item or array of items as arguments to be passed to the function.

Returns:
	(mixed) Standard return of the called function, or false on failure.

Example:
	[javascript]
		var result = $try(eval, window, 'some invalid javascript'); //false
	[/javascript]

Note:
	Warning: if the function passed can return false, there will be no way to know if it has been successfully executed or not.
*/

function $try(fn, bind, args){
	try {
		return fn.apply(bind, $splat(args));
	} catch(e){
		return false;
	}
};

/*
Function: $type
	Returns the type of object that matches the element passed in.

Syntax:
	>$type(obj);

Arguments:
	obj - (object) The object to inspect.

Returns:
	'element'    - (string) If object is a DOM element node.
	'textnode'   - (string) If object is a DOM text node.
	'whitespace' - (string) If object is a DOM whitespace node.
	'arguments'  - (string) If object is an arguments object.
	'array'      - (string) If object is an array.
	'object'     - (string) If object is an object.
	'string'     - (string) If object is a string.
	'number'     - (string) If object is a number.
	'boolean'    - (string) If object is a boolean.
	'function'   - (string) If object is a function.
	'regexp'     - (string) If object is a regular expression.
	'class'      - (string) If object is a Class (created with new Class, or the extend of another class).
	'collection' - (string) If object is a native htmlelements collection, such as childNodes, getElementsByTagName, etc.
	'window'     - (string) If object is the window object.
	'document'   - (string) If object is the document object.
	false        - (boolean) If object is undefined, null, NaN or none of the above.

Example:
	[javascript]
		var myString = 'hello';
		$type(myString); //returns "string"
	[/javascript]
*/

function $type(obj){
	if (obj == undefined) return false;
	if (obj.$family) return (obj.$family.name == 'number' && !isFinite(obj)) ? false : obj.$family.name;
	if (obj.nodeName){
		switch (obj.nodeType){
			case 1: return 'element';
			case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
		}
	} else if (typeof obj.length == 'number'){
		return (obj.callee) ? 'arguments' : 'collection';
	}
	return typeof obj;
};

var Native = function(options){
	
	options = $extend({
		name: false,
		initialize: false,
		generics: true,
		browser: false,
		legacy: false,
		afterImplement: $empty
	}, options || {});

	var legacy = (options.legacy) ? window[options.name] : false;
	
	var object = options.initialize || legacy;
	
	object.constructor = Native;
	object.$family = {name: 'native'};
	
	if (legacy && options.initialize) object.prototype = legacy.prototype;
	object.prototype.constructor = object;
	
	if (options.name){
		var family = options.name.toLowerCase();
		object.prototype.$family = {name: family};
		Native.typize(object, family);
	}
	
	object.implement = function(properties, force){
		for (var property in properties){
			if (!options.browser || force || !this.prototype[property]) this.prototype[property] = properties[property];
			if (options.generics) Native.genericize(this, property);
			options.afterImplement.call(this, property, properties[property]);
		}
	};
	
	object.alias = function(existing, property, force){
		if (!options.browser || force || !this.prototype[property]) this.prototype[property] = this.prototype[existing];
		if (options.generics && !this[property]) this[property] = this[existing];
		options.afterImplement.call(this, property, this[property]);
	};
	
	return object;

};

Native.typize = function(object, family){
	if (!object.type) object.type = function(item){
		return ($type(item) === family);
	};
};

Native.genericize = function(object, property){
	if (!object[property] && $type(object.prototype[property]) == 'function') object[property] = function(){
		var args = Array.prototype.slice.call(arguments);
		return object.prototype[property].apply(args.shift(), args);
	};
};

Native.implement = function(objects, properties){
	objects = $splat(objects);
	for (var i = 0, l = objects.length; i < l; i++) objects[i].implement(properties);
};

(function(obj){
	for (var i = 0, l = arguments.length; i < l; i++) Native.typize(window[arguments[i]], arguments[i].toLowerCase());
})('Boolean', 'Native', 'Object');

(function(){
	for (var i = 0, l = arguments.length; i < l; i++) new Native({name: arguments[i], initialize: window[arguments[i]], browser: true});
})('String', 'Function', 'Number', 'Array', 'RegExp');

(function(object, methods){
	for (var i = 0, l = methods.length; i < l; i++) Native.genericize(object, methods[i]);
	return arguments.callee;
})
(Array, ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice', 'toString', 'valueOf', 'indexOf', 'lastIndexOf'])
(String, ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'replace', 'search', 'slice', 'split', 'substr', 'substring', 'toLowerCase', 'toUpperCase', 'valueOf']);

/*
Object: Client
	Some browser properties are attached to the Client Object for browser and platform detection.

Features:
	Client.Features.xpath - (boolean) True if the browser supports dom queries using xpath.
	Client.Features.xhr   - (boolean) True if the browser supports native XMLHTTP object.

Engine:
	Client.Engine.trident        - (boolean) True if the current browser is Internet Explorer (any).
	Client.Engine.trident4       - (boolean) True if the current browser is Internet Explorer 6.
	Client.Engine.trident5       - (boolean) True if the current browser is Internet Explorer 7.
	Client.Engine.gecko     - (boolean) True if the current browser is Mozilla/Gecko.
	Client.Engine.webkit    - (boolean) True if the current browser is Safari/Konqueror.
	Client.Engine.webkit419 - (boolean) True if the current browser is Safari2 / webkit till version 419.
	Client.Engine.webkit420 - (boolean) True if the current browser is Safari3 (Webkit SVN Build) / webkit over version 419.
	Client.Engine.opera     - (boolean) True if the current browser is opera.
	Client.Engine.name      - (string) The name of the engine.

Platform:
	Client.Platform.mac     - (boolean) True if the platform is mac.
	Client.Platform.windows - (boolean) True if the platform is windows.
	Client.Platform.linux   - (boolean) True if the platform is linux.
	Client.Platform.other   - (boolean) True if the platform is neither mac, windows or linux.
	Client.Platform.name    - (string) The name of the platform.

Note:
	Engine detection is entirely feature-based.
*/

var Client = {
	Engine: {'name': 'unknown', 'version': ''},
	Platform: {'name': (navigator.platform.match(/(mac)|(win)|(linux)|(nix)/i) || ['Other'])[0].toLowerCase()},
	Features: {'xhr': !!(window.XMLHttpRequest), 'xpath': !!(document.evaluate)}
};

if (window.opera) Client.Engine.name = 'opera';
else if (window.ActiveXObject) Client.Engine = {'name': 'trident', 'version': (Client.Features.xhr) ? 5 : 4};
else if (!navigator.taintEnabled) Client.Engine = {'name': 'webkit', 'version': (Client.Features.xpath) ? 420 : 419};
else if (document.getBoxObjectFor != null) Client.Engine.name = 'gecko';
Client.Engine[Client.Engine.name] = Client.Engine[Client.Engine.name + Client.Engine.version] = true;
Client.Platform[Client.Platform.name] = true;

var Window = new Native({

	name: 'Window',

	legacy: true,

	initialize: function(win){
		Window.$instances.push(win);
		if (!win.Element){
			win.Element = $empty;
			if (Client.Engine.webkit) win.document.createElement("iframe"); //fixes safari 2
			win.Element.prototype = (Client.Engine.webkit) ? win["[[DOMElement.prototype]]"] : {};
		}
		return ($type(win) == 'window') ? win : $extend(win, this);
	},
	
	afterImplement: function(property, value){
		for (var i = 0, l = this.$instances.length; i < l; i++) this.$instances[i][property] = value;
	}

});

Window.$instances = [];

new Window(window);

var Document = new Native({

	name: 'Document',

	legacy: true,

	initialize: function(doc){
		Document.$instances.push(doc);
		doc.head = doc.getElementsByTagName('head')[0];
		doc.window = doc.defaultView || doc.parentWindow;
		if (Client.Engine.trident4) $try(function(){
			doc.execCommand("BackgroundImageCache", false, true);
		});
		return ($type(doc) == 'document') ? doc : $extend(doc, this);
	},
	
	afterImplement: function(property, value){
		for (var i = 0, l = this.$instances.length; i < l; i++) this.$instances[i][property] = value;
	}

});

Document.$instances = [];

new Document(document);

/*
Script: Array.js
	Contains Array prototypes, <$each>.

License:
	MIT-style license.
*/

/*
Native: Array
	A collection of the Array Object prototype methods.

See Also:
	<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array>
*/

/*
Function: $A
	Creates a copy of an Array. Useful for applying the Array prototypes to iterable objects such as a DOM Node collection or the arguments object.

Syntax:
	>var copiedArray = $A(iterable);

Arguments:
	iterable - (array) The iterable to copy.

Returns:
	(array) The new copied array.

Examples:
	Apply Array to arguments:
	[javascript]
		function myFunction(){
			$A(arguments).each(function(argument, index){
				alert(argument);
			});
		}; //will alert all the arguments passed to the function myFunction.
	[/javascript]

	Copy an Array:
	[javascript]
		var anArray = [0, 1, 2, 3, 4];
		var copiedArray = $A(anArray); //returns [0, 1, 2, 3, 4]
	[/javascript]
*/

function $A(iterable){
	if (Client.Engine.trident && $type(iterable) == 'collection'){
		var array = [];
		for (var i = 0, l = iterable.length; i < l; i++) array[i] = iterable[i];
		return array;
	}
	return Array.prototype.slice.call(iterable);
};

Array.implement({

	/*
	Method: every
		Returns true if every element in the array satisfies the provided testing function.

		This method is provided only for browsers without native <Array.every> support.

	Syntax:
		>var allPassed = myArray.every(fn[, bind]);

	Arguments:
		fn   - (function) The function to test for each element.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(item, index, array)

			Arguments:
				item   - (mixed) The current item in the array.
				index  - (number) The current item's index in the array.
				array  - (array) The actual array.

	Returns:
		(boolean) If every element in the array satisfies the provided testing function, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var areAllBigEnough = [10, 4, 25, 100].every(function(item, index){
				return item > 20;
			}); //areAllBigEnough = false
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:every>
	*/

	every: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (!fn.call(bind, this[i], i, this)) return false;
		}
		return true;
	},

	/*
	Method: filter
		Creates a new array with all of the elements of the array for which the provided filtering function returns true.

		This method is provided only for browsers without native <Array.filter> support.

	Syntax:
		>var filteredArray = myArray.filter(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the array. This function is passed the item and its index in the array.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(item, index, array)

			Arguments:
				item   - (mixed) The current item in the array.
				index  - (number) The current item's index in the array.
				array  - (array) The actual array.

	Returns:
		(array) The new filtered array.

	Example:
		[javascript]
			var biggerThanTwenty = [10, 3, 25, 100].filter(function(item, index){
				return item > 20;
			}); //biggerThanTwenty = [25, 100]
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:filter>
	*/

	filter: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++){
			if (fn.call(bind, this[i], i, this)) results.push(this[i]);
		}
		return results;
	},

	/*
	Method: forEach
		Calls a function for each element in the array.

		This method is only available for browsers without native <Array.forEach> support.

	Syntax:
		>myArray.forEach(fn[, bind]);

	Arguments:
		fn   - (function) The function which should be executed on each item in the array. This function is passed the item and its index in the array.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(item, index, array)

			Arguments:
				item   - (mixed) The current item in the array.
				index  - (number) The current item's index in the array.
				array  - (array) The actual array.

	Example:
		[javascript]
			['apple', 'banana', 'lemon'].forEach(function(item, index){
				alert(index + " = " + item); //alerts "0 = apple" etc.
			}, bind); //optional second argument for binding, not used here
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach>
	*/

	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++) fn.call(bind, this[i], i, this);
	},

	/*
	Method: indexOf
		Returns the index of the first element within the array equal to the specified value, or -1 if the value is not found.

		This method is provided only for browsers without native <Array.indexOf> support.

	Syntax:
		>var index = myArray.indexOf(item[, from]);

	Returns:
		(number) The index of the first element within the array equal to the specified value. If not found, returns -1.

	Arguments:
		item - (object) The item to search for in the array.
		from - (number, optional: defaults to 0) The index of the array at which to begin the search.

	Example:
		[javascript]
			['apple', 'lemon', 'banana'].indexOf('lemon'); //returns 1
			['apple', 'lemon'].indexOf('banana'); //returns -1
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:indexOf>
	*/

	indexOf: function(item, from){
		var len = this.length;
		for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
			if (this[i] === item) return i;
		}
		return -1;
	},

	/*
	Method: map
		Creates a new array with the results of calling a provided function on every element in the array.

		This method is provided only for browsers without native <Array.map> support.

	Syntax:
		>var mappedArray = myArray.map(fn[, bind]);

	Arguments:
		fn   - (function) The function to produce an element of the new Array from an element of the current one.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(item, index, array)

			Arguments:
				item   - (mixed) The current item in the array.
				index  - (number) The current item's index in the array.
				array  - (array) The actual array.

	Returns:
		(array) The new mapped array.

	Example:
		[javascript]
			var timesTwo = [1, 2, 3].map(function(item, index){
				return item * 2;
			}); //timesTwo = [2, 4, 6];
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:map>
	*/

	map: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++) results[i] = fn.call(bind, this[i], i, this);
		return results;
	},

	/*
	Method: some
		Returns true if at least one element in the array satisfies the provided testing function.

		This method is provided only for browsers without native <Array.some> support.

	Syntax:
		>var somePassed = myArray.some(fn[, bind]);

	Returns:
		(boolean) If at least one element in the array satisfies the provided testing function returns true. Otherwise, returns false.

	Arguments:
		fn   - (function) The function to test for each element. This function is passed the item and its index in the array.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(item, index, array)

			Arguments:
				item   - (mixed) The current item in the array.
				index  - (number) The current item's index in the array.
				array  - (array) The actual array.

	Example:
		[javascript]
			var isAnyBigEnough = [10, 4, 25, 100].some(function(item, index){
				return item > 20;
			}); //isAnyBigEnough = true
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:some>
	*/

	some: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (fn.call(bind, this[i], i, this)) return true;
		}
		return false;
	},

	/*
	Method: reduce
		Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.

		This method is provided only for browsers without native <Array.reduce> support.

	Syntax:
		>var reduced = myArray.reduce(fn[, value]);

	Arguments:
		fn    - (function) Function to execute on each value in the array.
		value - (object, optional) Object to use as the initial argument to the first call of the callback.

		fn (continued):
			Signature:
				>fn(previous, current, index, array)

			Arguments:
				previous - (mixed) The item prior to the current item in the array.
				current  - (mixed) The current item in the array.
				index    - (number) The current item's index in the array.
				array    - (array) The actual array.

	Returns:
		(mixed) The result of reducing this array according to fn.

	Examples:
		Sum Up Numbers:
		[javascript]
			var sum = [1, 2, 3, 4, 6].reduce(function(previousItem, currentItem){
				return previousItem + currentItem;
			}, 10); //sum is 26
		[/javascript]

		Collect Elements of Many Arrays Into a Single Array:
		[javascript]
			var collected = [['a', 'b'], ['c', 'd'], ['e', 'f', 'g']].reduce(function(previousItem, currentItem) {
				return previousItem.concat(currentItem);
			}, []); //collected is ['a', 'b', 'c', 'd', 'e', 'f', 'g']
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:reduce>
	*/

	reduce: function(fn, value){
		var i = 0;
		if (arguments.length < 2 && this.length) value = this[i++];
		for (var l = this.length; i < l; i++) value = fn.call(null, value, this[i], i, this);
		return value;
	},

	/*
	Method: associate
		Creates an object with key-value pairs based on the array of keywords passed in and the current content of the array.

	Syntax:
		>var associated = myArray.associate(obj);

	Arguments:
		obj - (array) Its items will be used as the keys of the object that will be created.

	Returns:
		(object) The new associated object.

	Example:
		[javascript]
			var animals = ['Cow', 'Pig', 'Dog', 'Cat'];
			var sounds = ['Moo', 'Oink', 'Woof', 'Miao'];
			animals.associate(sounds);
			//returns {'Cow': 'Moo', 'Pig': 'Oink', 'Dog': 'Woof', 'Cat': 'Miao'}
		[/javascript]
	*/

	associate: function(keys){
		var obj = {}, length = Math.min(this.length, keys.length);
		for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
		return obj;
	},

	/*
	Method: link
		Accepts an object of key / function pairs to assign values.

	Syntax:
		>var result = Array.link(array, object);

	Arguments:
		object - (object)  An object containing key / function pairs must be passed to be used as a template for associating values with the different keys.

	Returns:
		(object) The new associated object.

	Example:
		[javascript]
			var el = document.createElement('div');
			var arr2 = [100, 'Hello', {foo: 'bar'}, el, false];
			arr2.link({myNumber: Number.type, myElement: Element.type, myObject: Object.type, myString: String.type, myBoolean: $defined});
			//returns {myNumber: 100, myElement: el, myObject: {foo: 'bar'}, myString: 'Hello', myBoolean: false}
		[/javascript]
	*/

	link: function(object){
		var result = {};
		for (var i = 0, l = this.length; i < l; i++){
			for (var key in object){
				result[key] = null;
				if (object[key](this[i])){
					result[key] = this[i];
					delete object[key];
					break;
				}
			}
		}
		return result;
	},

	/*
	Method: contains
		Tests an array for the presence of an item.

	Syntax:
		>var inArray = myArray.contains(item[, from]);

	Arguments:
		item - (object) The item to search for in the array.
		from - (number, optional: defaults to 0) The index of the array at which to begin the search.

	Returns:
		(boolean) If the array contains the item specified, returns true. Otherwise, returns false.

	Example:
		[javascript]
			["a","b","c"].contains("a"); //returns true
			["a","b","c"].contains("d"); //returns false
		[/javascript]

	See Also:
		<Array.indexOf>
	*/

	contains: function(item, from){
		return this.indexOf(item, from) != -1;
	},

	/*
	Method: extend
		Extends an array with all the items of another.

	Syntax:
		>myArray.extend(array);

	Arguments:
		array - (array) The array whose items should be extended into this array.

	Returns:
		(array) This array, extended.

	Example:
		[javascript]
			var animals = ['Cow', 'Pig', 'Dog'];
			animals.extend(['Cat', 'Dog']); //animals = ['Cow', 'Pig', 'Dog', 'Cat', 'Dog'];
		[/javascript]
	*/

	extend: function(array){
		for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
		return this;
	},

	/*
	Method: getLast
		Returns the last item from the array.

	Syntax:
		>myArray.getLast();

	Returns:
		(mixed) The last item in this array. If this array is empty, returns null.

	Example:
		[javascript]
			['Cow', 'Pig', 'Dog', 'Cat'].getLast(); //returns 'Cat'
		[/javascript]
	*/

	getLast: function(){
		return (this.length) ? this[this.length - 1] : null;
	},

	/*
	Method: getRandom
		Returns a random item from the array.

	Syntax:
		>myArray.getRandom();

	Returns:
		(mixed) A random item from this array. If this array is empty, returns null.

	Example:
		[javascript]
			['Cow', 'Pig', 'Dog', 'Cat'].getRandom(); //returns one of the items
		[/javascript]
	*/

	getRandom: function(){
		return (this.length) ? this[$random(0, this.length - 1)] : null;
	},

	/*
	Method: include
		Pushes the passed element into the array if it's not already present (case and type sensitive).

	Syntax:
		>myArray.include(item);

	Arguments:
		item - (object) The item that should be added to this array.

	Returns:
		(array) This array with the new item included.

	Example:
		[javascript]
			['Cow', 'Pig', 'Dog'].include('Cat'); //returns ['Cow', 'Pig', 'Dog', 'Cat']
			['Cow', 'Pig', 'Dog'].include('Dog'); //returns ['Cow', 'Pig', 'Dog']
		[/javascript]
	*/

	include: function(item){
		if (!this.contains(item)) this.push(item);
		return this;
	},

	/*
	Method: merge
		Merges an array with all the items of another. Does not allow duplicates and is case and type sensitive.

	Syntax:
		>myArray.merge(array);

	Arguments:
		array - (array) The array whose items should be merged into this array.

	Returns:
		(array) This array merged with the new items.

	Example:
		[javascript]
			var animals = ['Cow', 'Pig', 'Dog'];
			animals.merge(['Cat', 'Dog']); //animals = ['Cow', 'Pig', 'Dog', 'Cat'];
		[/javascript]
	*/

	merge: function(array){
		for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
		return this;
	},

	/*
	Method: remove
		Removes all occurrences of an item from the array.

	Syntax:
		>myArray.remove(item);

	Arguments:
		item - (object) The item to search for in the array.

	Returns:
		(array) This array with all occurrences of the item removed.

	Example:
		[javascript]
			['Cow', 'Pig', 'Dog', 'Cat', 'Dog'].remove('Dog') //returns ['Cow', 'Pig', 'Cat']
			['Cow', 'Pig', 'Dog'].remove('Cat') //returns ['Cow', 'Pig', 'Dog']
		[/javascript]
	*/

	remove: function(item){
		for (var i = this.length; i--; i){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	},

	/*
	Method: empty
		Empties an array.

	Syntax:
		>myArray.empty();

	Returns:
		(array) This array, emptied.

	Example:
		[javascript]
			var myArray = ['old', 'data'];
			myArray.empty(); //myArray is now []
		[/javascript]
	*/

	empty: function(){
		this.length = 0;
		return this;
	}

});

/*
Method: each
	Same as <Array.forEach>.

Syntax:
	>myArray.each(fn[, bind]);

Arguments:
	fn   - (function) The function which should be executed on each item in the array. This function is passed the item and its index in the array.
	bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

	fn (continued):
		Signature:
			>fn(item, index, array)

		Arguments:
			item   - (mixed) The current item in the array.
			index  - (number) The current item's index in the array.
			array  - (array) The actual array.

Example:
	[javascript]
		['apple','banana','lemon'].each(function(item, index){
			alert(index + " = " + item); //alerts "0 = apple" etc.
		}, bind); //optional second argument for binding, not used here
	[/javascript]
*/

Array.alias('forEach', 'each');

/*
Function: $each
	Use to iterate through iterables that are not regular arrays, such as builtin getElementsByTagName calls, arguments of a function, or an object.

Syntax:
	>$each(iterable, fn[, bind]);

Arguments:
	iterable - (object or array) The object or array to iterate through.
	fn       - (function) The function to test for each element.
	bind     - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

	fn (continued):
		Signature:
			>fn(item, index, object)

		Arguments:
			item   - (mixed) The current item in the array.
			index  - (number) The current item's index in the array. In the case of an object, it is passed the key of that item rather than the index.
			object - (mixed) The actual array/object.

Examples:
	Array example:
	[javascript]
		$each(['Sun','Mon','Tue'], function(day, index){
			alert('name:' + day + ', index: ' + index);
		}); //alerts "name: Sun, index: 0", "name: Mon, index: 1", etc.
	[/javascript]

	Object example:
	[javascript]
		$each({first: "Sunday", second: "Monday", third: "Tuesday"}, function(value, key){
			alert("the " + key + " day of the week is " + value);
		}); //alerts "the first day of the week is Sunday", "the second day of the week is Monday", etc.
	[/javascript]
*/

function $each(iterable, fn, bind){
	var type = $type(iterable);
	if (!type) return;
	((type == 'arguments' || type == 'collection' || type == 'array') ? Array : Hash).each(iterable, fn, bind);
};

/*
Script: String.js
	Contains String prototypes.

License:
	MIT-style license.
*/

/*
Native: String
	A collection of the String Object prototype methods.

See Also:
	<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:String>
*/

String.implement({

	/*
	Method: test
		Searches for a match between the string and a regular expression.
		For more information see <http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:RegExp:test>.

	Syntax:
		>myString.test(regex[,params]);

	Arguments:
		regex  - (mixed) The string or regular expression you want to match the string with.
		params - (string, optional) If first parameter is a string, any parameters you want to pass to the regular expression ('g' has no effect).

	Returns:
		(boolean) If a match for the regular expression is found in this string returns true. Otherwise, returns false.

	Example:
		[javascript]
			"I like cookies".test("cookie"); //returns true
			"I like cookies".test("COOKIE", "i"); //returns true (ignore case)
			"I like cookies".test("cake"); //returns false
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Guide:Regular_Expressions>
	*/

	test: function(regex, params){
		return (($type(regex) == 'string') ? new RegExp(regex, params) : regex).test(this);
	},

	/*
	Method: contains
		Checks to see if the string passed in is contained in this string.
		If the separator parameter is passed, will check to see if the string is contained in the list of values separated by that parameter.

	Syntax:
		>myString.contains(string[, separator]);

	Arguments:
		string    - (string) The string to search for.
		separator - (string, optional) The string that separates the values in this string (eg. Element classNames are separated by a ' ').

	Returns:
		(boolean) If the string is contained in this string, returns true. Otherwise, returns false.

	Example:
		[javascript]
			'a bc'.contains('bc'); //returns true
			'a b c'.contains('c', ' '); //returns true
			'a bc'.contains('b', ' '); //returns false
		[/javascript]
	*/

	contains: function(string, separator){
		return (separator) ? (separator + this + separator).indexOf(separator + string + separator) > -1 : this.indexOf(string) > -1;
	},

	/*
	Method: trim
		Trims the leading and trailing spaces off a string.

	Syntax:
		>myString.trim();

	Returns:
		(string) The trimmed string.

	Example:
		[javascript]
			"    i like cookies     ".trim(); //"i like cookies"
		[/javascript]
	*/

	trim: function(){
		return this.replace(/^\s+|\s+$/g, '');
	},

	/*
	Method: clean
		Removes all extraneous whitespace from a string and trims (<String.trim>) it.

	Syntax:
		>myString.clean();

	Returns:
		(string) The cleaned string.

	Example:
		[javascript]
			" i      like     cookies      \n\n".clean(); //returns "i like cookies"
		[/javascript]
	*/

	clean: function(){
		return this.replace(/\s{2,}/g, ' ').trim();
	},

	/*
	Method: camelCase
		Converts a hyphenated string to a camelcased string.

	Syntax:
		>myString.camelCase();

	Returns:
		(string) The camelcased string.

	Example:
		[javascript]
			"I-like-cookies".camelCase(); //returns "ILikeCookies"
		[/javascript]
	*/

	camelCase: function(){
		return this.replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},

	/*
	Method: hyphenate
		Converts a camelcased string to a hyphenated string.

	Syntax:
		>myString.hyphenate();

	Returns:
		(string) The hyphenated string.

	Example:
		[javascript]
			"ILikeCookies".hyphenate(); //returns "I-like-cookies"
		[/javascript]
	*/

	hyphenate: function(){
		return this.replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	},

	/*
	Method: capitalize
		Converts the first letter of each word in a string to uppercase.

	Syntax:
		>myString.capitalize();

	Returns:
		(string) The capitalized string.

	Example:
		[javascript]
			"i like cookies".capitalize(); //returns "I Like Cookies"
		[/javascript]
	*/

	capitalize: function(){
		return this.replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	},

	/*
	Method: escapeRegExp
		Escapes all regular expression characters from the string.

	Syntax:
		>myString.escapeRegExp();

	Returns:
		(string) The escaped string.

	Example:
		[javascript]
			'animals.sheep[1]'.escapeRegExp(); //returns 'animals\.sheep\[1\]'
		[/javascript]
	*/

	escapeRegExp: function(){
		return this.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
	},

	/*
	Method: toInt
		Parses this string and returns a number of the specified radix or base.

	Syntax:
		>myString.toInt([base]);

	Arguments:
		base - (number, optional) The base to use (defaults to 10).

	Returns:
		(mixed) The number. If the string is not numeric, returns NaN.

	Example:
		[javascript]
			"4em".toInt(); //returns 4
			"10px".toInt(); //returns 10
		[/javascript]

	See Also:
		 <http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:parseInt>
	*/

	toInt: function(base){
		return parseInt(this, base || 10);
	},

	/*
	Method: toFloat
		Parses this string and returns a floating point number.

	Syntax:
		>myString.toFloat();

	Returns:
		(mixed) The float. If the string is not numeric, returns NaN.

	Example:
		[javascript]
			"95.25%".toFloat(); //returns 95.25
			"10.848".toFloat(); //returns 10.848
		[/javascript]

		See Also:
			<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:parseFloat>
	*/

	toFloat: function(){
		return parseFloat(this);
	},

	/*
	Method: hexToRgb
		Converts a hexidecimal color value to RGB. Input string must be in one of the following hexidecimal color formats (with or without the hash).
		>'#ffffff', #fff', 'ffffff', or 'fff'

	Syntax:
		>myString.hexToRgb([array]);

	Arguments:
		array - (boolean, optional) If true is passed, will output an array (eg. ['ff','33','00']) instead of a string (eg. "#ff3300").

	Returns:
		(mixed) A string representing the color in RGB. If the array flag is set, an array will be returned instead.

	Example:
		[javascript]
			"#123".hexToRgb(); //returns "rgb(17,34,51)"
			"112233".hexToRgb(); //returns "rgb(17,34,51)"
			"#112233".hexToRgb(true); //returns [17,34,51]
		[/javascript]

	See Also:
		 <Array.hexToRgb>
	*/

	hexToRgb: function(array){
		var hex = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (hex) ? hex.slice(1).hexToRgb(array) : null;
	},

	/*
	Method: rgbToHex
		Converts an RGB color value to hexidecimal. Input string must be in one of the following RGB color formats.
		>"rgb(255,255,255)", or "rgba(255,255,255,1)"

	Syntax:
		>myString.rgbToHex([array]);

	Arguments:
		array - (boolean, optional) If true is passed, will output an array (eg. ['ff','33','00']) instead of a string (eg. "#ff3300").

	Returns:
		(mixed) A string representing the color in hexadecimal,
		or transparent if the fourth value of rgba in the input string is 0. If the array flag is set, an array will be returned instead.

	Example:
		[javascript]
			"rgb(17,34,51)".rgbToHex(); //returns "#112233"
			"rgb(17,34,51)".rgbToHex(true); //returns ['11','22','33']
			"rgba(17,34,51,0)".rgbToHex(); //returns "transparent"
		[/javascript]

	See Also:
		 <Array.rgbToHex>
	*/

	rgbToHex: function(array){
		var rgb = this.match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHex(array) : null;
	}

});

/*
Native: Array
	Contains Array prototypes.

See Also:
	<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array>
*/

Array.implement({

	/*
	Method: hexToRgb
		Converts a hexidecimal color value to RGB. Input array must be in one of the following hexidecimal color formats.
		>['ff', 'ff', 'ff'], or ['f', 'f', 'f']

	Syntax:
		myArray.hexToRgb([array]);

	Arguments:
		array - (boolean, optional) If true is passed, will output an array (eg. ['ff','33','00']) instead of a string (eg. "#ff3300").

	Returns:
		(mixed) A string representing the color in RGB. If the array flag is set, an array will be returned instead.

	Example:
		[javascript]
			["1", "2", "3"].hexToRgb(); //returns "rgb(17,34,51)"
			["11", "22", "33"].hexToRgb(); //returns "rgb(17,34,51)"
			["11", "22", "33"].hexToRgb(true); //returns [17,34,51]
		[/javascript]

	See Also:
		 <String.hexToRgb>
	*/

	hexToRgb: function(array){
		if (this.length != 3) return null;
		var rgb = [];
		for (var i = 0; i < 3; i++){
			rgb.push(((this[i].length == 1) ? this[i] + this[i] : this[i]).toInt(16));
		}
		return array ? rgb : 'rgb(' + String(rgb) + ')';
	},

	/*
	Method: rgbToHex
		Converts an RGB color value to hexidecimal. Input array must be in one of the following RGB color formats.
		>[255,255,255], or [255,255,255,1]

	Syntax:
		>myArray.rgbToHex([array]);

	Arguments:
		array - (boolean, optional) If true is passed, will output an array (eg. ['ff','33','00']) instead of a string (eg. "#ff3300").

	Returns:
		(mixed) A string representing the color in hexadecimal, or transparent if the fourth value of rgba in the input array is 0.
		If the array flag is set, an array will be returned instead.

	Example:
		[javascript]
			[17,34,51].rgbToHex(); //returns "#112233"
			[17,34,51].rgbToHex(true); //returns ['11','22','33']
			[17,34,51,0].rgbToHex(); //returns "transparent"
		[/javascript]

	See Also:
		 <String.rgbToHex>
	*/

	rgbToHex: function(array){
		if (this.length < 3) return null;
		if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
		var hex = [];
		for (var i = 0; i < 3; i++){
			var bit = (this[i] - 0).toString(16);
			hex.push((bit.length == 1) ? '0' + bit : bit);
		}
		return array ? hex : '#' + hex.join('');
	}

});

/*
Script: Function.js
	Contains Function prototypes and utility functions.

License:
	MIT-style license.
*/

/*
Native: Function
	A collection of The Function Object prototype methods.

See Also:
	 <http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Function>
*/

Function.implement({

	extend: $extend,

	/*
	Method: create
		Base function for creating functional closures which is used by all other Function prototypes.

	Syntax:
		>var createdFunction = myFunction.create([options]);

	Arguments:
		options - (object, optional) The options from which the function will be created. If options is not provided, then creates a copy of the function.

		options (continued):
			bind - (object: defaults to this function) The object that the "this" of the function will refer to.
			event - (mixed: defaults to false) If set to true, the function will act as an event listener and receive an event as its first argument. If set to a class name, the function will receive a new instance of this class (with the event passed as argument's constructor) as first argument.
			arguments - (mixed: defaults to standard arguments) A single argument or an array of arguments that will be passed as arguments to the function. If both the event and arguments options are set, the event is passed as first argument and the arguments array will follow.
			delay - (number: defaults to no delay) If set, the returned function will delay the actual execution by this amount of milliseconds and return a timer handle when called.
			periodical - (number: defaults to no periodical execution) If set, the returned function will periodically perform the actual execution with this specified interval and return a timer handle when called.
			attempt - (boolean: false) If set to true, the returned function will try to execute and return either the results or false on error.

	Returns:
		(function) The function that was created as a result of the options passed in.

	Example:
		[javascript]
			var myFunction = function(){
				alert("I'm a function :)");
			};

			var mySimpleFunction = myFunction.create(); //just a simple copy

			var myAdvancedFunction = myFunction.create({ //when called, this function will attempt
				arguments: [0,1,2,3],
				attempt: true,
				delay: 1000,
				bind: myElement
			});
		[/javascript]
	*/

	create: function(options){
		var self = this;
		options = options || {};
		return function(event){
			var args = $defined(options.arguments) ? $splat(options.arguments) : arguments;
			if (options.event) args = [event || window.event].extend(args);
			var returns = function(){
				return self.apply(options.bind || null, args);
			};
			if (options.delay) return setTimeout(returns, options.delay);
			if (options.periodical) return setInterval(returns, options.periodical);
			if (options.attempt) return $try(returns);
			return returns();
		};
	},

	/*
	Method: pass
		Returns a closure with arguments and bind.

	Syntax:
		>var newFunction = myFunction.pass([args[, bind]]);

	Arguments:
		args - (mixed, optional) The arguments to pass to the function (must be an array if passing more than one argument).
		bind - (object, optional) The object that the "this" of the function will refer to.

	Returns:
		(function) The function whose arguments are passed when called.

	Example:
		[javascript]
			var myFunction = function(){
				var result = 'Passed: ';
				for (var i = 0, l = arguments.length; i < l; i++){
					result += (arguments[i] + ' ');
				}
				return result;
			}
			var myHello = myFunction.pass('hello');
			var myItems = myFunction.pass(['peach', 'apple', 'orange']);

			//when ready I can execute the functions.
			alert(myHello());
			alert(myItems());
		[/javascript]
	*/

	pass: function(args, bind){
		return this.create({'arguments': args, 'bind': bind});
	},

	/*
	Method: attempt
		Tries to execute the function.

	Syntax:
		>var result = myFunction.attempt([args[, bind]]);

	Arguments:
		args - (mixed, optional) The arguments to pass to the function (must be an array if passing more than one argument).
		bind - (object, optional) The object that the "this" of the function will refer to.

	Returns:
		(mixed) False if an exception is thrown, else the function's return.

	Example:
		[javascript]
			var myObject = {
				'cow': 'moo!'
			};

			var myFunction = function(){
				for (var i = 0; i < arguments.length; i++){
					if(!this[arguments[i]]) throw('doh!');
				}
			};
			var result = myFunction.attempt(['pig', 'cow'], myObject); //result = false
		[/javascript]
	*/

	attempt: function(args, bind){
		return this.create({'arguments': args, 'bind': bind, 'attempt': true})();
	},

	/*
	Method: bind
		Returns a function whose "this" is altered.

	Syntax:
		>myFunction.bind([bind[, args[, evt]]]);

	Arguments:
		bind - (object, optional) The object that the "this" of the function will refer to.
		args - (mixed, optional) The arguments to pass to the function (must be an array if passing more than one argument).

	Returns:
		(function) The binded function.

	Example:
		[javascript]
			function myFunction(){
				this.setStyle('color', 'red');
				//note that 'this' here refers to window, not an element
				//we'll need to bind this function to the element we want to alter
			};
			var myBoundFunction = myFunction.bind(myElement);
			myBoundFunction(); // this will make the element myElement red.
		[/javascript]
	*/

	bind: function(bind, args){
		return this.create({'bind': bind, 'arguments': args});
	},

	/*
	Method: bindWithEvent
		Returns a function whose "this" is altered. It also makes "space" for an event.
		This makes the method indicate for using in conjunction with <Element.addEvent> and arguments.

	Syntax:
		>myFunction.bindWithEvent([bind[, args[, evt]]]);

	Arguments:
		bind - (object, optional) The object that the "this" of the function will refer to.
		args - (mixed, optional) The arguments to pass to the function (must be an array if passing more than one argument).

	Returns:
		(function) The binded function.

	Example:
		[javascript]
			function myFunction(e, add){
				this.setStyle('top', e.client.x + add);
				//note that 'this' here refers to window, not an element
				//we'll need to bind this function to the element we want to alter
			};
			$(myElement).addEvent('click', myFunction.bindWithEvent(myElement, 100);
			//when clicked the element will move to the position of the mouse + 100;
		[/javascript]
	*/

	bindWithEvent: function(bind, args){
		return this.create({'bind': bind, 'event': true, 'arguments': args});
	},

	/*
	Method: delay
		Delays the execution of a function by a specified duration.

	Syntax:
		>var timeoutID = myFunction.delay([delay[, bind[, args]]]);

	Arguments:
		delay - (number, optional) The duration to wait (in milliseconds).
		bind  - (object, optional) The object that the "this" of the function will refer to.
		args  - (mixed, optional) The arguments passed (must be an array if the arguments are greater than one).

	Returns:
		(number) The JavaScript Timeout ID (useful for clearing delays).

	Example:
		[javascript]
			var myFunction = function(){ alert('moo! Element id is: ' + this.id); };
			//wait 50 milliseconds, then call myFunction and bind myElement to it
			myFunction.delay(50, myElement); // alerts: 'moo! Element id is: ... '

			//An anonymous function, example
			(function(){ alert('one second later...'); }).delay(1000); //wait a second and alert
		[/javascript]

	See Also:
		<$clear>, <http://developer.mozilla.org/en/docs/DOM:window.setTimeout>
	*/

	delay: function(delay, bind, args){
		return this.create({'delay': delay, 'bind': bind, 'arguments': args})();
	},

	/*
	Method: periodical
		Executes a function in the specified intervals of time

	Syntax:
		>var intervalID = myFunction.periodical([period[, bind[, args]]]);

	Arguments:
		period - (number, optional) The duration of the intervals between executions.
		bind   - (object, optional) The object that the "this" of the function will refer to.
		args   - (mixed, optional) The arguments passed (must be an array if the arguments are greater than one).

	Returns:
		(number) The Interval ID (useful for clearing a periodical).

	Example:
		[javascript]
			var Site = { counter: 0 };
			var addCount = function(){ this.counter++; };
			addCount.periodical(1000, Site); // will add the number of seconds at the Site
		[/javascript]

	See Also:
		<$clear>, <http://developer.mozilla.org/en/docs/DOM:window.setInterval>
	*/

	periodical: function(interval, bind, args){
		return this.create({'periodical': interval, 'bind': bind, 'arguments': args})();
	},

	/*
	Method: run
		Runs the Function with specified arguments and binding. Kinda like .apply but reversed and with support for single argument.

	Syntax:
		>var myFunctionResult = myFunction.run(args[, bind]);

	Arguments:
		args - (mixed) An argument, or array of arguments to run the function with.
		bind - (object, optional) The object that the "this" of the function will refer to.

	Returns:
		(mixed) This Function's return.

	Examples:
		Simple run:
		[javascript]
			var myFn = function(a, b, c){
				return a + b + c;
			}
			var myArgs = [1,2,3];
			myFn.run(args); //returns 6
		[/javascript]

		Run with binding:
		[javascript]
			var myFn = function(a, b, c){
				return a + b + c + this;
			}
			var myArgs = [1,2,3];
			myFn.run(args, 6); //returns 12
		[/javascript]
	*/

	run: function(args, bind){
		return this.apply(bind, $splat(args));
	}

});

/*
Script: Number.js
	Contains the Number prototypes.

License:
	MIT-style license.
*/

/*
Native: Number
	A collection of the Number Object prototype methods.

See Also:
	<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Number>
*/

Number.implement({

	/*
	Method: limit
		Limits this number between two bounds.

	Syntax:
		>myNumber.limit(min, max);

	Arguments:
		min - (number) The minimum possible value.
		max - (number) The maximum possible value.

	Returns:
		(number) The number bounded between the given limits.

	Example:
		[javascript]
			(12).limit(2, 6.5); //returns 6.5
			(-4).limit(2, 6.5); //returns 2
			(4.3).limit(2, 6.5); //returns 4.3
		[/javascript]
	*/

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	/*
	Method: round
		Returns this number rounded to the specified precision.

	Syntax:
		>myNumber.round([precision]);

	Arguments:
		precision - (number, optional: defaults to 0) The number of digits after the decimal place.

	Returns:
		(number) The number, rounded.

	Note:
		Argument may also be negative.

	Example:
		[javascript]
			(12.45).round() //returns 12
			(12.45).round(1) //returns 12.5
			(12.45).round(-1) //returns 10
		[/javascript]
	*/

	round: function(precision){
		precision = Math.pow(10, precision || 0);
		return Math.round(this * precision) / precision;
	},

	/*
	Method: times
		Executes the function passed in the specified number of times.

	Syntax:
		>myNumber.times(fn[, bind]);

	Arguments:
		fn   - (function) The function which should be executed on each iteration of the loop. This function is passed the current iteration's index.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

	Example:
		[javascript]
			(4).times(alert); //alerts 0, 1, 2, 3
		[/javascript]
	*/

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, this);
	},

	/*
	Method: toFloat
		Returns this number as a float. Useful because toFloat must work on both Strings and Numbers.

	Syntax:
		>myNumber.toFloat();

	Returns:
		(number) The number as a float.

	Example:
		[javascript]
			(111).toFloat(); //returns 111
			(111.1).toFloat(); //returns 111.1
		[/javascript]
	*/

	toFloat: function(){
		return parseFloat(this);
	},

	/*
	Method: toInt
		Returns this number as another number with the passed in base. Useful because toInt must work on both Strings and Numbers.

	Syntax:
		>myNumber.toInt([base]);

	Arguments:
		base - (number, optional: defaults to 10) The base to use.

	Returns:
		(number) A number with the base provided.

	Example:
		[javascript]
			(111).toInt(); //returns 111
			(111.1).toInt(); //returns 111
			(111).toInt(2); //returns 7
		[/javascript]
	*/

	toInt: function(base){
		return parseInt(this, base || 10);
	}

});

Number.alias('times', 'each');

/*
Script: Hash.js
	Contains the Hash implementation for custom Object prototypes.

License:
	MIT-style license.
*/

/*
Native: Hash
	A Custom "Object" ({}) implementation which does not account for prototypes when setting, getting, iterating.
*/

var Hash = new Native({

	name: 'Hash',

	initialize: function(object){
		if (object){
			if ($type(object) == 'hash') return object;
			this.extend(object);
		}
		return this;
	}

});

function $H(object){
	return new Hash(object);
};

Hash.implement({

	/*
	Method: each
		Calls a function for each key-value pair in the object.

	Syntax:
		>myArray.forEach(fn[, bind]);

	Arguments:
		fn   - (function) The function which should be executed on each item in the array. This function is passed the item and its index in the array.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Example:
		[javascript]
			var hash = new Hash({first: "Sunday", second: "Monday", third: "Tuesday"});
			hash.each(function(value, key){
				alert("the " + key + " day of the week is " + value);
			}); //alerts "the first day of the week is Sunday", "the second day of the week is Monday", etc.
		[/javascript]
	*/

	each: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key)) fn.call(bind, this[key], key, this);
		}
	},

	/*
	Method: keyOf
		Returns the key of the specified value. Synonymous with <Array.indexOf>.

	Syntax:
		>var key = myHash.keyOf(item);

	Arguments:
		item - (mixed) The item to search for in the Hash.

	Returns:
		(mixed) If the Hash has a the specified item in it, returns the key of that item. Otherwise, returns false.

	Example:
		[javascript]
			var hash = new Hash({'a': 'one', 'b': 'two', 'c': 3});
			hash.keyOf('two'); //returns 'b'
			hash.keyOf(3); //returns 'c'
			hash.keyOf('four') //returns false
		[/javascript]

	Notes:
		Testing for a Hash prototype will never return its key. Only the actual properties of the Hash will return their associated key.
	*/

	keyOf: function(value){
		for (var key in this){
			if (this.hasOwnProperty(key) && this[key] === value) return key;
		}
		return null;
	},

	/*
	Method: has
		Tests for the presence of a specified key in the Hash.

	Syntax:
		>var inHash = myHash.has(item);

	Arguments:
		key - (string) The key to search for in the Hash.

	Returns:
		(boolean) If the Hash has a defined value for the specified key, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var hash = new Hash({'a': 'one', 'b': 'two', 'c': 'three'});
			hash.has('a'); //returns true
			hash.has('d'); //returns false
		[/javascript]

	Notes:
		Testing for a Hash prototype will never return true. Only testing the actual properties of the Hash will return true.
	*/

	has: function(key){
		return this.hasOwnProperty(key);
	},

	/*
	Method: hasValue
		Tests for the presence of a specified value in the Hash.

	Syntax:
		>var inHash = myHash.hasvalue(value);

	Arguments:
		value - (mixed) The value to search for in the Hash.

	Returns:
		(boolean) If the Hash has the passed in value in any of the keys, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var hash = new Hash({'a': 'one', 'b': 'two', 'c': 'three'});
			hash.hasValue('one'); //returns true
			hash.hasValue('four'); //returns false
		[/javascript]
	*/

	hasValue: function(value){
		return (Hash.keyOf(this, value) !== null);
	},

	/*
	Method: extend
		Extends this Hash with the key-value pairs from the object passed in.

	Syntax:
		>myHash.extend(properties);

	Arguments:
		properties - (object) The object whose items should be extended into this Hash.

	Returns:
		(hash) This Hash, extended.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			var properties = {
				'age': '20',
				'sex': 'male',
				'lastName': 'Dorian'
			};
			hash.extend(properties);
			//hash now holds an object containing: { 'name': 'John', 'lastName': 'Dorian', 'age': '20', 'sex': 'male' };
		[/javascript]
	*/

	extend: function(properties){
		Hash.each(properties, function(value, key){
			this[key] = value;
		}, this);
		return this;
	},

	/*
	Method: merge
		Merges this Hash with the key-value pairs of the object passed in. Does not allow duplicates and is case and type sensitive.

	Syntax:
		>myHash.merge(properties);

	Arguments:
		properties - (object) The object whose items should be merged into this Hash.

	Returns:
		(hash) This Hash, merged with the new key-value pairs.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			var properties = {
				'age': '20',
				'sex': 'male',
				'lastName': 'Dorian'
			};
			hash.merge(properties);
			//hash now holds an object containing: { 'name': 'John', 'lastName': 'Doe', 'age': '20', 'sex': 'male' };
		[/javascript]
	*/

	merge: function(properties){
		Hash.each(properties, function(value, key){
			Hash.include(this, key, value);
		}, this);
		return this;
	},

	/*
	Method: remove
		Removes the specified key from the Hash.

	Syntax:
		>myHash.remove(key);

	Arguments:
		key - (string) The key to search for in the Hash.

	Returns:
		(hash) This Hash with the specified key and its value removed.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.remove('lastName');
			//hash now holds an object containing: { 'name': 'John' };
		[/javascript]
	*/

	remove: function(key){
		if (this.hasOwnProperty(key)) delete this[key];
		return this;
	},

	/*
	Method: get
		Retrieves a value from the hash.

	Syntax:
		>myHash.get(key);

	Arguments:
		key - (string) The key to retrieve in the Hash.

	Returns:
		(mixed) Returns the value that corresponds to the key if found, or null if the key doesn't exist.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.get('name'); //returns 'John'
		[/javascript]
	*/

	get: function(key){
		return (this.hasOwnProperty(key)) ? this[key] : null;
	},

	/*
	Method: set
		Adds a key-value pair to the hash or replaces a previous value associated with the specified key.

	Syntax:
		>myHash.set(key, value);

	Arguments:
		key   - (string) The key to insert or modify in the Hash.
		value - (mixed) The value to associate with the specified key in the Hash.

	Returns:
		(hash) This Hash with the specified key set to the specified value.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.set('name', 'Michelle'); //hash.name is now 'Michelle'
		[/javascript]
	*/

	set: function(key, value){
		if (!this[key] || this.hasOwnProperty(key)) this[key] = value;
		return this;
	},

	/*
	Method: empty
		Empties the hash.

	Syntax:
		>myHash.empty();

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.empty();
			//hash now holds an empty object: {}
		[/javascript]
	*/

	empty: function(){
		Hash.each(this, function(value, key){
			delete this[key];
		}, this);
		return this;
	},

	/*
	Method: include
		Includes the specified key-value pair in the Hash if the key doesn't already exist.

	Syntax:
		>myHash.include(key, value);

	Arguments:
		key   - (string) The key to insert into the Hash.
		value - (mixed) The value to associate with the specified key in the Hash.

	Returns:
		(hash) This Hash with the specified key included if it did not previously exist.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.include('name', 'Michelle'); //hash is unchanged
			hash.include('age', 25); //hash.age is now 25
		[/javascript]
	*/

	include: function(key, value){
		if (!this[key]) this[key] = value;
		return this;
	},

	/*
	Method: map
		Creates a new map with the results of calling a provided function on every value in the map.

	Syntax:
		>var mappedHash = myHash.map(fn[, bind]);

	Arguments:
		fn   - (function) The function to produce an element of the new Array from an element of the current one.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(array) The new mapped hash.

	Example:
		[javascript]
			var timesTwo = new Hash({a: 1, b: 2, c: 3}).map(function(item, index){
				return item * 2;
			}); //timesTwo now holds an object containing: {a: 2, b: 4, c: 6};
		[/javascript]
	*/

	map: function(fn, bind){
		var results = new Hash;
		Hash.each(this, function(value, key){
			results.set(key, fn.call(bind, value, key, this));
		}, this);
		return results;
	},

	/*
	Method: filter
		Creates a new Hash with all of the elements of the Hash for which the provided filtering function returns true.

	Syntax:
		>var filteredHash = myHash.filter(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the Hash. This function is passed the value and its key in the Hash.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(hash) The new filtered hash.

	Example:
		[javascript]
		var biggerThanTwenty = new Hash({a: 10, b: 20, c: 30}).filter(function(value, key){
			return value > 20;
		}); //biggerThanTwenty now holds an object containing: {c: 30}
		[/javascript]
	*/

	filter: function(fn, bind){
		var results = new Hash;
		Hash.each(this, function(value, key){
			if (fn.call(bind, value, key, this)) results.set(key, value);
		}, this);
		return results;
	},

	/*
	Method: every
		Returns true if every value in the object satisfies the provided testing function.

	Syntax:
		>var allPassed = myHash.every(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the Hash. This function is passed the value and its key in the Hash.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(boolean) If every value in the Hash satisfies the provided testing function, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var areAllBigEnough = ({a: 10, b: 4, c: 25, d: 100}).every(function(value, key){
				return value > 20;
			}); //areAllBigEnough = false
		[/javascript]
	*/

	every: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && !fn.call(bind, this[key], key)) return false;
		}
		return true;
	},

	/*
	Method: some
		Returns true if at least one value in the object satisfies the provided testing function.

	Syntax:
		>var anyPassed = myHash.any(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the Hash. This function is passed the value and its key in the Hash.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(boolean) If any value in the Hash satisfies the provided testing function, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var areAllBigEnough = ({a: 10, b: 4, c: 25, d: 100}).some(function(value, key){
				return value > 20;
			}); //isAnyBigEnough = true
		[/javascript]
	*/

	some: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) return true;
		}
		return false;
	},

	/*
	Method: getClean
		Returns a a clean object from an Hash.

	Syntax:
		>myHash.getClean();

	Returns:
		(object) a clean objecy

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash = hash.getClean(); // hash doesnt contain Hash prototypes anymore
			hash.each() //error!
		[/javascript]
	*/

	getClean: function(){
		var clean = {};
		Hash.each(this, function(value, key){
			clean[key] = value;
		});
		return clean;
	},

	/*
	Property: getKeys
		Returns an array containing all the keys, in the same order as the values returned by <Hash.getValues>.

	Syntax:
		>var keys = myHash.getKeys();

	Returns:
		(array) An array containing all the keys of the hash.
	*/

	getKeys: function(){
		var keys = [];
		Hash.each(this, function(value, key){
			keys.push(key);
		});
		return keys;
	},

	/*
	Property: getValues
		Returns an array containing all the values, in the same order as the keys returned by <Hash.getKeys>.

	Syntax:
		>var values = myHash.getValues();

	Returns:
		(array) An array containing all the values of the hash.
	*/

	getValues: function(){
		var values = [];
		Hash.each(this, function(value, key){
			values.push(value);
		});
		return values;
	}

});

Hash.alias('keyOf', 'indexOf');
Hash.alias('hasValue', 'contains');

/*
Script: Class.js
	Contains the Class implementations.

License:
	MIT-style license.
*/

/*
Native: Class
	The base Class object of the <http://mootools.net/> framework. Creates a new Class. The Class's initialize method will fire upon class instantiation unless <$empty> is passed to the Class constructor.

Syntax:
	>var MyClass = new Class(properties);

Arguments:
	properties - (object) The collection of properties that apply to the Class. Also accepts some special properties such as Extends, Implements, and initialize (see below).

	properties (continued):
		Extends - (class) That this class will extend.
		Implements - (mixed) An object or an array of objects that the Class implements. Similar to Extends, but it simply overrides the properties. Useful when implementing a Class properties in multiple classes.
		initialize - (function) The initialize function will be the constructor for this class when new instances are created.

Returns:
	(class) The Class created.

Examples:
	Class Example:
	[javascript]
		var Cat = new Class({
			initialize: function(name){
				this.name = name;
			}
		});
		var myCat = new Cat('Micia');
		alert(myCat.name); //alerts 'Micia'

		var Cow = new Class({
			initialize: function(){
				alert('moooo');
			});
		});
		var Effie = new Cow($empty); //will not alert 'moooo'
	[/javascript]

	Extends Example:
	[javascript]
		var Animal = new Class({
			initialize: function(age){
				this.age = age;
			}
		});
		var Cat = new Class({Extends: Animal
			initialize: function(name, age){
				this.parent(age); //will call initalize of Animal
				this.name = name;
			}
		});
		var myCat = new Cat('Micia', 20);
		alert(myCat.name); //alerts 'Micia'
		alert(myCat.age); //alerts 20
	[/javascript]

	Implements Example:
	[javascript]
		var Animal = new Class({
			initialize: function(age){
				this.age = age;
			}
		});
		var Cat = new Class({
			Implements: Animal,
			setName: function(name){
				this.name = name
			}
		});
		var myCat = new Cat(20);
		myAnimal.setName('Micia');
		alert(myAnimal.name); //alerts 'Micia'
	[/javascript]
*/

var Class = new Native({

	name: 'Class',

	initialize: function(properties){

		properties = properties || {};

		var klass = function(){

			for (var property in this){
				if ($type(this[property]) == 'object') this[property] = $merge(this[property]);
			}

			['Implements', 'Extends'].each(function(Property){
				if (!this[Property]) return;
				Class[Property](this, this[Property]);
				delete this[Property];
			}, this);

			var self = (arguments[0] !== $empty && this.initialize && $type(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
			if (this.options && this.options.initialize) this.options.initialize.call(this);
			return self;
		};

		$extend(klass, this);
		klass.constructor = Class;
		klass.prototype = properties;
		klass.prototype.constructor = klass;
		return klass;
	}

});

Class.implement({

	/*
	Method: implement
		Implements the passed in properties into the base Class prototypes, altering the base Class, unlike <Class.extend>.

	Syntax:
		>MyClass.implement(properties);

	Arguments:
		properties - (object) The properties to add to the base Class.

	Example:
		[javascript]
			var Animal = new Class({
				initialize: function(age){
					this.age = age;
				}
			});
			Animal.implement({
				setName: function(name){
					this.name = name
				}
			});
			var myAnimal = new Animal(20);
			myAnimal.setName('Micia');
			alert(myAnimal.name); //alerts 'Micia'
		[/javascript]
	*/

	implement: function(){
		Class.Implements(this.prototype, Array.slice(arguments));
		return this;
	}

});

Class.Implements = function(self, klasses){
	$splat(klasses).each(function(klass){
		$extend(self, ($type(klass) == 'class') ? new klass($empty) : klass);
	});
};

Class.Extends = function(self, klass){
	klass = new klass($empty);
	for (var property in klass){
		var kp = klass[property];
		var sp = self[property];
		self[property] = (function(previous, current){
			if ($defined(current) && previous != current){
				var type = $type(current);
				if (type != $type(previous)) return current;
				switch (type){
					case 'function': return function(){
						current.parent = this.parent = previous.bind(this);
						return current.apply(this, arguments);
					};
					case 'object': return $merge(previous, current);
				}
			}
			return previous;
		})(kp, sp);
	}
};

/*
Script: Class.Extras.js
	Contains common implementations for custom classes.
	In MooTools these Utilities are implemented in <Ajax>, <XHR>, <Fx> and many other Classes to provide rich functionality.

License:
	MIT-style license.
*/

/*
Class: Chain
	A "Utility" Class which executes functions one after another, with each function firing after completion of the previous.
	Its methods can be implemented with <Class.implement> into any <Class>, and it is currently implemented in <Fx>, <XHR> and <Ajax>.
	In <Fx>, for example, it is used to create custom, complex animations.

Syntax:
	For new classes:
	>var MyClass = new Class({ Implements: Chain });

	For existing classes:
	>MyClass.implement(new Chain);

Example:
	[javascript]
		var Todo = new Class({
			Implements: Chain,
			initialize: function(){
				this.chain.apply(this, arguments);
			}
		});

		var myTodoList = new Todo(
			function(){ alert('get groceries');	},
			function(){ alert('go workout'); },
			function(){ alert('code mootools documentation until eyes close involuntarily'); },
			function(){ alert('sleep');	}
		);
	[/javascript]

See Also:
	<Class>
*/

var Chain = new Class({

	/*
	Method: chain
		Adds functions to the end of the call stack of the Chain instance.

	Syntax:
		>myClass.chain(fn[, fn2[, fn3[, ...]]]);

	Arguments:
		Any number of functions.

	Returns:
		(class) This Class instance. Calls to chain can also be chained.

	Example:
		[javascript]
			//will fade the element in and out three times
			var myFx = new Fx.Style('myElement', 'opacity'); //Fx.Style has implemented class Chain because of inheritance.
			myFx.start(1,0).chain(
				function(){ this.start(0,1); }, //notice that "this" refers to the calling object. In this case: myFx object.
				function(){ this.start(1,0); },
				function(){ this.start(0,1); }
			);
		[/javascript]

	See Also:
		<Fx>, <Fx.Style>
	*/

	chain: function(){
		this.$chain = (this.$chain || []).extend(arguments);
		return this;
	},

	/*
	Method: callChain
		Removes the first function of the Chain instance stack and executes it. The next function will then become first in the array.

	Syntax:
		>myClass.callChain();

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var Queue = new Class({
				Implements: Chain,
				initialize: function(){
					this.chain.apply(this, arguments);
				}
			});
			var myQueue = new Queue();
			myQueue.chain(
				function(){ alert('do dishes'); },
				function(){ alert('put away clean dishes'); }
			);
			myQueue.callChain(); //alerts 'do dishes'
			myQueue.callChain(); //alerts 'put away clean dishes'
		[/javascript]
	*/

	callChain: function(){
		if (this.$chain && this.$chain.length) this.$chain.shift().delay(10, this);
		return this;
	},

	/*
	Method: clearChain
		Clears the stack of a Chain instance.

	Syntax:
		>myClass.clearChain();

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var myFx = Fx.Style('myElement', 'color'); //Fx.Style inherited Fx's implementation of Chain see <Fx>
			myFx.chain(function(){ while(true) alert('doh!'); }); //don't try this at home, kids.
			myFx.clearChain(); // .. that was a close one ...
		[/javascript]

	See Also:
		<Fx>, <Fx.Style>
	*/

	clearChain: function(){
		if (this.$chain) this.$chain.empty();
		return this;
	}

});

/*
Class: Events
	A "Utility" Class. Its methods can be implemented with <Class.implement> into any <Class>.
	In <Fx>, for example, this Class is used to allow any number of functions to be added to the Fx events, like onComplete, onStart, and onCancel.
	Events in a Class that implements <Events> must be either added as an option or with addEvent, not directly through .options.onEventName.

Syntax:
	For new classes:
	>var MyClass = new Class({ Implements: Events });

	For existing classes:
	>MyClass.implement(new Events);

Implementing:
	This class can be implemented into other classes to add its functionality to them.
	It has been designed to work well with the <Options> class.

Example:
	[javascript]
		var Widget = new Class({
			Implements: Events,
			initialize: function(element){
				...
			},
			complete: function(){
				this.fireEvent('onComplete');
			}
		});

		var myWidget = new Widget();
		myWidget.addEvent('onComplete', myFunction);
	[/javascript]

See Also:
	<Class>, <Options>
*/

var Events = new Class({

	/*
	Method: addEvent
		Adds an event to the Class instance's event stack.

	Syntax:
		>myClass.addEvent(type, fn[, internal]);

	Arguments:
		type     - (string) The type of event (e.g. 'onComplete').
		fn       - (function) The function to execute.
		internal - (boolean, optional) Sets the function property: internal to true. Internal property is used to prevent removal.

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var myFx = new Fx.Style('element', 'opacity');
			myFx.addEvent('onStart', myStartFunction);
		[/javascript]
	*/

	addEvent: function(type, fn, internal){
		if (fn != $empty){
			this.$events = this.$events || {};
			this.$events[type] = this.$events[type] || [];
			this.$events[type].include(fn);
			if (internal) fn.internal = true;
		}
		return this;
	},

	/*
	Method: addEvents
		Works as <addEvent>, but accepts an object to add multiple events at once.

	Syntax:
		>myClass.addEvents(events);

	Arguments:
		events - (object) An object containing a collection of event type / function pairs.

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var myFx = new Fx.Style('element', 'opacity');
			myFx.addEvents({
				'onStart': myStartFunction,
				'onComplete': myCompleteFunction
			});
		[/javascript]
	*/

	addEvents: function(events){
		for (var type in events) this.addEvent(type, events[type]);
		return this;
	},

	/*
	Method: fireEvent
		Fires all events of the specified type in the Class instance.

	Syntax:
		>myClass.fireEvent(type[, args[, delay]]);

	Arguments:
		type  - (string) The type of event (e.g. 'onComplete').
		args  - (mixed, optional) The argument(s) to pass to the function. To pass more than one argument, the arguments must be in an array.
		delay - (number, optional) Delay in miliseconds to wait before executing the event (defaults to 0).

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var Widget = new Class({
				Implements: Events,
				initialize: function(arg1, arg2){
					...
					this.fireEvent("onInitialize", [arg1, arg2], 50);
				}
			});
		[/javascript]
	*/

	fireEvent: function(type, args, delay){
		if (this.$events && this.$events[type]){
			this.$events[type].each(function(fn){
				fn.create({'bind': this, 'delay': delay, 'arguments': args})();
			}, this);
		}
		return this;
	},

	/*
	Method: removeEvent
		Removes an event from the stack of events of the Class instance.

	Syntax:
		>myClass.removeEvent(type, fn);

	Arguments:
		type - (string) The type of event (e.g. 'onComplete').
		fn   - (function) The function to remove. Note: this argument is not optional. You must pass the exact function that was added as an event in order to remove it.

	Returns:
		(class) This Class instance.

	Note:
		If the function has the property internal and is set to true, then the event will not be removed.
	*/

	removeEvent: function(type, fn){
		if (!this.$events) return this; 
		if (this.$events && this.$events[type]){
			if (!fn.internal) this.$events[type].remove(fn);
		}
		return this;
	},

	/*
	Method: removeEvents
		Removes all events of the given type from the stack of events of a Class instance. If no type is specified, removes all events of all types.

	Syntax:
		>myClass.removeEvents([type]);

	Arguments:
		type - (string, optional) The type of event to remove (e.g. 'onComplete'). If no type is specified, removes all events of all types.

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var myFx = new Fx.Style('element', 'opacity');
			myFx.removeEvents('onComplete');
		[/javascript]

	Note:
		Will not remove internal events. See <Events.removeEvent>.
	*/

	removeEvents: function(type){
		for (var e in this.$events){
			if (!type || type == e){
				var fns = this.$events[e];
				for (var i = fns.length; i--; i) this.removeEvent(e, fns[i]);
			}
		}
		return this;
	}

});

/*
Class: Options
	A "Utility" Class. Its methods can be implemented with <Class.implement> into any <Class>.
	Used to automate the setting of a Class instance's options.
	Will also add Class <Events> when the option property begins with on, followed by a capital letter (e.g. 'onComplete').

Syntax:
	For new classes:
	>var MyClass = new Class({Implements: Options});

	For existing classes:
	>MyClass.implement(Options);
*/

var Options = new Class({

	/*
	Method: setOptions
		Merges the default options of the Class with the options passed in.

	Syntax:
		>myClass.setOptions([options]);

	Arguments:
		options - (object, optional) The user defined options to merge with the defaults.

	Returns:
		(class) This Class instance.

	Example:
		[javascript]
			var Widget = new Class({
				Implements: Options,
				options: {
					color: '#fff',
					size: {
						width: 100,
						height: 100
					}
				},
				initialize: function(options){
					this.setOptions(options);
				}
			});

			var myWidget = new Widget({
				color: '#f00',
				size: {
					width: 200
				}
			});
			//myWidget.options is now {color: #f00, size: {width: 200, height: 100}}
		[/javascript]

	Note:
		Relies on the default options of a Class defined in its options property.
		If a Class has <Events> implemented, every option beginning with 'on' and followed by a capital letter (e.g. 'onComplete') becomes a Class instance event, assuming the value of the option is a function.
	*/

	setOptions: function(options){
		this.options = $merge(this.options, options);
		if (!this.addEvent) return this;
		for (var option in this.options){
			if ((/^on[A-Z]/).test(option) && $type(this.options[option]) == 'function') this.addEvent(option, this.options[option]);
		}
		return this;
	}

});


/*
Script: Element.js
	One of the most important items of MooTools, contains the dollar function, the dollars function, and an handful of cross-browser, time-saver methods to let you easily work with HTML Elements.

License:
	MIT-style license.

Credits:
	- Some functions are inspired by those found in prototype.js <http://prototype.conio.net/> (c) 2005 Sam Stephenson sam [at] conio [dot] net, MIT-style license.
*/

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

/*
Method: constructor 
 	Creates a new Element of the type passed in. 
Syntax:
	>var myEl = new Element(el[, props]);

Arguments:
	el    - (mixed) The tag name for the Element to be created. It's also possible to add an Element for reference, in which case it will be extended.
	props - (object, optional) The properties to be applied to the new Element.

	props (continued):
		Assumes that all keys are properties that the <Element.setProperties receives, there are special keys, however: the 'styles' key whos value is passed to <Element.setStyles> and the 'events' key whos value is passed to <Element.addEvents>.

Example:
	[javascript]
		var myAnchor = new Element('a', {
			'styles': {
				'display': 'block',
				'border': '1px solid black'
			},
			'events': {
				'click': function(){
					alert('omg u clicked');
				},
				'mousedown': function(){
					alert('omg ur gonna click');
				}
			},
			'class': 'myClassSuperClass',
			'href': 'http://mad4milk.net'
		});
	[/javascript]

See Also:
	<$>, <Element.set>
*/

var Element = new Native({
	
	name: 'Element',
	
	legacy: true,
	
	initialize: function(el){
		if (Element.Builders.has(el)) return Element.Builders[el].run(Array.slice(arguments, 1));
		var params = Array.link(arguments, {'document': Document.type, 'properties': Object.type});
		var props = params.properties || {}, doc = params.document || document;
		if ($type(el) == 'string'){
			if (Client.Engine.trident && props && (props.name || props.type)){
				var name = (props.name) ? ' name="' + props.name + '"' : '';
				var type = (props.type) ? ' type="' + props.type + '"' : '';
				delete props.name;
				delete props.type;
				el = '<' + el + name + type + '>';
			}
			el = doc.createElement(el);
		}
		el = $(el);
		return (!props || !el) ? el : el.set(props);
	},

	afterImplement: function(key, value){
		Elements.prototype[(Array.prototype[key]) ? key + 'Elements' : key] = Elements.$multiply(key);
	}

});

/*
Native: IFrame
	Custom Native to create and easily work with IFrames.
*/

/*
Method: constructor
	Creates an iframe and extends its window and document.
	returns the raw element, if you want to work with the iframe use the "this" in the onload method you pass in.
*/

var IFrame = new Native({

	name: 'IFrame',

	initialize: function(props){
		props = props || {};
		var iframe = $(document.createElement('iframe'));
		iframe.name = props.name || 'IFrame_' + iframe.$attributes.uid;
		delete props.name;
		var onload = props.onload || $empty;
		delete props.onload;
		iframe.onload = function(){
			var frame = this.ownerDocument.window.frames[this.name];
			new Window(frame);
			new Document(frame.document);
			onload.call(frame);
		};
		return $extend(iframe, this).set(props);
	},

	generics: false

});

/*
Native: Elements
	The Elements class allows <Element> methods to work also on an <Elements> array. In MooTools, every DOM function, such as <$$> (and every other function that returns a collection of nodes) returns them as an Elements class.

Syntax:
	>var myElements = new Elements(elements[, nocheck]);

Arguments:
	elements - (array) A mixed array with items of Elements or an string ID reference.
	nocheck  - (boolean: defaults to false) Optionally bypasses the extending of Elements.

Returns:
	(array) An extended array with the <Element> methods.

Example:
	[javascript];
		//The following code would set the color of every paragraph to 'red'.
		$$('p').each(function(el){
		  el.setStyle('color', 'red');
		});

		//However, because $$('myselector') also accepts <Element> methods, the below example would have the same effect as the one above.
		$$('p').setStyle('color', 'red');

		//Create myElements from
		var myElements = new Elements(['myElementID', $('myElement'), 'myElementID2', document.getElementById('myElementID3')]);
		myElements.removeElements('found'); //notice how 'remove' is an <Array> method and therefore the correct usage is: <Element.removeEvents>
	[/javascript]

Note:
	- Because Elements is an Array, it accepts all the <Array> methods.
	- Array methods have priority, so overlapping Element methods (remove, getLast) are changed to "method + Elements" (removeElements, getLastElements).
	- Every node of the Elements instance is already extended with <$>.

See Also:
	<$$>
*/

var Elements = new Native({

	initialize: function(elements, nocheck){
		elements = elements || [];
		var length = elements.length;
		if (nocheck || !length) return $extend(elements, this);
		var uniques = {};
		var returned = [];
		for (var i = 0; i < length; i++){
			var el = $(elements[i]);
			if (!el || uniques[el.$attributes.uid]) continue;
			uniques[el.$attributes.uid] = true;
			returned.push(el);
		}
		return $extend(returned, this);
	}

});

Elements.$multiply = function(property){
	return function(){
		var items = [];
		var elements = true;
		for (var i = 0, j = this.length; i < j; i++){
			var returns = this[i][property].apply(this[i], arguments);
			items.push(returns);
			if (elements) elements = ($type(returns) == 'element');
		}
		return (elements) ? new Elements(items) : items;
	};
};

/*
Native: Window
	these methods are attached to the window[s] object.
*/

Window.implement({

	/*
	Function: $
		Returns the element passed in with all the Element prototypes applied.

	Arguments:
		el - (mixed) A string containing the id of the DOM element desired or a reference to an actual DOM element.

	Example:
		>$('myElement') // gets a DOM element by id with all the Element prototypes applied.
		>var div = document.getElementById('myElement');
		>$(div) //returns an Element also with all the mootools extensions applied.

		You'll use this when you aren't sure if a variable is an actual element or an id, as
		well as just shorthand for document.getElementById().

	Returns:
		a DOM element or false (if no id was found).

	Note:
		While the $ function needs to be called only once on an element in order to get all the prototypes,
		extended Elements can be passed to this function multiple times without ill effects.
	*/

	$: function(el){
		if (el && el.$attributes) return el;
		var type = $type(el);
		if (type == 'string') type = (el = this.document.getElementById(el)) ? 'element' : false;
		if (type != 'element') return (type == 'window' || type == 'document') ? el : null;
		if (Garbage.collect(el) && !el.$family) $extend(el, Element.prototype);
		return el;
	},

	/*
	Function: $$
		Selects, and extends DOM elements. Elements arrays returned with $$ will also accept all the <Element> methods.
		The return type of element methods run through $$ is always an array. If the return array is only made by elements,
		$$ will be applied automatically.

	Arguments:
		HTML Collections, arrays of elements, arrays of strings as element ids, elements, strings as selectors.
		Any number of the above as arguments are accepted.

	Note:
		if you load <Element.Selectors.js>, $$ will also accept CSS Selectors, otherwise the only selectors supported are tag names.

	Example:
	>$$('a'); 
	Returns an array of all anchor tags on the page.

	>$$('a', 'b');
	Returns an array of all anchor and bold tags on the page.

	>$$('#myElement');
	Returns an array containing only the element with id = myElement (requires Element.Selectors.js).

	>$$('#myElement a.myClass');
	Returns an array of all anchor tags with the class "myClass" within the DOM element with id "myElement" (requires Element.Selectors.js).

	>$$(myelement, myelement2, 'a', ['myid', myid2, 'myid3'], document.getElementsByTagName('div'));
	Returns a collection of the element referenced as myelement, the element referenced as myelement2, all of the link tags on the page,
	the element with the id 'myid', followed by the elements with the ids of 'myid2' and 'myid3', and finally all the div elements on the page.
	NOTE: If an element is not found, nothing will be included into the array (not even *null*).

	Returns:
		array - array of all the dom elements matched, extended with <$>.  Returns as <Elements>.
	*/

	$$: function(){
		var elements = [];
		for (var i = 0, j = arguments.length; i < j; i++){
			var selector = arguments[i];
			switch ($type(selector)){
				case 'element': elements.push(selector); break;
				case false: case null: break;
				case 'string': selector = this.document.getElements(selector, true);
				default: elements.extend(selector);
			}
		}
		return new Elements(elements);
	}

});

/*
Native: Element
	Custom class to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Native.implement([Element, Document], {

	/*
	Method: getElement
		Searches all descendents for the first Element whose tag matches the tag provided. getElement method will also automatically extend the Element.

	Syntax:
		>var myElement = myElement.getElement(tag);

	Arguments:
		tag - (string) String of the tag to match.

	Returns:
		(mixed) If found returns an extended Element, else returns null.

	Example:
		[javascript]
			var body = $(document.body);
			var firstDiv = body.getElement('div');
			// or
			var firstDiv = $(document.body).getElement('div');
		[/javascript]

	Note:
		This method is also available for the Document instances.
		This method gets replaced when <Selector.js> is included. <Selector.js> enhances getElement so that it maches with CSS selectors.
	*/

	getElement: function(tag, nocash){
		var element = this.getElementsByTagName(tag)[0] || null;
		return (nocash) ? element : $(element);
	},

	/*
	Method: getElements
		Searches and returns all descendant Elements that match the tag provided.

	Syntax:
		>var myElements = myElement.getElements(tag);

	Arguments:
		tag - (string) String of the tag to match.

	Returns:
		(array) An array of all matched Elements. If none of the descendants matched the tag, will return an empty array.

	Example:
		[javascript]
			var body = $(document.body);
			var allAnchors = body.getElements('a');
			// or
			var allAnchors = $(document.body).getElement('a');
		[/javascript]

	Note:
		This method gets replaced when <Selector.js> is included. <Selector.js> enhances getElements so that it maches with CSS selectors.
		This method is also available for the Document instances.
	*/

	getElements: function(tag, nocash){
		var elements = this.getElementsByTagName(tag);
		return (nocash) ? elements : $$(elements);
	}

});

Element.Setters = new Hash({

	properties: function(properties){
		this.setProperties(properties);
	}

});

Element.Builders = new Hash({

	iframe: function(props){
		return new IFrame(props);
	}

});

Element.implement({

	/*
	Method: getElementById
		Targets an element with the specified id found inside the Element. Does not overwrite document.getElementById.

	Arguments:
		id - (string) the id of the element to find.

	Returns:
		(mixed) The element you find or null if none found.
	*/

	getElementById: function(id, nocash){
		var el = this.ownerDocument.getElementById(id);
		if (!el) return null;
		for (var parent = el.parentNode; parent != this; parent = parent.parentNode){
			if (!parent) return null;
		}
		return (nocash) ? el : $(el);
	},

	/*
	Method: set
		With this method you can set events, styles, and properties to the Element (same as calling new Element with the second paramater).

	Syntax:
		>myElement.set(props);

	Arguments:
		props - (object) An object with various properties used to modify the current Element. Keyword properties are: 'styles' and 'events' all other are considered properties. See also: new <Element>

	Returns:
		(element) This Element.

	Example:
		[javascript]
			var body = $(document.body).set({
				'styles': { // property styles passes the object to <Element.setStyles>
					'font': '12px Arial',
					'color': 'blue'
				},
				'events': { // property events passes the object to <Element.addEvents>
					'click': function(){ alert('click'); },
					'scroll': function(){
				},
				'id': 'documentBody' //any other property uses setProperty
			});
		[/javascript]

	See Also:
		<Element>, <Element.setStyles>, <Element.addEvents>, <Element.setProperty>
	*/

	set: function(props){
		for (var prop in props){
			if (Element.Setters.has(prop)) Element.Setters[prop].call(this, props[prop]);
			else this.setProperty(prop, props[prop]);
		}
		return this;
	},

	/*
	Method: inject
		Injects, or inserts, the Element at a particular place relative to the Element's children (specified by the second the paramter).

	Syntax:
		>myElement.inject(el[, where]);

	Arguments:
		el    - (mixed) el can be: the string of the id of the Element or an Element.
		where - (string, optional) The place to inject this Element to (defaults to the bottom of the el's child nodes).

	Returns:
		(element) This Element.

	Example:
		[javascript]
			var myDiv = new Element('div', {id: 'mydiv'});
			myDiv.inject(document.body);
			// or inline
			var myDiv = new Element('div', {id: 'mydiv'}).inject(document.body);

			new Element('a').inject('mydiv'); // is also valid since myDiv is now inside the body
		[/javascript]

	See Also:
		<Element.adopt>
	*/

	inject: function(el, where){
		el = $(el);
		switch (where){
			case 'before': el.parentNode.insertBefore(this, el); break;
			case 'after':
				var next = el.getNext();
				if (!next) el.parentNode.appendChild(this);
				else el.parentNode.insertBefore(this, next);
				break;
			case 'top':
				var first = el.firstChild;
				if (first){
					el.insertBefore(this, first);
					break;
				}
			default: el.appendChild(this);
		}
		return this;
	},

	/*
	Method: injectBefore
		Inserts the Element before the passed Element.

	Syntax:
		>myElement.injectBefore(el);

	Arguments:
		el - (mixed) An Element reference or the id of the Element to be injected before.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
		[/html]

		[javascript]
			$('mySecondElement').injectBefore('myElement');
		[/javascript]

		Result:
		[html]
			<div id="mySecondElement"></div>
			<div id="myElement"></div>
		[/html]

	See Also:
		<Element.inject>
	*/

	injectBefore: function(el){
		return this.inject(el, 'before');
	},

	/*
	Method: injectAfter
		Inserts the Element after the passed Element.

	Syntax:
		>myElement.injectAfter(el);

	Arguments:
		el - (mixed) An Element reference or the id of the Element to be injected after.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="mySecondElement"></div>
			<div id="myElement"></div>
		[/html]

		[javascript]
			$('mySecondElement').injectBefore('myElement');
		[/javascript]

		Result:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
		[/html]

	See Also:
		<Element.inject>, <Element.injectBefore>
	*/

	injectAfter: function(el){
		return this.inject(el, 'after');
	},

	/*
	Method: injectInside
		Injects the Element inside and at the end of the child nodes of the passed in Element.

	Syntax:
		>myElement.injectInside(el);

	Arguments:
		el - (mixed) An Element reference or the id of the Element to be injected inside.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
		[/html]

		[javascript]
			$('mySecondElement').injectInside('myElement');
		[/javascript]

		Result:
		[html]
			<div id="myElement">
				<div id="mySecondElement"></div>
			</div>
		[/html]

	See Also:
		<Element.inject>
	*/

	injectInside: function(el){
		return this.inject(el, 'bottom');
	},

	/*
	Method: injectTop
		Same as <Element.injectInside>, but inserts the Element inside, at the top.

	Syntax:
		>myElement.injectTop(el);

	Arguments:
		el - (mixed) An Element reference or the id of the Element to be injected top.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div id="mySecondElement"></div>
				<div id="myThirdElement"></div>
			</div>
			<div id="myFourthElement"></div>
		[/html]

		[javascript]
			$('myFourthElement').injectTop('myElement');
		[/javascript]

		Result:
		[html]
			<div id="myElement">
				<div id="myFourthElement"></div>
				<div id="mySecondElement"></div>
				<div id="myThirdElement"></div>
			</div>
		[/html]

	See Also:
		<Element.inject>
	*/

	injectTop: function(el){
		return this.inject(el, 'top');
	},

	/*
	Method: adopt
		Inserts the passed Elements inside the Element.

	Syntax:
		>myElement.adopt(el[, el2[, ...]]);

	Arguments:
		Accepts Elements references, Element ids as string, selectors ($$('stuff')) / array of Elements, array of ids as strings and collections.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
			<div id="myThirdElement"></div>
			<div id="myFourthElement"></div>
		[/html]

		[javascript]
			$('myElement').adopt('mySecondElement', 'myThirdElement', 'myFourthElement');
		[/javascript]

		Result:
		[html]
			<div id="myElement">
				<div id="myFourthElement"></div>
				<div id="mySecondElement"></div>
				<div id="myThirdElement"></div>
			</div>
		[/html]

	See Also:
		<Element.inject>
	*/

	adopt: function(){
		var elements = [];
		Array.each(arguments, function(argument){
			elements = elements.concat(argument);
		});
		$$(elements).inject(this);
		return this;
	},

	/*
	Method: dispose
		Removes the Element from the DOM.

	Syntax:
		>var removedElement = myElement.dispose();

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
		[/html]

		[javascript]
			$('myElement').dispose() //bye bye
		[/javascript]

		Results:
		[html]
			<div id="mySecondElement"></div>
		[/html]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.removeChild>
	*/

	dispose: function(){
		return this.parentNode.removeChild(this);
	},

	/*
	Method: clone
		Clones the Element and returns the cloned one.

	Syntax:
		>var copy = myElement.clone([contents]);

	Arguments:
		contents - (boolean, optional) When true the Element is cloned with childNodes, default true

	Returns:
		(element) The cloned Element without Events.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
		[/html]

		[javascript]
			var clone = $('myElement').clone().injectAfter('myElement'); //clones the Element and append the clone after the Element.
		[/javascript]

		Results:
		[html]
			<div id="myElement"></div>
			<div id=""></div>
		[/html]

	Note:
		The returned Element does not have an attached events. To clone the events use <Element.cloneEvents>.

	See Also:
		<Element.cloneEvents>
	*/

	clone: function(contents){
		var el = $(this.cloneNode(contents !== false));
		if (!el.$events) return el;
		el.$events = {};
		for (var type in this.$events) el.$events[type] = {
			'keys': $A(this.$events[type].keys),
			'values': $A(this.$events[type].values)
		};
		return el.removeEvents();
	},

	/*
	Method: replaceWith
		Replaces the Element with an Element passed.

	Syntax:
		>var replacingElement = myElement.replaceWidth(el);

	Arguments:
		el - (mixed) A string id representing the Element to be injected in, or an Element reference. In addition, if you pass div or another tag, the Element will be created.

	Returns:
		(element) The passed in Element.

	Example:
		[javascript]
			$('myOldElement').replaceWith($('myNewElement')); //$('myOldElement') is gone, and $('myNewElement') is in its place.
		[/javascript]]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.replaceChild>
	*/

	replaceWith: function(el){
		el = $(el);
		this.parentNode.replaceChild(el, this);
		return el;
	},

	/*
	Method: appendText
		Appends text node to a DOM Element.

	Syntax:
		>myElement.appendText(text);

	Arguments:
		text - (string) The text to append.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement">hey</div>
		[/html]

		[javascript]
			$('myElement').appendText('. howdy'); //myElement innerHTML is now "hey howdy"
		[/javascript]

		Result:
		[html]
			<div id="myElement">hey. howdy</div>
		[/html]
	*/

	appendText: function(text){
		this.appendChild(this.ownerDocument.createTextNode(text));
		return this;
	},

	/*
	Method: hasClass
		Tests the Element to see if it has the passed in className.

	Syntax:
		>var result = myElement.hasClass(className);

	Arguments:
		className - (string) The class name to test.

	Returns:
		(boolean) Returns true if the Element has the class, otherwise false.

	Example:
		[html]
			<div id="myElement" class="testClass"></div>
		[/html]

		[javascript]
			$('myElement').hasClass('testClass'); //returns true
		[/javascript]
	*/

	hasClass: function(className){
		return this.className.contains(className, ' ');
	},

	/*
	Method: addClass
		Adds the passed in class to the Element, if the Element doesnt already have it.

	Syntax:
		>myElement.addClass(className);

	Arguments:
		className - (string) The class name to add.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement" class="testClass"></div>
		[/html]

		[javascript]
			$('myElement').addClass('newClass');
		[/javascript]

		Result:
		[html]
			<div id="myElement" class="testClass newClass"></div>
		[/html]
	*/

	addClass: function(className){
		if (!this.hasClass(className)) this.className = (this.className + ' ' + className).clean();
		return this;
	},

	/*
	Method: removeClass
		Works like <Element.addClass>, but removes the class from the Element.

	Syntax:
		>myElement.removeClass(className);

	Arguments:
		className - (string) The class name to remove.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement" class="testClass newClass"></div>
		[/html]

		[javascript]
			$('myElement').removeClass('newClass');
		[/javascript]

		Result:
		[html]
			<div id="myElement" class="testClass"></div>
		[/html]
	*/

	removeClass: function(className){
		this.className = this.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1').clean();
		return this;
	},

	/*
	Method: toggleClass
		Adds or removes the passed in class name to the Element, depending on if it's present or not.

	Syntax:
		>myElement.toggleClass(className);

	Arguments:
		className - (string) The class to add or remove.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement" class="myClass"></div>
		[/html]

		[javascript]
			$('myElement').toggleClass('myClass');
		[/javascript]

		Result:
		[html]
			<div id="myElement" class=""></div>
		[/html]

		[javascript]
			$('myElement').toggleClass('myClass');
		[/javascript]

		Result:
		[html]
			<div id="myElement" class="myClass"></div>
		[/html]
	*/

	toggleClass: function(className){
		return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
	},

	walk: function(brother, start){
		brother += 'Sibling';
		var el = (start) ? this[start] : this[brother];
		while (el && $type(el) != 'element') el = el[brother];
		return $(el);
	},

	/*
	Method: getPrevious
		Returns the previousSibling of the Element (excluding text nodes).

	Syntax:
		>var previousSibling = myElement.getPrevious();

	Returns:
		(mixed) The previous sibling Element, or returns null if none found.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
		[/html]

		[javascript]
			$('mySecondElement').getPrevious().dispose(); //get the previous DOM Element from mySecondElement and removes.
		[/javascript]

		Result:
		[html]
			<div id="mySecondElement"></div>
		[/html]

		See Also:
			<Element.remove>
	*/

	getPrevious: function(){
		return this.walk('previous');
	},

	/*
	Method: getNext
		Works as Element.getPrevious, but tries to find the nextSibling (excluding text nodes).

	Syntax:
		>var nextSibling = myElement.getNext();

	Returns:
		(mixed) The next sibling Element, or returns null if none found.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
		[/html]

		[javascript]
			$('myElement').getNext().addClass('found'); //get the next DOM Element from myElement and adds class 'found'.
		[/javascript]

		Result:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement" class="found"></div>
		[/html]

	See Also:
		<Element.addClass>
	*/

	getNext: function(){
		return this.walk('next');
	},

	/*
	Method: getFirst
		Works as <Element.getPrevious>, but tries to find the firstChild (excluding text nodes).

	Syntax:
		>var firstElement = myElement.getFirst();

	Returns:
		(mixed) The first sibling Element, or returns null if none found.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
			<div id="myThirdElement"></div>
		[/html]

		[javascript]
			$('myThirdElement').getFirst().inject('mySecondElement'); //gets the first DOM Element from myThirdElement and injects inside mySecondElement.
		[/javascript]

		Result:
		[html]
			<div id="mySecondElement">
				<div id="myElement"></div>
			</div>
			<div id="myThirdElement"></div>
		[/html]

	See Also:
		<Element.inject>
	*/

	getFirst: function(){
		return this.walk('next', 'firstChild');
	},

	/*
	Method: getLast
		Works as <Element.getPrevious>, but tries to find the lastChild.

	Syntax:
		>var lastElement = myElement.getLast();

	Returns:
		(mixed) The first sibling Element, or returns null if none found.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
			<div id="mySecondElement"></div>
			<div id="myThirdElement"></div>
		[/html]

		[javascript]
			$('myElement').getLast().adopt('mySecondElement'); //gets the last DOM Element from myElement and adopts mySecondElement.
		[/javascript]

		Result:
		[html]
			<div id="myElement"></div>
			<div id="myThirdElement">
				<div id="mySecondElement"></div>
			</div>
		[/html]

	Note:
		For <Elements> this method is named getLastElements, because <Array.getLast> has priority.

	See Also:
		<Element.adopt>
	*/

	getLast: function(){
		return this.walk('previous', 'lastChild');
	},

	/*
	Method: getParent
		Returns the parent node extended.

	Syntax:
		>var parent = myElement.getParent();

	Returns:
		(element) This Element's parent.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div id="mySecondElement"></div>
			</div>
		[/html]

		[javascript]
			$('mySecondElement').getParent().addClass('papa');
		[/javascript]

		Result:
		[html]
			<div id="myElement" class="papa">
				<div id="mySecondElement"></div>
			</div>
		[/html]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.parentNode>
	*/

	getParent: function(){
		return $(this.parentNode);
	},

	/*
	Method: getChildren
		Returns all the Element's children (excluding text nodes). Returns as <Elements>.

	Syntax:
		>var children = myElement.getChildren();

	Returns:
		(array) A <Elements> array with all of the Element's children except the text nodes.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div id="mySecondElement"></div>
				<div id="myThirdElement"></div>
			</div>
		[/html]

		[javascript]
			$('myElement').getChildren().removeElements(); // notice how <Element.remove> is renamed removeElements due to Array precedence.
		[/javascript]

		Result:
		[/html]
			<div id="myElement"></div>
		[/javascript]

	See Also:
		<Elements>, <Elements.remove>
	*/

	getChildren: function(){
		return $$(this.childNodes);
	},

	/*
	Method: hasChild
		Checks all children (including text nodes) for a match.

	Syntax:
		>var result = myElement.hasChild(el);

	Arguments:
		el - (mixed) Can be a Element reference or string id.

	Returns:
		(boolean) Returns true if the passed in Element is a child of the Element, otherwise false.

	Example:
		HTML:
		[html]
			<div id="Darth_Vader">
				<div id="Luke"></div>
			</div>
		[/html]

		[javascript]
			if($('Darth_Vader').hasChild('Luke')) alert('Luke, I am your father.'); // tan tan tannn.....
		[/javascript]
	*/

	hasChild: function(el){
		return !!$A(this.getElementsByTagName('*')).contains(el);
	},

	/*
	Method: getProperty
		Gets the an attribute of the Element.

	Syntax:
		>myElement.getProperty(property);

	Arguments:
		property - (string) The attribute to retrieve.

	Returns:
		(mixed) The value of the property, or an empty string.

	Example:
		HTML:
		[html]
			<img id="myImage" src="mootools.png" />
		[/html]

		[javascript]
			$('myImage').getProperty('src') // returns mootools.png
		[/javascript]
	*/

	getProperty: function(property){
		var index = Element.$attributes[property];
		if (index) return this[index];
		var flag = Element.$attributesIFlag[property] || 0;
		if (!Client.Engine.trident || flag) return this.getAttribute(property, flag);
		var node = (this.attributes) ? this.attributes[property] : null;
		return (node) ? node.nodeValue : null;
	},

	/*
	Method: removeProperty
		Removes an attribute from the Element.

	Syntax:
		>myElement.removeProperty(property);

	Arguments:
		property - (string) The attribute to remove.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<a id="myAnchor" href="#" onmousedown="alert('click');"></a>
		[/html]

		[javascript]
			$('myAnchor').removeProperty('onmousedown'); //eww inline javascript is bad! Let's get rid of it.
		[/javascript]

		Result:
		[html]
			<a id="myAnchor" href="#"></a>
		[/html]
	*/

	removeProperty: function(property){
		var index = Element.$attributes[property];
		if (index) this[index] = '';
		else this.removeAttribute(property);
		return this;
	},

	/*
	Method: getProperties
		Same as <Element.getStyles>, but for properties.

	Syntax:
		>var myProps = myElement.getProperties();

	Returns:
		(object) An object containing all of the Element's properties.

	Example:
		HTML:
		[html]
			<img id="myImage" src="mootools.png" title="MooTools, the compact JavaScript framework" alt="" />
		[/html]

		[javascript]
			var imgProps = $('myImage').getProperties(); // returns: { id: 'myImage', src: 'mootools.png', title: 'MooTools, the compact JavaScript framework', alt: '' }
		[/javascript]

	See Also:
		<Element.getProperty>
	*/

	getProperties: function(){
		var result = {};
		Array.each(arguments, function(key){
			result[key] = this.getProperty(key);
		}, this);
		return result;
	},

	/*
	Method: setProperty
		Sets an attribute for the Element.

	Arguments:
		property - (string) The property to assign the value passed in.
		value - (mixed) The value to assign to the property passed in.

	Return:
		(element) - This Element.

	Example:
		HTML:
		[html]
			<img id="myImage" />
		[/html]

		[javascript]
			$('myImage').setProperty('src', 'mootools.png');
		[/javascript]

		Result:
		[html]
			<img id="myImage" src="mootools.png" />
		[/html]
	*/

	setProperty: function(property, value){
		var index = Element.$attributes[property];
		if (index) this[index] = value;
		else this.setAttribute(property, value);
		return this;
	},

	/*
	Method: setProperties
		Sets numerous attributes for the Element.

	Arguments:
		properties - (object) An object with key/value pairs.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<img id="myImage" />
		[/html]

		[javascript]
			$('myImage').setProperties({
				src: 'whatever.gif',
				alt: 'whatever dude'
			});
		[/javascript]

		Result:
		[html]
			<img id="myImage" src="whatever.gif" alt="whatever dude" />
		[/html]
	*/

	setProperties: function(properties){
		for (var property in properties) this.setProperty(property, properties[property]);
		return this;
	},

	/*
	Method: setHTML
		Sets the innerHTML of the Element.

	Syntax:
		>myElement.setHTML([htmlString[, htmlString2[, htmlString3[, ..]]]);

	Arguments:
		Any number of string paramters with html.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
		[/html]

		[javascript]
			$('myElement').setHTML('<div></div>', '<p></p>');
		[/javascript]

		Result:
		[html]
			<div id="myElement">
				<div></div>
				<p></p>
			</div>
		[/html]

	Note:
		Any Elements added with setHTML will not be <Garbage> collected. This may be a source of memory leak.

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.innerHTML>
	*/

	setHTML: function(){
		this.innerHTML = Array.join(arguments, '');
		return this;
	},

	/*
	Method: setText
		Sets the inner text of the Element.

	Syntax:
		>myElement.setText(text);

	Arguments:
		text - (string) The new text content for the Element.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
		[/html]

		[javascript]
			$('myElement').setText('some text') //the text of myElement is now = 'some text'
		[/javascript]

		Result:
		[html]
			<div id="myElement">some text</div>
		[/html]
	*/

	setText: function(text){
		var tag = this.getTag();
		if (['style', 'script'].contains(tag)){
			if (Client.Engine.trident){
				if (tag == 'style') this.styleSheet.cssText = text;
				else if (tag ==  'script') this.setProperty('text', text);
				return this;
			} else {
				if (this.firstChild) this.removeChild(this.firstChild);
				return this.appendText(text);
			}
		}
		this[$defined(this.innerText) ? 'innerText' : 'textContent'] = text;
		return this;
	},

	/*
	Method: getText
		Gets the inner text of the Element.

	Syntax:
		>var myText = myElement.getText();

	Returns:
		(string) The text of the Element.

	Example:
		HTML:
		[html]
			<div id="myElement">my text</div>
		[/html]

		[javascript]
			var myText = $('myElement').getText(); //myText = 'my text';
		[/javascript]
	*/

	getText: function(){
		var tag = this.getTag();
		if (['style', 'script'].contains(tag)){
			if (Client.Engine.trident){
				if (tag == 'style') return this.styleSheet.cssText;
				else if (tag ==  'script') return this.getProperty('text');
			} else {
				return this.innerHTML;
			}
		}
		return ($pick(this.innerText, this.textContent));
	},

	/*
	Method: getTag
		Returns the tagName of the Element in lower case.

	Syntax:
		>var myTag = myElement.getTag();

	Returns:
		(string) The tag name in lower case

	Example:
		HTML:
		[html]
			<img id="myImage" />
		[/html]

		[javascript]
			var myTag = $('myImage').getTag() // myTag = 'img';
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.tagName>
	*/

	getTag: function(){
		return this.tagName.toLowerCase();
	},

	/*
	Method: empty
		Empties an Element of all its children.

	Syntax:
		>myElement.empty();

	Returns:
		(element) This Element..

	Example:
		HTML:
		[html]
			<div id="myElement">
				<p></p>
				<span></span>
			</div>
		[/html]

		[javascript]
			$('myElement').empty() // empties the Div and returns it
		[/javascript]

		Result:
		[html]
			<div id="myElement"></div>
		[/html]
	*/

	empty: function(){
		var elements = $A(this.getElementsByTagName('*'));
		elements.each(function(element){
			Element.dispose.attempt(element);
		});
		Garbage.trash(elements);
		Element.setHTML.attempt([this, '']);
		return this;
	},

	/*
	Method: destroy
		Empties an Element of all its children, removes and garbages the Element.

	Syntax:
		>myElement.destroy();

	Returns:
		(null)

	Example:
		HTML:
		[html]
			<div id="myElement"></div>
		[/html]

		[javascript]
			$('myElement').destroy() // the Element is no more.
		[/javascript]

	See Also:
		<Element.empty>
	*/

	destroy: function(){
		Garbage.kill(this.empty().dispose());
		return null;
	}

});

Element.alias('dispose', 'remove');

Element.$attributes = {
	'class': 'className', 'for': 'htmlFor', 'colspan': 'colSpan', 'rowspan': 'rowSpan',
	'accesskey': 'accessKey', 'tabindex': 'tabIndex', 'maxlength': 'maxLength',
	'readonly': 'readOnly', 'frameborder': 'frameBorder', 'value': 'value',
	'disabled': 'disabled', 'checked': 'checked', 'multiple': 'multiple', 'selected': 'selected'
};

Element.$attributesIFlag = {
	'href': 2, 'src': 2
};

Native.implement([Element, Window, Document], {

	addListener: function(type, fn){
		if (this.addEventListener) this.addEventListener(type, fn, false);
		else this.attachEvent('on' + type, fn);
		return this;
	},

	removeListener: function(type, fn){
		if (this.removeEventListener) this.removeEventListener(type, fn, false);
		else this.detachEvent('on' + type, fn);
		return this;
	}

});

Element.UID = 0;

var Garbage = {

	Elements: {},
	
	ignored: {'object': 1, 'embed': 1, 'OBJECT': 1, 'EMBED': 1},

	collect: function(el){
		if (el.$attributes) return true;
		if (Garbage.ignored[el.tagName]) return false;
		el.$attributes = {'opacity': 1, 'uid': Element.UID++};
		Garbage.Elements[el.$attributes.uid] = el;
		return true;
	},

	trash: function(elements){
		for (var i = elements.length, el; i--; i) Garbage.kill(elements[i]);
	},

	kill: function(el){
		if (!el || !el.$attributes) return;
		delete Garbage.Elements[String(el.$attributes.uid)];
		if (el.$events) el.removeEvents();
		for (var p in el.$attributes) el.$attributes[p] = null;
		if (Client.Engine.trident){
			for (var d in Element.prototype) el[d] = null;
		}
		el.$attributes = null;
	},

	empty: function(){
		for (var uid in Garbage.Elements) Garbage.kill(Garbage.Elements[uid]);
	}

};

window.addListener('beforeunload', function(){
	window.addListener('unload', Garbage.empty);
	if (Client.Engine.trident) window.addListener('unload', CollectGarbage);
});

/*
Script: Element.Style.js
	Contains useful Element methods to get/set styles in a fashionable way.

License:
	MIT-style license.
*/

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.Setters.styles = function(styles){
	this.setStyles(styles);
};

Element.implement({

	/*
	Method: setStyle
		Sets a CSS property to the Element.

	Syntax:
		>myElement.setStyle(property, value);

	Arguments:
		property - (string) The property to set.
		value    - (mixed) The value to which to set it. For numeric values that require "px" you can pass an number.

	Returns:
		(element) This element.

	Example:
		[javascript]
			$('myElement').setStyle('width', '300px'); //the width is now 300px
			//or
			$('myElement').setStyle('width', 300); //the width is now 300px
		[/javascript]

	Note:
		All number values will automatically be rounded to the nearest whole number.
	*/

	setStyle: function(property, value){
		switch (property){
			case 'opacity': return this.setOpacity(parseFloat(value));
			case 'float': property = (Client.Engine.trident) ? 'styleFloat' : 'cssFloat';
		}
		property = property.camelCase();
		if ($type(value) != 'string'){
			var map = (Element.Styles.All[property] || '@').split(' ');
			value = $splat(value).map(function(val, i){
				if (!map[i]) return '';
				return ($type(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
			}).join(' ');
		} else if (value == Number(value) + ''){
			value = Math.round(value);
		}
		this.style[property] = value;
		return this;
	},

	/*
	Method: setStyles
		Applies a collection of styles to the Element.

	Syntax:
		>myElement.setStyles(styles);

	Arguments:
		styles - (mixed) An object, or string, containing all the styles to apply.

	Returns:
		(element) This element.

	Example:
		[javascript]
			$('myElement').setStyles({
				border: '1px solid #000',
				width: 300,
				height: 400
			});
			//or
			$('myElement').setStyles('border: 1px solid #000; width: 300px; height: 400px;'); // See the Note
		[/javascript]

	Note:
		When styles is a CSS string, all the CSS styles are overridden.

	See Also:
		<Element.setStyle>
	*/

	setStyles: function(styles){
		switch ($type(styles)){
			case 'object': for (var style in styles) this.setStyle(style, styles[style]); break;
			case 'string': this.style.cssText = styles;
		}
		return this;
	},

	/*
	Method: setOpacity
		Sets the opacity of the Element, and sets also visibility == "hidden" if opacity == 0, and visibility = "visible" if opacity > 0.

	Syntax:
		>Element.setOpacity(opacity);

	Arguments:
		opacity - (float) A values from 0.0 to 1.0, where 1.0 is visible and 0.0 is hidden.

	Returns:
		(element) This element.

	Example:
		[javascript]
			$('myElement').setOpacity(0.5) //make it 50% transparent
		[/javascript]
	*/

	setOpacity: function(opacity){
		if (opacity == 0){
			if (this.style.visibility != 'hidden') this.style.visibility = 'hidden';
		} else {
			if (this.style.visibility != 'visible') this.style.visibility = 'visible';
		}
		if (!this.currentStyle || !this.currentStyle.hasLayout) this.style.zoom = 1;
		if (Client.Engine.trident) this.style.filter = (opacity == 1) ? '' : 'alpha(opacity=' + opacity * 100 + ')';
		this.style.opacity = this.$attributes.opacity = opacity;
		return this;
	},

	/*
	Method: getStyle
		Returns the style of the Element given the property passed in.

	Syntax:
		>var style = myElement.getStyle(property);

	Arguments:
		property - (string) The css style property you want to retrieve.

	Returns:
		(string) The style value.

	Example:
		[javascript]
			$('myElement').getStyle('width'); //returns "400px"
			//but you can also use
			$('myElement').getStyle('width').toInt(); //returns 400
		[/javascript]
	*/

	getStyle: function(property){
		property = property.camelCase();
		if (property == 'opacity') return this.$attributes.opacity;
		var result = this.style[property];
		if (!$chk(result)){
			result = [];
			for (var style in Element.Styles.Short){
				if (property != style) continue;
				for (var s in Element.Styles.Short[style]) result.push(this.getStyle(s));
				return (result.every(function(item){
					return item == result[0];
				})) ? result[0] : result.join(' ');
			}
			result = (this.currentStyle) ? this.currentStyle[property] : this.ownerDocument.window.getComputedStyle(this, null).getPropertyValue([property.hyphenate()]);
		}
		if (result){
			result = String(result);
			var color = result.match(/rgba?\([\d\s,]+\)/);
			if (color) result = result.replace(color[0], color[0].rgbToHex());
		}
		return (Client.Engine.trident) ? Element.$fixStyle(property, result, this) : result;
	},

	/*
	Method: getStyles
		Returns an object of styles of the Element for each argument passed in.

	Syntax:
		>var styles = myElement.getStyles(property[, property2[, property3[, ...]]]);

	Arguments:
		properties - (strings) Any number of style properties.

	Returns:
		(object) An key/value object with the CSS styles as computed by the browser.

	Example:
		[javascript]
			$('myElement').getStyles('width', 'height', 'padding'); //returns {width: "10px", height: "10px", padding: "10px 0px 10px 0px"}
		[/javascript]

	See Also:
		<Element.getStyle>
	*/

	getStyles: function(){
		var result = {};
		Array.each(arguments, function(key){
			result[key] = this.getStyle(key);
		}, this);
		return result;
	}

});

Element.$fixStyle = function(property, result, element){
	if ($chk(parseInt(result))) return result;
	if (['height', 'width'].contains(property)){
		var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'];
		var size = 0;
		values.each(function(value){
			size += element.getStyle('border-' + value + '-width').toInt() + element.getStyle('padding-' + value).toInt();
		});
		return element['offset' + property.capitalize()] - size + 'px';
	} else if (property.test(/border(.+)Width|margin|padding/)){
		return '0px';
	}
	return result;
};

Element.Styles = {

	All: {
		'width': '@px', 'height': '@px', 'left': '@px', 'top': '@px', 'bottom': '@px', 'right': '@px',
		'backgroundColor': 'rgb(@, @, @)', 'backgroundPosition': '@px @px', 'color': 'rgb(@, @, @)',
		'fontSize': '@px', 'letterSpacing': '@px', 'lineHeight': '@px',
		'margin': '@px @px @px @px', 'padding': '@px @px @px @px', 'border': '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
		'borderWidth': '@px @px @px @px', 'borderStyle': '@ @ @ @', 'borderColor': 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
		'zIndex' : '@', 'zoom': '@', 'fontWeight': '@',
		'textIndent': '@px', 'opacity': '@'
	},

	Short: {'margin': {}, 'padding': {}, 'border': {}, 'borderWidth': {}, 'borderStyle': {}, 'borderColor': {}}

};

['Top', 'Right', 'Bottom', 'Left'].each(function(direction){
	var Short = Element.Styles.Short;
	var All = Element.Styles.All;
	['margin', 'padding'].each(function(style){
		var sd = style + direction;
		Short[style][sd] = All[sd] = '@px';
	});
	var bd = 'border' + direction;
	Short.border[bd] = All[bd] = '@px @ rgb(@, @, @)';
	var bdw = bd + 'Width', bds = bd + 'Style', bdc = bd + 'Color';
	Short[bd] = {};
	Short.borderWidth[bdw] = Short[bd][bdw] = '@px';
	Short.borderStyle[bds] = Short[bd][bds] = '@';
	Short.borderColor[bdc] = Short[bd][bdc] = 'rgb(@, @, @)';
});

/*
Script: Element.Event.js
	Contains the Event Class, Element methods to deal with Element events, and custom Events.

License:
	MIT-style license.
*/

/*
Class: Event
	Cross browser Class to manage Events.

Syntax:
	>var myEvent = new Event([event[, win]]);

Arguments:
	event - (event, optional) An Event that needs to be extended.
	win   - (win, optional) The context of the event.

Properties:
	shift         - (boolean) True if the user pressed the shift
	control       - (boolean) True if the user pressed the control
	alt           - (boolean) True if the user pressed the alt
	meta          - (boolean) True if the user pressed the meta key
	wheel         - (number) The amount of third button scrolling
	code          - (number) The keycode of the key pressed
	page.x        - (number) The x position of the mouse, relative to the full window
	page.y        - (number) The y position of the mouse, relative to the full window
	client.x      - (number) The x position of the mouse, relative to the viewport
	client.y      - (number) The y position of the mouse, relative to the viewport
	key           - (string) The key pressed as a lowercase string. key also returns 'enter', 'up', 'down', 'left', 'right', 'space', 'backspace', 'delete', 'esc'.
	target        - (element) The event target, not extended with <$> for performance reasons.
	relatedTarget - (element) The event related target, not extended with <$> for performance reasons.

Example:
	[javascript]
		$('myLink').addEvent('keydown', function(event){
		 	// event is already the Event class, if you use el.onkeydown you have to write e = new Event(e);
			alert(event.key); //returns the lowercase letter pressed
			alert(event.shift); //returns true if the key pressed is shift
			if (event.key == 's' && event.control) alert('document saved');
		});
	[/javascript]

Note:
	Accessing event.page / event.client requires an XHTML doctype.
*/

var Event = new Native({
	
	name: 'Event',

	initialize: function(event, win){
		event = event || (win || window).event;
		if (event.$extended) return event;
		this.$extended = true;
		this.event = event;
		this.type = event.type;
		this.target = event.target || event.srcElement;
		if (this.target.nodeType == 3) this.target = this.target.parentNode;

		this.shift = event.shiftKey;
		this.control = event.ctrlKey;
		this.alt = event.altKey;
		this.meta = event.metaKey;

		if (['DOMMouseScroll', 'mousewheel'].contains(this.type)){
			this.wheel = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
		} else if (this.type.contains('key')){
			this.code = event.which || event.keyCode;
			this.key = Event.Keys.keyOf(this.code);
			if (this.type == 'keydown'){
				var fKey = this.code - 111;
				if (fKey > 0 && fKey < 13) this.key = 'f' + fKey;
			}
			this.key = this.key || String.fromCharCode(this.code).toLowerCase();
		} else if (this.type.test(/(click|mouse|menu)/)){
			this.page = {
				'x': event.pageX || event.clientX + win.document.documentElement.scrollLeft,
				'y': event.pageY || event.clientY + win.document.documentElement.scrollTop
			};
			this.client = {
				'x': event.pageX ? event.pageX - win.pageXOffset : event.clientX,
				'y': event.pageY ? event.pageY - win.pageYOffset : event.clientY
			};
			this.rightClick = (event.which == 3) || (event.button == 2);
			switch (this.type){
				case 'mouseover': this.relatedTarget = event.relatedTarget || event.fromElement; break;
				case 'mouseout': this.relatedTarget = event.relatedTarget || event.toElement;
			}
			if (this.fixRelatedTarget.create({'bind': this, 'attempt': Client.Engine.gecko})() === false) this.relatedTarget = this.target;
		}
		return this;
	}

});

Event.implement({

	/*
	Method: stop
		Stop an Event from propagating and also executes preventDefault.

	Syntax:
		>myEvent.stop();

	Returns:
		(class) This Event instance.

	Example:
		HTML:
		[html]
			<a id="myAnchor" href="http://google.com/">Visit Google.com</a>
		[/html]

		[javascript]
			$('myAnchor').addEvent('click', function(event){
				event.stop(); // prevent the user from leaving the site.
				this.setText("Where do you think you're going?"); //'this' is Element that fire's the Event.

				(function(){
					this.setText("Instead visit the Blog.").setProperty('href', 'http://blog.mootools.net');
				}).delay(500, this);
			});
		[/javascript]

	Note:
		Returning false within the function can also stop the propagation of the Event.

	See Also:
		<Element.addEvent>, <Event.stopPropagation>, <Event.preventDefault>, <Function.delay>
	*/

	stop: function(){
		return this.stopPropagation().preventDefault();
	},

	/*
	Method: stopPropagation
		Cross browser method to stop the propagation of an event (will not allow the event to bubble up through the DOM).

	Syntax:
		>myEvent.stopPropagation();

	Returns:
		(class) This Event object.

	Example:
		HTML:
		[html]
			<!-- #myChild does not cover the same area as myElement. Therefore, the 'click' differs from parent and child depending on the click location. -->
			<div id="myElement">
				<div id="myChild"></div>
			</div>
		[/html]

		[javascript]
			$('myElement').addEvent('click', function(){
				alert('click');
				return false; // equivalent to stopPropagation.
			});

			$('myChild').addEvent('click', function(event){
				event.stopPropagation(); // this will prevent the event to bubble up, and fire the parent's click event.
			});
		[/javascript]

	See Also:
		<Element.addEvent>, <http://developer.mozilla.org/en/docs/DOM:event.stopPropagation>
	*/

	stopPropagation: function(){
		if (this.event.stopPropagation) this.event.stopPropagation();
		else this.event.cancelBubble = true;
		return this;
	},

	/*
	Method: preventDefault
		Cross browser method to prevent the default action of the event.

	Syntax:
		>myEvent.preventDefault();

	Returns:
		(class) This Event object.

	Example:
		HTML:
		[html]
			<!-- credits: mozilla.org/en/docs/DOM:event.preventDefault -->
			<form>
				<input id="myCheckbox" type="checkbox" />
			</form>
		[/html]

		[javascript]
			$('myCheckbox').addEvent('click', function(event){
				event.preventDefault(); // will not allow the checkbox to be "checked"
			});
		[/javascript]

	See Also:
		<Element.addEvent>, <http://developer.mozilla.org/en/docs/DOM:event.preventDefault>
	*/

	preventDefault: function(){
		if (this.event.preventDefault) this.event.preventDefault();
		else this.event.returnValue = false;
		return this;
	},

	fixRelatedTarget: function(){
		var rel = this.relatedTarget;
		if (rel && rel.nodeType == 3) this.relatedTarget = rel.parentNode;
	}

});

/*
Property: Keys
	You can add additional Event keys codes this way:

Example:
	[javascript]
		Event.Keys.whatever = 80;
		$('myInput').addEvent('keydown', function(event){
			if (event.key == 'whatever') alert('whatever key clicked');
		});
	[/javascript]
*/

Event.Keys = new Hash({
	'enter': 13,
	'up': 38,
	'down': 40,
	'left': 37,
	'right': 39,
	'esc': 27,
	'space': 32,
	'backspace': 8,
	'tab': 9,
	'delete': 46
});

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
	These methods are also available on window and document.
*/

Element.Setters.events = function(events){
	this.addEvents(events);
};

Native.implement([Element, Window, Document], {

	/*
	Method: addEvent
		Attaches an event listener to a DOM element.

	Syntax:
		>myElement.addEvent(type, fn[, nativeType]);

	Arguments:
		type       - (string) The event name to monitor ('click', 'load', etc) without the prefix 'on'.
		fn         - (funtion) The function to execute.

	Returns:
		(element) This Element.

	Example:
		HTML:
		[html]
			<div id="myElement">Click me.</div>
		[/html]

		[javascript]
			$('myElement').addEvent('click', function(){ alert('clicked!'); });
		[/javascript]

	Note:
		You can stop the Event by returning false in the listener or calling <Event.stop>.

	See Also:
		<http://www.w3schools.com/html/html_eventattributes.asp>
	*/

	addEvent: function(type, fn){
		this.$events = this.$events || {};
		if (!this.$events[type]) this.$events[type] = {'keys': [], 'values': []};
		if (this.$events[type].keys.contains(fn)) return this;
		this.$events[type].keys.push(fn);
		var realType = type;
		var custom = Element.Events.get(type);
		var map = fn;
		if (custom){
			if (custom.add) custom.add.call(this, fn);
			if (custom.map){
				map = function(event){
					if (custom.map.call(this, event)) return fn.call(this, event);
					return false;
				};
			}
			if (custom.type) realType = custom.type;
		}
		var defn = fn;
		var nativeEvent = Element.$events[realType] || 0;
		if (nativeEvent){
			if (nativeEvent == 2){
				var self = this;
				var doc = this.ownerDocument || this;
				defn = function(event){
					event = new Event(event, doc.window);
					if (map.call(self, event) === false) event.stop();
				};
			}
			this.addListener(realType, defn);
		}
		this.$events[type].values.push(defn);
		return this;
	},

	/*
	Method: removeEvent
		Works as Element.addEvent, but instead removes the previously added event listener.

	Syntax:
		>myElement.removeEvent(type, fn);

	Arguments:
		type - (string) The event name.
		fn   - (funtion) The function to remove.

	Returns:
		(element) This Element.

	Examples:
		Standard usage:
		[javascript]
			var destroy = function(){ alert('Boom: ' + this.id); } // this is the Element
			$('myElement').addEvent('click', destroy);
			// later in the code
			$('myElement').removeEvent('click', destroy);
		[/javascript]

		Example with bind:
		[javascript]
			var destroy = function(){ alert('Boom: ' + this.id); } // this is the Element
			var destroy2 = destroy.bind($('anotherElement'));
			$('myElement').addEvent('click', destroy2); // this is now another Element
			// later in the code
			$('myElement').removeEvent('click', destroy); // DOES NOT WORK
			$('myElement').removeEvent('click', destroy.bind($('anotherElement')); // DOES ALSO NOT WORK
			$('myElement').removeEvent('click', destroy2); // Finally, this works
		[/javascript]

	Note:
		When the function was added using <Function.bind> or <Function.pass> a new reference
		was created and you can not use removeEvent with the original function.
	*/

	removeEvent: function(type, fn){
		if (!this.$events || !this.$events[type]) return this;
		var pos = this.$events[type].keys.indexOf(fn);
		if (pos == -1) return this;
		var key = this.$events[type].keys.splice(pos, 1)[0];
		var value = this.$events[type].values.splice(pos, 1)[0];
		var custom = Element.Events.get(type);
		if (custom){
			if (custom.remove) custom.remove.call(this, fn);
			if (custom.type) type = custom.type;
		}
		return (Element.$events[type]) ? this.removeListener(type, value) : this;
	},

	/*
	Method: addEvents
		As <addEvent>, but accepts an object and add multiple events at once.

	Syntax:
		>myElement.addEvents(events);

	Arguments:
		events - (object) An object with key/value representing: key the event name, and value the function that is called when the Event occurs.

	Returns:
		(element) This Element.

	Example:
		[javascript]
			$('myElement').addEvents({
				'mouseover': function(){
					alert('mouse over');
				},
				'click': function(){
					alert('clicked');
				}
			});
		[/javascript]

	See Also:
		<Element.addEvent>
	*/

	addEvents: function(events){
		for (var event in events) this.addEvent(event, events[event]);
		return this;
	},

	/*
	Method: removeEvents
		Removes all events of a certain type from an Element. If no argument is passed in, removes all events.

	Syntax:
		>myElements.removeEvents([type]);

	Arguments:
		type - (string, optional) The event name (e.g. 'click'). If null, removes all events.

	Returns:
		(element) This Element.

	Example:
		[javascript]
			var myElement = $('myElement');
			myElement.addEvents({
				'mouseover': function(){
					alert('mouse over');
				},
				'click': function(){
					alert('clicked');
				}
			});

			myElement.addEvent('click': function(){ alert('clicked again'); });
			myElement.addEvent('click': function(){ alert('clicked and again :('); });
			// addEvent will keep appending each function. Unfortunately for the visitors, that'll be three alerts they'll receive.

			myElement.removeEvents('click'); //ahhh saved the visitor's finger.
		[/javascript]

	See Also:
		<Element.removeEvent>
	*/

	removeEvents: function(type){
		if (!this.$events) return this;
		if (!type){
			for (var evType in this.$events) this.removeEvents(evType);
			this.$events = null;
		} else if (this.$events[type]){
			while (this.$events[type].keys[0]) this.removeEvent(type, this.$events[type].keys[0]);
			this.$events[type] = null;
		}
		return this;
	},

	/*
	Method: fireEvent
		Executes all events of the specified type present in the Element.

	Syntax:
		>myElement.fireEvent(type[, args[, delay]]);

	Arguments:
		type  - (string) The event name (e.g. 'click')
		args  - (mixed, optional) Array or single object, arguments to pass to the function. If more than one argument, must be an array.
		delay - (number, optional) Delay (in ms) to wait to execute the event.

	Returns:
		(element) This Element.

	Example:
		[javascript]
			$('myElement').fireEvent('click', $('anElement'), 1000);  // Fires all the added 'click' events and passes the element 'anElement' after 1 sec.
		[/javascript]

	Note:
		This will not fire the DOM Event (this concerns all inline events ie. onmousedown="..").
	*/

	fireEvent: function(type, args, delay){
		if (this.$events && this.$events[type]){
			this.$events[type].keys.each(function(fn){
				fn.create({'bind': this, 'delay': delay, 'arguments': args})();
			}, this);
		}
		return this;
	},

	/*
	Method: cloneEvents
		Clones all events from an Element to this Element.

	Syntax:
		>myElement.cloneEvents(from[, type]);

	Arguments:
		from - (element) Copy all events from this Element.
		type - (string, optional) Copies only events of this type. If null, copies all events.

	Returns:
		(element) This Element.

	Example:
		[javascript]
			var myElement = $('myElement');
			var myClone = myElement.clone().cloneEvents(myElement); //clones the element and its events
		[/javascript]
	*/

	cloneEvents: function(from, type){
		if (!from.$events) return this;
		if (!type){
			for (var evType in from.$events) this.cloneEvents(from, evType);
		} else if (from.$events[type]){
			from.$events[type].keys.each(function(fn){
				this.addEvent(type, fn);
			}, this);
		}
		return this;
	}

});

Element.$events = {
	'click': 2, 'dblclick': 2, 'mouseup': 2, 'mousedown': 2, //mouse buttons
	'mousewheel': 2, 'DOMMouseScroll': 2, //mouse wheel
	'mouseover': 2, 'mouseout': 2, 'mousemove': 2, //mouse movement
	'keydown': 2, 'keypress': 2, 'keyup': 2, //keys
	'contextmenu': 2, 'submit': 2, //misc
	'load': 1, 'unload': 1, 'beforeunload': 1, 'resize': 1, 'move': 1, 'DOMContentLoaded': 1, 'readystatechange': 1, //window
	'focus': 1, 'blur': 1, 'change': 1, 'reset': 1, 'select': 1, //forms elements
	'error': 1, 'abort': 1, 'scroll': 1 //misc
};

Element.Events = new Hash({

	/*
	Event: mouseenter
		In addition to the standard javascript events (load, mouseover, mouseout, click, etc.) <Event.js> contains two custom events this event fires when the mouse enters the area of the dom Element and will not be fired again if the mouse crosses over children of the Element (unlike mouseover).

	Example:
		[javascript]
			$('myElement').addEvent('mouseenter', myFunction);
		[/javascript]

	See Also:
		<Element.addEvent>
	*/

	'mouseenter': {
		type: 'mouseover',
		map: function(event){
			var related = event.relatedTarget;
			return (related && related != this && !this.hasChild(related));
		}
	},

	/*
	Event: mouseleave
		This event fires when the mouse exits the area of the dom Element; will not be fired again if the mouse crosses over children of the Element (unlike mouseout).

	Example:
		[javascript]
			$('myElement').addEvent('mouseleave', myFunction);
		[/javascript]

	See Also:
		<Element.addEvent>
	*/

	'mouseleave': {
		type: 'mouseout',
		map: function(event){
			var related = event.relatedTarget;
			return (related && related != this && !this.hasChild(related));
		}
	},

	'mousewheel': {
		type: (Client.Engine.gecko) ? 'DOMMouseScroll' : 'mousewheel'
	}

});

/*
Script: Element.Filters.js
	Adds Filtering Capabilities to Elements Collections.

License:
	MIT-style license.
*/

/*
Native: Elements
	Custom Native to allow all of its methods to be used with any DOM elements collections via the dollar function <$>.
*/

Elements.implement({

	/*
	Method: filterByTag
		Filters the collection by a specified tag name.

	Syntax:
		>var filteredElements = myElements.filterByTag(tag[, nocash]);

	Arguments:
		tag    - (string) The tag to match against throughout the Elements collection.
		nocash - (boolean, optional) Optionally return a new Elements collection from the filtered elements.

	Returns:
		(array) Returns a new Elements collection, while the original remains untouched.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div></div>
				<a></a>
				<p></p>
				<div></div>
				<a></a>
				<p></p>
			</div>
		[/javascript]

		[javascript]
			$('myElement').getChildren().filterByTag('div'); //returns [<div>, <div>]
		[/javascript]

	See Also:
		<$>, <Element.getChildren()>
	*/

	filterByTag: function(tag, nocash){
		var elements = this.filter(function(el){
			return (Element.getTag(el) == tag);
		});
		return (nocash) ? elements : new Elements(elements, true);
	},

	/*
	Method: filterByClass
		Filters the collection by a specified class name.

	Syntax:
		>var filteredElements = myElements.filterByClass(className[, nocash]);

	Arguments:
		className - (string) The class to match against throughout the Elements collection.
		nocash    - (boolean, optional) Optionally return a new Elements collection from the filtered elements.

	Returns:
		(array) Returns a new Elements collection, while the original remains untouched.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div></div>
				<a class="findMe"></a>
				<p class="findMe"></p>
				<div class="findMe"></div>
				<a></a>
				<p></p>
			</div>
		[/html]

		[javascript]
			$('myElement').getChildren().filterByClass('findMe'); //returns [<a>, <p>, <div>]
		[/javascript]

	See Also:
		<$>, <Element.getChildren()>
	*/

	filterByClass: function(className, nocash){
		var elements = this.filter(function(el){
			return (el.className && el.className.contains(className, ' '));
		});
		return (nocash) ? elements : new Elements(elements, true);
	},

	/*
	Method: filterById
		Filters the collection by a specified ID.

	Syntax:
		>var filteredElements = myElements.filterById(id[, nocash]);

	Arguments:
		id     - (string) The class to match against throughout the Elements collection.
		nocash - (boolean, optional) Optionally return a new Elements collection from the filtered elements.

	Returns:
		(array) Returns a new Elements collection, while the original remains untouched.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div></div>
				<a></a>
				<p></p>
				<div id="findMe"</div>
				<a></a>
				<p></p>
			</div>
		[/html]

		[javascript]
			$('myElement').getChildren().filterById('findMe'); //returns [<div>]
		[/javascript]

	See Also:
		<$>, <Element.getChildren()>
	*/

	filterById: function(id, nocash){
		var elements = this.filter(function(el){
			return (el.id == id);
		});
		return (nocash) ? elements : new Elements(elements, true);
	},

	/*
	Method: filterByAttribute
		Filters the collection by a specified attribute.

	Syntax:
		>var filteredElements = myElements.filterByAttribute(name[, operator[, value[, nocash]]]);

	Arguments:
		name     - (string) The attribute name.
		operator - (string, optional) The attribute operator. If the operator is unsupported the match will always return true.
		value    - (mixed, optional) The attribute value, only valid if the operator is specified.
		nocash   - (boolean, optional) Optionally return a new Elements collection from the filtered elements.

	Returns:
		(array) Returns a new Elements collection, while the original remains untouched.

	Example:
		HTML:
		[html]
			<div id="myElement">
				<div></div>
				<a></a>
				<img src="mootools.png" alt="findMe" />
				<img src="whatever.gif" alt="findMe" />
				<iframe src="http://mootools.net/"></iframe>
				<script src="mootools.js"></script>
				<a></a>
				<p></p>
			</div>
		[/html]

		[javascript]
			var found = $('myElement').getChildren().filterByAttribute('src'); //returns [<img>, <img>, <iframe>, <script>]
			//could go further and:
			found = found.filterByAttribute('alt', '=', 'findMe'); //returns [<img>, <img>]
		[/javascript]

	See Also:
		<$>, <Element.getChildren()>
	*/

	filterByAttribute: function(name, operator, value, nocash){
		var elements = this.filter(function(el){
			var current = Element.getProperty(el, name);
			if (!current) return false;
			if (!operator) return true;
			switch (operator){
				case '=': return (current == value);
				case '*=': return (current.contains(value));
				case '^=': return (current.substr(0, value.length) == value);
				case '$=': return (current.substr(current.length - value.length) == value);
				case '!=': return (current != value);
				case '~=': return current.contains(value, ' ');
				case '|=': return current.contains(value, '-');
			}
			return false;
		});
		return (nocash) ? elements : new Elements(elements, true);
	}

});

/*
Script: Element.Dimensions.js
	Contains Element methods to work with element size, scroll, or position in space.

Note:
	The functions in this script require a XHTML doctype.

See Also:
	<http://en.wikipedia.org/wiki/XHTML>

License:
	MIT-style license.
*/

/*
Native: Element
	Custom class to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: scrollTo
		Scrolls the element to the specified coordinated (if the element has an overflow).

	Syntax:
		>myElement.scrollTo(x, y);

	Arguments:
		x - (integer) The x coordinate.
		y - (integer) The y coordinate.

	Example:
		>$('myElement').scrollTo(0, 100)

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.scrollLeft>, <http://developer.mozilla.org/en/docs/DOM:element.scrollTop>
	*/

	scrollTo: function(x, y){
		this.scrollLeft = x;
		this.scrollTop = y;
	},

	/*
	Method: getSize
		Returns an Object representing the size/scroll values of the element.

	Syntax:
		>var size = myElement.getSize();

	Returns:
		(object) An object containing, 'scroll', 'size', and 'scrollSize' (x,y) values.

	Example:
		[javascript]
			$('myElement').getSize();
		[/javascript]

	Returns:
		[javascript]
			{
				'scroll': {'x': 100, 'y': 100},
				'size': {'x': 200, 'y': 400},
				'scrollSize': {'x': 300, 'y': 500}
			}
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.scrollLeft>, <http://developer.mozilla.org/en/docs/DOM:element.scrollTop>, <http://developer.mozilla.org/en/docs/DOM:element.offsetWidth>, <http://developer.mozilla.org/en/docs/DOM:element.offsetHeight>, <http://developer.mozilla.org/en/docs/DOM:element.scrollWidth>, <http://developer.mozilla.org/en/docs/DOM:element.scrollHeight>
	*/

	getSize: function(){
		return {
			'scroll': {'x': this.scrollLeft, 'y': this.scrollTop},
			'size': {'x': this.offsetWidth, 'y': this.offsetHeight},
			'scrollSize': {'x': this.scrollWidth, 'y': this.scrollHeight}
		};
	},

	/*
	Method: getPosition
		Returns the real offsets of the element.

	Syntax:
		>var position = myElement.getPosition([overflown]);

	Arguments:
		overflown - (array, optional) An array of nested scrolling containers for scroll offset calculation.

	Returns:
		(object) An object with properties: x and y coordinates of the Element's position.

	Example:
		[javascript]
			$('element').getPosition(); //returns {x: 100, y:500};
		[/javascript]

	Note:
		Use the overflown parameter if your element is inside any element containing scrollbars.

	See Also:
		<http://www.quirksmode.org/js/findpos.html>
	*/

	getPosition: function(overflown){
		overflown = $splat(overflown);
		var el = this, left = 0, top = 0;
		do {
			left += el.offsetLeft || 0;
			top += el.offsetTop || 0;
			el = el.offsetParent;
		} while (el);
		overflown.each(function(element){
			left -= element.scrollLeft || 0;
			top -= element.scrollTop || 0;
		});
		return {'x': left, 'y': top};
	},

	/*
	Method: getTop
		Returns the distance from the top of the window to the Element.

	Syntax:
		>var top = myElement.getTop([overflown]);

	Arguments:
		overflown - (array, optional) An array of nested scrolling containers for scroll offset calculation.

	Returns:
		(integer) The top position of this Element.

	Example:
		[javascript]
			$('myElement').getTop(); //returns 20
		[/javascript]

	See Also:
		<Element.getPosition>
	*/

	getTop: function(overflown){
		return this.getPosition(overflown).y;
	},

	/*
	Method: getLeft
		Returns the distance from the left of the window to the Element.

	Syntax:
		>var left = myElement.getLeft([overflown]);

	Arguments:
		overflown - (array, optional) An array of nested scrolling containers for scroll offset calculation.

	Returns:
		(integer) The left position of this Element.

	Example:
		[javascript]
			$('myElement').getLeft(); // returns 20
		[/javascript]

	See Also:
		<Element.getPosition>
	*/

	getLeft: function(overflown){
		return this.getPosition(overflown).x;
	},

	/*
	Method: getCoordinates
		Returns an object with width, height, left, right, top, and bottom, representing the values of the Element

	Syntax:
		>var coords = myElement.getCoordinates([overflown]);

	Arguments:
		overflown - (array, optional) An array of nested scrolling containers for scroll offset calculation.

	Returns:
		(object) An object containing the Element's current: width, height, left, top, right, and bottom.

	Example:
		[javascript]
			var myValues = $('myElement').getCoordinates();
		[/javascript]

	Returns:
		[javascript]
			{
				width: 200,
				height: 300,
				left: 100,
				top: 50,
				right: 300,
				bottom: 350
			}
		[/javascript]

	See Also:
		<Element.getPosition>
	*/

	getCoordinates: function(overflown){
		var position = this.getPosition(overflown);
		var obj = {
			'width': this.offsetWidth,
			'height': this.offsetHeight,
			'left': position.x,
			'top': position.y
		};
		obj.right = obj.left + obj.width;
		obj.bottom = obj.top + obj.height;
		return obj;
	}

});

/*
Script: Element.Form.js
	Contains Element methods for working with forms and their elements.

License:
	MIT-style license.
*/

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: getValue
		Returns the value of the Element, if its tag is textarea, select or input. getValue called on a multiple select will return an array.

	Syntax:
		>var value = myElement.getValue();

	Returns:
		(mixed) Returns false if if tag is not a 'select', 'input', or 'textarea'. Otherwise returns the value of the Element.

	Example:
		HTML:
		[html]
			<form id="myForm">
				<select>
					<option value="volvo">Volvo</option>
					<option value="saab" selected="yes">Saab</option>
					<option value="opel">Opel</option>
					<option value="audi">Audi</option>
				</select>
			</form>
		[/html]

		Result:
		[javascript]
			var result = $('myForm').getElement('select').getValue(); // returns 'Saab'
		[/javascript]
	*/

	getValue: function(){
		switch (this.getTag()){
			case 'select':
				var values = [];
				Array.each(this.options, function(option){
					if (option.selected) values.push(option.value);
				});
				return (this.multiple) ? values : values[0];
			case 'input': if (['checkbox', 'radio'].contains(this.type) && !this.checked) return false;
			default: return $chk(this.value) ? this.value : false;
		}
	},

	/*
	Method: getFormElements
		Finds, extends, and returns all descendant form Elements: 'input, 'select', and 'textarea'.

	Syntax:
		>var elements = myElement.getFormElements();

	Returns:
		(array) A collection of Elements.

	Example:
		HTML:
		[html]
			<form id="myForm">
				<select>
					<option value="volvo">Volvo</option>
					<option value="saab" selected="yes">Saab</option>
				</select>
				<textarea></textarea>
			</form>
		[/html]

		[javascript]
			$('myForm').getFormElements(); // returns: [<select>, <textarea>];
		[/javascript]

	See Also:
		<$$>
	*/

	getFormElements: function(){
		return $$(this.getElementsByTagName('input'), this.getElementsByTagName('select'), this.getElementsByTagName('textarea'));
	},

	/*
	Method: toQueryString
		Reads the children inputs of the Element and generates a query string, based on their values.

	Syntax:
		>var query = myElement.toQueryString();

	Returns:
		(string) A string representation of a Form element and its children.

	Example:
		[html]
			<form id="myForm" action="submit.php">
				<input name="email" value="bob@bob.com">
				<input name="zipCode" value="90210">
			</form>
		[/html]

		[/javascript]
			$('myForm').toQueryString() //email=bob@bob.com&zipCode=90210\
		[/javascript]

	Note:
		Used internally in <Ajax>.
	*/

	toQueryString: function(){
		var queryString = [];
		this.getFormElements().each(function(el){
			var name = el.name;
			var value = el.getValue();
			if (value === false || !name || el.disabled) return;
			var qs = function(val){
				queryString.push(name + '=' + encodeURIComponent(val));
			};
			if ($type(value) == 'array') value.each(qs);
			else qs(value);
		});
		return queryString.join('&');
	}

});

/*
Script: Window.DomReady.js
	Contains the custom event domready, for window.

License:
	MIT-style license.
*/

/*
Event: domready
	Executes a function when the dom tree is loaded, without waiting for images. Only works when called from window.

Arguments:
	fn - (function) The function to execute when the DOM is ready.

Example:
	[javascript]
		window.addEvent('domready', function(){
			alert('the dom is ready');
		});
	[/javascript]

Credits:
	(c) Dean Edwards/Matthias Miller/John Resig, remastered for MooTools.
*/

Element.Events.domready = {

	add: function(fn){
		if (Client.loaded){
			fn.call(this);
			return this;
		}
		var self = this;
		var domReady = function(){
			if (!arguments.callee.done){
				arguments.callee.done = true;
				fn.call(self);
			};
			return true;
		};
		var check = function(context){
			if ((Client.Engine.webkit ? ['loaded', 'complete'] : 'complete').contains(context.readyState)) return domReady();
			return false;
		};
		if (this.document.readyState && Client.Engine.webkit){
			(function(){
				if (!check(self.document)) arguments.callee.delay(50);
			})();
		} else if (this.document.readyState && Client.Engine.trident){
			var script = $('ie_domready');
			if (!script){
				var src = (this.location.protocol == 'https:') ? '//:' : 'javascript:void(0)';
				this.document.write('<script id="ie_domready" defer src="' + src + '"><\/script>');
				script = $('ie_domready');
			}
			if (!check(script)) script.addEvent('readystatechange', check.pass(script));
		} else {
			this.addEvent('load', domReady);
			this.document.addEvent('DOMContentLoaded', domReady);
		}
		return this;
	}

};

window.addEvent('domready', function(){
	Client.loaded = true;
});

/*
Script: Window.Size.js
	Window cross-browser dimensions methods.

License:
	MIT-style license.

Note:
	- The Window.Size.js requires an XHTML doctype.
	- All these methods require that the browser operates in strict mode, not quirks mode.

See Also:
	<http://www.quirksmode.org/js/elementdimensions.html>
*/

/*
Native: Window
	Cross browser methods to get various window dimensions.
	Warning: All these methods require that the browser operates in strict mode, not quirks mode.
*/

Window.implement({

	/*
	Property: getWidth
		Returns an integer representing the width of the browser window (without the scrollbar).

	Syntax:
		>var width = window.getWidth();

	Returns:
		(number) The width (without the scrollbar width) of the browser window.
	*/

	getWidth: function(){
		if (Client.Engine.webkit419) return this.innerWidth;
		if (Client.Engine.opera) return this.document.body.clientWidth;
		return this.document.documentElement.clientWidth;
	},

	/*
	Property: getHeight
		Returns an integer representing the height of the browser window (without the scrollbar).

	Syntax:
		>var height = window.getHeight();

	Returns:
		(number) The height (without the scrollbar height) of the browser window.
	*/

	getHeight: function(){
		if (Client.Engine.webkit419) return this.innerHeight;
		if (Client.Engine.opera) return this.document.body.clientHeight;
		return this.document.documentElement.clientHeight;
	},

	/*
	Property: getScrollWidth
		Returns an integer representing the scrollWidth of the window.

	Syntax:
		>var scrollWidth = window.getScrollWidth();

	Returns:
		(number) The scroll width of the browser window.

	Example:
		[javascript]
			window.addEvent('resize', function(){
				alert(window.getScrollWidth());
			});
		[/javascript]

	Note:
		This value is equal to or bigger than <window.getWidth>.

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.scrollWidth>
	*/

	getScrollWidth: function(){
		if (Client.Engine.trident) return Math.max(this.document.documentElement.offsetWidth, this.document.documentElement.scrollWidth);
		if (Client.Engine.webkit) return this.document.body.scrollWidth;
		return this.document.documentElement.scrollWidth;
	},

	/*
	Property: getScrollHeight
		Returns an integer representing the scrollHeight of the window.

	Syntax:
		>var scrollHeight = window.getScrollHeight();

	Returns:
		(number) The scroll height of the browser window.

	Example:
		[javascript]
			window.addEvent('resize', function(){
				alert(window.getScrollHeight());
			});
		[/javascript]

	Note:
		This value is equal to or bigger than <window.getHeight>.

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.scrollHeight>
	*/

	getScrollHeight: function(){
		if (Client.Engine.trident) return Math.max(this.document.documentElement.offsetHeight, this.document.documentElement.scrollHeight);
		if (Client.Engine.webkit) return this.document.body.scrollHeight;
		return this.document.documentElement.scrollHeight;
	},

	/*
	Property: getScrollLeft
		Returns an integer representing the scrollLeft of the window.

	Syntax:
		>var scrollLeft = window.getScrollLeft();

	Returns:
		(number) The number of pixels the window has scrolled from the left.

	Example:
		[javascript]
			window.addEvent('scroll', function(){
				alert(window.getScrollLeft());
			});
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.scrollLeft>
	*/

	getScrollLeft: function(){
		return this.pageXOffset || this.document.documentElement.scrollLeft;
	},

	/*
	Property: getScrollTop
		Returns an integer representing the scrollTop of the window.

	Syntax:
		>var scrollTop = window.getScrollTop();

	Returns:
		(number) The number of pixels the window has scrolled from the top.

	Example:
		[javascript]
			window.addEvent('scroll', function(){
				alert(window.getScrollTop());
			});
		[/javascript]

	See Also:
		<http://developer.mozilla.org/en/docs/DOM:element.scrollTop>
	*/

	getScrollTop: function(){
		return this.pageYOffset || this.document.documentElement.scrollTop;
	},

	/*
	Property: getSize
		Same as <Element.getSize>, but for window.

	Syntax:
		>var size = window.getSize();

	Returns:
		(object) An object with size, scrollSize, scroll properties. Each property has a value of an object with x and y properties representing the width/height, scrollWidth/scrollHeight, or getScrollLeft/getScrollTop.

	Example:
		[javascript]
			var size = window.getSize();
		[/javascript]
	*/

	getSize: function(){
		return {
			'size': {'x': this.getWidth(), 'y': this.getHeight()},
			'scrollSize': {'x': this.getScrollWidth(), 'y': this.getScrollHeight()},
			'scroll': {'x': this.getScrollLeft(), 'y': this.getScrollTop()}
		};
	},

	getPosition: function(){
		return {'x': 0, 'y': 0};
	}

});

/*
Script: Selectors.js
	Css Query related <Element> extensions

License:
	MIT-style license.
*/

/*
Class: Element
	Custom class to allow all of its methods to be used with any Selectors element via the dollar function <$>.
*/

Native.implement([Element, Document], {

	/*
	Property: getElements
		Gets all the elements within an element that match the given selector.

	Syntax:
		>var myElements = myElement.getElements(selector[, nocash]);

	Arguments:
		selector - (string) The CSS Selector to match.
		nocash   - (boolean, optional: defaults to false) If true, the found Elements are not extended.

	Returns:
		(array) An <Elements> collections.

	Examples:
		[javascript]
			$('myElement').getElements('a'); // get all anchors within myElement
		[/javascript]

		[javascript]
			$('myElement').getElements('input[name=dialog]') //get all input tags with name 'dialog'
		[/javascript]

		[javascript]
			$('myElement').getElements('input[name$=log]') //get all input tags with names ending with 'log'
		[/javascript]

		[javascript]
			$(document.body).getElements('a.email').addEvents({
				'mouseenter': function(){
					this.href = 'real@email.com';
				},
				'mouseleave': function(){
					this.href = '#';
				}
			});
		[/javascript]

	Notes:
		Supports these operators in attribute selectors:

		- = : is equal to
		- ^= : starts-with
		- $= : ends-with
		- != : is not equal to

		Xpath is used automatically for compliant browsers.
	*/

	getElements: function(selectors, nocash){
		var elements = [];
		selectors = selectors.split(',');
		for (var i = 0, j = selectors.length; i < j; i++){
			var selector = selectors[i], items = [], separators = [];
			selector = selector.trim().replace(Selectors.sRegExp, function(match){
				if (match.charAt(2)) match = match.trim();
				separators.push(match.charAt(0));
				return '%' + match.charAt(1);
			}).split('%');
			for (var k = 0, l = selector.length; k < l; k++){
				var params = Selectors.$parse(selector[k]);
				if (!params) break;
				var temp = Selectors.Method.getParam(items, separators[k - 1] || false, this, params.tag, params.id, params.classes, params.attributes, params.pseudos);
				if (!temp) break;
				items = temp;
			}
			elements = elements.concat(Selectors.Method.getItems(items, this));
		}
		return (nocash) ? elements : new Elements(elements);
	},

	/*
	Property: getElement
		Same as <Element.getElements>, but returns only the first.

	Syntax:
		>var anElement = myElement.getElement(selector);

	Arguments:
		selector - (string) The CSS Selector to match.

	Returns:
		(mixed) An extended Element, or null if not found.

	Example:
		[javascript]
			var found = $('myElement').getElement('.findMe').setStyle('color', '#f00');
		[/javascript]

	Note:
		Alternate syntax for <$E>, where filter is the Element.
	*/

	getElement: function(selector){
		return $(this.getElements(selector, true)[0] || null);
	}

});

/*
Function: $E
	Alias for <Element.getElement>, using document as context.
*/

Window.implement({

	$E: function(selector){
		return this.document.getElement(selector);
	}

});

var Selectors = {

	'regExp': /:([^-:(]+)[^:(]*(?:\((["']?)(.*?)\2\))?|\[(\w+)(?:([!*^$~|]?=)(["']?)(.*?)\6)?\]|\.[\w-]+|#[\w-]+|\w+|\*/g,

	'sRegExp': /\s*([+>~\s])[a-zA-Z#.*\s]/g

};

Selectors.$parse = function(selector){
	var params = {'tag': '*', 'id': null, 'classes': [], 'attributes': [], 'pseudos': []};
	selector = selector.replace(Selectors.regExp, function(bit){
		switch (bit.charAt(0)){
			case '.': params.classes.push(bit.slice(1)); break;
			case '#': params.id = bit.slice(1); break;
			case '[': params.attributes.push([arguments[4], arguments[5], arguments[7]]); break; 
			case ':': 
				var name = arguments[1]; 
				var xparser = Selectors.Pseudo.get(name);
				var pseudo = {'name': name, 'parser': xparser, 'argument': arguments[3]};
				if (xparser && xparser.parser) pseudo.argument = (xparser.parser.apply) ? xparser.parser(pseudo.argument) : xparser.parser;
				params.pseudos.push(pseudo);
			break;
			default: params.tag = bit;
		}
		return '';
	});
	return params;
};

Selectors.Pseudo = new Hash;

Selectors.XPath = {

	getParam: function(items, separator, context, tag, id, classNames, attributes, pseudos){
		var temp = context.namespaceURI ? 'xhtml:' : '';
		switch (separator){
			case '~': case '+': temp += '/following-sibling::'; break;
			case '>': temp += '/'; break;
			case ' ': temp += '//';
		}
		temp += tag;
		if (separator == '+') temp += '[1]';
		var i;
		for (i = pseudos.length; i--; i){
			var pseudo = pseudos[i];
			if (pseudo.parser && pseudo.parser.xpath) temp += pseudo.parser.xpath(pseudo.argument);
			else temp += ($chk(pseudo.argument)) ? '[@' + pseudo.name + '="' + pseudo.argument + '"]' : '[@' + pseudo.name + ']';
		}
		if (id) temp += '[@id="' + id + '"]';
		for (i = classNames.length; i--; i) temp += '[contains(concat(" ", @class, " "), " ' + classNames[i] + ' ")]';
		for (i = attributes.length; i--; i){
			var bits = attributes[i];
			switch (bits[1]){
				case '=': temp += '[@' + bits[0] + '="' + bits[2] + '"]'; break;
				case '*=': temp += '[contains(@' + bits[0] + ', "' + bits[2] + '")]'; break;
				case '^=': temp += '[starts-with(@' + bits[0] + ', "' + bits[2] + '")]'; break;
				case '$=': temp += '[substring(@' + bits[0] + ', string-length(@' + bits[0] + ') - ' + bits[2].length + ' + 1) = "' + bits[2] + '"]'; break;
				case '!=': temp += '[@' + bits[0] + '!="' + bits[2] + '"]'; break;
				case '~=': temp += '[contains(concat(" ", @' + bits[0] + ', " "), " ' + bits[2] + ' ")]'; break;
				case '|=': temp += '[contains(concat("-", @' + bits[0] + ', "-"), "-' + bits[2] + '-")]'; break;
				default: temp += '[@' + bits[0] + ']';
			}
		}
		items.push(temp);
		return items;
	},

	getItems: function(items, context){
		var elements = [];
		var doc = ($type(context) == 'document') ? context : context.ownerDocument;
		var xpath = doc.evaluate('.//' + items.join(''), context, Selectors.XPath.resolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, j = xpath.snapshotLength; i < j; i++) elements[i] = xpath.snapshotItem(i);
		return elements;
	},

	resolver: function(prefix){
		return (prefix == 'xhtml') ? 'http://www.w3.org/1999/xhtml' : false;
	}

};

Selectors.Filter = {

	getParam: function(items, separator, context, tag, id, classNames, attributes, pseudos){
		if (separator){
			switch (separator){
				case ' ': items = Selectors.Filter.getNestedByTag(items, tag); break;
				case '>': items = Selectors.Filter.getChildrenByTag(items, tag); break;
				case '+': items = Selectors.Filter.getFollowingByTag(items, tag); break;
				case '~': items = Selectors.Filter.getFollowingByTag(items, tag, true);
			}
			if (id) items = Elements.filterById(items, id, true);
		} else {
			if (id){
				var el = context.getElementById(id, true);
				if (!el || ((tag != '*') && (el.tagName.toLowerCase() != tag))) return false;
				items = [el];
			} else {
				items = $A(context.getElementsByTagName(tag));
			}
		}
		var i;
		for (i = classNames.length; i--; i) items = Elements.filterByClass(items, classNames[i], true);
		for (i = attributes.length; i--; i){
			var bits = attributes[i];
			items = Elements.filterByAttribute(items, bits[0], bits[1], bits[2], true);
		}
		for (i = pseudos.length; i--; i){
			var pseudo = pseudos[i];
			if (pseudo.parser && pseudo.parser.filter){
				var temp = {}, xparser = pseudo.parser, argument = pseudo.argument;
				items = items.filter(function(el, i, array){
					return xparser.filter(el, argument, i, array, temp);
				});
				temp = null;
			} else {
				items = Elements.filterByAttribute(items, pseudo.name, ($chk(pseudo.argument)) ? '=' : false, pseudo.argument, true);
			}
		}
		return items;
	},

	getItems: function(items, context){
		return items;
	},

	hasTag: function(el, tag){
		return (el.nodeName && el.nodeType == 1 && (tag == '*' || el.tagName.toLowerCase() == tag));
	},

	getFollowingByTag: function(context, tag, all){
		var found = [];
		for (var i = 0, j = context.length, next; i < j; i++){
			next = context[i].nextSibling;
			while (next){
				if (Selectors.Filter.hasTag(next, tag)){
					found.push(next);
					if (!all) break;
				}
				next = next.nextSibling;
			}
		}
		return found;
	},

	getChildrenByTag: function(context, tag){
		var found = [];
		for (var i = 0, j = context.length; i < j; i++){
			var children = context[i].childNodes;
			for (var k = 0, l = children.length; k < l; k++){
				if (Selectors.Filter.hasTag(children[k], tag)) found.push(children[k]);
			}
		}
		return found;
	},

	getNestedByTag: function(context, tag){
		var found = [];
		for (var i = 0, j = context.length; i < j; i++) found.extend(context[i].getElementsByTagName(tag));
		return found;
	}

};

Selectors.Method = (Client.Features.xpath) ? Selectors.XPath : Selectors.Filter;

/*
Script: Selectors.Pseudo.js
	Some default Pseudo Selectors for <Selectors.js>

License:
	MIT-style license.

See Also:
	<http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#pseudo-classes>
*/

/*
Selector: enabled
	Matches all Elements that are enabled.

Usage:
	>':enabled'

Examples:
	[javascript]
		$$('*:enabled')
	[/javascript]

	[javascript]
		$('myElement').getElements(':enabled');
	[/javascript]
*/

Selectors.Pseudo.enabled = {

	xpath: function(){
		return '[not(@disabled)]';
	},

	filter: function(el){
		return !(el.disabled);
	}
};

/*
Selector: empty
	Matches all elements which are empty.

Usage:
	>':empty'

Example:
	[javascript]
		$$('div:empty');
	[/javascript]
*/

Selectors.Pseudo.empty = {

	xpath: function(){
		return '[not(node())]';
	},

	filter: function(el){
		return !(el.innerText || el.textContent || '').length;
	}

};

/*
Selector: contains
	Matches all the Elements which contains the text.

Usage:
	>':contains(text)'

	Variables:
		text - (string) The text that the Element should contain.

Example:
	[javascript]
		$$('p:contains("find me")');
	[/javascript]
*/

Selectors.Pseudo.contains = {

	xpath: function(argument){
		return '[contains(text(), "' + argument + '")]';
	},

	filter: function(el, argument){
		for (var i = el.childNodes.length; i--; i){
			var child = el.childNodes[i];
			if (child.nodeName && child.nodeType == 3 && child.nodeValue.contains(argument)) return true;
		}
		return false;
	}

};

/*
Selector: nth
	Matches every nth child.

Usage:
	Nth Expression:
		>':nth-child(nExpression)'

		Variables:
			nExpression - (string) A nth expression for the "every" nth-child.

			Examples:
				[javascript]
					$$('#myDiv:nth-child(2n)'); //returns every odd child
				[/javascript]

				[javascript]
					$$('#myDiv:nth-child(n)'); //returns every child
				[/javascript]

				[javascript]
					$$('#myDiv:nth-child(2n+1)') //returns every even child
				[/javascript]

				[javascript]
					$$('#myDiv:nth-child(4n+3)') //returns Elements [3, 7, 11, 15, ...]
				[/javascript]

	Every Odd Child:
		>':nth-child(odd)'

	Every Even Child:
		>':nth-child(even)'

	Without -Child:
		>':nth(nExpression)'
		>':nth(odd)'
		>':nth(even)'
*/

Selectors.Pseudo.nth = {

	parser: function(argument){
		argument = (argument) ? argument.match(/^([+-]?\d*)?([nodev]+)?([+-]?\d*)?$/) : [null, 1, 'n', 0];
		if (!argument) return false;
		var inta = parseInt(argument[1]);
		var a = ($chk(inta)) ? inta : 1;
		var special = argument[2] || false;
		var b = parseInt(argument[3]) || 0;
		b = b - 1;
		while (b < 1) b += a;
		while (b >= a) b -= a;
		switch (special){
			case 'n': return {'a': a, 'b': b, 'special': 'n'};
			case 'odd': return {'a': 2, 'b': 0, 'special': 'n'};
			case 'even': return {'a': 2, 'b': 1, 'special': 'n'};
			case 'first': return {'a': 0, 'special': 'index'};
			case 'last': return {'special': 'last'};
			case 'only': return {'special': 'only'};
			default: return {'a': (a - 1), 'special': 'index'};
		}
	},

	xpath: function(argument){
		switch (argument.special){
			case 'n': return '[count(preceding-sibling::*) mod ' + argument.a + ' = ' + argument.b + ']';
			case 'last': return '[count(following-sibling::*) = 0]';
			case 'only': return '[not(preceding-sibling::* or following-sibling::*)]';
			default: return '[count(preceding-sibling::*) = ' + argument.a + ']';
		}
	},

	filter: function(el, argument, i, all, temp){
		if (i == 0) temp.parents = [];
		var parent = el.parentNode;
		if (!parent.$children){
			temp.parents.push(parent);
			parent.$children = parent.$children || Array.filter(parent.childNodes, function(child){
				return (child.nodeName && child.nodeType == 1);
			});
		}
		var include = false;
		switch (argument.special){
			case 'n': if (parent.$children.indexOf(el) % argument.a == argument.b) include = true; break;
			case 'last': if (parent.$children.getLast() == el) include = true; break;
			case 'only': if (parent.$children.length == 1) include = true; break;
			case 'index': if (parent.$children[argument.a] == el) include = true;
		}
		if (i == all.length - 1){
			for (var j = temp.parents.length; j--;){
				temp.parents[j].$children = null;
				if (Client.Engine.trident) temp.parents[j].removeAttribute('$children');
			}
		}
		return include;
	}

};

Selectors.Pseudo.extend({

	/*
	Selector: even
		Matches every even child.

	Usage:
		>':even-child'
		>':even'

	Example:
		[javascript]
			$$('td:even-child');
		[/javascript]
	*/

	'even': {
		'parser': {'a': 2, 'b': 1, 'special': 'n'},
		'xpath': Selectors.Pseudo.nth.xpath,
		'filter': Selectors.Pseudo.nth.filter
	},

	/*
	Selector: odd
		Matches every odd child.

	Usage:
		>':odd-child'
		>':odd'

	Example:
		[javascript]
			$$('td:odd-child');
		[/javascript]
	*/

	'odd': {
		'parser': {'a': 2, 'b': 0, 'special': 'n'},
		'xpath': Selectors.Pseudo.nth.xpath,
		'filter': Selectors.Pseudo.nth.filter
	},

	/*
	Selector: first
		Matches the first child.

	Usage:
		>':first-child'
		>':first'

	Example:
		[javascript]
			$$('td:first-child');
		[/javascript]
	*/

	'first': {
		'parser': {'a': 0, 'special': 'index'},
		'xpath': Selectors.Pseudo.nth.xpath,
		'filter': Selectors.Pseudo.nth.filter
	},

	/*
	Selector: last
		Matches the last child.

	Usage:
		>':last-child'
		>':last'

	Example:
		[javascript]
			$$('td:last-child');
		[/javascript]
	*/

	'last': {
		'parser': {'special': 'last'},
		'xpath': Selectors.Pseudo.nth.xpath,
		'filter': Selectors.Pseudo.nth.filter
	},

	/*
	Selector: only
		Matches only child of its parent Element.

	Usage:
		>':only-child
		>':only'

	Example:
		[javascript]
			$$('td:only-child');
		[/javascript]
	*/

	'only': {
		'parser': {'special': 'only'},
		'xpath': Selectors.Pseudo.nth.xpath,
		'filter': Selectors.Pseudo.nth.filter
	}

});


/*
Script: Fx.js
	Contains <Fx>, the foundamentals of the MooTools Effects.

License:
	MIT-style license.
*/

/*
Class: Fx
	Base class for the Effects.

Implements:
	<Chain>, <Events>, <Options>

Syntax:
	>var myFx = new Fx([el[, options]]);

Arguments:
	el      - (element, optional: defaults to this.element) The Element to apply an effect to.
	options - (object, optional) An object with options for the effect. See below.

	options (continued):
		transition - (function: defaults to <Fx.Transitions.Sine.easeInOut>) The equation to use for the effect see <Fx.Transitions>.
		duration   - (number: defaults to 500) The duration of the effect in ms.
		unit       - (string: defaults to false) The unit, e.g. 'px', 'em' for fonts or '%'. See <Element.setStyle>.
		wait       - (boolean: defaults to true) Option to wait for a current transition to end before running another of the same instance.
		fps        - (number: defaults to 50) The frames per second for the transition.

Events:
	onStart - (function) The function to execute as the effect begins.
		Signature:
			>onStart(element)

		Arguments:
			element - (element) This Element.

	onSet - (function) The function to execute when value is setted without transition.
		Signature:
			>onSet(element)

		Arguments:
			element - (element) This Element.

	onComplete - (function) The function to execute after the effect has processed.
		Signature:
			>onComplete(element)

		Arguments:
			element - (element) This Element.

	onCancel - (function) The function to execute when you manually stop the effect.
		Signature:
			>onCancel(element)

		Arguments:
			element - (element) This Element.

Properties:
	element - (element) The Element being effected.
	now     - (integer) The current value of the css property being changed.

Returns:
	(class) A new FX instance.

Example:
	[javascript]
		var myFx = new Fx($('container'), {
			onComplete: function(){
				alert('woah it faded');
			}
		});

		myFx.increase = function(){ // The Fx class is just a skeleton. We need to implement an increase method.
			this.element.setOpacity(this.now);
		};

		myFx.start(1,0).chain(function(){
			this.start(0,1);
		});
	[/javascript]

Note:
	The Fx Class is just a skeleton for other Classes to extend the original functionality. Look at the example above to run the Fx Class directly.

See Also:
	<Fx.Style>
*/

var Fx = new Class({

	Implements: [Chain, Events, Options],

	options: {
		/*onStart: $empty,
		onComplete: $empty,
		onCancel: $empty,*/
		transition: function(p){
			return -(Math.cos(Math.PI * p) - 1) / 2;
		},
		duration: 500,
		unit: false,
		wait: true,
		fps: 50
	},

	initialize: function(element, options){
		this.element = element;
		this.setOptions(options);
	},

	step: function(){
		var time = $time();
		if (time < this.time + this.options.duration){
			this.delta = this.options.transition((time - this.time) / this.options.duration);
			this.setNow();
			this.increase();
		} else {
			this.stop(true);
			this.now = this.to;
			this.increase();
			this.fireEvent('onComplete', this.element);
			this.callChain();
		}
	},

	/*
	Method: set
		Immediately sets the value with no transition and fires the 'onSet' Event.

	Syntax:
		>myFx.set(to);

	Arguments:
		to - (number) The value to set.

	Returns:
		(class) This Fx instance.

	Example:
		[javascript]
			var myFx = new Fx.Style('myElement', 'opacity', {
				onSet: function(){ // due to inheritence we can set the onSet Event
					alert("Woah! Where did it go?");
				}
			});

			$('myElement').addEvents('mouseenter', function(){
				myFx.set(0); //will make it immediately transparent
			});
		[/javascript]

	See Also:
		<Fx.Style>
	*/

	set: function(to){
		this.now = to;
		this.increase();
		return this;
	},

	setNow: function(){
		this.now = this.compute(this.from, this.to);
	},

	compute: function(from, to){
		return (to - from) * this.delta + from;
	},

	/*
	Method: start
		Executes an effect from one position to the other and fires the 'onStart' Event.

	Syntax:
		>myFx.start(from, to);

	Arguments:
		from - (number) A staring value.
		to   - (number) An ending value for the effect.

	Returns:
		(object) This Fx instance.

	Example:
		[javascript]
			var myFx = $('myElement').effect('color').start('#000', '#f00');
		[/javascript]

	See Also:
		<Element.effect>
	*/

	start: function(from, to){
		if (!this.options.wait) this.stop();
		else if (this.timer) return this;
		this.from = from;
		this.to = to;
		this.change = this.to - this.from;
		this.time = $time();
		this.timer = this.step.periodical(Math.round(1000 / this.options.fps), this);
		this.fireEvent('onStart', this.element);
		return this;
	},

	/*
	Method: stop
		Stops the transition and fires the 'onCancel' Event if end parameter is not supplied or is false.

	Syntax:
		>myFx.stop([end]);

	Arguments:
		end - (boolean, optional) If the true the 'onCancel' Event will not be fired.

	Returns:
		(object) This Fx instance.

	Example:
		[javascript]
			var myElement = $('myElement');
			var to = myElement.offsetLeft + myElement.offsetWidth;
			var myFx = myElement.setStyle('position', 'absolute').effect('left', {
				duration: 5000,
				onCancel: function(){
					alert("Doh! I've stopped.");
				}
			}).start(to);

			(function(){ myFx.stop(true).start.delay(1000, myFx, to); }).delay(1000); // myFx is tired, let's be patient.
			(function(){ myFx.stop(); }).delay(3000); // Let's cancel the effect.
		[/javascript]
	*/

	stop: function(end){
		if (!this.timer) return this;
		this.timer = $clear(this.timer);
		if (!end) this.fireEvent('onCancel', this.element);
		return this;
	}

});

/*
Script: Fx.CSS.js
	Css parsing class for effects. Required by <Fx.Style>, <Fx.Styles>, <Fx.Elements>.

License:
	MIT-style license.
*/

Fx.CSS = {

	prepare: function(element, property, values){
		values = $splat(values);
		var values1 = values[1];
		if (!$chk(values1)){
			values[1] = values[0];
			values[0] = element.getStyle(property);
		}
		var parsed = values.map(Fx.CSS.set);
		return {'from': parsed[0], 'to': parsed[1]};
	},

	set: function(value){
		value = ($type(value) == 'string') ? value.split(' ') : $splat(value);
		return value.map(function(val){
			val = String(val);
			var found = false;
			Fx.CSS.Parsers.each(function(parser, key){
				if (!found){
					var match = parser.match(val);
					if ($chk(match)) found = {'value': match, 'parser': parser};
				}
			});
			return found || {'value': val, parser: {
				compute: function(from, to){
					return to;
				}
			}};
		});
	},

	compute: function(from, to, fx){
		return from.map(function(obj, i){
			return {'value': obj.parser.compute(obj.value, to[i].value, fx), 'parser': obj.parser};
		});
	},

	serve: function(now, unit){
		return now.reduce(function(prev, cur){
			var serve = cur.parser.serve;
			return prev.concat((serve) ? serve(cur.value, unit) : cur.value);
		}, []);
	}

};

Fx.CSS.Parsers = new Hash({

	'color': {

		match: function(value){
			if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
			return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
		},

		compute: function(from, to, fx){
			return from.map(function(value, i){
				return Math.round(fx.compute(value, to[i]));
			});
		},

		serve: function(value){
			return value.map(Number);
		}

	},

	'number': {

		match: function(value){
			return parseFloat(value);
		},

		compute: function(from, to, fx){
			return fx.compute(from, to);
		},

		serve: function(value, unit){
			return (unit) ? value + unit : value;
		}

	}

});

/*
Script: Fx.Style.js
	Contains <Fx.Style>

License:
	MIT-style license.
*/

/*
Class: Fx.Style
	The Style effect, used to transition any css property from one value to another. Includes colors.

Syntax:
	>var myFx = new Fx.Style(element, property[, options]);

Arguments:
	el       - (mixed) A string ID of the Element or an Element to apply the style transitions to.
	property - (string) The property to transition.
	options  - (object, optional) The <Fx> options object.

Properties:
	All the properties in <Fx> in addition to:
	property - (string) The property being transitioned.

Returns:
	(class) A new Fx.Style instance.

Example:
	[javascript]
		var marginFx = new Fx.Style('myElement', 'margin-top', {duration:500}).start(10, 100);
	[/javascript]

Note:
	Colors must be in hex format.

See Also:
	<Fx>
*/

Fx.Style = new Class({

	Extends: Fx,

	initialize: function(element, property, options){
		arguments.callee.parent($(element), options);
		this.property = property;
	},

	/*
	Method: hide
		Same as <Fx.set>(0). Hides the element immediately without transition.

	Syntax:
		>myFx.hide();

	Returns:
		(class) This Fx.Style instance.

	Example:
		[javascript]
			var myFx = new Fx.Style('myElement', 'opacity').hide(); // *poof*
		[/javascript]

	Note:
		Due to inheritance the Event 'onSet' will be fired.
	*/

	hide: function(){
		return this.set(0);
	},

	setNow: function(){
		this.now = Fx.CSS.compute(this.from, this.to, this);
	},

	/*
	Method: set
		Sets the Element's css property to the specified value immediately.

	Syntax:
		>myFx.set(to);

	Arguments:
		to - (mixed) Sets the Element to the value.

	Returns:
		(class) This Fx.Style instance.

	Example:
		[javascript]
			var marginFx = new Fx.Style('myElement', 'margin-top').set(10); //margin-top is set to 10px immediately
		[/javascript]
	*/

	set: function(to){
		return arguments.callee.parent(Fx.CSS.set(to));
	},

	/*
	Method: start
		Displays the transition to the value/values passed in

	Syntax:
		>myFx.start([from,] to);

	Arguments:
		from - (integer, optional: defaults to the current style value) The starting value for the transition.
		to   - (integer) The ending value for the transition.

	Returns:
		(class) This Fx.Style instance.

	Example:
		[javascript]
			var marginFx = new Fx.Style('myElement', 'margin-top').start(10); //tries to read current margin top value and goes from current to 10
		[/javascript]

	Note:
		If you provide only one argument, the transition will use the current css value for its starting value.
	*/

	start: function(from, to){
		if (this.timer && this.options.wait) return this;
		var parsed = Fx.CSS.prepare(this.element, this.property, [from, to]);
		return arguments.callee.parent(parsed.from, parsed.to);
	},

	increase: function(){
		this.element.setStyle(this.property, Fx.CSS.serve(this.now, this.options.unit));
	}

});

/*
Native: Element
	Custom class to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: effect
		Applies an <Fx.Style> to the Element. This a shortcut for <Fx.Style>.

	Syntax:
		>var myFx = myElement.effect(property[, options]);

	Arguments:
		property - (string) The css property to alter.
		options  - (object, optional) The <Fx.Style> options object.

	Returns:
		(class) A new Fx.Style instance.

	Example:
		[javascript]
			var myEffect = $('myElement').effect('height', {duration: 1000, transition: Fx.Transitions.Sine.easeOut}).start(10, 100);
		[/javascript]

	See Also:
		<Fx.Style>
	*/

	effect: function(property, options){
		return new Fx.Style(this, property, options);
	}

});


/*
Script: Fx.Styles.js
	Contains <Fx.Styles>

License:
	MIT-style license.
*/

/*
Class: Fx.Styles
	Allows you to animate multiple css properties at once. Inherits methods, properties, options and events from <Fx>.

Extends:
	<Fx>

Syntax:
	>var myFx = new Fx.Styles(element[, options]);

Arguments:
	el      - (mixed) A string ID of the Element or an Element to apply the style transitions to.
	options - (object, optional) The <Fx> options object.

Properties:
	now - (object) An object containing keys that specify css properties being altered and values for their current state.

Returns:
	(class) A new Fx.Styles instance.

Examples:
	From, To:
	[javascript]
		var myEffects = new Fx.Styles('myElement', {duration: 1000, transition: Fx.Transitions.Sine.easeOut});

		//height from 10 to 100 and width from 900 to 300
		myEffects.start({
			'height': [10, 100],
			'width': [900, 300]
		});
	[/javascript]

	To:
	[javascript]
		var myEffects = new Fx.Styles('myElement', {duration: 1000, transition: Fx.Transitions.Sine.easeOut});

		//or height from current height to 100 and width from current width to 300
		myEffects.start({
			'height': 100,
			'width': 300
		});
	[/javascript]

See Also:
	<Fx>
*/

Fx.Styles = new Class({

	Extends: Fx,

	initialize: function(element, options){
		arguments.callee.parent($(element), options);
	},

	setNow: function(){
		for (var p in this.from) this.now[p] = Fx.CSS.compute(this.from[p], this.to[p], this);
	},

	/*
	Method: set
		Sets the Element's css properties to the specified values immediately.

	Syntax:
		>myFx.set(to);

	Arguments:
		to - (object) An object containing keys that specify css properties to alter with their respected values.

	Returns:
		(class) This Fx.Style instance.

	Example:
		[javascript]
			var myFx = new Fx.Styles('myElement').set({
				'height': 200,
				'width': 200,
				'background-color': '#f00',
				'opacity': 0
			});
		[/javascript]
	*/

	set: function(to){
		var parsed = {};
		for (var p in to) parsed[p] = Fx.CSS.set(to[p]);
		return arguments.callee.parent(parsed);
	},

	/*
	Method: start
		Executes a transition for any number of css properties in tandem.

	Syntax:
		>myFx.start(obj);

	Arguments:
		obj - (object) An object containing keys that specify css properties to alter and values that specify either the to value, or an array with from/to values.

	Returns:
		(class) This Fx.Styles instance.

	Example:
		[javascript]
			var myEffects = new Fx.Styles('myElement', {duration: 1000, transition: Fx.Transitions.Sine.easeOut});

			myEffects.start({
				'height': [10, 100],
				'width': [900, 300],
				'opacity': 0,
				'background-color': '#00f'
			});
		[/javascript]
	*/

	start: function(obj){
		if (this.timer && this.options.wait) return this;
		this.now = {};
		var from = {}, to = {};
		for (var p in obj){
			var parsed = Fx.CSS.prepare(this.element, p, obj[p]);
			from[p] = parsed.from;
			to[p] = parsed.to;
		}
		return arguments.callee.parent(from, to);
	},

	increase: function(){
		for (var p in this.now) this.element.setStyle(p, Fx.CSS.serve(this.now[p], this.options.unit));
	}

});

/*
Native: Element
	Custom class to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: effects
		Applies an <Fx.Styles> to the Element. This a shortcut for <Fx.Styles>.

	Syntax:
		>var myFx = myElement.effects([options]);

	Arguments:
		options - (object, optional) The <Fx.Styles> options object.

	Returns:
		(class) A new Fx.Styles instance.

	Example:
		[javascript]
			var myEffects = $(myElement).effects({
				duration: 1000,
				transition: Fx.Transitions.Sine.easeInOut,
				wait: false
			}).set({
				'opacity': 0
				'width': 0
			}).start({
				'height': [10, 100],
				'width': 300
			});
		[/javascript]

	See Also:
		<Fx>, <Fx.Styles>
	*/

	effects: function(options){
		return new Fx.Styles(this, options);
	}

});


/*
Script: Fx.Scroll.js
	Contains <Fx.Scroll>

License:
	MIT-style license.

Note:
	Fx.Scroll requires an XHTML doctype.
*/

/*
Class: Fx.Scroll
	Scroll any element with an overflow, including the window element.

Extends:
	<Fx>

Syntax:
	>var myFx = new Fx.Scroll(element[, options]);

Arguments:
	element - (mixed) A string ID of the Element or an Element reference to scroll.
	options - (object, optional) All <Fx> Options in addition to offset, overflown, and wheelStops.

	options (continued):
		offset     - (object: defaults to {'x': 0, 'y': 0}) An object with x/y properties for the distance to scrollTo the Element.
		overflown  - (array: defaults to []) An array of nested scrolling containers, see <Element.getPosition> for an explanation.
		wheelStops - (boolean: defaults to true) If false, the mouse wheel will not stop the transition from happening.

Returns:
	(class) A new Fx.Scroll instance.

Example:
	[javascript]
		var myFx = new Fx.Scroll('myElement', {
			offset: {
				'x': 0,
				'y': 100
			}
		}).toTop();
	[/javascript]

Note:
	 - Fx.Scroll transition will stop on mousewheel movement if the optional wheelStops is not set to false. This is so that the user has control over their web experience.
	 - Fx.Scroll is useless for Elements that do not have scrollbars.
*/

Fx.Scroll = new Class({

	Extends: Fx,

	options: {
		overflown: [],
		offset: {'x': 0, 'y': 0},
		wheelStops: true
	},

	initialize: function(element, options){
		arguments.callee.parent($(element), options);
		this.now = [];
		this.bound = {'stop': this.stop.bind(this, false)};
		switch($type(this.element)){
			case 'window': this.document = this.element.document; break;
			case 'document': this.document = this.element; break;
			case 'element': this.document = this.element.ownerDocument;
		}
		if (this.options.wheelStops){
			this.addEvent('onStart', function(){
				this.document.addEvent('mousewheel', this.bound.stop);
			}.bind(this), true);
			this.addEvent('onComplete', function(){
				this.document.removeEvent('mousewheel', this.bound.stop);
			}.bind(this), true);
		}
	},

	setNow: function(){
		for (var i = 2; i--; i) this.now[i] = this.compute(this.from[i], this.to[i]);
	},

	/*
	Method: scrollTo
		Scrolls the specified Element to the x/y coordinates.

	Syntax:
		>myFx.scrollTo(x, y);

	Arguments:
		x - (integer) The x coordinate to scroll the Element to.
		y - (integer) The y coordinate to scroll the Element to.

	Returns:
		(class) This Fx.Scroll instance.

	Example:
		[javascript]
			var myElement = $(document.body);
			var myFx = new Fx.Scroll(myElement).scrollTo(0, 0.5 * document.body.offsetHeight);
		[/javascript]

	Note:
		Scrolling to (-x, -y) is impossible. :)
	*/

	scrollTo: function(x, y){
		if (this.timer && this.options.wait) return this;
		var el = this.element.getSize();
		var values = {'x': x, 'y': y};
		for (var z in el.size){
			var max = el.scrollSize[z] - el.size[z];
			if ($chk(values[z])) values[z] = ($type(values[z]) == 'number') ? values[z].limit(0, max) : max;
			else values[z] = el.scroll[z];
			values[z] += this.options.offset[z];
		}
		return this.start([el.scroll.x, el.scroll.y], [values.x, values.y]);
	},

	/*
	Method: toTop
		Scrolls the specified Element to its maximum top.

	Syntax:
		>myFx.toTop();

	Returns:
		(class) This Fx.Scroll instance.

	Example:
		[javascript]
			// scroll myElement 200 pixels down (from the top) and automatically after 1.5 sec scroll to the top
			var myFx = new Fx.Scroll('myElement', {
				onComplete: function(){
					this.toTop.delay(1500, this);
				}
			}).scrollTo(0, 200).chain(function(){
				this.scrollTo(200, 0);
			});
		[/javascript]
	*/

	toTop: function(){
		return this.scrollTo(false, 0);
	},

	/*
	Method: toBottom
		Scrolls the specified Element to its maximum bottom.

	Syntax:
		>myFx.toBottom();

	Returns:
		(class) This Fx.Scroll instance.

	Example:
		[javascript]
			// scroll myElement to the bottom and after 1 sec scroll to the top
			var myFx = new Fx.Scroll(window).toBottom().chain(function(){
				this.toTop.delay(1000, this);
			});
		[/javascript]
	*/

	toBottom: function(){
		return this.scrollTo(false, 'full');
	},

	/*
	Method: toLeft
		Scrolls the specified Element to its maximum left.

	Syntax:
		>myFx.toLeft();

	Returns:
		(class) This Fx.Scroll instance.

	Example:
		[javascript]
			// scroll myElement 200 pixels to the right and go back.
			var myFx = new Fx.Scroll('myElement').scrollTo(200, 0).chain(function(){
				this.toLeft();
			});
		[/javascript]
	*/


	toLeft: function(){
		return this.scrollTo(0, false);
	},

	/*
	Method: toRight
		Scrolls the specified Element to its maximum right.

	Syntax:
		>myFx.toRight();

	Returns:
		(class) This Fx.Scroll instance.

	Example:
		[javascript]
			// scroll myElement to the right scroll to the top
			var myFx = new Fx.Scroll('myElement', {
				duration: 5000,
				wait: false
			}).toRight();

			myFx.toBottom.delay(2000, myFx);
		[/javascript]
	*/

	toRight: function(){
		return this.scrollTo('full', false);
	},

	/*
	Method: toElement
		Scrolls the specified Element to the position the passed in Element is found.

	Syntax:
		>myFx.toElement(el);

	Arguments:
		el - (mixed) A string ID of the Element or an Element reference to scroll to.

	Returns:
		(class) This Fx.Scroll instance.

	Example:
		[javascript]
			var myFx = new Fx.Scroll(window).toElement('myElement'); //places the element at the top left corner of the window.
		[/javascript]

	Note:
		See <Element.getPosition> for position difficulties.
	*/

	toElement: function(el){
		var parent = this.element.getPosition(this.options.overflown);
		var target = $(el).getPosition(this.options.overflown);
		return this.scrollTo(target.x - parent.x, target.y - parent.y);
	},

	increase: function(){
		this.element.scrollTo(this.now[0], this.now[1]);
	}

});

/*
Script: Fx.Slide.js
	Contains <Fx.Slide>

License:
	MIT-style license.

Note:
	Fx.Slide requires an XHTML doctype.
*/

/*
Class: Fx.Slide
	The slide effect; slides an element in horizontally or vertically, the contents will fold inside.

Extends:
	<Fx>

Syntax:
	>var myFx = new Fx.Slide(element[, options]);

Arguments:
	elements - (element) The element to slide.
	options  - (object, optional) All of <Fx> options in addition to mode and wrapper.

	options (continued):
		mode    - (string: defaults to 'vertical') String to indicate what type of sliding. Can be set to 'vertical' or 'horizontal'.
		wrapper - (element: defaults to this.element) Allows to set another Element as wrapper.

Properties:
	wrapper - (element) The Element wrapping the element being slid.
	open    - (boolean) Indicates whether the slide element is visible.

Example:
	[javascript]
	var mySlider = new Fx.Slide('container').hide().toggle().chain(function(){ //hides, toggles (which acts like slideOut), and chains an alert.
		alert(mySlider.open); //true
	});
	[/javascript]

Note:
	To create the slide effect an additional Element ('div' by default) is wrapped around the given Element. This wrapper adapts the margin from the Element.
*/

Fx.Slide = new Class({

	Extends: Fx,

	options: {
		mode: 'vertical'
		/*wrapper: null*/
	},

	initialize: function(element, options){
		this.addEvent('onComplete', function(){
			this.open = (this.now[0] === 0);
			if (this.open){
				this.wrapper.setStyle(this.layout, '');
				if (Client.Engine.webkit419) this.element.remove().inject(this.wrapper);
			}
		}, true);
		arguments.callee.parent($(element), options);
		this.wrapper = $(this.options.wrapper) || new Element('div', {'styles': $extend(this.element.getStyles('margin', 'position'), {'overflow': 'hidden'})}).injectAfter(this.element).adopt(this.element);
		this.element.setStyle('margin', 0);
		this.now = [];
		this.open = true;
	},

	setNow: function(){
		for (var i = 2; i--; i) this.now[i] = this.compute(this.from[i], this.to[i]);
	},

	vertical: function(){
		this.margin = 'margin-top';
		this.layout = 'height';
		this.offset = this.element.offsetHeight;
	},

	horizontal: function(){
		this.margin = 'margin-left';
		this.layout = 'width';
		this.offset = this.element.offsetWidth;
	},

	/*
	Method: slideIn
		Slides the Element in view horizontally or vertically.

	Syntax:
		>myFx.slideIn([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement').slideOut().chain(function(){
				this.show().slideOut('horizontal');
			});
		[/javascript]
	*/

	slideIn: function(mode){
		this[mode || this.options.mode]();
		return this.start([this.element.getStyle(this.margin).toInt(), this.wrapper.getStyle(this.layout).toInt()], [0, this.offset]);
	},

	/*
	Method: slideOut
		Slides the Element out of view horizontally or vertically.

	Syntax:
		>myFx.slideOut([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				mode: 'horizontal',
				onComplete: function(){ // due to inheritance we have all the <Fx> Options.
					alert('poof!');
				}
			}).slideOut();
		[/javascript]
	*/

	slideOut: function(mode){
		this[mode || this.options.mode]();
		return this.start([this.element.getStyle(this.margin).toInt(), this.wrapper.getStyle(this.layout).toInt()], [-this.offset, 0]);
	},

	/*
	Method: hide
		Hides the element without a transition.

	Syntax:
		>myFx.hide([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Bounce.easeOut
			});

			myFx.hide().slideIn(); //automatically hide and show myElement.
		[/javascript]
	*/

	hide: function(mode){
		this[mode || this.options.mode]();
		this.open = false;
		return this.set([-this.offset, 0]);
	},

	/*
	Method: show
		Shows the element without a transition.

	Syntax:
		>myFx.show([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Bounce.easeOut
			});

			myFx.slideOut().chain(function(){
				this.show.delay(1000, this); //after 1sec show the slid Element.
			});
		[/javascript]
	*/

	show: function(mode){
		this[mode || this.options.mode]();
		this.open = true;
		return this.set([0, this.offset]);
	},

	/*
	Method: toggle
		Slides in or Out the element depending on its state.

	Syntax:
		>myFx.toggle([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Pow.easeOut
			});

			myFx.toggle().chain(myFx.toggle); // toggle the between slideIn and Out twice.
		[/javascript]
	*/

	toggle: function(mode){
		if (this.wrapper.offsetHeight == 0 || this.wrapper.offsetWidth == 0) return this.slideIn(mode);
		return this.slideOut(mode);
	},

	increase: function(){
		this.element.setStyle(this.margin, this.now[0] + this.options.unit);
		this.wrapper.setStyle(this.layout, this.now[1] + this.options.unit);
	}

});

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

/*
Method: slideIn
	Slides this Element in view horizontally or vertically.

Syntax:
	>myElement.slideIn([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideHide().slideIn();
	[/javascript]

See Also:
	<Fx.Slide.slideIn>
*/

//auto generated

/*
Method: slideOut
	Slides this Element out of view horizontally or vertically.

Syntax:
	>myElement.slideOut([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideOut({
			duration: 1000,
			transition: Fx.Transitions.Sine.easeOut
		});
	[/javascript]

See Also:
	<Fx.Slide.slideOut>
*/

//auto generated

/*
Method: slideHide
	Hides this element without a transition.

Syntax:
	>myElement.slideHide([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideHide({
			duration: 1000,
			transition: Fx.Transitions.Bounce.easeOut
		}).slideIn(); //automatically hide and show myElement.
	[/javascript]

See Also:
	<Fx.Slide.hide>
*/

//auto generated

/*
Method: slideShow
	Shows this element without a transition.

Syntax:
	>myElement.slideShow([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myElement = $('myElement');
		myElement.slideHide().chain(function(){
			myElement.slideShow.delay(1000, myElement);
		});
	[/javascript]

See Also:
	<Fx.Slide.show>
*/

//auto generated

/*
Method: slideToggle
	Slides in or Out this element depending on its state.

Syntax:
	>myElement.slideToggle([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideToggle({
			duration: 1000,
			transition: Fx.Transitions.Pow.easeOut
		}).chain(myFx.toggle); // toggle the between slideIn and Out twice. Note that myFx becomes an instance of Fx.Slide therefore toggle becomes available.
	[/javascript]

See Also:
	<Fx.Slide.toggle>
*/

(function(){
	var methods = {'slideIn': 'slideIn', 'slideOut': 'slideOut', 'slideToggle': 'toggle', 'slideHide': 'hide', 'slideShow': 'show'};
	Hash.each(methods, function(slideMethod, elementMethod){
		methods[elementMethod] = function(options){
			var slide = this.$attributes.slide;
			if (!slide){
				slide = new Fx.Slide(this, {wait: false});
				this.$attributes.slide = slide.wrapper.$attributes.slide = slide;
			}
			if (options) slide.setOptions(options);
			return slide[slideMethod]();
		};
	});
	Element.implement(methods);
})();


/*
Script: Fx.Transitions.js
	Effects transitions, to be used with all the effects.

License:
	MIT-style license.

Credits:
	Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>, modified and optimized to be used with MooTools.
*/

/*
Class: Fx.Transition
	Returns a <Fx> transition function with 'easeIn', 'easeOut', and 'easeInOut' methods.

Syntax:
	>var myTransition = new Fx.Transition(transition[, params]);

Arguments:
	transition - (function) Can be a <Fx.Transitions> function or a user-provided function which will be extended with easing functions.
	params     - (mixed, optional) Single value or an array for multiple values to pass as the second parameter for the transition function.

Returns:
	(function) A function with easing functions.

Example:
	[javascript]
		//Elastic.easeOut with user-defined value for elasticity.
		var myTransition = new Fx.Transition(Fx.Transitions.Elastic, 3);
		var myFx = $('myElement').effect('margin', {transition: myTransition.easeOut});
	[/javascript]

See Also:
	<Fx.Transitions>
*/

Fx.Transition = function(transition, params){
	params = $splat(params);
	return $extend(transition, {
		easeIn: function(pos){
			return transition(pos, params);
		},
		easeOut: function(pos){
			return 1 - transition(1 - pos, params);
		},
		easeInOut: function(pos){
			return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
		}
	});
};

/*
Hash: Fx.Transitions
	A collection of tweening transitions for use with the <Fx> classes.

Example:
	[javascript]
		//Elastic.easeOut with default values:
		var myFx = $('myElement').effect('margin', {transition: Fx.Transitions.Elastic.easeOut});
	[/javascript]

See also:
	<http://www.robertpenner.com/easing/>, <Element.effect>
*/

Fx.Transitions = new Hash({

	/*
	Method: linear
		Displays a linear transition.

	Graph:
		(see Linear.png)
	*/

	linear: function(p){
		return p;
	}

});

Fx.Transitions.extend = function(transitions){
	for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
};

Fx.Transitions.extend({

	/*
	Method: Quad
		Displays a quadratic transition. Must be used as Quad.easeIn or Quad.easeOut or Quad.easeInOut.

	Graph:
		(see Quad.png)
	*/

	//auto generated

	/*
	Method: Cubic
		Displays a cubicular transition. Must be used as Cubic.easeIn or Cubic.easeOut or Cubic.easeInOut.

	Graph:
		(see Cubic.png)
	*/

	//auto generated

	/*
	Method: Quart
		Displays a quartetic transition. Must be used as Quart.easeIn or Quart.easeOut or Quart.easeInOut.

	Graph:
		(see Quart.png)
	*/

	//auto generated

	/*
	Method: Quint
		Displays a quintic transition. Must be used as Quint.easeIn or Quint.easeOut or Quint.easeInOut.

	Graph:
		(see Quint.png)
	*/

	//auto generated

	/*
	Method: Pow
		Used to generate Quad, Cubic, Quart and Quint.

	Note:
		By default is p^6.

	Graph:
		(see Pow.png)
	*/

	Pow: function(p, x){
		return Math.pow(p, x[0] || 6);
	},

	/*
	Method: Expo
		Displays a exponential transition. Must be used as Expo.easeIn or Expo.easeOut or Expo.easeInOut.

	Graph:
		(see Expo.png)
	*/

	Expo: function(p){
		return Math.pow(2, 8 * (p - 1));
	},

	/*
	Method: Circ
		Displays a circular transition. Must be used as Circ.easeIn or Circ.easeOut or Circ.easeInOut.

	Graph:
		(see Circ.png)
	*/

	Circ: function(p){
		return 1 - Math.sin(Math.acos(p));
	},

	/*
	Method: Sine
		Displays a sineousidal transition. Must be used as Sine.easeIn or Sine.easeOut or Sine.easeInOut.

	Graph:
		(see Sine.png)
	*/

	Sine: function(p){
		return 1 - Math.sin((1 - p) * Math.PI / 2);
	},

	/*
	Method: Back
		Makes the transition go back, then all forth. Must be used as Back.easeIn or Back.easeOut or Back.easeInOut.

	Graph:
		(see Back.png)
	*/

	Back: function(p, x){
		x = x[0] || 1.618;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	},

	/*
	Method: Bounce
		Makes the transition bouncy. Must be used as Bounce.easeIn or Bounce.easeOut or Bounce.easeInOut.

	Graph:
		(see Bounce.png)
	*/

	Bounce: function(p){
		var value;
		for (var a = 0, b = 1; 1; a += b, b /= 2){
			if (p >= (7 - 4 * a) / 11){
				value = - Math.pow((11 - 6 * a - 11 * p) / 4, 2) + b * b;
				break;
			}
		}
		return value;
	},

	/*
	Method: Elastic
		Elastic curve. Must be used as Elastic.easeIn or Elastic.easeOut or Elastic.easeInOut

	Graph:
		(see Elastic.png)
	*/

	Elastic: function(p, x){
		return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
	}

});

['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i){
	Fx.Transitions[transition] = new Fx.Transition(function(p){
		return Math.pow(p, [i + 2]);
	});
});


/*
Script: XHR.js
	Contains the basic XMLHttpRequest Class Wrapper.

License:
	MIT-style license.
*/

/*
Class: XHR
	An XMLHttpRequest Wrapper.

Implements:
	<Chain>, <Events>, <Options>

Syntax:
	>var myXHR = new XHR([url][, options]);

Arguments:
	url     - (string, optional) The URL pointing to the server-side script.
	options - (object, optional) See below.

	options (continued):
		method     - (string: defaults to 'post') The HTTP method for the request, can be either 'post' or 'get'.
		data       - (string) The default data for <XHR.send>, used when no data is given.
		async      - (boolean: defaults to true) If set to false, the requests will be synchronous and freeze the browser during request.
		encoding   - (string: defaults to "utf-8") The encoding to be set in the request header.
		autoCancel - (boolean: defaults to false) When set to true, automatically cancels the already running request if another one is sent. Otherwise, ignores any new calls while a request is in progress.
		headers    - (object) An object to use in order to set the request headers.
		isSuccess  - (function) Overrides the built-in isSuccess function.

Events:
	onRequest   - (function) Function to execute when the XHR request is fired.
		Signature:
			>onRequest(instance)

		Arguments:
			instance - (XHR) The transport instance.

	onSuccess   - (function) Function to execute when the XHR request completes.
		Signature:
			>onSuccess(reponseText, responseXML)

		Arguments:
			responseText - (string) The returned text from the request.
			responseXML  - (mixed) The response XML from the request.

	onFailure   - (function) Function to execute when the request failes (error status code).
		Signature:
			>onFailure(instance)

		Arguments:
			instance - (XHR) The transport instance.

	onException - (function) Function to execute when setting a request header fails.
		Signature:
			>onException(headerName, value)

		Arguments:
			headerName - (string) The name of the failing header.
			value      - (string) The value of the failing header.

	onCancel    - (function) Function to execute when a request has been cancelled.
		Signature:
			>onCancel()

Properties:
	running  - (boolean) True if the request is running.
	response - (object) Object with text and xml as keys. You can access this property in the onSuccess event.

Returns:
	(class) A new XHR instance.

Example:
	[javascript]
		var myXHR = new XHR({method: 'get'}).send('http://site.com/requestHandler.php', 'name=john&lastname=dorian');
	[/javascript]

See Also:
	<http://en.wikipedia.org/wiki/XMLHttpRequest>
*/

var XHR = new Class({

	Implements: [Chain, Events, Options],

	options: {
		/*onRequest: $empty,
		onSuccess: $empty,
		onFailure: $empty,
		onException: $empty,*/
		method: 'post',
		async: true,
		data: null,
		urlEncoded: true,
		encoding: 'utf-8',
		autoCancel: false,
		headers: {},
		isSuccess: null
	},

	setTransport: function(){
		this.transport = (window.XMLHttpRequest) ? new XMLHttpRequest() : (Client.Engine.trident ? new ActiveXObject('Microsoft.XMLHTTP') : false);
	},

	initialize: function(){
		var params = Array.link(arguments, {'url': String.type, 'options': Object.type});
		this.url = params.url;
		this.setTransport();
		this.setOptions(params.options);
		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.headers = $merge(this.options.headers);
		if (this.options.urlEncoded && this.options.method != 'get'){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.setHeader('Content-type', 'application/x-www-form-urlencoded' + encoding);
		}
		this.setHeader('X-Requested-With', 'XMLHttpRequest');
	},

	onStateChange: function(){
		if (this.transport.readyState != 4 || !this.running) return;
		this.running = false;
		this.status = 0;
		$try(function(){
			this.status = this.transport.status;
		}, this);
		if (this.options.isSuccess.call(this, this.status)) this.onSuccess();
		else this.onFailure();
		this.transport.onreadystatechange = $empty;
	},

	isSuccess: function(){
		return ((this.status >= 200) && (this.status < 300));
	},

	onSuccess: function(){
		this.response = {
			text: this.transport.responseText,
			xml: this.transport.responseXML
		};
		this.fireEvent('onSuccess', [this.response.text, this.response.xml]);
		this.callChain();
	},

	onFailure: function(){
		this.fireEvent('onFailure', this.transport);
	},

	/*
	Method: setHeader
		Add or modify a header for the request. It will not override headers from the options.

	Syntax:
		>myXHR.setHeader(name, value);

	Arguments:
		name  - (string) The name for the header.
		value - (string) The value to be assigned.

	Returns:
		(class) This XHR instance.

	Example:
		[javascript]
			var myXHR = new XHR(url, {method: 'get', headers: {'X-Request': 'JSON'}});
			myXHR.setHeader('Last-Modified','Sat, 1 Jan 2005 05:00:00 GMT');
		[/javascript]
	*/

	setHeader: function(name, value){
		this.headers[name] = value;
		return this;
	},

	/*
	Method: getHeader
		Returns the given response header or null if not found.

	Syntax:
		>myXHR.getHeader(name);

	Arguments:
		name - (string) The name of the header to retrieve the value of.

	Returns:
		(string) The value of the retrieved header.

	Example:
		var myXHR = new XHR(url, {method: 'get', headers: {'X-Request': 'JSON'}});
		var headers = myXHR.getHeader('X-Request'); // returns 'JSON'
	*/

	getHeader: function(name){
		return $try(function(name){
			return this.getResponseHeader(name);
		}, this.transport, name) || null;
	},

	/*
	Method: send
		Opens the XHR connection and sends the provided data.

	Syntax:
		>myXHR.send(url[, data]);

	Arguments:
		url  - (string) The URL to make the request to.
		data - (string, optional) The request data as query string.

	Examples:
		Simple POST request:
		[javascript]
			var myXHR = new XHR().send(url, "save=username&name=John");
		[/javascript]

		Synchronous Request:
		[javascript]
			var syncXHR = new XHR({async: false});
			syncXHR.send(url, null);
			alert(syncXHR.response.text);
		[/javascript]
	*/

	send: function(url, data){
		if (this.options.autoCancel) this.cancel();
		else if (this.running) return this;
		this.running = true;
		data = data || this.options.data;
		if (data && this.options.method == 'get'){
			url = url + (url.contains('?') ? '&' : '?') + data;
			data = null;
		}
		this.transport.open(this.options.method.toUpperCase(), url, this.options.async);
		this.transport.onreadystatechange = this.onStateChange.bind(this);
		for (var type in this.headers){
			try{
				this.transport.setRequestHeader(type, this.headers[type]);
			} catch(e){
				this.fireEvent('onException', [e, type, this.headers[type]]);
			}
		}
		this.fireEvent('onRequest');
		this.transport.send($pick(data, null));
		if (!this.options.async) this.onStateChange();
		return this;
	},

	/*
	Method: request
		Uses the internal url (passed in <XHR>'s instantiation) to send the passed in data.

	Syntax:
		>myXHR.request([data]);

	Arguments:
		data - (string, optional) The request data as query string.

	Returns:
		(class) This XHR instance.

	Example:
		[javascript]
			var myXHR = new XHR(url);
			myXHR.send("save=username&name=John");
		[/javascript]
	*/

	request: function(data){
		return this.send(this.url, data);
	},

	/*
	Method: cancel
		Cancels the currently running request, if any.

	Syntax:
		>myRequest.cancel();

	Returns:
		(class) This XHR instance.

	Example:
		[javascript]
			var myXHR = new XHR({method: 'get'}).send(url);
			myXHR.cancel();
		[/javascript]
	*/

	cancel: function(){
		if (!this.running) return this;
		this.running = false;
		this.transport.abort();
		this.transport.onreadystatechange = $empty;
		this.setTransport();
		this.fireEvent('onCancel');
		return this;
	}

});


/*
Script: Ajax.js
	Contains the <Ajax> class. Also contains methods to generate querystings from forms and Objects.

License:
	MIT-style license.
*/

/*
Class: Ajax
	An Ajax class, For all your asynchronous needs.

Extends:
	<XHR>

Syntax:
	>var myAjax = new Ajax(url[, options]);

Arguments:
	url     - (string) The url pointing to the server-side script.
	options - (object, optional) In addition to <XHR>'s options object, see "Options" below.

	options (continued):
		update       - (element: defaults to null) The Element to insert the response text of the XHR into upon completion of the request.
		evalScripts  - (boolean: defaults to false) If set to true, HTMLScript tags inside the response is evaluated.
		evalResponse - (boolean: defaults to false) If set to true, the entire response is evaluated.

Events:
	onComplete - (function) Function to execute when the AJAX request completes.
		Signature:
			>onComplete(responseText, responseXML)

		Arguments:
			responseText - (string) The content of the remote response.
			responseXML  - (string) The XML response of the request.

Returns:
	(class) A new Ajax instance.

Examples:
	Simple GET Request:
	[javascript]
		var myAjax = new Ajax(url, {method: 'get'}).request();
	[/javascript]

	POST Request with Data as String:
	[javascript]
		var myAjax = new Ajax('save/').request("user_id=25&save=true");
	[/javascript]

	Data from Object Passed via GET:
	[javascript]
		var myAjax = new Ajax('load/').request({'user_id': 25}); //loads url "load/?user_id=25"
	[javascript]

	Data from Element via POST:
	[html]
		<form action="save/" method="post" id="user-form">
			<p>
				Search: <input type="text" name="search" />
				Search in description: <input type="checkbox" name="search_description" value="yes" />
				<input type="submit" />
			</p>
		</form>
	[/html]
	[javascript]
		//Needs to be in a submit event or the form handler
		var myAjax = new Ajax('save/').request($('user-form'));
	[/javascript]

Note:
	If the response's content-type is JavaScript or EcmaScript, everything is evaluated.

See Also:
	<XHR>
*/

var Ajax = new Class({

	Extends: XHR,

	options: {
		/*onComplete: $empty,*/
		update: null,
		evalScripts: false,
		evalResponse: false
	},

	initialize: function(url, options){
		this.addEvent('onSuccess', this.onComplete, true);
		arguments.callee.parent(url, options);
		if (!['post', 'get'].contains(this.options.method)){
			this._method = '_method=' + this.options.method;
			this.options.method = 'post';
		}
		this.setHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
	},

	onComplete: function(){
		var scripts;
		if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))){
			scripts = this.response.text;
		} else{
			scripts = (this.options.evalScripts) ? '' : null;
			this.response.text = this.response.text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
				if (scripts !== null) scripts += arguments[1] + '\n';
				return '';
			});
		}
		if (this.options.update) $(this.options.update).empty().setHTML(this.response.text);
		if (scripts) (window.execScript) ? window.execScript(scripts) : window.setTimeout(scripts, 0);
		this.fireEvent('onComplete', [this.response.text, this.response.xml]);
	},

	/*
	Method: request
		Executes the AJAX request.

	Syntax:
		>myAjax.request([data]);

	Arguments:
		data - (mixed, optional: defaults to options.data) A String, Object (used in <Hash.toQueryString>), or an Element with input elements (used in <Element.toQueryString>) which represents the data to request.

	Returns:
		(class) This Ajax instance.

	Examples:
		Reusable Example:
		[javascript]
			var myAjax = new Ajax(url, {method: 'get'});
			myAjax.request();
		[/javascript]

		One Shot Example:
		[javascript]
			new Ajax(url, {method: 'get'}).request();
		[/javascript]
	*/

	request: function(data){
		data = data || this.options.data;
		switch ($type(data)){
			case 'element': data = $(data).toQueryString(); break;
			case 'hash': case 'object': data = Hash.toQueryString(data);
		}
		if (this._method) data = (data) ? this._method + '&' + data : this._method;
		return arguments.callee.parent(data);
	}

});

/*
Native: Hash
	A Custom "Object" ({}) implementation which does not account for prototypes when setting, getting, iterating.
*/

/*
Method: toQueryString
	Generates a query string from key/pair values in an object and URI encodes the values.

Syntax:
	>var myHash = new Hash({...}); = myHash.toQueryString();

Arguments:
	source - (object) The object to generate the query string from.

Returns:
	(string) The query string.

Examples:
	Using Hash generic:
	[javascript]
		Hash.toQueryString({apple: "red", lemon: "yellow"}); //returns "apple=red&lemon=yellow"
	[/javascript]

	Using Hash instance:
	[javascript]
		var myHash = new Hash({apple: "red", lemon: "yellow"});
		myHash.toQueryString(); //returns "apple=red&lemon=yellow"
	[/javascript]
*/

Hash.implement({

	toQueryString: function(){
		var queryString = [];
		Hash.each(this, function(value, key){
			queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		});
		return queryString.join('&');
	}

});

/*
Native: Element
	Custom class to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: send
		Sends a form with an Ajax request.

	Syntax:
		>myElement.send([options]);

	Arguments:
		options - (object, optional) Options object for the <Ajax> request.

	Returns:
		(class) An Ajax Class instance.

	Example:
		[html]
			<form id="myForm" action="submit.php">
				<p>
					<input name="email" value="bob@bob.com">
					<input name="zipCode" value="90210">
				</p>
			</form>
		[/html]
		[javascript]
			$('myForm').send();
		[/javascript]

	Note:
		The URL is taken from the action attribute, as well as the method, which defaults to post if not found.
	*/

	send: function(options){
		var send = this.$attributes.send;
		if (!send) send = this.$attributes.send = new Ajax(this.getProperty('action'), {method: this.method || 'post', autoCancel: true});
		if (options) send.setOptions(options);
		return send.request(this);
	},

	/*
	Method: update
		Updates the content of the element with an Ajax get request.

	Syntax:
		>myElement.update(url[, options]);

	Arguments:
		url     - (string) The URL pointing to the server-side document.
		options - (object, optional) Options object for the <Ajax> request.

	Returns:
		(class) An Ajax Class instance.

	Example:
		[html]
			<div id="content">Loading content...</div>
		[/html]
		[javascript]
			$('content').update('page_1.html');
		[/javascript]

	Note:
		It saves the Ajax instance to the Element, so it uses the same instance every update call.
	*/

	update: function(url, options){
		var update = this.$attributes.update;
		if (!update) update = this.$attributes.update = new Ajax({update: this, method: 'get', autoCancel: true});
		if (options) update.setOptions(options);
		update.url = url;
		return update.request();
	}

});

/*
Script: Cookie.js
	A Cookie reader/creator.

Credits:
	Based on the functions by Peter-Paul Koch (http://quirksmode.org).
*/

/*
Hash: Cookie
	Hash for creating, accessing, and removing cookies.

Properties:
	options - (object) An object to set the default behaviour of Cookie and its derivatives.

	options (continued):
		domain   - (string: defaults to false) The domain the Cookie belongs to.
		path     - (string: defaults to false) The path the Cookie belongs to.
		duration - (number: defaults to false) The duration of the Cookie before it expires, in days. If set to false or 0, the cookie will be a session cookie that expires when the browser is closed.
		secure   - (boolean: defaults to false) Stored cookie information can be accessed only from a secure environment.

Note:
	- In order to share the Cookie with pages located in a different path, the <Cookie.options.domain> value must be set.
*/

var Cookie = new Hash({

	options: {
		domain: false,
		path: false,
		duration: false,
		secure: false
	},

	/*
	Method: set
		Sets a cookie in the browser.

	Syntax:
		>var myCookie = Cookie.set(key, value[, options]);

	Arguments:
		key     - (string) The key (or name) of the cookie.
		value   - (string) The value to set.  Cannot contain semicolons.
		options - (mixed, optional) See <Cookie>.

	Returns:
		(object) An object with the options, the key and the value. You can give it as first parameter to Cookie.remove.

	Examples:
		Saves the Cookie for the Duration of the Session:
		[javascript]
			var myCookie = Cookie.set('username', 'Harald');
		[/javascript]

		Saves the Cookie for a Day:
		[javavascript]
			var myCookie  = Cookie.set('username', 'JackBauer', {duration: 1});
		[/javascript]
	*/

	set: function(key, value, options){
		options = $merge(this.options, options);
		value = encodeURIComponent(value);
		if (options.domain) value += '; domain=' + options.domain;
		if (options.path) value += '; path=' + options.path;
		if (options.duration){
			var date = new Date();
			date.setTime(date.getTime() + options.duration * 24 * 60 * 60 * 1000);
			value += '; expires=' + date.toGMTString();
		}
		if (options.secure) value += '; secure';
		document.cookie = key + '=' + value;
		return $extend(options, {'key': key, 'value': value});
	},

	/*
	Method: get
		Gets the value of a Cookie.

	Syntax:
		>var myCookie = Cookie.get(key);

	Arguments:
		key - (string) The name of the Cookie to retrieve.

	Returns:
		(mixed) The cookie string value, or false if not found.

	Example:
		[javascript]
			Cookie.get("username");
		[/javascript]
	*/

	get: function(key){
		var value = document.cookie.match('(?:^|;)\\s*' + key.escapeRegExp() + '=([^;]*)');
		return value ? decodeURIComponent(value[1]) : false;
	},

	/*
	Method: remove
		Removes a cookie from the browser.

	Syntax:
		>var oldCookie = Cookie.remove(cookie[, options]);

	Arguments:
		cookie  - (string) The name of the cookie to remove or a previously saved Cookie instance.
		options - (object, optional) See <Cookie>.

	Examples:
		Remove a Cookie:
		[javascript]
			Cookie.remove('username'); //Bye-bye JackBauer! Seeya in 24 Hours.
		[/javascript]

		Creating a Cookie and Removing it Right Away:
		[javascript]
			//Cookie.set returns an object with all values need to remove the cookie.
			var myCookie = Cookie.set('username', 'Aaron', {domain: 'mootools.net'});
			if (Cookie.get('username') == 'Aaron') { Cookie.remove(myCookie); }
		[/javascript]
	*/

	remove: function(cookie, options){
		if ($type(cookie) == 'object') this.set(cookie.key, '', $merge(cookie, {duration: -1}));
		else this.set(cookie, '', $merge(options, {duration: -1}));
	}

});

/*
Script: Json.js
	Simple JSON encoder and decoder.

License:
	MIT-style license.
*/

/*
Class: Json
	Simple Json parser and encoder.

See Also:
	<http://www.json.org/>
*/

var Json = new Hash({

	/*
	Method: encode
		Converts an object or array to a JSON string.

	Syntax:
		>var myJson = Json.encode(obj);

	Arguments:
		obj - (object) The object to convert to string.

	Returns:
		(string) A JSON string.

	Example:
		[javascript]
			var fruitsJSON = Json.encode({apple: 'red', lemon: 'yellow'}); // returns: '{"apple":"red","lemon":"yellow"}'
		[/javascript]
	*/

	encode: function(obj){
		switch ($type(obj)){
			case 'string':
				return '"' + obj.replace(/[\x00-\x1f\\"]/g, Json.$replaceChars) + '"';
			case 'array':
				return '[' + String(obj.map(Json.encode).filter($defined)) + ']';
			case 'object': case 'hash':
				var string = [];
				Hash.each(obj, function(value, key){
					var json = Json.encode(value);
					if (json) string.push(Json.encode(key) + ':' + json);
				});
				return '{' + String(string) + '}';
			case 'number': case 'boolean': return String(obj);
			case false: return 'null';
		}
		return null;
	},

	$specialChars: {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'},

	$replaceChars: function(chr){
		return Json.$specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);
	},

	/*
	Method: decode
		Converts a JSON string into an JavaScript object.

	Syntax:
		var object = Json.decode(string[, secure]);

	Arguments:
		string - (string) The string to evaluate.
		secure - (boolean, optional: defaults to false) If set to true, checks for any hazardous syntax and returns null if any found.

	Returns:
		(object) The object represented by the JSON string.

	Example:
		[javascript]
			var myObject = Json.decode('{"apple":"red","lemon":"yellow"}'); //returns: {apple: 'red', lemon: 'yellow'}
		[/javascript]

	Credits:
		JSON test regexp is by Douglas Crockford <http://crockford.org/>.
	*/

	decode: function(string, secure){
		if ($type(string) != 'string' || !string.length) return null;
		if (secure && !(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, ''))) return null;
		return eval('(' + string + ')');
	}

});

Native.implement([Hash, Array, String, Number], {

	toJson: function(){
		return Json.encode(this);
	}

});

/*
Script: Swiff.js
	Contains <Swiff>, <Swiff.getVersion>

Credits:
	Flash detection & Explorer + flash player 9 fix 'borrowed' from SWFObject.

License:
	MIT-style license.
*/

/*
Function: Swiff
	Creates a Flash object with supplied parameters.

Syntax:
	>var mySwiff = new Swiff(path[, options]);

Arguments:
	path    - (string) The path to the swf movie.
	options - (object) an object with options names as keys. See options below.

	options (continued):
		id - (string: defaults to 'Swiff_' + UID) The id of the flash object.
		width - (number: defaults to 1) The width of the flash object.
		height - (number: defaults to 1) The height of the flash object.
		params - (object) SWF object parameters (ie. wmode, bgcolor, allowScriptAccess, loop, etc.)
		properties - (object) Additional attributes for the object element.
		vars - (object) Given to the SWF as querystring in flashVars.
		events - (object) Functions you need to call from the flash movie. Those will be available globally in the movie, and bound to the object.

		params (continued):
			allowScriptAccess - (string: defaults to always) The domain that the SWF object allows access to.
			swLiveConnect - (boolean: defaults to true) the swLiveConnect param to allow remote scripting.
			quality - (string: defaults to high) the render quality of the movie.


Returns:
	(element) A new HTML object element.

Example:
	[javascript]
		var obj = new Swiff('myMovie.swf', {
			id: 'myBeautifulMovie'
			width: 500,
			height: 400,
			params: {
				wmode: 'opaque',
				bgcolor: '#ff3300'
			},
			vars: {
				myVariable: myJsVar,
				myVariableString: 'hello'
			},
			events: {
				onLoad: myOnloadFunc
			}
		});
	[/javascript]

Note:
	Swiff returns the Object tag, but its not extensible by the $ function.
	The $ function on an object/embed tag will only return its reference without further processing.
*/

var Swiff = function(path, options){
	if (!Swiff.fixed) Swiff.fix();
	var instance = 'Swiff_' + Swiff.UID++;
	options = $merge({
		id: instance,
		height: 1,
		width: 1,
		container: null,
		properties: {},
		params: {
			quality: 'high',
			allowScriptAccess: 'always',
			wMode: 'transparent',
			swLiveConnect: true
		},
		events: {},
		vars: {}
	}, options);
	var params = options.params, vars = options.vars, id = options.id;
	var properties = $extend({height: options.height, width: options.width}, options.properties);
	Swiff.Events[instance] = {};
	for (var event in options.events){
		Swiff.Events[instance][event] = function(){
			options.events[event].call($(options.id));
		};
		vars[event] = 'Swiff.Events.' + instance + '.' + event;
	}
	params.flashVars = Hash.toQueryString(vars);
	if (Client.Engine.trident){
		properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
		params.movie = path;
	} else {
		properties.type = 'application/x-shockwave-flash';
		properties.data = path;
	}
	var build = '<object id="' + options.id + '"';
	for (var property in properties) build += ' ' + property + '="' + properties[property] + '"';
	build += '>';
	for (var param in params) build += '<param name="' + param + '" value="' + params[param] + '" />';
	build += '</object>';
	return ($(options.container) || new Element('div')).setHTML(build).firstChild;
};

Element.Builders.swf = function(path, props){
	return new Swiff(path, props);
};

Swiff.extend({

	UID: 0,

	Events: {},

	/*
	Function: Swiff.remote
		Calls an ActionScript function from javascript.

	Syntax:
		>var result = Swiff.remote(obj, fn);

	Arguments:
		obj - (element) A Swiff instance (an HTML object Element).
		fn  - (string) The name of the function to execute in the Flash movie.

	Returns:
		(mixed) The ActionScrip function's result.

	Example:
		[javascript]
			var obj = new Swiff('myMovie.swf');
			alert(Swiff.remote(obj, 'myFlashFn'));
		[/javascript]

	Note:
		The SWF file must be compiled with ExternalInterface component.
	*/

	remote: function(obj, fn){
		var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
		return eval(rs);
	},

	/*
	Function: Swiff.getVersion
		Gets the major version of the flash player installed.

	Syntax:
		>var version = Swiff.getVersion();

	Returns:
		(number) A number representing the (major) flash version installed, or 0 if no player is installed.

	Example:
		[javascript]
			alert(Swiff.getVersion());
		[/javascript]
	*/

	getVersion: function(){
		if (!$defined(Swiff.pluginVersion)){
			var version;
			if (navigator.plugins && navigator.mimeTypes.length){
				version = navigator.plugins["Shockwave Flash"];
				if (version && version.description) version = version.description;
			} else if (Client.Engine.trident){
				version = $try(function(){
					return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");
				});
			}
			Swiff.pluginVersion = ($type(version) == 'string') ? parseInt(version.match(/\d+/)[0]) : 0;
		}
		return Swiff.pluginVersion;
	},

	fix: function(){
		Swiff.fixed = true;
		window.addEvent('beforeunload', function(){
			__flash_unloadHandler = __flash_savedUnloadHandler = $empty;
		});
		if (!Client.Engine.trident) return;
		window.addEvent('unload', function(){
			Array.each(document.getElementsByTagName('object'), function(obj){
				obj.style.display = 'none';
				for (var p in obj){
					if (typeof obj[p] == 'function') obj[p] = $empty;
				}
			});
		});
	}

});

/*
Script: Drag.js
	Contains <Drag>, <Element.makeResizable>

License:
	MIT-style license.

Note:
	This Script requires an XHTML doctype.
*/

/*
Class: Drag
	Enables the modification of two CSS properties of an Element based on the position of the mouse while the mouse button is down.

Syntax:
	>var myDragInstance = new Drag(el[, options]);

Arguments:
	el      - (element) The Element to apply the transformations to.
	options - (object, optional) The options object.

	options (continued):
		handle    - (element: defaults to the element passed in) The Element to act as the handle for the draggable element.
		unit      - (string: defaults to 'px') A string indicating the CSS unit to append to all integer values.
		limit     - (object: defaults to false) An object with x and y properties used to limit the movement of the Element.
		modifiers - (object) An object with x and y properties used to indicate the CSS modifiers (i.e. 'left').
		grid      - (integer: defaults to: false) Distance in px for snap-to-grid dragging.
		snap      - (integer: defaults to 6) The distance to drag before the Element starts to respond to the drag.

		limit (continued):
			x - (array) Start and end limit relative to the 'x' setting of Modifiers.
			y - (array) Start and end limit relative to the 'y' setting of Modifiers.

		modifiers (continued):
			x - (string: defaults to 'left') The style to modify when the mouse moves in an horizontal direction.
			y - (string: defaults to 'top') The style to modify when the mouse moves in a vertical direction.

Events:
	onStart - (function) Executed when the user starts to drag (on mousedown).
		Signature:
			>onStart(element);

		Arguments:
			element - (element) The dragged Element.

	onBeforeStart - (function) Executed before the Drag instance attaches the events.
		Signature:
			>onBeforeStart(element);

		Arguments:
			element - (element) The dragged Element.

	onComplete - (function) Executed when the user completes the drag. Receives the dragged Element.
		Signature:
			>onComplete(element);

		Arguments:
			element - (element) The dragged Element.

	onSnap - (function) Executed when the user has dragged past the snap option.
		Signature:
			>onSnap(element)

		Arguments:
			element - (element) The dragged Element.

	onDrag - (function) Executed at every step of the drag. Receives the dragged Element.
		Signature:
			>onDrag(element)

		Arguments:
			element - (element) The dragged Element.

Properties:
	element - (element) The Element being transformed.
	handle  - (element) The Element acting as the handle for the draggable element.

Returns:
	(class) A new Drag class instance.

Example:
	[javascript]
		var myInstance = new Drag('myDraggable', {
			onStart: function(el){
				this.moved = 0;
				el.addClass('dragging');
			},
			onComplete: function(el){
				el.removeClass('dragging');
				alert('you displaced ' + el.id + ' ' + this.moved + ' pixels');
			},
			onSnap: function(el){
				this.moved++;
			}
			snap: 0
		});
	[/javascript]

See Also:
	<Options.setOptions>, <http://www.w3schools.com/css/css_units.asp>
*/

var Drag = new Class({

	Implements: [Events, Options],

	options: {
		/*onStart: $empty,
		onBeforeStart: $empty,
		onComplete: $empty,
		onSnap: $empty,
		onDrag: $empty,*/
		handle: false,
		unit: 'px',
		limit: false,
		modifiers: {x: 'left', y: 'top'},
		grid: false,
		snap: 6
	},

	initialize: function(){
		var params = Array.link(arguments, {'options': Object.type, 'element': $defined});
		this.element = $(params.element);
		this.document = this.element.ownerDocument;
		this.setOptions(params.options);
		this.handle = $(this.options.handle) || this.element;
		this.mouse = {'now': {}, 'pos': {}};
		this.value = {'start': {}, 'now': {}};
		this.bound = {
			'start': this.start.bind(this),
			'check': this.check.bind(this),
			'drag': this.drag.bind(this),
			'stop': this.stop.bind(this)
		};
		this.attach();
	},

	/*
	Method: attach
		Attaches the mouse listener to the handle.

	Syntax:
		>myDrag.attach();

	Returns:
		(class) This Drag instance.

	Example:
		[javascript]
			var myDrag = new Drag('myElement').detach(); // the element is inert

			$('myActivator').addEvent('click', function(){
				alert('ok now you can drag.');
				myDrag.attach();
			});
		[/javascript]

	See Also:
		<$>, <Element.makeDraggable>, <Drag.detach>, <Element.addEvent>
	*/

	attach: function(){
		this.handle.addEvent('mousedown', this.bound.start);
		return this;
	},

	/*
	Method: detach
		Detaches the mouse listener from the handle.

	Syntax:
		>myDrag.detach();

	Returns:
		(class) This Drag instance.

	Example:
		[javascript]
			var myDrag = new Drag('myElement');
			$('myDeactivator').addEvent('click', function(){
				alert('no more dragging for you mr.');
				myDrag.detach();
			});
		[/javascript]

	See Also:
		<$>, <Element.makeDraggable>, <Element.addEvent>
	*/

	detach: function(){
		this.handle.removeEvent('mousedown', this.bound.start);
		return this;
	},

	start: function(event){
		this.fireEvent('onBeforeStart', this.element);
		this.mouse.start = event.page;
		var limit = this.options.limit;
		this.limit = {'x': [], 'y': []};
		for (var z in this.options.modifiers){
			if (!this.options.modifiers[z]) continue;
			this.value.now[z] = this.element.getStyle(this.options.modifiers[z]).toInt();
			this.mouse.pos[z] = event.page[z] - this.value.now[z];
			if (limit && limit[z]){
				for (var i = 2; i--; i){
					if ($chk(limit[z][i])) this.limit[z][i] = ($type(limit[z][i]) == 'function') ? limit[z][i]() : limit[z][i];
				}
			}
		}
		if ($type(this.options.grid) == 'number') this.options.grid = {'x': this.options.grid, 'y': this.options.grid};
		this.document.addEvents({
			'mousemove': this.bound.check,
			'mouseup': this.bound.stop
		});
		this.fireEvent('onStart', this.element);
		event.stop();
	},

	check: function(event){
		var distance = Math.round(Math.sqrt(Math.pow(event.page.x - this.mouse.start.x, 2) + Math.pow(event.page.y - this.mouse.start.y, 2)));
		if (distance > this.options.snap){
			this.document.removeEvent('mousemove', this.bound.check);
			this.document.addEvent('mousemove', this.bound.drag);
			this.drag(event);
			this.fireEvent('onSnap', this.element);
		}
		event.stop();
	},

	drag: function(event){
		this.out = false;
		this.mouse.now = event.page;
		for (var z in this.options.modifiers){
			if (!this.options.modifiers[z]) continue;
			this.value.now[z] = this.mouse.now[z] - this.mouse.pos[z];
			if (this.limit[z]){
				if ($chk(this.limit[z][1]) && (this.value.now[z] > this.limit[z][1])){
					this.value.now[z] = this.limit[z][1];
					this.out = true;
				} else if ($chk(this.limit[z][0]) && (this.value.now[z] < this.limit[z][0])){
					this.value.now[z] = this.limit[z][0];
					this.out = true;
				}
			}
			if (this.options.grid[z]) this.value.now[z] -= (this.value.now[z] % this.options.grid[z]);
			this.element.setStyle(this.options.modifiers[z], this.value.now[z] + this.options.unit);
		}
		this.fireEvent('onDrag', this.element);
		event.stop();
	},

	/*
	Method: stop
		Stops (removes) all attached events from the Drag instance and executes the onComplete Event.

	Syntax:
		>myDrag.stop();

	Example:
		[javascript]
			var myDrag = new Drag('myElement', {
				onSnap: function(){
					this.moved = this.moved || 0;
					this.moved++;
					if(this.moved > 100) {
						this.stop();
						alert("Stop! You'll make the Element angry.");
					}
				}
			});
		[/javascript]
	*/

	stop: function(){
		this.document.removeEvent('mousemove', this.bound.check);
		this.document.removeEvent('mousemove', this.bound.drag);
		this.document.removeEvent('mouseup', this.bound.stop);
		this.fireEvent('onComplete', this.element);
	}

});

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: makeResizable
		Adds drag-to-resize behaviour to an Element using supplied options.

	Syntax:
		>var myResize = myElement.makeResizable([options]);

	Arguments:
		options - (object, optional) See <Drag> for acceptable options.

	Returns:
		(class) The created Drag instance.

	Example:
		[javascript]
			var myResize = $('myElement').makeResizable({
				onComplete: function(){
					alert('complete');
				}
			});
		[/javascript]

	See Also:
		<Drag>
	*/

	makeResizable: function(options){
		return new Drag(this, $merge({modifiers: {'x': 'width', 'y': 'height'}}, options));
	}

});


/*
Script: Drag.Move.js
	Contains <Drag.Move>, <Element.makeDraggable>

License:
	MIT-style license.

Note:
	Drag.Move requires an XHTML doctype.
*/

/*
Class: Drag.Move
	An extension to the base Drag class with additional functionality for dragging an Element.  Supports snapping and droppables.
	Inherits methods, properties, options and events from <Drag>.

Syntax:
	>var myMove = new Drag.Move(myElement[, options]);

Arguments:
	el - (element) The Element to apply the drag to.
	options - (object, optional) The options object. See below.

	options (continued):
		All the base <Drag> options, in addition to:
		container - (element) If an Element is passed, drag will be limited to the passed Element's size and position.
		droppables - (array) The Elements that the draggable can drop into.
		overflown - (array) Array of nested scrolling containers. See <Element.getPosition>.

		droppables (continued):
			Interaction with droppable work with events fired on the doppable element or, for 'emptydrop', on the dragged element.
			The Events 'over', 'leave' and 'drop' get fired on the droppable element with the dragged element as first argument
			when the dragged element hovers, leaves or get dropped on the droppable.

Properties:
	All the properties in <Drag> in addition to:
	droppables - (element) The Elements that the draggable can drop into.

Example:
	[javascript]
		var droppables = $$('li.placements').addEvents({
			'over': function() {
				this.addClass('overed');
			},
			'leave': function() {
				this.removeClass('overed');
			},
			'drop': function(el) {
				alert(el.id + ' dropped');
			}
		});
		var myMove = new Drag.Move('product-placement', {
			'droppables': droppables
		});
	[/javascript]

Note:
	Drag.move supports either position absolute or relative. If no position is found, absolute will be set.

See Also:
	<Drag>, <$$>, <Element.addEvents>

	Demos:
		Drag.Cart - <http://demos.mootools.net/Drag.Cart>
		Drag.Absolutely - <http://demos.mootools.net/Drag.Absolutely>
		DragDrop - <http://demos.mootools.net/DragDrop>

*/

Drag.Move = new Class({

	Extends: Drag,

	options: {
		droppables: [],
		container: false,
		overflown: []
	},

	initialize: function(element, options){
		arguments.callee.parent(element, options);
		this.droppables = $$(this.options.droppables);
		this.container = $(this.options.container);
		this.positions = ['relative', 'absolute', 'fixed'];
		this.position = {'element': this.element.getStyle('position'), 'container': false};
		if (this.container) this.position.container = this.container.getStyle('position');
		if (!this.positions.contains(this.position.element)) this.position.element = 'absolute';
		var top = this.element.getStyle('top').toInt();
		var left = this.element.getStyle('left').toInt();
		if (this.position.element == 'absolute' && !this.positions.contains(this.position.container)){
			top = $chk(top) ? top : this.element.getTop(this.options.overflown);
			left = $chk(left) ? left : this.element.getLeft(this.options.overflown);
		} else {
			top = $chk(top) ? top : 0;
			left = $chk(left) ? left : 0;
		}
		this.element.setStyles({'top': top, 'left': left, 'position': this.position.element});
	},

	start: function(event){
		if (this.overed){
			this.overed.fireEvent('leave', [this.element, this]);
			this.overed = null;
		}
		if (this.container){
			var cont = this.container.getCoordinates();
			var el = this.element.getCoordinates();
			if (this.position.element == 'absolute' && !this.positions.contains(this.position.container)){
				this.options.limit = {'x': [cont.left, cont.right - el.width], 'y': [cont.top, cont.bottom - el.height]};
			} else {
				this.options.limit = {'y': [0, cont.height - el.height], 'x': [0, cont.width - el.width]};
			}
		}
		arguments.callee.parent(event);
	},

	drag: function(event){
		arguments.callee.parent(event);
		if (this.droppables.length) this.checkDroppables();
	},

	checkDroppables: function(){
		var overed = this.out ? false : this.droppables.filter(this.checkAgainst, this).getLast();
		if (this.overed != overed){
			if (this.overed) this.overed.fireEvent('leave', [this.element, this]);
			this.overed = overed ? overed.fireEvent('over', [this.element, this]) : null;
		}
	},

	checkAgainst: function(el){
		el = el.getCoordinates(this.options.overflown);
		var now = this.mouse.now;
		return (now.x > el.left && now.x < el.right && now.y < el.bottom && now.y > el.top);
	},

	/*
	Method: stop
		Checks if the Element is above a droppable and fires the drop event. Else, fires the 'emptydrop' event that is attached to this Element. Lastly, calls <Drag.stop> method.

	Syntax:
		>myMove.stop();

	Returns:
		(class) This Drag.Move instance.

	Example:
		[javascript]
			var myElement = $('myElement').addEvent('emptydrop', function(){
				alert('no drop occurred');
			});

			var myMove = new Drag.Move(myElement, {
				onSnap: function(){ // due to MooTool's inheritance, all <Drag>'s Events are also available.
					this.moved = this.moved || 0;
					this.moved++;
					if(this.moved > 1000){
						alert("You've gone far enough.");
						this.stop();
					}
				}
			});
		[/javascript]

	See Also:
		<Drag.stop>
	*/

	stop: function(){
		this.checkDroppables();
		if (this.overed && !this.out) this.overed.fireEvent('drop', [this.element, this]);
		else this.element.fireEvent('emptydrop', this);
		arguments.callee.parent();
		return this;
	}

});

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: makeDraggable
		Makes an element draggable with the supplied options.

	Syntax:
		>var myDrag = myElement.makeDraggable([options]);

	Arguments:
		options - (object) See <Drag.Move> and <Drag> for acceptable options.

	Returns:
		(class) A new Drag.Move instance.

	Example:
		[javascript]
			var myDrag = $('myElement').makeDraggable({
				snap: 0,
				onStart: function(){
					this.moved = 0;
				},
				onSnap: function(){
					this.moved++;
				},
				onComplete: function()[
					alert("You'ved moved: " + this.moved + " times");
				}
			});
		[/javascript]

	See Also:
		<Drag.Move>, <Drag>, <Options.setOptions>
	*/

	makeDraggable: function(options){
		return new Drag.Move(this, options);
	}

});

/*
Script: Color.js
	Contains the Color class.

License:
	MIT-style license.
*/

/*
Class: Color
	Creates a new Color Class, which is an array with some color specific methods.

Syntax:
	>var myColor = new Color(color[, type]);

Arguments:
	color - (mixed) A string or an array representation of a color.
	type  - (string, optional) A string representing the type of the color to create.

	color (continued):
		There are three typical representations of color: String, RGB, and HSB. For String representation see <Element.setStyle> for more information.

		Examples:
			String Representation:
			[javascript]
				'#fff'
				//or
				'#ffffff'
			[/javascript]

			RGB and HSB Representation:
			[javascript]
				[255, 255, 255]
				//or
				[255, 255, 255, 1] // for the transparency
			[javascript]

Returns:
	(array) A new Color instance.

Example:
	[javascript]
		var black = new Color('#000');
		var purple = new Color([255,0,255]);
	[/javascript]

Note:
	For HSB colors, you need to specify the second argument.
*/

var Color = new Class({

	initialize: function(color, type){
		type = type || (color.push ? 'rgb' : 'hex');
		var rgb, hsb;
		switch (type){
			case 'rgb':
				rgb = color;
				hsb = rgb.rgbToHsb();
				break;
			case 'hsb':
				rgb = color.hsbToRgb();
				hsb = color;
				break;
			default:
				rgb = color.hexToRgb(true);
				hsb = rgb.rgbToHsb();
		}
		rgb.hsb = hsb;
		rgb.hex = rgb.rgbToHex();
		return $extend(rgb, this);
	},

	/*
	Method: mix
		Mixes two or more colors with the Color.

	Syntax:
		>var myMix = myColor.mix(color[, color2[, color3[, ...][, alpha]);

	Arguments:
		color - (mixed) A single or many colors, in hex or rgb representation, to mix with this Color.
		alpha - (number, optional) If the last argument is a number, it will be treated as the amount of the color to mix.

	Returns:
		(array) A new Color instance.

	Example:
		[javascript]
			// mix black with white and purple, each time at 10% of the new color
			var darkpurple = new Color('#000').mix('#fff', [255, 0, 255], 10);

			$('myDiv').setStyle('background-color', darkpurple);
		[/javascript]
	*/

	mix: function(){
		var colors = $A(arguments);
		var alpha = ($type(colors.getLast()) == 'number') ? colors.pop() : 50;
		var rgb = this.slice();
		colors.each(function(color){
			color = new Color(color);
			for (var i = 0; i < 3; i++) rgb[i] = Math.round((rgb[i] / 100 * (100 - alpha)) + (color[i] / 100 * alpha));
		});
		return new Color(rgb, 'rgb');
	},

	/*
	Method: invert
		Inverts the Color.

	Syntax:
		>var myInvert = myColor.invert();

	Returns:
		(array) A new Color instance.

	Example:
		[javascript]
			var white = new Color('#fff');
			var black = white.invert();
		[/javascript]
	*/

	invert: function(){
		return new Color(this.map(function(value){
			return 255 - value;
		}));
	},

	/*
	Method: setHue
		Modifies the hue of the Color, and returns a new one.

	Syntax:
		>var hue = myColor.setHue(value);

	Arguments:
		value - (number) The hue to set.

	Returns:
		(array) A new Color instance.

	Example:
		[javascript]
			var myColor = new Color('#f00');
			var myElement = $('myElement');

			(function(){
				myElement.setStyle('color', myColor.setHue(myColor.hsb[0]++)));
			}).periodical(250);
		[/javascript]
	*/

	setHue: function(value){
		return new Color([value, this.hsb[1], this.hsb[2]], 'hsb');
	},

	/*
	Method: setSaturation
		Changes the saturation of the Color, and returns a new one.

	Syntax:
		>var saturate = myColor.setSaturation(percent);

	Arguments:
		percent - (number) The percentage of the saturation to set.

	Returns:
		(array) A new Color instance.

	Example:
		[javascript]
			var myColor = new Color('#f00');
			$('myElement').addEvent('mouseenter', function(){
				this.setStyle('background-color', myColor.setSaturation(myColor.hsb[1]++));
			});
		[/javascript]
	*/

	setSaturation: function(percent){
		return new Color([this.hsb[0], percent, this.hsb[2]], 'hsb');
	},

	/*
	Method: setBrightness
		Changes the brightness of the Color, and returns a new one.

	Syntax:
		>var brighten = myColor.setBrightness(percent);

	Arguments:
		percent - (number) The percentage of the brightness to set.

	Returns:
		(array) A new Color instance.

	Example:
		[javascript]
			var myColor = new Color('#000');
			$('myElement').addEvent('mouseenter', function(){
				this.setStyle('background-color', myColor.setBrightness(myColor.hsb[2]++));
			});
		[/javascript]
	*/

	setBrightness: function(percent){
		return new Color([this.hsb[0], this.hsb[1], percent], 'hsb');
	}

});

/*
Function: $RGB
	Shortcut to create a new color, based on red, green, blue values.

Syntax:
	>var myColor = $RGB(r, g, b);

Arguments:
	r - (number) A red value from 0 to 255.
	g - (number) A green value from 0 to 255.
	b - (number) A blue value from 0 to 255.

Returns:
	(array) A new Color instance.

Example:
	[javascript]
		var myColor = $RGB($random(0,255), $random(0,255), $random(0,255));
	[/javascript]
*/

function $RGB(r, g, b){
	return new Color([r, g, b], 'rgb');
};

/*
Function: $HSB
	Shortcut to create a new color, based on: hue, saturation, brightness values.

Syntax:
	>var myColor = $HSB(h, s, b);

Arguments:
	h - (number) A hue value from 0 to 359.
	s - (number) A saturation value from 0 to 100.
	b - (number) A brightness value from 0 to 100.

Returns:
	(array) A new Color instance.

Example:
	[javascript]
		var myColor = $HSB(50, 50, 100);
	[/javascript]
*/

function $HSB(h, s, b){
	return new Color([h, s, b], 'hsb');
};

/*
Native: Array
	A collection of the Array Object prototype methods.
	For more information on the JavaScript Array Object see <http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array>.
*/

Array.implement({

	/*
	Method: rgbToHsb
		Converts a RGB array to an HSB array.

	Syntax:
		>var myHSB = myRGBArray.rgbToHsb();

	Returns:
		(array) An array with HSB values.

	Example:
		[javascript]
			var myHSB = [255, 0, 0].rgbToHsb(); //myHSB = [0, 100, 100]
		[/javascript]
	*/

	rgbToHsb: function(){
		var red = this[0], green = this[1], blue = this[2];
		var hue, saturation, brightness;
		var max = Math.max(red, green, blue), min = Math.min(red, green, blue);
		var delta = max - min;
		brightness = max / 255;
		saturation = (max != 0) ? delta / max : 0;
		if (saturation == 0){
			hue = 0;
		} else {
			var rr = (max - red) / delta;
			var gr = (max - green) / delta;
			var br = (max - blue) / delta;
			if (red == max) hue = br - gr;
			else if (green == max) hue = 2 + rr - br;
			else hue = 4 + gr - rr;
			hue /= 6;
			if (hue < 0) hue++;
		}
		return [Math.round(hue * 360), Math.round(saturation * 100), Math.round(brightness * 100)];
	},

	/*
	Method: rgbToHsb
		Converts a HSB array to an RGB array.

	Syntax:
		>var myRGB = myHSBArray.hsbToRgb();

	Returns:
		(array) An array with RGB values.

	Example:
		[javascript]
			var myRGB = [0, 100, 100].hsbToRgb(); //myRGB = [255, 0, 0]
		[/javascript]
	*/

	hsbToRgb: function(){
		var br = Math.round(this[2] / 100 * 255);
		if (this[1] == 0){
			return [br, br, br];
		} else {
			var hue = this[0] % 360;
			var f = hue % 60;
			var p = Math.round((this[2] * (100 - this[1])) / 10000 * 255);
			var q = Math.round((this[2] * (6000 - this[1] * f)) / 600000 * 255);
			var t = Math.round((this[2] * (6000 - this[1] * (60 - f))) / 600000 * 255);
			switch (Math.floor(hue / 60)){
				case 0: return [br, t, p];
				case 1: return [q, br, p];
				case 2: return [p, br, t];
				case 3: return [p, q, br];
				case 4: return [t, p, br];
				case 5: return [br, p, q];
			}
		}
		return false;
	}

});


/*
Script: Group.js
	A "Utility" Class.

License:
	MIT-style license.
*/

/*
Class: Group
	For Grouping Classes or Elements Events. The Event added to the Group will fire when all of the events of the items of the group are fired.

Syntax:
	var myGroup = new Group(class[, arrays[, class2[, ... ]]]);

Arguments:
	Any number of Class instances, or arrays containing class instances.

Returns:
	(class) A new Group instance.

Example:
	[javascript]
		var xhr1 = new Ajax('data.js', {evalScript: true});
		var xhr2 = new Ajax('abstraction.js', {evalScript: true});
		var xhr3 = new Ajax('template.js', {evalScript: true});

		var group = new Group(xhr1, xhr2, xhr3);
		group.addEvent('onComplete', function(){
			alert('All Scripts loaded');
		});

		xhr1.request();
		xhr2.request();
		xhr3.request();
	[/javascript]
*/

var Group = new Class({

	initialize: function(){
		this.instances = [];
		Array.each(arguments, function(argument){
			this.instances = this.instances.concat(argument);
		}, this);
		this.events = {};
		this.checker = {};
	},

	/*
	Method: addEvent
		Adds an event to the stack of events of the Class instances.

	Syntax:
		>myGroup.addEvent(type, fn);

	Arguments:
		type - (string) The event name (e.g. 'onComplete') to add.
		fn   - (function) The callback function to execute when all instances fired this event.

	Returns:
		(class) This Group instance.

	Example:
		[javascript]
			var myElements = $('myForm').getFormElements();
			myElements.addEvent('click', function(){
				alert('an individual click');
			});

			var myGroup = new Group(myElements);
			myGroup.addEvent('click', function(){
				alert('all form elements clicked');
			});
		[/javascript]

	See Also:
		<Element.addEvent>
	*/

	addEvent: function(type, fn){
		this.checker[type] = this.checker[type] || {};
		this.events[type] = this.events[type] || [];
		if (this.events[type].contains(fn)) return false;
		else this.events[type].push(fn);
		this.instances.each(function(instance, i){
			instance.addEvent(type, this.check.bind(this, [type, instance, i]));
		}, this);
		return this;
	},

	check: function(type, instance, i){
		this.checker[type][i] = true;
		var every = this.instances.every(function(current, j){
			return this.checker[type][j] || false;
		}, this);
		if (!every) return;
		this.checker[type] = {};
		this.events[type].each(function(event){
			event.call(this, this.instances, instance);
		}, this);
	}

});

/*
Script: Assets.js
	Contains the <Asset> class, which provides methods to dynamically load JavaScript, CSS, and image files into the document.

License:
	MIT-style license.
*/

/*
Hash: Asset
	Provides methods for the dynamic loading and management of JavaScript, CSS, and image files.
*/

var Asset = new Hash({

	/*
	Method: javascript
		Injects a script tag into the head section of the document, pointing to the src specified.

	Syntax:
		>var myScript = Asset.javascript(source[, properties]);

	Arguments:
		source     - (string) The location of the JavaScript file to load.
		properties - (object, optional) Additional attributes to be included into the script Element (see <Element.setProperties>).

	Returns:
		(element) A new script Element.

	Example:
		[javascript]
			var myScript = new Asset.javascript('/scripts/myScript.js', {id: 'myScript'});
		[/javascript]
	*/

	javascript: function(source, properties){
		properties = $merge({
			'onload': $empty
		}, properties);
		var script = new Element('script', {'src': source, 'type': 'text/javascript'}).addEvents({
			'load': properties.onload,
			'readystatechange': function(){
				if (this.readyState == 'complete') this.fireEvent('load');
			}
		});
		delete properties.onload;
		return script.setProperties(properties).inject(document.head);
	},

	/*
	Method: css
		Injects a css file in the page.

	Syntax:
		>var myCSS = new Asset.css(source[, properties]);

	Arguments:
		source     - (string) The path of the CSS file.
		properties - (object) Some additional attributes you might want to add to the link Element.

	Returns:
		(element) A new link Element.

	Example:
		[javascript]
			var myCSS = new Asset.css('/css/myStyle.css', {id: 'myStyle', title: 'myStyle'});
		[/javascript]
	*/

	css: function(source, properties){
		return new Element('link', $merge({
			'rel': 'stylesheet', 'media': 'screen', 'type': 'text/css', 'href': source
		}, properties)).inject(document.head);
	},

	/*
	Method: image
		Preloads an image and returns the img element.

	Syntax:
		>var myImage = new Asset.image(source[, properties]);

	Arguments:
		source     - (string) The path of the image file.
		properties - (object) Some additional attributes you might want to add to the img Element including the onload/onerror/onabout events.

	Returns:
		(element) A new HTML img Element.

	Example:
		[javascript]
			var myImage = new Asset.image('/images/myImage.png', {id: 'myImage', title: 'myImage', onload: myFunction});
		[/javascript]

	Note:
		- Does not inject the image into the page.
		- DO NOT use addEvent for load/error/abort on the returned element, give them as onload/onerror/onabort in the properties argument.
	*/

	image: function(source, properties){
		properties = $merge({
			'onload': $empty,
			'onabort': $empty,
			'onerror': $empty
		}, properties);
		var image = new Image();
		var element = $(image) || new Element('img');
		['load', 'abort', 'error'].each(function(name){
			var type = 'on' + name;
			var event = properties[type];
			delete properties[type];
			image[type] = function(){
				if (!image) return;
				if (!element.parentNode){
					element.width = image.width;
					element.height = image.height;
				}
				image = image.onload = image.onabort = image.onerror = null;
				event.delay(1, element, element);
				element.fireEvent(name, element, 1);
			};
		});
		image.src = element.src = source;
		if (image && image.complete) image.onload.delay(1);
		return element.setProperties(properties);
	},

	/*
	Method: images
		Preloads an array of images (as strings) and returns an array of img elements. does not inject them to the page.

	Syntax:
		>var myImages = new Asset.images(source[, options]);

	Arguments:
		sources - (mixed) An array or a string, of the paths of the image files.
		options - (object, optional) See below.

		options (continued):
			onComplete - (function) Executes when all image files are loaded.
				Signature:
					>onComplete()

			onProgress - (function) Executes when one image file is loaded.
				Signature:
					>onProgress(counter, index)

				Arguments:
					counter - (number) The number of loaded images.
					index   - (number) The index of the loaded image.

	Returns:
		(array) An <Elements> collection.

	Example:
		[javascript]
			var myImages = new Asset.images(['/images/myImage.png', '/images/myImage2.gif'], {
				onComplete: function(){
					alert('All images loaded!');
				}
			});
		[/javascript]
	*/

	images: function(sources, options){
		options = $merge({
			onComplete: $empty,
			onProgress: $empty
		}, options);
		if (!sources.push) sources = [sources];
		var images = [];
		var counter = 0;
		sources.each(function(source){
			var img = new Asset.image(source, {
				'onload': function(){
					options.onProgress.call(this, counter, sources.indexOf(source));
					counter++;
					if (counter == sources.length) options.onComplete();
				}
			});
			images.push(img);
		});
		return new Elements(images);
	}

});

/*
Script: Fx.Morph.js
	Contains <Fx.Morph>.

License:
	MIT-style license.
*/

/*
Class: Fx.Morph
	Smoothly Morph the Element reflecting the properties of a specified class name defined in anywhere in the CSS.

Extends:
	<Fx.Styles>

Syntax:
	>var myFx = new Fx.Morph(el[, options]);

Arguments:
	el      - (mixed) A string ID of the Element or an Element to apply the style transitions to.
	options - (object, optional) The <Fx> options object.

Returns:
	(class) A new Fx.Morph class instance.

Example:
	[javascript]
		var myMorph = new Fx.Morph('myElement', {duration: 1000, transition: Fx.Transitions.Sine.easeOut});
		myMorph.start('myClassName');
	[/javascript]

Notes:
	- This is still experimental.
	- It only works with 'transitionable' properties.
	- The className will NOT be added onComplete.
	- This Effect is intended to work only with properties found in external styesheet. For custom properties see <Fx.Styles>

See Also:
	<http://www.w3.org/TR/CSS21/propidx.html>, <Fx.Styles>
*/

Fx.Morph = new Class({

	Extends: Fx.Styles,

	/*
	Method: start
		Executes a transition to the current properties of the specified className.

	Syntax:
		>myFx.start(className);

	Arguments:
		className - (string) The string of the CSS class to match.

	Returns:
		(class) This Fx.Morph class instance.

	Example:
		[javascript]
			var myFx = new Fx.Morph('myElement').start('.myClass');
		[/javascript]
	*/

	start: function(className){
		var to = {};
		Array.each(document.styleSheets, function(sheet, j){
			var rules = sheet.rules || sheet.cssRules;
			Array.each(rules, function(rule, i){
				if (!rule.selectorText.test('\.' + className + '$') || !rule.style) return;
				for (var style in Element.Styles.All){
					if (rule.style[style]){
						var ruleStyle = rule.style[style];
						to[style] = (style.test(/color/i) && ruleStyle.test(/^rgb/)) ? ruleStyle.rgbToHex() : ruleStyle;
					}
				}
			});
		});
		return arguments.callee.parent(to);
	}

});

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.implement({

	/*
	Method: morph
		Transform this Element to the CSS properties as defined by the className.

	Syntax:
		>myElement.morph(className[, options]);

	Arguments:
		className - (string) The string of the CSS class to match.
		options   - (object, optional) The <Fx> options object.

	Returns:
		(class) A Fx.Morph instance.

	Example:
		[javascript]
			var myFx = $('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Pow.easeOut,
				onStart: function(){
					alert("It's morphing time!");
				},
				onComplete: function(){
					alert("Go Power Mooers! Go!");
				}
			}).morph('.myClass');
		[/javascript]
	*/

	morph: function(className, options){
		var morph = this.$attributes.morph;
		if (!morph) this.$attributes.morph = new Fx.Morph(this, {wait: false});
		if (options) morph.setOptions(options);
		return morph.start(className);
	}

});

/*
Script: Fx.Elements.js
	Contains <Fx.Elements>

License:
	MIT-style license.
*/

/*
Class: Fx.Elements
	Fx.Elements allows you to apply any number of styles transitions to a collection of Elements.

Extends:
	<Fx>

Syntax:
	>myFx = new Fx.Elements(elements[, options]);

Arguments:
	elements - (array) A collection of Elements the effects will be applied to.
	options  - (object, optional) Same as <Fx> options.

Properties:
	elements - (array) The collection of Elements the effect is being applied to.

Returns:
	(class) A new Fx.Elements instance.

Example:
	[javascript]
		var myFx = new Fx.Elements($$('.myElementClass'), {
			onComplete: function(){
				alert('complete');
			}
		}).start({
			'0': {
				'height': [200, 300],
				'opacity': [0,1]
			},
			'1': {
				'width': [200, 300],
				'opacity': [1,0]
			}
		});
	[/javascript]

Note:
	Includes colors but must be in hex format.
*/


Fx.Elements = new Class({

	Extends: Fx,

	initialize: function(elements, options){
		arguments.callee.parent(elements, options);
		this.elements = $$(this.element);
	},

	setNow: function(){
		for (var i in this.from){
			var iFrom = this.from[i], iTo = this.to[i], iNow = this.now[i] = {};
			for (var p in iFrom) iNow[p] = Fx.CSS.compute(iFrom[p], iTo[p], this);
		}
	},

	/*
	Method: set
		Applies the passed in style transitions to each object named immediately (see example).

	Syntax:
		>myFx.set(to);

	Arguments:
		to - (object) An object where each item in the collection is refered to as a numerical string ("1" for instance). The first item is "0", the second "1", etc.

	Returns:
		(class) This Fx.Elements instance.

	Example:
		[javascript]
			var myFx = new Fx.Elements($$('.myClass')).set({
				'0': {
					'height': 200,
					'opacity': 0
				},
				'1': {
					'width': 300,
					'opacity': 1
				}
			});
		[/javascript]
	*/

	set: function(to){
		var parsed = {};
		this.css = {};
		for (var i in to){
			var iTo = to[i], iParsed = parsed[i] = {};
			for (var p in iTo) iParsed[p] = Fx.CSS.set(iTo[p]);
		}
		return arguments.callee.parent(parsed);
	},

	/*
	Method: start
		Applies the passed in style transitions to each object named (see example).

	Syntax:
		>myFx.start(obj);

	Arguments:
		obj - (object) An object where each item in the collection is refered to as a numerical string ("1" for instance). The first item is "0", the second "1", etc.

	Returns:
		(class) This Fx.Elements instance.

	Example:
		[javascript]
			var myElementsEffects = new Fx.Elements($$('a'));
			myElementsEffects.start({
				'0': { //let's change the first element's opacity and width
					'opacity': [0,1],
					'width': [100,200]
				},
				'4': { //and the fifth one's opacity
					'opacity': [0.2, 0.5]
				}
			});
		[/javascript]
	*/

	start: function(obj){
		if (this.timer && this.options.wait) return this;
		this.now = {};
		this.css = {};
		var from = {}, to = {};
		for (var i in obj){
			var iProps = obj[i], iFrom = from[i] = {}, iTo = to[i] = {};
			for (var p in iProps){
				var parsed = Fx.CSS.prepare(this.elements[i], p, iProps[p]);
				iFrom[p] = parsed.from;
				iTo[p] = parsed.to;
			}
		}
		return arguments.callee.parent(from, to);
	},

	increase: function(){
		for (var i in this.now){
			var iNow = this.now[i];
			for (var p in iNow) this.elements[i].setStyle(p, Fx.CSS.serve(iNow[p], this.options.unit));
		}
	}

});

/*
Script: Selectors.Children.js
	custom :children() pseudo selecor

License:
	MIT-style license.
*/

/*
Selector: children
	A custom Pseudo Selector for selecting ranges, and to access the children Elements with zero-based indexing.

Usage:
	Index Accessor:
		>':children(n)'

		Variables:
			n - (number) An index number to access from the Element's children. The index, n, can be negative to access from the end of the children list.

		Examples:
			[html]
				<ul id="myID">
					<li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>
				</ul>
			[/html]
			[javascript]
				$$('#myID:children(2)')[0].innerHTML //returns 2
			[/javascript]

			[javascript]
				$$('#myID:children(-3)')[0].innerHTML //returns 3
			[/javascript]

	Range:
		>':children(from:to)'

		Variables:
			from - (number) A starting index value. See the Index Accessor usage.
			to   - (number) A ending index value.

		Examples:
			[html]
				<ul id="myID">
					<li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>
				</ul>
			[/html]

			[javascript]
				$$('#myID:children(2:4)').map(function(){ return this.innerHTML }); //returns [2,3,4]
			[/javascript]

			[javascript]
				$$('#myID:children(-2:4)').map(function(){ return this.innerHTML }); //returns [4]
			[/javascript]

			[javascript]
				$$('#myID:children(0:-3)').map(function(){ return this.innerHTML }); //returns [0,1,2,3]
			[/javascript]

	n-Right-of Operation:
		>':children(start+n)'

		Variables:
			start - (number) A starting index value. See the Index Accessor usage.
			n     - (number) The number of Elements to the right of the starting Element. The number of Elements, n, may not be negative, however, in this usage.

		Examples:
			[html]
				<ul id="myID">
					<li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>
				</ul>
			[/html]

			[javascript]
				$$('#myID:children(2+2)').map(function(){ return this.innerHTML }); //returns [2,3,4]
			[/javascript]

			[javascript]
				$$('#myID:children(2+4))').map(function(){ return this.innerHTML }); //returns [0,2,3,4,5]
			[/javascript]

			[javascript]
				$$('#myID:children(-1+3))').map(function(){ return this.innerHTML }); //returns [0,1,2,5]
			[/javascript]

	n-Left-of Operation:
		>':children(start-n)'

		Variables:
			start - (number) A starting index value. See the Index Accessor usage.
			n     - (number) The number of Elements to the left of the starting Element. The number of Elements, n, may not be negative, however, in this usage.

		Examples:
			[html]
				<ul id="myID">
					<li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>
				</ul>
			[/html]

			[javascript]
				$$('#myID:children(2-2)').map(function(){ return this.innerHTML }); //returns [0,1,2]
			[/javascript]

			[javascript]
				$$('#myID:children(2-4))').map(function(){ return this.innerHTML }); //returns [0,1,2,4,5]
			[/javascript]

			[javascript]
				$$('#myID:children(-1-3))').map(function(){ return this.innerHTML }); //returns [2,3,4,5]
			[/javascript]

Note:
	- The n-right-of and the n-left-of usaged will "wrap" until the 'n' number of Elements have been matched.
	- All "range" results will be ordered from least to greatest (relative to their indexes).`
*/

Selectors.Pseudo.children = {

	parser: function(argument){
		argument = (argument) ? argument.match(/^([-+]?\d*)?([\-+:])?([-+]?\d*)?$/) : [null, 0, false, 0];
		if (!argument) return false;
		argument[1] = parseInt(argument[1]) || 0;
		var int1 = parseInt(argument[3]);
		argument[3] = ($chk(int1)) ? int1 : 0;
		switch (argument[2]){
			case '-': case '+': case ':': return {'a': argument[1], 'b': argument[3], 'special': argument[2]};
			default: return {'a': argument[1], 'b': 0, 'special': 'index'};
		}
	},

	xpath: function(argument){
		var include = '';
		var len = 'count(../child::*)';
		var a = argument.a + ' + ' + ((argument.a < 0) ? len : 0);
		var b = argument.b + ' + ' + ((argument.b < 0) ? len : 0);
		var pos = 'position()';
		switch (argument.special){
			case '-':
				b = '((' + a + ' - ' + b + ') mod (' + len + '))';
				a += ' + 1';
				b += ' + 1';
				include = '(' + b + ' < 1 and (' + pos + ' <= ' + a + ' or ' + pos + ' >= (' + b + ' + ' + len + ')' + ')) or (' + pos + ' <= ' + a + ' and ' + pos + ' >= ' + b + ')';
			break;
			case '+': b = '((' + a + ' + ' + b + ') mod ( ' + len + '))';
			case ':':
				a += ' + 1';
				b += ' + 1';
				include = '(' + b + ' < ' + a + ' and (' + pos + ' >= ' + a + ' or ' + pos + ' <= ' + b + ')) or (' + pos + ' >= ' + a + ' and ' + pos + ' <= ' + b + ')';
			break;
			default: include = (a + ' + 1');
		}
		return '[' + include + ']';
	},

	filter: function(el, argument, i, all){
		var include = false;
		var len = all.length;
		var a = argument.a + ((argument.a < 0) ? len : 0);
		var b = argument.b + ((argument.b < 0) ? len : 0);
		switch (argument.special){
			case '-':
				b = (a - b) % len;
				include = (b < 0) ? (i <= (a - 1) || i >= (b + len)) : (i <= a && i >= b);
			break;
			case '+': b = (b + a) % len;
			case ':': include = (b < a) ? (i >= a || i <= b) : (i >= a && i <= b); break;
			default: include = (all[a] == el);
		}
		return include;
	}
};

/*
Script: Hash.Cookie.js
	Stores and loads a Hash as a Cookie using JSON format.

License:
	MIT-style license.
*/

/*
Class: Hash.Cookie
	Stores and loads a Hash as a Cookie using JSON format.

Extends:
	<Hash>

Syntax:
	>var myHashCookie = new Hash.Cookie(name[, options]);

Arguments:
	name    - (string) The key (name) for the cookie
	options - (object) All of <Cookie> options in addition an autoSave option.

	options (continued):
		autoSave - (boolean: defaults to true) An option to save the cookie at every operation.

Returns:
	(class) A new Hash.Cookie instance.

Example:
	[javascript]
		var fruits = new Hash.Cookie('myCookieName', {duration: 3600});
		fruits.extend({
			'lemon': 'yellow',
			'apple': 'red'
		});
		fruits.set('melon', 'green');
		fruits.get('lemon'); // yellow

		// ... on another page ... values load automatically

		var fruits = new Hash.Cookie('myCookieName', {duration: 365});
		fruits.get('melon'); // green

		fruits.erase(); // delete cookie
	[/javascript]

Note:
	- All Hash methods are available in your Hash.Cookie instance. if autoSave options is set, every method call will result in your Cookie being saved.
	- Cookies have a limit of 4kb (4096 bytes). Therefore, be careful with your Hash size.
	- All Hash methods used on Hash.Cookie return the return value of the Hash method, unless you exceeded the Cookie size limit. In that case the result will be false.
	- If you plan to use large Cookies consider turning autoSave to off, and check the status of .save() everytime.
	- Creating a new instance automatically loads the data from the Cookie into the Hash. Cool Huh?

See Also:
	<Hash>
*/

Hash.Cookie = new Class({

	Implements: Options,

	options: {
		autoSave: true
	},

	initialize: function(name, options){
		this.name = name;
		this.setOptions(options);
		this.load();
	},

	/*
	Method: save
		Saves the Hash to the cookie. If the hash is empty, removes the cookie.

	Syntax:
		>myHashCookie.save();

	Returns:
		(boolean) Returns false when the JSON string cookie is too long (4kb), otherwise true.

	Example:
		[javascript]
			var login = new Hash.Cookie('userstatus', {autoSave: false});

			login.extend({
				'username': 'John',
				'credentials': [4, 7, 9]
			});
			login.set('last_message', 'User logged in!');

			login.save(); // finally save the Hash
		[/javascript]
	*/

	save: function(){
		var str = Json.encode(this.hash);
		if (str.length > 4096) return false; //cookie would be truncated!
		Cookie.set(this.name, str, this.options);
		return true;
	},

	/*
	Method: load
		Loads the cookie and assigns it to the Hash.

	Syntax:
		>myHashCookie.load();

	Returns:
		(class) This Hash.Cookie instance.

	Example:
		[javascript]
			var myHashCookie = new Hash.Cookie('myCookie');

			(function(){
				myHashCookie.load();
				if(!myHashCookie.length) alert('Cookie Monster must of eaten it!');
			}).periodical(5000);
		[/javascript]

	Note:
		Useful when polling.
	*/

	load: function(){
		this.hash = new Hash(Json.decode(Cookie.get(this.name), true));
	}

});

(function(){
	var methods = {};
	Hash.getKeys(Hash.prototype).each(function(method){
		methods[method] = function(){
			var value = Hash.prototype[method].apply(this.hash, arguments);
			if (this.options.autoSave) this.save();
			return value;
		};
	});
	Hash.Cookie.implement(methods);
})();

/*
Script: Json.Remote.js
	Contains <Json.Remote>.

License:
	MIT-style license.
*/

/*
Class: Json.Remote
	Wrapped XHR with automated sending and receiving of Javascript Objects in JSON Format.

Extends:
	<XHR>

Syntax:
	>var myJsonRemote = new Json.Remote(url[, options]);

Arguments:
	url     - (string) The URL to send the object to.
	options - (object, optional) See below.

	options (continued):
		varName - (string: defaults to 'json') The name for the variable that holds the Json data. Set it to null to send raw data.
		secure  - (boolean: defaults to true) If set to true, a syntax check will be done on the result JSON (see <Json.decode>).

Events:
	onComplete - (function) Executes when the Json returns successfully.
		Signature:
			>onComplete(responseJson)

		Arguments:
			responseJson - (mixed) The JSON response object from the remote request.

Returns:
	(class) A new Json.Remote class instance.

Example:
	[javascript]
		//This code will send user information based on name/last name:
		var jsonRequest = new Json.Remote("http://site.com/tellMeAge.php", {onComplete: function(person){
			alert(person.age); //is 25 years
			alert(person.height); //is 170 cm
			alert(person.weight); //is 120 kg
		}}).send({'name': 'John', 'lastName': 'Doe'});
	[/javascript]
*/

Json.Remote = new Class({

	Extends: XHR,

	options: {
		varName: 'json',
		secure: true
	},

	initialize: function(url, options){
		arguments.callee.parent(url, options);
		this.addEvent('onSuccess', this.onComplete, true);
		this.setHeader('Accept', 'application/json');
		this.setHeader('X-Request', 'JSON');
	},

	/*
	Method: send
		Sends the JSON-encoded object to the request URL.

	Syntax:
		>myJsonRemote.send(obj);

	Arguments:
		obj - (object) The JavaScript object to be encoded and sent.

	Returns:
		(class) This Json.Remote instance.

	Example:
		[javascript]
			jsonRequest.send({'name': 'John', 'age': 25});
		[/javascript]
	*/

	send: function(obj){
		return arguments.callee.parent(this.url, $defined(obj) ? ((this.options.varName) ? this.options.varName + '=' : '') + encodeURIComponent(Json.encode(obj)) : null);
	},

	onComplete: function(text){
		this.response.json = Json.decode(text, this.options.secure);
		this.fireEvent('onComplete', [this.response.json]);
	}

});


/*
Script: Sortables.js
	Contains <Sortables> Class.

License:
	MIT-style license.
*/

/*
Class: Sortables
	Creates an interface for drag and drop sorting of a list or lists.

Implements:
	<Events>, <Options>

Syntax:
	>var mySortables = new Sortables(list[, options]);

Arguments:
	list    - (mixed) The list or lists that will be sortable.
	options - (object) An object to customize this Sortable's instance.

	list (continued):
		This argument can be an Element, or an array of Elements. When a single list (or ID) is passed, that list will be sortable only with itself.
		To enable sorting between lists, one or more lists or id's must be passed using an array or an object. See Example below.

	options (continued):
		constrain - (boolean: defaults to false) Whether or not to constrain the element being dragged to its parent element.
		clone     - (boolean: defaults to true) Whether or not to display a copy of the actual element while dragging.
		opacity   - (number: defaults to 0.7) Opacity of the element being dragged for sorting.
		handle    - (mixed: defaults to false) A Selector which can be used to select the element inside each item. The matched element will be used as a handle for sorting that item. If no match is found, the element is used as its own handle.
		revert    - (mixed: defaults to false) Whether or not to use an effect to slide the element into its final location after sorting. If you pass an object it will be used as additional options for the revert effect.

Events:
	onStart - (function) Fires when the item starts dragging.
		Signature:
			>onStart(element)

		Arguments:
			element - (element) The current Element being dragged.

	onComplete - (function) Fires when the item ends dragging.
		Signature:
			>onComplete(element)

		Arguments:
			element - (element) The Element that had been dragged.

Properties:
	idle - (boolean) The state of the interaction; true if the user is sorting.

Examples:
	A Simple Sortables:
	[javascript]
		var mySortables = new Sortables('list-1', {
			revert: { duration: 500, transition: Fx.Transitions.Elastic.easeOut }
		});
	[/javascript]

	Sorting Between Lists:
	[javascript]
		//creates a new Sortable instance allowing sorting between the lists with id's 'list-1', 'list-2, and 'list-3'
		var mySortables = new Sortables(['list-1', 'list-2', 'list-3']);
	[/javascript]

	A Sortables with Options:
	[javascript]
		//creates a new Sortable instance over the list with id 'list-1' with some extra options for the revert effect
		var mySortables = new Sortables(['list-1', 'list-2'], {
			constrain: true,
			clone: false,
			revert: true
		});
		//creates a new Sortable instance allowing the sorting of the lists with id's 'list-1' and 'list-2' with extra options
		//since constrain was set to false, the items will not be able to be dragged from one list to the other
	[/javascript]
*/

var Sortables = new Class({

	Implements: [Events, Options],

	options: {
		constrain: false,
		clone: true,
		opacity: 0.7,
		handle: false,
		revert: false,
		onStart: $empty,
		onComplete: $empty
	},

	initialize: function(lists, options){
		this.setOptions(options);
		this.idle = true;
		this.hovering = false;
		this.newInsert = false;
		this.bound = {
			start: [],
			end: this.end.bind(this),
			move: this.move.bind(this),
			reset: this.reset.bind(this)
		};
		if (this.options.revert){
			var revertOptions = $merge({duration: 250, wait: false}, this.options.revert);
			this.effect = new Fx.Styles(null, revertOptions).addEvent('onComplete', this.bound.reset, true);
		}
		this.cloneContents = !!(this.options.clone);

		this.lists = $$($(lists) || lists);

		this.reinitialize();
		if (this.options.initialize) this.options.initialize.call(this);
	},

	/*
	Method: reinitialize
		Allows the sortables instance to be reinitialized after making modifications to the DOM. Such as adding or removing elements from any of the lists.

	Syntax:
		>mySortables.reinitialize();

	Example:
		[javascript]
			var myList = $$('#myList li');
			var mySortables = new Sortables(myList);
			myList.getLast().dispose(); // poof gone from the DOM .. this will cause trouble.

			mySortables.reinitialize();
		[/javascript]
	*/

	reinitialize: function(){
		if (this.handles) this.detach();

		this.handles = [];
		var elements = [];

		this.lists.each(function(list){
			elements.extend(list.getChildren());
		});

		this.handles = !this.options.handle ? elements : elements.map(function(element){
			return element.getElement(this.options.handle) || element;
		}.bind(this));

		this.handles.each(function(handle, i){
			this.bound.start[i] = this.start.bindWithEvent(this, elements[i]);
		}, this);

		this.attach();
	},

	/*
	Method: attach
		Enables sorting by attaching the mousedown event to all the handles.

	Syntax:
		>mySortables.attach();

	Example:
		[javascript]
			var mySortables = new Sortables('.mySortables').detach();

			$('activator').addEvent('click', function(){
				alert('Sorting activated');
				mySortables.attach();
			});
		[/javascript]
	*/

	attach: function(){
		this.handles.each(function(handle, i){
			handle.addEvent('mousedown', this.bound.start[i]);
		}, this);
	},

	/*
	Method: detach
		Detaches the mousedown event from the handles, disabling sorting.

	Syntax:
		>mySortables.detach();

	Example:
		[javascript]
			var mySortables = new Sortables('.mySortables').detach();
		[/javascript]
	*/

	detach: function(){
		this.handles.each(function(handle, i){
			handle.removeEvent('mousedown', this.bound.start[i]);
		}, this);
	},

	check: function(element, list){
		element = element.getCoordinates();
		var coords = list ? element : {
			left: element.left - this.list.scrollLeft,
			right: element.right - this.list.scrollLeft,
			top: element.top - this.list.scrollTop,
			bottom: element.bottom - this.list.scrollTop
		};
		return (this.curr.x > coords.left && this.curr.x < coords.right && this.curr.y > coords.top && this.curr.y < coords.bottom);
	},

	where: function(element){
		if (this.newInsert){
			this.newInsert = false;
			return 'before';
		}
		var dif = {'x': this.curr.x - this.prev.x, 'y': this.curr.y - this.prev.y};
		return dif[['y', 'x'][(Math.abs(dif.x) >= Math.abs(dif.y)) + 0]] <= 0 ? 'before' : 'after';
	},

	reposition: function(){
		if (this.list.positioned){
			this.position.y -= this.offset.list.y - this.list.scrollTop;
			this.position.x -= this.offset.list.x - this.list.scrollLeft;
		} else if (Client.Engine.opera){
			this.position.y += this.list.scrollTop;
			this.position.x += this.list.scrollLeft;
		}
	},

	start: function(event, element){
		if (!this.idle) return;

		this.idle = false;
		this.prev = {'x': event.page.x, 'y': event.page.y};

		this.styles = element.getStyles('margin-top', 'margin-left', 'padding-top', 'padding-left', 'border-top-width', 'border-left-width', 'opacity');
		this.margin = {
			'top': this.styles['margin-top'].toInt() + this.styles['border-top-width'].toInt(),
			'left': this.styles['margin-left'].toInt() + this.styles['border-left-width'].toInt()
		};

		this.element = element;
		this.list = this.element.getParent();
		this.list.hovering = this.hovering = true;
		this.list.positioned = this.list.getStyle('position').test(/relative|absolute|fixed/);

		var children = this.list.getChildren();
		var bounds = children.shift().getCoordinates();
		children.each(function(element){
			var coords = element.getCoordinates();
			bounds.left = Math.min(coords.left, bounds.left);
			bounds.right = Math.max(coords.right, bounds.right);
			bounds.top = Math.min(coords.top, bounds.top);
			bounds.bottom = Math.max(coords.bottom, bounds.bottom);
		});
		this.bounds = bounds;

		this.position = this.element.getPosition([this.list]);

		this.offset = {
			'list': this.list.getPosition(),
			'element': {'x': event.page.x - this.position.x, 'y': event.page.y - this.position.y}
		};
		this.reposition();

		var clone = this.options.clone;
		switch ($type(clone)){
			case 'function': this.clone = clone.call(this, this.element); break;
			case 'boolean': clone = (clone) ? {'opacity': 0.7} : {'visibility': 'hidden'};
			case 'object': this.clone = this.element.clone(this.cloneContents).setStyles(clone);
		}

		this.clone.injectBefore(this.element.setStyles({
			'position': 'absolute',
			'top': this.position.y - this.margin.top,
			'left': this.position.x - this.margin.left,
			'opacity': this.options.opacity
		}));

		document.addEvent('mousemove', this.bound.move);
		document.addEvent('mouseup', this.bound.end);
		this.fireEvent('onStart', this.element);
		event.stop();
	},

	move: function(event){
		this.curr = {'x': event.page.x, 'y': event.page.y};
		this.position = {'x': this.curr.x - this.offset.element.x, 'y': this.curr.y - this.offset.element.y};

		if (this.options.constrain) {
			this.position.y = this.position.y.limit(this.bounds.top, this.bounds.bottom - this.element.offsetHeight);
			this.position.x = this.position.x.limit(this.bounds.left, this.bounds.right - this.element.offsetWidth);
		}
		this.reposition();
		this.element.setStyles({
			'top' : this.position.y - this.margin.top,
			'left' : this.position.x - this.margin.left
		});

		if (!this.options.constrain){
			var oldSize, newSize;
			this.lists.each(function(list){
				if (!this.check(list, true)){
					list.hovering = false;
				} else if (!list.hovering){
					this.list = list;
					this.list.hovering = this.newInsert = true;
					this.list.positioned = this.list.getStyle('position').test(/relative|absolute|fixed/);
					oldSize = this.clone.getSize().size;
					this.list.adopt(this.clone, this.element);
					newSize = this.clone.getSize().size;
					this.offset = {
						'list': this.list.getPosition(),
						'element': {
							'x': Math.round(newSize.x * (this.offset.element.x / oldSize.x)),
							'y': Math.round(newSize.y * (this.offset.element.y / oldSize.y))
						}
					};
				}
			}, this);
		}

		if (this.list.hovering){
			this.list.getChildren().each(function(element){
				if (!this.check(element)){
					element.hovering = false;
				} else if (!element.hovering && element != this.clone){
					element.hovering = true;
					this.clone.inject(element, this.where(element));
				}
			}, this);
		}

		this.prev = this.curr;
		event.stop();
	},

	end: function(){
		this.prev = null;
		document.removeEvent('mousemove', this.bound.move);
		document.removeEvent('mouseup', this.bound.end);

		this.position = this.clone.getPosition([this.list]);
		this.reposition();

		if (!this.effect){
			this.reset();
		} else {
			this.effect.element = this.element;
			this.effect.start({
				'top' : this.position.y - this.margin.top,
				'left' : this.position.x - this.margin.left,
				'opacity' : this.styles.opacity
			});
		}
	},

	reset: function(){
		this.element.setStyles({
			'position': 'static',
			'opacity': this.styles.opacity
		}).injectBefore(this.clone);
		this.clone.empty().dispose();

		this.fireEvent('onComplete', this.element);
		this.idle = true;
	},

	/*
	Method: serialize
		Function to get the order of the elements in the lists of this sortables instance.
		If more than one list is being used, all lists will be serialized and returned in an array.

	Syntax:
		>var serial = mySortables.serialize([index[, modifier]]);

	Arguments:
		index    - (number, optional) The index to serialize from the lists. Omit or pass false to serialize all lists.
		modifier - (function, optional) A function which returns important information, ie. the ID of the Element. See below.

	Returns:
		(array) An array containing the order of the elements.

	Examples:
		[javascript]
			//returns the second list serialized (remember, arrays are 0 based...)
			mySortables.serialize(1); //['item_1-1', 'item_1-2', 'item_1-3']

			//returns a nested array of all lists serialized, or if only one list exists, that lists order
			mySortables.serialize(); //[['item_1-1', 'item_1-2', 'item_1-3'], ['item_2-1', 'item_2-2', 'item_2-3'], ['item_3-1', 'item_3-2', 'item_3-3']]

			//joins the array with a '&' to return a string of the formatted ids of all the elmements in list 3 with their position
			mySortables.serialize(2, function(element, index){
				return element.getProperty('id').replace('item_','') + '=' + index;
			}).join('&'); //'3-0=0&3-1=1&3-2=2'
		[/javascript]
	*/

	serialize: function(index, modifier){
		var map = modifier || function(element, index){
			return element.getProperty('id');
		}.bind(this);

		var serial = this.lists.map(function(list){
			return list.getChildren().map(map, this);
		}, this);

		if (this.lists.length == 1) index = 0;
		return $chk(index) && index >= 0 && index < this.lists.length ? serial[index] : serial;
	}

});


/*
Script: Scroller.js
	Contains the <Scroller>.

License:
	MIT-style license.

Note:
	The Scroller.js requires an XHTML doctype.
*/

/*
Class: Scroller
	The Scroller is a class to scroll any element with an overflow (including the window) when the mouse cursor reaches certain buondaries of that element.
	You must call its start method to start listening to mouse movements.

Syntax:
	>var myScroller = new Scroller(element[, options]);

Implements:
	<Events>, <Options>

Arguments:
	element - (element) The element to scroll.
	options - (object, optional) An object for the Scroller instance's options.

	options (continue):
		area - (number: defaults to 20) The necessary boundaries to make the element scroll.
		velocity - (number: defaults to 1) The modifier for the window scrolling speed.

Events:
	onChange - (function) When the mouse reaches some boundaries, you can choose to alter some other values, instead of the scrolling offsets.
		Signature:
			>onChange(x, y);

		Arguments:
			x - (number) Current x-mouse position.
			y - (number) Current y-mouse position.

Example:
	[javascript]
		var myScroller = new Scroller(window, {
			area: Math.round(window.getWidth() / 5)
		});

		(function(){
			this.stop();
			this.start();
		}).periodical(1000, myScroller);
	[/javascript]
*/

var Scroller = new Class({

	Implements: [Events, Options],

	options: {
		area: 20,
		velocity: 1,
		onChange: function(x, y){
			this.element.scrollTo(x, y);
		}
	},

	initialize: function(element, options){
		this.setOptions(options);
		this.element = $(element);
		switch($type(this.element)){
			case 'window': this.listener = $(this.element.document.body); break;
			case 'document': this.listener = $(this.element.body); break;
			case 'element': this.listener = this.element;
		}
		this.timer = null;
	},

	/*
	Method: start
		The scroller starts listening to mouse movements.

	Syntax:
		>myScroller.start();

	Example:
		[javascript]
			var myScroller = new Scroller('myElement');
			myScroller.start();
		[/javascript]
	*/

	start: function(){
		this.coord = this.getCoords.bind(this);
		this.listener.addEvent('mousemove', this.coord);
	},

	/*
	Method: stop
		The scroller stops listening to mouse movements.

	Syntax:
		>myScroller.start();

	Example:
		[javascript]
			var myElement = $('myElement');
			var myScroller = new Scroller(myElement);
			myScroller.start();

			myElement.addEvent('click', myScroller.stop.bind(myScroller)); //stop scrolling when the user clicks.
		[/javascript]
	*/

	stop: function(){
		this.listener.removeEvent('mousemove', this.coord);
		this.timer = $clear(this.timer);
	},

	getCoords: function(event){
		this.page = (this.element == window) ? event.client : event.page;
		if (!this.timer) this.timer = this.scroll.periodical(50, this);
	},

	scroll: function(){
		var el = this.element.getSize();
		var pos = this.element.getPosition();

		var change = {'x': 0, 'y': 0};
		for (var z in this.page){
			if (this.page[z] < (this.options.area + pos[z]) && el.scroll[z] != 0)
				change[z] = (this.page[z] - this.options.area - pos[z]) * this.options.velocity;
			else if (this.page[z] + this.options.area > (el.size[z] + pos[z]) && el.scroll[z] + el.size[z] != el.scrollSize[z])
				change[z] = (this.page[z] - el.size[z] + this.options.area - pos[z]) * this.options.velocity;
		}
		if (change.y || change.x) this.fireEvent('onChange', [el.scroll.x + change.x, el.scroll.y + change.y]);
	}

});

/*
Script: Slider.js
	Contains <Slider>

License:
	MIT-style license.

Note:
	The Slider requires an XHTML doctype.
*/

/*
Class: Slider
	Creates a slider with two elements: a knob and a container.

Syntax:
	>var mySlider = new Slider(element, knob[, options]);

Arguments:
	element - (element) The knob element for the slider.
	knob    - (element) The handle element for the slider.
	options - (object) An optional object for customizing the Slider.

	options (continued):
		steps  - (number: defaults to 100) The number of steps the Slider should move/tick.
		mode   - (string: defaults to horizontal) The type of Slider can be either 'horizontal' or 'vertical' in movement.
		offset - (number: defaults to: 0) Relative offset for knob position at start.

Events:
	onChange - (function) Fires when the Slider's value changes.
		Signature:
			>onChange(step)

		Arguments:
			step - (number) The current step that the Slider is on.

	onComplete - (function) Fire when you're done dragging.
		Signature:
			>onComplete(step)

		Arguments:
			step - (string) The current step that the Slider is on as a string.

	onTick - (function) Fires when the user drags the knob. This Event can be overriden to alter the onTick behavior.
		Signature:
			>onTick(pos)

		Arguments:
			pos - (number) The current position that slider moved to.

		Note:
			Slider originally uses the onTick event to set the style of the knob to a new position.

Properties:
	element - (element) The knob element for the slider.
	knob    - (element) The handle element for the slider.
	step    - (integer) The current location of the knob.
	drag    - (class) An instance of <Drag> used for the knob.


Returns:
	(class) A new Slider instance.

Example:
	[javascript]
		var mySlider = new Slider('myElement', 'myKnob', {
			onStart: function(){
				this.borderFx = this.borderFx || this.element.effect('border').start('#ccc');
			}
			onTick: function(pos){
				this.element.setStyle('border-color', '#f00');
				this.knob.setStyle(this.p, pos);
			},
			onComplete: function(){
				this.element.effect('border').start('#000');
			}
		});
	[/javascript]
*/

var Slider = new Class({

	Implements: [Events, Options],

	options: {
		/*onChange: $empty,
		onComplete: $empty,*/
		onTick: function(pos){
			this.knob.setStyle(this.p, pos);
		},
		mode: 'horizontal',
		steps: 100,
		offset: 0
	},

	initialize: function(element, knob, options){
		this.element = $(element);
		this.knob = $(knob);
		this.setOptions(options);
		this.previousChange = -1;
		this.previousEnd = -1;
		this.step = -1;
		this.element.addEvent('mousedown', this.clickedElement.bind(this));
		var mod, offset;
		switch (this.options.mode){
			case 'horizontal':
				this.z = 'x';
				this.p = 'left';
				mod = {'x': 'left', 'y': false};
				offset = 'offsetWidth';
				break;
			case 'vertical':
				this.z = 'y';
				this.p = 'top';
				mod = {'x': false, 'y': 'top'};
				offset = 'offsetHeight';
		}
		this.max = this.element[offset] - this.knob[offset] + (this.options.offset * 2);
		this.half = this.knob[offset] / 2;
		this.getPos = this.element['get' + this.p.capitalize()].bind(this.element);
		this.knob.setStyle('position', 'relative').setStyle(this.p, - this.options.offset);
		var lim = {};
		lim[this.z] = [- this.options.offset, this.max - this.options.offset];
		this.drag = new Drag(this.knob, {
			limit: lim,
			modifiers: mod,
			snap: 0,
			onStart: function(){
				this.draggedKnob();
			}.bind(this),
			onDrag: function(){
				this.draggedKnob();
			}.bind(this),
			onComplete: function(){
				this.draggedKnob();
				this.end();
			}.bind(this)
		});
	},

	/*
	Property: set
		The slider will move to the passed position.

	Syntax:
		>mySlider.set(step);

	Arguments:
		step - (number) A number to position the Slider to.

	Returns:
		(class) This Slider instance.

	Example:
		[javascript]
			var mySlider = new Slider('myElement', 'myKnob');
			mySlider.set(0);

			var myPeriodical = (function(){
				if(this.step == this.options.steps) $clear(myPeriodical);

				this.set(this.step++);
			}).periodical(1000, mySlider);
		[/javascript]

	Note:
		Step will automatically be limited between 0 and the optional steps value.
	*/

	set: function(step){
		this.step = step.limit(0, this.options.steps);
		this.checkStep();
		this.end();
		this.fireEvent('onTick', this.toPosition(this.step));
		return this;
	},

	clickedElement: function(event){
		var position = event.page[this.z] - this.getPos() - this.half;
		position = position.limit(-this.options.offset, this.max -this.options.offset);
		this.step = this.toStep(position);
		this.checkStep();
		this.end();
		this.fireEvent('onTick', position);
	},

	draggedKnob: function(){
		this.step = this.toStep(this.drag.value.now[this.z]);
		this.checkStep();
	},

	checkStep: function(){
		if (this.previousChange != this.step){
			this.previousChange = this.step;
			this.fireEvent('onChange', this.step);
		}
	},

	end: function(){
		if (this.previousEnd !== this.step){
			this.previousEnd = this.step;
			this.fireEvent('onComplete', this.step + '');
		}
	},

	toStep: function(position){
		return Math.round((position + this.options.offset) / this.max * this.options.steps);
	},

	toPosition: function(step){
		return this.max * step / this.options.steps;
	}

});


/*
Script: SmoothScroll.js
	Contains <SmoothScroll>

License:
	MIT-style license.

Note:
	SmoothScroll requires an XHTML doctype.
*/

/*
Class: SmoothScroll
	Auto targets all the anchors in a page and display a smooth scrolling effect upon clicking them.

Extends:
	<Fx.Scroll>

Syntax:
	>var mySmoothScroll = new SmoothScroll([options[, win]]);

Arguments:
	options - (object, optional) In addition to all the <Fx.Scroll> options, SmoothScroll has links option incase you had a predefined links collection.
	win     - (object, optional) The context of the SmoothScroll.

	options (continued):
		links - (mixed) A collection of Elements or a string <Selector> of Elements that the SmoothScroll can use.

Returns:
	(class) A new SmoothScroll instance.

Example:
	[javascript]
		var mySmoothScroll = new SmoothScroll({
			links: '.smoothAnchors',
			wheelStops: false
		});
	[/javascript]

See Also:
	<Fx.Scroll>
*/

var SmoothScroll = new Class({

	Extends: Fx.Scroll,

	initialize: function(options, win){
		arguments.callee.parent(win || window, options);
		this.links = (this.options.links) ? $$(this.options.links) : $$(this.document.links);
		var location = this.document.window.location.href.match(/^[^#]*/)[0] + '#';
		this.links.each(function(link){
			if (link.href.indexOf(location) != 0) return;
			var anchor = link.href.substr(location.length);
			if (anchor && $(anchor)) this.useLink(link, anchor);
		}, this);
		if (!Client.Engine.webkit419) this.addEvent('onComplete', function(){
			this.document.window.location.hash = this.anchor;
		}, true);
	},

	useLink: function(link, anchor){
		link.addEvent('click', function(event){
			this.anchor = anchor;
			this.toElement(anchor);
			event.stop();
		}.bind(this));
	}

});


/*
Script: Tips.js
	Tooltips, BubbleTips, whatever they are, they will appear on mouseover.

License:
	MIT-style license.

Credits:
	The idea behind Tips.js is based on Bubble Tooltips (<http://web-graphics.com/mtarchive/001717.php>) by Alessandro Fulcitiniti <http://web-graphics.com/>

Note:
	Tips requires an XHTML doctype.
*/

/*
Class: Tips
	Display a tip on any element with a title and/or href.

Implements:
	<Events>, <Options>

Arguments:
	elements - (mixed) A collection of elements, a string Selector, or an Element to apply the tooltips to on mouseover.
	options  - (object) An object to customize this Tips instance.

	options (continued):
		maxTitleChars - (number: defaults to 30) The maximum number of characters to display in the title of the tip.
		showDelay     - (number: defaults to 100) The delay the onShow method is called.
		hideDelay     - (number: defaults to 100) The delay the onHide method is called.
		className     - (string: defaults to 'tool') The prefix for your tooltip classNames.
		offsets       - (object: defaults to {'x': 16, 'y': 16}) The distance of your tooltip from the mouse.
		fixed         - (boolean: defaults to false) If set to true, the toolTip will not follow the mouse.
		window        - (object: defaults to window) The context of the Tips elements.

		className (continued):
			- The whole tooltip will have as classname: tool-tip
			- The title will have as classname: tool-title
			- The text will have as classname: tool-text

Properties:
	toolTip - (element) The Element containing the tip content; this element is the one positioned around the document relative to the target.
	wrapper - (element) An Element inside the toolTip Element that contains the body of the tip.
	title   - (element) The Element generated each time a tip is shown for the title of each tooltip.
	text    - (element) The Element generated each time a tip is shown for the body of each tooltip.

Events:
	onShow - (function) Fires when the Tip is starting to show and by default sets the tip visible.
		Signature:
			>onShow(tip)

		Arguments:
			tip - (element) The Tip Element that is showing.

	onHide - (function) Fires when the Tip is starting to hide and by default sets the tip hidden.
		Signature:
			>onHide(tip)

		Arguments:
			tip - (element) The Tip Element that is hiding.

Returns:
	(class) A new Tips class instance.

Example:
	[html]
		<img src="/images/i.png" title="The body of the tooltip is stored in the title" class="toolTipImg"/>
	[/html]

	[javascript]
		var myTips = new Tips($$('.toolTipImg'), {
			maxTitleChars: 50	//I like my captions a little long
		});
	[/javascript]

Note:
	The title of the element will always be used as the tooltip body. If you put :: on your title, the text before :: will become the tooltip title.
*/

var Tips = new Class({

	Implements: [Events, Options],

	options: {
		onShow: function(tip){
			tip.setStyle('visibility', 'visible');
		},
		onHide: function(tip){
			tip.setStyle('visibility', 'hidden');
		},
		maxTitleChars: 30,
		showDelay: 100,
		hideDelay: 100,
		className: 'tool',
		offsets: {'x': 16, 'y': 16},
		fixed: false,
		window: window
	},

	initialize: function(elements, options){
		this.setOptions(options);
		elements = $$(elements);
		this.document = (elements.length) ? elements[0].ownerDocument : document;
		this.window = this.document.window;
		this.toolTip = new Element('div', {
			'class': this.options.className + '-tip',
			'styles': {
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'visibility': 'hidden'
			}
		}, this.document).inject(this.document.body);
		this.wrapper = new Element('div').inject(this.toolTip);
		elements.each(this.build, this);
	},

	build: function(el){
		el.$attributes.myTitle = (el.href && el.getTag() == 'a') ? el.href.replace('http://', '') : (el.rel || false);
		if (el.title){
			var dual = el.title.split('::');
			if (dual.length > 1){
				el.$attributes.myTitle = dual[0].trim();
				el.$attributes.myText = dual[1].trim();
			} else {
				el.$attributes.myText = el.title;
			}
			el.removeProperty('title');
		} else {
			el.$attributes.myText = false;
		}
		if (el.$attributes.myTitle && el.$attributes.myTitle.length > this.options.maxTitleChars)
			el.$attributes.myTitle = el.$attributes.myTitle.substr(0, this.options.maxTitleChars - 1) + "&hellip;";
		el.addEvent('mouseenter', function(event){
			this.start(el);
			if (!this.options.fixed) this.locate(event);
			else this.position(el);
		}.bind(this));
		if (!this.options.fixed) el.addEvent('mousemove', this.locate.bind(this));
		var end = this.end.bind(this);
		el.addEvent('mouseleave', end);
	},

	start: function(el){
		this.wrapper.empty();
		if (el.$attributes.myTitle){
			this.title = new Element('span').inject(
				new Element('div', {'class': this.options.className + '-title'}
			).inject(this.wrapper)).setHTML(el.$attributes.myTitle);
		}
		if (el.$attributes.myText){
			this.text = new Element('span').inject(
				new Element('div', {'class': this.options.className + '-text'}
			).inject(this.wrapper)).setHTML(el.$attributes.myText);
		}
		$clear(this.timer);
		this.timer = this.show.delay(this.options.showDelay, this);
	},

	end: function(event){
		$clear(this.timer);
		this.timer = this.hide.delay(this.options.hideDelay, this);
	},

	position: function(element){
		var pos = element.getPosition();
		this.toolTip.setStyles({
			'left': pos.x + this.options.offsets.x,
			'top': pos.y + this.options.offsets.y
		});
	},

	locate: function(event){
		var win = {'x': this.window.getWidth(), 'y': this.window.getHeight()};
		var scroll = {'x': this.window.getScrollLeft(), 'y': this.window.getScrollTop()};
		var tip = {'x': this.toolTip.offsetWidth, 'y': this.toolTip.offsetHeight};
		var prop = {'x': 'left', 'y': 'top'};
		for (var z in prop){
			var pos = event.page[z] + this.options.offsets[z];
			if ((pos + tip[z] - scroll[z]) > win[z]) pos = event.page[z] - this.options.offsets[z] - tip[z];
			this.toolTip.setStyle(prop[z], pos);
		}
	},

	show: function(){
		if (this.options.timeout) this.timer = this.hide.delay(this.options.timeout, this);
		this.fireEvent('onShow', [this.toolTip]);
	},

	hide: function(){
		this.fireEvent('onHide', [this.toolTip]);
	}

});


/*
Script: Accordion.js
	Contains <Accordion>

License:
	MIT-style license.

Note:
	The Accordion requires an XHTML doctype.
*/

/*
Class: Accordion
	The Accordion class creates a group of Elements that are toggled when their handles are clicked. When one Element toggles into view, the others toggle out.

Extends:
	<Fx.Elements>

Syntax:
	>var myAccordion = new Accordion(togglers, elements[, options]);

Arguments:
	togglers - (array) The collection of Elements representing the Elements which will be clickable and trigger the opening of sections of the Accordion.
	elements - (array) The collection of Elements the transitions will be applied to.
	options  - (object, optional) All the <Fx> options in addition to options below.

	options (continued):
		display     - (integer: defaults to 0) The index of the element to show at start (with a transition).
		show        - (integer: defaults to 0) The index of the element to be shown initially.
		height      - (boolean: defaults to true) If set to true, a height transition effect will take place when switching between displayed elements.
		width       - (boolean: defaults to false) If set to true, a width transition will take place when switching between displayed elements.
		opacity     - (boolean: defaults to true) If set to true, an opacity transition effect will take place when switching between displayed elements.
		fixedHeight - (boolean: defaults to false) If set to false, displayed elements will have a fixed height.
		fixedWidth  - (boolean: defaults to false) If set to true, displayed elements will have a fixed width.
		alwaysHide  - (boolean: defaults to false) If set to true, it will be possible to close all displayable elements.  Otherwise, one will remain open at all time.

		width (continued):
			Warning:
				CSS mastery is required to make this work!

Returns:
	(class) A new Accordion instance.

Events:
	onActive - (function) Function to execute when an element starts to show.
		Signature:
			>onActive(toggler, element)

		Arguments:
			toggler - (element) The toggler for the Element being displayed.
			element - (element) The Element being displayed.

	onBackground - (function) Function to execute when an element starts to hide.
		Signature:
			>onBackground(toggler, element)

		Arguments:
			toggler - (element) The toggler for the Element being displayed.
			element - (element) The Element being displayed.

Properties:
	togglers  - (array) The collection of Elements that are clicked to open sections of the Accordion.
	elements  - (array) The collection of Elements representing the sections that expand and collapse.
	container - (element or boolean false) An element that contains all the togglers and elements. The container is optional, so if not specified in the options this property is false.
	previous  - (integer) The current open section.

Example:
	[javascript]
		var myAccordion = new Accordion($$('.togglers'), $$('.elements'), {
			display: 2,
			alwaysHide: true
		});
	[/javascript]

See Also:
	<http://demos.mootools.net/Accordion>
*/

var Accordion = new Class({

	Extends: Fx.Elements,

	options: {
		/*onActive: $empty,
		onBackground: $empty,*/
		display: 0,
		show: false,
		height: true,
		width: false,
		opacity: true,
		fixedHeight: false,
		fixedWidth: false,
		wait: false,
		alwaysHide: false
	},

	initialize: function(){
		var params = Array.link(arguments, {'container': Element.type, 'options': Object.type, 'togglers': $defined, 'elements': $defined});
		arguments.callee.parent(params.elements, params.options);
		this.togglers = $$(params.togglers);
		this.container = $(params.container);
		this.previous = -1;
		if (this.options.alwaysHide) this.options.wait = true;
		if ($chk(this.options.show)){
			this.options.display = false;
			this.previous = this.options.show;
		}
		if (this.options.start){
			this.options.display = false;
			this.options.show = false;
		}
		this.effects = {};
		if (this.options.opacity) this.effects.opacity = 'fullOpacity';
		if (this.options.width) this.effects.width = this.options.fixedWidth ? 'fullWidth' : 'offsetWidth';
		if (this.options.height) this.effects.height = this.options.fixedHeight ? 'fullHeight' : 'scrollHeight';
		for (var i = 0, l = this.togglers.length; i < l; i++) this.addSection(this.togglers[i], this.elements[i]);
		this.elements.each(function(el, i){
			if (this.options.show === i){
				this.fireEvent('onActive', [this.togglers[i], el]);
			} else {
				for (var fx in this.effects) el.setStyle(fx, 0);
			}
		}, this);
		if ($chk(this.options.display)) this.display(this.options.display);
	},

	/*
	Method: addSection
		Dynamically adds a new section into the Accordion at the specified position.

	Syntax:
		>myAccordion.addSection(toggler, element[, pos]);

	Arguments:
		toggler - (element) The Element that toggles the Accordion section open.
		element - (element) The Element that should stretch open when the toggler is clicked.
		pos     - (integer, optional) The index at which these objects are to be inserted within the Accordion (defaults to the end).

	Returns:
		(class) This Accordion instance.

	Example:
		[javascript]
			var myAccordion = new Fx.Accordion($$('.togglers'), $$('.elements'));
			myAccordion.addSection('myToggler1', 'myElement1'); // add the section at the end sections.
			myAccordion.addSection('myToggler2', 'myElement2', 0); //add the section at the beginning of the sections.
		[/javascript]
	*/

	addSection: function(toggler, element, pos){
		toggler = $(toggler);
		element = $(element);
		var test = this.togglers.contains(toggler);
		var len = this.togglers.length;
		this.togglers.include(toggler);
		this.elements.include(element);
		if (len && (!test || pos)){
			pos = $pick(pos, len - 1);
			toggler.injectBefore(this.togglers[pos]);
			element.injectAfter(toggler);
		} else if (this.container && !test){
			toggler.inject(this.container);
			element.inject(this.container);
		}
		var idx = this.togglers.indexOf(toggler);
		toggler.addEvent('click', this.display.bind(this, idx));
		if (this.options.height) element.setStyles({'padding-top': 0, 'border-top': 'none', 'padding-bottom': 0, 'border-bottom': 'none'});
		if (this.options.width) element.setStyles({'padding-left': 0, 'border-left': 'none', 'padding-right': 0, 'border-right': 'none'});
		element.fullOpacity = 1;
		if (this.options.fixedWidth) element.fullWidth = this.options.fixedWidth;
		if (this.options.fixedHeight) element.fullHeight = this.options.fixedHeight;
		element.setStyle('overflow', 'hidden');
		if (!test){
			for (var fx in this.effects) element.setStyle(fx, 0);
		}
		return this;
	},

	/*
	Method: display
		Shows a specific section and hides all others. Useful when triggering an accordion from outside.

	Syntax:
		>myAccordion.display(index);

	Arguments:
		index - (mixed) The index of the item to show, or the actual element to be displayed.

	Returns:
		(class) This Accordion instance.

	Example:
		[javascript]
			// Make a ticker-like accordion. Kids don't try this at home.
			var myAccordion = new Accordion('.togglers', '.elements', {
				onComplete: function(){
					this.display.delay(2500, this, (this.previous + 1) % this.togglers.length);
				}
			});
		[/javascript]
	*/

	display: function(index){
		index = ($type(index) == 'element') ? this.elements.indexOf(index) : index;
		if ((this.timer && this.options.wait) || (index === this.previous && !this.options.alwaysHide)) return this;
		this.previous = index;
		var obj = {};
		this.elements.each(function(el, i){
			obj[i] = {};
			var hide = (i != index) || (this.options.alwaysHide && (el.offsetHeight > 0));
			this.fireEvent(hide ? 'onBackground' : 'onActive', [this.togglers[i], el]);
			for (var fx in this.effects) obj[i][fx] = hide ? 0 : el[this.effects[fx]];
		}, this);
		return this.start(obj);
	}

});
