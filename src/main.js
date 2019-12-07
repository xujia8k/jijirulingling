// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import inter from './pages/interface'
import router from './router'
import i18n from './assets/i18n/i18n'
import axios from 'axios'
import store from './vuex/index'
import 'lib-flexible/flexible.js'  //rem适配
/*es6语法转换*/
import promise from 'es6-promise';

promise.polyfill();

/*css初始化样式表*/
import '../static/css/base.css'

Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.withCredentials = true;
Vue.prototype.$inter = inter.apidomain;

/*引入vux插件及配置*/
import {
  Tabbar,
  TabbarItem,
  Toast,
  Confirm,
  Datetime,
  DatetimePlugin,
  ToastPlugin,
  ConfirmPlugin,
  CheckIcon,
  PopupHeader,
  Popup, Group, XSwitch, Radio,
  TransferDom, Scroller, LoadMore, Divider
} from 'vux'

Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
Vue.component('datetime', Datetime)
Vue.component('DatetimePlugin', DatetimePlugin)
Vue.component('check-icon', CheckIcon)
Vue.component('popup-header', PopupHeader)
Vue.component('popup', Popup)
Vue.component('group', Group)
Vue.component('x-switch', XSwitch)
Vue.component('radio', Radio)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('divider', Divider)

// import {, Popup, TransferDom, Group, XSwitch, Radio} from 'vux'

Vue.use(ToastPlugin, {position: 'middle', time: 2000})
Vue.use(ConfirmPlugin)
Vue.use(DatetimePlugin)
Vue.use(TransferDom)

Vue.prototype.$Toast = function (cont,mas) {
  var that = this
  if (mas == '2020401') {
    that.$vux.toast.text(cont)
    setTimeout(function () {
      that.$router.push({path: '/login'})
    }, 2000)
  } else {
    that.$vux.toast.text(cont)
  }
}
Vue.prototype.$MessageBox = function (title, cont) {
  Vue.$vux.confirm.show({
    title: title,
    content: cont,
    onShow() {
      console.log('plugin show')
    },
    onHide() {
      console.log('plugin hide')
    },
    onCancel() {
      console.log('plugin cancel')
    },
    onConfirm() {
      console.log('plugin confirm')
    }
  })
}

// Vue.config.productionTip = false
// 利用Vue对象进行解析渲染

/*解决app在ios上点击事件的延迟效果*/
/*import fastclick from 'fastclick'

fastclick.attach(document.body)*/
/*复制粘贴插件*/
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

new Vue({
  el: '#app',
  router,  // 使用路由对象实例
  store,   // 使用vuex对象实例
  i18n,
  template: '<App/>',
  components: {App}
})
