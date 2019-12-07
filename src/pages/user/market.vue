<template>
  <div id="recolist">
    <Header>
      <template slot='conter'>{{$t('我的市场')}}</template>
    </Header>
    <div class="main" ref='main'>
      <div class="box1">
        <div class="list">
          <img :src="list1.headimgurl?list1.headimgurl:'../../../static/images/user_default.png'" alt="">
          <div class="info">
            <p class='name'>{{list1.name}}</p>
            <!--<p>{{$t('业绩')}}：{{list1.score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list1.team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list1.team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list1.team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list1.team_amount2}}</i></span>
            </p>
          </div>
          <!--<div class="reco">
            <img :src="list1.tuijian_headimgurl?list1.tuijian_headimgurl:'../../../static/images/user_default.png'"
                 alt="">
            <div class="text">
              <p>{{$t('推荐人')}}</p>
              <p>{{list1.tuijian_user_name}}</p>
            </div>
          </div>-->
          <div v-if='(list1.jid!=0)&&(list1.name!=username)' class="btn">
            <button @click='setTopFunc(list1.jid)'>{{$t('置顶上一级')}}</button>
          </div>
        </div>
      </div>
      <div class="box2">
        <div v-if="empty1&&list2['1']" class="list">
          <img :src="list2['1'].headimgurl?list2['1'].headimgurl:'../../../static/images/user_default.png'" alt="">
          <div class="info">
            <p class='name'>{{list2['1'].name}}</p>
            <!--<p>{{$t('业绩')}}：{{list2['1'].score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list2['1'].team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list2['1'].team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list2['1'].team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list2['1'].team_amount2}}</i></span>
            </p>
          </div>
          <!--<div class="reco">
            <img
              :src="list2['1'].tuijian_headimgurl?list2['1'].tuijian_headimgurl:'../../../static/images/user_default.png'"
              alt="">
            <div class="text">
              <p>{{$t('推荐人')}}</p>
              <p>{{list2['1'].tuijian_user_name}}</p>
            </div>
          </div>-->
          <div class="btn">
            <button @click="setTopFunc(list2['1'].name)">{{$t('置顶')}}</button>
          </div>
        </div>
        <div v-if="empty1&&!list2['1']" class="list">
          <div class='register_btn'>
            <button @click="$router.push({path:'/register',query:{type:1,name:list1.name}})">{{$t('注册')}}</button>
            ,
          </div>
        </div>
        <div v-if="!empty1" class="list empty">
        </div>
        <div v-if="empty1&&list2['2']" class="list">
          <img :src="list2['2'].headimgurl?list2['2'].headimgurl:'../../../static/images/user_default.png'" alt="">
          <div class="info">
            <p class='name'>{{list2['2'].name}}</p>
            <!--<p>{{$t('业绩')}}：{{list2['2'].score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list2['2'].team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list2['2'].team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list2['2'].team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list2['2'].team_amount2}}</i></span>
            </p>
          </div>
          <!--<div class="reco">
            <img
              :src="list2['2'].tuijian_headimgurl?list2['2'].tuijian_headimgurl:'../../../static/images/user_default.png'"
              alt="">
            <div class="text">
              <p>{{$t('推荐人')}}</p>
              <p>{{list2['2'].tuijian_user_name}}</p>
            </div>
          </div>-->
          <div class="btn">
            <button @click='setTopFunc(list1.name)'>{{$t('置顶')}}</button>
          </div>
        </div>
        <div v-if="empty1&&!list2['2']" class="list">
          <div class='register_btn'>
            <button @click="$router.push({path:'/register',query:{type:2,name:list1.name}})">{{$t('注册')}}</button>
          </div>
        </div>
        <div v-if="!empty1" class="list empty">
        </div>
      </div>
      <div class="box3">
        <div v-if="empty2&&list3['1']['1']" class="list">
          <img :src="list3['1']['1'].headimgurl?list3['1']['1'].headimgurl:'../../../static/images/user_default.png'"
               alt="">
          <div class="info">
            <p class='name'>{{list3['1']['1'].name}}</p>
            <!--<p>{{$t('业绩')}}：{{list3['1']['1'].score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list3['1']['1'].team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list3['1']['1'].team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list3['1']['1'].team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list3['1']['1'].team_amount2}}</i></span>
            </p>
          </div>
          <!-- <div class="reco">
             <img
               :src="list3['1']['1'].tuijian_headimgurl?list3['1']['1'].tuijian_headimgurl:'../../../static/images/user_default.png'"
               alt="">
             <div class="text">
               <p>{{$t('推荐人')}}</p>
               <p>{{list3['1']['1'].tuijian_user_name}}</p>
             </div>
           </div>-->
          <div class="btn">
            <button @click="setTopFunc(list3['1']['1'].name)">{{$t('置顶')}}</button>
          </div>
        </div>
        <div v-if="empty2&&!list3['1']['1']" class="list">
          <div v-if="list2['1']" class='register_btn'>
            <button @click="$router.push({path:'/register',query:{type:1,name:list2['1'].name}})">{{$t('注册')}}</button>
          </div>
        </div>
        <div v-if="!empty2" class="list empty">
        </div>
        <div v-if="empty2&&list3['1']['2']" class="list">
          <img :src="list3['1']['2'].headimgurl?list3['1']['2'].headimgurl:'../../../static/images/user_default.png'"
               alt="">
          <div class="info">
            <p class='name'>{{list3['1']['2'].name}}</p>
            <!--<p>{{$t('业绩')}}：{{list3['1']['2'].score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list3['1']['2'].team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list3['1']['2'].team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list3['1']['2'].team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list3['1']['2'].team_amount2}}</i></span>
            </p>
          </div>
          <!--<div class="reco">
            <img
              :src="list3['1']['2'].tuijian_headimgurl?list3['1']['2'].tuijian_headimgurl:'../../../static/images/user_default.png'"
              alt="">
            <div class="text">
              <p>{{$t('推荐人')}}</p>
              <p>{{list3['1']['2'].tuijian_user_name}}</p>
            </div>
          </div>-->
          <div class="btn">
            <button @click="setTopFunc(list3['1']['2'].name)">{{$t('置顶')}}</button>
          </div>
        </div>
        <div v-if="empty2&&!list3['1']['2']" class="list">
          <div v-if="list2['1']" class='register_btn'>
            <button @click="$router.push({path:'/register',query:{type:1,name:list2['1'].name}})">{{$t('注册')}}</button>
          </div>
        </div>
        <div v-if="!empty2" class="list empty">
        </div>
        <div v-if="empty3&&list3['2']['1']" class="list">
          <img :src="list3['2']['1'].headimgurl?list3['2']['1'].headimgurl:'../../../static/images/user_default.png'"
               alt="">
          <div class="info">
            <p class='name'>{{list3['2']['1'].name}}</p>
            <!--<p>{{$t('业绩')}}：{{list3['2']['1'].score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list3['2']['1'].team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list3['2']['1'].team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list3['2']['1'].team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list3['2']['1'].team_amount2}}</i></span>
            </p>
          </div>
          <!-- <div class="reco">
             <img
               :src="list3['2']['1'].tuijian_headimgurl?list3['2']['1'].tuijian_headimgurl:'../../../static/images/user_default.png'"
               alt="">
             <div class="text">
               <p>{{$t('推荐人')}}</p>
               <p>{{list3['2']['1'].tuijian_user_name}}</p>
             </div>
           </div>-->
          <div class="btn">
            <button @click="setTopFunc(list3['2']['1'].name)">{{$t('置顶')}}</button>
          </div>
        </div>
        <div v-if="empty3&&!list3['2']['1']" class="list">
          <div v-if="list2['2']" class='register_btn'>
            <button @click="$router.push({path:'/register',query:{type:2,name:list2['2'].name}})">{{$t('注册')}}</button>
          </div>
        </div>
        <div v-if="!empty3" class="list empty">
        </div>
        <div v-if="empty3&&list3['2']['2']" class="list">
          <img :src="list3['2']['2'].headimgurl?list3['2']['2'].headimgurl:'../../../static/images/user_default.png'"
               alt="">
          <div class="info">
            <p class='name'>{{list3['2']['2'].name}}</p>
            <!--<p>{{$t('业绩')}}：{{list3['2']['2'].score}}</p>-->
          </div>
          <div class="con_box">
            <p>
              <span>{{$t('左')}}：<i>{{list3['2']['2'].team_amount1_total}}</i></span>
              <span>{{$t('右')}}：<i>{{list3['2']['2'].team_amount2_total}}</i></span>
            </p>
            <p>
              <span>{{$t('余')}}：<i>{{list3['2']['2'].team_amount1}}</i></span>
              <span>{{$t('余')}}：<i>{{list3['2']['2'].team_amount2}}</i></span>
            </p>
          </div>
          <!-- <div class="reco">
             <img
               :src="list3['2']['2'].tuijian_headimgurl?list3['2']['2'].tuijian_headimgurl:'../../../static/images/user_default.png'"
               alt="">
             <div class="text">
               <p>{{$t('推荐人')}}</p>
               <p>{{list3['2']['2'].tuijian_user_name}}</p>
             </div>
           </div>-->
          <div class="btn">
            <button @click="setTopFunc(list3['2']['2'].name)">{{$t('置顶')}}</button>
          </div>
        </div>
        <div v-if="empty3&&!list3['2']['2']" class="list">
          <div v-if="list2['2']" class='register_btn'>
            <button @click="$router.push({path:'/register',query:{type:2,name:list2['2'].name}})">{{$t('注册')}}</button>
          </div>
        </div>
        <div v-if="!empty3" class="list empty">
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
        eosInfo: {},
        user_id: '',
        username: '',
        list1: {},
        list2: {
          '1': {},
          '2': {}
        },
        list3: {
          '1': {
            '1': {},
            '2': {}
          },
          '2': {
            '1': {},
            '2': {}
          },
        },
        empty1: false,
        empty2: false,
        empty3: false
      }
    },
    created() {
      if (localStorage.getItem('eosInfo')) {
        this.eosInfo = JSON.parse(localStorage.getItem('eosInfo'))
        this.username = this.eosInfo.name
      }
      if (this.$route.query.id) {
        this.idss = this.$route.query.id
        this.getindexInfo(this.idss)
      } else {
        this.getindexInfo()
      }
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      getindexInfo(id) {
        var that = this;
        var url = that.$inter + "Member/node";
        var data = {username: id};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.list1 = response.data.data['1']
            that.list2 = response.data.data['2']
            that.list3 = response.data.data['3']
            if (that.list1.is_hide == 0) {
              that.empty1 = true
              that.empty2 = true
              that.empty3 = true
            }
            if (that.list2['1'].is_hide == 1) {
              that.empty2 = false
            } else {
              that.empty2 = true
            }
            if (that.list2['2'].is_hide == 1) {
              that.empty3 = false
            } else {
              that.empty3 = true
            }
            if (that.list1.is_hide == 1) {
              that.empty1 = false
              that.empty2 = false
              that.empty3 = false
            }
          }
        });

      },
      /*置顶*/
      setTopFunc(id) {
        this.getindexInfo(id)
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
    width: 100%;
    height: 100%;
    .main {
      /*-webkit-transform: scale(.5);
      -moz-transform: scale(.5);
      -ms-transform: scale(.5);
      -o-transform: scale(.5);
      transform: scale(.5);*/
      height: 1300px;
      min-height: 100%;
      overflow: scroll;
      padding-bottom: 100px;
      background-color: #3B4D89;
      -webkit-overflow-scrolling: touch;
      text-align: center;
      .box1, .box2, .box3 {
        width: 1400px;
        padding-top: 100px;
        height: 440px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
      }
      .list {
        padding-top: 50px;
        display: inline-block;
        width: 290px;
        height: 350px;
        background-color: #1F2741;
        @include border-radius(10px);
        position: relative;
        &.empty {
          background-color: #3B4D89;
        }
        > img {
          width: 70px;
          height: 70px;
          @include border-radius(50%);
          position: absolute;
          top: -35px;
          left: 50%;
          margin-left: -35px;
        }
        .info {
          p {
            &:nth-child(1) {
              font-size: 17px;
              color: #fff;
            }
            &:nth-child(2) {
              margin-top: 10px;
              font-size: 16px;
              color: #E7E7E7;
            }
            &:nth-child(3) {
              margin-top: 10px;
              font-size: 17px;
              color: #E7E7E7;
            }

          }
        }
        .con_box {
          margin: 30px auto 0 auto;
          padding-top: 10px;
          width: 210px;
          height: 90px;
          background-color: #1F2D55;
          @include border-radius(10px);
          p {
            display: flex;
            display: -webkit-flex;
            justify-content: space-around;
            span {
              font-size: 15px;
              color: #E7E7E7;
              i {
                font-size: 18px;
                color: #1FBB67;
              }
              &:nth-last-child(1) {
                i {
                  color: #1E61FA;
                }
              }
            }
            &:nth-last-child(1) {
              margin-top: 15px;
            }
          }
        }
        .reco {
          margin-top: 10px;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          img {
            width: 40px;
            height: 40px;
            @include border-radius(50%);
          }
          .text {
            margin-left: 18px;
            border-left: 1px solid #303C60; /*no*/
            padding-left: 17px;
            p {
              font-size: 16px;
              color: #C3C5CB;
              line-height: 23px;
            }
          }
        }
        .btn {
          margin-top: 30px;
          text-align: center;
          button {
            width: 150px;
            height: 35px;
            font-size: 16px;
            line-height: 35px;
          }
        }
        .register_btn {
          margin-top: 40%;
          button {
            width: 150px;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
          }
        }
      }
    }
  }
</style>
