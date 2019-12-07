<template>
  <div id="buy">
    <Header>
      <template slot='conter'>{{$t('留言')}}</template>
    </Header>
    <div class="main">
      <div class="from sall">
        <div class="list vux-1px-b">
          <label for="">{{$t('留言内容')}}：</label>
          <textarea :placeholder="$t('请输入留言内容')" v-model='questionCont'></textarea>
        </div>
        <div class="list input vux-1px-b">
          <label for="">{{$t('交易密码')}}：</label>
          <input type="password" :placeholder="$t('请输入交易密码')" v-model='safe_password'>
        </div>
        <div class="btn">
          <button @click='submitBtn'>{{$t('提交留言')}}</button>
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
        show: false,
        wttype: '',
        question: [],
        questionList: [],
        questionCont: '',
        idss: '',
        type_id: '',
        imgsrc: '',
        img: '',
        safe_password: '',
      }
    },
    created() {
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
      /*确定提交*/
      submitBtn() {
        if (this.switchBtn) {
          var that = this
          that.switchBtn = false
          var url = that.$inter + 'Question/submit'
          var data = {
            question: that.questionCont,
            safe_password: that.safe_password
          }
          that.$axios.post(url, data).then(function (response) {
            if (response.data.error != 0) {
              that.$Toast(response.data.message, response.data.error);
              that.switchBtn = true
            } else if (response.data.error == 0) {
              that.$Toast(response.data.message)
              setTimeout(function () {
                that.$router.push({path: '/user'})
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
        .list {
          label {
            width: 180px;
            font-size: 32px;
            color: #E7E7E7;
            line-height: 96px;
          }
          textarea {
            width: 100%;
            margin: 30px 0;
            flex: 1;
            height: 200px;
            padding: 0 20px;
          }
          &.input {
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            input {
              flex: 1;
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
