<template>
  <div id="login">
    <Header>
      <template slot='conter'>{{$t('登录')}}</template>
      <!-- <template slot='right'>
         <router-link to='/register' id='reg'>{{$t('注册')}}</router-link>
       </template>-->
    </Header>
    <div class="main">
      <div class="logo">
        <img src="../../../static/images/logo.gif" alt="">
        <br>
        <img src="../../../static/images/logo_text.png" alt="">
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon1'></i></div>
        <input type="text" :placeholder="$t('请输入用户名')" v-model='name'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请输入密码')" v-model='login_password'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon3'></i></div>
        <input type="text" :placeholder="$t('请输入验证码')" v-model='imgcode'>
        <img @click='logImgBtn' :src="logImg" alt="">
      </div>
      <div class="btn">
        <button @click='logSubmit'>{{$t('登 录')}}</button>
      </div>
      <div class="bottom">
        <div class="left" @click='show=true'>{{$t('语言')}} <span>{{langCont}} <i></i></span></div>
        <router-link to='/modifyLog'>{{$t('忘记密码')}}？</router-link>
      </div>
      <!--<div class="botlist1"></div>
      <div class="botlist2"></div>
      <div class="botlist3"></div>-->
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          :right-text="$t('确定')"
          :title="$t('语言')"
          @on-click-right="clickRight"
          :show-bottom-border="false"></popup-header>
        <!--<group gutter="0">
          <radio
            :options="['简体中文', 'English','日語','한국어','Deutsch','Français','русский язык','España','العربية','Hungaria']"
            v-model='langCont'></radio>
        </group>-->
        <group title="">
          <radio v-model='langCont' :options="radio001"></radio>
        </group>
      </popup>
    </div>
    <div v-if='downbtn' id="mask"></div>
    <div v-if='downbtn' id="down">
      <h6>{{$t('发现新版本,请更新!')}}</h6>
      <p>{{$t('请复制链接在浏览器打开')}}</p>
      <button class='down_btn'
           v-clipboard:copy="urls"
           v-clipboard:success="onCopy"
           v-clipboard:error="onError">{{$t('复制链接')}}
      </button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/loginHeader'
  import {TransferDom} from 'vux'

  export default {
    data() {
      return {
        radio001: [
          {
            key: '简体中文',
            icon: './static/images/cn.png',
            value: '简体中文'
          }, {
            key: 'English',
            icon: './static/images/en.png',
            value: 'English'
          }, {
            key: '日語',
            icon: './static/images/rn.png',
            value: '日語'
          }, {
            key: '한국어',
            icon: './static/images/hn.png',
            value: '한국어'
          }, {
            key: 'Deutsch',
            icon: './static/images/dn.png',
            value: 'Deutsch'
          }, {
            key: 'Français',
            icon: './static/images/fn.png',
            value: 'Français'
          }, {
            key: 'русский язык',
            icon: './static/images/elsn.png',
            value: 'русский язык'
          }, {
            key: 'España',
            icon: './static/images/xn.png',
            value: 'España'
          }, {
            key: 'العربية',
            icon: './static/images/an.png',
            value: 'العربية'
          }, {
            key: 'Hungaria',
            icon: './static/images/yn.png',
            value: 'Hungaria'
          }
        ],
        langCont: '',
        show: false,
        logImg: '',
        imgcode: '',
        name: '',
        login_password: '',
        random: '',
        downUrl: '',
        downbtn: false,
      }
    },
    created() {
      this.random = Math.floor(Math.random() * 20) + 1
      this.logImg = './static/images/verify' + this.random + '.png'
      if (localStorage.getItem('eosLang')) {
        var eosLang = localStorage.getItem('eosLang')
        if (eosLang == '简体中文') {
          this.langCont = '简体中文'
        } else if (eosLang == 'English') {
          this.langCont = 'English'
        } else if (eosLang == '日語') {
          this.langCont = '日語'
        } else if (eosLang == '한국어') {
          this.langCont = '한국어'
        } else if (eosLang == 'Français') {
          this.langCont = 'Français'
        } else if (eosLang == 'русский язык') {
          this.langCont = 'русский язык'
        } else if (eosLang == 'Deutsch') {
          this.langCont = 'Deutsch'
        } else if (eosLang == 'España') {
          this.langCont = 'España'
        } else if (this.langCont == 'العربية') {
          this.langCont = 'العربية'
        } else if (this.langCont == 'Hungaria') {
          this.langCont = 'Hungaria'
        }
      } else {
        this.langCont = '简体中文'
      }
      this.getUpdateInfo()
      this.getInfo()
    },
    mounted() {
    },
    directives: {
      TransferDom
    },
    components: {Header},
    computed: {},
    watch: {
      'langCont': function () {
        this.clickRight()
      }
    },
    methods: {
      getInfo() {
        var that = this;
        var url = that.$inter + "System/qrcode";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.urls = response.data.data.url
          }
        });
      },
      // 复制成功
      onCopy(e) {
        var that = this
        this.$Toast(that.$t('复制成功'))

      },
      // 复制失败
      onError(e) {
        var that = this
        this.$Toast(that.$t('复制失败'))
      },
      /*切换语言*/
      clickRight() {
        if (this.langCont == '简体中文') {
          this.$i18n.locale = 'cn'
          this.langType = 1
        } else if (this.langCont == 'English') {
          this.$i18n.locale = 'en'
          this.langType = 2
        } else if (this.langCont == '日語') {
          this.$i18n.locale = 'rn'
          this.langType = 8
        } else if (this.langCont == '한국어') {
          this.$i18n.locale = 'hn'
          this.langType = 7
        } else if (this.langCont == 'Français') {
          this.$i18n.locale = 'fn'
          this.langType = 6
        } else if (this.langCont == 'русский язык') {
          this.$i18n.locale = 'elsn'
          this.langType = 5
        } else if (this.langCont == 'Deutsch') {
          this.$i18n.locale = 'dn'
          this.langType = 4
        } else if (this.langCont == 'España') {
          this.$i18n.locale = 'xn'
          this.langType = 9
        } else if (this.langCont == 'العربية') {
          this.$i18n.locale = 'an'
          this.langType = 3
        } else if (this.langCont == 'Hungaria') {
          this.$i18n.locale = 'yn'
          this.langType = 10
        }
        localStorage.setItem('eosLang', this.langCont)
        this.switchlang()
        // this.getEosInfo()
        this.show = false
      },
      /*修改图像验证码*/
      logImgBtn() {
        this.random = Math.floor(Math.random() * 20) + 1
        this.logImg = './static/images/verify' + this.random + '.png'
      },
      /*登录按钮*/
      logSubmit() {
        if ((this.random == 1 && this.imgcode == '4930') || (this.random == 2 && this.imgcode == '0227') || (this.random == 3 && this.imgcode == '0927') || (this.random == 4 && this.imgcode == '0628') || (this.random == 5 && this.imgcode == '0871') || (this.random == 6 && this.imgcode == '7299') || (this.random == 7 && this.imgcode == '3824') || (this.random == 8 && this.imgcode == '9171') || (this.random == 9 && this.imgcode == '6156') || (this.random == 10 && this.imgcode == '9954') || (this.random == 11 && this.imgcode == '8443') || (this.random == 12 && this.imgcode == '0590') || (this.random == 13 && this.imgcode == '3271') || (this.random == 14 && this.imgcode == '8672') || (this.random == 15 && this.imgcode == '9379') || (this.random == 16 && this.imgcode == '2939') || (this.random == 17 && this.imgcode == '4586') || (this.random == 18 && this.imgcode == '9362') || (this.random == 19 && this.imgcode == '8772') || (this.random == 20 && this.imgcode == '8642')) {
          var that = this
          var url = that.$inter + 'Login/index'
          var data = {
            name: that.name,
            login_password: that.login_password,
            img_code: that.imgcode
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
              that.random = Math.floor(Math.random() * 20) + 1
              that.logImg = './static/images/verify' + that.random + '.png'
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              that.$store.state.online = true
              that.getEosInfo()
              setTimeout(function () {
                that.$router.push({path: '/index'})
              }, 2000)
            }
          })
        } else {
          this.random = Math.floor(Math.random() * 20) + 1
          this.logImg = './static/images/verify' + this.random + '.png'
          this.imgcode = ''
          this.$Toast(this.$t('请输入正确的图片验证码'))
        }
      },
      /*切换语言*/
      switchlang() {
        var that = this
        var url = that.$inter + 'System/setlanguage'
        var data = {type: that.langType}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            // that.$Toast(response.data.message)
          }
        })
      },
      /*获取个人信息*/
      getEosInfo() {
        var that = this
        var url = that.$inter + 'Member/index'
        var data = {}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            localStorage.setItem('eosInfo', JSON.stringify(response.data.data))
          }
        })
      },
      /*获取更新信息*/
      getUpdateInfo() {
        var that = this
        var url = that.$inter + 'System/version'
        var data = {ver: 5}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
          } else if (response.data.error == 0) {
            that.downUrl = response.data.data.url
            if (response.data.data.code == 1) {
              that.downbtn = true
            }
          }
        })
      },
      downAppBtn() {
        location.href = this.downUrl
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #login {
    padding-bottom: 50px;
    @include background-size(100% 100%);
    &#login {
      background-color: #232D57;
    }
    #reg {
      display: inline-block;
      padding: 0 30px;
      font-size: 24px;
      color: #fff;
      line-height: 90px;
    }
    .main {
      margin: 30px 70px;
      padding-bottom: 130px;
      @include border-radius(20px);
      background-color: #3B4D89;
      position: relative;
      .logo {
        padding-top: 45px;
        text-align: center;
        position: relative;
        img {
          &:nth-child(1) {
            width: 380px;
            height: 380px;
          }
          &:nth-child(3) {
            margin-top: -50px;
            width: 293px;
            height: 71px;
          }
        }
        p {
          width: 100%;
          font-size: 60px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      .list {
        margin: 0 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        .left {
          width: 90px;
          text-align: center;
          i {
            display: inline-block;
            background: url("../../../static/images/sprite.png") no-repeat;
            @include background-size(500px 500px);
            &.icon1 {
              width: 41px;
              height: 39px;
              background-position: -230px 0;
              margin-top: 26px;
            }
            &.icon2 {
              width: 32px;
              height: 40px;
              background-position: -280px 0;
              margin-top: 26px;
            }
            &.icon3 {
              width: 31px;
              height: 40px;
              background-position: -320px 0;
              margin-top: 26px;
            }
          }
        }
        input {
          padding-left: 5px;
          flex: 1;
          font-size: 32px;
          color: #fff;
        }
        button {
          margin-top: 29px;
          width: 185px;
          height: 58px;
          font-size: 30px;
          background-color: #E7E7E7;
          line-height: 58px;
          @include border-radius(29px);
          color: #E7E7E7;
        }
        img {
          width: 150px;
          height: 95px;
        }
      }
      .btn {
        margin-top: 40px;
        padding: 0 30px;
        button {
          width: 100%;
          font-size: 34px;
        }
      }
      .bottom {
        margin-top: 32px;
        padding: 0 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .left {
          color: #E7E7E7;
          font-size: 26px;
          span {
            margin-left: 20px;
            color: #E7E7E7;
            i {
              display: inline-block;
              vertical-align: middle;
              width: 19px;
              height: 11px;
              background: url("../../../static/images/sprite.png") no-repeat -360px 0;
              @include background-size(500px 500px);
            }
          }
        }
        a {
          font-size: 26px;
          text-align: right;
          width: 230px;
          color: #E7E7E7;
        }
      }
      .botlist1 {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        height: 40px;
        padding: 0 20px;
        background-color: #1D2439;
        @include border-radius(16px);
      }
      .botlist2 {
        width: calc(100% - 40px);
        height: 50px;
        position: absolute;
        left: 20px;
        bottom: 0;
        z-index: 2;
        bottom: -25px;
        @include border-radius(16px);
        background-color: #192036;
      }
      .botlist3 {
        width: calc(100% - 80px);
        height: 50px;
        position: absolute;
        bottom: -50px;
        left: 40px;
        z-index: 1;
        @include border-radius(16px);
        background-color: #141B2E;
      }
    }
    #down {
      width: 500px;
      height: 700px;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 1002;
      margin-left: -250px;
      margin-top: -350px;
      background: url("../../../static/images/down.png") no-repeat;
      @include background-size(500px 700px);
      text-align: center;
      h6 {
        margin-top: 400px;
        font-size: 40px;
        color: #1C7EE3;
        line-height: 40px;
      }
      p {
        margin-top: 30px;
        font-size: 32px;
      }
      .down_btn {
        width: 100%;
        background-color: transparent;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 80px;
        font-size: 32px;
        color: #fff;
        line-height: 80px;
        @include border-radius(0);
      }
    }
  }
</style>
