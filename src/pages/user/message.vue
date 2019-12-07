<template>
  <div id="not_list">
    <Header>
      <template slot='conter'>{{$t('留言列表')}}</template>
      <template slot='right'><router-link to='/mesdeta' class='new_mes'>{{$t('新建')}}</router-link></template>
    </Header>
    <div class="main">
      <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                :scroll-bottom-offst="200">
        <div class="box1">
          <div class="list" v-for='(v, i) in noticeList' :key='i'>
            <router-link to="">
              <div class="icon" :class="{read:v.is_read==0}">
                <i></i>
              </div>
              <div class="text vux-1px-b">
                <h6><span>{{$t('问')}}: </span><i>{{v.question}}</i></h6>
                <p>{{v.create_time}}</p>
                <h6><span>{{$t('答')}}:</span><i>{{v.content}}</i></h6>
                <p>{{v.reply_time}}</p>
              </div>
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
        var url = that.$inter + 'Question/lists'
        var data = {page: that.page, limit: that.limit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.limit) {
              that.listBat = false
            }
            if (response.data.data.length > 0) {
              that.noticeList = that.noticeList.concat(response.data.data)
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
    &#not_list {
      background-color: #3D4D89;
    }
    .new_mes{
      display: inline-block;
      padding: 30px 20px;
      font-size: 20px;
      line-height: 30px;
      color: #fff;
      text-align: right;
    }
    .main {
      height: calc(100% - 90px);
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
            margin: 25px 28px;
            width: 48px;
            height: 50px;
            display: inline-block;
            background: url("../../../static/images/sprite2.png") no-repeat -520px -150px;
            @include background-size(600px 600px);
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
        .text {
          flex: 1;
          margin-left: 20px;
          padding-right: 30px;
          h6 {
            font-size: 32px;
            color: #E7E7E7;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            overflow: hidden;

            span {
              margin-right: 10px;
            }
            i{
              max-width: 530px;
              word-wrap: break-word;
              word-break: normal;
              display: inline-block;
              text-align: justify;
            }
          }
          p {
            text-align: right;
            padding-bottom: 20px;
            margin-top: 20px;
            line-height: 30px;
            height: 50px;
            font-size: 24px;
            color: #576171;
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
