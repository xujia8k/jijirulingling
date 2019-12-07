<template>
  <div id='agre'>
    <Header>
      <template slot='conter'>{{$t('用户协议')}}</template>
    </Header>
    <div class="main"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header1'
  export default {
    data() {
      return {};
    },
    created() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      getInfoss() {
        var that = this;
        var url = that.$inter.apidomain + "/Member/ucenter";
        var data = {};
        that.$axios.post(url, data).then(function(response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  #agre{
    min-height: 100%;
    background-color: #101529;
    .main{
    }
  }
</style>
