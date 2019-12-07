<template>
  <div id="eos_deal">
    <Header>
      <template slot='conter'>
        {{type==1?$t('总资产'):type==2?'EOS':type==3?$t('注册')+'EOS':type==4?'SEOS':$t('冻结SEOS')}}{{$t('明细')}}
      </template>
    </Header>
    <div class="main">
      <div class="nav vux-1px-t">
        <span :class="{active:screenBtn}" @click='screenBtn=!screenBtn'>{{$t('筛选')}}<i></i></span>
        <span @click="showPlugin">{{time}}<i></i></span>
        <span @click="showPlugin1">{{over_time}}<i></i></span>
        <span @click='screenFunc'>{{$t('搜索')}}</span>
      </div>
      <div v-if='screenBtn' class="down_cont">
        <h6>{{$t('快捷筛选')}}</h6>
        <div class="down_list">
          <span :class="{active:detaType==v.flow_type}" v-for='(v,i) in detaTypeList' :key='i'
                @click='detaType=v.flow_type'>{{v.name}}</span>
        </div>
        <div class="btn">
          <button @click="screenBtn=false;detaType=''">{{$t('重置')}}</button>
          <button @click='screenBtn=false'>{{$t('确定')}}</button>
        </div>
      </div>
      <div class="cont">
        <scroller lock-x height='100%' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                  :scroll-bottom-offst="200">
          <div class="box1">
            <div class="list vux-1px-b" v-for='(v,i) in walletDealList' :key='i'>
              <div class="left">
                <span>{{v.type}} <em v-if='v.sid'>({{v.sid}})</em></span>
                <i>{{v.create_time}}</i>
              </div>
              <div class="right">
                <span v-if='v.amount>0' class='color1'>{{v.amount}}</span>
                <span v-if='v.amount<0' class='color2'>{{v.amount}}</span>
                <i>{{$t('结余')}}: {{v.balance}}</i>
              </div>
            </div>
            <load-more v-show='listBat' :tip="$t('加载中...')"></load-more>
            <divider v-show='!listBat'>~~~</divider>
          </div>
        </scroller>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  import {Datetime, Group, XButton} from 'vux'

  export default {
    data() {
      return {
        type: '',
        screenBtn: false,
        listBat: true,
        onFetching: false,
        type_id: '',
        page: 1,
        limit: 15,
        walletDealList: [],
        /*筛选*/
        detaTypeList: [],
        detaType: '',
        timeData: '',
        overtimeData:'',
        time: '',
        over_time: '',
        time_str: ''
      }
    },
    created() {
      this.time = this.$t('起始时间')
      this.over_time = this.$t('终止时间')
      this.type = this.$route.query.type
      this.getNowFormatDate
      this.getDetaType()
      this.getwalletDealList()
    },
    mounted() {
    },
    components: {Header, Datetime, XButton},
    computed: {},
    watch: {},
    methods: {
      /*获取当前日期*/
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.timeData = currentdate
        this.overtimeData=currentdate
      },
      /*获取明细类型*/
      getDetaType() {
        var that = this
        var url = that.$inter + 'Wallet/flow_type'
        var data = {type: that.type, page: that.page, limit: that.limit}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            that.detaTypeList = response.data.data
          }
        })
      },
      /*筛选*/
      screenFunc() {
        if (this.time == this.$t('起始时间') || this.time == this.$t('终止时间')) {
          this.time_str = ''
        } else {
          this.time_str = this.time + '~' + this.over_time
        }
        this.page = 1
        this.walletDealList = []
        console.log(this.$refs);
        // this.$refs.scrollerBottom[0].scrollTop(0, 0)
        this.getwalletDealList()
      },
      showPlugin() {
        var that = this
        this.$vux.datetime.show({
          cancelText: that.$t('取消'),
          confirmText: that.$t('确定'),
          format: 'YYYY-MM-DD',
          value: that.timeData,
          onConfirm(val) {
            that.time = val
            that.overtimeData=val
          },
          onShow() {

          },
          onHide() {

          }
        })
      },
      showPlugin1() {
        var that = this
        this.$vux.datetime.show({
          cancelText: that.$t('取消'),
          confirmText: that.$t('确定'),
          format: 'YYYY-MM-DD',
          value: that.overtimeData,
          onConfirm(val) {
            that.over_time = val
            that.timeData=val
          },
          onShow() {

          },
          onHide() {

          }
        })
      },
      /*获取公告列表*/
      getwalletDealList() {
        var that = this
        var url = that.$inter + 'Wallet/lists'
        var data = {type: that.type, time: that.time_str, page: that.page, limit: that.limit, flow_type: that.detaType}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            if (response.data.data.length < that.limit) {
              that.listBat = false
            }
            if (response.data.data.length > 0) {
              that.walletDealList = that.walletDealList.concat(response.data.data)
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
            if (this.walletDealList.length < (this.page - 1) * this.limit) {
              this.listBat = false
            } else {
              this.listBat = true
              this.getwalletDealList()
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

  #eos_deal {
    height: 100%;
    &#eos_deal{
      background-color: #3B4D89;
    }
    .main {
      position: relative;
      height: calc(100% - 90px);
      .nav {
        padding: 0 30px;
        height: 100px;
        background-color: #313F71;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        > span {
          margin-right: 10px;
          display: inline-block;
          font-size: 32px;
          color: #fff;
          line-height: 100px;
          i {
            margin-left: 16px;
            display: inline-block;
            vertical-align: middle;
            width: 23px;
            height: 13px;
            background: url("../../../static/images/sprite2.png") no-repeat -540px -90px;
            @include background-size(600px 600px);
          }
          &.active {
            color: #1E61FA;
            i {
              background-position: -570px -90px;
            }
          }
          &:nth-child(2), &:nth-child(3) {
            width: 230px;
          }
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
      .down_cont {
        padding: 0 30px;
        width: 100%;
        background-color: #324071;
        position: absolute;
        top: 100px;
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
            background-color: #3C4C87;
            text-align: center;
            @include border-radius(39px);
            font-size: 32px;
            line-height: 78px;
            color: #AEAFB6;
            &.active {
              background-color: #1E61FA;
              color: #fff;
            }
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
            color: #fff;
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
        height: calc(100% - 130px);
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
              color: #fff;
            }
            i {
              display: block;
              margin-top: 30px;
              font-size: 26px;
              line-height: 26px;
              color: #C4C5CB;
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
