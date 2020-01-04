'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/', controller.home.index);
  router.get('/birthday', controller.home.birthday);
  router.get('/hero', controller.home.hero);
  router.get('/snake', controller.home.snake);
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.post('/user/addWish', controller.user.addWish);
  router.get('/user/chek', controller.user.checkWishs);
};
