module.exports = {
	OK              : 200,
	InvalidParam    : 201,
	UploadFailed    : 202,
	Unknown         : 203,
	Duplicated      : 204,
	LimitReached    : 205,
	PermissionDenied: 206,
	InvalidToken    : 207,
	InvalidTimestamp: 208,
	Timeout         : 209,
	InvalidApp      : 210,
	InternalError   : 500
};

module.exports.message = function (code) {
	switch (code) {
	case module.exports.PermissionDenied:
		return {
			code   : code,
			message: '权限错误'
		};
	case module.exports.InvalidParam:
		return {
			code   : code,
			message: '参数错误'
		};
	case module.exports.InvalidTimestamp:
		return {
			code   : code,
			message: '验证失败,请检查系统时间'
		};
	case module.exports.InternalError:
		return {
			code   : code,
			message: ''
		}
	}
	return {
		code   : code,
		message: ''
	};
};