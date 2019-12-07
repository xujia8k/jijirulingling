<template>
  <div id="info">
    <Header>
      <template slot='conter'>{{$t('个人资料')}}</template>
    </Header>
    <div class="main">
      <!-- <div class="list vux-1px-b up_img">
         <label>个人信息</label>
         <div class="up_box">
           <img :src="imgsrc" alt="">
           <input type="file">
         </div>
         <i></i>
       </div>-->
      <div class="list vux-1px-b">
        <label>{{$t('用户名')}}</label>
        <input type="text" :placeholder="$t('请输入用户名')" disabled v-model='eosInfo.name'>
        <!--<i></i>-->
      </div>
      <div class="list vux-1px-b" @click="$router.push({path:'/modmobile'})">
        <label>{{$t('手机号')}}</label>
        <input type="text" :placeholder="$t('请输入手机号')" disabled v-model='eosInfo.mobile'>
        <i></i>
      </div>
      <!-- <div class="list vux-1px-b">
         <label>{{$t('昵称')}}</label>
         <input type="text" :placeholder="$t('请输入昵称')" v-model='eosInfo.nickname'>
         <i></i>
       </div>-->
      <div class="btn">
        <!--<button @click='modifyBtn'>{{$t('确定修改')}}</button>-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        eosInfo: {},
        name: '',
        nickname: '',
        complete: false,
      }
    },
    created() {
      if (localStorage.getItem('eosInfo')) {
        this.eosInfo = JSON.parse(localStorage.getItem('eosInfo'))
      }
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*修改用户名*/
      editName() {
        var that = this
        var url = that.$inter + 'Member/editName'
        var data = {
          name: that.eosInfo.name
        }
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            if (that.complete) {
              that.$Toast(response.data.message)
              localStorage.setItem('eosInfo', JSON.stringify(that.eosInfo))
              setTimeout(function () {
                that.$router.push({path: '/user'})
              }, 2000)
            }
            that.complete = true
          }
        })
      },
      /*修改昵称*/
      editNickName() {
        var that = this
        var url = that.$inter + 'Member/editNickName'
        var data = {
          nickname: that.eosInfo.nickname
        }
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            if (that.complete) {
              that.$Toast(response.data.message)
              localStorage.setItem('eosInfo', JSON.stringify(that.eosInfo))
              setTimeout(function () {
                that.$router.push({path: '/user'})
              }, 2000)
            }
            that.complete = true
          }
        })
      },
      modifyBtn() {
        this.editName()
        this.editNickName()
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
      padding: 0 30px;
      .list {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        position: relative;
        label {
          width: 180px;
          font-size: 32px;
          color: #E7E7E7;
          line-height: 96px;
        }
        > input {
          padding-right: 40px;
          flex: 1;
          text-align: right;
        }
        i {
          width: 18px;
          height: 31px;
          background: url("../../../static/images/sprite.png") no-repeat -470px -50px;
          @include background-size(500px 500px);
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -15px;
        }
        &.up_img {
          label {
            line-height: 120px;
          }
          .up_box {
            padding: 20px 40px;
            flex: 1;
            text-align: right;
            img {
              width: 80px;
              height: 80px;
            }
            input {
              width: 80px;
              height: 80px;
              opacity: 0;
              font-size: 0;
              position: absolute;
              top: 20px;
              right: 40px;
            }
          }
        }
      }
      .btn {
        margin-top: 50px;
        padding-bottom: 50px;
        button {
          width: 100%;
        }
      }
    }
  }
</style>
