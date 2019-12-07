<template>
  <div id='index'>
    <Header>
      <template slot='conter'>{{$t('首页')}}</template>
    </Header>
    <div class="main">
      <div class="assets">
        <div class="ass_top">
          <div class="icon">
            <span>
              <i></i>
            </span>
          </div>
          <div class="text">
            <h6>{{indexInfo.name}}</h6>
            <p><i></i><span>{{indexInfo.level}}</span></p>
          </div>
          <div class="sign_btn" :class="{sign_in:indexInfo.is_sign==1}">
            <span v-if='indexInfo.is_sign==0' @click="$router.push({path:'/calculation'})">{{$t('签到')}}</span>
            <span class='sign_in' v-if='indexInfo.is_sign==1'>{{$t('已签到')}}</span>
            <i></i>
          </div>
        </div>
        <div class="ass_con">
          <h6><span @click="$router.push({path:'/walletDeal',query:{type:1}})">{{$t('总资产')}}</span></h6>
          <p><span @click="$router.push({path:'/walletDeal',query:{type:1}})">{{indexInfo.zichan}}</span></p>
        </div>
        <div class="ass_bot">
          <span @click="$router.push({path:'/walletDeal',query:{type:2}})"><i>EOS</i>{{indexInfo.eos}}</span>
          <span @click="$router.push({path:'/walletDeal',query:{type:4}})"><i>SEOS</i>{{indexInfo.seos}}</span>
        </div>
      </div>
      <div class="price_img">
        <h6 @click='canvasBtn=!canvasBtn'><span>EOS {{$t('实时价格图')}}<em>{{indexInfo.eos_price}}</em></span><i></i></h6>
        <div v-show='canvasBtn' id="myChart"></div>
      </div>
      <!--  <div class="function">
        <div class="mode">
          <router-link to='/transfer'>
            <div class="bag">
              <div class="big_box bag_box1"></div>
              <i class='icon1'></i>
            </div>
            <p>{{$t('转账')}}</p>
          </router-link>
        </div>
        <div class="mode">
          <router-link to='/buy'>
            <div class="bag">
              <div class="big_box bag_box2"></div>
              <i class='icon2'></i>
            </div>
            <p>{{$t('升级')}}</p>
          </router-link>
        </div>
        <div class="mode">
          <router-link to='/cast'>
            <div class="bag">
              <div class="big_box bag_box3"></div>
              <i class='icon3'></i>
            </div>
            <p>{{$t('复投')}}</p>
          </router-link>
        </div>
        <div class="mode">
          <router-link to='/register'>
            <div class="bag">
              <div class="big_box bag_box4"></div>
              <i class='icon4'></i>
            </div>
            <p>{{$t('注册')}}</p>
          </router-link>
        </div>
        <div class="mode">
          <router-link to='/team'>
            <div class="bag">
              <div class="big_box bag_box5"></div>
              <i class='icon5'></i>
            </div>
            <p>{{$t('社群')}}</p>
          </router-link>
        </div>
        <div class="mode">
          <router-link to='/wallet'>
            <div class="bag">
              <div class="big_box bag_box6"></div>
              <i class='icon6'></i>
            </div>
            <p>{{$t('钱包')}}</p>
          </router-link>
        </div> -->
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from '../components/header'
import echarts from 'echarts'

export default {
    data() {
        return {
            indexInfo: {
                price_trand: []
            },
            canvasBtn: false, //折线图的显示隐藏
            canvasIndex: 1,
            /*折线图*/
        };
    },
    created() {
        this.indexInfo = this.$store.state.indexInfo
        this.getindexInfo()
        this.getbaodanLevel()
    },
    mounted() {

    },
    components: {
        Header
    },
    computed: {},
    watch: {
        'canvasBtn': function () {
            if (this.canvasBtn && this.canvasIndex == 1) {
                setTimeout(() => {
                    this.canvasIndex++
                    this.drawLine()
                }, 50)
            }
        }
    },
    methods: {
        getindexInfo() {
            var that = this;
            var url = that.$inter + "Index/index";
            var data = {};
            that.$axios.post(url, data).then(function (response) {
                if (response.data.error != 0) {
                    that.$Toast(response.data.message, response.data.error);
                } else if (response.data.error == 0) {
                    that.indexInfo = response.data.data
                    that.$store.state.indexInfo = response.data.data
                }
            });
        },
        /*折线图*/
        drawLine() {
            var that = this
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            var data = []
            var time = []
            that.indexInfo.price_trand.forEach(function (v, i) {
                time.push(v.name)
                data.push(v.value)
            })


            var option = {
                title: { //标题
                    text: '',
                },
                tooltip: { //提示框
                    trigger: 'axis'
                },
                legend: { //图例控件，点击图例控制哪些系列不现实
                    show: false,
                },
                grid: {
                    left: '15%',
                    right: '5%',
                    top: '10%',
                    height: '80%'
                },
                xAxis: {
                    type: 'category',
                    data: time,
                    scale: true,
                    //                boundaryGap: false,
                    axisLine: {
                        onZero: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#3B63C2'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#3B63C2'
                        }
                    },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisLabel: {
                        color: "#D6D6D6"
                    },
                    axisPointer: {
                        z: 100
                    }
                },
                yAxis: {
                    scale: true,
                    axisLabel: {
                        show: true,
                        color: "#D6D6D6"
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                    }
                },
                dataZoom: {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                series: { //MA5 5天内的收盘价之和/5
                    name: 'MA5',
                    type: 'line',
                    showSymbol: false,
                    data: data,
                    smooth: true, //是否平滑
                    itemStyle: {
                        color: '#1D56D9'
                    },
                    lineStyle: {
                        normal: {
                            color: '#1D56D9',
                            width: 2,
                            opacity: 1
                        }
                    },
                },
            };
            myChart.setOption(option);


        },
        /*存储钱包状态*/
        getwalletInfo() {
            var that = this;
            var url = that.$inter + "Wallet/index";
            var data = {};
            that.$axios.post(url, data).then(function (response) {
                if (response.data.error != 0) {
                    that.$Toast(response.data.message, response.data.error);
                } else if (response.data.error == 0) {
                    that.$store.state.suocang = response.data.data.seos_freeze
                    that.$store.state.is_seos_tibi = response.data.data.is_seos_tibi
                    that.$store.state.duihuan = response.data.data.duihuan

                }
            });
        },
        /*升级的缓存*/
        getbaodanLevel() {
            var that = this;
            var url = that.$inter + "Eos/baodanLevel";
            var data = {};
            that.$axios.post(url, data).then(function (response) {
                if (response.data.error != 0) {
                    that.$Toast(response.data.message, response.data.error);
                } else if (response.data.error == 0) {
                    that.$store.state.levelList = response.data.data
                }
            });
        },
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  @import "../../static/css/css3";

  #index {
    height: calc(100% - 120px);
    min-height: 20px !important;
    overflow: auto;
    .main {
      padding: 30px;
      .assets {
        width: 100%;
        height: 415px;
        background: url("../../static/images/index_bag1.png");
        @include background-size(100%);
        .ass_top {
          padding-top: 25px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          position: relative;
          .icon {
            margin-left: 30px;
            width: 122px;
            height: 122px;
            @include border-radius(50%);
            border: 1px solid #1D60FA; /*no*/
            text-align: center;
            span {
              margin-top: 10px;
              display: inline-block;
              width: 100px;
              height: 100px;
              @include border-radius(50%);
              background-color: #1D60FA;
              i {
                margin-top: 13px;
                display: inline-block;
                width: 49px;
                height: 74px;
                background: url("../../static/images/sprite.png") no-repeat 0 -100px;
                @include background-size(500px 500px);
              }
            }
          }
          .text {
            margin-left: 20px;
            h6 {
              margin-top: 15px;
              font-size: 34px;
              color: #fff;
              line-height: 36px;
            }
            p {
              margin-top: 16px;
              display: inline-block;
              width: 180px;
              height: 46px;
              background-color: #0F1529;
              @include border-radius(23px);
              i {
                display: inline-block;
                vertical-align: middle;
                width: 49px;
                height: 50px;
                background: url("../../static/images/sprite.png") no-repeat -410px -50px;
                @include background-size(500px 500px);
              }
              span {
                margin-left: 8px;
                display: inline-block;
                vertical-align: middle;
                font-size: 28px;
                color: #9AA1B2;
                line-height: 46px;
              }
            }
          }
          .sign_btn {
            width: 168px;
            height: 60px;
            line-height: 60px;
            background-color: #1D61FB;
            position: absolute;
            @include border-radius(30px 0 0 30px);
            top: 50%;
            right: 0;
            margin-top: -30px;
            /* &.sign_in{
               background-color: #666;
             }*/
            span {
              margin-left: 40px;
              display: inline-block;
              vertical-align: middle;
              font-size: 28px;
              color: #fff;
            }
            i {
              margin-left: 14px;
              display: inline-block;
              vertical-align: middle;
              width: 12px;
              height: 22px;
              background: url("../../static/images/sprite.png") no-repeat -480px -120px;
              @include background-size(500px 500px);
            }
          }
        }
        .ass_con {
          margin-top: 50px;
          text-align: center;
          h6 {
            font-size: 26px;
            line-height: 26px;
            color: #fff;
          }
          p {
            margin-top: 20px;
            font-size: 48px;
            line-height: 48px;
            color: #FB8B1E;
          }
        }
        .ass_bot {
          margin-top: 50px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          span {
            font-size: 34px;
            color: #fff;
            i {
              margin-right: 20px;
              font-size: 30px;
              color: #fff;
            }
          }
        }
      }
      .price_img {
        margin-top: 30px;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #3B4D89;
        @include border-radius(20px);
        h6 {
          padding-left: 24px;
          font-size: 34px;
          color: #fff;
          line-height: 36px;
          border-left: 6px solid #1D61FB;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          em {
            margin-left: 30px;
          }
          i {
            margin-right: 30px;
            width: 17px;
            height: 31px;
            line-height: 36px;
            background: url("../../static/images/sprite.png") no-repeat -470px -50px;
            @include background-size(500px 500px);
          }
        }
        #myChart {
          width: 100%;
          height: 690px;
        }
      }
      .function {
        margin-top: 30px;
        padding-top: 25px;
        width: 100%;
        height: 599px;
        background: url("../../static/images/index_bag2.png");
        @include background-size(100%);
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .mode {
          margin-top: 35px;
          width: 33.3%;
          text-align: center;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          .bag {
            display: inline-block;
            width: 165px;
            height: 164px;
            position: relative;
            .big_box {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: url("../../static/images/sprite2.png") no-repeat;
              @include background-size(600px 600px);
              -webkit-transition-property: -webkit-transform;
              -webkit-transition-duration: 1s;
              -moz-transition-property: -moz-transform;
              -moz-transition-duration: 1s;
              -webkit-animation: rotate 3s linear infinite;
              -moz-animation: rotate 3s linear infinite;
              -o-animation: rotate 3s linear infinite;
              animation: rotate 3s linear infinite;
              @-webkit-keyframes rotate {
                from {
                  -webkit-transform: rotate(0deg)
                }
                to {
                  -webkit-transform: rotate(360deg)
                }
              }
              @-moz-keyframes rotate {
                from {
                  -moz-transform: rotate(0deg)
                }
                to {
                  -moz-transform: rotate(359deg)
                }
              }
              @-o-keyframes rotate {
                from {
                  -o-transform: rotate(0deg)
                }
                to {
                  -o-transform: rotate(359deg)
                }
              }
              @keyframes rotate {
                from {
                  transform: rotate(0deg)
                }
                to {
                  transform: rotate(359deg)
                }
              }
              &.bag_box1 {
                background-position: 0 0;
              }
              &.bag_box2 {
                background-position: -170px 0;
              }
              &.bag_box3 {
                background-position: -340px 0;
              }
              &.bag_box4 {
                background-position: 0 -170px;
              }
              &.bag_box5 {
                background-position: -170px -170px;
              }
              &.bag_box6 {
                background-position: -340px -170px;
              }
            }
            i {
              display: inline-block;
              background: url("../../static/images/sprite.png") no-repeat;
              @include background-size(500px 500px);
              &.icon1 {
                margin-top: 47px;
                width: 73px;
                height: 67px;
                background-position: 0 -200px;
              }
              &.icon2 {
                margin-top: 50px;
                width: 54px;
                height: 76px;
                background: url("../../static/images/sprite2.png") no-repeat -530px 0;
                @include background-size(600px 600px)
              }
              &.icon3 {
                margin-top: 47px;
                width: 61px;
                height: 65px;
                background-position: -150px -200px;
              }
              &.icon4 {
                margin-top: 49px;
                width: 56px;
                height: 64px;
                background-position: -220px -200px;
              }
              &.icon5 {
                margin-top: 49px;
                width: 87px;
                height: 61px;
                background-position: -280px -200px;
              }
              &.icon6 {
                margin-top: 49px;
                width: 69px;
                height: 60px;
                background-position: -370px -200px;
              }
            }
          }
          p {
            margin-top: 24px;
            font-size: 30px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
