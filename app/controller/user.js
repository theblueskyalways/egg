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

  // 用户查看愿望
  async checkWishs() {
    const { ctx } = this;
    const result = await ctx.app.mysql.select('wish');
    if (result.length < 10) {
      this.success(result);
    } else {
      const wishList = [];
      while (wishList.length < 10) {
        const thisWish = result[Math.floor(Math.random() * result.length)];
        wishList.forEach(v => {
          if (v.id !== thisWish.id) {
            wishList.push(thisWish);
          }
        });
      }
      this.success(wishList);
    }
    this.fail();
  }

  // 用户添加愿望
  async addWish() {
    const { ctx } = this;
    const { userId, content } = ctx.request.body;
    console.log(userId);
    const result = await ctx.app.mysql.insert('wish', { owner: userId, content });
    console.log(result);
    if (result.effectRows > 0) this.success();
    // this.fail();
  }

}

module.exports = HomeController;
