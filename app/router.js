'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
<<<<<<< HEAD
  router.get('/game',controller.game.game)
  router.get('/game/game_1',controller.game.game_1)
  router.get('/game/game_2',controller.game.game_2)
=======
  router.get('/hero', controller.home.hero);
  router.get('/snake', controller.home.snake);
>>>>>>> 9df6a844f8a8e13f7bc1ac1304e11ddd769f9735
};
