<template>
  <div id="info">
    <Header>
      <template slot='conter'>{{$t('帐户安全')}}</template>
    </Header>
    <div class="main">
      <div class="list vux-1px-b">
       <router-link to='/modLog'>
         <label>{{$t('登录密码')}}</label>
         <i></i>
       </router-link>
      </div>
      <div class="list vux-1px-b">
        <router-link to='/modjy'>
          <label>{{$t('交易密码')}}</label>
          <i></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {}
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

  #info {
    &#info {
      background-color: #3D4D89;
    }
    .main {
      padding: 0 30px;
      .list a{
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        position: relative;
        label {
          width: 180px;
          font-size: 32px;
          color: #E7E7E7;
          line-height: 96px;
        }
        input {
          padding-right: 40px;
          flex: 1;
          text-align: right;
        }
        i {
          width: 18px;
          height: 31px;
          background: url("../../../static/images/sprite.png") no-repeat -470px -50px;
          @include background-size(500px 500px);
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -15px;
        }
      }
    }
  }
</style>
