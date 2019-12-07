<template>
  <div id="buy">
    <Header>
      <template slot='conter'>{{$t('升级')}}</template>
    </Header>
    <div class="main">
      <!--<div class="tit vux-1px-b">
        <div class="icon">
  <span>
    <i></i>
  </span>
        </div>
        <div class="text">
          <span>{{$t('当前帐户EOS')}}：<i>{{eosInfo}}</i></span>
        </div>
      </div>-->
      <div class="inve_type">
        <h6>{{$t('选择投票级别')}}</h6>
        <div class="type_main">
          <div @click='levelBtnFun(v.is_buy,v.amount,v.beishu)' :class="{active:amount==v.amount}" class="type_list"
               v-for='(v,i) in levelList' :key='i'>
            <span><i></i>{{v.amount}}</span>
            <div class="icon"><i></i></div>
          </div>
        </div>
      </div>
      <div class="from">
        <p v-show='amount'>{{$t('温馨提示：选择投票级别为')}}{{amount}}{{$t('，收益为')}}{{beishu}}{{$t('倍')}}</p>
        <!-- <div class="list vux-1px-b">
           <label for="">{{$t('手机号')}}：</label>
           <input type="text" :placeholder="$t('请输入手机号码')" disabled v-model='eosInfo.mobile'>
         </div>
         <div class="list vux-1px-b">
           <label for="">{{$t('短信验证')}}：</label>
           <input type="text" :placeholder="$t('请输入短信验证码')" v-model='code'>
           <button @click='checksms'>{{codeName}}</button>
         </div>-->
        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>
        <div class="btn">
          <button @click='submitBtn'>{{$t('立即升级')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header2'

  export default {
    data() {
      return {
        switchBtn: true,
        eosInfo: '',
        levelList: [],
        mobile: '',
        codeBtn: true,
        codeName: '',
        amount: '',
        beishu: '',
        code: '',
        safe_password: '',
      }
    },
    created() {
      this.codeName = this.$t('获取验证码')
      this.eos = this.$route.query.eos
      if (localStorage.getItem('eosInfo')) {
        this.eosInfo = JSON.parse(localStorage.getItem('eosInfo'))
        this.mobile = this.eosInfo.mobile
      }
      if (this.$store.state.levelList) {
        this.levelList = this.$store.state.levelList
      } else {
        this.getbaodanLevel()
      }

    },
    mounted() {
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
          }
        });
      },
      /*选择类型*/
      levelBtnFun(x, y, z) {
        var that = this
        if (x == 1) {
          this.amount = y;
          this.beishu = z
        } else {
          this.$Toast(that.$t('不能选择该级别'))
        }

      },
      /*获取短信验证码*/
      checksms() {
        if (this.codeBtn) {
          var that = this
          var url = that.$inter + 'System/sendMobile'
          that.codeBtn = false
          var play = null
          var data1 = {mobile: that.mobile, type: 10008,}
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
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Eos/baodan'
          var data = {
            amount: that.amount,
            // code: that.code,
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

  #buy {
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
      .inve_type {
        padding-top: 30px;
        h6 {
          font-size: 32px;
          color: #E7E7E7;
        }
        .type_main {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .type_list {
            margin-top: 35px;
            width: 50%;
            width: 328px;
            height: 184px;
            line-height: 184px;
            background: url("../../../static/images/buy_type_bag.png") no-repeat;
            @include background-size(100%);
            @include border-radius(20px);
            text-align: center;
            position: relative;
            overflow: hidden;
            span {
              display: inline-block;
              padding-left: 50px;
              height: 184px;
              font-size: 72px;
              color: #1E61FA;
              position: relative;
              i {
                position: absolute;
                left: 20px;
                bottom: 50px;
                display: inline-block;
                width: 35px;
                height: 53px;
                background: url("../../../static/images/sprite.png") no-repeat -340px -330px;
                @include background-size(500px 500px);
                -webkit-transform: scale(.5);
                -moz-transform: scale(.5);
                -ms-transform: scale(.5);
                -o-transform: scale(.5);
                transform: scale(.5);
              }
            }
            .icon {
              position: absolute;
              bottom: 0;
              right: 0;
              border-top: 50px solid transparent;
              border-bottom: 50px solid #2F3F7A;
              border-left: 50px solid transparent;
              border-right: 50px solid #2F3F7A;
              i {
                width: 35px;
                height: 23px;
                position: absolute;
                bottom: -35px;
                right: -35px;
                background: url("../../../static/images/sprite.png") no-repeat -380px -310px;
                @include background-size(500px 500px);
              }
            }
            &.active {
              .icon {
                border-bottom-color: #1D61FB;
                border-right-color: #1D61FB;
                i {
                  background-position: -380px -280px;
                }
              }
            }
          }
        }
      }
      .from {
        padding-top: 30px;
        p {
          font-size: 30px;
          color: #DB4D4D;
        }
        .list {
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          label {
            width: 180px;
            font-size: 32px;
            color: #E7E7E7;
            line-height: 96px;
          }
          input {
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
