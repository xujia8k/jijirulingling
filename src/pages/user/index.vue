<template>
  <div id='user'>
    <Header>
      <template slot='conter'>{{$t('个人中心')}}</template>
      <!--<template slot='right'>
        <div class='langs'><i>{{$t('语言')}}</i></div>
      </template>-->
    </Header>
    <div class="main">
      <div class="banner">
        <div class="imgs">
          <img :src="imgsrc" alt="">
          <!-- <input type="file" @change='chan'> -->
        </div>
        <p>{{eosInfo.name}}</p>
        <div class="member">
          <i></i>
          <span>{{eosInfo.level}}</span>
        </div>
      </div>
      <div class="list_cont">
        <div class="list">
          <router-link to='/info'>
            <div class="left">
              <i class='icon1'><em></em></i>
              <span>{{$t('个人中心')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <div class="list">
          <router-link to='/security'>
            <div class="left">
              <i class='icon2'><em></em></i>
              <span>{{$t('帐户安全')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <!--<div class="list">
          <router-link to='/setpay'>
            <div class="left">
              <i class='icon3'><em></em></i>
              <span>{{$t('收款账号')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <div class="list">
          <router-link to='/release'>
            <div class="left">
              <i class='icon3'><em></em></i>
              <span>{{$t('发布交易')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <div class="list">
          <router-link to='/record'>
            <div class="left">
              <i class='icon3'><em></em></i>
              <span>{{$t('交易记录')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>-->
        <div class="list">
          <router-link to='/appDown'>
            <div class="left">
              <i class='icon4'><em></em></i>
              <span>app{{$t('下载')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <div class="list">
          <router-link to='/eosTurnOut'>
            <div class="left">
              <i class='icon5'><em></em></i>
              <span>{{$t('我的EOS地址')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <!--<div class="list">
          <router-link to='/seosTurnOut'>
            <div class="left">
              <i class='icon6'><em></em></i>
              <span>{{$t('我的SEOS地址')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>-->
        <div class="list" @click="$Toast('暂未开放')">
          <div class='clows'>
            <div class="left">
              <i class='icon6'><em></em></i>
              <span>{{$t('我的SEOS地址')}}</span>
            </div>
            <div class="right"></div>
          </div>
        </div>

        <!-- <div class="list">
           <router-link to='/notlist'>
             <div class="left">
               <i class='icon7'><em></em></i>
               <span>{{$t('最新公告')}}</span>
             </div>
             <div class="right"></div>
           </router-link>
         </div>-->
        <!-- <div class="list">
           <router-link to='/recommend'>
             <div class="left">
               <i class='icon8'><em></em></i>
               <span>{{$t('我的分享码')}}</span>
             </div>
             <div class="right"></div>
           </router-link>
         </div>-->
        <!-- <div class="list">
          <router-link to='/team'>
            <div class="left">
              <i class='icon9'><em></em></i>
              <span>{{$t('我的社群')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div>
        <div class="list">
          <router-link to='/message'>
            <div class="left">
              <i class='icon9'><em></em></i>
              <span>{{$t('留言列表')}}</span>
            </div>
            <div class="right"></div>
          </router-link>
        </div> -->
        <div class="btn">
          <button @click='outLogin'>{{$t('退 出')}}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from '../../components/header'

export default {
    data() {
        return {
            img: '',
            imgsrc: '',
            eosInfo: {}
        };
    },
    created() {
        if (localStorage.getItem('eosInfo')) {
            this.eosInfo = JSON.parse(localStorage.getItem('eosInfo'))
            if (this.eosInfo.headimgurl) {
                this.imgsrc = this.eosInfo.headimgurl
            } else {
                this.imgsrc = '../../../static/images/user_default.png'
            }
        }
    },
    components: {
        Header
    },
    computed: {},
    watch: {},
    methods: {
        /*更换个人图像*/
        chan(e) {
            // 创建文件读取对象
            var that = this
            var reader = new FileReader();
            // 通过当前的file标签 获取选择的文件
            // 调用该对象的方法读取文件 文件
            // 读取文件是一个耗时操作 不一定什么时候读取完毕
            reader.readAsDataURL(e.target.files[0]);
            // 添加事件
            // 耗时操作 通过事件的方式进行注册 并且回调
            reader.onload = function () {
                // 使用读取完毕的文件
                //使用返回的结果 即可
                that.read = e.target.files[0]
                var url = that.$inter + 'System/upload'
                var url1 = that.$inter + 'Member/headimg'
                var data = new FormData();
                data.append('img', that.read);
                that.$axios.post(url, data).then(function (response) { //获取到内容处理
                    if (response.data.error != 0) {
                        that.$Toast(response.data.message, response.data.error);
                    } else if (response.data.error == 0) {
                        that.img = response.data.data.img //生成生成的http地址
                        that.$axios.post(url1, {
                            img: that.img
                        }).then(function (response) { //获取到内容处理
                            if (response.data.error != 0) {
                                that.$Toast(response.data.message, response.data.error);
                            } else if (response.data.error == 0) {
                                that.$Toast(response.data.message)
                                that.imgsrc = reader.result //本地预览
                                that.eosInfo.headimgurl = reader.result
                                localStorage.setItem('eosInfo', JSON.stringify(that.eosInfo))
                            }
                        })

                    }
                })
            }
        },
        /*退出登录*/
        outLogin() {
            var that = this
            that.$vux.confirm.show({
                title: that.$t('确定退出吗?'),
                confirmText: that.$t('确定'),
                cancelText: that.$t('取消'),
                content: '',
                onShow() {},
                onHide() {},
                onCancel() {},
                onConfirm() {
                    var url = that.$inter + 'Login/logout'
                    var data = {}
                    that.$axios.post(url, data).then(function (response) {
                        if (response.data.error != 0) {
                            that.$Toast(response.data.message, response.data.error);
                        } else if (response.data.error == 0) {
                            that.$Toast(response.data.message)
                            that.online = false
                            that.$store.state.online = false
                            localStorage.removeItem('eosInfo')
                            that.logInfo = ''
                            setTimeout(function () {
                                that.$router.push({
                                    path: '/login'
                                })
                            }, 2000)
                        }
                    })
                }
            })
        },
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #user {
    height: calc(100% - 130px);
    min-height: 20px !important;
    overflow: auto;
    @include background-size(100%);
    &#user {
      background-color: #232D57;
    }
    .langs {
      text-align: right;
      i {
        padding: 0 30px;
        display: inline-block;
        font-size: 26px;
        color: #fff;
        line-height: 90px;
      }
    }
    .main {
      padding: 30px;
      .banner {
        margin-bottom: 30px;
        width: 100%;
        height: 380px;
        @include border-radius(20px);
        background: url("../../../static/images/user_bag.png") no-repeat;
        @include background-size(100%);
        position: relative;
        text-align: center;
        .imgs {
          margin-top: 78px;
          display: inline-block;
          width: 134px;
          height: 134px;
          position: relative;
          img {
            width: 134px;
            height: 134px;
            @include border-radius(50%);
          }
          input {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            font-size: 0pt;
          }
        }
        p {
          margin-top: 30px;
          font-size: 36px;
          line-height: 36px;
          color: #fff;
        }
        .member {
          margin-top: 20px;
          display: inline-block;
          width: 180px;
          height: 50px;
          @include border-radius(25px);
          background-color: #5460E2;
          i {
            display: inline-block;
            vertical-align: middle;
            width: 50px;
            height: 50px;
            background: url("../../../static/images/sprite.png") no-repeat -410px -50px;
            @include background-size(500px 500px);
          }
          span {
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
            font-size: 26px;
            color: #fff;
            line-height: 50px;
          }
        }
      }
      .list_cont{
        background-color: #3B4B87;
        padding: 30px;
        @include border-radius(20px);
        .list a,.list .clows {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .left {
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            i {
              width: 70px;
              em {
                display: inline-block;
                background: url("../../../static/images/sprite.png") no-repeat;
                @include background-size(500px 500px);
              }
              &.icon1 {
                margin-top: 36px;
                em {
                  width: 42px;
                  height: 42px;
                  background-position: -60px -120px;
                }
              }
              &.icon2 {
                margin-top: 36px;
                em {
                  width: 36px;
                  height: 42px;
                  background-position: -110px -120px;
                }
              }
              &.icon3 {
                margin-top: 39px;
                em {
                  width: 36px;
                  height: 36px;
                  background-position: -150px -120px;
                }
              }
              &.icon4 {
                margin-top: 37px;
                em {
                  width: 32px;
                  height: 39px;
                  background-position: -190px -120px;
                }
              }
              &.icon5 {
                margin-top: 38px;
                em {
                  width: 47px;
                  height: 38px;
                  background-position: -230px -120px;
                }
              }
              &.icon6 {
                margin-top: 38px;
                em {
                  width: 38px;
                  height: 38px;
                  background-position: -280px -120px;
                }
              }
              &.icon7 {
                margin-top: 38px;
                em {
                  width: 37px;
                  height: 37px;
                  background-position: -330px -120px;
                }
              }
              &.icon8 {
                margin-top: 40px;
                em {
                  width: 41px;
                  height: 35px;
                  background-position: -370px -120px;
                }
              }
              &.icon9 {
                margin-top: 40px;
                em {
                  width: 46px;
                  height: 35px;
                  background-position: -420px -120px;
                }
              }

            }
            span {
              font-size: 34px;
              color: #EDEDED;
              line-height: 115px;
            }
          }
          .right {
            margin-top: 49px;
            width: 17px;
            height: 31px;
            background: url("../../../static/images/sprite.png") no-repeat -470px -50px;
            @include background-size(500px 500px);
          }
        }
      }

      .btn {
        margin-top: 50px;
        padding-bottom: 50px;
        button {
          width: 100%;
          background-color: #DD4D4D;
        }
      }
    }
  }
</style>
