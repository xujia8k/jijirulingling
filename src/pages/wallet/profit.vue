<template>
  <div id="profit">
    <Header>
      <template slot='conter'>{{$t('收益')}}</template>
    </Header>
    <div class="main">
      <div class="top">
        <div class="left">
          <h6>{{$t('昨日收益额')}}</h6>
          <p>{{walletInfo.yester_eos}}</p>
        </div>
        <div class="right">
          <h6>{{$t('累计收益额')}}</h6>
          <p>{{walletInfo.total_eos}}</p>
          <!--<p>{{walletInfo.total_seos_use}}</p>-->
        </div>
      </div>
      <div class="nav">
        <div>
          <span @click='nav=1' :class='{active:nav==1}'>EOS{{$t('收益')}}</span>
        </div>
        <div>
          <span @click='nav=2' :class='{active:nav==2}'>SEOS{{$t('收益')}}</span>
        </div>
      </div>
      <div class="cont">
        <scroller v-show='nav==1' lock-x height='100%' @on-scroll-bottom="onScrollBottom1" ref="scrollerBottom1"
                  :scroll-bottom-offst="200">
          <div class="box1">
            <div class="list vux-1px-b" v-for='(v,i) in profitList1' :key='i'>
              <div class="left">
                <span>{{v.type}}</span>
                <i>{{v.create_time}}</i>
              </div>
              <div class="right">
                <span v-if='v.amount>0' class='color1'>{{v.amount}}</span>
                <span v-if='v.amount<0' class='color2'>{{v.amount}}</span>
                <i>结余: {{v.balance}}</i>
              </div>
            </div>
            <load-more v-show='listBat1' :tip="$t('加载中...')"></load-more>
            <divider v-show='!listBat1'>~~~</divider>
          </div>
        </scroller>
        <scroller v-show='nav==2' lock-x height='100%' @on-scroll-bottom="onScrollBottom2" ref="scrollerBottom2"
                  :scroll-bottom-offst="200">
          <div class="box1">
            <div class="list vux-1px-b" v-for='(v,i) in profitList2' :key='i'>
              <div class="left">
                <span>{{v.type}}</span>
                <i>{{v.create_time}}</i>
              </div>
              <div class="right">
                <span v-if='v.amount>0' class='color1'>{{v.amount}}</span>
                <span v-if='v.amount<0' class='color2'>{{v.amount}}</span>
                <i>{{$t('结余')}}: {{v.balance}}</i>
              </div>
            </div>
            <load-more v-show='listBat2' :tip="$t('加载中...')"></load-more>
            <divider v-show='!listBat2'>~~~</divider>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        walletInfo:{},
        nav: 1,
        listBat1: true,
        onFetching1: false,
        page1: 1,
        limit1: 15,
        profitList1: [],
        listBat2: true,
        onFetching2: false,
        page2: 1,
        limit2: 15,
        profitList2: [],
      }
    },
    created() {
      this.getwalletInfo()
      this.getprofitList1()
      this.getprofitList2()
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      getwalletInfo() {
        var that = this;
        var url = that.$inter + "Wallet/index";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.walletInfo=response.data.data
          }
        });
      },
      /*获取公告列表*/
      getprofitList1() {
        var that = this
        var url = that.$inter + 'Wallet/shouyi_list'
        var data = {type: 1, page: that.page1, limit: that.limit1}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.limit1) {
              that.listBat1 = false
            }
            if (response.data.data.length > 0) {
              that.profitList1 = that.profitList1.concat(response.data.data)
            }
            that.page1++
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
            if (this.profitList1.length < (this.page1 - 1) * this.limit1) {
              this.listBat1 = false
            } else {
              this.listBat1 = true
              this.getprofitList1()
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
      /*获取公告列表*/
      getprofitList2() {
        var that = this
        var url = that.$inter + 'Wallet/shouyi_list'
        var data = {type: 2, page: that.page2, limit: that.limit2}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.limit2) {
              that.listBat2 = false
            }
            if (response.data.data.length > 0) {
              that.profitList2 = that.profitList2.concat(response.data.data)
            }
            that.page2++
          }
        })
      },
      /*无限加载*/
      onScrollBottom2() {
        if (this.onFetching2) {
          // do nothing
        } else {
          this.onFetching2 = true
          setTimeout(() => {
            if (this.profitList2.length < (this.page2 - 1) * this.limit2) {
              this.listBat2 = false
            } else {
              this.listBat2 = true
              this.getprofitList2()
            }
            this.$nextTick(() => {
              if (this.$refs.scrollerBottom2) {
                this.$refs.scrollerBottom2.reset()
              }
            })
            this.onFetching2 = false
          }, 2000)
        }
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #profit {
    height: calc(100% - 130px);
    min-height: 20px !important;
    .main {
      height: calc(100% - 90px);
      .top {
        margin: 30px;
        padding: 30px;
        height: 300px;
        background: url("../../../static/images/index_bag1.png");
        @include background-size(100% 300px);
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        .left, .right {
          h6 {
            font-size: 40px;
            color: #fff;
            line-height: 100px;
          }
          p {
            text-align: center;
            color: #fff;
            line-height: 100px;
            font-size: 40px;
          }
        }
      }
      .nav {
        background-color: #313F71;
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
            color: #fff;
            &.active {
              border-bottom: 2px solid #1E61FA;
              color: #1E61FA;
            }
          }
        }

      }
      .cont {
        padding: 0 30px;
        height: calc(100% - 450px);
        overflow: hidden;
        .list {
          padding: 30px 0;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .left, .right {
            span {
              display: block;
              font-size: 32px;
              line-height: 32px;
              color: #fff;
            }
            i {
              display: block;
              margin-top: 30px;
              font-size: 26px;
              line-height: 26px;
              color: #C4C5CB;
            }
            &.right {
              text-align: right;
              span {
                &.color1 {
                  color: #20BC68;
                }
                &.color2 {
                  color: #DC4D4D;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
