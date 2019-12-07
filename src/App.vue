<template>
  <div id="app">
    <transition :name="'vux-pop-' + (this.direction)">
      <!--<transition :class="{clear,paths}" :name="'vux-pop-in'">-->
      <router-view></router-view>
    </transition>
    <AppFooter v-if=showFooter></AppFooter>
  </div>
</template>

<script>
  import AppFooter from './components/footer.vue'

  export default {
    name: 'app',
    data() {
      return {
        showFooter: true,
        paths: true,
        direction: 'in',//通过判断页面是进入还是退出来改变它的值
        routePath: ''
      }
    },

    created() {
      /*防止刷新出现navbat*/
      let arr = ['/index', '/tran', '/profit', '/notlist', '/user']
      if (arr.indexOf(this.$route.path) == -1) {
        this.showFooter = false
      } else {
        this.showFooter = true
      }
      this.backs()
      if (localStorage.getItem('eosLang')) {
        var eosLang = localStorage.getItem('eosLang')
        if (eosLang == '简体中文') {
          this.$i18n.locale = 'cn'
        } else if (eosLang == 'English') {
          this.$i18n.locale = 'en'
        } else if (eosLang == '日語') {
          this.$i18n.locale = 'rn'
        } else if (eosLang == '한국어') {
          this.$i18n.locale = 'hn'
        } else if (eosLang == 'Français') {
          this.$i18n.locale = 'fn'
        } else if (eosLang == 'русский язык') {
          this.$i18n.locale = 'elsn'
        } else if (eosLang == 'Deutsch') {
          this.$i18n.locale = 'dn'
        } else if (eosLang == 'España') {
          this.$i18n.locale = 'xn'
        } else if (this.langCont == 'العربية') {
          this.$i18n.locale = 'an'
        } else if (this.langCont == 'Hungaria') {
          this.$i18n.locale = 'yn'
        }
      } else {
        this.$i18n.locale = 'cn'
      }
    },
    watch: {
      //页面的切换效果
      '$route'(to, from) {
        this.routePath = this.$route.path
        let routersArr = this.$store.state.routersArr || [];
        if (routersArr.length == 0) {
          routersArr.push(from.path)
          routersArr.push(to.path);
        } else {
          if (routersArr.indexOf(to.path) != -1) {
            this.direction = 'in'
            routersArr.splice(routersArr.indexOf(to.path) + 1, 100)
          } else {
            this.direction = 'out'
            routersArr.push(to.path)
          }
        }
        let routerUrl = to.path
        let routerUrl1 = from.path
        let arr = ['/index', '/tran', '/profit', '/notlist', '/user']
        //console.log(arr.indexOf(routerUrl) == -1);
        if (arr.indexOf(routerUrl) == -1) {
          this.showFooter = false
        } else {
          this.showFooter = true
        }
        if (arr.indexOf(routerUrl) == -1 || arr.indexOf(routerUrl1) == -1) {
          this.paths = false
        } else {
          this.paths = true
          this.direction = 'clear'
        }
      }
    },
    components: {
      AppFooter
    },
    methods: {
      backs() {/*安卓手机返回键处理*/
        var that = this
        document.addEventListener('plusready', function () {
          var webview = plus.webview.currentWebview();
          var first = null;
          plus.key.addEventListener('backbutton', function () {
            webview.canBack(function (e) {
                if (!first) {
                  first = new Date().getTime();//记录第一次按下回退键的时间
                  if (that.routePath == '/login' || that.routePath == '/index') {
                  } else {

                    webview.back();
                  }
                  setTimeout(function () {//1s中后清除
                    first = null;
                  }, 1000);
                } else {
                  if (new Date().getTime() - first < 1000) {//如果两次按下的时间小于1s，
                    plus.runtime.quit();//那么就退出app
                    /*that.$MessageBox.confirm('确定退出吗?', '提示').then(action => {

                      }
                    ).catch(() => {
                    });*/
                  }
                }
              }
            )
          });
        });
      },
    }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
</style>
<style lang="scss" scoped type="text/scss">
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  #app {
    width: 100%;
    height: 100%;
    > div {
      min-height: 100%;
      -webkit-overflow-scrolling: touch;
      background-color: #252E59;
      &#footer {
        min-height: 0;
      }
    }
  }
</style>
