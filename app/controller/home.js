'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let title = "我是首页"; //向模板传入数据
    await ctx.render('index',{
      title: title
    });
    // ctx.body = 'hi,欢迎访问 taining.chen 的个人网站。该网站正在紧张建设中。该主人可能去火星探险还未归来，所以在这段时间可以去访问一下www.bilibili.com';
  }
}

module.exports = HomeController;
