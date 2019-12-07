<template>
  <div id="down">
    <div class="imgs">
      <img src="../../../static/images/logo.png" alt="">
    </div>
    <ul>
      <li @click="$router.push({path:'/downLoad',query:{url:downLink.ios_Asia}})">
        <button><img src="../../../static/images/ios.png" alt="" class='ios'><span>{{$t('苹果手机下载')}}（{{$t('亚太站点')}}）</span></button>
      </li>
      <li @click="$router.push({path:'/downLoad',query:{url:downLink.android_Asia}})">
        <button><img src="../../../static/images/anz.png" alt="" class='an'><span>{{$t('安卓手机下载')}}（{{$t('亚太站点')}}）</span></button>
      </li>
      <li @click="$router.push({path:'/downLoad',query:{url:downLink.ios_America}})">
        <button><img src="../../../static/images/ios.png" alt="" class='ios'><span>{{$t('苹果手机下载')}}（{{$t('美国站点')}}）</span></button>
      </li>
      <li @click="$router.push({path:'/downLoad',query:{url:downLink.android_America}})">
        <button><img src="../../../static/images/anz.png" alt="" class='an'><span>{{$t('安卓手机下载')}}（{{$t('美国站点')}}）</span></button>
      </li>
      <li @click="$router.push({path:'/downLoad',query:{url:downLink.ios_London}})">
        <button><img src="../../../static/images/ios.png" alt="" class='ios'><span>{{$t('苹果手机下载')}}（{{$t('伦敦站点')}}）</span></button>
      </li>
      <li @click="$router.push({path:'/downLoad',query:{url:downLink.android_London}})">
        <button><img src="../../../static/images/anz.png" alt="" class='an'><span>{{$t('安卓手机下载')}}（{{$t('伦敦站点')}}）</span></button>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        downLink: {}
      }
    },
    created() {
      this.getDownLink()
    },
    mounted() {
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      /*获取站点网址*/
      getDownLink() {
        var that = this
        var url = that.$inter + 'System/qrcode'
        var data = {}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
          } else if (response.data.error == 0) {
            that.downLink = response.data.data

          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #down#down {
    background-color: #435593;
    .imgs {
      text-align: center;
      padding-top: 100px;
      img {
        width: 400px;
        height: 400px;
      }
    }
    ul {
      padding-top: 20px;
    }
    li {
      margin-top: 50px;
      text-align: center;
    }
    button {
      width: 550px;
      margin: 0 auto;
      background-color: transparent;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      border: 1px solid #fff; /*no*/
      .ios {
        margin-top: 15px;
        width: 44px;
        height: 54px;
      }

      .an {
        margin-top: 20px;
        width: 48px;
        height: 50px;
      }
      span {
        margin-left: 30px;
        color: #fff;
        line-height: 88px;
      }
    }
  }
</style>
