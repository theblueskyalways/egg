'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const title = '我是首页'; // 向模板传入数据
    const sql = 'select * from user';
    const result = await ctx.app.mysql.query(sql);
    await ctx.render('index', {
      title,
    });
  }
  async birthday() {
    const { ctx } = this;
    const title = '我是首页'; // 向模板传入数据
    await ctx.render('birthday', {
      title,
    });
  }
  async hero() {
    const { ctx } = this;
    const title = '我是英雄页面'; // 向模板传入数据
    await ctx.render('hero/hero', {
      title,
    });
  }

  async snake() {
    const { ctx } = this;
    const title = '我是贪吃蛇游戏页面'; // 向模板传入数据
    await ctx.render('snake', {
      title,
    });
  }

  async happyNewYear() {
    const { ctx } = this;
    const title = '我是许愿树'; // 向模板传入数据
    await ctx.render('happyNewYear', {
      title,
    });
  }

  async word() {
    const { ctx } = this;
    const title = '单词本'; // 向模板传入数据
    await ctx.render('word', {
      title,
    });
  }
}

module.exports = HomeController;
