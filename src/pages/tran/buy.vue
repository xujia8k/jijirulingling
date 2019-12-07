<template>
  <div id="buy">
    <Header>
      <template slot='conter'>确定买入</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b">
          <label for="">{{$t('订单号')}}：</label>
          <input type="text" v-model='orderDeta.number' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('买入单价')}}：</label>
          <input type="text" :placeholder="$t('请输入买入价格')" v-model='orderDeta.price' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('对方姓名')}}：</label>
          <input type="text" :placeholder="$t('请输入买入数量')" v-model='orderDeta.name' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('买入数量')}}：</label>
          <input type="text" :placeholder="$t('请输入买入数量')" v-model='orderDeta.amount'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>

        <div class="btn">
          <button @click='submitBtn'>{{$t('确定买入')}}</button>
        </div>
      </div>
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
        idss: '',
        safe_password: '',
      }
    },
    created() {
      this.idss = this.$route.query.id
      this.getorderDeta()
    },
    mounted() {

    },
    components: {Header},
    computed: {},
    watch: {
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
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Trans/confirmBuy'
          var data = {
            order_id: that.orderDeta.order_id,
            amount: that.orderDeta.amount,
            safe_password: that.safe_password,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/release',query:{type:3}})
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
