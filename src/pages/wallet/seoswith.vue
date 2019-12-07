<template>
  <div id="cast">
    <Header>
      <template slot='conter'>SEOS{{$t('提币')}}</template>
    </Header>
    <div class="main">
      <div class="tit vux-1px-b">
        <div class="icon">
  <span>
    <i></i>
  </span>
        </div>
        <div class="text">
          <span>{{$t('当前帐户')}}EOS：<i>300</i></span>
        </div>
      </div>
      <div class="from">
        <div class="list vux-1px-b">
          <label for="">{{$t('转出地址')}} ：</label>
          <span>shrotjkgjjdeirliwrkyjyjl</span>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('提币数量')}}：</label>
          <input type="text" :placeholder="$t('请输入提取eos数量')">
        </div>
        <p>{{$t('')}}温馨提示：手续费为10%，预计到账90</p>
        <div class="list vux-1px-b">
          <label for="">手机号：</label>
          <input type="text" placeholder='请输入手机号码'>
        </div>
        <div class="list vux-1px-b">
          <label for="">短信验证：</label>
          <input type="text" placeholder='请输入短信验证码'>
          <button>获取验证码</button>
        </div>
        <div class="list vux-1px-b">
          <label for="">交易密码：</label>
          <input type="password" placeholder='请输入交易密码'>
        </div>
        <div class="btn">
          <button>确认提币</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #cast {
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
          border: 1px solid #1FBB67;
          text-align: center;
          span {
            margin-top: 7px;
            display: inline-block;
            width: 72px;
            height: 72px;
            @include border-radius(50%);
            background-color: #1FBB67;
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
          margin-top: 15px;
          font-size: 30px;
          line-height: 50px;
          color: #DB4D4D;
        }
        .list {
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          label {
            width: 180px;
            font-size: 32px;
            color: #C3C5CB;
            line-height: 96px;
          }
          span{
            font-size: 32px;
            line-height: 96px;
            color: #1E61FA;
            text-decoration: underline;
          }
          input{
            padding-left: 0;
            flex: 1;
          }
          button{
            margin-top: 18px;
            width: 180px;
            height: 60px;
            line-height: 60px;
            background-color: #1D61FB;
            font-size: 30px;
            text-align: center;
            color: #fff;
          }
          .icon{
            width: 13px;
            height: 23px;
            position: absolute;
            top: 50%;
            right: 30px;
            margin-top: -11px;
            background: url("../../../static/images/sprite.png")no-repeat -430px -300px;
            @include background-size(500px 500px);
          }
        }
        .btn{
          margin-top: 30px;
          padding-bottom: 50px;
          button{
            width: 100%;
          }
        }
      }
    }
  }
</style>
