<template>
  <div id="release">
    <Header>
      <template slot='conter'>{{$t('发布交易')}}</template>
    </Header>
    <div class="main">
      <div class="nav">
        <span @click='nav=1' :class='{active:nav==1}'>{{$t('发布买入')}}</span>
        <span @click='nav=2' :class='{active:nav==2}'>{{$t('发布卖出')}}</span>
        <span @click='nav=3' :class='{active:nav==3}'>{{$t('确认付款')}}</span>
        <span @click='nav=4' :class='{active:nav==4}'>{{$t('确认收款')}}</span>
      </div>
      <div class="cont">
        <div v-show='nav==1' class='buy'>
          <div class="from">
            <div class="list vux-1px-b">
              <label for="">{{$t('购买价格')}}：</label>
              <input type="text" placeholder="$t('请输入购买价格')" @keyup='countBuy' v-model='priceBuy'>
            </div>
            <div class="list vux-1px-b">
              <label for="">{{$t('购买数量')}}：</label>
              <input type="text" :placeholder="$t('请输入购买数量')" v-model='amountBuy' @keyup='countBuy'>
            </div>
            <div class="list vux-1px-b">
              <label for="">{{$t('购买金额')}}：</label>
              <input type="text" :placeholder="$t('请输入购买金额')" disabled v-model='totalBuy'>
            </div>
            <div class="btn">
              <button @click='releaseBuy'>{{$t('发布买入')}}</button>
            </div>
          </div>
        </div>
        <div v-show='nav==2' class='sall'>
          <div class="tit vux-1px-b">
            <div class="left">
              <h6>{{$t('帐户SEOS余额')}}</h6>
              <p>￥{{seosInfo.seos_use}}</p>
            </div>
            <div class="right">
              <h6>{{$t('SEOS价格')}}</h6>
              <p>￥{{seosInfo.seos_price}}</p>
            </div>
          </div>
          <div class="from sall">
            <div class="list vux-1px-b" @click='show=true'>
              <label for="">{{$t('支付方式')}}：</label>
              <input type="text" :placeholder="$t('请选择付款方式')" disabled v-model='payType'>
              <em></em>
            </div>
            <div v-show='type_id==1' class="list vux-1px-b">
              <label for="">{{$t('银行名称')}}：</label>
              <input type="text" disabled :placeholder="$t('请输入银行名称')" v-model='bank_name'>
            </div>
            <div v-show='type_id==1' class="list vux-1px-b">
              <label for="">{{$t('支行名称')}}：</label>
              <input type="text" disabled :placeholder="$t('请输入支行名称')" v-model='branch_name'>
            </div>
            <div v-show='type_id' class="list vux-1px-b">
              <label for="">{{$t('用户/姓名')}}：</label>
              <input type="text" disabled :placeholder="$t('请输入用户/姓名')" v-model='username'>
            </div>
            <div v-show='type_id==1||type_id==2' class="list vux-1px-b">
              <label for="">{{$t('卡号/帐号')}}：</label>
              <input type="text" disabled :placeholder="$t('请输入卡号/帐号')" v-model='number'>
            </div>
            <div class="list vux-1px-b">
              <label for="">{{$t('出售单价')}}：</label>
              <input type="text" :placeholder="$t('请输入出售价格')" v-model='priceSall'>
            </div>
            <div class="list vux-1px-b">
              <label for="">{{$t('出售数量')}}：</label>
              <input type="text" :placeholder="$t('请输入出售数量')" v-model='amountSall'>
            </div>
            <div class="list vux-1px-b">
              <label for="">{{$t('验证码')}}：</label>
              <input type="text" :placeholder="$t('请输入短信验证码')" v-model='code'>
              <button @click='checksms'>{{codeName}}</button>
            </div>
            <div class="list vux-1px-b">
              <label for="">{{$t('交易密码')}}：</label>
              <input type="password" :placeholder="$t('请输入交易密码')" v-model='pwdSall'>
            </div>
            <div class="btn">
              <button @click='releaseSall'>{{$t('发布卖出')}}</button>
            </div>
          </div>
        </div>
        <div v-show='nav==3' class='payment'>
          <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                    :scroll-bottom-offst="200">
            <div class="box1">
              <div class="list" v-for='(v,i) in payList' :key='i'>
                <div class='top vux-1px-b'>
                  <span>{{$t('订单号')}}：{{v.number}}</span><i>{{(v.create_time).split(' ')[0]}}</i>
                </div>
                <div class="con">
                  <div class="left">
                    <span>￥{{v.price}}</span>
                    <i>{{$t('单价')}}</i>
                  </div>
                  <div class="cont">
                    <span>{{v.amount}}</span>
                    <i>{{$t('数量')}}</i>
                  </div>
                  <div class="right">
                    <span v-if='v.status==0'>{{$t('挂起')}}</span>
                    <span v-if='v.status==1'>{{$t('等待付款')}}</span>
                    <span v-if='v.status==2'>{{$t('等待完成')}}</span>
                    <span v-if='v.status==3'>{{$t('已完成')}}</span>
                    <i>{{$t('状态')}}</i>
                  </div>
                </div>
                <div class="progress">
                  <span></span>
                </div>
                <div class="bot vux-1px-t">
                  <div class="left">
                    <img src="../../../static/images/user_default.png" alt="">
                    <div class="text">
                      <p>{{$t('出售用户')}}</p>
                      <p> {{v.mobile}}</p>
                    </div>
                  </div>
                  <div class="right">
                    <span v-if='v.status==0' to=''>{{$t('挂起')}}</span>
                    <router-link v-if='v.status==1' :to="{path:'/pay',query:{id:v.order_id}}">{{$t('去付款')}}
                    </router-link>
                    <span v-if='v.status==2' to=''>{{$t('等待完成')}}</span>
                    <span v-if='v.status==3' to=''>{{$t('已完成')}}</span>
                  </div>
                </div>
              </div>
              <load-more v-show='listBat' :tip="$t('加载中...')"></load-more>
              <divider v-show='!listBat'>{{$t('我是有底线的')}}</divider>
            </div>
          </scroller>
        </div>
        <div v-show='nav==4' class='rece'>
          <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom1" ref="scrollerBottom1"
                    :scroll-bottom-offst="200">
            <div class="box1">
              <div class="list" v-for='(v,i) in receList' :key='i'>
                <div class='top vux-1px-b'>
                  <span>{{$t('订单号')}}：：{{v.number}}</span><i>{{(v.create_time).split(' ')[0]}}</i>
                </div>
                <div class="con">
                  <div class="left">
                    <span>￥{{v.price}}</span>
                    <i>{{$t('单价')}}</i>
                  </div>
                  <div class="cont">
                    <span>{{v.amount}}</span>
                    <i>{{$t('数量')}}</i>
                  </div>
                  <div class="right">
                    <span v-if='v.status==0'>{{$t('挂起')}}</span>
                    <span v-if='v.status==1'>{{$t('等待付款')}}</span>
                    <span v-if='v.status==2'>{{$t('等待收款')}}</span>
                    <span v-if='v.status==3'>{{$t('已完成')}}</span>
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
                      <p>出售用户</p>
                      <p> {{v.mobile}}</p>
                    </div>
                  </div>
                  <div class="right">
                    <span v-if='v.status==0' to=''>挂起</span>
                    <span v-if='v.status==1' to=''>等待付款</span>
                    <router-link v-if='v.status==2' :to="{path:'/complaint',query:{id:v.order_id}}" class='complaint'>
                      进行投诉
                    </router-link>
                    <router-link v-if='v.status==2' :to="{path:'/rece',query:{id:v.order_id}}">确认收款</router-link>
                    <span v-if='v.status==3' to=''>已完成</span>
                  </div>
                </div>
              </div>
              <load-more v-show='listBat1' tip="加载中..."></load-more>
              <divider v-show='!listBat1'>我是有底线的</divider>
            </div>
          </scroller>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          :right-text="$t('确定')"
          :title="$t('请选择支付方式')"
          @on-click-right="show=false"
          :show-bottom-border="false"></popup-header>
        <group gutter="0">
          <radio :options="['银行卡','支付宝','微信']" v-model='payType'></radio>
        </group>
      </popup>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {InlineXSwitch, XSwitch} from 'vux'
  import {TransferDom} from 'vux'

  export default {
    data() {
      return {
        switchBtn1: true,
        switchBtn2: true,
        switchBtn3: true,
        switchBtn4: true,
        seosInfo: {},
        /*发布买入*/
        amountBuy: '',
        priceBuy: '',
        totalBuy: '',
        /*发布卖出*/
        show: false,
        payType: '',
        amountSall: '',
        priceSall: '',
        totalSall: '',
        type_id: '',
        codeBtn: true,
        codeName: '',
        mobile: '',
        code: '',
        pwdSall: '',
        /*收款信息展示*/
        number: '',
        username: '',
        branch_name: '',
        bank_name: '',
        imgsrc: '',
        /*待付款列表*/
        listBat: false,
        onFetching: false,
        payPage: 1,
        payLimit: 10,
        payList: [],
        /*收款列表*/
        listBat1: false,
        onFetching1: false,
        recePage: 1,
        receLimit: 10,
        receList: [],

        value: true,
        nav: 1,
      }
    },
    created() {
      this.codeName=this.$t('获取验证码')
      if (this.$route.query.type) {
        this.nav = this.$route.query.type
      }
      if (localStorage.getItem('eosInfo')) {
        this.mobile = JSON.parse(localStorage.getItem('eosInfo')).mobile
      }
      this.getSeosInfo()
      this.gettranPayList()
      this.gettranReceList()
    },
    mounted() {
    },
    directives: {
      TransferDom
    },
    components: {Header, InlineXSwitch, XSwitch},
    computed: {},
    watch: {
      'payType': function () {
        if (this.payType == '银行卡') {
          this.type_id = 1
          this.getbankDeta(1)
        } else if (this.payType == '支付宝') {
          this.type_id = 2
          this.getbankDeta(2)
        } else if (this.payType == '微信') {
          this.type_id = 3
          this.getbankDeta(3)
        }
      },
    },
    methods: {
      /*获取SEOS信息*/
      getSeosInfo() {
        var that = this
        that.switchBtn1 = false
        var url = that.$inter + 'Trans/index'
        var data = {
          amount: that.amountBuy,
          price: that.priceBuy,
        }
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
            that.switchBtn1 = true
          } else if (response.data.error == 0) {
            that.seosInfo = response.data.data
          }
        })
      },
      /*计算总额*/
      countBuy() {
        if (this.amountBuy > 0 || this.priceBuy > 0) {
          this.totalBuy = parseFloat(this.amountBuy * this.priceBuy).toFixed(3)
        }
      },
      /*获取收款信息*/
      getbankDeta(id) {
        var that = this;
        var url = that.$inter + "Bank/info";
        var data = {type_id: that.type_id};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (that.type_id == 1) {
              that.number = response.data.data.number
              that.username = response.data.data.username
              that.branch_name = response.data.data.branch_name
              that.bank_name = response.data.data.bank_name
            } else if (that.type_id == 2) {
              that.number = response.data.data.number
              that.username = response.data.data.username
              that.imgsrc = response.data.data.bank_img_ext
            } else if (that.type_id == 3) {
              that.username = response.data.data.username
              that.imgsrc = response.data.data.bank_img_ext
            }
          }
        });
      },
      /*发布买入*/
      releaseBuy() {
        if (this.switchBtn1) {
          var that = this
          that.switchBtn1 = false
          var url = that.$inter + 'Trans/buy'
          var data = {
            amount: that.amountBuy,
            price: that.priceBuy,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn1 = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.nav = 3
              }, 2000)
            }
          })
        }
      },
      /*获取短信验证码*/
      checksms() {
        if (this.codeBtn) {
          var that = this
          var url = that.$inter + 'System/sendMobile'
          that.codeBtn = false
          var play = null
          var data1 = {mobile: that.mobile, type: 10007,}
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
      /*发布卖出*/
      releaseSall() {
        if (this.switchBtn2) {
          var that = this
          that.switchBtn2 = false
          var url = that.$inter + 'Trans/sell'
          var data = {
            amount: that.amountSall,
            price: that.priceSall,
            type_id: that.type_id,
            code: that.code,
            safe_password: that.pwdSall,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn2 = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.nav = 3
              }, 2000)
            }
          })
        }
      },
      /*获取待付款列表*/
      gettranPayList() {
        var that = this
        var url = that.$inter + 'Trans/payList'
        var data = {page: that.payPage, limit: that.payLimit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.payLimit) {
              that.listBat = false
            }
            if (response.data.data.length > 0) {
              that.payList = that.payList.concat(response.data.data)
            }
            that.payPage++

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
            if (this.payList.length < (this.payPage - 1) * this.payLimit) {
              this.listBat = false
            } else {
              this.listBat = true
              this.gettranPayList()
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
      /*获取收款列表*/
      gettranReceList() {
        var that = this
        var url = that.$inter + 'Trans/shouList'
        var data = {page: that.recePage, limit: that.receLimit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.receLimit) {
              that.listBat1 = false
            }
            if (response.data.data.length > 0) {
              that.receList = that.receList.concat(response.data.data)
            }
            that.recePage++

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
            if (this.receList.length < (this.recePage - 1) * this.receLimit) {
              this.listBat1 = false
            } else {
              this.listBat1 = true
              this.gettranReceList()
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
<style lang="scss" type="text/scss">
  .vux-x-switch .weui-cell__ft {
    .weui-switch:checked {
      background-color: #1E61FB;
      border-color: #1E61FB;
    }
  }
</style>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #release {
    height: 100%;
    .main {
      height: calc(100% - 90px);
      .nav {
        background-color: #21273D;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        span {
          width: 25%;
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
      .cont {
        height: calc(100% - 130px);
        padding: 0 30px;
        .tit {
          padding: 50px 0;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          .left, .right {
            width: 50%;
            height: 100px;
            text-align: center;
            h6 {
              padding-top: 15px;
              font-size: 30px;
              line-height: 30px;
              color: #C3C5CB;
            }
            p {
              margin-top: 20px;
              font-size: 40px;
              line-height: 40px;
              color: #1FBB67;
            }
            &.left {
              border-right: 1px solid #1F273D;
              p {
                color: #1E61FA;
              }
            }
          }
        }
        .from {
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
            span {
              font-size: 32px;
              line-height: 96px;
              color: #1E61FA;
              text-decoration: underline;
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
            .icon {
              width: 13px;
              height: 23px;
              position: absolute;
              top: 50%;
              right: 30px;
              margin-top: -11px;
              background: url("../../../static/images/sprite.png") no-repeat -430px -300px;
              @include background-size(500px 500px);
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
        .payment, .rece {
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
                    color: #DB4D4D;
                  }
                }
              }
            }
            .progress {
              margin-top: 20px;
              margin-bottom: 20px;
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
                margin-top: 10px;
                a {
                  display: inline-block;
                  width: 160px;
                  height: 60px;
                  line-height: 60px;
                  font-size: 32px;
                  text-align: center;
                  @include border-radius(30px);
                  background-color: #DB4D4D;
                  color: #fff;
                  &.complaint {
                    background-color: #2F3753;
                    color: #7B859B;
                  }
                }
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
