// Copyright 2018 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

'use strict';

const { Service } = require('egg');
const _ = require('lodash');
const moment = require('moment');
const constant = require('app/extend/constant');

/**
 * 包含常用函数的基本 Service 类
 */
class BaseService extends Service {
  /**
   * 下划线。参考：https://underscorejs.org/
   */
  get _() {
    return _;
  }

  /**
   * 返回当前时间
   */
  get moment() {
    return moment;
  }

  /**
   * 获取常量
   */
  get constant() {
    return constant;
  }

  /**
   * 成功返回
   *
   * @param {object} data 返回具体内容
   * @returns {object}    返回包装后的结果
   * @memberof BaseService
   */
  success(data) {
    const result = {
      status: 'success',
    };
    if (data) {
      result.data = data;
    }
    return result;
  }

  /**
   * 失败返回
   *
   * @param {string} code     错误代码
   * @param {string} message  错误信息
   * @param {object} data     错误返回具体内容
   * @returns {object}        返回包装后的结果
   * @memberof BaseService
   */
  fail(code, message, data) {
    const result = {
      status: 'failed',
      code: code + '',
    };
    if (message) {
      result.message = message;
    }
    if (data) {
      result.data = data;
    }
    return result;
  }

  /**
   * 判断从 service 返回结果是否正确
   *
   * @param {object} result     service 返回的结果
   * @returns {boolean}         成功或失败
   * @memberof BaseController
   */
  isSuccess(result) {
    return result && result.status === 'success';
  }
}

module.exports = BaseService;