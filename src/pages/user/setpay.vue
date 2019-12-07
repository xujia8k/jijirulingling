<template>
  <div id="info">
    <Header>
      <template slot='conter'>{{$t('我的收款账号')}}</template>
    </Header>
    <div class="main">
      <div class="list">
        <img src="../../../static/images/bank1.png" alt="">
        <div v-if='bankInfo.type_id!=1' class="add_text" @click='routerBtn(1)'>
          <div class="icon"></div>
          <p>{{$t('添加银行卡账号')}}</p>
        </div>
        <div class="receInfo" v-if='bankInfo.type_id==1'>
          <p><label for="">{{$t('银行名称')}}: </label><span>{{bankInfo.bank_name}}</span></p>
          <p><label for="">{{$t('支行名称')}}: </label><span>{{bankInfo.branch_name}}</span></p>
          <p><label for="">{{$t('账户名称')}}: </label><span>{{bankInfo.username}}</span></p>
          <p><label for="">{{$t('卡号')}}: </label><span>{{bankInfo.number}}</span></p>
          <div class="btn">
            <router-link :to="{path:'/newpay',query:{type:1,leixin:2}}" class='button'>{{$t('修改')}}</router-link>
          </div>
        </div>
      </div>
      <div class="list">
        <img src="../../../static/images/bank2.png" alt="">
        <div v-if='zfbInfo.type_id!=2' class="add_text" @click='routerBtn(2)'>
          <div class="icon"></div>
          <p>添加支付宝及收款账号</p>
        </div>
        <div class="receInfo" v-if='zfbInfo.type_id==2'>
          <div class="rece_cont">
            <div class="imgs">
              <img :src="zfbInfo.bank_img_ext" alt="">
            </div>
            <div class="text">
              <p><label for="">{{$t('账户名称')}}: </label><span>{{zfbInfo.username}}</span></p>
              <p><label for="">{{$t('卡号')}}: </label><span>{{zfbInfo.number}}</span></p>
            </div>
          </div>
          <div class="btn">
            <router-link :to="{path:'/newpay',query:{type:2,leixin:2}}" class='button'>{{$t('修改')}}</router-link>
          </div>
        </div>
      </div>
      <div class="list">
        <img src="../../../static/images/bank3.png" alt="">
        <div v-if='wxInfo.type_id!=3' class="add_text" @click='routerBtn(3)'>
          <div class="icon"></div>
          <p>{{$t('添加微信收款二维码')}}</p>
        </div>
        <div class="receInfo" v-if='wxInfo.type_id==3'>
          <div class="rece_cont">
            <div class="imgs">
              <img :src="wxInfo.bank_img_ext" alt="">
            </div>
            <div class="text">
              <p><label for="">账户名称: </label><span>{{wxInfo.username}}</span></p>
            </div>
          </div>
          <div class="btn">
            <router-link :to="{path:'/newpay',query:{type:3,leixin:2}}" class='button'>{{$t('修改')}}</router-link>
          </div>
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
        bankInfo: {},
        zfbInfo: {},
        wxInfo: {}
      }
    },
    created() {
      this.getbankDeta(1)
      this.getbankDeta(2)
      this.getbankDeta(3)
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取银行卡信息*/
      getbankDeta(id) {
        var that = this;
        var url = that.$inter + "Bank/info";
        var data = {type_id: id};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (id == 1) {
              that.bankInfo = response.data.data
            } else if (id == 2) {
              that.zfbInfo = response.data.data
            } else if (id == 3) {
              that.wxInfo = response.data.data
            }
          }
        });
      },

      /*添加新收款信息*/
      routerBtn(id) {
        this.$router.push({path: '/newpay', query: {type: id,leixin:1}})
      }
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #info {
    &#info {
      background-color: #3D4D89;
    }
    .main {
      padding: 30px;
      .list {
        margin-bottom: 30px;
        width: 100%;
        position: relative;
        img {
          width: 100%;
        }
        .add_text {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -67px;
          text-align: center;
          .icon {
            display: inline-block;
            width: 78px;
            height: 78px;
            background: url("../../../static/images/sprite.png") no-repeat -410px -410px;
            @include background-size(500px 500px);
          }
          p {
            margin-top: 25px;
            font-size: 32px;
            line-height: 32px;
            color: #CECFD3;
          }
        }
        .receInfo {
          width: 100%;
          position: absolute;
          top: 10%;
          left: 0;
          p {
            margin-left: 30px;
            font-size: 32px;
            line-height: 50px;
            color: #E7E7E7;
            text-align: center;
            span {
              display: inline-block;
              color: #B15C00;
              word-wrap: break-word;
            }
          }
          .btn {
            margin-top: 30px;
            padding: 0 30px;
            .button {
              width: 100%;
              height: 60px;
              background-color: #DD4D4D;
              line-height: 60px;
            }
          }
          .rece_cont {
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            .imgs {
              margin: 0 30px;
              width: 200px;
              height: 200px;
              text-align: center;
              img {
                width: 300px;
                height: 200px;
              }
            }
            .text {
              flex: 1;
              margin-top: 50px;

            }
          }

        }

      }
    }
  }
</style>
