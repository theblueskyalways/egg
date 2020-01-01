// Copyright 2018 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

'use strict';

const initSpaceService = async (app) => {
  // 初始化 Space 服务
  const { SpaceServiceTypes } = require('app/extend/constant');
  for (const key in SpaceServiceTypes) {
    if (SpaceServiceTypes.hasOwnProperty(key)) {
      const service = SpaceServiceTypes[key];
      await app.createAnonymousContext().service.spaceService.add(service);
    }
  }
};

const initApisPermissions = async (app) => {
  // 初始化 API权限
  const { OpenApiRedisKey } = require('app/extend/constant');
  const ctx = app.createAnonymousContext();
  let apis = await ctx.modelMySQL.Apis.findAll({
    attributes: [ 'url' ],
    where: { isDel: false }
  });
  apis = apis.map(v => (v.url));
  await ctx.modelMySQL.Apis.bulkCreate(OpenApiRedisKey.filter(v => apis.indexOf(v.url) < 0));
};

module.exports = {
  initLDAP: async (app) => {
    const LDAPConfig = require('app/extend/ldap/ldap-config');
    const DNHelper = require('app/extend/ldap/ldap-dn');
    const LDAPHelper = require('app/extend/ldap-helper');

    app.ldapConfig = new LDAPConfig(app);
    app.ldapDNHelper = new DNHelper(app.ldapConfig);
    const ctx = { app };
    app.adminLDAPHelper = new LDAPHelper(ctx);
    await app.adminLDAPHelper.entryHelper.bindAsAdmin();
    ctx.adminLDAPHelper = app.adminLDAPHelper;
    // 创建 LDAP 大组
    if (app.testing) {
      await app.adminLDAPHelper.entryHelper.deleteTree(app.config.ldap.base);
    }
    await app.adminLDAPHelper.entryHelper.initGlobalGroups();
  },

  createIXAM: async (app) => {
    // 创建公司 ID 为1的虚拟公司，(统计时对全体公司数据的统计放到这个虚拟公司下)
    const company = {
      customerName: '9AMCORP',
      companyName: '9AMCORP',
      adminName: '9AMCORP',
      telephone: 13309527000,
      password: '9amcorppassword',
      email: 'mockcompany@test.com',
      address: 'MockCompanyAddress',
      website: 'www.mockcompanywebsite.com',
      industry: 'MockCompaynyIndustry',
      remark: 'MockCompanyRemark',
      isDel: false,
      companyId: 1,
    };
    const ctx = app.createAnonymousContext();
    ctx.ldapHelper = app.adminLDAPHelper;
    ctx.adminLDAPHelper = app.adminLDAPHelper;
    if (!await ctx.modelMySQL.Company.count({
      where: { companyId: company.companyId }
    })) {
      await ctx.service.company.add(company);
    }
    await app.adminLDAPHelper.initSpecialGroups();
    await initSpaceService(app);
    await initApisPermissions(app);
  },

  setDefaultWechatReply: async (app) => {
    const { CacheKey, WechatDefaultAutoReply, WechatKeywordReplyObj, WechatMenuDataObj,
      WechatSubscribeReplyObj, DefaultSedentaryThreshold,
      DefaultSedentaryReportHint, DefaultWeeklyReportHint } = require('app/extend/constant');
    // 设置默认的久坐报告判定阈值和公众号回复规则

    const sedentaryThreshold = await app.redis.get(CacheKey.SEDENTARY_THRESHOLD);
    if (!sedentaryThreshold) {
      await app.redis.set(CacheKey.SEDENTARY_THRESHOLD, DefaultSedentaryThreshold);
    }

    const sedentaryReportHint = await app.redis.get(CacheKey.SEDENTARY_REPORT_HINT);
    if (!sedentaryReportHint) {
      await app.redis.set(CacheKey.SEDENTARY_REPORT_HINT, DefaultSedentaryReportHint);
    }

    const weeklyReportHint = await app.redis.get(CacheKey.WEEKLY_REPORT_HINT);
    if (!weeklyReportHint) {
      await app.redis.set(CacheKey.WEEKLY_REPORT_HINT, DefaultWeeklyReportHint);
    }
    const wechatDefaultAutoReply = await app.redis.get(CacheKey.WECHAT_DEFAULT_AUTO_ERPLY);
    if (!wechatDefaultAutoReply) {
      await app.redis.set(CacheKey.WECHAT_DEFAULT_AUTO_ERPLY, WechatDefaultAutoReply);
    }

    const wechatKeyWordReply = await app.redis.get(CacheKey.WECHAT_KEYWORD_REPLY);
    if (!wechatKeyWordReply) {
      await app.redis.set(CacheKey.WECHAT_KEYWORD_REPLY, JSON.stringify(WechatKeywordReplyObj));
    }

    const wechatMenuData = await app.redis.get(CacheKey.WECHAT_MENU_DATA);
    if (!wechatMenuData) {
      await app.redis.set(CacheKey.WECHAT_MENU_DATA, JSON.stringify(WechatMenuDataObj));
    }

    const wechatSubscribeReply = await app.redis.get(CacheKey.WECHAT_SUBSCRIBE_REPLY);
    if (!wechatSubscribeReply) {
      await app.redis.set(CacheKey.WECHAT_SUBSCRIBE_REPLY, JSON.stringify(WechatSubscribeReplyObj));
    }
  }
};