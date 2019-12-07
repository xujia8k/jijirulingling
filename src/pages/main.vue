<template>
<div id="mains">
  <img src="../../static/images/kaichang1080.gif" alt="">
</div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        },
        created() {
        },
        mounted() {
          var that=this
          setTimeout(function () {
            that.$router.push({path:'/login'})
          },4000)
        },
        components: {},
        computed: {},
        watch: {},
        methods: {}
    }
</script>
<style lang="scss" scoped type="text/scss">
#mains{
  height: 100%;
  width: 100%;
  &#mains{
    background-color: #001018;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
