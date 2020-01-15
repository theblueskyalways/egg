'use strict';

const Controller = require('../core/base-controller');
const moment = require('moment');

class HomeController extends Controller {
  // 用户登陆
  async login() {
    const { ctx } = this;
    const { phone, password } = ctx.request.body;
    if (!phone || !password) return this.fail('账户名或密码错误');
    const result = await ctx.app.mysql.select('wish', { where: { phone, password } });
    if (result.length === 1) return this.success();
    this.fail();
  }

  // 用户注册
  async register() {
    const { ctx } = this;
    const { name, password, phone } = ctx.request.body;
    if (!name || !password) return this.fail('参数错误');
    const user = await ctx.app.mysql.select('user', { where: { phone } });
    if (user.length > 0) return this.fail('已有此用户');
    const result = await ctx.app.mysql.insert('user', { name, password, phone });
    if (result.affectedRows > 0) return this.success();
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
      const thisWish = result[Math.floor(Math.random() * result.length)];
      wishList.push(thisWish);
      while (wishList.length < 10) {
        const thisWish = result[Math.floor(Math.random() * result.length)];
        let flag = true;
        wishList.forEach(v => {
          if (v.id === thisWish.id) {
            flag = false;
          }
        });
        if (flag)wishList.push(thisWish);
      }
      this.success(wishList);
    }
  }

  // 用户添加愿望
  async addWish() {
    const { ctx } = this;
    const { userId, content } = ctx.request.body;
    console.log(userId);
    const result = await ctx.app.mysql.insert('wish', { owner: userId, content });
    console.log(result);
    if (result.affectedRows > 0) return this.success();
    this.fail();
  }

}

module.exports = HomeController;
