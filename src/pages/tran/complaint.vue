<template>
  <div id="buy">
    <Header>
      <template slot='conter'>{{$t('意见反馈')}}</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b">
          <label for="">{{$t('订单号')}}：</label>
          <input type="text" v-model='idss' disabled>
        </div>
        <div class="list vux-1px-b" @click='show=true'>
          <label for="">{{$t('问题分类')}}：</label>
          <input type="text" v-model='wttype' :placeholder="$t('请选择问题分类' )"disabled>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('反馈内容')}}：</label>
          <textarea :placeholder="$t('请输入反馈内容')" v-model='questionCont'></textarea>
        </div>
        <div class="list vux-1px-b">
          <label for="">{{$t('截图')}}：</label>
          <div class="up_img">
            <img :src="imgsrc" alt="">
            <input type="file" @change='chan'>
          </div>
        </div>
        <div class="btn">
          <button @click='submitBtn'>{{$t('提交反馈')}}</button>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          :right-text="$t('确定')"
          :title="$t('请选择问题分类')"
          @on-click-right="show=false"
          :show-bottom-border="false"></popup-header>
        <group gutter="0">
          <radio @on-change="change" :options="questionList" v-model='wttype'>
          </radio>
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
        show: false,
        wttype: '',
        question: [],
        questionList: [],
        questionCont:'',
        idss: '',
        type_id:'',
        imgsrc: '',
        img: '',
        safe_password: '',
      }
    },
    created() {
      this.idss = this.$route.query.id
      this.getorderDeta()
    },
    mounted() {

    },
    directives: {
      TransferDom
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取订单详情*/
      getorderDeta() {
        var that = this;
        var url = that.$inter + "Question/type";
        var data = {};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.question = response.data.data
            response.data.data.forEach(function (v, i) {
              that.questionList.push(v.name)
            })
          }
        });
      },
      change(value) {
        var that=this
        this.question.forEach(function (v, i) {
          if (v.name == value) {
            that.type_id=v.type_id
            console.log(v.type_id);
          }
        })
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
          var url = that.$inter + 'Question/submit'
          var data = {
            order_id: that.idss,
            type_id:that.type_id,
            question:that.questionCont,
            img: that.img
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
          > input {
            flex: 1;
          }
          textarea {
            margin: 30px 0;
            flex: 1;
            height: 200px;
            padding: 0 20px;
          }
          .up_img {
            margin: 20px 0;
            width: 180px;
            height: 200px;
            border: 2px dashed #576171; /*no*/
            position: relative;
            &:before {
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
