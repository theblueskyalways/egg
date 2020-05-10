module.exports.assoc = (arr, field, option)=> { 
	var res = {};
	if (Array.isArray(arr)) {
		arr.forEach(function (v) {
			var key = v[field];
			switch (option) {
			case 'first':
				if (res[key] == undefined) { res[key] = v; }
				break;

			case 'all':
				if (!res[key]) { res[key] = []; }
				res[key].push(v);
				break;

			case 'last':
			default:
				res[key] = v;
				break;
			}
		});
	}
	return res;
};

module.exports.column = (arr, field, unique)=> {
	var res = [], dict = {};
	unique  = unique == undefined ? true : unique;
	if (Array.isArray(arr)) {
		arr.forEach(function (v) {
			var val = v[field];
			if (!unique || !dict[val]) {
				dict[val] = true;
				res.push(val);
			}
		});
	}
	return res;
};

module.exports.inArray = (arr, elem)=> {
	if (Array.isArray(arr)) {
		for (var i in arr) {
			//noinspection JSUnfilteredForInLoop
			if (arr[i] == elem) { return true; }
		}
	}
	return false;
};

module.exports.unique = (arr)=> {
	var res = [], tmp = {};
	if (Array.isArray(arr)) {
		for (var i = 0; i < arr.length; ++i) {
			var v = arr[i];
			if (!tmp[v]) {
				tmp[v] = true;
				res.push(v);
			}
		}
	}
	return res;
};

module.exports.each = (arr, cb)=> { if (Array.isArray(arr)) { arr.forEach(cb); }};

module.exports.tryGet = function (obj, key, defVal) {
	if (obj && obj.hasOwnProperty(key)) {
		return obj[key];
	}
	return defVal;
};

module.exports.join = function (arr, separater, defVal) {
	if (Array.isArray(arr) && arr.length > 0) {
		return arr.join(separater || ',');
	}
	return defVal || 0;
};

module.exports.merge = function (a, b) {
	b.forEach(function (v) {
		if (a.indexOf(v) < 0) {
			a.push(v);
		}
	});
	return a;
};

module.exports.intersect = function (a, b) {
	var res = [];
	a.forEach(function (v) {
		if (b.indexOf(v) > -1) {
			res.push(v);
		}
	});
	return res;
};

module.exports.random = (arr)=> { return arr.sort(function () { return Math.random() - .5; }); };

Array.prototype.assoc = function (name, opts) {
	var results = {};
	this.forEach(function (v) {
		var key = v[name];
		switch (opts) {
		case 'first':
			if (results[key] == undefined) { results[key] = v; }
			break;

		case 'all':
			if (!results[key]) { results[key] = []; }
			results[key].push(v);
			break;

		case 'last':
		default:
			results[key] = v;
			break;
		}
	});
	return results;
};

Array.prototype.column = function (name, unique) {
	var results = [], dict = {};
	unique      = unique == undefined ? true : unique;
	this.forEach(function (v) {
		var val = v[name];
		if (!unique || !dict[val]) {
			dict[val] = true;
			results.push(val);
		}
	});
	return results;
};

Array.prototype.get = function (key, defVal) {
	if (this.hasOwnProperty(key)) { return this[key]; }
	return defVal;
};

Array.prototype.has = function (v) {
	for (var i = 0; i < this.length; ++i) { if (v == this[i]) { return true; } }
	return false;
};

Array.prototype.each = function (cb) { for (var i = 0; i < this.length; ++i) { if (cb(this[i], i)) { break; } } };