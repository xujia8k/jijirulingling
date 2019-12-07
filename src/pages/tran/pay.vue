<template>
  <div id="buy">
    <Header>
      <template slot='conter'>{{$t('确定付款')}}</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b">
          <label for="">{{$t('订单号')}}：</label>
          <input type="text" v-model='payInfo.number' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('买入单价')}}：</label>
          <input type="text" :placeholder="$t('请输入买入价格')" v-model='payInfo.price' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('买入数量')}}：</label>
          <input type="text" :placeholder="$t('请输入买入数量')" v-model='payInfo.amount' disabled>
        </div>

        <div class="list vux-1px-b">
          <label for="">{{$t('支付方式')}}：</label>
          <input v-if='payInfo.pay_type==1' type="text" :placeholder="$t('请输入买入数量')" :value="$t('银行卡')" disabled>
          <input v-if='payInfo.pay_type==2' type="text" :placeholder="$t('请输入买入数量')" :value="$t('支付宝')" disabled>
          <input v-if='payInfo.pay_type==3' type="text" :placeholder="$t('请输入买入数量')" :value="$t('微信')" disabled>
        </div>
        <div class="list vux-1px-b" v-if='payInfo.pay_type==1'>
          <label for="">{{$t('银行名称')}}：</label>
          <input type="text" :placeholder="$t('请输入银行名称')" v-model='payInfo.bank_name' disabled>
        </div>
        <div class="list vux-1px-b" v-if='payInfo.pay_type==1'>
          <label for="">{{$t('支行名称')}}：</label>
          <input type="text" :placeholder="$t('请输入支行名称')" v-model='payInfo.branch_name' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('账户名称')}}：</label>
          <input type="text" :placeholder="$t('请输入账户名称')" v-model='payInfo.username' disabled>
        </div>
        <div class="list vux-1px-b" v-if='payInfo.pay_type==1&&payInfo.pay_type==2'>
          <label for="">{{$t('收款账号')}}：</label>
          <input type="text" :placeholder="$t('请输入收款账号')" v-model='payInfo.number' disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('联系方式')}}：</label>
          <input type="text" :placeholder="$t('请输入联系方式')" v-model='payInfo.mobile' disabled>
        </div>

        <div v-if='payInfo.pay_type==2||payInfo.pay_type==3' class="list vux-1px-b">
          <label for="">{{$t('付款码')}}：</label>
          <div class="up_img">
            <img v-if='payInfo.pay_type==2' :src="payInfo.imgsrc" alt="">
          </div>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('付款截图')}}：</label>
          <div class="up_img">
            <img :src="imgsrc" alt="">
            <input type="file" @change='chan'>
          </div>
        </div>

        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>

        <div class="btn">
          <button @click='submitBtn'>{{$t('确定付款')}}</button>
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
        var url = that.$inter + "Trans/payDetail";
        var data = {order_id: that.idss};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.payInfo = response.data.data
          }
        });
      },
      /*上传图片*/
      chan(e) {
        // 创建文件读取对象
        var that = this
        var reader = new FileReader();
        // 通过当前的file标签 获取选择的文件
        // 调用该对象的方法读取文件 文件
        // 读取文件是一个耗时操作 不一定什么时候读取完毕
        reader.readAsDataURL(e.target.files[0]);
        // 添加事件
        // 耗时操作 通过事件的方式进行注册 并且回调
        reader.onload = function () {
          // 使用读取完毕的文件
          //使用返回的结果 即可
          that.read = e.target.files[0]
          var url = that.$inter + 'System/upload'
          var data = new FormData();
          data.append('img', that.read);
          that.$axios.post(url, data).then(function (response) { //获取到内容处理
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
            } else if (response.data.error == 0) {
              that.img = response.data.data.img //生成生成的http地址
              that.imgsrc = reader.result  //本地预览
            }
          })
        }
      },
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Trans/submitPay'
          var data = {
            order_id: that.idss,
            img: that.img,
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
            &:before{
              content: '';
              width: 20px;
              height: 4px;
              background-color: #576171;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -2px;
              margin-left: -10px;
            }
            &:after{
              content: '';
              width: 4px;
              height: 20px;
              background-color: #576171;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -10px;
              margin-left: -2px;
            }
            img{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            }
            input{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 3;
              opacity: 0;
              font-size: 0;
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
