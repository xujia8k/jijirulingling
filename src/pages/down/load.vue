<template>
  <div id="load">
    <div class="logo">
      <img src="../../../static/images/logo.png" alt="">
    </div>
    <p>{{$t('下载中,请稍后...')}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        url: ''
      }
    },
    created() {
      this.url = this.$route.query.url
      window.location.href = this.url
    },
    mounted() {
    },
    components: {},
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style lang="scss" scoped type="text/scss">
  #load#load {
    background-color: #435593;
    .logo {
      padding-top: 100px;
      text-align: center;
      img {
        width: 400px;
        height: 400px;
      }
    }
    p {
      margin-top: 250px;
      font-size: 34px;
      color: #fff;
      text-align: center;
    }
  }
</style>
