<template>
  <div id="not_list">
    <Header>
      <template slot='conter'>{{$t('公告列表')}}</template>
    </Header>
    <div class="main">
      <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                :scroll-bottom-offst="200">
        <div class="box1">
          <div class="list" v-for='(v, i) in noticeList' :key='i'>
            <router-link :to="{path:'/notdetail',query:{id:v.adv_id}}">
              <div class="icon" :class="{read:v.is_read==0}">
                <i></i>
              </div>
              <div class="text vux-1px-b">
                <h6>{{v.title}}</h6>
                <p>{{v.create_time}}</p>
              </div>
              <em></em>
            </router-link>
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
        listBat: true,
        onFetching: false,
        page: 1,
        limit: 15,
        noticeList: []
      }
    },
    created() {
      this.getNoticeList()
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取公告列表*/
      getNoticeList() {
        var that = this
        var url = that.$inter + 'Adv/lists'
        var data = {page: that.page, limit: that.limit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.list.length < that.limit) {
              that.listBat = false
            }
            if (response.data.data.list.length > 0) {
              that.noticeList = that.noticeList.concat(response.data.data.list)
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
            if (this.noticeList.length < (this.page - 1) * this.limit) {
              this.listBat = false
            } else {
              this.listBat = true
              this.getNoticeList()
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

  #not_list {
    height: calc(100% - 130px);
    .main {
      height: calc(100% - 90px);
      background-color: #3B4D89;
      .list a {
        padding: 20px 30px 0 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        position: relative;
        .icon {
          width: 100px;
          height: 100px;
          background-color: #1E5FF3;
          @include border-radius(50%);
          text-align: center;
          i {
            margin: 25px 30px;
            width: 40px;
            height: 50px;
            display: inline-block;
            background: url("../../../static/images/sprite1.png") no-repeat 0px 0px;
            @include background-size(200px 200px);
          }
          &.read {
            position: relative;
            &:before {
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
        &.icon1 {
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
        &.icon2 {
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
        &.icon3 {
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
        .text {
          flex: 1;
          margin-left: 20px;
          padding-right: 30px;
          h6 {
            max-width: 450px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 32px;
            color: #fff;
          }
          p {
            padding-bottom: 20px;
            margin-top: 20px;
            line-height: 30px;
            height: 50px;
            font-size: 24px;
            color: #C3C5CB;
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
    }
  }
</style>
