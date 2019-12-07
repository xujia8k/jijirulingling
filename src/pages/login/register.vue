<template>
  <div id="login">
    <Header>
      <template slot='conter'>{{$t('注册')}}</template>
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
        <div class="left"><i class='icon7'></i></div>
        <input type="text" :placeholder="$t('请输入手机号码')" v-model='mobile'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请输入登录密码' )" v-model='login_password1'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请再次输入登录密码' )" v-model='login_password2'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password1'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请再次输入交易密码')" v-model='safe_password2'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon5'></i></div>
        <input type="text" :placeholder="$t('请输入推荐人用户名')" v-model='share_user_id'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon6'></i></div>
        <input type="text" :placeholder="$t('接点人用户名')" v-model='jiedian_user_id'>
        <div class="right" @click='show=true'><span>{{typeType}}</span><i></i></div>
      </div>
      <div class="list meal vux-1px-b" @click='show1=true'>
        <div class="left"><i class='icon8'></i></div>
        <input type="text" :placeholder="$t('请选择套餐')" v-model='typeType1' disabled>
        <em></em>
      </div>
     <!-- <div class="list vux-1px-b">
        <div class="left"><i class='icon7'></i></div>
        <input type="text" :placeholder="$t('请输入注册人手机号')" v-model='usermobile' disabled>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon3'></i></div>
        <input type="text" :placeholder="$t('请输入验证码')" v-model='code'>
        <button @click='checksms'>{{codeName}}</button>
      </div>-->
      <div class="list vux-1px-b">
        <div class="left"><i class='icon7'></i></div>
        <input type="text" :placeholder="$t('请输入绑定手机后四位')" v-model='moible_four'>
      </div>
      <div class="list vux-1px-b">
        <div class="left"><i class='icon2'></i></div>
        <input type="password" :placeholder="$t('请输入您的交易密码')" v-model='safe_password'>
      </div>
      <div class="btn">
        <!--<p>
          <check-icon :value.sync="demo1"></check-icon>
          <span>{{$t('我已阅读')}}</span>
          <router-link to='/agreement'>《{{$t('用户协议')}}》</router-link>
        </p>-->
        <button @click='determineFunc'>{{$t('注册')}}</button>
      </div>
      <!--<div class="bottom">
        <router-link to='/login'>{{$t('已有账号,去登录')}}</router-link>
      </div>-->
      <!--<div class="botlist1"></div>
      <div class="botlist2"></div>
      <div class="botlist3"></div>-->
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          :right-text="$t('确定')"
          :title="$t('请选择区')"
          @on-click-right="show=false"
          :show-bottom-border="false"></popup-header>
        <group gutter="0">
          <radio :options="[$t('左区'), $t('右区')]" v-model='typeType'></radio>
        </group>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="show1">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          :right-text="$t('确定')"
          :title="$t('请选择套餐类型')"
          @on-click-right="show1=false"
          :show-bottom-border="false"></popup-header>
        <group gutter="0">
          <radio :options="opaLevel" v-model='typeType1'></radio>
        </group>
      </popup>
    </div>
    <div v-show='determineBtn' id="mask"></div>
    <div v-show='determineBtn' id="determine">
      <h6>{{$t('提示')}}</h6>
      <p><span>{{$t('被注册手机号')}}:</span> <i>{{mobile}}</i></p>
      <p><span v-if='share_user_id'>{{$t('推荐人账号')}}:</span> {{share_user_id}}</p>
      <p><span v-if='jiedian_user_id'>{{$t('接点人用户名')}}:</span> {{jiedian_user_id}}</p>
      <p><span>{{$t('左右区选择')}}:</span> {{typeType}}</p>
      <p><span>{{$t('选择套餐')}}:</span> {{typeType1}}</p>
      <div class="btn vux-1px-t">
        <button class='vux-1px-r' @click='determineBtn=false'>取消</button>
        <button @click='regSubmit'>确定</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {TransferDom} from 'vux'

  export default {
    data() {
      return {
        determineBtn: false,
        show: false,
        show1: false,
        codeBtn: true,
        levelList: [],  //资产列表
        opaLevel: [],
        codeName: '',
        demo1: true,
        name: '',
        mobile: '',
        code: '',
        login_password1: '',
        login_password2: '',
        safe_password1: '',
        safe_password2: '',
        share_user_id: '',
        jiedian_user_id: '',
        moible_four:'',
        safe_password: '',
        type: '',
        typeType: '',
        typeType1: '',
        usermobile: '',
      }
    },
    created() {
      this.typeType = this.$t('左右区选择')
      this.codeName = this.$t('获取验证码')
      if (this.$route.query.name) {
        this.share_user_id = this.$route.query.name
        this.jiedian_user_id = this.$route.query.name
        if (this.$route.query.type == 1) {
          this.type = 1
          this.typeType = this.$t('左区')
        } else {
          this.type = 2
          this.typeType = this.$t('右区')
        }
      }
      if (localStorage.getItem('eosInfo')) {
        this.usermobile = JSON.parse(localStorage.getItem('eosInfo')).mobile
      }
      this.getbaodanLevel()
    },
    mounted() {
    },
    directives: {
      TransferDom
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取购买资产级别*/
      getbaodanLevel() {
        var that = this;
        var url = that.$inter + "Eos/baodanLevel";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.levelList = response.data.data
            that.levelList.forEach(function (v, i) {
              that.opaLevel.push(v.amount)
            })
          }
        });
      },
      /*获取短信验证码*/
      checksms() {
        if (this.codeBtn) {
          var that = this
          var url = that.$inter + 'System/sendMobile'
          that.codeBtn = false
          var play = null
          var data1 = {mobile: that.usermobile, type: 10001,}
          that.$axios.post(url, data1).then(function (response) { //获取到内容处理
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
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
      /*注册按钮*/
      regSubmit() {
        if (this.demo1) {
          if (this.typeType == '左区') {
            this.type = 1
          } else if (this.typeType == '右区') {
            this.type = 2
          }
          var that = this
          var url = that.$inter + 'Register/index'
          var data = {
            name: that.name,
            amount: that.typeType1,
            mobile: that.mobile,
            // code: that.code,
            login_password1: that.login_password1,
            login_password2: that.login_password2,
            safe_password1: that.safe_password1,
            safe_password2: that.safe_password2,
            share_username: that.share_user_id,
            jiedian_username: that.jiedian_user_id,
            type: that.type,
            moible_four:that.moible_four,
            safe_password: that.safe_password
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
              that.determineBtn = false
            } else if (response.data.error == 0) {
              that.determineBtn = false
              setTimeout(function () {
                that.$router.push({path: '/index'})
              }, 2000)
            }
          })
        } else {
          var that = this
          this.$Toast(that.$t('请勾选用户协议'))
        }

      },
      /*验证信息*/
      determineFunc() {
        var that =this
        if (this.typeType == '左区') {
          this.type = 1
        } else if (this.typeType == '右区') {
          this.type = 2
        }
        if (this.name == '' || this.typeType1 == '' || this.mobile == ''  || this.login_password1 == '' || this.login_password2 == '' || this.safe_password1 == '' || this.safe_password2 == ''  ||  this.safe_password == '') {

          this.$Toast(that.$t('请填全信息'))
        } else {
          this.determineBtn = true
        }
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #login {
    padding-bottom: 100px;
    @include background-size(100%);
    .main {
      margin: 0 70px;
      padding-bottom: 50px;
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
            &.icon4 {
              width: 40px;
              height: 40px;
              background-position: -390px 0;
              margin-top: 26px;
            }
            &.icon5 {
              width: 50px;
              height: 38px;
              background-position: -440px 0;
              margin-top: 27px;
            }
            &.icon6 {
              width: 43px;
              height: 38px;
              background-position: -230px -50px;
              margin-top: 27px;
            }
            &.icon7 {
              width: 24px;
              height: 40px;
              background-position: -290px -50px;
              margin-top: 26px;
            }
            &.icon8 {
              width: 36px;
              height: 36px;
              background-position: -320px -50px;
              margin-top: 28px;
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
          width: 190px;
          height: 58px;
          font-size: 30px;
          background-color: #5163A1;
          line-height: 58px;
          @include border-radius(29px);
          color: #DADADA;
        }
        .right {
          margin-top: 18px;
          text-align: center;
          width: 210px;
          height: 62px;
          @include border-radius(30px);
          border: 2px solid #DADADA;
          span {
            display: inline-block;
            vertical-align: middle;

            color: #DADADA;
            line-height: 60px;
          }
          i {
            margin-left: 10px;
            display: inline-block;
            vertical-align: middle;
            width: 16px;
            height: 9px;
            background: url("../../../static/images/sprite.png") no-repeat -360px -20px;
            @include background-size(500px 500px);
          }
        }
        &.meal {
          position: relative;
          em {
            position: absolute;
            top: 40px;
            right: 30px;
            width: 16px;
            height: 9px;
            background: url("../../../static/images/sprite.png") no-repeat -360px -20px;
            @include background-size(500px 500px);
          }
        }
      }
      .btn {
        margin-top: 20px;
        padding: 0 30px;
        p {
          color: #8791A3;
          a {
            color: #8791A3;
          }
        }
        button {
          margin-top: 20px;
          width: 100%;
          font-size: 34px;
        }
      }
      .bottom {
        margin-top: 32px;
        padding: 0 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
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
    #determine {
      width: 600px;
      background-color: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -300px;
      z-index: 1002;
      @include border-radius(10px);
      text-align: center;
      h6 {
        font-size: 28px;
        line-height: 60px;
        font-weight: bold;
        border-bottom: 1px solid #E5E5E5;
      }
      p {
        font-size: 26px;
        color: #656565;
        line-height: 70px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        span {
          margin-left: 80px;
          margin-right: 20px;
        }
      }
      .btn {
        margin-top: 20px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        width: 100%;
        button {
          width: 50%;
          height: 60px;
          line-height: 60px;
          font-size: 28px;
          @include border-radius(10px);
          background-color: transparent;
          color: #fff;
          &:nth-child(1) {
            color: #353535;
          }
          &:nth-child(2) {
            color: #0BB20C;
          }
        }
      }
    }
  }
</style>
