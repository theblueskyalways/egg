'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/game',controller.game.game)
  router.get('/game/game_1',controller.game.game_1)
  router.get('/game/game_2',controller.game.game_2)
};
