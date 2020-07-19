/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks', // 左边写成.html后缀，会自动渲染.html文件
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574304999290_9149';

  // add your middleware config here
  config.middleware = [];

  config.cors = {
    origin: '*',
    allowMethods: [ 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS' ],
    allowedHeaders: '*',
    credentials: true,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 80,
      hostname: '127.0.0.1',
    },
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'cdb-nrz62f8g.cd.tencentcdb.com',
      // port
      port: '10089',
      // username
      user: 'root',
      // password
      password: 'admintaining-chen',
      // database
      database: 'sys',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  return {
    view,
    ...config,
    ...userConfig,
  };
};
