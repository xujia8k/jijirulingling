<template>
  <div id="notice_deta">
    <Header>
      <template slot='conter'>{{$t('公告详情')}}</template>
    </Header>
    <div class="main">
      <h5>{{noticeDeta.title}}</h5>
      <p>{{noticeDeta.create_time}}</p>
      <div class="content" v-html='noticeDeta.content'>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '../../components/header1'

  export default {
    data() {
      return {
        idss: '',
        noticeDeta: {}
      }
    },
    created() {
      this.idss = this.$route.query.id
      this.getNoticeDeta()
    },
    mounted() {
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      /*获取公告列表*/
      getNoticeDeta() {
        var that = this
        var url = that.$inter + 'Adv/detail'
        var data = {adv_id: that.idss}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message, response.data.error);
          } else if (response.data.error == 0) {
            that.noticeDeta = response.data.data
          }
        })
      },
    }
  }
</script>
<style lang="scss" type="text/scss">
  #notice_deta{
    .main{
      .content{
        color: #fff;
      }
    }
  }
</style>
<style lang="scss" scoped type="text/scss">
  #notice_deta {
    &#notice_deta {
      background-color: #3B4D89;
    }
    .main {
      h5 {
        padding: 0 10%;
        text-align: center;
        font-size: 34px;
        color: #fff;
        line-height: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        text-align: center;
        font-size: 28px;
        color: #C3C5CB;
        line-height: 40px;
      }
      .content {
        padding: 30px;
      }
    }
  }
</style>
