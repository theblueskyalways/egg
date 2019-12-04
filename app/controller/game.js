const Controller = require('egg').Controller;

class GameController extends Controller{
    async game() {
        const { ctx } = this;
        let title = "我是游戏页"; //向模板传入数据
        const dataList = {
            list: [
              { id: 1, title: '拼图游戏', url: '/game/game_1' },
              { id: 2, title: '华容道', url: '/game/game_2' }
            ]
          };
        await ctx.render('games/game_list',dataList);
        // ctx.body = 'hi,欢迎访问 long 的游戏页。该网站正在紧张建设中。该主人可能找陈死狗了，所以在这段时间可以去看一会爱情动作片';
    }
    async game_1() {
        const { ctx } = this;
        let title = "我是拼图游戏"; //向模板传入数据
       
        await ctx.render('games/game_hua_1',{title:title});
      
    }
    async game_2() {
        const { ctx } = this;
        let title = "我是华容道"; //向模板传入数据
       
        await ctx.render('games/game_hua_2',{title:title});
    
    }
   
}
module.exports = GameController