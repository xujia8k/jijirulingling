<template>
  <div id='wallet'>
    <Header>
      <template slot='conter'>{{$t('钱包')}}</template>
    </Header>
    <div class="main">
      <div class="list">
        <div class="list_top">
          <div class="icon icon1">
            <span>
              <i></i>
            </span>
          </div>
          <div class="text">
            <p>{{$t('总资产')}}</p>
            <p class='num num1'>{{walletInfo.score}}</p>
          </div>
        </div>
        <div class="list_bot list_one">
          <router-link to=''></router-link>
          <router-link v-if='$store.state.duihuan!=0' :to="{path:'/exchange',query:{type:3}}">{{$t('兑换')}}</router-link>
          <router-link :to="{path:'/walletDeal',query:{type:1}}">{{$t('明细')}}</router-link>
          <router-link to=''></router-link>
        </div>
        <div class="list_bag"></div>
      </div>
      <div class="list">
        <div class="list_top">
          <div class="icon icon4">
            <span>
              <i></i>
            </span>
          </div>
          <div class="text">
            <p>{{$t('注册资产EOS')}}</p>
            <p class='num num4'>{{walletInfo.register_eos}}</p>
          </div>
        </div>
        <div class="list_bot">
          <router-link :to="{path:'/transfer',query:{type:1}}">{{$t('转账')}}</router-link>
          <router-link v-if='$store.state.duihuan!=0' :to="{path:'/exchange',query:{type:2}}">{{$t('兑换')}}</router-link>
          <router-link :to="{path:'/walletDeal',query:{type:3}}">{{$t('明细')}}</router-link>
          <router-link to=''></router-link>
        </div>
        <div class="list_bag"></div>
      </div>
      <div class="list">
        <div class="list_top">
          <div class="icon icon2">
            <span>
              <i></i>
            </span>
          </div>
          <div class="text">
            <p>EOS</p>
            <p class='num num2'>{{walletInfo.eos}}</p>
          </div>
        </div>
        <div class="list_bot">
          <!--<router-link to="/cast">{{$t('复投')}}</router-link>-->
          <router-link :to="{path:'/transfer',query:{type:2}}">{{$t('转账')}}</router-link>
          <router-link :to="{path:'/withdraw',query:{type:1}}">{{$t('提币')}}</router-link>
          <router-link v-if='$store.state.duihuan!=0' :to="{path:'/exchange',query:{type:1}}">{{$t('兑换')}}</router-link>
          <router-link :to="{path:'/walletDeal',query:{type:2}}">{{$t('明细')}}</router-link>
        </div>
        <div class="list_bag"></div>
      </div>
      <div class="list">
        <div class="list_top">
          <div class="icon icon3">
            <span>
              <i></i>
            </span>
          </div>
          <div class="text">
            <p>SEOS</p>
            <p class='num num3'>{{walletInfo.seos_use}}</p>
          </div>
        </div>
        <div class="list_bot">
          <router-link :to="{path:'/transfer',query:{type:3}}">{{$t('转账')}}</router-link>
          <router-link v-if='$store.state.is_seos_tibi==1' :to="{path:'/withdraw',query:{type:2}}">{{$t('提币')}}</router-link>
          <span @click="$Toast($t('暂未开放'))" v-if='$store.state.is_seos_tibi==0'>{{$t('提币')}}</span>
          <router-link :to="{path:'/walletDeal',query:{type:4}}">{{$t('明细')}}</router-link>
        </div>
        <div class="list_bag"></div>
      </div>
      <div class="list" v-if='$store.state.suocang'>
        <div class="list_top">
          <div class="icon icon5">
            <span>
              <i></i>
            </span>
          </div>
          <div class="text">
            <p>{{$t('锁仓')}}SEOS</p>
            <p class='num num5'>{{walletInfo.seos_freeze}}</p>
          </div>
        </div>
        <div class="list_bot list_one">
          <router-link :to="{path:'/walletDeal',query:{type:5}}">{{$t('明细')}}</router-link>
        </div>
        <div class="list_bag"></div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        walletInfo: {},
        walletShow:{}
      };
    },
    created() {
      this.getwalletInfo()
      this.getwalletInfo1()
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
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.walletInfo = response.data.data
          }
        });
      },
      getwalletInfo1() {
        var that = this;
        var url = that.$inter + "System/is_show";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.walletShow = response.data.data
          }
        });
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #wallet {
    padding: 0 30px;
    .main {
      padding-bottom: 50px;
      .list {
        margin-top: 20px;
        width: 100%;
        height: 250px;
        background: url("../../../static/images/wallet_bag.png") no-repeat;
        @include background-size(100% 252px);
        @include border-radius(20px);
        position: relative;
        .list_bag {
          position: absolute;
          top: 0;
          right: 0;
          width: 190px;
          height: 165px;
        }
        .list_top {
          padding-top: 35px;
          .icon {
            margin-left: 30px;
            display: inline-block;
            width: 122px;
            height: 122px;
            border: 2px solid;
            text-align: center;
            @include border-radius(50%);
            span {
              display: inline-block;
              margin-top: 10px;
              width: 100px;
              height: 100px;
              @include border-radius(50%);
              i {
                display: inline-block;
                margin-top: 12px;
                width: 49px;
                height: 74px;
                background: url("../../../static/images/sprite.png") no-repeat 0 -100px;
                @include background-size(500px 500px);
              }
            }
            &.icon1 {
              border-color: #FA9301;
              span {
                background-color: #FA9301;
              }
            }
            &.icon2 {
              border-color: #1E61FA;
              span {
                background-color: #1E61FA;
              }
            }
            &.icon3 {
              border-color: #1FBB67;
              span {
                background-color: #1FBB67;
              }
            }
            &.icon4 {
              border-color: #F21EFA;
              span {
                background-color: #F21EFA;
              }
            }
            &.icon5 {
              border-color: #A3A5AB;
              span {
                background-color: #A3A5AB;
              }
            }
          }
          .text {
            margin-left: 30px;
            display: inline-block;
            p {
              margin-top: 20px;
              font-size: 32px;
              line-height: 32px;
              color: #EDEDED;
              &.num {
                font-size: 38px;
                &.num1 {
                  color: #FA9301;
                }
                &.num2 {
                  color: #1E61FA;
                }
                &.num3 {
                  color: #1FBB67;
                }
                &.num4 {
                  color: #F21EFA;
                }
                &.num5 {
                  color: #5F71A7;
                }
              }
            }
          }
        }
        .list_bot {
          margin-top: 30px;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          a,span {
            flex: 1;
            text-align: center;
            font-size: 30px;
            line-height: 36px;
            /*border-right: 1px solid #536BB1;*/
            color: #EDEDED;
            &:nth-last-child(1) {
              border-right: none;
            }
          }
          /* &.list_one{
             margin-left: 50px;
             display: inline-block;
           }*/
        }
      }
    }

  }
</style>
