// Copyright 2018 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

'use strict';

const { Controller } = require('egg');
const _ = require('lodash');
const moment = require('moment');

/**
 * 包含常用函数的基本 Controller 类
 */
class BaseController extends Controller {
  /**
   * 下划线。参考：https://underscorejs.org/
   */
  get _() {
    return _;
  }

  /**
   * 获取当前时间
   */
  get moment() {
    return moment;
  }

  /**
   * 返回一个成功的 HTTP 响应
   *
   * @param {object} data
   * @param {object} paginates
   */
  success(data, paginates) {
    switch (this.ctx.method) {
      case 'GET':
        this.ctx.status = 200;
        break;
      case 'POST':
      case 'PUT':
        this.ctx.status = 201;
        break;
      case 'DELETE':
        this.ctx.status = 204;
        break;
      default:
        this.ctx.status = 200;
        break;
    }
    console.log(data);
    
    const result = {
      status: 'success',
      data: data ? data : {},
    };
    if (paginates) {
      result.data.offset = parseInt(paginates.offset) || 0;
    }
    if (paginates && paginates.limit) {
      result.data.limit = parseInt(paginates.limit);
    }
    this.ctx.body = result;
  }

  /**
   * 返回一个失败的 HTTP 响应
   *
   * @param {object} msg
   * @param {number} status
   * @param {object} data
   */
  fail(msg, status, data) {
    msg = msg || 'not found';
    status = status || 400;
    this.ctx.status = status;
    const body = {
      status: 'fail',
      message: msg,
    };
    if (data) {
      body.data = data;
    }
    this.ctx.body = body;
  }

  /**
   * 跳转
   */
  redirect() {
    this.ctx.body = 'test';
  }

  /**
   * 判断从 service 返回结果是否正确
   *
   * @param {object} result     service 返回的结果
   * @return {boolean}         成功或失败
   * @memberof BaseController
   */
  isSuccess(result) {
    return result && result.status === 'success';
  }
}

module.exports = BaseController;
