<template>
  <div id="buy">
    <Header>
      <template slot='conter'>{{$t('订单投诉')}}</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b">
          <label for="">{{$t('订单号')}}：</label>
          <input type="text" v-model='payInfo.number' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('买家')}}：</label>
          <input type="text" v-model='payInfo.name' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('卖出单价')}}：</label>
          <input type="text" :placeholder="$t('请输入卖出价格')" v-model='payInfo.price' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('卖出数量')}}：</label>
          <input type="text" :placeholder="$t('请输入卖出数量')" v-model='payInfo.amount' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('卖出总价')}}：</label>
          <input type="text" :placeholder="$t('请输入卖出总价')" v-model='payInfo.total_price' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('汇款截图')}}：</label>
          <div class="up_img">
            <img :src="payInfo.img" alt="">
          </div>
        </div>

        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>

        <div class="btn">
          <button @click='submitBtn'>{{$t('确定收款')}}</button>
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
        payInfo: {},
        idss: '',
        imgsrc:'',
        img:'',
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
        var url = that.$inter + "Trans/shouDetail";
        var data = {order_id: that.idss};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.payInfo = response.data.data
          }
        });
      },
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Trans/completeShou'
          var data = {
            order_id: that.idss,
            safe_password: that.safe_password,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/release',query:{type:4}})
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
          >input {
            flex: 1;
          }
          .up_img{
            margin: 20px 0;
            width: 180px;
            height: 200px;
            border: 2px dashed #576171;/*no*/
            position: relative;
            img{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            }
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
