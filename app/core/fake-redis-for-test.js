// Copyright 2018 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

'use strict';

const _ = require('lodash');

/**
 * 用于测试的 Redis 服务器
 */
class FakeRedisForTest {
  /**
   * 读取值
   * @param {string} key 键
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      if (key in FakeRedisForTest._dict) {
        resolve(FakeRedisForTest._dict[key]);
      } else {
        resolve(null);
      }
    });
  }

  /**
   * 写入值
   * @param {string} key 键
   * @param {*} val      值
   */
  async set(key, val) {
    return new Promise((resolve) => {
      FakeRedisForTest._dict[key] = val;
      resolve(FakeRedisForTest._dict[key]);
    });
  }

  /**
   * 读取多个值
   * @param {Array<string>} keys 键的列表
   */
  async mget(keys) {
    return new Promise((resolve, reject) => {
      const values = _(FakeRedisForTest._dict).pick(keys);
      values.length !== 0 ? resolve(values) : reject();
    });
  }

  /**
   * 删除键值
   * @param {Array<string>} keys 键的列表
   */
  async del(key) {
    return new Promise((resolve) => {
      delete FakeRedisForTest._dict[key];
      resolve();
    });
  }

  /**
   * 查询键
   * @param {string} query 查询
   * @returns {array} 符合查询条件的键列表
   */
  async keys(query) {
    // 目前我们不需要
    return;
  }

  /**
   * 使键值对过期
   */
  async expire() {
    // 目前我们不需要
    return;
  }
}

FakeRedisForTest._dict = {};

module.exports = FakeRedisForTest;