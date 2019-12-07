<template>
  <div id="cast">
    <Header>
      <template slot='conter'>{{$t('修改交易密码')}}</template>
    </Header>
    <div class="main">
      <div class="from">
        <div class="list vux-1px-b">
          <label for="">{{$t('新密码')}}：</label>
          <input type="password" :placeholder="$t('请输入新的交易密码' )"v-model='safe_password1'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('新密码')}}：</label>
          <input type="password" :placeholder="$t('请再次输入新的交易密码')" v-model='safe_password2'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('手机号')}}：</label>
          <input type="text" :placeholder="$t('请输入手机号')" v-model='mobile' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('短信验证')}}：</label>
          <input type="text" :placeholder="$t('请输入短信验证码')" v-model='code'>
          <button @click='checksms'>{{codeName}}</button>
        </div>
        <div class="btn">
          <button @click='modSubmit'>{{$t('确认修改')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        eosInfo:{},
        codeBtn: true,
        codeName: '',
        mobile: '',
        safe_password1: '',
        safe_password2: '',
        code: '',
      }
    },
    created() {
      this.codeName=this.$t('获取验证码')
      if (localStorage.getItem('eosInfo')) {
        this.eosInfo = JSON.parse(localStorage.getItem('eosInfo'))
        this.mobile = this.eosInfo.mobile
      }
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
          var data1 = {mobile: that.mobile, type: 10003,}
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
        var url = that.$inter + 'Login/editSafePassword'
        var data = {
          mobile: that.mobile,
          code: that.code,
          safe_password1: that.safe_password1,
          safe_password2: that.safe_password2,
        }
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.$Toast(response.data.message)
            setTimeout(function () {
              that.$router.push({path: '/user'})
            }, 2000)
          }
        })
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
      .inve_type {
        padding-top: 30px;
        h6 {
          font-size: 32px;
          color: #E7E7E7;
        }
        input {
          width: 100%;
          padding-left: 0;
        }
      }
      .from {
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
