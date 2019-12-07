<template>
  <div id="team">
    <Header>
      <template slot='conter'>{{$t('我的社群')}}</template>
    </Header>
    <div class="main">
      <div class="list">
        <img v-if='langcn' src="../../../static/images/team_bag12.png" alt="">
        <img v-if='!langcn' src="../../../static/images/team_bag1.png" alt="">
        <div class="text">
          <p>{{$t('我的推荐关系')}}</p>
          <router-link :to="{path:'/recolist1'}">{{$t('去查看')}}<i></i></router-link>
        </div>
      </div>
      <div class="list">
        <img v-if='langcn' src="../../../static/images/team_bag22.png" alt="">
        <img v-if='!langcn' src="../../../static/images/team_bag2.png" alt="">
        <div class="text">
          <p>{{$t('我的节点关系')}}</p>
          <router-link to="/market">{{$t('去查看')}}<i></i></router-link>
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
        langcn: false
      }
    },
    created() {
      console.log(localStorage.getItem('eosLang'));
      if (localStorage.getItem('eosLang')) {
        if (localStorage.getItem('eosLang') == '简体中文') {
          this.langcn = true
        } else {
          this.langcn = false
        }

      }
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

  #team {
    .main {
      padding: 30px;
      .list {
        margin-bottom: 30px;
        position: relative;
        img {
          width: 100%;
        }
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -57px;
          p {
            font-size: 34px;
            line-height: 34px;
            color: #E7E7E7;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            width: 210px;
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            color: #C7C7C7;
            @include border-radius(30px);
            text-align: center;
            background-color: transparent;
            border: 1px solid #C7C7C7; /*no*/
            i {
              display: inline-block;
              margin-left: 10px;
              width: 36px;
              height: 23px;
              background: url("../../../static/images/sprite1.png") no-repeat 0 -70px;
              @include background-size(200px 200px);
            }
          }
        }
      }
    }
  }
</style>
