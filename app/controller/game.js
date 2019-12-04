const Controller = require('egg').Controller;

class GameController extends Controller {
    //拼图游戏
    async game_1() {
        const { ctx } = this;
        let title = "我是拼图游戏"; //向模板传入数据

        await ctx.render('games/game_hua_1', { title: title });

    }
    //华容道简版
    async game_2() {
        const { ctx } = this;
        let title = "我是华容道"; //向模板传入数据

        await ctx.render('games/game_hua_2', { title: title });

    }

}
module.exports = GameController