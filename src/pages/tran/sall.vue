<template>
  <div id="buy">
    <Header>
      <template slot='conter'>确定卖出</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b">
          <label for="">{{$t('订单号')}}：</label>
          <input type="text" v-model='orderDeta.number' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('出售单价')}}：</label>
          <input type="text" :placeholder="$t('请输入出售单价')" v-model='orderDeta.price' disabled>
        </div>
        <!--<div class="list vux-1px-b">
          <label for="">支付方式：</label>
          <input type="text" placeholder='选择已有付款方式'>
          <x-switch title="" v-model="payType"></x-switch>
        </div>
        <div v-show='!payType' class="list vux-1px-b">
          <label for="">支行名称：</label>
          <input type="text" placeholder='请输入支行名称' v-model='bank_name_branch'>
        </div>
        <div v-show='!payType' class="list vux-1px-b">
          <label for="">用户/姓名：</label>
          <input type="text" placeholder='请输入用户/姓名' v-model='type_id'>
        </div>
        <div v-show='!payType' class="list vux-1px-b">
          <label for="">卡号/帐号：</label>
          <input type="text" placeholder='请输入卡号/帐号' v-model='bank_number'>
        </div>-->
        <div class="list vux-1px-b" @click='show=true'>
          <label for="">{{$t('支付方式')}}：</label>
          <input type="text" :placeholder="$t('请选择付款方式')" disabled v-model='payType1'>
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
          <label for="">{{$t('验证码')}}：</label>
          <input type="text" :placeholder="$t('请输入短信验证码')" v-model='code'>
          <button @click='checksms'>{{codeName}}</button>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('出售数量')}}：</label>
          <input type="text" :placeholder="$t('请输入出售数量')" v-model='orderDeta.amount'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>

        <div class="btn">
          <button @click='submitBtn'>{{$t('确定卖出')}}</button>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          right-text="确定"
          title="请选择区"
          @on-click-right="show=false"
          :show-bottom-border="false"></popup-header>
        <group gutter="0">
          <radio :options="['银行卡','支付宝','微信']" v-model='payType1'></radio>
        </group>
      </popup>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {TransferDom} from 'vux'

  export default {
    data() {
      return {
        switchBtn: true,
        orderDeta: {},
        payType: true, //是否选择新的支付方式
        show: false,  //选择支付类型
        payType1: '',
        bankInfo: {},//获取的银行卡信息
        idss: '',
        type_id: '',  //1为银行卡 2.为支付宝  3为微信
        codeBtn: true,
        codeName: '',
        mobile: '',
        code: '',
        safe_password: '',

        /*收款信息展示*/
        number: '',
        username: '',
        branch_name: '',
        bank_name: '',
        imgsrc: ''
      }
    },
    created() {
      this.codeName = this.$t('获取验证码')
      this.idss = this.$route.query.id
      this.getorderDeta()
      if (localStorage.getItem('eosInfo')) {
        this.mobile = JSON.parse(localStorage.getItem('eosInfo')).mobile
      }
    },
    mounted() {
    },
    directives: {
      TransferDom
    },
    components: {Header},
    computed: {},
    watch: {
      'payType1': function () {
        if (this.payType1 == '银行卡') {
          this.type_id = 1
          this.getbankDeta(1)
        } else if (this.payType1 == '支付宝') {
          this.type_id = 2
          this.getbankDeta(2)
        } else if (this.payType1 == '微信') {
          this.type_id = 3
          this.getbankDeta(3)
        }
      }
    },
    methods: {
      /*获取订单详情*/
      getorderDeta() {
        var that = this;
        var url = that.$inter + "Trans/detail";
        var data = {order_id: that.idss};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.orderDeta = response.data.data.info
          }
        });
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
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Trans/confirmSell'
          var data = {
            order_id: that.orderDeta.order_id,
            amount: that.orderDeta.amount,
            type_id: that.type_id,
            code: that.code,
            safe_password: that.safe_password,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/release', query: {type: 3}})
              }, 2000)
            }
          })
        }
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #buy {
    .ri_icon {
      padding: 28px 30px;
      i {
        display: inline-block;
        width: 32px;
        height: 35px;
        background: url("../../../static/images/sprite.png") no-repeat -340px -280px;
        @include background-size(500px 500px);
      }
    }
    .main {
      padding: 0 30px;
      .tit {
        padding: 15px 0;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        .icon {
          width: 88px;
          height: 88px;
          @include border-radius(50%);
          border: 1px solid #1D60FA;
          text-align: center;
          span {
            margin-top: 7px;
            display: inline-block;
            width: 72px;
            height: 72px;
            @include border-radius(50%);
            background-color: #1D60FA;
            i {
              display: inline-block;
              margin-top: 9px;
              width: 35px;
              height: 53px;
              background: url("../../../static/images/sprite.png") no-repeat -340px -330px;
              @include background-size(500px 500px);
            }
          }
        }
        .text {
          margin-left: 30px;
          span {
            font-size: 32px;
            color: #D3D5D8;
            line-height: 88px;
            i {
              font-size: 36px;
              color: #1E61FA;
            }
          }
        }

      }
      .inve_type {
        padding-top: 30px;
        h6 {
          font-size: 32px;
          color: #C3C5CB;
        }
        .type_main {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .type_list {
            margin-top: 35px;
            width: 50%;
            width: 328px;
            height: 184px;
            line-height: 184px;
            background: url("../../../static/images/buy_type_bag.png") no-repeat;
            @include background-size(100%);
            @include border-radius(20px);
            text-align: center;
            position: relative;
            overflow: hidden;
            span {
              font-size: 72px;
              color: #1E61FA;
              i {
                font-size: 32px;
              }
            }
            .icon {
              position: absolute;
              bottom: 0;
              right: 0;
              border-top: 50px solid transparent;
              border-bottom: 50px solid #253351;
              border-left: 50px solid transparent;
              border-right: 50px solid #253351;
              i {
                width: 35px;
                height: 23px;
                position: absolute;
                bottom: -35px;
                right: -35px;
                background: url("../../../static/images/sprite.png") no-repeat -380px -310px;
                @include background-size(500px 500px);
              }
            }
            &.active {
              .icon {
                border-bottom-color: #1D61FB;
                border-right-color: #1D61FB;
                i {
                  background-position: -380px -280px;
                }
              }
            }
          }
        }
      }
      .from {
        padding-top: 30px;
        p {
          font-size: 30px;
          color: #DB4D4D;
        }
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
          input {
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
        }
        .btn {
          margin-top: 30px;
          padding-bottom: 50px;
          button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
