/* 路由规则配置 */
import Vue from 'vue'  // 1.引入文件
import Router from 'vue-router'
//2.将vue-router集成到这个项目中来

import index from '../pages/index'
import main from '../pages/main'
import tran from '../pages/tran/index'
import wallet from '../pages/wallet/index'
import user from '../pages/user/index'
import login from '../pages/login/login'
import register from '../pages/login/register'
import agreement from '../pages/login/agreement'
import modifyLog from '../pages/login/modifyLog'
import modifyReg from '../pages/login/modifyReg'
import buy from '../pages/wallet/buy'
import walletDeal from '../pages/wallet/walletDeal'
import cast from '../pages/wallet/cast'
import transfer from '../pages/wallet/transfer'
import withdraw from '../pages/wallet/withdraw'
import withDeta from '../pages/wallet/withDeta'
import seoswith from '../pages/wallet/seoswith'
import eosTurnOut from '../pages/wallet/eosTurnOut'
import seosTurnOut from '../pages/wallet/seosTurnOut'
import exchange from '../pages/wallet/exchange'
import profit from '../pages/wallet/profit'

import tranBuy from '../pages/tran/buy'
import tranSall from '../pages/tran/sall'
import release from '../pages/tran/release'
import record from '../pages/tran/record'
import pay from '../pages/tran/pay'
import rece from '../pages/tran/rece'
import complaint from '../pages/tran/complaint'
import info from '../pages/user/info'
import modjy from '../pages/user/modjy'
import modLog from '../pages/user/modLog'
import security from '../pages/user/security'
import setpay from '../pages/user/setpay'
import appDown from '../pages/user/appDown'
import calculation from '../pages/user/calculation'
import recommend from '../pages/user/recommend'
import team from '../pages/user/team'
import message from '../pages/user/message'
import mesdeta from '../pages/user/mesdeta'
import modmobile from '../pages/user/modmobile'
import modmobile1 from '../pages/user/modmobile1'
import recolist1 from '../pages/user/recolist1'
import recolist2 from '../pages/user/recolist2'
import recolist3 from '../pages/user/recolist3'
import market from '../pages/user/market'
import newpay from '../pages/user/newpay'
import notice from '../pages/notice/index'
import notlist from '../pages/notice/list'
import notdetail from '../pages/notice/detail'
import down from '../pages/down/index'
import downLoad from '../pages/down/load'

Vue.use(Router)   // 3.将vueRouter对象绑定到Vue对象上
var redi
// if (localStorage.getItem('eosInfo')) {
//   redi = '/index'
// } else {
//   redi = '/indx'
// }
// 4.定义路由规则
export default new Router({
  routes: [
    //{path: "/", redirect: redi}, // 当服务器启动默认进入的页面路由
    {path: "/", redirect: '/main'},
    {path: "/main", component: main}, //首页
    {path: "/index", component: index}, //首页
    {path: "/tran", component: tran}, //交易
    {path: "/wallet", component: wallet}, //钱包
    {path: "/user", component: user}, //个人中心
    /*登录注册*/
    {path: "/login", component: login}, //登录
    {path: "/register", component: register}, //注册
    {path: "/agreement", component: agreement}, //用户协议
    {path: "/modifyLog", component: modifyLog}, //修改登录密码
    {path: "/modifyReg", component: modifyReg}, //修改注册密码
    {path: "/modmobile", component: modmobile}, //修改手机号
    {path: "/modmobile1", component: modmobile1}, //修改手机号1
    /*钱包资产管理*/
    {path: "/buy", component: buy}, //购买资产
    {path: "/walletDeal", component: walletDeal}, //钱包明细((1:总资产,2:eos,3:注册资产eos,4:可用seos,5:冻结seos))
    {path: "/cast", component: cast}, //复投
    {path: "/transfer", component: transfer}, //转账
    {path: "/withdraw", component: withdraw}, //提币
    {path: "/withDeta", component: withDeta}, //提币
    // {path: "/seoswith", component: seoswith}, //SEOS提币
    {path: "/transfer", component: transfer}, //转账
    {path: "/exchange", component: exchange}, //兑换  //type1:总资产 2:注册资产EOS 3:EOS
    {path: "/profit", component: profit}, //eos转出地址
    {path: "/eosTurnOut", component: eosTurnOut}, //eos转出地址
    {path: "/seosTurnOut", component: seosTurnOut}, //seos转出地址

    /*交易*/

    {path: "/tranbuy", component: tranBuy}, //交易大厅买入
    {path: "/transall", component: tranSall}, //交易大厅卖出
    {path: "/release", component: release}, //发布交易
    {path: "/record", component: record}, //交易记录
    {path: "/pay", component: pay}, //付款
    {path: "/rece", component: rece}, //收款
    {path: "/complaint", component: complaint}, //投诉
    /*个人中心*/
    {path: "/info", component: info}, //个人资料
    {path: "/security", component: security}, //账户安全
    {path: "/setpay", component: setpay}, //设置收款
    {path: "/newpay", component: newpay}, //添加新收款方式
    {path: "/appDown", component: appDown}, //APP下载
    {path: "/recommend", component: recommend}, //我的推荐二维码
    {path: "/team", component: team}, //我的团队
    {path: "/recolist1", component: recolist1}, //我的推荐列表
    {path: "/recolist2", component: recolist2}, //我的推荐列表
    {path: "/recolist3", component: recolist3}, //我的推荐列表
    {path: "/market", component: market}, //我的市场
    {path: "/modLog", component: modLog}, //修改登录密码
    {path: "/modjy", component: modjy}, //修改交易密码
    {path: "/calculation", component: calculation}, //算力运行
    {path: "/message", component: message}, //留言
    {path: "/mesdeta", component: mesdeta}, //留言

    /*公告*/
    // {path: "/notice", component: notice}, //公告分类
    // {path: "/notlist", component: notlist}, //公告列表
    // {path: "/notdetail", component: notdetail}, //公告详情
    // /*更新*/
    // {path: "/down", component: down}, //公告详情
    // {path: "/downLoad", component: downLoad}, //公告详情
  ]

});
