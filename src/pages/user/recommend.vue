<template>
  <div id="reco">
    <Header>
      <template slot='conter'>{{$t('我的推荐二维码')}}</template>
    </Header>
    <div class="main vux-1px-t">
      <h6>{{$t('分享给好友')}}</h6>
      <div class="ewm">
        <qrcode :size='qrcodeSize' :value="links" type="img"></qrcode>
      </div>
      <div class="extension">
        <p>{{$t('您的推荐码')}}:</p>
        <p><span>{{this.eosInfo.user_id}}</span></p>
      </div>
      <div class="links">
        <p>{{$t('您的推荐链接')}}：</p>
        <p><span>{{links}}</span></p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {Qrcode} from 'vux'

  export default {
    data() {
      return {
        qrcodeSize:150,
        eosInfo:{}
      }
    },
    created() {
      if (localStorage.getItem('eosInfo')) {
        this.eosInfo = JSON.parse(localStorage.getItem('eosInfo'))
        this.links = this.eosInfo.domain_name+'/#/register'
      }
    },
    mounted() {
    },
    components: {Header, Qrcode},
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #reco {
    &#reco {
      background-color: #3D4D89;
    }
    .main {
      position: relative;
      text-align: center;
      padding: 120px 30px 50px 30px;
     background: url("../../../static/images/down_bag.png")no-repeat;
      @include background-size(100% 446px);
      h6{
        font-size: 36px;
        color: #fff;
      }
      .ewm {
        display: inline-block;
        margin-top: 70px;
        width: 170px; /*no*/
        height: 170px; /*no*/
        padding: 10px; /*no*/
        background-color: #fff;
        @include border-radius(10px); /*no*/
      }
      .extension{
        margin-top: 60px;
        p{
          margin-top: 10px;
          font-size: 30px;
          color: #E7E7E7;
          span{
            font-size: 48px;
            color: #fff;
          }
        }
      }
      .links{
        margin-top: 30px;
        p{
          margin-top: 10px;
          font-size: 30px;
          color: #E7E7E7;
          word-wrap: break-word;
          span{
            font-size: 38px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
