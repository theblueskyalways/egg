let mysql            = require('mysql'),
    conf             = require('../conf.json'),
    pool             = mysql.createPool(conf.badminton.database);

module.exports.query = (sql, values)=> {
	return new Promise((resolve, reject) => {
		if (!values) {
			pool.query(sql, function (err, rows) {
				if (err) { reject(err); }
				else { resolve(rows); }
			});
		} else {
			pool.query(sql, values, (err, rows) => {
				if (err) { reject(err); }
				else { resolve(rows); }
			});
		}
	});
};


module.exports.count = (sql, values) => {
	return new Promise(async(resolve, reject)=> {
		try {
			var index = sql.indexOf('FROM');
			if (index > 0) {
				var data = await module.exports.query('SELECT COUNT(*) AS __COUNT__ ' + sql.substring(index, sql.lastIndexOf('LIMIT')), values);
				if (data.length > 0) { resolve(data[0]['__COUNT__']); } else { resolve(0); }
			} else { resolve(0); }
		} catch (err) { reject(err); }
	});
};

module.exports.join = (arr) => {
	if (Array.isArray(arr) && arr.length > 0) {
		var res = '';
		arr.forEach((v) => { res += "'" + v + "',"; });
		return res.substr(0, res.length - 1);
	}
	return 0;
};