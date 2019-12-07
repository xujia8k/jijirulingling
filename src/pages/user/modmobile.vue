<template>
  <div id="cast">
    <Header>
      <template slot='conter'>{{$t('修改手机号码')}}</template>
    </Header>
    <div class="main">
      <div class="from">
        <div class="list vux-1px-b">
          <label for="">{{$t('手机号')}}：</label>
          <input type="text" :placeholder="$t('请输入手机号')" v-model='usermobile' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('短信验证')}}：</label>
          <input type="text" :placeholder="$t('请输入短信验证码')" v-model='old_code'>
          <button @click='checksms'>{{usercodeName}}</button>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>
        <div class="btn">
          <button @click='modSubmit'>{{$t('下一步')}}</button>
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
        eosInfo: {},
        safe_password: '',
        old_code: '',
        usermobile: '',
        usercodeBtn: true,
        usercodeName: '',
      }
    },
    created() {
      this.usercodeName = this.$t('获取验证码')
      if (localStorage.getItem('eosInfo')) {
        this.usermobile = JSON.parse(localStorage.getItem('eosInfo')).mobile
      }
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取旧的手机短信验证码*/
      checksms() {
        if (this.usercodeBtn) {
          var that = this
          var url = that.$inter + 'System/sendMobile'
          that.usercodeBtn = false
          var play = null
          var data1 = {mobile: that.usermobile, type: 10014,}
          that.$axios.post(url, data1).then(function (response) { //获取到内容处理
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
              that.usercodeBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              var time = 60
              play = setInterval(() => {
                time--
                that.usercodeName = time + 's'
                if (time <= 0) {
                  clearInterval(play)
                  that.usercodeName = that.$t('获取验证码')
                  that.usercodeBtn = true
                }
              }, 1000)
            }
          })
        }
      },
      /*确定修改*/
      modSubmit() {
        var that = this
        var url = that.$inter + 'Member/editmobileone'
        var data = {
          old_code: that.old_code,
          safe_password: that.safe_password,
        }
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            setTimeout(function () {
              that.$router.push({path: '/modmobile1'})
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
