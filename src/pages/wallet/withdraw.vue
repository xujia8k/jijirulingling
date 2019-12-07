<template>
  <div id="cast">
    <Header>
      <template slot='conter'>{{$t('提币')}}</template>
      <template slot='right'>
        <div class="ri_icon" @click="$router.push({path:'/withDeta'})">
          <i></i>
        </div>
      </template>
    </Header>
    <div class="main">
      <div class="tit vux-1px-b">
        <div class="icon">
  <span>
    <i></i>
  </span>
        </div>
        <div class="text">
          <span>{{$t('当前帐户余额')}}{{type==1?'EOS':'SEOS'}}：<i>{{num}}</i></span>
        </div>
      </div>
      <div class="from">
        <!--<p>{{$t('温馨提示：手续费为')}}{{sxf.shouxufei*100}}%,{{$t('预计到账')}}{{(1-sxf.shouxufei)*amount}}</p>-->
        <p v-if='type==1'>{{sxf.shouxufei}}</p>
        <p v-if='type==2'>{{sxf.seos_shouxufei}}</p>
        <div class="list vux-1px-b">
          <label for="">{{$t('提币数量')}}：</label>
          <input type="text" :placeholder="$t('请输入提取数量')" v-model='amount'
                 @blur='amount<=0?amount=0:amount=parseInt(amount)'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('钱包地址')}} ：</label>
          <input type="text" :placeholder="$t('请输入钱包地址')" v-model='address'>
        </div>
        <div class="list vux-1px-b up_img">
          <p>{{$t('上传你的钱包地址二维码')}}:</p>
          <div class="imgs">
            <img :src="imgsrc1" alt="">
            <input type="file" @change='chan(1,$event)'>
          </div>
        </div>
        <div class="list vux-1px-b">
          <label class='chang' for="">{{$t('memo值(交易所必填)')}} ：</label>
          <input type="text" :placeholder="$t('请输入memo值')" v-model='memo'>
        </div>
        <div class="list vux-1px-b up_img">
          <p>{{$t('上传memo值地址二维码')}}:</p>
          <div class="imgs">
            <img :src="imgsrc2" alt="">
            <input type="file" @change='chan(2,$event)'>
          </div>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('手机号')}}：</label>
          <input type="text" :placeholder="$t('请输入手机号码')" disabled v-model='mobile'>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('短信验证')}}：</label>
          <input type="text" :placeholder="$t('请输入短信验证码')" v-model='code'>
          <button @click='checksms'>{{codeName}}</button>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码') " v-model='safe_password'>
        </div>
        <div class="btn">
          <button @click='submitBtn'>{{$t('确认提币')}}</button>
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
        switchBtn: true,
        codeBtn: true,
        codeName: '',
        sxf: {},
        num: '',
        type: '',
        code: '',
        amount: '',
        safe_password: '',
        address: '',
        memo: '',
        img1: '',
        img2: '',
        imgsrc1: '',
        imgsrc2: ''
      }
    },
    created() {
      this.codeName = this.$t('获取验证码')
      if (this.$route.query.type) {
        this.type = this.$route.query.type
        this.getwalletInfo()
      }
      if (localStorage.getItem('eosInfo')) {
        this.mobile = JSON.parse(localStorage.getItem('eosInfo')).mobile
      }
      this.getgetaddress()
      this.getsxf()
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
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            if (that.type == 1) {
              that.num = response.data.data.eos
            } else if (that.type == 2) {
              that.num = response.data.data.seos_use
            }

          }
        });
      },
      /*获取钱包地址*/
      getgetaddress() {
        var that = this
        var url = that.$inter + 'member/getaddress'
        var data = {type: 1}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.address = response.data.data.address
            that.memo = response.data.data.memo
            that.img1 = response.data.data.eos_img_tmp
            that.img2 = response.data.data.memo_img_tmp
            that.imgsrc1 = response.data.data.eos_img
            that.imgsrc2 = response.data.data.memo_img
          }
        })
      },
      /*获取手续费*/
      getsxf() {
        var that = this
        var url = that.$inter + 'Eos/index'
        var data = {}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.sxf = response.data.data
          }
        })
      },
      /*上传图片*/
      chan(x, e) {
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
              that.$Toast(response.data.message, response.data.error);
            } else if (response.data.error == 0) {
              that['imgsrc' + x] = reader.result
              that['img' + x] = response.data.data.img //生成生成的http地址
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
          var data1 = {mobile: that.mobile, type: 10009,}
          that.$axios.post(url, data1).then(function (response) { //获取到内容处理
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
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
          var url = that.$inter + 'Eos/take_new'
          var data = {
            type: that.type,
            code: that.code,
            address: that.address,
            amount: that.amount,
            eos_img: that.img1,
            memo: that.memo,
            memo_img: that.img2,
            safe_password: that.safe_password,
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/withDeta'})
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

  #cast {
    &#cast {
      background-color: #3D4D89;
    }
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
      .from {
        padding-top: 10px;
        p {
          margin-top: 15px;
          font-size: 30px;
          line-height: 50px;
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
            &.chang {
              width: 380px;
            }
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
          &.up_img {
            display: block;
            padding-bottom: 20px;
            p {
              font-size: 32px;
              color: #E7E7E7;
              line-height: 96px;
            }
            .imgs {
              margin-left: 180px;
              width: 240px;
              min-height: 240px;
              border: 2px dashed #C7C7C7;
              position: relative;
              img {
                width: 100%;
                min-height: 240px;
                position: relative;
                top: 0;
                left: 0;
                z-index: 2;
              }
              input {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 3;
                font-size: 0;
                opacity: 0;
              }
              &:before {
                content: '';
                width: 24px;
                height: 4px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -12px;
                margin-top: -2px;
                background-color: #C7C7C7;
              }
              &:after {
                content: '';
                width: 4px;
                height: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -2px;
                margin-top: -12px;
                background-color: #C7C7C7;
              }
            }
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
