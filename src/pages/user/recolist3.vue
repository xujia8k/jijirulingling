<template>
  <div id="recolist">
    <Header>
      <template slot='conter'>{{$t('我的推荐')}}</template>
    </Header>
    <div class="main">
      <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                :scroll-bottom-offst="200">
        <div class="box1">
          <div class="list" v-for='(v,i) in recoList' :key='i'>
            <div class="icon">
              <img v-if='v.headimgurl' :src="v.headimgurl" alt="">
              <img v-if='!v.headimgurl' src="../../../static/images/user_default.png" alt="">
            </div>
            <div class="text vux-1px-b">
              <h6><span>{{v.name}}</span><i>{{v.is_jihuo==0?$t('未激活'):$t('已激活')}}</i></h6>
              <p>
                <span>{{$t('推荐')}}: {{v.tuijian_num}}</span>
                <span>{{$t('未激活')}}: {{v.jihuo_no}} </span>
                <span>{{$t('激活')}}: {{v.jihuo_yes}}</span>
              </p>
            </div>
            <em></em>
          </div>
          <load-more v-show='listBat' :tip="$t('加载中...')"></load-more>
          <divider v-show='!listBat'>~~~</divider>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        type: '',
        listBat: true,
        onFetching: false,
        type_id: '',
        page: 1,
        limit: 15,
        recoList: []
      }
    },
    created() {
      this.getrocoList()
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取关系列表*/
      getrocoList() {
        var that = this
        var url = that.$inter + 'Member/fans'
        var data = {username: that.$route.query.name, page: that.page, limit: that.limit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.list.length < that.limit) {
              that.listBat = false
            }
            if (response.data.data.list.length > 0) {
              that.recoList = that.recoList.concat(response.data.data.list)
            }
            that.page++
          }
        })
      },
      /*无限加载*/
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            if (this.recoList.length < (this.page - 1) * this.limit) {
              this.listBat = false
            } else {
              this.listBat = true
              this.getrocoList()
            }
            this.$nextTick(() => {
              if (this.$refs.scrollerBottom) {
                this.$refs.scrollerBottom.reset()
              }
            })
            this.onFetching = false
          }, 2000)
        }
      },
    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #recolist {
    &#recolist {
      background-color: #3D4D89;
    }
    height: 100%;
    &#recolist{
      background-color: #3B4D89;
    }
    .main {
      height: calc(100% - 90px);
      .list {
        padding: 20px 30px 0 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        position: relative;
        .icon {
          width: 100px;
          height: 100px;
          @include border-radius(50%);
          img {
            width: 100px;
            height: 100px;
            @include border-radius(50%);
          }
        }
        .text {
          flex: 1;
          margin-left: 20px;
          padding-right: 30px;
          h6 {
            margin-top: 10px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            span {
              font-size: 32px;
              line-height: 32px;
              color: #E7E7E7;
            }
            i {
              margin-left: 20px;
              font-size: 28px;
              line-height: 32px;
              color: #0077FF;
            }
          }
          p {
            margin-top: 20px;
            padding-bottom: 20px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            span {
              margin-right: 30px;
              font-size: 28px;
              line-height: 30px;
              color: #E7E7E7;
            }
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
