const jsonlist = [];
jsonlist.push(
  {
      "name": "北苑",
      "value": 34
  },
  {
      "name": "场地增加",
      "value": 50
  },
  {
      "name": "处理速度慢",
      "value": 4
  },
  {
      "name": "便捷",
      "value": 90
  },
  {
      "name": "青年广场",
      "value": 20
  },
  {
      "name": "申请出错",
      "value": 1
  },
  {
      "name": "访问慢",
      "value": 30
  },
  {
      "name": "实时性",
      "value": 19
  })
const getWordCloudOpt = () => {
  const defaultConfig = {
    //设置标题，居中显示
    // title: {
    //   text: 'E词云图',
    //   left: 'center',
    // },
    //数据可以点击
    tooltip: {

    },
    series: [
      {
        //词的类型
        type: 'wordCloud',
        //设置字符大小范围
        sizeRange: [6, 78],
        rotationRange: [-45, 90],
        textStyle: {
          normal: {
            //生成随机的字体颜色
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          }
        },
        //不要忘记调用数据
        data: jsonlist
      }
    ]
  }
  const opt = Object.assign({}, defaultConfig)
  return opt
}

export default{
  getWordCloudOpt
}
