import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Index from './views/user/Index.vue'
import Main from './views/user/Main.vue'
import Detail from './views/user/Detail.vue'
import word from './views/user/word.vue'
import allword from './views/user/allword.vue'
import wordGroup from './views/user/wordGroup.vue'
import mywordGroup from './views/user/myWordGroup.vue'
import download from './views/user/download.vue'
import test from './views/user/test.vue'
import oldwordtest from './views/user/oldwordtest.vue'
import fitness from './views/user/fitnessData.vue'
import List from './views/user/List.vue'
import CLUB from './views/nav1/CLUB.vue'
import Active from './views/nav1/Active.vue'
import user from './views/nav1/user.vue'
import Apply from './views/nav2/Page5.vue'


let routes = [
    {
        path: '/index',
        component: Index,
        leaf: true,//只有一个节点
        iconCls:'el-icon-house',
        name:'主页',
        children: [
            { path: '/main', component: Main, name: '社团主页' },
        ],
        isTrue:true,
        hidden:true
    },
    {
        path: '/index',
        component: Index,
        leaf: true,//只有一个节点
        iconCls:'el-icon-s-custom',
        name:'列表',
        children: [
            { path: '/list', component: List, name: '社团列表' },
        ],
        isTrue:true,
        hidden:true
    },
    {
        path: '/index',
        component: Index,
        leaf: false,//只有一个节点
        iconCls:'el-icon-s-custom',
        name:'列表',
        children: [
            { path: '/detail', component: Detail, name: '社团详细' },
        ],
        isTrue:false,
        hidden:true
    },
    // {
    //     path: '/index',
    //     component: Index,
    //     leaf: false,//只有一个节点
    //     iconCls:'el-icon-s-custom',
    //     name:'列表',
    //     children: [
    //         { path: '/userInfo', component: userInfo, name: '用户中心' },
    //     ],
    //     isTrue:false,
    //     hidden:true
    // },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '注册',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '单词本',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页' },
            // { path: '/table', component: Table, name: 'Table' },
            // { path: '/club', component: CLUB, name: '社团管理' },
            { path: '/word', component: word, name: '我的生词' },
            { path: '/allword', component: allword, name: '词库' },
            { path: '/wordGroup', component: wordGroup, name: '词组库' },
            { path: '/myWordGroup', component: mywordGroup, name: '我的词组' },
            { path: '/test', component: test, name: '生词测试' },
            { path: '/review', component: oldwordtest, name: '熟词复习' },
            { path: '/download', component: download, name: '下载文件' },
            { path: '/fitness', component: fitness, name: '体重记录' },
            
            
            // { path: '/user', component: user, name: '用户列表' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '活动与审核',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/active', component: Active, name: '活动列表' },            
    //         { path: '/apply', component: Apply, name: '申请审核' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/login' }
    },
   
];

export default routes;