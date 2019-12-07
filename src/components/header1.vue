<template>
  <div id="header" :class="{noplus:!plus}">
    <div class="header" :class="{noplus1:!plus}">
      <div class="left" @click='returnGo'>
        <i></i>
      </div>
      <div class="conter">
        <slot name='conter'></slot>
      </div>
      <div class="right">
        <slot name='right'></slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        plus: false,  //判断是否为app
        info: {
          identity: '',
          nick: ''
        },
        routs: '11122',
        namess: ''
      }
    },
    created() {
      if (window.plus) {
        this.plus = true
      } else {
        this.plus = false
      }
    },

    methods: {
      returnGo() {
        if (this.$route.fullPath == '/my_tran') {
          this.$router.push({path: '/tran'})
          return
        }
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../static/css/css3";

  #header {
    height: 130px;
    &.noplus {
      height: 90px;
    }
    .header {
      width: 100%;
      height: 130px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
      background-color: #242E58;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      &.noplus1 {
        margin-top: -40px;
      }
      .left, .right {
        margin-top: 40px;
        width: 100px;
        &.left{
          padding-top: 29px;
          padding-left: 30px;
          i{
            display: inline-block;
            width: 18px;
            height: 33px;
            background: url("../../static/images/sprite.png")no-repeat -200px 0;
            @include background-size(500px 500px);
          }
        }
      }
      .conter {
        margin-top: 40px;
        font-size: 38px;
        line-height: 90px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

</style>
