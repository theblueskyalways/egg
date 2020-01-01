'use strict';

const Controller = require('../core/base-controller');
const moment = require('moment');

class HomeController extends Controller {
  // 用户登陆
  async login() {
    const { ctx } = this;
    const { name, password } = ctx.request.body;
    if (!name || !password) return this.fail('账户名或密码错误');
    const result = await ctx.app.mysql.select('user', { where: { name, password } });
    if (result.length === 1) return this.success();
    this.fail();
  }

  // 用户注册
  async register() {
    const { ctx } = this;
    const { name, password } = ctx.request.body;
    if (!name || !password) return this.fail('参数错误');
    const result = await ctx.app.mysql.insert('user', { name, password });
    if (result.effectRows > 0) this.success();
    this.fail();
  }
}

module.exports = HomeController;
