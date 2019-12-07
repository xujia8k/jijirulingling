<template>
  <div id="cast">
    <Header>
      <template slot='conter'>{{type==1?$t('注册资产EOS'):type==2?'EOS':type==3?'SEOS':''}}{{$t('转账')}}</template>
      <!--<template slot='right'>
        <div class="ri_icon">
          <i></i>
        </div>
      </template>-->
    </Header>
    <div class="main">
      <div v-if='num' class="tit vux-1px-b">
        <div class="icon">
  <span>
    <i></i>
  </span>
        </div>
        <div class="text">
          <span>{{$t('当前帐户余额')}}：<i>{{num}}</i></span>
        </div>
      </div>
      <div class="from">
        <div v-if='!num' class="list vux-1px-b" @click='show=true'>
          <label for="">{{$t('选择钱包')}}：</label>
          <input type="text" v-model='wallType' disabled>
          <em class='icon'></em>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('接收账号')}}：</label>
          <input type="text" :placeholder="$t('请输入接收方用户名')" v-model='username'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('转出数量')}}：</label>
          <input type="text" :placeholder="$t('请输入转出转账数量')" v-model='amount'>
        </div>
        <!-- <div class="list vux-1px-b">
           <label for="">{{$t('手机号')}}：</label>
           <input type="text" :placeholder="$t('请输入手机号码')" disabled v-model='mobile'>
         </div>
         <div class="list vux-1px-b">
           <label for="">{{$t('短信验证')}}：</label>
           <input type="text" :placeholder="$t('请输入短信验证码')" v-model='code'>
           <button @click='checksms'>{{codeName}}</button>
         </div>-->
        <div class="list vux-1px-b">
          <label class='iphone' for="">{{$t('手机后四位')}}：</label>
          <input type="text" :placeholder="$t('请输入绑定手机后四位')" v-model='moible_four'>
        </div>
        <div class="list vux-1px-b">
          <label class='iphone' for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码' )" v-model='safe_password'>
        </div>
        <div class="btn">
          <button @click='submitBtn'>{{$t('确认转账')}}</button>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          right-text="确定"
          title="请选择转账类型"
          @on-click-right="show=false"
          :show-bottom-border="false"></popup-header>
        <group gutter="0">
          <radio :options="[$t('注册资产EOS'), 'EOS', 'SEOS']" v-model='wallType'></radio>
        </group>
      </popup>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {TransferDom} from 'vux'

  export default {
    data() {
      return {
        switchBtn: true,
        show: false,
        codeBtn: true,
        code: '',
        codeName: '',
        wallType: '',  //钱包类型
        type: '',
        num: '',
        amount: '',
        username: '',
        moible_four:'',
        safe_password: '',
      }
    },
    created() {
      this.codeName = this.$t('获取验证码')
      if (this.$route.query.type) {
        this.type = this.$route.query.type
        this.getwalletInfo()
      } else {
        this.wallType = this.$t('请选择钱包类型')
      }
      if (localStorage.getItem('eosInfo')) {
        this.mobile = JSON.parse(localStorage.getItem('eosInfo')).mobile
      }
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
      getwalletInfo() {
        var that = this;
        var url = that.$inter + "Wallet/index";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            if (that.type == 1) {
              that.num = response.data.data.register_eos
            } else if (that.type == 2) {
              that.num = response.data.data.eos
            } else if (that.type == 3) {
              that.num = response.data.data.seos_use
            }

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
          var data1 = {mobile: that.mobile, type: 10011,}
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
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          if (this.wallType == this.$t('注册资产EOS')) {
            this.type = 1
          } else if (this.wallType == 'EOS') {
            this.type = 2
          } else if (this.wallType == 'SEOS') {
            this.type = 3
          }
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Eos/turnout'
          var data = {
            type: that.type,
            // code:that.code,
            amount: that.amount,
            username: that.username,
            moible_four:that.moible_four,
            safe_password: that.safe_password,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/wallet'})
              }, 2000)
            }
          })
        }
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #cast {
    &#cast {
      background-color: #3D4D89;
    }
    .ri_icon {
      padding: 28px 30px;
      i {
        display: inline-block;
        width: 32px;
        height: 35px;
        background: url("../../../static/images/sprite.png") no-repeat -340px -280px;
        @include background-size(500px 500px);
      }
    }
    .main {
      padding: 0 30px;
      .tit {
        padding: 15px 0;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        .icon {
          width: 88px;
          height: 88px;
          @include border-radius(50%);
          border: 1px solid #1D60FA;
          text-align: center;
          span {
            margin-top: 7px;
            display: inline-block;
            width: 72px;
            height: 72px;
            @include border-radius(50%);
            background-color: #1D60FA;
            i {
              display: inline-block;
              margin-top: 9px;
              width: 35px;
              height: 53px;
              background: url("../../../static/images/sprite.png") no-repeat -340px -330px;
              @include background-size(500px 500px);
            }
          }
        }
        .text {
          margin-left: 30px;
          span {
            font-size: 32px;
            color: #D3D5D8;
            line-height: 88px;
            i {
              font-size: 36px;
              color: #1E61FA;
            }
          }
        }

      }
      .from {
        padding-top: 10px;
        p {
          font-size: 30px;
          color: #DB4D4D;
        }
        .list {
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          label {
            width: 220px;
            font-size: 32px;
            color: #E7E7E7;
            line-height: 96px;
          }
          input {
            padding-left: 0;
            flex: 1;
          }
          button {
            margin-top: 18px;
            width: 180px;
            height: 60px;
            line-height: 60px;
            background-color: #1D61FB;
            font-size: 30px;
            text-align: center;
            color: #fff;
          }
          .icon {
            width: 13px;
            height: 23px;
            position: absolute;
            top: 50%;
            right: 30px;
            margin-top: -11px;
            background: url("../../../static/images/sprite.png") no-repeat -430px -300px;
            @include background-size(500px 500px);
          }
        }
        .btn {
          margin-top: 30px;
          padding-bottom: 50px;
          button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
