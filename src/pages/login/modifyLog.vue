<template>
  <div id="login">
    <Header>
      <template slot='conter'>{{$t('忘记密码')}}</template>
      <template slot='right'><router-link to='/login' id='reg'>{{$t('登录')}}</router-link></template>
    </Header>
    <div class="main">
      <div class="logo">
        <img src="../../../static/images/logo.gif" alt="">
        <br>
        <img src="../../../static/images/logo_text.png" alt="">
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon1'></i></div>
        <input type="text" :placeholder="$t('请输入您注册时的手机号')" v-model='mobile'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon3'></i></div>
        <input type="text" :placeholder="$t('请输入验证码')" v-model='code'>
        <button @click='checksms'>{{codeName}}</button>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请输入新密码')" v-model='login_password'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请再次输入密码')" v-model='login_password2'>
      </div>
      <div class="btn">
        <button @click='modSubmit'>{{$t('确认修改')}}</button>
      </div>
      <!--<div class="botlist1"></div>
      <div class="botlist2"></div>
      <div class="botlist3"></div>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/loginHeader'

  export default {
    data() {
      return {
        codeBtn: true,
        codeName: '',
        mobile:'',
        login_password:'',
        login_password2:'',
        code:'',
      }
    },
    created() {
      this.codeName=this.$t('获取验证码')
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取短信验证码*/
      checksms() {
        if (this.codeBtn) {
          var that = this
          var url = that.$inter + 'System/sendMobile'
          that.codeBtn = false
          var play = null
          var data1 = {mobile: that.mobile, type: 10002,}
          that.$axios.post(url, data1).then(function (response) { //获取到内容处理
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.codeBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              var time = 60
              play = setInterval(() => {
                time--
                that.codeName = time + 's'
                if (time <= 0) {
                  clearInterval(play)
                  that.codeName = that.$t('获取验证码')
                  that.codeBtn = true
                }
              }, 1000)
            }
          })
        }
      },
      /*确定修改*/
      modSubmit() {
          var that = this
          var url = that.$inter + 'Login/findPassword'
          var data = {
            mobile: that.mobile,
            code: that.code,
            login_password: that.login_password,
            login_password2: that.login_password2,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/login'})
              }, 2000)
            }
          })
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #login {
    padding-bottom: 50px;
    @include background-size(100% 100%);
    &#login{
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
          &:nth-child(1){
            width: 380px;
            height: 380px;
          }
          &:nth-child(3){
            margin-top: -50px;
            width: 293px;
            height: 71px;
          }
        }
        p{
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
          background-color: #5163A1;
          line-height: 58px;
          @include border-radius(29px);
          color: #DADADA;
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
          color: #8791A3;
          font-size: 26px;
          span {
            margin-left: 20px;
            color: #8791A3;
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
          color: #8791A3;
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
  }
</style>
