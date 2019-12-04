'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/game_1',controller.game.game_1)
  router.get('/game_2',controller.game.game_2)
  router.get('/hero', controller.home.hero);
  router.get('/snake', controller.home.snake);
};
