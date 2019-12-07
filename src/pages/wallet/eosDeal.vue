<template>
  <div id="eos_deal">
    <Header>
      <template slot='conter'>EOS明细</template>
    </Header>
    <div class="main">
      <div class="nav vux-1px-t">
        <span :class="{active:screenBtn}" @click='screenBtn=!screenBtn'>筛选<i></i></span>
        <span>时间<i></i></span>
      </div>
      <div v-if='screenBtn' class="down_cont">
        <h6>快捷筛选</h6>
        <div class="down_list">
          <span>EOS投资</span>
          <span>兑换</span>
          <span>转账</span>
          <span>充币</span>
          <span>提币</span>
          <span>释放</span>
          <span>推荐奖励</span>
          <span>分享</span>
          <span>领导奖励</span>
        </div>
        <div class="btn">
          <button>重置</button>
          <button>确定</button>
        </div>
      </div>
      <div class="cont">
        <div class="list vux-1px-b">
          <div class="left">
            <span>EOS投资</span>
            <i>2018-08-02</i>
          </div>
          <div class="right">
            <span class='color1'>+250</span>
            <i>结余: 89552</i>
          </div>
        </div>
        <div class="list vux-1px-b">
          <div class="left">
            <span>EOS投资</span>
            <i>2018-08-02</i>
          </div>
          <div class="right">
            <span class='color1'>+250</span>
            <i>结余: 89552</i>
          </div>
        </div>
        <div class="list vux-1px-b">
          <div class="left">
            <span>EOS投资</span>
            <i>2018-08-02</i>
          </div>
          <div class="right">
            <span class='color1'>+250</span>
            <i>结余: 89552</i>
          </div>
        </div>
        <div class="list vux-1px-b">
          <div class="left">
            <span>EOS投资</span>
            <i>2018-08-02</i>
          </div>
          <div class="right">
            <span class='color1'>+250</span>
            <i>结余: 89552</i>
          </div>
        </div>
        <div class="list vux-1px-b">
          <div class="left">
            <span>EOS投资</span>
            <i>2018-08-02</i>
          </div>
          <div class="right">
            <span class='color2'>-250</span>
            <i>结余: 89552</i>
          </div>
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
        screenBtn:false,
      }
    },
    created() {
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #eos_deal {
    .main {
      position: relative;
      .nav {
        padding: 0 30px;
        height: 130px;
        background-color: #22283E;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        > span {
          margin-right: 100px;
          display: inline-block;
          font-size: 34px;
          color: #AEAEB6;
          line-height: 130px;
          i {
            margin-left: 16px;
            display: inline-block;
            vertical-align: middle;
            width: 23px;
            height: 13px;
            background: url("../../../static/images/sprite.png") no-repeat -430px -270px;
            @include background-size(500px 500px);
          }
          &.active{
            color: #1E61FA;
            i{
              background-position: -460px -270px;
            }
          }
        }
      }
      .down_cont {
        padding: 0 30px;
        width: 100%;
        background-color: #21273D;
        position: absolute;
        top: 130px;
        left: 0;
        z-index: 3;
        border-top: 1px solid #1D2336; /*no*/
        h6 {
          font-size: 34px;
          line-height: 110px;
          color: #C3C5CB;
        }
        .down_list {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          flex-wrap: wrap;
          span {
            margin-bottom: 20px;
            width: 210px;
            height: 78px;
            background-color: #303753;
            text-align: center;
            @include border-radius(39px);
            font-size: 32px;
            line-height: 78px;
            color: #AEAFB6;
          }
        }
        .btn {
          margin-top: 30px;
          padding-bottom: 40px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          button {
            width: 320px;
            height: 78px;
            font-size: 34px;
            color: #C3C5CB;
            &:nth-child(1) {
              background-color: #DB4D4D;
            }
            &:nth-child(2) {
              background-color: #1D61FB;
            }
          }
        }
      }
      .cont {
        padding: 0 30px;
        .list {
          padding: 30px 0;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .left, .right {
            span {
              display: block;
              font-size: 32px;
              line-height: 32px;
              color: #C4C5CB;
            }
            i {
              display: block;
              margin-top: 30px;
              font-size: 26px;
              line-height: 26px;
              color: #848489;
            }
            &.right {
              text-align: right;
              span {
                &.color1 {
                  color: #20BC68;
                }
                &.color2 {
                  color: #DC4D4D;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
