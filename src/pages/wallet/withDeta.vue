<template>
  <div id="not_list">
    <Header>
      <template slot='conter'>{{$t('提币明细')}}</template>
    </Header>
    <div class="main">
      <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                :scroll-bottom-offst="200">
        <div class="box1">
          <ul v-for='(v,i) in noticeList' :key='i' class='vux-1px-b'>
            <li>
              <label for="">{{$t('申请时间')}}:</label>
              <span>{{v.create_time}}</span>
            </li>
            <li>
              <label for="">{{$t('提币数量')}}:</label>
              <span>{{v.amount}}</span>
            </li>
            <li>
              <label for="">{{$t('实际到账')}}:</label>
              <span>{{v.actual_amount}}</span>
            </li>
            <li>
              <label for="">{{$t('矿工费用')}}:</label>
              <span>{{v.shouxufei}}</span>
            </li>
            <li>
              <label for="">{{$t('接收地址')}}:</label>
              <span>{{v.address}}</span>
            </li>
            <li>
              <img @click="bigimgFunc(v.eos_img)" :src="v.eos_img" alt="">
            </li>
            <li>
              <label for="">{{$t('memo值')}}:</label>
              <span>{{v.memo}}</span>
            </li>
            <li>
              <img @click="bigimgFunc(v.memo_img)" :src="v.memo_img" alt="">
            </li>
            <li>
              <label for="">{{$t('处理状态')}}
              </label>
              <span v-if='v.status==0'>{{$t('审核中')}}</span>
              <span v-if='v.status==1'>{{$t('审核通过')}}</span>
              <span v-if='v.status==2'>{{$t('驳回')}} <i v-if='v.reason'>({{v.reason}})</i></span>
            </li>
          </ul>
          <load-more v-show='listBat' :tip="$t('加载中...')"></load-more>
          <divider v-show='!listBat'>~~~</divider>
        </div>
      </scroller>
    </div>
    <div @click='bigImgBtn=false' v-show='bigImgBtn' id="mask"></div>
    <div @click='bigImgBtn=false' v-show='bigImgBtn' id="big_img">
      <img :src="imgsrc" alt="">
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
        limit: 3,
        noticeList: [],
        bigImgBtn: false,
        imgsrc: ''
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
      /*放大图片*/
      bigimgFunc(x) {
        this.bigImgBtn = true
        this.imgsrc = x
      },
      /*获取公告列表*/
      getNoticeList() {
        var that = this
        var url = that.$inter + 'Eos/take_list'
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
    .main {
      height: calc(100% - 90px);
      background-color: #3B4D89;
      ul {
        padding: 20px 0;
        li {
          padding: 20px 30px 0 30px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          position: relative;
          label {
            width: 180px;
            font-size: 32px;
            color: #E7E7E7;
            line-height: 50px;
          }
          span {
            flex: 1;
            font-size: 32px;
            color: #E7E7E7;
            line-height: 50px;
          }
          img {
            margin-left: 180px;
            width: 200px;
            height: 200px;
          }
        }
      }
    }
    #big_img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1002;
      img {
        width: 80%;
        position: absolute;
        top: 50%;
        left: 10%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
  }
</style>
