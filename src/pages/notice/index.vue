<template>
  <div id="not_list">
    <Header>
      <template slot='conter'>{{$t('公告类型')}}</template>
    </Header>
    <div class="main">

      <div class="list" v-for='(v ,i) in noticeInfo' :key='i'>
        <router-link :to="{path:'/notlist',query:{type:v.type_id}}">
          <div class="icon" :class="{read:v.is_read==0}">
            <i></i>
          </div>
          <div class="text vux-1px-b">
            <h6><span>{{v.name}}</span><i>09:41</i></h6>
            <p>{{v.content}}</p>
          </div>
          <em></em>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        noticeInfo: []
      }
    },
    created() {
      this.getNotice()
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取公告内容*/
      getNotice() {
        var that = this
        var url = that.$inter + 'Adv/type'
        var data = {}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.noticeInfo = response.data.data
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #not_list {
    .main {
      .list{
        a{
          display: block;
          padding: 20px 30px 0 30px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          position: relative;
          .icon {
            width: 100px;
            height: 100px;
            @include border-radius(50%);
            text-align: center;
            i {
              display: inline-block;
              background: url("../../../static/images/sprite1.png") no-repeat;
              @include background-size(200px 200px);
            }
            &.read{
              position: relative;
              &:before{
                content: '';
                position: absolute;
                top: 10px;
                right: 10px;
                width: 16px;
                height: 16px;
                background-color: red;
                @include border-radius(50%);
              }
            }
          }
          .text {
            flex: 1;
            margin-left: 20px;
            padding-right: 30px;
            h6 {
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              span {
                font-size: 32px;
                color: #C3C5CB;
              }
              i {
                font-size: 24px;
                color: #576171;
              }
            }
            p {
              padding-bottom: 20px;
              margin-top: 20px;
              font-size: 28px;
              line-height: 30px;
              height: 50px;
              color: #6C6E79;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          em {
            width: 16px;
            height: 23px;
            background: url("../../../static/images/sprite.png") no-repeat -450px -300px;
            @include background-size(500px 500px);
            position: absolute;
            top: 50%;
            right: 30px;
            margin-top: -10px;
          }
        }
        &:nth-child(1) {
          .icon {
            background-color: #1D5FF3;
            i {
              margin-top: 25px;
              width: 40px;
              height: 49px;
              background-position: 0 0;
            }
          }
        }
        &:nth-child(2) {
          .icon {
            background-color: #506AA5;
            i {
              margin-top: 20px;
              width: 59px;
              height: 60px;
              background-position: -50px 0;
            }
          }
        }
        &:nth-child(3) {
          .icon {
            background-color: #DB824D;
            i {
              margin-top: 26px;
              width: 50px;
              height: 45px;
              background-position: -120px 0;
            }
          }
        }
      }
    }
  }
</style>
