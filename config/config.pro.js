// Copyright 2018 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

'use strict';

module.exports = appInfo => {
  const config = (exports = {});
  config.keys = appInfo.name + '_1526892474009_349';
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
  return config;
};
