'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi,欢迎访问 taining.chen 的个人网站。该网站正在紧张建设中。该主人可能去火星探险还未归来，所以在这段时间可以去访问一下www.bilibili.com')
      .expect(200);
  });
});
