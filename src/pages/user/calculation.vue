<template>
  <div id="calculation">
    <Header>
      <template slot='conter'>{{$t('算力运行')}}</template>
    </Header>
    <div class="main">
      <img src="../../../static/images/com.gif" alt="">
      <button>{{$t('算力运行中')}}</button>
      <div class="time">{{time}}S</div>
    </div>
    <div v-show='hbBtn' id="mask"></div>
    <div v-show='hbBtn' id="envelopes">
      <div class="imgs">
        <img src="../../../static/images/hbb.gif" alt="">
        <div class="btn">
          <p>{{indexInfo.amount}}</p>
          <button @click="$router.push({path:'/index'})">返回首页</button>
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
        hbBtn: false,
        play: null,
        time: 6,
        indexInfo: {}
      }
    },
    created() {
    },
    mounted() {
      this.play = setInterval(() => {
        this.time = this.time - 1
        console.log(this.time);
        if (this.time <= 0) {
          clearInterval(this.play)
          this.getindexInfo()
        }
      }, 1000)
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*签到*/
      getindexInfo() {
        var that = this;
        var url = that.$inter + "Wallet/sign_in";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.indexInfo = response.data.data
            that.hbBtn = true
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #calculation {
    &#calculation {
      background-color: #3D4D89;
    }
    height: 100%;
    position: relative;
    .main {
      height: calc(100% - 90px);
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      button {
        position: absolute;
        top: 40px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        padding: 20px 30px;
        background-color: transparent;
        border: 2px solid #0F3D55; /*no*/
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        color: #fff;
        font-size: 32px;
        line-height: 40px;
      }
      .time {
        position: absolute;
        top: 40px;
        right: 40px;
        width: 100px;
        height: 100px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border: 2px solid #0F3D55; /*no*/
        color: #fff;
        text-align: center;
        line-height: 100px;
        font-size: 36px;
      }
    }
    #mask {
      height: calc(100% - 90px);
      top: 90px;
      background-color: #080D1A;
      opacity: 1;
    }
    #envelopes {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1002;
      width: 100%;
      .imgs {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        @include background-size(100% 100%);
        img{
          margin-top: -80px;
          width: 100%;
        }
        .btn{
          width: 100%;
          position: absolute;
          bottom: 400px;
          text-align: center;
          p {
            font-size: 30px;
            line-height: 80px;
            color: #F2CD41;

          }
          > button {
            width: 260px;
            height: 67px;
            background-color: #E73735;
            font-size: 32px;
            line-height: 67px;
          }
        }
      }
    }
  }
</style>
