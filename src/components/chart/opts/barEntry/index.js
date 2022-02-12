const getBarEntryOpt = () => {
  const defaultConfig = {
    dataset: [
      {
        dimensions: ['name', 'amount'],
        source: [
          ['Hannah Krause', 41],
          ['Zhao Qian', 20],
          ['Jasmin Krause', 100],
          ['Li Lei', 37],
          ['Karle Neumann', 25],
          ['Adrian Groß', 19],
          ['Mia Neumann', 71],
          ['Böhm Fuchs', 36],
          ['Han Meimei', 67]
        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'amount', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'amount' },
      datasetIndex: 1
    }
  };

  const opt = Object.assign({}, defaultConfig)
  return opt
}

export default {
  getBarEntryOpt
}
