<template>
  <div id='tran'>
    <Header>
      <template slot='conter'>{{$t('交易大厅')}}</template>
      <template slot='right'>
        <div class='sign_in'><i></i></div>
      </template>
    </Header>
    <div class="main">
      <div class="canvas">
        <h6>{{$t('价格走势')}}</h6>
        <div class="canvas" id='myChart'></div>
      </div>
      <div class="table">
        <h6>{{$t('实时交易')}}</h6>
        <div class='sall'>
          <table>
            <tr>
              <th>{{$t('买/卖')}}</th>
              <th>{{$t('价格')}}</th>
              <th>{{$t('数量')}}</th>
              <th>{{$t('操作')}}</th>
            </tr>
            <tr v-for='(v,i) in tranBuy' :key='i'>
              <td>买{{i+1}}</td>
              <td>￥{{v.price}}</td>
              <td>{{v.amount}}</td>
              <td>
                <router-link class='button' :to="{path:'/tranbuy',query:{id:v.order_id}}">卖出</router-link>
              </td>
            </tr>
          </table>
        </div>
        <div class="buy">
          <table>
            <tr v-for='(v,i) in tranSall' :key='i'>
            <td>{{$t('卖')}}{{i+1}}</td>
            <td>￥{{v.price}}</td>
            <td>{{v.amount}}</td>
            <td>
              <router-link class='button' :to="{path:'/transall',query:{id:v.order_id}}">{{$t('买入')}}</router-link>
            </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header'
  import echarts from 'echarts'

  export default {
    data() {
      return {
        tranBuy: [],
        tranSall: []
      };
    },
    created() {
      this.gettranList()
    },
    mounted() {
      setTimeout(()=>{
        this.drawLine()
      },500)
    },
    components: {Header},
    computed: {},
    watch: {},
    methods: {
      gettranList() {
        var that = this;
        var url = that.$inter + "Trans/hall";
        var data = {type:0,page:1,limit:100};
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {

            response.data.data.forEach(function (v, i) {
              if (v.type == 1) {
                that.tranBuy.push(v)
              } else if (v.type == 2) {
                that.tranSall.push(v)
              }
            })
            console.log(that.tranSall);
          }
        });
      },
      /*k线图*/
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var that = this
        var data0 = []
        var volumes = []

        //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
        function splitData(rawData) {
          var categoryData = [];
          var values = [];

          for (var i = 0; i < rawData.length; i++) {
            //splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期
            //alert(rawData[i].splice(0, 1)[0]);
            //categoryData  日期  把返回的日期放到categoryData[]数组中
            categoryData.push(rawData[i].splice(0, 1)[0]);
            //alert(categoryData);

            //数据数组，即数组中除日期外的数据
            // alert(rawData[i]);
            values.push(rawData[i])
          }
          return {
            categoryData: categoryData, //数组中的日期 x轴对应的日期
            values: values              //数组中的数据 y轴对应的数据
          };
        }

        //计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20,30)
        function calculateMA(dayCount) {
          var result = [];
          for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
              result.push('-');
              //alert(result);
              continue;   //结束单次循环，即不输出本次结果
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
              //收盘价总和
              sum += parseFloat(data0.values[i - j][1]);
            }
            result.push((sum / dayCount).toFixed(3));
            // alert(result);
          }
          return result;
        }

        var url = that.$inter + 'Wallet/index'
        var data = {}
        that.$axios.post(url, data).then(function (response) {
          if (response.data.error != 0) {
            that.$Toast(response.data.message,response.data.error);
          } else if (response.data.error == 0) {
            //data0 = splitData(response.data.data.zhexian)
            //volumes = response.data.data.zhu
            data0 = splitData([
              ['1/24', 2320.26, 2320.26, 2287.3, 2362.94],
              ['1/25', 2300, 2291.3, 2288.26, 2308.38],
              ['1/28', 2295.35, 2346.5, 2295.35, 2346.92],
              ['1/29', 2347.22, 2358.98, 2337.35, 2363.8],
              ['1/30', 2360.75, 2382.48, 2347.89, 2383.76],
              ['1/31', 2383.43, 2385.42, 2371.23, 2391.82],
              ['2/1', 2377.41, 2419.02, 2369.57, 2421.15],
              ['2/4', 2425.92, 2428.15, 2417.58, 2440.38],
              ['2/5', 2411, 2433.13, 2403.3, 2437.42],
              ['2/6', 2432.68, 2434.48, 2427.7, 2441.73],
              ['1/24', 2320.26, 2320.26, 2287.3, 2362.94],
              ['1/25', 2300, 2291.3, 2288.26, 2308.38],
              ['1/28', 2295.35, 2346.5, 2295.35, 2346.92],
              ['1/29', 2347.22, 2358.98, 2337.35, 2363.8],
              ['1/30', 2360.75, 2382.48, 2347.89, 2383.76],
              ['1/31', 2383.43, 2385.42, 2371.23, 2391.82],
              ['2/1', 2377.41, 2419.02, 2369.57, 2421.15],
              ['2/4', 2425.92, 2428.15, 2417.58, 2440.38],
              ['2/5', 2411, 2433.13, 2403.3, 2437.42],
              ['2/6', 2432.68, 2434.48, 2427.7, 2441.73]
            ]);
            volumes = [86160, 79330, 102600, 104890, 85230, 115230, 99410, 90120, 79990, 107100, 86160, 79330, 102600, 104890, 85230, 115230, 99410, 90120, 79990, 107100,];
            var colorList = ['#E70012', '#E70012', '#52AE57', '#52AE57', '#F0415A', '#2799FF', '#D90295', '#02D953', '#1F62FB', '#1F62FB', '#eee']
            /*0.阳线 1.阳线边框 2.阴线 3.阴线边框 4.MA5 5.MA10 6.MA20 7.MA30 8.成交量正增长 9.成交量副增长 10.成交量hover时颜色*/
            var option = {
              title: {    //标题
                text: '',
                left: 0
              },
              tooltip: {  //提示框
                trigger: 'axis',    //触发类型：坐标轴触发
                axisPointer: {  //坐标轴指示器配置项
                  type: 'cross',   //指示器类型，十字准星
                  lineStyle: {
                    //color:'red'
                  }
                },
                position: function (pos, params, el, elRect, size) {
                  params.forEach(function (v, i) {
                    if (v.seriesIndex == 0) {
                      that.openPrice = v.data[1]
                      that.collectPrice = v.data[2]
                      that.maxPrice = v.data[3]
                      that.minPrice = v.data[4]
                      that.axisValue = v.axisValue
                    }
                    if (v.seriesIndex == 1) {
                      that.MA5 = v.data
                    }
                    if (v.seriesIndex == 2) {
                      that.MA10 = v.data
                    }
                    if (v.seriesIndex == 3) {
                      that.MA20 = v.data
                    }
                    if (v.seriesIndex == 4) {
                      that.MA30 = v.data
                    }
                    if (v.seriesIndex == 5) {
                      that.volu = v.data
                    }
                  })
                }
              },
              legend: {   //图例控件，点击图例控制哪些系列不现实
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', '成交量'],
                show: false,
                textStyle: {
                  color: '#333'
                },
                inactiveColor: '#333',
              },
              axisPointer: {
                link: {xAxisIndex: 'all'},
                label: {
                  backgroundColor: '#777'//日期提示颜色
                }
              },
              grid: [
                {
                  left: '15%',
                  right: '2%',
                  top: '5%',
                  height: '60%'
                }, {
                  left: '15%',
                  right: '2%',
                  top: '75%',
                  height: '20%'
                }
              ],
              xAxis: [
                {
                  type: 'category',
                  data: data0.categoryData,
                  scale: true,
//                boundaryGap: false,
                  axisLine: {onZero: false},
                  splitLine: {show: false},
                  splitNumber: 20,
                  min: 'dataMin',
                  max: 'dataMax',
                  axisLabel: {color: "#404759"},
                  axisPointer: {
                    z: 100
                  }
                }, {
                  type: 'category',
                  show: false,
                  gridIndex: 1,
                  data: data0.categoryData,
                  scale: true,
//                boundaryGap: false,
                  axisLine: {onZero: false},
                  splitLine: {show: false},

                  splitNumber: 20,
                  min: 'dataMin',
                  max: 'dataMax'
                }],
              yAxis: [
                {
                  scale: true,
                  splitNumber: 5,
                  axisLabel: {show: true, color: "#404759"},
                  axisLine: {show: false},
                  axisTick: {show: true},
                  splitLine: {
                    show: true,
                    lineStyle: {type: 'dashed', color: '#404759'}
                  }
                },
                {
                  scale: true,
                  gridIndex: 1,
                  splitNumber: 2,
                  axisLabel: {show: true, color: "#404759"},
                  axisLine: {show: false, color: '#404759'},
                  axisTick: {show: true},
                  splitLine: {
                    show: true,
                    lineStyle: {type: 'dashed', color: '#404759'}
                  }
                }],
              dataZoom: [
                {
                  type: 'inside',
                  xAxisIndex: [0, 1],
                  start: 0,
                  end: 100
                },
                {
                  show: false,
                  xAxisIndex: [0, 1],
                  type: 'slider',
                  top: '85%',
                  start: 50,
                  end: 100
                }
              ],
              series: [   //图表类型
                {
                  name: '日K',
                  type: 'candlestick',    //K线图
                  data: data0.values,     //y轴对应的数据
                  itemStyle: {
                    color: colorList[0],//阳线的颜色
                    borderColor: colorList[1],//阳线描边颜色
                    borderWidth: 1,
                    color0: colorList[2],//阴线的颜色
                    borderColor0: colorList[3],//阳线描边颜色
                    borderWidth0: 1,
                    emphasis: {
                      itemStyle: {
                        color: 'red'
                      }
                    }
                  }
                },
                {   //MA5 5天内的收盘价之和/5
                  name: 'MA5',
                  type: 'line',
                  showSymbol: false,
                  data: calculateMA(5),
                  smooth: true,//是否平滑
                  itemStyle: {
                    color: colorList[4]
                  },
                  lineStyle: {
                    normal: {
                      color: colorList[4],
                      width: 1,
                      opacity: 1
                    }
                  },
                },
                {
                  name: 'MA10',
                  type: 'line',
                  showSymbol: false,
                  data: calculateMA(10),
                  smooth: true,
                  itemStyle: {
                    color: colorList[5]
                  },
                  lineStyle: {    //标线的样式
                    normal: {
                      color: colorList[5],
                      width: 1,
                      opacity: 1
                    }
                  },
                },
                {
                  name: 'MA20',
                  type: 'line',
                  showSymbol: false,
                  data: calculateMA(20),
                  smooth: true,
                  itemStyle: {
                    color: colorList[6]
                  },
                  lineStyle: {
                    normal: {
                      color: colorList[6],
                      width: 1,
                      opacity: 1
                    }
                  }
                },
                {
                  name: 'MA30',
                  type: 'line',
                  showSymbol: false,
                  data: calculateMA(30),
                  smooth: true,
                  itemStyle: {
                    color: colorList[7]
                  },
                  lineStyle: {
                    normal: {
                      color: colorList[7],
                      width: 1,
                      opacity: 1
                    }
                  }
                },
                {
                  name: '成交量',
                  type: 'bar',
                  showSymbol: false,
                  xAxisIndex: 1,
                  yAxisIndex: 1,
                  data: volumes,
                  itemStyle: {
                    normal: { //柱状图颜色
//                        color: '#b6b'
                      color: function (params) {
                        //params.dataIndex是数据索引
                        if (params.dataIndex % 2 == 0) {
                          return colorList[8]
                        } else if (params.dataIndex % 2 == 1) {
                          return colorList[9]
                        }
                      },
                      opacity: 0.9
                    },
                    emphasis: { //hover时的颜色
//                      color: colorList[10],
                      opacity: 1
                    }
                  }
                }
              ]
            };
            myChart.setOption(option);
          }
        })
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/scss">
  @import "../../../static/css/css3";

  #tran {
    min-height: calc(100% - 120px);
    .sign_in {
      margin-left: 102px;
      width: 98px;
      padding: 21px 30px;
      i {
        display: inline-block;
        width: 38px;
        height: 38px;
        background: url("../../../static/images/sprite.png") no-repeat -365px -50px;
        @include background-size(500px 500px);
      }
    }
    .main {
      padding: 30px 30px 50px 30px;
      h6 {
        margin-top: 45px;
        font-size: 34px;
        color: #EDEDED;
        line-height: 35px;
        padding-left: 30px;
        border-left: 6px solid #1D61FB;
      }
      .canvas {
        width: 100%;
        height: 880px;
        padding-top: 20px;
        @include border-radius(20px);
        background-color: #1C2336;
        #myChart {
          width: 100%;
          height: 800px;
        }
      }
      .table {
        padding-top: 45px;
        width: 100%;
        background-color: #1B2337;
        @include border-radius(20px);
        h6 {
          margin-bottom: 45px;
        }
        table {
          padding-bottom: 20px;
          tr {
            th {
              font-size: 32px;
              line-height: 60px;
              color: #A3A5AB;
              &:nth-child(1) {
                width: 20%;
              }
              &:nth-child(2) {
                width: 20%;
              }
              &:nth-child(3) {
                width: 20%;
              }
              &:nth-child(4) {
                width: 30%;
                color: #42CAAA;
              }
            }
            td {
              line-height: 85px;
              font-size: 32px;
              text-align: center;
              &:nth-child(1) {
                width: 20%;
              }
              &:nth-child(2) {
                width: 20%;
              }
              &:nth-child(3) {
                width: 20%;
              }
              &:nth-child(4) {
                width: 30%;
                color: #42CAAA;
              }
              .button {
                width: 160px;
                height: 60px;
                line-height: 60px;
                font-size: 32px;
              }
            }
          }
        }
        .sall {
          padding-bottom: 20px;
          td {
            color: #DB4D4D;
            .button {
              background-color: #DB4D4D;
            }
          }
        }
        .buy {
          padding-bottom: 20px;
          position: relative;
          &:before {
            content: '';
            width: 90%;
            height: 1px; /*no*/
            background-color: #424757;
            position: absolute;
            top: 0;
            left: 5%;
          }
          td {
            color: #21BD69;
          }
          .button {
            background-color: #21BD69;
          }
        }
      }
    }
  }
</style>
