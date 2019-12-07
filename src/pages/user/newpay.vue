<template>
  <div id="buy">
    <Header>
      <template slot='conter'>{{leixin==1?$t('添加'):$t('修改')}}{{type==1?$t('银行卡'):type==2?$t('支付宝'):$t('微信')}}</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b" v-if='type==1'>
          <label for="">{{$t('银行名称')}}：</label>
          <input type="text" :placeholder="$t('请输入银行名称')"v-model='bank_name'>
        </div>
        <div class="list vux-1px-b" v-if='type==1'>
          <label for="">{{$t('支行名称')}}：</label>
          <input type="text" :placeholder="$t('请输入支行名称')" v-model='branch_name'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('账户名称')}}：</label>
          <input type="text" :placeholder="$t('请输入账户名称')" v-model='username'>
        </div>
        <div class="list vux-1px-b" v-if='type!=3'>
          <label for="">{{$t('收款账号')}}：</label>
          <input type="text" :placeholder="$t('请输入收款账号')" v-model='number'>
        </div>
        <div class="list vux-1px-b" v-if='type!=1'>
          <label for="">{{$t('收款码')}}：</label>
          <div class="up_img">
            <img :src="imgsrc" alt="">
            <input type="file" @change='chan'>
          </div>
        </div>

        <div class="btn">
          <button v-if='leixin==1' @click='submitBtn'>{{$t('添 加')}}</button>
          <button v-if='leixin==2' @click='submitBtn1'>{{$t('修 改')}}</button>
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
        switchBtn1: true,
        leixin: '',
        type: '',
        number: '',
        username: '',
        bank_name: '',
        branch_name: '',
        bank_img: '',
        imgsrc: '',
        img: '',
      }
    },
    created() {
      this.leixin = this.$route.query.leixin
      this.type = this.$route.query.type
      if (this.leixin == 2) {
        this.getBankInfo()
      }
    },
    mounted() {

    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
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
      /*获取收款信息*/
      getBankInfo() {
        var that = this
        that.switchBtn = false
        var url = that.$inter + 'Bank/info'
        var data = {
          type_id: that.type,
        }
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
            that.switchBtn = true
          } else if (response.data.error == 0) {
            if (that.type == 1) {
              that.number = response.data.data.number
              that.username = response.data.data.username
              that.branch_name=response.data.data.branch_name
              that.bank_name = response.data.data.bank_name
            } else if (that.type == 2) {
              that.number = response.data.data.number
              that.username = response.data.data.username
              that.img = response.data.data.bank_img
              that.imgsrc = response.data.data.bank_img_ext
            } else if (that.type == 3) {
              that.username = response.data.data.username
              that.img = response.data.data.bank_img
              that.imgsrc = response.data.data.bank_img_ext
            }
          }
        })
      },
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Bank/add'
          var data = {
            type_id: that.type,
            number: that.number,
            username: that.username,
            bank_name: that.bank_name,
            branch_name: that.branch_name,
            bank_img: that.img,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/setpay'})
              }, 2000)
            }
          })
        }
      },
      /*确定修改*/
      submitBtn1() {
        if (this.switchBtn1) {
          var that = this
          that.switchBtn1 = false
          var url = that.$inter + 'Bank/edit'
          var data = {
            type_id: that.type,
            number: that.number,
            username: that.username,
            bank_name: that.bank_name,
            branch_name: that.branch_name,
            bank_img: that.img,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message,response.data.error);
              that.switchBtn1 = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/setpay'})
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
    &#buy {
      background-color: #3D4D89;
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
            color: #E7E7E7;
            line-height: 96px;
          }
          > input {
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
          .up_img {
            margin: 20px 0;
            width: 150px;
            height: 180px;
            border: 1px dashed #576171; /*no*/
            position: relative;
            &:before {
              content: '';
              width: 20px;
              height: 4px;
              background-color: #576171;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -10px;
              margin-top: -2px;
            }
            &:after {
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
            img {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            }
            input {
              width: 100%;
              height: 100%;
              opacity: 0;
              font-size: 0;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 3;
            }
          }
        }
        .btn {
          margin-top: 100px;
          padding-bottom: 50px;
          button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
