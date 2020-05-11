const consts = require('./consts').default;

/* 权限检查(session)*/
module.exports.check = function(req) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return true;
  }
  return false;
};
/* 检查是否是管理员*/
module.exports.user = {
  isAdmin: user => parseInt(user.role) === consts.ADMIN,
  isUser: user => parseInt(user.role) === consts.USER,
};

/* 随机密码*/
module.exports.password = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];
