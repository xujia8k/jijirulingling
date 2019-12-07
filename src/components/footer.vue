<template>
  <div id='footer'>
    <tabbar>
      <tabbar-item :selected="$route.path=='/index'" link="/index">
        <i slot="icon" class='icon1'></i>
        <span slot="label">{{$t('首页')}}</span>
      </tabbar-item>
      <!--<tabbar-item link="/tran" :selected="$route.path=='/tran'">
        <i slot="icon" class='icon2'></i>
        <span slot="label">{{$t('交易')}}</span>
      </tabbar-item>-->
      <!--<tabbar-item link="/register" :selected="$route.path=='/register'">
        <i slot="icon" class='icon5'></i>
        <span slot="label">{{$t('注册')}}</span>
      </tabbar-item>-->
      <!-- <tabbar-item link="/profit" :selected="$route.path=='/profit'">
        <i slot="icon" class='icon6'></i>
        <span slot="label">{{$t('收益')}}</span>
      </tabbar-item>
      <tabbar-item link="/notlist" :selected="$route.path=='/notlist'">
        <i slot="icon" class='icon5'></i>
        <span slot="label">{{$t('公告')}}</span>
      </tabbar-item> -->
      <tabbar-item link="/user" :selected="$route.path=='/user'">
        <i slot="icon" class='icon4'></i>
        <span slot="label">{{$t('个人')}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: "shopmuth",
    data() {
        return {}
    },
    created() {

    },
    methods: {}
}

</script>
<style lang="scss" scoped type="text/scss">

  #footer {
    height: 120px;
    .weui-tabbar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      padding: 10px 0;
      background-color: #364378;
      &:before {
        display: none;
      }
      .weui-tabbar__item {
        text-align: center;
        .weui-tabbar__icon {
          i {
            display: inline-block;
            background: url("../../static/images/sprite.png") no-repeat;
            background-size: 500px 500px;
            -moz-background-size: 500px 500px;
            -o-background-size: 500px 500px;
            -webkit-background-size: 500px 500px;
            &.icon1 {
              width: 45px;
              height: 45px;
              background-position: 0 0;
            }
            &.icon2 {
              width: 46px;
              height: 46px;
              background-position: -50px 0;
            }
            &.icon3 {
              width: 43px;
              height: 43px;
              background-position: -100px 0;
            }
            &.icon4 {
              width: 42px;
              height: 43px;
              background-position: -150px 0;
            }
            &.icon5 {
              width: 46px;
              height: 48px;
              background: url("../../static/images/sprite1.png") no-repeat -60px -70px;
              background-size: 200px 200px;
              -moz-background-size: 200px 200px;
              -o-background-size: 200px 200px;
              -webkit-background-size: 200px 200px;
            }
            &.icon6 {
              width: 45px;
              height: 44px;
              background: url("../../static/images/sprite1.png") no-repeat -120px -70px;
              background-size: 200px 200px;
              -moz-background-size: 200px 200px;
              -o-background-size: 200px 200px;
              -webkit-background-size: 200px 200px;
            }
          }
        }
        .weui-tabbar__label {
          padding-bottom: 10px;
          span {
            font-size: 24px;
            color: #D3D4D6;
          }
        }
        &.weui-bar__item_on {
          .weui-tabbar__icon {
            i {
              background-position-y: -50px;
              &.icon5, &.icon6 {
                background-position-y: -120px;
              }
            }
          }
          .weui-tabbar__label span {
            color: #1E5FF2;
          }
        }
      }
    }
  }
</style>
