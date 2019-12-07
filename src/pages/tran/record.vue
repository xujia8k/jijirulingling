<template>
  <div id="record">
    <Header>
      <template slot='conter'>{{$t('交易记录')}}</template>
    </Header>
    <div class="main">
      <div class="nav">
        <div>
          <span @click='nav=1' :class='{active:nav==1}'>{{$t('买入记录')}}</span>
        </div>
        <div>
          <span @click='nav=2' :class='{active:nav==2}'>{{$t('卖出记录')}}</span>
        </div>
      </div>
      <div class="cont">
        <div v-show='nav==1' class='buy'>
          <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom1" ref="scrollerBottom"
                    :scroll-bottom-offst="200">
            <div class="list">
              <div class='top vux-1px-b'>
                <span>订单号：156845095064</span><i>2018-08-27</i>
              </div>
              <div class="con">
                <div class="left">
                  <span>￥0.272</span>
                  <i>单价</i>
                </div>
                <div class="cont">
                  <span>100</span>
                  <i>数量</i>
                </div>
                <div class="right">
                  <span class='succ'>交易成功</span>
                  <i>状态</i>
                </div>
              </div>
              <div class="progress">
                <span></span>
              </div>
              <div class="bot vux-1px-t">
                <div class="left">
                  <img src="../../../static/images/user_default.png" alt="">
                  <div class="text">
                    <p>卖出用户</p>
                    <p> 1721183567</p>
                  </div>
                </div>
                <div class="right">
                  <span>投诉状态：未投诉</span>
                </div>
              </div>
            </div>
            <load-more v-show='listBat' tip="加载中..."></load-more>
            <divider v-show='!listBat'>我是有底线的</divider>
          </scroller>
        </div>
        <div v-show='nav==2' class='sall'>
          <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom1" ref="scrollerBottom1"
                    :scroll-bottom-offst="200">
            <div class="list">
              <div class='top vux-1px-b'>
                <span>订单号：156845095064</span><i>2018-08-27</i>
              </div>
              <div class="con">
                <div class="left">
                  <span>￥0.272</span>
                  <i>单价</i>
                </div>
                <div class="cont">
                  <span>100</span>
                  <i>数量</i>
                </div>
                <div class="right">
                  <span class='succ'>交易成功</span>
                  <i>状态</i>
                </div>
              </div>
              <div class="progress">
                <span></span>
              </div>
              <div class="bot vux-1px-t">
                <div class="left">
                  <img src="../../../static/images/user_default.png" alt="">
                  <div class="text">
                    <p>买入用户</p>
                    <p> 1721183567</p>
                  </div>
                </div>
                <div class="right">
                  <span>投诉状态：未投诉</span>
                </div>
              </div>
            </div>
            <load-more v-show='listBat1' tip="加载中..."></load-more>
            <divider v-show='!listBat1'>我是有底线的</divider>
          </scroller>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {InlineXSwitch, XSwitch} from 'vux'

  export default {
    data() {
      return {
        value: true,
        nav: 1,
        /*我的买入列表*/
        listBat: false,
        onFetching: false,
        buyPage: 1,
        buyLimit: 10,
        buyList: [],
        /*我的卖出列表*/
        listBat1: false,
        onFetching1: false,
        sallPage: 1,
        sallLimit: 10,
        sallList: [],
      }
    },
    created() {
      this.gettranBuyList()
      this.gettranSallList()
    },
    mounted() {
    },
    components: {Header, InlineXSwitch, XSwitch},
    computed: {},
    watch: {},
    methods: {
      /*获取我的买入列表*/
      gettranBuyList() {
        var that = this
        var url = that.$inter + 'Member/trans'
        var data = {type:1,page: that.buyPage, limit: that.buyLimit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.payLimit) {
              that.listBat = false
            }
            if (response.data.data.length > 0) {
              that.buyList = that.buyList.concat(response.data.data)
            }
            that.buyPage++

          }
        })
      },
      /*无限加载*/
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            if (this.buyList.length < (this.buyPage - 1) * this.buyLimit) {
              this.listBat = false
            } else {
              this.listBat = true
              this.gettranBuyList()
            }
            this.$nextTick(() => {
              if (this.$refs.scrollerBottom) {
                this.$refs.scrollerBottom.reset()
              }
            })
            this.onFetching = false
          }, 2000)
        }
      },
      /*获取我的卖出列表*/
      gettranSallList() {
        var that = this
        var url = that.$inter + 'Member/trans'
        var data = {type:2,page: that.sallPage, limit: that.sallLimit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.sallLimit) {
              that.listBat1 = false
            }
            if (response.data.data.length > 0) {
              that.sallList = that.sallList.concat(response.data.data)
            }
            that.sallPage++

          }
        })
      },
      /*无限加载*/
      onScrollBottom1() {
        if (this.onFetching1) {
          // do nothing
        } else {
          this.onFetching1 = true
          setTimeout(() => {
            if (this.sallList.length < (this.sallPage - 1) * this.sallLimit) {
              this.listBat1 = false
            } else {
              this.listBat1 = true
              this.gettranSallList()
            }
            this.$nextTick(() => {
              if (this.$refs.scrollerBottom1) {
                this.$refs.scrollerBottom1.reset()
              }
            })
            this.onFetching1 = false
          }, 2000)
        }
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #record {
    height: 100%;
    .main {
      height: calc(100% - 90px);
      .nav {
        background-color: #21273D;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        > div {
          width: 50%;
          text-align: center;
          span {
            display: inline-block;
            padding: 0 20px;
            font-size: 32px;
            line-height: 98px;
            text-align: center;
            color: #7B859B;
            &.active {
              border-bottom: 2px solid #1E61FA;
              color: #1E61FA;
            }
          }
        }

      }
      .cont {
        height: calc(100% - 138px);
        padding: 0 30px;
        .buy, .sall {
          height: 100%;
          .list {
            margin-top: 30px;
            background-color: #1F2741;
            @include border-radius(20px);
            .top {
              padding: 0 30px;
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              line-height: 80px;
              span {
                font-size: 30px;
                color: #C3C5CB;
              }
              i {
                font-size: 24px;
                color: #7B859B;
              }
            }
            .con {
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              text-align: center;
              > div {
                width: 33.3%;
                span {
                  display: block;
                  margin-top: 30px;
                  line-height: 40px;
                  font-size: 34px;
                }
                i {
                  margin-top: 10px;
                  display: block;
                  font-size: 30px;
                  line-height: 35px;
                  color: #929FB8;
                }
                &.left {
                  span {
                    color: #1E61FA;
                  }
                }
                &.cont {
                  span {
                    color: #1FBB67;
                  }
                }
                &.right {
                  span {
                    color: #1E61FA;
                    &.fail {
                      color: #DB4D4D;
                    }
                  }
                }
              }
            }
            .progress {
              margin-top: 30px;
              margin-left: 5%;
              width: 90%;
              height: 12px;
              @include border-radius(6px);
              background-color: #C3C5CB;
              position: relative;
              span {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 70%;
                height: 12px;
                @include border-radius(6px);
                background-color: #1FBB67;
              }
            }
            .bot {
              padding: 20px 30px;
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              .left {
                display: flex;
                display: -webkit-flex;
                justify-content: flex-start;
                img {
                  width: 80px;
                  height: 80px;
                }
                .text {
                  margin-left: 20px;
                  p {
                    font-size: 30px;
                    color: #939FB8;
                    line-height: 40px;
                  }
                }
              }
              .right {
                span {
                  font-size: 30px;
                  line-height: 80px;
                  color: #818DA5;
                }
              }
            }
          }

        }
      }

    }
  }
</style>
