<template>
  <div id="down">
    <Header>
      <template slot='conter'>APP{{$t('下载')}}</template>
    </Header>
    <div class="main vux-1px-t">
      <img src="../../../static/images/down_bag.png" alt="">
      <div class="ewm">
        <!--<img :src="urls" alt="">-->
        <qrcode :value="urls" type="img" :size='qrcodeSize'></qrcode>
      </div>
    </div>
    <button class="ml10" type="text" size="medium"
       v-clipboard:copy="urls"
       v-clipboard:success="onCopy"
       v-clipboard:error="onError">{{urls}}
    </button>
    <p>{{$t('扫描下载安装app应用')}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {Qrcode} from 'vux'

  export default {
    data() {
      return {qrcodeSize: 150, urls: ''}
    },
    created() {
      this.getInfo()
    },
    mounted() {
    },
    components: {Header, Qrcode},
    computed: {},
    watch: {},
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
    }
  }
</script>
<style lang="scss" type="text/scss">
  .ewm img {
    width: 300px;
    height: 300px;
  }
</style>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #down {
    .main {
      position: relative;
      > img {
        width: 100%;
      }
      .ewm {
        padding: 20px;
        background-color: #fff;
        @include border-radius(20px);
        position: absolute;
        top: 100%;
        left: 50%;
        margin-top: -170px;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        img {
          width: 300px;
          height: 300px;
        }
      }
    }
    > p,button {
      background-color: transparent;
      margin-top: 50px;
      padding: 0 30px;
      text-align: center;
      font-size: 32px;
      color: #E7E7E7;
      word-wrap: break-word;
      a {
        color: #E7E7E7;
      }
      &:nth-child(3) {
        margin-top: 200px;

      }
    }
  }
</style>
